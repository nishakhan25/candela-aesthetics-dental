from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.config import get_settings
from app.database.connection import get_db
from app.database.models import Admin, ClinicSettings
from app.dependencies.auth import get_current_admin
from app.schemas.common import MessageOut
from app.schemas.contact import ClinicSettingsOut, ClinicSettingsUpdate, ContactMessageCreate

router = APIRouter(tags=["contact"])

DEFAULT_KEYS = [
    "phone_primary",
    "phone_secondary",
    "whatsapp_number",
    "email",
    "address",
    "hours",
    "instagram_url",
]


def ensure_defaults(db: Session) -> None:
    settings = get_settings()
    defaults = {
        "phone_primary": settings.clinic_phone_primary,
        "phone_secondary": settings.clinic_phone_secondary,
        "whatsapp_number": settings.clinic_whatsapp_number,
        "email": settings.clinic_email,
        "address": settings.clinic_address,
        "hours": settings.clinic_hours,
        "instagram_url": settings.instagram_url,
    }
    for key, value in defaults.items():
        existing = db.query(ClinicSettings).filter(ClinicSettings.key == key).first()
        if not existing:
            db.add(ClinicSettings(key=key, value=value, label=key.replace("_", " ").title()))
    db.commit()


@router.get("/contact/settings", response_model=ClinicSettingsOut)
def get_public_settings(db: Session = Depends(get_db)):
    ensure_defaults(db)
    rows = db.query(ClinicSettings).all()
    return ClinicSettingsOut(settings={row.key: row.value for row in rows})


@router.put("/contact/settings", response_model=ClinicSettingsOut)
def update_settings(
    payload: ClinicSettingsUpdate,
    db: Session = Depends(get_db),
    _: Admin = Depends(get_current_admin),
):
    ensure_defaults(db)
    for key, value in payload.settings.items():
        row = db.query(ClinicSettings).filter(ClinicSettings.key == key).first()
        if row:
            row.value = value
        else:
            db.add(ClinicSettings(key=key, value=value, label=key.replace("_", " ").title()))
    db.commit()
    rows = db.query(ClinicSettings).all()
    return ClinicSettingsOut(settings={row.key: row.value for row in rows})


@router.post("/contact", response_model=MessageOut)
def submit_contact(payload: ContactMessageCreate, db: Session = Depends(get_db)):
    # Persist as a clinic settings inbox marker is avoided; store in admin_notes-like table later.
    # For Phase 3 we acknowledge validated payloads and keep an audit via settings heartbeat.
    ensure_defaults(db)
    inbox = db.query(ClinicSettings).filter(ClinicSettings.key == "last_contact_message").first()
    summary = f"{payload.name} | {payload.phone} | {payload.message[:180]}"
    if inbox:
        inbox.value = summary
    else:
        db.add(ClinicSettings(key="last_contact_message", value=summary, label="Last Contact Message"))
    db.commit()
    return MessageOut(message="Message received. The clinic will respond shortly.")
