// Schema Index - Export all schemas for Sanity Studio
// This file imports and exports all document and object schemas

// ============ Documents ============
import { siteSettings } from './documents/siteSettings';
import { homePage } from './documents/homePage';
import { page } from './documents/page';

// ============ Section Objects ============
import { heroSection } from './objects/heroSection';
import { servicesSection } from './objects/servicesSection';
import { processSection } from './objects/processSection';
import { testimonialsSection } from './objects/testimonialsSection';
import { engineeringSection } from './objects/engineeringSection';
import { whyAlchemySection } from './objects/whyAlchemySection';
import { contactSection } from './objects/contactSection';

// ============ Nested Objects ============
import { serviceItem } from './objects/serviceItem';
import { processStep } from './objects/processStep';
import { testimonialItem } from './objects/testimonialItem';
import { techItem } from './objects/techItem';
import { aiTool } from './objects/aiTool';
import { valueProp } from './objects/valueProp';
import { statItem } from './objects/statItem';

// ============ Utility Objects ============
import { iconSelector } from './objects/iconSelector';
import { seoObject } from './objects/seoObject';
import { ctaObject } from './objects/ctaObject';
import { linkObject, socialLinkObject } from './objects/linkObject';

// ============ Export All Schemas ============
export const schemaTypes = [
  // Documents
  siteSettings,
  homePage,
  page,

  // Section Objects
  heroSection,
  servicesSection,
  processSection,
  testimonialsSection,
  engineeringSection,
  whyAlchemySection,
  contactSection,

  // Nested Objects
  serviceItem,
  processStep,
  testimonialItem,
  techItem,
  aiTool,
  valueProp,
  statItem,

  // Utility Objects
  iconSelector,
  seoObject,
  ctaObject,
  linkObject,
  socialLinkObject,
];

// Named exports for individual use
export {
  // Documents
  siteSettings,
  homePage,
  page,

  // Section Objects
  heroSection,
  servicesSection,
  processSection,
  testimonialsSection,
  engineeringSection,
  whyAlchemySection,
  contactSection,

  // Nested Objects
  serviceItem,
  processStep,
  testimonialItem,
  techItem,
  aiTool,
  valueProp,
  statItem,

  // Utility Objects
  iconSelector,
  seoObject,
  ctaObject,
  linkObject,
  socialLinkObject,
};