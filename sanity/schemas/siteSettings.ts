import { defineType, defineField, defineArrayMember } from 'sanity';

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Site Title',
      initialValue: 'Alchemy - Software Development',
    }),
    defineField({
      name: 'description',
      type: 'text',
      title: 'Meta Description',
      rows: 2,
      description: 'Used for SEO meta description',
    }),
    defineField({
      name: 'keywords',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
      title: 'SEO Keywords',
    }),
    defineField({
      name: 'navigation',
      type: 'array',
      of: [defineArrayMember({
        type: 'object',
        fields: [
          { name: 'name', type: 'string', title: 'Link Text' },
          { name: 'href', type: 'string', title: 'URL' },
        ],
      })],
      title: 'Navigation Links',
    }),
    defineField({
      name: 'socialLinks',
      type: 'array',
      of: [defineArrayMember({
        type: 'object',
        fields: [
          { name: 'name', type: 'string', title: 'Platform Name' },
          { name: 'url', type: 'url', title: 'URL' },
        ],
      })],
      title: 'Social Links',
    }),
  ],
});