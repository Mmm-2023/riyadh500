import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

const NAV_LINKS = [
  { label: 'Sectors', to: '/sectors' },
  { label: 'Leaderboard', to: '/leaderboard' },
]

export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [openPath, setOpenPath] = useState<string | null>(null)
  const location = useLocation()
  const isHome = location.pathname === '/' || location.pathname === ''
  const open = openPath === location.pathname

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpenPath(null)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const darkNav = !isHome || scrolled || open
  const linkClass = darkNav ? 'text-ink/65 hover:text-ink' : 'text-pearl/75 hover:text-pearl'

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        darkNav ? 'border-b border-ink/10 bg-pearl/92 backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-5 md:h-20 md:px-10">
        <Link
          to="/"
          className={`font-display shrink-0 text-[1.05rem] font-bold tracking-[-0.02em] transition-colors ${
            darkNav ? 'text-ink' : 'text-pearl'
          }`}
        >
          Riyadh <span className={darkNav ? 'text-gold' : 'text-gold-bright'}>500</span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
          {NAV_LINKS.map((item) => {
            const active =
              location.pathname === item.to || location.pathname.startsWith(`${item.to}/`)
            return (
              <Link
                key={item.to}
                to={item.to}
                aria-current={active ? 'page' : undefined}
                className={`text-[0.78rem] font-medium tracking-[0.08em] uppercase transition-colors ${
                  active ? (darkNav ? 'text-ink' : 'text-pearl') : linkClass
                }`}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>

        <div className="flex items-center gap-4">
          <Link
            to="/sectors"
            className={`hidden text-[0.72rem] font-semibold tracking-[0.04em] uppercase transition-colors sm:inline sm:text-[0.78rem] ${
              darkNav
                ? 'border-b border-gold pb-0.5 text-ink'
                : 'border-b border-pearl/50 pb-0.5 text-pearl hover:border-pearl'
            }`}
          >
            Browse sectors
          </Link>
          <button
            type="button"
            className={`inline-flex h-10 w-10 items-center justify-center lg:hidden ${
              darkNav ? 'text-ink' : 'text-pearl'
            }`}
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpenPath(open ? null : location.pathname)}
          >
            <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
            <svg width="20" height="14" viewBox="0 0 20 14" aria-hidden="true">
              {open ? (
                <path d="M2 2 L18 12 M18 2 L2 12" stroke="currentColor" strokeWidth="1.4" fill="none" />
              ) : (
                <path d="M0 1.2 H20 M0 7 H20 M0 12.8 H20" stroke="currentColor" strokeWidth="1.4" fill="none" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {open ? (
        <nav id="mobile-nav" aria-label="Mobile" className="border-t border-ink/10 bg-pearl px-5 py-6 lg:hidden">
          <ul className="flex flex-col gap-4">
            {NAV_LINKS.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className="font-display text-2xl font-bold tracking-[-0.03em] text-ink"
                  onClick={() => setOpenPath(null)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </header>
  )
}
