/**
 * Espace entreprise : profil, offres, diffusion.
 */

import { useAuth } from '../../auth/AuthContext'

const SECTIONS = [
  {
    title: 'Profil entreprise',
    description: "Présentez clairement votre entreprise pour inspirer confiance aux candidats.",
    items: [
      "Nom de l'entreprise",
      'Localisation principale / agences',
      "Secteurs d'activité & métiers",
      'Liens vers vos réseaux sociaux',
    ],
  },
  {
    title: 'Gestion des offres',
    description:
      "Créez des offres claires, sans triche sur le type de contrat, pour des statistiques fiables.",
    items: [
      'Type de contrat (Intérim, CDI, CDD, Alternance…)',
      'Rémunération (fourchette + type : horaire / mensuel / annuel)',
      'Lieu précis (ville, code postal, île)',
      'Validation par TravayPei si nécessaire',
    ],
  },
  {
    title: 'Diffusion & connecteurs',
    description:
      "Prépare les connecteurs vers les réseaux sociaux et les e-mails pour diffuser chaque nouvelle offre.",
    items: [
      'Gabarits de posts pour Facebook / Instagram / LinkedIn',
      "Envoi automatique des candidatures vers la boîte mail de l'entreprise et TravayPei",
      "File d'attente pour les partages réseaux (via Zapier / Make / webhooks)",
    ],
  },
]

function CompanyDashboard() {
  const { user } = useAuth()

  return (
    <section className="content dashboard">
      <h1 className="dashboard__title">Espace entreprise</h1>
      <p className="dashboard__subtitle">
        Publiez vos offres rapidement et recevez les candidatures directement dans votre boîte
        mail et celle de TravayPei.
      </p>

      <div className="dashboard__grid">
        {SECTIONS.map((section) => (
          <div key={section.title} className="dashboard__card">
            <h2>{section.title}</h2>
            <p>{section.description}</p>
            <ul className="dashboard__list">
              {section.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <p className="dashboard__meta">
        Connecté en tant que <strong>{user?.email}</strong>.
      </p>
    </section>
  )
}

export default CompanyDashboard
