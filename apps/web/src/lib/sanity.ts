import { createClient } from '@sanity/client';

// Create a mock client if Sanity is not configured
const createSanityClient = () => {
  const projectId = import.meta.env.SANITY_PROJECT_ID;

  if (!projectId || projectId === 'your-project-id') {
    // Return a mock client that returns null for all queries
    return {
      fetch: async () => null,
    };
  }

  return createClient({
    projectId,
    dataset: import.meta.env.SANITY_DATASET || 'production',
    apiVersion: '2024-01-01',
    useCdn: false,
  });
};

export const sanityClient = createSanityClient();

// GROQ queries for fetching content
export const queries = {
  siteSettings: `*[_type == "siteSettings"][0] {
    title, description, keywords,
    navigation[] { name, href },
    socialLinks[] { name, url }
  }`,

  hero: `*[_type == "hero"][0] {
    badgeText, headlinePrefix, typewriterWords, headlineSuffix,
    subheadline,
    primaryCta { text, href },
    secondaryCta { text, href },
    stats[] { value, label }
  }`,

  services: `*[_type == "services"][0] {
    sectionTitle, sectionSubtitle,
    services[] { title, description, icon, tags, colorFrom, colorTo, border }
  }`,

  engineeringCulture: `*[_type == "engineeringCulture"][0] {
    sectionTitle, sectionSubtitle,
    aiTools[] { name, tag, desc, border, accent },
    techStack[] { name, color, category, featured },
    rhcsaCertified
  }`,

  testimonials: `*[_type == "testimonials"][0] {
    sectionTitle,
    testimonials[] { quote, author, role, accentColor }
  }`,

  process: `*[_type == "process"][0] {
    sectionTitle, sectionSubtitle,
    steps[] { num, phase, title, desc, icon, color, tag }
  }`,
};