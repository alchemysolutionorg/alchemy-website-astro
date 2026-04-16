# Phase 1: Sanity Schema Restructure - Task Log

**Started**: [Date]
**Completed**: [Date]
**Status**: Not Started

---

## Tasks Checklist

| # | Task | Status | Notes |
|---|------|--------|-------|
| 1.1 | Create new folder structure (`schemas/documents/`, `schemas/objects/`, `schemas/utils/`) | ⬜ Pending | |
| 1.2 | Create `siteSettings.ts` document (singleton) | ⬜ Pending | |
| 1.3 | Create `homePage.ts` document (singleton) with sections array | ⬜ Pending | |
| 1.4 | Create `page.ts` document with slug and sections array | ⬜ Pending | |
| 1.5 | Create `heroSection.ts` object | ⬜ Pending | |
| 1.6 | Create `servicesSection.ts` object | ⬜ Pending | |
| 1.7 | Create `serviceItem.ts` nested object | ⬜ Pending | |
| 1.8 | Create `processSection.ts` object | ⬜ Pending | |
| 1.9 | Create `processStep.ts` nested object | ⬜ Pending | |
| 1.10 | Create `testimonialsSection.ts` object | ⬜ Pending | |
| 1.11 | Create `testimonialItem.ts` nested object | ⬜ Pending | |
| 1.12 | Create `engineeringSection.ts` object | ⬜ Pending | |
| 1.13 | Create `techItem.ts` nested object | ⬜ Pending | |
| 1.14 | Create `aiTool.ts` nested object | ⬜ Pending | |
| 1.15 | Create `whyAlchemySection.ts` object | ⬜ Pending | |
| 1.16 | Create `contactSection.ts` object | ⬜ Pending | |
| 1.17 | Create `iconSelector.ts` utility object | ⬜ Pending | |
| 1.18 | Create `iconList.ts` utility with Lucide icons | ⬜ Pending | |
| 1.19 | Create `seoObject.ts` utility object | ⬜ Pending | |
| 1.20 | Create `ctaObject.ts` utility object | ⬜ Pending | |
| 1.21 | Create `linkObject.ts` utility object | ⬜ Pending | |
| 1.22 | Create `schemas/index.ts` to export all schemas | ⬜ Pending | |
| 1.23 | Update `sanity.config.ts` with new schema imports | ⬜ Pending | |
| 1.24 | Remove old schema files (`hero.ts`, `services.ts`, etc.) | ⬜ Pending | |
| 1.25 | Run Sanity Studio locally and verify structure | ⬜ Pending | |
| 1.26 | Seed initial content (copy defaults from components) | ⬜ Pending | |

---

## What Was Done

*Document changes made during implementation*

### Files Created
- [List files created]

### Files Modified
- [List files modified]

### Files Removed
- [List files removed]

---

## Issues Encountered

*Document any problems, blockers, or unexpected challenges*

| Issue | Description | Resolution | Status |
|-------|-------------|------------|--------|
| | | | |

---

## Improvements / Recommendations

*Document things that could be improved or alternative approaches considered*

### Technical Improvements
- [ ] Consider using `sanity-codegen` for automatic TypeScript type generation
- [ ] Add preview select for icon grid (visual icon picker instead of dropdown)
- [ ] Add singleton plugin for better single-document handling (`@sanity/singleton`)
- [ ] Add validation for required fields in sections
- [ ] Add field groups for better Studio UX (collapse related fields)

### Schema Improvements
- [ ] Consider adding `imageSection` object for standalone images
- [ ] Consider adding `richTextSection` for simple rich text blocks
- [ ] Consider adding `spacerSection` for layout control
- [ ] Consider adding `dividerSection` for visual separators
- [ ] Add `backgroundColor` option per section for customization
- [ ] Add `hideSection` toggle per section

### Studio UX Improvements
- [ ] Add custom input components for icon picker (visual grid)
- [ ] Add custom preview components for sections
- [ ] Add document actions for "Preview" button
- [ ] Add structure builder for custom sidebar navigation

---

## Notes

*Additional notes, decisions made, or context*

- Decision: Use Sanity's native `color` type for color picker (provides hex + rgb values)
- Decision: Icon as object with `{ name, color, size }` for flexibility
- Decision: Sections array allows all section types (no restrictions)
- Decision: Page slug auto-generated from title

---

## Testing Checklist

- [ ] Sanity Studio runs without errors
- [ ] siteSettings document appears (singleton)
- [ ] homePage document appears (singleton)
- [ ] page document appears (can create multiple)
- [ ] Sections can be added to homePage
- [ ] Sections can be reordered in array
- [ ] Icon selector shows all available icons
- [ ] Color picker works correctly
- [ ] Slug auto-generation works
- [ ] All field validations work
- [ ] Preview renders correctly in Studio