import { FALLBACK_SECTORS, sectorBySlug, type Sector } from './sectors'

export const SITE_ORIGIN = 'https://riyadh500.com'
export const SITE_NAME = 'Riyadh 500'

export type PageMeta = {
  path: string
  title: string
  description: string
  canonical: string
}

const HOME: PageMeta = {
  path: '/',
  title: 'Riyadh 500 | Public ranking of business leaders in Riyadh',
  description:
    'Riyadh 500 is a public ranked list of the top 500 business leaders in Riyadh, across 13 sectors. Standing follows votes. Published profiles can be claimed by the people they name.',
  canonical: `${SITE_ORIGIN}/`,
}

const SECTORS: PageMeta = {
  path: '/sectors',
  title: '13 sectors | Riyadh 500',
  description:
    'Browse the 13 sectors of Riyadh 500, from energy and banking to tourism, education, and public programmes. Each sector holds about 38 to 39 places on the list of 500.',
  canonical: `${SITE_ORIGIN}/sectors`,
}

const LEADERBOARD: PageMeta = {
  path: '/leaderboard',
  title: 'Leaderboard | Riyadh 500',
  description:
    'The overall Riyadh 500 leaderboard ranks published leaders by vote volume across every sector. The board is empty until profiles are published. No names are added by hand on this page.',
  canonical: `${SITE_ORIGIN}/leaderboard`,
}

const STATIC: Record<string, PageMeta> = {
  '/': HOME,
  '/sectors': SECTORS,
  '/leaderboard': LEADERBOARD,
}

export function sectorPageMeta(sector: Sector): PageMeta {
  return {
    path: `/sectors/${sector.slug}`,
    title: `${sector.name} | Riyadh 500`,
    description: `${sector.name} is one of 13 sectors on Riyadh 500, with up to ${sector.cap} places. Published leaders will rank here by public votes. The board stays empty until those profiles go live.`,
    canonical: `${SITE_ORIGIN}/sectors/${sector.slug}`,
  }
}

export function pageMetaForPath(pathname: string): PageMeta {
  const path =
    pathname.length > 1 && pathname.endsWith('/') ? pathname.slice(0, -1) : pathname || '/'
  const staticPage = STATIC[path]
  if (staticPage) return staticPage

  const match = /^\/sectors\/([a-z0-9-]+)$/.exec(path)
  if (match) {
    const sector = sectorBySlug(match[1])
    if (sector) return sectorPageMeta(sector)
  }

  throw new Error(`No SEO record for ${pathname}`)
}

export function marketingRoutes(): string[] {
  return ['/', '/sectors', '/leaderboard', ...FALLBACK_SECTORS.map((sector) => `/sectors/${sector.slug}`)]
}

export function pageGraph(page: PageMeta) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        name: SITE_NAME,
        url: SITE_ORIGIN,
        description:
          'Public ranked list of the top 500 business leaders in Riyadh, across 13 sectors.',
      },
      {
        '@type': 'WebSite',
        name: SITE_NAME,
        url: SITE_ORIGIN,
      },
      {
        '@type': 'WebPage',
        name: page.title,
        description: page.description,
        url: page.canonical,
      },
    ],
  }
}
