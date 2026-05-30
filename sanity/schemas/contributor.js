// schemas/contributor.js
const CIRCUIT_LIST = [
  { title: 'West Africa',    value: 'West Africa' },
  { title: 'East Africa',    value: 'East Africa' },
  { title: 'South Africa',   value: 'South Africa' },
  { title: 'Europe',         value: 'Europe' },
  { title: 'North America',  value: 'North America' },
  { title: 'South America',  value: 'South America' },
  { title: 'South Asia',     value: 'South Asia' },
  { title: 'Southeast Asia', value: 'Southeast Asia' },
  { title: 'Pan-African',    value: 'Pan-African' },
  { title: 'WSDC',           value: 'WSDC' },
  { title: 'WUDC',           value: 'WUDC' },
];

export default {
  name: 'contributor',
  title: 'Contributor',
  type: 'document',
  groups: [
    { name: 'identity', title: 'Identity', default: true },
    { name: 'debate',   title: 'Debate background' },
    { name: 'writing',  title: 'Writing' },
  ],
  fields: [

    // ── Identity ──────────────────────────────────────────────────────────────
    {
      name: 'name',
      title: 'Full name',
      type: 'string',
      group: 'identity',
      validation: R => R.required(),
    },
    {
      name: 'slug',
      title: 'Slug (URL ID)',
      type: 'slug',
      group: 'identity',
      options: { source: 'name', maxLength: 96 },
      description: 'Auto-generated from name. Used in /contributor/:slug URLs.',
      validation: R => R.required(),
    },
    {
      name: 'photo',
      title: 'Profile photo',
      type: 'image',
      group: 'identity',
      options: { hotspot: true },
    },
    {
      name: 'region',
      title: 'City / country',
      description: 'e.g. "Nairobi, Kenya"',
      type: 'string',
      group: 'identity',
      validation: R => R.required(),
    },

    // ── Debate background ─────────────────────────────────────────────────────
    {
      name: 'byline',
      title: 'Byline',
      description: 'Shown under their name everywhere. e.g. "Two-time octofinalist" or "Coach, West Africa circuit"',
      type: 'string',
      group: 'debate',
      validation: R => R.required(),
    },
    {
      name: 'debaterType',
      title: 'Relationship to the activity',
      type: 'string',
      group: 'debate',
      options: {
        list: [
          { title: 'Current debater',    value: 'current' },
          { title: 'Alumni / oldie',     value: 'alumni' },
          { title: 'Coach',              value: 'coach' },
          { title: 'Adjudicator',        value: 'adjudicator' },
          { title: 'Debate union / org', value: 'org' },
        ],
        layout: 'radio',
      },
    },
    {
      name: 'circuit',
      title: 'Primary circuit',
      description: 'The main circuit they competed in or are most associated with.',
      type: 'string',
      group: 'debate',
      options: { list: CIRCUIT_LIST },
      validation: R => R.required(),
    },
    {
      name: 'formats',
      title: 'Debate format(s)',
      description: 'The format(s) they competed or adjudicated in.',
      type: 'array',
      group: 'debate',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
        list: [
          { title: 'British Parliamentary (BP)', value: 'BP' },
          { title: 'African Parliamentary (AP)', value: 'AP' },
          { title: 'World Schools (WSDC)',        value: 'World Schools' },
          { title: 'Policy',                     value: 'Policy' },
          { title: 'Lincoln-Douglas (LD)',        value: 'LD' },
          { title: 'Public Forum (PF)',           value: 'PF' },
          { title: 'Karl Popper',                value: 'Karl Popper' },
        ],
      },
    },

    // ── Writing ───────────────────────────────────────────────────────────────
    {
      name: 'sections',
      title: 'Writes for',
      description: 'Which parts of the Tribune this contributor writes for.',
      type: 'array',
      group: 'writing',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
        list: [
          { title: '01 — Essays (personal reflections)', value: 'essays' },
          { title: '02 — Histories (circuits & eras)',   value: 'histories' },
          { title: '03 — Beyond (life after debate)',    value: 'beyond' },
        ],
      },
      validation: R => R.required().min(1),
    },
    {
      name: 'bio',
      title: 'Bio',
      description: '2–3 sentences about who they are and what they write about.',
      type: 'text',
      rows: 3,
      group: 'writing',
      validation: R => R.required().max(400),
    },
  ],

  preview: {
    select: {
      title:   'name',
      byline:  'byline',
      circuit: 'circuit',
      sections:'sections',
      media:   'photo',
    },
    prepare({ title, byline, circuit, sections, media }) {
      const sectionLabel = sections?.length
        ? sections.map(s => s[0].toUpperCase() + s.slice(1)).join(' · ')
        : '—';
      return {
        title,
        subtitle: [byline, circuit, sectionLabel].filter(Boolean).join(' · '),
        media,
      };
    },
  },

  orderings: [
    { title: 'Name A–Z',    name: 'nameAsc',   by: [{ field: 'name',    direction: 'asc' }] },
    { title: 'Region A–Z',  name: 'regionAsc', by: [{ field: 'region',  direction: 'asc' }] },
    { title: 'Circuit A–Z', name: 'circuitAsc',by: [{ field: 'circuit', direction: 'asc' }] },
  ],
};
