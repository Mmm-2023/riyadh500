import { useState, type FormEvent } from 'react'
import { Seo } from '../components/Seo'
import { PARTNER_LINE, RANK_LINE } from '../content/example'
import { pageMetaForPath } from '../content/seo'

const SLOTS = [
  { n: '01', title: 'Sector presenter', body: 'One quiet line on a sector page. Example: Banking and financial services.' },
  { n: '02', title: 'Newsletter', body: 'A line on The Riyadh 500 weekly.' },
  { n: '03', title: 'Insights', body: 'A labelled line on an example insight.' },
  { n: '04', title: 'Sponsored briefings', body: 'A marked slot beside example leader news.' },
]

export function PartnersPage() {
  const [sent, setSent] = useState(false)

  function onSubmit(event: FormEvent) {
    event.preventDefault()
    setSent(true)
  }

  return (
    <>
      <Seo meta={pageMetaForPath('/partners')} />
      <div className="mx-auto max-w-6xl px-4 py-10 md:px-6">
        <p className="text-[15px] tracking-[0.14em] text-green uppercase">Partners</p>
        <h1 className="mt-2 max-w-3xl font-serif text-5xl text-balance md:text-6xl">
          Be seen by those who <span className="text-green italic">decide</span>.
        </h1>
        <p className="mt-4 max-w-2xl text-[16px]">{RANK_LINE}</p>
        <p className="mt-2 text-[15px] text-muted">{PARTNER_LINE}</p>

        <section className="mt-10 grid gap-4 md:grid-cols-2">
          <article className="border border-line p-5">
            <h2 className="font-serif text-3xl">Audience</h2>
            <p className="mt-3 text-4xl font-semibold">[Figure]</p>
            <p className="mt-2 text-[15px] text-muted">Example placeholder. No audience number is published here.</p>
          </article>
          <article className="border border-line p-5">
            <h2 className="font-serif text-3xl">Price</h2>
            <p className="mt-3 text-4xl font-semibold">[Example price]</p>
            <p className="mt-2 text-[15px] text-muted">Example placeholder. No price is set on this page.</p>
          </article>
        </section>

        <ol className="mt-10 divide-y divide-line border-y border-line">
          {SLOTS.map((slot) => (
            <li key={slot.n} className="grid gap-2 py-5 md:grid-cols-[6rem_1fr]">
              <p className="font-serif text-3xl text-green">{slot.n}</p>
              <div>
                <h2 className="font-serif text-3xl">{slot.title}</h2>
                <p className="mt-2 text-[16px]">{slot.body}</p>
                <p className="mt-2 text-[15px]">{PARTNER_LINE}</p>
              </div>
            </li>
          ))}
        </ol>

        <section className="mt-10 bg-ink p-6 text-paper md:p-10">
          <h2 className="font-serif text-4xl">
            Trust is the <span className="text-green-bright italic">product</span>.
          </h2>
          <p className="mt-4 max-w-2xl text-[16px] text-paper/85">{RANK_LINE} A partner line never changes who is above whom.</p>
        </section>

        <section className="mt-10 max-w-xl">
          <h2 className="font-serif text-4xl">Become a partner</h2>
          <p className="mt-2 text-[15px] text-muted">Example form. It does not send a message.</p>
          {sent ? (
            <p className="mt-4 text-[16px]" role="status">
              Noted on this screen only. Nothing was sent.
            </p>
          ) : (
            <form className="mt-4 grid gap-3" onSubmit={onSubmit}>
              <input required placeholder="Name" className="min-h-11 border border-ink px-3 text-base" />
              <input required type="email" placeholder="Email" className="min-h-11 border border-ink px-3 text-base" />
              <input placeholder="Organisation" className="min-h-11 border border-ink px-3 text-base" />
              <button type="submit" className="min-h-11 bg-green font-semibold text-paper">
                Send example note
              </button>
            </form>
          )}
        </section>
      </div>
    </>
  )
}
