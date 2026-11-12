import type { Metadata } from 'next'
import Link from 'next/link'
import GuideTldr from '@/components/public/GuideTldr'

const BASE_URL = 'https://luxuryisraelrealestate.com'
const SLUG = 'fiscalite-immobilier-israel-francais'
const CANONICAL = `${BASE_URL}/fr/guides/${SLUG}`

export const metadata: Metadata = {
  title: 'Fiscalité Immobilier en Israël pour Français 2026 : Guide Complet',
  description: 'Guide fiscal complet pour un Français qui achète, loue ou revend un bien en Israël en 2026. Convention fiscale France-Israël, Mas Rechisha, IFI, plus-values.',
  alternates: { canonical: CANONICAL },
  openGraph: {
    type: 'article',
    locale: 'fr_FR',
    url: CANONICAL,
    title: 'Fiscalité Immobilier en Israël pour Français : Guide Complet 2026',
    description: 'Maîtrisez la double fiscalité franco-israélienne avant d\'investir. Taxes d\'achat, loyers, plus-values, IFI — tout est expliqué.',
    images: [{ url: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1200&auto=format&fit=crop&q=80', width: 1200, height: 630 }],
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Fiscalité Immobilier en Israël pour Français : Guide Complet 2026',
  description: 'Guide fiscal complet pour un Français qui achète, loue ou revend un bien en Israël en 2026.',
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
    { '@type': 'ListItem', position: 3, name: 'Fiscalité Immobilier Israël Français', item: CANONICAL },
  ],
}

const TLDR = "Un Français qui achète en Israël paie le Mas Rechisha (taxe d'achat) de 8 à 10 % en tant que non-résident, sans exonération de première résidence. Les loyers sont imposables dans les deux pays, mais la convention fiscale franco-israélienne de 1995 accorde un crédit d'impôt évitant la double imposition. Un oleh hadash bénéficie de taux d'achat réduits (0,5 % puis 5 %) et d'une exonération de dix ans sur les revenus de source étrangère."

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: "Quelle taxe d'achat paie un Français non-résident en Israël ?", acceptedAnswer: { '@type': 'Answer', text: "Le Mas Rechisha : 8 % sur la première tranche (~6 M NIS) et 10 % au-delà, sans exonération de première résidence pour les non-résidents." } },
    { '@type': 'Question', name: 'Comment sont imposés les loyers israéliens pour un résident français ?', acceptedAnswer: { '@type': 'Answer', text: "En Israël : exonération sous ~5 654 ILS/mois, forfait 10 % sur le loyer brut, ou régime réel. En France, ces revenus sont imposables mais la convention de 1995 prévoit un crédit d'impôt évitant la double imposition." } },
    { '@type': 'Question', name: "L'immobilier israélien entre-t-il dans l'assiette de l'IFI ?", acceptedAnswer: { '@type': 'Answer', text: "Oui. Un résident fiscal français détenant un bien immobilier en Israël l'inclut dans son patrimoine taxable à l'IFI au-delà de 1,3 M€, sous réserve des règles de la convention." } },
    { '@type': 'Question', name: 'Quels avantages fiscaux pour un oleh hadash ?', acceptedAnswer: { '@type': 'Answer', text: "Taux de Mas Rechisha réduits sur la résidence principale (souvent 0,5 % puis 5 %), exonération de dix ans sur les revenus et plus-values de source étrangère, et exemption sur les pensions étrangères." } },
    { '@type': 'Question', name: "Quel est l'impôt sur la plus-value à la revente ?", acceptedAnswer: { '@type': 'Answer', text: "Le Mas Shevach s'applique à 25 % sur la plus-value ajustée de l'inflation pour les non-résidents. Des allègements existent pour les détentions longues." } },
  ],
}

