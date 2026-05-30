// schemas/contributor.js
export default {
  name: 'contributor',
  title: 'Contributor',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Full name',
      type: 'string',
      validation: R => R.required(),
    },
    {
      name: 'slug',
      title: 'Slug (URL ID)',
      type: 'slug',
      options: { source: 'name', maxLength: 96 },
      description: 'e.g. "priya-n" — used in /contributor/:slug URLs',
      validation: R => R.required(),
    },
    {
      name: 'role',
      title: 'Role / credential',
      description: 'e.g. "Two-time octofinalist" or "Adjudicator, AP & BP"',
      type: 'string',
      validation: R => R.required(),
    },
    {
      name: 'region',
      title: 'Region / city',
      description: 'e.g. "Nairobi, Kenya"',
      type: 'string',
      validation: R => R.required(),
    },
    {
      name: 'bio',
      title: 'Bio',
      description: '2–3 sentences. What they write about.',
      type: 'text',
      rows: 3,
      validation: R => R.required().max(400),
    },
    {
      name: 'based',
      title: '"Based now" / current note',
      description: 'e.g. "Now a speechwriter." — shown under the bio.',
      type: 'string',
    },
    {
      name: 'photo',
      title: 'Profile photo',
      type: 'image',
      options: { hotspot: true },
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'region',
      media: 'photo',
    },
  },
  orderings: [
    {
      title: 'Name A–Z',
      name: 'nameAsc',
      by: [{ field: 'name', direction: 'asc' }],
    },
  ],
};
