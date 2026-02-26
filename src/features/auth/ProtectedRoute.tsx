/**
 * Route protégée : redirige vers /connexion si l'utilisateur n'est pas connecté ou n'a pas le bon rôle.
 */

import type { ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../auth/AuthContext'

type Role = 'candidate' | 'company'

interface ProtectedRouteProps {
  children: ReactNode
  allowedRoles: Role[]
}

function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const { user, role, loading } = useAuth()
  const location = useLocation()

  if (loading) {
    return <div style={{ padding: '2rem' }}>Chargement de votre espace...</div>
  }

  if (!user || !role || !allowedRoles.includes(role)) {
    return <Navigate to="/connexion" state={{ from: location }} replace />
  }

  return <>{children}</>
}

export default ProtectedRoute
