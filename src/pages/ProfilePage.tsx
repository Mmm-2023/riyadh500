import { Link, useParams } from 'react-router-dom'
import { NewsletterForm } from '../components/NewsletterForm'
import { Portrait } from '../components/Portrait'
import { Seo } from '../components/Seo'
import { EXAMPLE_LEADERS, GROUPS, sectorBySlug, leaderBySlug } from '../content/example'
import { pageMetaForPath, profileMeta } from '../content/seo'
import { useSession } from '../state/session'

export function ProfilePage() {
  const { slug = '' } = useParams()
  const leader = leaderBySlug(slug)
  const session = useSession()
  if (!leader) {
    return (
      <>
        <Seo meta={pageMetaForPath('/leaderboard')} />
        <div className="mx-auto max-w-3xl px-5 py-16">
          <h1 className="font-serif text-5xl">Profile not found.</h1>
          <Link to="/leaderboard" className="btn-pill mt-6 bg-ink text-white">
            Back to the list
          </Link>
        </div>
      </>
    )
  }
  const sector = sectorBySlug(leader.sectorSlug)
  const group = GROUPS.find((item) => item.id === leader.group)?.name
  const voted = Boolean(leader.sampleVoted) || session.voted.has(leader.slug)
  const others = EXAMPLE_LEADERS.filter((item) => item.slug !== leader.slug).slice(0, 4)

  return (
    <>
      <Seo meta={profileMeta(leader)} />
      <div className="flex h-14 items-center justify-between border-b border-ink bg-white px-2 lg:hidden">
        <Link to="/leaderboard" className="flex h-11 w-11 items-center justify-center" aria-label="Back">
          Back
        </Link>
        <span className="text-[15px] font-bold tracking-[0.09em] uppercase">Profile</span>
        <span className="flex h-11 w-11 items-center justify-center" aria-hidden="true" />
      </div>
      <section className="bg-white">
        <div className="mx-auto grid max-w-[1360px] gap-0 px-5 pb-12 lg:grid-cols-12 lg:gap-14 lg:px-10 lg:pt-4">
          <div className="-mx-5 lg:col-span-5 lg:mx-0">
            <div className="relative">
              <Portrait variant={leader.portrait} className="aspect-[4/5] w-full bg-n-200" />
              <span className="absolute bottom-0 left-0 bg-ink px-2 py-1 text-[15px] leading-5 font-semibold text-white">Placeholder portrait</span>
              <span className="absolute top-0 left-0 bg-g-400 px-4 py-2 font-serif text-[64px] leading-none text-ink">01</span>
            </div>
            <div className="mt-3 hidden bg-g-600 p-6 text-white lg:block">
              <p className="text-[15px] leading-5 font-bold tracking-[0.09em] text-g-200 uppercase">Follow</p>
              <p className="mt-1 font-serif text-[32px] leading-8">Get news on {leader.name} in the weekly.</p>
              <div className="mt-4">
                <NewsletterForm id="profile-follow" bare />
              </div>
            </div>
          </div>
          <div className="lg:col-span-7">
            <div className="pt-5 lg:pt-6">
              <p className="hidden min-h-11 items-center gap-2 text-[15px] text-n-600 lg:inline-flex">
                <Link to="/browse">Browse</Link>
                <span>/</span>
                <Link to={`/leaderboard?sector=${leader.sectorSlug}`}>{sector?.name.replace(' & ', ' and ')}</Link>
                <span>/</span>
                <b className="text-ink">{leader.name}</b>
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="inline-flex min-h-7 items-center border border-ink px-2.5 text-[15px] font-bold">{group}</span>
                <span className="inline-flex min-h-7 items-center border border-ink px-2.5 text-[15px] font-bold">{sector?.name.replace(' & ', ' and ')}</span>
              </div>
              <p className="sr-only">Example profile</p>
              <h1 className="mt-3 font-serif text-[50px] leading-[50px] lg:text-[88px] lg:leading-[80px]">{leader.name}</h1>
              <p className="mt-2 text-[19px] leading-7 text-n-700">
                {leader.role}, {leader.organisation}
              </p>
              <div className="mt-5 grid grid-cols-3 gap-3 border-y border-ink">
                <div className="py-3">
                  <p className="font-serif text-[40px] leading-10">#1</p>
                  <p className="mt-1 text-[15px] leading-5 text-n-600">in {sector?.name.replace(' & ', ' and ')}</p>
                </div>
                <div className="py-3">
                  <p className="font-serif text-[40px] leading-10">{leader.votes.toLocaleString('en-GB')}</p>
                  <p className="mt-1 text-[15px] leading-5 text-n-600">votes (example)</p>
                </div>
                <div className="py-3">
                  <p className="font-serif text-[40px] leading-10">#4</p>
                  <p className="mt-1 text-[15px] leading-5 text-n-600">overall (example)</p>
                </div>
              </div>
              <div className="mt-6 hidden bg-ink p-6 text-white lg:block">
                <div className="flex items-center justify-between gap-4">
                  <p className="text-[32px] leading-8 font-bold">
                    {leader.votes.toLocaleString('en-GB')}
                    <span className="mt-1 block text-[15px] leading-5 font-normal text-white/75">votes (example)</span>
                  </p>
                  <button
                    type="button"
                    className={`vote-pill min-h-[52px] px-8 text-[17px] ${voted ? 'border-2 border-g-600 bg-g-100 text-g-700' : 'bg-g-400 text-ink'}`}
                    onClick={() => (voted ? undefined : session.openVote(leader.slug))}
                    disabled={voted}
                  >
                    {voted ? 'Voted' : `Vote for ${leader.name}`}
                  </button>
                </div>
                <p className="mt-3 text-[15px] leading-[22px] text-white/80">Your first vote asks for a quick verification.</p>
              </div>
              <div className="mt-6 lg:hidden">
                <button
                  type="button"
                  className={`vote-pill w-full ${voted ? 'border-2 border-g-600 bg-g-100 text-g-700' : 'bg-g-600 text-white'}`}
                  onClick={() => (voted ? undefined : session.openVote(leader.slug))}
                  disabled={voted}
                >
                  {voted ? 'Voted' : `Vote for ${leader.name}`}
                </button>
              </div>
              <section className="mt-6 border-t border-ink py-8">
                <p className="text-[15px] leading-5 font-bold tracking-[0.09em] text-g-600 uppercase">About</p>
                <p className="mt-3 max-w-[620px] text-[18px] leading-7">
                  Example biography text. This paragraph stands in for a short, sourced summary of the leader, their current role and what they are known for. It will be written and fact checked before publication.
                </p>
              </section>
              <section className="border-t border-ink py-8">
                <p className="text-[15px] leading-5 font-bold tracking-[0.09em] text-g-600 uppercase">Career</p>
                <div className="mt-3 border-t border-ink">
                  {[
                    ['2021 to present', `${leader.role}, ${leader.organisation}`],
                    ['2016 to 2021', `Deputy role, ${leader.organisation}`],
                    ['2010 to 2016', 'Head of Strategy, Example Group Z'],
                  ].map(([when, what]) => (
                    <div key={when} className="flex gap-4 border-b border-ink py-4">
                      <span className="w-[120px] shrink-0 text-[15px] font-bold text-g-600">{when}</span>
                      <span className="text-[16px] leading-6">{what}</span>
                    </div>
                  ))}
                </div>
              </section>
              <section className="border-t border-ink py-8">
                <p className="text-[15px] leading-5 font-bold tracking-[0.09em] text-g-600 uppercase">Sources</p>
                <div className="mt-2">
                  {['Example source one, company page', 'Example source two, public filing', 'Example source three, interview'].map((source) => (
                    <p key={source} className="flex min-h-[52px] items-center border-b border-ink text-[17px] font-semibold">
                      {source}
                    </p>
                  ))}
                </div>
              </section>
              <section className="border-t border-ink py-8">
                <p className="text-[15px] leading-5 font-bold tracking-[0.09em] text-g-600 uppercase">In the news</p>
                <article className="mt-2 border-t border-ink py-5">
                  <p className="text-[15px] font-bold tracking-[0.09em] text-g-600 uppercase">Leader digest</p>
                  <h3 className="mt-1 font-serif text-[26px] leading-7">Example headline: this week on {leader.name}, in four points</h3>
                  <p className="mt-2 text-[15px] text-n-500">Example item, 26 Oct 2026 (example date)</p>
                </article>
              </section>
              <Link to="/nominate" className="inline-flex min-h-11 items-center text-[16px] font-semibold underline underline-offset-4">
                Suggest a correction
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section className="border-t border-ink bg-n-100">
        <div className="mx-auto max-w-[1360px] px-5 py-10 lg:px-10 lg:py-14">
          <p className="text-[15px] leading-5 font-bold tracking-[0.09em] text-g-600 uppercase">Also in this sector</p>
          <h2 className="mt-2 font-serif text-[40px] leading-10 lg:text-[56px] lg:leading-[54px]">Keep browsing</h2>
          <div className="-mx-5 mt-5 flex snap-x gap-3 overflow-x-auto px-5 lg:mx-0 lg:px-0">
            {others.map((item, index) => (
              <article key={item.slug} className="w-[240px] shrink-0 snap-start border border-ink bg-white lg:w-auto lg:flex-1">
                <div className="relative">
                  <Portrait variant={item.portrait} className="aspect-[4/5] w-full" />
                  <span className="absolute top-0 left-0 border-r border-b border-ink bg-white px-3 py-2 font-serif text-[34px] leading-none">
                    {String(index + 2).padStart(2, '0')}
                  </span>
                </div>
                <div className="p-4">
                  <h3 className="font-serif text-[28px] leading-[30px]">
                    <Link to={`/leaders/${item.slug}`}>{item.name}</Link>
                  </h3>
                  <p className="mt-1 text-[15px] text-n-600">
                    {item.role}, {item.organisation}
                  </p>
                  <p className="mt-3 text-[20px] font-bold">
                    {item.votes.toLocaleString('en-GB')} <span className="text-[15px] font-normal text-n-500">votes (example)</span>
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
