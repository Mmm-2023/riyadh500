import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Footer } from '../components/Footer'
import { Nav } from '../components/Nav'
import { SectorCard } from '../components/SectorCard'
import { Seo } from '../components/Seo'
import { DisplayHeading, Eyebrow } from '../components/Type'
import { FALLBACK_SECTORS, type Sector } from '../content/sectors'
import { pageMetaForPath } from '../content/seo'
import { fetchSectors } from '../lib/data'

const PILLARS = [
  {
    title: 'A public list',
    body: 'Five hundred places for business leaders in Riyadh, split across thirteen sectors of the capital.',
  },
  {
    title: 'Vote-led rank',
    body: 'Standing inside a sector follows vote volume. This is a public count, not a closed editorial panel.',
  },
  {
    title: 'Claimable profiles',
    body: 'When a profile is published, the person it names can claim it and keep the record accurate.',
  },
]

export function HomePage() {
  return (
    <>
      <Seo meta={pageMetaForPath('/')} />
      <Nav />
      <main id="main">
        <Hero />
        <Pillars />
        <Count />
        <SectorPreview />
        <Cta />
      </main>
      <Footer />
    </>
  )
}

function Hero() {
  return (
    <section id="top" className="grain relative min-h-dvh overflow-hidden bg-ink text-pearl">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_20%_20%,rgba(196,161,90,0.16),transparent_46%)]" />
      <div className="relative z-10 mx-auto flex min-h-dvh max-w-7xl flex-col justify-end px-5 pt-28 pb-14 md:px-10 md:pt-32 md:pb-20">
        <Eyebrow tone="light">The capital</Eyebrow>
        <DisplayHeading as="h1" tone="light" className="max-w-4xl">
          The public list of Riyadh&apos;s top 500 business leaders.
        </DisplayHeading>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-sand/90">
          Thirteen sectors. Rank led by votes. Profiles that can be claimed once they are published.
          Names appear here only after they go live.
        </p>
        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
          <Link
            to="/sectors"
            className="inline-flex items-center justify-center bg-gold-bright px-6 py-3 text-sm font-semibold tracking-[0.08em] text-ink uppercase"
          >
            Browse sectors
          </Link>
          <Link
            to="/leaderboard"
            className="inline-flex items-center justify-center border border-pearl/40 px-6 py-3 text-sm font-semibold tracking-[0.08em] text-pearl uppercase"
          >
            Open the leaderboard
          </Link>
        </div>
      </div>
    </section>
  )
}

function Pillars() {
  return (
    <section id="about" className="mx-auto max-w-7xl px-5 py-20 md:px-10 md:py-28">
      <Eyebrow>What Riyadh 500 is</Eyebrow>
      <DisplayHeading className="max-w-3xl">A ranked list you can read, vote on, and claim.</DisplayHeading>
      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {PILLARS.map((item) => (
          <article key={item.title} className="border-t border-gold pt-6">
            <h3 className="font-display text-2xl font-bold tracking-[-0.03em] text-ink">{item.title}</h3>
            <p className="mt-3 leading-relaxed text-ink/70">{item.body}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

function Count() {
  return (
    <section className="bg-sand">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 md:grid-cols-[0.8fr_1.2fr] md:px-10 md:py-20">
        <div>
          <Eyebrow>How the list is sized</Eyebrow>
          <h2 className="font-display text-4xl font-bold tracking-[-0.03em] text-ink">500 places.</h2>
        </div>
        <dl className="grid gap-6 sm:grid-cols-3">
          <div>
            <dt className="text-sm tracking-[0.08em] text-ink/70 uppercase">Total</dt>
            <dd className="mt-2 font-display text-4xl font-bold text-ink">500</dd>
            <dd className="mt-2 text-sm text-ink/65">Leaders across the capital</dd>
          </div>
          <div>
            <dt className="text-sm tracking-[0.08em] text-ink/70 uppercase">Sectors</dt>
            <dd className="mt-2 font-display text-4xl font-bold text-ink">13</dd>
            <dd className="mt-2 text-sm text-ink/65">From energy to public programmes</dd>
          </div>
          <div>
            <dt className="text-sm tracking-[0.08em] text-ink/70 uppercase">Each sector</dt>
            <dd className="mt-2 font-display text-4xl font-bold text-ink">38 to 39</dd>
            <dd className="mt-2 text-sm text-ink/65">Cap set per sector, near that band</dd>
          </div>
        </dl>
      </div>
    </section>
  )
}

function SectorPreview() {
  const [sectors, setSectors] = useState<Sector[]>(FALLBACK_SECTORS)

  useEffect(() => {
    let cancelled = false
    fetchSectors().then((rows) => {
      if (!cancelled) setSectors(rows)
    })
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <section id="sectors" className="mx-auto max-w-7xl px-5 py-20 md:px-10 md:py-28">
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div>
          <Eyebrow>Sectors</Eyebrow>
          <DisplayHeading>Thirteen ways into the list.</DisplayHeading>
        </div>
        <Link to="/sectors" className="text-sm font-semibold tracking-[0.08em] text-gold uppercase">
          All sectors
        </Link>
      </div>
      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {sectors.map((sector) => (
          <SectorCard key={sector.slug} sector={sector} />
        ))}
      </div>
    </section>
  )
}

function Cta() {
  return (
    <section className="bg-ink text-pearl">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-5 py-20 md:flex-row md:items-end md:justify-between md:px-10 md:py-24">
        <div className="max-w-xl">
          <Eyebrow tone="light">Start here</Eyebrow>
          <h2 className="font-display text-[clamp(2rem,4vw,3.2rem)] font-bold tracking-[-0.03em] text-balance">
            Open a sector, or read the full board.
          </h2>
          <p className="mt-4 text-sand/85">
            Both are live. Published profiles will fill them. Until then, the lists stay empty.
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link
            to="/sectors"
            className="inline-flex items-center justify-center bg-gold-bright px-6 py-3 text-sm font-semibold tracking-[0.08em] text-ink uppercase"
          >
            Browse sectors
          </Link>
          <Link
            to="/leaderboard"
            className="inline-flex items-center justify-center border border-pearl/35 px-6 py-3 text-sm font-semibold tracking-[0.08em] text-pearl uppercase"
          >
            Leaderboard
          </Link>
        </div>
      </div>
    </section>
  )
}
