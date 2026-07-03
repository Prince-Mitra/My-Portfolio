# Portfolio — Full-Stack Website

A production-shaped personal portfolio: public site (Home/About/Skills/Projects/Blog/Resume/Contact)
backed by a real API and database, plus a protected single-admin dashboard to manage Projects and
Blog posts.

**Stack:** React (Vite) + Tailwind + Framer Motion · Node/Express · PostgreSQL via Prisma ·
JWT + bcrypt auth (httpOnly cookie) · Cloudinary image uploads · Resend for the contact form ·
React Query for all data fetching.

## Architecture

```
client (React/Vite)  ──HTTP (withCredentials)──▶  server (Express)
                                                      │
                                          routes → controllers → services → Prisma
                                                      │
                                                 PostgreSQL (Neon/Render)
                                                      │
                                                 Cloudinary (images)
                                                 Resend (contact emails)
```

## Folder structure

```
portfolio/
├── client/     React frontend (Vite)
├── server/     Express API (service-layer architecture)
└── docker-compose.yml   optional local Postgres
```

See inline comments in `server/src` for the routes → controllers → services → Prisma flow, and
`client/src` for components/pages/api/context.

## 1. Local setup

### Database
Either run Postgres locally:
```bash
docker compose up -d
# connection string: postgresql://portfolio:portfolio@localhost:5432/portfolio
```
or create a free instance on [Neon](https://neon.tech) and use that connection string instead.

### Backend
```bash
cd server
cp .env.example .env
# fill in DATABASE_URL, JWT_SECRET, ADMIN_EMAIL, ADMIN_PASSWORD (Cloudinary/Resend optional locally)
npm install
npx prisma migrate dev --name init
npm run seed        # creates your admin account from ADMIN_EMAIL / ADMIN_PASSWORD
npm run dev          # http://localhost:5000
```

### Frontend
```bash
cd client
cp .env.example .env   # VITE_API_URL=http://localhost:5000/api
npm install
npm run dev             # http://localhost:5173
```

Visit `http://localhost:5173/admin` and log in with the admin credentials you seeded to add
projects and blog posts — they'll immediately appear on the public site.

Drop your résumé at `client/public/resume.pdf` (the Hero "Download résumé" button links to it).

## 2. API overview

| Method | Route | Auth |
|---|---|---|
| POST | `/api/auth/login` | public (rate-limited) |
| POST | `/api/auth/logout` | public |
| GET | `/api/auth/me` | protected |
| GET | `/api/projects` | public |
| GET | `/api/projects/:slug` | public |
| POST/PUT/DELETE | `/api/projects` | protected |
| GET | `/api/blogs` | public (published only) |
| GET | `/api/blogs/admin/all` | protected (drafts included) |
| GET | `/api/blogs/:slug` | public |
| POST/PUT/DELETE | `/api/blogs` | protected |
| POST | `/api/contact` | public (rate-limited) |
| POST | `/api/upload` | protected (Cloudinary) |

Every response uses the same envelope:
```json
{ "success": true, "message": "…", "data": {} }
{ "success": false, "message": "…" }
```
List endpoints support `?page=&limit=` and return `{ items, total, page, totalPages }`.

## 3. Deployment

**Database:** Neon (or Render Postgres) — copy the connection string into `DATABASE_URL`.

**Backend (Railway recommended):**
1. Push `server/` to GitHub, create a Railway service with root dir `server`
2. Build: `npm install && npx prisma generate && npx prisma migrate deploy`
3. Start: `node src/server.js`
4. Add all `.env.example` vars in the dashboard, then run `npm run seed` once via Railway's shell

**Frontend (Vercel):**
1. Push `client/` to GitHub, import on Vercel with root dir `client`
2. Set `VITE_API_URL=https://<your-api-domain>/api`
3. Deploy

**CORS:** set `CLIENT_URL` on the backend to your deployed frontend origin so the httpOnly auth
cookie is accepted.

## 4. Notes

- Auth token lives in an **httpOnly cookie**, not localStorage — protects against XSS token theft.
- Controllers never touch Prisma directly; all queries and business rules live in `server/src/services`.
- Rate limits: login 8/min, contact 4/min, public GETs 100/min (see `rateLimit.middleware.js`).
- Every list/detail fetch on the frontend has three explicit UI states — loading, success (with an
  empty-state fallback), and error with retry — plus a top-level Error Boundary so a runtime crash
  never shows a blank white screen.
