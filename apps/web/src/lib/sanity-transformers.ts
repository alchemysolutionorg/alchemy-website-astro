/**
 * Data Transformers - Convert Sanity data to component prop interfaces
 *
 * These transformers handle:
 * - Color conversion: Sanity { hex } → Tailwind classes
 * - Icon extraction: IconSelector → string name
 * - Structure flattening: Nested objects → component-friendly format
 */

import type {
  SanityColor,
  IconSelector,
  CtaObject,
  LinkObject,
  SocialLinkObject,
  SeoObject,
  StatItem,
  ServiceItem,
  ProcessStep,
  TestimonialItem,
  TechItem,
  AiTool,
  ValueProp,
  SiteSettings,
  HeroSection,
  ServicesSection,
  EngineeringSection,
  WhyAlchemySection,
  ProcessSection,
  TestimonialsSection,
  ContactSection,
} from './sanity.types';

// ============================================
// Utility Transformers
// ============================================

/**
 * Extract hex color from Sanity color object
 * Returns undefined if color is not set
 */
export function getColorHex(color?: SanityColor): string | undefined {
  return color?.hex;
}

/**
 * Convert hex color to Tailwind gradient classes
 * Returns { colorFrom, colorTo, border } for use in cards
 *
 * @example
 * const classes = colorToGradientClasses('#8b5cf6');
 * // { colorFrom: 'from-[#8b5cf6]/20', colorTo: 'to-[#8b5cf6]/5', border: 'border-[#8b5cf6]/20' }
 */
export function colorToGradientClasses(color?: string): {
  colorFrom?: string;
  colorTo?: string;
  border?: string;
} {
  if (!color) return {};
  return {
    colorFrom: `from-[${color}]/20`,
    colorTo: `to-[${color}]/5`,
    border: `border-[${color}]/20`,
  };
}

/**
 * Extract icon name from IconSelector object
 * Returns fallback 'Code2' if icon is not set
 */
export function getIconName(icon?: IconSelector): string {
  return icon?.name || 'Code2';
}

/**
 * Transform CTA object to component-friendly format
 */
export function transformCta(cta?: CtaObject): {
  text: string;
  href: string;
  variant?: string;
  icon?: boolean;
  external?: boolean;
} | undefined {
  if (!cta) return undefined;
  return {
    text: cta.text,
    href: cta.href,
    variant: cta.variant,
    icon: cta.icon,
    external: cta.external,
  };
}

/**
 * Transform LinkObject to navigation item format
 */
export function transformLink(link: LinkObject): {
  name: string;
  href: string;
  external?: boolean;
} {
  return {
    name: link.label,
    href: link.href,
    external: link.external,
  };
}

/**
 * Transform SocialLinkObject to social link format
 */
export function transformSocialLink(link: SocialLinkObject): {
  name: string;
  url: string;
} {
  return {
    name: link.platform,
    url: link.url,
  };
}

// ============================================
// Section Transformers
// ============================================

/**
 * Transform HeroSection to Hero component props
 */
export function transformHeroSection(section: HeroSection): {
  badgeText?: string;
  headlinePrefix?: string;
  typewriterWords?: string[];
  headlineSuffix?: string;
  subheadline?: string;
  primaryCta?: { text: string; href: string; variant?: string; icon?: boolean };
  secondaryCta?: { text: string; href: string; variant?: string; icon?: boolean };
  stats?: Array<{ value: string; label: string }>;
} {
  return {
    badgeText: section.badgeText,
    headlinePrefix: section.headlinePrefix,
    typewriterWords: section.typewriterWords,
    headlineSuffix: section.headlineSuffix,
    subheadline: section.subheadline,
    primaryCta: section.primaryCta ? {
      text: section.primaryCta.text,
      href: section.primaryCta.href,
      variant: section.primaryCta.variant,
      icon: section.primaryCta.icon,
    } : undefined,
    secondaryCta: section.secondaryCta ? {
      text: section.secondaryCta.text,
      href: section.secondaryCta.href,
      variant: section.secondaryCta.variant,
      icon: section.secondaryCta.icon,
    } : undefined,
    stats: section.stats?.map((stat: StatItem) => ({
      value: stat.value,
      label: stat.label,
    })),
  };
}

/**
 * Transform ServicesSection to Services component props
 *
 * Key transformation: color { hex } → colorFrom, colorTo, border (Tailwind classes)
 */
export function transformServicesSection(section: ServicesSection): {
  sectionTitle?: string;
  sectionSubtitle?: string;
  services?: Array<{
    title: string;
    description: string;
    icon: string;
    tags: string[];
    colorFrom?: string;
    colorTo?: string;
    border?: string;
  }>;
} {
  return {
    sectionTitle: section.sectionTitle,
    sectionSubtitle: section.sectionSubtitle,
    services: section.services?.map((service: ServiceItem) => {
      const hexColor = getColorHex(service.color);
      const gradientClasses = colorToGradientClasses(hexColor);
      return {
        title: service.title,
        description: service.description,
        icon: getIconName(service.icon),
        tags: service.tags || [],
        ...gradientClasses,
      };
    }),
  };
}

/**
 * Transform EngineeringSection to EngineeringCulture component props
 */
