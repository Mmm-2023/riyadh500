import { useState } from 'react'
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom'
import { searchLeaders } from '../content/example'
import { useSession } from '../state/session'
import { VoteSheet } from './VoteSheet'

const NAV = [
  { to: '/', label: 'Home', end: true },
  { to: '/browse', label: 'Browse', end: false },
  { to: '/leaderboard', label: 'Rankings', end: false },
  { to: '/insights', label: 'Insights', end: false },
  { to: '/nominate', label: 'Nominate', end: false },
  { to: '/partners', label: 'Partners', end: false },
]

const DOCK = NAV.filter((item) => item.to !== '/partners')

export function Shell() {
  const session = useSession()
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const [searchOpen, setSearchOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const results = searchLeaders(query).slice(0, 6)

  return (
    <div className="min-h-dvh bg-white text-ink">
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[80] focus:bg-white focus:px-3 focus:py-2">
        Skip to content
      </a>
      <header className="border-b border-ink bg-white lg:hidden">
        <div className="flex h-14 items-center justify-between px-5">
          <Wordmark />
          <div className="-mr-2 flex items-center">
            <button type="button" className="flex h-11 w-11 items-center justify-center" aria-label="Search" onClick={() => setSearchOpen((open) => !open)}>
              <SearchIcon />
            </button>
            <button type="button" className="flex h-11 w-11 items-center justify-center" aria-label="Menu" aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)}>
              <MenuIcon />
            </button>
          </div>
        </div>
        {searchOpen ? (
          <div className="px-5 pb-3">
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
      <header className="hidden border-b border-ink bg-white lg:block">
        <div className="mx-auto flex h-[76px] max-w-[1360px] items-center gap-8 px-10">
          <Wordmark />
          <nav className="flex items-center" aria-label="Primary">
            {NAV.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  `inline-flex min-h-11 items-center px-4 text-[16px] font-semibold ${isActive ? 'border-b-[3px] border-g-600' : 'text-n-700'}`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
          <div className="flex-1" />
          <div className="hidden w-[280px] lg:block">
            <SearchField
              query={query}
              onChange={setQuery}
              results={results}
              underline
              onPick={(slug) => {
                setQuery('')
                navigate(`/leaders/${slug}`)
              }}
            />
          </div>
          <Link to="/insights" className="btn-pill bg-g-600 text-white">
            Get the newsletter
          </Link>
          <button type="button" className="inline-flex min-h-11 items-center px-3 font-semibold whitespace-nowrap" onClick={() => session.openAuth('nominate')}>
            {session.email ? 'Signed in' : 'Sign in'}
          </button>
        </div>
      </header>

      {menuOpen ? (
        <div className="fixed inset-0 z-[60] bg-white px-5 pt-6 lg:hidden">
          <div className="flex justify-end">
            <button type="button" className="min-h-11 px-2 font-semibold" onClick={() => setMenuOpen(false)}>
              Close
            </button>
          </div>
          <nav className="mt-4 grid" aria-label="Menu">
            {NAV.map((item) => (
              <NavLink key={item.to} to={item.to} end={item.end} className="border-b border-ink py-4 font-serif text-4xl" onClick={() => setMenuOpen(false)}>
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
      ) : null}

      <main id="main">
        <Outlet />
      </main>

      <footer className="bg-ink text-white">
        <div className="mx-auto max-w-[1360px] px-5 pt-10 pb-[170px] lg:px-10 lg:pb-12">
          <div className="grid gap-6 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <Wordmark light />
              <p className="mt-3 max-w-[340px] text-[16px] text-white/80">
                The public list of leaders in government, the private sector and family offices. Partners do not influence rank.
              </p>
            </div>
            <nav className="flex flex-wrap gap-x-6 lg:col-span-7" aria-label="Footer">
              {[
                ['/insights', 'Methodology'],
                ['/insights', 'How votes are counted'],
                ['/nominate', 'Corrections'],
                ['/partners', 'Partners'],
                ['/nominate', 'Nominate'],
                ['/privacy', 'Privacy'],
                ['/terms', 'Terms'],
              ].map(([to, label]) => (
                <Link key={label} to={to} className="inline-flex min-h-11 items-center text-[16px] text-white/90 underline decoration-white/40 underline-offset-4">
                  {label}
                </Link>
              ))}
            </nav>
          </div>
          <p className="mt-8 text-[15px] text-white/70">Example data only. Portraits are placeholders. Rank is never for sale.</p>
        </div>
      </footer>

      <nav className="fixed inset-x-0 bottom-0 z-40 bg-ink lg:hidden" aria-label="Mobile" style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}>
        <ul className="flex">
          {DOCK.map((item) => (
            <li key={item.to} className="flex-1">
              <NavLink
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  `relative flex min-h-16 flex-col items-center justify-center gap-1 ${isActive ? 'text-g-400' : 'text-white/80'}`
                }
              >
                {({ isActive }) => (
                  <>
                    {isActive ? <span className="absolute inset-x-5 top-0 h-[3px] bg-g-400" /> : null}
                    {item.to === '/nominate' ? (
                      <span className="flex h-6 w-6 items-center justify-center bg-g-400 text-ink">
                        <PlusIcon />
                      </span>
                    ) : (
                      <DockIcon name={item.label} />
                    )}
                    <span className="text-[15px] leading-4 font-semibold">{item.label}</span>
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {session.snackbar ? (
        <div className="fixed right-4 bottom-24 left-4 z-50 flex items-center justify-between gap-3 bg-ink px-4 py-3 text-[15px] text-white lg:right-auto lg:bottom-6 lg:left-6 lg:w-80">
          <p>{session.snackbar}</p>
          <button
            type="button"
            className="min-h-11 font-semibold text-g-400"
            onClick={() => {
              const slug = [...session.voted].at(-1)
              if (slug) void session.undo(slug)
              else session.dismissSnackbar()
            }}
          >
            Undo
          </button>
        </div>
      ) : null}
      <VoteSheet />
    </div>
  )
}

function Wordmark({ light = false }: { light?: boolean }) {
  return (
    <Link to="/" className="inline-flex items-baseline gap-1.5">
      <span className={`text-[15px] font-extrabold tracking-[0.16em] ${light ? 'text-white' : 'text-ink'}`}>RIYADH</span>
      <em className={`font-serif text-[34px] leading-none italic ${light ? 'text-g-400' : 'text-g-600'}`}>500</em>
    </Link>
  )
}

function SearchField({
  query,
  onChange,
  results,
  onPick,
  underline = false,
}: {
  query: string
  onChange: (value: string) => void
  results: { slug: string; name: string }[]
  onPick: (slug: string) => void
  underline?: boolean
}) {
  return (
    <div className="relative">
      <label className="sr-only" htmlFor={underline ? 'site-search-desk' : 'site-search'}>
        Search leaders
      </label>
      <div className={underline ? 'flex min-h-11 items-center gap-2 border-b-[1.5px] border-ink px-1 text-n-600' : 'flex min-h-12 items-center gap-3 border-[1.5px] border-ink px-3 text-n-600'}>
        <SearchIcon />
        <input
          id={underline ? 'site-search-desk' : 'site-search'}
          value={query}
          onChange={(event) => onChange(event.target.value)}
          placeholder={underline ? 'Search leaders' : 'Search leaders, sectors, organisations'}
          className="w-full bg-transparent text-[16px] text-ink outline-none placeholder:text-n-600"
        />
      </div>
      {query && results.length > 0 ? (
        <ul className="absolute inset-x-0 top-full z-20 mt-1 border border-ink bg-white">
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

function SearchIcon() {
  return (
    <svg className="h-6 w-6 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <circle cx="11" cy="11" r="7" />
      <path d="M20 20l-3.5-3.5" />
    </svg>
  )
}

function MenuIcon() {
  return (
    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  )
}

function PlusIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="M12 5v14M5 12h14" />
    </svg>
  )
}

function DockIcon({ name }: { name: string }) {
  if (name === 'Browse') {
    return (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <rect x="3" y="3" width="7" height="7" />
        <rect x="14" y="3" width="7" height="7" />
        <rect x="3" y="14" width="7" height="7" />
        <rect x="14" y="14" width="7" height="7" />
      </svg>
    )
  }
  if (name === 'Rankings') {
    return (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <path d="M4 20V10M10 20V4M16 20v-7M22 20H2" />
      </svg>
    )
  }
  if (name === 'Insights') {
    return (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <path d="M4 5h13v14H6a2 2 0 0 1-2-2zM17 9h3v8a2 2 0 0 1-2 2M7.5 9h6M7.5 13h6" />
      </svg>
    )
  }
  return (
    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z" />
    </svg>
  )
}
