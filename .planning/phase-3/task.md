# Phase 3: Live Preview (Optional) - Task Log

**Started**: [Date]
**Completed**: [Date]
**Status**: Not Started
**Depends On**: Phase 1, Phase 2

---

## Tasks Checklist

| # | Task | Status | Notes |
|---|------|--------|-------|
| 3.1 | Install `@sanity/presentation` package | ⬜ Pending | |
| 3.2 | Install Astro SSR adapter (Vercel/Netlify) | ⬜ Pending | |
| 3.3 | Create preview API route `/api/preview/enable.ts` | ⬜ Pending | Sets preview cookie |
| 3.4 | Create preview API route `/api/preview/disable.ts` | ⬜ Pending | Clears preview cookie |
| 3.5 | Create preview token secret in environment | ⬜ Pending | |
| 3.6 | Update sanity client to support `perspective` option | ⬜ Pending | |
| 3.7 | Create preview-aware content fetch helper | ⬜ Pending | Fetch drafts when in preview mode |
| 3.8 | Configure Astro for SSR preview mode | ⬜ Pending | |
| 3.9 | Create preview deployment (separate branch/config) | ⬜ Pending | |
| 3.10 | Add Presentation Tool to `sanity.config.ts` | ⬜ Pending | |
| 3.11 | Configure preview URL mapping for documents | ⬜ Pending | Map Sanity docs to preview URLs |
| 3.12 | Add preview button action in Sanity Studio | ⬜ Pending | |
| 3.13 | Test draft preview workflow | ⬜ Pending | |
| 3.14 | Document preview usage for content editors | ⬜ Pending | |

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

### Alternative Approaches
- [ ] Consider using Vercel Preview Deployments instead of custom preview server
- [ ] Consider using Netlify Branch Deploy for preview
- [ ] Consider Sanity Content Lake for real-time updates (no SSR needed)

### Technical Improvements
- [ ] Add preview mode indicator in frontend (banner showing "Preview Mode")
- [ ] Add preview mode toggle button for editors
- [ ] Add session expiration for preview mode
- [ ] Add webhook for preview mode refresh

### Simplification Options
- [ ] Skip SSR entirely - use webhook rebuild for preview (slower but simpler)
- [ ] Use localhost preview during development only
- [ ] Use Sanity's built-in preview pane in Studio

---

## Notes

*Additional notes, decisions made, or context*

- Decision: Can defer to later if not immediately needed
- Decision: Requires separate SSR deployment (preview vs production static)
- Decision: Preview mode uses `drafts` perspective in Sanity
- Alternative: Use webhook-triggered rebuild instead (no live preview)

---

## Architecture Options Considered

### Option A: Presentation Tool + SSR Preview
```
Sanity Studio → Presentation Tool iframe → Preview SSR Deployment
                                                    ↓
                                            Fetch with drafts perspective
                                                    ↓
                                            Render preview content
```
**Pros**: Real-time preview, official Sanity solution
**Cons**: Requires SSR setup, more infrastructure

### Option B: Webhook Rebuild Preview
```
Sanity Studio → Click "Preview" → Webhook trigger → Build → Deploy preview
```
**Pros**: Simple, no SSR needed
**Cons**: Delayed preview (1-2 min build time)

### Option C: Vercel Preview Branch
```
Sanity Studio → Open Vercel Preview URL → Static preview with latest content
```
**Pros**: Uses existing Vercel feature, no extra setup
**Cons**: Not real-time, requires manual deploy

### Recommendation
- Start with **Option B** (webhook) for simplicity
- Add **Option A** (Presentation Tool) if client requests real-time preview

---

## Testing Checklist

- [ ] Preview API routes work (`/api/preview/enable`, `/api/preview/disable`)
- [ ] Preview cookie sets correctly
- [ ] Draft content fetches in preview mode
- [ ] Published content fetches in normal mode
- [ ] Presentation Tool iframe loads correctly
- [ ] Preview URL mapping works for all document types
- [ ] Preview button appears in Sanity Studio
- [ ] Preview mode indicator shows in frontend
- [ ] Preview mode can be disabled
- [ ] Session expires correctly