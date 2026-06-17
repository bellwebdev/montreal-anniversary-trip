# Montréal Anniversary Trip

An interactive itinerary for our Montréal anniversary trip (June 25–29), built with React Router v7 and deployed as a fully static site on Cloudflare Pages.

## Stack

- React Router v7, fully static export (`ssr: false` + `prerender` in `react-router.config.ts`) — no Node server needed at runtime.
- Plain CSS + CSS Modules for styling (no Tailwind).
- A single Cloudflare Pages Function (`functions/api/choices.ts`) backed by Cloudflare KV, so both of us see the same picks for the "choose your own adventure" moments (Day 3 add-on, Day 4 afternoon activity) instead of each phone having its own answer.

## Local development

```bash
npm install
npm run dev
```

App runs at `http://localhost:5173`. Note: plain `npm run dev` does **not** run the `/api/choices` Pages Function — the choice buttons still work and save to `localStorage`, they just won't sync between devices until deployed (or run via `wrangler pages dev`, see below).

To test the full thing locally, including the shared KV-backed sync:

```bash
npm run pages:dev
```

This builds the static site and serves it through `wrangler pages dev`, which simulates the Pages Function and KV locally (no real Cloudflare account needed for this).

## Deploying to Cloudflare Pages

### 1. Push to GitHub

Push this repo to GitHub (Cloudflare Pages deploys from a Git connection).

### 2. Create a KV namespace

One-time setup, needed so both of you see the same selections:

```bash
npx wrangler login
npx wrangler kv namespace create CHOICES_KV
```

This prints an `id`. Copy it into `wrangler.toml`, replacing `REPLACE_WITH_YOUR_KV_NAMESPACE_ID`.

### 3. Connect the repo in the Cloudflare dashboard

In the Cloudflare dashboard → Workers & Pages → Create → Pages → connect to this GitHub repo, with:

- **Build command:** `npm run build`
- **Build output directory:** `build/client`

### 4. Bind the KV namespace to the Pages project

In the Pages project → Settings → Functions → KV namespace bindings, add:

- **Variable name:** `CHOICES_KV`
- **KV namespace:** the one created in step 2

Add this for both the Production and Preview environments.

### 5. Deploy

Push to your main branch (or trigger a deploy from the dashboard). Cloudflare builds and serves the static site, and the `functions/api/choices.ts` Pages Function picks up the KV binding automatically.

No backend hosting, no ongoing cost — this all runs on Cloudflare's free tier.

## Project structure

```
app/
  data/itinerary.ts       # All itinerary content (days, sections, choices)
  routes/                 # Overview, day detail, and food & culture pages
  components/             # ActivityCard, ChoicePicker, Layout (nav)
  lib/useChoice.ts         # Hook syncing a choice via /api/choices + localStorage fallback
functions/api/choices.ts  # Cloudflare Pages Function (GET/POST) backed by KV
wrangler.toml             # Cloudflare Pages config + KV namespace binding
```
