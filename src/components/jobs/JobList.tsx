/**
 * Liste des offres avec en-tête (compteur, tri).
 */

import { ALL_JOBS } from '../../data/jobs'
import JobCard from './JobCard'

function JobList() {
  return (
    <section className="results">
      <header className="results__header">
        <span className="results__count"><strong>{ALL_JOBS.length}</strong> offres trouvées</span>
        <select className="results__sort">
          <option>Trier par : plus récentes</option>
          <option>Salaire décroissant</option>
          <option>Proximité</option>
        </select>
      </header>
      <ul className="job-list">
        {ALL_JOBS.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </ul>
    </section>
  )
}

export default JobList
