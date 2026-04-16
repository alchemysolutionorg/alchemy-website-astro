import { defineType, defineField, defineArrayMember } from 'sanity';

export const engineeringSection = defineType({
  name: 'engineeringSection',
  title: 'Engineering Culture Section',
  type: 'object',
  fields: [
    defineField({
      name: 'sectionTitle',
      type: 'string',
      title: 'Section Title',
      initialValue: 'Built by Masters of the Craft',
    }),
    defineField({
      name: 'sectionSubtitle',
      type: 'text',
      title: 'Section Subtitle',
      rows: 3,
      initialValue: "We don't just use the latest tools — we integrate them into our DNA. AI-augmented development, certified infrastructure engineers, and deep mastery across the full modern stack.",
    }),
    defineField({
      name: 'aiSectionTitle',
      type: 'string',
      title: 'AI Tools Section Title',
      initialValue: 'AI-Augmented Development',
    }),
    defineField({
      name: 'aiSectionSubtitle',
      type: 'string',
      title: 'AI Tools Section Subtitle',
      initialValue: 'We work alongside cutting-edge AI to build faster and smarter',
    }),
    defineField({
      name: 'aiTools',
      type: 'array',
      of: [defineArrayMember({ type: 'aiTool' })],
      title: 'AI Tools Spotlight',
      description: 'Show AI tools the team uses',
    }),
    defineField({
      name: 'techStack',
      type: 'array',
      of: [defineArrayMember({ type: 'techItem' })],
      title: 'Technology Stack',
      description: 'Full stack of technologies mastered',
    }),
    defineField({
      name: 'rhcsaCertified',
      type: 'boolean',
      title: 'Show RHCSA Certification Badge',
      description: 'Display Red Hat certification badge',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      sectionTitle: 'sectionTitle',
      aiTools: 'aiTools',
      techStack: 'techStack',
    },
    prepare: ({ sectionTitle, aiTools, techStack }) => ({
      title: 'Engineering Section',
      subtitle: `${aiTools?.length || 0} AI tools, ${techStack?.length || 0} tech items`,
      description: sectionTitle,
    }),
  },
});