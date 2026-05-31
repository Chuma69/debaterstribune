// schemas/article.js
export default {
  name: 'article',
  title: 'Article',
  type: 'document',
  groups: [
    { name: 'classification', title: 'Classification', default: true },
    { name: 'content',        title: 'Content' },
    { name: 'publishing',     title: 'Publishing' },
    { name: 'media',          title: 'Media' },
  ],
  fields: [

    // ── Classification ────────────────────────────────────────────────────────
    {
      name: 'section',
      title: 'Type of piece',
      description: 'Which section of the Tribune this belongs to.',
      type: 'string',
      group: 'classification',
      options: {
        list: [
          { title: '01 — Essay  (personal reflection, first-person)', value: 'essays' },
          { title: '02 — History  (circuits, rivalries, eras)',        value: 'histories' },
          { title: '03 — Beyond  (life after the circuit)',            value: 'beyond' },
        ],
        layout: 'radio',
      },
      validation: R => R.required(),
    },

    // ── Content ───────────────────────────────────────────────────────────────
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      group: 'content',
      validation: R => R.required(),
    },
    {
      name: 'dek',
      title: 'Subtitle',
      description: 'One sentence that hooks the reader — shown under the title everywhere.',
      type: 'text',
      rows: 2,
      group: 'content',
      validation: R => R.required().max(200),
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
            { title: 'Paragraph',       value: 'normal' },
            { title: 'Section heading', value: 'h2' },
            { title: 'Pull quote',      value: 'blockquote' },
          ],
          marks: {
            decorators: [
              { title: 'Italic', value: 'em' },
              { title: 'Bold',   value: 'strong' },
            ],
          },
        },
      ],
    },
    {
      name: 'audioFile',
      title: 'Audio file',
      description: 'Upload an MP3 or M4A recording of the story being read aloud.',
      type: 'file',
      group: 'content',
      options: { accept: 'audio/*' },
    },

    // ── Publishing ────────────────────────────────────────────────────────────
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'publishing',
      options: { source: 'title', maxLength: 96 },
      validation: R => R.required(),
    },
    {
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{ type: 'contributor' }],
      group: 'publishing',
      validation: R => R.required(),
    },
    {
      name: 'date',
      title: 'Publication date',
      type: 'date',
      group: 'publishing',
      options: { dateFormat: 'MMMM D, YYYY' },
      validation: R => R.required(),
    },
    {
      name: 'read',
      title: 'Read time (minutes)',
      type: 'number',
      group: 'publishing',
      validation: R => R.required().min(1).max(60),
    },
    {
      name: 'feature',
      title: 'Feature on home page?',
      type: 'boolean',
      group: 'publishing',
      initialValue: false,
    },

    // ── Media ─────────────────────────────────────────────────────────────────
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
      name: 'audio',
      title: 'Audio duration (MM:SS)',
      description: 'e.g. 14:22 — displayed in the player. Leave blank if unknown.',
      type: 'string',
      group: 'media',
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
  ],

  preview: {
    select: {
      title:   'title',
      author:  'author.name',
      section: 'section',
      media:   'coverImage',
    },
    prepare({ title, author, section, media }) {
      const sectionMap = { essays: 'Essay', histories: 'History', beyond: 'Beyond' };
      return {
        title,
        subtitle: [sectionMap[section], author].filter(Boolean).join(' · '),
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
    {
      title: 'Type of piece',
      name: 'sectionAsc',
      by: [{ field: 'section', direction: 'asc' }],
    },
  ],
};
