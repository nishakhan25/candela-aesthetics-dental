from typing import Optional

from pydantic import BaseModel, Field, model_validator

from app.schemas.common import TimestampOut


class GalleryBase(BaseModel):
    title: str = Field(min_length=2, max_length=200)
    category: str = Field(default="clinic", max_length=50)
    media_type: str = Field(default="single", max_length=30)
    image_url: Optional[str] = None
    before_url: Optional[str] = None
    after_url: Optional[str] = None
    is_published: bool = False
    sort_order: int = 0

    @model_validator(mode="after")
    def validate_media(self):
        if self.media_type == "before-after":
            if not self.before_url or not self.after_url:
                raise ValueError("before_url and after_url are required for before-after media")
        elif not self.image_url:
            raise ValueError("image_url is required for single media")
        return self


class GalleryCreate(GalleryBase):
    pass


class GalleryUpdate(BaseModel):
    title: Optional[str] = None
    category: Optional[str] = None
    media_type: Optional[str] = None
    image_url: Optional[str] = None
    before_url: Optional[str] = None
    after_url: Optional[str] = None
    is_published: Optional[bool] = None
    sort_order: Optional[int] = None


class GalleryOut(GalleryBase, TimestampOut):
    pass
