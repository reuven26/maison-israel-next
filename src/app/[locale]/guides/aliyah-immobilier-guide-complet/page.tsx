import type { Metadata } from 'next'
import Link from 'next/link'
import GuideTldr from '@/components/public/GuideTldr'

const BASE_URL = 'https://luxuryisraelrealestate.com'
const SLUG = 'aliyah-immobilier-guide-complet'
const CANONICAL = `${BASE_URL}/fr/guides/${SLUG}`

export const metadata: Metadata = {
  title: 'Aliyah et Immobilier : Guide Complet 2026 pour Acheter en Israël',
  description: 'Tout ce qu\'il faut savoir pour acheter un bien immobilier en Israël avant ou après son Aliyah. Avantages fiscaux Oleh Hadash, calendrier, erreurs à éviter.',
  alternates: { canonical: CANONICAL },
  openGraph: {
    type: 'article',
    locale: 'fr_FR',
    url: CANONICAL,
    title: 'Aliyah et Immobilier : Guide Complet 2026 pour Acheter en Israël',
    description: 'Économisez jusqu\'à 100 000 € en coordonnant votre Aliyah et votre achat immobilier en Israël.',
    images: [{ url: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=1200&auto=format&fit=crop&q=80', width: 1200, height: 630 }],
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Aliyah et Immobilier : Guide Complet 2026 pour Acheter en Israël',
  description: 'Tout ce qu\'il faut savoir pour acheter un bien immobilier en Israël avant ou après son Aliyah.',
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
    { '@type': 'ListItem', position: 3, name: 'Aliyah et Immobilier', item: CANONICAL },
  ],
}

const TLDR = "Coordonner aliyah et achat immobilier change la fiscalité : acheter avant l'aliyah soumet à la taxe d'achat non-résident (8–10 %), tandis qu'acheter en tant qu'oleh hadash ouvre des taux réduits (souvent 0,5 % puis 5 %) et dix ans d'exonération sur les revenus de source étrangère. Le bon séquencement — souvent obtenir la Teoudat Oleh avant l'acquisition de la résidence principale — peut économiser plusieurs dizaines de milliers d'euros. Les quartiers francophones de référence : Colonie Allemande et Baka à Jérusalem, le Nord Ancien à Tel Aviv, Ir Yamim à Netanya."

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: "Vaut-il mieux acheter avant ou après l'aliyah ?", acceptedAnswer: { '@type': 'Answer', text: "Acheter après l'aliyah, en tant qu'oleh hadash, ouvre des taux de taxe d'achat réduits (souvent 0,5 % puis 5 %). Acheter avant sécurise le bien mais au taux non-résident (8–10 %). Le bon séquencement dépend de votre calendrier et du marché ciblé." } },
    { '@type': 'Question', name: 'Quels avantages fiscaux pour un oleh hadash qui achète ?', acceptedAnswer: { '@type': 'Answer', text: "Taux de Mas Rechisha réduits sur la résidence principale, exonération de dix ans sur les revenus et plus-values de source étrangère, et exemption sur les pensions étrangères (article 14)." } },
    { '@type': 'Question', name: 'Peut-on acheter un bien en Israël avant de finaliser son aliyah ?', acceptedAnswer: { '@type': 'Answer', text: "Oui, en tant que non-résident. Les bénéfices oleh peuvent ensuite être appliqués sous certaines conditions de timing — d'où l'importance d'une planification ante-aliyah." } },
    { '@type': 'Question', name: 'Quels quartiers privilégier pour une famille francophone ?', acceptedAnswer: { '@type': 'Answer', text: "La Colonie Allemande, Baka et le Vieux Katamon à Jérusalem ; le Nord Ancien et Ramat Aviv à Tel Aviv ; Ir Yamim et le centre à Netanya." } },
    { '@type': 'Question', name: 'Maison Israël accompagne-t-elle les projets aliyah + immobilier ?', acceptedAnswer: { '@type': 'Answer', text: "Oui : calendrier coordonné, mise en relation avec un avocat fiscal spécialisé olim et la banque adaptée, sélection du quartier selon le profil familial, et accès aux avantages oleh hadash." } },
  ],
}

