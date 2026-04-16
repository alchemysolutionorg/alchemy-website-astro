import { defineType, defineField, defineArrayMember } from 'sanity';

export const serviceItem = defineType({
  name: 'serviceItem',
  title: 'Service Item',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Service Title',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      type: 'text',
      title: 'Description',
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'icon',
      type: 'iconSelector',
      title: 'Icon',
    }),
    defineField({
      name: 'tags',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
      title: 'Tags',
      description: 'Technology/service tags displayed below description',
    }),
    defineField({
      name: 'color',
      type: 'color',
      title: 'Accent Color',
      description: 'Color for the card gradient and border',
      options: {
        disableAlpha: true,
      },
    }),
    defineField({
      name: 'link',
      type: 'url',
      title: 'Service Detail Link',
      description: 'Link to detailed service page (optional)',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      icon: 'icon.name',
      color: 'color',
    },
    prepare: ({ title, icon, color }) => ({
      title: title,
      subtitle: icon ? `Icon: ${icon}` : 'No icon',
      media: color ? null : undefined, // Color preview would need custom component
    }),
  },
});