# Riyadh 500

Public ranked list of the top 500 business leaders in Riyadh, across 13 sectors.

## Stack

- Vite, React 19, TypeScript, React Router, Tailwind CSS v4
- Supabase (`@supabase/supabase-js`)
- GitHub Pages at the domain root (`riyadh500.com`, base path `/`)

## Wave 0

Marketing land (`/`), the sector index (`/sectors`), a page for each sector (`/sectors/:slug`), and an empty overall leaderboard (`/leaderboard`).

No leader profiles are seeded. The boards read published rows from Supabase and stay empty until those rows exist. If the sector query cannot reach Supabase, the 13 seeded sectors are shown from a local fallback. Public reads use the anon key and row level security.

Product notes: https://app.notion.com/p/3e37442e2fd181209783d12bfd19f907

## Local

```bash
cp .env.example .env
npm install
npm run dev
```

`npm run build` typechecks, builds the Vite app, and prerenders the public routes into `dist/` with `CNAME`, `.nojekyll`, and a `404.html` SPA fallback.

## DNS

Point `riyadh500.com` at GitHub Pages when ready:

- Apex: A records `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
- `www`: CNAME `Mmm-2023.github.io`

The Pages artifact ships `CNAME` as `riyadh500.com`. The site is built for that host at `/`, not for a `/riyadh500/` project subpath. Until the custom domain resolves, GitHub may also expose the project site at `https://mmm-2023.github.io/riyadh500`.
