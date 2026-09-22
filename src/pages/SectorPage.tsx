import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Footer } from '../components/Footer'
import { LeaderList } from '../components/LeaderList'
import { Nav } from '../components/Nav'
import { Seo } from '../components/Seo'
import { DisplayHeading, Eyebrow } from '../components/Type'
import { sectorBySlug, sectorIndexLabel, type Sector } from '../content/sectors'
import { pageMetaForPath, sectorPageMeta } from '../content/seo'
import { fetchPublishedLeaders, fetchSectors, type LeaderCard } from '../lib/data'

type SectorLoad = {
  slug: string
  sector: Sector | null
  leaders: LeaderCard[]
  error: boolean
}

export function SectorPage() {
  const { slug = '' } = useParams()
  const known = sectorBySlug(slug) ?? null
  const [remote, setRemote] = useState<SectorLoad | null>(null)

  useEffect(() => {
    let cancelled = false
    const local = sectorBySlug(slug) ?? null
    const leadersRequest = local ? fetchPublishedLeaders(local.id) : Promise.resolve(null)

    Promise.all([fetchSectors(), leadersRequest]).then(async ([rows, firstLeaders]) => {
      if (cancelled) return
      const live = rows.find((row) => row.slug === slug) ?? null
      const resolved = live ?? local
      if (!resolved) {
        setRemote({ slug, sector: null, leaders: [], error: false })
        return
      }

      const needsRefetch = !firstLeaders || (live !== null && local !== null && live.id !== local.id)
      const loaded = needsRefetch ? await fetchPublishedLeaders(resolved.id) : firstLeaders
      if (cancelled || !loaded) return
      setRemote({
        slug,
        sector: resolved,
        leaders: loaded.leaders,
        error: loaded.error,
      })
    })

    return () => {
      cancelled = true
    }
  }, [slug])

  const live = remote?.slug === slug ? remote : null
  const sector = live?.sector ?? known
  const missing = live ? live.sector === null : known === null
  const leaders = live?.leaders ?? []
  const error = live?.error ?? false
  const meta = sector ? sectorPageMeta(sector) : pageMetaForPath('/sectors')

  return (
    <>
      <Seo meta={missing ? pageMetaForPath('/sectors') : meta} />
      <Nav />
      <main id="main" className="mx-auto max-w-7xl px-5 pt-28 pb-20 md:px-10 md:pt-36 md:pb-28">
        {missing || !sector ? (
          <MissingSector />
        ) : (
          <>
            <Eyebrow>Sector {sectorIndexLabel(sector.sort_order)}</Eyebrow>
            <DisplayHeading as="h1">{sector.name}</DisplayHeading>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink/70">
              Up to {sector.cap} places in this sector. Caps sit near 38 to 39 so the full list
              stays at 500. Rank will follow vote volume once profiles are published.
            </p>
            <div className="mt-12">
              <LeaderList leaders={leaders} error={error} />
            </div>
            <p className="mt-8">
              <Link to="/sectors" className="text-sm font-semibold tracking-[0.08em] text-gold uppercase">
                All sectors
              </Link>
            </p>
          </>
        )}
      </main>
      <Footer />
    </>
  )
}

function MissingSector() {
  return (
    <>
      <Eyebrow>Sectors</Eyebrow>
      <DisplayHeading as="h1">Sector not found.</DisplayHeading>
      <p className="mt-5 max-w-xl text-lg text-ink/70">
        That address is not one of the 13 sectors on Riyadh 500.
      </p>
      <p className="mt-8">
        <Link
          to="/sectors"
          className="inline-flex bg-ink px-6 py-3 text-sm font-semibold tracking-[0.08em] text-pearl uppercase"
        >
          Back to sectors
        </Link>
      </p>
    </>
  )
}
