import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import type { Session } from '@supabase/supabase-js'
import { leaderBySlug } from '../content/example'
import { supabase } from '../lib/supabase'

type SheetMode = 'closed' | 'providers' | 'code' | 'done'
type PendingAction = 'vote' | 'nominate' | null

type SessionValue = {
  email: string | null
  userId: string | null
  voted: ReadonlySet<string>
  sheet: SheetMode
  pendingSlug: string | null
  pendingAction: PendingAction
  sheetError: string | null
  snackbar: string | null
  googleEnabled: boolean
  appleEnabled: boolean
  openVote: (slug: string) => void
  openAuth: (action: 'nominate') => void
  closeSheet: () => void
  sendCode: (email: string) => Promise<string | null>
  verifyCode: (email: string, token: string) => Promise<string | null>
  signInProvider: (provider: 'google' | 'apple') => Promise<string | null>
  undo: (slug: string) => Promise<void>
  dismissSnackbar: () => void
}

const SessionContext = createContext<SessionValue | null>(null)

const googleEnabled = import.meta.env.VITE_AUTH_GOOGLE === 'true'
const appleEnabled = import.meta.env.VITE_AUTH_APPLE === 'true'

export function SessionProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null)
  const [voted, setVoted] = useState<ReadonlySet<string>>(new Set())
  const [sheet, setSheet] = useState<SheetMode>('closed')
  const [pendingSlug, setPendingSlug] = useState<string | null>(null)
  const [pendingAction, setPendingAction] = useState<PendingAction>(null)
  const [sheetError, setSheetError] = useState<string | null>(null)
  const [snackbar, setSnackbar] = useState<string | null>(null)

  const loadVotes = useCallback(async (userId: string) => {
    const { data, error } = await supabase.from('user_votes').select('leader_slug').eq('user_id', userId)
    if (error || !data) return
    setVoted(new Set(data.map((row) => row.leader_slug)))
  }, [])

  useEffect(() => {
    let active = true
    supabase.auth.getSession().then(({ data }) => {
      if (!active) return
      setSession(data.session)
      if (data.session?.user.id) void loadVotes(data.session.user.id)
    })
    const { data: sub } = supabase.auth.onAuthStateChange((_event, next) => {
      setSession(next)
      if (next?.user.id) void loadVotes(next.user.id)
      else setVoted(new Set())
    })
    return () => {
      active = false
      sub.subscription.unsubscribe()
    }
  }, [loadVotes])

  const cast = useCallback(
    async (slug: string, userId: string) => {
      const { error } = await supabase.from('user_votes').insert({ user_id: userId, leader_slug: slug })
      if (error && !error.message.toLowerCase().includes('duplicate')) {
        return error.message
      }
      setVoted((current) => new Set(current).add(slug))
      setSnackbar(`Voted for ${leaderBySlug(slug)?.name ?? 'this profile'}`)
      return null
    },
    [],
  )

  const openVote = useCallback(
    (slug: string) => {
      setSheetError(null)
      if (voted.has(slug)) return
      const userId = session?.user.id
      if (!userId) {
        setPendingSlug(slug)
        setPendingAction('vote')
        setSheet('providers')
        return
      }
      void cast(slug, userId)
    },
    [cast, session?.user.id, voted],
  )

  const openAuth = useCallback((action: 'nominate') => {
    setSheetError(null)
    setPendingAction(action)
    setPendingSlug(null)
    setSheet('providers')
  }, [])

  const closeSheet = useCallback(() => {
    setSheet('closed')
    setSheetError(null)
  }, [])

  const sendCode = useCallback(async (email: string) => {
    const trimmed = email.trim().toLowerCase()
    const { error } = await supabase.auth.signInWithOtp({
      email: trimmed,
      options: { shouldCreateUser: true },
    })
    if (error) return error.message
    setSheet('code')
    setSheetError(null)
    return null
  }, [])

  const verifyCode = useCallback(
    async (email: string, token: string) => {
      const { data, error } = await supabase.auth.verifyOtp({
        email: email.trim().toLowerCase(),
        token: token.trim(),
        type: 'email',
      })
      if (error) return error.message
      const userId = data.session?.user.id
      if (userId) {
        setSession(data.session)
        if (pendingAction === 'vote' && pendingSlug) {
          const castError = await cast(pendingSlug, userId)
          if (castError) return castError
        }
      }
      setSheet(pendingAction === 'vote' ? 'done' : 'closed')
      setSheetError(null)
      return null
    },
    [cast, pendingAction, pendingSlug],
  )

  const signInProvider = useCallback(async (provider: 'google' | 'apple') => {
    const enabled = provider === 'google' ? googleEnabled : appleEnabled
    if (!enabled) {
      const label = provider === 'google' ? 'Google' : 'Apple'
      return `${label} sign-in is not switched on yet.`
    }
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: { redirectTo: window.location.href },
    })
    return error ? error.message : null
  }, [])

  const undo = useCallback(
    async (slug: string) => {
      const userId = session?.user.id
      if (!userId) return
      const { error } = await supabase.from('user_votes').delete().eq('user_id', userId).eq('leader_slug', slug)
      if (error) {
        setSnackbar('The vote could not be removed. Try again.')
        return
      }
      setVoted((current) => {
        const next = new Set(current)
        next.delete(slug)
        return next
      })
      setSnackbar(null)
    },
    [session?.user.id],
  )

  const value = useMemo<SessionValue>(
    () => ({
      email: session?.user.email ?? null,
      userId: session?.user.id ?? null,
      voted,
      sheet,
      pendingSlug,
      pendingAction,
      sheetError,
      snackbar,
      googleEnabled,
      appleEnabled,
      openVote,
      openAuth,
      closeSheet,
      sendCode,
      verifyCode,
      signInProvider,
      undo,
      dismissSnackbar: () => setSnackbar(null),
    }),
    [
      session,
      voted,
      sheet,
      pendingSlug,
      pendingAction,
      sheetError,
      snackbar,
      openVote,
      openAuth,
      closeSheet,
      sendCode,
      verifyCode,
      signInProvider,
      undo,
    ],
  )

  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
}

export function useSession() {
  const value = useContext(SessionContext)
  if (!value) throw new Error('useSession must be used inside SessionProvider')
  return value
}
