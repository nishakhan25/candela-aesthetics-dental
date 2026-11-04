from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session

from app.database.connection import get_db
from app.database.models import Admin, GalleryImage
from app.dependencies.auth import get_current_admin
from app.schemas.gallery import GalleryCreate, GalleryOut, GalleryUpdate

router = APIRouter(prefix="/gallery", tags=["gallery"])


def _apply_updates(instance, payload):
    for key, value in payload.model_dump(exclude_unset=True).items():
        setattr(instance, key, value)


@router.get("", response_model=list[GalleryOut])
def list_published(
    category: str | None = Query(default=None),
    db: Session = Depends(get_db),
):
    query = db.query(GalleryImage).filter(GalleryImage.is_published.is_(True))
    if category and category != "all":
        query = query.filter(GalleryImage.category == category)
    return query.order_by(GalleryImage.sort_order.asc()).all()


@router.get("/all", response_model=list[GalleryOut])
def list_all(
    db: Session = Depends(get_db),
    _: Admin = Depends(get_current_admin),
):
    return db.query(GalleryImage).order_by(GalleryImage.sort_order.asc()).all()


@router.post("", response_model=GalleryOut, status_code=201)
def create_item(
    payload: GalleryCreate,
    db: Session = Depends(get_db),
    _: Admin = Depends(get_current_admin),
):
    item = GalleryImage(**payload.model_dump())
    db.add(item)
    db.commit()
    db.refresh(item)
    return item


@router.patch("/{item_id}", response_model=GalleryOut)
def update_item(
    item_id: UUID,
    payload: GalleryUpdate,
    db: Session = Depends(get_db),
    _: Admin = Depends(get_current_admin),
):
    item = db.query(GalleryImage).filter(GalleryImage.id == item_id).first()
    if not item:
        raise HTTPException(status_code=404, detail="Gallery item not found")
    _apply_updates(item, payload)
    db.commit()
    db.refresh(item)
    return item


@router.delete("/{item_id}", status_code=204)
def delete_item(
    item_id: UUID,
    db: Session = Depends(get_db),
    _: Admin = Depends(get_current_admin),
):
    item = db.query(GalleryImage).filter(GalleryImage.id == item_id).first()
    if not item:
        raise HTTPException(status_code=404, detail="Gallery item not found")
    db.delete(item)
    db.commit()
