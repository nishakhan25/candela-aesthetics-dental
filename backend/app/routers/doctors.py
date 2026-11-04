from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.connection import get_db
from app.database.models import Admin, Doctor
from app.dependencies.auth import get_current_admin
from app.schemas.doctors import DoctorCreate, DoctorOut, DoctorUpdate

router = APIRouter(prefix="/doctors", tags=["doctors"])


def _apply_updates(instance, payload):
    for key, value in payload.model_dump(exclude_unset=True).items():
        setattr(instance, key, value)


@router.get("", response_model=list[DoctorOut])
def list_published_doctors(db: Session = Depends(get_db)):
    return (
        db.query(Doctor)
        .filter(Doctor.is_published.is_(True))
        .order_by(Doctor.sort_order.asc())
        .all()
    )


@router.get("/all", response_model=list[DoctorOut])
def list_all_doctors(
    db: Session = Depends(get_db),
    _: Admin = Depends(get_current_admin),
):
    return db.query(Doctor).order_by(Doctor.sort_order.asc()).all()


@router.get("/{slug}", response_model=DoctorOut)
def get_doctor(slug: str, db: Session = Depends(get_db)):
    doctor = db.query(Doctor).filter(Doctor.slug == slug, Doctor.is_published.is_(True)).first()
    if not doctor:
        raise HTTPException(status_code=404, detail="Doctor not found")
    return doctor


@router.post("", response_model=DoctorOut, status_code=201)
def create_doctor(
    payload: DoctorCreate,
    db: Session = Depends(get_db),
    _: Admin = Depends(get_current_admin),
):
    doctor = Doctor(**payload.model_dump())
    db.add(doctor)
    db.commit()
    db.refresh(doctor)
    return doctor


@router.patch("/{doctor_id}", response_model=DoctorOut)
def update_doctor(
    doctor_id: UUID,
    payload: DoctorUpdate,
    db: Session = Depends(get_db),
    _: Admin = Depends(get_current_admin),
):
    doctor = db.query(Doctor).filter(Doctor.id == doctor_id).first()
    if not doctor:
        raise HTTPException(status_code=404, detail="Doctor not found")
    _apply_updates(doctor, payload)
    db.commit()
    db.refresh(doctor)
    return doctor


@router.delete("/{doctor_id}", status_code=204)
def delete_doctor(
    doctor_id: UUID,
    db: Session = Depends(get_db),
    _: Admin = Depends(get_current_admin),
):
    doctor = db.query(Doctor).filter(Doctor.id == doctor_id).first()
    if not doctor:
        raise HTTPException(status_code=404, detail="Doctor not found")
    db.delete(doctor)
    db.commit()
