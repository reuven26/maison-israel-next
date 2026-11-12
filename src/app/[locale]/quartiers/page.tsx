import Link from 'next/link'
import type { Metadata } from 'next'
import type { Locale } from '@/i18n/config'
import { QUARTIERS } from '@/data/quartiers'

const BASE_URL = 'https://luxuryisraelrealestate.com'

const META: Record<Locale, { title: string; description: string; h1: string; tag: string; subtitle: string }> = {
  fr: {
    title: 'Quartiers de Luxe en Israël — Talbieh, Neve Tzedek, Rothschild',
    description: 'Découvrez les quartiers premium d\'Israël : Talbieh, Réhavia, Neve Tzedek, Rothschild, Galei Tchelet. Inventaire curaté par nos conseillers.',
    tag: 'Quartiers',
    h1: 'Les Quartiers Premium d\'Israël',
    subtitle: 'Une géographie de l\'excellence — de Talbieh à Galei Tchelet, les adresses qui définissent le luxe israélien.',
  },
  en: {
    title: 'Luxury Neighborhoods in Israel — Talbiyeh, Neve Tzedek, Rothschild',
    description: "Discover Israel's prime quarters: Talbiyeh, Rehavia, Neve Tzedek, Rothschild, Galei Tchelet. Inventory curated by our advisors.",
    tag: 'Neighborhoods',
    h1: "Israel's Premium Neighborhoods",
    subtitle: 'A geography of excellence — from Talbiyeh to Galei Tchelet, the addresses that define Israeli luxury.',
  },
  he: {
    title: 'שכונות יוקרה בישראל — טלביה, נווה צדק, רוטשילד',
    description: 'גלה את השכונות הפרמיום של ישראל.',
    tag: 'שכונות',
    h1: 'השכונות הפרמיום של ישראל',
    subtitle: 'גיאוגרפיה של מצוינות — מטלביה לגלי תכלת.',
  },
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const meta = META[(locale as Locale) || 'fr'] ?? META.fr
  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: `${BASE_URL}/${locale}/quartiers`,
      languages: {
        fr: `${BASE_URL}/fr/quartiers`,
        en: `${BASE_URL}/en/quartiers`,
        he: `${BASE_URL}/he/quartiers`,
        'x-default': `${BASE_URL}/fr/quartiers`,
      },
    },
  }
}

const CITY_LABELS: Record<string, { fr: string; en: string; he: string }> = {
  jerusalem: { fr: 'Jérusalem', en: 'Jerusalem', he: 'ירושלים' },
  'tel-aviv': { fr: 'Tel Aviv', en: 'Tel Aviv', he: 'תל אביב' },
  'herzliya-pituah': { fr: 'Herzliya Pituah', en: 'Herzliya Pituah', he: 'הרצליה פיתוח' },
  caesarea: { fr: 'Césarée', en: 'Caesarea', he: 'קיסריה' },
  netanya: { fr: 'Netanya', en: 'Netanya', he: 'נתניה' },
}

