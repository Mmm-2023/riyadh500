import { useState } from 'react'
import { Link } from 'react-router-dom'
import { NewsletterForm } from '../components/NewsletterForm'
import { Portrait } from '../components/Portrait'
import { Seo } from '../components/Seo'
import { EXAMPLE_LEADERS, GROUPS, type ExampleLeader } from '../content/example'
import { pageMetaForPath } from '../content/seo'
import { useSession } from '../state/session'

const HERO = ['dark', 'grey', 'mint', 'pale', 'mid']
const GROUP_FACES: Record<string, string[]> = {
  government: ['dark', 'deep', 'green'],
  private: ['tie', 'grey', 'mint'],
  family: ['night', 'mid', 'dark'],
}
const SECTOR_CHIPS = [
  ['energy-utilities', 'Energy and utilities'],
  ['banking-financial-services', 'Banking and financial services'],
  ['real-estate-construction', 'Real estate and construction'],
  ['healthcare-life-sciences', 'Healthcare and life sciences'],
  ['technology-digital', 'Technology and digital'],
  ['retail-consumer', 'Retail and consumer'],
  ['industrial-manufacturing', 'Industrial and manufacturing'],
  ['transport-logistics', 'Transport and logistics'],
  ['tourism-hospitality', 'Tourism and hospitality'],
  ['media-entertainment', 'Media and entertainment'],
  ['professional-services', 'Professional services'],
  ['education-research', 'Education and research'],
  ['public-sector-vision-2030', 'Public sector and Vision 2030'],
]
const FILTERS = [
  ['all', 'All', '/browse'],
  ['government', 'Government', '/browse?group=government'],
  ['private', 'Private sector', '/browse?group=private'],
  ['family', 'Family office', '/browse?group=family'],
  ['energy', 'Energy', '/leaderboard?sector=energy-utilities'],
  ['banking', 'Banking', '/leaderboard?sector=banking-financial-services'],
  ['real-estate', 'Real estate', '/leaderboard?sector=real-estate-construction'],
  ['healthcare', 'Healthcare', '/leaderboard?sector=healthcare-life-sciences'],
]
const LEADING = EXAMPLE_LEADERS.slice(0, 6)

