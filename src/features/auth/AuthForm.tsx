/**
 * Formulaire de connexion / inscription (candidat ou entreprise).
 * Candidat : email/mot de passe avec validation sécurisée + Google OAuth.
 */

import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../auth/AuthContext'
import { validatePassword, isPasswordSecure } from '../../utils/passwordValidation'

type Role = 'candidate' | 'company'

function AuthForm() {
  const location = useLocation()
  const navigate = useNavigate()
  const searchParams = new URLSearchParams(location.search)
  const defaultMode = searchParams.get('mode') === 'entreprise' ? 'company' : 'candidate'

  const [activeRole, setActiveRole] = useState<Role>(defaultMode)
  const [isLogin, setIsLogin] = useState(true)
  const { signIn, signUp, signInWithGoogle } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [companyName, setCompanyName] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  const passwordRequirements = validatePassword(password)
  const canSubmitPassword =
    isLogin || activeRole === 'company' || (activeRole === 'candidate' && isPasswordSecure(password))

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setError(null)
    if (!canSubmitPassword) return
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

  const handleGoogleSignIn = async () => {
    setError(null)
    setSubmitting(true)
    try {
      await signInWithGoogle(activeRole)
      // La redirection est gérée par Supabase
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors de la connexion Google.')
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
            placeholder={
              !isLogin && activeRole === 'candidate'
                ? '8+ caractères, majuscule, minuscule, chiffre, symbole'
                : 'Votre mot de passe'
            }
          />
          {!isLogin && activeRole === 'candidate' && password && (
            <ul className="auth__password-requirements">
              {passwordRequirements.map((req) => (
                <li
                  key={req.id}
                  className={req.met ? 'auth__password-requirement--met' : 'auth__password-requirement'}
                >
                  {req.met ? '✓' : '○'} {req.label}
                </li>
              ))}
            </ul>
          )}
        </div>

        {error && <p className="auth__error">{error}</p>}

        <button
          className="btn btn--primary auth__submit"
          type="submit"
          disabled={submitting || !canSubmitPassword}
        >
          {submitLabel}
        </button>

        {activeRole === 'candidate' && (
          <>
            <div className="auth__divider">
              <span>ou</span>
            </div>
            <button
              type="button"
              className="btn btn--google auth__google"
              onClick={handleGoogleSignIn}
              disabled={submitting}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden>
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              {isLogin ? 'Se connecter avec Google' : 'S\'inscrire avec Google'}
            </button>
          </>
        )}
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
