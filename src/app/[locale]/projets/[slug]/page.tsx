import { createClient } from '@/lib/supabase/server'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import type { Bien } from '@/types'
import { getBienNom, getBienDescription } from '@/types'
import type { Locale } from '@/i18n/config'
import { getMessages } from '@/i18n'
import { AmenityIcon, getAmenity } from '@/lib/amenities'
import { optImg, hiRes } from '@/lib/img'
import { QUARTIERS } from '@/data/quartiers'
import Parallax from '@/components/public/Parallax'
import BienGallery from '@/components/public/BienGallery'
import BienContactCard from '@/components/public/BienContactCard'
import PropertyMap from '@/components/public/PropertyMap'
import Reveal from '@/components/public/Reveal'

export const revalidate = 60

/* Evocative lifestyle copy by city — emotional storytelling layer */
const LIFESTYLE: Record<string, { fr: string; en: string; he: string }> = {
  'Tel Aviv': {
    fr: "Le matin commence par la lumière méditerranéenne sur le boulevard, un café à Neve Tzedek, la mer à quelques pas. Tel Aviv ne se visite pas — elle se vit, entre Bauhaus blanc et énergie créative ininterrompue.",
    en: 'The morning begins with Mediterranean light on the boulevard, a coffee in Neve Tzedek, the sea a few steps away. Tel Aviv is not visited — it is lived, between white Bauhaus and uninterrupted creative energy.',
    he: 'הבוקר מתחיל באור הים-תיכוני על השדרה, קפה בנווה צדק, הים במרחק צעדים. תל אביב לא מבקרים — אותה חיים.',
  },
  'Jérusalem': {
    fr: "À Jérusalem, la pierre dorée capte la lumière différemment à chaque heure. Vivre ici, c'est habiter une ville qui porte trois mille ans de profondeur — et le calme rare de ses rues bordées de pins.",
    en: 'In Jerusalem, the golden stone catches the light differently every hour. To live here is to inhabit a city carrying three thousand years of depth — and the rare calm of its pine-lined streets.',
    he: 'בירושלים, האבן הזהובה לוכדת את האור אחרת בכל שעה. לגור כאן זה לשכון בעיר הנושאת שלושת אלפים שנות עומק.',
  },
  'Herzliya Pituah': {
    fr: "Derrière les hauts murs de jardin, la discrétion absolue. Herzliya Pituah réunit ce que peu d'adresses au monde offrent ensemble : la mer, l'espace, la sécurité, et le silence.",
    en: 'Behind the high garden walls, absolute discretion. Herzliya Pituah brings together what few addresses in the world offer at once: the sea, space, security, and silence.',
    he: 'מאחורי חומות הגן הגבוהות, דיסקרטיות מוחלטת. הרצליה פיתוח מאחדת את מה שמעט כתובות בעולם מציעות יחד.',
  },
  'Netanya': {
    fr: "Les falaises tombent vers une mer infinie. Netanya conjugue l'art de vivre méditerranéen et une douceur que les familles internationales ont fait leur.",
    en: 'The cliffs fall toward an endless sea. Netanya combines Mediterranean living with a gentleness that international families have made their own.',
    he: 'הצוקים יורדים אל ים אינסופי. נתניה משלבת אורח חיים ים-תיכוני עם רכות שמשפחות בינלאומיות אימצו.',
  },
  'Césarée': {
    fr: "Entre le parcours de golf et les vestiges romains, Césarée cultive une rareté tranquille. De grandes villas, des jardins matures, et la Méditerranée pour seul horizon.",
    en: 'Between the golf course and the Roman ruins, Caesarea cultivates a quiet rarity. Large villas, mature gardens, and the Mediterranean as the only horizon.',
    he: 'בין מסלול הגולף לחורבות הרומיות, קיסריה מטפחת נדירות שקטה. וילות גדולות, גינות בוגרות, והים התיכון כאופק יחיד.',
  },
}
const LIFESTYLE_FALLBACK = {
  fr: "Une adresse où l'architecture, la lumière et l'emplacement se rencontrent. Un lieu pensé pour durer, au-delà des tendances.",
  en: 'An address where architecture, light, and location meet. A place made to endure, beyond trends.',
  he: 'כתובת שבה אדריכלות, אור ומיקום נפגשים. מקום שנועד להחזיק מעמד, מעבר למגמות.',
}

