import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import type { Bien } from '@/types'
import type { Locale } from '@/i18n/config'
import { getMessages } from '@/i18n'
import InstagramFeed from '@/components/public/InstagramFeed'
import HeroSearch from '@/components/public/HeroSearch'
import HeroSlider from '@/components/public/HeroSlider'
import PropertyCard from '@/components/public/PropertyCard'
import Reveal from '@/components/public/Reveal'

export const revalidate = 60

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const messages = await getMessages(locale as Locale)
  const m = messages
  const isRTL = locale === 'he'

  const supabase = await createClient()
  const { data: biens } = await supabase
    .from('biens').select('*').eq('statut', 'actif')
    .order('created_at', { ascending: false }).limit(6)

  const marqueeItems = [
    'Tel Aviv · La Ville Blanche',
    'Herzliya Pituah · Front de Mer',
    'Jérusalem · Éternelle & Intemporelle',
    'Netanya · La Riviera Israélienne',
    'Investissement · ROI 4–7%',
    'Accompagnement · 100% Francophone',
  ]

  // Cinematic hero copy
  const heroCopy = {
    eyebrow: locale === 'he' ? 'נדל"ן יוקרה · ישראל' : locale === 'en' ? 'Luxury Real Estate · Israel' : 'Immobilier de Prestige · Israël',
    title: locale === 'he' ? 'גישה דיסקרטית לנכסים הנדירים ביותר בישראל'
      : locale === 'en' ? "Discreet access to Israel's rarest addresses"
      : "Un accès discret aux adresses les plus rares d'Israël",
  }

  // Editorial manifesto
  const manifesto = {
    eyebrow: locale === 'he' ? 'מאז 2009' : locale === 'en' ? 'Since 2009' : 'Depuis 2009',
    line: locale === 'he'
      ? 'אנו מלווים מספר מצומצם של משפחות ומשקיעים — לא בתפקיד של פורטל, אלא כיועץ פרטי. פחות נכסים, אך הנכונים.'
      : locale === 'en'
      ? 'We work with a small number of families and investors — not as a portal, but as a private advisor. Fewer properties, but the right ones.'
      : "Nous accompagnons un nombre restreint de familles et d'investisseurs — non comme un portail, mais comme un conseiller privé. Moins de propriétés, mais les bonnes.",
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
        .btn-primary-dark { display:inline-flex; align-items:center; gap:10px; padding:16px 36px; background:#C8A96E; color:#0A0A0B; font-family:'DM Sans',sans-serif; font-size:11px; font-weight:600; letter-spacing:0.2em; text-transform:uppercase; text-decoration:none; transition:background 0.3s; }
        .btn-primary-dark:hover { background:#E8D5A3; }
        .btn-ghost-dark { display:inline-flex; align-items:center; gap:10px; padding:15px 32px; background:transparent; color:#D4D5D8; font-family:'DM Sans',sans-serif; font-size:11px; font-weight:400; letter-spacing:0.15em; text-transform:uppercase; text-decoration:none; border:1px solid rgba(212,213,216,0.25); transition:all 0.3s; }
        .btn-ghost-dark:hover { border-color:#C8A96E; color:#C8A96E; }
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
        <HeroSlider />

        {/* Cinematic gradient — deeper at edges, breathes in the middle */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 1,
          background: 'linear-gradient(180deg, rgba(8,8,10,0.45) 0%, rgba(8,8,10,0.12) 30%, rgba(8,8,10,0.35) 62%, rgba(8,8,10,0.92) 100%)',
        }} />

        {/* Hero content — editorial title + search */}
        <div style={{ position: 'relative', zIndex: 2, width: '100%', paddingTop: '80px', textAlign: 'center' }}>
          {/* Eyebrow */}
          <p className="hero-fade-1" style={{
            fontFamily: "'DM Sans', sans-serif", fontSize: '0.68rem', fontWeight: 500,
            letterSpacing: '0.4em', textTransform: isRTL ? 'none' : 'uppercase',
            color: '#C8A96E', marginBottom: '1.6rem',
          }}>
            {heroCopy.eyebrow}
          </p>

          {/* Editorial headline */}
          <h1 className="hero-fade-2" style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(2.2rem, 5.5vw, 4.6rem)',
            fontWeight: 300, color: '#FAF8F4', lineHeight: 1.04,
            letterSpacing: '-0.01em', maxWidth: '15ch', margin: '0 auto 2.6rem',
            textShadow: '0 2px 40px rgba(0,0,0,0.4)',
          }}>
            {heroCopy.title}
          </h1>

          {/* Search bar */}
          <div className="hero-fade-3">
            <HeroSearch locale={locale} isRTL={isRTL} />
          </div>
        </div>

        {/* Scroll indicator — animated gold filament */}
        <div style={{ position: 'absolute', bottom: '2.2rem', left: '50%', transform: 'translateX(-50%)', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.8rem' }}>
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.58rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(250,248,244,0.5)' }}>
            {locale === 'he' ? 'גלה' : locale === 'en' ? 'Scroll' : 'Découvrir'}
          </span>
          <span className="hero-scroll-line" />
        </div>
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

      {/* ── MANIFESTO ───────────────────────────────────── */}
      <section style={{ background: '#08080A', padding: '120px 2rem', direction: isRTL ? 'rtl' : 'ltr' }}>
        <Reveal style={{ maxWidth: '820px', margin: '0 auto', textAlign: 'center' }}>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.68rem', fontWeight: 500, letterSpacing: '0.35em', textTransform: isRTL ? 'none' : 'uppercase', color: '#C8A96E', marginBottom: '2rem' }}>
            {manifesto.eyebrow}
          </p>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(1.5rem, 3vw, 2.4rem)', fontWeight: 300, fontStyle: 'italic', color: 'rgba(250,248,244,0.92)', lineHeight: 1.5, letterSpacing: '0.005em' }}>
            {manifesto.line}
          </p>
          <div style={{ width: '60px', height: '1px', background: 'linear-gradient(90deg, transparent, #C8A96E, transparent)', margin: '2.6rem auto 0' }} />
        </Reveal>
      </section>

      {/* ── EDITORIAL ───────────────────────────────────── */}
      <section style={{ padding: '100px 3rem', maxWidth: '1400px', margin: '0 auto', direction: isRTL ? 'rtl' : 'ltr' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }} className="editorial-2col">
          {/* Image */}
          <div className="editorial-img-wrap" style={{ position: 'relative' }}>
            <img
              src="https://images.unsplash.com/photo-1529390079861-591de354faf5?w=900&auto=format&fit=crop&q=85"
              alt="Tel Aviv luxury real estate"
              className="pcard-editorial-img"
              style={{ filter: 'brightness(0.9) contrast(1.05)' }}
            />
            <div className="pcard-editorial-img-frame" />
            <div className="editorial-badge-vert">Depuis 2009</div>
          </div>
          {/* Text */}
          <div>
            <div className="eyebrow hero-a1"><span>{m.featured.tag}</span></div>
            <h2 className="section-title-dark" style={{ marginBottom: '28px' }}>
              L&apos;excellence au service de votre <em style={{ fontStyle: 'italic', color: '#E8D5A3' }}>patrimoine</em>
            </h2>
            <p style={{ fontSize: '16px', fontWeight: 300, lineHeight: 1.85, color: 'rgba(212,213,216,0.75)', marginBottom: '32px' }}>
              Maison Israël est la référence de l&apos;immobilier de prestige pour la clientèle francophone en Israël. Depuis 2009, nous accompagnons les familles, les investisseurs et les Olim Hadashim dans l&apos;acquisition des propriétés les plus exclusives de Tel Aviv, Herzliya, Jérusalem et Netanya.
            </p>
            {[
              { icon: '◆', title: 'Experts francophones', desc: 'Équipe bilingue disponible 7j/7, accompagnement de A à Z' },
              { icon: '◆', title: 'Réseau exclusif', desc: 'Accès à des biens off-market non disponibles en agence classique' },
              { icon: '◆', title: 'Accompagnement complet', desc: 'Juridique, fiscal, bancaire, gestion locative — un seul interlocuteur' },
            ].map(item => (
              <div key={item.title} style={{ display: 'flex', gap: '16px', marginBottom: '20px' }}>
                <div style={{ width: '36px', height: '36px', border: '1px solid rgba(200,169,110,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <span style={{ color: '#C8A96E', fontSize: '10px' }}>{item.icon}</span>
                </div>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 500, color: '#D4D5D8', marginBottom: '4px' }}>{item.title}</div>
                  <div style={{ fontSize: '13px', fontWeight: 300, color: '#8A8B91', lineHeight: 1.5 }}>{item.desc}</div>
                </div>
              </div>
            ))}
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginTop: '36px' }}>
              <Link href={`/${locale}/about`} className="btn-primary-dark">{m.nav.about}</Link>
              <Link href={`/${locale}/contact`} className="btn-ghost-dark">{m.hero.cta_consult}</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURED PROPERTIES ─────────────────────────── */}
      <section style={{ background: '#111214', padding: '100px 3rem', direction: isRTL ? 'rtl' : 'ltr' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <Reveal style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '60px', flexWrap: 'wrap', gap: '1.5rem' }}>
            <div>
              <div className="eyebrow"><span>{m.featured.tag}</span></div>
              <h2 className="section-title-dark">{m.featured.title}</h2>
            </div>
            <Link href={`/${locale}/projets`} style={{ fontSize: '11px', letterSpacing: '0.15em', color: '#C8A96E', textDecoration: 'none', textTransform: 'uppercase', border: '1px solid rgba(200,169,110,0.3)', padding: '10px 20px', transition: 'all 0.3s' }}>
              {m.featured.all} →
            </Link>
          </Reveal>

          <div className="grid-properties">
            {(biens ?? []).map((bien: Bien, i: number) => (
              <Reveal key={bien.id} delay={(i % 3) * 140}>
                <PropertyCard bien={bien} locale={locale} messages={messages} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CITIES MOSAIC ───────────────────────────────── */}
      <section style={{ padding: '100px 3rem', direction: isRTL ? 'rtl' : 'ltr' }}>
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
                  <img src={d.img} alt={d.ville} />
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

      {/* ── INTERNATIONAL INVESTORS ─────────────────────── */}
      <section style={{ background: '#08080A', padding: '120px 2rem', borderTop: '1px solid rgba(200,169,110,0.08)', borderBottom: '1px solid rgba(200,169,110,0.08)', direction: isRTL ? 'rtl' : 'ltr' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <Reveal style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <p style={{ fontSize: '0.7rem', letterSpacing: isRTL ? '0' : '0.3em', textTransform: isRTL ? 'none' : 'uppercase', color: '#C8A96E', marginBottom: '1.2rem', fontFamily: "'DM Sans', sans-serif" }}>
              {locale === 'he' ? 'משקיעים בינלאומיים' : locale === 'en' ? 'International Investors' : 'Investisseurs Internationaux'}
            </p>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(2rem, 4vw, 3.2rem)', fontWeight: 300, color: '#FAF8F4', lineHeight: 1.1, maxWidth: '16ch', margin: '0 auto' }}>
              {locale === 'he' ? 'ישראל כסוג נכס' : locale === 'en' ? 'Israel as an asset class' : "L'immobilier israélien comme classe d'actif"}
            </h2>
          </Reveal>

          <Reveal style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '2rem 0', marginBottom: '3.5rem' }}>
            {[
              { fig: '3–8%', label: { fr: 'Rendement locatif brut', en: 'Gross rental yield', he: 'תשואת שכירות ברוטו' } },
              { fig: locale === 'he' ? 'אפס' : '0', label: { fr: 'Restriction de nationalité', en: 'Nationality restriction', he: 'הגבלת אזרחות' } },
              { fig: '10 ' + (locale === 'he' ? 'שנים' : locale === 'en' ? 'yrs' : 'ans'), label: { fr: 'Exonération oleh (Art. 14)', en: 'Oleh exemption (Art. 14)', he: 'פטור עולה (סעיף 14)' } },
              { fig: '50%', label: { fr: 'Financement non-résident', en: 'Non-resident financing', he: 'מימון תושב חוץ' } },
            ].map((s, i) => (
              <div key={i} style={{ flex: '1 1 auto', minWidth: '180px', textAlign: 'center', borderInlineStart: i === 0 ? 'none' : '1px solid rgba(200,169,110,0.18)', padding: '0 1.5rem' }}>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(2.4rem, 5vw, 3.6rem)', fontWeight: 300, color: '#C8A96E', lineHeight: 1, marginBottom: '0.8rem' }}>{s.fig}</div>
                <div style={{ fontSize: '0.74rem', color: '#8A8780', letterSpacing: '0.06em', fontFamily: "'DM Sans', sans-serif" }}>{s.label[locale === 'he' ? 'he' : locale === 'en' ? 'en' : 'fr']}</div>
              </div>
            ))}
          </Reveal>

          <Reveal style={{ textAlign: 'center' }}>
            <p style={{ color: 'rgba(216,212,204,0.7)', fontSize: '1rem', lineHeight: 1.85, maxWidth: '620px', margin: '0 auto 2.4rem', fontFamily: "'DM Sans', sans-serif" }}>
              {locale === 'he'
                ? 'אנו מיישרים כל רכישה עם האסטרטגיה הפיננסית הרחבה של הלקוח — תשואה מול שימור, גידור שקלי, ותכנון לפני עלייה.'
                : locale === 'en'
                ? 'We align each acquisition with the client\'s wider wealth strategy — yield versus preservation, shekel hedging, and pre-aliyah planning.'
                : "Nous alignons chaque acquisition sur la stratégie patrimoniale globale du client — rendement contre préservation, couverture en shekel, et planification ante-aliyah."}
            </p>
            <Link href={`/${locale}/clientele/investisseurs-internationaux`} className="btn-ghost-dark">
              {locale === 'he' ? 'ייעוץ השקעות' : locale === 'en' ? 'Investment advisory' : 'Conseil en investissement'}
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ── INSTAGRAM FEED ──────────────────────────────── */}
      <InstagramFeed locale={locale} messages={messages} />

      {/* ── OFF MARKET ACCESS ───────────────────────────── */}
      <section style={{ background: '#0A0A0B', direction: isRTL ? 'rtl' : 'ltr', position: 'relative', overflow: 'hidden' }}>
        {/* background texture */}
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1600&auto=format&fit=crop&q=60)', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.07 }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(10,10,11,0.95) 0%, rgba(10,10,11,0.6) 60%, rgba(10,10,11,0.95) 100%)' }} />

        <div style={{ position: 'relative', maxWidth: '1400px', margin: '0 auto', padding: '4rem 3rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '2rem', flexWrap: 'wrap' }}>
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

      {/* ── CTA BAND ────────────────────────────────────── */}
      <section style={{ position: 'relative', padding: '100px 3rem', textAlign: 'center', overflow: 'hidden', direction: isRTL ? 'rtl' : 'ltr' }}>
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

function BienCardDark({ bien, locale, messages }: { bien: Bien; locale: string; messages: Record<string, any> }) {
  const isRTL = locale === 'he'
  return (
    <Link href={`/${locale}/projets/${bien.slug}`} className="pcard">
      <div className="pcard-img-wrap">
        <img src={bien.image_principale} alt={bien.nom} className="pcard-img" />
        <div className="pcard-overlay" />
        <div className="pcard-badges">
          {bien.badge && <span className="pbadge pbadge-gold">{bien.badge}</span>}
          {bien.roi && <span className="pbadge pbadge-green">ROI {bien.roi}</span>}
        </div>
      </div>
      <div className="pcard-body" style={{ direction: isRTL ? 'rtl' : 'ltr' }}>
        <div className="pcard-city">{bien.quartier ? `${bien.quartier} · ${bien.ville}` : bien.ville}</div>
        <div className="pcard-name">{bien.nom}</div>
        <div className="pcard-specs">
          <span>{bien.type}</span>
          {bien.pieces && <><span>·</span><span>{bien.pieces} {messages.properties.rooms}</span></>}
        </div>
        <div className="pcard-price-row">
          <div className="pcard-price">{bien.prix_display}</div>
          <div style={{ fontSize: '11px', color: '#8A8B91' }}>{bien.surface} {messages.properties.surface}</div>
        </div>
      </div>
    </Link>
  )
}