const ths = { background: '#1C1D20', color: '#C8A96E', padding: '10px 14px', textAlign: 'left' as const, fontSize: '0.8rem', letterSpacing: '0.05em', fontWeight: 600 }
const tds = { padding: '10px 14px', borderBottom: '1px solid rgba(200,169,110,0.08)', color: '#8A8B91', fontSize: '0.9rem' }
const warning = {
  background: 'rgba(200,169,110,0.06)',
  borderLeft: '3px solid #C8A96E',
  padding: '1.2rem 1.5rem',
  marginBottom: '2rem',
  color: '#D4D5D8',
  lineHeight: 1.8,
  fontSize: '0.95rem',
}

export default function FiscaliteImmobilierPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* HERO */}
      <div style={{ position: 'relative', height: '55vh', minHeight: '380px', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: '#0A0A0B' }} />
        <img
          src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1600&auto=format&fit=crop&q=80"
          alt="Fiscalité immobilier Israël"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.3 }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,10,11,0.95) 0%, rgba(10,10,11,0.2) 60%)' }} />
        <div style={{ position: 'absolute', bottom: '3rem', left: '50%', transform: 'translateX(-50%)', width: '100%', maxWidth: '900px', padding: '0 2rem', textAlign: 'center' }}>
          <div style={{ display: 'inline-block', background: '#C8A96E', color: '#0A0A0B', padding: '0.25rem 0.8rem', fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600, marginBottom: '1rem' }}>
            Fiscalité
          </div>
          <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', color: '#fff', fontWeight: 300, lineHeight: 1.2, marginBottom: '1rem' }}>
            Fiscalité immobilier en Israël pour les Français : guide complet 2026
          </h1>
          <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)' }}>Mis à jour le 17 mai 2026 · 12 min de lecture</p>
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
              <span>Fiscalité Immobilier Israël Français</span>
            </nav>

            <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.3rem', color: '#D4D5D8', lineHeight: 1.8, marginBottom: '2.5rem', fontStyle: 'italic', borderLeft: '3px solid #C8A96E', paddingLeft: '1.5rem' }}>
              Acheter un bien immobilier en Israël quand on est résident fiscal français implique de comprendre deux systèmes fiscaux simultanément : israélien et français, articulés par la <strong>convention fiscale bilatérale de 1995</strong>. Voici le guide de référence à jour pour 2026.
            </p>

            <div style={{ background: '#111214', padding: '3rem', border: '1px solid rgba(200,169,110,0.1)' }}>

              <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.8rem', color: '#FAFAF9', fontWeight: 400, marginBottom: '1.2rem', paddingBottom: '0.8rem', borderBottom: '1px solid rgba(200,169,110,0.2)' }}>
                1. La taxe d'achat (Mas Rechisha) en 2026
              </h2>
              <p style={{ color: '#8A8B91', lineHeight: 1.9, marginBottom: '1.2rem' }}>
                C'est l'impôt le plus important au moment de l'acquisition. Les barèmes diffèrent fortement selon votre statut.
              </p>
              <h3 style={{ color: '#FAFAF9', fontFamily: 'Cormorant Garamond, serif', fontSize: '1.1rem', marginBottom: '0.8rem' }}>Pour un non-résident (Français vivant en France)</h3>
              <div style={{ overflowX: 'auto', marginBottom: '1.5rem' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid rgba(200,169,110,0.15)' }}>
                  <thead><tr><th style={ths}>Tranche</th><th style={ths}>Taux 2026</th></tr></thead>
                  <tbody>
                    <tr><td style={tds}>0 – 6 055 070 ILS</td><td style={{ ...tds, color: '#c07070' }}>8 %</td></tr>
                    <tr><td style={tds}>Au-delà</td><td style={{ ...tds, color: '#c07070' }}>10 %</td></tr>
                  </tbody>
                </table>
              </div>
              <h3 style={{ color: '#FAFAF9', fontFamily: 'Cormorant Garamond, serif', fontSize: '1.1rem', marginBottom: '0.8rem' }}>Pour un résident israélien (résidence principale)</h3>
              <div style={{ overflowX: 'auto', marginBottom: '1.5rem' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid rgba(200,169,110,0.15)' }}>
                  <thead><tr><th style={ths}>Tranche (ILS)</th><th style={ths}>Taux 2026</th></tr></thead>
                  <tbody>
                    {[
                      ['0 – 1 978 745', '0 %'],
                      ['1 978 745 – 2 347 040', '3,5 %'],
                      ['2 347 040 – 6 055 070', '5 %'],
                      ['6 055 070 – 20 183 565', '8 %'],
                      ['Au-delà', '10 %'],
                    ].map(([t, r]) => (
                      <tr key={t}>
                        <td style={tds}>{t}</td>
                        <td style={{ ...tds, color: '#70c090' }}>{r}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div style={warning}>
                <strong>Astuce Aliyah :</strong> un Oleh Hadash bénéficie d'un taux ultra-réduit (0,5 % puis 5 %) pendant les 7 ans suivant son Aliyah, sur l'achat de sa résidence principale. Économie potentielle : <strong>50 000 € à 200 000 €</strong> selon le prix.
              </div>

              <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.8rem', color: '#FAFAF9', fontWeight: 400, marginBottom: '1.2rem', paddingBottom: '0.8rem', borderBottom: '1px solid rgba(200,169,110,0.2)' }}>
                2. Imposition des revenus locatifs
              </h2>
              <p style={{ color: '#8A8B91', lineHeight: 1.9, marginBottom: '1rem' }}>Trois régimes existent en Israël, à choisir chaque année :</p>
              <ul style={{ color: '#8A8B91', lineHeight: 1.9, marginBottom: '1.5rem', paddingLeft: '1.5rem' }}>
                <li style={{ marginBottom: '0.6rem' }}><strong style={{ color: '#C8A96E' }}>Exonération totale</strong> sous le plafond mensuel d'environ 5 654 ILS (2026)</li>
                <li style={{ marginBottom: '0.6rem' }}><strong style={{ color: '#C8A96E' }}>Forfait à 10 %</strong> sur le loyer brut, sans déduction de charges</li>
                <li><strong style={{ color: '#C8A96E' }}>Régime réel</strong> avec déduction des charges, intérêts, amortissement — taux marginal classique</li>
              </ul>
              <p style={{ color: '#8A8B91', lineHeight: 1.9, marginBottom: '2.5rem' }}>
                En France, ces revenus restent imposables car perçus à l'étranger, mais la convention France-Israël prévoit un <strong style={{ color: '#D4D5D8' }}>crédit d'impôt</strong> égal à l'impôt français correspondant (méthode du taux effectif). Concrètement : pas de double imposition, mais les revenus s'ajoutent à votre taux marginal français pour calculer le taux moyen.
              </p>

              <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.8rem', color: '#FAFAF9', fontWeight: 400, marginBottom: '1.2rem', paddingBottom: '0.8rem', borderBottom: '1px solid rgba(200,169,110,0.2)' }}>
                3. Plus-values immobilières (Mas Shevach)
              </h2>
              <p style={{ color: '#8A8B91', lineHeight: 1.9, marginBottom: '2.5rem' }}>
                À la revente, la plus-value est imposée en Israël à <strong style={{ color: '#D4D5D8' }}>25 %</strong> pour les particuliers (taux 2026). Une exonération existe pour la résidence principale détenue depuis au moins 18 mois.
                En France, la convention applique la même règle : crédit d'impôt évitant la double imposition. Attention aux <strong style={{ color: '#D4D5D8' }}>prélèvements sociaux (17,2 %)</strong> qui peuvent rester dus en France selon votre situation.
              </p>

              <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.8rem', color: '#FAFAF9', fontWeight: 400, marginBottom: '1.2rem', paddingBottom: '0.8rem', borderBottom: '1px solid rgba(200,169,110,0.2)' }}>
                4. IFI et patrimoine immobilier en Israël
              </h2>
              <p style={{ color: '#8A8B91', lineHeight: 1.9, marginBottom: '2.5rem' }}>
                Si vous êtes résident fiscal français et que votre patrimoine immobilier net (France + étranger) dépasse <strong style={{ color: '#D4D5D8' }}>1,3 M€</strong>, vos biens en Israël entrent dans l'assiette de l'IFI. Pensez à intégrer cette donnée dans votre stratégie patrimoniale.
              </p>

              <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.8rem', color: '#FAFAF9', fontWeight: 400, marginBottom: '1.2rem', paddingBottom: '0.8rem', borderBottom: '1px solid rgba(200,169,110,0.2)' }}>
                5. TVA et frais annexes
              </h2>
              <ul style={{ color: '#8A8B91', lineHeight: 1.9, marginBottom: '2.5rem', paddingLeft: '1.5rem' }}>
                <li style={{ marginBottom: '0.6rem' }}><strong style={{ color: '#C8A96E' }}>TVA (Maam) :</strong> 18 % en 2026, déjà incluse dans le prix d'un programme neuf</li>
                <li style={{ marginBottom: '0.6rem' }}><strong style={{ color: '#C8A96E' }}>Honoraires d'avocat :</strong> 1,5 à 2 % + TVA</li>
                <li style={{ marginBottom: '0.6rem' }}><strong style={{ color: '#C8A96E' }}>Agence :</strong> 2 % + TVA (côté acheteur)</li>
                <li><strong style={{ color: '#C8A96E' }}>Frais techniques et enregistrement :</strong> 0,5 à 1 %</li>
              </ul>

              <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.8rem', color: '#FAFAF9', fontWeight: 400, marginBottom: '1.2rem', paddingBottom: '0.8rem', borderBottom: '1px solid rgba(200,169,110,0.2)' }}>
                6. Cas particuliers
              </h2>
              <h3 style={{ color: '#FAFAF9', fontFamily: 'Cormorant Garamond, serif', fontSize: '1.1rem', marginBottom: '0.6rem' }}>Achat via une société</h3>
              <p style={{ color: '#8A8B91', lineHeight: 1.9, marginBottom: '1.5rem' }}>
                L'acquisition via société israélienne (Ltd) ou SCI française entraîne une fiscalité spécifique (IS, retenues à la source sur dividendes). À analyser avec un avocat fiscaliste bi-national.
              </p>
              <h3 style={{ color: '#FAFAF9', fontFamily: 'Cormorant Garamond, serif', fontSize: '1.1rem', marginBottom: '0.6rem' }}>Achat en indivision famille</h3>
              <p style={{ color: '#8A8B91', lineHeight: 1.9, marginBottom: '2rem' }}>
                Très fréquent côté francophone : permet d'optimiser la transmission. Demandez systématiquement un acte sur mesure.
              </p>

              {/* CTA */}
              <div style={{ background: 'rgba(200,169,110,0.06)', border: '1px solid rgba(200,169,110,0.2)', padding: '2rem', textAlign: 'center', marginTop: '2rem' }}>
                <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.5rem', color: '#FAFAF9', marginBottom: '0.6rem', fontWeight: 300 }}>
                  Besoin d'une simulation fiscale personnalisée ?
                </p>
                <p style={{ color: '#8A8B91', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                  Nos partenaires avocats franco-israéliens vous accompagnent dans le montage optimal.
                </p>
                <Link href="/fr/contact" style={{ background: '#C8A96E', color: '#0A0A0B', padding: '0.8rem 2rem', fontFamily: 'DM Sans, sans-serif', fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', textDecoration: 'none', fontWeight: 600, display: 'inline-block' }}>
                  Demander une consultation →
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
                { href: '/fr/guides/prix-immobilier-israel-2026', title: 'Prix immobilier en Israël 2026 : analyse par ville', cat: 'Marché & Prix' },
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
                Consulter un expert fiscal
              </p>
              <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                Optimisez votre montage avant de signer. Consultation gratuite.
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
