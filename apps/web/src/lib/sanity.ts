import { createClient } from '@sanity/client';
import type {
  HomePage,
  Page,
  SiteSettings,
  PageSlugInfo,
} from './sanity.types';

// Create a mock client if Sanity is not configured
const createSanityClient = () => {
  const projectId = import.meta.env.SANITY_PROJECT_ID;

  if (!projectId || projectId === 'your-project-id') {
    // Return a mock client that returns null for all queries
    // This allows the site to run without Sanity configured
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const mockFetch = async <T>(_query: string, _params?: any): Promise<T> => {
      return null as T;
    };
    return { fetch: mockFetch };
  }

  return createClient({
    projectId,
    dataset: import.meta.env.SANITY_DATASET || 'production',
    apiVersion: '2024-01-01',
    useCdn: false,
  });
};

export const sanityClient = createSanityClient();

// ============================================
// GROQ Queries for New Schema Structure
// ============================================

/**
 * Site Settings - Global configuration for the site
 * Used by Layout.astro (SEO) and Footer.astro (navigation, social links)
 */
const siteSettingsQuery = `*[_type == "siteSettings"][0] {
  title,
  description,
  keywords,
  logo { asset-> { url } },
  favicon { asset-> { url } },
  navigation[] {
    label,
    href,
    external
  },
  footerTitle,
  footerDescription,
  socialLinks[] {
    platform,
    url
  },
  footerLinks[] {
    label,
    href,
    external
  },
  ogImage { asset-> { url } },
  email,
  phone,
  address
}`;

/**
 * Home Page - Singleton document with all sections
 * Sections use conditional projections for type-specific fields
 */
const homePageQuery = `*[_type == "homePage"][0] {
  title,
  sections[] {
    ...,
    _type == "heroSection" => {
      _type,
      _key,
      badgeText,
      headlinePrefix,
      typewriterWords,
      headlineSuffix,
      subheadline,
      primaryCta { text, href, variant, icon, external },
      secondaryCta { text, href, variant, icon, external },
      stats[] { value, label },
      backgroundImage { asset-> { url } }
    },
    _type == "servicesSection" => {
      _type,
      _key,
      sectionTitle,
      sectionSubtitle,
      services[] {
        title,
        description,
        icon { name, color { hex }, size },
        tags,
        color { hex },
        link
      }
    },
    _type == "engineeringSection" => {
      _type,
      _key,
      sectionTitle,
      sectionSubtitle,
      aiSectionTitle,
      aiSectionSubtitle,
      aiTools[] {
        name,
        tag,
        description,
        color { hex },
        link
      },
      techStack[] {
        name,
        color { hex },
        category,
        featured,
        link
      },
      rhcsaCertified
    },
    _type == "whyAlchemySection" => {
      _type,
      _key,
      title,
      titleHighlight,
      subtitle,
      valueProps[] { title, description }
    },
    _type == "processSection" => {
      _type,
      _key,
      sectionTitle,
      sectionSubtitle,
      steps[] {
        num,
        phase,
        title,
        description,
        icon,
        color { hex },
        tag
      }
    },
    _type == "testimonialsSection" => {
      _type,
      _key,
      sectionTitle,
      sectionSubtitle,
      testimonials[] {
        quote,
        author,
        role,
        accentColor { hex },
        avatar { asset-> { url } }
      }
    },
    _type == "contactSection" => {
      _type,
      _key,
      title,
      titleHighlight,
      subtitle,
      successMessage,
      submitButtonText,
      submittingButtonText
    }
  },
  seo {
    title,
    description,
    keywords,
    ogImage { asset-> { url } },
    noIndex,
    canonical
  }
}`;

/**
 * All Pages - Minimal info for static path generation
 * Used by [slug].astro getStaticPaths()
 */
const allPagesQuery = `*[_type == "page"] {
  slug { current },
  title
}`;

/**
 * Single Page by Slug - Full page with sections
 * Used by [slug].astro to render dynamic pages
 */
