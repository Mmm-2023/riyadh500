import { Link } from 'react-router-dom'
import { sectorBySlug, type ExampleLeader } from '../content/example'
import { useSession } from '../state/session'
import { Silhouette } from './Silhouette'

export function LeaderCard({ leader, compact = false }: { leader: ExampleLeader; compact?: boolean }) {
  const session = useSession()
  const voted = session.voted.has(leader.slug)
  const sector = sectorBySlug(leader.sectorSlug)
  const votes = leader.votes + (voted ? 1 : 0)

  return (
    <article className={`flex h-full flex-col border border-line bg-paper ${compact ? 'min-w-[78%] snap-start' : ''}`}>
      <Link to={`/leaders/${leader.slug}`} className="block">
        <Silhouette tone={leader.tone} className="aspect-[4/5] w-full" />
      </Link>
      <div className="flex flex-1 flex-col gap-3 p-4">
        <p className="text-[15px] tracking-[0.12em] text-green uppercase">Example</p>
        <h3 className="font-serif text-2xl leading-tight">
          <Link to={`/leaders/${leader.slug}`}>{leader.name}</Link>
        </h3>
        <p className="text-[15px] text-muted">
          {leader.role}, {leader.organisation}
        </p>
        {sector ? <p className="text-[15px]">{sector.name}</p> : null}
        <div className="mt-auto flex items-center justify-between gap-3 pt-2">
          <p className="tabular text-[15px]">{votes.toLocaleString('en-GB')} votes</p>
          <button
            type="button"
            className={`min-h-11 px-4 text-[15px] font-semibold ${voted ? 'bg-green-soft text-green' : 'bg-green text-paper'}`}
            onClick={() => (voted ? void session.undo(leader.slug) : session.openVote(leader.slug))}
            aria-pressed={voted}
          >
            {voted ? 'Voted' : 'Vote'}
          </button>
        </div>
      </div>
    </article>
  )
}
