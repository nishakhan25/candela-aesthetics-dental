"""Phase 4/5 API QA checklist."""

from __future__ import annotations

import json
from datetime import date, timedelta
from urllib import error, request

BASE = "http://127.0.0.1:8000/api"


def call(method: str, path: str, data=None, token: str | None = None):
    headers = {"Content-Type": "application/json"}
    if token:
        headers["Authorization"] = f"Bearer {token}"
    body = None if data is None else json.dumps(data).encode()
    req = request.Request(f"{BASE}{path}", data=body, headers=headers, method=method)
    try:
        with request.urlopen(req) as res:
            raw = res.read().decode()
            return res.status, json.loads(raw) if raw else None
    except error.HTTPError as exc:
        raw = exc.read().decode()
        try:
            payload = json.loads(raw) if raw else None
        except json.JSONDecodeError:
            payload = raw
        return exc.code, payload


def main():
    checks = []

    def check(name, ok, detail=None):
        checks.append((name, ok, detail))
        print(("PASS" if ok else "FAIL"), "-", name, detail or "")

    status, health = call("GET", "/health")
    check("health", status == 200, health)

    status, treatments = call("GET", "/treatments")
    check("public treatments", status == 200 and len(treatments) >= 1, len(treatments))

    status, login = call(
        "POST",
        "/auth/login-json",
        {"email": "admin@candelaclinic.com", "password": "ChangeThisPassword123!"},
    )
    token = login.get("access_token") if isinstance(login, dict) else None
    check("admin login", status == 200 and bool(token))

    status, me = call("GET", "/auth/me", token=token)
    check("admin me protected", status == 200, me.get("email") if isinstance(me, dict) else me)

    status, denied = call("GET", "/appointments")
    check("appointments require auth", status == 401)

    day = (date.today() + timedelta(days=5)).isoformat()
    payload = {
        "full_name": "Phase45 QA Patient",
        "phone": "03009876543",
        "email": "qa45@example.com",
        "category": "dental",
        "treatment_slug": "scaling-and-polishing",
        "preferred_date": day,
        "preferred_time": "11:00 AM",
        "message": "QA booking",
    }
    status, created = call("POST", "/appointments", payload)
    check("booking request pending", status == 201 and created.get("status") == "pending", created)

    appt_id = created.get("appointment_id")
    status, confirmed = call(
        "PATCH",
        f"/appointments/{appt_id}/status",
        {"status": "confirmed", "admin_notes": "QA confirmed"},
        token=token,
    )
    check("admin confirm appointment", status == 200 and confirmed.get("status") == "confirmed")

    status, settings = call(
        "PUT",
        "/contact/settings",
        {"settings": {"whatsapp_number": "923454119939"}},
        token=token,
    )
    check(
        "admin save whatsapp",
        status == 200 and settings.get("settings", {}).get("whatsapp_number") == "923454119939",
    )

    status, doctor = call(
        "POST",
        "/doctors",
        {
            "name": "QA Specialist Draft",
            "slug": "qa-specialist-draft",
            "title": "Draft only",
            "is_published": False,
        },
        token=token,
    )
    check("create unpublished doctor", status == 201 and doctor.get("is_published") is False)

    status, public_docs = call("GET", "/doctors")
    check(
        "unpublished doctor hidden",
        status == 200 and all(d.get("slug") != "qa-specialist-draft" for d in public_docs),
    )

    failed = [c for c in checks if not c[1]]
    print("\nRESULT:", "ALL PASS" if not failed else f"{len(failed)} FAILED")
    raise SystemExit(0 if not failed else 1)


if __name__ == "__main__":
    main()
