// schemaTypes/siteSettings.js
// Singleton document — there is always exactly one of these.
// Editors use it to pin the featured article and the editor's spotlight.
// The Studio structure config prevents creating or deleting it.

export default {
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  // Prevent editors from creating duplicates or deleting this document
  __experimental_actions: ['update', 'publish'],
  fields: [
    {
      name: 'featuredArticle',
      title: 'Featured article',
      description: 'Pinned at the top of the home page. Only one article at a time.',
      type: 'reference',
      to: [{ type: 'article' }],
      validation: R => R.required(),
    },
    {
      name: 'editorsSpotlight',
      title: "Editor's spotlight",
      description: 'Shown in the dark highlight section on the home page. Pick a different article from the featured one.',
      type: 'reference',
      to: [{ type: 'article' }],
      validation: R => R.required(),
    },
  ],
  preview: {
    select: {
      featured: 'featuredArticle.title',
      spotlight: 'editorsSpotlight.title',
    },
    prepare({ featured, spotlight }) {
      return {
        title: 'Site Settings',
        subtitle: `Featured: ${featured || '—'} · Spotlight: ${spotlight || '—'}`,
      };
    },
  },
};
