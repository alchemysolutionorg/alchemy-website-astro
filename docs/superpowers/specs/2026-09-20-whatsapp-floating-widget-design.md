# Floating Contact Widget — Design Spec

> **Status:** Approved · **Date:** 2026-09-23 (revised from 2026-09-20 WhatsApp-only draft) · **Branch:** feat/contact-widget

**Goal:** A floating contact button (bottom-right) that opens a small card with three ways to reach Alchemy, so the site converts visitors from every market — not only WhatsApp-first regions.

| Option | Who it's for | Action |
|--------|--------------|--------|
| **Book a 30-min call** | International / B2B clients (US, UK, EU) | Opens the Zoho Calendar booking page in a new tab |
| **Chat on WhatsApp** | South Asia, MENA, quick questions | Opens `wa.me` with a pre-filled greeting — one tap |
| **Send a message** | Visitors who prefer email / detail | Scrolls to the existing contact form (`/#contact`) |

Plus a plain `mailto:` line at the bottom of the card.

### Why this shape (revision notes)
- The original draft was WhatsApp-only with a Name + Message pre-chat form. Dropped because:
  - WhatsApp already shows the sender's name and number — asking for a name is pure friction.
  - WhatsApp alone doesn't serve Western B2B clients, who expect to book a call or email.
- No live-chat SaaS (Intercom/Crisp): live chat only helps with near-instant replies; a booking link does the job better for a small team.
- No "submitting" state: nothing is sent to a server, links open instantly.
- No Web3Forms copy of WhatsApp clicks: without a visitor-entered field there is nothing useful to send.

---

## Flow

```
Visitor sees floating button (bottom-right, fixed, fades in after hydration)
    │
    ▼  click
Card opens (slides up from button)
    │  ── Header: "Talk to Alchemy" · "We usually reply within a few hours"
    │  ── [📅 Book a 30-min call]      → Zoho Calendar booking page (new tab)
    │  ── [💬 Chat on WhatsApp]        → wa.me/8801340993493?text=<greeting>
    │  ── [✉ Send us a message]        → /#contact (card closes)
    │  ── "or email hello@alchemysolution.org"
    │
    ▼
Booking  → Zoho Calendar confirms + Zoho Meeting link to both sides
WhatsApp → visitor taps Send in WhatsApp → business replies from WhatsApp Business app
Form     → existing Web3Forms flow
```

---

## Architecture

- **Component:** `src/components/islands/ContactWidget.tsx` — React island, no server, no new deps.
- **Mounted in:** `src/layouts/Layout.astro` with `client:idle` (every page incl. 404; doesn't compete with Hero hydration).
- **Config:** `src/lib/constants.ts` — single source for WhatsApp number, email, booking URL (shared with `Footer.astro`).
  - `BOOKING_URL` defaults to the public Zoho Calendar booking link; `PUBLIC_BOOKING_URL` env var overrides it. If it's ever empty, "Book a call" is hidden and the footer button falls back to `#contact`.
- **WhatsApp URL:** `https://wa.me/8801340993493` — digits only, no `+` (per WhatsApp's click-to-chat format). Footer link fixed too.
  - Desktop: opens in a new tab (WhatsApp Web / desktop app).
  - Touch devices (`pointer: coarse`): same tab, so the OS hands off to the app without leaving a blank tab.
- **Pre-filled WhatsApp text:** `Hi Alchemy! I found you through your website and I'd like to talk about a project.`

### Tech decisions

| Decision | Choice | Reason |
|----------|--------|--------|
| Tech | React island | Matches `Contact.tsx`, `Hero.tsx`. |
| Styling | Tailwind v4 + existing tokens (`bg-card`, `border-border`, `primary`) | Works in dark and light theme. |
| Icons | `lucide-react` + inline WhatsApp SVG (same path as Footer) | Already in bundle. |
| Animation | CSS transitions only | Lightweight; disabled under `prefers-reduced-motion`. |
| Package | None | Self-built, ~200 LOC. |

---

## States

| State | Visual |
|-------|--------|
| **Idle** | 56px round primary-gradient button, chat icon, shadow; one-time ping ring on first appearance |
| **Hover (desktop)** | Slight scale-up + "Chat with us" label to the left |
| **Open** | Card (360px desktop, full width − 32px on mobile) slides up above the button; button icon turns into ✕ |
| **Closed** | Card fades/slides down; button back to idle |

### Placement & layering
- Desktop: 24px from bottom/right. Mobile: 16px.
- `z-40`: above page content, **below** the mobile nav menu (`z-[60]`/`z-[70]`).
- Sonner toasts are offset upward so they never cover the button.

### Accessibility
- Button: `aria-label`, `aria-expanded`, `aria-controls`.
- Card: `role="dialog"`, `aria-modal="false"`, `aria-labelledby`; `inert` when closed.
- On open, focus moves to the first option; `Escape` or outside click closes; focus returns to the button.
- No focus trap — the card is non-modal and covers only a corner.
- Ping/slide animations off with `prefers-reduced-motion`.

---

## Tasks

- [ ] **Task 1:** Add `WHATSAPP_NUMBER`, `CONTACT_EMAIL`, `CONTACT_PHONE`, `BOOKING_URL` to `src/lib/constants.ts`; add `PUBLIC_BOOKING_URL` to `.env.example`.
- [ ] **Task 2:** Build `src/components/islands/ContactWidget.tsx`.
- [ ] **Task 3:** Mount in `Layout.astro` (`client:idle`); offset Sonner toasts.
- [ ] **Task 4:** Footer uses shared constants (fixes `+` in wa.me link and `#` booking link).
- [ ] **Task 5:** Verify in browser — desktop + mobile, dark + light, keyboard, mobile-menu layering.
- [ ] **Task 6 (no code, business side):**
  - Zoho Calendar → Appointment Booking → create "30-min Discovery Call" link ✅ (set as default in `constants.ts`). (Feature is rolling out in phases; contact Zoho support if it's not visible.)
  - WhatsApp Business app: greeting auto-reply, away message, quick replies.

---

## References

- [WhatsApp Click to Chat](https://faq.whatsapp.com/5913398998672934)
- [Zoho Calendar — Appointment Booking](https://www.zoho.com/calendar/help/appointment-booking.html)
- [WhatsApp Business App](https://business.whatsapp.com/)
