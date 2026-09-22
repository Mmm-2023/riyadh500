export type Sector = {
  id: string
  slug: string
  name: string
  sort_order: number
  cap: number
}

/** Mirrors the seeded `sectors` rows. Used when the client cannot reach Supabase. */
export const FALLBACK_SECTORS: Sector[] = [
  {
    id: 'f5ee06e2-1efe-46b5-b000-f0684ddb6d16',
    slug: 'energy-utilities',
    name: 'Energy & utilities',
    sort_order: 1,
    cap: 39,
  },
  {
    id: '0d7c1666-a317-45b2-8157-046eb78798be',
    slug: 'banking-financial-services',
    name: 'Banking & financial services',
    sort_order: 2,
    cap: 39,
  },
  {
    id: '1e85d0a1-f6fe-4170-8aeb-4275b9396c5f',
    slug: 'real-estate-construction',
    name: 'Real estate & construction',
    sort_order: 3,
    cap: 39,
  },
  {
    id: 'f5a8790b-7e67-44e6-b605-7784939d2208',
    slug: 'healthcare-life-sciences',
    name: 'Healthcare & life sciences',
    sort_order: 4,
    cap: 38,
  },
  {
    id: '8c74211e-c79c-4dbb-b186-b03036ec34cc',
    slug: 'technology-digital',
    name: 'Technology & digital',
    sort_order: 5,
    cap: 39,
  },
  {
    id: '1d634d8d-08ea-4ace-96c9-387553ce1b51',
    slug: 'retail-consumer',
    name: 'Retail & consumer',
    sort_order: 6,
    cap: 38,
  },
  {
    id: '1e4e800c-38db-47f8-ac91-90faf176d675',
    slug: 'industrial-manufacturing',
    name: 'Industrial & manufacturing',
    sort_order: 7,
    cap: 38,
  },
  {
    id: 'd3ad5948-720d-40bb-9f43-280ddbf9c77f',
    slug: 'transport-logistics',
    name: 'Transport & logistics',
    sort_order: 8,
    cap: 38,
  },
  {
    id: 'd9933361-94b7-4aac-826b-c8ec73cb1f6a',
    slug: 'tourism-hospitality',
    name: 'Tourism & hospitality',
    sort_order: 9,
    cap: 38,
  },
  {
    id: 'd3e571ad-70b7-42a0-8b40-dc069c010eb0',
    slug: 'media-entertainment',
    name: 'Media & entertainment',
    sort_order: 10,
    cap: 38,
  },
  {
    id: '58334856-c2d4-420c-b64c-bfbb6f247ac1',
    slug: 'professional-services',
    name: 'Professional services (law / audit / consulting)',
    sort_order: 11,
    cap: 39,
  },
  {
    id: 'fc3cd649-5385-4911-afc7-0e2ca5fc87c0',
    slug: 'education-research',
    name: 'Education & research',
    sort_order: 12,
    cap: 38,
  },
  {
    id: '796ea4f8-8110-461d-818a-910536373a5a',
    slug: 'public-sector-vision-2030',
    name: 'Public sector & Vision 2030 programmes / giga-projects',
    sort_order: 13,
    cap: 39,
  },
]

const bySlug = new Map(FALLBACK_SECTORS.map((sector) => [sector.slug, sector]))

export function sectorBySlug(slug: string): Sector | undefined {
  return bySlug.get(slug)
}

export function sectorIndexLabel(sortOrder: number): string {
  return String(sortOrder).padStart(2, '0')
}
