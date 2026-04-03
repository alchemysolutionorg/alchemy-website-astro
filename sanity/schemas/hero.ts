import { defineType, defineField, defineArrayMember } from 'sanity';

export const hero = defineType({
  name: 'hero',
  title: 'Hero Section',
  type: 'document',
  fields: [
    defineField({
      name: 'badgeText',
      type: 'string',
      title: 'Badge Text',
      initialValue: 'Transmuting Complexity Into Elegance',
    }),
    defineField({
      name: 'headlinePrefix',
      type: 'string',
      title: 'Headline Prefix',
      initialValue: 'We Build',
      description: 'Text before the typewriter effect',
    }),
    defineField({
      name: 'typewriterWords',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
      title: 'Typewriter Words',
      initialValue: ['Extraordinary', 'Unstoppable', 'Transformative', 'Legendary'],
    }),
    defineField({
      name: 'headlineSuffix',
      type: 'string',
      title: 'Headline Suffix',
      initialValue: 'Digital Realities',
      description: 'Text after the typewriter effect',
    }),
    defineField({
      name: 'subheadline',
      type: 'text',
      title: 'Subheadline',
      rows: 3,
    }),
    defineField({
      name: 'primaryCta',
      type: 'object',
      title: 'Primary CTA Button',
      fields: [
        { name: 'text', type: 'string', title: 'Button Text' },
        { name: 'href', type: 'string', title: 'Link' },
      ],
    }),
    defineField({
      name: 'secondaryCta',
      type: 'object',
      title: 'Secondary CTA Button',
      fields: [
        { name: 'text', type: 'string', title: 'Button Text' },
        { name: 'href', type: 'string', title: 'Link' },
      ],
    }),
    defineField({
      name: 'stats',
      type: 'array',
      of: [defineArrayMember({
        type: 'object',
        fields: [
          { name: 'value', type: 'string', title: 'Value (e.g., "50+") },
          { name: 'label', type: 'string', title: 'Label' },
        ],
      })],
      title: 'Stats',
    }),
  ],
});