import { defineType, defineField, defineArrayMember } from 'sanity';

export const processSection = defineType({
  name: 'processSection',
  title: 'Process Section',
  type: 'object',
  fields: [
    defineField({
      name: 'sectionTitle',
      type: 'string',
      title: 'Section Title',
      initialValue: 'The Alchemical Process',
    }),
    defineField({
      name: 'sectionSubtitle',
      type: 'text',
      title: 'Section Subtitle',
      rows: 2,
      description: 'Supporting text below the title',
      initialValue: 'A disciplined methodology designed to minimize risk and produce extraordinary outcomes — on time, every time.',
    }),
    defineField({
      name: 'steps',
      type: 'array',
      of: [defineArrayMember({ type: 'processStep' })],
      title: 'Process Steps',
      description: 'Add 4-6 steps for the staircase timeline',
    }),
  ],
  preview: {
    select: {
      sectionTitle: 'sectionTitle',
      steps: 'steps',
    },
    prepare: ({ sectionTitle, steps }) => ({
      title: 'Process Section',
      subtitle: `${steps?.length || 0} steps`,
      description: sectionTitle,
    }),
  },
});