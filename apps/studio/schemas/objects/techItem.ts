import { defineType, defineField } from 'sanity';

export const techItem = defineType({
  name: 'techItem',
  title: 'Technology',
  type: 'object',
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      title: 'Technology Name',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'color',
      type: 'color',
      title: 'Brand Color',
      description: 'Official brand color for the technology',
      options: {
        disableAlpha: true,
      },
    }),
    defineField({
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
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'featured',
      type: 'boolean',
      title: 'Featured',
      description: 'Featured items get larger cards',
      initialValue: false,
    }),
    defineField({
      name: 'link',
      type: 'url',
      title: 'Documentation Link',
      description: 'Link to official documentation or website',
    }),
  ],
  preview: {
    select: {
      name: 'name',
      category: 'category',
      featured: 'featured',
    },
    prepare: ({ name, category, featured }) => ({
      title: name,
      subtitle: `${category}${featured ? ' (Featured)' : ''}`,
    }),
  },
});