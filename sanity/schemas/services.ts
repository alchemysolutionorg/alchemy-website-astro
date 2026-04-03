import { defineType, defineField, defineArrayMember } from 'sanity';

export const services = defineType({
  name: 'services',
  title: 'Services Section',
  type: 'document',
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
    }),
    defineField({
      name: 'services',
      type: 'array',
      of: [defineArrayMember({
        type: 'object',
        fields: [
          { name: 'title', type: 'string', title: 'Service Title' },
          { name: 'description', type: 'text', title: 'Description', rows: 3 },
          {
            name: 'icon',
            type: 'string',
            title: 'Icon Name',
            options: {
              list: [
                { title: 'Code', value: 'Code2' },
                { title: 'Sparkles', value: 'Sparkles' },
                { title: 'Layout', value: 'Layout' },
                { title: 'Container', value: 'Container' },
                { title: 'Lightbulb', value: 'Lightbulb' },
              ],
            },
          },
          { name: 'tags', type: 'array', of: [defineArrayMember({ type: 'string' })], title: 'Tags' },
          { name: 'colorFrom', type: 'string', title: 'Gradient From (e.g., "from-primary/20")' },
          { name: 'colorTo', type: 'string', title: 'Gradient To (e.g., "to-primary/5")' },
          { name: 'border', type: 'string', title: 'Border Color (e.g., "border-primary/20")' },
        ],
      })],
      title: 'Service Cards',
    }),
  ],
});