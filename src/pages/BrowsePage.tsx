import { Link, useSearchParams } from 'react-router-dom'
import { Portrait } from '../components/Portrait'
import { Seo } from '../components/Seo'
import { EXAMPLE_LEADERS, GROUPS, SECTOR_BLURBS, type GroupId } from '../content/example'
import { FALLBACK_SECTORS } from '../content/sectors'
import { pageMetaForPath } from '../content/seo'

const FACES = ['dark', 'grey', 'mint', 'pale', 'mid', 'deep', 'green', 'tie']

export function BrowsePage() {
  const [params, setParams] = useSearchParams()
  const group = params.get('group')
  const active = GROUPS.some((item) => item.id === group) ? (group as GroupId) : 'all'
  const sectors =
    active === 'all'
      ? FALLBACK_SECTORS
      : FALLBACK_SECTORS.filter((sector) => GROUPS.find((item) => item.id === active)?.sectors.includes(sector.slug))

  return (
    <>
      <Seo meta={pageMetaForPath('/browse')} />
      <section className="bg-white">
        <div className="mx-auto grid max-w-[1360px] items-end gap-4 px-5 pt-8 pb-8 lg:grid-cols-12 lg:px-10 lg:pt-14 lg:pb-12">
          <div className="lg:col-span-8">
            <p className="text-[15px] leading-5 font-bold tracking-[0.09em] text-g-600 uppercase">Browse</p>
            <h1 className="mt-2 font-serif text-[56px] leading-[52px] lg:text-[104px] lg:leading-[92px]">
              Groups <em className="text-g-600 italic">and</em> sectors
            </h1>
          </div>
          <p className="text-[17px] leading-[26px] text-n-700 lg:col-span-4">
            Start with who they are, or where they work. Every leader sits in one group and one sector.
          </p>
        </div>
      </section>
      <div className="sticky top-0 z-30 border-b border-ink bg-white">
        <div className="mx-auto max-w-[1360px] px-5 py-3 lg:px-10">
          <Link to="/leaderboard" className="mb-3 flex min-h-12 items-center gap-3 border-[1.5px] border-ink px-3 text-[16px] text-n-600 lg:hidden">
            Search leaders, sectors, organisations
          </Link>
          <div className="-mx-5 flex gap-2 overflow-x-auto px-5 lg:mx-0 lg:px-0">
            {[
              ['all', 'All'],
              ['government', 'Government'],
              ['private', 'Private sector'],
              ['family', 'Family office'],
            ].map(([id, label]) => (
              <button
                key={id}
                type="button"
                aria-pressed={active === id}
                onClick={() => (id === 'all' ? setParams({}) : setParams({ group: id }))}
                className={`chip ${active === id ? 'bg-ink text-white' : ''}`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>
      <section className="bg-white">
        <div className="mx-auto max-w-[1360px] px-5 pt-6 pb-12 lg:px-10 lg:pb-16">
          <p className="mb-3 text-[15px] leading-5 font-bold tracking-[0.09em] uppercase">By group</p>
          <div className="grid gap-3 lg:grid-cols-12">
            {GROUPS.filter((item) => active === 'all' || item.id === active).map((item) => {
              const tone =
                item.id === 'government'
                  ? 'bg-ink text-white'
                  : item.id === 'private'
                    ? 'border-[1.5px] border-ink bg-white text-ink'
                    : 'bg-g-600 text-white'
              const label = item.id === 'private' ? 'text-g-600' : item.id === 'government' ? 'text-g-300' : 'text-g-200'
              const btn = item.id === 'government' ? 'bg-g-400 text-ink' : item.id === 'private' ? 'bg-g-600 text-white' : 'bg-white text-ink'
              const span = item.id === 'government' ? 'lg:col-span-5' : item.id === 'private' ? 'lg:col-span-4' : 'lg:col-span-3'
              return (
                <Link key={item.id} to={`/leaderboard?group=${item.id}`} className={`${tone} ${span} flex min-h-[300px] flex-col justify-between p-6 lg:min-h-[460px] lg:p-8`}>
                  <div>
                    <p className={`text-[15px] leading-5 font-bold tracking-[0.09em] uppercase ${label}`}>
                      Group {String(GROUPS.findIndex((group) => group.id === item.id) + 1).padStart(2, '0')}
                    </p>
                    <h2 className="mt-2 font-serif text-[56px] leading-[52px] lg:text-[84px] lg:leading-[76px]">{item.name}</h2>
                    <p className={`mt-3 max-w-[360px] text-[17px] leading-[26px] ${label}`}>{item.blurb}</p>
                  </div>
                  <div className="mt-8 flex flex-wrap items-end justify-between gap-4">
                    <div className="flex -space-x-3">
                      {FACES.slice(0, 3).map((face) => (
                        <div key={face} className={`h-14 w-14 overflow-hidden border-2 lg:h-20 lg:w-20 ${item.id === 'private' ? 'border-ink' : 'border-white'}`}>
                          <Portrait variant={face} className="h-full w-full" />
                        </div>
                      ))}
                    </div>
                    <span className={`btn-pill ${btn}`}>View ranking</span>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>
      <section className="border-t border-ink bg-white">
        <div className="mx-auto max-w-[1360px] px-5 py-10 lg:px-10 lg:py-16">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-[15px] leading-5 font-bold tracking-[0.09em] text-g-600 uppercase">By sector</p>
              <h2 className="mt-2 font-serif text-[44px] leading-none lg:text-[72px] lg:leading-[68px]">Thirteen sectors</h2>
            </div>
            <p className="hidden text-[15px] text-n-600 lg:block">Each sector lists leaders from all three groups.</p>
          </div>
          <div className="mt-6 border-t border-ink lg:grid lg:grid-cols-2 lg:gap-x-14">
            {sectors.map((sector) => (
              <Link key={sector.slug} to={`/leaderboard?sector=${sector.slug}`} className="flex items-center gap-4 border-b border-ink py-4">
                <span className="w-14 shrink-0 font-serif text-[40px] leading-10 text-g-600">
                  {String(sector.sort_order).padStart(2, '0')}
                </span>
                <div className="min-w-0 flex-1">
                  <h3 className="font-serif text-[28px] leading-[30px]">{sector.name.replace(' & ', ' and ')}</h3>
                  <p className="mt-0.5 text-[15px] leading-[22px] text-n-600">{SECTOR_BLURBS[sector.slug]}</p>
                  {sector.slug === 'banking-financial-services' ? (
                    <div className="mt-3 inline-flex min-h-11 flex-wrap items-center gap-x-3 gap-y-1 border border-ink px-3 py-1.5">
                      <span className="text-[15px] font-semibold">Presented by</span>
                      <span className="border border-dashed border-current px-2 py-0.5 text-[15px] font-bold tracking-wide">[Example Partner]</span>
                    </div>
                  ) : null}
                </div>
                <div className="hidden -space-x-2 sm:flex">
                  {EXAMPLE_LEADERS.filter((leader) => leader.sectorSlug === sector.slug)
                    .slice(0, 3)
                    .map((leader) => (
                      <div key={leader.slug} className="h-9 w-9 overflow-hidden border-2 border-white">
                        <Portrait variant={leader.portrait} className="h-full w-full" />
                      </div>
                    ))}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-ink text-white">
        <div className="mx-auto flex max-w-[1360px] flex-col justify-between gap-5 px-5 py-10 lg:flex-row lg:items-center lg:px-10 lg:py-12">
          <div>
            <p className="text-[15px] leading-5 font-bold tracking-[0.09em] text-g-400 uppercase">Not on the list?</p>
            <p className="mt-1 font-serif text-[40px] leading-10 lg:text-[52px] lg:leading-[50px]">Anyone can nominate a leader.</p>
          </div>
          <Link to="/nominate" className="btn-pill bg-g-400 text-ink">
            Nominate a leader
          </Link>
        </div>
      </section>
    </>
  )
}
