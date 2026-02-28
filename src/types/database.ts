/**
 * Types pour les tables Supabase.
 */

export type JobContract = 'cdi' | 'cdd' | 'interim' | 'alternance'
export type JobIcon = 'admin' | 'dev' | 'commercial'

export interface JobRow {
  id: string
  title: string
  company: string
  contract: JobContract
  location: string
  salary_display: string | null
  badge: string | null
  badge_highlight: boolean
  icon: JobIcon | null
  meta: string[]
  posted_at: string
  created_at: string
}
