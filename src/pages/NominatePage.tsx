import { useState, type FormEvent } from 'react'
import { Seo } from '../components/Seo'
import { NewsletterForm } from '../components/NewsletterForm'
import { GROUPS, sectorBySlug } from '../content/example'
import { FALLBACK_SECTORS } from '../content/sectors'
import { pageMetaForPath } from '../content/seo'
import { currentAccessToken, insertMinimal } from '../lib/writes'
import { useSession } from '../state/session'

export function NominatePage() {
  const session = useSession()
  const [sent, setSent] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)
  const [group, setGroup] = useState(GROUPS[1].id)

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
        why: String(form.get('why') ?? ''),
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
      <div className="mx-auto max-w-3xl px-4 py-10 md:px-6">
        <p className="text-[15px] tracking-[0.14em] text-green uppercase">Nominate</p>
        <h1 className="mt-2 font-serif text-5xl text-balance">
          Put someone on the <span className="text-green italic">list</span>.
        </h1>
        <p className="mt-3 text-[16px] text-muted">
          Anyone can suggest a name. The team reviews every nomination before it goes live. Nothing here is public.
        </p>

        {sent ? (
          <div className="mt-8 border border-green bg-green-soft p-6">
            <h2 className="font-serif text-3xl">Nomination received</h2>
            <p className="mt-3 text-[16px]">
              Thank you. The nomination is in review. It is not on the public list.
            </p>
            <ol className="mt-4 grid gap-2 text-[15px]">
              <li>Received</li>
              <li className="font-semibold">In review (now)</li>
              <li>Decision</li>
            </ol>
          </div>
        ) : (
          <form className="mt-8 grid gap-4" onSubmit={onSubmit}>
            <Field label="Full name" name="name" placeholder="Example Nominee Name" />
            <Field label="Role" name="role" placeholder="Example role" />
            <Field label="Organisation" name="organisation" placeholder="Example organisation" />
            <fieldset>
              <legend className="text-[15px]">Group</legend>
              <div className="mt-2 flex flex-wrap gap-2">
                {GROUPS.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    aria-pressed={group === item.id}
                    onClick={() => setGroup(item.id)}
                    className={`min-h-11 rounded-full px-4 text-[15px] ${group === item.id ? 'bg-ink text-paper' : 'border border-line'}`}
                  >
                    {item.name}
                  </button>
                ))}
              </div>
            </fieldset>
            <label className="grid gap-2 text-[15px]">
              Sector
              <select name="sector" required className="min-h-11 border border-ink px-3 text-base" defaultValue={sectors[0]?.slug}>
                {sectors.map((sector) => (
                  <option key={sector.slug} value={sector.slug}>
                    {sector.name}
                  </option>
                ))}
              </select>
            </label>
            <Field label="Source link" name="source" placeholder="https://example.com" required={false} type="url" />
            <label className="grid gap-2 text-[15px]">
              Why they deserve a place
              <textarea name="why" required maxLength={600} rows={5} className="border border-ink px-3 py-2 text-base" placeholder="Example reasons, in a few lines." />
            </label>
            <Field label="Your email" name="email" type="email" placeholder="name@company.com" />
            <label className="flex min-h-11 items-start gap-3 text-[15px]">
              <input type="checkbox" required className="mt-1 h-5 w-5" />
              I am not nominating myself, and the details are accurate to my knowledge.
            </label>
            {error ? (
              <p role="alert" className="text-[15px]">
                {error}
              </p>
            ) : null}
            <button type="submit" disabled={busy} className="min-h-11 bg-green px-5 font-semibold text-paper">
              Submit nomination
            </button>
          </form>
        )}

        <section className="mt-12 bg-green p-6 text-paper">
          <h2 className="font-serif text-3xl">While you wait</h2>
          <NewsletterForm id="nominate-news" />
        </section>
        <p className="mt-4 text-[15px] text-muted">Sector sample: {sectorBySlug(sectors[0]?.slug ?? '')?.name}</p>
      </div>
    </>
  )
}

function Field({
  label,
  name,
  placeholder,
  type = 'text',
  required = true,
}: {
  label: string
  name: string
  placeholder: string
  type?: string
  required?: boolean
}) {
  return (
    <label className="grid gap-2 text-[15px]">
      {label}
      <input name={name} type={type} required={required} placeholder={placeholder} className="min-h-11 border border-ink px-3 text-base" />
    </label>
  )
}
