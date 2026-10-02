# Homepage Sections Revamp — Hero, Testimonials, Engineering Culture — Design Spec

> **Status:** Implemented · **Date:** 2026-10-01 · **Branch:** `feat/hero-redesign` (commits 2026-09-30)

**Goal:** Move the homepage from a generic agency look to an "AI-native engineering studio" identity — outcome-first copy, live/agent-flavored motion, and proof instead of decoration. Three sections were rebuilt and two supporting bugs were fixed.

| Commit | Change |
|--------|--------|
| `25183f8` | Rebuild Testimonials as animated spotlight carousel |
| `28bde27` | Fix light-mode hydration mismatch in ThemeProvider |
| `9c0e863` | Rebuild Engineering Culture with agent terminal + filterable tech grid |
| `6b5e8aa` | Reorder ContactWidget options: WhatsApp → message → booking |
| `e38363c` | Rebuild Hero with outcome-first copy + live mission-control console |

### Shared principles (all three sections)

- **Static content with prop overrides.** Every section ships built-in default copy in code; props are optional overrides for a future CMS. No Sanity integration yet.
- **Reduced motion everywhere.** Typing loops render final state instantly, tilt/parallax disabled, autoplay off, CSS transitions neutralized under `prefers-reduced-motion: reduce`.
- **Dark-first, light-theme aware.** Sections use theme tokens (`bg-card`, `border-border`, `text-muted-foreground`) and `:global(.light)` overrides where raw rgba() was needed.
- **No new dependencies.** framer-motion (Hero), vanilla TS + Web Animations API (everything else).
- **Decorative visuals are `aria-hidden`;** interactive elements get `focus-visible` rings and ARIA state.

---

## 1. Hero — mission control

**File:** `src/components/islands/Hero.tsx` (React island, `client:load`)
**CSS:** `hero-aurora` + `hero-caret` keyframes and reduced-motion off-switch in `src/styles/global.css`

**Before:** particle-network canvas + typewriter headline ("We Build … Extraordinary/Unstoppable/…"). **After:** masked grid background, two drifting aurora glows, outcome-first headline, and a live "mission control" console card as the visual centerpiece.

```
Badge:  "AI-native engineering studio" (pulsing dot)
H1:     "Software that ships itself."        ← accent span gets .text-gradient
Sub:    design/build/operate + AI tooling cuts delivery time in half
CTAs:   [Start a project → #contact]  [Explore services → #services]
Card:   MissionControl (below the fold line, max-w-5xl)
Stats:  50+ shipped · 99.9% uptime · 5× faster delivery · 24/7 support
```

### MissionControl card

Mac-style window chrome: traffic-light dots, title `alchemy — mission control`, "zero-downtime" pill (sm+).

| Pane | Content |
|------|---------|
| **DeployConsole** (left, 1.6fr) | Types out `DEPLOY_SCRIPT` line by line: `alchemy deploy --prod` → tests/build/preview (dim) → `✓ promoted to production in 4.2s` (emerald) → `● agent watching error rates — all green` (amber). 16ms per char, 240–420ms line pauses, 4.2s hold, then loops. Blinking violet caret (`hero-caret` keyframes). |
| **StatusRail** (right, 1fr) | 3 cells: Production **live** (pinging emerald dot, p95 142ms) · Deploys/week sparkline bars (last bar violet) · Lighthouse **100** (perf·a11y·seo). Column layout on md+, row of 3 on mobile. |

**Line tones:** `prompt` (zinc-100) · `dim` (zinc-400) · `ok` (emerald-400) · `agent` (amber-300). Editing the script = editing the `DEPLOY_SCRIPT` array.

**3D tilt:** pointer-fine devices only (`matchMedia("(pointer: fine)")`). framer-motion springs map cursor position to ±4°/±5° rotateX/Y inside a `perspective:1600px` wrapper; disabled for reduced motion. Entry animation: fade + rise + rotateX 14→0, delayed 0.5s.

### Data contract (`HeroData`, all optional)

`badgeText` · `headline` + `headlineAccent` (replaced old `headlinePrefix/typewriterWords/headlineSuffix`) · `subheadline` · `primaryCta {text, href, external?}` · `secondaryCta` · `stats [{value, label}]`. Defaults for all live in the component.

