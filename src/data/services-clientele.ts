/* ─────────────────────────────────────────────────────────
   SERVICES & CLIENTÈLE — Commercial landing pages
   These pages capture commercial-intent searches and tailor
   the proposition to a specific service or buyer profile.
   ───────────────────────────────────────────────────────── */

export interface LandingPage {
  slug: string
  category: 'service' | 'clientele'

  names: { fr: string; en: string; he: string }
  tagline: { fr: string; en: string; he: string }

  seoTitle: { fr: string; en: string; he: string }
  metaDescription: { fr: string; en: string; he: string }
  h1: { fr: string; en: string; he: string }

  hero: string

  intro: { fr: string; en: string; he: string }

  sections: {
    title: { fr: string; en: string; he: string }
    body: { fr: string; en: string; he: string }
  }[]

  process?: {
    title: { fr: string; en: string; he: string }
    desc: { fr: string; en: string; he: string }
  }[]

  faq: { q: { fr: string; en: string; he: string }; a: { fr: string; en: string; he: string } }[]

  ctaHeadline: { fr: string; en: string; he: string }
  ctaSubtitle: { fr: string; en: string; he: string }

  relatedQuartiers?: string[]
  relatedArticles?: string[]
}

/* ═══════════════════════════════════════════════════════════
   SERVICES (4)
   ═══════════════════════════════════════════════════════════ */

