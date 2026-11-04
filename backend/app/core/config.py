from functools import lru_cache
from typing import List

from pydantic import Field
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore",
    )

    app_name: str = "Candela Aesthetics & Dental API"
    app_env: str = "development"
    api_prefix: str = "/api"
    secret_key: str = Field(..., alias="SECRET_KEY")
    access_token_expire_minutes: int = 480
    database_url: str = Field(..., alias="DATABASE_URL")
    cors_origins: str = "http://localhost:5173"

    admin_email: str = "admin@candelaclinic.com"
    admin_password: str = "ChangeThisPassword123!"
    admin_full_name: str = "Clinic Admin"

    clinic_whatsapp_number: str = ""
    clinic_phone_primary: str = "03454119939"
    clinic_phone_secondary: str = "03324119939"
    clinic_email: str = ""
    clinic_address: str = "1053-Ravi Block, Allama Iqbal Town, Lahore"
    clinic_hours: str = "9:00 AM – 10:00 PM"
    instagram_url: str = "https://www.instagram.com/candelaaestheticsanddental/"

    @property
    def cors_origin_list(self) -> List[str]:
        return [origin.strip() for origin in self.cors_origins.split(",") if origin.strip()]


@lru_cache
def get_settings() -> Settings:
    return Settings()
