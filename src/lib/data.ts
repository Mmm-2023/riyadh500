import { FALLBACK_SECTORS, type Sector } from '../content/sectors'
import { supabase } from './supabase'

export type LeaderCard = {
  id: string
  name: string
  headline_role: string | null
  company: string | null
  photo_url: string | null
  vote_count: number
  sector_id: string
  sector_name: string | null
  sector_slug: string | null
}

type SectorEmbed = { name: string; slug: string }

export async function fetchSectors(): Promise<Sector[]> {
  try {
    const { data, error } = await supabase
      .from('sectors')
      .select('id, slug, name, sort_order, cap')
      .order('sort_order', { ascending: true })

    if (error || !data || data.length === 0) return FALLBACK_SECTORS
    return data
  } catch {
    return FALLBACK_SECTORS
  }
}

export async function fetchPublishedLeaders(
  sectorId?: string,
): Promise<{ leaders: LeaderCard[]; error: boolean }> {
  try {
    let query = supabase
      .from('leaders')
      .select(
        'id, name, headline_role, company, photo_url, vote_count, sector_id, sectors(name, slug)',
      )
      .eq('published', true)

    if (sectorId) query = query.eq('sector_id', sectorId)

    const { data, error } = await query.order('vote_count', { ascending: false })
    if (error) return { leaders: [], error: true }

    const leaders = (data ?? []).map((row) => {
      const sector = oneSector(row.sectors)
      return {
        id: row.id,
        name: row.name,
        headline_role: row.headline_role,
        company: row.company,
        photo_url: row.photo_url,
        vote_count: row.vote_count,
        sector_id: row.sector_id,
        sector_name: sector?.name ?? null,
        sector_slug: sector?.slug ?? null,
      }
    })

    return { leaders, error: false }
  } catch {
    return { leaders: [], error: true }
  }
}

function oneSector(
  value: SectorEmbed | SectorEmbed[] | null,
): SectorEmbed | null {
  if (!value) return null
  return Array.isArray(value) ? (value[0] ?? null) : value
}
