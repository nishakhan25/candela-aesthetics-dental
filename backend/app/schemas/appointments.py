from datetime import date, datetime
from typing import Optional
from uuid import UUID

from pydantic import BaseModel, EmailStr, Field, field_validator

from app.database.models import AppointmentStatus
from app.schemas.common import ORMModel


class AppointmentCreate(BaseModel):
    full_name: str = Field(min_length=2, max_length=150)
    phone: str = Field(min_length=10, max_length=30)
    email: Optional[EmailStr] = None
    category: str = Field(min_length=2, max_length=50)
    treatment_slug: str = Field(min_length=2, max_length=220)
    preferred_date: date
    preferred_time: str = Field(min_length=3, max_length=30)
    message: Optional[str] = Field(default=None, max_length=2000)

    @field_validator("phone")
    @classmethod
    def normalize_phone(cls, value: str) -> str:
        cleaned = "".join(ch for ch in value if ch.isdigit() or ch in "+")
        if len(cleaned) < 10:
            raise ValueError("Phone number is invalid")
        return cleaned

    @field_validator("preferred_date")
    @classmethod
    def date_not_past(cls, value: date) -> date:
        if value < date.today():
            raise ValueError("Preferred date cannot be in the past")
        return value

    @field_validator("category")
    @classmethod
    def category_allowed(cls, value: str) -> str:
        allowed = {"dental", "aesthetic"}
        normalized = value.strip().lower()
        if normalized not in allowed:
            raise ValueError("Category must be dental or aesthetic")
        return normalized


class AppointmentStatusUpdate(BaseModel):
    status: AppointmentStatus
    admin_notes: Optional[str] = Field(default=None, max_length=2000)


class AppointmentReschedule(BaseModel):
    preferred_date: date
    preferred_time: str = Field(min_length=3, max_length=30)
    admin_notes: Optional[str] = Field(default=None, max_length=2000)

    @field_validator("preferred_date")
    @classmethod
    def date_not_past(cls, value: date) -> date:
        if value < date.today():
            raise ValueError("Preferred date cannot be in the past")
        return value


class AppointmentOut(ORMModel):
    id: UUID
    full_name: str
    phone: str
    email: Optional[str]
    category_slug: str
    treatment_id: Optional[UUID]
    treatment_title: str
    preferred_date: date
    preferred_time: str
    message: Optional[str]
    status: AppointmentStatus
    admin_notes: Optional[str]
    confirmed_at: Optional[datetime]
    created_at: datetime
    updated_at: datetime


class AppointmentPublicCreateResponse(BaseModel):
    message: str
    appointment_id: UUID
    status: AppointmentStatus


class DashboardStats(BaseModel):
    total: int
    pending: int
    confirmed: int
    completed: int
    rejected: int
    cancelled: int
