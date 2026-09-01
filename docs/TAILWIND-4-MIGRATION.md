# Tailwind CSS 4 migration

**Validated:** 2026-09-01

## Versions

- Tailwind CSS: `3.4.17` → `4.3.3`
- Tailwind PostCSS integration: built-in `tailwindcss` plugin → `@tailwindcss/postcss@4.3.3`
- Node.js types: `22.13.10` → `26.4.0`
- TypeScript remains on `6.0.3`; TypeScript 7 was not forced.

## Migration details

The global stylesheet now uses `@import "tailwindcss"`. PostCSS loads
`@tailwindcss/postcss`, and the redundant `autoprefixer` dependency was removed.
The empty Tailwind 3 JavaScript config and its explicit content globs were also
removed: Tailwind 4 automatically scans the Next.js App Router source files in
this starter.

## Generated-starter validation

A clean copy of the starter was installed in a temporary directory with
`npm ci`, then validated with:

- `npm run lint` — passed
- `npx tsc --noEmit` — passed with TypeScript 6.0.3 and `@types/node` 26.4.0
- Tests — N/A; the starter has no test script or test suite
- `npm run build` — passed with Next.js 16.3.4; all routes compiled
- Production runtime smoke — `npm start` served `/` and the generated CSS with
  HTTP 200; the page heading and compiled Tailwind utility CSS were present

## Compatibility notes

- TypeScript 7 remains blocked by `typescript-eslint@8.69.0`, whose TypeScript
  peer range is `>=4.8.4 <6.1.0`. See [TS7-BLOCKED.md](./TS7-BLOCKED.md).
- `workers-types` is N/A for this Next.js starter; it targets Cloudflare Workers.
