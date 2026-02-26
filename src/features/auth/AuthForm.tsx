/**
 * Formulaire de connexion / inscription (candidat ou entreprise).
 */

import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../auth/AuthContext'

type Role = 'candidate' | 'company'

function AuthForm() {
  const location = useLocation()
  const navigate = useNavigate()
  const searchParams = new URLSearchParams(location.search)
  const defaultMode = searchParams.get('mode') === 'entreprise' ? 'company' : 'candidate'

  const [activeRole, setActiveRole] = useState<Role>(defaultMode)
  const [isLogin, setIsLogin] = useState(true)
  const { signIn, signUp } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [companyName, setCompanyName] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setError(null)
    setSubmitting(true)
    try {
      if (isLogin) {
        await signIn({ email, password })
      } else {
        await signUp({
          email,
          password,
          role: activeRole,
          fullName: fullName || undefined,
          companyName: activeRole === 'company' ? companyName || undefined : undefined,
        })
      }
      const from = (location.state as { from?: { pathname: string } })?.from?.pathname
      if (from && (from === '/candidat' || from === '/entreprise')) {
        navigate(from, { replace: true })
      } else {
        navigate(activeRole === 'candidate' ? '/candidat' : '/entreprise', { replace: true })
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue.')
    } finally {
      setSubmitting(false)
    }
  }

  const title = isLogin
    ? activeRole === 'candidate'
      ? 'Connexion candidat'
      : 'Connexion entreprise'
    : activeRole === 'candidate'
    ? 'Créer mon espace candidat'
    : 'Créer mon espace entreprise'

  const subtitle =
    activeRole === 'candidate'
      ? 'Gérez votre CV, vos lettres de motivation et suivez vos candidatures.'
      : 'Diffusez vos offres en quelques clics et recevez les candidatures directement.'

  const submitLabel = submitting
    ? 'Traitement...'
    : isLogin
    ? 'Se connecter'
    : activeRole === 'candidate'
    ? 'Créer mon compte candidat'
    : 'Créer mon compte entreprise'

  return (
    <div className="auth__card">
      <div className="auth__tabs">
        <button
          type="button"
          className={`auth__tab ${activeRole === 'candidate' ? 'auth__tab--active' : ''}`}
          onClick={() => setActiveRole('candidate')}
        >
          Candidat
        </button>
        <button
          type="button"
          className={`auth__tab ${activeRole === 'company' ? 'auth__tab--active' : ''}`}
          onClick={() => setActiveRole('company')}
        >
          Entreprise
        </button>
      </div>

      <h1 className="auth__title">{title}</h1>
      <p className="auth__subtitle">{subtitle}</p>

      <form className="auth__form" onSubmit={handleSubmit}>
        {!isLogin && activeRole === 'candidate' && (
          <div className="field">
            <label className="field__label">Nom complet</label>
            <input
              className="field__input"
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Ex : Jean Dupont"
            />
          </div>
        )}

        {!isLogin && activeRole === 'company' && (
          <div className="field">
            <label className="field__label">Nom de l&apos;entreprise</label>
            <input
              className="field__input"
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              placeholder="Ex : TravayPei Intérim"
            />
          </div>
        )}

        <div className="field">
          <label className="field__label">Email</label>
          <input
            className="field__input"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="vous@exemple.com"
          />
        </div>

        <div className="field">
          <label className="field__label">Mot de passe</label>
          <input
            className="field__input"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Au moins 6 caractères"
          />
        </div>

        {error && <p className="auth__error">{error}</p>}

        <button className="btn btn--primary auth__submit" type="submit" disabled={submitting}>
          {submitLabel}
        </button>
      </form>

      <button
        type="button"
        className="auth__switch"
        onClick={() => setIsLogin((prev) => !prev)}
      >
        {isLogin ? 'Pas encore de compte ? Créer un espace.' : 'Déjà un compte ? Se connecter.'}
      </button>
    </div>
  )
}

export default AuthForm
