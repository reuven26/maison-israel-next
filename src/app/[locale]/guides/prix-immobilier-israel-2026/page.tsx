import type { Metadata } from 'next'
import { languagesFor } from '@/lib/seo'
import Link from 'next/link'
import GuideTldr from '@/components/public/GuideTldr'

const BASE_URL = 'https://luxuryisraelrealestate.com'
const SLUG = 'prix-immobilier-israel-2026'
const CANONICAL = `${BASE_URL}/fr/guides/${SLUG}`

export const metadata: Metadata = {
  title: 'Prix Immobilier en Israël 2026 : Tel Aviv, Jérusalem, Netanya',
  description: 'Prix immobilier en Israël 2026 : prix au m² actualisés à Tel Aviv, Jérusalem, Netanya, Herzliya. Tendances, projections et conseils d\'experts francophones.',
  alternates: { canonical: CANONICAL, languages: languagesFor(`/guides/${SLUG}`) },
  openGraph: {
    type: 'article',
    locale: 'fr_FR',
    url: CANONICAL,
    title: 'Prix Immobilier en Israël 2026 — Analyse Complète par Ville',
    description: 'Le guide de référence des prix immobiliers en Israël en 2026. Données actualisées Tel Aviv, Jérusalem, Netanya, Herzliya.',
    images: [{ url: 'https://images.unsplash.com/photo-1529390079861-591de354faf5?w=1200&auto=format&fit=crop&q=80', width: 1200, height: 630 }],
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Prix Immobilier en Israël 2026 : Tel Aviv, Jérusalem, Netanya, Herzliya',
  description: 'Analyse complète des prix immobiliers en Israël en 2026 par ville et par quartier.',
  image: 'https://images.unsplash.com/photo-1529390079861-591de354faf5?w=1800&auto=format&fit=crop&q=85',
  author: { '@type': 'Person', '@id': `${BASE_URL}/#founder`, name: 'Réouven Benchetrit', alternateName: 'Reuven Benchetrit', url: `${BASE_URL}/fr/equipe` },
  publisher: { '@type': 'Organization', name: 'Maison Israël', logo: { '@type': 'ImageObject', url: `${BASE_URL}/logo.svg` } },
  datePublished: '2026-05-17',
  dateModified: '2026-05-17',
  inLanguage: 'fr-FR',
  mainEntityOfPage: CANONICAL,
}

const breadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Maison Israël', item: BASE_URL },
    { '@type': 'ListItem', position: 2, name: 'Guides', item: `${BASE_URL}/fr/guides` },
    { '@type': 'ListItem', position: 3, name: 'Prix Immobilier Israël 2026', item: CANONICAL },
  ],
}

const TLDR = "En 2026, l'immobilier de prestige israélien se négocie entre ~12 600 et 30 200 €/m² selon la ville : Tel Aviv est le marché le plus cher (jusqu'à ~30 200 €/m² en prime), suivi de Herzliya Pituah et de Jérusalem (jusqu'à ~23 900 €/m²). Netanya reste la plus accessible (~3 500–5 500 €/m²). Les villas ultra-prime débutent autour de 3,5 M€ à Savyon et dépassent 45 M€ en front de mer à Herzliya Pituah."

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'Combien coûte un appartement de prestige à Tel Aviv en 2026 ?', acceptedAnswer: { '@type': 'Answer', text: "Le segment prime à Tel Aviv (Neve Tzedek, Rothschild, tours Park Tzameret) se négocie entre ~17 600 et 30 200 €/m² en 2026." } },
    { '@type': 'Question', name: "Quelle est la ville la plus chère d'Israël pour l'immobilier ?", acceptedAnswer: { '@type': 'Answer', text: "Tel Aviv au m² (jusqu'à ~30 200 €/m² en prime). En valeur absolue, Herzliya Pituah détient le sommet avec des villas front de mer dépassant 45 M€." } },
    { '@type': 'Question', name: 'Quelle ville offre le meilleur rapport prix en Israël ?', acceptedAnswer: { '@type': 'Answer', text: "Netanya reste la plus accessible du segment international (~3 500–5 500 €/m²), avec une forte communauté francophone." } },
    { '@type': 'Question', name: "Quel est le prix d'entrée d'une villa de prestige en Israël ?", acceptedAnswer: { '@type': 'Answer', text: "Environ 3,5 M€ à Savyon, 4,5 M€ à Césarée et 7,5 M€ à Herzliya Pituah ; les biens trophées dépassent 28–45 M€." } },
    { '@type': 'Question', name: "Les prix de l'immobilier de luxe montent-ils en Israël ?", acceptedAnswer: { '@type': 'Answer', text: "Oui. Le segment prime affiche +3 à +6 % sur un an selon la ville en 2026, Jérusalem en tête (+5,8 %), porté par la demande internationale." } },
  ],
}

