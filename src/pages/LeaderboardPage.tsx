import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Footer } from '../components/Footer'
import { LeaderList } from '../components/LeaderList'
import { Nav } from '../components/Nav'
import { Seo } from '../components/Seo'
import { DisplayHeading, Eyebrow } from '../components/Type'
import { pageMetaForPath } from '../content/seo'
import { fetchPublishedLeaders, type LeaderCard } from '../lib/data'

export function LeaderboardPage() {
  const [leaders, setLeaders] = useState<LeaderCard[]>([])
  const [error, setError] = useState(false)

  useEffect(() => {
    let cancelled = false
    fetchPublishedLeaders().then((result) => {
      if (cancelled) return
      setLeaders(result.leaders)
      setError(result.error)
    })
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <>
      <Seo meta={pageMetaForPath('/leaderboard')} />
      <Nav />
      <main id="main" className="mx-auto max-w-7xl px-5 pt-28 pb-20 md:px-10 md:pt-36 md:pb-28">
        <Eyebrow>Overall</Eyebrow>
        <DisplayHeading as="h1">Leaderboard</DisplayHeading>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink/70">
          Published leaders from all 13 sectors, ordered by vote volume. Sector boards keep their
          own caps, near 38 to 39 places each.
        </p>
        <div className="mt-12">
          <LeaderList leaders={leaders} error={error} showSector />
        </div>
        <p className="mt-8">
          <Link to="/sectors" className="text-sm font-semibold tracking-[0.08em] text-gold uppercase">
            Browse sectors
          </Link>
        </p>
      </main>
      <Footer />
    </>
  )
}
