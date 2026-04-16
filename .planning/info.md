# Sanity Integration Analysis

## Current State - Problems Identified

### Current Schema Structure (Not Industry Standard)

**Current approach**: Each section is a **separate document**
```
hero (document)          ← standalone
services (document)      ← standalone
process (document)       ← standalone
testimonials (document)  ← standalone
engineeringCulture (document) ← standalone
siteSettings (document)  ← standalone
```

**Problems**:
1. No relationship between sections and pages
2. Editor must create 6 separate documents for one page
3. No page concept - just floating sections
4. Cannot reorder sections
5. Cannot control which sections appear on which page
6. Multiple "hero" documents could exist (confusion)
7. No slug/URL management

---

## Proposed Industry-Standard Structure

### Overview: Page Builder Pattern

This is the modern CMS pattern used by:
- Sanity's own starter templates
- Contentful, Strapi, Builder.io
- Modern headless CMS best practices

### Structure Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                        SANITY STUDIO                         │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌─────────────────────────────────────────────────────┐    │
│  │ siteSettings (Singleton Document)                    │    │
│  │ - Global navigation                                   │    │
│  │ - Footer content                                      │    │
│  │ - SEO defaults (title, description, keywords)        │    │
│  │ - Social links                                        │    │
│  │ - Logo                                                │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                              │
│  ┌─────────────────────────────────────────────────────┐    │
│  │ homePage (Singleton Document)                        │    │
│  │                                                       │    │
│  │  sections: [  ← Array of section objects             │    │
│  │    ┌──────────────────┐                              │    │
│  │    │ hero (object)     │  ← inline, not document     │    │
│  │    └──────────────────┘                              │    │
│  │    ┌──────────────────┐                              │    │
│  │    │ services (object) │                             │    │
│  │    └──────────────────┘                              │    │
│  │    ┌──────────────────┐                              │    │
│  │    │ process (object)  │                             │    │
│  │    └──────────────────┘                              │    │
│  │    ...                                                │    │
│  │  ]                                                    │    │
│  │                                                       │    │
│  │  seoOverrides?: object  ← optional page-level SEO    │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                              │
│  ┌─────────────────────────────────────────────────────┐    │
│  │ page (Document - Multiple instances)                  │    │
│  │                                                       │    │
│  │  title: string                                        │    │
│  │  slug: slug field (e.g., "/about", "/services")      │    │
│  │                                                       │    │
│  │  sections: [  ← Same reusable section objects        │    │
│  │    hero, services, testimonials, etc.                │    │
│  │  ]                                                    │    │
│  │                                                       │    │
│  │  seoOverrides?: object                                │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                              │
│  ┌─────────────────────────────────────────────────────┐    │
│  │ Section Objects (Reusable, defined once)              │    │
│  │                                                       │    │
│  │  heroSection        ← object type                    │    │
│  │  servicesSection    ← object type                    │    │
│  │  processSection     ← object type                    │    │
│  │  testimonialsSection ← object type                   │    │
│  │  engineeringSection ← object type                    │    │
│  │  contactSection     ← object type                    │    │
│  │  whyAlchemySection  ← object type                    │    │
│  │  ctaSection         ← generic CTA object             │    │
│  │  textSection        ← simple rich text               │    │
│  │  imageSection       ← standalone image               │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### Key Concepts

| Type | Purpose | Example |
|------|---------|---------|
| **Document** | Creates an entry in Studio, appears in list | `page`, `homePage`, `siteSettings` |
| **Object** | Embedded within a document, reusable structure | `heroSection`, `servicesSection` |
| **Singleton** | Document that can only have one instance | `homePage`, `siteSettings` |

### Benefits of This Structure

1. **One document = One page** - Editor creates one page document, adds sections
2. **Section reordering** - Drag-drop sections in array
3. **Section visibility** - Remove sections without deleting content
4. **Reusable sections** - Same object types used in homePage and page
5. **Slug-based routing** - Dynamic pages from CMS
6. **SEO per page** - Override global SEO settings per page
7. **No orphaned content** - Sections belong to pages, not floating

---

## Proposed Schema Implementation

### 1. Site Settings (Singleton Document)

