import { defineType, defineField } from 'sanity';

export const seoObject = defineType({
  name: 'seoObject',
  title: 'SEO Settings',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Meta Title',
      description: 'Override the page title for SEO (uses page title if not set)',
    }),
    defineField({
      name: 'description',
      type: 'text',
      title: 'Meta Description',
      rows: 3,
      description: 'Brief description for search engines (150-160 characters recommended)',
      validation: (Rule) => Rule.max(160).warning('Description should be under 160 characters'),
    }),
    defineField({
      name: 'keywords',
      type: 'array',
      of: [{ type: 'string' }],
      title: 'Keywords',
      description: 'Keywords for SEO (optional - most search engines ignore this)',
    }),
    defineField({
      name: 'ogImage',
      type: 'image',
      title: 'Open Graph Image',
      description: 'Image for social sharing (Facebook, Twitter, LinkedIn)',
      options: {
        hotspot: true, // Allow focal point selection
      },
    }),
    defineField({
      name: 'noIndex',
      type: 'boolean',
      title: 'Hide from Search Engines',
      description: 'Prevent this page from appearing in search results',
      initialValue: false,
    }),
    defineField({
      name: 'canonical',
      type: 'url',
      title: 'Canonical URL',
      description: 'Specify a canonical URL if this content exists elsewhere',
    }),
  ],
});