import { useEffect, useState } from 'react'
import { Footer } from '../components/Footer'
import { Nav } from '../components/Nav'
import { SectorCard } from '../components/SectorCard'
import { Seo } from '../components/Seo'
import { DisplayHeading, Eyebrow } from '../components/Type'
import { FALLBACK_SECTORS, type Sector } from '../content/sectors'
import { pageMetaForPath } from '../content/seo'
import { fetchSectors } from '../lib/data'

export function SectorsPage() {
  const [sectors, setSectors] = useState<Sector[]>(FALLBACK_SECTORS)

  useEffect(() => {
    let cancelled = false
    fetchSectors().then((rows) => {
      if (!cancelled) setSectors(rows)
    })
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <>
      <Seo meta={pageMetaForPath('/sectors')} />
      <Nav />
      <main id="main" className="mx-auto max-w-7xl px-5 pt-28 pb-20 md:px-10 md:pt-36 md:pb-28">
        <Eyebrow>Index</Eyebrow>
        <DisplayHeading as="h1">All 13 sectors.</DisplayHeading>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink/70">
          Each sector is a ranked slice of Riyadh 500. Caps sit near 38 to 39 places so the full
          list stays at 500. Open a sector to see its board.
        </p>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sectors.map((sector) => (
            <SectorCard key={sector.id} sector={sector} />
          ))}
        </div>
      </main>
      <Footer />
    </>
  )
}
