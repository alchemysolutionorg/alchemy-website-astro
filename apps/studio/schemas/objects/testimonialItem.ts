import { defineType, defineField } from 'sanity';

export const testimonialItem = defineType({
  name: 'testimonialItem',
  title: 'Testimonial',
  type: 'object',
  fields: [
    defineField({
      name: 'quote',
      type: 'text',
      title: 'Quote',
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'author',
      type: 'string',
      title: 'Author Name',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'role',
      type: 'string',
      title: 'Role & Company',
      description: 'e.g., "CTO, Nexus Corp"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'accentColor',
      type: 'color',
      title: 'Accent Color',
      description: 'Color for the testimonial card accent',
      options: {
        disableAlpha: true,
      },
    }),
    defineField({
      name: 'avatar',
      type: 'image',
      title: 'Author Avatar',
      description: 'Optional photo of the author',
      options: {
        hotspot: true,
      },
    }),
  ],
  preview: {
    select: {
      quote: 'quote',
      author: 'author',
      role: 'role',
    },
    prepare: ({ quote, author, role }) => ({
      title: author,
      subtitle: role,
      description: quote ? quote.slice(0, 50) + '...' : undefined,
    }),
  },
});