import { supabase } from './supabase'

const url = import.meta.env.VITE_SUPABASE_URL
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export async function insertMinimal(
  table: 'nominations' | 'subscribers',
  row: Record<string, string | null>,
  accessToken?: string | null,
): Promise<{ ok: true } | { ok: false; status: number; message: string }> {
  const response = await fetch(`${url}/rest/v1/${table}`, {
    method: 'POST',
    headers: {
      apikey: anonKey,
      Authorization: `Bearer ${accessToken || anonKey}`,
      'Content-Type': 'application/json',
      Prefer: 'return=minimal',
    },
    body: JSON.stringify(row),
  })
  if (response.ok) return { ok: true }
  const body = (await response.json().catch(() => ({}))) as { message?: string; code?: string }
  return { ok: false, status: response.status, message: body.message || body.code || 'Insert failed' }
}

export async function currentAccessToken() {
  const { data } = await supabase.auth.getSession()
  return data.session?.access_token ?? null
}
