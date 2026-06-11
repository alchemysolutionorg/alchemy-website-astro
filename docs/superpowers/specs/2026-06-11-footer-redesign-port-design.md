# Footer Redesign Port (to feat/form-footer-changes)

## Context

`feat/sanity-integration` reworked `Footer.astro` as part of wiring the footer up to Sanity CMS
content (`apps/web/src/components/sections/Footer.astro`). That branch is a large monorepo
restructure (apps/web + apps/studio) and not something we want to merge wholesale yet.

`feat/form-footer-changes` still has the pre-restructure layout (`src/components/sections/Footer.astro`)
with the older 4-column footer and the recently-completed Web3Forms contact form work. We want to
port just the **UI/layout improvements** from the new Footer design onto this branch, without any
of the Sanity props/data plumbing — using plain hardcoded constants instead.

This is the first of two ports (Footer now, Contact.tsx UI separately later).

## Scope

File: `src/components/sections/Footer.astro` on `feat/form-footer-changes`.

## Design

Replace the current 4-column grid (`logo+description` / `Navigation` list / `Connect` list) with
the 5-column (3/2 split) layout from `feat/sanity-integration`:

**Left column (col-span-3, stacked vertically)**
- Logo + "ALCHEMY" title (unchanged content)
- Description paragraph (unchanged copy)
- Navigation links as a horizontal wrapping row (same 3 links: Services, Why Us, Process)
- A horizontal divider
- Social links as a horizontal wrapping row (same 3 links: Twitter, LinkedIn, GitHub) — drop the
  separate "Connect" heading, matching the sanity-integration layout

**Right column (col-span-2, new)**
- CTA heading: "Interested in working with us?" / "Book a call or drop us a message."
- "Book a Meeting" button — primary style, calendar icon, `href="#"` placeholder
- "WhatsApp Us" button — outline style, WhatsApp icon, links to `https://wa.me/1234567890`
  placeholder
- Contact row: phone (`tel:+1 234 567 890`) and email (`mailto:hello@alchemy.dev`) links with icons

**Bottom bar**
- Same copyright line
- `footerLinks` becomes a hardcoded local array: Privacy Policy (`#`), Terms of Service (`#`)

All new content (CTA copy, booking URL, WhatsApp number, phone, email) becomes plain hardcoded
`const` values at the top of the file — no `Props`/`data` interface. The existing `navigation` and
`socialLinks` arrays stay as hardcoded consts too (as they are today), just rendered in the new
horizontal layout.

## Styling notes

The new layout uses utility classes (`hover-elevate`, `active-elevate-2`, `border-primary-border`,
`var(--button-outline)`) that already exist identically in this branch's
`src/styles/global.css` — no CSS changes needed.

## Out of scope

- `Contact.tsx` UI changes (separate follow-up)
- Any Sanity/CMS wiring
- Real values for booking URL / WhatsApp number / phone / email (placeholders for now)

## Verification

- `pnpm typecheck` passes
- `pnpm dev`, visually check the footer renders the new 3/2 layout, links/icons look correct in
  both light and dark mode, and is responsive (single column on mobile, 5-col on `md+`)
