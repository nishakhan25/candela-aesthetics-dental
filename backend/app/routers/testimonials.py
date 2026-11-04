from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.connection import get_db
from app.database.models import Admin, Testimonial
from app.dependencies.auth import get_current_admin
from app.schemas.testimonials import TestimonialCreate, TestimonialOut, TestimonialUpdate

router = APIRouter(prefix="/testimonials", tags=["testimonials"])


def _apply_updates(instance, payload):
    for key, value in payload.model_dump(exclude_unset=True).items():
        setattr(instance, key, value)


@router.get("", response_model=list[TestimonialOut])
def list_published(db: Session = Depends(get_db)):
    return (
        db.query(Testimonial)
        .filter(Testimonial.is_published.is_(True))
        .order_by(Testimonial.sort_order.asc())
        .all()
    )


@router.get("/all", response_model=list[TestimonialOut])
def list_all(
    db: Session = Depends(get_db),
    _: Admin = Depends(get_current_admin),
):
    return db.query(Testimonial).order_by(Testimonial.sort_order.asc()).all()


@router.post("", response_model=TestimonialOut, status_code=201)
def create_item(
    payload: TestimonialCreate,
    db: Session = Depends(get_db),
    _: Admin = Depends(get_current_admin),
):
    item = Testimonial(**payload.model_dump())
    db.add(item)
    db.commit()
    db.refresh(item)
    return item


@router.patch("/{item_id}", response_model=TestimonialOut)
def update_item(
    item_id: UUID,
    payload: TestimonialUpdate,
    db: Session = Depends(get_db),
    _: Admin = Depends(get_current_admin),
):
    item = db.query(Testimonial).filter(Testimonial.id == item_id).first()
    if not item:
        raise HTTPException(status_code=404, detail="Testimonial not found")
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
    item = db.query(Testimonial).filter(Testimonial.id == item_id).first()
    if not item:
        raise HTTPException(status_code=404, detail="Testimonial not found")
    db.delete(item)
    db.commit()
