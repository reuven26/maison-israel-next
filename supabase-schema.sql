-- ================================================================
-- MAISON ISRAËL — Schéma Supabase complet
-- Exécuter dans l'éditeur SQL de votre projet Supabase
-- ================================================================

-- Extension UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ---------------------------------------------------------------
-- TABLE: biens (propriétés immobilières)
-- ---------------------------------------------------------------
CREATE TABLE IF NOT EXISTS biens (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  nom TEXT NOT NULL,
  ville TEXT NOT NULL,
  quartier TEXT,
  type TEXT NOT NULL DEFAULT 'Appartement',
  surface INTEGER NOT NULL,
  pieces INTEGER,
  prix BIGINT NOT NULL,
  prix_display TEXT NOT NULL,
  badge TEXT,
  roi TEXT,
  image_principale TEXT NOT NULL,
  images TEXT[] DEFAULT '{}',
  description TEXT NOT NULL DEFAULT '',
  caracteristiques TEXT[] DEFAULT '{}',
  statut TEXT NOT NULL DEFAULT 'actif' CHECK (statut IN ('actif','vendu','sous_compromis','loue')),
  reference TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ---------------------------------------------------------------
-- TABLE: articles (blog)
-- ---------------------------------------------------------------
CREATE TABLE IF NOT EXISTS articles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  titre TEXT NOT NULL,
  sous_titre TEXT,
  contenu TEXT NOT NULL DEFAULT '',
  extrait TEXT,
  image TEXT,
  auteur TEXT NOT NULL DEFAULT 'Équipe Maison Israël',
  categorie TEXT NOT NULL DEFAULT 'Marché',
  tags TEXT[] DEFAULT '{}',
  statut TEXT NOT NULL DEFAULT 'brouillon' CHECK (statut IN ('publie','brouillon')),
  date_publication TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ---------------------------------------------------------------
-- TABLE: leads (demandes de contact)
-- ---------------------------------------------------------------
CREATE TABLE IF NOT EXISTS leads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  nom TEXT NOT NULL,
  email TEXT NOT NULL,
  telephone TEXT,
  message TEXT,
  bien_id UUID REFERENCES biens(id) ON DELETE SET NULL,
  source TEXT DEFAULT 'site',
  statut TEXT NOT NULL DEFAULT 'nouveau' CHECK (statut IN ('nouveau','contacte','qualifie','converti','ferme')),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ---------------------------------------------------------------
-- TABLE: profiles (utilisateurs admin)
-- ---------------------------------------------------------------
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'editor' CHECK (role IN ('admin','editor')),
  nom TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ---------------------------------------------------------------
-- FONCTION: auto-update updated_at
-- ---------------------------------------------------------------
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER biens_updated_at
  BEFORE UPDATE ON biens
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER articles_updated_at
  BEFORE UPDATE ON articles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ---------------------------------------------------------------
-- ROW LEVEL SECURITY
-- ---------------------------------------------------------------

-- Biens : lecture publique, écriture admin uniquement
ALTER TABLE biens ENABLE ROW LEVEL SECURITY;
CREATE POLICY "biens_public_read" ON biens FOR SELECT USING (true);
CREATE POLICY "biens_admin_write" ON biens FOR ALL
  USING (auth.uid() IN (SELECT id FROM profiles WHERE role IN ('admin','editor')));

-- Articles : lecture publique des publiés, écriture admin
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "articles_public_read" ON articles FOR SELECT USING (statut = 'publie');
CREATE POLICY "articles_admin_all" ON articles FOR ALL
  USING (auth.uid() IN (SELECT id FROM profiles WHERE role IN ('admin','editor')));

-- Leads : écriture publique (formulaire), lecture admin uniquement
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
CREATE POLICY "leads_public_insert" ON leads FOR INSERT WITH CHECK (true);
CREATE POLICY "leads_admin_read" ON leads FOR SELECT
  USING (auth.uid() IN (SELECT id FROM profiles WHERE role IN ('admin','editor')));
CREATE POLICY "leads_admin_update" ON leads FOR UPDATE
  USING (auth.uid() IN (SELECT id FROM profiles WHERE role IN ('admin','editor')));

-- Profiles : lecture/écriture admin uniquement
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "profiles_own_read" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "profiles_admin_all" ON profiles FOR ALL
  USING (auth.uid() IN (SELECT id FROM profiles WHERE role = 'admin'));

-- ---------------------------------------------------------------
-- STORAGE BUCKET: images
-- ---------------------------------------------------------------
INSERT INTO storage.buckets (id, name, public)
VALUES ('images', 'images', true)
ON CONFLICT DO NOTHING;

CREATE POLICY "images_public_read" ON storage.objects
  FOR SELECT USING (bucket_id = 'images');

CREATE POLICY "images_admin_upload" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'images' AND
    auth.uid() IN (SELECT id FROM profiles WHERE role IN ('admin','editor'))
  );

