import { createPublicClient } from '@/lib/supabase/public'
import Link from 'next/link'
import Image from 'next/image'
import { getBienNom } from '@/types'
import type { Bien } from '@/types'
import type { Locale } from '@/i18n/config'
import type { Metadata } from 'next'
import { alternatesFor } from '@/lib/seo'
import { getMessages } from '@/i18n'
import InstagramFeed from '@/components/public/InstagramFeed'
import PressStrip from '@/components/public/PressStrip'
import HeroSearch from '@/components/public/HeroSearch'
import HeroSlider from '@/components/public/HeroSlider'
import PropertyCard from '@/components/public/PropertyCard'
import Reveal from '@/components/public/Reveal'

export const revalidate = 60

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  // Titre et description viennent du layout ; ici seulement canonical et hreflang.
  return { alternates: alternatesFor(locale, '') }
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const messages = await getMessages(locale as Locale)
  const m = messages
  const isRTL = locale === 'he'

  const supabase = createPublicClient()
  const { data: biens } = await supabase
    .from('biens').select('*').eq('statut', 'actif')
    .not('off_market', 'is', true)   // exclut les biens off-market (privés)
    .not('masque', 'is', true)       // exclut les biens masqués
    .order('created_at', { ascending: false }).limit(4)

  // Accueil : 1 grand bien à la une + 3 cartes en dessous (pas plus).
  const featuredBien = (biens ?? [])[0] as Bien | undefined
  const restBiens = ((biens ?? []) as Bien[]).slice(1, 4)

  // Réglages éditables depuis l'admin — récupérés côté serveur pour que l'image
  // hero (élément LCP) soit présente dès le HTML initial.
  const { data: settings } = await supabase
    .from('site_settings').select('key, value').in('key', ['editorial', 'hero', 'city_images'])
  const editorialSetting = settings?.find(s => s.key === 'editorial')
  const heroSetting = settings?.find(s => s.key === 'hero')
  const editorialImg = (editorialSetting?.value as { home_editorial?: string } | null)?.home_editorial || '/hero/slide2.jpg'
  const heroImages = (heroSetting?.value as { images?: string[] } | null)?.images || []
  const cityImages = (settings?.find(s => s.key === 'city_images')?.value as Record<string, string> | null) || {}

  const marqueeItems = locale === 'he' ? [
    'תל אביב · העיר הלבנה',
    'הרצליה פיתוח · קו החוף',
    'ירושלים · נצחית ועל-זמנית',
    'נתניה · הריביירה הישראלית',
    'השקעה · תשואה 4–7%',
    'ליווי · תלת-לשוני',
  ] : locale === 'en' ? [
    'Tel Aviv · The White City',
    'Herzliya Pituah · Seafront',
    'Jerusalem · Eternal & Timeless',
    'Netanya · The Israeli Riviera',
    'Investment · ROI 4–7%',
    'Guidance · Trilingual',
  ] : [
    'Tel Aviv · La Ville Blanche',
    'Herzliya Pituah · Front de Mer',
    'Jérusalem · Éternelle & Intemporelle',
    'Netanya · La Riviera Israélienne',
    'Investissement · ROI 4–7%',
    'Accompagnement · 100% Francophone',
  ]

  // Cinematic hero copy
  const heroCopy = {
    eyebrow: locale === 'he' ? 'ראובן בנשטרית · נדל"ן יוקרה בישראל' : locale === 'en' ? 'Reuven Benchetrit · Luxury Real Estate in Israel' : 'Reuven Benchetrit · Immobilier de Prestige en Israël',
    title: locale === 'he' ? 'גישה דיסקרטית לנכסים הנדירים ביותר בישראל'
      : locale === 'en' ? "Discreet access to Israel's rarest addresses"
      : "Un accès discret aux adresses les plus rares d'Israël",
  }

  // FAQ accueil — affichée en bas de page + schéma FAQPage (résultats enrichis Google)
  const faqItems: { q: string; a: string }[] = locale === 'he' ? [
    { q: 'האם זרים יכולים לקנות נדל"ן בישראל?', a: 'כן. אין הגבלת אזרחות על רכישת נדל"ן בישראל. קונים זרים נהנים מאותן זכויות קניין, ומימון של עד 50% זמין לתושבי חוץ.' },
    { q: 'מהן עלויות הרכישה?', a: 'העלות העיקרית היא מס רכישה, בשיעור מדורג התלוי במעמדכם (תושב, עולה חדש, תושב חוץ). יש להוסיף שכר טרחת עורך דין (כ-1%–1.5%) ותיווך. אנו בונים את התמונה המלאה לפני כל הצעה.' },
    { q: 'יש לכם נכסים מחוץ לשוק?', a: 'כן. חלק מהותי מהתיק שלנו אינו מפורסם. הגישה ניתנת לקונים מסוננים בלבד, לאחר שיחה ראשונית קצרה וסודית.' },
    { q: 'אפשר לקנות מרחוק?', a: 'כן. אנו מלווים קונים בינלאומיים מפריז, ניו יורק, לונדון ומיאמי — סיורים בווידאו, ייפוי כוח, ליווי משפטי ובנקאי — עד קבלת המפתחות ואחריה.' },
  ] : locale === 'en' ? [
    { q: 'Can foreigners buy property in Israel?', a: 'Yes. There is no nationality restriction on buying real estate in Israel. Foreign buyers enjoy the same property rights, and financing of up to 50% is available to non-residents.' },
    { q: 'What are the purchase costs?', a: 'The main cost is the purchase tax (Mas Rechisha), a progressive rate that depends on your status — resident, new immigrant (oleh) or non-resident. Add legal fees (about 1–1.5%) and brokerage. We map the full picture before any offer.' },
    { q: 'Do you have off-market properties?', a: 'Yes. A substantial part of our portfolio is never advertised. Access is granted to qualified buyers only, after a brief, confidential initial conversation.' },
    { q: 'Can I buy remotely?', a: 'Yes. We guide international buyers from Paris, New York, London and Miami — video tours, power of attorney, legal and banking coordination — through to the keys and beyond.' },
  ] : [
    { q: 'Un étranger peut-il acheter un bien en Israël ?', a: "Oui. Aucune restriction de nationalité ne s'applique à l'achat immobilier en Israël. Les acheteurs étrangers jouissent des mêmes droits de propriété, et un financement jusqu'à 50 % est accessible aux non-résidents." },
    { q: "Quels sont les frais d'acquisition ?", a: "Le principal poste est la taxe d'acquisition (Mas Rechisha), un barème progressif selon votre statut — résident, nouvel immigrant (oleh) ou non-résident. S'y ajoutent les honoraires d'avocat (environ 1 à 1,5 %) et d'agence. Nous chiffrons le tableau complet avant toute offre." },
    { q: 'Avez-vous des biens off-market ?', a: "Oui. Une part substantielle de notre portefeuille n'est jamais publiée. L'accès est réservé aux acheteurs qualifiés, après une brève conversation initiale et confidentielle." },
    { q: 'Peut-on acheter à distance ?', a: "Oui. Nous accompagnons des acheteurs internationaux depuis Paris, New York, Londres ou Miami — visites vidéo, procuration, coordination juridique et bancaire — jusqu'à la remise des clés, et au-delà." },
  ]

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map(f => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }


  return (
    <>
      <style>{`
        .city-card-inner { position:relative; overflow:hidden; width:100%; height:100%; cursor:pointer; text-decoration:none; display:block; }
        .city-card-inner img { width:100%; height:100%; object-fit:cover; transition:transform 0.8s ease; filter:brightness(0.65); }
        .city-card-inner:hover img { transform:scale(1.08); filter:brightness(0.5); }
        .city-card-inner .city-overlay { position:absolute; inset:0; background:linear-gradient(180deg,transparent 40%,rgba(10,10,11,0.85) 100%); }
        .city-card-inner .city-info { position:absolute; bottom:24px; left:24px; z-index:2; }
        .city-card-inner .city-arrow { position:absolute; bottom:24px; right:24px; z-index:2; width:34px; height:34px; border:1px solid rgba(255,255,255,0.3); display:flex; align-items:center; justify-content:center; opacity:0; transition:all 0.4s ease; }
        .city-card-inner:hover .city-arrow { opacity:1; border-color:#C8A96E; }
        .pcard-editorial-img { width:100%; aspect-ratio:3/4; object-fit:cover; }
        .pcard-editorial-img-frame { position:absolute; inset:20px; border:1px solid rgba(200,169,110,0.4); pointer-events:none; }
        .editorial-badge-vert { position:absolute; top:40px; left:-20px; background:#C8A96E; color:#0A0A0B; padding:14px 16px; font-family:'DM Sans',sans-serif; font-size:9px; font-weight:600; letter-spacing:0.25em; writing-mode:vertical-rl; transform:rotate(180deg); text-transform:uppercase; }
        .btn-primary-dark { display:inline-flex; align-items:center; gap:10px; padding:17px 42px; background:#C8A96E; color:#0A0A0B; font-family:'Jost',sans-serif; font-size:10px; font-weight:500; letter-spacing:0.28em; text-transform:uppercase; text-decoration:none; transition:background 0.4s var(--ease-luxe); }
        .btn-primary-dark:hover { background:#E8D5A3; }
        .btn-ghost-dark { display:inline-flex; align-items:center; gap:10px; padding:16px 38px; background:transparent; color:rgba(250,248,244,0.85); font-family:'Jost',sans-serif; font-size:10px; font-weight:400; letter-spacing:0.28em; text-transform:uppercase; text-decoration:none; border:1px solid rgba(250,248,244,0.22); transition:all 0.4s var(--ease-luxe); }
        .btn-ghost-dark:hover { border-color:#C8A96E; color:#C8A96E; }

        /* ── Vitrine — bien à la une, plein cadre ── */
        .showcase { position:relative; display:block; overflow:hidden; aspect-ratio:16/8; text-decoration:none; }
        @media (max-width:700px){ .showcase{ aspect-ratio:4/5; } }
        .showcase-img { position:absolute; inset:0; transition:transform 1.8s var(--ease-luxe); }
        .showcase:hover .showcase-img { transform:scale(1.03); }
        .showcase-veil { position:absolute; inset:0; z-index:1; background:linear-gradient(180deg, rgba(8,8,10,0.12) 0%, transparent 40%, rgba(8,8,10,0.85) 100%); }
        .showcase-info { position:absolute; bottom:0; left:0; right:0; padding:clamp(1.4rem,3.5vw,3rem); z-index:2; }
        .showcase-eyebrow { font-family:'Jost',sans-serif; font-size:10px; letter-spacing:0.4em; text-transform:uppercase; color:#C8A96E; margin-bottom:14px; }
        .showcase-name { font-family:'Cormorant Garamond',serif; font-size:clamp(1.8rem,4vw,3.4rem); font-weight:300; color:#FAF8F4; line-height:1.05; margin-bottom:16px; max-width:20ch; }
        .showcase-row { display:flex; align-items:baseline; gap:1.8rem; flex-wrap:wrap; }
        .showcase-price { font-family:'Cormorant Garamond',serif; font-size:clamp(1.2rem,2vw,1.7rem); font-weight:300; font-style:italic; color:#E8D5A3; }
        .showcase-specs { font-family:'DM Sans',sans-serif; font-size:0.78rem; letter-spacing:0.06em; color:rgba(250,248,244,0.6); }
        .showcase-cta { position:absolute; top:clamp(1.2rem,3vw,2.4rem); right:clamp(1.2rem,3vw,2.4rem); z-index:2; font-family:'Jost',sans-serif; font-size:10px; letter-spacing:0.32em; text-transform:uppercase; color:rgba(250,248,244,0.85); border:1px solid rgba(250,248,244,0.28); padding:11px 22px; backdrop-filter:blur(8px); background:rgba(8,8,10,0.25); transition:all .4s var(--ease-luxe); }
        .showcase:hover .showcase-cta { border-color:#C8A96E; color:#C8A96E; }
        [dir="rtl"] .showcase-cta { right:auto; left:clamp(1.2rem,3vw,2.4rem); }

        @media (max-width: 900px) {
          .editorial-2col { grid-template-columns: 1fr !important; }
          .editorial-img-wrap { display:none; }
        }

        /* Hero entrance — staggered cinematic fade-up */
        @keyframes heroFadeUp {
          from { opacity: 0; transform: translateY(26px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .hero-fade-1 { animation: heroFadeUp var(--dur-reveal) var(--ease-luxe) 0.3s both; }
        .hero-fade-2 { animation: heroFadeUp var(--dur-reveal) var(--ease-luxe) 0.55s both; }
        .hero-fade-3 { animation: heroFadeUp var(--dur-reveal) var(--ease-luxe) 0.85s both; }

        /* Scroll indicator — gold filament that draws + drifts */
        .hero-scroll-line {
          width: 1px; height: 54px;
          background: linear-gradient(to bottom, var(--gold-500), rgba(200,169,110,0));
          transform-origin: top;
          animation: scrollDraw 2.4s var(--ease-luxe) infinite;
        }
        @keyframes scrollDraw {
          0%   { transform: scaleY(0); opacity: 0; }
          35%  { transform: scaleY(1); opacity: 1; }
          70%  { transform: scaleY(1); opacity: 1; }
          100% { transform: scaleY(1) translateY(20px); opacity: 0; }
        }

        @media (prefers-reduced-motion: reduce) {
          .hero-fade-1, .hero-fade-2, .hero-fade-3 { animation: none; opacity: 1; }
          .hero-scroll-line { animation: none; }
        }
      `}</style>

      {/* ── HERO ─────────────────────────────────────────── */}
      <section style={{
        position: 'relative',
        height: '100vh',
        minHeight: '760px',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        direction: isRTL ? 'rtl' : 'ltr',
      }}>
        {/* Image slider */}
        <HeroSlider locale={locale} initialImages={heroImages} />

        {/* Voile léger — laisse l'image respirer (façon hero lumineux), assez sombre
            seulement en bas pour la lisibilité de la barre de recherche. */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 1,
          background: 'radial-gradient(ellipse 74% 52% at 50% 40%, rgba(8,8,10,0.58) 0%, rgba(8,8,10,0) 70%), linear-gradient(180deg, rgba(8,8,10,0.42) 0%, rgba(8,8,10,0.26) 38%, rgba(8,8,10,0.30) 60%, rgba(8,8,10,0.82) 100%)',
        }} />

        {/* Hero content — editorial title + search */}
        <div style={{ position: 'relative', zIndex: 2, width: '100%', paddingTop: '80px', textAlign: 'center' }}>
          {/* Eyebrow */}
          <p className="hero-fade-1" style={{
            fontFamily: "'DM Sans', sans-serif", fontSize: '0.68rem', fontWeight: 500,
            letterSpacing: '0.4em', textTransform: isRTL ? 'none' : 'uppercase',
            color: '#E8D5A3', marginBottom: '1.6rem',
            textShadow: '0 1px 3px rgba(0,0,0,0.85), 0 2px 20px rgba(0,0,0,0.8)',
          }}>
            {heroCopy.eyebrow}
          </p>

          {/* Editorial headline — capitales fines très espacées (façon hero éditorial) */}
          <h1 className="hero-fade-2" style={{
            fontFamily: isRTL ? "'Cormorant Garamond', serif" : "'Jost', sans-serif",
            fontSize: 'clamp(1.5rem, 3.2vw, 2.7rem)',
            fontWeight: 200, color: '#FAF8F4', lineHeight: 1.32,
            letterSpacing: isRTL ? '0.02em' : '0.16em',
            textTransform: isRTL ? 'none' : 'uppercase',
            maxWidth: '34ch', margin: '0 auto 2.6rem',
            textShadow: '0 1px 3px rgba(0,0,0,0.6), 0 3px 28px rgba(0,0,0,0.8)',
          }}>
            {heroCopy.title}
          </h1>

          {/* Search bar */}
          <div className="hero-fade-3">
            <HeroSearch locale={locale} isRTL={isRTL} />
          </div>

          {/* Secondary path — for clients who prefer to be guided rather than search */}
          <p className="hero-fade-3" style={{
            marginTop: '1.5rem', fontFamily: "'DM Sans', sans-serif",
            fontSize: '0.82rem', fontWeight: 300, color: 'rgba(250,248,244,0.65)',
            letterSpacing: '0.01em',
          }}>
            {locale === 'he' ? 'מעדיפים ליווי אישי ודיסקרטי? '
              : locale === 'en' ? 'Prefer to be guided, discreetly? '
              : 'Vous préférez être accompagné, en toute discrétion ? '}
            <Link href={`/${locale}/contact`} style={{
              color: '#E8D5A3', textDecoration: 'none',
              borderBottom: '1px solid rgba(200,169,110,0.45)', paddingBottom: '1px',
              whiteSpace: 'nowrap',
            }}>
              {locale === 'he' ? 'דברו עם יועץ ←'
                : locale === 'en' ? 'Speak to an advisor →'
                : 'Parlez à un conseiller →'}
            </Link>
          </p>
        </div>

        {/* Navigation horizontale en bas — façon hero d'agence (desktop) */}
        <nav
          className="hidden md:flex"
          aria-label="Hero"
          style={{
            position: 'absolute', bottom: '2.4rem', left: '50%', transform: 'translateX(-50%)',
            zIndex: 2, alignItems: 'center', gap: '2.6rem', flexWrap: 'wrap', justifyContent: 'center',
            maxWidth: '90vw',
          }}
        >
          {[
            { href: `/${locale}/projets`, fr: 'Propriétés', en: 'Properties', he: 'נכסים' },
            { href: `/${locale}/off-market`, fr: 'Off-Market', en: 'Off-Market', he: 'מחוץ לשוק' },
            { href: `/${locale}/quartiers`, fr: 'Quartiers', en: 'Neighborhoods', he: 'שכונות' },
            { href: `/${locale}/services`, fr: 'Services', en: 'Services', he: 'שירותים' },
            { href: `/${locale}/contact`, fr: 'Contact', en: 'Contact', he: 'צור קשר' },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="hero-bottom-link"
              style={{
                fontFamily: "'DM Sans', sans-serif", fontSize: '0.66rem', fontWeight: 500,
                letterSpacing: isRTL ? '0.05em' : '0.28em', textTransform: isRTL ? 'none' : 'uppercase',
                color: 'rgba(250,248,244,0.78)', textDecoration: 'none',
                textShadow: '0 1px 14px rgba(0,0,0,0.55)', transition: 'color 0.3s',
                whiteSpace: 'nowrap',
              }}
            >
              {locale === 'he' ? item.he : locale === 'en' ? item.en : item.fr}
            </Link>
          ))}
        </nav>
      </section>

      {/* ── MARQUEE ─────────────────────────────────────── */}
      <div className="marquee-section">
        <div className="marquee-track">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <div key={i} className="marquee-item">
              <span className="marquee-text">{item}</span>
              <span className="marquee-dot" />
            </div>
          ))}
        </div>
      </div>

      {/* ── FEATURED PROPERTIES — vitrine + grille ──────── */}
      <section style={{ background: '#0C0D0F', padding: 'clamp(70px, 9vw, 130px) clamp(1.25rem, 4vw, 3rem)', direction: isRTL ? 'rtl' : 'ltr' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <Reveal style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '56px', flexWrap: 'wrap', gap: '1.5rem' }}>
            <div>
              <div className="eyebrow"><span>{m.featured.tag}</span></div>
              <h2 className="section-title-dark" style={{ marginBottom: 0 }}>{m.featured.title}</h2>
            </div>
            <Link href={`/${locale}/projets`} className="btn-ghost-dark">{m.featured.all}</Link>
          </Reveal>

          {featuredBien && (
            <Reveal style={{ marginBottom: '64px' }}>
              <Link href={`/${locale}/projets/${featuredBien.slug}`} className="showcase">
                <div className="showcase-img">
                  <Image src={featuredBien.image_principale} alt={getBienNom(featuredBien, locale)} fill sizes="100vw" quality={75} style={{ objectFit: 'cover' }} />
                </div>
                <div className="showcase-veil" />
                <div className="showcase-info">
                  <p className="showcase-eyebrow">{[featuredBien.quartier || featuredBien.ville, featuredBien.type].filter(Boolean).join(' · ')}</p>
                  <h3 className="showcase-name">{getBienNom(featuredBien, locale)}</h3>
                  <div className="showcase-row">
                    <span className="showcase-price">{featuredBien.prix_display?.trim() || (locale === 'he' ? 'מחיר לפי בקשה' : locale === 'en' ? 'Price on request' : 'Prix sur demande')}</span>
                    <span className="showcase-specs">{featuredBien.surface} m²{featuredBien.pieces ? ` · ${featuredBien.pieces} ${m.properties.rooms}` : ''}</span>
                  </div>
                </div>
                <span className="showcase-cta">{locale === 'he' ? 'לגלות' : locale === 'en' ? 'Discover' : 'Découvrir'}</span>
              </Link>
            </Reveal>
          )}

          <div className="grid-properties">
            {restBiens.map((bien: Bien, i: number) => (
              <Reveal key={bien.id} delay={(i % 3) * 140}>
                <PropertyCard bien={bien} locale={locale} messages={messages} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── EDITORIAL ───────────────────────────────────── */}
      <section style={{ padding: 'clamp(64px, 8vw, 100px) clamp(1.25rem, 4vw, 3rem)', maxWidth: '1400px', margin: '0 auto', direction: isRTL ? 'rtl' : 'ltr' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }} className="editorial-2col">
          {/* Image */}
          <div className="editorial-img-wrap" style={{ position: 'relative', aspectRatio: '3/4' }}>
            <Image
              src={editorialImg}
              alt={locale === 'he' ? 'נדל"ן יוקרה בישראל — מייזון ישראל' : locale === 'en' ? 'Luxury real estate in Israel — Maison Israël' : 'Immobilier de prestige en Israël — Maison Israël'}
              fill
              sizes="(max-width: 900px) 0px, 45vw"
              style={{ objectFit: 'cover', filter: 'brightness(0.9) contrast(1.05)' }}
            />
            <div className="pcard-editorial-img-frame" />
            <div className="editorial-badge-vert">{locale === 'he' ? 'מאז 2009' : locale === 'en' ? 'Since 2009' : 'Depuis 2009'}</div>
          </div>
          {/* Text */}
          <div>
            <div className="eyebrow hero-a1"><span>{locale === 'he' ? 'אודות' : locale === 'en' ? 'About' : 'À propos'}</span></div>
            <h2 className="section-title-dark" style={{ marginBottom: '28px' }}>
              Reuven <em style={{ fontStyle: 'italic', color: '#E8D5A3' }}>Benchetrit</em>
            </h2>
            {(locale === 'he' ? [
              'ראובן בנשטרית מייצג לקוחות אמידים ובעלי הון רב ברחבי ישראל. עבודתו מתאפיינת בדיסקרטיות, בבהירות אסטרטגית ובגישה לרשת פרטית שנבנתה לאורך שנים של מערכות יחסים.',
              'במקום לרדוף אחר כמות, ראובן ניגש לכל משימה בדיוק — מייעץ ללקוחות ברכישות, במכירות דיסקרטיות ובהזדמנויות מחוץ לשוק הדורשות משא ומתן מחושב ואמון מוחלט. ידוע ברוגע שלו, בנוכחות המדודה ובהבנת השוק העמוקה, הוא מספק רמת ייצוג המיועדת למי שמעריך פרטיות, התאמה וביצוע יוצא דופן.',
              'בין אם מדובר ברכישה משמעותית ובין אם במיקום שקט של נכס בתוך רשת נבחרת, המיקוד של ראובן נשאר זהה: אסטרטגיה מעודנת, מערכות יחסים בעלות ערך, ותוצאות ברמה הגבוהה ביותר.',
            ] : locale === 'en' ? [
              'Reuven Benchetrit represents high net worth and ultra high net worth clients across Israel. His work is defined by discretion, strategic clarity, and access to a private network built through long-standing relationships.',
              'Rather than pursuing volume, Reuven approaches each engagement with precision — advising clients on acquisitions, discreet sales, and off-market opportunities that require thoughtful negotiation and absolute trust. Known for his calm, measured presence and deep market insight, he provides a level of representation designed for those who value privacy, alignment, and exceptional execution.',
              "Whether navigating a significant purchase or quietly positioning a property within a select network, Reuven's focus remains the same: refined strategy, meaningful relationships, and results achieved at the highest level.",
            ] : [
              "Reuven Benchetrit représente une clientèle fortunée et ultra-fortunée à travers tout Israël. Son travail se distingue par la discrétion, la clarté stratégique et l'accès à un réseau privé bâti au fil de relations de longue date.",
              "Plutôt que de rechercher le volume, Reuven aborde chaque mission avec précision — conseillant ses clients sur les acquisitions, les ventes discrètes et les opportunités off-market qui exigent une négociation réfléchie et une confiance absolue. Reconnu pour son calme, sa présence mesurée et sa fine connaissance du marché, il offre un niveau de représentation pensé pour ceux qui valorisent la confidentialité, l'alignement et une exécution d'exception.",
              "Qu'il s'agisse d'orchestrer une acquisition d'envergure ou de positionner discrètement un bien au sein d'un réseau choisi, l'exigence de Reuven reste la même : une stratégie raffinée, des relations qui comptent, et des résultats obtenus au plus haut niveau.",
            ]).map((para, i) => (
              <p key={i} style={{ fontSize: '16px', fontWeight: 300, lineHeight: 1.85, color: 'rgba(212,213,216,0.75)', marginBottom: '20px' }}>
                {para}
              </p>
            ))}
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginTop: '36px' }}>
              <Link href={`/${locale}/why-us`} className="btn-primary-dark">
                {locale === 'he' ? 'למה אנחנו' : locale === 'en' ? 'Why us' : 'Pourquoi nous'}
              </Link>
              <Link href={`/${locale}/contact`} className="btn-ghost-dark">{m.hero.cta_consult}</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── PRESS STRIP — « Ils parlent de nous » ────────── */}
      <PressStrip locale={locale} />

      {/* ── CITIES MOSAIC ───────────────────────────────── */}
      <section style={{ padding: 'clamp(64px, 8vw, 100px) clamp(1.25rem, 4vw, 3rem)', direction: isRTL ? 'rtl' : 'ltr' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <Reveal style={{ marginBottom: '60px' }}>
            <div className="eyebrow"><span>{m.destinations.tag}</span></div>
            <h2 className="section-title-dark">{m.destinations.title}</h2>
          </Reveal>

          <Reveal className="cities-mosaic">
            {[
              { ville: 'Tel Aviv', slug: 'tel-aviv', img: 'https://images.unsplash.com/photo-1534430480872-3498386e7856?w=900&auto=format&fit=crop&q=80', desc: m.destinations.tel_aviv_desc },
              { ville: locale === 'he' ? 'ירושלים' : 'Jérusalem', slug: 'jerusalem', img: 'https://images.unsplash.com/photo-1538970272646-f61fabb3a8a2?w=700&auto=format&fit=crop&q=80', desc: m.destinations.jerusalem_desc },
              { ville: 'Herzliya Pituah', slug: 'herzliya-pituah', img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=700&auto=format&fit=crop&q=80', desc: m.destinations.herzliya_desc },
              { ville: locale === 'he' ? 'קיסריה' : 'Césarée', slug: 'caesarea', img: 'https://images.unsplash.com/photo-1582610116397-edb318620f90?w=700&auto=format&fit=crop&q=80', desc: locale === 'he' ? 'יוקרה חופית' : locale === 'en' ? 'Coastal ultra-prime' : 'Ultra-prime côtier' },
              { ville: locale === 'he' ? 'נתניה' : 'Netanya', slug: 'netanya', img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=700&auto=format&fit=crop&q=80', desc: m.destinations.netanya_desc },
              { ville: locale === 'he' ? 'סביון' : 'Savyon', slug: 'savyon', img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=700&auto=format&fit=crop&q=80', desc: locale === 'he' ? 'מובלעת הווילות' : locale === 'en' ? 'The villa enclave' : 'L\'enclave des villas' },
            ].map(d => (
              <div key={d.slug} style={{ position: 'relative' }}>
                <Link href={`/${locale}/villes/${d.slug}`} className="city-card-inner">
                  <Image src={cityImages[d.slug] || d.img} alt={d.ville} fill sizes="(max-width: 700px) 100vw, 33vw" style={{ objectFit: 'cover' }} />
                  <div className="city-overlay" />
                  <div className="city-info">
                    <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '32px', fontWeight: 400, color: '#FAFAF9', lineHeight: 1, marginBottom: '7px' }}>{d.ville}</div>
                    <div style={{ fontSize: '10px', letterSpacing: '0.2em', color: '#E8D5A3', textTransform: 'uppercase' }}>{d.desc}</div>
                  </div>
                  <div className="city-arrow">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#C8A96E" strokeWidth="1.5"><path d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"/></svg>
                  </div>
                </Link>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ── TÉMOIGNAGE ───────────────────────────────────── */}
      <section style={{ background: '#08080A', padding: 'clamp(80px, 10vw, 150px) 2rem', borderTop: '1px solid rgba(200,169,110,0.08)', direction: isRTL ? 'rtl' : 'ltr' }}>
        <Reveal style={{ maxWidth: '820px', margin: '0 auto', textAlign: 'center' }}>
          <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '5rem', lineHeight: 0.5, color: 'rgba(200,169,110,0.4)', display: 'block', marginBottom: '1.4rem' }}>“</span>
          <blockquote style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(1.4rem, 2.6vw, 2.1rem)', fontWeight: 300, fontStyle: 'italic', color: 'rgba(250,248,244,0.92)', lineHeight: 1.55, margin: '0 0 2.2rem' }}>
            {locale === 'he'
              ? 'חיפשנו בית מנדט בטלביה שנתיים, דרך כמה סוכנויות. מייזון ישראל הראו לנו שלושה נכסים מחוץ לשוק בנסיעה אחת. חתמנו על השני.'
              : locale === 'en'
              ? 'We had been searching for a Mandate house in Talbiyeh for two years, through several agencies. Maison Israël showed us three off-market properties on a single trip. We signed on the second one.'
              : "Nous cherchions une maison mandataire à Talbieh depuis deux ans, à travers plusieurs agences. Maison Israël nous a montré trois propriétés en off-market lors d'un seul voyage. Nous avons signé sur la deuxième."}
          </blockquote>
          <p style={{ fontFamily: "'Jost', sans-serif", fontSize: '10px', letterSpacing: isRTL ? '0.05em' : '0.34em', textTransform: isRTL ? 'none' : 'uppercase', color: '#C8A96E', marginBottom: '2.8rem' }}>
            {locale === 'he' ? 'משפחת מ. · פריז ← ירושלים' : locale === 'en' ? 'Family M. · Paris → Jerusalem' : 'Famille M. · Paris → Jérusalem'}
          </p>
          <Link href={`/${locale}/temoignages`} className="btn-ghost-dark">
            {locale === 'he' ? 'לקרוא המלצות' : locale === 'en' ? 'Read the testimonials' : 'Lire les témoignages'}
          </Link>
        </Reveal>
      </section>

      {/* ── PROCESS — comment nous travaillons ───────────── */}
      <section style={{ background: '#0C0D0F', padding: 'clamp(70px, 9vw, 130px) clamp(1.25rem, 4vw, 3rem)', borderTop: '1px solid rgba(200,169,110,0.08)', direction: isRTL ? 'rtl' : 'ltr' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <Reveal style={{ marginBottom: '56px', maxWidth: '680px' }}>
            <div className="eyebrow"><span>{locale === 'he' ? 'התהליך' : locale === 'en' ? 'The Process' : 'Le Processus'}</span></div>
            <h2 className="section-title-dark" style={{ marginBottom: 0 }}>
              {locale === 'he' ? 'שלושה שלבים, דיסקרטיות מלאה' : locale === 'en' ? 'Three steps, complete discretion' : 'Trois étapes, une discrétion totale'}
            </h2>
          </Reveal>
          <Reveal style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 'clamp(2rem, 4vw, 4rem)' }}>
            {[
              {
                n: '01',
                t: { fr: 'Conversation privée', en: 'Private conversation', he: 'שיחה פרטית' },
                d: {
                  fr: "Un échange confidentiel de 15 à 20 minutes. Nous définissons votre brief — budget, calendrier, villes, mode de vie — avant de montrer quoi que ce soit.",
                  en: 'A confidential 15–20 minute exchange. We define your brief — budget, timeline, cities, lifestyle — before showing anything.',
                  he: 'שיחה סודית של 15–20 דקות. אנו מגדירים את הבריף שלכם — תקציב, לוח זמנים, ערים, אורח חיים — לפני שמראים דבר.',
                },
              },
              {
                n: '02',
                t: { fr: 'Sélection sur-mesure', en: 'Curated selection', he: 'בחירה מותאמת' },
                d: {
                  fr: "Nous menons la recherche à travers notre réseau — y compris l'off-market. Vous voyez moins de biens, mais les bons, souvent en un seul voyage.",
                  en: 'We run the search through our network — including off-market. You see fewer properties, but the right ones, often in a single trip.',
                  he: 'אנו מנהלים את החיפוש דרך הרשת שלנו — כולל מחוץ לשוק. אתם רואים פחות נכסים, אבל את הנכונים, לרוב בנסיעה אחת.',
                },
              },
              {
                n: '03',
                t: { fr: "Acquisition & au-delà", en: 'Acquisition & beyond', he: 'רכישה ומעבר לה' },
                d: {
                  fr: "Négociation, avocats, financement, fiscalité, aliyah le cas échéant — nous orchestrons jusqu'à la remise des clés, et restons ensuite.",
                  en: 'Negotiation, lawyers, financing, taxation, aliyah where relevant — we orchestrate through to the keys, and stay on after.',
                  he: 'משא ומתן, עורכי דין, מימון, מיסוי, עלייה במידת הצורך — אנו מלווים עד קבלת המפתחות, ונשארים גם אחרי.',
                },
              },
            ].map((s) => (
              <div key={s.n}>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2.8rem', fontWeight: 300, color: 'rgba(200,169,110,0.45)', lineHeight: 1, marginBottom: '1.2rem' }}>{s.n}</div>
                <h3 style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.95rem', fontWeight: 400, letterSpacing: isRTL ? '0.02em' : '0.16em', textTransform: isRTL ? 'none' : 'uppercase', color: '#FAF8F4', marginBottom: '0.9rem' }}>
                  {s.t[locale === 'he' ? 'he' : locale === 'en' ? 'en' : 'fr']}
                </h3>
                <p style={{ fontSize: '0.94rem', fontWeight: 300, lineHeight: 1.8, color: 'rgba(212,213,216,0.65)' }}>
                  {s.d[locale === 'he' ? 'he' : locale === 'en' ? 'en' : 'fr']}
                </p>
              </div>
            ))}
          </Reveal>
          <Reveal style={{ marginTop: '3rem' }}>
            <Link href={`/${locale}/notre-methode`} className="btn-ghost-dark">
              {locale === 'he' ? 'לגלות את השיטה שלנו' : locale === 'en' ? 'Discover our method' : 'Découvrir notre méthode'}
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ── OFF MARKET ACCESS ───────────────────────────── */}
      <section style={{ background: '#0A0A0B', direction: isRTL ? 'rtl' : 'ltr', position: 'relative', overflow: 'hidden' }}>
        {/* background texture */}
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1600&auto=format&fit=crop&q=60)', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.07 }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(10,10,11,0.95) 0%, rgba(10,10,11,0.6) 60%, rgba(10,10,11,0.95) 100%)' }} />

        <div style={{ position: 'relative', maxWidth: '1400px', margin: '0 auto', padding: '4rem clamp(1.25rem, 4vw, 3rem)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '2rem', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.8rem' }}>
            {/* Lock */}
            <div style={{ width: 56, height: 56, border: '1px solid rgba(200,169,110,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#C8A96E" strokeWidth="1.5">
                <rect x="3" y="11" width="18" height="11"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
            </div>
            <div>
              <p style={{ fontSize: '9px', letterSpacing: '0.38em', color: '#C8A96E', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                {locale === 'he' ? 'גישה פרטית' : locale === 'en' ? 'Private Access' : 'Accès Privé'}
              </p>
              <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: 300, color: '#FAFAF9', marginBottom: '0.3rem', lineHeight: 1.1 }}>
                {locale === 'he' ? 'פורטפוליו פרטי' : locale === 'en' ? 'Off Market Portfolio' : 'Portefeuille Off Market'}
              </h3>
              <p style={{ fontSize: '0.83rem', color: '#8A8B91' }}>
                {locale === 'he'
                  ? 'נכסים בלעדיים שאינם מפורסמים לציבור — על פי בקשה בלבד'
                  : locale === 'en'
                  ? 'Exclusive properties not listed publicly — by request only'
                  : 'Biens exclusifs non diffusés au grand public — sur demande uniquement'}
              </p>
            </div>
          </div>
          <Link href={`/${locale}/off-market`} style={{
            display: 'flex', alignItems: 'center', gap: '0.8rem',
            border: '1px solid rgba(200,169,110,0.4)',
            color: '#C8A96E', padding: '0.9rem 2rem',
            fontFamily: 'DM Sans, sans-serif', fontSize: '0.72rem',
            letterSpacing: '0.2em', textTransform: 'uppercase',
            textDecoration: 'none', whiteSpace: 'nowrap',
            transition: 'all 0.3s',
          }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="11" width="18" height="11"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
            </svg>
            {locale === 'he' ? 'גישה לפורטפוליו' : locale === 'en' ? 'Access portfolio' : 'Accéder au portefeuille'}
          </Link>
        </div>
      </section>

      {/* ── INSTAGRAM FEED ──────────────────────────────── */}
      <InstagramFeed locale={locale} messages={messages} />

      {/* ── FAQ — questions fréquentes + schéma FAQPage ──── */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <section style={{ background: '#08080A', padding: 'clamp(70px, 9vw, 120px) clamp(1.25rem, 4vw, 3rem)', borderTop: '1px solid rgba(200,169,110,0.08)', direction: isRTL ? 'rtl' : 'ltr' }}>
        <div style={{ maxWidth: '860px', margin: '0 auto' }}>
          <Reveal style={{ textAlign: 'center', marginBottom: '48px' }}>
            <div className="eyebrow" style={{ justifyContent: 'center' }}><span>FAQ</span></div>
            <h2 className="section-title-dark" style={{ marginBottom: 0 }}>
              {locale === 'he' ? 'שאלות נפוצות' : locale === 'en' ? 'Frequently asked questions' : 'Questions fréquentes'}
            </h2>
          </Reveal>
          <Reveal>
            {faqItems.map((f, i) => (
              <details key={i} className="home-faq-item">
                <summary>
                  <span>{f.q}</span>
                  <span className="home-faq-plus" aria-hidden="true">+</span>
                </summary>
                <p>{f.a}</p>
              </details>
            ))}
          </Reveal>
          <Reveal style={{ textAlign: 'center', marginTop: '2.6rem' }}>
            <Link href={`/${locale}/faq`} className="btn-ghost-dark">
              {locale === 'he' ? 'לכל השאלות' : locale === 'en' ? 'All questions & answers' : 'Toutes les questions'}
            </Link>
          </Reveal>
        </div>
      </section>
      <style>{`
        .home-faq-item { border-bottom: 1px solid rgba(200,169,110,0.14); }
        .home-faq-item summary {
          display: flex; align-items: center; justify-content: space-between; gap: 1.2rem;
          cursor: pointer; list-style: none; padding: 1.35rem 0.2rem;
          font-family: 'Cormorant Garamond', serif; font-size: clamp(1.15rem, 2vw, 1.45rem);
          font-weight: 400; color: #FAF8F4; transition: color 0.3s;
        }
        .home-faq-item summary::-webkit-details-marker { display: none; }
        .home-faq-item summary:hover { color: #E8D5A3; }
        .home-faq-plus { font-family: 'Jost', sans-serif; font-size: 1.3rem; font-weight: 200; color: #C8A96E; flex-shrink: 0; transition: transform 0.35s var(--ease-luxe); }
        .home-faq-item[open] .home-faq-plus { transform: rotate(45deg); }
        .home-faq-item p {
          padding: 0 0.2rem 1.5rem; margin: 0; max-width: 62ch;
          font-size: 0.95rem; font-weight: 300; line-height: 1.85; color: rgba(212,213,216,0.7);
        }
      `}</style>

      {/* ── CTA BAND ────────────────────────────────────── */}
      <section style={{ position: 'relative', padding: 'clamp(64px, 8vw, 100px) clamp(1.25rem, 4vw, 3rem)', textAlign: 'center', overflow: 'hidden', direction: isRTL ? 'rtl' : 'ltr' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'url(https://images.unsplash.com/photo-1543728069-a3f97c5a2f32?w=1400&auto=format&fit=crop&q=70) center/cover', opacity: 0.12 }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, #0A0A0B 0%, #111214 100%)' }} />
        <Reveal style={{ position: 'relative', zIndex: 2, maxWidth: '760px', margin: '0 auto' }}>
          <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 300, color: '#FAFAF9', marginBottom: '18px', lineHeight: 1.1 }}>
            {m.cta_band.title.split(' ').slice(0, -2).join(' ')} <em style={{ fontStyle: 'italic', color: '#E8D5A3' }}>{m.cta_band.title.split(' ').slice(-2).join(' ')}</em>
          </h2>
          <p style={{ fontSize: '16px', fontWeight: 300, color: '#8A8B91', marginBottom: '40px', lineHeight: 1.8 }}>
            {m.cta_band.subtitle}
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href={`/${locale}/contact`} className="btn-primary-dark">{m.cta_band.button}</Link>
            <a href="https://wa.me/972555002640" target="_blank" rel="noopener noreferrer" className="btn-ghost-dark">
              WhatsApp
            </a>
          </div>
        </Reveal>
      </section>
    </>
  )
}