const ths = { background: '#1C1D20', color: '#C8A96E', padding: '10px 14px', textAlign: 'left' as const, fontSize: '0.8rem', letterSpacing: '0.05em', fontWeight: 600 }
const tds = { padding: '10px 14px', borderBottom: '1px solid rgba(200,169,110,0.08)', color: '#8A8B91', fontSize: '0.9rem' }

export default function PrixImmobilierPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* HERO */}
      <div style={{ position: 'relative', height: '55vh', minHeight: '380px', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: '#0A0A0B' }} />
        <img
          src="https://images.unsplash.com/photo-1529390079861-591de354faf5?w=1600&auto=format&fit=crop&q=80"
          alt="Immobilier Tel Aviv"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.35 }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,10,11,0.95) 0%, rgba(10,10,11,0.2) 60%)' }} />
        <div style={{ position: 'absolute', bottom: '3rem', left: '50%', transform: 'translateX(-50%)', width: '100%', maxWidth: '900px', padding: '0 2rem', textAlign: 'center' }}>
          <div style={{ display: 'inline-block', background: '#C8A96E', color: '#0A0A0B', padding: '0.25rem 0.8rem', fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600, marginBottom: '1rem' }}>
            Marché & Prix
          </div>
          <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', color: '#fff', fontWeight: 300, lineHeight: 1.2, marginBottom: '1rem' }}>
            Prix Immobilier en Israël en 2026 : le guide complet par ville
          </h1>
          <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)' }}>Mis à jour le 17 mai 2026 · Par l'équipe Maison Israël · 8 min de lecture</p>
        </div>
      </div>

      <GuideTldr text={TLDR} />

      {/* CONTENT */}
      <section style={{ padding: '4rem 2rem 6rem', background: '#0A0A0B' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 320px', gap: '4rem', alignItems: 'start' }}>

          <article>
            {/* Breadcrumb */}
            <nav style={{ marginBottom: '2rem', fontSize: '0.75rem', color: '#4A4B50' }}>
              <Link href="/fr" style={{ color: '#C8A96E', textDecoration: 'none' }}>Maison Israël</Link>
              {' › '}
              <Link href="/fr/guides" style={{ color: '#C8A96E', textDecoration: 'none' }}>Guides</Link>
              {' › '}
              <span>Prix Immobilier Israël 2026</span>
            </nav>

            <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.3rem', color: '#D4D5D8', lineHeight: 1.8, marginBottom: '2.5rem', fontStyle: 'italic', borderLeft: '3px solid #C8A96E', paddingLeft: '1.5rem' }}>
              Le marché immobilier israélien en 2026 traverse une phase de stabilisation après les tensions géopolitiques des années précédentes. Les <strong>prix immobiliers en Israël</strong> restent soutenus par une demande structurellement forte, en particulier de la part des acheteurs francophones et de la diaspora juive.
            </p>

            <div style={{ background: '#111214', padding: '3rem', border: '1px solid rgba(200,169,110,0.1)' }}>

              <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.8rem', color: '#FAFAF9', fontWeight: 400, marginBottom: '1.2rem', paddingBottom: '0.8rem', borderBottom: '1px solid rgba(200,169,110,0.2)' }}>
                1. Prix immobilier à Tel Aviv en 2026
              </h2>
              <p style={{ color: '#8A8B91', lineHeight: 1.9, marginBottom: '1.5rem' }}>
                Tel Aviv reste la ville la plus chère d'Israël et l'une des plus chères au monde au mètre carré. Le prix moyen oscille en 2026 entre <strong style={{ color: '#D4D5D8' }}>12 000 € et 35 000 € le m²</strong> selon le quartier.
              </p>
              <div style={{ overflowX: 'auto', marginBottom: '2.5rem' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid rgba(200,169,110,0.15)' }}>
                  <thead><tr>
                    <th style={ths}>Quartier</th>
                    <th style={ths}>Prix moyen €/m²</th>
                    <th style={ths}>Profil</th>
                  </tr></thead>
                  <tbody>
                    {[
                      ['Rothschild', '28 000 – 35 000', 'Prestige, central, vie nocturne'],
                      ['Neve Tzedek', '25 000 – 32 000', 'Bohème chic, valeur refuge'],
                      ['Sde Dov', '22 000 – 30 000', 'Nouveau front de mer, neuf'],
                      ['Florentin', '14 000 – 18 000', 'En mutation, artistes'],
                      ['Nord-Vieux', '16 000 – 22 000', 'Familles aisées'],
                      ['Ramat Aviv', '13 000 – 17 000', 'Universitaire, expats'],
                    ].map(([q, p, pr]) => (
                      <tr key={q}>
                        <td style={{ ...tds, color: '#D4D5D8', fontWeight: 500 }}>{q}</td>
                        <td style={tds}>{p}</td>
                        <td style={tds}>{pr}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.8rem', color: '#FAFAF9', fontWeight: 400, marginBottom: '1.2rem', paddingBottom: '0.8rem', borderBottom: '1px solid rgba(200,169,110,0.2)' }}>
                2. Prix immobilier à Jérusalem en 2026
              </h2>
              <p style={{ color: '#8A8B91', lineHeight: 1.9, marginBottom: '1.5rem' }}>
                Jérusalem affiche des prix variant fortement entre l'est et l'ouest, mais aussi entre les quartiers laïcs et religieux. Les <strong style={{ color: '#D4D5D8' }}>quartiers premium pour francophones</strong> se concentrent dans l'ouest.
              </p>
              <div style={{ overflowX: 'auto', marginBottom: '2.5rem' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid rgba(200,169,110,0.15)' }}>
                  <thead><tr>
                    <th style={ths}>Quartier</th>
                    <th style={ths}>Prix moyen €/m²</th>
                  </tr></thead>
                  <tbody>
                    {[
                      ['Mamilla', '15 000 – 22 000'],
                      ['Talbieh', '13 000 – 18 000'],
                      ['German Colony', '12 000 – 16 000'],
                      ['Rehavia', '11 000 – 15 000'],
                      ['Baka / Katamon', '10 000 – 14 000'],
                    ].map(([q, p]) => (
                      <tr key={q}>
                        <td style={{ ...tds, color: '#D4D5D8', fontWeight: 500 }}>{q}</td>
                        <td style={tds}>{p}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.8rem', color: '#FAFAF9', fontWeight: 400, marginBottom: '1.2rem', paddingBottom: '0.8rem', borderBottom: '1px solid rgba(200,169,110,0.2)' }}>
                3. Prix immobilier à Netanya en 2026
              </h2>
              <p style={{ color: '#8A8B91', lineHeight: 1.9, marginBottom: '1.5rem' }}>
                Netanya est la capitale francophone d'Israël. Le marché reste plus accessible que Tel Aviv tout en offrant 14 km de plages.
              </p>
              <div style={{ overflowX: 'auto', marginBottom: '2.5rem' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid rgba(200,169,110,0.15)' }}>
                  <thead><tr>
                    <th style={ths}>Quartier</th>
                    <th style={ths}>Prix moyen €/m²</th>
                  </tr></thead>
                  <tbody>
                    {[
                      ['Bord de mer (Nitza)', '9 000 – 14 000'],
                      ['Ramat Poleg', '7 000 – 10 000'],
                      ['Ir Yamim', '8 000 – 12 000'],
                      ['Centre-ville', '5 500 – 8 000'],
                    ].map(([q, p]) => (
                      <tr key={q}>
                        <td style={{ ...tds, color: '#D4D5D8', fontWeight: 500 }}>{q}</td>
                        <td style={tds}>{p}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.8rem', color: '#FAFAF9', fontWeight: 400, marginBottom: '1.2rem', paddingBottom: '0.8rem', borderBottom: '1px solid rgba(200,169,110,0.2)' }}>
                4. Prix immobilier à Herzliya Pituah en 2026
              </h2>
              <p style={{ color: '#8A8B91', lineHeight: 1.9, marginBottom: '2.5rem' }}>
                Herzliya Pituah, la « Riviera israélienne », abrite ambassades, dirigeants tech et écoles internationales. Les villas en bord de mer s'y négocient entre <strong style={{ color: '#D4D5D8' }}>8 et 25 millions d'euros</strong>. Le prix moyen au m² pour un appartement haut de gamme se situe entre 15 000 et 25 000 €.
              </p>

              <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.8rem', color: '#FAFAF9', fontWeight: 400, marginBottom: '1.2rem', paddingBottom: '0.8rem', borderBottom: '1px solid rgba(200,169,110,0.2)' }}>
                5. Tendances 2026 et projections
              </h2>
              <ul style={{ color: '#8A8B91', lineHeight: 1.9, marginBottom: '2.5rem', paddingLeft: '1.5rem' }}>
                <li style={{ marginBottom: '0.8rem' }}><strong style={{ color: '#D4D5D8' }}>Stabilisation :</strong> après une volatilité de 2024–2025, les prix se stabilisent avec une croissance attendue de 3 à 5 % en 2026.</li>
                <li style={{ marginBottom: '0.8rem' }}><strong style={{ color: '#D4D5D8' }}>Demande francophone soutenue :</strong> l'Aliyah de France représente toujours une part significative des transactions premium.</li>
                <li style={{ marginBottom: '0.8rem' }}><strong style={{ color: '#D4D5D8' }}>Taux d'intérêt :</strong> entre 4,2 % et 5,6 % en 2026, en légère baisse par rapport à 2025.</li>
                <li><strong style={{ color: '#D4D5D8' }}>Off-market :</strong> 30 à 40 % des transactions de prestige se font hors marché public — d'où l'intérêt d'une agence francophone bien introduite.</li>
              </ul>

              <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.8rem', color: '#FAFAF9', fontWeight: 400, marginBottom: '1.2rem', paddingBottom: '0.8rem', borderBottom: '1px solid rgba(200,169,110,0.2)' }}>
                6. Frais d'acquisition à prévoir
              </h2>
              <p style={{ color: '#8A8B91', lineHeight: 1.9, marginBottom: '2rem' }}>
                Au-delà du prix, comptez <strong style={{ color: '#D4D5D8' }}>12 à 15 % de frais</strong> : taxe d'achat 8–10 %, avocat 1,5–2 %, agence 2 %, frais techniques 0,5–1 %.
              </p>

              {/* CTA */}
              <div style={{ background: 'rgba(200,169,110,0.06)', border: '1px solid rgba(200,169,110,0.2)', padding: '2rem', textAlign: 'center', marginTop: '2rem' }}>
                <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.5rem', color: '#FAFAF9', marginBottom: '0.6rem', fontWeight: 300 }}>
                  Vous envisagez un achat en Israël en 2026 ?
                </p>
                <p style={{ color: '#8A8B91', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                  Recevez notre catalogue confidentiel de biens off-market à Tel Aviv, Herzliya et Jérusalem.
                </p>
                <Link href="/fr/contact" style={{ background: '#C8A96E', color: '#0A0A0B', padding: '0.8rem 2rem', fontFamily: 'DM Sans, sans-serif', fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', textDecoration: 'none', fontWeight: 600, display: 'inline-block' }}>
                  Demander un accompagnement →
                </Link>
              </div>
            </div>

            <div style={{ marginTop: '3rem' }}>
              <Link href="/fr/guides" style={{ color: '#C8A96E', textDecoration: 'none', fontSize: '0.8rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                ← Tous les guides
              </Link>
            </div>
          </article>

          {/* Sidebar */}
          <aside style={{ position: 'sticky', top: '120px' }}>
            <p style={{ fontSize: '0.7rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#C8A96E', marginBottom: '1.2rem' }}>
              Articles similaires
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
              {[
                { href: '/fr/guides/fiscalite-immobilier-israel-francais', title: 'Fiscalité immobilier en Israël pour Français : guide 2026', cat: 'Fiscalité' },
                { href: '/fr/guides/aliyah-immobilier-guide-complet', title: 'Aliyah et immobilier : ce qu\'il faut savoir avant d\'acheter', cat: 'Aliyah' },
              ].map(rel => (
                <Link key={rel.href} href={rel.href} style={{ textDecoration: 'none', display: 'flex', gap: '1rem', background: '#111214', overflow: 'hidden', border: '1px solid rgba(200,169,110,0.1)', padding: '1rem' }}>
                  <div>
                    <div style={{ fontSize: '0.6rem', color: '#C8A96E', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.3rem' }}>{rel.cat}</div>
                    <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1rem', color: '#D4D5D8', lineHeight: 1.3 }}>{rel.title}</p>
                  </div>
                </Link>
              ))}
            </div>
            <div style={{ background: '#111214', padding: '2rem', border: '1px solid rgba(200,169,110,0.1)' }}>
              <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.3rem', color: '#fff', marginBottom: '0.8rem', fontWeight: 300 }}>
                Parler à un expert
              </p>
              <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                Consultation gratuite avec nos conseillers francophones à Tel Aviv.
              </p>
              <Link href="/fr/contact" style={{ background: '#C8A96E', color: '#0A0A0B', padding: '0.8rem 1.5rem', fontFamily: 'DM Sans, sans-serif', fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase', textDecoration: 'none', fontWeight: 600, display: 'inline-block' }}>
                Nous contacter
              </Link>
            </div>
          </aside>
        </div>
      </section>
    </>
  )
}