CREATE POLICY "images_admin_delete" ON storage.objects
  FOR DELETE USING (
    bucket_id = 'images' AND
    auth.uid() IN (SELECT id FROM profiles WHERE role IN ('admin','editor'))
  );

-- ---------------------------------------------------------------
-- TRIGGER: créer profile automatiquement à l'inscription
-- ---------------------------------------------------------------
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, email, role)
  VALUES (NEW.id, NEW.email, 'admin');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- ---------------------------------------------------------------
-- DONNÉES INITIALES: biens de démonstration
-- ---------------------------------------------------------------
INSERT INTO biens (slug, nom, ville, quartier, type, surface, pieces, prix, prix_display, badge, roi, image_principale, images, description, caracteristiques, statut, reference) VALUES
('penthouse-neve-tzedek-280m2', 'Penthouse Neve Tzedek', 'Tel Aviv', 'Neve Tzedek', 'Penthouse', 280, 5, 4200000, '4 200 000 €', 'Exclusivité', '3.8%',
'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&auto=format&fit=crop&q=80',
ARRAY['https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&auto=format&fit=crop&q=80','https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&auto=format&fit=crop&q=80'],
'Penthouse d''exception au cœur du quartier le plus prisé de Tel Aviv. Vue panoramique sur la mer Méditerranée, terrasse privée de 80 m², finitions italiennes. Bien rare sur le marché.',
ARRAY['Vue mer 180°','Terrasse 80m²','Domotique complète','Parking x2','Cave à vin','Concierge 24h'],'actif','MI-001'),

('appartement-rothschild-180m2', 'Appartement Boulevard Rothschild', 'Tel Aviv', 'Rothschild', 'Appartement', 180, 4, 3100000, '3 100 000 €', 'Coup de cœur', '4.2%',
'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&auto=format&fit=crop&q=80',
ARRAY['https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&auto=format&fit=crop&q=80'],
'Sur le boulevard le plus emblématique d''Israël, cet appartement lumineux offre de hauts plafonds et des prestations premium. Immeuble Bauhaus classé UNESCO.',
ARRAY['Bauhaus classé UNESCO','Hauts plafonds 3.2m','Double exposition','Parquet chêne massif','Gardien','Ascenseur'],'actif','MI-002'),

('villa-herzliya-pituah-600m2', 'Villa Herzliya Pituah', 'Herzliya Pituah', NULL, 'Villa', 600, 7, 5800000, '5 800 000 €', 'Prestige', '3.2%',
'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&auto=format&fit=crop&q=80',
ARRAY['https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&auto=format&fit=crop&q=80'],
'Villa contemporaine dans le quartier diplomatique d''Herzliya Pituah. Piscine à débordement, jardin paysager, architecture contemporaine primée.',
ARRAY['Piscine à débordement','Jardin 800m²','Home cinéma','Domotique KNX','Salle de sport','Parking 4 voitures'],'actif','MI-003'),

('duplex-jerusalem-rehavia-220m2', 'Duplex Rehavia Jérusalem', 'Jérusalem', 'Rehavia', 'Duplex', 220, 5, 2800000, '2 800 000 €', 'Vue Vieille Ville', '4.5%',
'https://images.unsplash.com/photo-1538970272646-f61fabb3a8a2?w=800&auto=format&fit=crop&q=80',
ARRAY['https://images.unsplash.com/photo-1538970272646-f61fabb3a8a2?w=800&auto=format&fit=crop&q=80'],
'Duplex d''exception dans le quartier Rehavia, vue imprenable sur la Vieille Ville. Immeuble de standing, finitions premium, cave à vin.',
ARRAY['Vue Vieille Ville','Duplex 2 niveaux','Cave à vin','Terrasse panoramique','Parking'],'actif','MI-004');
