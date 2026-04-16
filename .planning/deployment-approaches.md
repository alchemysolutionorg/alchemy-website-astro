# Sanity Deployment Approaches

This document explains two approaches for deploying Sanity CMS with a frontend application.

---

## Overview

Sanity consists of three parts:
1. **Sanity Studio** - Content management interface (React app)
2. **Sanity Content API** - Cloud-hosted database (managed by Sanity)
3. **Frontend** - Your website/app that consumes content

---

## Option A: Separate Deployment

Deploy Sanity Studio and Frontend independently to different platforms.

### Architecture

```
┌─────────────────────────────────────────────────────────────┐
│  Frontend (Astro)                                            │
│  Deployed to: Vercel, Netlify, Cloudflare Pages              │
│  URL: alchemy.com                                            │
│  Type: Static Site (SSG)                                     │
│  Build: Fetches content from Sanity API at build time        │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│  Sanity Studio                                               │
│  Deployed to: Sanity's Hosting OR separate Vercel app        │
│  URL: studio.alchemy.com or project-id.sanity.studio         │
│  Type: Dynamic React App                                     │
│  Users: Content editors only                                 │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│  Sanity Content API                                          │
│  Hosted by: Sanity (cloud)                                   │
│  Access: Frontend fetches at build time                      │
│  URL: api.sanity.io/v1/data/...                              │
└─────────────────────────────────────────────────────────────┘
```

### File Structure

```
project/
├── package.json              # Frontend dependencies
├── src/                      # Frontend source
├── dist/                     # Frontend build output
├── sanity/                   # Separate folder (NOT in frontend deps)
│   ├── package.json          # Sanity dependencies
│   ├── sanity.config.ts
│   ├── schemas/
│   └── .env
└── .env                      # Frontend env (SANITY_PROJECT_ID)
```

### Deployment Steps

**1. Deploy Sanity Studio:**
```bash
cd sanity
pnpm deploy
# Deploys to: your-project-id.sanity.studio (FREE)
```

Or deploy to custom domain on Vercel:
```bash
cd sanity
vercel --prod
# Deploy to: studio.alchemy.com
```

**2. Deploy Frontend:**
```bash
# From project root
pnpm build
vercel --prod
# Deploy to: alchemy.com
```

**3. Connect Content:**
- Add `SANITY_PROJECT_ID` to frontend's Vercel environment
- Frontend fetches content at build time
- Use webhook to trigger rebuild when content changes

### Benefits
- Simple setup, no restructuring needed
- Sanity provides **free Studio hosting**
- Frontend deployed independently
- Content editors access Studio at separate URL
- Clean separation - different audiences

### Drawbacks
- Two separate deployments to manage
- Two sets of environment variables
- Webhook needs to target frontend deployment specifically

### Best For
- Teams with dedicated content editors
- Projects where Studio and Frontend have different update cycles
- Simple projects that don't need complex CI/CD

---

## Option B: Monorepo Deployment (Recommended)

Deploy Sanity Studio and Frontend together from a single repository using pnpm workspaces.

### Architecture

```
┌─────────────────────────────────────────────────────────────┐
│  Monorepo Root                                               │
│  Deployed to: Vercel, Netlify (monorepo auto-detected)       │
│                                                              │
│  ├── apps/web        → alchemy.com (Frontend)                │
│  ├── apps/studio     → studio.alchemy.com OR sanity.studio   │
│  │                                                          │
│  Single repo, two apps. Platform skips unchanged builds.     │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│  Sanity Content API                                          │
│  Hosted by: Sanity (cloud)                                   │
│  Both apps connect to same API                               │
└─────────────────────────────────────────────────────────────┘
```

### File Structure

```
project/
├── package.json              # Root package (scripts only)
├── pnpm-workspace.yaml       # Workspace definition (NO Turbo needed!)
├── .env                      # Shared environment variables
│
├── apps/
│   ├── web/                  # Frontend (Astro)
│   │   ├── package.json
│   │   ├── astro.config.mjs
│   │   ├── src/
│   │   └── public/
│   │
│   └── studio/               # Sanity Studio
│   │   ├── package.json
│   │   ├── sanity.config.ts
│   │   ├── schemas/
│   │   └── sanity.json
│
└── _deployment/              # Docker configs (unchanged)
```

**Note: No `turbo.json` needed!** pnpm workspaces + Vercel/Netlify handles everything.

### pnpm-workspace.yaml

```yaml
packages:
  - 'apps/*'
```

### Root package.json

```json
{
  "name": "alchemy-website",
  "private": true,
  "scripts": {
    "dev": "pnpm -r dev",
    "build": "pnpm -r build",
    "dev:web": "pnpm --filter web dev",
    "dev:studio": "pnpm --filter studio dev"
  }
}
```

### Deployment - Verified Compatible (2026)

#### Vercel (Recommended)

**Verified features from official docs:**
- ✅ Auto-detects `pnpm-workspace.yaml` at repo root
- ✅ **Automatically skips builds for unchanged apps** (built-in feature!)
- ✅ Create separate project for each app directory
- ✅ `vercel link --repo` links multiple projects
- ✅ Related Projects feature connects frontend ↔ studio

