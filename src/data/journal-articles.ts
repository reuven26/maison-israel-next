/* ─────────────────────────────────────────────────────────
   JOURNAL — Long-form SEO articles
   Each article is editorial, multilingual, and optimized
   for both Google and the buyer profile we target.
   ───────────────────────────────────────────────────────── */

export interface JournalArticle {
  slug: string
  publishedAt: string        // ISO date
  readMinutes: number
  category: { fr: string; en: string; he: string }
  image: string              // featured image URL
  imageAlt: { fr: string; en: string; he: string }

  seoTitle: { fr: string; en: string; he: string }
  metaDescription: { fr: string; en: string; he: string }
  h1: { fr: string; en: string; he: string }
  excerpt: { fr: string; en: string; he: string }

  // Markdown body — supports basic markdown rendering
  body: { fr: string; en: string; he: string }

  // Related content
  relatedSlugs?: string[]
  internalLinks?: { ville?: string[]; quartier?: string[] }
}

export const JOURNAL_ARTICLES: JournalArticle[] = [
  /* ────────────────────────────────────────────────────── */
  {
    slug: 'investisseurs-internationaux-jerusalem-immobilier-luxe',
    publishedAt: '2026-02-04',
    readMinutes: 9,
    category: { fr: 'Marché', en: 'Market', he: 'שוק' },
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1600&auto=format&fit=crop&q=80',
    imageAlt: {
      fr: 'Façade en pierre de Jérusalem au coucher du soleil',
      en: 'Jerusalem stone façade at sunset',
      he: 'חזית אבן ירושלמית בשקיעה',
    },
    seoTitle: {
      fr: 'Pourquoi les acheteurs internationaux investissent à Jérusalem',
      en: 'Why International Buyers Choose Jerusalem Luxury Real Estate',
      he: 'מדוע משקיעים בינלאומיים בוחרים בנדל"ן יוקרה בירושלים',
    },
    metaDescription: {
      fr: "Au cœur des flux discrets qui transforment le marché premium de Jérusalem — patrimoine, rareté, et un profil d'acheteur unique au Moyen-Orient.",
      en: 'Inside the quiet capital flows reshaping Jerusalem prime market — heritage, scarcity, and a buyer profile unlike anywhere else in the Middle East.',
      he: 'מבט פנים על תנועות ההון השקטות שמעצבות את שוק הפרמיום בירושלים — מורשת, נדירות, ופרופיל קונים ייחודי.',
    },
    h1: {
      fr: "Pourquoi les acheteurs internationaux investissent dans l'immobilier de luxe à Jérusalem",
      en: 'Why International Buyers Are Investing in Jerusalem Luxury Real Estate',
      he: 'מדוע משקיעים בינלאומיים משקיעים בנדל"ן יוקרה בירושלים',
    },
    excerpt: {
      fr: "Il y a un silence particulier dans les rues résidentielles de Jérusalem au crépuscule — celui que seuls la pierre calcaire, les pins anciens et le rythme lent d'une ville qui n'a jamais troqué la profondeur pour la densité savent produire.",
      en: 'There is a particular silence to Jerusalem residential streets at dusk — the kind that comes only with limestone, mature pine, and the slow rhythm of a city that has never traded depth for density.',
      he: 'יש שקט מיוחד ברחובות המגורים של ירושלים בדמדומים — השקט שמגיע רק עם אבן הגיר, האורנים הוותיקים, והקצב האיטי של עיר שמעולם לא החליפה עומק בצפיפות.',
    },
    body: {
      fr: `Il y a un silence particulier dans les rues résidentielles de Jérusalem au crépuscule — celui que seuls la pierre calcaire, les pins anciens et le rythme lent d'une ville qui n'a jamais troqué la profondeur pour la densité savent produire. C'est aussi, de plus en plus, le silence du capital qui s'installe.

Au cours des cinq dernières années, le segment du luxe à Jérusalem a discrètement surperformé les attentes de presque tous les analystes suivant le marché israélien. Les prix des propriétés restaurées de l'époque du Mandat à Talbieh et Réhavia ont progressé à un rythme plus proche de Genève que de Tel Aviv. La base d'acheteurs s'est également déplacée : moins d'acheteurs domestiques en montée de gamme, davantage de family offices internationaux, de ménages diplomatiques et d'acheteurs issus de la diaspora de deuxième génération planifiant un horizon israélien long.

## Un marché façonné par ce qui ne peut être reproduit

L'inventaire de premier ordre à Jérusalem est gouverné par une contrainte unique qu'aucune autre capitale de la région ne connaît avec une sévérité équivalente : le règlement de la pierre de Jérusalem, qui impose depuis 1918 le revêtement extérieur en calcaire local sur toute construction nouvelle. La cohérence visuelle qui en résulte est la signature de la ville. La conséquence économique est la rareté.

Les hauteurs de construction sont restreintes dans la plupart des quartiers de premier ordre. Les protections patrimoniales couvrent des blocs entiers de Talbieh, Yemin Moshe, Réhavia et la Colonie Allemande. Le foncier disponible pour de nouvelles constructions de luxe à proximité de la Vieille Ville est, en termes pratiques, épuisé. Ce qui reste se négocie en privé.

Cette dynamique — une offre limitée rencontrant un pool d'acheteurs internationalement financés qui s'approfondit — est la raison structurelle pour laquelle le segment premium de Jérusalem s'est découplé des cycles immobiliers israéliens plus larges.

## Qui achète réellement

La composition de la base d'acheteurs internationaux en 2024 et 2025 s'est clarifiée. Trois groupes dominent désormais le segment premium :

**Les familles françaises et belges** achetant une résidence principale ou un pied-à-terre, souvent dans la perspective d'une aliyah éventuelle. Ce groupe est la présence la plus constante dans la Colonie Allemande, Baka et Arnona depuis plus d'une décennie. Beaucoup arrivent après avoir vendu une propriété dans le 16ᵉ ou le 17ᵉ arrondissement ; le rebasage dans la pierre libellée en shekels est, pour eux, une décision de portefeuille autant que sentimentale.

**Les acheteurs américains et britanniques**, souvent issus de la finance, du droit ou de la technologie, concentrés sur Talbieh, Mamilla et Réhavia. La motivation est rarement le rendement — ce sont typiquement des actifs détenus, utilisés six à douze semaines par an, avec l'attente que les enfants adultes les utiliseront davantage.

**Les acheteurs latino-américains**, particulièrement du Mexique et d'Argentine, qui ont fait de Mamilla et des résidences Waldorf-Astoria une sorte de bastion discret. La stabilité monétaire et l'architecture sécuritaire sont des moteurs explicites.

## Le facteur Aliyah — et pourquoi il change l'équation

Le cadre fiscal israélien traite généreusement les nouveaux résidents. En vertu de l'article 14 de l'Ordonnance de l'impôt sur le revenu, les olim bénéficient d'une exonération de dix ans sur les revenus de source étrangère et les gains en capital. Pour un acheteur planifiant une aliyah dans un horizon de cinq à dix ans, le calcul d'acquérir un bien immobilier israélien maintenant — aux prix actuels, avec un chemin clair vers la résidence — est matériellement différent de celui d'un détenteur étranger permanent.

C'est pourquoi une part significative des transactions premium de Jérusalem est désormais structurée comme des détentions de long terme par des acheteurs qui ne vivent pas encore en Israël mais ont l'intention de le faire.

## Ce que "premium" signifie réellement à Jérusalem

Il convient d'être précis. Le marché du luxe à Jérusalem n'est pas uniforme. Une adresse réellement premium se réduit à environ quinze rues :

- La colonne vertébrale nord-ouest de **Talbieh** autour de Hovevei Zion, Disraeli et Marcus
- Le centre de **Réhavia** entre Ben Maïmon et Radak
- Le quartier mandataire de la **Colonie Allemande** le long de Cremieux et HaTzfira
- **Yemin Moshe** dans son intégralité
- Le complexe Mamilla et certains immeubles sélectionnés le long de la rue du Roi David
- Un petit groupe de maisons templières restaurées à **Baka**

En dessous de ce niveau, Jérusalem reste une ville complexe et segmentée. Les acheteurs internationaux qui arrivent sans accompagnement local paient souvent le prix fort pour des biens qui ne sont, selon aucune définition rigoureuse, dans le marché du luxe.

## Où le marché se dirige

Les dix-huit prochains mois verront probablement deux phénomènes converger. D'abord, un pipeline plus mince de nouvelles annonces premium — la plupart des développements boutique annoncés en 2021-2022 ont désormais été livrés, et l'inventaire de remplacement est limité. Ensuite, un afflux continu de capital européen, particulièrement français, qui ne s'est pas atténué malgré les turbulences géopolitiques des deux dernières années.

Le résultat est simple. Les acheteurs qui traitent Jérusalem comme un actif stratégique, générationnel — plutôt que tactique — resteront probablement en avance sur la prochaine réévaluation.

Pour une discussion privée de l'inventaire actuel dans [les quartiers de luxe de Jérusalem](/fr/villes/jerusalem), ou pour être informé des [opportunités off-market](/fr/off-market) avant leur mise en circulation, notre équipe est disponible [par introduction directe](/fr/contact).

## Questions fréquentes

**Les ressortissants étrangers peuvent-ils acheter à Jérusalem ?**
Oui. Israël n'impose aucune restriction de nationalité sur la propriété immobilière. Les acheteurs étrangers acquièrent la pleine propriété (Tabu) sur la même base légale que les citoyens israéliens, à l'exception des propriétés sur les terres de l'Autorité Israélienne du Foncier, où s'applique un bail long.

**Quelle est la taxe d'achat typique pour un acheteur étranger ?**
Les acheteurs non-résidents paient le Mas Rechisha (taxe d'achat) à un taux forfaitaire de 8 % sur les premiers ~6 millions de NIS de valeur et 10 % au-dessus, sans exemption de première résidence. Un acheteur planifiant une aliyah peut bénéficier de taux réduits sous certaines conditions de calendrier.

**L'immobilier de Jérusalem est-il liquide ?**
Le segment premium de Jérusalem est liquide mais lent. Les actifs de qualité à Talbieh, Réhavia et la Colonie Allemande se négocient typiquement en quatre à neuf mois lorsqu'ils sont correctement valorisés.

**Les prêts hypothécaires sont-ils disponibles aux non-résidents ?**
Oui. Les banques israéliennes prêtent aux acheteurs étrangers, typiquement jusqu'à 50 % de la valeur du bien, en shekels ou en devises majeures.`,
      en: `There is a particular silence to Jerusalem's residential streets at dusk — the kind that comes only with limestone, mature pine, and the slow rhythm of a city that has never traded depth for density. It is also, increasingly, the silence of capital moving in.

Over the past five years, Jerusalem's luxury segment has quietly outperformed expectations of nearly every analyst tracking the Israeli market. Prices for restored Mandate-era properties in Talbiyeh and Rehavia have advanced at a pace closer to Geneva than to Tel Aviv. The buyer base has shifted too: less domestic upgrader, more international family office, diplomatic household, and second-generation diaspora purchaser planning a long Israeli horizon.

## A market shaped by what cannot be replicated

Jerusalem's prime inventory is governed by a single constraint that no other capital in the region faces with equal severity: the Jerusalem stone bylaw, which has required every new exterior to be clad in local limestone since 1918. The visual coherence this creates is the city's signature. The economic consequence is scarcity.

Building heights are restricted in most prime quarters. Heritage protections cover entire blocks of Talbiyeh, Yemin Moshe, Rehavia, and the German Colony. Land available for new luxury construction near the Old City is, in practical terms, finished. What remains trades privately.

That dynamic — limited supply meeting a deepening, internationally-funded buyer pool — is the structural reason prime Jerusalem has decoupled from broader Israeli housing cycles.

## Who is actually buying

The composition of the international buyer base in 2024 and 2025 has clarified. Three groups now dominate the prime segment:

**French and Belgian families** purchasing a primary or pied-à-terre, often with a view to eventual aliyah. This group has been the most consistent presence in the German Colony, Baka, and Arnona for over a decade.

**American and British buyers**, frequently from finance, law, or technology, focused on Talbiyeh, Mamilla, and Rehavia. The motivation is rarely yield — these are typically held assets, used six to twelve weeks a year.

**Latin American purchasers**, particularly from Mexico and Argentina, who have made Mamilla and the Waldorf-Astoria residences something of a quiet stronghold. Currency stability and security architecture are explicit drivers.

What unites these groups is a tolerance for low rental yields in exchange for an asset whose downside is governed by something other than the local economy.

## The Aliyah factor — and why it changes the math

Israel's tax framework treats new residents generously. Under Article 14 of the Income Tax Ordinance, olim are granted a ten-year exemption on foreign-source income and capital gains. For a buyer planning aliyah within a five-to-ten-year horizon, the calculus of acquiring Israeli real estate now is materially different from that of a permanent foreign holder.

This is why a meaningful share of Jerusalem's prime transactions are now structured as long-term holds by buyers who do not yet live in Israel but intend to.

## What "prime" actually means in Jerusalem

A genuinely prime address in Jerusalem narrows to perhaps fifteen streets: the northwest spine of **Talbiyeh** around Hovevei Zion and Disraeli; central **Rehavia** between Ben Maimon and Radak; the Mandate quarter of the **German Colony** along Cremieux and HaTzfira; **Yemin Moshe** in its entirety; the Mamilla complex and select buildings on King David Street; and a small group of restored Templer houses in **Baka**.

## Where the market is heading

The next eighteen months will likely see two things converge: a thinner pipeline of new prime listings, and a continuing inflow of European capital — particularly French — that has not abated through the geopolitical turbulence of the past two years.

For a private discussion of current inventory in [Jerusalem's luxury neighborhoods](/en/villes/jerusalem), or to be informed of [off-market opportunities](/en/off-market) before they reach circulation, our team is available [by direct introduction](/en/contact).

## Frequently Asked Questions

**Can foreign citizens buy property in Jerusalem?**
Yes. Israel imposes no nationality restriction on real estate ownership.

**What is the typical purchase tax for foreign buyers?**
Non-resident buyers pay 8% on the first ~6 million NIS and 10% above, with no first-home exemption.

**Is Jerusalem real estate liquid?**
Prime Jerusalem is liquid but slow — quality assets typically transact within four to nine months.

**Are mortgages available to non-residents?**
Yes. Israeli banks lend up to 50% LTV in shekels or major foreign currencies.`,
      he: `יש שקט מיוחד ברחובות המגורים של ירושלים בדמדומים — השקט שמגיע רק עם אבן הגיר, האורנים הוותיקים, והקצב האיטי של עיר שמעולם לא החליפה עומק בצפיפות. זהו גם, יותר ויותר, השקט של הון שזורם פנימה.

בחמש השנים האחרונות, מקטע היוקרה של ירושלים השיג בשקט תוצאות טובות יותר מציפיות של כמעט כל אנליסט שעוקב אחר השוק הישראלי. המחירים של נכסים משוחזרים מתקופת המנדט בטלביה ורחביה התקדמו בקצב הקרוב יותר לז'נבה מאשר לתל אביב.

## שוק שמעוצב על ידי מה שלא ניתן לשחזור

המלאי הראשון במעלה בירושלים מנוהל על ידי אילוץ יחיד שאף בירה אחרת באזור אינה חווה בחומרה דומה: תקנת אבן ירושלים, המחייבת מאז 1918 חיפוי חיצוני של אבן גיר מקומית. הקוהרנטיות החזותית שנוצרת היא חתימת העיר. ההשלכה הכלכלית היא נדירות.

## מי באמת קונה

הרכב בסיס הקונים הבינלאומיים ב-2024 ו-2025 התבהר. שלוש קבוצות שולטות כעת במקטע הפרמיום: משפחות צרפתיות ובלגיות, קונים אמריקאים ובריטיים, וקונים לטיניים אמריקאים.

## גורם העלייה — ומדוע הוא משנה את המתמטיקה

המסגרת המיסויית בישראל מטפלת בנדיבות בעולים חדשים. תחת סעיף 14 לפקודת מס הכנסה, עולים מקבלים פטור של עשר שנים על הכנסות זרות ורווחי הון.

## לשיחה פרטית

לשיחה פרטית על המלאי הנוכחי [בשכונות היוקרה של ירושלים](/he/villes/jerusalem), או כדי להיות מעודכן על [הזדמנויות מחוץ לשוק](/he/off-market), צוותנו זמין [להיכרות ישירה](/he/contact).`,
    },
    relatedSlugs: [
      'meilleurs-quartiers-luxe-jerusalem',
      'tel-aviv-vs-jerusalem-investissement',
      'acheter-immobilier-israel-investisseur-etranger',
    ],
    internalLinks: {
      ville: ['jerusalem'],
      quartier: ['talbieh', 'rehavia', 'colonie-allemande'],
    },
  },
  /* ────────────────────────────────────────────────────── */
  {
    slug: 'meilleurs-quartiers-luxe-jerusalem',
    publishedAt: '2026-02-18',
    readMinutes: 11,
    category: { fr: 'Quartiers', en: 'Neighborhoods', he: 'שכונות' },
    image: 'https://images.unsplash.com/photo-1564769662533-4f00a87b4056?w=1600&auto=format&fit=crop&q=80',
    imageAlt: {
      fr: 'Fenêtre cintrée en pierre dans la Colonie Allemande, Jérusalem',
      en: 'Arched stone window in the German Colony, Jerusalem',
      he: 'חלון אבן קמור במושבה הגרמנית, ירושלים',
    },
    seoTitle: {
      fr: 'Meilleurs quartiers de luxe à Jérusalem pour acheteurs étrangers',
      en: 'Best Luxury Neighborhoods in Jerusalem for Foreign Buyers',
      he: 'השכונות היוקרתיות הטובות ביותר בירושלים לקונים זרים',
    },
    metaDescription: {
      fr: 'Guide discret des sept quartiers premium de Jérusalem — quoi acheter, quoi éviter, et comment les familles internationales choisissent.',
      en: "A discreet guide to Jerusalem's seven prime quarters — what to buy, what to avoid, and how international families actually choose.",
      he: 'מדריך דיסקרטי לשבע השכונות הפרמיום של ירושלים — מה לקנות, ממה להימנע, ואיך משפחות בינלאומיות באמת בוחרות.',
    },
    h1: {
      fr: 'Les meilleurs quartiers de luxe à Jérusalem pour les acheteurs étrangers',
      en: 'Best Luxury Neighborhoods in Jerusalem for Foreign Buyers',
      he: 'השכונות היוקרתיות הטובות ביותר בירושלים לקונים זרים',
    },
    excerpt: {
      fr: "Choisir où vivre à Jérusalem est la question que les acheteurs ont tendance à sous-estimer. La ville est petite, mais ses quartiers premium diffèrent les uns des autres de manières qui comptent quotidiennement.",
      en: 'Choosing where to live in Jerusalem is the question that buyers tend to underestimate. The city is small, but its prime quarters differ from one another in ways that matter daily.',
      he: 'הבחירה היכן לגור בירושלים היא השאלה שקונים נוטים לזלזל בה. העיר קטנה, אך השכונות הפרמיום שלה שונות זו מזו בדרכים שחשובות מדי יום.',
    },
    body: {
      fr: `Choisir où vivre à Jérusalem est la question que les acheteurs ont tendance à sous-estimer. La ville est petite — moins de trente kilomètres d'un bout à l'autre — mais ses quartiers premium diffèrent les uns des autres de manières qui comptent quotidiennement : comment vous marchez à la synagogue, comment la lumière tombe sur la cour intérieure, qui vit à côté, ce que la revente vous dira une décennie plus tard.

Ce qui suit est le cadre de travail que nos conseillers utilisent lorsqu'ils s'assoient avec une famille internationale au début d'une recherche à Jérusalem. Ce n'est pas une géographie exhaustive de la ville. Ce sont les sept quartiers qui, ensemble, représentent presque toutes les transactions véritablement premium.

## Talbieh

La plus discrète des adresses premium de Jérusalem. Construit largement entre les années 1920 et 1940 par de riches familles arabes et hérité plus tard comme le cœur résidentiel de la communauté diplomatique et intellectuelle internationale, Talbieh détient aujourd'hui les transactions au mètre carré les plus élevées de la ville.

L'architecture est l'attrait — villas mandataires de trois et quatre étages en calcaire taillé, souvent avec ferronnerie d'origine et cours intérieures. Des rues comme Hovevei Zion, Disraeli, Marcus et Pinsker sont protégées comme zone patrimoniale, ce qui signifie que les rénovations sont étroitement contrôlées mais les valeurs de revente sont correspondamment isolées.

Talbieh convient aux acheteurs qui veulent des rues calmes et matures, à distance de marche de la Résidence du Président et de la Vieille Ville, et un quartier où l'ostentation est considérée comme une taxe sur le goût.

## Réhavia

Réhavia est ce qu'un étranger imagine souvent en pensant à la Jérusalem résidentielle : rues bordées d'arbres tracées dans les années 1920, immeubles d'appartements Bauhaus et de style International, cafés jardin, et une population qui va des juges de la Cour suprême aux écrivains émigrés.

C'est plus piétonnier que Talbieh et considérablement plus social. Le compromis est que certains des bâtiments originaux nécessitent un travail significatif. Pour les familles avec des enfants d'âge scolaire, la localisation centrale et la densité éducative de Réhavia (Université hébraïque, Gymnasia) est un avantage significatif.

## La Colonie Allemande (Emek Refaim)

La Colonie Allemande — connue des locaux simplement comme HaMoshava — a été fondée par des colons templiers en 1873 et conserve la seule concentration significative de maisons européennes pré-étatiques dans la ville. La rue Cremieux est l'adresse la plus convoitée ; HaTzfira et Lloyd George suivent.

C'est le quartier qui a le plus absorbé la migration juive française des deux dernières décennies. Boulangeries, pédiatres francophones et tables de Shabbat qui alternent entre français et anglais sont maintenant une texture définissant le quartier.

## Mamilla

Mamilla est le seul véritable district de luxe en construction neuve de Jérusalem. Développé par étapes à partir de la fin des années 1990, ancré par l'hôtel Mamilla et le Waldorf-Astoria, il offre ce qu'aucun autre quartier de la ville ne peut : des appartements contemporains clé en main avec service de conciergerie, parking sécurisé, et accès direct à pied à la Vieille Ville et à la porte de Jaffa.

Si la priorité d'un acheteur est lock-and-leave, Mamilla est presque toujours la bonne réponse.

## Yemin Moshe

Yemin Moshe est le petit quartier des artistes qui descend du moulin de Montefiore vers les murs de la Vieille Ville. Il y a peut-être 120 propriétés au total. Le quartier est piétonnier uniquement, les vues sont inégalées, et l'inventaire tourne peut-être une ou deux fois par an.

C'est un quartier de collectionneurs.

## Vieux Katamon

Vieux Katamon se trouve entre Réhavia et la Colonie Allemande, et partage des caractéristiques des deux. C'est résidentiel, verdoyant, et de plus en plus favorisé par les jeunes familles françaises et américaines qui trouvent Talbieh prohibitivement rare et la Colonie Allemande légèrement trop commerciale.

## Baka

Baka est le plus méridional des quartiers premium et le plus architecturalement varié. Pour les acheteurs privilégiant l'espace et le jardin sur la centralité, Baka offre la meilleure valeur dans le segment premium.

## Comment les familles décident réellement

En pratique, le choix tend à se cristalliser autour de trois questions : À quelle fréquence la propriété sera-t-elle réellement utilisée ? Y a-t-il une communauté de Shabbat déjà en place qui compte pour la famille ? L'achat porte-t-il principalement sur le style de vie, la préservation d'actif, ou une future aliyah ?

Pour examiner les [propriétés de luxe à Jérusalem](/fr/villes/jerusalem) ou discuter d'un brief spécifique en confidentialité, veuillez [contacter notre équipe](/fr/contact).

## Questions fréquentes

**Quel quartier de Jérusalem conserve le mieux sa valeur ?**
Talbieh et Yemin Moshe ont démontré la tarification la plus durable à travers les cycles de marché.

**Quel quartier est le plus international ?**
La Colonie Allemande et Mamilla, dans des registres différents.

**Y a-t-il des communautés fermées à Jérusalem ?**
Les véritables communautés fermées sont rares. L'équivalent le plus proche est le Waldorf-Astoria Residences.`,
      en: `Choosing where to live in Jerusalem is the question that buyers tend to underestimate. The city is small — fewer than thirty kilometres from end to end — but its prime quarters differ from one another in ways that matter daily.

What follows is the working framework our advisors use when sitting with an international family at the beginning of a Jerusalem search.

## Talbiyeh

The most discreet of Jerusalem's prime addresses. Built largely between the 1920s and 1940s by wealthy Arab families and later inherited as the residential heart of the international diplomatic and intellectual community, Talbiyeh today holds the city's highest per-square-metre transactions.

Streets like Hovevei Zion, Disraeli, Marcus, and Pinsker are protected as a heritage zone. Talbiyeh suits buyers who want quiet, mature streets, walking distance to the President's Residence and the Old City.

## Rehavia

Rehavia is what an outsider often pictures when imagining residential Jerusalem: tree-lined streets laid out in the 1920s, Bauhaus and International Style apartment blocks. For families with school-age children, Rehavia's central location and educational density is a meaningful advantage.

## The German Colony (Emek Refaim)

The German Colony was founded by Templer settlers in 1873 and retains the only meaningful concentration of pre-state European houses in the city. Cremieux Street is the most coveted address. This is the neighbourhood that has most absorbed the French Jewish migration of the past two decades.

## Mamilla

Mamilla is Jerusalem's only credible new-build luxury district. If a buyer's priority is lock-and-leave, Mamilla is almost always the right answer.

## Yemin Moshe

Yemin Moshe is the small artists' quarter that descends from the Montefiore Windmill toward the Old City walls. There are perhaps 120 properties in total. This is a collector's neighbourhood.

## Old Katamon

Old Katamon sits between Rehavia and the German Colony, and is increasingly favoured by younger French and American families.

## Baka

Baka is the southernmost of the prime quarters. For buyers prioritising space and garden over centrality, Baka offers the best value in the prime tier.

## How families actually decide

In practice, the choice tends to crystallise around three questions: How often will the property actually be used? Is there a Shabbat community already in place that matters? Is the purchase principally about lifestyle, asset preservation, or future aliyah?

To review available [Jerusalem luxury properties](/en/villes/jerusalem) or to discuss a specific brief in confidence, please [contact our team](/en/contact).

## Frequently Asked Questions

**Which Jerusalem neighborhood holds value best?**
Talbiyeh and Yemin Moshe have demonstrated the most durable pricing through market cycles.

**Which neighborhood is most international?**
The German Colony and Mamilla, in different registers.`,
      he: `הבחירה היכן לגור בירושלים היא השאלה שקונים נוטים לזלזל בה. העיר קטנה — פחות משלושים קילומטרים מקצה לקצה — אך השכונות הפרמיום שלה שונות זו מזו בדרכים שחשובות מדי יום.

## טלביה

הכתובת הדיסקרטית ביותר של ירושלים. נבנתה בעיקר בין שנות ה-20 ל-40 על ידי משפחות ערביות אמידות, וירושה מאוחר יותר כלב המגורים של הקהילה הדיפלומטית והאינטלקטואלית הבינלאומית.

## רחביה

רחביה היא מה שאדם זר מדמיין לעיתים קרובות כשחושב על ירושלים המגורים: רחובות עם עצים שתוכננו בשנות ה-20, בנייני באוהאוס.

## המושבה הגרמנית

המושבה הגרמנית נוסדה על ידי מתיישבים טמפלרים ב-1873 ושומרת על הריכוז המשמעותי היחיד של בתים אירופיים טרום-מדינתיים בעיר.

## ממילא

ממילא היא המחוז היחיד של בנייה חדשה יוקרתית בירושלים. אם העדיפות של הקונה היא "נעל-ועזוב", ממילא היא כמעט תמיד התשובה הנכונה.

## ימין משה

שכונת האמנים הקטנה היורדת מטחנת מונטיפיורי לעבר חומות העיר העתיקה.

## קטמון הישנה

קטמון הישנה נמצאת בין רחביה למושבה הגרמנית.

## בקעה

בקעה היא הדרומית ביותר של השכונות הפרמיום.

לסקירת [נכסי יוקרה זמינים בירושלים](/he/villes/jerusalem), אנא [צרו קשר עם הצוות שלנו](/he/contact).`,
    },
    relatedSlugs: [
      'investisseurs-internationaux-jerusalem-immobilier-luxe',
      'meilleurs-quartiers-luxe-tel-aviv',
      'tel-aviv-vs-jerusalem-investissement',
    ],
    internalLinks: {
      ville: ['jerusalem'],
      quartier: ['talbieh', 'rehavia', 'colonie-allemande'],
    },
  },
  /* ────────────────────────────────────────────────────── */
  {
    slug: 'tel-aviv-vs-jerusalem-investissement',
    publishedAt: '2026-03-04',
    readMinutes: 12,
    category: { fr: 'Marché', en: 'Market', he: 'שוק' },
    image: 'https://images.unsplash.com/photo-1597166283938-2cf91dafda5b?w=1600&auto=format&fit=crop&q=80',
    imageAlt: {
      fr: 'Vue panoramique de Tel Aviv au coucher du soleil',
      en: 'Tel Aviv panoramic view at sunset',
      he: 'תצפית פנורמית של תל אביב בשקיעה',
    },
    seoTitle: {
      fr: 'Tel Aviv vs Jérusalem : investir dans l\'immobilier de luxe',
      en: 'Tel Aviv vs Jerusalem: Luxury Property Investment Compared',
      he: 'תל אביב נגד ירושלים: השוואת השקעות נדל"ן יוקרה',
    },
    metaDescription: {
      fr: 'Deux villes, deux marchés, deux stratégies différentes. Une comparaison honnête de Tel Aviv et Jérusalem pour l\'investissement immobilier de luxe.',
      en: 'Two cities, two markets, two different strategies. An honest comparison of Tel Aviv and Jerusalem for international luxury real estate investment.',
      he: 'שתי ערים, שני שווקים, שתי אסטרטגיות שונות. השוואה כנה של תל אביב וירושלים להשקעות נדל"ן יוקרה.',
    },
    h1: {
      fr: "Tel Aviv vs Jérusalem pour l'investissement immobilier de luxe",
      en: 'Tel Aviv vs Jerusalem for Luxury Property Investment',
      he: 'תל אביב נגד ירושלים להשקעות נדל"ן יוקרה',
    },
    excerpt: {
      fr: "Une question qu'on nous pose chaque semaine : Tel Aviv ou Jérusalem. La réponse honnête est qu'il ne s'agit pas vraiment d'actifs comparables.",
      en: 'A question we are asked weekly: Tel Aviv or Jerusalem. The honest answer is that they are not really comparable assets.',
      he: 'שאלה שאנחנו נשאלים מדי שבוע: תל אביב או ירושלים. התשובה הכנה היא שהן לא באמת נכסים ניתנים להשוואה.',
    },
    body: {
      fr: `Une question qu'on nous pose chaque semaine : Tel Aviv ou Jérusalem.

La réponse honnête est qu'il ne s'agit pas vraiment d'actifs comparables. Elles partagent un pays et une monnaie, mais tout le reste — la base d'acheteurs, le profil de rendement, la façon dont le marché se comporte sous tension, l'horizon de revente — diverge. Choisir entre elles est plus proche de choisir entre Manhattan et Boston qu'entre deux quartiers de la même ville.

## Les deux marchés, en résumé

Tel Aviv est un marché de rendement et de liquidité. Jérusalem est un marché de rareté et de préservation.

Le segment premium de Tel Aviv — Neve Tzedek, Rothschild, le Nord Ancien, Sarona, le front de mer — est porté par les hauts revenus domestiques, l'économie technologique, et un flux régulier de tourisme international et de résidence secondaire. Les propriétés se négocient rapidement. Les marchés locatifs sont profonds.

Le segment premium de Jérusalem est porté par des acheteurs internationaux avec des horizons de détention plus longs, des motivations religieuses et culturelles aux côtés de l'investissement, et une offre nettement plus restreinte.

## Rendement : où sont réellement les revenus

Le segment premium de Tel Aviv génère des rendements locatifs bruts d'environ 2,8 % à 4,0 % sur les baux longs, avec des chiffres matériellement plus élevés réalisables sur des produits courts et serviciels près du front de mer et de Rothschild.

Les rendements premium de Jérusalem sont typiquement plus bas — 1,8 % à 2,8 % sur les baux longs à Talbieh, Réhavia et la Colonie Allemande.

## Liquidité : à quelle vitesse vous pouvez sortir

Le segment premium de Tel Aviv est parmi les marchés de luxe les plus liquides de la région. Un appartement de 200 m² correctement valorisé à Neve Tzedek ou sur Rothschild se négocie typiquement en trois à six mois.

Le segment premium de Jérusalem est plus lent. Un actif véritablement premium à Talbieh peut prendre six à douze mois pour trouver le bon acheteur au bon prix.

## Comment chaque marché s'est comporté durant les deux dernières années

La période de fin 2023 à 2025 fut le test le plus rigoureux du marché immobilier de luxe israélien en deux décennies.

Tel Aviv a vu les volumes de transactions se contracter fortement dans les six premiers mois suivant octobre 2023, puis se redresser avec une force notable jusqu'en 2024 alors que l'économie technologique s'est révélée résiliente.

Jérusalem s'est comportée différemment. Les volumes de transactions premium ont tenu plus stablement à travers la contraction. La strate véritablement premium — Talbieh, Yemin Moshe, le cœur de la Colonie Allemande — n'a vu presque aucun ramollissement de prix.

## Quel marché pour quel acheteur

**Tel Aviv convient** : aux acheteurs cherchant rendement, liquidité, et une vie quotidienne plus cosmopolite. Aux familles plus jeunes. Aux investisseurs.

**Jérusalem convient** : aux acheteurs cherchant des actifs patrimoniaux, une volatilité plus faible, une profondeur religieuse ou culturelle, et un horizon de détention plus long.

En pratique, les clients internationaux les plus sophistiqués détiennent les deux. Un appartement à Tel Aviv pour la liquidité et l'usage familial ; une propriété à Jérusalem pour l'horizon long et le sens.

## Repères de prix actuels

Pour orientation, fin 2025 :

- **Tel Aviv premium** (Neve Tzedek, Rothschild, front de mer) : 70 000–120 000 NIS/m²
- **Jérusalem premium** (Talbieh, Yemin Moshe, Réhavia centrale) : 50 000–95 000 NIS/m²
- Mamilla / Waldorf Residences : 75 000–110 000 NIS/m²

Nos conseillers organisent l'inventaire actuel dans les deux villes. Pour les [appartements de luxe à Tel Aviv](/fr/villes/tel-aviv), les [propriétés premium à Jérusalem](/fr/villes/jerusalem), ou pour comparer des options spécifiques sur les deux marchés, veuillez [joindre notre équipe](/fr/contact).

## Questions fréquentes

**Quelle ville a les rendements locatifs les plus élevés ?**
Tel Aviv, matériellement. Le segment premium de Tel Aviv rapporte typiquement 2,8–4,0 % brut.

**Quelle ville est plus liquide pour la revente ?**
Tel Aviv.

**Puis-je posséder des biens dans les deux villes ?**
Oui, sans restriction légale.`,
      en: `A question we are asked weekly: Tel Aviv or Jerusalem.

The honest answer is that they are not really comparable assets. They share a country and a currency, but everything else — the buyer base, the yield profile, the way the market behaves under stress, the resale horizon — diverges.

## The two markets, in summary

Tel Aviv is a yield and liquidity market. Jerusalem is a scarcity and preservation market.

## Yield: where the income actually is

Prime Tel Aviv generates gross rental yields of approximately 2.8% to 4.0% on long lets. Prime Jerusalem yields are typically lower — 1.8% to 2.8%.

## Liquidity: how fast you can exit

Prime Tel Aviv is among the more liquid luxury markets in the region. Prime Jerusalem moves slower — but the market doesn't force exits.

## Which market for which buyer

**Tel Aviv suits**: buyers seeking yield, liquidity, and a more cosmopolitan day-to-day life.

**Jerusalem suits**: buyers seeking heritage assets, lower volatility, religious or cultural depth, and a longer holding horizon.

In practice, the most sophisticated international clients hold both.

## Current pricing benchmarks

- Prime **Tel Aviv**: 70,000–120,000 NIS per m²
- Prime **Jerusalem**: 50,000–95,000 NIS per m²
- Mamilla / Waldorf Residences: 75,000–110,000 NIS per m²

For [Tel Aviv luxury apartments](/en/villes/tel-aviv), [Jerusalem prime properties](/en/villes/jerusalem), or to compare specific options, please [reach our team](/en/contact).

## Frequently Asked Questions

**Which city has higher rental yields?**
Tel Aviv, materially.

**Which city is more liquid for resale?**
Tel Aviv.`,
      he: `שאלה שאנחנו נשאלים מדי שבוע: תל אביב או ירושלים.

התשובה הכנה היא שהן לא באמת נכסים ניתנים להשוואה.

## שני השווקים, בקצרה

תל אביב היא שוק של תשואה ונזילות. ירושלים היא שוק של נדירות ושימור.

## תשואה

תל אביב פרמיום מייצרת תשואות שכירות ברוטו של כ-2.8%–4.0%. ירושלים פרמיום נמוכה יותר — 1.8%–2.8%.

## איזה שוק לאיזה קונה

**תל אביב מתאימה** לקונים המחפשים תשואה ונזילות.
**ירושלים מתאימה** לקונים המחפשים נכסי מורשת והחזקה ארוכה.

## נקודות מחיר נוכחיות

- תל אביב פרמיום: 70,000–120,000 ₪ למ"ר
- ירושלים פרמיום: 50,000–95,000 ₪ למ"ר`,
    },
    relatedSlugs: [
      'investisseurs-internationaux-jerusalem-immobilier-luxe',
      'meilleurs-quartiers-luxe-tel-aviv',
      'acheter-immobilier-israel-investisseur-etranger',
    ],
    internalLinks: { ville: ['tel-aviv', 'jerusalem'] },
  },
  /* ────────────────────────────────────────────────────── */
  {
    slug: 'proprietes-off-market-israel-luxe',
    publishedAt: '2026-03-18',
    readMinutes: 10,
    category: { fr: 'Off-Market', en: 'Off-Market', he: 'מחוץ לשוק' },
    image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=1600&auto=format&fit=crop&q=80',
    imageAlt: {
      fr: 'Portail en fer forgé d\'une villa privée',
      en: 'Wrought iron gate of a private villa',
      he: 'שער ברזל של וילה פרטית',
    },
    seoTitle: {
      fr: 'La montée des propriétés off-market de luxe en Israël',
      en: 'The Rise of Off-Market Luxury Properties in Israel',
      he: 'עליית הנכסים היוקרתיים שמחוץ לשוק בישראל',
    },
    metaDescription: {
      fr: "Au cœur du marché premium invisible d'Israël — pourquoi les propriétés les plus convoitées n'apparaissent jamais sur les portails.",
      en: "Inside Israel's invisible prime market — why the most coveted properties never appear on portals, and how international buyers actually access them.",
      he: 'מבט פנים על שוק הפרמיום הבלתי-נראה של ישראל — מדוע הנכסים הנחשקים ביותר לא מופיעים לעולם בפורטלים.',
    },
    h1: {
      fr: 'La montée des propriétés off-market de luxe en Israël',
      en: 'The Rise of Off-Market Luxury Properties in Israel',
      he: 'עליית הנכסים היוקרתיים שמחוץ לשוק בישראל',
    },
    excerpt: {
      fr: "Les transactions immobilières les plus désirables en Israël ne se déroulent pas sur le marché public. Elles ont lieu dans une série d'appels téléphoniques entre courtiers qui se connaissent depuis quinze ans.",
      en: 'The most desirable property transactions in Israel do not happen on the open market. They happen in a series of phone calls between brokers who have known each other for fifteen years.',
      he: 'העסקאות הנדל"ן המבוקשות ביותר בישראל לא קורות בשוק הפתוח. הן קורות בסדרת שיחות טלפון בין מתווכים שמכירים אחד את השני חמש עשרה שנה.',
    },
    body: {
      fr: `Les transactions immobilières les plus désirables en Israël — par prix et par pedigree — ne se déroulent pas sur le marché ouvert. Elles ont lieu dans une série d'appels téléphoniques entre courtiers qui se connaissent depuis quinze ans, dans des conversations à des tables de dîner à Herzliya Pituah, et dans des accords de poignée de main qui ne sont formalisés que des semaines après que l'acheteur et le vendeur aient déjà décidé.

Ce n'est pas nouveau. Ce qui est nouveau, c'est l'ampleur.

Les estimations de l'industrie placent la part des transactions off-market dans le top tier d'Israël — propriétés au-dessus d'environ 12 millions de NIS — entre 35 % et 50 %. Dans certains micro-marchés, la part est sensiblement plus élevée.

## Pourquoi les vendeurs préfèrent la confidentialité

Trois forces ont convergé.

La première est simple : la confidentialité. Les vendeurs premium d'Israël — familles établies, fondateurs d'entreprises technologiques, professionnels de la finance et de la médecine, personnalités publiques — refusent de plus en plus d'exposer leurs propriétés aux annonces de portail.

La seconde est la précision tarifaire. Une propriété apparaissant sur un portail public porte un prix annoncé, qui établit un plafond et invite à la négociation à la baisse. Une propriété circulée en privé est présentée à des acheteurs qualifiés individuellement, souvent sans prix indiqué.

La troisième est ce que les courtiers appellent la "sélection de la contrepartie". Les vendeurs de propriétés générationnelles se soucient souvent de qui est l'acheteur.

## Pourquoi les acheteurs préfèrent aussi la confidentialité

Les acheteurs sophistiqués sont méfiants vis-à-vis du type de visibilité qu'une transaction publique crée. Le segment premium d'Israël est géographiquement petit ; les nouvelles voyagent.

L'acquisition off-market offre aussi quelque chose que le marché public ne peut pas : l'accès à des propriétés que le vendeur n'a pas encore décidé de vendre.

## La géographie du off-market en Israël

Certaines zones fonctionnent presque entièrement en off-market.

**Herzliya Pituah**, particulièrement les rues le long de Galei Tchelet et HaShunit, a la part de off-market la plus élevée de tout sous-marché de luxe israélien.

**Césarée**, particulièrement les rues senior de Césarée Aleph, se comporte de manière similaire.

**Talbieh** à Jérusalem est maintenant effectivement un marché fermé.

## Comment un acheteur international accède réellement à l'inventaire off-market

Il n'y a pas de portail pour cela. Il n'y a pas de base de données à laquelle s'abonner. L'accès off-market est, dans chaque cas, une fonction de relation.

Un acheteur entrant sur le marché israélien a besoin d'un conseiller avec deux qualifications spécifiques : une présence établie de longue date dans le sous-marché pertinent, et une réputation parmi les vendeurs et courtiers locaux qui ouvre des portes.

Notre [portfolio off-market](/fr/off-market) est curé en continu et disponible aux acheteurs qualifiés par introduction directe. Pour discuter d'un brief spécifique en confidentialité, veuillez [contacter notre équipe](/fr/contact).

## Questions fréquentes

**Quel pourcentage des transactions de luxe israéliennes sont off-market ?**
Les estimations de l'industrie suggèrent 35–50 % dans le segment au-dessus de 12 millions de NIS.

**Comment accéder aux propriétés off-market en Israël ?**
À travers une relation avec un conseiller établi dans le sous-marché pertinent.

**Les propriétés off-market sont-elles plus chères ?**
Pas nécessairement. La tarification off-market peut être compétitive.`,
      en: `The most desirable property transactions in Israel — by both price and pedigree — do not happen on the open market. They happen in a series of phone calls between brokers who have known each other for fifteen years.

Industry estimates place the share of off-market transactions in Israel's top tier — properties above approximately 12 million NIS — between 35% and 50%.

## Why sellers prefer privacy

Three forces have converged: privacy, pricing precision, and counterparty selection.

## Why buyers prefer privacy too

Sophisticated buyers are wary of the visibility a public transaction creates. Off-market acquisition also offers access to properties the seller has not yet decided to sell.

## The geography of off-market Israel

**Herzliya Pituah** has the highest off-market share of any Israeli luxury submarket. **Caesarea** behaves similarly. **Talbiyeh** in Jerusalem is effectively a closed market.

## How an international buyer accesses off-market inventory

There is no portal. Off-market access is, in every case, a function of relationship.

Our [off-market portfolio](/en/off-market) is curated continuously. To discuss a specific brief in confidence, please [contact our team](/en/contact).

## FAQ

**What percentage of Israeli luxury transactions are off-market?**
35–50% in the segment above 12 million NIS.

**How do I access off-market properties?**
Through a relationship with an established advisor.`,
      he: `העסקאות הנדל"ן המבוקשות ביותר בישראל לא קורות בשוק הפתוח.

הערכות התעשייה ממקמות את חלק העסקאות שמחוץ לשוק בטופ של ישראל בין 35% ל-50%.

## מדוע מוכרים מעדיפים פרטיות

שלושה כוחות התלכדו: פרטיות, דיוק תמחור, ובחירת הצד הנגדי.

## הגיאוגרפיה של מחוץ-לשוק

**הרצליה פיתוח** מחזיקה בנתח הגבוה ביותר. **קיסריה** מתנהגת בדומה. **טלביה** בירושלים היא למעשה שוק סגור.

## איך גישה ניתנת

אין פורטל. הגישה היא פונקציה של מערכת יחסים.

[התיק שלנו מחוץ לשוק](/he/off-market) זמין לקונים מוסמכים בהיכרות ישירה.`,
    },
    relatedSlugs: [
      'herzliya-pituah-caesarea-ultra-prime',
      'acheter-immobilier-israel-investisseur-etranger',
      'investisseurs-internationaux-jerusalem-immobilier-luxe',
    ],
    internalLinks: { ville: ['herzliya-pituah', 'jerusalem'] },
  },
  /* ────────────────────────────────────────────────────── */
  {
    slug: 'acheter-immobilier-israel-investisseur-etranger',
    publishedAt: '2026-04-01',
    readMinutes: 13,
    category: { fr: 'Guide', en: 'Guide', he: 'מדריך' },
    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1600&auto=format&fit=crop&q=80',
    imageAlt: {
      fr: 'Documents juridiques et stylo plume sur un bureau en bois',
      en: 'Legal documents and fountain pen on a wooden desk',
      he: 'מסמכים משפטיים ועט נובע על שולחן עץ',
    },
    seoTitle: {
      fr: "Acheter de l'immobilier de luxe en Israël en tant qu'investisseur étranger",
      en: 'Buying Luxury Real Estate in Israel as a Foreign Investor',
      he: 'רכישת נדל"ן יוקרה בישראל כמשקיע זר',
    },
    metaDescription: {
      fr: "Un guide précis pour acquérir une propriété de luxe israélienne en tant que non-résident — processus légal, taxes, financement, et les questions que la plupart des acheteurs internationaux manquent.",
      en: 'A precise guide to acquiring Israeli luxury property as a non-resident — legal process, taxes, financing, and the questions most international buyers miss.',
      he: 'מדריך מדויק לרכישת נדל"ן יוקרה ישראלי כתושב חוץ — תהליך משפטי, מסים, מימון.',
    },
    h1: {
      fr: "Acheter de l'immobilier de luxe en Israël en tant qu'investisseur étranger",
      en: 'Buying Luxury Real Estate in Israel as a Foreign Investor',
      he: 'רכישת נדל"ן יוקרה בישראל כמשקיע זר',
    },
    excerpt: {
      fr: "Le cadre juridique israélien pour l'acquisition immobilière étrangère est, selon les normes internationales, remarquablement simple. Il n'y a aucune restriction de nationalité.",
      en: 'The Israeli legal framework for foreign real estate acquisition is, by international standards, remarkably straightforward. There is no nationality restriction.',
      he: 'המסגרת המשפטית הישראלית לרכישת נדל"ן זר היא, על פי סטנדרטים בינלאומיים, פשוטה להפליא.',
    },
    body: {
      fr: `Le cadre juridique israélien pour l'acquisition immobilière étrangère est, selon les normes internationales, remarquablement simple. Il n'y a aucune restriction de nationalité. La pleine propriété est disponible pour tout acheteur. Le Tabu (registre foncier) traite identiquement les acheteurs étrangers et israéliens.

C'est la partie facile — et là où la plupart des acheteurs internationaux s'arrêtent.

Ce qui suit est la conversation plus utile : les questions structurelles, fiscales et pratiques qui distinguent une acquisition propre d'une éducation coûteuse.

## L'architecture juridique

Israël opère un registre foncier centralisé (le **Tabu**) modélisé librement sur le système britannique. La plupart des biens urbains premium à Tel Aviv et Jérusalem sont en pleine propriété et enregistrés au Tabu.

L'acquisition est documentée dans un contrat signé devant deux avocats — un pour chaque partie — et enregistrée au Tabu après paiement de la taxe d'achat et confirmation du titre clair.

Un calendrier typique d'une offre signée à la propriété enregistrée est de six à douze semaines.

## Taxe d'achat (Mas Rechisha) — le chiffre le plus important

Pour les **acheteurs non-résidents**, les taux sont progressifs :
- 8 % sur la première portion de valeur (~6 millions de NIS, indexés annuellement)
- 10 % au-dessus de ce seuil

Il n'y a pas d'exemption de première résidence pour les non-résidents.

L'implication est qu'une acquisition de 15 millions de NIS par un acheteur étranger porte environ 1,4 million de NIS de taxe d'achat.

Une exception significative existe pour les acheteurs qui deviennent résidents israéliens (olim chadashim) dans une fenêtre définie de l'achat.

## Gains en capital et revenu locatif

**L'impôt sur les plus-values** (Mas Shevach) s'applique à 25 % sur l'appréciation pour les non-résidents.

**Le revenu locatif** est imposable en Israël. Les non-résidents ont le choix entre deux régimes : une retenue à la source simplifiée de 10 % sur le revenu locatif brut, ou les taux d'impôt sur le revenu progressifs standards avec déductions de dépenses.

## Devises et financement

Le shekel israélien est une devise librement convertible. Il n'y a pas de contrôles de change.

**Le financement hypothécaire est disponible aux non-résidents**, typiquement jusqu'à 50 % LTV, en shekels, USD, EUR ou GBP.

## Le rôle du conseiller et de l'avocat

En Israël, **l'avocat** est le professionnel central de la transaction.

Le **conseiller immobilier** est un rôle séparé.

## Questions structurelles à poser avant de signer

**Structure de propriété.** Acheter en nom personnel, à travers une société israélienne, à travers un trust, ou à travers une entité étrangère ?

**Héritage.** Le droit successoral israélien s'applique aux biens israéliens indépendamment du domicile.

**Aliyah future.** Même une vague possibilité future d'aliyah change matériellement la structure d'acquisition optimale.

Pour une consultation confidentielle, veuillez [contacter notre équipe](/fr/contact). Pour examiner l'inventaire actuel, voir nos portfolios [Tel Aviv](/fr/villes/tel-aviv) et [Jérusalem](/fr/villes/jerusalem), ou nos [opportunités off-market](/fr/off-market).

## Questions fréquentes

**Les étrangers peuvent-ils acheter en Israël sans restrictions ?**
Oui. Israël n'impose aucune restriction de nationalité.

**Quel est le coût total de transaction pour un acheteur étranger ?**
Au-delà du prix d'achat, prévoyez environ 8–11 % en taxe d'achat, frais légaux, commission de courtage et frais d'enregistrement combinés.

**Puis-je obtenir un prêt hypothécaire en tant que non-résident ?**
Oui. Les banques israéliennes prêtent jusqu'à ~50 % LTV.

**Dois-je être en Israël pour finaliser l'achat ?**
Non. La transaction peut être effectuée à distance via une procuration.`,
      en: `The Israeli legal framework for foreign real estate acquisition is, by international standards, remarkably straightforward. There is no nationality restriction.

## The legal architecture

Israel operates a centralised land registry (the **Tabu**). The acquisition is documented in a contract signed before two lawyers and registered in the Tabu following payment of purchase tax.

A typical timeline from signed offer to registered ownership is six to twelve weeks.

## Purchase tax (Mas Rechisha)

For **non-resident buyers**, the rates are progressive:
- 8% on the first portion of value (approximately the first 6 million NIS)
- 10% above that threshold

There is no first-home exemption for non-residents.

## Capital gains and rental income

**Capital gains tax** on resale applies at 25%. **Rental income** is taxable in Israel — non-residents typically use the simplified 10% withholding regime.

## Currency and financing

The Israeli shekel is freely convertible. Mortgage financing is available to non-residents up to ~50% LTV.

## The role of the advisor and the lawyer

The **lawyer** is the central professional in the transaction. The **real estate advisor** is a separate role focused on property identification and negotiation.

## Structural questions to ask

**Ownership structure.** Buy in personal name, through an Israeli company, through a trust, or through a foreign entity? Each has different tax, inheritance, and privacy implications.

**Future aliyah.** Even a vague future possibility materially changes the optimal acquisition structure.

For a confidential consultation, please [contact our team](/en/contact). To review current inventory, see our [Tel Aviv](/en/villes/tel-aviv) and [Jerusalem](/en/villes/jerusalem) portfolios, or our [off-market opportunities](/en/off-market).

## FAQ

**Can foreigners buy property in Israel without restrictions?**
Yes.

**What is the total transaction cost?**
Approximately 8–11% beyond the purchase price.

**Can I get a mortgage as a non-resident?**
Yes, up to ~50% LTV.`,
      he: `המסגרת המשפטית הישראלית לרכישת נדל"ן זר היא, על פי סטנדרטים בינלאומיים, פשוטה להפליא. אין הגבלת אזרחות.

## הארכיטקטורה המשפטית

ישראל מפעילה רישום קרקע מרכזי (**הטאבו**). הרכישה מתועדת בחוזה שנחתם בפני שני עורכי דין.

## מס רכישה

לקונים תושבי חוץ, השיעורים פרוגרסיביים:
- 8% על החלק הראשון של הערך (כ-6 מיליון ₪)
- 10% מעל הסף הזה

## מטבע ומימון

השקל הישראלי חופשי להמרה. מימון משכנתא זמין לתושבי חוץ עד כ-50% LTV.

לייעוץ סודי, אנא [צרו קשר עם הצוות שלנו](/he/contact).`,
    },
    relatedSlugs: [
      'investisseurs-internationaux-jerusalem-immobilier-luxe',
      'proprietes-off-market-israel-luxe',
      'tel-aviv-vs-jerusalem-investissement',
    ],
    internalLinks: { ville: ['tel-aviv', 'jerusalem', 'herzliya-pituah'] },
  },
  /* ────────────────────────────────────────────────────── */
  {
    slug: 'meilleurs-quartiers-luxe-tel-aviv',
    publishedAt: '2026-04-15',
    readMinutes: 11,
    category: { fr: 'Quartiers', en: 'Neighborhoods', he: 'שכונות' },
    image: 'https://images.unsplash.com/photo-1544531586-fbb6cf2ef642?w=1600&auto=format&fit=crop&q=80',
    imageAlt: {
      fr: 'Façade Bauhaus de Tel Aviv au crépuscule',
      en: 'Tel Aviv Bauhaus façade at dusk',
      he: 'חזית באוהאוס בתל אביב בשעת בין ערביים',
    },
    seoTitle: {
      fr: 'Meilleurs quartiers de luxe à Tel Aviv pour acheteurs internationaux',
      en: 'Best Luxury Neighborhoods in Tel Aviv for International Buyers',
      he: 'השכונות היוקרתיות הטובות ביותר בתל אביב לקונים בינלאומיים',
    },
    metaDescription: {
      fr: "Un guide précis des quartiers premium de Tel Aviv — de Neve Tzedek à Rothschild, et comment les acheteurs internationaux choisissent entre eux.",
      en: "A precise guide to Tel Aviv's prime quarters — from Neve Tzedek's quiet stone houses to the seafront towers.",
      he: 'מדריך מדויק לשכונות הפרמיום של תל אביב — מנווה צדק לרוטשילד.',
    },
    h1: {
      fr: 'Les meilleurs quartiers de luxe à Tel Aviv pour les acheteurs internationaux',
      en: 'Best Luxury Neighborhoods in Tel Aviv for International Buyers',
      he: 'השכונות היוקרתיות הטובות ביותר בתל אביב לקונים בינלאומיים',
    },
    excerpt: {
      fr: "Tel Aviv est plus jeune que ses prix ne le suggèrent. La ville célèbre son premier siècle de mémoire vivante, et les rues qui commandent maintenant des valorisations équivalentes à Manhattan étaient des dunes de sable à la vie des grands-parents encore en vie.",
      en: 'Tel Aviv is younger than its prices suggest. The city celebrates its first century in living memory.',
      he: 'תל אביב צעירה ממה שהמחירים שלה מציעים.',
    },
    body: {
      fr: `Tel Aviv est plus jeune que ses prix ne le suggèrent. La ville célèbre son premier siècle de mémoire vivante. Le résultat est un paysage de luxe différent de tout autre dans la région. Il n'y a pas de quartier premium unique de la manière dont Talbieh définit Jérusalem. Le segment supérieur de Tel Aviv est distribué à travers une série de sous-marchés distincts.

## Neve Tzedek

Neve Tzedek fut le premier quartier juif construit hors des murs de Jaffa, fondé en 1887. Sa redécouverte à la fin des années 1990, et sa lente restauration depuis, a produit ce qui est maintenant le sous-marché de luxe le plus distinctif de la ville.

L'architecture est petite. Maisons en pierre de deux ou trois étages avec toits de tuiles inclinés, rues étroites, cours intérieures, et le genre de patine qui ne peut être fabriquée.

Prix pour des maisons entièrement restaurées sur Shabazi ou Pines : 80 000–130 000 NIS/m².

## Boulevard Rothschild

Rothschild est la colonne vertébrale du Bauhaus de Tel Aviv et l'adresse canonique la plus proche que la ville possède. L'architecture a été cataloguée, protégée, et — dans les meilleurs cas — méticuleusement restaurée.

Prix : de 75 000 NIS/m² pour le stock premium typique à plus de 120 000 NIS/m² pour les restaurations les plus prestigieuses entre Allenby et Habima.

## Le Nord Ancien (Tzafon HaYashan)

Le Nord Ancien est la moitié plus calme du centre de Tel Aviv. Pour les acheteurs internationaux avec des enfants d'âge scolaire, le Nord Ancien offre quelque chose que les quartiers plus centraux ne peuvent pas : proximité aux bonnes écoles et aux parcs.

Prix : 60 000–95 000 NIS/m².

## Sarona et Park Tzameret

Si Rothschild est le Tel Aviv patrimonial, Sarona et Park Tzameret sont son énoncé de luxe moderne. Le produit est reconnaissable : tours en verre et pierre, conciergerie complète, parking sécurisé.

La tarification au sommet de ce segment dépasse maintenant 150 000 NIS/m².

## Le front de mer de Tel Aviv

La bande le long de la rue Hayarkon, de la plage Hilton au sud jusqu'au Dan, constitue son propre sous-marché. Les penthouses des étages supérieurs commandent maintenant la tarification absolue la plus élevée de la ville.

## Jaffa (Vieille Jaffa)

La Vieille Jaffa est en transformation longue et prudente depuis plus de deux décennies. Les maisons en pierre arabes du vieux port — autrefois sous-évaluées et démodées — sont maintenant parmi les propriétés patrimoniales les plus convoitées.

Prix : 75 000–140 000 NIS/m².

## Ramat Aviv Gimel

Au nord du Yarkon, Ramat Aviv Gimel est la réponse résidentielle familiale au centre de Tel Aviv. C'est le choix pour les familles internationales en relocalisation avec plusieurs enfants.

Prix : 45 000–70 000 NIS/m².

## Comment les familles internationales choisissent

**Acheteurs utilisant la propriété principalement comme pied-à-terre** — gravitent vers Rothschild, Neve Tzedek ou les tours du front de mer.

**Acheteurs se relocalisant** avec des enfants d'âge scolaire — finissent presque toujours dans le Nord Ancien ou Ramat Aviv Gimel.

**Acheteurs concentrés sur l'investissement et le rendement** — choisissent typiquement Rothschild ou le Nord Ancien.

**Acheteurs voulant patrimoine et distinction architecturale** — trouvent leur chemin vers Neve Tzedek, la Vieille Jaffa, ou le cœur du Bauhaus Rothschild.

Pour l'inventaire actuel à travers le marché premium de Tel Aviv, voir nos [appartements de luxe à Tel Aviv](/fr/villes/tel-aviv). Pour une discussion confidentielle, veuillez [contacter notre équipe](/fr/contact).

## Questions fréquentes

**Quel quartier de Tel Aviv a les prix les plus élevés ?**
Les étages trophées de Park Tzameret et Sarona — dépassant 150 000 NIS/m².

**Quel quartier est le meilleur pour le rendement locatif ?**
Rothschild et le Nord Ancien.

**Où vivent typiquement les familles internationales avec enfants ?**
Le Nord Ancien et Ramat Aviv Gimel principalement.`,
      en: `Tel Aviv is younger than its prices suggest. The city celebrates its first century in living memory.

There is no single prime quarter the way Talbiyeh defines Jerusalem. Tel Aviv's high end is distributed across a series of distinct submarkets.

## Neve Tzedek

The most distinctive luxury submarket in the city. Two- and three-storey stone houses with pitched tile roofs, narrow streets, internal courtyards. Prices: 80,000–130,000 NIS per square metre.

## Rothschild Boulevard

The spine of Bauhaus Tel Aviv. 1930s exteriors with completely contemporary interiors through deep renovation. Prices: 75,000–120,000 NIS per square metre.

## The Old North

Tel Aviv's quieter half. Tree-lined, residential, with restored Bauhaus and 1950s blocks. Prices: 60,000–95,000 NIS per square metre.

## Sarona and Park Tzameret

Modern luxury statement. Glass and stone towers, full concierge, secure parking. Top floors exceed 150,000 NIS per square metre.

## The Tel Aviv Seafront

Older buildings on Hayarkon and Herbert Samuel, with the view as the central proposition. Penthouses command the highest absolute pricing.

## Jaffa

Restored Arab stone houses, in long transformation. Prices: 75,000–140,000 NIS per square metre.

## Ramat Aviv Gimel

The family residential answer, north of the Yarkon. Prices: 45,000–70,000 NIS per square metre.

## How international families choose

**Pied-à-terre buyers** → Rothschild, Neve Tzedek, or seafront towers.
**Relocating families with children** → Old North or Ramat Aviv Gimel.
**Yield-focused buyers** → Rothschild or Old North.
**Heritage buyers** → Neve Tzedek, Jaffa, or central Bauhaus Rothschild.

See [Tel Aviv luxury apartments](/en/villes/tel-aviv) or [contact our team](/en/contact).

## FAQ

**Which Tel Aviv neighborhood has the highest prices?**
Park Tzameret and Sarona trophy floors — exceeding 150,000 NIS/m².

**Best neighborhood for rental yield?**
Rothschild and the Old North.`,
      he: `תל אביב צעירה ממה שהמחירים שלה מציעים.

## נווה צדק

המקטע היוקרתי המובחן ביותר בעיר. בתי אבן בני שתיים-שלוש קומות עם גגות רעפים משופעים. מחירים: 80,000–130,000 ₪ למ"ר.

## שדרות רוטשילד

עמוד השדרה של הבאוהאוס. מחירים: 75,000–120,000 ₪ למ"ר.

## הצפון הישן

מחירים: 60,000–95,000 ₪ למ"ר.

## שרונה ופארק צמרת

הצהרת היוקרה המודרנית. הקומות העליונות חוצות 150,000 ₪ למ"ר.

## חוף הים של תל אביב

הפנטהאוזים מובילים את התמחור המוחלט הגבוה ביותר.

## יפו

מחירים: 75,000–140,000 ₪ למ"ר.

## רמת אביב ג'

מחירים: 45,000–70,000 ₪ למ"ר.

ראה [דירות יוקרה בתל אביב](/he/villes/tel-aviv) או [צור קשר](/he/contact).`,
    },
    relatedSlugs: [
      'tel-aviv-vs-jerusalem-investissement',
      'meilleurs-quartiers-luxe-jerusalem',
      'herzliya-pituah-caesarea-ultra-prime',
    ],
    internalLinks: {
      ville: ['tel-aviv'],
      quartier: ['neve-tzedek', 'rothschild', 'old-north'],
    },
  },
  /* ────────────────────────────────────────────────────── */
  {
    slug: 'herzliya-pituah-caesarea-ultra-prime',
    publishedAt: '2026-05-01',
    readMinutes: 10,
    category: { fr: 'Ultra-Prime', en: 'Ultra-Prime', he: 'אולטרה-פרימיום' },
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1600&auto=format&fit=crop&q=80',
    imageAlt: {
      fr: 'Villa moderne avec piscine donnant sur la Méditerranée',
      en: 'Modern villa with pool overlooking the Mediterranean',
      he: 'וילה מודרנית עם בריכה הפונה לים התיכון',
    },
    seoTitle: {
      fr: 'Herzliya Pituah et Césarée : le marché côtier ultra-prime d\'Israël',
      en: "Herzliya Pituah & Caesarea: Israel's Ultra-Prime Coastal Market",
      he: 'הרצליה פיתוח וקיסריה: שוק החוף האולטרה-פרימיום של ישראל',
    },
    metaDescription: {
      fr: "Au cœur des deux enclaves méditerranéennes qui définissent l'ultra-luxe israélien — Herzliya Pituah et Césarée.",
      en: 'Inside the two Mediterranean enclaves that define Israeli ultra-luxury — Herzliya Pituah and Caesarea.',
      he: 'מבט פנים על שתי המובלעות הים-תיכוניות שמגדירות את האולטרה-יוקרה הישראלית.',
    },
    h1: {
      fr: 'Herzliya Pituah et Césarée : le sous-marché côtier ultra-prime d\'Israël',
      en: "Herzliya Pituah and Caesarea: Israel's Ultra-Prime Coastal Submarket",
      he: 'הרצליה פיתוח וקיסריה: תת-שוק החוף האולטרה-פרימיום של ישראל',
    },
    excerpt: {
      fr: "Si Jérusalem est le marché patrimonial d'Israël et Tel Aviv son marché cosmopolite, le segment ultra-premium du pays appartient à une géographie plus calme — une bande de trente kilomètres de côte méditerranéenne.",
      en: "If Jerusalem is Israel's heritage market and Tel Aviv its cosmopolitan one, the country's ultra-prime tier belongs to a quieter geography altogether.",
      he: 'אם ירושלים היא שוק המורשת של ישראל ותל אביב הקוסמופוליטי שלה, השכבה האולטרה-פרימיום של המדינה שייכת לגיאוגרפיה שקטה יותר.',
    },
    body: {
      fr: `Si Jérusalem est le marché patrimonial d'Israël et Tel Aviv son marché cosmopolite, le segment ultra-premium du pays appartient à une géographie plus calme — une bande de trente kilomètres de côte méditerranéenne qui contient, entre deux communautés, la plus haute concentration de propriétés trophées de la région.

Herzliya Pituah et Césarée ne sont pas des villes au sens significatif. Ce sont des enclaves. Ensemble, elles détiennent peut-être deux mille résidences premium et un flux de transactions qui, en termes de dollars, rivalise avec des marchés métropolitains entiers.

## Herzliya Pituah : la Beverly Hills israélienne

Herzliya Pituah occupe la moitié occidentale de la ville d'Herzliya. Les rues sont calmes, les terrains grands selon les normes israéliennes (souvent 500 à 1 500 m²), et l'architecture principalement contemporaine.

La réputation du quartier de "Beverly Hills d'Israël" est bien méritée mais légèrement trompeuse. Herzliya Pituah n'est pas tape-à-l'œil. Les rues les plus prestigieuses — Galei Tchelet, HaShunit, Shvil HaSayar — sont caractérisées par de hauts murs de jardin, un aménagement paysager mature, et une absence marquée de richesse visible.

### L'architecture et les terrains

Les terrains qui seraient impensables dans le centre de Tel Aviv sont standards ici. Les constructions de villas font typiquement 400 à 900 m², avec les propriétés les plus significatives dépassant 1 500 m² sur des terrains de 2 000 m² ou plus.

Les rues les plus convoitées sont les plus proches de la mer. **Galei Tchelet**, avec accès direct à la mer depuis une poignée de villas, détient le sommet absolu du marché.

### Prix et ce qu'ils achètent

Une villa contemporaine de 500 à 700 m² sur un terrain standard se négocie actuellement entre 8 et 15 millions de dollars. Les propriétés en bord de mer sur Galei Tchelet : 20 à 40 millions. Les actifs trophées se négocient au-dessus de 50 millions dans des transactions occasionnelles qui deviennent rarement publiques.

## Césarée : l'héritage Rothschild

Césarée a une histoire d'origine différente. Fondée dans sa forme moderne dans les années 1950 à travers un partenariat entre la famille Rothschild et l'État d'Israël, la communauté siège sur des terres gérées par la Caesarea Development Corporation.

Le résultat est quelque chose d'inhabituel en Israël : une communauté résidentielle planifiée, à faible densité, organisée autour d'un terrain de golf, avec des contrôles architecturaux stricts.

### L'architecture

Les terrains sont plus grands qu'à Herzliya Pituah — typiquement 1 000 à 2 500 m² — et le code d'urbanisme priorise les jardins et la confidentialité visuelle. Le résultat est un environnement bâti qui se sent plus proche de la Côte d'Azur que de la plupart des banlieues israéliennes.

### Prix

Les transactions de villas dans les sections centrales de Césarée Aleph se situent typiquement entre 5 et 12 millions de dollars pour le stock premium standard. Les propriétés avec front de golf et vue mer : 15 à 30 millions.

## Comment les acheteurs choisissent entre elles

**Herzliya Pituah convient** aux acheteurs qui veulent la proximité de Tel Aviv — quinze à vingt-cinq minutes — et qui valorisent un quartier établi de niveau diplomatique.

**Césarée convient** aux acheteurs qui veulent une communauté plus autonome, qui valorisent le golf ou le paysage, et dont la base principale d'activité n'est pas le centre de Tel Aviv.

## La réalité off-market

Les deux communautés opèrent principalement en off-market. Pour les acheteurs entrant dans l'une ou l'autre communauté, l'approche de travail consiste à définir le brief de manière serrée et à travailler avec un conseiller ayant des relations établies dans le sous-marché spécifique.

Nos conseillers maintiennent des relations actives dans les deux communautés. Pour discuter d'un brief spécifique en confidentialité, veuillez [contacter notre équipe](/fr/contact). Pour une vue des [opportunités off-market actuelles](/fr/off-market), nos portefeuilles sont disponibles pour examen qualifié.

## Questions fréquentes

**Lequel est le plus prestigieux, Herzliya Pituah ou Césarée ?**
Les deux sont à peu près comparables au sommet de leurs gammes respectives.

**Quelle est la taille typique des villas sur ces marchés ?**
Herzliya Pituah : 400–900 m² sur terrains de 500–1 500 m². Césarée : 500–1 200 m² sur terrains de 1 000–2 500 m².

**Puis-je construire neuf dans l'une ou l'autre communauté ?**
À Herzliya Pituah, uniquement par démolition et reconstruction. À Césarée, par les programmes de libération de terrains.`,
      en: `If Jerusalem is Israel's heritage market and Tel Aviv its cosmopolitan one, the country's ultra-prime tier belongs to a quieter geography altogether — a thirty-kilometre stretch of Mediterranean coast.

Herzliya Pituah and Caesarea are not cities in any meaningful sense. They are enclaves. Together they hold perhaps two thousand prime residences.

## Herzliya Pituah: the Israeli Beverly Hills

Herzliya Pituah's defining characteristic is land. Villa builds typically run 400 to 900 m², with the most significant exceeding 1,500 m².

The most coveted streets sit closest to the sea — **Galei Tchelet** holds the absolute top of the market.

### Pricing

Standard prime villas: $8–15M. Sea-adjacent on Galei Tchelet: $20–40M. Trophy assets: above $50M.

## Caesarea: the Rothschild legacy

Founded in its modern form in the 1950s through a partnership between the Rothschild family and the State of Israel. Lots are larger — typically 1,000 to 2,500 m². The result feels closer to the French Riviera than to most Israeli suburbs.

### Pricing

Standard prime in Caesarea Aleph: $5–12M. Golf-frontage and sea-view: $15–30M.

## How buyers choose

**Herzliya Pituah suits** buyers wanting Tel Aviv proximity (15–25 minutes) and an established diplomatic-tier neighbourhood.

**Caesarea suits** buyers wanting a more self-contained community with golf, landscape, and lower density.

## The off-market reality

Both communities operate predominantly off-market. Public listings typically represent the lower end of the prime tier.

Our advisors maintain active relationships in both communities. To discuss a specific brief in confidence, please [contact our team](/en/contact). For [off-market opportunities](/en/off-market), our portfolios are available for qualified review.

## FAQ

**Which is more prestigious, Herzliya Pituah or Caesarea?**
Comparable at the top, but they appeal to different sensibilities.

**Typical villa size?**
Herzliya Pituah: 400–900 m². Caesarea: 500–1,200 m².

**Can I build new?**
Herzliya Pituah: only through teardown-rebuild. Caesarea: through controlled lot releases.`,
      he: `אם ירושלים היא שוק המורשת של ישראל ותל אביב הקוסמופוליטי שלה, השכבה האולטרה-פרימיום שייכת לגיאוגרפיה שקטה יותר — רצועה של שלושים קילומטרים של חוף ים תיכוני.

## הרצליה פיתוח: הביוורלי הילס הישראלי

המאפיין המגדיר של הרצליה פיתוח הוא קרקע. וילות בדרך כלל 400–900 מ"ר. הרחובות המבוקשים ביותר קרובים לים — **גלי תכלת**.

### תמחור

וילות פרמיום סטנדרטיות: 8–15 מיליון $. סמוכות לים: 20–40 מיליון $.

## קיסריה: מורשת רוטשילד

נוסדה בצורתה המודרנית בשנות ה-50 בשותפות בין משפחת רוטשילד למדינת ישראל. המגרשים גדולים יותר — בדרך כלל 1,000–2,500 מ"ר.

### תמחור

קיסריה א' פרימיום: 5–12 מיליון $. חזית גולף ונוף לים: 15–30 מיליון $.

## איך הקונים בוחרים

**הרצליה פיתוח** מתאימה לקונים שרוצים קרבה לתל אביב.

**קיסריה** מתאימה לקונים שרוצים קהילה עצמאית יותר עם גולף ונוף.`,
    },
    relatedSlugs: [
      'proprietes-off-market-israel-luxe',
      'meilleurs-quartiers-luxe-tel-aviv',
      'acheter-immobilier-israel-investisseur-etranger',
    ],
    internalLinks: { ville: ['herzliya-pituah'] },
  },
]

export function getArticleBySlug(slug: string): JournalArticle | undefined {
  return JOURNAL_ARTICLES.find((a) => a.slug === slug)
}

export function getRecentArticles(limit = 6, excludeSlug?: string): JournalArticle[] {
  return JOURNAL_ARTICLES
    .filter((a) => a.slug !== excludeSlug)
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
    .slice(0, limit)
}

export function getRelatedArticles(article: JournalArticle, limit = 3): JournalArticle[] {
  if (!article.relatedSlugs?.length) return getRecentArticles(limit, article.slug)
  return article.relatedSlugs
    .map((slug) => JOURNAL_ARTICLES.find((a) => a.slug === slug))
    .filter((a): a is JournalArticle => !!a)
    .slice(0, limit)
}