```typescript
// sanity/schemas/documents/siteSettings.ts
export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  // Singleton: only one instance
  __experimental_noPublish: true, // Or use singleton plugin
  
  fields: [
    { name: 'title', type: 'string', title: 'Site Title' },
    { name: 'description', type: 'text', title: 'Meta Description' },
    { name: 'keywords', type: 'array', of: [{ type: 'string' }] },
    { name: 'logo', type: 'image', title: 'Logo' },
    { name: 'favicon', type: 'image', title: 'Favicon' },
    
    // Navigation
    { 
      name: 'navigation', 
      type: 'array', 
      of: [{ type: 'object', fields: [
        { name: 'label', type: 'string' },
        { name: 'href', type: 'string' },
        { name: 'isExternal', type: 'boolean' },
      ]}]
    },
    
    // Footer
    { name: 'footerText', type: 'text' },
    {
      name: 'socialLinks',
      type: 'array',
      of: [{ type: 'object', fields: [
        { name: 'platform', type: 'string' }, // twitter, linkedin, github, etc.
        { name: 'url', type: 'url' },
        { name: 'icon', type: 'string' }, // icon name
      ]}]
    },
    
    // Default SEO
    { name: 'ogImage', type: 'image', title: 'Default Open Graph Image' },
  ],
});
```

### 2. Home Page (Singleton Document)

```typescript
// sanity/schemas/documents/homePage.ts
export const homePage = defineType({
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  // Singleton
  
  fields: [
    {
      name: 'sections',
      type: 'array',
      title: 'Page Sections',
      of: [
        { type: 'heroSection' },
        { type: 'servicesSection' },
        { type: 'processSection' },
        { type: 'testimonialsSection' },
        { type: 'engineeringSection' },
        { type: 'whyAlchemySection' },
        { type: 'contactSection' },
      ],
    },
    {
      name: 'seo',
      type: 'object',
      title: 'SEO Overrides',
      fields: [
        { name: 'title', type: 'string' },
        { name: 'description', type: 'text' },
        { name: 'ogImage', type: 'image' },
      ],
    },
  ],
});
```

### 3. Page (Multi-instance Document)

```typescript
// sanity/schemas/documents/page.ts
export const page = defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  
  fields: [
    { name: 'title', type: 'string', title: 'Page Title' },
    {
      name: 'slug',
      type: 'slug',
      title: 'URL Slug',
      options: {
        source: 'title',
        slugify: (input) => input.toLowerCase().replace(/\s+/g, '-').slice(0, 96),
      },
    },
    {
      name: 'sections',
      type: 'array',
      title: 'Page Sections',
      of: [
        { type: 'heroSection' },
        { type: 'servicesSection' },
        { type: 'processSection' },
        { type: 'testimonialsSection' },
        { type: 'engineeringSection' },
        { type: 'whyAlchemySection' },
        { name: 'ctaSection', type: 'object', fields: [...] },
        { name: 'richTextSection', type: 'object', fields: [
          { name: 'content', type: 'array', of: [{ type: 'block' }] },
        ]},
        { name: 'imageSection', type: 'object', fields: [
          { name: 'image', type: 'image' },
          { name: 'alt', type: 'string' },
          { name: 'caption', type: 'string' },
        ]},
      ],
    },
    {
      name: 'seo',
      type: 'object',
      title: 'SEO Settings',
      fields: [
        { name: 'title', type: 'string' },
        { name: 'description', type: 'text' },
        { name: 'keywords', type: 'array', of: [{ type: 'string' }] },
        { name: 'ogImage', type: 'image' },
        { name: 'noIndex', type: 'boolean' },
      ],
    },
  ],
});
```

### 4. Section Objects (Reusable)

```typescript
// sanity/schemas/objects/heroSection.ts
export const heroSection = defineType({
  name: 'heroSection',
  title: 'Hero Section',
  type: 'object',
  
  fields: [
    { name: 'badgeText', type: 'string' },
    { name: 'headlinePrefix', type: 'string' },
    { 
      name: 'typewriterWords', 
      type: 'array', 
      of: [{ type: 'string' }] 
    },
    { name: 'headlineSuffix', type: 'string' },
    { name: 'subheadline', type: 'text', rows: 3 },
    
    {
      name: 'primaryCta',
      type: 'object',
      fields: [
        { name: 'text', type: 'string' },
        { name: 'href', type: 'string' },
        { name: 'variant', type: 'string', options: {
          list: ['primary', 'secondary', 'outline']
        }},
      ],
    },
    
    {
      name: 'secondaryCta',
      type: 'object',
      fields: [
        { name: 'text', type: 'string' },
        { name: 'href', type: 'string' },
      ],
    },
    
    {
      name: 'stats',
      type: 'array',
      of: [{ type: 'object', fields: [
        { name: 'value', type: 'string' },
        { name: 'label', type: 'string' },
      ]}],
    },
    
    { name: 'backgroundImage', type: 'image' },
  ],
});
```