const SITE_BASE = 'https://luxuryisraelrealestate.com'

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale, slug } = await params
  const supabase = await createClient()
  const { data: bien } = await supabase.from('biens').select('nom,nom_en,nom_he,description,description_en,description_he,image_principale,ville,quartier,prix_display,type').eq('slug', slug).single()
  if (!bien) return {}
  // Récupère le nom et la description dans la langue de la page (fallback FR)
  const nomLocalise = getBienNom(bien, locale)
  const descLocalisee = getBienDescription(bien, locale)
  // Titre propre, sans doublon de marque (le template du layout ajoute « | Maison Israël »)
  const ville = bien.ville ?? ''
  const title = ville && !nomLocalise.toLowerCase().includes(ville.toLowerCase())
    ? `${nomLocalise} — ${ville}`
    : nomLocalise
  const ogTitle = `${title} | Maison Israël`
  const description = (descLocalisee ?? '').slice(0, 155) || `${bien.type ?? ''} à ${bien.quartier ?? bien.ville}, ${bien.prix_display ?? ''}.`
  return {
    title,
    description,
    alternates: {
      canonical: `${SITE_BASE}/${locale}/projets/${slug}`,
      languages: {
        fr: `${SITE_BASE}/fr/projets/${slug}`,
        en: `${SITE_BASE}/en/projets/${slug}`,
        he: `${SITE_BASE}/he/projets/${slug}`,
        'x-default': `${SITE_BASE}/fr/projets/${slug}`,
      },
    },
    openGraph: {
      title: ogTitle,
      description,
      url: `${SITE_BASE}/${locale}/projets/${slug}`,
      siteName: 'Maison Israël',
      type: 'website',
      images: bien.image_principale ? [{ url: bien.image_principale, alt: bien.nom }] : undefined,
      locale: locale === 'he' ? 'he_IL' : locale === 'en' ? 'en_US' : 'fr_FR',
    },
  }
}

