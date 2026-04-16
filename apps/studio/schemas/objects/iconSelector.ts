import { defineType, defineField } from 'sanity';
import { lucideIcons } from '../utils/iconList';

export const iconSelector = defineType({
  name: 'iconSelector',
  title: 'Icon',
  type: 'object',
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      title: 'Icon Name',
      description: 'Select an icon from the available options',
      options: {
        list: lucideIcons,
        layout: 'dropdown', // Can be 'dropdown', 'radio', or 'grid' with custom preview
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'color',
      type: 'color',
      title: 'Icon Color',
      description: 'Custom color for the icon (optional - uses theme default if not set)',
      options: {
        disableAlpha: true, // Only solid colors, no transparency
      },
    }),
    defineField({
      name: 'size',
      type: 'string',
      title: 'Icon Size',
      description: 'Size of the icon',
      options: {
        list: [
          { title: 'Small (16px)', value: 'sm' },
          { title: 'Medium (20px)', value: 'md' },
          { title: 'Large (24px)', value: 'lg' },
          { title: 'Extra Large (32px)', value: 'xl' },
        ],
      },
      initialValue: 'md',
    }),
  ],
  preview: {
    select: {
      name: 'name',
      color: 'color',
      size: 'size',
    },
    prepare: ({ name, color, size }) => {
      return {
        title: name || 'No icon selected',
        subtitle: `${size || 'md'} size${color ? `, ${color.hex}` : ''}`,
        // Note: Icon preview would require custom component
        // For now, just show text
      };
    },
  },
});