-- Données initiales des offres d'emploi
-- Exécuter après 20250225000001_initial_schema.sql
-- À exécuter une seule fois (ou supprimer les lignes avant de ré-exécuter)

INSERT INTO public.jobs (title, company, contract, location, salary_display, badge, badge_highlight, icon, meta, posted_at)
SELECT * FROM (VALUES
  (
    'Assistant administratif',
    'Alter Ego Recrutement',
    'cdi',
    'Saint-Denis',
    '26-30k € / an',
    'Intérim',
    false,
    'admin',
    '["Saint-André - 974", "Travail de jour", "2 mois"]'::jsonb,
    now() - interval '1 day'
  ),
  (
    'Développeur Web',
    'Sponsor Job La Réunion',
    'cdi',
    'Saint-Pierre',
    '30-35k € / an',
    'Super recruteur',
    true,
    'dev',
    '["Le Port - 974", "Intérim • 6 mois", "12,02 - 14,50 € / heure"]'::jsonb,
    now() - interval '2 days'
  ),
  (
    'Commercial(e) terrain',
    'Aquila RH',
    'cdd',
    'Saint-Paul',
    '24-28k € / an',
    'Intérim',
    false,
    'commercial',
    '["Saint-Denis - 974", "15 - 19 € / heure", "88 jours"]'::jsonb,
    now() - interval '1 day'
  ),
  (
    'Dieteticien Dialyse H/F',
    'Alter Ego recrutement',
    'interim',
    'Saint-André',
    'À partir de 15 € / heure',
    'Intérim',
    false,
    'admin',
    '["Saint-André - 974", "Travail de jour", "2 mois"]'::jsonb,
    now() - interval '3 days'
  ),
  (
    'Dessinateur Projeteur H/F',
    'Sponsor Job - La Réunion',
    'interim',
    'Le Port',
    '12,02 - 14,50 € / heure',
    'Super recruteur',
    true,
    'dev',
    '["Le Port - 974", "Intérim • 6 mois"]'::jsonb,
    now() - interval '4 days'
  ),
  (
    'Chef d''équipe Couvreurs H/F',
    'Aquila RH',
    'interim',
    'Saint-Denis',
    '15 - 19 € / heure',
    'Intérim',
    false,
    'commercial',
    '["Saint-Denis - 974", "88 jours"]'::jsonb,
    now() - interval '5 days'
  )
) AS v(title, company, contract, location, salary_display, badge, badge_highlight, icon, meta, posted_at)
WHERE NOT EXISTS (SELECT 1 FROM public.jobs LIMIT 1);
