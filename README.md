# The News Press — Public Website

Public-facing Next.js (App Router) website for a fictional online newspaper. Reads all content from a separate Payload CMS over its HTTP API — this app does not import Payload's config or use its Local API at runtime.

## Live deployment

- **Public website:** https://website-noti-prensa.vercel.app
- **CMS this site reads from:** https://payload-cms-noti-prensa.vercel.app

## Architecture overview

- **Framework:** Next.js (App Router), TypeScript, Tailwind CSS.
- **Data source:** Payload's REST API only, via `fetch`, in Server Components.
- **Rendering strategy:** ISR (Incremental Static Regeneration) with a 60-second `revalidate` window as a baseline, backed by an **on-demand revalidation webhook** (`/api/revalidate`) that Payload calls immediately after any Article/Page/Category/Site Settings change — so published edits generally appear within seconds, not up to a minute later.
- **Preview mode:** `/api/preview` enables Next's `draftMode()`, then redirects to the relevant Article/Page, which is fetched in draft state using a Payload API key sent server-side only. A visible "Preview Mode" banner (with an exit link) appears while active.
- **Images:** `next/image`, sourced from Payload's media API / Vercel Blob, with `remotePatterns` explicitly allow-listing the CMS's domain(s).

### Pages

| Route | Description |
|---|---|
| `/` | CMS-driven home page — fetches the Payload Page with slug `home` and renders its `layout` blocks. |
| `/[slug]` | Any other CMS Page (e.g. `/about`), same block-rendering mechanism. |
| `/articles` | Listing of all published Articles, newest first. |
| `/articles/[slug]` | Single article detail page (fixed template, not editor-composed). |
| `/category/[slug]` | Articles filtered by category. |
| `/api/preview`, `/api/disable-preview` | Enter/exit preview (draft) mode. |
| `/api/revalidate` | Webhook endpoint called by Payload after content changes. |

### Block rendering

Payload's `layout` field on Pages returns an array of typed blocks (`hero`, `richText`, `cta`, `cardGrid`). `BlockRenderer` dispatches each to its matching React component; an unrecognized `blockType` is skipped with a console warning rather than crashing the page, so an editor adding a new block type the frontend doesn't yet support degrades safely.

## Prerequisites

- Node.js 20+
- npm
- A running instance of the companion Payload CMS (local or deployed)

## Local setup

```bash
git clone <this-repo-url> website-noti-prensa
cd website-noti-prensa
npm install
cp .env.example .env.local
```

Fill in `.env.local`:

```
PAYLOAD_API_URL=http://localhost:3000/api
NEXT_PUBLIC_PAYLOAD_URL=http://localhost:3000
REVALIDATE_SECRET=<must match the Payload project's REVALIDATE_SECRET>
PREVIEW_SECRET=<must match the Payload project's PREVIEW_SECRET>
PAYLOAD_API_KEY=<a Payload user's API key — see Payload README for how to generate one>
```

The website's own dev server runs on port 3001 to avoid colliding with Payload on 3000 (`package.json`'s `dev` script is set to `next dev -p 3001`).

## Types

`lib/types/payload-types.ts` is copied from Payload's auto-generated `payload-types.ts`, with the trailing `declare module 'payload'` augmentation block removed (this project doesn't have the `payload` package installed, so that augmentation doesn't apply here). Re-copy this file after changing any collection/global schema on the CMS side.

## Running locally

With the Payload CMS also running locally (see its own README):

```bash
npm run dev
```

Visit `http://localhost:3001`.

## Tests

```bash
npm run test
```

Covers (`app/components/__tests__/BlockRenderer.test.tsx`):
- Hero block renders heading/subheading correctly.
- Card Grid block renders all provided cards.
- An unrecognized block type is skipped without throwing (safe handling of unexpected CMS data).
- An empty blocks array renders nothing.

## Linting, type checking, build

```bash
npm run lint
npm run build
```

## Deployment notes (Vercel)

1. Import the repo as a Vercel project.
2. Set environment variables (Production scope): `PAYLOAD_API_URL`, `NEXT_PUBLIC_PAYLOAD_URL` (both pointing at the deployed Payload URL), `REVALIDATE_SECRET`, `PREVIEW_SECRET`, `PAYLOAD_API_KEY`.
3. In `next.config.ts`, ensure `images.remotePatterns` includes the deployed Payload domain (`https://<payload-app>.vercel.app`, path `/api/media/file/**`) and the Vercel Blob storage domain (`*.public.blob.vercel-storage.com`), in addition to the localhost entry used for local dev.
4. Deploy, then go back to the Payload project and set its `NEXT_WEBSITE_URL` to this site's real URL, and redeploy Payload so the revalidation webhook and preview links point at the correct place.

## Trade-offs & decisions

- **Caching strategy:** ISR + webhook-based on-demand revalidation, rather than pure SSR on every request. This keeps normal page loads fast (served from cache) while still reflecting edits quickly. The trade-off: if the webhook call itself ever fails silently (e.g., a transient network issue between the two Vercel deployments), content can be stale for up to the 60-second `revalidate` fallback window rather than updating instantly — an acceptable trade-off for a news site of this scale.
- **Card Grid images/links are editor-typed, not derived:** see the Payload README's note on this same trade-off — it affects rendering here too, since the frontend just displays whatever the block's fields contain.
- **Minimal custom rich text renderer:** handles paragraphs and bold/italic from Payload's Lexical output; does not yet handle headings, lists, or links within body content. Noted here since it directly affects what displays correctly on Article pages.

## Known limitations

- No client-side search, pagination, or sitemap generation (listed as optional enhancements in the assignment, not implemented here).
- No dedicated loading skeletons; relies on Next.js's default streaming/suspense behavior plus explicit empty-state and not-found messaging per route.
- Mobile navigation is a simple responsive layout; no hamburger menu/drawer for small viewports.

## AI tool disclosure

See the companion Payload CMS README for the full AI-use disclosure — the same tool (Claude) was used across both repos for this project, and the disclosure there applies equally here (scaffolding, debugging, and documentation, with all output reviewed and tested before being kept).
