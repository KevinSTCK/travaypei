/**
 * Page d'accueil : hero + dernières offres.
 */

import { HeroSection, LatestOffers } from '../features/home'

function HomePage() {
  return (
    <>
      <HeroSection />
      <LatestOffers />
    </>
  )
}

export default HomePage
