import { createClient } from '@/lib/supabase/server'
import HeroManager from '@/components/admin/HeroManager'
import EditorialImageManager from '@/components/admin/EditorialImageManager'
import CityImagesManager from '@/components/admin/CityImagesManager'

export const dynamic = 'force-dynamic'

export default async function AdminHero() {
  const supabase = await createClient()
  const { data } = await supabase
    .from('site_settings')
    .select('value')
    .eq('key', 'hero')
    .single()

  const images: string[] = Array.isArray(data?.value?.images) ? data!.value.images : []

  const { data: editorialData } = await supabase
    .from('site_settings')
    .select('value')
    .eq('key', 'editorial')
    .single()
  const editorialImage: string =
    (editorialData?.value as { home_editorial?: string } | null)?.home_editorial || '/hero/slide2.jpg'

  const { data: cityData } = await supabase
    .from('site_settings')
    .select('value')
    .eq('key', 'city_images')
    .single()
  const cityImages: Record<string, string> =
    (cityData?.value as Record<string, string> | null) || {}

  return (
    <div>
      <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2.5rem', fontWeight: 400, color: '#fff', marginBottom: '0.5rem' }}>
        Page d&apos;accueil — Hero
      </h1>
      <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem', marginBottom: '2rem', maxWidth: '640px' }}>
        Gérez les photos du diaporama en haut de la page d&apos;accueil. Uploadez, réorganisez ou supprimez les images.
        Les changements sont appliqués au site en direct dès l&apos;enregistrement (sans redéploiement).
      </p>

      <HeroManager initialImages={images} />

      <EditorialImageManager initialImage={editorialImage} />

      <CityImagesManager initial={cityImages} />
    </div>
  )
}
