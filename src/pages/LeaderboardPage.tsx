import { useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { NewsletterForm } from '../components/NewsletterForm'
import { Portrait } from '../components/Portrait'
import { Seo } from '../components/Seo'
import { EXAMPLE_LEADERS, GROUPS, SECTOR_BLURBS, sectorBySlug, type ExampleLeader, type GroupId } from '../content/example'
import { pageMetaForPath } from '../content/seo'
import { useSession } from '../state/session'

export function LeaderboardPage() {
  const [params, setParams] = useSearchParams()
  const sectorSlug = params.get('sector') ?? 'banking-financial-services'
  const sector = sectorBySlug(sectorSlug)
  const group = params.get('group')
  const [sort, setSort] = useState<'votes' | 'week'>('votes')

  const rows = useMemo(() => {
    const pool =
      sectorSlug === 'banking-financial-services' && !group
        ? EXAMPLE_LEADERS
        : EXAMPLE_LEADERS.filter((leader) => leader.sectorSlug === sectorSlug || (group ? leader.group === group : false))
    const list = (pool.length > 0 ? pool : EXAMPLE_LEADERS).filter((leader) => (group ? leader.group === (group as GroupId) : true))
    return [...list].sort((a, b) => (sort === 'votes' ? b.votes - a.votes : a.name.localeCompare(b.name)))
  }, [group, sectorSlug, sort])

  const title = sector?.name.replace(' & ', ' and ') ?? 'Banking and financial services'
  const [first, ...rest] = rows

  return (
    <>
      <Seo meta={pageMetaForPath('/leaderboard')} />
      <section className="bg-white">
        <div className="mx-auto max-w-[1360px] px-5 pt-6 pb-6 lg:px-10 lg:pt-12 lg:pb-10">
          <p className="inline-flex min-h-11 items-center gap-2 text-[15px] text-n-600">
            <Link to="/browse">Browse</Link>
            <span aria-hidden="true">/</span>
            <Link to="/browse">Sectors</Link>
            <span aria-hidden="true">/</span>
            <b className="text-ink">{title}</b>
          </p>
          <div className="mt-2 grid items-end gap-4 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-8">
              <p className="text-[15px] leading-5 font-bold tracking-[0.09em] text-g-600 uppercase">
                Sector {String(sector?.sort_order ?? 2).padStart(2, '0')} of 13
              </p>
              <h1 className="mt-2 font-serif text-[56px] leading-[52px] lg:text-[104px] lg:leading-[92px]">
                {title.split(' ').slice(0, -1).join(' ')} <em className="text-g-600 italic">{title.split(' ').slice(-1)}</em>
              </h1>
            </div>
            <div className="lg:col-span-4 lg:text-right">
              <p className="text-[16px] text-n-700">{SECTOR_BLURBS[sectorSlug] ?? SECTOR_BLURBS['banking-financial-services']}</p>
              <div className="mt-3 inline-flex min-h-11 flex-wrap items-center gap-x-3 gap-y-1 border border-ink px-3 py-1.5">
                <span className="text-[15px] font-semibold">Sector presented by</span>
                <span className="border border-dashed border-current px-2 py-0.5 text-[15px] font-bold tracking-wide">[Example Partner]</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="sticky top-0 z-30 border-b border-ink bg-white">
        <div className="mx-auto max-w-[1360px] px-5 py-3 lg:px-10">
          <p className="mb-3 flex min-h-12 items-center border-[1.5px] border-ink px-3 text-[16px] text-n-600 lg:hidden">Search this sector</p>
          <div className="-mx-5 flex gap-2 overflow-x-auto px-5 lg:mx-0 lg:px-0">
            {[
              ['', 'All groups'],
              ['government', 'Government'],
              ['private', 'Private sector'],
              ['family', 'Family office'],
            ].map(([id, label]) => (
              <button
                key={label}
                type="button"
                aria-pressed={(group ?? '') === id}
                onClick={() => {
                  const next = new URLSearchParams(params)
                  if (id) next.set('group', id)
                  else next.delete('group')
                  setParams(next)
                }}
                className={`chip ${(group ?? '') === id ? 'bg-ink text-white' : ''}`}
              >
                {label}
              </button>
            ))}
            <button type="button" className={`chip ${sort === 'week' ? 'bg-ink text-white' : ''}`} onClick={() => setSort('week')}>
              This week
            </button>
            <button type="button" className={`chip ${sort === 'votes' ? 'bg-ink text-white' : ''}`} onClick={() => setSort('votes')}>
              Most votes
            </button>
          </div>
        </div>
      </div>
      <section className="bg-white">
        <div className="mx-auto max-w-[1360px] px-5 py-6 lg:px-10 lg:py-10">
          <div className="mb-4 flex items-center justify-between gap-3">
            <p className="text-[15px] text-n-600">{rows.length} shown. Votes and names are example data.</p>
          </div>
          <div className="mb-4 flex flex-wrap items-center gap-3 text-[15px] text-n-700">
            <span className="inline-flex items-center gap-2">
              <span className="inline-block h-3 w-3 bg-g-600" />
              Voted
            </span>
            <span>Portraits are placeholders.</span>
          </div>
          {first ? (
            <div className="grid grid-cols-2 items-end gap-3 lg:grid-cols-12">
              <Featured leader={first} />
              {rest.slice(0, 8).map((leader, index) => (
                <RankCard key={leader.slug} leader={leader} rank={index + 2} />
              ))}
            </div>
          ) : (
            <p className="text-[16px]">No example profiles in this filter.</p>
          )}
        </div>
      </section>
      <section className="bg-g-600 text-white">
        <div className="mx-auto grid max-w-[1360px] items-center gap-5 px-5 py-8 lg:grid-cols-2 lg:px-10">
          <div>
            <p className="text-[15px] leading-5 font-bold tracking-[0.09em] text-g-200 uppercase">Newsletter</p>
            <p className="mt-1 font-serif text-4xl">The Riyadh 500 weekly</p>
          </div>
          <NewsletterForm id="board-news" bare />
        </div>
      </section>
      <p className="sr-only">{GROUPS.map((item) => item.name).join(', ')}</p>
    </>
  )
}

function Featured({ leader }: { leader: ExampleLeader }) {
  const session = useSession()
  const voted = Boolean(leader.sampleVoted) || session.voted.has(leader.slug)
  const group = GROUPS.find((item) => item.id === leader.group)?.name
  return (
    <article className="col-span-2 bg-ink text-white lg:order-2 lg:col-span-5">
      <div className="relative">
        <Portrait variant={leader.portrait} className="aspect-square w-full bg-n-200" />
        <span className="absolute bottom-0 left-0 bg-ink px-2 py-1 text-[15px] leading-5 font-semibold text-white">Placeholder portrait</span>
        <span className="absolute top-0 left-0 bg-g-400 px-4 py-2 font-serif text-[72px] leading-none text-ink">01</span>
      </div>
      <div className="p-5 lg:p-6">
        <span className="inline-flex min-h-7 items-center border border-white/40 px-2.5 text-[15px] font-bold text-white">{group}</span>
        <h2 className="mt-3 font-serif text-[44px] leading-none lg:text-[56px]">
          <Link to={`/leaders/${leader.slug}`}>{leader.name}</Link>
        </h2>
        <p className="mt-1 text-[16px] text-white/80">
          {leader.role}, {leader.organisation}
        </p>
        <div className="mt-5 flex items-center justify-between gap-3">
          <p className="text-[28px] leading-7 font-bold">
            {leader.votes.toLocaleString('en-GB')}
            <span className="mt-1 block text-[15px] leading-5 font-normal text-white/75">votes (example)</span>
          </p>
          <VoteControl leader={leader} voted={voted} light />
        </div>
      </div>
    </article>
  )
}

function RankCard({ leader, rank }: { leader: ExampleLeader; rank: number }) {
  const session = useSession()
  const voted = Boolean(leader.sampleVoted) || session.voted.has(leader.slug)
  const group = GROUPS.find((item) => item.id === leader.group)?.name
  return (
    <article className="flex flex-col border border-ink bg-white lg:col-span-4">
      <div className="relative">
        <Portrait variant={leader.portrait} className="aspect-[4/5] w-full bg-n-200" />
        <span className="absolute top-0 left-0 border-r border-b border-ink bg-white px-2.5 py-1.5 font-serif text-[30px] leading-none">
          {String(rank).padStart(2, '0')}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-3 lg:p-4">
        <span className="inline-flex min-h-7 w-fit items-center border border-ink px-2.5 text-[15px] font-bold">{group}</span>
        <h3 className="mt-2 font-serif text-2xl leading-[26px] lg:text-[28px] lg:leading-[30px]">
          <Link to={`/leaders/${leader.slug}`}>{leader.name}</Link>
        </h3>
        <p className="mt-1 text-[15px] text-n-600">
          {leader.role}, {leader.organisation}
        </p>
        <div className="mt-3 flex items-center justify-between gap-3">
          <p className="text-[18px] leading-[22px] font-bold">
            {leader.votes.toLocaleString('en-GB')} <span className="text-[15px] font-normal text-n-500">votes (example)</span>
          </p>
          <VoteControl leader={leader} voted={voted} />
        </div>
      </div>
    </article>
  )
}

function VoteControl({ leader, voted, light = false }: { leader: ExampleLeader; voted: boolean; light?: boolean }) {
  const session = useSession()
  if (voted) {
    return (
      <button type="button" className={`vote-pill border-2 border-g-600 bg-g-100 text-g-700 ${light ? '' : ''}`} disabled aria-label={`Voted for ${leader.name}`}>
        Voted
      </button>
    )
  }
  return (
    <button type="button" className="vote-pill bg-g-600 text-white" aria-label={`Vote for ${leader.name}`} onClick={() => session.openVote(leader.slug)}>
      Vote
    </button>
  )
}
