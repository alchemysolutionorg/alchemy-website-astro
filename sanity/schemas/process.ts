import { defineType, defineField, defineArrayMember } from 'sanity';

export const process = defineType({
  name: 'process',
  title: 'Process Section',
  type: 'document',
  fields: [
    defineField({
      name: 'sectionTitle',
      type: 'string',
      title: 'Section Title',
      initialValue: 'The Alchemical Process',
    }),
    defineField({
      name: 'sectionSubtitle',
      type: 'text',
      title: 'Section Subtitle',
      rows: 2,
    }),
    defineField({
      name: 'steps',
      type: 'array',
      of: [defineArrayMember({
        type: 'object',
        fields: [
          { name: 'num', type: 'string', title: 'Step Number (e.g., "01")' },
          { name: 'phase', type: 'string', title: 'Phase Label (e.g., "Phase 1")' },
          { name: 'title', type: 'string', title: 'Step Title' },
          { name: 'desc', type: 'text', title: 'Description', rows: 3 },
          {
            name: 'icon',
            type: 'string',
            title: 'Icon Name',
            options: {
              list: [
                { title: 'Search', value: 'Search' },
                { title: 'Flask', value: 'FlaskConical' },
                { title: 'CPU', value: 'Cpu' },
                { title: 'Rocket', value: 'Rocket' },
              ],
            },
          },
          { name: 'color', type: 'string', title: 'Color (hex)', description: 'e.g., "#8b5cf6"' },
          { name: 'tag', type: 'string', title: 'Tag Label' },
        ],
      })],
      title: 'Process Steps',
    }),
  ],
});