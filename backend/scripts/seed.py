"""Seed admin, clinic settings, categories, treatments, and doctors from clinic materials."""

from __future__ import annotations

import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT))

from app.core.config import get_settings
from app.core.security import hash_password
from app.database.connection import SessionLocal
from app.database.models import (
    Admin,
    AdminRole,
    ClinicSettings,
    Doctor,
    Treatment,
    TreatmentCategory,
)


CATEGORIES = [
    {
        "name": "Dental Care",
        "slug": "dental",
        "eyebrow": "Oral Wellness",
        "title": "Solution to all dental problems.",
        "description": "From scaling and whitening to implants, RCT, veneers, braces and aligners.",
        "image_url": "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=1600&q=80",
        "sort_order": 1,
    },
    {
        "name": "Aesthetic Care",
        "slug": "aesthetic",
        "eyebrow": "Skin & Laser",
        "title": "Solution for all skin and hair concerns.",
        "description": "Dermatologist-led laser, peels, injectables, PRP and rejuvenation.",
        "image_url": "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1600&q=80",
        "sort_order": 2,
    },
    {
        "name": "Physiotherapy",
        "slug": "physiotherapy",
        "eyebrow": "Movement & Recovery",
        "title": "Relief, rehab and restored mobility.",
        "description": "Pain, sports injuries, post-op and neurological rehabilitation.",
        "image_url": "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1600&q=80",
        "sort_order": 3,
    },
]

