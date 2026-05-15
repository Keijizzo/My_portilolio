# Kaiza Mgina — Cloud Portfolio

Full-stack personal portfolio: **React (Vite)** frontend on **Vercel**, **Django REST** API on **Render**.

## Project structure

```
portfolio-project/
├── frontend/     # React + Tailwind + Axios + Framer Motion
├── backend/      # Django + DRF + SQLite (dev)
└── README.md
```

## Prerequisites

- Node.js 18+
- Python 3.11+
- Git

---

## Local setup

### 1. Backend

```bash
cd backend
python -m venv venv

# Windows
venv\Scripts\activate

# macOS/Linux
# source venv/bin/activate

pip install -r requirements.txt
copy .env.example .env   # Windows
# cp .env.example .env   # macOS/Linux

python manage.py migrate
python manage.py seed_portfolio
python manage.py createsuperuser
python manage.py runserver
```

API runs at **http://127.0.0.1:8000**

| Endpoint | Method |
|----------|--------|
| `/api/profile/` | GET |
| `/api/skills/` | GET |
| `/api/projects/` | GET |
| `/api/contact/` | POST |

Admin: **http://127.0.0.1:8000/admin/**

### 2. Frontend

```bash
cd frontend
npm install
copy .env.example .env   # Windows
# cp .env.example .env   # macOS/Linux
```

Set in `frontend/.env`:

```
VITE_API_URL=http://127.0.0.1:8000
```

```bash
npm run dev
```

App runs at **http://localhost:5173**

---

## Environment variables

### Frontend (Vercel)

| Variable | Example |
|----------|---------|
| `VITE_API_URL` | `https://your-api.onrender.com` |

### Backend (Render)

| Variable | Example |
|----------|---------|
| `SECRET_KEY` | (auto-generate on Render) |
| `DEBUG` | `False` |
| `ALLOWED_HOSTS` | `your-api.onrender.com` |
| `CORS_ALLOWED_ORIGINS` | `https://your-app.vercel.app` |

---

## Deploy backend (Render)

1. Push this repo to GitHub.
2. On [Render](https://render.com), create a **Web Service** from the repo.
3. Set **Root Directory** to `backend`.
4. **Build command:**
   ```bash
   pip install -r requirements.txt && python manage.py migrate && python manage.py collectstatic --noinput
   ```
5. **Start command:**
   ```bash
   gunicorn config.wsgi --log-file -
   ```
6. Add environment variables from the table above.
7. After first deploy, open the Render shell and run:
   ```bash
   python manage.py seed_portfolio
   python manage.py createsuperuser
   ```

Or use the included `render.yaml` Blueprint.

---

## Deploy frontend (Vercel)

1. Import the GitHub repo on [Vercel](https://vercel.com).
2. Set **Root Directory** to `frontend`.
3. Framework preset: **Vite**.
4. Add environment variable:
   - `VITE_API_URL` = your Render API URL (no trailing slash)
5. Deploy.

`vercel.json` handles SPA routing for React Router.

---

## Post-deploy checklist

- [ ] `VITE_API_URL` points to live Render URL
- [ ] `CORS_ALLOWED_ORIGINS` includes your Vercel URL
- [ ] `ALLOWED_HOSTS` includes Render hostname
- [ ] Home page loads profile, skills, projects
- [ ] Contact form POST succeeds
- [ ] Messages visible in Django admin

---

## Tech stack

| Layer | Stack |
|-------|--------|
| Frontend | React, Vite, Tailwind CSS, Axios, Framer Motion, React Router |
| Backend | Django, Django REST Framework, django-cors-headers |
| Deploy | Vercel (frontend), Render (backend) |
