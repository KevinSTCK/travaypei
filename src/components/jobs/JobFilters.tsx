/**
 * Panneau de filtres pour la page des offres.
 */

import type { JobsFilters } from '../../lib/jobsService'

const CONTRACTS = [
  { id: 'interim', label: 'Intérim' },
  { id: 'cdi', label: 'CDI' },
  { id: 'cdd', label: 'CDD' },
  { id: 'alternance', label: 'Alternance' },
]

const LOCATIONS = ['Saint-Denis', 'Saint-Pierre', 'Saint-Paul', 'Le Port', 'Saint-André']

interface JobFiltersProps {
  filters: JobsFilters
  onFiltersChange: (f: JobsFilters) => void
}

function JobFilters({ filters, onFiltersChange }: JobFiltersProps) {
  const toggleContract = (id: string) => {
    const current = filters.contracts ?? []
    const next = current.includes(id)
      ? current.filter((c) => c !== id)
      : [...current, id]
    onFiltersChange({ ...filters, contracts: next })
  }

  const toggleLocation = (loc: string) => {
    const current = filters.locations ?? []
    const next = current.includes(loc)
      ? current.filter((l) => l !== loc)
      : [...current, loc]
    onFiltersChange({ ...filters, locations: next })
  }

  return (
    <aside className="filters">
      <div className="filters__section">
        <h2>Filtres</h2>
        <p className="filters__hint">
          Affinez votre recherche par type de contrat, localisation...
        </p>
      </div>
      <div className="filters__section">
        <h3>Recherche</h3>
        <input
          type="search"
          className="field__input"
          placeholder="Métier, entreprise..."
          value={filters.query ?? ''}
          onChange={(e) => onFiltersChange({ ...filters, query: e.target.value || undefined })}
        />
      </div>
      <div className="filters__section">
        <h3>Contrats</h3>
        <ul className="filters__list">
          {CONTRACTS.map((c) => (
            <li key={c.id}>
              <label>
                <input
                  type="checkbox"
                  checked={(filters.contracts ?? []).includes(c.id)}
                  onChange={() => toggleContract(c.id)}
                />{' '}
                {c.label}
              </label>
            </li>
          ))}
        </ul>
      </div>
      <div className="filters__section">
        <h3>Localités principales</h3>
        <ul className="filters__chips">
          {LOCATIONS.map((loc) => (
            <li
              key={loc}
              className={(filters.locations ?? []).includes(loc) ? 'filters__chip--active' : ''}
              role="button"
              tabIndex={0}
              onClick={() => toggleLocation(loc)}
              onKeyDown={(e) => e.key === 'Enter' && toggleLocation(loc)}
            >
              {loc}
            </li>
          ))}
        </ul>
      </div>
    </aside>
  )
}

export default JobFilters
