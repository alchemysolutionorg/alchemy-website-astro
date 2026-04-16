import { defineType, defineField, defineArrayMember } from 'sanity';

export const homePage = defineType({
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  // Singleton - only one instance should exist
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Page Title (Internal)',
      description: 'Internal name for this page (not displayed)',
      initialValue: 'Home Page',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'sections',
      type: 'array',
      title: 'Page Sections',
      description: 'Add and reorder sections for the home page',
      of: [
        defineArrayMember({ type: 'heroSection' }),
        defineArrayMember({ type: 'servicesSection' }),
        defineArrayMember({ type: 'engineeringSection' }),
        defineArrayMember({ type: 'whyAlchemySection' }),
        defineArrayMember({ type: 'processSection' }),
        defineArrayMember({ type: 'testimonialsSection' }),
        defineArrayMember({ type: 'contactSection' }),
      ],
    }),
    defineField({
      name: 'seo',
      type: 'seoObject',
      title: 'SEO Settings',
      description: 'Override site defaults for this page',
    }),
    defineField({
      name: 'publishedAt',
      type: 'datetime',
      title: 'Published At',
      description: 'Date this page was published',
      initialValue: () => new Date().toISOString(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      sections: 'sections',
    },
    prepare: ({ title, sections }) => ({
      title: 'Home Page',
      subtitle: `${sections?.length || 0} sections`,
      description: title,
    }),
  },
});