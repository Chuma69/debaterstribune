// schemas/article.js
export default {
  name: 'article',
  title: 'Article',
  type: 'document',
  fields: [

    // 1. Type of piece
    {
      name: 'section',
      title: 'Type of piece',
      type: 'string',
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

    // 2. Title
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: R => R.required(),
    },

    // 3. Slug
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      description: 'Auto-generated from the title. Used in the article URL.',
      validation: R => R.required(),
    },

    // 4. Subtitle
    {
      name: 'dek',
      title: 'Subtitle',
      description: 'One sentence that hooks the reader — shown under the title everywhere.',
      type: 'text',
      rows: 2,
      validation: R => R.required().max(200),
    },

    // 5. Body
    {
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Paragraph',       value: 'normal' },
            { title: 'Section heading', value: 'h2' },
            { title: 'Pull quote',      value: 'blockquote' },
          ],
          lists: [
            { title: 'Bullet list',   value: 'bullet' },
            { title: 'Numbered list', value: 'number' },
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

    // 6. Read time
    {
      name: 'read',
      title: 'Read time (minutes)',
      type: 'number',
      validation: R => R.required().min(1).max(60),
    },

    // 7. Audio file — duration is read automatically from the file by the player
    {
      name: 'audioFile',
      title: 'Audio file',
      description: 'Upload an MP3 or M4A. Duration is detected automatically — no need to enter it manually.',
      type: 'file',
      options: { accept: 'audio/*' },
    },

    // 8. Author
    {
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{ type: 'contributor' }],
      validation: R => R.required(),
    },

    // 9. Cover image
    {
      name: 'coverImage',
      title: 'Cover image',
      type: 'image',
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          title: 'Alt text / art direction note',
          type: 'string',
        },
      ],
    },

    // 10. Publication date
    {
      name: 'date',
      title: 'Publication date',
      type: 'date',
      options: { dateFormat: 'MMMM D, YYYY' },
      validation: R => R.required(),
    },

    // 11. Feature flag
    {
      name: 'feature',
      title: 'Feature on home page?',
      type: 'boolean',
      initialValue: false,
    },

    // 12. Accent hue (design)
    {
      name: 'hue',
      title: 'Accent hue (0–360)',
      description: 'Controls the duotone colour of the cover image. 280 = violet.',
      type: 'number',
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
