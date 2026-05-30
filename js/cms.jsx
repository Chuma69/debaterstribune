// cms.jsx — Sanity fetch layer
// Replace SANITY_PROJECT_ID with your project ID from sanity.io/manage
// Leave SANITY_CONFIGURED = false until you have a real project ID.

const SANITY_CONFIGURED = false; // ← flip to true once you add your project ID
const SANITY_PROJECT_ID  = 'YOUR_PROJECT_ID'; // ← paste from sanity.io/manage
const SANITY_DATASET     = 'production';
const SANITY_API_VERSION = '2024-01-01';

// ── GROQ queries ──────────────────────────────────────────────────────────────

const CONTRIBUTOR_QUERY = `
  *[_type == "contributor"] | order(name asc) {
    "id": slug.current,
    name, role, region, bio,
    circuit, formats, debaterType, sections,
    "photo": photo.asset->url
  }
`;

const ARTICLE_QUERY = `
  *[_type == "article"] | order(date desc) {
    "slug": slug.current,
    title, dek, section, franchise,
    "author": author->slug.current,
    "date": date,
    read, audio, circuit, hue, feature, tags,
    "img": coverImage.alt,
    "coverUrl": coverImage.asset->url,
    body
  }
`;

// ── Portable Text → {t,v} block mapper ───────────────────────────────────────

function ptToBlocks(body) {
  if (!body || !Array.isArray(body)) return [];
  return body.flatMap(node => {
    if (node._type !== 'block') return [];
    const text = (node.children || []).map(c => c.text || '').join('');
    if (!text.trim()) return [];
    if (node.style === 'h2')         return [{ t: 'h', v: text }];
    if (node.style === 'blockquote') return [{ t: 'q', v: text }];
    return [{ t: 'p', v: text }];
  });
}

// ── Date formatter ────────────────────────────────────────────────────────────

function fmtDate(iso) {
  if (!iso) return '';
  const d = new Date(iso);
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

// ── Fetch helper ──────────────────────────────────────────────────────────────

async function sanityFetch(query) {
  const url =
    `https://${SANITY_PROJECT_ID}.api.sanity.io/v${SANITY_API_VERSION}` +
    `/data/query/${SANITY_DATASET}?query=${encodeURIComponent(query)}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Sanity fetch failed: ${res.status}`);
  const json = await res.json();
  return json.result;
}

// ── Main loader ───────────────────────────────────────────────────────────────
// Returns { articles, contributors } shaped exactly like the static data,
// or null if Sanity is not configured yet.

async function loadFromSanity() {
  if (!SANITY_CONFIGURED || SANITY_PROJECT_ID === 'YOUR_PROJECT_ID') {
    return null; // fall back to static data
  }
  try {
    const [rawContributors, rawArticles] = await Promise.all([
      sanityFetch(CONTRIBUTOR_QUERY),
      sanityFetch(ARTICLE_QUERY),
    ]);

    // Build contributors map  { id -> contributor }
    const contributors = {};
    for (const c of rawContributors) {
      contributors[c.id] = c;
    }

    // Build articles array
    const articles = rawArticles.map(a => ({
      ...a,
      date:  fmtDate(a.date),
      audio: a.audio || '10:00',
      hue:   a.hue   || 280,
      body:  ptToBlocks(a.body),
      // use Sanity CDN image URL when available, fall back to local images/
      _coverUrl: a.coverUrl || null,
    }));

    return { articles, contributors };
  } catch (err) {
    console.warn('[Tribune] Sanity fetch failed, using static data.', err);
    return null;
  }
}

Object.assign(window, { loadFromSanity });
