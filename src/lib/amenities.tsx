import React from 'react'

/**
 * Bibliothèque d'équipements (amenities) avec pictogrammes.
 *
 * Chaque entrée associe des mots-clés multilingues à une icône SVG.
 * - Sur la fiche bien publique, on détecte l'icône à partir du texte de la
 *   caractéristique (`getAmenity`).
 * - Dans l'admin, on propose ces équipements en « chips » cliquables pour une
 *   saisie rapide et cohérente (ce qui garantit la correspondance des icônes).
 */

export interface Amenity {
  key: string
  labels: { fr: string; en: string; he: string }
  /** sous-chaînes en minuscules à rechercher dans le texte de la caractéristique */
  keywords: string[]
  /** éléments internes du SVG (viewBox 24×24, stroke currentColor) */
  paths: React.ReactNode
}

export const AMENITIES: Amenity[] = [
  {
    key: 'pool',
    labels: { fr: 'Piscine', en: 'Pool', he: 'בריכה' },
    keywords: ['piscine', 'pool', 'בריכה', 'jacuzzi', 'spa'],
    paths: (
      <>
        <path d="M2 15c1.5 0 1.5 1 3 1s1.5-1 3-1 1.5 1 3 1 1.5-1 3-1 1.5 1 3 1 1.5-1 3-1" />
        <path d="M2 19.5c1.5 0 1.5 1 3 1s1.5-1 3-1 1.5 1 3 1 1.5-1 3-1 1.5 1 3 1 1.5-1 3-1" />
        <path d="M8 13V6a2 2 0 0 1 4 0" />
        <path d="M8 10h4" />
      </>
    ),
  },
  {
    key: 'sauna',
    labels: { fr: 'Sauna', en: 'Sauna', he: 'סאונה' },
    keywords: ['sauna', 'hammam', 'סאונה'],
    paths: (
      <>
        <path d="M4 21v-7h16v7" />
        <path d="M3 21h18" />
        <path d="M8 10c0-1.4-1.5-1.4-1.5-2.8S8 5 8 5" />
        <path d="M12 10c0-1.4-1.5-1.4-1.5-2.8S12 5 12 5" />
        <path d="M16 10c0-1.4-1.5-1.4-1.5-2.8S16 5 16 5" />
      </>
    ),
  },
  {
    key: 'security',
    labels: { fr: 'Sécurité 24/7', en: '24/7 Security', he: 'אבטחה' },
    keywords: ['sécurit', 'securit', 'security', 'gardien', 'surveillance', 'אבטחה', 'guard', 'concierge sécur'],
    paths: (
      <>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="M9 12l2 2 4-4" />
      </>
    ),
  },
  {
    key: 'underfloor',
    labels: { fr: 'Chauffage au sol', en: 'Underfloor heating', he: 'חימום תת-רצפתי' },
    keywords: ['chauffage au sol', 'parquet chauffant', 'sol chauffant', 'underfloor', 'floor heating', 'רצפה מחוממת', 'תת-רצפתי'],
    paths: (
      <>
        <path d="M3 5h18M3 9h18" />
        <path d="M7 21c0-2 2-2 2-4s-2-2-2-4" />
        <path d="M12 21c0-2 2-2 2-4s-2-2-2-4" />
        <path d="M17 21c0-2 2-2 2-4s-2-2-2-4" />
      </>
    ),
  },
  {
    key: 'lobby',
    labels: { fr: 'Lobby', en: 'Lobby', he: 'לובי' },
    keywords: ['lobby', 'hall', 'réception', 'reception', 'לובי'],
    paths: (
      <>
        <path d="M4 11V8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v3" />
        <path d="M2 13a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v4H2z" />
        <path d="M6 17v2M18 17v2" />
      </>
    ),
  },
  {
    key: 'elevator',
    labels: { fr: 'Ascenseur', en: 'Elevator', he: 'מעלית' },
    keywords: ['ascenseur', 'elevator', 'lift', 'מעלית'],
    paths: (
      <>
        <rect x="5" y="2" width="14" height="20" rx="1" />
        <path d="M9.5 9l2.5-2.5L14.5 9" />
        <path d="M9.5 15l2.5 2.5 2.5-2.5" />
      </>
    ),
  },
  {
    key: 'parking',
    labels: { fr: 'Parking', en: 'Parking', he: 'חניה' },
    keywords: ['parking', 'garage', 'stationnement', 'חניה'],
    paths: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M9 17V7h4a3 3 0 0 1 0 6H9" />
      </>
    ),
  },
  {
    key: 'seaview',
    labels: { fr: 'Vue mer', en: 'Sea view', he: 'נוף לים' },
    keywords: ['vue mer', 'vue sur mer', 'sea view', 'נוף לים', 'נוף ים', 'bord de mer', 'front de mer'],
    paths: (
      <>
        <circle cx="12" cy="7" r="3" />
        <path d="M2 16c1.5 0 1.5 1 3 1s1.5-1 3-1 1.5 1 3 1 1.5-1 3-1 1.5 1 3 1 1.5-1 3-1" />
        <path d="M2 20c1.5 0 1.5 1 3 1s1.5-1 3-1 1.5 1 3 1 1.5-1 3-1 1.5 1 3 1 1.5-1 3-1" />
      </>
    ),
  },
  {
    key: 'view',
    labels: { fr: 'Vue panoramique', en: 'Panoramic view', he: 'נוף פנורמי' },
    keywords: ['vue panoramique', 'vue dégagée', 'panoramic', 'נוף פנורמי', 'panorama'],
    paths: (
      <>
        <circle cx="12" cy="12" r="3" />
        <path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6-10-6-10-6z" />
      </>
    ),
  },
  {
    key: 'terrace',
    labels: { fr: 'Terrasse', en: 'Terrace', he: 'מרפסת' },
    keywords: ['terrasse', 'balcon', 'terrace', 'balcony', 'מרפסת', 'rooftop', 'toit-terrasse'],
    paths: (
      <>
        <path d="M3 21h18" />
        <path d="M5 21V10h14v11" />
        <path d="M5 14h14" />
        <path d="M9.5 10v11M14.5 10v11" />
      </>
    ),
  },
  {
    key: 'garden',
    labels: { fr: 'Jardin', en: 'Garden', he: 'גינה' },
    keywords: ['jardin', 'garden', 'גינה', 'green', 'verdure'],
    paths: (
      <>
        <path d="M12 22v-6" />
        <path d="M12 16a5 5 0 0 0 0-10 5 5 0 0 0 0 10z" />
        <path d="M8 12c-2 0-3 1.5-3 3.5M16 12c2 0 3 1.5 3 3.5" />
      </>
    ),
  },
  {
    key: 'ac',
    labels: { fr: 'Climatisation', en: 'Air conditioning', he: 'מיזוג אוויר' },
    keywords: ['climatisation', 'climatisé', 'air conditioning', 'מיזוג', 'a/c', 'clim'],
    paths: (
      <>
        <path d="M12 2v20M4.5 6l15 12M19.5 6l-15 12" />
        <path d="M12 6l-2.5-2.5M12 6l2.5-2.5M12 18l-2.5 2.5M12 18l2.5 2.5" />
      </>
    ),
  },
  {
    key: 'smart',
    labels: { fr: 'Domotique', en: 'Smart home', he: 'בית חכם' },
    keywords: ['domotique', 'smart home', 'maison connectée', 'בית חכם', 'connecté'],
    paths: (
      <>
        <path d="M3 11l9-8 9 8" />
        <path d="M5 10v11h14V10" />
        <circle cx="12" cy="15.5" r="1" />
        <path d="M9.5 13.5a3.5 3.5 0 0 1 5 0" />
      </>
    ),
  },
  {
    key: 'gym',
    labels: { fr: 'Salle de sport', en: 'Gym', he: 'חדר כושר' },
    keywords: ['salle de sport', 'gym', 'fitness', 'חדר כושר', 'sport'],
    paths: (
      <>
        <path d="M6.5 7v10M17.5 7v10M3.5 10v4M20.5 10v4M6.5 12h11" />
      </>
    ),
  },
  {
    key: 'cellar',
    labels: { fr: 'Cave à vin', en: 'Wine cellar', he: 'מרתף יין' },
    keywords: ['cave à vin', 'cave a vin', 'wine cellar', 'מרתף יין', 'cave'],
    paths: (
      <>
        <path d="M8 22h8M12 14v8" />
        <path d="M7 3h10l-1 5a4 4 0 0 1-8 0z" />
      </>
    ),
  },
  {
    key: 'fireplace',
    labels: { fr: 'Cheminée', en: 'Fireplace', he: 'אח' },
    keywords: ['cheminée', 'cheminee', 'fireplace', 'אח'],
    paths: (
      <>
        <rect x="4" y="3" width="16" height="18" rx="1" />
        <path d="M12 18c-2 0-3-1.4-3-3 0-1.6 1.2-2.2 1.6-3.4.8 1 1.4 1.1 1.4 2.2.2-1 1-1.8 1-2.8 1 1 2 2.4 2 4 0 1.6-1 3-3 3z" />
      </>
    ),
  },
  {
    key: 'concierge',
    labels: { fr: 'Conciergerie', en: 'Concierge', he: 'קונסיירז׳' },
    keywords: ['conciergerie', 'concierge', 'service hôtelier', 'קונסיירז'],
    paths: (
      <>
        <path d="M3 18h18" />
        <path d="M12 6a6 6 0 0 1 6 6v6H6v-6a6 6 0 0 1 6-6z" />
        <path d="M12 6V3M10 3h4" />
      </>
    ),
  },
  {
    key: 'shelter',
    labels: { fr: 'Mamad (abri)', en: 'Safe room (Mamad)', he: 'ממ״ד' },
    keywords: ['mamad', 'mamak', 'abri', 'safe room', 'ממ"ד', 'ממד', 'shelter'],
    paths: (
      <>
        <path d="M12 22s7-3.5 7-9V6l-7-3-7 3v7c0 5.5 7 9 7 9z" />
        <path d="M9 11.5l3-2.2 3 2.2V16H9z" />
      </>
    ),
  },
]

const STAR_PATHS: React.ReactNode = (
  <path d="M12 3l2.2 5.8L20 11l-5.8 2.2L12 19l-2.2-5.8L4 11l5.8-2.2z" />
)

/** Renvoie l'équipement correspondant au texte, ou null si aucun ne matche. */
export function getAmenity(label: string): Amenity | null {
  const t = label.toLowerCase()
  for (const a of AMENITIES) {
    if (a.keywords.some(k => t.includes(k))) return a
  }
  return null
}

/** Icône SVG d'un équipement (ou l'étoile par défaut si `paths` non fourni). */
export function AmenityIcon({ paths, size = 20 }: { paths?: React.ReactNode; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths ?? STAR_PATHS}
    </svg>
  )
}
