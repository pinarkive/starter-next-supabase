# PinArkive · Next.js + Supabase starter

Official PinArkive starter: a minimal **Next.js (App Router)** app with **Tailwind** and **TypeScript**, plus an optional **Supabase** placeholder. Users upload a file through the UI; the browser sends it to **`POST /api/upload`**, where **`PinarkiveClient`** from **`sdk-ts`** runs with your API key. The key never ships to the browser bundle—good for production-minded demos and hackathons.

These starters are intended to be published as public repositories under the PinArkive GitHub organization and are free to use.

## What this starter is for

Teams that want a **Next.js** + **Vercel** path, App Router conventions, and room to add Supabase later—while keeping PinArkive integration **strictly server-side**.

## When to use this vs the others

| Choose **Next.js** (this repo) | Choose **Vite + Express** | Choose **Hono + Workers** |
|--------------------------------|---------------------------|---------------------------|
| Next on **Vercel**, React UI, API routes | **Vite** SPA + **Node** proxy (same or split deploy) | **Cloudflare Workers**, one edge bundle |

## Why PinArkive?

[PinArkive](https://pinarkive.com) lets you **upload files**, receive **CIDs** (content identifiers), and use **IPFS-backed storage** through an API—without operating your own IPFS nodes or pinning infrastructure. This starter wires that flow in a few lines so you can focus on product logic.

## Stack

Next.js 16 · React 19 · TypeScript 6 · Tailwind CSS 4 · `@supabase/supabase-js` (optional) · **`sdk-ts`** → `@pinarkive/pinarkive-sdk-ts` (server-only)

See [Tailwind CSS 4 migration and validation](./docs/TAILWIND-4-MIGRATION.md) for the before/after versions and clean-starter checks.

## Quick start

```bash
cp .env.example .env.local
# Set PINARKIVE_API_KEY in .env.local

npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment variables

| Variable | Required | Description |
|----------|----------|-------------|
| `PINARKIVE_API_KEY` | Yes | PinArkive API key. **Server-only** — never use the `NEXT_PUBLIC_` prefix. |
| `PINARKIVE_API_BASE_URL` | No | API v3 base URL. Defaults to `https://api.pinarkive.com` with `/api/v3` appended if omitted. |
| `PINARKIVE_CLUSTER_ID` | No | Optional; sent as SDK `clusterId` (`cl`). Example: `cl0-global`. |
| `NEXT_PUBLIC_SUPABASE_URL` | No | Optional; for future Supabase use. |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | No | Optional; for future Supabase use. |

## How upload works

1. The client posts **`multipart/form-data`** with field **`file`** to **`/api/upload`**.
2. The route loads **`PINARKIVE_*`** env vars and calls **`uploadFileWithPinarkiveSdk`** in **`lib/pinarkive.ts`**, which uses **`PinarkiveClient.uploadFile`** from **`sdk-ts`** (PinArkive API v3 **`POST /files`**).
3. The response body is **`{ ok, cid, data, error? }`**. The HTTP status reflects success or failure; **`httpStatus` is not a field in the JSON.**

## HTTP status behavior

| Situation | Status |
|-----------|--------|
| Upload succeeded (`ok: true`) | **200** |
| Missing `file` or invalid multipart | **400** |
| Empty file | **400** |
| File over size limit | **413** |
| Missing `PINARKIVE_API_KEY` | **500** |
| PinArkive API error (`PinarkiveAPIError`) | SDK **`statusCode`** if **400–599**, else **400** |
| Other unexpected errors during upload | **400** |

## Example success JSON

```json
{
  "ok": true,
  "cid": "bafybeiexample…",
  "data": {
    "cid": "bafybeiexample…",
    "status": "ok"
  }
}
```

(`data` may include additional fields from the SDK.)

## Example error JSON

Missing API key (HTTP **500**):

```json
{
  "ok": false,
  "cid": null,
  "data": null,
  "error": "Missing PINARKIVE_API_KEY. See README and the environment example file in this repository."
}
```

No file (HTTP **400**):

```json
{
  "ok": false,
  "cid": null,
  "data": null,
  "error": "No file provided."
}
```

## Deployment

**Vercel:** import the repo, add **`PINARKIVE_API_KEY`** (and optionally **`PINARKIVE_API_BASE_URL`**, **`PINARKIVE_CLUSTER_ID`**) under Project → Settings → Environment Variables. Never expose the API key with `NEXT_PUBLIC_`.

## Project structure

```text
app/
  api/upload/route.ts    # Upload handler (server-only sdk-ts)
  page.tsx, layout.tsx, globals.css
components/
  upload-form.tsx, result-card.tsx
lib/
  pinarkive.ts                      # PinarkiveClient wrapper + status mapping
  normalize-pinarkive-response.ts   # Shared `{ ok, cid, data, error? }` type
  supabase.ts                       # Optional Supabase client
```

## Notes on **`sdk-ts`**

- **`package.json`** maps **`sdk-ts`** → **`@pinarkive/pinarkive-sdk-ts`** (official PinArkive TypeScript client for API v3).
- Import **`sdk-ts` only in server code** (e.g. **`lib/pinarkive.ts`**, **`app/api/**`**), never in **`"use client"`** components.
- The unscoped npm package **`sdk-ts@1.0.0`** is unrelated; this template uses the **alias** to **`@pinarkive/pinarkive-sdk-ts`**.

## Preview assets (after publish)

This README is ready for optional demo media once you record them in a real environment (no placeholder images are committed):

- **Short demo (about 3–5 s):** select file → upload → CID appears.
- **Full flow (about 10–15 s):** clone → install → configure env → run → upload → CID.

Add GIFs or screenshots under something like **`docs/`** and link them here when available.

## Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm run start` | Production server |
| `npm run lint` | ESLint |

## License

[MIT License](./LICENSE). Use of the PinArkive API is subject to PinArkive’s terms.
