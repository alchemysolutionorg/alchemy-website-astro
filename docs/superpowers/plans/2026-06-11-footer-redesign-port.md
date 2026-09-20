# Footer Redesign Port Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the 4-column `Footer.astro` layout with the new 5-column (3/2 split) layout from `feat/sanity-integration`, using hardcoded placeholder constants instead of Sanity props/data.

**Architecture:** Single-file rewrite of `src/components/sections/Footer.astro`. Left column (col-span-3) keeps the existing logo/description/nav/social content but re-lays it out as stacked rows; right column (col-span-2, new) adds a CTA block with "Book a Meeting" / "WhatsApp Us" buttons and contact details. No props interface — everything is local `const`s. No other files change; `src/pages/index.astro` already imports `<Footer />` with no props, which continues to work.

**Tech Stack:** Astro component, Tailwind v4 utility classes (existing `hover-elevate`/`active-elevate-2`/`--button-outline`/`primary-border` utilities already defined in `src/styles/global.css`), inline SVG icons (no new icon library).

---

### Task 1: Rewrite Footer.astro with the new 5-column layout

**Files:**
- Modify: `src/components/sections/Footer.astro` (full rewrite)

- [x] **Step 1: Replace the entire contents of `src/components/sections/Footer.astro`**

```astro
---
import { AlchemyLogo } from "@/components/AlchemyLogo";

const navigation = [
  { name: "Services", href: "#services" },
  { name: "Why Us", href: "#why-alchemy" },
  { name: "Process", href: "#process" },
];

const socialLinks = [
  { name: "Twitter", url: "#" },
  { name: "LinkedIn", url: "#" },
  { name: "GitHub", url: "#" },
];

const footerLinks = [
  { name: "Privacy Policy", href: "#" },
  { name: "Terms of Service", href: "#" },
];

const footerTitle = "ALCHEMY";
const footerDescription =
  "Mystical engineering. Flawless execution. We build the digital future, today.";
const ctaTitle = "Interested in working with us?";
const ctaSubtitle = "Book a call or drop us a message.";
const bookingUrl = "#";
const whatsappNumber = "1234567890";
const contactPhone = "+1 234 567 890";
const contactEmail = "hello@alchemy.dev";
const currentYear = new Date().getFullYear();

const whatsappUrl = `https://wa.me/${whatsappNumber}`;
---

