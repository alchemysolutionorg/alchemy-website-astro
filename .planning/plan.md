# Implementation Plan - Sanity Integration

## Overview

Restructure Sanity CMS to industry-standard page builder pattern with proper document/object hierarchy, structured icons, color pickers, and dynamic page support.

---

## Phase 1: Sanity Schema Restructure

**Goal**: Create proper schema structure with documents (siteSettings, homePage, page) and objects (section types).

**Duration**: ~2-3 hours

### Tasks

| Task | Description | Status |
|------|-------------|--------|
| 1.1 | Create new folder structure (`schemas/documents/`, `schemas/objects/`) | Pending |
| 1.2 | Create `siteSettings.ts` document (singleton) | Pending |
| 1.3 | Create `homePage.ts` document (singleton) with sections array | Pending |
| 1.4 | Create `page.ts` document with slug and sections array | Pending |
| 1.5 | Create section objects (`heroSection`, `servicesSection`, etc.) | Pending |
| 1.6 | Create nested objects (`serviceItem`, `processStep`, `testimonialItem`) | Pending |
| 1.7 | Create utility objects (`iconSelector`, `seoObject`, `ctaObject`) | Pending |
| 1.8 | Create icon list utility with Lucide icons | Pending |
| 1.9 | Update `sanity.config.ts` to use new schemas | Pending |
| 1.10 | Remove old schema files | Pending |
| 1.11 | Test in Sanity Studio locally | Pending |
| 1.12 | Seed initial content from current defaults | Pending |

### Key Decisions
- Use Sanity's `color` type for color picker (visual UX)
- Icon selector with predefined Lucide icon list
- Singleton pattern for `siteSettings` and `homePage`
- SEO object reusable in both `homePage` and `page`

---

## Phase 2: Frontend Integration

**Goal**: Connect frontend to new Sanity structure, create dynamic page routing.

**Duration**: ~3-4 hours

### Tasks

| Task | Description | Status |
|------|-------------|--------|
| 2.1 | Update `src/lib/sanity.ts` with new GROQ queries | Pending |
| 2.2 | Create `src/lib/content.ts` data layer with parallel fetch | Pending |
| 2.3 | Create type definitions from schema structure | Pending |
| 2.4 | Create `SectionRenderer.astro` for dynamic section rendering | Pending |
| 2.5 | Update `index.astro` to fetch homePage data | Pending |
| 2.6 | Create `[slug].astro` for dynamic pages | Pending |
| 2.7 | Update `Layout.astro` for SEO from siteSettings | Pending |
| 2.8 | Update `Footer.astro` for navigation from siteSettings | Pending |
| 2.9 | Create icon mapping component for structured icons | Pending |
| 2.10 | Test all sections with Sanity data | Pending |
| 2.11 | Verify fallback behavior when Sanity unavailable | Pending |
| 2.12 | Build and deploy test | Pending |

### Key Decisions
- Keep SSG output mode (`output: 'static'`)
- Use `Promise.all` for parallel content fetching
- Section renderer maps `_type` to component
- Graceful fallback to hardcoded defaults

---

## Phase 3: Live Preview (Optional)

**Goal**: Enable live preview for content editors using Sanity Presentation Tool.

**Duration**: ~4-6 hours (if implemented)

### Tasks

| Task | Description | Status |
|------|-------------|--------|
| 3.1 | Create preview API routes (`/api/preview/enable`, `/api/preview/disable`) | Pending |
| 3.2 | Configure preview-aware data fetching (drafts perspective) | Pending |
| 3.3 | Set up preview deployment (SSR mode on Vercel/Netlify) | Pending |
| 3.4 | Install and configure `@sanity/presentation` plugin | Pending |
| 3.5 | Add Presentation Tool to Sanity config | Pending |
| 3.6 | Configure preview URL mapping for documents | Pending |
| 3.7 | Test draft preview workflow | Pending |
| 3.8 | Document preview usage for client | Pending |

### Key Decisions
- Can defer to later phase if not immediately needed
- Requires SSR preview deployment (separate from production static build)
- Presentation Tool provides iframe preview in Sanity Studio

---

## Phase 4: Production Deployment

**Goal**: Deploy Sanity Studio and configure production workflow.

**Duration**: ~1-2 hours

### Tasks

| Task | Description | Status |
|------|-------------|--------|
| 4.1 | Deploy Sanity Studio to hosting (Vercel/Netlify) | Pending |
| 4.2 | Configure production Sanity project (project ID, dataset) | Pending |
| 4.3 | Set up build webhook for content-triggered rebuilds | Pending |
| 4.4 | Configure CORS and API origins | Pending |
| 4.5 | Create content editor documentation | Pending |
| 4.6 | Production build and deploy verification | Pending |

---

## File Structure After Implementation

```
sanity/
├── sanity.config.ts
├── schemas/
│   ├── index.ts
│   ├── documents/
│   │   ├── siteSettings.ts
│   │   ├── homePage.ts
│   │   └── page.ts
│   └── objects/
│   │   ├── heroSection.ts
│   │   ├── servicesSection.ts
│   │   ├── serviceItem.ts
│   │   ├── processSection.ts
│   │   ├── processStep.ts
│   │   ├── testimonialsSection.ts
│   │   ├── testimonialItem.ts
│   │   ├── engineeringSection.ts
│   │   ├── whyAlchemySection.ts
│   │   ├── contactSection.ts
│   │   ├── iconSelector.ts
│   │   ├── seoObject.ts
│   │   ├── ctaObject.ts
│   │   └── linkObject.ts
│   └── utils/
│   │   └── iconList.ts

src/
├── lib/
│   ├── sanity.ts          # Updated queries
│   ├── content.ts         # Data layer
│   └── types/
│   │   └── sanity.ts      # TypeScript types
├── components/
│   ├── sections/
│   │   └── SectionRenderer.astro  # Dynamic renderer
│   │   └── Hero.astro              # Updated for new structure
│   │   └── ...
│   └── utils/
│   │   └── IconMapper.tsx         # Icon component mapper
├── pages/
│   ├── index.astro        # Updated fetch
│   └── [slug].astro       # Dynamic pages (Phase 2)
│   └── api/
│   │   └ preview/
│   │   │   ├── enable.ts  # Phase 3
│   │   │   └── disable.ts # Phase 3
```

---

## Success Criteria

1. ✅ Sanity Studio shows proper document structure
2. ✅ Home page editable as single document with reorderable sections
3. ✅ Dynamic pages can be created with slug
4. ✅ Icons selectable from visual list
5. ✅ Colors picked via color picker
6. ✅ Frontend renders content from Sanity
7. ✅ Fallbacks work when Sanity unavailable
8. ✅ Production build succeeds