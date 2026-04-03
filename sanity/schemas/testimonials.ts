import { defineType, defineField, defineArrayMember } from 'sanity';

export const testimonials = defineType({
  name: 'testimonials',
  title: 'Testimonials Section',
  type: 'document',
  fields: [
    defineField({
      name: 'sectionTitle',
      type: 'string',
      title: 'Section Title',
      initialValue: 'Words from the Initiated',
    }),
    defineField({
      name: 'testimonials',
      type: 'array',
      of: [defineArrayMember({
        type: 'object',
        fields: [
          { name: 'quote', type: 'text', title: 'Quote', rows: 4 },
          { name: 'author', type: 'string', title: 'Author Name' },
          { name: 'role', type: 'string', title: 'Role & Company' },
          { name: 'accentColor', type: 'string', title: 'Accent Color (hex)', description: 'e.g., "#8b5cf6"' },
        ],
      })],
      title: 'Testimonials',
    }),
  ],
});