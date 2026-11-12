import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import type { Metadata } from 'next'
import type { Bien } from '@/types'
import type { Locale } from '@/i18n/config'
import { getMessages } from '@/i18n'
import PropertyCard from '@/components/public/PropertyCard'

const BASE_URL = 'https://luxuryisraelrealestate.com'

const PROJETS_META: Record<Locale, { title: string; description: string }> = {
  fr: {
    title: "Propriétés Disponibles — Immobilier de Prestige en Israël",
    description: "Découvrez notre sélection de propriétés de prestige en Israël — penthouses, villas, appartements à Tel Aviv, Jérusalem, Herzliya Pituah, Césarée.",
  },
  en: {
    title: 'Available Properties — Luxury Real Estate in Israel',
    description: 'Discover our selection of luxury properties in Israel — penthouses, villas, apartments in Tel Aviv, Jerusalem, Herzliya Pituah, Caesarea.',
  },
  he: {
    title: 'נכסים זמינים — נדל"ן יוקרה בישראל',
    description: 'גלו את מבחר נכסי היוקרה שלנו בישראל.',
  },
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const meta = PROJETS_META[(locale as Locale) || 'fr'] ?? PROJETS_META.fr
  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: `${BASE_URL}/${locale}/projets`,
      languages: {
        fr: `${BASE_URL}/fr/projets`,
        en: `${BASE_URL}/en/projets`,
        he: `${BASE_URL}/he/projets`,
        'x-default': `${BASE_URL}/fr/projets`,
      },
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: `${BASE_URL}/${locale}/projets`,
      siteName: 'Maison Israël',
      type: 'website',
      locale: locale === 'he' ? 'he_IL' : locale === 'en' ? 'en_US' : 'fr_FR',
    },
  }
}

export const revalidate = 60

interface Props {
  params: Promise<{ locale: string }>
  searchParams: Promise<Record<string, string>>
}

