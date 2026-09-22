import { Link } from 'react-router-dom'
import type { LeaderCard } from '../lib/data'

export function LeaderList({
  leaders,
  error,
  showSector = false,
}: {
  leaders: LeaderCard[]
  error: boolean
  showSector?: boolean
}) {
  if (error) {
    return (
      <div className="border border-ink/10 bg-sand px-6 py-12" role="status">
        <h2 className="font-display text-2xl font-bold tracking-[-0.03em] text-ink">
          Leaders coming soon
        </h2>
        <p className="mt-3 max-w-xl text-ink/70">
          The published list could not be loaded just now. No names are shown in its place.
        </p>
      </div>
    )
  }

  if (leaders.length === 0) {
    return (
      <div className="border border-dashed border-ink/20 bg-sand/70 px-6 py-14" role="status">
        <h2 className="font-display text-3xl font-bold tracking-[-0.03em] text-ink">
          Leaders coming soon
        </h2>
        <p className="mt-3 max-w-xl text-[1.02rem] leading-relaxed text-ink/70">
          No published profiles yet. This list stays empty until leaders go live.
        </p>
      </div>
    )
  }

  return (
    <ol className="divide-y divide-ink/10 border border-ink/10">
      {leaders.map((leader, index) => (
        <li key={leader.id} className="grid gap-3 bg-pearl px-5 py-5 sm:grid-cols-[auto_1fr_auto] sm:items-center">
          <span className="font-serif text-2xl text-gold italic">{String(index + 1).padStart(2, '0')}</span>
          <div className="min-w-0">
            <p className="font-display text-xl font-bold tracking-[-0.03em] text-ink">{leader.name}</p>
            <p className="mt-1 text-sm text-ink/65">
              {[leader.headline_role, leader.company].filter(Boolean).join(', ') || 'Profile published'}
            </p>
            {showSector && leader.sector_slug && leader.sector_name ? (
              <Link
                to={`/sectors/${leader.sector_slug}`}
                className="mt-2 inline-block text-sm text-gold hover:text-ink"
              >
                {leader.sector_name}
              </Link>
            ) : null}
          </div>
          <p className="text-sm tracking-wide text-ink/70 sm:text-right">
            {leader.vote_count} {leader.vote_count === 1 ? 'vote' : 'votes'}
          </p>
        </li>
      ))}
    </ol>
  )
}