⚠️ `sanity/schemas/hero.ts` and the GROQ query in `src/lib/sanity.ts` still describe the **old** typewriter fields — update them if/when Sanity is actually wired up.

### Accessibility & motion notes

- `MotionConfig reducedMotion="user"` wraps the section; aurora glows drop their animation via a reduced-motion media query in `global.css`.
- CTA links keep `data-testid="button-cta-primary|secondary"`.
- Background layers (grid, aurora, bottom fade) are `pointer-events-none` + `aria-hidden`.

---

## 2. Testimonials — spotlight carousel

**File:** `src/components/sections/Testimonials.astro` (Astro component + vanilla TS `<script>`, no React island)

**Before:** static card row. **After:** a featured "stage" showing one quote at a time, with an author rail beside it (vertical on lg, horizontal snap-scroll below), autoplay, and the whole section re-theming itself to the active testimonial's accent color.

### Structure

```
section#testimonials  (--tst-accent set on the section element)
├── Header: "Client Stories" / "Words from the Initiated"
├── .tst-grid  [stage | rail 340px]
│   ├── Stage (.tst-stage, data-stage)
│   │   ├── glass surface + accent topline + pointer spotlight (--mx/--my)
│   │   ├── ghost number "01" (blurred, 150px, swap animation per slide)
│   │   ├── slides (data-slide=i, one <article> each)
│   │   │   quote mark · word-staggered quote · metric count-up · author row
│   │   └── controls: prev/next · progress bar · 01/03 counter
│   └── Rail: one button per author (avatar initials, name, role, active bar)
```

### Per-accent theming

- Registered custom property `@property --tst-accent` (`<color>`, inherits) → it can **animate**; switching slides transitions glows, borders, quote mark, progress fill over 0.9s.
- All derived colors use `color-mix(in srgb, var(--tst-accent) N%, transparent)` — one hex per testimonial (`accentColor`, default `#8b5cf6`) drives everything.
- Each testimonial's accent: Elena Vance `#8b5cf6`, Marcus Thorne `#06b6d4`, Sarah Lin `#f59e0b`.

### Motion inventory

| Element | Effect |
|---------|--------|
| Quote | words masked, each `.tst-word-inner` slides up with `transition-delay: 120 + i*34ms` (build-time inline) |
| Ghost number | `tst-ghost-in` 0.7s blur+rise+scale, retriggered by class remove → reflow → add |
| Metric | rAF count-up, 1.1s quartic ease-out, formats via `data-value/decimals/prefix/suffix` (e.g. `4,000+`, `2.1×`, `6 wks`) |
| Avatar ring | conic-gradient spin, runs only on the active slide |
| Quote mark | spring-ish pop (`cubic-bezier(0.34,1.56,0.64,1)`) |
| Progress bar | `scaleX(elapsed/DURATION)` updated in the rAF tick |

### Autoplay & interaction rules

- Interval: `data-autoplay` attribute (7500ms). rAF loop with dt clamped to 64ms (survives tab throttling).
- **Paused** when: pointer is over the stage · section has focus (`focusin`) · section is out of view (IntersectionObserver, first intersection also selects slide 0) · `document.hidden` · user prefers reduced motion (also skips all count-ups/transitions).
- **Controls:** prev/next buttons, rail clicks, ←/→ arrow keys on the section, touch swipe >48px on the stage. Manual selection resets the autoplay timer.

### Accessibility

- `role="group"` + `aria-roledescription="carousel"`, slides get `aria-roledescription="slide"`, `aria-label="N of M"`, `aria-hidden` toggled by the script (inactive slides are also `visibility:hidden`).
- The word-split quote is `aria-hidden` with an `sr-only` full-quote span beside it.
- Rail buttons: `aria-label="Show testimonial from …"` + `aria-current` on the active one.

### Data contract

`data?: { sectionTitle?, sectionSubtitle?, testimonials? }` — testimonial: `{ quote, author, role, accentColor?, metric?: { value, decimals?, prefix?, suffix?, label } }`. Three defaults built in. (The `metric` field is not in the old Sanity schema — same caveat as Hero.)

---

## 3. Engineering Culture — agent terminal + filterable tech grid

**Files:** `src/components/sections/EngineeringCulture.astro` (static markup + vanilla `<script>`) and `src/components/islands/TechGrid.tsx` (React island, `client:visible`).