# Compact seed set — full catalogue lives in frontend data; CMS can expand.
TREATMENTS = [
    {"category_slug": "dental", "title": "Scaling & Polishing", "slug": "scaling-and-polishing", "short_description": "Bright & healthy smile — superficial and deep scaling.", "description": "Professional cleaning for a brighter, healthier smile.", "image_url": "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?auto=format&fit=crop&w=1400&q=80", "is_featured": True, "sort_order": 1},
    {"category_slug": "dental", "title": "Teeth Whitening", "slug": "teeth-whitening", "short_description": "Clinician-guided whitening for a brighter smile.", "description": "Professional teeth whitening tailored to your goals.", "image_url": "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=1400&q=80", "is_featured": True, "sort_order": 2},
    {"category_slug": "dental", "title": "Root Canal Treatment", "slug": "root-canal-treatment", "short_description": "Relieve pain and restore your natural tooth.", "description": "Safe, effective RCT to preserve your natural tooth.", "image_url": "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=1400&q=80", "is_featured": True, "sort_order": 3},
    {"category_slug": "dental", "title": "Dental Implants", "slug": "dental-implants", "short_description": "Immediate loading implants to restore your smile.", "description": "Dental implants including immediate loading options.", "image_url": "https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&w=1400&q=80", "is_featured": True, "sort_order": 4},
    {"category_slug": "dental", "title": "Braces & Clear Aligners", "slug": "braces-and-aligners", "short_description": "Nearly invisible aligners — comfortable and tailored.", "description": "Braces and clear aligners for smile correction.", "image_url": "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=1400&q=80", "is_featured": True, "sort_order": 5},
    {"category_slug": "dental", "title": "Dental Fillings", "slug": "dental-fillings", "short_description": "Composite and GIC fillings.", "description": "Tooth-coloured restorations.", "image_url": "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=1400&q=80", "is_featured": False, "sort_order": 6},
    {"category_slug": "dental", "title": "Crown & Bridge", "slug": "crown-and-bridge", "short_description": "PFM and zirconia crowns and bridges.", "description": "Restore damaged or missing teeth.", "image_url": "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1400&q=80", "is_featured": False, "sort_order": 7},
    {"category_slug": "dental", "title": "Veneers", "slug": "veneers", "short_description": "Refine smile shape and colour.", "description": "Cosmetic veneers for a balanced smile.", "image_url": "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?auto=format&fit=crop&w=1400&q=80", "is_featured": False, "sort_order": 8},
    {"category_slug": "aesthetic", "title": "Laser Hair Removal", "slug": "laser-hair-removal", "short_description": "Lasting smoothness with clinician-guided LHR.", "description": "Laser targets the follicle for lasting hair reduction.", "image_url": "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&w=1400&q=80", "is_featured": True, "sort_order": 1},
    {"category_slug": "aesthetic", "title": "Hydrafacial & Deep Cleansing", "slug": "hydrafacial", "short_description": "Cleanse, exfoliate and hydrate.", "description": "Hydrafacial for glow and refined vitality.", "image_url": "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&w=1400&q=80", "is_featured": True, "sort_order": 2},
    {"category_slug": "aesthetic", "title": "Chemical Peel", "slug": "chemical-peels", "short_description": "Tone, texture, pigmentation and acne care.", "description": "Peels for dullness, spots and uneven texture.", "image_url": "https://images.unsplash.com/photo-1552693673-1bf958298935?auto=format&fit=crop&w=1400&q=80", "is_featured": True, "sort_order": 3},
    {"category_slug": "aesthetic", "title": "Botox Treatment", "slug": "botox-treatment", "short_description": "Smooth lines with a natural refreshed look.", "description": "Botox for forehead lines and crow’s feet.", "image_url": "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&w=1400&q=80", "is_featured": True, "sort_order": 4},
    {"category_slug": "aesthetic", "title": "Hair Transplant", "slug": "hair-transplant", "short_description": "Natural-looking density for thinning and patches.", "description": "Hair transplant for visible density and confidence.", "image_url": "https://images.unsplash.com/photo-1629909615184-74f495363b67?auto=format&fit=crop&w=1400&q=80", "is_featured": True, "sort_order": 5},
    {"category_slug": "aesthetic", "title": "Under Eye PRP", "slug": "under-eye-prp", "short_description": "Collagen, dark circles and firmer under-eyes.", "description": "Under-eye PRP for brightening and firming.", "image_url": "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1400&q=80", "is_featured": True, "sort_order": 6},
    {"category_slug": "aesthetic", "title": "Non-Surgical Rhinoplasty", "slug": "non-surgical-rhinoplasty", "short_description": "Refined profile without surgery.", "description": "Nose shape enhancement with minimal downtime.", "image_url": "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=1400&q=80", "is_featured": True, "sort_order": 7},
    {"category_slug": "aesthetic", "title": "Carbon Laser Facial", "slug": "carbon-laser-facial", "short_description": "Tone, clarity and radiance.", "description": "Carbon laser facial for refreshed complexion.", "image_url": "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?auto=format&fit=crop&w=1400&q=80", "is_featured": False, "sort_order": 8},
    {"category_slug": "aesthetic", "title": "Tattoo Removal", "slug": "tattoo-removal", "short_description": "Laser tattoo fading and removal.", "description": "Your skin, your choice.", "image_url": "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=1400&q=80", "is_featured": False, "sort_order": 9},
    {"category_slug": "physiotherapy", "title": "Pain & Joint Physiotherapy", "slug": "pain-and-joint-physiotherapy", "short_description": "Back, neck, arthritis, sciatica and joint care.", "description": "Physiotherapy for common pain and joint concerns.", "image_url": "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1400&q=80", "is_featured": True, "sort_order": 1},
    {"category_slug": "physiotherapy", "title": "Sports & Post-Op Rehab", "slug": "sports-and-post-op-rehab", "short_description": "Sports injury and post-operative rehabilitation.", "description": "Targeted rehab after injury or surgery.", "image_url": "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=1400&q=80", "is_featured": True, "sort_order": 2},
    {"category_slug": "physiotherapy", "title": "Neurological Rehabilitation", "slug": "neurological-rehabilitation", "short_description": "Stroke, palsy and CP child support.", "description": "Neurological rehabilitation pathways.", "image_url": "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&w=1400&q=80", "is_featured": False, "sort_order": 3},
]

