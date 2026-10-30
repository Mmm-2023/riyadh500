import { useState, type FormEvent } from 'react'
import { leaderBySlug } from '../content/example'
import { useSession } from '../state/session'

export function VoteSheet() {
  const session = useSession()
  const leader = session.pendingSlug ? leaderBySlug(session.pendingSlug) : undefined
  const [email, setEmail] = useState('')
  const [digits, setDigits] = useState(['', '', '', '', '', ''])
  const [busy, setBusy] = useState(false)
  const [localError, setLocalError] = useState<string | null>(null)

  if (session.sheet === 'closed') return null

  const error = localError ?? session.sheetError
  const title =
    session.sheet === 'code'
      ? 'Enter your code'
      : session.sheet === 'done'
        ? 'Voted and verified'
        : session.pendingAction === 'nominate'
          ? 'Sign in to nominate'
          : 'One quick step, then vote'

  async function onSend(event: FormEvent) {
    event.preventDefault()
    setBusy(true)
    setLocalError(null)
    const message = await session.sendCode(email)
    setBusy(false)
    if (message) setLocalError(message)
  }

  async function onVerify(event: FormEvent) {
    event.preventDefault()
    setBusy(true)
    setLocalError(null)
    const message = await session.verifyCode(email, digits.join(''))
    setBusy(false)
    if (message) setLocalError(message)
  }

  async function onProvider(provider: 'google' | 'apple') {
    setBusy(true)
    setLocalError(null)
    const message = await session.signInProvider(provider)
    setBusy(false)
    if (message) setLocalError(message)
  }

  return (
    <div className="fixed inset-0 z-[70] flex items-end justify-center bg-ink/50 md:items-center" role="presentation">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="vote-sheet-title"
        className="max-h-[92dvh] w-full overflow-y-auto bg-paper p-5 shadow-none md:max-w-md md:p-8"
      >
        <div className="mb-4 flex items-start justify-between gap-4">
          <p className="text-[15px] tracking-[0.14em] text-muted uppercase">Sign in</p>
          <button type="button" className="min-h-11 min-w-11 text-[15px]" onClick={session.closeSheet}>
            Close
          </button>
        </div>
        <h2 id="vote-sheet-title" className="font-serif text-4xl leading-none text-balance">
          {title}
        </h2>
        {leader ? (
          <p className="mt-3 text-[15px] text-muted">
            Voting for {leader.name}. Example profile.
          </p>
        ) : (
          <p className="mt-3 text-[15px] text-muted">
            Your first vote or nomination uses an email code. Google and Apple stay off until they are switched on.
          </p>
        )}

        {session.sheet === 'providers' ? (
          <div className="mt-6 grid gap-3">
            <button
              type="button"
              className="min-h-11 bg-ink px-4 text-[15px] font-semibold text-paper"
              onClick={() => void onProvider('apple')}
              disabled={busy}
            >
              Continue with Apple
            </button>
            <button
              type="button"
              className="min-h-11 border border-ink px-4 text-[15px] font-semibold"
              onClick={() => void onProvider('google')}
              disabled={busy}
            >
              Continue with Google
            </button>
            <form className="mt-2 grid gap-3" onSubmit={onSend}>
              <label className="grid gap-2 text-[15px]" htmlFor="vote-email">
                Email
                <input
                  id="vote-email"
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="min-h-11 border border-ink px-3 text-base"
                  placeholder="name@company.com"
                />
              </label>
              <button type="submit" className="min-h-11 bg-green px-4 font-semibold text-paper" disabled={busy}>
                Email me a code
              </button>
            </form>
          </div>
        ) : null}

        {session.sheet === 'code' ? (
          <form className="mt-6 grid gap-4" onSubmit={onVerify}>
            <p className="text-[15px]">We sent a 6 digit code to {email || 'your email'}.</p>
            <div className="flex gap-2">
              {digits.map((digit, index) => (
                <input
                  key={index}
                  inputMode="numeric"
                  autoComplete={index === 0 ? 'one-time-code' : 'off'}
                  maxLength={1}
                  aria-label={`Digit ${index + 1}`}
                  value={digit}
                  onChange={(event) => {
                    const next = event.target.value.replace(/\D/g, '').slice(-1)
                    setDigits((current) => current.map((value, i) => (i === index ? next : value)))
                    const sibling = event.target.nextElementSibling
                    if (next && sibling instanceof HTMLInputElement) sibling.focus()
                  }}
                  className="h-12 w-11 border border-ink text-center text-xl"
                />
              ))}
            </div>
            <button type="submit" className="min-h-11 bg-green px-4 font-semibold text-paper" disabled={busy}>
              Verify and vote
            </button>
            <button
              type="button"
              className="min-h-11 text-[15px] underline"
              onClick={() => void session.sendCode(email)}
            >
              Send a new code
            </button>
          </form>
        ) : null}

        {session.sheet === 'done' ? (
          <div className="mt-6 grid gap-4">
            <p className="text-[15px]">Your vote is counted. Later votes are one tap, with Undo.</p>
            <button type="button" className="min-h-11 bg-ink px-4 font-semibold text-paper" onClick={session.closeSheet}>
              Keep voting
            </button>
          </div>
        ) : null}

        {error ? (
          <p className="mt-4 text-[15px]" role="alert">
            {error}
          </p>
        ) : null}
      </div>
    </div>
  )
}
