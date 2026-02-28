/**
 * Section "Dernières offres d'emploi" de la page d'accueil.
 */

import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { fetchLatestJobs } from '../../lib/jobsService'
import type { JobPreview } from '../../data/jobs'
import JobCardNew from '../../components/jobs/JobCardNew'

function LatestOffers() {
  const [jobs, setJobs] = useState<JobPreview[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchLatestJobs(6).then((data) => {
      setJobs(data)
      setLoading(false)
    })
  }, [])

  return (
    <section className="content">
      <h2 className="section-title">Dernières offres d&apos;emploi</h2>
      {loading ? (
        <p className="section-loading">Chargement des offres...</p>
      ) : (
        <div className="job-grid">
          {jobs.map((job) => (
            <Link key={job.id} to={`/offres?job=${job.id}`} className="job-card-new-link">
              <JobCardNew job={job} />
            </Link>
          ))}
        </div>
      )}
      <Link to="/offres" className="section-link">Voir toutes les offres »</Link>
    </section>
  )
}

export default LatestOffers
