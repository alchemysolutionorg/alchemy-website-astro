import { defineType, defineField } from 'sanity';

export const aiTool = defineType({
  name: 'aiTool',
  title: 'AI Tool',
  type: 'object',
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      title: 'Tool Name',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'tag',
      type: 'string',
      title: 'Tag Label',
      description: 'e.g., "Agentic AI", "Foundation Model", "Speed + Power"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      type: 'text',
      title: 'Description',
      rows: 2,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'color',
      type: 'color',
      title: 'Accent Color',
      description: 'Color for the card border and gradient',
      options: {
        disableAlpha: true,
      },
    }),
    defineField({
      name: 'link',
      type: 'url',
      title: 'Tool Link',
      description: 'Link to tool documentation or website',
    }),
  ],
  preview: {
    select: {
      name: 'name',
      tag: 'tag',
    },
    prepare: ({ name, tag }) => ({
      title: name,
      subtitle: tag,
    }),
  },
});