export interface Bien {
  id: string
  slug: string
  nom: string
  ville: string
  quartier: string | null
  type: string
  surface: number
  pieces: number | null
  prix: number
  prix_display: string
  badge: string | null
  roi: string | null
  image_principale: string
  images: string[]
  description: string
  caracteristiques: string[]
  statut: 'actif' | 'vendu' | 'sous_compromis' | 'loue'
  reference: string | null
  off_market: boolean
  created_at: string
  updated_at: string
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