**Before:** static AI-tool cards + static icon wall. **After:** three beats — a live agent session terminal, the tool spotlight, and an interactive filterable tech wall — plus an RHCSA certification banner.

### 3a. Featured agent terminal (the 2×2 card)

Window chrome reading `claude — agent session` with a pulsing **live** badge. Content comes from `data-lines` (JSON of `{type, text}`, types: `cmd | dim | ok | pr`).

The vanilla script runs an async loop: `cmd` lines type char-by-char with a blinking caret at 34–74ms random jitter; other lines pop in after ~300ms; the full session holds 3.8s with a trailing caret, then restarts. `prefers-reduced-motion` → `renderStatic()` paints all lines once, no loop.

Script content (edit `terminalLines` in the frontmatter):

```
$ claude "refactor billing module, add tests"
⠿ indexing codebase… 214 files mapped
⠿ running test suite… 128 passed, 0 failed
✓ 14 files changed · 42 tests added · coverage 87% → 94%
✓ PR #482 opened → awaiting human review
↳ agent idle — picking up next ticket…
```

Card caption: **Agentic Engineering — Claude Code**, "agents draft, engineers decide; every diff lands only after senior human review." Scanline overlay via repeating-linear-gradient; card has `aria-label` describing the session.

### 3b. AI tools spotlight (4 cards)

OpenAI Codex (Cloud Agents) · Cursor (AI-First IDE) · MCP (Model Context Protocol, "we ship MCP servers, not just consume them") · Evals & Guardrails (AI Quality). Each card: inline SVG icon in a tinted rounded square, tag pill, name, desc; hover adds a radial glow + gradient topline in the tool's color. Cards stagger-reveal via `transition-delay` + the shared `.ai-tool-card` IntersectionObserver.

### 3c. RHCSA banner

Emerald glass banner: badge-shield icon, "Red Hat Certified System Administrators" + `RHCSA Certified` pill, copy about hardened deployments / SELinux / systemd / kernel networking, large RHCSA wordmark on lg+.

### 3d. TechGrid island — filterable tech wall

~52 technologies, each `{ name, color, category }`, categories: `ai | frontend | backend | devops | database` (source array: `defaultTechStack` in the .astro frontmatter, passed as prop).

- **Icons:** tree-shaken `react-icons/si` via a `name → icon` map + three custom inline SVGs (Java, MCP, Multi-Agent). Unknown names fall back to a plain color dot.
- **Filter bar:** All + 5 category pills with live counts and category-colored dot; `role="group"`, `aria-pressed` on each pill.
- **Grid:** `auto-fill minmax(96px, 1fr)`, fixed 96px rows. Cards are plain DOM with CSS-only hover (lift + scale + category glow/topline) — no per-card React listeners.
- **FLIP animation (no animation library):**
  1. On filter click, measure every visible card's `getBoundingClientRect()` + grid height **before** `setState`.
  2. In a `useLayoutEffect` after render, cards that persisted animate `translate(dx,dy) → 0` (300ms, `cubic-bezier(0.22,1,0.36,1)`); newly visible cards scale-fade in with a 10ms stagger capped at 120ms; the grid animates its height if it changed.
  3. Hidden cards get the `hidden` class (not unmounted) so filter switches are cheap and FLIP targets stay keyed by `data-name`.
  - Reduced motion → skip all animations (instant switch).
- Category accent colors: ai `#a855f7` · frontend `#60a5fa` · backend `#34d399` · devops `#fb923c` · database `#facc15`.

### Reveal system

`.reveal-item`, `.reveal-section`, `.ai-tool-card` start invisible and gain `.visible` via one shared IntersectionObserver (one-shot per element). **Note:** content is invisible until JS runs — acceptable here because the section is far below the fold, but don't reuse this pattern above the fold.

---

## Supporting fixes

### ThemeProvider light-mode hydration mismatch (`28bde27`)

`src/components/islands/ThemeProvider.tsx`. The old code initialized state from `localStorage` inside the `useState` initializer — the client's first render could say "light" while the server-rendered markup assumed "dark" → React hydration mismatch (and a flash). Fix: state always starts at `defaultTheme`; a first effect reads storage and sets a `resolved` flag; a second effect applies the class + persists only after resolution. `Layout.astro` keeps its `is:inline` pre-paint script (same `alchemy-ui-theme` key) to avoid FOUC — the two must stay in sync.

