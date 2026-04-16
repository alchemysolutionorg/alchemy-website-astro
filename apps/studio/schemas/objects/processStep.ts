import { defineType, defineField, defineArrayMember } from 'sanity';
import { lucideIcons } from '../utils/iconList';

export const processStep = defineType({
  name: 'processStep',
  title: 'Process Step',
  type: 'object',
  fields: [
    defineField({
      name: 'num',
      type: 'string',
      title: 'Step Number',
      description: 'e.g., "01", "02", "03"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'phase',
      type: 'string',
      title: 'Phase Label',
      description: 'e.g., "Phase 1", "Discovery Phase"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title',
      type: 'string',
      title: 'Step Title',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      type: 'text',
      title: 'Description',
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'icon',
      type: 'string',
      title: 'Icon',
      description: 'Icon for this step',
      options: {
        list: [
          { title: 'Search (Discovery)', value: 'Search' },
          { title: 'Flask (Testing)', value: 'FlaskConical' },
          { title: 'CPU (Engineering)', value: 'Cpu' },
          { title: 'Rocket (Launch)', value: 'Rocket' },
          { title: 'Settings (Setup)', value: 'Settings' },
          { title: 'Check Circle (Complete)', value: 'CheckCircle' },
          { title: 'Code (Development)', value: 'Code2' },
          { title: 'Users (Team)', value: 'Users' },
          { title: 'File Text (Documentation)', value: 'FileText' },
        ],
      },
      initialValue: 'Search',
    }),
    defineField({
      name: 'color',
      type: 'color',
      title: 'Accent Color',
      description: 'Color for this step',
      options: {
        disableAlpha: true,
      },
    }),
    defineField({
      name: 'tag',
      type: 'string',
      title: 'Tag Label',
      description: 'Small tag shown on the card (e.g., "Requirements", "Architecture")',
    }),
  ],
  preview: {
    select: {
      num: 'num',
      title: 'title',
      phase: 'phase',
    },
    prepare: ({ num, title, phase }) => ({
      title: `${num} - ${title}`,
      subtitle: phase,
    }),
  },
});