# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Alchemy Digital Solutions website - a static marketing site built with Astro 5, React, and Tailwind CSS 4. Content is optionally managed via Sanity CMS, with fallback defaults embedded in components.

## Commands

### Development
```bash
pnpm dev              # Start dev server at localhost:4321
pnpm build            # Build for production (outputs to dist/)
pnpm preview          # Preview production build locally
pnpm typecheck        # Run Astro type checking
```

### Docker
```bash
# Development with hot reload
docker compose -f _deployment/docker-compose.dev.yml up

# Production build and deploy
docker compose -f _deployment/docker-compose.yml up --build -d

# Staging (3 replicas + nginx load balancer)
docker compose -f _deployment/docker-compose.staging.yml up --build -d
```

## Architecture

### Framework Stack
- **Astro 5** - Static site generator with React integration
- **React 19** - Interactive components via islands architecture
- **Tailwind CSS 4** - Utility-first styling with custom theme variables
- **Sanity CMS** - Optional headless CMS for content management
- **Framer Motion** - Animation library for React components

### Output Mode
Static output (`output: 'static'`). No server-side rendering. All pages are pre-built at compile time.

### Component Structure

```
src/
├── components/
│   ├── islands/          # React interactive components (client:* directives)
│   ├── sections/         # Astro static page sections
│   └── ui/               # Reusable UI components (shadcn-style)
├── layouts/Layout.astro  # Base HTML layout with SEO, fonts, theme
├── pages/                # Astro file-based routing (index.astro, 404.astro)
├── lib/
│   ├── sanity.ts         # Sanity client + GROQ queries
│   └── utils.ts          # Utility functions (cn, etc.)
└── styles/global.css     # Tailwind + custom theme CSS variables
```

### Islands Architecture

React components in `src/components/islands/` use Astro client directives:
- `client:load` - Hydrate immediately (Hero, ThemeProvider)
- `client:visible` - Hydrate when visible (Contact form)

Astro sections in `src/components/sections/` are static - no hydration overhead.

### Sanity CMS Integration

Located in `sanity/` directory:
- `sanity.config.ts` - Studio configuration
- `schemas/*.ts` - Content schemas (hero, services, testimonials, etc.)

The Sanity client (`src/lib/sanity.ts`) gracefully handles missing configuration by returning null for all queries. Components have embedded default content that displays when Sanity data is unavailable.

Required environment variables:
```
SANITY_PROJECT_ID=your-project-id
SANITY_DATASET=production
```

### Theme System

CSS variables in `global.css` define a full theme system with light/dark variants. Uses Tailwind 4's `@theme inline` directive to map HSL variables to Tailwind colors:

Key colors: `primary` (purple), `accent` (amber/gold), `background`, `foreground`, `card`, `border`

### UI Components

`src/components/ui/` contains a shadcn-style component library built on Radix UI primitives:
- Form components: button, input, select, dialog, etc.
- Layout components: card, sidebar, tabs, accordion, etc.
- All use `cn()` utility for class merging

### Docker Build

Multi-stage Dockerfile in `_deployment/Dockerfile`:
1. **Builder stage**: Node 22 Alpine + pnpm → builds static site
2. **Production stage**: Nginx Alpine → serves pre-built static files

Nginx configuration handles gzip, caching, SSL, and health checks at `/health`.

## Key Patterns

### Path Alias
`@/*` maps to `src/*`. Use this for imports from src directory.

### Framer Motion SSR
Configure `ssr.noExternal: ['framer-motion']` in Vite config to prevent SSR issues.

### Content Fallback Pattern
Components accept optional `data` prop from Sanity. If `data` is missing, use embedded defaults:
```tsx
const services = data?.services || defaultServices;
```

### Animation Performance
Use `will-change-transform` class and `contain: layout style` CSS for animated elements to enable GPU acceleration and prevent layout shifts.