/**
 * Point d'entrée de l'application.
 * Layout principal : Header + contenu (routes) + Footer.
 */

import './App.css'
import { Header, Footer } from './components/layout'
import AppRoutes from './routes/AppRoutes'

function App() {
  return (
    <div className="job-site">
      <Header />
      <main className="job-site__main">
        <AppRoutes />
      </main>
      <Footer />
    </div>
  )
}

export default App
