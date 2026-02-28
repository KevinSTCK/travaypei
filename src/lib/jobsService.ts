/**
 * Service des offres d'emploi.
 * Récupère les données depuis Supabase avec fallback sur les mocks.
 */

import { supabase } from './supabaseClient'
import type { JobRow } from '../types/database'
import type { JobPreview, JobOffer } from '../data/jobs'
import { LATEST_JOBS, ALL_JOBS } from '../data/jobs'

const isConfigured = () => {
  const url = import.meta.env.VITE_SUPABASE_URL
  const key = import.meta.env.VITE_SUPABASE_ANON_KEY
  return !!(url && key && url !== 'https://placeholder.supabase.co')
}

function formatPostedAt(isoDate: string): string {
  const date = new Date(isoDate)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))
  if (diffDays === 0) return "Aujourd'hui"
  if (diffDays === 1) return 'Il y a 1 jour'
  if (diffDays < 7) return `Il y a ${diffDays} jours`
  if (diffDays < 30) return `Il y a ${Math.floor(diffDays / 7)} sem.`
  return `Il y a ${Math.floor(diffDays / 30)} mois`
}

function rowToPreview(row: JobRow): JobPreview {
  return {
    id: row.id,
    title: row.title,
    company: row.company,
    contract: row.contract.toUpperCase(),
    salary: row.salary_display || '',
    posted: formatPostedAt(row.posted_at),
    icon: (row.icon || 'admin') as JobPreview['icon'],
  }
}

function rowToOffer(row: JobRow): JobOffer {
  const meta = Array.isArray(row.meta) ? row.meta : []
  return {
    id: row.id,
    company: row.company,
    badge: row.badge || undefined,
    badgeHighlight: row.badge_highlight,
    title: row.title,
    meta,
    salary: row.salary_display || undefined,
  }
}

export type JobsFilters = {
  query?: string
  contracts?: string[]
  locations?: string[]
  sort?: 'recent' | 'salary_desc' | 'location'
}

export async function fetchLatestJobs(limit = 6): Promise<JobPreview[]> {
  if (!isConfigured()) {
    return LATEST_JOBS.slice(0, limit)
  }
  const { data, error } = await supabase
    .from('jobs')
    .select('*')
    .order('posted_at', { ascending: false })
    .limit(limit)
  if (error) {
    console.warn('[TravayPei] Erreur fetch jobs:', error.message)
    return LATEST_JOBS.slice(0, limit)
  }
  return (data as JobRow[]).map(rowToPreview)
}

export async function fetchJobs(filters: JobsFilters = {}): Promise<JobOffer[]> {
  if (!isConfigured()) {
    return applyMockFilters(ALL_JOBS, filters)
  }

  let query = supabase.from('jobs').select('*')

  if (filters.query?.trim()) {
    const q = filters.query.trim().replace(/'/g, "''")
    query = query.or(`title.ilike.%${q}%,company.ilike.%${q}%`)
  }
  if (filters.contracts && filters.contracts.length > 0) {
    query = query.in('contract', filters.contracts)
  }
  if (filters.locations && filters.locations.length > 0) {
    query = query.in('location', filters.locations)
  }

  switch (filters.sort) {
    case 'salary_desc':
      query = query.order('salary_display', { ascending: false })
      break
    case 'location':
      query = query.order('location', { ascending: true })
      break
    default:
      query = query.order('posted_at', { ascending: false })
  }

  const { data, error } = await query
  if (error) {
    console.warn('[TravayPei] Erreur fetch jobs:', error.message)
    return applyMockFilters(ALL_JOBS, filters)
  }
  return (data as JobRow[]).map(rowToOffer)
}

function applyMockFilters(jobs: JobOffer[], filters: JobsFilters): JobOffer[] {
  let result = [...jobs]
  if (filters.query?.trim()) {
    const q = filters.query.toLowerCase()
    result = result.filter(
      (j) =>
        j.title.toLowerCase().includes(q) || j.company.toLowerCase().includes(q)
    )
  }
  return result
}
