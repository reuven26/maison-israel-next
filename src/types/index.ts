export interface Bien {
  id: string
  slug: string
  nom: string                       // FR (par défaut)
  nom_en?: string | null            // EN (fallback sur nom)
  nom_he?: string | null            // HE (fallback sur nom)
  ville: string
  quartier: string | null
  type: string
  surface: number
  surface_exterieure?: number | null   // surface extérieure (terrasse, jardin) en m²
  pieces: number | null
  prix: number
  prix_display: string
  badge: string | null
  roi: string | null
  image_principale: string
  images: string[]
  plan?: string | null                 // plan d'étage (image ou PDF)
  description: string               // FR (par défaut)
  description_en?: string | null    // EN (fallback sur description)
  description_he?: string | null    // HE (fallback sur description)
  caracteristiques: string[]
  statut: 'actif' | 'vendu' | 'sous_compromis' | 'loue'
  reference: string | null
  off_market: boolean
  masque?: boolean | null              // masqué : retiré de toutes les listes publiques
  created_at: string
  updated_at: string
}

// Helpers de localisation : retourne la valeur traduite, fallback sur FR
export function getBienNom(bien: Pick<Bien, 'nom' | 'nom_en' | 'nom_he'>, locale: string): string {
  if (locale === 'en' && bien.nom_en) return bien.nom_en
  if (locale === 'he' && bien.nom_he) return bien.nom_he
  return bien.nom
}

export function getBienDescription(
  bien: Pick<Bien, 'description' | 'description_en' | 'description_he'>,
  locale: string,
): string {
  if (locale === 'en' && bien.description_en) return bien.description_en
  if (locale === 'he' && bien.description_he) return bien.description_he
  return bien.description
}

export interface Article {
  id: string
  slug: string
  titre: string
  sous_titre: string | null
  contenu: string
  extrait: string | null
  image: string | null
  auteur: string
  categorie: string
  tags: string[]
  statut: 'publie' | 'brouillon'
  date_publication: string | null
  created_at: string
  updated_at: string
}

export interface Lead {
  id: string
  nom: string
  email: string
  telephone: string | null
  message: string | null
  bien_id: string | null
  source: string | null
  statut: 'nouveau' | 'contacte' | 'qualifie' | 'converti' | 'ferme'
  notes: string | null
  created_at: string
}

export interface Profile {
  id: string
  email: string
  role: 'admin' | 'editor'
  nom: string | null
  created_at: string
}
