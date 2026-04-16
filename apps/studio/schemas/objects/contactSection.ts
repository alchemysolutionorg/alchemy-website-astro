import { defineType, defineField } from 'sanity';

export const contactSection = defineType({
  name: 'contactSection',
  title: 'Contact Section',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Section Title',
      initialValue: 'Begin the Transformation',
    }),
    defineField({
      name: 'titleHighlight',
      type: 'string',
      title: 'Title Highlight',
      description: 'Highlighted word in the title (appears in gradient)',
      initialValue: 'Transformation',
    }),
    defineField({
      name: 'subtitle',
      type: 'text',
      title: 'Section Subtitle',
      rows: 2,
      initialValue: 'Ready to transmute your vision into reality? Tell us about your project, and let\'s craft something legendary together.',
    }),
    defineField({
      name: 'successMessage',
      type: 'text',
      title: 'Success Message',
      rows: 2,
      description: 'Message shown after form submission',
      initialValue: 'Transmission Received\nWe\'ll be in touch within 24 hours.',
    }),
    defineField({
      name: 'submitButtonText',
      type: 'string',
      title: 'Submit Button Text',
      initialValue: 'Send Transmission',
    }),
    defineField({
      name: 'submittingButtonText',
      type: 'string',
      title: 'Submitting Button Text',
      description: 'Text shown while form is submitting',
      initialValue: 'Sending...',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      titleHighlight: 'titleHighlight',
    },
    prepare: ({ title, titleHighlight }) => ({
      title: 'Contact Section',
      subtitle: `${title} ${titleHighlight}`,
    }),
  },
});