const pageBySlugQuery = `*[_type == "page" && slug.current == $slug][0] {
  title,
  slug { current },
  sections[] {
    ...,
    _type == "heroSection" => {
      _type,
      _key,
      badgeText,
      headlinePrefix,
      typewriterWords,
      headlineSuffix,
      subheadline,
      primaryCta { text, href, variant, icon, external },
      secondaryCta { text, href, variant, icon, external },
      stats[] { value, label },
      backgroundImage { asset-> { url } }
    },
    _type == "servicesSection" => {
      _type,
      _key,
      sectionTitle,
      sectionSubtitle,
      services[] {
        title,
        description,
        icon { name, color { hex }, size },
        tags,
        color { hex },
        link
      }
    },
    _type == "engineeringSection" => {
      _type,
      _key,
      sectionTitle,
      sectionSubtitle,
      aiSectionTitle,
      aiSectionSubtitle,
      aiTools[] {
        name,
        tag,
        description,
        color { hex },
        link
      },
      techStack[] {
        name,
        color { hex },
        category,
        featured,
        link
      },
      rhcsaCertified
    },
    _type == "whyAlchemySection" => {
      _type,
      _key,
      title,
      titleHighlight,
      subtitle,
      valueProps[] { title, description }
    },
    _type == "processSection" => {
      _type,
      _key,
      sectionTitle,
      sectionSubtitle,
      steps[] {
        num,
        phase,
        title,
        description,
        icon,
        color { hex },
        tag
      }
    },
    _type == "testimonialsSection" => {
      _type,
      _key,
      sectionTitle,
      sectionSubtitle,
      testimonials[] {
        quote,
        author,
        role,
        accentColor { hex },
        avatar { asset-> { url } }
      }
    },
    _type == "contactSection" => {
      _type,
      _key,
      title,
      titleHighlight,
      subtitle,
      successMessage,
      submitButtonText,
      submittingButtonText
    },
    _type == "richTextSection" => {
      _type,
      _key,
      content
    },
    _type == "imageSection" => {
      _type,
      _key,
      image { asset-> { url } },
      alt,
      caption
    },
    _type == "ctaSection" => {
      _type,
      _key,
      title,
      description,
      cta { text, href, variant, icon, external }
    }
  },
  seo {
    title,
    description,
    keywords,
    ogImage { asset-> { url } },
    noIndex,
    canonical
  }
}`;

// Export queries object for use in pages
export const queries = {
  siteSettings: siteSettingsQuery,
  homePage: homePageQuery,
  allPages: allPagesQuery,
  pageBySlug: pageBySlugQuery,
};

// ============================================
// Typed Fetch Functions (convenience wrappers)
// ============================================

// Helper to call fetch with proper typing
const doFetch = async <T>(query: string, params?: Record<string, unknown>): Promise<T> => {
  // Cast to any to bypass union type inference issues
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (sanityClient as any).fetch(query, params) as Promise<T>;
};

/**
 * Fetch site settings from Sanity
 */
export async function fetchSiteSettings(): Promise<SiteSettings | null> {
  return doFetch<SiteSettings | null>(queries.siteSettings);
}

/**
 * Fetch home page with all sections from Sanity
 */
export async function fetchHomePage(): Promise<HomePage | null> {
  return doFetch<HomePage | null>(queries.homePage);
}

/**
 * Fetch all page slugs for static path generation
 */
export async function fetchAllPageSlugs(): Promise<PageSlugInfo[] | null> {
  return doFetch<PageSlugInfo[] | null>(queries.allPages);
}

/**
 * Fetch a single page by slug
 */
export async function fetchPageBySlug(slug: string): Promise<Page | null> {
  return doFetch<Page | null>(queries.pageBySlug, { slug });
}

/**
 * Fetch all data needed for home page in parallel
 * Returns { homePage, siteSettings }
 */
export async function fetchHomePageData(): Promise<{
  homePage: HomePage | null;
  siteSettings: SiteSettings | null;
}> {
  const [homePage, siteSettings] = await Promise.all([
    fetchHomePage(),
    fetchSiteSettings(),
  ]);

  return { homePage, siteSettings };
}

/**
 * Fetch all data needed for a dynamic page in parallel
 * Returns { page, siteSettings }
 */
export async function fetchPageData(slug: string): Promise<{
  page: Page | null;
  siteSettings: SiteSettings | null;
}> {
  const [page, siteSettings] = await Promise.all([
    fetchPageBySlug(slug),
    fetchSiteSettings(),
  ]);

  return { page, siteSettings };
}