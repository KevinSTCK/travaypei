/**
 * Espace candidat : profil, CV/LM, candidatures.
 */

import { useAuth } from '../../auth/AuthContext'

const SECTIONS = [
  {
    title: 'Profil public',
    description: 'Complétez votre profil pour maximiser vos chances : métier recherché, expérience, localités préférées.',
    items: [
      'Nom / Prénom (pré-rempli avec votre compte)',
      'Métier visé (ex : Vendeur en magasin, Dessinateur projeteur…)',
      'Types de contrat souhaités (Intérim, CDI, CDD…)',
      'Villes / zones préférées à La Réunion',
    ],
  },
  {
    title: 'CV & lettres de motivation',
    description: 'Déposez plusieurs versions de vos CV et LM en fonction des métiers que vous visez.',
    items: [
      'Upload de CV (PDF)',
      'Upload de lettres de motivation types',
      'Choix par défaut pour les candidatures rapides',
    ],
  },
  {
    title: 'Mes candidatures',
    description: "Suivez l'état de vos candidatures envoyées via TravayPei.",
    items: ['En attente', "En cours d'étude", 'Refusées / Acceptées'],
  },
]

function CandidateDashboard() {
  const { user } = useAuth()

  return (
    <section className="content dashboard">
      <h1 className="dashboard__title">Mon espace candidat</h1>
      <p className="dashboard__subtitle">
        Centralisez votre profil, vos CV et lettres de motivation, et suivez vos candidatures.
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

export default CandidateDashboard
