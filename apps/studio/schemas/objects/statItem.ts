import { defineType, defineField } from 'sanity';

export const statItem = defineType({
  name: 'statItem',
  title: 'Stat',
  type: 'object',
  fields: [
    defineField({
      name: 'value',
      type: 'string',
      title: 'Value',
      description: 'e.g., "50+", "99.9%", "5x"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'label',
      type: 'string',
      title: 'Label',
      description: 'e.g., "Projects Delivered", "Uptime SLA"',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      value: 'value',
      label: 'label',
    },
    prepare: ({ value, label }) => ({
      title: value,
      subtitle: label,
    }),
  },
});