### ContactWidget option order (`6b5e8aa`)

`src/components/islands/ContactWidget.tsx`. Card order is now **WhatsApp → Send a message → Book a 30-min call**. Rationale: WhatsApp is the fastest, lowest-friction channel for the primary audience; booking a call is the heaviest ask and moves last. (This supersedes the order in the [WhatsApp widget spec](./2026-09-20-whatsapp-floating-widget-design.md); that doc's `mailto:` line and behavior are unchanged.)

---

## Light-mode contrast pass (post-review, 2026-10-01)

Visual review of every section in light mode (Playwright screenshots, 1440×900) found the dark-first palette washing out on white. Fixed without touching the dark theme:

| Problem | Fix |
|---------|-----|
| `.text-gradient` (`from-primary via-accent to-primary`) — the bright amber `--accent` (hsl 43 96% 58%) is ~2:1 on white; headline accents + stat values unreadable | `.light .text-gradient` uses darker stops: violet 265/89/48 → amber 33/94/38 → violet (`global.css`) |
| `.glass-card` borders (`border-white/20`) invisible on near-white page → Services/Process/WhyAlchemy cards look flat | `.light .glass-card`: border `rgba(15,23,42,.08)`, bg `white/.8`, softer inset shadow (`global.css`) |
| Services icon tiles & tag pills used `bg-white/5 border-white/10` | Swapped to `bg-black/[0.04] border-black/[0.06]` + `dark:` variants (`Services.tsx`) |
| Testimonial metric value used an 85%-accent color + glow `text-shadow` → blurry halo on white | `:global(.light) .tst-metric-value`: 72% accent mixed with black, no shadow; `.tst-surface` light border strengthened to `rgba(0,0,0,.09)` |
| Agent terminal card (`glass-card`) in light = pale lavender panel with sparse text, looked broken | Card is now **always dark** (`bg-[#0b0d16]`, same as the hero console) in both themes; terminal line colors fixed to zinc hexes instead of theme vars (`EngineeringCulture.astro`) |
| Tech-wall outer container `border-white/8 bg-white/40` invisible in light | `border-black/5 bg-white/70` + `dark:` variants; RHCSA/terminal dividers `dark:border-white/8` (`EngineeringCulture.astro`) |
| Footer sat on the exact page background in light | `bg-muted/60 dark:bg-background` (`Footer.astro`) |
| Process timeline dashed divider `border-white/10` invisible in light | `border-black/10 dark:border-white/10` (`Process.astro`) |

Screenshots for reference live outside the repo (captured during review); the dark theme renders identically before/after — every change is gated behind `.light`, `:global(.light)`, or paired `dark:` variants.

## File map

| File | Role |
|------|------|
| `src/components/islands/Hero.tsx` | Hero island: copy, CTAs, MissionControl (DeployConsole + StatusRail), tilt, stats |
| `src/components/sections/Testimonials.astro` | Spotlight carousel: markup, scoped CSS (@property accent), vanilla TS controller |
| `src/components/sections/EngineeringCulture.astro` | Section shell, agent terminal script, tool cards, RHCSA banner, tech-stack data |
| `src/components/islands/TechGrid.tsx` | Filter pills, icon map, FLIP-animated tech wall |
| `src/components/islands/ThemeProvider.tsx` | Hydration-safe theme state |
| `src/components/islands/ContactWidget.tsx` | Option order fix |
| `src/styles/global.css` | `hero-aurora` / `hero-caret` keyframes + reduced-motion guard |

## Verification

- `pnpm typecheck` (astro check) — clean for all files touched by this branch. (One **pre-existing, unrelated** error lives on `main`: `src/components/ui/sidebar.tsx` imports a missing `@/hooks/use-mobile`.)
- Manual: dark + light theme, `prefers-reduced-motion: reduce` (terminal static, no carousel autoplay, no tilt), mobile widths (rail becomes horizontal snap scroller, status rail becomes a 3-column row).

## Known follow-ups

- Sanity schemas/GROQ (`hero.ts`, `testimonials.ts`, sanity.ts queries) still describe pre-revamp fields — only relevant when the CMS is actually hooked up.
- Hero stats/Lighthouse/p95 numbers are hard-coded marketing values, not real telemetry.
- Testimonials + tech-stack content is static in code; a CMS (or a shared `constants` module) would be the next step if copy churns.
