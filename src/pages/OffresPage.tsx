/**
 * Page liste des offres : filtres + résultats.
 */

import { JobFilters, JobList } from '../components/jobs'

function OffresPage() {
  return (
    <section className="content layout">
      <JobFilters />
      <JobList />
    </section>
  )
}

export default OffresPage