export function transformEngineeringSection(section: EngineeringSection): {
  sectionTitle?: string;
  sectionSubtitle?: string;
  aiTools?: Array<{
    name: string;
    tag: string;
    desc: string;
    border: string;
    accent: string;
  }>;
  techStack?: Array<{
    name: string;
    color: string;
    category: 'ai' | 'frontend' | 'backend' | 'devops' | 'database';
    featured?: boolean;
  }>;
  rhcsaCertified?: boolean;
} {
  return {
    sectionTitle: section.sectionTitle,
    sectionSubtitle: section.sectionSubtitle,
    aiTools: section.aiTools?.map((tool: AiTool) => {
      const hexColor = getColorHex(tool.color) || '#8b5cf6';
      return {
        name: tool.name,
        tag: tool.tag,
        desc: tool.description,
        border: `border-[${hexColor}]/30`,
        accent: `from-[${hexColor}]/20`,
      };
    }),
    techStack: section.techStack?.map((tech: TechItem) => ({
      name: tech.name,
      color: getColorHex(tech.color) || '#e0e0e0',
      category: tech.category,
      featured: tech.featured,
    })),
    rhcsaCertified: section.rhcsaCertified,
  };
}

/**
 * Transform WhyAlchemySection to WhyAlchemy component props
 */
export function transformWhyAlchemySection(section: WhyAlchemySection): {
  title?: string;
  subtitle?: string;
  valueProps?: Array<{
    title: string;
    desc: string;
  }>;
} {
  return {
    title: section.title,
    subtitle: section.subtitle,
    valueProps: section.valueProps?.map((prop: ValueProp) => ({
      title: prop.title,
      desc: prop.description,
    })),
  };
}

/**
 * Transform ProcessSection to Process component props
 */
export function transformProcessSection(section: ProcessSection): {
  sectionTitle?: string;
  sectionSubtitle?: string;
  steps?: Array<{
    num: string;
    phase: string;
    title: string;
    desc: string;
    icon: string;
    color: string;
    tag: string;
  }>;
} {
  return {
    sectionTitle: section.sectionTitle,
    sectionSubtitle: section.sectionSubtitle,
    steps: section.steps?.map((step: ProcessStep) => ({
      num: step.num,
      phase: step.phase,
      title: step.title,
      desc: step.description,
      icon: step.icon || 'Search',
      color: getColorHex(step.color) || '#8b5cf6',
      tag: step.tag || '', // Default to empty string if not set
    })),
  };
}

/**
 * Transform TestimonialsSection to Testimonials component props
 */
export function transformTestimonialsSection(section: TestimonialsSection): {
  sectionTitle?: string;
  testimonials?: Array<{
    quote: string;
    author: string;
    role: string;
    accentColor?: string;
  }>;
} {
  return {
    sectionTitle: section.sectionTitle,
    testimonials: section.testimonials?.map((testimonial: TestimonialItem) => ({
      quote: testimonial.quote,
      author: testimonial.author,
      role: testimonial.role,
      accentColor: getColorHex(testimonial.accentColor) || '#8b5cf6',
    })),
  };
}

/**
 * Transform ContactSection to Contact component props
 */
export function transformContactSection(section: ContactSection): {
  title?: string;
  titleHighlight?: string;
  subtitle?: string;
  successMessage?: string;
  submitButtonText?: string;
  submittingButtonText?: string;
} {
  return {
    title: section.title,
    titleHighlight: section.titleHighlight,
    subtitle: section.subtitle,
    successMessage: section.successMessage,
    submitButtonText: section.submitButtonText,
    submittingButtonText: section.submittingButtonText,
  };
}

// ============================================
// Document Transformers
// ============================================

/**
 * Transform SiteSettings to Layout/Footer component props
 */
export function transformSiteSettings(settings: SiteSettings | null): {
  footerTitle?: string;
  footerDescription?: string;
  navigation?: Array<{ name: string; href: string }>;
  socialLinks?: Array<{ name: string; url: string }>;
  footerLinks?: Array<{ name: string; href: string }>;
} | null {
  if (!settings) return null;

  return {
    footerTitle: settings.footerTitle,
    footerDescription: settings.footerDescription,
    navigation: settings.navigation?.map(transformLink),
    socialLinks: settings.socialLinks?.map(transformSocialLink),
    footerLinks: settings.footerLinks?.map(transformLink),
  };
}

/**
 * Transform SeoObject to SEO props for Layout
 */
export function transformSeo(seo?: SeoObject): {
  title?: string;
  description?: string;
  keywords?: string[];
  ogImage?: string;
  noIndex?: boolean;
  canonical?: string;
} {
  return {
    title: seo?.title,
    description: seo?.description,
    keywords: seo?.keywords,
    ogImage: seo?.ogImage?.asset?.url,
    noIndex: seo?.noIndex,
    canonical: seo?.canonical,
  };
}

// ============================================
// Section Type Router
// ============================================

import type { HomePageSection, PageSection } from './sanity.types';

/**
 * Section transformer map - routes sections to correct transformer
 */
const sectionTransformerMap = {
  heroSection: transformHeroSection,
  servicesSection: transformServicesSection,
  engineeringSection: transformEngineeringSection,
  whyAlchemySection: transformWhyAlchemySection,
  processSection: transformProcessSection,
  testimonialsSection: transformTestimonialsSection,
  contactSection: transformContactSection,
} as const;

/**
 * Transform any section to its component props format
 * Returns the transformed data for the section type
 */
export function transformSection(section: HomePageSection): Record<string, unknown> {
  const transformer = sectionTransformerMap[section._type as keyof typeof sectionTransformerMap];

  if (!transformer) {
    // Unknown section type - return raw data
    return section as unknown as Record<string, unknown>;
  }

  return transformer(section as never) as Record<string, unknown>;
}

/**
 * Transform all sections in a page
 */
export function transformSections(sections?: HomePageSection[]): Array<{
  _type: string;
  _key: string;
  data: Record<string, unknown>;
}> {
  if (!sections) return [];

  return sections.map((section) => ({
    _type: section._type,
    _key: section._key,
    data: transformSection(section),
  }));
}