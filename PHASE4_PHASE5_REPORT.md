# PHASE 4 & 5 — Integration + QA Report

**Status:** Complete  
**Frontend:** http://localhost:5173  
**Admin:** http://localhost:5173/admin/login  
**API:** http://127.0.0.1:8000/api/docs

---

## Phase 4 completed

- Connected React to FastAPI via Vite proxy (`/api`)
- Auth context + JWT storage for admin
- Clinic settings context (phones, WhatsApp, hours, etc.)
- Full admin dashboard:
  - Login (protected)
  - Overview stats + recent bookings
  - Appointment approve / reject / reschedule / status changes
  - Treatments CMS
  - Specialists CMS (publish flag)
  - Gallery CMS
  - Testimonials CMS
  - Clinic settings (including WhatsApp number)
- Public booking posts real appointment **requests**
- Specialists / testimonials / gallery / contact / footer pull live API data with safe fallbacks
- WhatsApp float/CTAs use admin-configured number (no invented hardcode)

## Phase 5 QA performed

### API checklist (`backend/scripts/phase45_qa.py`) — ALL PASS
- Health
- Public treatments
- Admin login + `/auth/me`
- Appointments require auth
- Booking creates `pending`
- Admin can confirm
- WhatsApp settings save
- Unpublished doctors hidden from public

### Frontend checks
- Production build succeeds
- Admin login → dashboard loads with live stats
- Booking page loads
- Protected `/admin` redirects when logged out

### Known intentional states
- Specialists empty publicly until published in admin
- Testimonials empty until approved content is published
- Gallery falls back to placeholders until published items exist

## Admin credentials (dev)

- URL: `/admin/login`
- Email: `admin@candelaclinic.com`
- Password: `ChangeThisPassword123!`

## How to run

Terminal 1:
```bash
cd backend
.\.venv\Scripts\activate
uvicorn app.main:app --reload --port 8000
```

Terminal 2:
```bash
cd frontend
npm run dev
```

## Remaining optional polish

- Code-split admin routes to reduce bundle size
- Dedicated contact inbox table (currently settings audit field)
- Real clinic photography / consented before-after assets
- Production SECRET_KEY + DB credentials rotation
