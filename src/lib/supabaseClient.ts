import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

const isConfigured = supabaseUrl && supabaseAnonKey

if (!isConfigured) {
  console.warn(
    '[TravayPei] Supabase non configuré : définis VITE_SUPABASE_URL et VITE_SUPABASE_ANON_KEY dans un fichier .env. L’app fonctionne en mode dégradé (auth désactivée).',
  )
}

// Valeurs par défaut pour éviter le crash si Supabase n’est pas configuré (dev local).
// L’auth échouera mais le site s’affichera. En production, configure les variables d’env.
export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder-anon-key',
  {
    auth: {
      persistSession: true,
      detectSessionInUrl: true,
    },
  },
)

