from typing import Optional
from uuid import UUID

from pydantic import BaseModel, Field

from app.schemas.common import ORMModel, TimestampOut


class CategoryBase(BaseModel):
    name: str = Field(min_length=2, max_length=100)
    slug: str = Field(min_length=2, max_length=120)
    eyebrow: Optional[str] = None
    title: Optional[str] = None
    description: Optional[str] = None
    image_url: Optional[str] = None
    is_active: bool = True
    sort_order: int = 0


class CategoryCreate(CategoryBase):
    pass


class CategoryUpdate(BaseModel):
    name: Optional[str] = None
    slug: Optional[str] = None
    eyebrow: Optional[str] = None
    title: Optional[str] = None
    description: Optional[str] = None
    image_url: Optional[str] = None
    is_active: Optional[bool] = None
    sort_order: Optional[int] = None


class CategoryOut(CategoryBase, TimestampOut):
    pass


class TreatmentBase(BaseModel):
    category_id: UUID
    title: str = Field(min_length=2, max_length=200)
    slug: str = Field(min_length=2, max_length=220)
    short_description: Optional[str] = None
    description: Optional[str] = None
    image_url: Optional[str] = None
    is_featured: bool = False
    is_active: bool = True
    sort_order: int = 0


class TreatmentCreate(TreatmentBase):
    pass


class TreatmentUpdate(BaseModel):
    category_id: Optional[UUID] = None
    title: Optional[str] = None
    slug: Optional[str] = None
    short_description: Optional[str] = None
    description: Optional[str] = None
    image_url: Optional[str] = None
    is_featured: Optional[bool] = None
    is_active: Optional[bool] = None
    sort_order: Optional[int] = None


class TreatmentOut(TreatmentBase, TimestampOut):
    pass


class TreatmentPublicOut(ORMModel):
    id: UUID
    title: str
    slug: str
    short_description: Optional[str]
    description: Optional[str]
    image_url: Optional[str]
    is_featured: bool
    category_slug: str
    category_name: str
