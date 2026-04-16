import { defineType, defineField, defineArrayMember } from 'sanity';

export const page = defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Page Title',
      description: 'Title shown in the page and browser tab',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      title: 'URL Slug',
      description: 'The path for this page (e.g., "about" → /about)',
      options: {
        source: 'title',
        slugify: (input) =>
          input
            .toLowerCase()
            .replace(/[^\w\s-]/g, '') // Remove non-word chars
            .replace(/\s+/g, '-') // Replace spaces with hyphens
            .replace(/-+/g, '-') // Replace multiple hyphens with single
            .slice(0, 96),
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'sections',
      type: 'array',
      title: 'Page Sections',
      description: 'Add and reorder sections for this page',
      of: [
        defineArrayMember({ type: 'heroSection' }),
        defineArrayMember({ type: 'servicesSection' }),
        defineArrayMember({ type: 'engineeringSection' }),
        defineArrayMember({ type: 'whyAlchemySection' }),
        defineArrayMember({ type: 'processSection' }),
        defineArrayMember({ type: 'testimonialsSection' }),
        defineArrayMember({ type: 'contactSection' }),
        // Additional generic sections
        defineArrayMember({
          type: 'object',
          name: 'richTextSection',
          title: 'Rich Text Section',
          fields: [
            { name: 'content', type: 'array', of: [{ type: 'block' }], title: 'Content' },
          ],
        }),
        defineArrayMember({
          type: 'object',
          name: 'imageSection',
          title: 'Image Section',
          fields: [
            { name: 'image', type: 'image', title: 'Image', options: { hotspot: true } },
            { name: 'alt', type: 'string', title: 'Alt Text' },
            { name: 'caption', type: 'string', title: 'Caption' },
          ],
        }),
        defineArrayMember({
          type: 'object',
          name: 'ctaSection',
          title: 'CTA Banner',
          fields: [
            { name: 'title', type: 'string', title: 'Title' },
            { name: 'description', type: 'text', title: 'Description', rows: 2 },
            { name: 'cta', type: 'ctaObject', title: 'Button' },
          ],
        }),
      ],
    }),
    defineField({
      name: 'seo',
      type: 'seoObject',
      title: 'SEO Settings',
      description: 'SEO configuration for this page',
    }),
    defineField({
      name: 'publishedAt',
      type: 'datetime',
      title: 'Published At',
      description: 'Date this page was published',
      initialValue: () => new Date().toISOString(),
    }),
  ],
  orderings: [
    {
      title: 'Title',
      name: 'titleAsc',
      by: [{ field: 'title', direction: 'asc' }],
    },
    {
      title: 'Publish Date, New',
      name: 'publishedAtDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      slug: 'slug.current',
      sections: 'sections',
    },
    prepare: ({ title, slug, sections }) => ({
      title: title,
      subtitle: slug ? `/${slug}` : 'No slug',
      description: `${sections?.length || 0} sections`,
    }),
  },
});