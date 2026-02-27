/**
 * En-tête du site : logo, navigation, actions (connexion / espace).
 */

import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../auth/AuthContext'

function Header() {
  const { user, role, signOut, loading } = useAuth()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="header">
      <div className="header__inner">
        <Link to="/" className="header__brand">
          <img src="/logo-travay-pei.svg" alt="Travay Péi" className="header__logo" />
        </Link>

        <nav className={`header__nav ${menuOpen ? 'header__nav--open' : ''}`}>
          <Link to="/offres" className="header__link">Offres d&apos;emploi</Link>
          <Link to="/entreprises" className="header__link">Entreprises</Link>
          <Link to="/actualites" className="header__link">Actualités</Link>
          {/*
          <Link to="/cvtheque" className="header__link">CVthèque</Link>
          */}
        </nav>

        <div className="header__actions">
          {!user && (
            <>
              <Link to="/connexion" className="btn btn--blue">S&apos;inscrire</Link>
              <Link to="/connexion" className="btn btn--red">Se connecter</Link>
            </>
          )}
          {user && !loading && (
            <>
              {role === 'candidate' && (
                <Link to="/candidat" className="header__link">Espace candidat</Link>
              )}
              {role === 'company' && (
                <Link to="/entreprise" className="header__link">Espace entreprise</Link>
              )}
              <button className="btn btn--red" type="button" onClick={() => void signOut()}>
                Se déconnecter
              </button>
            </>
          )}
        </div>

        <button
          type="button"
          className="header__burger"
          aria-label="Menu"
          onClick={() => setMenuOpen((o) => !o)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>
  )
}

export default Header
