/**
 * Pied de page du site.
 */

function Footer() {
  return (
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
          <h4>Travay Péi</h4>
          <ul>
            <li>Qui sommes-nous ?</li>
            <li>Accès recruteur</li>
            <li>Aide &amp; contact</li>
          </ul>
        </div>
      </div>
      <p className="job-site__footer-meta">
        © {new Date().getFullYear()} Travay Péi – Plateforme d&apos;offres d&apos;emploi à La Réunion.
      </p>
    </footer>
  )
}

export default Footer
