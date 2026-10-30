# Riyadh 500

Public ranked list of the top 500 business leaders in Riyadh, across 13 sectors.

## Stack

- Vite, React 19, TypeScript, React Router, Tailwind CSS v4
- Supabase (`@supabase/supabase-js`)
- GitHub Pages at the domain root (`riyadh500.com`, base path `/`)

## What is on the site

The public UI follows the approved black, white and Saudi green design. It is mobile first, with a bottom nav, sticky search, filter chips and a peeking carousel.

- `/` home
- `/browse` groups (Government, Private sector, Family offices) and the 13 sectors
- `/leaderboard` example ranks, with Vote
- `/leaders/:slug` example profile
- `/nominate` nomination form
- `/insights` example notes and the newsletter
- `/partners` labelled partner slots

Profiles on screen are example data with silhouette placeholders. The app does not read the `leaders` table. A column-limited `leaders_public` view exists for later and only exposes published rows.

Votes use Supabase Auth. The first vote opens an email-code sheet. Google and Apple buttons stay inactive unless `VITE_AUTH_GOOGLE` or `VITE_AUTH_APPLE` is `true`. After sign-in, each later vote is one tap, with Undo. `user_votes` allows one row per user per leader slug.

Nominations insert into `nominations` with status `in_review` and are not publicly readable. The newsletter inserts into `subscribers` and that table is insert-only.

SQL is in `supabase/migrations/20261030120000_votes_nominations_subscribers.sql`.

Product notes: https://app.notion.com/p/3e37442e2fd181209783d12bfd19f907

## Local

```bash
cp .env.example .env
npm install
npm run dev
```

`npm run build` typechecks, builds the Vite app, and prerenders the public routes into `dist/` with `CNAME`, `.nojekyll`, and a `404.html` SPA fallback.

## Deploy

Pushes to `main` run `.github/workflows/pages.yml`. The build job produces `dist/`. The deploy job needs GitHub Pages turned on for this repository: Settings, Pages, Build and deployment, Source: GitHub Actions. Until that source is selected, the deploy step returns 404.

## DNS

Point `riyadh500.com` at GitHub Pages when ready:

- Apex: A records `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
- `www`: CNAME `Mmm-2023.github.io`

The Pages artifact ships `CNAME` as `riyadh500.com`. The site is built for that host at `/`, not for a `/riyadh500/` project subpath. Until the custom domain resolves, GitHub may also expose the project site at `https://mmm-2023.github.io/riyadh500`.