<footer class="border-t border-border bg-background py-12 relative z-10">
  <div class="container mx-auto px-6">
    <div class="grid grid-cols-5 gap-12 2xl:gap-20 mb-12">

      {/* ── Left side: col-span-3 ── */}
      <div class="col-span-5 md:col-span-3">

        {/* Logo */}
        <div class="flex items-center gap-3 mb-6">
          <AlchemyLogo width={32} height={32} />
          <span class="font-display font-bold text-xl tracking-wide">
            {footerTitle}
          </span>
        </div>

        {/* Description */}
        <p class="text-muted-foreground max-w-sm mb-8">
          {footerDescription}
        </p>

        {/* Nav links — horizontal row */}
        <nav class="flex flex-wrap gap-x-6 gap-y-2 mb-8">
          {navigation.map((link) => (
            <a
              href={link.href}
              class="text-muted-foreground hover:text-primary transition-colors text-sm"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Divider */}
        <div class="border-t border-border mb-8" />

        {/* Social links — horizontal row */}
        <nav class="flex flex-wrap gap-x-6 gap-y-2">
          {socialLinks.map((link) => (
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              class="text-muted-foreground hover:text-primary transition-colors text-sm"
            >
              {link.name}
            </a>
          ))}
        </nav>
      </div>

      {/* ── Right side: col-span-2 ── */}
      <div class="col-span-5 md:col-span-2 flex flex-col justify-start">
        <p class="font-bold text-lg mb-1">{ctaTitle}</p>
        <p class="text-muted-foreground text-sm mb-6">{ctaSubtitle}</p>

        {/* Primary — Book a Meeting */}
        <a
          href={bookingUrl}
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium
                 bg-primary text-primary-foreground border border-primary-border
                 min-h-9 px-4 py-2 mb-3 w-full
                 hover-elevate active-elevate-2
                 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring
                 transition-colors"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          Book a Meeting
        </a>

        {/* Outline — WhatsApp */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium
                 border border-(--button-outline) shadow-xs active:shadow-none
                 min-h-9 px-4 py-2 mb-8 w-full
                 hover-elevate active-elevate-2
                 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring
                 transition-colors"
        >
          <svg class="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          WhatsApp Us
        </a>

        {/* Contact details — horizontal row */}
        <div class="flex flex-wrap gap-x-6 gap-y-3 text-sm text-muted-foreground">
          <a
            href={`tel:${contactPhone}`}
            class="flex items-center gap-2 hover:text-primary transition-colors"
          >
            <svg class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            {contactPhone}
          </a>
          <a
            href={`mailto:${contactEmail}`}
            class="flex items-center gap-2 hover:text-primary transition-colors"
          >
            <svg class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            {contactEmail}
          </a>
        </div>
      </div>
    </div>

    {/* ── Bottom bar ── */}
    <div class="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
      <p>&copy; {currentYear} Alchemy Engineering. All rights reserved.</p>
      <div class="flex gap-6">
        {footerLinks.map((link) => (
          <a href={link.href} class="hover:text-primary">{link.name}</a>
        ))}
      </div>
    </div>
  </div>
</footer>
```

Note: this keeps the original's `pt-8 border-t border-border` on the bottom bar (the sanity-integration version dropped `border-t` since it had its own divider above — but here the bottom bar still needs its own top border since there's no divider directly above it in the new layout's right column).

- [x] **Step 2: Run typecheck**

Run: `pnpm typecheck`
Expected: same result as before this change (1 pre-existing unrelated error in `src/components/ui/sidebar.tsx` re: `@/hooks/use-mobile`, 0 errors related to `Footer.astro`)

- [x] **Step 3: Visual check in dev server**

Run: `pnpm dev`, open `http://localhost:4321/`, scroll to the footer.

Verify:
- On desktop width (≥768px): left block (logo/description/nav/social) takes ~3/5 width, right CTA block takes ~2/5 width
- Nav links ("Services", "Why Us", "Process") render in a horizontal row, followed by a divider line, then social links ("Twitter", "LinkedIn", "GitHub") in a horizontal row
- Right side shows "Interested in working with us?" heading, "Book a Meeting" (filled button) and "WhatsApp Us" (outlined button with green WhatsApp icon) stacked full-width, then phone (`+1 234 567 890`) and email (`hello@alchemy.dev`) links with icons
- On mobile width (<768px): both columns stack to full width (single column)
- Bottom bar still shows copyright + "Privacy Policy" / "Terms of Service" links
- No console errors in the browser

- [x] **Step 4: Commit**

```bash
git add src/components/sections/Footer.astro
git commit -m "feat: redesign footer with CTA column and horizontal nav/social rows"
```

---

## Self-Review Notes

- Spec coverage: layout (5-col 3/2 split), left column re-layout (horizontal nav/social + divider, dropped "Connect" heading), right column CTA (heading, Book a Meeting, WhatsApp Us, phone/email), bottom bar with `footerLinks` array, hardcoded consts (no Props/data interface) — all covered in Task 1.
- Out of scope items (Contact.tsx, Sanity wiring, real placeholder values) are not included — correct per spec.
- Styling utilities (`hover-elevate`, `active-elevate-2`, `border-(--button-outline)`, `border-primary-border`) confirmed to already exist in `src/styles/global.css` on this branch — no CSS task needed.
- `src/pages/index.astro` usage (`<Footer />`, no props) remains compatible since the new component takes no props either.
