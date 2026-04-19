import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { colorInput } from '@sanity/color-input';
import { schemaTypes } from './schemas';

// Custom structure for better Studio UX - singletons shown as single items
const structure = (S: any) =>
  S.list()
    .title('Content')
    .items([
      // Singletons - appear as single items, not list
      S.listItem()
        .id('siteSettings')
        .title('Site Settings')
        .icon(() => '⚙️')
        .child(
          S.document()
            .schemaType('siteSettings')
            .documentId('siteSettings')
            .title('Site Settings')
        ),

      S.listItem()
        .id('homePage')
        .title('Home Page')
        .icon(() => '🏠')
        .child(
          S.document()
            .schemaType('homePage')
            .documentId('homePage')
            .title('Home Page')
        ),

      // Divider
      S.divider(),

      // Pages - list of all pages
      S.documentTypeListItem('page')
        .title('Pages')
        .icon(() => '📄'),
    ]);

export default defineConfig({
  name: 'alchemy-website',
  title: 'Alchemy Website CMS',
  projectId: process.env.SANITY_STUDIO_PROJECT_ID!,
  dataset: process.env.SANITY_STUDIO_DATASET!,

  plugins: [
    colorInput(),
    structureTool({
      structure,
    }),
  ],

  schema: {
    types: schemaTypes,
  },
});