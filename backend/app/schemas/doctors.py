from typing import Optional
from uuid import UUID

from pydantic import BaseModel, Field

from app.schemas.common import TimestampOut


class DoctorBase(BaseModel):
    name: str = Field(min_length=2, max_length=150)
    slug: str = Field(min_length=2, max_length=180)
    title: Optional[str] = None
    qualifications: Optional[str] = None
    specialization: Optional[str] = None
    bio: Optional[str] = None
    image_url: Optional[str] = None
    is_published: bool = False
    sort_order: int = 0


class DoctorCreate(DoctorBase):
    pass


class DoctorUpdate(BaseModel):
    name: Optional[str] = None
    slug: Optional[str] = None
    title: Optional[str] = None
    qualifications: Optional[str] = None
    specialization: Optional[str] = None
    bio: Optional[str] = None
    image_url: Optional[str] = None
    is_published: Optional[bool] = None
    sort_order: Optional[int] = None


class DoctorOut(DoctorBase, TimestampOut):
    pass
