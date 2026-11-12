/**
 * Route une URL d'image à travers l'optimiseur Next/Vercel (`/_next/image`).
 *
 * Pourquoi : servir les originaux Supabase directement consomme l'egress
 * Supabase à chaque visiteur. Via l'optimiseur, Supabase n'est sollicité
 * qu'une fois par variante ; ensuite l'image (AVIF/WebP redimensionnée)
 * est servie par le CDN Vercel.
 *
 * À utiliser pour les `<img>` bruts (lightbox, admin, plan…) ; les composants
 * publics utilisent `next/image` qui fait la même chose automatiquement.
 *
 * `w` doit appartenir aux tailles autorisées par Next :
 * 16,32,48,64,96,128,256,384 (imageSizes) · 640,750,828,1080,1200,1920,2048,3840 (deviceSizes)
 */
const ALLOWED_HOSTS = ['supabase.co', 'images.unsplash.com']

/**
 * Force une version haute résolution pour les images Unsplash dont l'URL fige
 * une petite largeur (`?w=800`), sinon elles sont floues en plein écran (hero).
 * Les uploads Supabase (sans `?w=`) ne sont pas modifiés.
 */
export function hiRes(url: string | null | undefined, w: number = 2000): string {
  if (!url) return ''
  if (url.includes('images.unsplash.com') && /[?&]w=\d+/.test(url)) {
    return url.replace(/([?&]w=)\d+/, `$1${w}`)
  }
  return url
}

export function optImg(url: string | null | undefined, w: number = 1080, q: number = 70): string {
  if (!url) return ''
  // Chemins locaux (public/) et hôtes autorisés uniquement — sinon URL d'origine
  const isLocal = url.startsWith('/')
  const isAllowed = isLocal || ALLOWED_HOSTS.some(h => url.includes(h))
  if (!isAllowed) return url
  return `/_next/image?url=${encodeURIComponent(url)}&w=${w}&q=${q}`
}
