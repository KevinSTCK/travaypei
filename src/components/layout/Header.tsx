/**
 * En-tête du site : logo, navigation, actions (connexion / espace).
 */

import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../auth/AuthContext'

function Header() {
  const { user, role, signOut, loading } = useAuth()
  const [menuOpen, setMenuOpen] = useState(false)

  const closeMenu = () => setMenuOpen(false)

  return (
    <header className="header">
      <div className="header__inner">
        <Link to="/" className="header__brand" onClick={closeMenu}>
          <img src="/logo-travay-pei.svg" alt="Travay Péi" className="header__logo" />
        </Link>

        <div className={`header__menu ${menuOpen ? 'header__menu--open' : ''}`}>
          <nav className="header__nav">
            <Link to="/offres" className="header__link" onClick={closeMenu}>Offres d&apos;emploi</Link>
            <Link to="/entreprises" className="header__link" onClick={closeMenu}>Entreprises</Link>
          </nav>
          <div className="header__actions">
            {!user && (
              <>
                <Link to="/connexion" className="btn btn--blue" onClick={closeMenu}>S&apos;inscrire</Link>
                <Link to="/connexion" className="btn btn--red" onClick={closeMenu}>Se connecter</Link>
              </>
            )}
            {user && !loading && (
              <>
                {role === 'candidate' && (
                  <Link to="/candidat" className="header__link" onClick={closeMenu}>Espace candidat</Link>
                )}
                {role === 'company' && (
                  <Link to="/entreprise" className="header__link" onClick={closeMenu}>Espace entreprise</Link>
                )}
                <button className="btn btn--red" type="button" onClick={() => { closeMenu(); void signOut() }}>
                  Se déconnecter
                </button>
              </>
            )}
          </div>
        </div>

        <button
          type="button"
          className="header__burger"
          aria-label="Menu"
          aria-expanded={menuOpen}
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
