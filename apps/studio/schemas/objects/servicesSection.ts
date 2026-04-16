import { defineType, defineField, defineArrayMember } from 'sanity';

export const servicesSection = defineType({
  name: 'servicesSection',
  title: 'Services Section',
  type: 'object',
  fields: [
    defineField({
      name: 'sectionTitle',
      type: 'string',
      title: 'Section Title',
      initialValue: 'The Five Pillars of Transformation',
    }),
    defineField({
      name: 'sectionSubtitle',
      type: 'text',
      title: 'Section Subtitle',
      rows: 2,
      description: 'Supporting text below the title',
      initialValue: 'From code to cloud, from idea to production — we cover every dimension of modern software delivery with precision and craft.',
    }),
    defineField({
      name: 'services',
      type: 'array',
      of: [defineArrayMember({ type: 'serviceItem' })],
      title: 'Service Cards',
      description: 'Add up to 5 services (top row shows 3, bottom row shows 2)',
    }),
  ],
  preview: {
    select: {
      sectionTitle: 'sectionTitle',
      services: 'services',
    },
    prepare: ({ sectionTitle, services }) => ({
      title: 'Services Section',
      subtitle: `${services?.length || 0} services`,
      description: sectionTitle,
    }),
  },
});