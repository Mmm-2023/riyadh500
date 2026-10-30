import { FALLBACK_SECTORS, type Sector } from './sectors'

export type GroupId = 'government' | 'private' | 'family'

export type ExampleLeader = {
  slug: string
  name: string
  role: string
  organisation: string
  group: GroupId
  sectorSlug: string
  votes: number
  tone: number
  portrait: string
  summary: string
  sampleVoted?: boolean
}

export const GROUPS: { id: GroupId; name: string; blurb: string; sectors: string[] }[] = [
  {
    id: 'government',
    name: 'Government',
    blurb: 'Ministries, authorities, regulators and public funds.',
    sectors: ['public-sector-vision-2030', 'education-research', 'healthcare-life-sciences'],
  },
  {
    id: 'private',
    name: 'Private sector',
    blurb: 'Founders, executives and chairs of companies.',
    sectors: [
      'banking-financial-services',
      'real-estate-construction',
      'energy-utilities',
      'technology-digital',
      'retail-consumer',
      'industrial-manufacturing',
      'media-entertainment',
      'transport-logistics',
    ],
  },
  {
    id: 'family',
    name: 'Family office',
    blurb: 'Leaders of family offices and family-owned groups.',
    sectors: ['professional-services', 'tourism-hospitality'],
  },
]

export const EXAMPLE_LEADERS: ExampleLeader[] = [
  {
    slug: 'example-leader-a',
    name: 'Example Leader A',
    role: 'Chief Executive',
    organisation: 'Example Bank A',
    group: 'private',
    sectorSlug: 'banking-financial-services',
    votes: 1840,
    tone: 0,
    portrait: 'dark',
    sampleVoted: true,
    summary: 'Example summary. This card is sample data, not a real person.',
  },
  {
    slug: 'example-leader-b',
    name: 'Sample Name B',
    role: 'Governor',
    organisation: 'Example Authority B',
    group: 'government',
    sectorSlug: 'public-sector-vision-2030',
    votes: 1622,
    tone: 1,
    portrait: 'tie',
    summary: 'Example summary. This card is sample data, not a real person.',
  },
  {
    slug: 'example-leader-c',
    name: 'Example Leader C',
    role: 'Managing Director',
    organisation: 'Example Family Office C',
    group: 'family',
    sectorSlug: 'professional-services',
    votes: 1517,
    tone: 2,
    portrait: 'deep',
    summary: 'Example summary. This card is sample data, not a real person.',
  },
  {
    slug: 'example-leader-d',
    name: 'Sample Name D',
    role: 'Chair',
    organisation: 'Example Group D',
    group: 'private',
    sectorSlug: 'banking-financial-services',
    votes: 1204,
    tone: 3,
    portrait: 'grey',
    sampleVoted: true,
    summary: 'Example summary. This card is sample data, not a real person.',
  },
  {
    slug: 'example-leader-e',
    name: 'Example Leader E',
    role: 'Founder',
    organisation: 'Example Capital E',
    group: 'private',
    sectorSlug: 'banking-financial-services',
    votes: 1096,
    tone: 1,
    portrait: 'green',
    summary: 'Example summary. This card is sample data, not a real person.',
  },
  {
    slug: 'example-leader-f',
    name: 'Sample Name F',
    role: 'Deputy Minister',
    organisation: 'Example Ministry F',
    group: 'government',
    sectorSlug: 'public-sector-vision-2030',
    votes: 988,
    tone: 2,
    portrait: 'mint',
    summary: 'Example summary. This card is sample data, not a real person.',
  },
  {
    slug: 'example-leader-g',
    name: 'Example Leader G',
    role: 'Example role',
    organisation: 'Example organisation',
    group: 'family',
    sectorSlug: 'tourism-hospitality',
    votes: 740,
    tone: 2,
    portrait: 'mint',
    summary: 'Example summary. This card is sample data, not a real person.',
  },
  {
    slug: 'example-leader-h',
    name: 'Example Leader H',
    role: 'Example role',
    organisation: 'Example organisation',
    group: 'private',
    sectorSlug: 'technology-digital',
    votes: 690,
    tone: 3,
    portrait: 'pale',
    summary: 'Example summary. This card is sample data, not a real person.',
  },
]

export function sectorBySlug(slug: string): Sector | undefined {
  return FALLBACK_SECTORS.find((sector) => sector.slug === slug)
}

export function groupForSector(slug: string) {
  return GROUPS.find((group) => group.sectors.includes(slug))
}

export function leadersInSector(slug: string) {
  return EXAMPLE_LEADERS.filter((leader) => leader.sectorSlug === slug).sort((a, b) => b.votes - a.votes)
}

export function leaderBySlug(slug: string) {
  return EXAMPLE_LEADERS.find((leader) => leader.slug === slug)
}

export function searchLeaders(query: string) {
  const needle = query.trim().toLowerCase()
  if (!needle) return []
  return EXAMPLE_LEADERS.filter((leader) => {
    const sector = sectorBySlug(leader.sectorSlug)?.name ?? ''
    return `${leader.name} ${leader.role} ${leader.organisation} ${sector}`.toLowerCase().includes(needle)
  })
}

export const EXAMPLE_NOTE = 'Example data. No real profiles are public.'

export const PARTNER_LINE = 'Presented by [Example Partner]'

export const RANK_LINE = 'Rank is never for sale.'
