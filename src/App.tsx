import './App.css'

function App() {
  return (
    <div className="job-site">
      <header className="job-site__header">
        <div className="job-site__brand">
          <span className="job-site__logo">TravayPei</span>
          <span className="job-site__tagline">Les offres près de chez vous à La Réunion</span>
        </div>
        <nav className="job-site__nav">
          <button className="job-site__nav-item job-site__nav-item--active">Missions d&apos;intérim</button>
          <button className="job-site__nav-item">CDI / CDD</button>
          <button className="job-site__nav-item">Alternance</button>
          <button className="job-site__nav-item">Entreprises</button>
        </nav>
        <div className="job-site__actions">
          <button className="btn btn--ghost">Se connecter</button>
          <button className="btn btn--primary">Déposer une offre</button>
        </div>
      </header>

      <main className="job-site__main">
        <section className="search-bar">
          <div className="search-bar__title">
            <h1>Intérim à La Réunion</h1>
            <p>Découvrez les dernières missions d&apos;intérim disponibles sur l&apos;île.</p>
          </div>
          <form className="search-bar__form">
            <div className="field">
              <label className="field__label">Quoi ?</label>
              <input
                className="field__input"
                type="text"
                placeholder="Métier, entreprise, compétence..."
              />
            </div>
            <div className="field">
              <label className="field__label">Où ?</label>
              <input
                className="field__input"
                type="text"
                placeholder="Ville, code postal..."
                defaultValue="La Réunion (974)"
              />
            </div>
            <div className="field">
              <label className="field__label">Contrat</label>
              <select className="field__input">
                <option>Intérim</option>
                <option>CDI</option>
                <option>CDD</option>
                <option>Alternance</option>
              </select>
            </div>
            <button type="submit" className="btn btn--primary search-bar__submit">
              Rechercher
            </button>
          </form>
        </section>

        <section className="layout">
          <aside className="filters">
            <div className="filters__section">
              <h2>Filtres</h2>
              <p className="filters__hint">Affinez votre recherche par type de contrat, salaire, localisation...</p>
            </div>

            <div className="filters__section">
              <h3>Contrats</h3>
              <ul className="filters__list">
                <li><label><input type="checkbox" defaultChecked /> Intérim</label></li>
                <li><label><input type="checkbox" /> CDI</label></li>
                <li><label><input type="checkbox" /> CDD</label></li>
                <li><label><input type="checkbox" /> Alternance</label></li>
              </ul>
            </div>

            <div className="filters__section">
              <h3>Localités principales</h3>
              <ul className="filters__chips">
                <li>Saint-Denis</li>
                <li>Saint-Pierre</li>
                <li>Saint-Paul</li>
                <li>Le Port</li>
                <li>Saint-André</li>
              </ul>
            </div>
          </aside>

          <section className="results">
            <header className="results__header">
              <span className="results__count">
                <strong>398</strong> missions d&apos;intérim trouvées à La Réunion
              </span>
              <select className="results__sort">
                <option>Trier par : plus récentes</option>
                <option>Salaire décroissant</option>
                <option>Proximité</option>
              </select>
            </header>

            <ul className="job-list">
              <li className="job-card">
                <div className="job-card__header">
                  <span className="job-card__company">Alter Ego recrutement</span>
                  <span className="job-card__badge">Intérim</span>
                </div>
                <h3 className="job-card__title">Dieteticien Dialyse H/F</h3>
                <div className="job-card__meta">
                  <span>Saint-André - 974</span>
                  <span>Travail de jour</span>
                  <span>2 mois</span>
                </div>
                <div className="job-card__footer">
                  <span className="job-card__salary">À partir de 15 € / heure</span>
                  <button className="btn btn--secondary btn--sm">Voir l&apos;offre</button>
                </div>
              </li>

              <li className="job-card">
                <div className="job-card__header">
                  <span className="job-card__company">Sponsor Job - La Réunion</span>
                  <span className="job-card__badge job-card__badge--highlight">Super recruteur</span>
                </div>
                <h3 className="job-card__title">Dessinateur Projeteur H/F</h3>
                <div className="job-card__meta">
                  <span>Le Port - 974</span>
                  <span>Intérim • 6 mois</span>
                  <span>12,02 - 14,50 € / heure</span>
                </div>
                <div className="job-card__footer">
                  <button className="btn btn--secondary btn--sm">Voir l&apos;offre</button>
                </div>
              </li>

              <li className="job-card">
                <div className="job-card__header">
                  <span className="job-card__company">Aquila RH</span>
                  <span className="job-card__badge">Intérim</span>
                </div>
                <h3 className="job-card__title">Chef d&apos;équipe Couvreurs H/F</h3>
                <div className="job-card__meta">
                  <span>Saint-Denis - 974</span>
                  <span>15 - 19 € / heure</span>
                  <span>88 jours</span>
                </div>
                <div className="job-card__footer">
                  <button className="btn btn--secondary btn--sm">Voir l&apos;offre</button>
                </div>
              </li>
            </ul>
          </section>
        </section>
      </main>

      <footer className="job-site__footer">
        <div className="job-site__footer-links">
          <div>
            <h4>Emplois &amp; formations</h4>
            <ul>
              <li>Agence d&apos;intérim La Réunion</li>
              <li>Emploi La Réunion</li>
              <li>Alternance La Réunion</li>
              <li>Stage La Réunion</li>
            </ul>
          </div>
          <div>
            <h4>TravayPei</h4>
            <ul>
              <li>Qui sommes-nous ?</li>
              <li>Accès recruteur</li>
              <li>Aide &amp; contact</li>
            </ul>
          </div>
        </div>
        <p className="job-site__footer-meta">
          © {new Date().getFullYear()} TravayPei – Plateforme d&apos;offres d&apos;emploi à La Réunion.
        </p>
      </footer>
    </div>
  )
}

export default App
