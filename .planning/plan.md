# Implementation Plan - Sanity Integration (Monorepo)

## Overview

Restructure project as monorepo with Sanity CMS, using pnpm workspaces only (no Turbo needed for 2-app setup).

---

## Phase 0: Monorepo Restructure

**Goal**: Convert current structure to monorepo with `apps/web` and `apps/studio`.

**Duration**: ~1 hour

### Tasks

| Task | Description | Status |
|------|-------------|--------|
| 0.1 | Create `apps/` folder structure | Pending |
| 0.2 | Create `pnpm-workspace.yaml` | Pending |
| 0.3 | Create root `package.json` with workspace scripts | Pending |
| 0.4 | Move frontend to `apps/web/` | Pending |
| 0.5 | Move Sanity to `apps/studio/` | Pending |
| 0.6 | Update `apps/web/astro.config.mjs` paths | Pending |
| 0.7 | Update `apps/web/tsconfig.json` paths | Pending |
| 0.8 | Create shared `.env` at root | Pending |
| 0.9 | Run `pnpm install` from root | Pending |
| 0.10 | Test `pnpm --filter web dev` works | Pending |
| 0.11 | Test `pnpm --filter studio dev` works | Pending |
| 0.12 | Test `pnpm -r dev` runs both apps | Pending |
| 0.13 | Test `pnpm -r build` builds both | Pending |
| 0.14 | Clean up old files/folders at root | Pending |

### Key Decisions
- **pnpm workspaces only** - no Turbo (verified sufficient for 2-app setup)
- Vercel/Netlify auto-detects pnpm monorepos and skips unchanged builds
- Single `.env` at root for shared variables
- Each app in `apps/` folder

---

## Phase 1: Sanity Schema Restructure ✅ COMPLETE

**Goal**: Create proper schema structure with documents and objects.

**Status**: Completed

### What Was Done
- Created 24 schema types (documents, sections, nested objects, utilities)
- Singleton pattern for siteSettings and homePage
- Icon selector with 80+ Lucide icons
- Native Sanity color picker
- Initial values matching current frontend

### Remaining Tasks

| Task | Description | Status |
|------|-------------|--------|
| 1.11 | Test in Sanity Studio locally (after monorepo restructure) | Pending |
| 1.12 | Seed initial content from defaults | Pending |

---

## Phase 2: Frontend Integration ✅ COMPLETE

**Goal**: Connect frontend to new Sanity structure.

**Status**: Completed (2026-04-23)

### What Was Done
- Created TypeScript types for all Sanity data
- Rewrote GROQ queries for new document structure
- Created data transformers (color → Tailwind, icon extraction)
- Built DynamicIcon component (124 Lucide icons)
- Built SectionRenderer for dynamic section rendering
- Updated Layout.astro with SEO props
- Updated Footer.astro with footerTitle/footerDescription
- Updated Contact.tsx with expanded props
- Updated index.astro for Sanity integration
- Created [slug].astro for dynamic pages

### Remaining Tasks

| Task | Description | Status |
|------|-------------|--------|
| 2.13 | Test dev server with Sanity data | Pending |
| 2.14 | Run typecheck | Pending |
| 2.15 | Run production build | Pending |
| 2.16 | Verify fallback behavior | Pending |

---

## Phase 3: Live Preview (Optional)

**Goal**: Enable live preview for content editors.

**Duration**: ~4-6 hours

### Tasks

| Task | Description | Status |
|------|-------------|--------|
| 3.1 | Create preview API routes | Pending |
| 3.2 | Configure preview-aware data fetching | Pending |
| 3.3 | Set up preview deployment | Pending |
| 3.4 | Install Presentation Tool plugin | Pending |
| 3.5 | Configure preview URL mapping | Pending |
| 3.6 | Test draft preview workflow | Pending |
| 3.7 | Document preview usage | Pending |

---

## Phase 4: Production Deployment

**Goal**: Deploy monorepo with both apps.

**Duration**: ~1-2 hours

### Tasks