```typescript
// sanity/schemas/objects/servicesSection.ts
export const servicesSection = defineType({
  name: 'servicesSection',
  title: 'Services Section',
  type: 'object',
  
  fields: [
    { name: 'sectionTitle', type: 'string' },
    { name: 'sectionSubtitle', type: 'text' },
    {
      name: 'services',
      type: 'array',
      of: [{ type: 'serviceItem' }], // Nested object
    },
  ],
});

// Nested object for service items
export const serviceItem = defineType({
  name: 'serviceItem',
  title: 'Service Item',
  type: 'object',
  
  fields: [
    { name: 'title', type: 'string' },
    { name: 'description', type: 'text' },
    { name: 'icon', type: 'iconSelector' }, // Custom icon type
    { name: 'tags', type: 'array', of: [{ type: 'string' }] },
    
    // Color handling - structured approach
    {
      name: 'theme',
      type: 'object',
      fields: [
        { name: 'accentColor', type: 'color' }, // Sanity color picker
        { name: 'gradientDirection', type: 'string', options: {
          list: ['to-br', 'to-r', 'to-bl']
        }},
      ],
    },
    
    { name: 'link', type: 'url' },
  ],
});
```

### 5. Icon Handling - Structured Approach

**Option A: Icon Selector Object (Recommended)**

```typescript
// sanity/schemas/objects/iconSelector.ts
import { icons } from './iconList'; // Lucide icon names

export const iconSelector = defineType({
  name: 'iconSelector',
  title: 'Icon',
  type: 'object',
  
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Icon Name',
      options: {
        list: icons, // Predefined list of Lucide icons
        layout: 'grid', // Visual grid selector
      },
    },
    {
      name: 'color',
      type: 'color',
      title: 'Icon Color',
    },
    {
      name: 'size',
      type: 'string',
      title: 'Size',
      options: {
        list: ['sm', 'md', 'lg', 'xl'],
      },
    },
  ],
});

// Icon list - all available Lucide icons
export const icons = [
  { title: 'Code', value: 'Code2' },
  { title: 'Sparkles', value: 'Sparkles' },
  { title: 'Layout', value: 'Layout' },
  { title: 'Container', value: 'Container' },
  { title: 'Lightbulb', value: 'Lightbulb' },
  { title: 'Search', value: 'Search' },
  { title: 'Rocket', value: 'Rocket' },
  { title: 'Cpu', value: 'Cpu' },
  { title: 'Flask', value: 'FlaskConical' },
  { title: 'Users', value: 'Users' },
  { title: 'Star', value: 'Star' },
  { title: 'Check', value: 'Check' },
  // ... more icons
];
```

**Option B: Sanity's Native Color Picker**

Sanity has a built-in `color` type that provides a visual color picker:

```typescript
{ 
  name: 'accentColor', 
  type: 'color', 
  title: 'Accent Color',
  options: {
    disableAlpha: true, // No transparency
    // Or allow alpha for rgba values
  },
}
```

Returns: `{ hex: '#8b5cf6', rgb: { r: 139, g: 92, b: 246 }, alpha: 1 }`

---

## Live Preview Analysis

### Challenge for Static Sites

Astro with `output: 'static'` has no live preview capability by default. All pages are pre-built.

### Solutions for Live Preview

| Solution | Complexity | Pros | Cons | Best For |
|----------|------------|------|------|----------|
| **1. Sanity Presentation Tool** | Medium | Official solution, iframe preview, GROQ live listening | Requires preview URL (dev server) | Production-ready sites |
| **2. Preview Mode (SSR)** | High | True live preview, instant updates | Requires SSR setup, server hosting | Sites needing real-time preview |
| **3. Vite Preview + Webhook** | Low | Simple, no infrastructure change | Manual trigger, not real-time | Simple setups |
| **4. Astro Dev Server** | Medium | Uses existing dev server, fast | Not production preview | Development only |

### Recommended Approach: Presentation Tool

Sanity's **Presentation Tool** (formerly Preview Kit) is the modern solution:

```typescript
// sanity/sanity.config.ts
import { presentationTool } from '@sanity/presentation';

export default defineConfig({
  plugins: [
    presentationTool({
      previewUrl: {
        // Point to your preview deployment or dev server
        origin: 'http://localhost:4321',
        previewMode: {
          enable: '/api/preview/enable',
          disable: '/api/preview/disable',
        },
      },
      // Match documents to preview URLs
      perspectives: ['published', 'drafts'],
    }),
  ],
});
```

### Implementation Requirements

For Astro static sites, you need:

1. **Preview API Route** - Create endpoints to toggle preview mode:
   - `/api/preview/enable` - Sets preview cookie, redirects to page
   - `/api/preview/disable` - Clears cookie, redirects back

