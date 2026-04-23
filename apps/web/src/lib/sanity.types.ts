/**
 * TypeScript types for Sanity CMS data
 * Generated based on schema structure in apps/studio/schemas/
 */

// ============================================
// Base Types
// ============================================

/** Sanity document base fields */
export interface SanityDocument {
  _id: string;
  _type: string;
  _createdAt?: string;
  _updatedAt?: string;
  _rev?: string;
}

/** Sanity color picker output */
export interface SanityColor {
  hex: string;
  alpha?: number;
  rgb?: {
    r: number;
    g: number;
    b: number;
  };
}

/** Sanity image with asset reference */
export interface SanityImage {
  asset?: {
    url?: string;
    metadata?: {
      dimensions?: {
        width: number;
        height: number;
      };
    };
  };
}

// ============================================
// Utility Objects
// ============================================

/** Icon selector with name, color, and size */
export interface IconSelector {
  name: string;
  color?: SanityColor;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

/** Call to action button */
export interface CtaObject {
  text: string;
  href: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'link';
  icon?: boolean;
  external?: boolean;
}

/** Navigation link */
export interface LinkObject {
  label: string;
  href: string;
  external?: boolean;
}

/** Social media link */
export interface SocialLinkObject {
  platform: 'twitter' | 'linkedin' | 'github' | 'facebook' | 'instagram' | 'youtube' | 'dribbble' | 'behance' | 'medium' | 'discord' | 'slack';
  url: string;
}

/** SEO metadata object */
export interface SeoObject {
  title?: string;
  description?: string;
  keywords?: string[];
  ogImage?: SanityImage;
  noIndex?: boolean;
  canonical?: string;
}

// ============================================
// Nested Item Objects
// ============================================

/** Stat with value and label (used in Hero) */
export interface StatItem {
  value: string;
  label: string;
}

/** Service card item */
export interface ServiceItem {
  title: string;
  description: string;
  icon?: IconSelector;
  tags?: string[];
  color?: SanityColor;
  link?: string;
}

/** Process timeline step */
export interface ProcessStep {
  num: string;
  phase: string;
  title: string;
  description: string;
  icon?: string;
  color?: SanityColor;
  tag?: string;
}

/** Testimonial card */
export interface TestimonialItem {
  quote: string;
  author: string;
  role: string;
  accentColor?: SanityColor;
  avatar?: SanityImage;
}

/** Technology badge */
export interface TechItem {
  name: string;
  color?: SanityColor;
  category: 'ai' | 'frontend' | 'backend' | 'devops' | 'database';
  featured?: boolean;
  link?: string;
}

/** AI tool card */
export interface AiTool {
  name: string;
  tag: string;
  description: string;
  color?: SanityColor;
  link?: string;
}

/** Value proposition */
export interface ValueProp {
  title: string;
  description: string;
}

// ============================================
// Section Objects (with _type discriminator)
// ============================================

/** Hero section - typewriter headline, CTAs, stats */
export interface HeroSection {
  _type: 'heroSection';
  _key: string;
  badgeText?: string;
  headlinePrefix?: string;
  typewriterWords?: string[];
  headlineSuffix?: string;
  subheadline?: string;
  primaryCta?: CtaObject;
  secondaryCta?: CtaObject;
  stats?: StatItem[];
  backgroundImage?: SanityImage;
}

/** Services section - grid of service cards */
export interface ServicesSection {
  _type: 'servicesSection';
  _key: string;
  sectionTitle?: string;
  sectionSubtitle?: string;
  services?: ServiceItem[];
}

/** Engineering culture section - AI tools and tech stack */
export interface EngineeringSection {
  _type: 'engineeringSection';
  _key: string;
  sectionTitle?: string;
  sectionSubtitle?: string;
  aiSectionTitle?: string;
  aiSectionSubtitle?: string;
  aiTools?: AiTool[];
  techStack?: TechItem[];
  rhcsaCertified?: boolean;
}

/** Why Alchemy section - value propositions */
export interface WhyAlchemySection {
  _type: 'whyAlchemySection';
  _key: string;
  title?: string;
  titleHighlight?: string;
  subtitle?: string;
  valueProps?: ValueProp[];
}

/** Process section - timeline steps */
export interface ProcessSection {
  _type: 'processSection';
  _key: string;
  sectionTitle?: string;
  sectionSubtitle?: string;
  steps?: ProcessStep[];
}

/** Testimonials section - client quotes */
export interface TestimonialsSection {
  _type: 'testimonialsSection';
  _key: string;
  sectionTitle?: string;
  sectionSubtitle?: string;
  testimonials?: TestimonialItem[];
}

/** Contact section - form with customizable text */
export interface ContactSection {
  _type: 'contactSection';
  _key: string;
  title?: string;
  titleHighlight?: string;
  subtitle?: string;
  successMessage?: string;
  submitButtonText?: string;
  submittingButtonText?: string;
}

/** Rich text section (for generic pages only) */
export interface RichTextSection {
  _type: 'richTextSection';
  _key: string;
  content?: unknown[]; // PortableText blocks
}

/** Image section (for generic pages only) */
export interface ImageSection {
  _type: 'imageSection';
  _key: string;
  image?: SanityImage;
  alt?: string;
  caption?: string;
}

/** CTA banner section (for generic pages only) */
export interface CtaSection {
  _type: 'ctaSection';
  _key: string;
  title?: string;
  description?: string;
  cta?: CtaObject;
}

// ============================================
// Union Types
// ============================================

/** All possible section types for homePage */
export type HomePageSection =
  | HeroSection
  | ServicesSection
  | EngineeringSection
  | WhyAlchemySection
  | ProcessSection
  | TestimonialsSection
  | ContactSection;

/** All possible section types for generic pages (includes extra sections) */
export type PageSection =
  | HomePageSection
  | RichTextSection
  | ImageSection
  | CtaSection;

// ============================================
// Document Types
// ============================================

/** Site settings - singleton for global config */
export interface SiteSettings extends SanityDocument {
  _type: 'siteSettings';
  title: string;
  description?: string;
  keywords?: string[];
  logo?: SanityImage;
  favicon?: SanityImage;
  navigation?: LinkObject[];
  footerTitle?: string;
  footerDescription?: string;
  socialLinks?: SocialLinkObject[];
  footerLinks?: LinkObject[];
  ogImage?: SanityImage;
  email?: string;
  phone?: string;
  address?: string;
}

/** Home page - singleton with sections array */
export interface HomePage extends SanityDocument {
  _type: 'homePage';
  title: string;
  sections?: HomePageSection[];
  seo?: SeoObject;
  publishedAt?: string;
}

/** Generic page - multi-instance with slug */
export interface Page extends SanityDocument {
  _type: 'page';
  title: string;
  slug: { current: string };
  sections?: PageSection[];
  seo?: SeoObject;
  publishedAt?: string;
}

// ============================================
// API Response Types (for GROQ projections)
// ============================================

/** Minimal page info for static path generation */
export interface PageSlugInfo {
  slug: { current: string };
  title: string;
}