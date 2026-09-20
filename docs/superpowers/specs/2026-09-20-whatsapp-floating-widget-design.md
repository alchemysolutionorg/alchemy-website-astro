# WhatsApp Floating Widget — Design Spec

> **Status:** Design · **Date:** 2026-09-20 · **Branch:** feat/form-footer-changes

**Goal:** Add a floating WhatsApp icon (bottom-right) that opens a mini pre-chat popup. Visitor fills name + query → redirects to WhatsApp with a pre-filled message. Business gets standard push notification and replies from WhatsApp Business app.

---

## Flow

```
Visitor sees floating icon (bottom-right, fixed)
    │
    ▼  click
Mini chat popup opens
    │  ── Greeting: "How can we help you?"
    │  ── Name input
    │  ── Message input
    │  ── "Start Chat" button
    │
    ▼  submit
Redirect to wa.me/+8801340993493?text=<encoded message>
    │
    ▼
Conversation continues inside WhatsApp
    │
    ▼
Business gets notification on their phone
    │
    ▼
Reply from WhatsApp Business app (free)
    │  ── Greeting auto-reply
    │  ── Away messages
    │  ── Labels for organizing chats
```

---

## Architecture

- **Component:** `src/components/islands/WhatsAppFloating.tsx` — React island, client-side only
- **No server dependencies.** Everything is client-side + `wa.me` URL redirect.
- **No Cloud API, no monthly costs.**
- **Import & render** in `src/pages/index.astro` (or a shared layout) as a client island.

### Tech decisions

| Decision | Choice | Reason |
|----------|--------|--------|
| Tech | React island (Astro) | Matches existing island pattern (`Contact.tsx`, `Hero.tsx`). No new deps. |
| Styling | Tailwind v4 utility classes | Matches codebase. Reuse `hover-elevate`, `active-elevate-2` utilities. |
| Icons | Inline SVG (WhatsApp logo) | Already used in Footer.astro for WhatsApp CTA. No new icon library. |
| Animations | CSS transitions only (no framer-motion) | Lightweight. Floating icon pops in, chat popup slides up. |
| Package | No npm package | React-floating-whatsapp is stale (4yr ago), doesn't support pre-chat form. Self-build is ~100 LOC. |

---

## Component API

```tsx
// Props (all optional, sensible defaults)
interface WhatsAppFloatingProps {
  phoneNumber?: string;       // default: "+8801340993493"
  greetingMessage?: string;   // default: "How can we help you?"
  placeholderName?: string;   // default: "Your name"
  placeholderMessage?: string; // default: "Tell us about your project..."
  buttonLabel?: string;       // default: "Start Chat"
  position?: "bottom-right" | "bottom-left"; // default: "bottom-right"
}
```

---

## States

| State | Visual |
|-------|--------|
| **Idle** | Round floating button with WhatsApp logo, bottom-right, shadow, pulse/dot indicator |
| **Hover** | Button scales up slightly, tooltip: "Chat with us" |
| **Open (popup)** | Popup slides up from button. Shows greeting, name field, message field, submit button. |
| **Submitting** | Button shows loading spinner, fields disabled |
| **Error** | If fields empty on submit, inline validation error |
| **Closed** | Popup slides down, button returns to idle |

### Accessibility
- `aria-label` on floating button
- `role="dialog"` on popup
- `Escape` key closes popup
- Focus trap inside popup when open
- `aria-live` for validation errors

---

## Message format (sent to WhatsApp)

```
Hi, I'm {name}
{message}
```

Encoded as URL query param `?text=...` on `https://wa.me/{phoneNumber}`.

---

## Tasks

- [ ] **Task 1: Create `src/components/islands/WhatsAppFloating.tsx`**
  - Floating button (fixed bottom-right, round, WhatsApp green icon, subtle shadow)
  - Click → toggle popup
  - Popup with greeting, name input, message textarea, submit button
  - Form validation (name required, message required)
  - On submit → `window.open(whatsappUrl, '_blank')` redirect

- [ ] **Task 2: Add to page layout**
  - Import & render `<WhatsAppFloating client:load />` in the root layout or index page
  - Ensure it renders above all other content (high z-index)

- [ ] **Task 3: WhatsApp Business App setup (client-side, no code)**
  - Install WhatsApp Business on business phone
  - Configure greeting message auto-reply
  - Configure away message for after-hours
  - Set up quick replies for common responses

---

## References

- [WhatsApp Click to Chat](https://faq.whatsapp.com/5913398998672934) — official `wa.me` URL format
- [WhatsApp Business App](https://business.whatsapp.com/) — free app for auto-replies