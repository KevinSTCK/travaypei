/**
 * Carte d'offre détaillée pour la liste des offres.
 */

import { Link } from 'react-router-dom'
import type { JobOffer } from '../../data/jobs'

interface JobCardProps {
  job: JobOffer
}

function JobCard({ job }: JobCardProps) {
  return (
    <li className="job-card">
      <div className="job-card__header">
        <span className="job-card__company">{job.company}</span>
        {job.badge && (
          <span className={`job-card__badge ${job.badgeHighlight ? 'job-card__badge--highlight' : ''}`}>
            {job.badge}
          </span>
        )}
      </div>
      <h3 className="job-card__title">{job.title}</h3>
      <div className="job-card__meta">
        {job.meta.map((item, i) => (
          <span key={i}>{item}</span>
        ))}
      </div>
      <div className="job-card__footer">
        {job.salary && <span className="job-card__salary">{job.salary}</span>}
        <Link to={`/offres?job=${job.id}`} className="btn btn--secondary btn--sm">
          Voir l&apos;offre
        </Link>
      </div>
    </li>
  )
}

export default JobCard
