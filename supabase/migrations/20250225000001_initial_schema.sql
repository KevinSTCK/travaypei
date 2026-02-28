-- Travay Péi – Schéma initial
-- Exécuter dans Supabase Dashboard → SQL Editor

-- ============================================
-- 1. PROFILES (extension de auth.users)
-- ============================================
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('candidate', 'company')),
  full_name TEXT,
  company_name TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Profiles are viewable by owner"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Trigger pour créer le profil à l'inscription
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, role, full_name, company_name)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'role', 'candidate'),
    NEW.raw_user_meta_data->>'full_name',
    NEW.raw_user_meta_data->>'company_name'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ============================================
-- 2. JOBS (offres d'emploi)
-- ============================================
CREATE TABLE IF NOT EXISTS public.jobs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  company TEXT NOT NULL,
  contract TEXT NOT NULL CHECK (contract IN ('cdi', 'cdd', 'interim', 'alternance')),
  location TEXT NOT NULL,
  salary_display TEXT,
  badge TEXT,
  badge_highlight BOOLEAN DEFAULT false,
  icon TEXT CHECK (icon IN ('admin', 'dev', 'commercial')),
  meta JSONB DEFAULT '[]',
  posted_at TIMESTAMPTZ DEFAULT now(),
  created_at TIMESTAMPTZ DEFAULT now(),
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL
);

-- Index pour recherche et tri
CREATE INDEX IF NOT EXISTS idx_jobs_posted_at ON public.jobs(posted_at DESC);
CREATE INDEX IF NOT EXISTS idx_jobs_contract ON public.jobs(contract);
CREATE INDEX IF NOT EXISTS idx_jobs_location ON public.jobs(location);
CREATE INDEX IF NOT EXISTS idx_jobs_title_search ON public.jobs USING gin(to_tsvector('french', title));
CREATE INDEX IF NOT EXISTS idx_jobs_company_search ON public.jobs USING gin(to_tsvector('french', company));

-- RLS : lecture publique, écriture réservée aux entreprises (futur)
ALTER TABLE public.jobs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Jobs are publicly readable"
  ON public.jobs FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users with company role can insert jobs"
  ON public.jobs FOR INSERT
  WITH CHECK (
    auth.role() = 'authenticated'
    AND EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'company'
    )
  );

CREATE POLICY "Job creators can update their jobs"
  ON public.jobs FOR UPDATE
  USING (created_by = auth.uid());

-- ============================================
-- 3. APPLICATIONS (candidatures – pour plus tard)
-- ============================================
CREATE TABLE IF NOT EXISTS public.applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id UUID NOT NULL REFERENCES public.jobs(id) ON DELETE CASCADE,
  candidate_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'reviewing', 'accepted', 'rejected')),
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(job_id, candidate_id)
);

ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Candidates can view own applications"
  ON public.applications FOR SELECT
  USING (candidate_id = auth.uid());

CREATE POLICY "Candidates can create applications"
  ON public.applications FOR INSERT
  WITH CHECK (candidate_id = auth.uid());