export const SERVICES: LandingPage[] = [
  {
    slug: 'recherche-personnalisee',
    category: 'service',
    names: { fr: 'Recherche Personnalisée', en: 'Private Property Search', he: 'חיפוש נכס פרטי' },
    tagline: {
      fr: 'Un brief, un conseiller, et un accès aux propriétés qui ne sont pas sur le marché',
      en: 'A brief, an advisor, and access to properties that are not on the market',
      he: 'בריף, יועץ, וגישה לנכסים שאינם בשוק',
    },
    seoTitle: {
      fr: 'Recherche Immobilière Personnalisée en Israël | Maison Israël',
      en: 'Private Real Estate Search in Israel | Maison Israël',
      he: 'חיפוש נדל"ן פרטי בישראל | מייזון ישראל',
    },
    metaDescription: {
      fr: "Recherche immobilière personnalisée en Israël pour acheteurs internationaux. Brief privé, accès off-market, négociation, accompagnement complet.",
      en: 'Private real estate search in Israel for international buyers. Private brief, off-market access, negotiation, full support.',
      he: 'חיפוש נדל"ן אישי בישראל לקונים בינלאומיים. בריף פרטי, גישה למחוץ-לשוק.',
    },
    h1: {
      fr: "L'inverse d'un portail : la recherche menée par un conseiller",
      en: 'The Opposite of a Portal: Advisor-Led Property Search',
      he: 'ההפך מפורטל: חיפוש נכסים בהובלת יועץ',
    },
    hero: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1600&auto=format&fit=crop&q=80',
    intro: {
      fr: "La plupart des recherches immobilières internationales en Israël commencent — et finissent — sur un portail. Le résultat est prévisible : un acheteur qualifié parcourt des centaines d'annonces, dont la plupart sont mal présentées ou déjà vendues, sans jamais voir les propriétés qui correspondent réellement à son brief. Notre approche est différente. Nous commençons par une conversation privée, définissons un brief précis, et menons la recherche à travers notre réseau de conseillers, courtiers et vendeurs directs en Israël. Vous voyez moins de propriétés, mais les bonnes.",
      en: 'Most international property searches in Israel begin — and end — on a portal. The result is predictable: a qualified buyer scrolls through hundreds of listings, most poorly presented or already sold, never seeing the properties that actually match their brief. Our approach is different. We begin with a private conversation, define a precise brief, and conduct the search across our network of advisors, brokers, and direct sellers in Israel. You see fewer properties, but the right ones.',
      he: 'רוב חיפושי הנדל"ן הבינלאומיים בישראל מתחילים — ומסתיימים — בפורטל. הגישה שלנו שונה. אנו מתחילים בשיחה פרטית, מגדירים בריף מדויק, ומובילים את החיפוש דרך רשת היועצים, המתווכים והמוכרים הישירים שלנו בישראל.',
    },
    sections: [
      {
        title: { fr: 'Le brief précis', en: 'The Precise Brief', he: 'הבריף המדויק' },
        body: {
          fr: "Les briefs vagues produisent des recherches médiocres. Notre conversation initiale couvre la fourchette de prix, les quartiers ciblés, le type architectural, la surface, l'orientation, le calendrier d'usage, et — c'est essentiel — la philosophie d'investissement (rendement, préservation, future aliyah, résidence principale). Un brief bien construit permet de filtrer 80 % de l'inventaire avant la première visite.",
          en: "Vague briefs produce mediocre searches. Our initial conversation covers price range, target neighbourhoods, architectural type, surface, orientation, usage schedule, and — crucially — the investment philosophy (yield, preservation, future aliyah, primary residence). A well-constructed brief allows us to filter 80% of inventory before the first visit.",
          he: 'בריפים מעורפלים מייצרים חיפושים בינוניים. השיחה הראשונית שלנו מכסה טווח מחיר, שכונות יעד, סוג אדריכלי, שטח.',
        },
      },
      {
        title: { fr: "L'accès off-market", en: 'Off-Market Access', he: 'גישה למחוץ-לשוק' },
        body: {
          fr: "Une part substantielle des transactions premium en Israël se déroule en off-market. Notre rôle est de circuler votre brief — anonymement, à travers un réseau curaté de fellow advisors et vendeurs connus — afin que les bonnes propriétés vous trouvent. C'est un processus de relation, pas de portail. Cela prend du temps. C'est aussi pourquoi nos clients accèdent à des propriétés que les autres acheteurs ne voient jamais.",
          en: 'A substantial share of premium transactions in Israel happen off-market. Our role is to circulate your brief — anonymously, through a curated network of fellow advisors and known sellers — so the right properties find you. This is a relationship process, not a portal. It takes time. It is also why our clients access properties other buyers never see.',
          he: 'חלק משמעותי מהעסקאות הפרמיום בישראל מתבצע מחוץ לשוק.',
        },
      },
      {
        title: { fr: 'La négociation', en: 'Negotiation', he: 'משא ומתן' },
        body: {
          fr: "Une fois la propriété identifiée, la négociation est traitée par votre conseiller principal en coordination avec votre avocat. Nous gérons les visites, les contre-offres, les délais de paiement, et les conditions suspensives. Vous prenez les décisions ; nous gérons l'exécution. Notre intérêt est aligné avec le vôtre : un bon prix d'entrée détermine la performance de l'actif sur dix ans.",
          en: "Once the property is identified, negotiation is handled by your principal advisor in coordination with your lawyer. We manage viewings, counter-offers, payment timelines, and conditions precedent. You make the decisions; we manage execution. Our interest is aligned with yours: a good entry price determines the asset's performance over ten years.",
          he: 'לאחר זיהוי הנכס, המשא ומתן מטופל על ידי היועץ הראשי שלך.',
        },
      },
    ],
    process: [
      {
        title: { fr: 'Conversation initiale', en: 'Initial Conversation', he: 'שיחה ראשונית' },
        desc: {
          fr: 'Brief privé, confidentiel. Nous évaluons votre objectif, votre calendrier, et la cohérence du brief avec le marché actuel.',
          en: 'Private, confidential brief. We assess your objective, your timeline, and the coherence of the brief with the current market.',
          he: 'בריף פרטי, סודי.',
        },
      },
      {
        title: { fr: 'Circulation et présélection', en: 'Circulation and Pre-Selection', he: 'הפצה ובחירה מוקדמת' },
        desc: {
          fr: 'Nous circulons le brief dans notre réseau et présélectionnons 5–10 propriétés correspondant exactement, dont une majorité en off-market.',
          en: 'We circulate the brief in our network and pre-select 5–10 exactly-matching properties, the majority off-market.',
          he: 'אנו מפיצים את הבריף ברשת ובוחרים מראש 5–10 נכסים.',
        },
      },
      {
        title: { fr: 'Visite et shortlist', en: 'Viewings and Shortlist', he: 'ביקורים ורשימה מצומצמת' },
        desc: {
          fr: "Visites organisées sur un seul déplacement en Israël lorsque c'est possible. À l'issue, une shortlist de 2–3 propriétés.",
          en: 'Viewings organised on a single Israel trip when possible. A 2–3 property shortlist at the end.',
          he: 'ביקורים מאורגנים על נסיעה אחת לישראל.',
        },
      },
      {
        title: { fr: 'Négociation et clôture', en: 'Negotiation and Closing', he: 'משא ומתן וסגירה' },
        desc: {
          fr: 'Offre, négociation, contrat, due diligence avec votre avocat, paiement échelonné, enregistrement au Tabu.',
          en: 'Offer, negotiation, contract, due diligence with your lawyer, staged payment, Tabu registration.',
          he: 'הצעה, משא ומתן, חוזה, רישום בטאבו.',
        },
      },
    ],
    faq: [
      {
        q: { fr: 'Combien coûte le service ?', en: 'How much does the service cost?', he: 'כמה עולה השירות?' },
        a: {
          fr: "Nous sommes rémunérés à la commission d'acquisition, payée à la conclusion. Nous discutons les conditions précises lors du brief initial, en fonction de la complexité et de la fourchette de prix.",
          en: 'We are paid on acquisition commission, settled at closing. We discuss precise terms during the initial brief, depending on complexity and price range.',
          he: 'אנו מתוגמלים בעמלת רכישה.',
        },
      },
      {
        q: { fr: 'Combien de temps prend une recherche typique ?', en: 'How long does a typical search take?', he: 'כמה זמן לוקח חיפוש טיפוסי?' },
        a: {
          fr: 'Pour un brief bien défini et une fourchette de prix réaliste : trois à six mois en moyenne. Pour un actif trophée ou un quartier très contraint (Talbieh, Galei Tchelet), six à douze mois.',
          en: 'For a well-defined brief and realistic price range: three to six months on average. For a trophy asset or highly-constrained neighbourhood (Talbiyeh, Galei Tchelet), six to twelve months.',
          he: 'לבריף מוגדר היטב: 3–6 חודשים בממוצע.',
        },
      },
      {
        q: { fr: 'Travaillez-vous avec des acheteurs étrangers ?', en: 'Do you work with foreign buyers?', he: 'האם אתם עובדים עם קונים זרים?' },
        a: {
          fr: 'C\'est notre cœur de métier depuis 2009. La majorité de nos clients sont français, américains, britanniques, et latino-américains. Nous coordonnons avec votre avocat, banque, et conseillers fiscaux.',
          en: 'It is our core business since 2009. The majority of our clients are French, American, British, and Latin American. We coordinate with your lawyer, bank, and tax advisors.',
          he: 'זהו הליבה של העסק שלנו מאז 2009.',
        },
      },
    ],
    ctaHeadline: {
      fr: 'Une recherche commence par une conversation',
      en: 'A search begins with a conversation',
      he: 'חיפוש מתחיל בשיחה',
    },
    ctaSubtitle: {
      fr: 'Confidentiel. Sans engagement. Notre équipe est disponible par introduction directe.',
      en: 'Confidential. No commitment. Our team is available by direct introduction.',
      he: 'סודי. ללא התחייבות.',
    },
    relatedArticles: ['acheter-immobilier-israel-investisseur-etranger', 'proprietes-off-market-israel-luxe'],
  },

  /* ────────────────────────── */
  {
    slug: 'off-market',
    category: 'service',
    names: { fr: 'Accès Off-Market', en: 'Off-Market Access', he: 'גישה למחוץ-לשוק' },
    tagline: {
      fr: 'Les propriétés qui ne sont pas sur les portails',
      en: 'The properties that are not on portals',
      he: 'הנכסים שאינם בפורטלים',
    },
    seoTitle: {
      fr: 'Immobilier Off-Market en Israël | Maison Israël',
      en: 'Off-Market Real Estate Access in Israel | Maison Israël',
      he: 'נדל"ן מחוץ לשוק בישראל | מייזון ישראל',
    },
    metaDescription: {
      fr: "Accès aux propriétés off-market en Israël — Herzliya Pituah, Talbieh, Caesarea. Acheteurs qualifiés uniquement, par introduction directe.",
      en: 'Access to off-market properties in Israel — Herzliya Pituah, Talbiyeh, Caesarea. Qualified buyers only, by direct introduction.',
      he: 'גישה לנכסים מחוץ לשוק בישראל. קונים מוסמכים בלבד.',
    },
    h1: {
      fr: 'Off-Market — Là où se passe le marché premium israélien',
      en: 'Off-Market — Where the Israeli Premium Market Actually Happens',
      he: 'מחוץ לשוק — איפה השוק הפרמיום הישראלי באמת קורה',
    },
    hero: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=1600&auto=format&fit=crop&q=80',
    intro: {
      fr: "Selon nos estimations, entre 35 et 50 % des transactions immobilières premium en Israël — propriétés au-dessus de 12 millions de NIS — se déroulent en off-market. Dans certains sous-marchés (Herzliya Pituah, Talbieh, Caesarea), la part est nettement plus élevée. Pour un acheteur international entrant sur le marché, ne pas avoir accès à ce flux signifie ne voir qu'une fraction de l'inventaire pertinent. Notre portfolio off-market est curaté en continu et disponible aux acheteurs qualifiés par introduction directe.",
      en: 'By our estimates, between 35 and 50% of premium real estate transactions in Israel — properties above 12 million NIS — happen off-market. In certain submarkets (Herzliya Pituah, Talbiyeh, Caesarea), the share is materially higher. For an international buyer entering the market, lacking access to this flow means seeing only a fraction of relevant inventory. Our off-market portfolio is curated continuously and available to qualified buyers by direct introduction.',
      he: 'לפי הערכותינו, בין 35% ל-50% מעסקאות הנדל"ן הפרמיום בישראל מתבצעות מחוץ לשוק.',
    },
    sections: [
      {
        title: { fr: 'Pourquoi les vendeurs préfèrent la confidentialité', en: 'Why Sellers Prefer Privacy', he: 'מדוע מוכרים מעדיפים פרטיות' },
        body: {
          fr: "Trois raisons reviennent constamment dans nos conversations avec les vendeurs : la confidentialité personnelle (aucune photo, aucun voisin curieux), la précision tarifaire (une propriété privée se vend à son vrai prix, pas au prix d'annonce dégradé par la négociation publique), et la sélection de la contrepartie (qui sont les acheteurs ? Sont-ils sérieux ? Le prix est rarement le seul critère).",
          en: 'Three reasons recur constantly in our conversations with sellers: personal privacy (no photos, no curious neighbours), pricing precision (a private property sells at its true price, not the listing price eroded by public negotiation), and counterparty selection (who are the buyers? Are they serious? Price is rarely the only criterion).',
          he: 'שלוש סיבות חוזרות בשיחות עם המוכרים: פרטיות, דיוק תמחור, ובחירת הצד הנגדי.',
        },
      },
      {
        title: { fr: 'Comment nous qualifions les acheteurs', en: 'How We Qualify Buyers', he: 'איך אנו מסננים קונים' },
        body: {
          fr: "L'accès à notre portfolio off-market n'est pas ouvert. Nous évaluons chaque acheteur potentiel sur trois critères : la fourchette de prix réaliste, la sérénité du calendrier, et l'identité (preuve de fonds, références, contexte). Cela protège les vendeurs et préserve la qualité de nos relations futures. Ce n'est pas une politique commerciale — c'est ce qui nous permet de continuer à recevoir les bonnes propriétés.",
          en: "Access to our off-market portfolio is not open. We evaluate each potential buyer on three criteria: realistic price range, calendar seriousness, and identity (proof of funds, references, context). This protects sellers and preserves the quality of our future relationships. It is not a commercial policy — it is what allows us to keep receiving the right properties.",
          he: 'הגישה לתיק מחוץ-לשוק שלנו אינה פתוחה.',
        },
      },
      {
        title: { fr: 'Le type de propriétés', en: 'The Types of Properties', he: 'סוגי הנכסים' },
        body: {
          fr: "Notre portfolio off-market couvre principalement : les villas trophées d'Herzliya Pituah, Galei Tchelet et Nof Yam ; les maisons mandataires de Talbieh et de la Colonie Allemande ; les penthouses du Park Tzameret et de la pointe de Tel Aviv ; les propriétés de Caesarea Aleph. Les fourchettes de prix vont de 8 à 60 millions de dollars selon le segment.",
          en: 'Our off-market portfolio primarily covers: trophy villas in Herzliya Pituah, Galei Tchelet and Nof Yam; Mandate houses in Talbiyeh and the German Colony; penthouses in Park Tzameret and the Tel Aviv seafront; properties in Caesarea Aleph. Price ranges from $8M to $60M depending on segment.',
          he: 'התיק שלנו מכסה וילות פאר בהרצליה פיתוח, בתי מנדט בטלביה, פנטהאוזים בפארק צמרת.',
        },
      },
    ],
    faq: [
      {
        q: { fr: 'Comment puis-je accéder à votre portfolio off-market ?', en: 'How can I access your off-market portfolio?', he: 'איך אוכל לגשת לתיק שלכם?' },
        a: {
          fr: "Par introduction directe à notre équipe. Nous organisons un premier échange — confidentiel, sans engagement — pour comprendre votre brief et évaluer la pertinence. À l'issue, nous partageons une sélection initiale de 3–5 propriétés correspondant à vos critères.",
          en: 'Through direct introduction to our team. We arrange an initial exchange — confidential, no commitment — to understand your brief and assess fit. We then share an initial selection of 3–5 properties matching your criteria.',
          he: 'דרך היכרות ישירה לצוות שלנו.',
        },
      },
      {
        q: { fr: 'Pourquoi pas un site avec les propriétés ?', en: 'Why not a website with the properties?', he: 'מדוע אין אתר עם הנכסים?' },
        a: {
          fr: "Parce qu'un portail off-market est une contradiction dans les termes. Si une propriété est répertoriée sur un site web — même sécurisé, même privé — elle n'est plus off-market au sens où les vendeurs l'entendent. Notre engagement de confidentialité envers les vendeurs est ce qui rend ce flux possible.",
          en: 'Because an off-market portal is a contradiction in terms. If a property is listed on a website — even secure, even private — it is no longer off-market in the sense sellers mean. Our confidentiality commitment to sellers is what makes this flow possible.',
          he: 'משום שפורטל מחוץ-לשוק הוא סתירה במונחים.',
        },
      },
      {
        q: { fr: 'Quelle est la fourchette de prix minimale ?', en: 'What is the minimum price range?', he: 'מהו טווח המחיר המינימלי?' },
        a: {
          fr: "Notre flux off-market commence généralement à 8 millions de NIS. En dessous de ce niveau, le marché public reste pertinent et nous travaillons les deux flux conjointement.",
          en: 'Our off-market flow generally begins at 8 million NIS. Below this level, the public market remains relevant and we work both flows jointly.',
          he: 'הזרם מחוץ-לשוק שלנו מתחיל בדרך כלל ב-8 מיליון ₪.',
        },
      },
    ],
    ctaHeadline: {
      fr: "Accédez au flux off-market par introduction directe",
      en: 'Access the off-market flow by direct introduction',
      he: 'גשת לזרם מחוץ-לשוק בהיכרות ישירה',
    },
    ctaSubtitle: {
      fr: "Confidentialité absolue. Évaluation initiale en 48h.",
      en: 'Absolute confidentiality. Initial assessment within 48 hours.',
      he: 'סודיות מוחלטת.',
    },
    relatedArticles: ['proprietes-off-market-israel-luxe', 'herzliya-pituah-caesarea-ultra-prime'],
    relatedQuartiers: ['galei-tchelet', 'talbieh', 'nof-yam'],
  },

  /* ────────────────────────── */
  {
    slug: 'estimation',
    category: 'service',
    names: { fr: 'Estimation & Valorisation', en: 'Valuation & Estimation', he: 'הערכה ושיווי' },
    tagline: {
      fr: 'Une valorisation par un conseiller qui connaît votre rue',
      en: 'A valuation by an advisor who knows your street',
      he: 'הערכה על ידי יועץ שמכיר את הרחוב שלך',
    },
    seoTitle: {
      fr: 'Estimation Immobilière en Israël | Maison Israël',
      en: 'Real Estate Valuation in Israel | Maison Israël',
      he: 'הערכת נדל"ן בישראל | מייזון ישראל',
    },
    metaDescription: {
      fr: "Estimation immobilière en Israël par des conseillers spécialistes. Vente, succession, refinancement. Méthodologie comparable + connaissance micro-marché.",
      en: 'Real estate valuation in Israel by specialist advisors. Sale, estate planning, refinancing. Comparable methodology + micro-market knowledge.',
      he: 'הערכת נדל"ן בישראל על ידי יועצים מומחים.',
    },
    h1: {
      fr: "Estimation Immobilière — Pourquoi un avis d'expert vaut mieux qu'un algorithme",
      en: "Real Estate Valuation — Why an Expert Opinion Beats an Algorithm",
      he: 'הערכת נדל"ן — מדוע חוות דעת מומחה עדיפה על אלגוריתם',
    },
    hero: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1600&auto=format&fit=crop&q=80',
    intro: {
      fr: "Une estimation algorithmique de type Madlan vous donnera une fourchette. Cette fourchette sera juste, en moyenne. Mais la médiane n'est pas votre propriété. Votre propriété a un étage spécifique, une orientation spécifique, un état spécifique, et une rue spécifique. Sur le marché premium israélien, ces variables modifient le prix de 15 à 40 %. Notre estimation repose sur trois niveaux : les transactions comparables récentes, la connaissance micro-marché de nos conseillers, et un ajustement par condition. Le résultat est une fourchette resserrée, défendable, et utile pour décider.",
      en: 'A Madlan-style algorithmic estimate gives you a range. That range will be correct, on average. But the median is not your property. Your property has a specific floor, orientation, condition, and street. In the Israeli premium market, these variables shift the price by 15 to 40%. Our valuation rests on three layers: recent comparable transactions, the micro-market knowledge of our advisors, and a condition adjustment. The result is a tightened, defensible range — useful for actual decisions.',
      he: 'הערכה אלגוריתמית תיתן לך טווח. הטווח נכון בממוצע. אבל החציון אינו הנכס שלך.',
    },
    sections: [
      {
        title: { fr: 'Quand une estimation rigoureuse est nécessaire', en: 'When a Rigorous Valuation Is Necessary', he: 'מתי הערכה קפדנית נדרשת' },
        body: {
          fr: "Quatre situations principales : préparation à la vente (positionnement du prix de mise en marché), négociation d'achat (validation indépendante du prix demandé), succession et donation (valorisation officielle pour l'administration fiscale), et refinancement bancaire. Dans chaque cas, l'écart entre une estimation rigoureuse et un chiffre approximatif peut représenter plusieurs centaines de milliers de shekels.",
          en: "Four main situations: sale preparation (positioning the listing price), purchase negotiation (independent validation of the asking price), estate and gift planning (official valuation for tax authorities), and bank refinancing. In each case, the gap between a rigorous valuation and an approximate figure can represent hundreds of thousands of shekels.",
          he: 'ארבעה מצבים עיקריים: הכנה למכירה, משא ומתן רכישה, ירושה, מימון מחדש.',
        },
      },
      {
        title: { fr: 'Notre méthodologie', en: 'Our Methodology', he: 'המתודולוגיה שלנו' },
        body: {
          fr: "Nous combinons trois niveaux d'analyse. D'abord, les transactions comparables — sur les 18 derniers mois, ajustées par surface, étage, et orientation. Ensuite, la connaissance micro-marché : ce qui se passe actuellement en off-market, les négociations en cours, et la profondeur de la demande. Enfin, l'ajustement par condition — état du bâtiment, qualité de la rénovation, équipements, et particularités structurelles. Le rapport final inclut une fourchette défendable et une analyse écrite.",
          en: 'We combine three layers of analysis. First, comparable transactions — over the past 18 months, adjusted for surface, floor, and orientation. Second, micro-market knowledge: what is happening off-market, negotiations underway, the depth of demand. Third, the condition adjustment — building state, renovation quality, fittings, and structural specifics. The final report includes a defensible range and a written analysis.',
          he: 'אנו משלבים שלוש שכבות של ניתוח.',
        },
      },
      {
        title: { fr: 'Confidentialité', en: 'Confidentiality', he: 'סודיות' },
        body: {
          fr: "Toutes les estimations sont confidentielles. Si vous évaluez une vente potentielle sans vouloir signaler le marché, notre intervention reste invisible. Nous ne contactons jamais les voisins, ne photographions pas l'extérieur sans permission, et ne discutons pas votre propriété dans le réseau.",
          en: 'All valuations are confidential. If you are assessing a potential sale without wanting to signal the market, our involvement remains invisible. We never contact neighbours, do not photograph the exterior without permission, and do not discuss your property in the network.',
          he: 'כל ההערכות סודיות.',
        },
      },
    ],
    faq: [
      {
        q: { fr: 'Combien coûte une estimation ?', en: 'How much does a valuation cost?', he: 'כמה עולה הערכה?' },
        a: {
          fr: 'Pour une estimation préparatoire à la vente, le service est généralement offert dans le cadre d\'un mandat de vente. Pour les estimations indépendantes (succession, achat, refinancement), nos honoraires sont fixes et discutés en amont selon la complexité.',
          en: 'For a pre-sale valuation, the service is generally offered as part of a sale mandate. For independent valuations (estate, purchase, refinancing), our fees are fixed and discussed upfront based on complexity.',
          he: 'להערכה לקראת מכירה, השירות בדרך כלל כלול במנדט המכירה.',
        },
      },
      {
        q: { fr: 'Combien de temps prend une estimation ?', en: 'How long does it take?', he: 'כמה זמן זה לוקח?' },
        a: {
          fr: "Pour une propriété standard avec accès à la documentation : 5–10 jours ouvrables. Pour une propriété complexe (maison mandataire, héritage avec plusieurs ayants droit, propriété sur terre ILA), 2–3 semaines.",
          en: 'For a standard property with documentation access: 5–10 working days. For a complex property (Mandate house, multi-heir estate, ILA-land property): 2–3 weeks.',
          he: 'לנכס סטנדרטי: 5–10 ימי עסקים.',
        },
      },
      {
        q: { fr: 'L\'estimation est-elle reconnue par les banques et l\'administration ?', en: 'Is the valuation recognized by banks and authorities?', he: 'האם ההערכה מוכרת על ידי בנקים ורשויות?' },
        a: {
          fr: "Notre estimation est un avis d'expert détaillé. Pour certains usages officiels (refinancement bancaire, déclaration fiscale), un expert immobilier agréé (Shamai Mekarkein) peut être nécessaire en complément. Nous coordonnons avec un réseau d'experts agréés lorsque c'est requis.",
          en: 'Our valuation is a detailed expert opinion. For certain official uses (bank refinancing, tax filing), a licensed real estate appraiser (Shamai Mekarkein) may be required additionally. We coordinate with a network of licensed appraisers when needed.',
          he: 'ההערכה שלנו היא חוות דעת מומחה.',
        },
      },
    ],
    ctaHeadline: {
      fr: 'Demander une estimation confidentielle',
      en: 'Request a confidential valuation',
      he: 'בקש הערכה סודית',
    },
    ctaSubtitle: {
      fr: 'Réponse initiale sous 48h. Aucun engagement.',
      en: 'Initial response within 48 hours. No commitment.',
      he: 'תגובה ראשונית תוך 48 שעות.',
    },
    relatedArticles: ['tel-aviv-vs-jerusalem-investissement'],
  },

  /* ────────────────────────── */
  {
    slug: 'conseil-investissement',
    category: 'service',
    names: { fr: "Conseil en Investissement", en: 'Investment Advisory', he: 'ייעוץ השקעות' },
    tagline: {
      fr: "L'immobilier israélien comme classe d'actif",
      en: 'Israeli real estate as an asset class',
      he: 'נדל"ן ישראלי כסוג נכס',
    },
    seoTitle: {
      fr: 'Conseil en Investissement Immobilier en Israël | Maison Israël',
      en: 'Israeli Real Estate Investment Advisory | Maison Israël',
      he: 'ייעוץ השקעות נדל"ן בישראל | מייזון ישראל',
    },
    metaDescription: {
      fr: "Conseil en investissement immobilier en Israël. Stratégie de portefeuille, optimisation fiscale, rendement vs préservation, multi-propriétés.",
      en: 'Real estate investment advisory in Israel. Portfolio strategy, tax optimisation, yield vs preservation, multi-property holdings.',
      he: 'ייעוץ השקעות נדל"ן בישראל.',
    },
    h1: {
      fr: "L'immobilier israélien comme stratégie de portefeuille",
      en: 'Israeli Real Estate as Portfolio Strategy',
      he: 'נדל"ן ישראלי כאסטרטגיית תיק השקעות',
    },
    hero: 'https://images.unsplash.com/photo-1593672715438-d88a70629abe?w=1600&auto=format&fit=crop&q=80',
    intro: {
      fr: "Pour un acheteur international, l'immobilier israélien n'est jamais une transaction isolée. C'est un actif dans un portefeuille plus large, structuré en interaction avec d'autres positions, d'autres juridictions, et d'autres horizons. Notre rôle est d'aligner l'acquisition immobilière sur la stratégie patrimoniale globale du client. Cela couvre le choix entre rendement et préservation, l'arbitrage entre Tel Aviv et Jérusalem, l'utilisation du shekel comme hedge contre l'euro ou le dollar, la planification ante-aliyah, et la structuration multi-propriétés.",
      en: 'For an international buyer, Israeli real estate is never an isolated transaction. It is an asset in a wider portfolio, structured in interaction with other positions, other jurisdictions, and other horizons. Our role is to align property acquisition with the client\'s broader wealth strategy. This covers the choice between yield and preservation, the arbitrage between Tel Aviv and Jerusalem, using the shekel as a hedge against the euro or dollar, pre-aliyah planning, and multi-property structuring.',
      he: 'לקונה בינלאומי, נדל"ן ישראלי לעולם אינו עסקה בודדה.',
    },
    sections: [
      {
        title: { fr: 'Rendement vs Préservation', en: 'Yield vs Preservation', he: 'תשואה מול שימור' },
        body: {
          fr: "Les deux stratégies sont légitimes ; elles ne sont pas compatibles. Une stratégie de rendement (Rothschild, Nord Ancien, certaines locations courtes de Mamilla) génère 3–5 % bruts annuels. Une stratégie de préservation (Talbieh, Galei Tchelet, Yemin Moshe) rapporte 1,5–2,5 % bruts mais offre une volatilité et un downside considérablement plus faibles. Le choix dépend de votre horizon, de votre besoin de cash-flow, et du rôle de l'actif dans votre portefeuille.",
          en: 'Both strategies are legitimate; they are not compatible. A yield strategy (Rothschild, Old North, certain short Mamilla rentals) generates 3–5% gross annually. A preservation strategy (Talbiyeh, Galei Tchelet, Yemin Moshe) yields 1.5–2.5% gross but offers materially lower volatility and downside. The choice depends on your horizon, cash-flow need, and the role of the asset in your portfolio.',
          he: 'שתי האסטרטגיות לגיטימיות; הן לא תואמות.',
        },
      },
      {
        title: { fr: 'Le shekel comme hedge', en: 'The Shekel as Hedge', he: 'השקל כהגנה' },
        body: {
          fr: "Pour un client basé en euros ou en dollars, l'acquisition d'un actif libellé en shekels constitue une diversification de devises. Le shekel a montré une stabilité remarquable par rapport à l'euro depuis 2015, et l'économie israélienne porte des fondamentaux solides. Pour les clients européens en particulier, c'est une motivation de plus en plus explicite — moins une couverture qu'un rebasage stratégique d'une partie du patrimoine.",
          en: 'For a client based in euros or dollars, acquiring a shekel-denominated asset constitutes currency diversification. The shekel has shown remarkable stability against the euro since 2015, and the Israeli economy carries solid fundamentals. For European clients in particular, this is an increasingly explicit motivation — less a hedge than a strategic rebasing of part of the wealth.',
          he: 'ללקוח בבסיס יורו או דולר, רכישת נכס שקלי מהווה גיוון מטבעי.',
        },
      },
      {
        title: { fr: "Planification ante-aliyah", en: 'Pre-Aliyah Planning', he: 'תכנון לפני עלייה' },
        body: {
          fr: "L'article 14 de l'Ordonnance de l'impôt sur le revenu offre aux nouveaux olim une exonération de dix ans sur les revenus de source étrangère et les gains en capital. Pour un acheteur planifiant une aliyah dans un horizon de 5–10 ans, l'acquisition immobilière israélienne doit être structurée en anticipation de ce statut. Les règles de timing sont techniques, et la marge d'erreur coûteuse.",
          en: 'Article 14 of the Income Tax Ordinance grants new olim a ten-year exemption on foreign-source income and capital gains. For a buyer planning aliyah within a 5–10 year horizon, Israeli property acquisition should be structured in anticipation of this status. The timing rules are technical, and the margin for error costly.',
          he: 'סעיף 14 לפקודת מס הכנסה מעניק לעולים חדשים פטור של 10 שנים.',
        },
      },
      {
        title: { fr: 'Multi-propriétés', en: 'Multi-Property Strategies', he: 'אסטרטגיות מולטי-נכס' },
        body: {
          fr: "Les clients sophistiqués détiennent souvent plusieurs propriétés israéliennes — un appartement à Tel Aviv pour la liquidité et l'usage familial, une maison à Jérusalem pour l'horizon long et le sens, parfois une villa à Herzliya Pituah ou Caesarea pour la résidence secondaire. La structure fiscale (Mas Rechisha progressif, traitement des plus-values, déclaration de revenus locatifs) bénéficie d'une planification anticipée.",
          en: 'Sophisticated clients often hold multiple Israeli properties — a Tel Aviv apartment for liquidity and family use, a Jerusalem house for the long horizon and meaning, sometimes a Herzliya Pituah or Caesarea villa as a second home. The tax structure (progressive Mas Rechisha, capital gains treatment, rental income declaration) benefits from anticipated planning.',
          he: 'לקוחות מתוחכמים מחזיקים לעיתים קרובות בכמה נכסים ישראלים.',
        },
      },
    ],
    faq: [
      {
        q: { fr: 'Travaillez-vous avec mes conseillers existants ?', en: 'Do you work with my existing advisors?', he: 'האם אתם עובדים עם היועצים הקיימים שלי?' },
        a: {
          fr: 'Oui, nous coordonnons systématiquement avec votre family office, votre fiscaliste, votre avocat, et votre banquier. Notre rôle est d\'apporter l\'expertise sectorielle et géographique ; le portage stratégique reste avec votre équipe principale.',
          en: 'Yes, we systematically coordinate with your family office, tax advisor, lawyer, and banker. Our role is to bring sector and geographic expertise; strategic stewardship remains with your principal team.',
          he: 'כן, אנו מתאמים עם משרד המשפחה שלך.',
        },
      },
      {
        q: { fr: 'Donnez-vous des conseils fiscaux ?', en: 'Do you provide tax advice?', he: 'האם אתם נותנים ייעוץ מס?' },
        a: {
          fr: "Nous fournissons une compréhension structurelle du cadre fiscal israélien et nous coordonnons avec des fiscalistes israéliens et internationaux pour les questions spécifiques. Nous ne donnons pas de conseil fiscal formel ; nous identifions les questions à poser à votre fiscaliste.",
          en: 'We provide structural understanding of the Israeli tax framework and coordinate with Israeli and international tax specialists for specific questions. We do not provide formal tax advice; we identify the questions to ask your tax specialist.',
          he: 'אנו מספקים הבנה מבנית של מסגרת המס הישראלית.',
        },
      },
    ],
    ctaHeadline: {
      fr: "Une conversation stratégique sur votre exposition israélienne",
      en: 'A strategic conversation about your Israeli exposure',
      he: 'שיחה אסטרטגית על החשיפה הישראלית שלך',
    },
    ctaSubtitle: {
      fr: "Confidentialité. Sans engagement. Coordination avec vos conseillers existants.",
      en: 'Confidentiality. No commitment. Coordination with your existing advisors.',
      he: 'סודיות. ללא התחייבות.',
    },
    relatedArticles: ['tel-aviv-vs-jerusalem-investissement', 'acheter-immobilier-israel-investisseur-etranger'],
  },
]

