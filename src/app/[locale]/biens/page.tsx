import Link from 'next/link'
import type { Metadata } from 'next'
import type { Locale } from '@/i18n/config'
import { PROPERTY_TYPES } from '@/data/property-types'

const BASE_URL = 'https://luxuryisraelrealestate.com'

const META: Record<Locale, { title: string; description: string; tag: string; h1: string; subtitle: string }> = {
  fr: {
    title: 'Types de Biens — Penthouses, Villas, Patrimoine',
    description: 'Explorez l\'immobilier de prestige en Israël par type — penthouses, villas, maisons mandataires, propriétés bord de mer.',
    tag: 'Types de biens',
    h1: 'Explorer par type de propriété',
    subtitle: 'Chaque catégorie a sa géographie, son profil acheteur, et sa logique de valeur.',
  },
  en: {
    title: 'Property Types — Penthouses, Villas, Heritage',
    description: 'Explore Israeli luxury real estate by type — penthouses, villas, Mandate heritage houses, seafront properties.',
    tag: 'Property types',
    h1: 'Explore by Property Type',
    subtitle: 'Each category has its own geography, buyer profile, and value logic.',
  },
  he: {
    title: 'סוגי נכסים — פנטהאוזים, וילות, נכסי מורשת',
    description: 'גלה את הנדל"ן היוקרתי בישראל לפי סוג.',
    tag: 'סוגי נכסים',
    h1: 'גלה לפי סוג נכס',
    subtitle: 'לכל קטגוריה יש גיאוגרפיה, פרופיל קונה והגיון ערך משלה.',
  },
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const meta = META[(locale as Locale) || 'fr'] ?? META.fr
  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: `${BASE_URL}/${locale}/biens`,
      languages: {
        fr: `${BASE_URL}/fr/biens`,
        en: `${BASE_URL}/en/biens`,
        he: `${BASE_URL}/he/biens`,
        'x-default': `${BASE_URL}/fr/biens`,
      },
    },
  }
}

export default async function BiensIndexPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const meta = META[(locale as Locale) || 'fr'] ?? META.fr
  const l = (locale === 'he' ? 'he' : locale === 'en' ? 'en' : 'fr') as 'fr' | 'en' | 'he'
  const isRTL = locale === 'he'

  return (
    <>
      <div style={{ paddingTop: '80px' }} />
      <section style={{ padding: '6rem 2rem 4rem', background: '#0A0A0B', borderBottom: '1px solid rgba(200,169,110,0.1)', direction: isRTL ? 'rtl' : 'ltr', textAlign: 'center' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <p style={{ fontSize: '0.7rem', letterSpacing: isRTL ? '0' : '0.3em', textTransform: isRTL ? 'none' : 'uppercase', color: '#C8A96E', marginBottom: '1.2rem' }}>
            {meta.tag}
          </p>
          <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2.4rem, 5vw, 4rem)', fontWeight: 300, color: '#FAFAF9', marginBottom: '1.4rem', lineHeight: 1.1 }}>
            {meta.h1}
          </h1>
          <div style={{ width: '60px', height: '1px', background: '#C8A96E', margin: '0 auto 1.4rem' }} />
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '1.05rem', lineHeight: 1.7, maxWidth: '640px', margin: '0 auto' }}>
            {meta.subtitle}
          </p>
        </div>
      </section>

      <section style={{ padding: '5rem 2rem 8rem', background: '#0A0A0B', direction: isRTL ? 'rtl' : 'ltr' }}>
        <div style={{ maxWidth: '1300px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem' }}>
          {PROPERTY_TYPES.map((t) => (
            <Link key={t.slug} href={`/${locale}/biens/${t.slug}`} style={{ textDecoration: 'none' }} className="seo-card">
              <div style={{ aspectRatio: '4/3', overflow: 'hidden', marginBottom: '1.2rem', position: 'relative' }}>
                <img src={t.hero} alt={t.names[l]} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s ease' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 50%, rgba(10,10,11,0.6) 100%)' }} />
              </div>
              <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.6rem', color: '#FAFAF9', fontWeight: 400, marginBottom: '0.5rem' }}>
                {t.names[l]}
              </h2>
              <p style={{ color: '#8A8B91', fontSize: '0.92rem', lineHeight: 1.7, marginBottom: '0.8rem' }}>
                {t.tagline[l]}
              </p>
              <p style={{ fontSize: '0.7rem', color: '#C8A96E', letterSpacing: '0.18em', textTransform: 'uppercase', fontFamily: "'DM Sans', sans-serif" }}>
                {t.facts.priceRange}
              </p>
            </Link>
          ))}
        </div>
      </section>

      <BiensSeo locale={locale} />

      <style>{`.seo-card:hover img { transform: scale(1.04); }`}</style>
    </>
  )
}

