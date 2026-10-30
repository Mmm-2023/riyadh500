import { Link, useParams } from 'react-router-dom'
import { Seo } from '../components/Seo'
import { Silhouette } from '../components/Silhouette'
import {
  PARTNER_LINE,
  RANK_LINE,
  groupForSector,
  leaderBySlug,
  sectorBySlug,
} from '../content/example'
import { pageMetaForPath, profileMeta } from '../content/seo'
import { useSession } from '../state/session'

export function ProfilePage() {
  const { slug = '' } = useParams()
  const leader = leaderBySlug(slug)
  const session = useSession()

  if (!leader) {
    return (
      <>
        <Seo meta={pageMetaForPath('/leaderboard')} />
        <div className="mx-auto max-w-3xl px-4 py-16">
          <h1 className="font-serif text-5xl">Profile not found.</h1>
          <p className="mt-4 text-[16px]">That example profile is not on this list.</p>
          <Link to="/leaderboard" className="mt-6 inline-flex min-h-11 items-center bg-ink px-5 text-paper">
            Back to the leaderboard
          </Link>
        </div>
      </>
    )
  }

  const sector = sectorBySlug(leader.sectorSlug)
  const group = groupForSector(leader.sectorSlug)
  const voted = session.voted.has(leader.slug)
  const votes = leader.votes + (voted ? 1 : 0)

  return (
    <>
      <Seo meta={profileMeta(leader)} />
      <article className="mx-auto grid max-w-6xl gap-8 px-4 py-10 md:grid-cols-[0.9fr_1.1fr] md:px-6">
        <Silhouette tone={leader.tone} className="w-full" />
        <div>
          <p className="text-[15px] text-green">
            <Link to="/browse">Browse</Link>
            {' / '}
            <Link to={`/leaderboard?sector=${leader.sectorSlug}`}>{sector?.name}</Link>
          </p>
          <p className="mt-4 text-[15px] tracking-[0.14em] text-green uppercase">Example profile</p>
          <h1 className="mt-2 font-serif text-5xl">{leader.name}</h1>
          <p className="mt-3 text-[17px]">
            {leader.role}, {leader.organisation}
          </p>
          <p className="mt-2 text-[15px] text-muted">
            {group?.name}. {sector?.name}. Up to {sector?.cap} places in this sector.
          </p>
          <p className="tabular mt-6 font-serif text-5xl">{votes.toLocaleString('en-GB')}</p>
          <p className="text-[15px]">example votes</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <button
              type="button"
              className={`min-h-11 px-5 font-semibold ${voted ? 'bg-green-soft text-green' : 'bg-green text-paper'}`}
              onClick={() => (voted ? void session.undo(leader.slug) : session.openVote(leader.slug))}
            >
              {voted ? 'Voted' : 'Vote'}
            </button>
            {voted ? (
              <button type="button" className="min-h-11 px-4 underline" onClick={() => void session.undo(leader.slug)}>
                Undo
              </button>
            ) : null}
          </div>
          <p className="mt-4 text-[15px]">{PARTNER_LINE}</p>
          <p className="mt-1 text-[15px]">{RANK_LINE}</p>
          <section className="mt-10 border-t border-line pt-6">
            <h2 className="font-serif text-3xl">Example background</h2>
            <p className="mt-3 text-[16px]">{leader.summary}</p>
          </section>
          <section className="mt-8 border-t border-line pt-6">
            <h2 className="font-serif text-3xl">Example track record</h2>
            <p className="mt-3 text-[16px]">Example point. Added as sample copy, not a real achievement.</p>
          </section>
        </div>
      </article>
    </>
  )
}
