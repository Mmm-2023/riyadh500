import { useState, type FormEvent, type ReactNode } from 'react'
import { Seo } from '../components/Seo'
import { pageMetaForPath } from '../content/seo'

export function PartnersPage() {
  const [sent, setSent] = useState(false)

  function onSubmit(event: FormEvent) {
    event.preventDefault()
    setSent(true)
  }

  return (
    <>
      <Seo meta={pageMetaForPath('/partners')} />
      <section className="bg-ink text-white">
        <div className="mx-auto grid max-w-[1360px] items-end gap-8 px-5 pt-10 pb-10 lg:grid-cols-12 lg:px-10 lg:pt-20 lg:pb-16">
          <div className="lg:col-span-8">
            <p className="text-[15px] font-bold tracking-[0.09em] text-g-400 uppercase">Partners</p>
            <h1 className="mt-2 font-serif text-[56px] leading-[52px] lg:text-[112px] lg:leading-[98px]">
              Be seen by those who <em className="text-g-400 italic">decide</em>
            </h1>
          </div>
          <div className="lg:col-span-4">
            <p className="text-[18px] leading-[27px] text-white/85">
              Riyadh 500 brings together an engaged audience of voters, nominators and newsletter readers around the leaders of the city. Partners are visible, never in the ranking.
            </p>
            <a href="#partner-form" className="btn-pill mt-5 bg-g-400 text-ink">
              Talk to partnerships
            </a>
          </div>
        </div>
      </section>
      <section className="bg-white">
        <div className="mx-auto max-w-[1360px] px-5 py-10 lg:px-10 lg:py-14">
          <p className="text-[15px] font-bold tracking-[0.09em] text-g-600 uppercase">The audience</p>
          <p className="mt-1 text-[15px] text-n-600">Placeholders only. No audience figures are claimed.</p>
          <div className="mt-4 border-t border-ink lg:grid lg:grid-cols-3">
            {[
              'Newsletter subscribers (to be filled with real data)',
              'Verified voters (to be filled with real data)',
              'Monthly readers (to be filled with real data)',
            ].map((line, index) => (
              <div key={line} className={`border-b border-ink py-5 lg:border-b-0 lg:px-8 lg:py-8 ${index > 0 ? 'lg:border-l lg:border-ink' : ''}`}>
                <p className="font-serif text-[56px] leading-[52px] text-g-600">[Figure]</p>
                <p className="mt-1 text-[16px] leading-6 text-n-700">{line}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="border-t border-ink bg-white">
        <div className="mx-auto max-w-[1360px] px-5 py-10 lg:px-10 lg:py-14">
          <p className="text-[15px] font-bold tracking-[0.09em] text-g-600 uppercase">Where partners appear</p>
          <h2 className="mt-2 font-serif text-[44px] leading-none lg:text-[72px] lg:leading-[68px]">
            Four quiet <em className="text-g-600 italic">placements</em>
          </h2>
          <div className="mt-4 border-t border-ink">
            <Placement n="01" title="Sector presenter" body="Own one of the 13 sector pages with a single, tasteful line.">
              <div className="border-[1.5px] border-ink">
                <div className="border-b border-ink bg-n-100 p-4">
                  <p className="text-[15px] font-bold tracking-[0.09em] text-g-600 uppercase">Sector 02</p>
                  <p className="font-serif text-4xl leading-9">Banking and financial services</p>
                  <Badge label="Sector presented by" />
                </div>
                <p className="p-4 text-[15px] text-n-600">A quiet line under the sector title. Never inside the ranking.</p>
              </div>
            </Placement>
            <Placement n="02" title="Newsletter partner" body="Presented by on the weekly, in the header and the sign-up.">
              <div className="bg-g-600 p-5 text-white">
                <p className="text-[15px] font-bold tracking-[0.09em] text-g-200 uppercase">Newsletter</p>
                <p className="mt-1 font-serif text-[34px] leading-[34px]">The Riyadh 500 weekly</p>
                <p className="mt-3 text-[15px] text-white/90">
                  Presented by <b className="border border-dashed border-white px-2 py-0.5">[Example Partner]</b>
                </p>
              </div>
            </Placement>
            <Placement n="03" title="Insights partner" body="Support analysis and leader digests with a named slot.">
              <div className="border-[1.5px] border-ink p-4">
                <p className="text-[15px] font-bold tracking-[0.09em] text-g-600 uppercase">Insight</p>
                <p className="mt-1 font-serif text-[30px] leading-8">Example headline: what family offices are doing differently</p>
                <Badge label="Insights presented by" />
              </div>
            </Placement>
            <Placement n="04" title="Sponsored briefings" body="Clearly labelled partner content, always marked as such.">
              <div className="flex flex-wrap items-center justify-between gap-3 border-[1.5px] border-dashed border-ink p-4">
                <div>
                  <p className="text-[15px] font-bold tracking-[0.09em] text-n-600 uppercase">Partner placement (example)</p>
                  <p className="mt-1 text-[17px] font-semibold">[Example Partner] presents the Energy briefing</p>
                </div>
                <span className="btn-pill border-[1.5px] border-ink">Read the briefing</span>
              </div>
            </Placement>
          </div>
        </div>
      </section>
      <section className="bg-ink text-white">
        <div className="mx-auto grid max-w-[1360px] gap-6 px-5 py-10 lg:grid-cols-12 lg:gap-14 lg:px-10 lg:py-16">
          <div className="lg:col-span-5">
            <p className="text-[15px] font-bold tracking-[0.09em] text-g-400 uppercase">Our promise</p>
            <h2 className="mt-2 font-serif text-[44px] leading-none lg:text-[64px] lg:leading-[62px]">
              Trust is the <em className="text-g-400 italic">product</em>.
            </h2>
          </div>
          <ul className="border-t border-white/25 lg:col-span-7">
            {[
              ['Rank is never for sale', 'Votes decide the order. Partners cannot change it.'],
              ['Every placement is labelled', 'Presented by, or Partner placement. Never disguised.'],
              ['Editorial stays independent', 'Insights and digests are written without partner input.'],
            ].map(([title, body]) => (
              <li key={title} className="border-b border-white/25 py-4">
                <p className="text-[18px] leading-6 font-bold">{title}</p>
                <p className="mt-0.5 text-[16px] leading-6 text-white/80">{body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <section className="border-t border-ink bg-white">
        <div className="mx-auto max-w-[1360px] px-5 py-10 lg:px-10 lg:py-14">
          <p className="text-[15px] font-bold tracking-[0.09em] text-g-600 uppercase">Packages</p>
          <p className="mt-1 text-[15px] text-n-600">Example structure. Names and prices are not final.</p>
          <div className="mt-5 grid gap-3 lg:grid-cols-3">
            {[
              ['Sector', ['One sector page', 'Presented by line', 'Quarterly report']],
              ['Newsletter', ['Weekly header slot', 'Sign-up page slot', 'Monthly digest']],
              ['Insights and sectors', ['Insights slot', 'Sector slot', 'Newsletter slot', 'Briefing']],
            ].map(([name, items], index) => (
              <div key={String(name)} className={`border-[1.5px] border-ink p-5 ${index === 1 ? 'bg-g-50 lg:border-g-600' : 'bg-white'}`}>
                <p className="text-[15px] font-bold tracking-[0.09em] text-g-600 uppercase">Example package</p>
                <h3 className="mt-1 font-serif text-4xl leading-9">{name}</h3>
                <ul className="mt-3 space-y-1 text-[16px] leading-6 text-n-700">
                  {(items as string[]).map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <p className="mt-4 text-[18px] font-bold">[Example price]</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section id="partner-form" className="bg-g-600 text-white">
        <div className="mx-auto grid max-w-[1360px] gap-8 px-5 py-10 lg:grid-cols-12 lg:px-10 lg:py-16">
          <div className="lg:col-span-5">
            <p className="text-[15px] font-bold tracking-[0.09em] text-g-200 uppercase">Get in touch</p>
            <h2 className="mt-2 font-serif text-[44px] leading-none lg:text-[64px] lg:leading-[62px]">Become a partner</h2>
            <p className="mt-3 text-[17px] leading-[26px] text-white/90">
              Tell us who you are and where you would like to appear. This example form does not send a message.
            </p>
          </div>
          {sent ? (
            <p className="text-[17px] lg:col-span-7" role="status">
              Noted on this screen only. Nothing was sent.
            </p>
          ) : (
            <form className="grid gap-3 sm:grid-cols-2 lg:col-span-7" onSubmit={onSubmit}>
              <input required placeholder="Name" className="field border-white bg-transparent text-white placeholder:text-white/80" />
              <input required type="email" placeholder="Work email" className="field border-white bg-transparent text-white placeholder:text-white/80" />
              <input placeholder="Organisation" className="field border-white bg-transparent text-white placeholder:text-white/80 sm:col-span-2" />
              <button type="submit" className="btn-pill bg-white text-ink sm:col-span-2">
                Send enquiry
              </button>
            </form>
          )}
        </div>
      </section>
    </>
  )
}

function Badge({ label }: { label: string }) {
  return (
    <div className="mt-3 inline-flex min-h-11 flex-wrap items-center gap-x-3 border border-ink px-3 py-1.5">
      <span className="text-[15px] font-semibold">{label}</span>
      <span className="border border-dashed px-2 py-0.5 text-[15px] font-bold">[Example Partner]</span>
    </div>
  )
}

function Placement({
  n,
  title,
  body,
  children,
}: {
  n: string
  title: string
  body: string
  children: ReactNode
}) {
  return (
    <div className="items-center border-b border-ink py-8 lg:grid lg:grid-cols-12 lg:gap-10">
      <div className="lg:col-span-5">
        <span className="font-serif text-[56px] leading-[52px] text-g-600">{n}</span>
        <h3 className="mt-1 font-serif text-4xl leading-9 lg:text-[44px] lg:leading-[44px]">{title}</h3>
        <p className="mt-2 max-w-[440px] text-[17px] leading-[26px] text-n-700">{body}</p>
      </div>
      <div className="mt-5 lg:col-span-7 lg:mt-0">{children}</div>
    </div>
  )
}