function BiensSeo({ locale }: { locale: string }) {
  const isRTL = locale === 'he'
  const content = {
    fr: {
      title: 'Tous les types de biens de prestige en Israël',
      paras: [
        "Le marché immobilier de prestige israélien offre une grande diversité de biens, chacun répondant à des attentes précises. Les penthouses, prisés à Tel Aviv et Netanya, séduisent par leurs terrasses panoramiques, leurs vues mer à 180° et leurs prestations haut de gamme — domotique, parking multiple, services de conciergerie.",
        "Les villas, concentrées à Herzliya Pituah, Césarée et dans certains quartiers de Jérusalem, offrent espace, intimité et jardins paysagers, souvent avec piscine à débordement et accès direct à la plage. Les appartements de standing, du Bauhaus rénové de Rothschild aux résidences neuves de Sarona, conviennent aussi bien à la résidence principale qu'à l'investissement locatif.",
        "Les maisons de caractère — demeures templières, maisons mandataires et biens patrimoniaux en pierre — représentent un segment rare et recherché, notamment dans la Colonie allemande de Jérusalem et la vieille Jaffa. Quel que soit le type de bien recherché, Maison Israël vous accompagne dans une acquisition sécurisée, de la sélection à la signature.",
      ],
    },
    en: {
      title: 'Every type of luxury property in Israel',
      paras: [
        "The Israeli luxury real estate market offers great diversity, each property type meeting specific expectations. Penthouses, popular in Tel Aviv and Netanya, stand out for their panoramic terraces, 180° sea views and premium features — home automation, multiple parking, concierge services.",
        "Villas, concentrated in Herzliya Pituah, Caesarea and certain Jerusalem neighborhoods, offer space, privacy and landscaped gardens, often with infinity pools and direct beach access. High-end apartments, from renovated Bauhaus on Rothschild to new Sarona residences, suit both primary residences and rental investment.",
        "Character homes — Templer houses, mandate-era residences and heritage stone properties — represent a rare and sought-after segment, notably in Jerusalem's German Colony and Old Jaffa. Whatever property type you seek, Maison Israël supports you in a secure acquisition, from selection to signing.",
      ],
    },
    he: {
      title: 'כל סוגי נכסי היוקרה בישראל',
      paras: [
        'שוק נדל"ן היוקרה הישראלי מציע מגוון רחב, כשכל סוג נכס עונה על ציפיות מסוימות. פנטהאוזים, מבוקשים בתל אביב ונתניה, בולטים במרפסות הפנורמיות שלהם, נוף ים ב-180° ומפרט עשיר — מערכות חכמות, חניות מרובות ושירותי קונסיירז\'.',
        'וילות, המרוכזות בהרצליה פיתוח, קיסריה ובחלק משכונות ירושלים, מציעות מרחב, פרטיות וגינות מעוצבות, לעיתים עם בריכת אינפיניטי וגישה ישירה לחוף. דירות יוקרה, מבאוהאוס משופץ ברוטשילד ועד דירות חדשות בסרונה, מתאימות הן למגורים והן להשקעה.',
        'בתים בעלי אופי — בתי טמפלרים, בתי תקופת המנדט ונכסי מורשת מאבן — מהווים נתח נדיר ומבוקש, בעיקר במושבה הגרמנית בירושלים וביפו העתיקה. בכל סוג נכס שתחפשו, מייזון ישראל מלווה אתכם ברכישה בטוחה, מהבחירה ועד החתימה.',
      ],
    },
  }
  const c = content[(locale as keyof typeof content)] ?? content.fr
  return (
    <section style={{ background: '#0A0A0B', padding: '4rem clamp(1.25rem,5vw,3rem) 5rem', borderTop: '1px solid rgba(200,169,110,0.08)', direction: isRTL ? 'rtl' : 'ltr' }}>
      <div style={{ maxWidth: '880px', margin: '0 auto' }}>
        <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(1.8rem,4vw,2.6rem)', fontWeight: 300, color: '#FAFAF9', marginBottom: '1.6rem' }}>{c.title}</h2>
        {c.paras.map((para, i) => (
          <p key={i} style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.95rem', fontWeight: 300, color: 'rgba(212,213,216,0.8)', lineHeight: 1.85, marginBottom: '1.2rem' }}>{para}</p>
        ))}
      </div>
    </section>
  )
}
