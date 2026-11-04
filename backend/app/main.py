from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.config import get_settings
from app.routers import (
    appointments,
    auth,
    contact,
    doctors,
    gallery,
    testimonials,
    treatments,
)

settings = get_settings()

app = FastAPI(
    title=settings.app_name,
    version="1.0.0",
    docs_url="/api/docs",
    redoc_url="/api/redoc",
    openapi_url="/api/openapi.json",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origin_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

api = settings.api_prefix
app.include_router(auth.router, prefix=api)
app.include_router(appointments.router, prefix=api)
app.include_router(treatments.router, prefix=api)
app.include_router(doctors.router, prefix=api)
app.include_router(gallery.router, prefix=api)
app.include_router(testimonials.router, prefix=api)
app.include_router(contact.router, prefix=api)


@app.get("/")
def root():
    return {
        "message": "Candela Aesthetics & Dental API",
        "docs": "/api/docs",
        "health": "/api/health",
    }


@app.get(f"{api}/health")
def health():
    return {"status": "ok", "env": settings.app_env}