const ths = { background: '#1C1D20', color: '#C8A96E', padding: '10px 14px', textAlign: 'left' as const, fontSize: '0.8rem', letterSpacing: '0.05em', fontWeight: 600 }
const tds = { padding: '10px 14px', borderBottom: '1px solid rgba(200,169,110,0.08)', color: '#8A8B91', fontSize: '0.9rem' }

const highlight = {
  background: 'rgba(200,169,110,0.06)',
  borderLeft: '3px solid #C8A96E',
  padding: '1.2rem 1.5rem',
  marginBottom: '2rem',
  color: '#D4D5D8',
  lineHeight: 1.8,
  fontSize: '0.95rem',
}

export default function AliyahImmobilierPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* HERO */}
      <div style={{ position: 'relative', height: '55vh', minHeight: '380px', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: '#0A0A0B' }} />
        <img
          src="https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=1600&auto=format&fit=crop&q=80"
          alt="Aliyah et immobilier en Israël"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.35 }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,10,11,0.95) 0%, rgba(10,10,11,0.2) 60%)' }} />
        <div style={{ position: 'absolute', bottom: '3rem', left: '50%', transform: 'translateX(-50%)', width: '100%', maxWidth: '900px', padding: '0 2rem', textAlign: 'center' }}>
          <div style={{ display: 'inline-block', background: '#C8A96E', color: '#0A0A0B', padding: '0.25rem 0.8rem', fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600, marginBottom: '1rem' }}>
            Aliyah
          </div>
          <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', color: '#fff', fontWeight: 300, lineHeight: 1.2, marginBottom: '1rem' }}>
            Aliyah et immobilier : le guide complet pour acheter en Israël en 2026
          </h1>
          <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)' }}>Mis à jour le 17 mai 2026 · 10 min de lecture</p>
        </div>
      </div>

      <GuideTldr text={TLDR} />

      {/* CONTENT */}
      <section style={{ padding: '4rem 2rem 6rem', background: '#0A0A0B' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 320px', gap: '4rem', alignItems: 'start' }}>

          <article>
            <nav style={{ marginBottom: '2rem', fontSize: '0.75rem', color: '#4A4B50' }}>
              <Link href="/fr" style={{ color: '#C8A96E', textDecoration: 'none' }}>Maison Israël</Link>
              {' › '}
              <Link href="/fr/guides" style={{ color: '#C8A96E', textDecoration: 'none' }}>Guides</Link>
              {' › '}
              <span>Aliyah et Immobilier</span>
            </nav>

            <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.3rem', color: '#D4D5D8', lineHeight: 1.8, marginBottom: '2.5rem', fontStyle: 'italic', borderLeft: '3px solid #C8A96E', paddingLeft: '1.5rem' }}>
              Faire son Aliyah et acheter un bien immobilier en Israël sont deux projets qui peuvent — et doivent — être coordonnés. Bien planifier la séquence permet d'économiser des dizaines de milliers d'euros et de bénéficier des avantages fiscaux du statut <strong>Oleh Hadash</strong>.
            </p>

            <div style={{ background: '#111214', padding: '3rem', border: '1px solid rgba(200,169,110,0.1)' }}>

              <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.8rem', color: '#FAFAF9', fontWeight: 400, marginBottom: '1.2rem', paddingBottom: '0.8rem', borderBottom: '1px solid rgba(200,169,110,0.2)' }}>
                1. Acheter avant ou après l'Aliyah : la décision clé
              </h2>
              <div style={{ overflowX: 'auto', marginBottom: '1.5rem' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid rgba(200,169,110,0.15)' }}>
                  <thead><tr>
                    <th style={ths}>Critère</th>
                    <th style={ths}>Achat avant Aliyah</th>
                    <th style={ths}>Achat après Aliyah</th>
                  </tr></thead>
                  <tbody>
                    {[
                      ['Taxe d\'achat (résidence principale)', '8–10 %', '0,5 % puis 5 %'],
                      ['Financement bancaire', '50 % max (non-résident)', '75 % max (résident)'],
                      ['Visite et choix', 'Plus difficile à distance', 'Sur place, plus serein'],
                      ['Logement à l\'arrivée', 'Disponible immédiatement', 'Location transitoire nécessaire'],
                    ].map(([c, a, b]) => (
                      <tr key={c}>
                        <td style={{ ...tds, color: '#D4D5D8', fontWeight: 500 }}>{c}</td>
                        <td style={{ ...tds, color: '#c07070' }}>{a}</td>
                        <td style={{ ...tds, color: '#70c090' }}>{b}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div style={highlight}>
                <strong>La règle d'or :</strong> si possible, faire l'Aliyah avant l'achat de la résidence principale permet de bénéficier du taux Oleh Hadash sur 7 ans. Sur un bien à 1,5 M€, l'économie peut atteindre <strong>100 000 €</strong>.
              </div>

              <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.8rem', color: '#FAFAF9', fontWeight: 400, marginBottom: '1.2rem', paddingBottom: '0.8rem', borderBottom: '1px solid rgba(200,169,110,0.2)' }}>
                2. Les avantages Oleh Hadash pour l'immobilier
              </h2>
              <ul style={{ color: '#8A8B91', lineHeight: 1.9, marginBottom: '2.5rem', paddingLeft: '1.5rem' }}>
                <li style={{ marginBottom: '0.8rem' }}><strong style={{ color: '#C8A96E' }}>Taxe d'achat réduite :</strong> 0,5 % sur la première tranche, puis 5 %, valable 7 ans après l'Aliyah</li>
                <li style={{ marginBottom: '0.8rem' }}><strong style={{ color: '#C8A96E' }}>Exonération fiscale :</strong> pas d'impôt sur les revenus de source étrangère pendant 10 ans (loyers d'un bien en France, dividendes…)</li>
                <li style={{ marginBottom: '0.8rem' }}><strong style={{ color: '#C8A96E' }}>Financement résident :</strong> accès au prêt jusqu'à 75 % du prix du bien</li>
                <li><strong style={{ color: '#C8A96E' }}>Plus-value exonérée :</strong> sur la résidence principale après 18 mois de détention</li>
              </ul>

              <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.8rem', color: '#FAFAF9', fontWeight: 400, marginBottom: '1.2rem', paddingBottom: '0.8rem', borderBottom: '1px solid rgba(200,169,110,0.2)' }}>
                3. Choisir sa ville francophone en 2026
              </h2>
              <div style={{ display: 'grid', gap: '1rem', marginBottom: '2.5rem' }}>
                {[
                  { ville: 'Netanya', label: 'Le choix sécurisant', desc: 'Très forte communauté francophone, écoles françaises, synagogues, commerces. Prix accessibles (5 500 à 14 000 €/m²).', href: '/fr/villes/netanya' },
                  { ville: 'Jérusalem', label: 'Pour les pratiquants et les familles', desc: 'Quartiers francophones structurés à Baka, Katamon, Rehavia. Vie communautaire dense, écoles francophones de qualité.', href: '/fr/villes/jerusalem' },
                  { ville: 'Tel Aviv', label: 'Pour les actifs et les entrepreneurs', desc: 'Hub économique, vie culturelle, plages. Prix élevés mais ROI locatif solide.', href: '/fr/villes/tel-aviv' },
                  { ville: 'Herzliya Pituah', label: 'Pour le très haut de gamme', desc: 'Villas en bord de mer, ambassades, écoles internationales. Ticket d\'entrée 3 M€+.', href: '/fr/villes/herzliya-pituah' },
                ].map(({ ville, label, desc, href }) => (
                  <div key={ville} style={{ background: 'rgba(200,169,110,0.04)', border: '1px solid rgba(200,169,110,0.1)', padding: '1.2rem 1.5rem' }}>
                    <div style={{ fontSize: '0.65rem', color: '#C8A96E', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.3rem' }}>{label}</div>
                    <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.2rem', color: '#FAFAF9', marginBottom: '0.4rem', fontWeight: 400 }}>{ville}</h3>
                    <p style={{ color: '#8A8B91', fontSize: '0.9rem', lineHeight: 1.7, marginBottom: '0.6rem' }}>{desc}</p>
                    <Link href={href} style={{ color: '#C8A96E', fontSize: '0.75rem', textDecoration: 'none' }}>En savoir plus →</Link>
                  </div>
                ))}
              </div>

              <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.8rem', color: '#FAFAF9', fontWeight: 400, marginBottom: '1.2rem', paddingBottom: '0.8rem', borderBottom: '1px solid rgba(200,169,110,0.2)' }}>
                4. Le calendrier idéal sur 18 mois
              </h2>
              <div style={{ marginBottom: '2.5rem' }}>
                {[
                  { t: 'M-18', d: 'Ouverture du dossier Aliyah (Agence Juive / Consistoire)' },
                  { t: 'M-12', d: 'Voyage de repérage + ouverture de compte bancaire israélien' },
                  { t: 'M-9', d: 'Mise en relation avec agence francophone, identification du quartier' },
                  { t: 'M-6', d: 'Obtention du Teoudat Oleh, finalisation du dossier de prêt' },
                  { t: 'M-3', d: 'Aliyah officielle, location temporaire' },
                  { t: 'M-0 à M+6', d: 'Recherche active du bien avec taux Oleh Hadash' },
                  { t: 'M+12', d: 'Signature, déménagement, vie courante installée' },
                ].map(({ t, d }) => (
                  <div key={t} style={{ display: 'flex', gap: '1.5rem', marginBottom: '0.8rem', alignItems: 'flex-start' }}>
                    <span style={{ background: '#C8A96E', color: '#0A0A0B', padding: '0.2rem 0.6rem', fontSize: '0.7rem', fontWeight: 700, flexShrink: 0, whiteSpace: 'nowrap' }}>{t}</span>
                    <span style={{ color: '#8A8B91', lineHeight: 1.7, fontSize: '0.9rem', paddingTop: '0.1rem' }}>{d}</span>
                  </div>
                ))}
              </div>

              <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.8rem', color: '#FAFAF9', fontWeight: 400, marginBottom: '1.2rem', paddingBottom: '0.8rem', borderBottom: '1px solid rgba(200,169,110,0.2)' }}>
                5. Les erreurs à éviter
              </h2>
              <ul style={{ color: '#8A8B91', lineHeight: 1.9, marginBottom: '2rem', paddingLeft: '1.5rem' }}>
                <li style={{ marginBottom: '0.8rem' }}>Signer un <strong style={{ color: '#D4D5D8' }}>Zikaron Dvarim</strong> sans avocat (engagement quasi-irréversible)</li>
                <li style={{ marginBottom: '0.8rem' }}>Sous-estimer les frais (compter <strong style={{ color: '#D4D5D8' }}>12–15 %</strong> au-delà du prix d'achat)</li>
                <li style={{ marginBottom: '0.8rem' }}>Acheter sur plan sans <strong style={{ color: '#D4D5D8' }}>clauses pénales</strong> claires (retards fréquents)</li>
                <li style={{ marginBottom: '0.8rem' }}>Ignorer la copropriété israélienne (<strong style={{ color: '#D4D5D8' }}>Va'ad Bayit</strong>) et ses charges</li>
                <li>Négliger les programmes <strong style={{ color: '#D4D5D8' }}>Tama 38 / Pinui Binui</strong> (rénovation/démolition) qui peuvent doubler la valeur</li>
              </ul>

              {/* CTA */}
              <div style={{ background: 'rgba(200,169,110,0.06)', border: '1px solid rgba(200,169,110,0.2)', padding: '2rem', textAlign: 'center', marginTop: '2rem' }}>
                <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.5rem', color: '#FAFAF9', marginBottom: '0.6rem', fontWeight: 300 }}>
                  Vous préparez votre Aliyah ?
                </p>
                <p style={{ color: '#8A8B91', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                  Nous vous accompagnons à chaque étape — du repérage à la remise des clés.
                </p>
                <Link href="/fr/contact" style={{ background: '#C8A96E', color: '#0A0A0B', padding: '0.8rem 2rem', fontFamily: 'DM Sans, sans-serif', fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', textDecoration: 'none', fontWeight: 600, display: 'inline-block' }}>
                  Planifier un appel découverte →
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
                { href: '/fr/guides/prix-immobilier-israel-2026', title: 'Prix immobilier en Israël 2026 par ville', cat: 'Marché & Prix' },
                { href: '/fr/guides/fiscalite-immobilier-israel-francais', title: 'Fiscalité immobilier en Israël pour Français : guide 2026', cat: 'Fiscalité' },
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
                Parler à un expert Aliyah
              </p>
              <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                Nos conseillers francophones vous guident de Paris à Tel Aviv.
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
