"""
FastAPI backend for the portfolio's "Connect with me" form.

Deployed on Vercel as a single Python serverless function (see /vercel.json,
which rewrites every /api/* request to this file). Locally, run it with:

    uvicorn api.index:app --reload --port 8000

No database — the only job here is: validate the submission, then hand it
to Resend to deliver as an email. Resend needs RESEND_API_KEY and
CONTACT_TO_EMAIL set as environment variables (see .env.example).
"""

import os

try:
    from dotenv import load_dotenv  # only present locally, see requirements-dev.txt

    load_dotenv()
except ImportError:
    pass

import resend
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, EmailStr, Field

app = FastAPI(title="Portfolio Contact API")

RESEND_API_KEY = os.environ.get("RESEND_API_KEY")
CONTACT_TO_EMAIL = os.environ.get("CONTACT_TO_EMAIL")


class ContactPayload(BaseModel):
    name: str = Field(min_length=2, max_length=100)
    email: EmailStr
    organization: str | None = Field(default=None, max_length=150)
    purpose: str = Field(min_length=10, max_length=2000)
    website: str = Field(default="", max_length=200)  # honeypot, must stay empty


@app.post("/api/contact")
def send_contact_message(payload: ContactPayload):
    # Honeypot tripped — behave as if it worked so bots don't learn to adapt,
    # but skip the actual email send.
    if payload.website:
        return {"status": "ok"}

    if not RESEND_API_KEY or not CONTACT_TO_EMAIL:
        raise HTTPException(
            status_code=500,
            detail="Contact form is not configured (missing RESEND_API_KEY or CONTACT_TO_EMAIL).",
        )

    resend.api_key = RESEND_API_KEY

    org_line = f"<p><strong>Organization:</strong> {payload.organization}</p>" if payload.organization else ""

    try:
        resend.Emails.send(
            {
                "from": "Portfolio Contact <onboarding@resend.dev>",
                "to": [CONTACT_TO_EMAIL],
                "reply_to": payload.email,
                "subject": f"Portfolio contact from {payload.name}",
                "html": (
                    f"<p><strong>Name:</strong> {payload.name}</p>"
                    f"<p><strong>Email:</strong> {payload.email}</p>"
                    f"{org_line}"
                    f"<p><strong>Message:</strong></p>"
                    f"<p>{payload.purpose}</p>"
                ),
            }
        )
    except Exception as exc:
        print(f"Resend send failed: {exc}")
        raise HTTPException(status_code=502, detail="Could not send message. Try again shortly.")

    return {"status": "ok"}


@app.get("/api/contact")
def health_check():
    return {"status": "contact API is up"}
