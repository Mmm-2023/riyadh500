import { EXAMPLE_LEADERS, leaderBySlug, type ExampleLeader } from './example'

export const SITE_ORIGIN = 'https://riyadh500.com'
export const SITE_NAME = 'Riyadh 500'

export type PageMeta = {
  path: string
  title: string
  description: string
  canonical: string
}

const PAGES: Record<string, PageMeta> = {
  '/': {
    path: '/',
    title: 'Riyadh 500 | The people who lead Riyadh, ranked by you',
    description:
      'Riyadh 500 is a public list of business leaders in Riyadh across government, the private sector and family offices. Vote, nominate and read example profiles. Rank is never for sale.',
    canonical: `${SITE_ORIGIN}/`,
  },
  '/browse': {
    path: '/browse',
    title: 'Browse groups and sectors | Riyadh 500',
    description:
      'Browse Riyadh 500 by three groups and 13 sectors. Government, the private sector and family offices sit above the sector index. Example profiles only.',
    canonical: `${SITE_ORIGIN}/browse`,
  },
  '/leaderboard': {
    path: '/leaderboard',
    title: 'Leaderboard | Riyadh 500',
    description:
      'The Riyadh 500 leaderboard shows example ranks by sector, with one-tap voting after sign-in. No real profiles are public. Rank is never for sale.',
    canonical: `${SITE_ORIGIN}/leaderboard`,
  },
  '/nominate': {
    path: '/nominate',
    title: 'Nominate a leader | Riyadh 500',
    description:
      'Suggest a leader for Riyadh 500. Nominations are reviewed and are not public. Sign in with an email code, then send a name, role, organisation and sector.',
    canonical: `${SITE_ORIGIN}/nominate`,
  },
  '/insights': {
    path: '/insights',
    title: 'Insights | Riyadh 500',
    description:
      'Example insights for Riyadh 500: list updates, short analysis and a weekly email. The notes use sample headlines, not real people. Subscribe to the newsletter.',
    canonical: `${SITE_ORIGIN}/insights`,
  },
  '/partners': {
    path: '/partners',
    title: 'Partners | Riyadh 500',
    description:
      'Partner slots on Riyadh 500 are labelled Presented by [Example Partner]. Audience and price are placeholders. Rank is never for sale.',
    canonical: `${SITE_ORIGIN}/partners`,
  },
  '/privacy': {
    path: '/privacy',
    title: 'Privacy | Riyadh 500',
    description:
      'Riyadh 500 stores your email for a vote, a nomination or the newsletter. Votes are not shown with your name. Nominations are not public. Example profiles are not real people.',
    canonical: `${SITE_ORIGIN}/privacy`,
  },
  '/terms': {
    path: '/terms',
    title: 'Terms | Riyadh 500',
    description:
      'Riyadh 500 is a public list of business leaders in Riyadh. Rank is never for sale. Profiles on this version are examples. A nomination is a suggestion, not a place on the list.',
    canonical: `${SITE_ORIGIN}/terms`,
  },
}

export function profileMeta(leader: ExampleLeader): PageMeta {
  return {
    path: `/leaders/${leader.slug}`,
    title: `${leader.name} | Riyadh 500`,
    description: `${leader.name} is an example profile on Riyadh 500, not a real person. ${leader.role} at ${leader.organisation}. Example votes only. Rank is never for sale.`,
    canonical: `${SITE_ORIGIN}/leaders/${leader.slug}`,
  }
}

export function pageMetaForPath(pathname: string): PageMeta {
  const path = pathname.length > 1 && pathname.endsWith('/') ? pathname.slice(0, -1) : pathname || '/'
  const staticPage = PAGES[path]
  if (staticPage) return staticPage
  const match = /^\/leaders\/([a-z0-9-]+)$/.exec(path)
  if (match) {
    const leader = leaderBySlug(match[1])
    if (leader) return profileMeta(leader)
  }
  throw new Error(`No SEO record for ${pathname}`)
}

export function marketingRoutes(): string[] {
  return [...Object.keys(PAGES), ...EXAMPLE_LEADERS.map((leader) => `/leaders/${leader.slug}`)]
}

export function pageGraph(page: PageMeta) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        name: SITE_NAME,
        url: SITE_ORIGIN,
        description: 'Public list of business leaders in Riyadh. Rank is never for sale.',
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
