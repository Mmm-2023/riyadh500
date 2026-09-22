import { Link } from 'react-router-dom'
import { Footer } from '../components/Footer'
import { Nav } from '../components/Nav'
import { DisplayHeading, Eyebrow } from '../components/Type'

export function NotFoundPage() {
  return (
    <>
      <Nav />
      <main id="main" className="mx-auto max-w-7xl px-5 pt-28 pb-20 md:px-10 md:pt-36">
        <Eyebrow>Riyadh 500</Eyebrow>
        <DisplayHeading as="h1">Page not found.</DisplayHeading>
        <p className="mt-5 max-w-xl text-lg text-ink/70">
          That address is not on this site. The sectors and the leaderboard are.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            to="/sectors"
            className="inline-flex items-center justify-center bg-ink px-6 py-3 text-sm font-semibold tracking-[0.08em] text-pearl uppercase"
          >
            Browse sectors
          </Link>
          <Link
            to="/"
            className="inline-flex items-center justify-center border border-ink/20 px-6 py-3 text-sm font-semibold tracking-[0.08em] text-ink uppercase"
          >
            Home
          </Link>
        </div>
      </main>
      <Footer />
    </>
  )
}
