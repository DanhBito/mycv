# CLAUDE.md

## Project

Personal CV/resume project. Remote: https://github.com/DanhBito/mycv.git

## Stack

NuxtJS 3 + Tailwind CSS + TypeScript. SSR mode (not SSG). Deploy target: VPS + PM2.

## Commands

- `npm run dev` — start dev server
- `npm run build` — production build
- `node .output/server/index.mjs` — run production server

## Architecture

- `data/cv.json` — single source of truth for all CV content
- `server/api/` — Nitro API routes (CRUD, auth, PDF download)
- `server/middleware/auth.ts` — protects admin PUT endpoints
- `types/cv.ts` — TypeScript interfaces for CV data
- `components/` — 8 public + 13 admin components
- `pages/index.vue` — public CV page (fetches from /api/cv)
- `pages/admin.vue` — admin panel (login + section editors)
- `public/cv/` — PDF files for download

## Environment Variables

- `NUXT_ADMIN_PASSWORD` — admin login password
- `NUXT_SESSION_PASSWORD` — session encryption key (32+ chars)

## Tag Colors

Tags use 4 colors mapped by tech domain:
- `tag-green` — Java ecosystem, DevOps
- `tag-cyan` — Databases, APIs
- `tag-orange` — Frontend, Message Queue
- `tag-purple` — PHP ecosystem, Architecture
