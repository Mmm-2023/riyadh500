import { useState, type FormEvent } from 'react'
import { Portrait } from './Portrait'
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
  const nominate = session.pendingAction === 'nominate'

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

  return (
    <div className="fixed inset-0 z-[70] bg-ink/60" role="presentation">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="vote-sheet-title"
        className="absolute inset-x-0 bottom-0 max-h-[92dvh] overflow-y-auto rounded-t-[28px] bg-white px-5 pt-3 pb-8 lg:inset-auto lg:top-1/2 lg:left-1/2 lg:w-[440px] lg:-translate-x-1/2 lg:-translate-y-1/2 lg:rounded-[28px] lg:px-8 lg:pt-8"
      >
        <div className="mx-auto mb-4 h-1.5 w-12 rounded-full bg-n-300 lg:hidden" />
        {session.sheet === 'code' ? (
          <button type="button" className="mb-1 inline-flex min-h-11 items-center font-semibold" onClick={() => session.openVote(session.pendingSlug ?? '')}>
            Back
          </button>
        ) : null}
        <div className="flex items-start justify-between gap-3">
          <h2 id="vote-sheet-title" className="font-serif text-4xl leading-9">
            {session.sheet === 'code' ? (
              <>
                Enter your <em className="text-g-600 italic">code</em>
              </>
            ) : session.sheet === 'done' ? (
              'Voted, and verified'
            ) : nominate ? (
              'Sign in to nominate'
            ) : (
              <>
                One quick step, then <em className="text-g-600 italic">vote</em>.
              </>
            )}
          </h2>
          <button type="button" className="-mt-1 -mr-2 flex h-11 w-11 items-center justify-center" aria-label="Close" onClick={session.closeSheet}>
            Close
          </button>
        </div>

        {session.sheet === 'providers' ? (
          <>
            <p className="mt-2 text-[16px] leading-6 text-n-700">
              To keep the list honest, every voter is a real person. Verify once, then keep voting.
            </p>
            {leader ? (
              <div className="mt-4 flex items-center gap-3 border border-ink p-2.5">
                <Portrait variant={leader.portrait} className="h-14 w-11" />
                <div>
                  <p className="text-[15px] leading-5 text-n-600">You are voting for</p>
                  <p className="text-[17px] leading-[22px] font-bold">{leader.name}</p>
                </div>
              </div>
            ) : null}
            <div className="mt-4 flex flex-col gap-3">
              <button type="button" className="btn-pill w-full bg-ink text-white" disabled={busy} onClick={() => void session.signInProvider('apple').then((message) => message && setLocalError(message))}>
                Continue with Apple
              </button>
              <button type="button" className="btn-pill w-full border-[1.5px] border-ink" disabled={busy} onClick={() => void session.signInProvider('google').then((message) => message && setLocalError(message))}>
                Continue with Google
              </button>
            </div>
            <div className="my-4 flex items-center gap-3 text-[15px] text-n-500">
              <span className="h-px flex-1 bg-n-300" />
              or use your email
              <span className="h-px flex-1 bg-n-300" />
            </div>
            <form className="flex gap-2" onSubmit={onSend}>
              <label className="sr-only" htmlFor="vote-email">
                Email
              </label>
              <input id="vote-email" type="email" required autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="name@company.com" className="field min-w-0 flex-1 rounded-full" />
              <button type="submit" className="btn-pill shrink-0 bg-g-600 px-5 text-white" disabled={busy}>
                Send code
              </button>
            </form>
            <p className="mt-4 text-[15px] leading-[22px] text-n-600">We use your email only to verify you. One vote per leader.</p>
          </>
        ) : null}

        {session.sheet === 'code' ? (
          <form onSubmit={onVerify}>
            <p className="mt-2 text-[16px] leading-6 text-n-700">We sent a 6 digit code to {email || 'your email'}.</p>
            <div className="mt-5 flex justify-between gap-2">
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
                  className={`flex h-14 w-11 items-center justify-center border-[1.5px] text-center font-serif text-[32px] ${digit ? 'border-g-600 bg-g-50' : 'border-ink'}`}
                />
              ))}
            </div>
            <button type="submit" className="btn-pill mt-6 w-full bg-g-600 text-white" disabled={busy}>
              Verify and vote
            </button>
            <button type="button" className="mt-3 min-h-11 text-[16px] font-semibold underline underline-offset-4" onClick={() => void session.sendCode(email)}>
              Resend code
            </button>
          </form>
        ) : null}

        {session.sheet === 'done' ? (
          <div className="mt-4">
            <p className="text-[16px] leading-6 text-n-700">The pick is counted. Later votes are one tap, with Undo.</p>
            <button type="button" className="btn-pill mt-6 w-full bg-ink text-white" onClick={session.closeSheet}>
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
