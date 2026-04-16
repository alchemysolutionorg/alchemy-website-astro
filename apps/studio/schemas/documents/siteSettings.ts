import { defineType, defineField, defineArrayMember } from 'sanity';

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  // Singleton - only one instance should exist
  fields: [
    // Basic Site Info
    defineField({
      name: 'title',
      type: 'string',
      title: 'Site Title',
      description: 'Main site title used in browser tab and SEO',
      initialValue: 'Alchemy - Software Development',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      type: 'text',
      title: 'Meta Description',
      rows: 2,
      description: 'Default description for SEO (used when page has no custom description)',
      initialValue: 'Mystical engineering. Flawless execution. We build the digital future, today.',
      validation: (Rule) => Rule.max(160).warning('Should be under 160 characters'),
    }),
    defineField({
      name: 'keywords',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
      title: 'SEO Keywords',
      description: 'Default keywords for the site',
    }),

    // Branding
    defineField({
      name: 'logo',
      type: 'image',
      title: 'Site Logo',
      description: 'Main logo for header and footer',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'favicon',
      type: 'image',
      title: 'Favicon',
      description: 'Icon shown in browser tab',
      options: {
        accept: 'image/svg+xml,image/png',
      },
    }),

    // Navigation
    defineField({
      name: 'navigation',
      type: 'array',
      of: [defineArrayMember({ type: 'linkObject' })],
      title: 'Navigation Links',
      description: 'Links shown in the header navigation',
    }),

    // Footer
    defineField({
      name: 'footerTitle',
      type: 'string',
      title: 'Footer Title',
      description: 'Company name in footer',
      initialValue: 'ALCHEMY',
    }),
    defineField({
      name: 'footerDescription',
      type: 'text',
      title: 'Footer Description',
      rows: 2,
      initialValue: 'Mystical engineering. Flawless execution. We build the digital future, today.',
    }),
    defineField({
      name: 'socialLinks',
      type: 'array',
      of: [defineArrayMember({ type: 'socialLinkObject' })],
      title: 'Social Links',
      description: 'Social media links in footer',
    }),
    defineField({
      name: 'footerLinks',
      type: 'array',
      of: [defineArrayMember({ type: 'linkObject' })],
      title: 'Footer Links',
      description: 'Additional links in footer (Privacy Policy, Terms, etc.)',
    }),

    // Open Graph Defaults
    defineField({
      name: 'ogImage',
      type: 'image',
      title: 'Default Open Graph Image',
      description: 'Image for social sharing when page has no custom image',
      options: {
        hotspot: true,
      },
    }),

    // Contact Info
    defineField({
      name: 'email',
      type: 'string',
      title: 'Contact Email',
    }),
    defineField({
      name: 'phone',
      type: 'string',
      title: 'Contact Phone',
    }),
    defineField({
      name: 'address',
      type: 'text',
      title: 'Address',
      rows: 2,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      description: 'description',
    },
    prepare: ({ title, description }) => ({
      title: 'Site Settings',
      subtitle: title,
      description: description,
    }),
  },
});