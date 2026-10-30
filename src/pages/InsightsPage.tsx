import { useState } from 'react'
import { Link } from 'react-router-dom'
import { NewsletterForm } from '../components/NewsletterForm'
import { Portrait } from '../components/Portrait'
import { Seo } from '../components/Seo'
import { EXAMPLE_LEADERS } from '../content/example'
import { pageMetaForPath } from '../content/seo'

const STORIES = [
  { kind: 'List update', title: 'Example headline: the banking leaderboard changes hands after week one', date: 'Example item, 27 Oct 2026 (example date)', portrait: 'tie' },
  { kind: 'News', title: 'Example headline: Example Bank A names a new regional head', date: 'Example item, 26 Oct 2026 (example date)', portrait: 'dark' },
  { kind: 'Insight', title: 'Example headline: what family offices are doing differently', date: 'Example item, 25 Oct 2026 (example date)', portrait: 'grey' },
  { kind: 'Leader digest', title: 'Example headline: this week on Sample Name B, in four points', date: 'Example item, 24 Oct 2026 (example date)', portrait: 'mint' },
]

export function InsightsPage() {
  const [filter, setFilter] = useState('All')
  const visible = STORIES.filter((story) => filter === 'All' || story.kind === filter || (filter === 'Insights' && story.kind === 'Insight'))

  return (
    <>
      <Seo meta={pageMetaForPath('/insights')} />
      <section className="bg-white">
        <div className="mx-auto grid max-w-[1360px] items-end gap-4 px-5 pt-8 pb-6 lg:grid-cols-12 lg:px-10 lg:pt-14 lg:pb-8">
          <div className="lg:col-span-8">
            <p className="text-[15px] leading-5 font-bold tracking-[0.09em] text-g-600 uppercase">Insights and newsletter</p>
            <h1 className="mt-2 font-serif text-[56px] leading-[52px] lg:text-[104px] lg:leading-[92px]">
              What moved, <em className="text-g-600 italic">and why</em>
            </h1>
          </div>
          <div className="lg:col-span-4">
            <p className="text-[17px] leading-[26px] text-n-700">List updates, analysis and news on key leaders, repackaged as short digests.</p>
            <div className="mt-3 inline-flex min-h-11 flex-wrap items-center gap-x-3 border border-ink px-3 py-1.5">
              <span className="text-[15px] font-semibold">Insights presented by</span>
              <span className="border border-dashed px-2 py-0.5 text-[15px] font-bold">[Example Partner]</span>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-g-600 text-white">
        <div className="mx-auto grid max-w-[1360px] items-center gap-5 px-5 py-8 lg:grid-cols-12 lg:px-10 lg:py-10">
          <div className="lg:col-span-6">
            <p className="text-[15px] font-bold tracking-[0.09em] text-g-200 uppercase">The Riyadh 500 weekly</p>
            <p className="mt-1 font-serif text-[40px] leading-10 lg:text-[56px] lg:leading-[54px]">
              One short email. The whole list, <em className="text-g-200 italic">in motion</em>.
            </p>
          </div>
          <div className="lg:col-span-6">
            <NewsletterForm id="insights-hero" bare />
          </div>
        </div>
      </section>
      <div className="sticky top-0 z-30 border-b border-ink bg-white">
        <div className="mx-auto max-w-[1360px] px-5 py-3 lg:px-10">
          <div className="-mx-5 flex gap-2 overflow-x-auto px-5 lg:mx-0 lg:px-0">
            {['All', 'List update', 'Insight', 'Leader digest', 'News'].map((label) => (
              <button key={label} type="button" aria-pressed={filter === label} onClick={() => setFilter(label)} className={`chip ${filter === label ? 'bg-ink text-white' : ''}`}>
                {label === 'All' ? 'All' : label === 'List update' ? 'List updates' : label === 'Insight' ? 'Insights' : label === 'Leader digest' ? 'Leader digests' : 'News'}
              </button>
            ))}
          </div>
        </div>
      </div>
      <section className="bg-white">
        <div className="mx-auto grid max-w-[1360px] gap-8 px-5 py-8 lg:grid-cols-12 lg:px-10">
          <div className="lg:col-span-8">
            <article className="border border-ink p-5">
              <span className="bg-g-400 px-3 py-2 text-[15px] font-bold tracking-[0.09em] text-ink uppercase">Lead story</span>
              <p className="mt-4 text-[15px] font-bold tracking-[0.09em] text-g-600 uppercase">Insight</p>
              <h2 className="mt-1 font-serif text-[40px] leading-10 lg:text-[60px] lg:leading-[58px]">Example headline: how the three groups vote differently</h2>
              <p className="mt-3 text-[15px] text-n-500">Example item, 28 Oct 2026 (example date). 5 min read (example)</p>
            </article>
            <div className="mt-4 border-t border-ink">
              {visible.map((story) => (
                <article key={story.title} className="flex items-start gap-4 border-b border-ink py-5">
                  <div className="flex-1">
                    <p className="text-[15px] font-bold tracking-[0.09em] text-g-600 uppercase">{story.kind}</p>
                    <h3 className="mt-1 font-serif text-[26px] leading-7 lg:text-[30px] lg:leading-8">{story.title}</h3>
                    <p className="mt-2 text-[15px] text-n-500">{story.date}</p>
                  </div>
                  <Portrait variant={story.portrait} className="aspect-[4/5] w-[84px] lg:w-[110px]" />
                </article>
              ))}
            </div>
            <div className="mt-6 border border-dashed border-ink p-4">
              <p className="text-[15px] font-bold tracking-[0.09em] text-n-600 uppercase">Partner placement (example)</p>
              <p className="mt-1 text-[17px] font-semibold">[Example Partner] presents the Energy briefing</p>
            </div>
          </div>
          <aside className="hidden lg:col-span-4 lg:block">
            <div className="sticky top-6 space-y-6">
              <div className="border border-ink p-6">
                <p className="text-[15px] font-bold tracking-[0.09em] text-g-600 uppercase">Leader digests</p>
                <h2 className="mt-1 font-serif text-4xl leading-9">Key leaders, in four points</h2>
                <div className="mt-4 space-y-3">
                  {EXAMPLE_LEADERS.slice(0, 3).map((leader) => (
                    <Link key={leader.slug} to={`/leaders/${leader.slug}`} className="flex items-center gap-3 border-t border-ink pt-3">
                      <Portrait variant={leader.portrait} className="aspect-[4/5] w-14" />
                      <div>
                        <p className="font-serif text-2xl leading-[26px]">{leader.name}</p>
                        <p className="text-[15px] text-n-600">Example digest</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
              <div className="bg-ink p-6 text-white">
                <p className="text-[15px] font-bold tracking-[0.09em] text-g-400 uppercase">Never miss a move</p>
                <p className="mt-1 font-serif text-[34px] leading-[34px]">Subscribe to the weekly</p>
                <div className="mt-4">
                  <NewsletterForm id="insights-side" bare />
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </>
  )
}
