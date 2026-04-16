import { defineType, defineField } from 'sanity';

export const valueProp = defineType({
  name: 'valueProp',
  title: 'Value Proposition',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      type: 'text',
      title: 'Description',
      rows: 2,
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      description: 'description',
    },
    prepare: ({ title, description }) => ({
      title: title,
      subtitle: description,
    }),
  },
});