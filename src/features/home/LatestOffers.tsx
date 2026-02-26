/**
 * Section "Dernières offres d'emploi" de la page d'accueil.
 */

import { Link } from 'react-router-dom'
import { LATEST_JOBS } from '../../data/jobs'
import JobCardNew from '../../components/jobs/JobCardNew'

function LatestOffers() {
  return (
    <section className="content">
      <h2 className="section-title">Dernières offres d&apos;emploi</h2>
      <div className="job-grid">
        {LATEST_JOBS.map((job) => (
          <JobCardNew key={job.id} job={job} />
        ))}
      </div>
      <Link to="/offres" className="section-link">Voir toutes les offres »</Link>
    </section>
  )
}

export default LatestOffers
