# Sanity CMS — Setup Guide

## 1. Install Node.js (if you haven't)

Download from https://nodejs.org and install the LTS version.

## 2. Create your Sanity project

In Terminal, run:

```bash
cd /Users/raymondchuma-onwuoku/Claude/debaters-tribune/sanity
npm install
npx sanity@latest init --env
```

When prompted:
- **Create new project** → yes
- **Project name** → The Debaters' Tribune
- **Dataset** → production
- **Output path** → `.` (current folder, just press enter)
- **Template** → Clean project with no predefined schemas (we have our own)

This gives you a **Project ID** — copy it.

## 3. Add your Project ID in two places

**In `sanity.config.js`** (line 12):
```js
projectId: 'abc123xyz', // ← paste your project ID here
```

**In `js/cms.jsx`** (lines 5–6):
```js
const SANITY_CONFIGURED = true;          // ← flip to true
const SANITY_PROJECT_ID = 'abc123xyz';   // ← paste your project ID here
```

## 4. Enable CORS for your site

In Terminal:
```bash
npx sanity cors add http://localhost:4200
npx sanity cors add https://YOUR_USERNAME.github.io
```

Or go to **sanity.io/manage → your project → API → CORS Origins** and add the same URLs.

## 5. Run the Sanity Studio

```bash
cd /Users/raymondchuma-onwuoku/Claude/debaters-tribune/sanity
npm run dev
```

Studio opens at http://localhost:3333 — this is your CMS dashboard.

## 6. Enter your content

In the Studio:
1. Go to **Contributors** → create each writer (name, slug, role, region, bio)
2. Go to **Articles** → create each article, selecting the contributor as author
3. For **slug**, use the same values as the current URLs (e.g. `why-i-almost-quit`)

The app will automatically load from Sanity on every page visit once configured.

## 7. Deploy the Studio (optional)

To give editors a public URL instead of running it locally:

```bash
npm run deploy
```

This deploys to `https://your-project-name.sanity.studio/` — free, hosted by Sanity.

---

## Content model

| Type | Fields |
|------|--------|
| **Article** | title, slug, dek, section, author (→ Contributor), date, read time, audio duration, circuit, hue, feature flag, cover image, tags, body (rich text) |
| **Contributor** | name, slug, role, region, bio, based, photo |

## GROQ queries (for reference)

```groq
// All articles ordered by date
*[_type == "article"] | order(date desc) { title, "slug": slug.current, ... }

// Single article by slug
*[_type == "article" && slug.current == "why-i-almost-quit"][0] { ... }

// Articles by a contributor
*[_type == "article" && author->slug.current == "priya-n"] { ... }
```

You can test queries live in the **Vision** tab inside the Studio.
