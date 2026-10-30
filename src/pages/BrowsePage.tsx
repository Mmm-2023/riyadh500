import { useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Seo } from '../components/Seo'
import { Silhouette } from '../components/Silhouette'
import {
  EXAMPLE_LEADERS,
  GROUPS,
  EXAMPLE_NOTE,
  groupForSector,
  type GroupId,
} from '../content/example'
import { FALLBACK_SECTORS } from '../content/sectors'
import { pageMetaForPath } from '../content/seo'

export function BrowsePage() {
  const [params, setParams] = useSearchParams()
  const group = params.get('group')
  const active = GROUPS.some((item) => item.id === group) ? (group as GroupId) : 'all'
  const [query, setQuery] = useState('')

  const sectors = useMemo(() => {
    const allowed =
      active === 'all' ? null : new Set(GROUPS.find((item) => item.id === active)?.sectors ?? [])
    return FALLBACK_SECTORS.filter((sector) => {
      if (allowed && !allowed.has(sector.slug)) return false
      if (!query.trim()) return true
      return sector.name.toLowerCase().includes(query.trim().toLowerCase())
    })
  }, [active, query])

  function setGroup(next: string) {
    if (next === 'all') setParams({})
    else setParams({ group: next })
  }

  return (
    <>
      <Seo meta={pageMetaForPath('/browse')} />
      <div className="mx-auto max-w-6xl px-4 py-10 md:px-6">
        <p className="text-[15px] tracking-[0.14em] text-green uppercase">Browse</p>
        <h1 className="mt-2 font-serif text-5xl text-balance">By group and sector.</h1>
        <p className="mt-3 max-w-2xl text-[16px] text-muted">
          Government, the private sector and family offices sit above the 13 sectors. {EXAMPLE_NOTE}
        </p>

        <div className="sticky top-14 z-30 -mx-4 mt-6 border-y border-line bg-paper px-4 py-3 md:top-16">
          <label className="sr-only" htmlFor="browse-search">
            Filter sectors
          </label>
          <input
            id="browse-search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search sectors"
            className="min-h-11 w-full border border-line px-3 text-base"
          />
          <div className="mt-3 flex gap-2 overflow-x-auto">
            {[{ id: 'all', name: 'All' }, ...GROUPS].map((item) => (
              <button
                key={item.id}
                type="button"
                aria-pressed={active === item.id}
                onClick={() => setGroup(item.id)}
                className={`min-h-11 shrink-0 rounded-full px-4 text-[15px] ${
                  active === item.id ? 'bg-ink text-paper' : 'border border-line'
                }`}
              >
                {item.name}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {GROUPS.filter((item) => active === 'all' || item.id === active).map((item) => (
            <article key={item.id} className="bg-ink p-5 text-paper">
              <h2 className="font-serif text-3xl">{item.name}</h2>
              <p className="mt-2 text-[15px] text-paper/80">{item.blurb}</p>
              <div className="mt-4 flex gap-2">
                {EXAMPLE_LEADERS.filter((leader) => leader.group === item.id)
                  .slice(0, 3)
                  .map((leader) => (
                    <Silhouette key={leader.slug} tone={leader.tone} className="h-16 w-12" />
                  ))}
              </div>
            </article>
          ))}
        </div>

        <ol className="mt-10 divide-y divide-line border-y border-line">
          {sectors.map((sector) => {
            const count = EXAMPLE_LEADERS.filter((leader) => leader.sectorSlug === sector.slug).length
            const groupName = groupForSector(sector.slug)?.name
            return (
              <li key={sector.slug}>
                <Link to={`/leaderboard?sector=${sector.slug}`} className="flex min-h-16 items-center justify-between gap-4 py-3">
                  <span>
                    <span className="block font-serif text-2xl">{sector.name}</span>
                    <span className="text-[15px] text-muted">
                      {groupName} · up to {sector.cap} places · {count} example {count === 1 ? 'profile' : 'profiles'}
                    </span>
                  </span>
                  <span aria-hidden="true">→</span>
                </Link>
              </li>
            )
          })}
        </ol>
      </div>
    </>
  )
}
