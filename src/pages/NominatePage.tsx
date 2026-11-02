import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { NewsletterForm } from '../components/NewsletterForm'
import { Seo } from '../components/Seo'
import { GROUPS } from '../content/example'
import { FALLBACK_SECTORS } from '../content/sectors'
import { pageMetaForPath } from '../content/seo'
import { currentAccessToken, insertMinimal } from '../lib/writes'
import { useSession } from '../state/session'

export function NominatePage() {
  const session = useSession()
  const [sent, setSent] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)
  const [group, setGroup] = useState('private')
  const [why, setWhy] = useState('')
  const sectors = FALLBACK_SECTORS.filter((sector) => GROUPS.find((item) => item.id === group)?.sectors.includes(sector.slug))

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!session.userId) {
      session.openAuth('nominate')
      setError('Sign in with an email code, then submit again.')
      return
    }
    const form = new FormData(event.currentTarget)
    setBusy(true)
    setError(null)
    const token = await currentAccessToken()
    const result = await insertMinimal(
      'nominations',
      {
        user_id: session.userId,
        nominee_name: String(form.get('name') ?? ''),
        role: String(form.get('role') ?? ''),
        organisation: String(form.get('organisation') ?? ''),
        group_name: GROUPS.find((item) => item.id === group)?.name ?? group,
        sector_slug: String(form.get('sector') ?? ''),
        source_url: String(form.get('source') ?? '') || null,
        why,
        contact_email: String(form.get('email') ?? ''),
        status: 'in_review',
      },
      token,
    )
    setBusy(false)
    if (!result.ok) {
      setError('The nomination could not be saved. Try again.')
      return
    }
    setSent(true)
  }

  return (
    <>
      <Seo meta={pageMetaForPath('/nominate')} />
      <section className="bg-white">
        <div className="mx-auto grid max-w-[1360px] items-end gap-5 px-5 pt-8 pb-6 lg:grid-cols-12 lg:px-10 lg:pt-14 lg:pb-10">
          <div className="lg:col-span-8">
            <p className="text-[15px] leading-5 font-bold tracking-[0.09em] text-g-600 uppercase">Nominate</p>
            <h1 className="mt-2 font-serif text-[56px] leading-[52px] lg:text-[104px] lg:leading-[92px]">
              Put someone <em className="text-g-600 italic">on the list</em>
            </h1>
          </div>
          <p className="text-[17px] leading-[26px] text-n-700 lg:col-span-4">
            Anyone can nominate. About a minute, on your phone. Our team reviews every nomination before it goes live.
          </p>
        </div>
        <div className="mx-auto max-w-[1360px] px-5 pb-6 lg:px-10">
          <div className="flex items-center gap-2 border-y border-ink py-3">
            <span className="text-[15px] font-bold">{sent ? 'Step 2 of 2' : 'Step 1 of 2'}</span>
            <span className="h-1.5 flex-1 bg-n-200">
              <span className={`block h-full bg-g-600 ${sent ? 'w-full' : 'w-1/2'}`} />
            </span>
            <span className="text-[15px] text-n-600">Details, then confirmation</span>
          </div>
        </div>
      </section>
      <section className="bg-white">
        <div className="mx-auto grid max-w-[1360px] gap-10 px-5 pb-14 lg:grid-cols-12 lg:gap-16 lg:px-10">
          <div className="lg:col-span-7">
            <p className="mb-5 text-[15px] leading-5 font-bold tracking-[0.09em] text-g-600 uppercase">1. Nomination details</p>
            {sent ? (
              <p className="text-[17px]">Your nomination is in review. It is not on the public list.</p>
            ) : (
              <form className="grid gap-6" onSubmit={onSubmit}>
                <div className="grid gap-6 sm:grid-cols-2">
                  <label className="block">
                    <span className="mb-2 block text-[16px] leading-[22px] font-bold">Full name</span>
                    <input name="name" required placeholder="Example Nominee Name" className="field" />
                  </label>
                  <label className="block">
                    <span className="mb-2 block text-[16px] leading-[22px] font-bold">Role</span>
                    <input name="role" required placeholder="Chief Executive" className="field" />
                  </label>
                </div>
                <label className="block">
                  <span className="mb-2 block text-[16px] leading-[22px] font-bold">Organisation</span>
                  <input name="organisation" required placeholder="Example Organisation" className="field" />
                </label>
                <div>
                  <p className="mb-2 text-[16px] leading-[22px] font-bold">
                    Group
                    <span className="mt-0.5 block text-[15px] leading-5 font-normal text-n-600">Pick the one that fits best.</span>
                  </p>
                  <div className="flex gap-2">
                    {GROUPS.map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        aria-pressed={group === item.id}
                        onClick={() => setGroup(item.id)}
                        className={`flex min-h-[76px] flex-1 flex-col items-center justify-center border-[1.5px] px-1 text-center text-[15px] leading-[18px] font-semibold ${group === item.id ? 'border-g-600 bg-g-600 text-white' : 'border-ink'}`}
                      >
                        {item.name}
                      </button>
                    ))}
                  </div>
                </div>
                <label className="block">
                  <span className="mb-2 block text-[16px] font-bold">Sector</span>
                  <select name="sector" className="field" defaultValue={sectors[0]?.slug}>
                    {sectors.map((sector) => (
                      <option key={sector.slug} value={sector.slug}>
                        {sector.name.replace(' & ', ' and ')}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="block">
                  <span className="mb-2 block text-[16px] font-bold">
                    Source link
                    <span className="mt-0.5 block text-[15px] font-normal text-n-600">A public page that confirms their role.</span>
                  </span>
                  <input name="source" type="url" placeholder="https://example.com/source" className="field" />
                </label>
                <label className="block">
                  <span className="mb-2 block text-[16px] font-bold">Why they deserve a place</span>
                  <textarea
                    required
                    maxLength={400}
                    value={why}
                    onChange={(event) => setWhy(event.target.value)}
                    placeholder="Example reasoning goes here. A sentence or two on what they have led and why it matters to Riyadh."
                    className="field min-h-[132px] py-3"
                  />
                  <p className="mt-1 text-right text-[15px] text-n-500">{why.length} of 400 characters</p>
                </label>
                <label className="block">
                  <span className="mb-2 block text-[16px] font-bold">
                    Your email
                    <span className="mt-0.5 block text-[15px] font-normal text-n-600">So we can tell you the outcome. Never shown publicly.</span>
                  </span>
                  <input name="email" type="email" required placeholder="name@company.com" className="field" />
                </label>
                <label className="flex min-h-11 items-start gap-3 text-[16px] leading-6">
                  <input type="checkbox" required className="mt-1 h-6 w-6 accent-[#006C35]" />
                  I am not nominating myself, and the details are accurate to my knowledge.
                </label>
                {error ? (
                  <p role="alert" className="text-[15px]">
                    {error}
                  </p>
                ) : null}
                <button type="submit" disabled={busy} className="btn-pill w-full bg-g-600 text-white lg:w-auto lg:px-10">
                  Submit nomination
                </button>
              </form>
            )}
          </div>
          <aside className="self-start border-t-2 border-ink pt-8 lg:col-span-5 lg:sticky lg:top-6 lg:border-t-0 lg:pt-0">
            <p className="mb-5 text-[15px] leading-5 font-bold tracking-[0.09em] text-g-600 uppercase">2. After you submit</p>
            <div className="border-[1.5px] border-ink bg-g-50">
              <div className="flex items-center gap-4 bg-g-600 p-5 text-white">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white font-bold text-g-600">OK</span>
                <div>
                  <p className="text-[15px] font-bold tracking-[0.09em] text-g-200 uppercase">Confirmation state</p>
                  <p className="font-serif text-[34px] leading-[34px]">Nomination received</p>
                </div>
              </div>
              <div className="p-5">
                <p className="text-[17px] leading-[26px]">
                  Thank you. Every nomination is reviewed by our team before anyone is added to the list. We will email you the outcome.
                </p>
                <p className="mt-3 text-[15px] leading-[22px] text-n-700">
                  Reference <b className="border border-ink bg-white px-2 py-0.5">EXAMPLE-0001</b> (example reference)
                </p>
                <ol className="mt-4 border-t border-ink pt-2">
                  <li className="flex items-center gap-3 py-2 font-bold">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-g-600 text-[15px] text-white">1</span>
                    Received
                  </li>
                  <li className="flex items-center gap-3 py-2 font-bold">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-g-600 text-[15px] text-white">2</span>
                    In review (now)
                  </li>
                  <li className="flex items-center gap-3 py-2 text-n-500">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-n-300 text-[15px]">3</span>
                    Decision
                  </li>
                </ol>
                {sent ? (
                  <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                    <button type="button" className="btn-pill bg-g-600 text-white" onClick={() => setSent(false)}>
                      Nominate another leader
                    </button>
                    <Link to="/leaderboard" className="btn-pill border-[1.5px] border-ink bg-white">
                      Back to the list
                    </Link>
                  </div>
                ) : null}
              </div>
            </div>
            <div className="mt-4 bg-ink p-5 text-white">
              <p className="text-[15px] font-bold tracking-[0.09em] text-g-400 uppercase">While you wait</p>
              <p className="mt-1 font-serif text-[32px] leading-8">Get the weekly, and see the decision first.</p>
              <div className="mt-4">
                <NewsletterForm id="nominate-news" bare />
              </div>
            </div>
          </aside>
        </div>
      </section>
    </>
  )
}
