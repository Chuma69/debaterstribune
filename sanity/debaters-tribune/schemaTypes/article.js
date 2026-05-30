// schemas/article.js
export default {
  name: 'article',
  title: 'Article',
  type: 'document',
  groups: [
    { name: 'content', title: 'Content', default: true },
    { name: 'meta', title: 'Meta & Publishing' },
    { name: 'media', title: 'Media' },
  ],
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      group: 'content',
      validation: R => R.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'meta',
      options: { source: 'title', maxLength: 96 },
      validation: R => R.required(),
    },
    {
      name: 'dek',
      title: 'Dek (subtitle)',
      description: 'One sentence that hooks the reader — shown under the title everywhere.',
      type: 'text',
      rows: 2,
      group: 'content',
      validation: R => R.required().max(200),
    },
    {
      name: 'section',
      title: 'Section',
      type: 'string',
      group: 'meta',
      options: {
        list: [
          { title: 'Essays', value: 'essays' },
          { title: 'Histories', value: 'histories' },
          { title: 'Beyond', value: 'beyond' },
        ],
        layout: 'radio',
      },
      validation: R => R.required(),
    },
    {
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{ type: 'contributor' }],
      group: 'meta',
      validation: R => R.required(),
    },
    {
      name: 'date',
      title: 'Publication date',
      type: 'date',
      group: 'meta',
      options: { dateFormat: 'MMMM D, YYYY' },
      validation: R => R.required(),
    },
    {
      name: 'read',
      title: 'Read time (minutes)',
      type: 'number',
      group: 'meta',
      validation: R => R.required().min(1).max(60),
    },
    {
      name: 'audio',
      title: 'Audio duration (MM:SS)',
      description: 'e.g. 14:22',
      type: 'string',
      group: 'media',
    },
    {
      name: 'circuit',
      title: 'Circuit / region',
      type: 'string',
      group: 'meta',
      options: {
        list: [
          'West Africa', 'East Africa', 'South Africa',
          'Europe', 'North America', 'South America',
          'South Asia', 'Southeast Asia',
        ],
      },
    },
    {
      name: 'hue',
      title: 'Accent hue (0–360)',
      description: 'Controls the duotone colour of the cover image. 280 = violet.',
      type: 'number',
      group: 'media',
      initialValue: 280,
      validation: R => R.min(0).max(360),
    },
    {
      name: 'feature',
      title: 'Feature on home page?',
      type: 'boolean',
      group: 'meta',
      initialValue: false,
    },
    {
      name: 'coverImage',
      title: 'Cover image',
      type: 'image',
      group: 'media',
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          title: 'Alt text / art direction note',
          type: 'string',
        },
      ],
    },
    {
      name: 'tags',
      title: 'Tags',
      type: 'array',
      group: 'meta',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
        list: [
          'identity', 'competition', 'aftermath', 'burnout', 'ambition',
          'coaching', 'growth', 'pressure', 'circuits', 'memory', 'access',
          'judging', 'prep-room', 'elitism', 'transition', 'friendship',
          'community', 'beyond',
        ],
      },
    },
    {
      name: 'body',
      title: 'Body',
      type: 'array',
      group: 'content',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Paragraph', value: 'normal' },
            { title: 'Section heading', value: 'h2' },
            { title: 'Pull quote', value: 'blockquote' },
          ],
          marks: {
            decorators: [
              { title: 'Italic', value: 'em' },
              { title: 'Bold', value: 'strong' },
            ],
          },
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      section: 'section',
      media: 'coverImage',
    },
    prepare({ title, author, section, media }) {
      return {
        title,
        subtitle: `${section ? section.toUpperCase() : ''} · ${author || 'No author'}`,
        media,
      };
    },
  },
  orderings: [
    {
      title: 'Publication date, newest first',
      name: 'dateDesc',
      by: [{ field: 'date', direction: 'desc' }],
    },
  ],
};
