import { useState, type FormEvent } from 'react'
import { PARTNER_LINE } from '../content/example'
import { insertMinimal } from '../lib/writes'

export function NewsletterForm({
  id = 'newsletter-email',
  tone = 'green',
}: {
  id?: string
  tone?: 'green' | 'paper'
}) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'done' | 'error'>('idle')
  const [message, setMessage] = useState('')

  async function onSubmit(event: FormEvent) {
    event.preventDefault()
    const value = email.trim().toLowerCase()
    const result = await insertMinimal('subscribers', { email: value })
    if (!result.ok) {
      const duplicate = result.status === 409 || result.message.toLowerCase().includes('duplicate')
      setStatus('error')
      setMessage(duplicate ? 'That email is already on the list.' : 'The list could not be updated. Try again.')
      return
    }
    setStatus('done')
    setMessage('You are on the list.')
    setEmail('')
  }

  return (
    <form className="grid gap-3" onSubmit={onSubmit}>
      <label className="sr-only" htmlFor={id}>
        Email
      </label>
      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          id={id}
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="name@company.com"
          className={`min-h-11 flex-1 px-3 text-base text-ink ${tone === 'green' ? 'border border-paper/40 bg-paper' : 'border border-ink bg-paper'}`}
        />
        <button
          type="submit"
          className={`min-h-11 px-5 font-semibold ${tone === 'green' ? 'bg-ink text-paper' : 'bg-green text-paper'}`}
        >
          Subscribe
        </button>
      </div>
      <p className={`text-[15px] ${tone === 'green' ? 'text-paper/85' : 'text-muted'}`}>{PARTNER_LINE}</p>
      {status !== 'idle' ? (
        <p className="text-[15px]" role="status">
          {message}
        </p>
      ) : null}
    </form>
  )
}
