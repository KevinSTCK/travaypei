/**
 * Panneau de filtres pour la page des offres.
 */

const CONTRACTS = [
  { id: 'interim', label: 'Intérim', defaultChecked: true },
  { id: 'cdi', label: 'CDI', defaultChecked: false },
  { id: 'cdd', label: 'CDD', defaultChecked: false },
  { id: 'alternance', label: 'Alternance', defaultChecked: false },
]

const LOCATIONS = ['Saint-Denis', 'Saint-Pierre', 'Saint-Paul', 'Le Port', 'Saint-André']

function JobFilters() {
  return (
    <aside className="filters">
      <div className="filters__section">
        <h2>Filtres</h2>
        <p className="filters__hint">
          Affinez votre recherche par type de contrat, salaire, localisation...
        </p>
      </div>
      <div className="filters__section">
        <h3>Contrats</h3>
        <ul className="filters__list">
          {CONTRACTS.map((c) => (
            <li key={c.id}>
              <label>
                <input type="checkbox" defaultChecked={c.defaultChecked} /> {c.label}
              </label>
            </li>
          ))}
        </ul>
      </div>
      <div className="filters__section">
        <h3>Localités principales</h3>
        <ul className="filters__chips">
          {LOCATIONS.map((loc) => (
            <li key={loc}>{loc}</li>
          ))}
        </ul>
      </div>
    </aside>
  )
}

export default JobFilters
