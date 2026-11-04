# Candela Aesthetics & Dental — Frontend

React + Vite + Tailwind CSS luxury clinic website (Phase 2).

## Scripts

```bash
npm install
npm run dev
npm run build
npm run preview
```

## Environment

Copy `.env.example` to `.env` and set:

- `VITE_WHATSAPP_NUMBER` — digits only, country code included when ready (e.g. `923454119939`)
- `VITE_CLINIC_EMAIL`
- `VITE_API_URL` — defaults to `/api` (proxied to FastAPI in Phase 3+)

## Notes

- Specialists and testimonials intentionally empty until clinic verification
- Gallery uses Unsplash placeholders
- Appointment form submits as a **request**; never auto-confirms
