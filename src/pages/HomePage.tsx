import { useState } from 'react'
import { Link } from 'react-router-dom'
import { LeaderCard } from '../components/LeaderCard'
import { NewsletterForm } from '../components/NewsletterForm'
import { Silhouette } from '../components/Silhouette'
import { Seo } from '../components/Seo'
import { EXAMPLE_LEADERS, EXAMPLE_NOTE, GROUPS, PARTNER_LINE, leadersInSector } from '../content/example'
import { FALLBACK_SECTORS } from '../content/sectors'
import { pageMetaForPath } from '../content/seo'

const BANKING = leadersInSector('banking-financial-services')

export function HomePage() {
  const [dot, setDot] = useState(0)

  return (
    <>
      <Seo meta={pageMetaForPath('/')} />
      <section className="bg-ink text-paper">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 md:grid-cols-[1.2fr_0.8fr] md:px-6 md:py-20">
          <div>
            <p className="text-[15px] tracking-[0.16em] text-green-bright uppercase">The public list</p>
            <h1 className="mt-4 font-serif text-5xl leading-[0.95] text-balance md:text-7xl">
              The people who lead <span className="text-green-bright italic">Riyadh</span>. Ranked by you.
            </h1>
            <p className="mt-5 max-w-xl text-[17px] text-paper/85">
              Leaders in government, the private sector and family offices, across 13 sectors. Vote, nominate and follow the list.
            </p>
            <p className="mt-3 text-[15px] text-paper/70">{EXAMPLE_NOTE}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link to="/leaderboard" className="inline-flex min-h-11 items-center justify-center bg-green px-5 font-semibold text-paper">
                Open the leaderboard
              </Link>
              <Link to="/browse" className="inline-flex min-h-11 items-center justify-center border border-paper px-5 font-semibold">
                Browse sectors
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3 self-end" aria-hidden="true">
            {EXAMPLE_LEADERS.slice(0, 6).map((leader) => (
              <Silhouette key={leader.slug} tone={leader.tone} className="h-28 w-full md:h-36" />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 md:px-6">
        <h2 className="font-serif text-4xl md:text-5xl">
          Three ways <span className="text-green italic">in</span>
        </h2>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {GROUPS.map((group, index) => (
            <Link key={group.id} to={`/browse?group=${group.id}`} className="border border-line p-5 hover:border-green">
              <p className="font-serif text-3xl text-green">0{index + 1}</p>
              <h3 className="mt-3 font-serif text-3xl">{group.name}</h3>
              <p className="mt-2 text-[15px] text-muted">{group.blurb}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-mist py-14">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-[15px] tracking-[0.14em] text-green uppercase">Example sector</p>
              <h2 className="mt-2 font-serif text-4xl">Banking and financial services</h2>
            </div>
            <Link to="/leaderboard?sector=banking-financial-services" className="hidden min-h-11 items-center text-[15px] font-semibold md:inline-flex">
              See the sector
            </Link>
          </div>
          <div
            className="mt-6 flex snap-x gap-4 overflow-x-auto pb-2"
            onScroll={(event) => {
              const width = event.currentTarget.clientWidth * 0.78
              setDot(Math.round(event.currentTarget.scrollLeft / Math.max(width, 1)))
            }}
          >
            {BANKING.map((leader) => (
              <LeaderCard key={leader.slug} leader={leader} compact />
            ))}
          </div>
          <div className="mt-4 flex gap-2" aria-hidden="true">
            {BANKING.map((leader, index) => (
              <span key={leader.slug} className={`h-2 w-2 rounded-full ${index === dot ? 'bg-green' : 'bg-line'}`} />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-8 px-4 py-14 md:grid-cols-3 md:px-6">
        <h2 className="font-serif text-4xl md:col-span-3">
          Vote once. Then <span className="text-green italic">keep going</span>.
        </h2>
        {[
          ['1', 'Pick a leader', 'Choose a profile in a sector. The first vote asks you to sign in.'],
          ['2', 'Prove you are real', 'Use an email code. Google and Apple appear when they are switched on.'],
          ['3', 'Keep voting', 'After that, every vote is one tap. Undo is always there.'],
        ].map(([n, title, body]) => (
          <article key={n}>
            <p className="font-serif text-5xl text-green">{n}</p>
            <h3 className="mt-3 font-serif text-2xl">{title}</h3>
            <p className="mt-2 text-[15px] text-muted">{body}</p>
          </article>
        ))}
      </section>

      <section className="border-y border-line">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 py-14 md:grid-cols-2 md:px-6">
          <div>
            <p className="text-[15px] tracking-[0.14em] uppercase">Insights</p>
            <h2 className="mt-2 font-serif text-4xl">List updates, analysis and leader news.</h2>
            <Link to="/insights" className="mt-6 inline-flex min-h-11 items-center bg-ink px-5 font-semibold text-paper">
              Open insights
            </Link>
          </div>
          <div className="grid gap-4">
            <article className="border border-line p-5">
              <p className="text-[15px] text-green">Example</p>
              <h3 className="mt-2 font-serif text-2xl">Example headline: the banking leaderboard changes hands this week.</h3>
            </article>
            <article className="border border-line p-5">
              <p className="text-[15px] text-green">Example</p>
              <h3 className="mt-2 font-serif text-2xl">Example headline: what family offices are doing differently.</h3>
            </article>
          </div>
        </div>
      </section>

      <section className="bg-green text-paper">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 py-14 md:grid-cols-[1fr_1fr] md:px-6">
          <div>
            <h2 className="font-serif text-4xl md:text-5xl">The Riyadh 500 weekly</h2>
            <p className="mt-3 max-w-md text-[16px]">One short email. The whole list, in motion. Example schedule: weekly.</p>
          </div>
          <NewsletterForm />
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-8 px-4 py-14 md:grid-cols-[1.1fr_0.9fr] md:px-6">
        <div>
          <h2 className="font-serif text-4xl">
            Know someone who <span className="text-green italic">belongs</span> on the list?
          </h2>
          <p className="mt-3 text-[16px] text-muted">Nominations are reviewed. They are not published on their own.</p>
          <Link to="/nominate" className="mt-6 inline-flex min-h-11 items-center bg-green px-5 font-semibold text-paper">
            Nominate a leader
          </Link>
        </div>
        <ol className="grid gap-3 text-[16px]">
          <li className="border-t border-line py-3">1. Name, role and organisation</li>
          <li className="border-t border-line py-3">2. Group and sector</li>
          <li className="border-t border-line py-3">3. Why they matter, in a few lines</li>
        </ol>
      </section>

      <section className="border-t border-line">
        <div className="mx-auto max-w-6xl px-4 py-10 md:px-6">
          <p className="text-[15px]">{PARTNER_LINE}</p>
          <div className="mt-4 flex gap-3 overflow-x-auto">
            {['A', 'B', 'C'].map((slot) => (
              <div key={slot} className="min-w-40 border border-line px-4 py-6 text-[15px]">
                [Example Partner {slot}]
              </div>
            ))}
          </div>
          <p className="mt-4 text-[15px]">
            <Link to="/partners" className="underline">
              Partners
            </Link>
            . Rank is never for sale.
          </p>
          <p className="mt-6 text-[15px] text-muted">{FALLBACK_SECTORS.length} sectors on the list.</p>
        </div>
      </section>
    </>
  )
}
