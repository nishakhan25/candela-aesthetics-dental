# PHASE 1 — Creative Foundation
## Candela Aesthetics & Dental

**Status:** Awaiting client approval before Phase 2 (Frontend Development)  
**Date:** 2026-11-03  
**Project directory:** Empty greenfield (`D:\CMC project`)

---

## 1. Project Inspection

| Finding | Detail |
|---|---|
| Existing codebase | None — empty directory |
| Git repository | Not initialized |
| Prior website | `candelamedicalcomplex.com` referenced publicly (returned 500 during inspection) |
| Primary brand channel | [instagram.com/candelaaestheticsanddental](https://www.instagram.com/candelaaestheticsanddental/) (~30.9K followers) |

---

## 2. Verified Brand Facts (from Instagram + public listings)

### Identity / Naming
Public brand names used interchangeably:
- **Candela Aesthetics & Dental** (Instagram title — primary website brand)
- **CLC – Candela Laser Center & Polyclinic**
- **CMC – Candela Medical Complex**

**Website recommendation:** Lead with **Candela Aesthetics & Dental**. Treat CMC/CLC as supporting legal/facility names in footer/about only, pending client preference.

### Location & Contact (Instagram bio — primary source)
- **Address:** 1053-Ravi Block, Allama Iqbal Town, Lahore
- **Appointments:** 0345-4119939 · 0332-4119939
- **Hours (bio):** 9:00 AM – 10:00 PM (services)
- WhatsApp number: **not explicitly labeled** on Instagram — confirm which line is WhatsApp

### Instagram Highlights (service signals)
Clinic diaries · Treatments · reviews · Dentistry · Hydrafacial · Surgeries · Eyelash ext · Dermatologist · Mole removal

### Treatments verified from Instagram posts / highlights
**Aesthetic / Dermatology**
- Laser hair reduction (body packages promoted)
- Carbon Spectra Laser Facial
- Chemical peels
- Hydrafacial (highlight present)
- Hair PRP (Treatments highlight)
- Mole removal (highlight present)
- Dermatologist consultations / skin concern care (acne, dull skin, pigmentation, pores, uneven texture, redness, fine lines)
- Eyelash extensions (highlight present)
- Surgeries (highlight present — details TBD; do not invent procedures)

**Dental**
- Professional cleaning / teeth cleaning education
- Teeth whitening messaging
- Scaling & polishing (associated public dental posts)
- Composite fillings (associated public dental posts)
- Restorative / dento-facial aesthetics (associated specialist posts)

### Specialists — candidates only (do NOT publish until clinic confirms)
| Name | Source | Notes |
|---|---|---|
| Dr. Alina Zahra Naqvi | Public dental listings | BDS RDS · Restorative · Dento-facial esthetics · Candela Medical Complex |
| Dr. Aqsa Rafay | Instagram video attribution | Dental surgeon |
| Dr. Rabia Tariq | Dermafolder | MBBS, FCPS · Dermatologist & Aesthetic Physician · Candela Laser Center |
| Dr. Ahmad Kazmi | Marham | MBBS · Dermatologist · Candela Laser Hospital listing |

### Photography / content readiness
- Current IG visual language: promotional blue/white clinical graphics
- Website direction: **new luxury editorial identity** (not a redesign of IG templates)
- Before/after, specialist portraits, and testimonials require **authorized clinic assets + consent**

---

## 3. Creative Direction

### Concept
**“Quiet Confidence.”**  
A warm, editorial luxury clinic brand — closer to premium aesthetics hospitality than a medical brochure. Soft ivory architecture, champagne metal accents, generous whitespace, and cinematic photography.

### Positioning line (editable)
**Where Science Meets Beauty.**

### Supporting line (editable)
Discover a more confident you through personalized aesthetic and dental care.

### Mood references (direction only — not clones)
- Aesop / Augustinus Bader (quiet luxury, typography-led)
- Four Seasons / Aman spa pages (hospitality calm)
- Premium aesthetic clinics with full-bleed editorial heroes
- Avoid: dental-template cards, blue medical stock UI, crowded offer badges

### Visual rules
- Full-bleed heroes; asymmetric editorial splits
- Gold used sparingly (rules, CTAs, underlines, focus rings)
- No card grids in hero; cards only where interaction needs a container (booking, admin)
- Soft motion: fade/slide reveals, image clip reveals, nav glass transition
- Respect `prefers-reduced-motion`

---

## 4. Design System

### Color tokens
| Token | Hex | Usage |
|---|---|---|
| `--bg-primary` | `#F8F5EF` | Page canvas |
| `--bg-secondary` | `#EDE5D9` | Alternating sections |
| `--accent-gold` | `#C5A46D` | CTAs, borders, accents |
| `--text-primary` | `#302720` | Headings / body |
| `--text-secondary` | `#81786E` | Supporting copy |
| `--white` | `#FFFFFF` | Surfaces / nav scrolled |
| `--gold-soft` | `#C5A46D22` | Subtle washes (sparingly) |
| `--border-subtle` | `#30272014` | Hairlines |

### Typography
| Role | Font | Notes |
|---|---|---|
| Display / H1–H2 | **Cormorant Garamond** | Elegant, editorial |
| Body / UI | **Manrope** | Clean modern sans |
| Navigation / labels | **Manrope** (medium/semibold) | Letter-spacing slightly open |
| Eyebrows / overlines | Manrope uppercase, tracked | Small luxury labels |

Hierarchy sketch:
- Display: 56–88px / 1.05 / weight 500
- H2: 36–48px
- H3: 24–32px
- Body: 16–18px / 1.7
- Caption: 13–14px / secondary color

### Logo treatment (new website wordmark — not claimed as existing official mark)
```
CANDELA
Aesthetics & Dental
```
- `CANDELA` in Cormorant Garamond, tracked
- Subline in Manrope, smaller, warm grey or espresso
- Optional thin champagne rule under brand name
- Favicon: letter **C** in Cormorant on ivory/gold
- Current CMC blue figure mark: archive unless client requests retention in footer “Also known as CMC”

### Core UI components (Phase 2 build list)
- StickyNav (transparent → ivory/blur)
- ButtonPrimary / ButtonGhost / ButtonGoldOutline
- SectionLabel + EditorialHeading
- SplitEditorial (image | copy)
- TreatmentShowcaseItem
- BeforeAfterSlider
- TestimonialQuote
- BookingForm
- WhatsAppFloat
- Toast / Skeleton / Lightbox
- FooterBrand

---

## 5. Information Architecture

### Public routes
| Route | Page |
|---|---|
| `/` | Home |
| `/about` | About Us |
| `/treatments/dental` | Dental Treatments |
| `/treatments/aesthetic` | Aesthetic Treatments |
| `/treatments/:slug` | Treatment detail |
| `/specialists` | Our Specialists |
| `/specialists/:slug` | Specialist profile |
| `/gallery` | Gallery |
| `/contact` | Contact Us |
| `/book` | Book Appointment |
| `/privacy` | Privacy Policy |
| `/terms` | Terms & Conditions |

### Admin routes (protected)
| Route | Page |
|---|---|
| `/admin/login` | Secure login |
| `/admin` | Dashboard overview |
| `/admin/appointments` | Appointment management |
| `/admin/treatments` | CMS treatments |
| `/admin/specialists` | CMS specialists |
| `/admin/gallery` | CMS gallery |
| `/admin/testimonials` | CMS testimonials |
| `/admin/settings` | Contact, hours, WhatsApp |

### Homepage section map
1. Sticky navigation + Book CTA  
2. Cinematic hero  
3. Brand introduction (split editorial)  
4. Dual category: Dental Care / Aesthetic Care  
5. Featured treatments  
6. Why Candela (verified claims only)  
7. Specialists (after confirmation)  
8. Before & After gallery  
9. Testimonials (approved only)  
10. Instagram showcase  
11. Final CTA + WhatsApp  
12. Footer  

---

## 6. Technical Architecture (planned)

```
CMC project/
  frontend/          React + Vite + JS + Tailwind + Framer Motion + React Router
  backend/           FastAPI + SQLAlchemy + Alembic + JWT
  docs/              creative + API notes
```

### Backend domains
Auth · Appointments · Treatments · Doctors · Gallery · Testimonials · Contact/Settings

### Appointment states
`pending` → `confirmed` | `rejected` | `cancelled` · `completed`  
Submitted bookings are **requests only** until admin approval.

### WhatsApp
Configurable env: `VITE_WHATSAPP_NUMBER` / `CLINIC_WHATSAPP_NUMBER`  
Separate from website booking form. Prefilled message template ready; number pending confirmation.

### Database entities
Admin · Appointment · TreatmentCategory · Treatment · Doctor · GalleryImage · Testimonial · ClinicSettings

---

## 7. Content Policy for Build

| Content type | Phase 2 approach |
|---|---|
| Treatments | Seed only Instagram-verified list; CMS for owner expansion |
| Specialists | Placeholder structure; populate after written confirmation |
| Testimonials | Empty or anonymized placeholders until approved quotes provided |
| Before/After | Component built; images gated until consent assets supplied |
| Contact/hours | Use Instagram-verified defaults; editable via admin |
| Prices | Do not hardcode promotional prices unless requested |

---

## 8. Phase 1 Deliverables Checklist

- [x] Inspect project directory  
- [x] Review Instagram brand reference  
- [x] Identify verified services & contact facts  
- [x] Define creative direction & design system  
- [x] Define typography, color, logo treatment  
- [x] Plan IA + full-stack architecture  
- [ ] Client approval to begin Phase 2  

---

## 9. Information Needed Before / During Phase 2

1. Confirm primary brand name for the site header (Candela Aesthetics & Dental vs CMC vs CLC).  
2. Confirm WhatsApp number (0345… or 0332… or another).  
3. Confirm official email for contact form.  
4. Approve / correct treatment list.  
5. Provide approved specialist names, titles, qualifications, portraits.  
6. Provide authorized photography (clinic, treatments, before/after with consent).  
7. Provide approved patient testimonials (or permission to omit initially).  
8. Confirm business hours including Friday / Sunday nuances if any.  
9. Confirm Google Maps pin / exact address line for footer.  
10. Preferred admin email for first superuser account.  

---

## Approval Gate

**Reply with approval (and any corrections) to proceed to PHASE 2 — Frontend Development.**  
No scaffolding or implementation will start until you approve this creative direction.
