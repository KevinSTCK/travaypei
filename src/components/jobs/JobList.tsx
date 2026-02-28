/**
 * Liste des offres avec en-tête (compteur, tri).
 */

import type { JobOffer } from '../../data/jobs'
import JobCard from './JobCard'

interface JobListProps {
  jobs: JobOffer[]
  loading: boolean
  sort?: 'recent' | 'salary_desc' | 'location'
  onSortChange?: (sort: 'recent' | 'salary_desc' | 'location') => void
}

function JobList({ jobs, loading, sort = 'recent', onSortChange }: JobListProps) {
  return (
    <section className="results">
      <header className="results__header">
        <span className="results__count">
          <strong>{jobs.length}</strong> offres trouvées
        </span>
        <select
          className="results__sort"
          value={sort}
          onChange={(e) =>
            onSortChange?.(e.target.value as 'recent' | 'salary_desc' | 'location')
          }
        >
          <option value="recent">Trier par : plus récentes</option>
          <option value="salary_desc">Salaire décroissant</option>
          <option value="location">Proximité</option>
        </select>
      </header>
      {loading ? (
        <p className="results__loading">Chargement...</p>
      ) : (
        <ul className="job-list">
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </ul>
      )}
    </section>
  )
}

export default JobList
