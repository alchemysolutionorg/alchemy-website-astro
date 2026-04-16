import { defineType, defineField } from 'sanity';

export const ctaObject = defineType({
  name: 'ctaObject',
  title: 'Call to Action',
  type: 'object',
  fields: [
    defineField({
      name: 'text',
      type: 'string',
      title: 'Button Text',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'href',
      type: 'string',
      title: 'Link URL',
      description: 'URL or path (e.g., "/contact" or "https://example.com")',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'variant',
      type: 'string',
      title: 'Button Style',
      options: {
        list: [
          { title: 'Primary (Filled)', value: 'primary' },
          { title: 'Secondary (Filled)', value: 'secondary' },
          { title: 'Outline', value: 'outline' },
          { title: 'Ghost', value: 'ghost' },
          { title: 'Link', value: 'link' },
        ],
      },
      initialValue: 'primary',
    }),
    defineField({
      name: 'icon',
      type: 'boolean',
      title: 'Show Arrow Icon',
      description: 'Add an arrow icon to the button',
      initialValue: true,
    }),
    defineField({
      name: 'external',
      type: 'boolean',
      title: 'External Link',
      description: 'Opens in a new tab',
      initialValue: false,
    }),
  ],
});