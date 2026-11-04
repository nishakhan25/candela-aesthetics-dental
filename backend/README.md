# Candela Backend (Phase 3)

FastAPI + SQLAlchemy + PostgreSQL + Alembic + JWT admin auth.

## Setup

```bash
cd backend
python -m venv .venv
.\.venv\Scripts\activate
pip install -r requirements.txt
copy .env.example .env   # then edit DATABASE_URL / SECRET_KEY / ADMIN_*
alembic upgrade head
python scripts\seed.py
uvicorn app.main:app --reload --port 8000
```

Docs: http://127.0.0.1:8000/api/docs

## Default admin (from .env)

- Email: `admin@candelaclinic.com` (from `ADMIN_EMAIL`)
- Password: `ChangeThisPassword123!` (from `ADMIN_PASSWORD`)

Change immediately for production.

## Key endpoints

Public:
- `POST /api/appointments` — appointment **request** only
- `GET /api/treatments`, `GET /api/treatments/{slug}`
- `GET /api/categories`
- `GET /api/doctors` (published only)
- `GET /api/gallery`
- `GET /api/testimonials`
- `GET /api/contact/settings`
- `POST /api/contact`

Admin (Bearer JWT):
- `POST /api/auth/login` or `/api/auth/login-json`
- `GET /api/appointments`, `/api/appointments/dashboard`
- `PATCH /api/appointments/{id}/status`
- `PATCH /api/appointments/{id}/reschedule`
- CRUD for treatments, doctors, gallery, testimonials, settings
