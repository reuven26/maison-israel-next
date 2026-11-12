import { createClient as createSupabaseClient } from '@supabase/supabase-js'

/**
 * Client Supabase « public » sans cookies ni session.
 * À utiliser UNIQUEMENT pour des lectures de données publiques (biens actifs,
 * réglages du site, etc.) dans des pages qu'on veut mettre en cache (ISR).
 *
 * Contrairement au client de `server.ts` (qui lit les cookies et force le rendu
 * dynamique), celui-ci n'accède à aucune API dynamique : la page reste donc
 * statiquement générée et régénérée via `revalidate`, servie depuis le edge.
 */
export function createPublicClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { auth: { persistSession: false, autoRefreshToken: false } }
  )
}
