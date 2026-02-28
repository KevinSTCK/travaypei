/**
 * Page liste des offres : filtres + résultats.
 */

import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { JobFilters, JobList } from '../components/jobs'
import { fetchJobs, type JobsFilters } from '../lib/jobsService'
import type { JobOffer } from '../data/jobs'

function OffresPage() {
  const [searchParams] = useSearchParams()
  const urlQuery = searchParams.get('q') ?? searchParams.get('query') ?? ''
  const [filters, setFilters] = useState<JobsFilters>({
    query: urlQuery || undefined,
    contracts: [],
    locations: [],
    sort: 'recent',
  })

  // Synchroniser la recherche avec l'URL (ex: arrivée depuis le Hero)
  useEffect(() => {
    if (urlQuery) {
      setFilters((f) => (f.query === urlQuery ? f : { ...f, query: urlQuery }))
    }
  }, [urlQuery])
  const [jobs, setJobs] = useState<JobOffer[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    fetchJobs(filters).then((data) => {
      setJobs(data)
      setLoading(false)
    })
  }, [filters])

  return (
    <section className="content layout">
      <JobFilters filters={filters} onFiltersChange={setFilters} />
      <JobList jobs={jobs} loading={loading} sort={filters.sort} onSortChange={(sort) => setFilters((f) => ({ ...f, sort }))} />
    </section>
  )
}

export default OffresPage
