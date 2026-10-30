import { useState } from 'react'
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom'
import { searchLeaders } from '../content/example'
import { useSession } from '../state/session'
import { VoteSheet } from './VoteSheet'

const NAV = [
  { to: '/', label: 'Home', end: true },
  { to: '/browse', label: 'Browse', end: false },
  { to: '/leaderboard', label: 'Board', end: false },
  { to: '/insights', label: 'Insights', end: false },
  { to: '/nominate', label: 'Nominate', end: false },
]

export function Shell() {
  const session = useSession()
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const [searchOpen, setSearchOpen] = useState(false)
  const results = searchLeaders(query).slice(0, 6)

  return (
    <div className="min-h-dvh bg-paper text-ink">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[80] focus:bg-paper focus:px-3 focus:py-2"
      >
        Skip to content
      </a>
      <header className="sticky top-0 z-40 border-b border-line bg-paper/95 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-6xl items-center gap-3 px-4 md:h-16 md:px-6">
          <Link to="/" className="font-serif text-[1.35rem] leading-none tracking-tight">
            Riyadh <span className="text-green italic">500</span>
          </Link>
          <nav className="ml-6 hidden items-center gap-5 md:flex" aria-label="Primary">
            {NAV.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  `text-[15px] ${isActive ? 'text-green' : 'text-ink hover:text-green'}`
                }
              >
                {item.label === 'Board' ? 'Leaderboard' : item.label}
              </NavLink>
            ))}
            <NavLink to="/partners" className="text-[15px] hover:text-green">
              Partners
            </NavLink>
          </nav>
          <div className="ml-auto hidden min-w-0 flex-1 md:block md:max-w-xs">
            <SearchField
              query={query}
              onChange={setQuery}
              results={results}
              onPick={(slug) => {
                setQuery('')
                navigate(`/leaders/${slug}`)
              }}
            />
          </div>
          <button
            type="button"
            className="ml-auto min-h-11 px-2 text-[15px] md:hidden"
            aria-expanded={searchOpen}
            onClick={() => setSearchOpen((open) => !open)}
          >
            Search
          </button>
          <button
            type="button"
            className="hidden min-h-11 bg-green px-4 text-[15px] font-semibold text-paper md:inline-flex md:items-center"
            onClick={() => (session.email ? navigate('/nominate') : session.openAuth('nominate'))}
          >
            {session.email ? 'Signed in' : 'Sign in'}
          </button>
        </div>
        {searchOpen ? (
          <div className="border-t border-line px-4 py-3 md:hidden">
            <SearchField
              query={query}
              onChange={setQuery}
              results={results}
              onPick={(slug) => {
                setQuery('')
                setSearchOpen(false)
                navigate(`/leaders/${slug}`)
              }}
            />
          </div>
        ) : null}
      </header>

      <main id="main" className="safe-bottom">
        <Outlet />
      </main>

      <footer className="border-t border-line">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 py-10 md:grid-cols-[1.4fr_1fr] md:px-6">
          <div>
            <p className="font-serif text-3xl">
              Riyadh <span className="text-green italic">500</span>
            </p>
            <p className="mt-3 max-w-md text-[15px] text-muted">
              A public list of business leaders in Riyadh. Example profiles only, until real ones are published.
            </p>
          </div>
          <nav aria-label="Footer" className="grid grid-cols-2 gap-2 text-[15px]">
            <Link className="min-h-11 py-2" to="/insights">
              Insights
            </Link>
            <Link className="min-h-11 py-2" to="/partners">
              Partners
            </Link>
            <Link className="min-h-11 py-2" to="/nominate">
              Nominate
            </Link>
            <Link className="min-h-11 py-2" to="/privacy">
              Privacy
            </Link>
            <Link className="min-h-11 py-2" to="/terms">
              Terms
            </Link>
          </nav>
        </div>
      </footer>

      <nav
        className="fixed inset-x-0 bottom-0 z-40 border-t border-ink bg-ink text-paper md:hidden"
        aria-label="Mobile"
        style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
      >
        <ul className="grid grid-cols-5">
          {NAV.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  `flex min-h-14 flex-col items-center justify-center text-[15px] tracking-wide ${
                    isActive ? 'text-green-bright' : 'text-paper'
                  }`
                }
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {session.snackbar ? (
        <div className="fixed right-4 bottom-24 left-4 z-50 flex items-center justify-between gap-3 bg-ink px-4 py-3 text-[15px] text-paper md:right-auto md:bottom-6 md:left-6 md:w-80">
          <p>{session.snackbar}</p>
          {session.pendingSlug || session.snackbar === 'Vote counted.' ? (
            <button
              type="button"
              className="min-h-11 font-semibold text-green-bright"
              onClick={() => {
                const slug = [...session.voted].at(-1)
                if (slug) void session.undo(slug)
              }}
            >
              Undo
            </button>
          ) : (
            <button type="button" className="min-h-11" onClick={session.dismissSnackbar}>
              Close
            </button>
          )}
        </div>
      ) : null}

      <VoteSheet />
    </div>
  )
}

function SearchField({
  query,
  onChange,
  results,
  onPick,
}: {
  query: string
  onChange: (value: string) => void
  results: { slug: string; name: string }[]
  onPick: (slug: string) => void
}) {
  return (
    <div className="relative">
      <label className="sr-only" htmlFor="site-search">
        Search example leaders
      </label>
      <input
        id="site-search"
        value={query}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search example leaders"
        className="min-h-11 w-full border border-line bg-mist px-3 text-base"
      />
      {query && results.length > 0 ? (
        <ul className="absolute inset-x-0 top-full z-20 mt-1 border border-line bg-paper">
          {results.map((leader) => (
            <li key={leader.slug}>
              <button type="button" className="min-h-11 w-full px-3 text-left text-[15px]" onClick={() => onPick(leader.slug)}>
                {leader.name}
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  )
}
