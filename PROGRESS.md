# Project status — read this first in any new session

Portfolio site for Sarthak Tarar. Use this doc to pick up where things left off
if the conversation/session restarted.

## Decisions locked in

- **Frontend:** React (Vite) + Tailwind CSS v4 + Framer Motion, in `frontend/`.
- **Backend:** FastAPI, single endpoint (`POST /api/contact`), no database.
- **Email delivery:** Resend API (free tier, 3,000/mo).
- **Deployment:** Single Vercel project — frontend build + FastAPI as one
  Python serverless function under `/api`, wired via `vercel.json` rewrites.
  **Live at:** https://sarthakt.vercel.app/ (renamed from the original
  auto-generated `portfolio-eight-ruby-48.vercel.app` — that old alias is
  now dead and returns `DEPLOYMENT_NOT_FOUND`, so don't reference it).
- **Repo:** https://github.com/SarthakTarar/Portfolio (public), branch `main`.
  Pushing to `main` auto-redeploys on Vercel.
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
  backend `api/index.py`) for basic bot protection. **Verified end-to-end
  in production** — real Resend delivery confirmed to
  `sarthaktarar750@gmail.com`.
- Backend `api/index.py`: FastAPI app, validates payload with Pydantic,
  sends via Resend (`resend.Emails.send`), reads `RESEND_API_KEY` and
  `CONTACT_TO_EMAIL` from env vars. Local dev: `.env` file (see
  `.env.example`), loaded via `python-dotenv` if installed. Same two vars
  are set in Vercel's project env vars for production.
- All real links live in `resumeData.js`: LinkedIn, GitHub profile, all 4
  project repo links, all 5 cert/paper links (originally extracted from the
  resume PDF's link annotations via `pypdf`, since the visible PDF text
  doesn't carry the underlying URLs).
- Two projects now have live deployed demos, rendered as a "Live Demo" link
  on the project card (`Projects.jsx`) next to "View on GitHub":
  - Employee Management System —
    https://employee-management-system-two-livid.vercel.app
    (demo login shown on the card: `demo` / `Orbit5965!`)
  - Crop Recommendation System —
    https://crop-recommendation-ml.vercel.app/
- Skills list (`skillGroups` in `resumeData.js`) expanded beyond the 1-page
  resume, curated from what's actually installed/used on this machine
  (cross-checked pip packages + VS Code extensions against real project
  evidence, not just installed-but-unused tooling):
  Django REST Framework, WebSockets (Socket.IO), Java, Spring Boot (added to
  Backend & Frameworks); PyTorch, OpenCV (Automation & AI); MongoDB
  (Databases — was already used in the Bank API project but missing from
  the skills list); Maven, Gradle, Streamlit (Tools).
- Education section extended with the two schools (HSC + SSC) the user
  left off the 1-page resume — see `education` array in `resumeData.js`.
- About section eyebrow text changed from "Get to know me" to "Who I am"
  (grammar/redundancy fix, paired with the "About" heading).
- Published an "Interview Runbook" artifact — a changelog + 30-question
  interview prep bank pulled from the actual stack/project bullets, for the
  user's own reference (not part of the site itself).
- Custom neon cursor (`frontend/src/components/Cursor.jsx`, mounted in
  `App.jsx`): a precise dot plus a spring-trailing ring (Framer Motion
  `useMotionValue`/`useSpring`) that grows and glows over interactive
  elements, and shows a contextual label — `CODE` / `DEMO` on project card
  links (`data-cursor` attributes in `Projects.jsx`), `GET` on the Resume
  download (`Navbar.jsx`). Only enables on a real mouse with motion allowed
  (`matchMedia("(hover: hover) and (pointer: fine)")` +
  `prefers-reduced-motion` check) — native cursor stays untouched on touch
  devices and for anyone who's opted out of motion. New Framer Motion
  pattern (motion values/springs, not just `animate`/`whileInView`) — see
  REACT_NOTES.md §11.

## Deployment gotcha (already fixed, worth knowing)

Root `requirements.txt` lists `fastapi`, which made Vercel auto-detect the
**whole project** as a FastAPI framework preset. Per Vercel's own docs, a
detected framework preset "takes precedence over file-based functions" and
routes *every* request through it — so `/`, `/favicon.ico`, everything hit
`api/index.py` and crashed with `ModuleNotFoundError: No module named
'resend'` (the framework-preset build path also skipped the automatic
`requirements.txt` install that normally applies to standalone `/api`
functions). Fixed by adding `"framework": null` to `vercel.json`, which
forces "Other" and restores the intended split: static frontend from
`frontend/dist`, `api/index.py` as an independent file-based function for
`/api/*` only. **If a future change to `requirements.txt` or `vercel.json`
somehow removes that line, the site will silently 500 on every route again.**

## Still blocking full completion — need from the user

Nothing blocking right now. Optional next steps if the user wants them:
- A custom domain instead of the `.vercel.app` one (needs to be purchased
  from a registrar first, then added under Vercel → Settings → Domains).
- Live demo links for the other two projects (Image Classification API,
  Bank API) if/when those get deployed somewhere.

## Not yet done

- **Heads-up:** `C:\Users\sarthak` (the whole user home folder) is itself
  a git repo root with no commits — almost certainly unintentional. Do not
  run git add/commit there. The `Portfolio/` repo (`git init` done, see
  above) takes precedence for anything inside it without touching the
  outer one.

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
