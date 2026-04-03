import { defineType, defineField, defineArrayMember } from 'sanity';

export const engineeringCulture = defineType({
  name: 'engineeringCulture',
  title: 'Engineering Culture Section',
  type: 'document',
  fields: [
    defineField({
      name: 'sectionTitle',
      type: 'string',
      title: 'Section Title',
      initialValue: 'Built by Masters of the Craft',
    }),
    defineField({
      name: 'sectionSubtitle',
      type: 'text',
      title: 'Section Subtitle',
      rows: 3,
    }),
    defineField({
      name: 'aiTools',
      type: 'array',
      of: [defineArrayMember({
        type: 'object',
        fields: [
          { name: 'name', type: 'string', title: 'Tool Name' },
          { name: 'tag', type: 'string', title: 'Tag Label' },
          { name: 'desc', type: 'text', title: 'Description', rows: 2 },
          { name: 'border', type: 'string', title: 'Border Class (e.g., "border-violet-500/30")' },
          { name: 'accent', type: 'string', title: 'Accent Gradient (e.g., "from-violet-500/20")' },
        ],
      })],
      title: 'AI Tools Spotlight',
    }),
    defineField({
      name: 'techStack',
      type: 'array',
      of: [defineArrayMember({
        type: 'object',
        fields: [
          { name: 'name', type: 'string', title: 'Technology Name' },
          { name: 'color', type: 'string', title: 'Color (hex)', description: 'e.g., "#a855f7"' },
          {
            name: 'category',
            type: 'string',
            title: 'Category',
            options: {
              list: [
                { title: 'AI / ML', value: 'ai' },
                { title: 'Frontend', value: 'frontend' },
                { title: 'Backend', value: 'backend' },
                { title: 'DevOps', value: 'devops' },
                { title: 'Database', value: 'database' },
              ],
            },
          },
          { name: 'featured', type: 'boolean', title: 'Featured (larger card)' },
        ],
      })],
      title: 'Technology Stack',
    }),
    defineField({
      name: 'rhcsaCertified',
      type: 'boolean',
      title: 'Show RHCSA Certification Badge',
      initialValue: true,
    }),
  ],
});