DOCTORS = [
    {
        "name": "Dr. Rabia Tariq",
        "slug": "dr-rabia-tariq",
        "title": "Skin & Laser Specialist",
        "qualifications": "MBBS, FCPS Dermatologist",
        "specialization": "Dermatology, laser & aesthetic medicine",
        "bio": "Laser Hair Removal, HydraFacial, Carbon Laser Facial, Chemical Peels, Acne & Scar Care, Pigmentation, Botox, Fillers, Lip Enhancement, Under-Eye Rejuvenation, PRP, HIFU, Fractional CO₂, Tattoo Removal, Non-Surgical Rhinoplasty, and more.",
        "is_published": True,
        "sort_order": 1,
    },
    {
        "name": "Dr. Aqsa Rafay",
        "slug": "dr-aqsa-rafay",
        "title": "Dental Surgeon",
        "qualifications": "BDS",
        "specialization": "General & aesthetic dentistry",
        "bio": "Scaling & Polishing, Fillings, Crown & Bridge, Extractions, Dentures, RCT, Veneers, Smile Makeover, Implants, Whitening, Braces & Aligners, Pediatric dental care.",
        "is_published": True,
        "sort_order": 2,
    },
    {
        "name": "Dr. Rabiya Amjad",
        "slug": "dr-rabiya-amjad",
        "title": "Dental Surgeon",
        "qualifications": "BDS | CHPE",
        "specialization": "General & aesthetic dentistry",
        "bio": "Scaling & Polishing, Fillings, Crown & Bridge, Extractions, Dentures, RCT, Veneers, Smile Makeover, Implants, Whitening, Braces & Aligners, Pediatric dental care.",
        "is_published": True,
        "sort_order": 3,
    },
    {
        "name": "Dr. Mubashir",
        "slug": "dr-mubashir",
        "title": "Hair Transplant Specialist",
        "qualifications": "Hair restoration",
        "specialization": "Hair transplant & density restoration",
        "bio": "Hair Transplant, thinning & patch restoration, natural-looking density planning, supportive Hair PRP.",
        "is_published": True,
        "sort_order": 4,
    },
    {
        "name": "Dr. Meerab Jamil",
        "slug": "dr-meerab-jamil",
        "title": "Doctor of Physical Therapy",
        "qualifications": "DPT",
        "specialization": "Physiotherapy & rehabilitation",
        "bio": "Back/Neck pain, Arthritis, Sports injuries, Post-op rehab, Frozen shoulder, Sciatica, Joint pain, Muscle strain, Stroke/Palsy/CP rehabilitation.",
        "is_published": True,
        "sort_order": 5,
    },
]


def seed() -> None:
    settings = get_settings()
    db = SessionLocal()
    try:
        admin = db.query(Admin).filter(Admin.email == settings.admin_email).first()
        if not admin:
            db.add(
                Admin(
                    name="Clinic Admin",
                    email=settings.admin_email,
                    hashed_password=hash_password(settings.admin_password),
                    role=AdminRole.superadmin,
                    is_active=True,
                )
            )

        clinic = db.query(ClinicSettings).first()
        if not clinic:
            db.add(
                ClinicSettings(
                    clinic_name="Candela Aesthetics & Dental",
                    tagline="Where Science Meets Beauty",
                    address="Lahore, Pakistan",
                    phone_primary=settings.clinic_phone_primary or "",
                    whatsapp_number=settings.whatsapp_number or "",
                    instagram_url=settings.instagram_url or "",
                    email=settings.clinic_email or "",
                )
            )

        slug_to_category: dict[str, TreatmentCategory] = {}
        for item in CATEGORIES:
            category = db.query(TreatmentCategory).filter(TreatmentCategory.slug == item["slug"]).first()
            if not category:
                category = TreatmentCategory(**item, is_active=True)
                db.add(category)
                db.flush()
            slug_to_category[item["slug"]] = category

        for item in TREATMENTS:
            existing = db.query(Treatment).filter(Treatment.slug == item["slug"]).first()
            if existing:
                continue
            category = slug_to_category[item["category_slug"]]
            payload = {k: v for k, v in item.items() if k != "category_slug"}
            db.add(
                Treatment(
                    **payload,
                    category_id=category.id,
                    is_active=True,
                )
            )

        for item in DOCTORS:
            existing = db.query(Doctor).filter(Doctor.slug == item["slug"]).first()
            if existing:
                continue
            db.add(Doctor(**item))

        db.commit()
        print("Seed completed.")
    except Exception:
        db.rollback()
        raise
    finally:
        db.close()


if __name__ == "__main__":
    seed()
