# Phase 0: Monorepo Restructure - Task Log

**Started**: 2026-04-16
**Completed**: 2026-04-16
**Status**: Completed ✅

**Approach**: pnpm workspaces only (no Turbo - verified sufficient for 2-app setup)

---

## Overview

Converted project to monorepo with pnpm workspaces:
- `apps/web` - Astro frontend
- `apps/studio` - Sanity CMS Studio

---

## Tasks Checklist

| # | Task | Status | Notes |
|---|------|--------|-------|
| 0.1 | Create `apps/` folder | ✅ Done | Created apps/web and apps/studio |
| 0.2 | Create `pnpm-workspace.yaml` at root | ✅ Done | `packages: ['apps/*']` |
| 0.3 | Create root `package.json` (scripts only) | ✅ Done | Workspace scripts |
| 0.4 | Move `src/` to `apps/web/src/` | ✅ Done | |
| 0.5 | Move `public/` to `apps/web/public/` | ✅ Done | |
| 0.6 | Move `package.json` deps to `apps/web/package.json` | ✅ Done | Frontend deps preserved |
| 0.7 | Move `astro.config.mjs` to `apps/web/` | ✅ Done | |
| 0.8 | Move `tsconfig.json` to `apps/web/` | ✅ Done | |
| 0.9 | Copy sanity files to `apps/studio/` | ✅ Done | schemas, configs, package.json |
| 0.10 | Update `apps/studio/package.json` name to "studio" | ✅ Done | |
| 0.11 | Add react/react-dom to studio deps | ✅ Done | Required by Sanity Studio |
| 0.12 | Create `apps/studio/sanity.json` | ✅ Done | Studio metadata |
| 0.13 | Create shared `.env.example` at root | ✅ Done | SANITY_PROJECT_ID |
| 0.14 | Update `.gitignore` for monorepo | ✅ Done | Added apps/** paths |
| 0.15 | Remove old `sanity/` folder | ✅ Done | |
| 0.16 | Remove old root `node_modules/` and lockfile | ✅ Done | Clean install |
| 0.17 | Run `pnpm install` from root | ✅ Done | 1347 packages installed |
| 0.18 | Test `pnpm --filter web dev` | ✅ Done | Works at localhost:4321 |
| 0.19 | Test `pnpm --filter studio dev` | ✅ Done | Works at localhost:3333 |
| 0.20 | Test `pnpm -r dev` runs both | ✅ Done | Both apps start together |
| 0.21 | Test `pnpm -r build` builds both | ✅ Done | web: dist/, studio: dist/ |

---

## What Was Done

### Files Created
- `pnpm-workspace.yaml` - Workspace definition
- `package.json` (root) - Workspace scripts only
- `apps/web/package.json` - Frontend dependencies
- `apps/studio/sanity.json` - Studio metadata
- `.env.example` (updated) - Shared environment template

### Files Modified
- `.gitignore` - Updated for monorepo structure
- `apps/studio/package.json` - Added name="studio", react deps

### Files Moved
- `src/` → `apps/web/src/`
- `public/` → `apps/web/public/`
- `astro.config.mjs` → `apps/web/astro.config.mjs`
- `tsconfig.json` → `apps/web/tsconfig.json`
- `netlify.toml` → `apps/web/netlify.toml`
- `README.md` → `apps/web/README.md`
- `sanity/schemas/` → `apps/studio/schemas/`
- `sanity/sanity.config.ts` → `apps/studio/sanity.config.ts`
- `sanity/package.json` → `apps/studio/package.json`
- `sanity/tsconfig.json` → `apps/studio/tsconfig.json`
- `sanity/.env.example` → `apps/studio/.env.example`

### Files Removed
- `sanity/` folder (entire directory)
- Root `node_modules/` (reinstalled)
- Root `pnpm-lock.yaml` (regenerated)

---

## Issues Encountered

| Issue | Description | Resolution | Status |
|-------|-------------|------------|--------|
| 1 | Apps folder created in wrong location (sanity/apps) | Moved to correct location with `mv` | ✅ Fixed |
| 2 | Sanity Studio missing react deps | Added react/react-dom to studio package.json | ✅ Fixed |

---

## Final Structure

```
alchemy-website-astro/
├── package.json              # Root (scripts only)
├── pnpm-workspace.yaml       # packages: ['apps/*']
├── pnpm-lock.yaml            # Combined lockfile
├── .env.example              # SANITY_PROJECT_ID
├── .gitignore                # Updated for monorepo
│
├── apps/
│   ├── web/                  # Astro frontend
│   │   ├── package.json      # "name": "web"
│   │   ├── astro.config.mjs
│   │   ├── tsconfig.json
│   │   ├── src/
│   │   ├── public/
│   │   ├── dist/             # Build output
│   │   └── node_modules/
│   │
│   └── studio/               # Sanity Studio
│   │   ├── package.json      # "name": "studio"
│   │   ├── sanity.config.ts
│   │   ├── sanity.json
│   │   ├── tsconfig.json
│   │   ├── schemas/
│   │   ├── dist/             # Build output
│   │   └── node_modules/
│   │
├── _deployment/              # Docker configs (unchanged)
├── .planning/                # Planning docs
└── CLAUDE.md                 # Project instructions
```

---

## Commands Verified

| Command | Result |
|---------|--------|
| `pnpm install` | ✅ 1347 packages, 3 workspace projects |
| `pnpm --filter web dev` | ✅ localhost:4321 |
| `pnpm --filter studio dev` | ✅ localhost:3333 |
| `pnpm -r dev` | ✅ Both apps run together |
| `pnpm -r build` | ✅ Both apps build successfully |
| `pnpm --filter web build` | ✅ apps/web/dist/ created |
| `pnpm --filter studio build` | ✅ apps/studio/dist/ created |

---

## Testing Checklist

- [x] `pnpm install` completes without errors
- [x] `pnpm --filter web dev` starts frontend at localhost:4321
- [x] `pnpm --filter studio dev` starts Studio at localhost:3333
- [x] `pnpm -r dev` starts both apps in parallel
- [x] `pnpm -r build` builds both apps
- [x] All imports resolve correctly
- [x] No dependency conflicts between apps

---

## Next Steps

Phase 0 complete. Ready to proceed to:
- **Phase 1**: Test Sanity Studio with schemas, seed initial content
- **Phase 2**: Frontend integration with new Sanity structure