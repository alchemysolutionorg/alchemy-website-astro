import { defineType, defineField, defineArrayMember } from 'sanity';

export const whyAlchemySection = defineType({
  name: 'whyAlchemySection',
  title: 'Why Alchemy Section',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Section Title',
      initialValue: 'Beyond Engineering.',
    }),
    defineField({
      name: 'titleHighlight',
      type: 'string',
      title: 'Title Highlight',
      description: 'Highlighted part of the title (appears in gradient)',
      initialValue: 'Pure Precision.',
    }),
    defineField({
      name: 'subtitle',
      type: 'text',
      title: 'Section Subtitle',
      rows: 2,
      initialValue: 'Most agencies assemble components. We architect solutions from first principles. Our team operates at the intersection of extreme technical rigor and uncompromising aesthetic standards.',
    }),
    defineField({
      name: 'valueProps',
      type: 'array',
      of: [defineArrayMember({ type: 'valueProp' })],
      title: 'Value Propositions',
      description: 'Key differentiators for the company',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      titleHighlight: 'titleHighlight',
      valueProps: 'valueProps',
    },
    prepare: ({ title, titleHighlight, valueProps }) => ({
      title: 'Why Alchemy Section',
      subtitle: `${title} ${titleHighlight}`,
      description: `${valueProps?.length || 0} value props`,
    }),
  },
});