2. **Preview-aware Data Fetching** - Fetch drafts when preview mode active:
   ```typescript
   const perspective = Astro.request.headers.get('preview') ? 'drafts' : 'published';
   const data = await sanityClient.fetch(query, {}, { perspective });
   ```

3. **Preview Deployment** - Deploy SSR version for preview:
   - Vercel: Set `output: 'server'` for preview branch
   - Netlify: Use On-demand Builders
   - Or: Dedicated preview server

### Alternative: Simple Preview Webhook

For simpler needs without full preview infrastructure:

```typescript
// In Sanity Studio dashboard
// Add a "Preview" button that:
// 1. Triggers Vite preview server
// 2. Opens localhost:4321 with latest content
// 3. Uses Sanity live listening for updates

// Custom Studio component
function PreviewButton() {
  const handleClick = () => {
    // Open preview window
    window.open('http://localhost:4321', 'preview');
  };
  return <Button onClick={handleClick}>Preview Site</Button>;
}
```

### Recommendation for This Project

**Phase 1**: Skip live preview initially - use build preview (standard for SSG)

**Phase 2** (Optional): Add Presentation Tool later if client requests:
- Set up preview deployment (SSR branch)
- Add preview API routes
- Configure Presentation Tool in Sanity Studio

---

## Proposed File Structure

```
sanity/
├── sanity.config.ts          # Studio configuration
├── schemas/
│   ├── index.ts              # Schema exports
│   ├── documents/
│   │   ├── siteSettings.ts   # Singleton - global settings
│   │   ├── homePage.ts       # Singleton - home page content
│   │   └── page.ts           # Multi - dynamic pages
│   └── objects/
│   │   ├── heroSection.ts
│   │   ├── servicesSection.ts
│   │   ├── serviceItem.ts    # Nested in servicesSection
│   │   ├── processSection.ts
│   │   ├── processStep.ts    # Nested in processSection
│   │   ├── testimonialsSection.ts
│   │   ├── testimonialItem.ts
│   │   ├── engineeringSection.ts
│   │   ├── whyAlchemySection.ts
│   │   ├── contactSection.ts
│   │   ├── iconSelector.ts   # Reusable icon type
│   │   ├── seoObject.ts      # Reusable SEO object
│   │   └── ctaObject.ts      # Reusable CTA object
│   └── utils/
│   │   └── iconList.ts       # Available icons list
```

---

## GROQ Query Examples

### Fetch Home Page

```groq
*[_type == "homePage"][0] {
  sections[] {
    ...,
    _type == "heroSection" => {
      ...,
      primaryCta { text, href, variant },
      secondaryCta { text, href },
      stats[] { value, label },
    },
    _type == "servicesSection" => {
      ...,
      services[] {
        title, description,
        icon { name, color, size },
        theme { accentColor, gradientDirection },
        tags,
      },
    },
    // ... other sections
  },
  seo { title, description, ogImage { asset-> } },
}
```

### Fetch Page by Slug

```groq
*[_type == "page" && slug.current == $slug][0] {
  title,
  slug,
  sections[] {
    ...,
    // Same projection as homePage
  },
  seo { title, description, keywords, ogImage { asset-> }, noIndex },
}
```

### Fetch Site Settings

```groq
*[_type == "siteSettings"][0] {
  title, description, keywords,
  logo { asset-> },
  navigation[] { label, href, isExternal },
  socialLinks[] { platform, url, icon },
  footerText,
}
```

---

## Implementation Priority

### Phase 1: Sanity Schema Restructure (Current Focus)
1. Create new schema structure (documents + objects)
2. Set up icon selector with visual picker
3. Add color picker for theme colors
4. Remove old standalone document schemas
5. Test in Sanity Studio

### Phase 2: Frontend Integration (Later)
1. Update GROQ queries for new structure
2. Create section renderer component (handles any section type)
3. Update Astro pages to use new data structure
4. Dynamic page routing with slug

### Phase 3: Live Preview (Optional)
1. Set up preview deployment (SSR mode)
2. Add preview API routes
3. Configure Presentation Tool
4. Test draft preview workflow

---

## Summary of Changes

| Current | Proposed |
|---------|----------|
| 6 separate documents | 3 documents (siteSettings, homePage, page) |
| Sections as documents | Sections as objects (embedded) |
| Icon as string | Icon as structured object (name + color + size) |
| Color as string | Color as Sanity color picker (hex + rgb) |
| Fixed section order | Array-based, reorderable sections |
| No dynamic pages | Pages document with slug |
| No SEO per page | SEO object per page + global defaults |

This structure follows industry standards used by modern headless CMS implementations.