| Task | Description | Status |
|------|-------------|--------|
| 4.1 | Configure Vercel/Netlify for monorepo | Pending |
| 4.2 | Create `apps/web/vercel.json` or `netlify.toml` | Pending |
| 4.3 | Create `apps/studio/vercel.json` or deploy to Sanity hosting | Pending |
| 4.4 | Set up build webhook for content-triggered rebuilds | Pending |
| 4.5 | Configure CORS and API origins in Sanity dashboard | Pending |
| 4.6 | Create content editor documentation | Pending |
| 4.7 | Production build and deploy verification | Pending |

---

## Final File Structure

```
alchemy-website-astro/
├── package.json                  # Root workspace package (scripts only)
├── pnpm-workspace.yaml           # Workspace definition
├── .env                          # Shared environment (SANITY_PROJECT_ID)
├── .gitignore                    # Updated for monorepo
│
├── apps/
│   ├── web/                      # Frontend (Astro)
│   │   ├── package.json
│   │   ├── astro.config.mjs
│   │   ├── tsconfig.json
│   │   ├── src/
│   │   │   ├── lib/
│   │   │   │   ├── sanity.ts     # Sanity client
│   │   │   │   ├── content.ts    # Data fetching
│   │   │   │   └── types/
│   │   │   │       └── sanity.ts # TypeScript types
│   │   │   ├── components/
│   │   │   ├── pages/
│   │   │   └── styles/
│   │   └── public/
│   │
│   └── studio/                   # Sanity Studio
│   │   ├── package.json
│   │   ├── sanity.config.ts
│   │   ├── tsconfig.json
│   │   ├── schemas/
│   │   │   ├── index.ts
│   │   │   ├── documents/
│   │   │   ├── objects/
│   │   │   └── utils/
│   │   └── sanity.json           # Studio metadata
│
├── .planning/                    # Planning documents
│   ├── info.md
│   ├── plan.md
│   ├── deployment-approaches.md
│   └── phase-*/
│
└── _deployment/                  # Docker configs (unchanged)
```

---

## Development Commands (After Restructure)

```bash
# Run all apps (parallel)
pnpm -r dev              # Start web + studio together

# Individual apps
pnpm --filter web dev    # Frontend only (localhost:4321)
pnpm --filter studio dev # Studio only (localhost:3333)

# Build
pnpm -r build            # Build both apps
pnpm --filter web build  # Build frontend only

# Add dependencies
pnpm --filter web add <package>     # To web
pnpm --filter studio add <package>  # To studio
pnpm add -w <package>               # To root (shared)
```

---

## Deployment - Verified Compatible

### Vercel (Recommended for Astro)
- ✅ Auto-detects `pnpm-workspace.yaml`
- ✅ Auto-skips builds for unchanged apps (no extra config needed)
- ✅ Create separate project for each app directory
- ✅ `vercel link --repo` links multiple projects
- ✅ Related Projects feature links frontend ↔ studio URLs

**Setup:**
1. Import repo in Vercel dashboard
2. Select **Root Directory** = `apps/web` for frontend project
3. Create second project with **Root Directory** = `apps/studio`
4. Both deploy automatically on push

### Netlify
- ✅ Auto-detects monorepo structure
- ✅ Configure `base` directory per site in `netlify.toml`
- ✅ Multiple deploy buttons per monorepo

**Setup:**
1. Create `apps/web/netlify.toml`:
   ```toml
   [build]
     base = "apps/web"
     command = "pnpm --filter web build"
     publish = "apps/web/dist"
   ```
2. Create `apps/studio/netlify.toml` or use `sanity deploy`

### Sanity Hosting (Free Option for Studio)
```bash
cd apps/studio
pnpm deploy  # Deploys to project-id.sanity.studio
```

---

## Success Criteria

1. ✅ Monorepo structure with pnpm workspaces
2. ✅ Both apps start from `pnpm -r dev`
3. ✅ Sanity Studio shows proper document structure
4. ✅ Frontend fetches content from Sanity
5. ✅ Build produces static frontend + studio bundle
6. ✅ Deployable to Vercel/Netlify without issues