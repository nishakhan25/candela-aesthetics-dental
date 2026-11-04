from __future__ import annotations

import json
from datetime import date, timedelta

import urllib.error
import urllib.parse
import urllib.request

BASE = "http://127.0.0.1:8000/api"


def req(method: str, path: str, data=None, token: str | None = None):
    headers = {"Content-Type": "application/json"}
    if token:
        headers["Authorization"] = f"Bearer {token}"
    body = None if data is None else json.dumps(data).encode("utf-8")
    request = urllib.request.Request(
        f"{BASE}{path}", data=body, headers=headers, method=method
    )
    try:
        with urllib.request.urlopen(request) as response:
            raw = response.read().decode("utf-8")
            return response.status, json.loads(raw) if raw else None
    except urllib.error.HTTPError as exc:
        raw = exc.read().decode("utf-8")
        try:
            payload = json.loads(raw) if raw else None
        except json.JSONDecodeError:
            payload = raw
        return exc.code, payload


def main():
    status, health = req("GET", "/health")
    assert status == 200, health
    print("health ok", health)

    status, treatments = req("GET", "/treatments")
    assert status == 200 and len(treatments) >= 1, treatments
    print("treatments", len(treatments))

    status, login = req(
        "POST",
        "/auth/login-json",
        {"email": "admin@candelaclinic.com", "password": "ChangeThisPassword123!"},
    )
    assert status == 200 and login.get("access_token"), login
    token = login["access_token"]
    print("login ok")

    status, me = req("GET", "/auth/me", token=token)
    assert status == 200, me
    print("me", me["email"], me["role"])

    day = (date.today() + timedelta(days=3)).isoformat()
    payload = {
        "full_name": "Smoke Test Patient",
        "phone": "03001234567",
        "email": "smoke@example.com",
        "category": "aesthetic",
        "treatment_slug": "hydrafacial",
        "preferred_date": day,
        "preferred_time": "04:00 PM",
        "message": "Phase 3 smoke test",
    }
    status, created = req("POST", "/appointments", payload)
    assert status == 201, created
    assert created["status"] == "pending", created
    print("appointment created", created["appointment_id"])

    status, dup = req("POST", "/appointments", payload)
    assert status == 409, dup
    print("duplicate blocked", dup)

    status, dash = req("GET", "/appointments/dashboard", token=token)
    assert status == 200 and dash["pending"] >= 1, dash
    print("dashboard", dash)

    status, settings = req("GET", "/contact/settings")
    assert status == 200, settings
    print("settings keys", sorted(settings["settings"].keys())[:5], "...")

    print("SMOKE PASS")


if __name__ == "__main__":
    main()
