from datetime import datetime, timezone

from fastapi import HTTPException, status
from sqlalchemy import func
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session, joinedload

from app.database.models import Appointment, AppointmentStatus, Treatment
from app.schemas.appointments import (
    AppointmentCreate,
    AppointmentReschedule,
    AppointmentStatusUpdate,
    DashboardStats,
)


def create_appointment_request(db: Session, payload: AppointmentCreate) -> Appointment:
    treatment = (
        db.query(Treatment)
        .options(joinedload(Treatment.category))
        .filter(Treatment.slug == payload.treatment_slug, Treatment.is_active.is_(True))
        .first()
    )
    if not treatment:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Treatment not found")

    if not treatment.category or treatment.category.slug != payload.category:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Treatment does not belong to the selected category",
        )

    appointment = Appointment(
        full_name=payload.full_name.strip(),
        phone=payload.phone,
        email=payload.email,
        category_slug=payload.category,
        treatment_id=treatment.id,
        treatment_title=treatment.title,
        preferred_date=payload.preferred_date,
        preferred_time=payload.preferred_time.strip(),
        message=payload.message,
        status=AppointmentStatus.pending,
    )

    db.add(appointment)
    try:
        db.commit()
    except IntegrityError as exc:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="A duplicate appointment request already exists for this phone, treatment, date, and time.",
        ) from exc
    db.refresh(appointment)
    return appointment


def list_appointments(
    db: Session,
    *,
    status_filter: AppointmentStatus | None = None,
    search: str | None = None,
    skip: int = 0,
    limit: int = 50,
) -> list[Appointment]:
    query = db.query(Appointment)
    if status_filter:
        query = query.filter(Appointment.status == status_filter)
    if search:
        like = f"%{search.strip()}%"
        query = query.filter(
            (Appointment.full_name.ilike(like))
            | (Appointment.phone.ilike(like))
            | (Appointment.email.ilike(like))
            | (Appointment.treatment_title.ilike(like))
        )
    return (
        query.order_by(Appointment.created_at.desc())
        .offset(skip)
        .limit(min(limit, 100))
        .all()
    )


def get_appointment(db: Session, appointment_id) -> Appointment:
    appointment = db.query(Appointment).filter(Appointment.id == appointment_id).first()
    if not appointment:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Appointment not found")
    return appointment


def update_appointment_status(
    db: Session, appointment_id, payload: AppointmentStatusUpdate
) -> Appointment:
    appointment = get_appointment(db, appointment_id)
    appointment.status = payload.status
    if payload.admin_notes is not None:
        appointment.admin_notes = payload.admin_notes
    if payload.status == AppointmentStatus.confirmed:
        appointment.confirmed_at = datetime.now(timezone.utc)
    db.commit()
    db.refresh(appointment)
    return appointment


def reschedule_appointment(
    db: Session, appointment_id, payload: AppointmentReschedule
) -> Appointment:
    appointment = get_appointment(db, appointment_id)
    appointment.preferred_date = payload.preferred_date
    appointment.preferred_time = payload.preferred_time.strip()
    if payload.admin_notes is not None:
        appointment.admin_notes = payload.admin_notes
    if appointment.status in {AppointmentStatus.rejected, AppointmentStatus.cancelled}:
        appointment.status = AppointmentStatus.pending
    try:
        db.commit()
    except IntegrityError as exc:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Reschedule conflicts with an existing appointment request.",
        ) from exc
    db.refresh(appointment)
    return appointment


def dashboard_stats(db: Session) -> DashboardStats:
    rows = (
        db.query(Appointment.status, func.count(Appointment.id))
        .group_by(Appointment.status)
        .all()
    )
    counts = {status.value: 0 for status in AppointmentStatus}
    total = 0
    for status_value, count in rows:
        key = status_value.value if hasattr(status_value, "value") else str(status_value)
        counts[key] = count
        total += count
    return DashboardStats(
        total=total,
        pending=counts["pending"],
        confirmed=counts["confirmed"],
        completed=counts["completed"],
        rejected=counts["rejected"],
        cancelled=counts["cancelled"],
    )
