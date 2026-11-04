from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session, joinedload

from app.database.connection import get_db
from app.database.models import Admin, Treatment, TreatmentCategory
from app.dependencies.auth import get_current_admin
from app.schemas.treatments import (
    CategoryCreate,
    CategoryOut,
    CategoryUpdate,
    TreatmentCreate,
    TreatmentOut,
    TreatmentPublicOut,
    TreatmentUpdate,
)

router = APIRouter(tags=["treatments"])


def _apply_updates(instance, payload):
    data = payload.model_dump(exclude_unset=True)
    for key, value in data.items():
        setattr(instance, key, value)
    return instance


@router.get("/categories", response_model=list[CategoryOut])
def list_categories(db: Session = Depends(get_db)):
    return (
        db.query(TreatmentCategory)
        .filter(TreatmentCategory.is_active.is_(True))
        .order_by(TreatmentCategory.sort_order.asc())
        .all()
    )


@router.get("/categories/all", response_model=list[CategoryOut])
def list_all_categories(
    db: Session = Depends(get_db),
    _: Admin = Depends(get_current_admin),
):
    return db.query(TreatmentCategory).order_by(TreatmentCategory.sort_order.asc()).all()


@router.post("/categories", response_model=CategoryOut, status_code=201)
def create_category(
    payload: CategoryCreate,
    db: Session = Depends(get_db),
    _: Admin = Depends(get_current_admin),
):
    category = TreatmentCategory(**payload.model_dump())
    db.add(category)
    db.commit()
    db.refresh(category)
    return category


@router.patch("/categories/{category_id}", response_model=CategoryOut)
def update_category(
    category_id: UUID,
    payload: CategoryUpdate,
    db: Session = Depends(get_db),
    _: Admin = Depends(get_current_admin),
):
    category = db.query(TreatmentCategory).filter(TreatmentCategory.id == category_id).first()
    if not category:
        raise HTTPException(status_code=404, detail="Category not found")
    _apply_updates(category, payload)
    db.commit()
    db.refresh(category)
    return category


@router.delete("/categories/{category_id}", status_code=204)
def delete_category(
    category_id: UUID,
    db: Session = Depends(get_db),
    _: Admin = Depends(get_current_admin),
):
    category = db.query(TreatmentCategory).filter(TreatmentCategory.id == category_id).first()
    if not category:
        raise HTTPException(status_code=404, detail="Category not found")
    if category.treatments:
        raise HTTPException(status_code=400, detail="Category has treatments; remove them first")
    db.delete(category)
    db.commit()


@router.get("/treatments", response_model=list[TreatmentPublicOut])
def list_public_treatments(db: Session = Depends(get_db), featured: bool | None = None):
    query = (
        db.query(Treatment)
        .options(joinedload(Treatment.category))
        .filter(Treatment.is_active.is_(True))
    )
    if featured is True:
        query = query.filter(Treatment.is_featured.is_(True))
    treatments = query.order_by(Treatment.sort_order.asc()).all()
    return [
        TreatmentPublicOut(
            id=item.id,
            title=item.title,
            slug=item.slug,
            short_description=item.short_description,
            description=item.description,
            image_url=item.image_url,
            is_featured=item.is_featured,
            category_slug=item.category.slug,
            category_name=item.category.name,
        )
        for item in treatments
        if item.category
    ]


@router.get("/treatments/{slug}", response_model=TreatmentPublicOut)
def get_public_treatment(slug: str, db: Session = Depends(get_db)):
    treatment = (
        db.query(Treatment)
        .options(joinedload(Treatment.category))
        .filter(Treatment.slug == slug, Treatment.is_active.is_(True))
        .first()
    )
    if not treatment or not treatment.category:
        raise HTTPException(status_code=404, detail="Treatment not found")
    return TreatmentPublicOut(
        id=treatment.id,
        title=treatment.title,
        slug=treatment.slug,
        short_description=treatment.short_description,
        description=treatment.description,
        image_url=treatment.image_url,
        is_featured=treatment.is_featured,
        category_slug=treatment.category.slug,
        category_name=treatment.category.name,
    )


@router.get("/admin/treatments", response_model=list[TreatmentOut])
def admin_list_treatments(
    db: Session = Depends(get_db),
    _: Admin = Depends(get_current_admin),
):
    return db.query(Treatment).order_by(Treatment.sort_order.asc()).all()


@router.post("/admin/treatments", response_model=TreatmentOut, status_code=201)
def create_treatment(
    payload: TreatmentCreate,
    db: Session = Depends(get_db),
    _: Admin = Depends(get_current_admin),
):
    category = db.query(TreatmentCategory).filter(TreatmentCategory.id == payload.category_id).first()
    if not category:
        raise HTTPException(status_code=400, detail="Invalid category_id")
    treatment = Treatment(**payload.model_dump())
    db.add(treatment)
    db.commit()
    db.refresh(treatment)
    return treatment


@router.patch("/admin/treatments/{treatment_id}", response_model=TreatmentOut)
def update_treatment(
    treatment_id: UUID,
    payload: TreatmentUpdate,
    db: Session = Depends(get_db),
    _: Admin = Depends(get_current_admin),
):
    treatment = db.query(Treatment).filter(Treatment.id == treatment_id).first()
    if not treatment:
        raise HTTPException(status_code=404, detail="Treatment not found")
    _apply_updates(treatment, payload)
    db.commit()
    db.refresh(treatment)
    return treatment


@router.delete("/admin/treatments/{treatment_id}", status_code=204)
def delete_treatment(
    treatment_id: UUID,
    db: Session = Depends(get_db),
    _: Admin = Depends(get_current_admin),
):
    treatment = db.query(Treatment).filter(Treatment.id == treatment_id).first()
    if not treatment:
        raise HTTPException(status_code=404, detail="Treatment not found")
    db.delete(treatment)
    db.commit()
