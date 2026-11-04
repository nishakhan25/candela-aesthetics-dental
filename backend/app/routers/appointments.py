from typing import Optional
from uuid import UUID

from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session

from app.database.connection import get_db
from app.database.models import Admin, AppointmentStatus
from app.dependencies.auth import get_current_admin
from app.schemas.appointments import (
    AppointmentCreate,
    AppointmentOut,
    AppointmentPublicCreateResponse,
    AppointmentReschedule,
    AppointmentStatusUpdate,
    DashboardStats,
)
from app.services import appointments as appointment_service

router = APIRouter(prefix="/appointments", tags=["appointments"])


@router.post("", response_model=AppointmentPublicCreateResponse, status_code=201)
def create_appointment(payload: AppointmentCreate, db: Session = Depends(get_db)):
    appointment = appointment_service.create_appointment_request(db, payload)
    return AppointmentPublicCreateResponse(
        message="Appointment request received. Confirmation follows clinic approval.",
        appointment_id=appointment.id,
        status=appointment.status,
    )


@router.get("", response_model=list[AppointmentOut])
def admin_list_appointments(
    status_filter: Optional[AppointmentStatus] = Query(default=None, alias="status"),
    search: Optional[str] = None,
    skip: int = Query(default=0, ge=0),
    limit: int = Query(default=50, ge=1, le=100),
    db: Session = Depends(get_db),
    _: Admin = Depends(get_current_admin),
):
    return appointment_service.list_appointments(
        db, status_filter=status_filter, search=search, skip=skip, limit=limit
    )


@router.get("/dashboard", response_model=DashboardStats)
def dashboard(
    db: Session = Depends(get_db),
    _: Admin = Depends(get_current_admin),
):
    return appointment_service.dashboard_stats(db)


@router.get("/{appointment_id}", response_model=AppointmentOut)
def get_appointment(
    appointment_id: UUID,
    db: Session = Depends(get_db),
    _: Admin = Depends(get_current_admin),
):
    return appointment_service.get_appointment(db, appointment_id)


@router.patch("/{appointment_id}/status", response_model=AppointmentOut)
def update_status(
    appointment_id: UUID,
    payload: AppointmentStatusUpdate,
    db: Session = Depends(get_db),
    _: Admin = Depends(get_current_admin),
):
    return appointment_service.update_appointment_status(db, appointment_id, payload)


@router.patch("/{appointment_id}/reschedule", response_model=AppointmentOut)
def reschedule(
    appointment_id: UUID,
    payload: AppointmentReschedule,
    db: Session = Depends(get_db),
    _: Admin = Depends(get_current_admin),
):
    return appointment_service.reschedule_appointment(db, appointment_id, payload)
