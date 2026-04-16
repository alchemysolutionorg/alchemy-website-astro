# Phase 1: Sanity Schema Restructure - Task Log

**Started**: 2026-04-16
**Completed**: 2026-04-16
**Status**: Completed (schemas created, testing pending after Phase 0)

**Depends On**: Phase 0 (Monorepo Restructure) - testing requires apps/studio/ structure

---

## Tasks Checklist

| # | Task | Status | Notes |
|---|------|--------|-------|
| 1.1 | Create new folder structure (`schemas/documents/`, `schemas/objects/`, `schemas/utils/`) | ✅ Done | |
| 1.2 | Create `siteSettings.ts` document (singleton) | ✅ Done | |
| 1.3 | Create `homePage.ts` document (singleton) with sections array | ✅ Done | |
| 1.4 | Create `page.ts` document with slug and sections array | ✅ Done | |
| 1.5 | Create `heroSection.ts` object | ✅ Done | |
| 1.6 | Create `servicesSection.ts` object | ✅ Done | |
| 1.7 | Create `serviceItem.ts` nested object | ✅ Done | |
| 1.8 | Create `processSection.ts` object | ✅ Done | |
| 1.9 | Create `processStep.ts` nested object | ✅ Done | |
| 1.10 | Create `testimonialsSection.ts` object | ✅ Done | |
| 1.11 | Create `testimonialItem.ts` nested object | ✅ Done | |
| 1.12 | Create `engineeringSection.ts` object | ✅ Done | |
| 1.13 | Create `techItem.ts` nested object | ✅ Done | |
| 1.14 | Create `aiTool.ts` nested object | ✅ Done | |
| 1.15 | Create `whyAlchemySection.ts` object | ✅ Done | |
| 1.16 | Create `contactSection.ts` object | ✅ Done | |
| 1.17 | Create `iconSelector.ts` utility object | ✅ Done | |
| 1.18 | Create `iconList.ts` utility with Lucide icons | ✅ Done | |
| 1.19 | Create `seoObject.ts` utility object | ✅ Done | |
| 1.20 | Create `ctaObject.ts` utility object | ✅ Done | |
| 1.21 | Create `linkObject.ts` utility object | ✅ Done | |
| 1.22 | Create `schemas/index.ts` to export all schemas | ✅ Done | |
| 1.23 | Update `sanity.config.ts` with new schema imports | ✅ Done | Custom structure for singletons |
| 1.24 | Remove old schema files (`hero.ts`, `services.ts`, etc.) | ✅ Done | Removed 6 old files |
| 1.25 | Run Sanity Studio locally and verify structure | ⬜ Pending | Need user to test |
| 1.26 | Seed initial content (copy defaults from components) | ⬜ Pending | Need user to seed via Studio |

---

## What Was Done

### Files Created

**Documents (3 files)**
- `sanity/schemas/documents/siteSettings.ts` - Global site configuration (singleton)
- `sanity/schemas/documents/homePage.ts` - Home page content (singleton)
- `sanity/schemas/documents/page.ts` - Dynamic pages with slug

**Section Objects (7 files)**
- `sanity/schemas/objects/heroSection.ts` - Hero section with typewriter
- `sanity/schemas/objects/servicesSection.ts` - Services grid section
- `sanity/schemas/objects/processSection.ts` - Process timeline section
- `sanity/schemas/objects/testimonialsSection.ts` - Testimonials grid
- `sanity/schemas/objects/engineeringSection.ts` - Tech stack + AI tools
- `sanity/schemas/objects/whyAlchemySection.ts` - Value propositions
- `sanity/schemas/objects/contactSection.ts` - Contact form section

**Nested Objects (7 files)**
- `sanity/schemas/objects/serviceItem.ts` - Individual service card
- `sanity/schemas/objects/processStep.ts` - Process timeline step
- `sanity/schemas/objects/testimonialItem.ts` - Testimonial card
- `sanity/schemas/objects/techItem.ts` - Technology badge
- `sanity/schemas/objects/aiTool.ts` - AI tool card
- `sanity/schemas/objects/valueProp.ts` - Value proposition item
- `sanity/schemas/objects/statItem.ts` - Stat with value + label

