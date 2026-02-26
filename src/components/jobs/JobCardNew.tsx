/**
 * Carte d'offre compacte pour la grille de la page d'accueil.
 */

import type { ReactNode } from 'react'
import type { JobPreview } from '../../data/jobs'

const ICON_SVG: Record<string, ReactNode> = {
  admin: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1H2a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h1a7 7 0 0 1 7-7h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 0 1 2-2z" />
    </svg>
  ),
  dev: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M20 18c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2H0v2h24v-2h-4zM4 6h16v10H4V6z" />
    </svg>
  ),
  commercial: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
    </svg>
  ),
}

interface JobCardNewProps {
  job: JobPreview
}

function JobCardNew({ job }: JobCardNewProps) {
  return (
    <article className="job-card-new">
      <div className={`job-card-new__icon job-card-new__icon--${job.icon}`}>
        {ICON_SVG[job.icon]}
      </div>
      <h3 className="job-card-new__title">{job.title}</h3>
      <p className="job-card-new__company">{job.company}</p>
      <p className="job-card-new__meta">{job.contract} {job.salary}</p>
      <p className="job-card-new__posted">{job.posted}</p>
    </article>
  )
}

export default JobCardNew
