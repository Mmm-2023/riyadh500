import { useState, type FormEvent } from 'react'
import { PARTNER_LINE } from '../content/example'
import { insertMinimal } from '../lib/writes'

export function NewsletterForm({
  id = 'newsletter-email',
  tone = 'green',
  bare = false,
}: {
  id?: string
  tone?: 'green' | 'paper'
  bare?: boolean
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
          className={
            bare
              ? 'min-h-[52px] flex-1 border-[1.5px] border-white bg-transparent px-3.5 text-[16px] text-white placeholder:text-white/70'
              : `min-h-11 flex-1 px-3 text-base text-ink ${tone === 'green' ? 'border border-white/40 bg-white' : 'border border-ink bg-white'}`
          }
        />
        <button type="submit" className={`btn-pill w-full sm:w-auto ${bare || tone === 'green' ? 'bg-white text-ink' : 'bg-g-600 text-white'}`}>
          Subscribe
        </button>
      </div>
      <p className={`text-[15px] leading-[22px] ${bare || tone === 'green' ? 'text-white/85' : 'text-muted'}`}>
        {bare ? 'Presented by [Example Partner]. Unsubscribe any time.' : PARTNER_LINE}
      </p>
      {status !== 'idle' ? (
        <p className="text-[15px]" role="status">
          {message}
        </p>
      ) : null}
    </form>
  )
}
