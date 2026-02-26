/**
 * Définition des routes de l'application.
 */

import { Navigate, Route, Routes } from 'react-router-dom'
import { AuthPage, ProtectedRoute } from '../features/auth'
import { CandidateDashboard } from '../features/candidate'
import { CompanyDashboard } from '../features/company'
import HomePage from '../pages/HomePage'
import OffresPage from '../pages/OffresPage'
import PlaceholderPage from '../pages/PlaceholderPage'

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/offres" element={<OffresPage />} />
      <Route path="/connexion" element={<AuthPage />} />
      <Route
        path="/candidat"
        element={
          <ProtectedRoute allowedRoles={['candidate']}>
            <CandidateDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/entreprise"
        element={
          <ProtectedRoute allowedRoles={['company']}>
            <CompanyDashboard />
          </ProtectedRoute>
        }
      />
      <Route path="/entreprises" element={<PlaceholderPage title="Entreprises" />} />
      <Route path="/actualites" element={<PlaceholderPage title="Actualités" />} />
      <Route path="/cvtheque" element={<PlaceholderPage title="CVthèque" />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default AppRoutes
