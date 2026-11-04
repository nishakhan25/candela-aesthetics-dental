from typing import Dict, Optional

from pydantic import BaseModel, EmailStr, Field


class ContactMessageCreate(BaseModel):
    name: str = Field(min_length=2, max_length=150)
    phone: str = Field(min_length=10, max_length=30)
    email: Optional[EmailStr] = None
    message: str = Field(min_length=5, max_length=3000)


class ClinicSettingsUpdate(BaseModel):
    settings: Dict[str, str]


class ClinicSettingsOut(BaseModel):
    settings: Dict[str, Optional[str]]
