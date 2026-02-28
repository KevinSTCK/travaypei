# Configuration Supabase – Travay Péi

## 1. Créer un projet Supabase

1. Va sur [supabase.com](https://supabase.com) et crée un projet
2. Récupère l’URL et la clé anon dans **Settings → API**
3. Crée un fichier `.env` à la racine du projet :

```
VITE_SUPABASE_URL=https://xxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGc...
```

## 2. Exécuter les migrations

Dans le **Supabase Dashboard** → **SQL Editor** :

1. Ouvre `supabase/migrations/20250225000001_initial_schema.sql`
2. Copie tout le contenu et exécute-le
3. Ouvre `supabase/migrations/20250225000002_seed_jobs.sql`
4. Copie tout le contenu et exécute-le

## 3. Tables créées

| Table | Rôle |
|-------|------|
| `profiles` | Profils utilisateurs (rôle, nom, entreprise) – rempli automatiquement à l’inscription |
| `jobs` | Offres d’emploi |
| `applications` | Candidatures (pour usage futur) |

## 4. Google OAuth (optionnel)

1. [Google Cloud Console](https://console.cloud.google.com/auth) → Créer des identifiants OAuth 2.0
2. Supabase → **Auth** → **Providers** → **Google** → Activer et renseigner Client ID + Secret
3. **Auth** → **URL Configuration** → Ajouter :
   - `http://localhost:5173/connexion` (dev)
   - `https://ton-domaine.com/connexion` (prod)

## 5. Vérifier

- L’app démarre avec `npm run dev`
- Sans `.env` : les offres viennent des données mock
- Avec `.env` : les offres viennent de Supabase
