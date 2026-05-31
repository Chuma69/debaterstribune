// cms.jsx — Sanity fetch layer

const SANITY_CONFIGURED = true;
const SANITY_PROJECT_ID  = '1eyxn40r';
const SANITY_DATASET     = 'production';
const SANITY_API_VERSION = '2024-01-01';

// ── GROQ queries ──────────────────────────────────────────────────────────────

const SITE_SETTINGS_QUERY = `
  *[_type == "siteSettings" && _id == "siteSettings"][0] {
    "featuredSlug":  featuredArticle->slug.current,
    "spotlightSlug": editorsSpotlight->slug.current
  }
`;

const CONTRIBUTOR_QUERY = `
  *[_type == "contributor"] | order(name asc) {
    "id": slug.current,
    name, byline, region, bio,
    circuit, formats, debaterType,
    "photo": photo.asset->url
  }
`;

const ARTICLE_QUERY = `
  *[_type == "article"] | order(date desc) {
    "slug": slug.current,
    title, dek, section,
    "author": author->slug.current,
    "date": date,
    read, hue,
    "img": coverImage.alt,
    "coverUrl": coverImage.asset->url,
    "audioUrl": audioFile.asset->url,
    body
  }
`;

// ── Portable Text → {t,v} block mapper ───────────────────────────────────────

function ptToBlocks(body) {
  if (!body || !Array.isArray(body)) return [];
  const result = [];
  let currentList = null;

  for (const node of body) {
    if (node._type !== 'block') continue;
    const text = (node.children || []).map(c => c.text || '').join('');
    if (!text.trim()) continue;

    if (node.listItem === 'bullet') {
      if (!currentList || currentList.t !== 'ul') {
        currentList = { t: 'ul', v: [] };
        result.push(currentList);
      }
      currentList.v.push(text);
      continue;
    }
    if (node.listItem === 'number') {
      if (!currentList || currentList.t !== 'ol') {
        currentList = { t: 'ol', v: [] };
        result.push(currentList);
      }
      currentList.v.push(text);
      continue;
    }

    currentList = null;

    if (node.style === 'h2')         { result.push({ t: 'h', v: text }); continue; }
    if (node.style === 'blockquote') { result.push({ t: 'q', v: text }); continue; }
    result.push({ t: 'p', v: text });
  }

  return result;
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

async function loadFromSanity() {
  if (!SANITY_CONFIGURED || SANITY_PROJECT_ID === 'YOUR_PROJECT_ID') {
    return null;
  }
  try {
    const [settings, rawContributors, rawArticles] = await Promise.all([
      sanityFetch(SITE_SETTINGS_QUERY),
      sanityFetch(CONTRIBUTOR_QUERY),
      sanityFetch(ARTICLE_QUERY),
    ]);

    // Build contributors map
    const contributors = {};
    for (const c of rawContributors) {
      contributors[c.id] = c;
    }

    // Mark featured + spotlight from settings (single source of truth)
    const featuredSlug  = settings?.featuredSlug;
    const spotlightSlug = settings?.spotlightSlug;

    const articles = rawArticles.map(a => ({
      ...a,
      date:     fmtDate(a.date),
      hue:      a.hue || 280,
      body:     ptToBlocks(a.body),
      feature:  a.slug === featuredSlug,      // ← set by settings, not per-article toggle
      spotlight: a.slug === spotlightSlug,    // ← new flag for editor's spotlight
      _coverUrl: a.coverUrl || null,
    }));

    return { articles, contributors, featuredSlug, spotlightSlug };
  } catch (err) {
    console.warn('[Tribune] Sanity fetch failed, using static data.', err);
    return null;
  }
}

Object.assign(window, { loadFromSanity });
