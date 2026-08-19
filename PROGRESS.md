# Project status — read this first in any new session

Portfolio site for Sarthak Tarar. Use this doc to pick up where things left off
if the conversation/session restarted.

## Decisions locked in

- **Frontend:** React (Vite) + Tailwind CSS v4 + Framer Motion, in `frontend/`.
- **Backend:** FastAPI, single endpoint (`POST /api/contact`), no database.
- **Email delivery:** Resend API (free tier, 3,000/mo).
- **Deployment:** Single Vercel project — frontend build + FastAPI as one
  Python serverless function under `/api`, wired via `vercel.json` rewrites.
- **Theme:** Dark, neon purple/blue/green, glassmorphism + glow-border cards,
  scroll animations via Framer Motion.
- User wants to learn React syntax/patterns as we go — see `REACT_NOTES.md`
  at repo root, which explains every React concept used, tied to real code.
  **Keep updating that file whenever new React patterns get introduced.**

## What's built

- `frontend/src/data/resumeData.js` — single source of truth for all site
  content (profile, skills, experience, projects, certifications, education).
  Edit resume facts here, not in the components.
- All sections built: Navbar, Hero, About (summary + skills + education),
  Experience (timeline), Projects (cards), Certifications, Contact (form),
  Footer. Assembled in `frontend/src/App.jsx`.
- Contact form: `react-hook-form` + `zod` validation, POSTs JSON to
  `/api/contact`, includes a honeypot field (frontend `Contact.jsx` +
  backend `api/index.py`) for basic bot protection.
- Backend `api/index.py`: FastAPI app, validates payload with Pydantic,
  sends via Resend (`resend.Emails.send`), reads `RESEND_API_KEY` and
  `CONTACT_TO_EMAIL` from env vars. Local dev: `.env` file (see
  `.env.example`), loaded via `python-dotenv` if installed.
- Fixed a theme-token conflict in `frontend/src/index.css`: shadcn's
  default light/dark palette was overriding the custom neon tokens: the
  `.dark { ... }` block now maps shadcn's `--background`/`--border`/etc.
  onto the custom `--color-bg`/`--color-neon-purple`/etc. tokens, and
  `<html class="dark">` is set in `index.html` (site is dark-only, no toggle).
- Swapped `lucide-react`'s `Github`/`Linkedin` icons (not present in the
  installed lucide-react version — brand icons were dropped) for
  `react-icons/fa6`'s `FaGithub`/`FaLinkedin`.
- Verified: `npm run build` succeeds clean in `frontend/`. Backend starts
  with `uvicorn api.index:app --port 8000` and correctly validates/rejects
  requests (tested via curl — a submission without `RESEND_API_KEY` set
  correctly 500s with a clear error, as expected).
- Visually verified in Chrome by the user (dev servers work, no
  `claude-in-chrome` tool access from this session — user drives the
  browser and reports back/shares screenshots).
- All real links now in `resumeData.js`: LinkedIn, GitHub profile, all 4
  project repo links, all 5 cert/paper links (extracted from the resume
  PDF's link annotations via `pypdf`, since the visible PDF text doesn't
  carry the underlying URLs).
- Education section extended with the two schools (HSC + SSC) the user
  left off the 1-page resume — see `education` array in `resumeData.js`.
- About section eyebrow text changed from "Get to know me" to "Who I am"
  (grammar/redundancy fix, paired with the "About" heading).

## Still blocking full completion — need from the user

- `.env` has a real `RESEND_API_KEY` locally now and the contact form was
  verified end-to-end (test submission delivered to
  `sarthaktarar750@gmail.com`). Still need the same `RESEND_API_KEY` and
  `CONTACT_TO_EMAIL` added to Vercel's project env vars before production
  deploy — local `.env` is gitignored and won't carry over.

## Not yet done

- Git repo setup / GitHub push / Vercel import (explained the flow to the
  user, haven't executed it — waiting until content is finalized).
- **Heads-up:** `C:\Users\sarthak` (the whole user home folder) is itself
  a git repo root with no commits — almost certainly unintentional. Do not
  run git add/commit there. When setting up git for real, `git init` a
  fresh repo scoped to `Portfolio/` specifically (it'll take precedence
  for anything inside it without touching the outer one).
- Resume PDF is already in `frontend/public/Sarthak_Tarar_Resume.pdf` —
  download link works.

## How to resume local dev

```
# backend (from repo root)
.venv/Scripts/python.exe -m uvicorn api.index:app --reload --port 8000

# frontend (from frontend/)
npm run dev
```
Vite proxies `/api/*` to `localhost:8000` (see `vite.config.js`), so the
site only needs to be opened at `http://localhost:5173`.

**Gotcha:** `uvicorn --reload` on Windows spawns the actual worker as a
separate `multiprocessing` child process. Killing the parent PID (e.g. via
`Stop-Process`) does NOT kill that child — it's orphaned but keeps holding
the port and serving requests with whatever env vars it started with
(stale `.env` values included). If a `.env` change doesn't seem to take
effect after a restart, check for orphaned workers:
`Get-CimInstance Win32_Process -Filter "Name='python.exe'"` and look for
one with a dead parent PID, then `taskkill /PID <id> /F` it directly.
