import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { siteSettings } from './schemas/siteSettings';
import { hero } from './schemas/hero';
import { services } from './schemas/services';
import { engineeringCulture } from './schemas/engineering';
import { testimonials } from './schemas/testimonials';
import { process } from './schemas/process';

export default defineConfig({
  name: 'alchemy-website',
  title: 'Alchemy Website CMS',
  projectId: process.env.SANITY_PROJECT_ID || 'your-project-id',
  dataset: process.env.SANITY_DATASET || 'production',
  plugins: [structureTool()],
  schema: {
    types: [
      siteSettings,
      hero,
      services,
      engineeringCulture,
      testimonials,
      process,
    ],
  },
});