from typing import Optional

from pydantic import BaseModel, Field

from app.schemas.common import TimestampOut


class TestimonialBase(BaseModel):
    patient_name: str = Field(min_length=2, max_length=150)
    quote: str = Field(min_length=5)
    treatment_label: Optional[str] = None
    rating: Optional[int] = Field(default=None, ge=1, le=5)
    is_published: bool = False
    sort_order: int = 0


class TestimonialCreate(TestimonialBase):
    pass


class TestimonialUpdate(BaseModel):
    patient_name: Optional[str] = None
    quote: Optional[str] = None
    treatment_label: Optional[str] = None
    rating: Optional[int] = Field(default=None, ge=1, le=5)
    is_published: Optional[bool] = None
    sort_order: Optional[int] = None


class TestimonialOut(TestimonialBase, TimestampOut):
    pass
