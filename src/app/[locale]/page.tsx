import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import type { Bien } from '@/types'
import type { Locale } from '@/i18n/config'
import { getMessages } from '@/i18n'
import InstagramFeed from '@/components/public/InstagramFeed'
import HeroSearch from '@/components/public/HeroSearch'
import HeroSlider from '@/components/public/HeroSlider'
import PropertyCard from '@/components/public/PropertyCard'

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
      `}</style>

      {/* ── HERO ─────────────────────────────────────────── */}
      <section style={{
        position: 'relative',
        height: '100vh',
        minHeight: '700px',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        direction: isRTL ? 'rtl' : 'ltr',
      }}>
        {/* Image slider */}
        <HeroSlider />

        {/* Dark gradient overlay */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 1,
          background: 'linear-gradient(180deg, rgba(10,10,11,0.25) 0%, rgba(10,10,11,0.18) 35%, rgba(10,10,11,0.55) 75%, rgba(10,10,11,0.88) 100%)',
        }} />

        {/* Search bar — centered */}
        <div style={{ position: 'relative', zIndex: 2, width: '100%', paddingTop: '80px' }}>
          <HeroSearch locale={locale} isRTL={isRTL} />
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
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '60px', flexWrap: 'wrap', gap: '1.5rem' }}>
            <div>
              <div className="eyebrow"><span>{m.featured.tag}</span></div>
              <h2 className="section-title-dark">{m.featured.title}</h2>
            </div>
            <Link href={`/${locale}/projets`} style={{ fontSize: '11px', letterSpacing: '0.15em', color: '#C8A96E', textDecoration: 'none', textTransform: 'uppercase', border: '1px solid rgba(200,169,110,0.3)', padding: '10px 20px', transition: 'all 0.3s' }}>
              {m.featured.all} →
            </Link>
          </div>

          <div className="grid-properties">
            {(biens ?? []).map((bien: Bien) => <PropertyCard key={bien.id} bien={bien} locale={locale} messages={messages} />)}
          </div>
        </div>
      </section>

      {/* ── CITIES MOSAIC ───────────────────────────────── */}
      <section style={{ padding: '100px 3rem', direction: isRTL ? 'rtl' : 'ltr' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{ marginBottom: '60px' }}>
            <div className="eyebrow"><span>{m.destinations.tag}</span></div>
            <h2 className="section-title-dark">{m.destinations.title}</h2>
          </div>

          <div className="cities-mosaic">
            {[
              { ville: 'Tel Aviv', slug: 'tel-aviv', img: 'https://images.unsplash.com/photo-1534430480872-3498386e7856?w=900&auto=format&fit=crop&q=80', desc: m.destinations.tel_aviv_desc, tall: true },
              { ville: locale === 'he' ? 'ירושלים' : 'Jérusalem', slug: 'jerusalem', img: 'https://images.unsplash.com/photo-1538970272646-f61fabb3a8a2?w=600&auto=format&fit=crop&q=80', desc: m.destinations.jerusalem_desc, tall: false },
              { ville: 'Herzliya Pituah', slug: 'herzliya-pituah', img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&auto=format&fit=crop&q=80', desc: m.destinations.herzliya_desc, tall: false },
              { ville: locale === 'he' ? 'נתניה' : 'Netanya', slug: 'netanya', img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&auto=format&fit=crop&q=80', desc: m.destinations.netanya_desc, tall: false },
            ].map(d => (
              <div key={d.slug} className={d.tall ? 'city-card-tall' : ''} style={{ position: 'relative' }}>
                <Link href={`/${locale}/villes/${d.slug}`} className="city-card-inner">
                  <img src={d.img} alt={d.ville} />
                  <div className="city-overlay" />
                  <div className="city-info">
                    <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: d.tall ? '48px' : '28px', fontWeight: 400, color: '#FAFAF9', lineHeight: 1, marginBottom: '6px' }}>{d.ville}</div>
                    <div style={{ fontSize: '11px', letterSpacing: '0.15em', color: '#E8D5A3', textTransform: 'uppercase' }}>{d.desc}</div>
                  </div>
                  <div className="city-arrow">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#C8A96E" strokeWidth="1.5"><path d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"/></svg>
                  </div>
                </Link>
              </div>
            ))}
          </div>
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
        <div style={{ position: 'relative', zIndex: 2, maxWidth: '760px', margin: '0 auto' }}>
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
        </div>
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