/* ═══════════════════════════════════════════════════════════
   CLIENTÈLE (4)
   ═══════════════════════════════════════════════════════════ */

export const CLIENTELE: LandingPage[] = [
  {
    slug: 'investisseurs-internationaux',
    category: 'clientele',
    names: { fr: 'Investisseurs Internationaux', en: 'International Investors', he: 'משקיעים בינלאומיים' },
    tagline: {
      fr: "L'immobilier israélien pour les acheteurs hors d'Israël",
      en: 'Israeli real estate for buyers outside Israel',
      he: 'נדל"ן ישראלי לקונים מחוץ לישראל',
    },
    seoTitle: {
      fr: 'Investisseurs Internationaux en Immobilier Israélien | Maison Israël',
      en: 'International Investors in Israeli Real Estate | Maison Israël',
      he: 'משקיעים בינלאומיים בנדל"ן ישראלי | מייזון ישראל',
    },
    metaDescription: {
      fr: 'Accompagnement des investisseurs internationaux en immobilier israélien depuis 2009. Acheteurs France, USA, UK, Amérique latine. Off-market, fiscalité, gestion.',
      en: 'Supporting international investors in Israeli real estate since 2009. Buyers from France, USA, UK, Latin America. Off-market, taxation, management.',
      he: 'ליווי משקיעים בינלאומיים בנדל"ן ישראלי מאז 2009.',
    },
    h1: {
      fr: "Investisseurs Internationaux — Notre cœur de métier depuis 2009",
      en: 'International Investors — Our Core Business Since 2009',
      he: 'משקיעים בינלאומיים — ליבת העסק שלנו מאז 2009',
    },
    hero: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1600&auto=format&fit=crop&q=80',
    intro: {
      fr: "La majorité de nos clients vivent hors d'Israël au moment de l'acquisition. Les Français, les Américains, les Britanniques, et les Latino-Américains composent l'essentiel de notre base. Ce que ces groupes partagent : un horizon long, une recherche de qualité plutôt que de quantité, et la volonté de travailler avec un conseiller qui comprend simultanément le marché israélien et leur juridiction d'origine. C'est exactement la position que nous avons construite.",
      en: 'The majority of our clients live outside Israel at the time of acquisition. French, American, British, and Latin American buyers make up the bulk of our base. What these groups share: a long horizon, a search for quality rather than quantity, and a willingness to work with an advisor who understands both the Israeli market and their home jurisdiction. This is exactly the position we have built.',
      he: 'רוב הלקוחות שלנו חיים מחוץ לישראל בזמן הרכישה.',
    },
    sections: [
      {
        title: { fr: 'Ce que nous gérons pour vous', en: 'What We Manage For You', he: 'מה אנו מנהלים עבורך' },
        body: {
          fr: "L'acquisition immobilière à distance comporte des spécificités : visites concentrées sur un seul déplacement, procuration à votre avocat israélien pour la clôture, transferts internationaux et conversion de devises, coordination entre fuseaux horaires. Notre rôle est de structurer l'ensemble du processus pour minimiser votre temps de présence en Israël tout en garantissant la qualité de chaque décision.",
          en: 'Remote property acquisition has specificities: viewings concentrated on a single trip, power of attorney to your Israeli lawyer for closing, international transfers and currency conversion, coordination across time zones. Our role is to structure the entire process to minimise your Israel presence while ensuring the quality of every decision.',
          he: 'רכישת נדל"ן מרחוק כוללת ספציפיות.',
        },
      },
      {
        title: { fr: 'Le réseau coordonné', en: 'The Coordinated Network', he: 'הרשת המתואמת' },
        body: {
          fr: "Nous coordonnons typiquement avec : votre avocat israélien (que nous recommandons si vous n'en avez pas), votre banque israélienne pour la conversion de devises et le financement éventuel, votre fiscaliste israélien et international, et votre family office ou wealth manager. Cette coordination est le travail invisible qui distingue une bonne acquisition d'une acquisition fonctionnelle.",
          en: "We typically coordinate with: your Israeli lawyer (which we recommend if you don't have one), your Israeli bank for currency conversion and possible financing, your Israeli and international tax specialists, and your family office or wealth manager. This coordination is the invisible work that distinguishes a good acquisition from a functional one.",
          he: 'אנו מתאמים בדרך כלל עם עורך הדין הישראלי שלך.',
        },
      },
      {
        title: { fr: 'Après la transaction', en: 'After the Transaction', he: 'אחרי העסקה' },
        body: {
          fr: "L'acquisition est rarement la fin du parcours. Selon votre usage de la propriété, nous coordonnons la mise en location (longue ou courte durée), la gestion d'entretien et de maintenance, la déclaration fiscale annuelle israélienne, et le suivi de la valeur. Pour les clients planifiant une revente future, nous gardons le dossier actif et fournissons une revalorisation annuelle.",
          en: 'Acquisition is rarely the end of the journey. Depending on your property use, we coordinate rental setup (long or short term), maintenance and upkeep, annual Israeli tax filing, and value tracking. For clients planning future resale, we keep the file active and provide annual revaluation.',
          he: 'הרכישה היא רק תחילתו של מסע.',
        },
      },
    ],
    faq: [
      {
        q: { fr: 'Combien de fois dois-je venir en Israël ?', en: 'How many times do I need to come to Israel?', he: 'כמה פעמים אני צריך לבוא לישראל?' },
        a: {
          fr: "Une ou deux fois est typique : un voyage pour visiter la shortlist (3–5 jours), et parfois un second pour la signature finale. Beaucoup de clients clôturent à distance par procuration.",
          en: 'One or two times is typical: one trip to view the shortlist (3–5 days), and sometimes a second for final signing. Many clients close remotely through power of attorney.',
          he: 'פעם או פעמיים זה טיפוסי.',
        },
      },
      {
        q: { fr: 'En quelles langues travaillez-vous ?', en: 'What languages do you work in?', he: 'באילו שפות אתם עובדים?' },
        a: {
          fr: 'Français, anglais, hébreu. Nos communications, contrats, et rapports sont produits dans votre langue de référence.',
          en: 'French, English, Hebrew. Our communications, contracts, and reports are produced in your reference language.',
          he: 'צרפתית, אנגלית, עברית.',
        },
      },
    ],
    ctaHeadline: {
      fr: "Un échange initial, depuis Paris, New York, Londres ou São Paulo",
      en: 'An initial exchange — from Paris, New York, London, or São Paulo',
      he: 'שיחה ראשונית מפריז, ניו יורק, לונדון או סאו פאולו',
    },
    ctaSubtitle: {
      fr: 'Confidentiel. Sans engagement. Coordination avec vos conseillers existants.',
      en: 'Confidential. No commitment. Coordination with your existing advisors.',
      he: 'סודי. ללא התחייבות.',
    },
    relatedArticles: ['acheter-immobilier-israel-investisseur-etranger', 'tel-aviv-vs-jerusalem-investissement'],
  },

  /* ────────────────────────── */
  {
    slug: 'aliyah',
    category: 'clientele',
    names: { fr: 'Acheteurs Aliyah', en: 'Aliyah Buyers', he: 'עולים' },
    tagline: {
      fr: "L'acquisition immobilière dans la planification d'aliyah",
      en: 'Property acquisition within aliyah planning',
      he: 'רכישת נדל"ן בתכנון העלייה',
    },
    seoTitle: {
      fr: 'Acheteurs Aliyah — Immobilier en Israël | Maison Israël',
      en: 'Aliyah Buyers — Israeli Real Estate | Maison Israël',
      he: 'עולים — נדל"ן בישראל | מייזון ישראל',
    },
    metaDescription: {
      fr: 'Accompagnement des acheteurs aliyah pour leur acquisition immobilière en Israël. Fiscalité oleh chadash, timing, quartiers adaptés, communauté francophone.',
      en: 'Supporting aliyah buyers in their Israeli property acquisition. Oleh chadash tax framework, timing, suitable neighborhoods, French/Anglo community.',
      he: 'ליווי עולים ברכישת הנדל"ן בישראל.',
    },
    h1: {
      fr: 'Acheteurs Aliyah — Le timing change tout',
      en: 'Aliyah Buyers — Timing Changes Everything',
      he: 'עולים — הזמן משנה הכל',
    },
    hero: 'https://images.unsplash.com/photo-1583243567239-3727f63d6126?w=1600&auto=format&fit=crop&q=80',
    intro: {
      fr: "Pour un acheteur planifiant une aliyah, la propriété israélienne n'est pas un actif comme un autre. C'est un point d'ancrage pour la famille, un véhicule d'optimisation fiscale, et la condition pratique d'une installation réussie. La structuration de l'acquisition — avant ou après aliyah, en nom personnel ou via structure, avec ou sans crédit israélien — détermine les bénéfices fiscaux dont vous bénéficierez pendant dix ans. Les règles de timing sont techniques et les conséquences durables.",
      en: 'For a buyer planning aliyah, Israeli property is not an ordinary asset. It is an anchor for the family, a tax optimisation vehicle, and the practical condition of a successful settlement. The structuring of the acquisition — before or after aliyah, in personal name or via structure, with or without Israeli financing — determines the tax benefits you will enjoy for ten years. Timing rules are technical and consequences durable.',
      he: 'לקונה המתכנן עלייה, נדל"ן ישראלי אינו נכס רגיל.',
    },
    sections: [
      {
        title: { fr: 'Avant ou après l\'aliyah ?', en: 'Before or After Aliyah?', he: 'לפני או אחרי העלייה?' },
        body: {
          fr: "La question revient à chaque dossier. Acheter avant aliyah signifie payer le Mas Rechisha non-résident (8 % / 10 %) sans bénéfice oleh, mais permet de sécuriser la propriété avant que le marché ne bouge. Acheter après aliyah donne accès aux taux réduits oleh chadash (souvent 0,5 % / 5 %), mais demande de gérer une période transitoire en location. La bonne réponse dépend de votre horizon, du marché ciblé, et de votre situation familiale.",
          en: "The question comes up on every file. Buying before aliyah means paying non-resident Mas Rechisha (8% / 10%) without oleh benefit, but secures the property before the market moves. Buying after aliyah grants access to oleh chadash reduced rates (often 0.5% / 5%), but requires managing a transitional rental period. The right answer depends on your horizon, target market, and family situation.",
          he: 'השאלה עולה בכל תיק.',
        },
      },
      {
        title: { fr: 'Les quartiers de référence', en: 'Reference Neighborhoods', he: 'שכונות הייחוס' },
        body: {
          fr: "Pour les familles francophones, certains quartiers fonctionnent presque comme des communautés en eux-mêmes : la Colonie Allemande à Jérusalem, Réhavia, Vieux Katamon, Baka pour les familles plus jeunes. À Netanya, le quartier autour de la Place de l'Indépendance et Ir Yamim. À Tel Aviv, le Nord Ancien et Ramat Aviv. Le choix du quartier est aussi déterminant que le choix de la propriété — souvent plus.",
          en: 'For French-speaking families, certain neighbourhoods function almost as communities in themselves: the German Colony in Jerusalem, Rehavia, Old Katamon, Baka for younger families. In Netanya, the area around Independence Square and Ir Yamim. In Tel Aviv, the Old North and Ramat Aviv. Neighbourhood choice is as decisive as property choice — often more.',
          he: 'למשפחות צרפתיות-דוברות, שכונות מסוימות מתפקדות כקהילות בפני עצמן.',
        },
      },
      {
        title: { fr: "L'accompagnement au-delà de la transaction", en: 'Support Beyond the Transaction', he: 'ליווי מעבר לעסקה' },
        body: {
          fr: "Une aliyah n'est pas un achat. Notre rôle s'étend à l'introduction à un avocat fiscal spécialisé olim, à la banque israélienne adaptée, et aux écoles de votre quartier. Pour les familles avec enfants, nous fournissons des recommandations pratiques sur la rentrée scolaire, les services médicaux, et les communautés religieuses. C'est l'aliyah, pas une transaction immobilière.",
          en: "Aliyah is not a purchase. Our role extends to introducing you to a tax lawyer specialised in olim, to the right Israeli bank, and to schools in your neighbourhood. For families with children, we provide practical recommendations on the school year, medical services, and religious communities. This is aliyah, not a property transaction.",
          he: 'עלייה אינה רכישה.',
        },
      },
    ],
    faq: [
      {
        q: { fr: 'Quels sont les avantages fiscaux oleh chadash ?', en: 'What are the oleh chadash tax benefits?', he: 'מהן הטבות המס של עולה חדש?' },
        a: {
          fr: "Les principaux : taux réduit de Mas Rechisha sur la résidence principale (souvent 0,5 % jusqu'à un certain seuil, puis 5 %), exonération de dix ans sur les revenus de source étrangère, exonération sur les gains en capital d'actifs étrangers, et exemption d'impôt sur les pensions étrangères.",
          en: 'The main ones: reduced Mas Rechisha on the primary residence (often 0.5% up to a threshold, then 5%), ten-year exemption on foreign-source income, exemption on foreign asset capital gains, and exemption on foreign pensions.',
          he: 'העיקריים: מס רכישה מופחת על דירה ראשונה.',
        },
      },
      {
        q: { fr: 'Puis-je acheter avant d\'avoir terminé les formalités d\'aliyah ?', en: 'Can I buy before completing aliyah formalities?', he: 'האם אוכל לקנות לפני סיום הליכי העלייה?' },
        a: {
          fr: 'Oui, en tant que non-résident. Les bénéfices oleh peuvent ensuite être appliqués rétroactivement sous certaines conditions de timing. C\'est exactement le type de structuration où la planification ante-aliyah est précieuse.',
          en: 'Yes, as a non-resident. Oleh benefits can then be applied retroactively under certain timing conditions. This is exactly the type of structuring where pre-aliyah planning is valuable.',
          he: 'כן, כתושב חוץ.',
        },
      },
      {
        q: { fr: "Aidez-vous à trouver un avocat fiscal pour l'aliyah ?", en: 'Do you help find an aliyah tax lawyer?', he: 'האם אתם עוזרים למצוא עורך דין מסים לעלייה?' },
        a: {
          fr: "Oui. Nous coordonnons avec plusieurs cabinets spécialisés en fiscalité oleh, particulièrement pour les acheteurs français, américains, et britanniques. L'introduction est faite avant la signature du compromis pour optimiser la structuration.",
          en: 'Yes. We coordinate with several firms specialised in oleh taxation, particularly for French, American, and British buyers. The introduction is made before contract signing to optimise structuring.',
          he: 'כן. אנו מתאמים עם כמה משרדים מתמחים.',
        },
      },
    ],
    ctaHeadline: {
      fr: 'Discuter votre aliyah et votre acquisition',
      en: 'Discuss your aliyah and your acquisition',
      he: 'דברו על העלייה והרכישה שלכם',
    },
    ctaSubtitle: {
      fr: "Conversation initiale confidentielle. Coordination avec votre avocat fiscal.",
      en: 'Confidential initial conversation. Coordination with your tax lawyer.',
      he: 'שיחה ראשונית סודית.',
    },
    relatedArticles: ['acheter-immobilier-israel-investisseur-etranger', 'meilleurs-quartiers-luxe-jerusalem'],
    relatedQuartiers: ['colonie-allemande', 'baka', 'old-katamon'],
  },

  /* ────────────────────────── */
  {
    slug: 'diplomates',
    category: 'clientele',
    names: { fr: 'Diplomates & Personnel International', en: 'Diplomats & International Officials', he: 'דיפלומטים' },
    tagline: {
      fr: 'Discrétion, sécurité, et flexibilité de calendrier',
      en: 'Discretion, security, and calendar flexibility',
      he: 'דיסקרטיות, ביטחון, וגמישות לוח זמנים',
    },
    seoTitle: {
      fr: 'Logement Diplomatique en Israël | Maison Israël',
      en: 'Diplomatic Housing in Israel | Maison Israël',
      he: 'דיור דיפלומטי בישראל | מייזון ישראל',
    },
    metaDescription: {
      fr: 'Recherche de logements pour diplomates et personnel international en Israël. Herzliya Pituah, Talbieh, baux flexibles, confidentialité absolue.',
      en: 'Housing search for diplomats and international officials in Israel. Herzliya Pituah, Talbiyeh, flexible leases, absolute confidentiality.',
      he: 'חיפוש דיור לדיפלומטים ובכירים בינלאומיים בישראל.',
    },
    h1: {
      fr: 'Diplomates & Personnel International',
      en: 'Diplomats & International Officials',
      he: 'דיפלומטים ובכירים בינלאומיים',
    },
    hero: 'https://images.unsplash.com/photo-1577412647305-991150c7d163?w=1600&auto=format&fit=crop&q=80',
    intro: {
      fr: "Le logement diplomatique en Israël obéit à des contraintes spécifiques : calendrier dicté par la mission, durée souvent fixe entre deux et quatre ans, exigences de sécurité, et besoin d'un standard de réception adapté aux fonctions. Nous travaillons avec plusieurs ambassades et organisations internationales sur le placement de personnel en location ou en acquisition, principalement à Herzliya Pituah et dans les quartiers premium de Jérusalem et Tel Aviv.",
      en: "Diplomatic housing in Israel follows specific constraints: schedule dictated by the mission, often a fixed term of two to four years, security requirements, and the need for a reception standard appropriate to the role. We work with several embassies and international organisations on personnel placement, in rental or acquisition, primarily in Herzliya Pituah and in the premium quarters of Jerusalem and Tel Aviv.",
      he: 'דיור דיפלומטי בישראל כפוף לאילוצים ספציפיים.',
    },
    sections: [
      {
        title: { fr: 'Les quartiers diplomatiques', en: 'Diplomatic Neighborhoods', he: 'שכונות דיפלומטיות' },
        body: {
          fr: "Herzliya Pituah concentre l'essentiel des ambassades et résidences ambassadoriales en Israël — environ quarante ambassades sont implantées dans le quartier. Pour le personnel diplomatique senior, c'est le choix par défaut : sécurité, proximité des collègues, et services adaptés. À Jérusalem, Talbieh et le secteur autour de la Résidence du Président jouent un rôle équivalent pour le personnel basé dans la capitale.",
          en: 'Herzliya Pituah concentrates the bulk of embassies and ambassadorial residences in Israel — approximately forty embassies are based in the neighbourhood. For senior diplomatic personnel, this is the default choice: security, proximity to colleagues, and adapted services. In Jerusalem, Talbiyeh and the area around the President\'s Residence play an equivalent role for personnel based in the capital.',
          he: 'הרצליה פיתוח מרכזת את עיקר השגרירויות והמגורים.',
        },
      },
      {
        title: { fr: 'Location flexible vs acquisition', en: 'Flexible Rental vs Acquisition', he: 'השכרה גמישה מול רכישה' },
        body: {
          fr: "Pour une affectation de deux à quatre ans, la location reste typiquement le bon choix — particulièrement pour les villas meublées de standing à Herzliya Pituah. Pour les affectations plus longues ou les personnels qui anticipent un retour ultérieur en Israël (organisations internationales, attachés culturels longue durée), l'acquisition devient pertinente, parfois via une SCI ou structure équivalente compatible avec le statut diplomatique.",
          en: 'For a two-to-four-year posting, rental remains typically the right choice — particularly furnished high-end villas in Herzliya Pituah. For longer postings or personnel anticipating future return to Israel (international organisations, long-term cultural attachés), acquisition becomes relevant, sometimes via an SCI or equivalent structure compatible with diplomatic status.',
          he: 'להצבה של 2–4 שנים, השכרה בדרך כלל הבחירה הנכונה.',
        },
      },
      {
        title: { fr: 'Confidentialité et sécurité', en: 'Confidentiality and Security', he: 'סודיות וביטחון' },
        body: {
          fr: "Tous nos dossiers diplomatiques sont traités sous strict confidentialité. Les visites sont organisées hors heures publiques. Les rapports d'évaluation sécurité (issues d'urgence, fenêtres, accès) sont préparés systématiquement pour les postes seniors. Nous coordonnons avec les services de sécurité de l'ambassade lorsque c'est requis.",
          en: 'All our diplomatic files are handled under strict confidentiality. Viewings are organised outside public hours. Security assessment reports (emergency exits, windows, access) are systematically prepared for senior postings. We coordinate with embassy security services when required.',
          he: 'כל התיקים הדיפלומטיים שלנו מטופלים בסודיות מחמירה.',
        },
      },
    ],
    faq: [
      {
        q: { fr: 'Travaillez-vous directement avec les ambassades ?', en: 'Do you work directly with embassies?', he: 'האם אתם עובדים ישירות עם שגרירויות?' },
        a: {
          fr: 'Oui, nous avons des conventions ou des relations établies avec plusieurs ambassades à Tel Aviv et Jérusalem. Nous travaillons également directement avec le personnel diplomatique sur leur recherche personnelle.',
          en: 'Yes, we have agreements or established relationships with several embassies in Tel Aviv and Jerusalem. We also work directly with diplomatic personnel on their personal search.',
          he: 'כן, יש לנו הסכמים או יחסים מבוססים.',
        },
      },
      {
        q: { fr: 'Acceptez-vous les baux courts (1–2 ans) ?', en: 'Do you accept short leases (1–2 years)?', he: 'האם אתם מקבלים חוזים קצרים?' },
        a: {
          fr: 'Nous travaillons couramment sur des baux d\'un à quatre ans. Pour les durées plus courtes (1 an ou moins), nous orientons vers les résidences services type Waldorf-Astoria Mamilla ou résidences meublées équivalentes à Tel Aviv.',
          en: 'We routinely work on one-to-four-year leases. For shorter durations (1 year or less), we direct toward serviced residences like the Waldorf-Astoria Mamilla or equivalent furnished residences in Tel Aviv.',
          he: 'אנו עובדים באופן שוטף על חוזים של שנה עד ארבע שנים.',
        },
      },
    ],
    ctaHeadline: {
      fr: 'Une affectation à Tel Aviv ou Jérusalem ?',
      en: 'A posting in Tel Aviv or Jerusalem?',
      he: 'הצבה בתל אביב או בירושלים?',
    },
    ctaSubtitle: {
      fr: 'Confidentialité absolue. Coordination avec les services de votre mission.',
      en: 'Absolute confidentiality. Coordination with your mission services.',
      he: 'סודיות מוחלטת.',
    },
    relatedQuartiers: ['galei-tchelet', 'nof-yam', 'talbieh', 'hashunit'],
  },

  /* ────────────────────────── */
  {
    slug: 'familles-internationales',
    category: 'clientele',
    names: { fr: 'Familles Internationales', en: 'International Families', he: 'משפחות בינלאומיות' },
    tagline: {
      fr: 'Une résidence en Israël pour les familles avec un horizon long',
      en: 'A residence in Israel for families with a long horizon',
      he: 'מגורים בישראל למשפחות עם אופק ארוך',
    },
    seoTitle: {
      fr: 'Familles Internationales — Résidence en Israël | Maison Israël',
      en: 'International Families — Residence in Israel | Maison Israël',
      he: 'משפחות בינלאומיות — מגורים בישראל | מייזון ישראל',
    },
    metaDescription: {
      fr: "Accompagnement des familles internationales pour leur résidence en Israël. Choix du quartier, écoles, communauté, multi-propriétés, planification générationnelle.",
      en: 'Supporting international families in their Israeli residence. Neighborhood choice, schools, community, multi-property strategies, generational planning.',
      he: 'ליווי משפחות בינלאומיות במגוריהן בישראל.',
    },
    h1: {
      fr: 'Familles Internationales — Construire une présence israélienne durable',
      en: 'International Families — Building a Durable Israeli Presence',
      he: 'משפחות בינלאומיות — בניית נוכחות ישראלית מתמשכת',
    },
    hero: 'https://images.unsplash.com/photo-1572120360610-d971b9d7767c?w=1600&auto=format&fit=crop&q=80',
    intro: {
      fr: "Beaucoup de nos clients ne cherchent pas une transaction. Ils cherchent à construire une présence israélienne — pour eux-mêmes maintenant, pour leurs enfants en université ou aliyah dans cinq ans, pour leurs petits-enfants dans une génération. La propriété immobilière est l'instrument de cette présence. Notre rôle est d'aligner l'acquisition (ou la séquence d'acquisitions) sur cet horizon générationnel, pas seulement sur l'usage immédiat.",
      en: 'Many of our clients are not looking for a transaction. They are looking to build an Israeli presence — for themselves now, for their children in university or aliyah in five years, for their grandchildren in a generation. Real estate is the instrument of that presence. Our role is to align the acquisition (or sequence of acquisitions) on that generational horizon, not just on immediate use.',
      he: 'רבים מהלקוחות שלנו לא מחפשים עסקה.',
    },
    sections: [
      {
        title: { fr: 'Le choix du quartier pour la famille', en: 'Family Neighborhood Choice', he: 'בחירת שכונה למשפחה' },
        body: {
          fr: "Le bon quartier n'est pas le quartier le plus prestigieux ; c'est celui où votre famille fonctionne. Pour les familles avec enfants jeunes, nous évaluons les écoles (internationales, francophones, religieuses selon votre profil), les parcs, les pédiatres anglophones ou francophones, et la communauté de Shabbat. La distance entre la propriété et l'école détermine la qualité de vie quotidienne plus que toute autre variable.",
          en: 'The right neighbourhood is not the most prestigious; it is the one where your family functions. For families with young children, we assess schools (international, French-speaking, religious depending on your profile), parks, English- or French-speaking pediatricians, and Shabbat community. The distance between property and school determines daily quality of life more than any other variable.',
          he: 'השכונה הנכונה אינה היוקרתית ביותר; היא זו שבה המשפחה שלך מתפקדת.',
        },
      },
      {
        title: { fr: 'Stratégie multi-propriétés', en: 'Multi-Property Strategy', he: 'אסטרטגיה מולטי-נכס' },
        body: {
          fr: "Beaucoup de familles internationales finissent par détenir plus d'une propriété en Israël : un appartement à Tel Aviv pour les enfants à l'université, une maison à Jérusalem pour la famille en visite, parfois une villa à Herzliya Pituah ou Caesarea pour les vacances. Cette séquence se déploie typiquement sur cinq à quinze ans. Nous aidons à structurer la séquence dès la première acquisition.",
          en: "Many international families end up holding more than one Israeli property: a Tel Aviv apartment for university-age children, a Jerusalem house for visiting family, sometimes a Herzliya Pituah or Caesarea villa for holidays. This sequence typically unfolds over five to fifteen years. We help structure the sequence from the first acquisition.",
          he: 'משפחות בינלאומיות רבות מחזיקות יותר מנכס אחד בישראל.',
        },
      },
      {
        title: { fr: "Planification générationnelle", en: 'Generational Planning', he: 'תכנון בין-דורי' },
        body: {
          fr: "Le droit successoral israélien s'applique aux biens immobiliers israéliens indépendamment du domicile du propriétaire. Pour les familles avec un patrimoine significatif, la structure de détention (nom personnel, société israélienne, trust, structure mixte) doit être étudiée en amont. Nous coordonnons systématiquement avec votre conseiller en planification successorale dans votre juridiction principale.",
          en: 'Israeli inheritance law applies to Israeli property regardless of owner domicile. For families with significant wealth, the holding structure (personal name, Israeli company, trust, mixed structure) must be studied upfront. We systematically coordinate with your estate planning advisor in your primary jurisdiction.',
          he: 'דין הירושה הישראלי חל על נדל"ן ישראלי.',
        },
      },
    ],
    faq: [
      {
        q: { fr: 'Aidez-vous à trouver des écoles ?', en: 'Do you help find schools?', he: 'האם אתם עוזרים למצוא בתי ספר?' },
        a: {
          fr: "Nous fournissons des recommandations sur les écoles internationales et bilingues correspondant à votre profil (francophone, anglophone, religieuse), et coordonnons les visites lors de votre déplacement. L'admission elle-même est gérée par les écoles, mais nous facilitons l'introduction.",
          en: 'We provide recommendations on international and bilingual schools matching your profile (French-speaking, English-speaking, religious), and coordinate visits during your trip. Admissions themselves are handled by the schools, but we facilitate introductions.',
          he: 'אנו מספקים המלצות על בתי ספר.',
        },
      },
      {
        q: { fr: 'Travaillez-vous sur des dossiers multi-générationnels ?', en: 'Do you work on multi-generational files?', he: 'האם אתם עובדים על תיקים רב-דוריים?' },
        a: {
          fr: 'Régulièrement. Plusieurs de nos clients travaillent avec nous depuis la première génération qui s\'est installée et incluent maintenant la deuxième et troisième génération dans la structuration patrimoniale. C\'est un de nos rôles les plus intéressants.',
          en: 'Regularly. Several of our clients have worked with us since the first generation that settled and now include second and third generation in their wealth structuring. It is one of our most interesting roles.',
          he: 'באופן קבוע.',
        },
      },
    ],
    ctaHeadline: {
      fr: "Une conversation sur votre projet familial en Israël",
      en: 'A conversation about your family project in Israel',
      he: 'שיחה על הפרויקט המשפחתי שלכם בישראל',
    },
    ctaSubtitle: {
      fr: 'Confidentielle. Sur l\'horizon long. En coordination avec votre conseil patrimonial.',
      en: 'Confidential. Long-horizon. Coordinated with your wealth advisor.',
      he: 'סודית. בטווח ארוך.',
    },
    relatedArticles: ['meilleurs-quartiers-luxe-jerusalem', 'meilleurs-quartiers-luxe-tel-aviv'],
    relatedQuartiers: ['colonie-allemande', 'old-north', 'rehavia'],
  },
]

/* ─── Helpers ───────────────────────────────────────────── */

export function getServiceBySlug(slug: string): LandingPage | undefined {
  return SERVICES.find((s) => s.slug === slug)
}

export function getClienteleBySlug(slug: string): LandingPage | undefined {
  return CLIENTELE.find((c) => c.slug === slug)
}
