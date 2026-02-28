/**
 * Section hero de la page d'accueil : titre, sous-titre, barre de recherche.
 */

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function HeroSection() {
  const [query, setQuery] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams()
    if (query.trim()) params.set('q', query.trim())
    navigate(`/offres${params.toString() ? `?${params}` : ''}`)
  }

  return (
    <section className="hero">
      <div className="hero__bg" />
      <div className="hero__content">
        <h1 className="hero__title">Trouvez l&apos;emploi de vos rêves à La Réunion</h1>
        <p className="hero__subtitle">
          Explorez des centaines d&apos;opportunités professionnelles 100% péi.
        </p>
        <form className="hero__search" onSubmit={handleSubmit}>
          <div className="hero__search-input">
            <svg className="hero__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
            <input
              type="text"
              placeholder="Quoi ? Métier, entreprise..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <div className="hero__search-input">
            <svg className="hero__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <input type="text" defaultValue="La Réunion" readOnly />
          </div>
          <button type="submit" className="btn btn--red hero__search-btn">
            Trouver un emploi
          </button>
        </form>
      </div>
    </section>
  )
}

export default HeroSection
