import { defineType, defineField, defineArrayMember } from 'sanity';

export const testimonialsSection = defineType({
  name: 'testimonialsSection',
  title: 'Testimonials Section',
  type: 'object',
  fields: [
    defineField({
      name: 'sectionTitle',
      type: 'string',
      title: 'Section Title',
      initialValue: 'Words from the Initiated',
    }),
    defineField({
      name: 'sectionSubtitle',
      type: 'string',
      title: 'Section Subtitle Label',
      description: 'Small label above title',
      initialValue: 'Client Stories',
    }),
    defineField({
      name: 'testimonials',
      type: 'array',
      of: [defineArrayMember({ type: 'testimonialItem' })],
      title: 'Testimonials',
      description: 'Add 3-6 testimonials for best layout',
    }),
  ],
  preview: {
    select: {
      sectionTitle: 'sectionTitle',
      testimonials: 'testimonials',
    },
    prepare: ({ sectionTitle, testimonials }) => ({
      title: 'Testimonials Section',
      subtitle: `${testimonials?.length || 0} testimonials`,
      description: sectionTitle,
    }),
  },
});