**Utility Objects (5 files)**
- `sanity/schemas/objects/iconSelector.ts` - Structured icon with color/size
- `sanity/schemas/objects/seoObject.ts` - SEO metadata
- `sanity/schemas/objects/ctaObject.ts` - Call to action button
- `sanity/schemas/objects/linkObject.ts` - Navigation link
- `sanity/schemas/objects/linkObject.ts` - Social link with platform

**Utils (2 files)**
- `sanity/schemas/utils/iconList.ts` - 80+ Lucide icons for selection
- `sanity/schemas/index.ts` - Schema exports

### Files Modified
- `sanity/sanity.config.ts` - Updated with new structure and singleton handling

### Files Removed
- `sanity/schemas/hero.ts`
- `sanity/schemas/services.ts`
- `sanity/schemas/process.ts`
- `sanity/schemas/testimonials.ts`
- `sanity/schemas/engineering.ts`
- `sanity/schemas/siteSettings.ts`

---

## Issues Encountered

| Issue | Description | Resolution | Status |
|-------|-------------|------------|--------|
| | No issues during implementation | | ✅ |

---

## Improvements / Recommendations

### Technical Improvements
- [ ] Install `@sanity/singleton` plugin for better singleton UX
- [ ] Add `sanity-codegen` for automatic TypeScript type generation
- [ ] Create custom input component for visual icon grid picker
- [ ] Add custom preview components for sections (show actual preview)

### Schema Improvements
- [ ] Add `backgroundColor` option per section for customization
- [ ] Add `hideSection` toggle per section in page builder
- [ ] Add `imageSection` object for standalone images
- [ ] Add `spacerSection` object for layout control
- [ ] Add `dividerSection` object for visual separators
- [ ] Add field groups for better Studio UX (collapse related fields)
- [ ] Add validation for required fields in sections

### Studio UX Improvements
- [ ] Add custom sidebar icons for document types
- [ ] Add document actions for "Preview" button
- [ ] Add custom dashboard with quick actions
- [ ] Add instructions/descriptions for content editors

---

## Notes

- **Singleton Pattern**: `siteSettings` and `homePage` use `documentId` to ensure only one instance
- **Color Picker**: Using Sanity's native `color` type which provides hex + rgb values
- **Icon Selector**: Structured object with `{ name, color, size }` - icon list has 80+ Lucide icons
- **Section Array**: Pages use array of sections allowing any section type (flexible page builder)
- **Initial Values**: Most fields have sensible defaults matching current hardcoded content
- **Slug Generation**: Auto-generates from title, lowercase with hyphens

---

## Next Steps (User Action Required)

1. **Run Sanity Studio locally**:
   ```bash
   cd sanity
   npm install  # or pnpm install
   npm run dev
   ```

2. **Seed initial content**:
   - Open Studio at `http://localhost:3333`
   - Create "Site Settings" document with defaults
   - Create "Home Page" document with all sections
   - Each section has initial values matching current frontend defaults

3. **Verify structure**:
   - Check that sections can be reordered
   - Check that icons are selectable
   - Check that color picker works
   - Check that slug auto-generates for pages

---

## File Structure Summary

```
sanity/
├── sanity.config.ts          # Studio configuration with singleton structure
├── schemas/
│   ├── index.ts              # Schema exports (24 types)
│   ├── documents/
│   │   ├── siteSettings.ts   # Singleton - global config
│   │   ├── homePage.ts       # Singleton - home page
│   │   └── page.ts           # Multi - dynamic pages
│   ├── objects/
│   │   ├── heroSection.ts
│   │   ├── servicesSection.ts
│   │   ├── processSection.ts
│   │   ├── testimonialsSection.ts
│   │   ├── engineeringSection.ts
│   │   ├── whyAlchemySection.ts
│   │   ├── contactSection.ts
│   │   ├── serviceItem.ts
│   │   ├── processStep.ts
│   │   ├── testimonialItem.ts
│   │   ├── techItem.ts
│   │   ├── aiTool.ts
│   │   ├── valueProp.ts
│   │   ├── statItem.ts
│   │   ├── iconSelector.ts
│   │   ├── seoObject.ts
│   │   ├── ctaObject.ts
│   │   └── linkObject.ts
│   └── utils/
│   │   └── iconList.ts       # 80+ Lucide icons
```

**Total**: 24 schema types created