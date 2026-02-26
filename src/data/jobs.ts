/**
 * Données mock des offres d'emploi.
 * À remplacer par des appels Supabase en production.
 */

export type JobIcon = 'admin' | 'dev' | 'commercial'

export interface JobPreview {
  id: string
  title: string
  company: string
  contract: string
  salary: string
  posted: string
  icon: JobIcon
}

export interface JobOffer {
  id: string
  company: string
  badge?: string
  badgeHighlight?: boolean
  title: string
  meta: string[]
  salary?: string
}

export const LATEST_JOBS: JobPreview[] = [
  {
    id: '1',
    title: 'Assistant administratif',
    company: 'Alter Ego Recrutement',
    contract: 'CDI',
    salary: '26-30k € / an',
    posted: 'Il y a 1 jour',
    icon: 'admin',
  },
  {
    id: '2',
    title: 'Développeur Web',
    company: 'Sponsor Job La Réunion',
    contract: 'CDI',
    salary: '30-35k € / an',
    posted: 'Il y a 2 jours',
    icon: 'dev',
  },
  {
    id: '3',
    title: 'Commercial(e) terrain',
    company: 'Aquila RH',
    contract: 'CDD',
    salary: '24-28k € / an',
    posted: 'Il y a 1 jour',
    icon: 'commercial',
  },
]

export const ALL_JOBS: JobOffer[] = [
  {
    id: '1',
    company: 'Alter Ego recrutement',
    badge: 'Intérim',
    title: 'Dieteticien Dialyse H/F',
    meta: ['Saint-André - 974', 'Travail de jour', '2 mois'],
    salary: 'À partir de 15 € / heure',
  },
  {
    id: '2',
    company: 'Sponsor Job - La Réunion',
    badge: 'Super recruteur',
    badgeHighlight: true,
    title: 'Dessinateur Projeteur H/F',
    meta: ['Le Port - 974', 'Intérim • 6 mois', '12,02 - 14,50 € / heure'],
  },
  {
    id: '3',
    company: 'Aquila RH',
    badge: 'Intérim',
    title: "Chef d'équipe Couvreurs H/F",
    meta: ['Saint-Denis - 974', '15 - 19 € / heure', '88 jours'],
  },
]