export default async function ProjetsPage({ params, searchParams }: Props) {
  const { locale } = await params
  const sp = await searchParams
  const messages = await getMessages(locale as Locale)
  const p = messages.properties
  const isRTL = locale === 'he'

  const ville  = sp.ville  ?? ''
  const budget = sp.budget ? Number(sp.budget) : null
  const type   = sp.type   ?? ''
  const pieces = sp.pieces ? parseInt(sp.pieces) : null
  const mode   = sp.mode   ?? 'acheter'

  const supabase = await createClient()
  let query = supabase.from('biens').select('*')
    .eq('off_market', false)
    .not('masque', 'is', true)
    .order('created_at', { ascending: false })

  if (ville)  query = query.ilike('ville', `%${ville}%`)
  if (budget) query = query.lte('prix', budget)
  if (type)   query = query.eq('type', type)
  if (pieces && sp.pieces !== '5+') query = query.eq('pieces', pieces)
  if (sp.pieces === '5+') query = query.gte('pieces', 5)

  const { data: biens } = await query

  const hasFilters = ville || budget || type || pieces || sp.pieces === '5+'

  const statusMap: Record<string, string> = {
    actif: p.status_actif, vendu: p.status_vendu,
    sous_compromis: p.status_sous_compromis, loue: p.status_loue,
  }
  const statusColors: Record<string, string> = {
    actif: '#22C55E', vendu: '#EF4444', sous_compromis: '#F59E0B', loue: '#3B82F6'
  }

  const tabLabels: Record<string, string> = {
    acheter:     locale === 'en' ? 'Buy'        : locale === 'he' ? 'לקנות'  : 'Acheter',
    louer:       locale === 'en' ? 'Rent'       : locale === 'he' ? 'לשכור'  : 'Louer',
    saisonnier:  locale === 'en' ? 'Short-term' : locale === 'he' ? 'נופש'   : 'Location saisonnière',
  }

  return (
    <>
      {/* Page header */}
      <div style={{ paddingTop: '120px', background: '#111214', paddingBottom: '3rem', padding: '120px 3rem 3rem', direction: isRTL ? 'rtl' : 'ltr', borderBottom: '1px solid rgba(200,169,110,0.1)' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
              <div style={{ width: '24px', height: '1px', background: '#C8A96E' }} />
              <span style={{ fontSize: '10px', letterSpacing: '0.3em', color: '#C8A96E', textTransform: 'uppercase' }}>{p.page_tag}</span>
            </div>
            <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2.5rem, 5vw, 4rem)', color: '#FAFAF9', fontWeight: 300, lineHeight: 1 }}>{p.page_title}</h1>
          </div>
          <div style={{ textAlign: isRTL ? 'left' : 'right', fontSize: '13px', color: '#8A8B91' }}>
            <strong style={{ color: '#D4D5D8', fontWeight: 500 }}>{(biens ?? []).filter((b: Bien) => b.statut === 'actif').length}</strong> {p.available}
          </div>
        </div>

        {/* Active filters */}
        {hasFilters && (
          <div style={{ maxWidth: '1400px', margin: '1.5rem auto 0', display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '0.68rem', color: '#8A8B91', letterSpacing: '0.1em', textTransform: 'uppercase', marginRight: '0.5rem' }}>
              {locale === 'en' ? 'Filters:' : 'Filtres :'}
            </span>

            {/* Mode tab */}
            <span style={{ background: 'rgba(200,169,110,0.15)', border: '1px solid rgba(200,169,110,0.35)', color: '#C8A96E', padding: '0.25rem 0.8rem', fontSize: '0.72rem', fontWeight: 600 }}>
              {tabLabels[mode]}
            </span>

            {ville && (
              <FilterChip label={ville} href={`/${locale}/projets?${buildParams(sp, 'ville', '')}`} />
            )}
            {budget && (
              <FilterChip label={`≤ ${new Intl.NumberFormat('fr-FR').format(budget)} €`} href={`/${locale}/projets?${buildParams(sp, 'budget', '')}`} />
            )}
            {type && (
              <FilterChip label={type} href={`/${locale}/projets?${buildParams(sp, 'type', '')}`} />
            )}
            {sp.pieces && (
              <FilterChip label={`${sp.pieces} ${locale === 'en' ? 'rooms' : 'pièces'}`} href={`/${locale}/projets?${buildParams(sp, 'pieces', '')}`} />
            )}

            <Link href={`/${locale}/projets`} style={{ fontSize: '0.7rem', color: '#4A4B50', textDecoration: 'none', letterSpacing: '0.1em', textTransform: 'uppercase', marginLeft: '0.5rem' }}>
              × {locale === 'en' ? 'Clear all' : 'Tout effacer'}
            </Link>
          </div>
        )}
      </div>

      <section style={{ padding: '3rem', background: '#0A0A0B', minHeight: '60vh', direction: isRTL ? 'rtl' : 'ltr' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          {!biens?.length ? (
            <div style={{ textAlign: 'center', padding: '4rem' }}>
              <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2rem', color: '#D4D5D8', marginBottom: '1rem' }}>{p.none_title}</p>
              <p style={{ color: '#8A8B91', marginBottom: '2rem' }}>{p.none_sub}</p>
              {hasFilters && (
                <Link href={`/${locale}/projets`} style={{ border: '1px solid rgba(200,169,110,0.4)', color: '#C8A96E', padding: '0.8rem 2rem', textDecoration: 'none', fontFamily: 'DM Sans, sans-serif', fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
                  {locale === 'en' ? 'Clear filters' : 'Effacer les filtres'}
                </Link>
              )}
            </div>
          ) : (
            <div className="grid-properties">
              {biens.map((bien: Bien) => (
                <PropertyCard key={bien.id} bien={bien} locale={locale} messages={messages} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── OFF MARKET TEASER ───────────────────────────── */}
      <section style={{ background: '#111214', borderTop: '1px solid rgba(200,169,110,0.1)', direction: isRTL ? 'rtl' : 'ltr' }}>
        <div style={{
          maxWidth: '1400px', margin: '0 auto',
          padding: '3rem',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          gap: '2rem', flexWrap: 'wrap',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <div style={{ width: 48, height: 48, border: '1px solid rgba(200,169,110,0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C8A96E" strokeWidth="1.5">
                <rect x="3" y="11" width="18" height="11"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
            </div>
            <div>
              <p style={{ fontSize: '9px', letterSpacing: '0.35em', color: '#C8A96E', textTransform: 'uppercase', marginBottom: '6px' }}>
                {locale === 'en' ? 'Private Access' : locale === 'he' ? 'גישה פרטית' : 'Accès Privé'}
              </p>
              <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.5rem', fontWeight: 300, color: '#FAFAF9', marginBottom: '4px', lineHeight: 1.1 }}>
                {locale === 'en' ? 'Off Market Portfolio' : locale === 'he' ? 'פורטפוליו פרטי' : 'Portefeuille Off Market'}
              </p>
              <p style={{ fontSize: '0.8rem', color: '#8A8B91' }}>
                {locale === 'en'
                  ? 'Exclusive properties not listed publicly — by request only'
                  : locale === 'he'
                  ? 'נכסים בלעדיים שאינם מפורסמים לציבור'
                  : 'Biens exclusifs non diffusés au grand public — sur demande uniquement'}
              </p>
            </div>
          </div>
          <Link href={`/${locale}/off-market`} style={{
            display: 'flex', alignItems: 'center', gap: '0.7rem',
            border: '1px solid rgba(200,169,110,0.4)', color: '#C8A96E',
            padding: '0.85rem 1.8rem', textDecoration: 'none',
            fontFamily: 'DM Sans, sans-serif', fontSize: '0.72rem',
            letterSpacing: '0.2em', textTransform: 'uppercase',
            whiteSpace: 'nowrap', transition: 'all 0.3s',
          }}>
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="11" width="18" height="11"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
            </svg>
            {locale === 'en' ? 'Access portfolio' : locale === 'he' ? 'גישה לפורטפוליו' : 'Accéder au portefeuille'}
          </Link>
        </div>
      </section>

      <SeoContent locale={locale} />
    </>
  )
}

function SeoContent({ locale }: { locale: string }) {
  const isRTL = locale === 'he'
  const content = {
    fr: {
      title: "L'immobilier de prestige en Israël",
      paras: [
        "Acheter un bien immobilier de prestige en Israël représente à la fois un projet de vie et un investissement patrimonial solide. Depuis 2009, Maison Israël accompagne une clientèle francophone exigeante dans l'acquisition de penthouses, villas et appartements d'exception à Tel Aviv, Jérusalem, Herzliya Pituah, Netanya et Césarée.",
        "Chaque ville possède son identité : Tel Aviv séduit par son dynamisme, ses immeubles Bauhaus classés à l'UNESCO et ses quartiers prisés comme Neve Tzedek, Rothschild et le Vieux Nord. Jérusalem attire par son prestige intemporel, notamment à Talbieh, Rehavia et la Colonie allemande. Herzliya Pituah et Césarée offrent des villas en bord de mer parmi les plus exclusives du pays, tandis que Netanya combine front de mer et rendements locatifs attractifs.",
        "Nos conseillers vous accompagnent à chaque étape : recherche personnalisée, accès à des biens off-market non diffusés publiquement, négociation, accompagnement juridique et fiscal, et conseil spécifique pour les Olim Hadashim dans le cadre d'une Aliyah. L'investissement immobilier en Israël offre des perspectives de valorisation solides, avec des rendements locatifs généralement compris entre 4 et 7 % selon les quartiers.",
      ],
    },
    en: {
      title: 'Luxury real estate in Israel',
      paras: [
        "Buying luxury real estate in Israel is both a life project and a solid wealth investment. Since 2009, Maison Israël has guided an international clientele in acquiring exceptional penthouses, villas and apartments in Tel Aviv, Jerusalem, Herzliya Pituah, Netanya and Caesarea.",
        "Each city has its own identity: Tel Aviv stands out for its energy, its UNESCO-listed Bauhaus buildings and sought-after neighborhoods such as Neve Tzedek, Rothschild and the Old North. Jerusalem appeals through its timeless prestige, notably in Talbiyeh, Rehavia and the German Colony. Herzliya Pituah and Caesarea offer some of the country's most exclusive seafront villas, while Netanya combines coastline living with attractive rental yields.",
        "Our advisors support you at every stage: personalized search, access to off-market properties not listed publicly, negotiation, legal and tax guidance, and dedicated advice for Olim Hadashim making Aliyah. Real estate investment in Israel offers solid appreciation prospects, with rental yields generally between 4% and 7% depending on the neighborhood.",
      ],
    },
    he: {
      title: 'נדל"ן יוקרה בישראל',
      paras: [
        'רכישת נדל"ן יוקרה בישראל היא גם פרויקט חיים וגם השקעה פיננסית איתנה. מאז 2009, מייזון ישראל מלווה לקוחות בינלאומיים ברכישת פנטהאוזים, וילות ודירות יוקרה בתל אביב, ירושלים, הרצליה פיתוח, נתניה וקיסריה.',
        'לכל עיר זהות משלה: תל אביב בולטת באנרגיה שלה, בבנייני הבאוהאוס המוכרים על ידי אונסק"ו ובשכונות מבוקשות כמו נווה צדק, רוטשילד והצפון הישן. ירושלים מושכת בזכות יוקרתה הנצחית, בעיקר בטלביה, רחביה והמושבה הגרמנית. הרצליה פיתוח וקיסריה מציעות חלק מווילות החוף הבלעדיות בארץ, ונתניה משלבת חיי חוף עם תשואות שכירות אטרקטיביות.',
        'היועצים שלנו מלווים אתכם בכל שלב: חיפוש מותאם אישית, גישה לנכסים מחוץ לשוק, משא ומתן, ליווי משפטי ומיסויי, וייעוץ ייעודי לעולים חדשים. השקעה בנדל"ן בישראל מציעה סיכויי השבחה איתנים, עם תשואות שכירות שנעות בדרך כלל בין 4% ל-7%.',
      ],
    },
  }
  const c = content[(locale as keyof typeof content)] ?? content.fr

  return (
    <section style={{ background: '#0A0A0B', padding: '4rem clamp(1.25rem,5vw,3rem) 5rem', borderTop: '1px solid rgba(200,169,110,0.08)', direction: isRTL ? 'rtl' : 'ltr' }}>
      <div style={{ maxWidth: '880px', margin: '0 auto' }}>
        <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(1.8rem,4vw,2.6rem)', fontWeight: 300, color: '#FAFAF9', marginBottom: '1.6rem' }}>
          {c.title}
        </h2>
        {c.paras.map((para, i) => (
          <p key={i} style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.95rem', fontWeight: 300, color: 'rgba(212,213,216,0.8)', lineHeight: 1.85, marginBottom: '1.2rem' }}>
            {para}
          </p>
        ))}
      </div>
    </section>
  )
}

function FilterChip({ label, href }: { label: string; href: string }) {
  return (
    <Link href={href} style={{
      display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
      background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)',
      color: '#D4D5D8', padding: '0.25rem 0.7rem', fontSize: '0.75rem',
      textDecoration: 'none',
    }}>
      {label}
      <span style={{ color: '#8A8B91', fontSize: '0.9rem' }}>×</span>
    </Link>
  )
}

function buildParams(current: Record<string, string>, remove: string, _val: string): string {
  const p = new URLSearchParams(current)
  if (_val === '') p.delete(remove)
  else p.set(remove, _val)
  return p.toString()
}
