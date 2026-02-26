# Structure du projet Travay Péi

## Organisation des dossiers

```
src/
├── App.tsx              # Point d'entrée : layout (Header + routes + Footer)
├── App.css              # Styles globaux
├── main.tsx             # Bootstrap React
│
├── components/          # Composants réutilisables
│   ├── layout/          # En-tête, pied de page
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── index.ts
│   └── jobs/            # Cartes offres, filtres, liste
│       ├── JobCard.tsx      # Carte détaillée (page offres)
│       ├── JobCardNew.tsx   # Carte compacte (accueil)
│       ├── JobFilters.tsx   # Panneau filtres
│       ├── JobList.tsx     # Liste + en-tête
│       └── index.ts
│
├── features/            # Fonctionnalités par domaine
│   ├── auth/            # Authentification
│   │   ├── AuthPage.tsx
│   │   ├── AuthForm.tsx
│   │   ├── ProtectedRoute.tsx
│   │   └── index.ts
│   ├── candidate/       # Espace candidat
│   │   ├── CandidateDashboard.tsx
│   │   └── index.ts
│   ├── company/         # Espace entreprise
│   │   ├── CompanyDashboard.tsx
│   │   └── index.ts
│   └── home/            # Page d'accueil (sections)
│       ├── HeroSection.tsx
│       ├── LatestOffers.tsx
│       └── index.ts
│
├── pages/               # Pages (orchestration)
│   ├── HomePage.tsx     # Hero + dernières offres
│   ├── OffresPage.tsx   # Filtres + liste
│   ├── PlaceholderPage.tsx
│   └── index.ts
│
├── routes/
│   └── AppRoutes.tsx    # Définition des routes
│
├── data/                # Données mock (à remplacer par API)
│   └── jobs.ts
│
├── auth/                # Contexte auth (Supabase)
│   └── AuthContext.tsx
│
└── lib/
    └── supabaseClient.ts
```

## Où modifier quoi

| Élément | Fichier |
|---------|---------|
| Hero (titre, recherche) | `features/home/HeroSection.tsx` |
| Dernières offres (accueil) | `features/home/LatestOffers.tsx` |
| Données offres | `data/jobs.ts` |
| Filtres offres | `components/jobs/JobFilters.tsx` |
| Carte offre (accueil) | `components/jobs/JobCardNew.tsx` |
| Carte offre (liste) | `components/jobs/JobCard.tsx` |
| Connexion / inscription | `features/auth/AuthForm.tsx` |
| Espace candidat | `features/candidate/CandidateDashboard.tsx` |
| Espace entreprise | `features/company/CompanyDashboard.tsx` |
| Header / navigation | `components/layout/Header.tsx` |
| Footer | `components/layout/Footer.tsx` |
| Routes | `routes/AppRoutes.tsx` |
