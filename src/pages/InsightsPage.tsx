import { Link } from 'react-router-dom'
import { NewsletterForm } from '../components/NewsletterForm'
import { Seo } from '../components/Seo'
import { Silhouette } from '../components/Silhouette'
import { EXAMPLE_LEADERS, EXAMPLE_NOTE, PARTNER_LINE } from '../content/example'
import { pageMetaForPath } from '../content/seo'

const CARDS = [
  {
    kicker: 'List update',
    title: 'Example headline: the banking leaderboard changes hands this week.',
  },
  {
    kicker: 'Insight',
    title: 'Example headline: what family offices are doing differently.',
  },
  {
    kicker: 'Leader digest',
    title: 'Example headline: Example Leader A, in four points.',
  },
]

export function InsightsPage() {
  return (
    <>
      <Seo meta={pageMetaForPath('/insights')} />
      <div className="mx-auto max-w-6xl px-4 py-10 md:px-6">
        <p className="text-[15px] tracking-[0.14em] text-green uppercase">Insights</p>
        <h1 className="mt-2 max-w-3xl font-serif text-5xl text-balance md:text-6xl">
          What moved, and <span className="text-green italic">why</span>.
        </h1>
        <p className="mt-4 max-w-2xl text-[16px] text-muted">
          List updates, analysis and short notes on example leaders. {EXAMPLE_NOTE}
        </p>

        <section className="mt-8 bg-green p-6 text-paper md:p-10">
          <h2 className="font-serif text-4xl">One short email. The whole list, in motion.</h2>
          <div className="mt-6 max-w-xl">
            <NewsletterForm id="insights-hero-email" />
          </div>
        </section>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {CARDS.map((card) => (
            <article key={card.title} className="border border-line p-5">
              <p className="text-[15px] text-green">{card.kicker}</p>
              <h2 className="mt-3 font-serif text-2xl">{card.title}</h2>
              <p className="mt-3 text-[15px] text-muted">{PARTNER_LINE}</p>
            </article>
          ))}
        </div>

        <section className="mt-10 grid gap-6 border-t border-line pt-8 md:grid-cols-[1fr_1fr]">
          <div>
            <h2 className="font-serif text-4xl">Key leaders, in four points.</h2>
            <p className="mt-3 text-[16px] text-muted">Example digest. Not a real profile.</p>
            <Link to={`/leaders/${EXAMPLE_LEADERS[0].slug}`} className="mt-4 inline-flex min-h-11 items-center underline">
              {EXAMPLE_LEADERS[0].name}
            </Link>
          </div>
          <Silhouette tone={0} className="h-56 w-full" />
        </section>
      </div>
    </>
  )
}
