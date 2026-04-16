import { defineType, defineField, defineArrayMember } from 'sanity';

export const heroSection = defineType({
  name: 'heroSection',
  title: 'Hero Section',
  type: 'object',
  fields: [
    defineField({
      name: 'badgeText',
      type: 'string',
      title: 'Badge Text',
      description: 'Small text shown in the badge above headline',
      initialValue: 'Transmuting Complexity Into Elegance',
    }),
    defineField({
      name: 'headlinePrefix',
      type: 'string',
      title: 'Headline Prefix',
      description: 'Text before the typewriter effect',
      initialValue: 'We Build',
    }),
    defineField({
      name: 'typewriterWords',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
      title: 'Typewriter Words',
      description: 'Words that animate in sequence',
      initialValue: ['Extraordinary', 'Unstoppable', 'Transformative', 'Legendary'],
    }),
    defineField({
      name: 'headlineSuffix',
      type: 'string',
      title: 'Headline Suffix',
      description: 'Text after the typewriter effect',
      initialValue: 'Digital Realities',
    }),
    defineField({
      name: 'subheadline',
      type: 'text',
      title: 'Subheadline',
      rows: 3,
      description: 'Supporting text below the main headline',
      initialValue: 'Like the ancient art of alchemy, we transform raw ideas into powerful, world-class software. Code meets mysticism. Engineering becomes magic.',
    }),
    defineField({
      name: 'primaryCta',
      type: 'ctaObject',
      title: 'Primary Call to Action',
      initialValue: {
        text: 'Initiate Project',
        href: '#contact',
        variant: 'primary',
        icon: true,
      },
    }),
    defineField({
      name: 'secondaryCta',
      type: 'ctaObject',
      title: 'Secondary Call to Action',
      initialValue: {
        text: 'Explore Services',
        href: '#services',
        variant: 'outline',
        icon: false,
      },
    }),
    defineField({
      name: 'stats',
      type: 'array',
      of: [defineArrayMember({ type: 'statItem' })],
      title: 'Stats',
      description: 'Key metrics shown at the bottom',
    }),
    defineField({
      name: 'backgroundImage',
      type: 'image',
      title: 'Background Image',
      description: 'Optional background image for the hero',
      options: {
        hotspot: true,
      },
    }),
  ],
  preview: {
    select: {
      headlinePrefix: 'headlinePrefix',
      headlineSuffix: 'headlineSuffix',
    },
    prepare: ({ headlinePrefix, headlineSuffix }) => ({
      title: 'Hero Section',
      subtitle: `${headlinePrefix || 'We Build'} ... ${headlineSuffix || 'Digital Realities'}`,
    }),
  },
});