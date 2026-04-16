import { defineType, defineField } from 'sanity';

export const linkObject = defineType({
  name: 'linkObject',
  title: 'Link',
  type: 'object',
  fields: [
    defineField({
      name: 'label',
      type: 'string',
      title: 'Link Label',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'href',
      type: 'string',
      title: 'URL',
      description: 'URL or path (e.g., "/about" or "https://example.com")',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'external',
      type: 'boolean',
      title: 'External Link',
      description: 'Opens in a new tab',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      label: 'label',
      href: 'href',
    },
    prepare: ({ label, href }) => ({
      title: label,
      subtitle: href,
    }),
  },
});

// Social link - extends link with platform icon
export const socialLinkObject = defineType({
  name: 'socialLinkObject',
  title: 'Social Link',
  type: 'object',
  fields: [
    defineField({
      name: 'platform',
      type: 'string',
      title: 'Platform',
      options: {
        list: [
          { title: 'Twitter / X', value: 'twitter' },
          { title: 'LinkedIn', value: 'linkedin' },
          { title: 'GitHub', value: 'github' },
          { title: 'Facebook', value: 'facebook' },
          { title: 'Instagram', value: 'instagram' },
          { title: 'YouTube', value: 'youtube' },
          { title: 'Dribbble', value: 'dribbble' },
          { title: 'Behance', value: 'behance' },
          { title: 'Medium', value: 'medium' },
          { title: 'Discord', value: 'discord' },
          { title: 'Slack', value: 'slack' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'url',
      type: 'url',
      title: 'URL',
      validation: (Rule) => Rule.required().uri({
        allowRelative: false,
        scheme: ['https'],
      }),
    }),
  ],
  preview: {
    select: {
      platform: 'platform',
      url: 'url',
    },
    prepare: ({ platform, url }) => ({
      title: platform ? platform.charAt(0).toUpperCase() + platform.slice(1) : 'Unknown',
      subtitle: url,
    }),
  },
});