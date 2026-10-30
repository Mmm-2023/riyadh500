import { useMemo } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Seo } from '../components/Seo'
import { Silhouette } from '../components/Silhouette'
import {
  EXAMPLE_LEADERS,
  EXAMPLE_NOTE,
  PARTNER_LINE,
  RANK_LINE,
  leadersInSector,
  sectorBySlug,
} from '../content/example'
import { FALLBACK_SECTORS } from '../content/sectors'
import { pageMetaForPath } from '../content/seo'
import { useSession } from '../state/session'

export function LeaderboardPage() {
  const [params, setParams] = useSearchParams()
  const sectorSlug = params.get('sector') ?? 'banking-financial-services'
  const sector = sectorBySlug(sectorSlug) ?? sectorBySlug('banking-financial-services')
  const session = useSession()
  const rows = useMemo(() => {
    const list = sector ? leadersInSector(sector.slug) : EXAMPLE_LEADERS
    return list.length > 0 ? list : EXAMPLE_LEADERS
  }, [sector])

  return (
    <>
      <Seo meta={pageMetaForPath('/leaderboard')} />
      <div className="mx-auto max-w-6xl px-4 py-10 md:px-6">
        <p className="text-[15px] tracking-[0.14em] text-green uppercase">Leaderboard</p>
        <h1 className="mt-2 font-serif text-5xl text-balance">{sector?.name ?? 'Leaderboard'}</h1>
        <p className="mt-3 max-w-2xl text-[16px] text-muted">
          Example ranks for this sector. {EXAMPLE_NOTE} {RANK_LINE}
        </p>
        <p className="mt-2 text-[15px]">{PARTNER_LINE}</p>

        <div className="sticky top-14 z-30 -mx-4 mt-6 flex gap-2 overflow-x-auto border-y border-line bg-paper px-4 py-3 md:top-16">
          {FALLBACK_SECTORS.map((item) => (
            <button
              key={item.slug}
              type="button"
              aria-pressed={item.slug === sector?.slug}
              onClick={() => setParams({ sector: item.slug })}
              className={`min-h-11 shrink-0 rounded-full px-4 text-[15px] ${
                item.slug === sector?.slug ? 'bg-ink text-paper' : 'border border-line'
              }`}
            >
              {item.name}
            </button>
          ))}
        </div>

        <div className="mt-8 grid grid-cols-3 items-end gap-3">
          {rows.slice(0, 3).map((leader, index) => (
            <Link key={leader.slug} to={`/leaders/${leader.slug}`} className={index === 0 ? 'order-2' : index === 1 ? 'order-1' : 'order-3'}>
              <Silhouette tone={leader.tone} className={`w-full ${index === 0 ? 'h-40' : 'h-28'}`} />
              <p className="mt-2 font-serif text-xl">{index + 1}</p>
              <p className="text-[15px]">{leader.name}</p>
            </Link>
          ))}
        </div>

        <ol className="mt-8 divide-y divide-line border-y border-line">
          {rows.map((leader, index) => {
            const voted = session.voted.has(leader.slug)
            return (
              <li key={leader.slug} className="grid grid-cols-[auto_1fr_auto] items-center gap-3 py-4">
                <span className="tabular font-serif text-2xl">{index + 1}</span>
                <div>
                  <Link to={`/leaders/${leader.slug}`} className="font-serif text-2xl">
                    {leader.name}
                  </Link>
                  <p className="text-[15px] text-muted">
                    {leader.role}, {leader.organisation}
                  </p>
                  <p className="text-[15px] text-green">Example</p>
                </div>
                <div className="text-right">
                  <p className="tabular text-[15px]">{(leader.votes + (voted ? 1 : 0)).toLocaleString('en-GB')}</p>
                  <button
                    type="button"
                    className={`mt-2 min-h-11 px-4 text-[15px] font-semibold ${voted ? 'bg-green-soft text-green' : 'bg-green text-paper'}`}
                    onClick={() => (voted ? void session.undo(leader.slug) : session.openVote(leader.slug))}
                  >
                    {voted ? 'Voted' : 'Vote'}
                  </button>
                </div>
              </li>
            )
          })}
        </ol>

      </div>
    </>
  )
}