**Deployment Steps:**
1. Import repo in Vercel dashboard
2. Create first project:
   - **Root Directory**: `apps/web`
   - **Framework**: Astro (auto-detected)
3. Create second project:
   - **Root Directory**: `apps/studio`
   - OR use `sanity deploy` for free hosting
4. Both deploy automatically on push
5. Vercel skips unchanged apps (saves build minutes)

**Requirements (from Vercel docs):**
- `pnpm-workspace.yaml` defines workspaces
- Each package has unique `name` in `package.json`
- Dependencies explicitly declared between packages

#### Netlify

**Verified features:**
- ✅ Auto-detects monorepo structure
- ✅ Configure `base` directory per site
- ✅ Multiple deploy buttons per monorepo

**Configuration:**
```toml
# apps/web/netlify.toml
[build]
  base = "apps/web"
  command = "pnpm --filter web build"
  publish = "dist"

# apps/studio/netlify.toml (optional - or use sanity deploy)
[build]
  base = "apps/studio"
  command = "pnpm --filter studio build"
  publish = "dist"
```

#### Sanity Hosting (Free for Studio)

```bash
cd apps/studio
pnpm deploy
# Deploys to: project-id.sanity.studio (FREE)
```

### Benefits
- **Single repository** - unified development
- **Shared environment** - one `.env` for both apps
- **Auto-skip builds** - Vercel/Netlify skips unchanged apps
- **Unified commands** - `pnpm dev` runs both
- **Type sharing** - optional shared types package

### Drawbacks
- Initial restructuring required
- Both apps rebuild together (but Vercel skips unchanged!)

### Best For
- Projects with frequent combined updates
- Teams wanting unified workflow
- Developers preferring single terminal for dev

---

## Comparison Table

| Aspect | Option A (Separate) | Option B (Monorepo) |
|--------|---------------------|---------------------|
| Setup Complexity | Simple | Medium (initial) |
| Deployment Count | 2 separate | 1 unified repo |
| Environment Variables | 2 sets | 1 shared set |
| Build Time | Independent | Vercel skips unchanged |
| Studio Hosting | Sanity free hosting | Vercel/Netlify OR Sanity |
| Local Development | 2 terminals | 1 terminal |
| Shared Types | Manual sync | Automatic (optional) |
| Best For | Simple projects | Active unified projects |

### 2026 Monorepo Features (Verified from Official Docs)

**Vercel** (pnpm workspaces):
- Auto-detects `pnpm-workspace.yaml`
- Skips builds for unchanged apps **without Turbo**
- Uses package manager from root lockfile
- Must have unique `name` per package
- Dependencies must be explicit

**Netlify** (pnpm workspaces):
- Auto-detects monorepo
- `base` directory config per site
- Package Directory for site-specific config

---

## Recommendation for Alchemy Website

**Option B (Monorepo)** with pnpm workspaces:

1. Restructure to `apps/web` + `apps/studio`
2. Deploy `apps/web` to Vercel (Astro project)
3. Deploy `apps/studio` to:
   - `sanity deploy` → FREE hosting at sanity.studio
   - OR Vercel → studio.alchemy.com (for custom domain)
4. Vercel skips unchanged builds automatically

**No Turbo needed** - verified sufficient for 2-app setup.

---

## Quick Reference Commands

### Option A Commands
```bash
# Studio
cd sanity && pnpm dev          # Local development
cd sanity && pnpm deploy       # Deploy to sanity.studio (free)

# Frontend
pnpm dev                       # Local development
pnpm build                     # Build for production
vercel --prod                  # Deploy frontend
```

### Option B Commands (Monorepo)
```bash
# Both apps (parallel)
pnpm dev                       # Start web + studio
pnpm build                     # Build both apps

# Individual apps
pnpm --filter web dev          # Frontend only (localhost:4321)
pnpm --filter studio dev       # Studio only (localhost:3333)
pnpm --filter web build        # Build frontend

# Deploy
vercel --prod                  # Deploy from apps/web directory
cd apps/studio && pnpm deploy  # Deploy studio to sanity.studio (free)
```

---

## Sources (Official Documentation)

- [Vercel Monorepos](https://vercel.com/docs/monorepos) - Verified pnpm workspace support
- [Netlify Build Configuration](https://docs.netlify.com/configure-builds/overview/) - Monorepo `base` directory
- [pnpm Workspaces](https://pnpm.io/workspaces) - Workspace setup guide
- [Sanity Studio Deployment](https://www.sanity.io/docs/studio/deployment) - Self-hosting options
- [Sanity Monorepo Structure](https://www.sanity.io/docs/apis-and-sdks/sanity-typegen) - Official monorepo example

---

## Related Files

- Phase 0 Plan: `.planning/phase-0/task.md`
- Phase 4 Plan: `.planning/phase-4/task.md`
- Schema Info: `.planning/info.md`
- Implementation Plan: `.planning/plan.md`