export default async function QuartiersIndexPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const meta = META[(locale as Locale) || 'fr'] ?? META.fr
  const l = (locale === 'he' ? 'he' : locale === 'en' ? 'en' : 'fr') as 'fr' | 'en' | 'he'
  const isRTL = locale === 'he'

  // Group by city
  const grouped = QUARTIERS.reduce<Record<string, typeof QUARTIERS>>((acc, q) => {
    if (!acc[q.city]) acc[q.city] = []
    acc[q.city].push(q)
    return acc
  }, {})

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
        <div style={{ maxWidth: '1300px', margin: '0 auto' }}>
          {Object.entries(grouped).map(([city, quartiers], idx) => (
            <div key={city} style={{ marginBottom: '5rem' }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '1.2rem', marginBottom: '2.5rem', borderBottom: '1px solid rgba(200,169,110,0.15)', paddingBottom: '1rem' }}>
                <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.9rem', color: '#FAFAF9', fontWeight: 300 }}>
                  {CITY_LABELS[city]?.[l] ?? city}
                </h2>
                <Link href={`/${locale}/villes/${city}`} style={{ color: '#C8A96E', fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase', textDecoration: 'none', fontFamily: "'DM Sans', sans-serif" }}>
                  {l === 'he' ? 'סקירת העיר' : l === 'en' ? 'City overview' : 'Vue de la ville'} →
                </Link>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2rem' }}>
                {quartiers.map((q) => (
                  <Link key={q.slug} href={`/${locale}/quartiers/${q.city}/${q.slug}`} style={{ textDecoration: 'none' }} className="quartier-card">
                    <div style={{ aspectRatio: '4/3', overflow: 'hidden', position: 'relative', marginBottom: '1rem' }}>
                      <img src={q.hero} alt={q.names[l]} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s ease' }} />
                      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 50%, rgba(10,10,11,0.6) 100%)' }} />
                    </div>
                    <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.5rem', color: '#FAFAF9', fontWeight: 400, marginBottom: '0.4rem' }}>
                      {q.names[l]}
                    </h3>
                    <p style={{ color: '#8A8B91', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '0.8rem' }}>
                      {q.tagline[l]}
                    </p>
                    <p style={{ fontSize: '0.7rem', color: '#C8A96E', letterSpacing: '0.18em', textTransform: 'uppercase', fontFamily: "'DM Sans', sans-serif" }}>
                      {q.facts.priceRange}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <QuartiersSeo locale={locale} />

      <style>{`.quartier-card:hover img { transform: scale(1.04); }`}</style>
    </>
  )
}

function QuartiersSeo({ locale }: { locale: string }) {
  const isRTL = locale === 'he'
  const content = {
    fr: {
      title: 'Choisir le bon quartier en Israël',
      paras: [
        "Le choix du quartier est déterminant dans tout achat immobilier en Israël. Chaque secteur possède son atmosphère, sa clientèle et son potentiel de valorisation. À Tel Aviv, Neve Tzedek et le Boulevard Rothschild incarnent le luxe historique avec leurs immeubles Bauhaus classés, tandis que le Vieux Nord et Sarona séduisent les familles et les amateurs de tours résidentielles modernes.",
        "À Jérusalem, les quartiers de Talbieh, Rehavia et la Colonie allemande offrent des maisons en pierre de Jérusalem et un cadre prestigieux à proximité du centre. Mamilla propose des résidences de standing aux portes de la Vieille Ville. Sur la côte, Herzliya Pituah et Césarée concentrent les villas les plus exclusives d'Israël, avec accès direct à la mer et services haut de gamme.",
        "Nos experts connaissent chaque rue, chaque immeuble et chaque tendance de prix. Nous vous orientons vers le quartier qui correspond à votre projet — résidence principale, pied-à-terre, investissement locatif ou Aliyah — en tenant compte de la sécurité, des écoles, des synagogues, des commerces et du potentiel de revente.",
      ],
    },
    en: {
      title: 'Choosing the right neighborhood in Israel',
      paras: [
        "The choice of neighborhood is decisive in any real estate purchase in Israel. Each area has its own atmosphere, clientele and appreciation potential. In Tel Aviv, Neve Tzedek and Rothschild Boulevard embody historic luxury with their listed Bauhaus buildings, while the Old North and Sarona appeal to families and lovers of modern residential towers.",
        "In Jerusalem, the neighborhoods of Talbiyeh, Rehavia and the German Colony offer Jerusalem-stone houses and a prestigious setting close to the center. Mamilla offers high-end residences at the gates of the Old City. On the coast, Herzliya Pituah and Caesarea concentrate Israel's most exclusive villas, with direct sea access and premium services.",
        "Our experts know every street, every building and every price trend. We guide you toward the neighborhood that matches your project — primary residence, pied-à-terre, rental investment or Aliyah — taking into account security, schools, synagogues, shops and resale potential.",
      ],
    },
    he: {
      title: 'בחירת השכונה הנכונה בישראל',
      paras: [
        'בחירת השכונה היא מכרעת בכל רכישת נדל"ן בישראל. לכל אזור אווירה, קהל ופוטנציאל השבחה משלו. בתל אביב, נווה צדק ושדרות רוטשילד מגלמים יוקרה היסטורית עם בנייני הבאוהאוס לשימור, בעוד הצפון הישן וסרונה מושכים משפחות וחובבי מגדלי מגורים מודרניים.',
        'בירושלים, השכונות טלביה, רחביה והמושבה הגרמנית מציעות בתי אבן ירושלמית ומיקום יוקרתי סמוך למרכז. ממילא מציעה דירות יוקרה בשערי העיר העתיקה. בחוף, הרצליה פיתוח וקיסריה מרכזות את הווילות הבלעדיות בישראל, עם גישה ישירה לים ושירותים ברמה גבוהה.',
        'המומחים שלנו מכירים כל רחוב, כל בניין וכל מגמת מחיר. אנו מכוונים אתכם לשכונה המתאימה לפרויקט שלכם — דירת מגורים, פיד-א-טר, השקעה או עלייה — תוך התחשבות בביטחון, בתי ספר, בתי כנסת, מסחר ופוטנציאל מכירה חוזרת.',
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