export default async function BienPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params
  const messages = await getMessages(locale as Locale)
  const p = messages.properties
  const isRTL = locale === 'he'

  const supabase = await createClient()
  const { data: bien } = await supabase.from('biens').select('*').eq('slug', slug).single()
  if (!bien) notFound()

  // Versions localisées (fallback FR si pas de traduction saisie)
  const bienNomLocalise = getBienNom(bien, locale)
  const bienDescLocalisee = getBienDescription(bien, locale)

  const BASE_URL = 'https://luxuryisraelrealestate.com'

  // Page quartier correspondante (maillage interne + contexte de marché)
  const quartierPage = bien.quartier
    ? QUARTIERS.find(q =>
        q.dbQuartier === bien.quartier ||
        q.names.fr === bien.quartier ||
        q.names.en === bien.quartier)
    : undefined
  const l3 = (locale === 'he' ? 'he' : locale === 'en' ? 'en' : 'fr') as 'fr' | 'en' | 'he'

  // Prix masqué (« sur demande ») = pas de prix affiché
  const priceOnRequest = !(bien.prix_display && bien.prix_display.trim())

  // Fiche immobilière — RealEstateListing (et NON Product : un bien n'est pas un
  // article e-commerce, donc pas d'exigences « merchant » Google = retour/livraison/GTIN).
  const listingSchema = {
    '@context': 'https://schema.org',
    '@type': 'RealEstateListing',
    '@id': `${BASE_URL}/${locale}/projets/${slug}`,
    url: `${BASE_URL}/${locale}/projets/${slug}`,
    name: bienNomLocalise,
    description: bienDescLocalisee?.slice(0, 280),
    image: [bien.image_principale, ...(bien.images ?? [])].slice(0, 8),
    // Prix indiqué uniquement quand il est public (sinon « prix sur demande »).
    ...(priceOnRequest || typeof bien.prix !== 'number' ? {} : {
      offers: {
        '@type': 'Offer',
        url: `${BASE_URL}/${locale}/projets/${slug}`,
        availability: bien.statut === 'actif' ? 'https://schema.org/InStock' : 'https://schema.org/SoldOut',
        priceCurrency: 'ILS',
        price: bien.prix,
        seller: { '@type': 'Organization', name: 'Maison Israël' },
      },
    }),
    // Description structurée du bien lui-même.
    mainEntity: {
      '@type': 'Accommodation',
      name: bienNomLocalise,
      ...(bien.type ? { accommodationCategory: bien.type } : {}),
      ...(bien.surface ? { floorSize: { '@type': 'QuantitativeValue', value: bien.surface, unitCode: 'MTK' } } : {}),
      ...(bien.pieces ? { numberOfRoomsTotal: bien.pieces } : {}),
      ...((bien.ville || bien.quartier) ? {
        address: {
          '@type': 'PostalAddress',
          ...(bien.quartier ? { streetAddress: bien.quartier } : {}),
          ...(bien.ville ? { addressLocality: bien.ville } : {}),
          addressCountry: 'IL',
        },
      } : {}),
    },
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: locale === 'he' ? 'בית' : locale === 'en' ? 'Home' : 'Accueil', item: `${BASE_URL}/${locale}` },
      { '@type': 'ListItem', position: 2, name: locale === 'he' ? 'נכסים' : locale === 'en' ? 'Properties' : 'Propriétés', item: `${BASE_URL}/${locale}/projets` },
      { '@type': 'ListItem', position: 3, name: bienNomLocalise, item: `${BASE_URL}/${locale}/projets/${slug}` },
    ],
  }

  const stats = [
    [isRTL ? 'שטח' : (locale === 'en' ? 'Surface' : 'Surface'), `${bien.surface} ${p.surface}`],
    ...(bien.surface_exterieure ? [[isRTL ? 'שטח חוץ' : (locale === 'en' ? 'Outdoor' : 'Extérieur'), `${bien.surface_exterieure} ${p.surface}`]] : []),
    ...(bien.pieces ? [[isRTL ? 'חדרים' : (locale === 'en' ? 'Rooms' : 'Pièces'), `${bien.pieces} ${p.rooms}`]] : []),
    [isRTL ? 'סוג' : (locale === 'en' ? 'Type' : 'Type'), bien.type],
    ...(bien.reference ? [[isRTL ? 'מ"מ' : (locale === 'en' ? 'Ref' : 'Réf.'), bien.reference]] : []),
  ] as [string, string][]

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(listingSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <style>{`
        @keyframes bienKen { from { transform: scale(1.0); } to { transform: scale(1.035); } }
        .bien-hero-img { animation: bienKen 12s var(--ease-luxe) forwards; }
        @media (prefers-reduced-motion: reduce) { .bien-hero-img { animation: none; } }
      `}</style>

      {/* ── CINEMATIC HERO — fullscreen ───────────────────── */}
      <section style={{ height: '100vh', minHeight: '640px', overflow: 'hidden', position: 'relative' }}>
        <Parallax>
          <Image src={hiRes(bien.image_principale)} alt={bienNomLocalise} fill priority sizes="100vw" className="bien-hero-img" style={{ objectFit: 'cover' }} />
        </Parallax>
        {/* cinematic gradient */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(8,8,10,0.5) 0%, rgba(8,8,10,0.05) 30%, rgba(8,8,10,0.3) 60%, rgba(8,8,10,0.92) 100%)' }} />

        {bien.badge && (
          <div style={{ position: 'absolute', top: '6.5rem', [isRTL ? 'right' : 'left']: '2.5rem', display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(8,8,10,0.4)', backdropFilter: 'blur(10px)', border: '1px solid rgba(212,184,136,0.3)', color: '#FAF8F4', padding: '7px 14px', fontSize: '0.65rem', letterSpacing: '0.28em', textTransform: 'uppercase', fontFamily: "'DM Sans', sans-serif" }}>
            <span style={{ width: 4, height: 4, borderRadius: '50%', background: 'var(--gold-500)' }} />
            {bien.badge}
          </div>
        )}

        <Reveal style={{ position: 'absolute', bottom: '4rem', [isRTL ? 'right' : 'left']: '3rem', [isRTL ? 'left' : 'right']: '3rem', color: '#fff', direction: isRTL ? 'rtl' : 'ltr' }} distance={36}>
          <p style={{ fontSize: '0.72rem', color: 'var(--gold-500)', letterSpacing: isRTL ? '0' : '0.3em', textTransform: isRTL ? 'none' : 'uppercase', marginBottom: '1rem', fontFamily: "'DM Sans', sans-serif" }}>
            {bien.quartier ? `${bien.quartier} · ${bien.ville}` : bien.ville}
          </p>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(2.4rem, 6vw, 5rem)', fontWeight: 300, lineHeight: 1.02, marginBottom: '1rem', letterSpacing: '-0.01em', maxWidth: '18ch' }}>
            {bienNomLocalise}
          </h1>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', fontWeight: 300, fontStyle: 'italic', color: '#E8D5A3' }}>
            {bien.prix_display && bien.prix_display.trim() ? bien.prix_display : (locale === 'he' ? 'מחיר לפי בקשה' : locale === 'en' ? 'Price on request' : 'Prix sur demande')}
          </p>
        </Reveal>
      </section>

      {/* ── ARCHITECTURAL STAT ROW ────────────────────────── */}
      <section style={{ background: '#08080A', borderBottom: '1px solid rgba(200,169,110,0.1)', direction: isRTL ? 'rtl' : 'ltr' }}>
        <Reveal style={{ maxWidth: '1100px', margin: '0 auto', padding: '3rem 2rem', display: 'flex', flexWrap: 'wrap', gap: '2rem 0', justifyContent: 'center' }}>
          {stats.map(([label, value], i) => (
            <div key={label} style={{
              flex: '1 1 auto', minWidth: '150px', textAlign: 'center',
              borderInlineStart: i === 0 ? 'none' : '1px solid rgba(200,169,110,0.18)',
              padding: '0 1.5rem',
            }}>
              <div style={{ fontSize: '0.62rem', color: 'var(--gold-500)', letterSpacing: '0.22em', textTransform: 'uppercase', marginBottom: '0.7rem', fontFamily: "'DM Sans', sans-serif" }}>{label}</div>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.7rem', fontWeight: 300, color: '#FAF8F4' }}>{value}</div>
            </div>
          ))}
        </Reveal>
      </section>

      {/* ── EDITORIAL DESCRIPTION ─────────────────────────── */}
      <section style={{ padding: '6rem 2rem', background: '#0A0A0B', direction: isRTL ? 'rtl' : 'ltr' }}>
        <Reveal style={{ maxWidth: '760px', width: '100%', margin: '0 auto', textAlign: isRTL ? 'right' : 'left' }}>
          <p style={{ fontSize: '0.7rem', color: 'var(--gold-500)', letterSpacing: '0.3em', textTransform: isRTL ? 'none' : 'uppercase', marginBottom: '1rem', fontFamily: "'DM Sans', sans-serif" }}>
            {p.description}
          </p>
          <div style={{ width: '52px', height: '1px', background: 'rgba(200,169,110,0.5)', margin: isRTL ? '0 0 2.2rem auto' : '0 0 2.2rem 0' }} />
          <div style={{
            fontFamily: "'Cormorant Garamond', serif",
            color: 'rgba(240,238,233,0.82)',
            lineHeight: 1.85,
            fontSize: 'clamp(1.12rem, 1.5vw, 1.32rem)',
            fontWeight: 300,
            overflowWrap: 'break-word',
            hyphens: 'auto',
            maxWidth: '100%',
          }}>
            {(bienDescLocalisee ?? '')
              .split(/\n{1,}/)
              .map((s) => s.trim())
              .filter(Boolean)
              .map((para, i) => (
                <p
                  key={i}
                  style={{ margin: i === 0 ? 0 : '1.25rem 0 0', fontStyle: 'italic' }}
                >
                  {para}
                </p>
              ))}
          </div>
        </Reveal>
      </section>

      {/* ── GALLERY (full-bleed) ──────────────────────────── */}
      {bien.images && bien.images.length > 0 && (
        <BienGallery images={bien.images} mainImage={bien.image_principale} nom={bienNomLocalise} />
      )}

      {/* ── PLAN D'ÉTAGE ──────────────────────────────────── */}
      {bien.plan && (
        <section style={{ padding: '5rem 2rem', background: '#0A0A0B', direction: isRTL ? 'rtl' : 'ltr' }}>
          <Reveal style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
            <p style={{ fontSize: '0.7rem', color: 'var(--gold-500)', letterSpacing: '0.3em', textTransform: isRTL ? 'none' : 'uppercase', marginBottom: '1.5rem', fontFamily: "'DM Sans', sans-serif" }}>
              {locale === 'he' ? 'תוכנית' : locale === 'en' ? 'Floor Plan' : "Plan"}
            </p>
            {/\.pdf($|\?)/i.test(bien.plan) ? (
              <a href={bien.plan} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem', color: 'var(--gold-500)', textDecoration: 'none', fontSize: '0.85rem', border: '1px solid rgba(200,169,110,0.4)', padding: '0.9rem 2rem', fontFamily: "'DM Sans', sans-serif", letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                {locale === 'he' ? 'צפה בתוכנית (PDF)' : locale === 'en' ? 'View floor plan (PDF)' : 'Voir le plan (PDF)'}
              </a>
            ) : (
              <a href={bien.plan} target="_blank" rel="noopener noreferrer" style={{ display: 'block' }}>
                <img src={optImg(bien.plan, 1080, 75)} loading="lazy" alt={locale === 'he' ? 'תוכנית' : locale === 'en' ? 'Floor plan' : "Plan d'étage"} style={{ width: '100%', maxWidth: '820px', height: 'auto', margin: '0 auto', display: 'block', background: '#fff', padding: '1rem', borderRadius: '2px' }} />
              </a>
            )}
          </Reveal>
        </section>
      )}

      {/* ── LIFESTYLE STORYTELLING ────────────────────────── */}
      <section style={{ position: 'relative', padding: '8rem 2rem', overflow: 'hidden', direction: isRTL ? 'rtl' : 'ltr' }}>
        <div style={{ position: 'absolute', inset: 0, opacity: 0.14 }}><Image src={bien.image_principale} alt="" fill sizes="100vw" quality={55} style={{ objectFit: 'cover' }} /></div>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, #0A0A0B 0%, rgba(10,10,11,0.85) 50%, #0A0A0B 100%)' }} />
        <Reveal style={{ position: 'relative', maxWidth: '760px', margin: '0 auto', textAlign: 'center' }}>
          <p style={{ fontSize: '0.7rem', color: 'var(--gold-500)', letterSpacing: '0.3em', textTransform: isRTL ? 'none' : 'uppercase', marginBottom: '1.6rem', fontFamily: "'DM Sans', sans-serif" }}>
            {locale === 'he' ? `לחיות ב${bien.quartier ?? bien.ville}` : locale === 'en' ? `Living in ${bien.quartier ?? bien.ville}` : `Vivre à ${bien.quartier ?? bien.ville}`}
          </p>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(1.5rem, 3vw, 2.3rem)', fontWeight: 300, color: 'rgba(250,248,244,0.92)', lineHeight: 1.5, fontStyle: 'italic' }}>
            {(LIFESTYLE[bien.ville] ?? LIFESTYLE_FALLBACK)[locale === 'he' ? 'he' : locale === 'en' ? 'en' : 'fr']}
          </p>
          <div style={{ width: '60px', height: '1px', background: 'linear-gradient(90deg, transparent, var(--gold-500), transparent)', margin: '2.6rem auto 0' }} />
        </Reveal>
      </section>

      {/* ── LE QUARTIER — contexte de marché + maillage interne ── */}
      {quartierPage && (
        <section style={{ padding: '5rem 2rem', background: '#0F1012', borderTop: '1px solid rgba(200,169,110,0.08)', direction: isRTL ? 'rtl' : 'ltr' }}>
          <Reveal style={{ maxWidth: '760px', margin: '0 auto' }}>
            <p style={{ fontSize: '0.7rem', color: 'var(--gold-500)', letterSpacing: isRTL ? '0' : '0.3em', textTransform: isRTL ? 'none' : 'uppercase', marginBottom: '1rem', fontFamily: "'DM Sans', sans-serif" }}>
              {locale === 'he' ? 'השכונה' : locale === 'en' ? 'The Neighborhood' : 'Le quartier'}
            </p>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(1.7rem, 3vw, 2.4rem)', fontWeight: 300, color: '#FAFAF9', marginBottom: '1.2rem' }}>
              {quartierPage.names[l3]}
            </h2>
            <p style={{ color: 'rgba(216,212,204,0.75)', fontSize: '0.98rem', lineHeight: 1.85, marginBottom: '1.6rem' }}>
              {quartierPage.intro[l3]}
            </p>
            <p style={{ fontSize: '0.78rem', color: '#8A8780', marginBottom: '2rem', fontFamily: "'DM Sans', sans-serif" }}>
              {locale === 'he' ? 'טווח מחירים' : locale === 'en' ? 'Price range' : 'Fourchette de prix'} : <span style={{ color: '#C8A96E' }}>{quartierPage.facts.priceRange}</span>
            </p>
            <Link
              href={`/${locale}/quartiers/${quartierPage.city}/${quartierPage.slug}`}
              style={{ display: 'inline-block', border: '1px solid rgba(200,169,110,0.4)', color: '#C8A96E', padding: '0.9rem 2.2rem', fontFamily: 'DM Sans, sans-serif', fontSize: '0.72rem', letterSpacing: isRTL ? '0.05em' : '0.18em', textTransform: isRTL ? 'none' : 'uppercase', textDecoration: 'none' }}
            >
              {locale === 'he' ? `גלה את ${quartierPage.names.he} ←` : locale === 'en' ? `Discover ${quartierPage.names.en} →` : `Découvrir ${quartierPage.names.fr} →`}
            </Link>
          </Reveal>
        </section>
      )}

      {/* ── DETAILS: features + map + contact ─────────────── */}
      <section id="contact" style={{ padding: '5rem 2rem', background: '#0A0A0B', direction: isRTL ? 'rtl' : 'ltr', scrollMarginTop: '80px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }} className="grid-detail">
          <div>
            {bien.caracteristiques?.length > 0 && (
              <Reveal style={{ marginBottom: '3.5rem' }}>
                <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.9rem', fontWeight: 300, color: '#FAF8F4', marginBottom: '1.4rem' }}>{p.features}</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '0.5rem' }}>
                  {bien.caracteristiques.map((c: string) => (
                    <div key={c} style={{ display: 'flex', alignItems: 'center', gap: '0.7rem', padding: '0.7rem 0', borderBottom: '1px solid rgba(200,169,110,0.1)' }}>
                      <span style={{ color: 'var(--gold-500)', display: 'flex', flexShrink: 0 }}>
                        <AmenityIcon paths={getAmenity(c)?.paths} size={20} />
                      </span>
                      <span style={{ fontSize: '0.92rem', color: '#D8D4CC' }}>{c}</span>
                    </div>
                  ))}
                </div>
              </Reveal>
            )}

            {/* Map */}
            <Reveal>
              <PropertyMap
                ville={bien.ville}
                quartier={bien.quartier ?? null}
                locale={locale}
                isRTL={isRTL}
              />
            </Reveal>
          </div>

          {/* Contact card — sticky */}
          <div className="detail-contact-card">
            <BienContactCard
              bienNom={bienNomLocalise}
              bienPrix={bien.prix_display}
              bienRef={bien.reference}
              locale={locale}
              isRTL={isRTL}
              messages={messages}
            />
          </div>
        </div>
      </section>

      {/* ── BARRE D'ACTION MOBILE — sticky, à portée de pouce ── */}
      <style>{`
        .bien-action-bar { display: none; }
        @media (max-width: 900px) {
          .bien-action-bar {
            position: fixed; bottom: 0; left: 0; right: 0; z-index: 90;
            display: grid; grid-template-columns: 1fr 1fr 1.4fr;
            background: rgba(10,10,11,0.97); backdrop-filter: blur(12px);
            border-top: 1px solid rgba(200,169,110,0.25);
            padding: 0.55rem 0.6rem calc(0.55rem + env(safe-area-inset-bottom));
            gap: 0.5rem;
          }
          .bien-action-bar a {
            display: flex; align-items: center; justify-content: center; gap: 0.45rem;
            min-height: 46px; text-decoration: none;
            font-family: 'DM Sans', sans-serif; font-size: 0.7rem; font-weight: 600;
            letter-spacing: 0.08em; text-transform: uppercase; border-radius: 2px;
          }
          .bien-action-bar .bab-ghost { border: 1px solid rgba(200,169,110,0.4); color: #E8D5A3; }
          .bien-action-bar .bab-primary { background: #C8A96E; color: #0A0A0B; }
          /* Le flottant WhatsApp et la tab bar générale sont redondants ici :
             sur une fiche bien, la priorité mobile est le contact, pas la navigation. */
          .wa-float { display: none !important; }
          .mobile-tab-bar { display: none !important; }
        }
      `}</style>
      <nav className="bien-action-bar" aria-label={locale === 'he' ? 'יצירת קשר' : 'Contact'}>
        <a
          href={`https://wa.me/972555002640?text=${encodeURIComponent(
            locale === 'he' ? `שלום, אשמח לפרטים על ${bienNomLocalise}`
            : locale === 'en' ? `Hello, I would like more information about ${bienNomLocalise}`
            : `Bonjour, je souhaite plus d'informations sur ${bienNomLocalise}`)}`}
          target="_blank" rel="noopener noreferrer" className="bab-ghost"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm5.4 14.1c-.2.7-1.3 1.3-1.9 1.4-.5.1-1.1.1-1.8-.1-.4-.1-1-.3-1.7-.6-2.9-1.3-4.8-4.2-5-4.4-.1-.2-1.2-1.6-1.2-3s.8-2.1 1-2.4c.3-.3.6-.4.8-.4h.6c.2 0 .4 0 .6.5s.8 1.9.8 2c.1.1.1.3 0 .5-.3.7-.7.9-.5 1.2.8 1.3 1.7 2.1 2.9 2.7.3.2.5.1.7-.1l.9-1.1c.2-.3.4-.2.7-.1l2 .9c.3.2.5.3.6.4 0 .1 0 .5-.2 1Z"/></svg>
          WhatsApp
        </a>
        <a href="tel:+972555002640" className="bab-ghost">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3-8.7A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.8a2 2 0 0 1-.4 2.1L8 10a16 16 0 0 0 6 6l1.4-1.3a2 2 0 0 1 2.1-.5c.9.3 1.9.6 2.8.7a2 2 0 0 1 1.7 2Z"/></svg>
          {locale === 'he' ? 'שיחה' : locale === 'en' ? 'Call' : 'Appeler'}
        </a>
        <a href="#contact" className="bab-primary">
          {locale === 'he' ? 'בקשת מידע' : locale === 'en' ? 'Inquire' : 'Être contacté'}
        </a>
      </nav>
    </>
  )
}
