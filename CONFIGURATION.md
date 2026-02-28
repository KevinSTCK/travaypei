# Guide de configuration – Travay Péi

## Vue d’ensemble

Ce document décrit ce qui a été mis en place et ce qu’il reste à faire.

---

## Ce qui est en place

### Base de données (Supabase)

- **`profiles`** : profils utilisateurs (rôle candidat/entreprise), créés automatiquement à l’inscription
- **`jobs`** : offres d’emploi avec filtres (contrat, localisation, recherche)
- **`applications`** : table prête pour les candidatures (à brancher plus tard)

### Application

- **Auth** : inscription/connexion email + mot de passe, Google OAuth (candidats)
- **Offres** : chargement depuis Supabase avec fallback sur les données mock
- **Recherche** : barre Hero → redirection vers `/offres?q=...`
- **Filtres** : contrats (CDI, CDD, Intérim, Alternance), localités
- **Tri** : plus récentes, salaire, proximité

### Mode dégradé

Sans variables d’environnement Supabase, l’app utilise les données mock et l’auth est désactivée.

---

## Étapes pour faire tourner l’application

### 1. Créer un projet Supabase

1. Va sur [supabase.com](https://supabase.com) → New Project
2. Récupère **Project URL** et **anon public** dans Settings → API

### 2. Configurer les variables

```bash
cp .env.example .env
```

Édite `.env` :

```
VITE_SUPABASE_URL=https://ton-projet.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGc...
```

### 3. Exécuter les migrations SQL

Dans Supabase Dashboard → **SQL Editor** :

1. Copie le contenu de `supabase/migrations/20250225000001_initial_schema.sql` → Exécute
2. Copie le contenu de `supabase/migrations/20250225000002_seed_jobs.sql` → Exécute

### 4. Lancer l’app

```bash
npm run dev
```

---

## Recommandations pour la suite

| Priorité | Tâche |
|----------|-------|
| Haute | Page détail d’une offre (`/offres/:id`) |
| Haute | Candidature depuis une offre (bouton « Voir l’offre ») |
| Moyenne | Espace candidat : profil, CV, candidatures |
| Moyenne | Espace entreprise : création d’offres |
| Basse | Debounce sur la recherche (limiter les requêtes) |
| Basse | Pagination des offres |

---

## Droits candidat (à venir)

Quand les droits seront implémentés, on pourra :

- Limiter l’accès à certaines pages selon le rôle
- Masquer/afficher des sections dans les dashboards
- Gérer les candidatures (création, suivi)