export function HomePage() {
  const [dot, setDot] = useState(0)

  return (
    <>
      <Seo meta={pageMetaForPath('/')} />
      <section className="bg-white">
        <div className="mx-auto grid max-w-[1360px] items-end gap-8 px-5 pt-8 pb-0 lg:grid-cols-12 lg:gap-12 lg:px-10 lg:pt-16">
          <div className="min-w-0 pb-2 lg:col-span-6 lg:pb-14">
            <p className="text-[15px] leading-5 font-bold tracking-[0.09em] text-g-600 uppercase">The public list</p>
            <h1 className="mt-3 font-serif text-[62px] leading-[56px] tracking-[-0.012em] lg:text-[104px] lg:leading-[92px]">
              The people who lead <em className="text-g-600 italic">Riyadh</em>. Ranked by&nbsp;you.
            </h1>
            <p className="mt-5 max-w-[470px] text-[18px] leading-[27px] text-n-700">
              Leaders in government, the private sector and family offices, across 13 sectors. Vote, nominate and follow the list.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/leaderboard" className="btn-pill bg-g-600 text-white">
                Start voting
              </Link>
              <Link to="/nominate" className="btn-pill border-[1.5px] border-ink">
                Nominate a leader
              </Link>
            </div>
            <p className="mt-5 inline-flex items-center gap-2 text-[15px] leading-[22px]">
              <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-g-600" />
              Voting is open (example state). Closes 11 April 2027 (example date).
            </p>
          </div>
          <div className="lg:col-span-6">
            <div className="-mr-5 flex items-end gap-2 overflow-hidden lg:mr-0">
              {HERO.map((variant, index) => (
                <div key={variant} className={`w-[92px] shrink-0 lg:w-[116px] ${['h-[132px] lg:h-[250px]', 'h-[176px] lg:h-[330px]', 'h-[212px] lg:h-[430px]', 'h-[150px] lg:h-[290px]', 'h-[188px] lg:h-[370px]'][index]}`}>
                  <Portrait variant={variant} className="h-full w-full" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="sticky top-0 z-30 border-b border-ink bg-white">
        <div className="mx-auto max-w-[1360px] px-5 py-3 lg:px-10">
          <Link to="/browse" className="mb-3 flex min-h-12 items-center gap-3 border-[1.5px] border-ink px-3 text-[16px] text-n-600 lg:hidden">
            <SearchGlyph />
            Search leaders, sectors, organisations
          </Link>
          <div className="-mx-5 flex gap-2 overflow-x-auto px-5 lg:mx-0 lg:px-0">
            {FILTERS.map(([id, label, to], index) => (
              <Link key={id} to={to} className={`chip ${index === 0 ? 'bg-ink text-white' : ''}`}>
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <section className="bg-ink text-white">
        <div className="mx-auto max-w-[1360px] px-5 py-12 lg:px-10 lg:py-20">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-[15px] leading-5 font-bold tracking-[0.09em] text-g-400 uppercase">Browse by group</p>
              <h2 className="mt-2 font-serif text-[48px] leading-[46px] lg:text-[80px] lg:leading-[76px]">
                Three ways <em className="text-g-400 italic">in</em>
              </h2>
            </div>
            <Link to="/browse" className="btn-pill hidden border-[1.5px] border-white lg:inline-flex">
              All groups and sectors
            </Link>
          </div>
          <div className="mt-8 border-t border-white/30 lg:mt-12 lg:grid lg:grid-cols-3">
            {GROUPS.map((group, index) => (
              <Link
                key={group.id}
                to={`/browse?group=${group.id}`}
                className={`flex items-center gap-4 border-b border-white/30 py-6 lg:flex-col lg:items-start lg:gap-6 lg:border-b-0 lg:px-8 lg:py-10 ${index > 0 ? 'lg:border-l lg:border-white/30' : ''}`}
              >
                <span className="w-16 shrink-0 font-serif text-[56px] leading-none text-g-400 lg:w-auto">0{index + 1}</span>
                <div className="flex-1">
                  <h3 className="font-serif text-[40px] leading-10 lg:text-[60px] lg:leading-[58px]">{group.name}</h3>
                  <p className="mt-2 text-[16px] leading-6 text-white/80 lg:max-w-[300px]">{group.blurb}</p>
                  <div className="mt-4 flex -space-x-3">
                    {(GROUP_FACES[group.id] ?? []).map((variant) => (
                      <div key={variant} className="h-11 w-11 overflow-hidden border-2 border-ink lg:h-[72px] lg:w-[72px]">
                        <Portrait variant={variant} className="h-full w-full" />
                      </div>
                    ))}
                  </div>
                </div>
                <span className="hidden items-center gap-2 font-semibold text-g-400 lg:inline-flex">See the ranking</span>
              </Link>
            ))}
          </div>
          <p className="mt-10 text-[15px] leading-5 font-bold tracking-[0.09em] text-white/80 uppercase">Or by sector</p>
          <div className="-mx-5 mt-4 flex gap-2 overflow-x-auto px-5 pb-1 lg:mx-0 lg:flex-wrap lg:px-0">
            {SECTOR_CHIPS.map(([slug, label]) => (
              <Link key={slug} to={`/leaderboard?sector=${slug}`} className="chip border-n-600 bg-transparent text-white">
                {label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-[1360px] px-5 py-12 lg:px-10 lg:py-20">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-[15px] leading-5 font-bold tracking-[0.09em] text-g-600 uppercase">Leading now</p>
              <h2 className="mt-2 font-serif text-[44px] leading-none lg:text-[72px] lg:leading-[70px]">Banking and financial services</h2>
            </div>
            <Link to="/leaderboard?sector=banking-financial-services" className="btn-pill hidden border-[1.5px] border-ink lg:inline-flex">
              Full ranking
            </Link>
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <PresentedBy />
            <p className="text-[15px] leading-[22px] text-n-600">Votes are example data. Portraits are placeholders.</p>
          </div>
          <div
            className="-mx-5 mt-6 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-1 lg:mx-0 lg:px-0"
            onScroll={(event) => {
              const width = 280
              setDot(Math.min(LEADING.length - 1, Math.round(event.currentTarget.scrollLeft / width)))
            }}
          >
            {LEADING.map((leader, index) => (
              <LeaderSlide key={leader.slug} leader={leader} rank={index + 1} />
            ))}
          </div>
          <div className="mt-5 flex items-center justify-center gap-2" aria-label="Carousel position">
            {LEADING.map((leader, index) => (
              <span key={leader.slug} className={`h-2 rounded-full ${index === dot ? 'w-6 bg-g-600' : 'w-2 bg-n-300'}`} />
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-ink bg-white">
        <div className="mx-auto grid max-w-[1360px] gap-6 px-5 py-12 lg:grid-cols-12 lg:gap-12 lg:px-10 lg:py-20">
          <div className="lg:col-span-4">
            <p className="text-[15px] leading-5 font-bold tracking-[0.09em] text-g-600 uppercase">How it works</p>
            <h2 className="mt-2 font-serif text-[44px] leading-none lg:text-[64px] lg:leading-[62px]">
              Vote once. Then <em className="text-g-600 italic">keep going</em>.
            </h2>
          </div>
          <div className="mt-2 border-t border-ink lg:col-span-8 lg:mt-0 lg:grid lg:grid-cols-3 lg:gap-10 lg:border-t-0">
            {[
              ['1', 'Pick a leader', 'Browse by group or sector. Tap Vote on any card.'],
              ['2', 'Prove you are real', 'Your first vote asks for an email code, Google or Apple. It takes seconds.'],
              ['3', 'Keep voting', 'After that, every vote is one tap. One vote for each leader.'],
            ].map(([n, title, body]) => (
              <div key={n} className="flex gap-4 border-b border-ink py-5 lg:block lg:border-b-0 lg:py-0">
                <span className="w-12 shrink-0 font-serif text-[56px] leading-[52px] text-g-600 lg:w-auto lg:text-[96px] lg:leading-[88px]">{n}</span>
                <div className="lg:mt-4">
                  <h3 className="text-[22px] leading-7 font-bold">{title}</h3>
                  <p className="mt-1 text-[16px] leading-6 text-n-700 lg:max-w-[300px]">{body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-ink bg-n-100">
        <div className="mx-auto grid max-w-[1360px] gap-6 px-5 py-12 lg:grid-cols-12 lg:gap-14 lg:px-10 lg:py-20">
          <div className="lg:col-span-5">
            <p className="text-[15px] leading-5 font-bold tracking-[0.09em] text-g-600 uppercase">Insights</p>
            <h2 className="mt-2 font-serif text-[44px] leading-none lg:text-[64px] lg:leading-[62px]">List updates, analysis and leader news</h2>
            <p className="mt-4 text-[17px] leading-[26px] text-n-700">Short reads on how the list moves, and news on key leaders repackaged as digests.</p>
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <Link to="/insights" className="btn-pill bg-ink text-white">
                Open Insights
              </Link>
              <PresentedBy />
            </div>
          </div>
          <div className="border-t border-ink lg:col-span-7">
            {[
              ['List update', 'Example headline: the banking leaderboard changes hands after week one', 'Example item, 28 Oct 2026 (example date)', 'tie'],
              ['Insight', 'Example headline: what family offices are doing differently', 'Example item, 27 Oct 2026 (example date)', 'grey'],
              ['Leader digest', 'Example headline: this week on Example Leader A, in four points', 'Example item, 26 Oct 2026 (example date)', 'dark'],
            ].map(([kicker, title, meta, portrait]) => (
              <article key={title} className="flex items-start gap-4 border-b border-ink py-5">
                <div className="flex-1">
                  <p className="text-[15px] leading-5 font-bold tracking-[0.09em] text-g-600 uppercase">{kicker}</p>
                  <h3 className="mt-1 font-serif text-[26px] leading-7 lg:text-[30px] lg:leading-8">{title}</h3>
                  <p className="mt-2 text-[15px] leading-[22px] text-n-500">{meta}</p>
                </div>
                <div className="w-[84px] shrink-0 lg:w-[110px]">
                  <Portrait variant={portrait} className="aspect-[4/5] w-full" />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-g-600 text-white">
        <div className="mx-auto grid max-w-[1360px] items-end gap-6 px-5 py-10 lg:grid-cols-12 lg:gap-12 lg:px-10 lg:py-14">
          <div className="lg:col-span-7">
            <p className="text-[15px] leading-5 font-bold tracking-[0.09em] text-g-200 uppercase">Newsletter</p>
            <h2 className="mt-2 font-serif text-[44px] leading-none lg:text-[64px] lg:leading-[62px]">The Riyadh 500 weekly</h2>
            <p className="mt-3 max-w-[520px] text-[17px] leading-[26px] text-white/90">
              List moves, insights and news on key leaders, in one short read. Free. One email a week (example schedule).
            </p>
          </div>
          <div className="lg:col-span-5">
            <NewsletterForm id="home-news" bare />
          </div>
        </div>
      </section>

      <section className="border-t border-ink bg-white">
        <div className="mx-auto grid max-w-[1360px] items-end gap-8 px-5 py-12 lg:grid-cols-12 lg:gap-14 lg:px-10 lg:py-20">
          <div className="lg:col-span-7">
            <p className="text-[15px] leading-5 font-bold tracking-[0.09em] text-g-600 uppercase">Nominate</p>
            <h2 className="mt-2 font-serif text-[52px] leading-[50px] lg:text-[88px] lg:leading-[80px]">
              Know someone who <em className="text-g-600 italic">belongs</em> on the list?
            </h2>
            <p className="mt-4 max-w-[520px] text-[18px] leading-[27px] text-n-700">
              Anyone can nominate. It takes about a minute. Our team reviews every nomination before it goes live.
            </p>
            <Link to="/nominate" className="btn-pill mt-6 bg-g-600 text-white">
              Nominate a leader
            </Link>
          </div>
          <ol className="border-t border-ink lg:col-span-5">
            {['Name, role and organisation', 'Group and sector', 'Source link and why they deserve it'].map((step, index) => (
              <li key={step} className="flex items-center gap-4 border-b border-ink py-4">
                <span className="w-8 font-serif text-4xl text-g-600">{index + 1}</span>
                <span className="text-[17px] font-semibold">{step}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-t border-ink bg-n-100">
        <div className="mx-auto max-w-[1360px] px-5 py-10 lg:px-10 lg:py-14">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-[15px] leading-5 font-bold tracking-[0.09em] text-g-600 uppercase">Partners</p>
              <p className="mt-1 text-[16px] text-n-700">Example placeholders. Partners do not influence rank.</p>
            </div>
            <Link to="/partners" className="btn-pill border-[1.5px] border-ink">
              Become a partner
            </Link>
          </div>
          <div className="mt-5 grid grid-cols-2 gap-3 lg:grid-cols-4">
            {['A', 'B', 'C', 'D'].map((slot) => (
              <div key={slot} className="flex min-h-[72px] items-center justify-center border border-dashed border-ink bg-white text-[15px] font-bold tracking-wide">
                [Example Partner {slot}]
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

function PresentedBy() {
  return (
    <div className="inline-flex min-h-11 flex-wrap items-center gap-x-3 gap-y-1 border border-ink px-3 py-1.5">
      <span className="text-[15px] font-semibold">Presented by</span>
      <span className="border border-dashed border-current px-2 py-0.5 text-[15px] font-bold tracking-wide">[Example Partner]</span>
    </div>
  )
}

function LeaderSlide({ leader, rank }: { leader: ExampleLeader; rank: number }) {
  const session = useSession()
  const voted = Boolean(leader.sampleVoted) || session.voted.has(leader.slug)
  const group = GROUPS.find((item) => item.id === leader.group)
  return (
    <article className="w-[272px] shrink-0 snap-start border border-ink bg-white lg:w-[300px]">
      <div className="relative">
        <Portrait variant={leader.portrait} className="aspect-[4/5] w-full bg-n-200" />
        <span className="absolute top-0 left-0 border-r border-b border-ink bg-white px-3 py-2 font-serif text-[34px] leading-none">
          {String(rank).padStart(2, '0')}
        </span>
      </div>
      <div className="p-4">
        <span className="inline-flex min-h-7 items-center border border-ink px-2.5 text-[15px] font-bold">{group?.name}</span>
        <h3 className="mt-2 font-serif text-[28px] leading-[30px]">
          <Link to={`/leaders/${leader.slug}`}>{leader.name}</Link>
        </h3>
        <p className="mt-1 text-[15px] leading-[22px] text-n-600">
          {leader.role}, {leader.organisation}
        </p>
        <div className="mt-4 flex items-center justify-between gap-3">
          <div>
            <p className="text-[20px] leading-[22px] font-bold">{leader.votes.toLocaleString('en-GB')}</p>
            <p className="text-[15px] leading-5 text-n-500">votes (example)</p>
          </div>
          {voted ? (
            <button type="button" className="vote-pill border-2 border-g-600 bg-g-100 text-g-700" disabled aria-label={`Voted for ${leader.name}`}>
              Voted
            </button>
          ) : (
            <button type="button" className="vote-pill bg-g-600 text-white" aria-label={`Vote for ${leader.name}`} onClick={() => session.openVote(leader.slug)}>
              Vote
            </button>
          )}
        </div>
      </div>
    </article>
  )
}

function SearchGlyph() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <circle cx="11" cy="11" r="7" />
      <path d="M20 20l-3.5-3.5" />
    </svg>
  )
}
