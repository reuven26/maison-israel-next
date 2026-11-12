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

  /* ────────────────────────────────────────────────────── */
  {
    slug: 'top-5-transactions-immobilieres-israel-2026',
    publishedAt: '2026-05-22',
    readMinutes: 7,
    category: { fr: 'Marché', en: 'Market', he: 'שוק' },
    image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1600&auto=format&fit=crop&q=80',
    imageAlt: {
      fr: 'Penthouse de prestige avec vue sur Tel Aviv',
      en: 'Prestige penthouse overlooking Tel Aviv',
      he: 'פנטהאוז יוקרה עם נוף לתל אביב',
    },
    seoTitle: {
      fr: 'Top 5 des plus grosses transactions immobilières en Israël en 2026',
      en: 'Top 5 Largest Real Estate Transactions in Israel in 2026',
      he: '5 העסקאות הגדולות ביותר בנדל"ן בישראל ב-2026',
    },
    metaDescription: {
      fr: 'Penthouses Rothschild, villas Galei Tchelet, palais Mamilla : les cinq transactions immobilières les plus spectaculaires d\'Israël en 2026 et ce qu\'elles révèlent du marché ultra-prime.',
      en: 'Rothschild penthouses, Galei Tchelet villas, Mamilla palaces: the five most spectacular Israeli real estate deals of 2026 and what they reveal about the ultra-prime market.',
      he: 'פנטהאוזים ברוטשילד, וילות בגלי תכלת, ארמונות בממילא: חמש העסקאות המרשימות ביותר בישראל ב-2026.',
    },
    h1: {
      fr: 'Les cinq plus grosses transactions immobilières d\'Israël en 2026',
      en: 'The Five Largest Real Estate Transactions in Israel in 2026',
      he: 'חמש העסקאות הגדולות ביותר בישראל ב-2026',
    },
    excerpt: {
      fr: 'Des chiffres qui parlent : 32 M €, 28 M €, 24 M €. Les cinq signatures qui ont marqué le marché ultra-prime israélien cette année.',
      en: 'Numbers that speak: €32M, €28M, €24M. The five signatures that defined the Israeli ultra-prime market this year.',
      he: 'מספרים שמדברים: 32, 28, 24 מיליון אירו. חמש החתימות שהגדירו את שוק האולטרה-פרימיום הישראלי השנה.',
    },
    body: {
      fr: `Le marché ultra-prime israélien n'a jamais été aussi actif. Malgré la prudence affichée par la presse économique, 2026 restera l'année de transactions records, portées par une diaspora qui voit l'immobilier israélien comme un placement-refuge et un projet de vie.

## 1. Le penthouse Akirov à Tel Aviv — 32 M €

Vendu en mars à une famille d'investisseurs européens, ce duplex de 480 m² au sommet de la tour Akirov bat le record de prix au mètre carré jamais enregistré à Tel Aviv : plus de 65 000 € le m². Vue 360°, deux piscines privées, ascenseur direct.

## 2. La villa Galei Tchelet à Herzliya Pituah — 28 M €

Une villa contemporaine en première ligne de mer, signée par un architecte international, vendue à une famille américaine en moins de trois mois. Le record absolu pour Herzliya Pituah cette décennie.

## 3. Le triplex Mamilla à Jérusalem — 24 M €

Un triplex de 320 m² avec vue directe sur les murailles de la Vieille Ville, acquis par un investisseur saoudien via une structure néerlandaise. Symbolique : la première vente d'une telle ampleur au cœur de Mamilla.

## 4. Le penthouse Sde Dov — 18 M €

Premier penthouse livré du nouveau quartier de Sde Dov, vendu off-market avant même la fin des travaux. Le signal que Sde Dov devient l'adresse ultra-prime de la prochaine décennie.

## 5. La résidence Caesarea Golf — 16 M €

Une villa avec accès direct au parcours de golf et front de mer, vendue à un acheteur sud-africain. Le marché de Césarée continue sa montée en gamme avec une discrétion exemplaire.

## Ce que ces signatures révèlent

Quatre tendances émergent : la diaspora francophone et anglophone reste motrice ; les transactions off-market représentent plus de 60 % du segment ultra-prime ; les délais se raccourcissent (souvent moins de 90 jours) ; et de nouveaux quartiers — Sde Dov, Mamilla — entrent dans la cour des grands.`,
      en: `Israel's ultra-prime market has never been more active. Despite the caution shown in the economic press, 2026 will be remembered as a record year, driven by a diaspora that sees Israeli real estate as both a safe-haven asset and a life project.

## 1. The Akirov penthouse, Tel Aviv — €32M

Sold in March to a European investor family, this 480 m² duplex at the top of the Akirov tower breaks the all-time per-square-meter record in Tel Aviv: over €65,000 per m². 360° views, two private pools, direct elevator.

## 2. The Galei Tchelet villa, Herzliya Pituah — €28M

A contemporary seafront villa designed by an international architect, sold to an American family in under three months. The absolute record for Herzliya Pituah this decade.

## 3. The Mamilla triplex, Jerusalem — €24M

A 320 m² triplex with direct views of the Old City walls, acquired by a Saudi investor through a Dutch structure. A symbolic first: a sale of this scale at the heart of Mamilla.

## 4. The Sde Dov penthouse — €18M

The first penthouse delivered in the new Sde Dov district, sold off-market before construction was even complete. The signal that Sde Dov is becoming the ultra-prime address of the next decade.

## 5. The Caesarea Golf residence — €16M

A villa with direct access to the golf course and seafront, sold to a South African buyer. The Caesarea market continues its discreet rise to the very top.

## What these signatures reveal

Four trends emerge: the French- and English-speaking diaspora remains the driver; off-market transactions account for over 60% of the ultra-prime segment; timelines are shrinking (often under 90 days); and new neighborhoods — Sde Dov, Mamilla — are entering the major league.`,
      he: `שוק האולטרה-פרימיום הישראלי מעולם לא היה פעיל יותר. למרות הזהירות בעיתונות הכלכלית, 2026 תיזכר כשנת שיא, מונעת על ידי דיאספורה שרואה בנדל"ן הישראלי גם נכס מקלט וגם פרויקט חיים.

## 1. פנטהאוז אקירוב, תל אביב — 32 מיליון אירו

נמכר במרץ למשפחת משקיעים אירופאית, דופלקס של 480 מ"ר בראש מגדל אקירוב שובר את שיא המחיר למ"ר בתל אביב: מעל 65,000 אירו למ"ר.

## 2. וילת גלי תכלת, הרצליה פיתוח — 28 מיליון אירו

וילה עכשווית בקו ים ראשון, בתכנון אדריכל בינלאומי, נמכרה למשפחה אמריקאית בפחות משלושה חודשים. שיא מוחלט להרצליה פיתוח בעשור הנוכחי.

## 3. טריפלקס ממילא, ירושלים — 24 מיליון אירו

טריפלקס של 320 מ"ר עם נוף ישיר לחומות העיר העתיקה, שנרכש על ידי משקיע סעודי באמצעות מבנה הולנדי.

## 4. פנטהאוז שדה דב — 18 מיליון אירו

הפנטהאוז הראשון שנמסר בשכונת שדה דב החדשה, נמכר מחוץ לשוק עוד לפני סיום הבנייה. סימן ששדה דב הופכת לכתובת האולטרה-פרימיום של העשור הבא.

## 5. רזידנס קיסריה גולף — 16 מיליון אירו

וילה עם גישה ישירה למסלול הגולף ולים, נמכרה לקונה דרום אפריקני.

## מה החתימות האלה חושפות

ארבע מגמות עולות: הדיאספורה דוברת הצרפתית והאנגלית נשארת המנוע; עסקאות מחוץ לשוק מהוות מעל 60% מהמגזר; לוחות הזמנים מתקצרים; שכונות חדשות נכנסות לליגה הגבוהה.`,
    },
    relatedSlugs: ['proprietes-off-market-israel-luxe', 'herzliya-pituah-caesarea-ultra-prime'],
    internalLinks: { ville: ['tel-aviv', 'herzliya-pituah', 'jerusalem'] },
  },

  /* ────────────────────────────────────────────────────── */
  {
    slug: 'penthouse-rothschild-vendu-24-heures-off-market',
    publishedAt: '2026-05-15',
    readMinutes: 5,
    category: { fr: 'Off-Market', en: 'Off-Market', he: 'מחוץ לשוק' },
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1600&auto=format&fit=crop&q=80',
    imageAlt: {
      fr: 'Vue depuis un penthouse Rothschild à Tel Aviv',
      en: 'View from a Rothschild penthouse in Tel Aviv',
      he: 'נוף מפנטהאוז ברוטשילד תל אביב',
    },
    seoTitle: {
      fr: 'Comment un penthouse Rothschild s\'est vendu en 24 heures',
      en: 'How a Rothschild Penthouse Sold in 24 Hours',
      he: 'איך פנטהאוז ברוטשילד נמכר ב-24 שעות',
    },
    metaDescription: {
      fr: 'L\'anatomie d\'une transaction off-market à 8,2 M €. Récit d\'une vente conclue avant même son inscription sur un portail.',
      en: 'The anatomy of an €8.2M off-market transaction. The story of a deal closed before it ever reached a portal.',
      he: 'האנטומיה של עסקה של 8.2 מיליון אירו מחוץ לשוק.',
    },
    h1: {
      fr: 'Comment un penthouse Rothschild s\'est vendu en vingt-quatre heures',
      en: 'How a Rothschild Penthouse Sold in Twenty-Four Hours',
      he: 'איך פנטהאוז ברוטשילד נמכר בעשרים וארבע שעות',
    },
    excerpt: {
      fr: 'Sept appels. Une visite. Une signature. Le récit d\'une transaction off-market qui résume le marché ultra-prime de Tel Aviv en 2026.',
      en: 'Seven calls. One viewing. One signature. The story of an off-market deal that captures the 2026 Tel Aviv ultra-prime market.',
      he: 'שבע שיחות. ביקור אחד. חתימה אחת. סיפור עסקה שמסכמת את שוק הפרמיום של תל אביב ב-2026.',
    },
    body: {
      fr: `Un mardi matin de mars, l'un de nos conseillers reçoit un message vocal sur WhatsApp. Un propriétaire historique du boulevard Rothschild envisage de céder son penthouse — discrètement, sans inscription publique. Vingt-quatre heures plus tard, le bien est sous compromis pour 8,2 millions d'euros.

## L'appel du mardi matin

Le bien : un duplex de 220 m² avec terrasse de 80 m², dans un immeuble Bauhaus classé UNESCO. Le propriétaire ne souhaitait ni visite à répétition, ni publication, ni négociation prolongée. Conditions claires : un acheteur sérieux, une seule offre, une signature dans la semaine.

## Sept appels en deux heures

Nous tenons un fichier privé de moins de cinquante familles activement à la recherche d'un bien à Tel Aviv au-dessus de 5 M €. En deux heures, sept conversations ont eu lieu. Trois familles ont décliné par calendrier. Deux ont demandé des photos. Une a souhaité visiter le lendemain. La septième, basée à Genève, a demandé une visite le jour même par Zoom.

## La visite virtuelle qui change tout

Notre conseillère sur place a filmé l'appartement pendant quarante minutes : chaque pièce, chaque vue, chaque détail. À 17 h, l'acheteur genevois envoyait une offre ferme par mail à 8,2 M € — soit le prix demandé, sans négociation.

## Pourquoi ça marche

Trois conditions doivent être réunies : un vendeur qui valorise la discrétion plus que le prix maximal théorique ; un acheteur déjà qualifié avec ses financements en place ; un intermédiaire qui connaît assez bien les deux parties pour orchestrer la rencontre en quelques heures.

Ce penthouse n'aurait jamais été visible sur un portail. C'est précisément ce qui en a fait la valeur — pour le vendeur, comme pour l'acheteur.`,
      en: `On a Tuesday morning in March, one of our advisors received a WhatsApp voice message. A long-time owner on Rothschild Boulevard was considering selling his penthouse — discreetly, without public listing. Twenty-four hours later, the property was under contract at €8.2 million.

## The Tuesday morning call

The property: a 220 m² duplex with an 80 m² terrace, in a UNESCO-listed Bauhaus building. The owner wanted no repeated viewings, no publication, no extended negotiation. Clear terms: one serious buyer, one offer, a signature within the week.

## Seven calls in two hours

We maintain a private list of fewer than fifty families actively searching for property above €5M in Tel Aviv. In two hours, seven conversations took place. Three families declined for timing reasons. Two requested photos. One wanted to visit the next day. The seventh, based in Geneva, asked for a same-day Zoom viewing.

## The virtual visit that changed everything

Our on-site advisor filmed the apartment for forty minutes: every room, every view, every detail. By 5 PM, the Geneva buyer sent a binding offer by email at €8.2M — the asking price, no negotiation.

## Why it works

Three conditions must align: a seller who values discretion above the theoretical maximum price; a pre-qualified buyer with financing in place; an intermediary who knows both parties well enough to orchestrate the meeting within hours.

This penthouse would never have been visible on a portal. That is exactly what made it valuable — for the seller as much as the buyer.`,
      he: `בבוקר שלישי במרץ, אחד היועצים שלנו קיבל הודעה קולית בוואטסאפ. בעלים ותיק בשדרות רוטשילד שקל למכור את הפנטהאוז שלו — בדיסקרטיות, ללא רישום ציבורי. עשרים וארבע שעות לאחר מכן, הנכס היה בחוזה ב-8.2 מיליון אירו.

## השיחה של בוקר שלישי

הנכס: דופלקס של 220 מ"ר עם מרפסת של 80 מ"ר, בבניין באוהאוס בשימור אונסק"ו. הבעלים רצה: ביקור אחד, הצעה אחת, חתימה תוך שבוע.

## שבע שיחות בשעתיים

יש לנו רשימה פרטית של פחות מחמישים משפחות שמחפשות נכס מעל 5 מיליון אירו בתל אביב. בשעתיים נערכו שבע שיחות. השביעית, ממקום מושבה בז'נבה, ביקשה ביקור באותו יום בזום.

## הביקור הווירטואלי ששינה הכול

היועצת שלנו צילמה את הדירה במשך ארבעים דקות. ב-17:00, הקונה מז'נבה שלח הצעה מחייבת במייל ב-8.2 מיליון אירו — מחיר המבוקש, ללא משא ומתן.

## למה זה עובד

שלושה תנאים חייבים להתקיים: מוכר שמעריך דיסקרטיות יותר מהמחיר המקסימלי; קונה מוכן עם מימון; מתווך שמכיר את שני הצדדים מספיק טוב.

הפנטהאוז הזה מעולם לא היה גלוי בפורטל. זה בדיוק מה שעשה אותו בעל ערך.`,
    },
    relatedSlugs: ['top-5-transactions-immobilieres-israel-2026', 'proprietes-off-market-israel-luxe'],
    internalLinks: { quartier: ['rothschild'] },
  },

  /* ────────────────────────────────────────────────────── */
  {
    slug: 'sde-dov-nouvelle-adresse-ultra-prime-tel-aviv',
    publishedAt: '2026-05-08',
    readMinutes: 7,
    category: { fr: 'Quartiers', en: 'Neighborhoods', he: 'שכונות' },
    image: 'https://images.unsplash.com/photo-1545241047-6083a3684587?w=1600&auto=format&fit=crop&q=80',
    imageAlt: {
      fr: 'Le nouveau front de mer de Sde Dov à Tel Aviv',
      en: 'The new Sde Dov seafront in Tel Aviv',
      he: 'חזית הים החדשה של שדה דב בתל אביב',
    },
    seoTitle: {
      fr: 'Sde Dov : la nouvelle adresse ultra-prime de Tel Aviv',
      en: 'Sde Dov: Tel Aviv\'s New Ultra-Prime Address',
      he: 'שדה דב: הכתובת האולטרה-פרימיום החדשה של תל אביב',
    },
    metaDescription: {
      fr: 'Anciennement aéroport, désormais front de mer ultra-prime. Décryptage du quartier qui redéfinit Tel Aviv et ses prix au mètre carré.',
      en: 'Former airport, now ultra-prime seafront. A deep dive into the neighborhood reshaping Tel Aviv and its price per square meter.',
      he: 'לשעבר שדה תעופה, כיום חזית ים אולטרה-פרימיום. ניתוח מעמיק של השכונה שמשנה את תל אביב.',
    },
    h1: {
      fr: 'Sde Dov : pourquoi ce quartier redéfinit le haut de gamme à Tel Aviv',
      en: 'Sde Dov: Why This Neighborhood Is Redefining High-End Tel Aviv',
      he: 'שדה דב: מדוע השכונה הזו מגדירה מחדש את היוקרה בתל אביב',
    },
    excerpt: {
      fr: 'Un aéroport reconverti en kilomètre de littoral premium. Sde Dov est devenu, en moins de cinq ans, l\'adresse la plus convoitée des nouveaux acheteurs internationaux.',
      en: 'An airport turned into a kilometer of premium coastline. In under five years, Sde Dov has become the most coveted address for new international buyers.',
      he: 'שדה תעופה שהפך לקילומטר של חוף פרמיום. בפחות מחמש שנים, שדה דב הפכה לכתובת הנחשקת ביותר.',
    },
    body: {
      fr: `Pendant des décennies, le nord-ouest de Tel Aviv était occupé par un aéroport militaire et civil. Avec sa fermeture définitive et son réaménagement, Sde Dov est devenu en cinq ans le projet urbain le plus ambitieux d'Israël — et la nouvelle frontière de l'immobilier ultra-prime.

## Une page blanche au bord de la mer

Là où les avions atterrissaient s'élèvent désormais des tours résidentielles signées par des architectes internationaux, une promenade côtière prolongeant celle de la vieille ville, des écoles internationales, et plusieurs hôtels cinq étoiles en projet. Tout est neuf — sans le cachet historique de Neve Tzedek, mais avec quelque chose qui n'existe nulle part ailleurs à Tel Aviv : de l'espace, de la lumière, et le bruit des vagues.

## Les prix : entre 30 000 et 50 000 € le m²

Les premiers programmes livrés s'échangent entre 30 000 et 40 000 € le m² pour des appartements standards, et 50 000 € le m² pour les penthouses avec vue mer panoramique. À titre de comparaison, Rothschild oscille entre 25 000 et 35 000 € le m², mais avec un parc immobilier ancien.

## Le profil des acheteurs

Différent de celui de Neve Tzedek ou Rothschild. À Sde Dov, on trouve davantage de familles internationales qui veulent du neuf, du parking en sous-sol, des conciergeries 24/7. Les acheteurs francophones représentent près de 30 % du segment, suivis par les Américains et les Sud-Africains.

## Ce qui va se passer

Trois éléments à surveiller : la livraison des dernières tours du projet (2027-2028), l'ouverture de la station de la ligne mauve du métro tel-avivien, et l'arrivée des premières marques de luxe internationales (un Aman Hotel est annoncé). Sde Dov n'est pas une mode — c'est une infrastructure qui réécrit la géographie premium de Tel Aviv.`,
      en: `For decades, northwest Tel Aviv was occupied by a military and civilian airport. With its final closure and redevelopment, Sde Dov has, in five years, become Israel's most ambitious urban project — and the new frontier of ultra-prime real estate.

## A blank page by the sea

Where planes once landed now stand residential towers designed by international architects, a coastal promenade extending that of the old city, international schools, and several five-star hotels in development. Everything is new — without the historic character of Neve Tzedek, but with something that exists nowhere else in Tel Aviv: space, light, and the sound of the waves.

## Prices: between €30,000 and €50,000 per m²

The first delivered projects trade between €30,000 and €40,000 per m² for standard apartments, and €50,000 per m² for penthouses with panoramic sea views. For comparison, Rothschild ranges between €25,000 and €35,000 per m², but with older stock.

## The buyer profile

Different from Neve Tzedek or Rothschild. In Sde Dov, you find more international families wanting new construction, underground parking, 24/7 concierge service. French-speaking buyers represent nearly 30% of the segment, followed by Americans and South Africans.

## What's coming

Three things to watch: delivery of the project's final towers (2027-2028), the opening of the Tel Aviv Metro's purple line station, and the arrival of the first international luxury brands (an Aman Hotel has been announced). Sde Dov is not a fashion — it is infrastructure rewriting Tel Aviv's premium geography.`,
      he: `במשך עשורים, צפון-מערב תל אביב היה שדה תעופה צבאי ואזרחי. עם סגירתו הסופית ופיתוחו מחדש, שדה דב הפכה תוך חמש שנים לפרויקט העירוני השאפתני ביותר בישראל — והגבול החדש של נדל"ן האולטרה-פרימיום.

## דף לבן ליד הים

במקום שבו מטוסים נחתו, מתנשאים כיום מגדלי מגורים בתכנון אדריכלים בינלאומיים, טיילת חוף שמאריכה את זו של העיר הישנה, בתי ספר בינלאומיים, ומספר מלונות חמישה כוכבים בתכנון.

## המחירים: בין 30,000 ל-50,000 אירו למ"ר

הפרויקטים הראשונים שנמסרו נסחרים בין 30,000 ל-40,000 אירו למ"ר לדירות סטנדרטיות, ו-50,000 אירו למ"ר לפנטהאוזים עם נוף ים פנורמי.

## פרופיל הקונים

שונה מנווה צדק או רוטשילד. בשדה דב מוצאים יותר משפחות בינלאומיות שרוצות בנייה חדשה. קונים דוברי צרפתית מהווים כמעט 30% מהמגזר.

## מה עומד לקרות

שלושה דברים לעקוב: מסירת המגדלים האחרונים (2027-2028), פתיחת תחנת הקו הסגול של מטרו תל אביב, והגעת המותגים הבינלאומיים הראשונים.`,
    },
    relatedSlugs: ['meilleurs-quartiers-luxe-tel-aviv', 'top-5-transactions-immobilieres-israel-2026'],
    internalLinks: { quartier: ['sde-dov'], ville: ['tel-aviv'] },
  },

  /* ────────────────────────────────────────────────────── */
  {
    slug: 'mamilla-vivre-aux-portes-vieille-ville-jerusalem',
    publishedAt: '2026-04-28',
    readMinutes: 6,
    category: { fr: 'Quartiers', en: 'Neighborhoods', he: 'שכונות' },
    image: 'https://images.unsplash.com/photo-1559564484-e54bdc2d7c93?w=1600&auto=format&fit=crop&q=80',
    imageAlt: {
      fr: 'Mamilla et les murailles de la Vieille Ville de Jérusalem',
      en: 'Mamilla and the walls of the Old City of Jerusalem',
      he: 'ממילא וחומות העיר העתיקה בירושלים',
    },
    seoTitle: {
      fr: 'Mamilla : vivre aux portes de la Vieille Ville de Jérusalem',
      en: 'Mamilla: Living at the Gates of Jerusalem\'s Old City',
      he: 'ממילא: לחיות בשערי העיר העתיקה',
    },
    metaDescription: {
      fr: 'Résidences Waldorf-Astoria, David\'s Village, King David Crown : le quartier où Jérusalem rencontre l\'ultra-luxe international.',
      en: 'Waldorf-Astoria Residences, David\'s Village, King David Crown: the neighborhood where Jerusalem meets international ultra-luxury.',
      he: 'מגדלי ולדורף אסטוריה, כפר דוד, כתר דוד המלך: השכונה שבה ירושלים פוגשת יוקרה בינלאומית.',
    },
    h1: {
      fr: 'Mamilla : le luxe à dix mètres des murailles de la Vieille Ville',
      en: 'Mamilla: Luxury Ten Meters from the Old City Walls',
      he: 'ממילא: יוקרה במרחק עשרה מטרים מחומות העיר העתיקה',
    },
    excerpt: {
      fr: 'Ni vraiment moderne, ni vraiment ancien. Mamilla a inventé une troisième voie : celle d\'une résidence de luxe internationale ancrée dans les pierres millénaires de Jérusalem.',
      en: 'Neither truly modern nor truly old. Mamilla has invented a third path: international luxury residence anchored in the millennial stones of Jerusalem.',
      he: 'לא ממש מודרני, לא ממש עתיק. ממילא המציאה דרך שלישית.',
    },
    body: {
      fr: `Aucun quartier d'Israël ne ressemble à Mamilla. À quelques pas de la porte de Jaffa, dans l'ombre des murailles ottomanes, s'est développé en vingt ans le quartier le plus international de Jérusalem — sans rien perdre de sa profondeur historique.

## Une création récente sur un sol éternel

Mamilla, dans son visage actuel, est récent : le centre commercial à ciel ouvert a ouvert en 2007, les résidences David's Village et Waldorf-Astoria datent des années 2010. Mais le quartier lui-même est l'un des plus anciens de Jérusalem, à la jonction entre la Vieille Ville et la Nouvelle.

## Trois adresses qui définissent le quartier

**Waldorf-Astoria Residences** : résidence de luxe rattachée à l'hôtel, services 5 étoiles intégrés, appartements entre 5 et 15 M €.

**David's Village** : ensemble de maisons en pierre de Jérusalem inspirées de l'architecture ottomane, avec piscines et services communs, entre 4 et 9 M €.

**King David Crown** : projet plus confidentiel, vue directe sur les murailles, livré en 2024, entre 6 et 18 M € selon la surface.

## La clientèle

Diaspora américaine en majorité, suivie des Français, des Sud-Africains et — phénomène plus récent — des familles d'Amérique latine. Beaucoup achètent comme résidence secondaire ou pour les périodes de fêtes juives, ce qui crée un marché locatif premium très actif.

## Pourquoi Mamilla est unique

Aucun autre quartier au monde n'offre cette combinaison : un standing international, des services hôteliers, et une fenêtre directe sur l'un des lieux les plus chargés d'histoire de la planète. C'est précisément ce qui justifie les prix — et pourquoi le marché de revente y est l'un des plus dynamiques de Jérusalem.`,
      en: `No neighborhood in Israel resembles Mamilla. A few steps from the Jaffa Gate, in the shadow of the Ottoman walls, in twenty years has emerged Jerusalem's most international quarter — without losing any of its historical depth.

## A recent creation on eternal ground

Mamilla, in its current face, is recent: the open-air shopping center opened in 2007, the David's Village and Waldorf-Astoria residences date from the 2010s. But the neighborhood itself is one of Jerusalem's oldest, at the junction between the Old City and the New.

## Three addresses that define the area

**Waldorf-Astoria Residences**: luxury residence attached to the hotel, integrated 5-star services, apartments between €5M and €15M.

**David's Village**: a complex of Jerusalem-stone houses inspired by Ottoman architecture, with pools and shared services, between €4M and €9M.

**King David Crown**: a more confidential project, direct view of the walls, delivered in 2024, between €6M and €18M depending on size.

## The clientele

Mostly American diaspora, followed by French, South African, and — a more recent phenomenon — Latin American families. Many buy as a secondary residence or for Jewish holiday periods, which creates a very active premium rental market.

## Why Mamilla is unique

No other neighborhood in the world offers this combination: international standing, hotel services, and a direct window onto one of the most historically charged places on the planet. That is precisely what justifies the prices — and why the resale market is among Jerusalem's most dynamic.`,
      he: `אין שכונה בישראל הדומה לממילא. במרחק של מספר צעדים משער יפו, בצל החומות העות'מאניות, התפתחה בעשרים שנה השכונה הבינלאומית ביותר של ירושלים — מבלי לאבד דבר מעומקה ההיסטורי.

## יצירה חדשה על אדמה נצחית

ממילא בפניה הנוכחיים היא חדשה: המרכז המסחרי נפתח ב-2007, מגדלי כפר דוד וולדורף-אסטוריה מהשנים העשר.

## שלוש כתובות שמגדירות את השכונה

**Waldorf-Astoria Residences**: דירות בין 5 ל-15 מיליון אירו.

**כפר דוד**: בתי אבן ירושלמית בהשראת אדריכלות עות'מאנית, בין 4 ל-9 מיליון אירו.

**King David Crown**: פרויקט חסוי יותר, נוף ישיר לחומות, בין 6 ל-18 מיליון אירו.

## הקהל

דיאספורה אמריקאית ברובה, ולאחריה צרפתים, דרום אפריקאים — ולאחרונה משפחות מדרום אמריקה.

## למה ממילא ייחודית

אף שכונה אחרת בעולם לא מציעה את השילוב הזה: סטנדרט בינלאומי, שירותי מלון, וחלון ישיר לאחד המקומות הטעונים ביותר היסטורית בכוכב הלכת.`,
    },
    relatedSlugs: ['top-5-transactions-immobilieres-israel-2026', 'meilleurs-quartiers-luxe-jerusalem'],
    internalLinks: { quartier: ['mamilla'], ville: ['jerusalem'] },
  },

  /* ────────────────────────────────────────────────────── */
  {
    slug: 'pourquoi-diaspora-francophone-choisit-israel-2026',
    publishedAt: '2026-04-20',
    readMinutes: 7,
    category: { fr: 'Tendances', en: 'Trends', he: 'מגמות' },
    image: 'https://images.unsplash.com/photo-1542361345-89e58247f2d5?w=1600&auto=format&fit=crop&q=80',
    imageAlt: {
      fr: 'Symboliques d\'une diaspora francophone qui choisit Israël',
      en: 'Symbols of a French-speaking diaspora choosing Israel',
      he: 'סמלים של דיאספורה דוברת צרפתית הבוחרת בישראל',
    },
    seoTitle: {
      fr: 'Pourquoi la diaspora francophone choisit Israël en 2026',
      en: 'Why the French-Speaking Diaspora Chooses Israel in 2026',
      he: 'מדוע הדיאספורה דוברת הצרפתית בוחרת בישראל ב-2026',
    },
    metaDescription: {
      fr: 'Climat politique, fiscalité, qualité de vie, projet familial : les quatre moteurs qui poussent les familles francophones à investir et s\'installer en Israël.',
      en: 'Political climate, taxation, quality of life, family project: the four drivers pushing French-speaking families to invest and settle in Israel.',
      he: 'אקלים פוליטי, מיסוי, איכות חיים, פרויקט משפחתי: ארבעה מנועים.',
    },
    h1: {
      fr: 'Pourquoi la diaspora francophone choisit Israël en 2026',
      en: 'Why the French-Speaking Diaspora Chooses Israel in 2026',
      he: 'מדוע הדיאספורה דוברת הצרפתית בוחרת בישראל ב-2026',
    },
    excerpt: {
      fr: 'Quatre moteurs convergent en 2026 pour transformer un mouvement diffus en flux structuré : le politique, le fiscal, l\'éducatif et le patrimonial.',
      en: 'Four drivers converge in 2026 to turn a diffuse movement into a structured flow: political, fiscal, educational, and wealth-related.',
      he: 'ארבעה מנועים מתכנסים ב-2026 והופכים תנועה מפוזרת לזרם מובנה.',
    },
    body: {
      fr: `Depuis trois ans, le profil de nos clients francophones a changé. Là où l'on rencontrait surtout des projets d'Aliyah à dix ans ou des résidences secondaires, on voit aujourd'hui des familles qui se réorganisent vite, transfèrent des actifs, et signent des compromis dans des délais qu'on n'avait jamais vus.

## 1. Le climat politique français et européen

Sans entrer dans les détails, le contexte sécuritaire et social en France et en Belgique pousse une partie de la communauté à diversifier ses ancrages. Israël reste, pour des raisons culturelles et identitaires, le premier choix de relocalisation pour les familles juives francophones.

## 2. La fiscalité avantageuse de l'Aliyah

Le statut d'Olé Hadash offre une exonération fiscale de dix ans sur les revenus de source étrangère, ainsi qu'une taxe d'achat immobilière fortement réduite. Pour une famille avec patrimoine, l'arbitrage fiscal devient un argument structurant.

## 3. L'éducation française à Tel Aviv et Jérusalem

Les lycées français Marc Chagall et Charles de Gaulle accueillent une demande croissante. La possibilité de maintenir un parcours scolaire francophone tout en vivant en Israël lève l'un des derniers freins à l'installation des familles avec adolescents.

## 4. La valorisation immobilière

L'immobilier israélien a doublé en quinze ans dans les segments premium, avec une volatilité plus faible que les autres marchés mondiaux comparables. Pour un patrimoine familial qui cherche à la fois rendement, valorisation et utilité personnelle, c'est une combinaison rare.

## Le résultat sur le marché

Concrètement : 60 % de nos nouveaux dossiers en 2026 viennent de familles francophones. Le panier moyen d'achat a augmenté de 35 % en deux ans. Les délais de décision se sont raccourcis : on est passé d'une moyenne de 14 mois entre la première visite et la signature en 2022, à moins de 7 mois aujourd'hui.

Ce n'est plus un mouvement souterrain. C'est un cycle structuré.`,
      en: `For three years now, the profile of our French-speaking clients has changed. Where we used to meet ten-year Aliyah projects or secondary residence buyers, we now see families reorganizing quickly, transferring assets, and signing contracts within timelines we had never seen.

## 1. The French and European political climate

Without going into detail, the security and social context in France and Belgium is pushing part of the community to diversify their anchorages. Israel remains, for cultural and identity reasons, the first relocation choice for French-speaking Jewish families.

## 2. The favorable taxation of Aliyah

The Olé Hadash status offers a ten-year tax exemption on foreign-source income, as well as a significantly reduced real estate purchase tax. For a family with assets, fiscal arbitrage becomes a structuring argument.

## 3. French education in Tel Aviv and Jerusalem

The Marc Chagall and Charles de Gaulle French schools welcome growing demand. The ability to maintain a French-speaking school path while living in Israel lifts one of the last barriers to families with teenagers settling.

## 4. Real estate appreciation

Israeli real estate has doubled in fifteen years in the premium segments, with lower volatility than comparable global markets. For family wealth seeking yield, appreciation, and personal use, this is a rare combination.

## The result on the market

Concretely: 60% of our new files in 2026 come from French-speaking families. The average purchase basket has risen 35% in two years. Decision timelines have shortened: from an average of 14 months between first visit and signature in 2022, to under 7 months today.

This is no longer an underground movement. It is a structured cycle.`,
      he: `במשך שלוש שנים, פרופיל הלקוחות דוברי הצרפתית שלנו השתנה. במקום פרויקטי עלייה לעשר שנים או דירות נופש, אנחנו רואים כיום משפחות שמתארגנות מחדש במהירות וחותמות על חוזים בזמנים שלא ראינו מעולם.

## 1. האקלים הפוליטי בצרפת ובאירופה

ההקשר הביטחוני והחברתי בצרפת ובבלגיה דוחף חלק מהקהילה לגוון את מקומות העיגון.

## 2. המיסוי המועדף של העלייה

מעמד עולה חדש מציע פטור ממס לעשר שנים על הכנסות מחו"ל, ומס רכישה מופחת משמעותית.

## 3. החינוך הצרפתי בתל אביב ובירושלים

הליסאיים הצרפתיים מארק שאגאל ושארל דה גול מקבלים ביקוש גובר.

## 4. השבחת הנדל"ן

הנדל"ן הישראלי הוכפל בחמש-עשרה שנים במגזרי הפרמיום.

## התוצאה בשוק

60% מהתיקים החדשים שלנו ב-2026 מגיעים ממשפחות דוברות צרפתית. סל הרכישה הממוצע עלה ב-35%. לוחות זמני ההחלטה התקצרו: מ-14 חודשים בממוצע ב-2022, לפחות מ-7 חודשים כיום.

זו לא תנועה מחתרתית. זה מחזור מובנה.`,
    },
    relatedSlugs: ['aliyah-doree-familles-francaises-investissent-avant', 'top-5-transactions-immobilieres-israel-2026'],
    internalLinks: {},
  },

  /* ────────────────────────────────────────────────────── */
  {
    slug: 'aliyah-doree-familles-francaises-investissent-avant',
    publishedAt: '2026-04-12',
    readMinutes: 8,
    category: { fr: 'Aliyah', en: 'Aliyah', he: 'עלייה' },
    image: 'https://images.unsplash.com/photo-1581281863883-2469417a1668?w=1600&auto=format&fit=crop&q=80',
    imageAlt: {
      fr: 'Drapeau israélien dans un cadre familial',
      en: 'Israeli flag in a family setting',
      he: 'דגל ישראל בהקשר משפחתי',
    },
    seoTitle: {
      fr: 'Aliyah dorée : ces familles françaises qui investissent avant de monter',
      en: 'Golden Aliyah: French Families Who Invest Before Making Aliyah',
      he: 'עלייה זהובה: משפחות צרפתיות שמשקיעות לפני העלייה',
    },
    metaDescription: {
      fr: 'Acheter un bien en Israël avant d\'obtenir son Teoudat Olé : pourquoi cette stratégie patrimoniale séduit les familles françaises et comment l\'optimiser fiscalement.',
      en: 'Buying property in Israel before obtaining your Teoudat Olé: why this wealth strategy appeals to French families and how to optimize it fiscally.',
      he: 'רכישת נכס בישראל לפני קבלת תעודת עולה: מדוע אסטרטגיה זו מושכת משפחות צרפתיות.',
    },
    h1: {
      fr: 'Aliyah dorée : les familles françaises qui investissent avant de monter',
      en: 'Golden Aliyah: The French Families Investing Before Making Aliyah',
      he: 'עלייה זהובה: המשפחות הצרפתיות שמשקיעות לפני העלייה',
    },
    excerpt: {
      fr: 'Acheter sa future résidence avant d\'obtenir son Teoudat Olé : une stratégie qui combine ancrage patrimonial, calendrier d\'installation et optimisation fiscale.',
      en: 'Buying your future residence before obtaining your Teoudat Olé: a strategy combining wealth anchoring, settlement calendar, and tax optimization.',
      he: 'רכישת דירת המגורים העתידית לפני קבלת תעודת עולה: אסטרטגיה משולבת.',
    },
    body: {
      fr: `Une nouvelle catégorie de clients s'est imposée en 2026 : les familles françaises qui achètent un bien immobilier en Israël deux à cinq ans avant d'effectuer leur Aliyah. Cette stratégie, qu'on pourrait appeler "Aliyah dorée", repose sur un calcul patrimonial fin — et soulève des questions fiscales précises.

## Le principe

Plutôt que d'attendre l'arrivée définitive en Israël pour acheter, ces familles franchissent le pas plus tôt : elles acquièrent une résidence (souvent leur future résidence principale), la louent en attendant, et organisent leur transition sur plusieurs années.

## Trois avantages

**1. Verrouiller le prix.** L'immobilier israélien augmente régulièrement. Acheter aujourd'hui à 4 M € un bien qui en vaudra 5 M € dans trois ans, c'est sécuriser un calendrier.

**2. Préparer le lieu de vie.** Quand l'Aliyah devient effective, la famille n'arrive pas dans le vide : le quartier est connu, les écoles repérées, le bien éventuellement déjà aménagé.

**3. Tester le marché locatif.** Louer le bien pendant la transition génère un revenu qui finance une partie du crédit, tout en validant la valeur locative du quartier.

## L'enjeu fiscal central

Acheter avant l'Aliyah implique d'être taxé comme non-résident : taxe d'achat de 8 à 10 % (au lieu de 0,5 % pour un Olé Hadash sur sa résidence principale). Sur un bien à 4 M €, l'écart représente environ 350 000 €.

## Comment optimiser

Trois approches existent :

- **Acheter sous une structure** (SCI israélienne ou holding) avant l'Aliyah, puis transférer après.
- **Acquérir une résidence secondaire d'abord** (à laquelle le bénéfice Olé Hadash ne s'applique pas), et acheter la résidence principale après l'Aliyah.
- **Attendre activement** : préparer le dossier, identifier le bien, négocier un compromis conditionné à l'obtention du Teoudat Olé.

Chacune a ses limites. Notre rôle, avec Avi Mizrahi, est de calculer le scénario optimal pour chaque famille — entre rendement, fiscalité et calendrier personnel.`,
      en: `A new client category emerged in 2026: French families buying property in Israel two to five years before making Aliyah. This strategy, which one could call "Golden Aliyah", rests on a refined wealth calculation — and raises precise tax questions.

## The principle

Rather than waiting for definitive arrival in Israel to buy, these families take the step earlier: they acquire a residence (often their future primary residence), rent it in the meantime, and organize their transition over several years.

## Three advantages

**1. Lock in the price.** Israeli real estate rises steadily. Buying today at €4M a property worth €5M in three years secures a timeline.

**2. Prepare the place of life.** When the Aliyah becomes effective, the family does not arrive in a vacuum: the neighborhood is known, schools identified, the property possibly already furnished.

**3. Test the rental market.** Renting the property during the transition generates income that finances part of the loan while validating the rental value of the neighborhood.

## The central tax issue

Buying before Aliyah means being taxed as a non-resident: 8% to 10% purchase tax (instead of 0.5% for an Olé Hadash on their primary residence). On a €4M property, the gap is around €350,000.

## How to optimize

Three approaches exist:

- **Buy through a structure** (Israeli SCI or holding) before Aliyah, then transfer afterwards.
- **Acquire a secondary residence first** (to which the Olé Hadash benefit does not apply), and buy the primary residence after Aliyah.
- **Wait actively**: prepare the file, identify the property, negotiate a contract conditional on obtaining the Teoudat Olé.

Each has its limits. Our role, with Avi Mizrahi, is to calculate the optimal scenario for each family — between yield, taxation, and personal calendar.`,
      he: `קטגוריית לקוחות חדשה התגבשה ב-2026: משפחות צרפתיות שרוכשות נכס בישראל שנתיים עד חמש שנים לפני העלייה.

## העיקרון

במקום לחכות להגעה הסופית לישראל כדי לקנות, משפחות אלה צועדות צעד מוקדם יותר.

## שלושה יתרונות

**1. נעילת המחיר.** רכישה היום ב-4 מיליון אירו של נכס שיהיה שווה 5 מיליון בעוד שלוש שנים.

**2. הכנת מקום החיים.** השכונה מוכרת, בתי הספר מזוהים.

**3. בדיקת שוק השכירות.** השכרת הנכס במהלך המעבר מייצרת הכנסה.

## סוגיית המס המרכזית

רכישה לפני עלייה משמעה מיסוי כתושב חוץ: מס רכישה של 8% עד 10% (במקום 0.5% לעולה חדש על דירת מגורים).

## איך לבצע אופטימיזציה

שלוש גישות קיימות:

- רכישה דרך מבנה (חברה ישראלית או החזקה) לפני העלייה.
- רכישת דירת נופש קודם, ודירת מגורים אחרי העלייה.
- המתנה פעילה: הכנת התיק, זיהוי הנכס, משא ומתן על חוזה מותנה.`,
    },
    relatedSlugs: ['pourquoi-diaspora-francophone-choisit-israel-2026', 'fiscalite-immobilier-israel-francais'],
    internalLinks: {},
  },

  /* ────────────────────────────────────────────────────── */
  {
    slug: 'tel-aviv-vs-herzliya-pituah-investir-5-millions',
    publishedAt: '2026-04-04',
    readMinutes: 8,
    category: { fr: 'Marché', en: 'Market', he: 'שוק' },
    image: 'https://images.unsplash.com/photo-1582610116397-edb318620f90?w=1600&auto=format&fit=crop&q=80',
    imageAlt: {
      fr: 'Vue aérienne du littoral israélien entre Tel Aviv et Herzliya',
      en: 'Aerial view of the Israeli coastline between Tel Aviv and Herzliya',
      he: 'מבט אווירי על חוף ישראל בין תל אביב להרצליה',
    },
    seoTitle: {
      fr: 'Tel Aviv vs Herzliya Pituah : où investir 5 millions d\'euros',
      en: 'Tel Aviv vs Herzliya Pituah: Where to Invest €5 Million',
      he: 'תל אביב מול הרצליה פיתוח: היכן להשקיע 5 מיליון אירו',
    },
    metaDescription: {
      fr: 'Penthouse Rothschild ou villa Galei Tchelet ? Comparaison ROI, valorisation, mode de vie et fiscalité pour un budget de 5 M €.',
      en: 'Rothschild penthouse or Galei Tchelet villa? Comparing ROI, appreciation, lifestyle, and taxation for a €5M budget.',
      he: 'פנטהאוז ברוטשילד או וילה בגלי תכלת? השוואה לתקציב 5 מיליון אירו.',
    },
    h1: {
      fr: 'Tel Aviv ou Herzliya Pituah : où placer 5 millions en immobilier israélien',
      en: 'Tel Aviv or Herzliya Pituah: Where to Place €5M in Israeli Real Estate',
      he: 'תל אביב או הרצליה פיתוח: היכן להשקיע 5 מיליון בנדל"ן',
    },
    excerpt: {
      fr: 'À 5 millions d\'euros, deux mondes s\'opposent : un grand appartement central à Tel Aviv, ou une villa contemporaine en bord de mer à Herzliya Pituah. Lequel choisir ?',
      en: 'At €5 million, two worlds compete: a large central apartment in Tel Aviv, or a contemporary seafront villa in Herzliya Pituah. Which to choose?',
      he: 'ב-5 מיליון אירו, שני עולמות מתמודדים: דירה גדולה ומרכזית בתל אביב, או וילה עכשווית בחוף הרצליה פיתוח.',
    },
    body: {
      fr: `Cinq millions d'euros en Israël, c'est exactement le seuil où la décision devient cornélienne. Le même budget vous achète un trois-pièces premium de 180 m² au cœur de Rothschild, ou une villa contemporaine de 450 m² avec piscine et jardin à dix minutes de l'aéroport.

## Tel Aviv : ce qu'on achète à 5 M €

Un appartement de 180 à 220 m², dans un immeuble Bauhaus rénové ou une tour signée, à Rothschild, Neve Tzedek ou le Vieux Nord. Parking en sous-sol, terrasse de 30 à 60 m², parfois piscine commune. Au cœur de la ville, à pied de tout.

**Rendement locatif :** 3 à 4 % brut. **Valorisation :** +5 à 7 % par an en moyenne sur dix ans.

## Herzliya Pituah : ce qu'on achète au même prix

Une villa de 400 à 500 m² sur un terrain de 600 à 1000 m², avec piscine, jardin paysagé, parfois vue sur la mer. Les meilleures adresses (Galei Tchelet, Nof Yam) restent au-delà de 8 M €, mais à 5 M € on trouve des villas remarquables dans les rues secondaires.

**Rendement locatif :** 2 à 3 % brut (la location de villa est plus lente). **Valorisation :** +4 à 6 % par an, plus volatile selon les cycles.

## Quatre critères de décision

**Mode de vie.** Tel Aviv = ville, sortie, restaurants, vie diplomatique. Herzliya = familial, calme, mer, communauté internationale.

**Liquidité.** Un appartement Tel Aviv se revend en 4 à 8 mois en moyenne ; une villa Herzliya, en 6 à 14 mois.

**Fiscalité.** Identique sur l'achat. La taxe foncière (Arnona) est légèrement plus élevée sur une villa que sur un appartement.

**Calendrier de vie.** Famille avec jeunes enfants et écoles internationales : Herzliya. Couple sans enfant ou cadre international : Tel Aviv.

## Notre recommandation 2026

Pour 5 M €, si l'horizon est l'investissement pur : Tel Aviv. Si c'est la qualité de vie pour une famille qui s'installe : Herzliya. Si vous hésitez, il est aussi possible de diviser : 3 M € sur un appartement Tel Aviv loué, 2 M € en apport sur une villa Herzliya. C'est une stratégie que nous montons régulièrement.`,
      en: `€5 million in Israel is exactly the threshold where the decision becomes cornering. The same budget buys you a premium 180 m² three-bedroom apartment in the heart of Rothschild, or a contemporary 450 m² villa with pool and garden ten minutes from the airport.

## Tel Aviv: what you buy at €5M

A 180 to 220 m² apartment, in a renovated Bauhaus building or a signature tower, on Rothschild, Neve Tzedek, or the Old North. Underground parking, 30 to 60 m² terrace, sometimes a shared pool. At the heart of the city, walking distance to everything.

**Rental yield:** 3 to 4% gross. **Appreciation:** +5 to 7% per year on average over ten years.

## Herzliya Pituah: what you buy at the same price

A 400 to 500 m² villa on a 600 to 1000 m² plot, with pool, landscaped garden, sometimes sea view. The best addresses (Galei Tchelet, Nof Yam) remain above €8M, but at €5M you find remarkable villas in secondary streets.

**Rental yield:** 2 to 3% gross (villa rental is slower). **Appreciation:** +4 to 6% per year, more volatile depending on cycles.

## Four decision criteria

**Lifestyle.** Tel Aviv = city, nightlife, restaurants, diplomatic life. Herzliya = family, calm, sea, international community.

**Liquidity.** A Tel Aviv apartment resells in 4 to 8 months on average; a Herzliya villa, in 6 to 14 months.

**Taxation.** Identical on purchase. Property tax (Arnona) is slightly higher on a villa than on an apartment.

**Life calendar.** Family with young children and international schools: Herzliya. Couple without children or international executive: Tel Aviv.

## Our 2026 recommendation

For €5M, if the horizon is pure investment: Tel Aviv. If it is quality of life for a settling family: Herzliya. If you hesitate, it is also possible to split: €3M on a rented Tel Aviv apartment, €2M as a down payment on a Herzliya villa. This is a strategy we structure regularly.`,
      he: `חמישה מיליון אירו בישראל זה בדיוק הסף שבו ההחלטה הופכת קשה. אותו תקציב קונה דירת שלושה חדרים פרימיום של 180 מ"ר בלב רוטשילד, או וילה עכשווית של 450 מ"ר בהרצליה פיתוח.

## תל אביב: מה קונים ב-5 מיליון אירו

דירה של 180 עד 220 מ"ר, ברוטשילד, נווה צדק או הצפון הישן.

**תשואת שכירות:** 3-4% ברוטו. **השבחה:** 5-7% בשנה בממוצע.

## הרצליה פיתוח: באותו מחיר

וילה של 400 עד 500 מ"ר על מגרש של 600 עד 1000 מ"ר.

**תשואת שכירות:** 2-3% ברוטו. **השבחה:** 4-6% בשנה.

## ארבעה קריטריוני החלטה

**אורח חיים.** תל אביב = עיר. הרצליה = משפחה.

**נזילות.** דירה בתל אביב נמכרת תוך 4-8 חודשים; וילה בהרצליה תוך 6-14 חודשים.

## ההמלצה שלנו ל-2026

ל-5 מיליון אירו: אם אופק ההשקעה טהור — תל אביב. אם זה איכות חיים — הרצליה.`,
    },
    relatedSlugs: ['herzliya-pituah-caesarea-ultra-prime', 'meilleurs-quartiers-luxe-tel-aviv'],
    internalLinks: { ville: ['tel-aviv', 'herzliya-pituah'] },
  },

  /* ────────────────────────────────────────────────────── */
  {
    slug: 'effet-trump-shekel-immobilier-israelien',
    publishedAt: '2026-03-25',
    readMinutes: 6,
    category: { fr: 'Marché', en: 'Market', he: 'שוק' },
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1600&auto=format&fit=crop&q=80',
    imageAlt: {
      fr: 'Marchés financiers et shekel israélien',
      en: 'Financial markets and Israeli shekel',
      he: 'שווקים פיננסיים והשקל הישראלי',
    },
    seoTitle: {
      fr: 'L\'effet Trump sur le shekel et l\'immobilier israélien',
      en: 'The Trump Effect on the Shekel and Israeli Real Estate',
      he: 'אפקט טראמפ על השקל ועל הנדל"ן הישראלי',
    },
    metaDescription: {
      fr: 'Comment la nouvelle administration américaine influence le shekel, les flux de capitaux vers Israël, et les opportunités d\'achat pour les investisseurs européens.',
      en: 'How the new US administration is influencing the shekel, capital flows to Israel, and buying opportunities for European investors.',
      he: 'כיצד הממשל האמריקאי החדש משפיע על השקל ועל הזדמנויות הרכישה.',
    },
    h1: {
      fr: 'L\'effet Trump sur le shekel et le marché immobilier israélien',
      en: 'The Trump Effect on the Shekel and Israel\'s Real Estate Market',
      he: 'אפקט טראמפ על השקל ושוק הנדל"ן הישראלי',
    },
    excerpt: {
      fr: 'Une administration américaine pro-Israël modifie les flux financiers internationaux. Conséquences directes sur le shekel, indirectes sur l\'immobilier — analyse pour acheteurs en euros.',
      en: 'A pro-Israel US administration is reshaping international capital flows. Direct consequences on the shekel, indirect ones on real estate — analysis for euro-based buyers.',
      he: 'ממשל אמריקאי פרו-ישראלי משנה זרמי הון בינלאומיים.',
    },
    body: {
      fr: `Depuis le retour de Donald Trump à la Maison Blanche, le shekel israélien a connu une appréciation marquée face à l'euro — passant de 4,10 à 3,75 sur les douze derniers mois. Cette variation de 8 % a des conséquences directes sur le coût d'achat immobilier pour les investisseurs européens.

## Le contexte macroéconomique

L'administration américaine actuelle est perçue par les marchés comme structurellement pro-Israël : accords financiers renforcés, levée de certaines restrictions sur les transferts, soutien diplomatique constant. Ce climat alimente une confiance accrue des investisseurs internationaux dans l'économie israélienne — et soutient mécaniquement la devise.

## L'effet sur l'immobilier

Un appartement affiché à 15 millions de shekels coûtait 3,66 M € fin 2024. Le même bien, sans changement de prix en shekel, coûte 4 M € aujourd'hui. Pour un acheteur en euros, c'est un renchérissement de 9 % sans qu'aucune transaction n'ait eu lieu sur le bien lui-même.

## La réaction des propriétaires israéliens

Conséquence : les vendeurs israéliens, conscients de l'appétit étranger, augmentent leurs prix d'affichage en shekel — ce qui amplifie l'effet pour l'acheteur en devise forte. Sur les douze derniers mois, les prix d'affichage premium à Tel Aviv ont augmenté de 6 à 9 % en shekel, et donc de 14 à 17 % en euros.

## Trois stratégies pour acheteurs en euros

**1. Verrouiller le change.** Plusieurs banques privées en Suisse et au Luxembourg proposent des forwards à 6 ou 12 mois sur EUR/ILS. Pour une transaction à venir, c'est une assurance utile.

**2. Convertir progressivement.** Plutôt que de transférer la totalité du montant en une fois, étaler la conversion sur trois à six mois lisse le risque de pic.

**3. Privilégier les biens libellés en euros.** Certains nouveaux programmes (notamment à Sde Dov et Herzliya Pituah) acceptent des contrats en euros directement. Ça neutralise le risque de change.

## Notre lecture

Tant que la nouvelle administration américaine reste en place, le shekel a peu de raisons structurelles de s'affaiblir. Pour les acheteurs européens qui hésitent, l'attente coûte. C'est un message inhabituel à délivrer dans un marché souvent perçu comme cyclique — mais c'est ce que les chiffres montrent.`,
      en: `Since Donald Trump's return to the White House, the Israeli shekel has appreciated markedly against the euro — moving from 4.10 to 3.75 over the past twelve months. This 8% variation has direct consequences on the cost of real estate purchases for European investors.

## The macroeconomic context

The current US administration is perceived by markets as structurally pro-Israel: strengthened financial agreements, lifting of certain transfer restrictions, constant diplomatic support. This climate fuels increased international investor confidence in the Israeli economy — and mechanically supports the currency.

## The effect on real estate

An apartment listed at 15 million shekels cost €3.66M at the end of 2024. The same property, with no change in shekel price, costs €4M today. For a euro buyer, that is a 9% rise without any transaction having taken place on the property itself.

## The reaction of Israeli sellers

The consequence: Israeli sellers, aware of foreign appetite, are raising their shekel listing prices — which amplifies the effect for the strong-currency buyer. Over the past twelve months, premium Tel Aviv listing prices have risen 6 to 9% in shekels, and therefore 14 to 17% in euros.

## Three strategies for euro buyers

**1. Lock in the exchange rate.** Several private banks in Switzerland and Luxembourg offer 6 or 12-month EUR/ILS forwards. For an upcoming transaction, this is useful insurance.

**2. Convert progressively.** Rather than transferring the entire amount at once, spreading the conversion over three to six months smooths the peak risk.

**3. Favor euro-denominated properties.** Some new projects (notably in Sde Dov and Herzliya Pituah) accept euro contracts directly. This neutralizes currency risk.

## Our reading

As long as the new US administration remains in place, the shekel has few structural reasons to weaken. For European buyers who hesitate, waiting costs. This is an unusual message to deliver in a market often perceived as cyclical — but it is what the numbers show.`,
      he: `מאז שובו של דונלד טראמפ לבית הלבן, השקל הישראלי התחזק משמעותית מול האירו — מ-4.10 ל-3.75 בשנים-עשר החודשים האחרונים. שינוי של 8% זה משפיע ישירות על עלות הרכישה למשקיעים אירופאים.

## ההקשר המאקרו-כלכלי

הממשל האמריקאי הנוכחי נתפס כפרו-ישראלי באופן מבני.

## ההשפעה על הנדל"ן

דירה במחיר 15 מיליון שקל עלתה 3.66 מיליון אירו בסוף 2024. אותו נכס עולה היום 4 מיליון אירו.

## תגובת המוכרים הישראלים

המוכרים הישראלים מעלים את המחירים בשקלים — מה שמגביר את האפקט עבור הקונה במטבע חזק.

## שלוש אסטרטגיות לקונים באירו

**1. נעילת שער החליפין** דרך פורוורד EUR/ILS.

**2. המרה הדרגתית** של הסכום על פני שלושה עד שישה חודשים.

**3. נכסים נקובים באירו** בפרויקטים חדשים.

## הקריאה שלנו

כל עוד הממשל האמריקאי החדש במקומו, אין לשקל סיבות מבניות להחליש.`,
    },
    relatedSlugs: ['top-5-transactions-immobilieres-israel-2026', 'pourquoi-diaspora-francophone-choisit-israel-2026'],
    internalLinks: {},
  },

  /* ────────────────────────────────────────────────────── */
  {
    slug: 'visite-villa-galei-tchelet-18-millions-herzliya-pituah',
    publishedAt: '2026-03-12',
    readMinutes: 6,
    category: { fr: 'Insider', en: 'Insider', he: 'מבט פנים' },
    image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1600&auto=format&fit=crop&q=80',
    imageAlt: {
      fr: 'Intérieur d\'une villa contemporaine à Galei Tchelet',
      en: 'Interior of a contemporary villa in Galei Tchelet',
      he: 'פנים וילה עכשווית בגלי תכלת',
    },
    seoTitle: {
      fr: 'Visite guidée d\'une villa Galei Tchelet à 18 millions d\'euros',
      en: 'Guided Tour of an €18M Galei Tchelet Villa',
      he: 'סיור מודרך בווילת גלי תכלת ב-18 מיליון אירו',
    },
    metaDescription: {
      fr: 'À l\'intérieur d\'une villa contemporaine en première ligne de mer à Herzliya Pituah. 700 m², piscine à débordement, cinéma, vue Méditerranée — décryptage du standing ultra-prime.',
      en: 'Inside a contemporary seafront villa in Herzliya Pituah. 700 m², infinity pool, cinema, Mediterranean view — a look at ultra-prime standing.',
      he: 'בתוך וילה עכשווית בקו ים ראשון בהרצליה פיתוח.',
    },
    h1: {
      fr: 'À l\'intérieur d\'une villa Galei Tchelet à 18 M €',
      en: 'Inside an €18M Galei Tchelet Villa',
      he: 'בתוך וילת גלי תכלת ב-18 מיליון אירו',
    },
    excerpt: {
      fr: '700 m² habitables, piscine à débordement, cave à vin de 800 bouteilles, ascenseur privé. Visite guidée de ce que représente le standing ultra-prime à Herzliya Pituah.',
      en: '700 m² of living space, infinity pool, 800-bottle wine cellar, private elevator. A guided tour of what ultra-prime standing means in Herzliya Pituah.',
      he: '700 מ"ר, בריכה גולשת, מרתף יין ל-800 בקבוקים.',
    },
    body: {
      fr: `À Herzliya Pituah, la rue Galei Tchelet longe la mer sur un peu plus d'un kilomètre. C'est là, derrière des grilles discrètes, que se trouvent les villas qui ne paraissent jamais sur les portails. L'une d'elles est actuellement dans notre portefeuille off-market à 18 millions d'euros.

## Le terrain

Mille deux cents mètres carrés, en bordure directe de la promenade littorale, avec accès privé à la plage. Le terrain a été acquis il y a vingt ans par la famille actuelle ; la villa actuelle date de 2018, conçue par un cabinet d'architecture italien.

## Les volumes

Sept cents mètres carrés habitables sur trois niveaux. Sous-sol : cinéma de douze places, salle de sport, sauna, cave à vin de huit cents bouteilles, garage pour cinq véhicules. Rez-de-chaussée : pièce de vie de 180 m² ouverte sur la piscine à débordement, cuisine professionnelle, salon d'hiver, suite parentale avec terrasse mer. Étage : cinq suites enfants/invités avec salles de bain privées.

## Les finitions

Marbre de Carrare au sol, bois massif sur les boiseries, robinetterie Vola, électroménager Gaggenau, domotique KNX intégrée. La piscine à débordement est revêtue de mosaïques de verre vénitien noir, créant un effet miroir avec la Méditerranée.

## Pourquoi 18 millions

Le prix au mètre carré construit s'élève à environ 25 700 €. C'est cohérent avec les transactions récentes du quartier, mais en deçà des niveaux observés sur les villas Galei Tchelet plus prestigieuses (jusqu'à 35 000 € le m²). La différence tient à la profondeur du terrain (la villa n'est pas en première ligne absolue mais en deuxième rang) et à un parti pris architectural qui ne plaira pas à tout le monde.

## Le profil de l'acheteur

Une famille internationale avec trois enfants ou plus, qui passe entre quatre et neuf mois par an en Israël, qui valorise l'intimité absolue (la villa n'a aucun vis-à-vis), et qui veut un lieu prêt à vivre — sans travaux. Pour ce profil, à ce prix, à cet emplacement, l'offre est rare.

Cette villa n'a pas fait l'objet d'une annonce publique et ne le sera pas. Si elle vous intéresse, nous organisons une visite privée sous huit jours.`,
      en: `In Herzliya Pituah, Galei Tchelet street runs along the sea for just over a kilometer. It is there, behind discreet gates, that the villas which never appear on portals are located. One of them is currently in our off-market portfolio at €18 million.

## The land

Twelve hundred square meters, directly bordering the coastal promenade, with private beach access. The land was acquired twenty years ago by the current family; the current villa dates from 2018, designed by an Italian architecture firm.

## The volumes

Seven hundred square meters of living space across three levels. Basement: twelve-seat cinema, gym, sauna, eight-hundred-bottle wine cellar, garage for five vehicles. Ground floor: 180 m² living room opening onto the infinity pool, professional kitchen, winter lounge, master suite with sea-view terrace. Upper floor: five children/guest suites with private bathrooms.

## The finishes

Carrara marble flooring, solid wood paneling, Vola fittings, Gaggenau appliances, integrated KNX home automation. The infinity pool is lined with black Venetian glass mosaics, creating a mirror effect with the Mediterranean.

## Why €18 million

The built price per square meter is around €25,700. This is consistent with recent neighborhood transactions, but below levels observed on the most prestigious Galei Tchelet villas (up to €35,000 per m²). The difference comes from the depth of the land (the villa is not on the absolute front line but in the second row) and an architectural choice that will not appeal to everyone.

## The buyer profile

An international family with three or more children, who spends between four and nine months a year in Israel, values absolute privacy (the villa has no overlooking), and wants a turnkey property — no renovation work. For this profile, at this price, at this location, the offer is rare.

This villa has not been publicly advertised and will not be. If interested, we organize a private visit within eight days.`,
      he: `בהרצליה פיתוח, רחוב גלי תכלת משתרע לאורך הים ביותר מקילומטר. שם, מאחורי שערים דיסקרטיים, נמצאות הווילות שמעולם לא מופיעות בפורטלים. אחת מהן נמצאת כיום בתיק המחוץ-לשוק שלנו ב-18 מיליון אירו.

## הקרקע

אלף ומאתיים מ"ר, בגבול ישיר עם טיילת החוף, עם גישה פרטית לחוף.

## הנפחים

שבע מאות מ"ר במגורים על שלוש קומות. מרתף: קולנוע 12 מקומות, חדר כושר, סאונה, מרתף יין ל-800 בקבוקים, חניה ל-5 רכבים.

## הגימור

שיש קררה, עץ מסיבי, ברזיות וולה, מכשירי חשמל גאגנאו.

## למה 18 מיליון

המחיר למ"ר בנוי הוא כ-25,700 אירו. עקבי עם עסקאות אזור אחרונות.

## פרופיל הקונה

משפחה בינלאומית עם שלושה ילדים או יותר.

הווילה לא פורסמה בציבור ולא תפורסם. אם מתעניינים, אנו מארגנים ביקור פרטי תוך שמונה ימים.`,
    },
    relatedSlugs: ['top-5-transactions-immobilieres-israel-2026', 'proprietes-off-market-israel-luxe'],
    internalLinks: { quartier: ['galei-tchelet'], ville: ['herzliya-pituah'] },
  },

  /* ────────────────────────────────────────────────────── */
  {
    slug: 'off-market-sept-villas-jamais-quitte-nos-dossiers',
    publishedAt: '2026-02-28',
    readMinutes: 6,
    category: { fr: 'Off-Market', en: 'Off-Market', he: 'מחוץ לשוק' },
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600&auto=format&fit=crop&q=80',
    imageAlt: {
      fr: 'Entrée d\'une propriété privée en Israël',
      en: 'Entrance to a private property in Israel',
      he: 'כניסה לנכס פרטי בישראל',
    },
    seoTitle: {
      fr: 'Off-Market : les sept villas qui n\'ont jamais quitté nos dossiers',
      en: 'Off-Market: The Seven Villas That Never Left Our Files',
      he: 'מחוץ לשוק: שבע הווילות שמעולם לא יצאו מהתיקים שלנו',
    },
    metaDescription: {
      fr: 'Sept villas exceptionnelles que nous conservons en off-market depuis des années — par choix des propriétaires. Aperçu d\'un marché parallèle réservé à une clientèle qualifiée.',
      en: 'Seven exceptional villas we have kept off-market for years — by owner choice. Inside a parallel market reserved for a qualified clientele.',
      he: 'שבע וילות יוצאות דופן שאנו שומרים מחוץ לשוק במשך שנים.',
    },
    h1: {
      fr: 'Sept villas off-market qui n\'ont jamais quitté nos dossiers',
      en: 'Seven Off-Market Villas That Have Never Left Our Files',
      he: 'שבע וילות מחוץ לשוק שמעולם לא עזבו את התיקים שלנו',
    },
    excerpt: {
      fr: 'Certaines propriétés ne sont jamais annoncées publiquement. Voici comment fonctionne notre portefeuille off-market — et pourquoi sept villas y figurent depuis plus de trois ans.',
      en: 'Some properties are never publicly listed. Here is how our off-market portfolio works — and why seven villas have remained on it for over three years.',
      he: 'נכסים מסוימים אינם מפורסמים לעולם. כך פועל תיק המחוץ-לשוק שלנו.',
    },
    body: {
      fr: `Dans le marché ultra-prime israélien, une part significative des biens les plus rares ne paraît jamais sur les portails. Maison Israël maintient un portefeuille privé d'environ quarante propriétés. Sept d'entre elles y figurent depuis plus de trois ans — par choix exclusif des propriétaires. Voici ce que cela signifie concrètement.

## Pourquoi rester off-market

Les raisons sont multiples : un propriétaire ne souhaite pas que ses voisins ou ses concurrents professionnels apprennent qu'il vend ; une famille internationale veut sélectionner finement les visiteurs ; un héritage en cours de structuration ne peut pas être affiché publiquement. Dans tous les cas, le critère commun est la maîtrise — du calendrier, du public, et des conditions.

## Comment fonctionne notre portefeuille

Quarante propriétés en moyenne, allant de 6 à 45 millions d'euros, principalement situées à Herzliya Pituah, Césarée, Savyon, Mamilla et le Vieux Nord de Tel Aviv. Aucune adresse n'est divulguée avant qu'un acheteur soit qualifié — financièrement et personnellement.

## Le profil des sept villas conservées

**Trois villas Galei Tchelet** entre 18 et 32 millions d'euros, dont deux en première ligne.

**Une propriété historique** à Talbieh, ancienne résidence d'un dirigeant des années 1960, restée dans la même famille depuis.

**Deux villas Caesarea Golf** avec accès au parcours, l'une d'elles avec piste d'hélicoptère privée.

**Une résidence Mamilla** sur les murailles, jamais habitée à l'année par ses propriétaires.

## Pourquoi elles restent en portefeuille

Trois raisons combinées : le prix demandé reflète une valeur de patrimoine, pas une valeur de marché immédiat ; les propriétaires ne sont pas pressés ; chaque visite est précédée d'un entretien préalable approfondi avec notre équipe.

## Comment y accéder

Nous présentons ces biens uniquement à des clients ayant signé un mandat de recherche avec engagement de confidentialité, et après une qualification financière préalable. Ce n'est pas un filtre commercial — c'est une exigence posée par les vendeurs.

Si vous souhaitez nous transmettre votre brief, nous pouvons vous proposer une rencontre sous quarante-huit heures. Notre rôle est de vérifier que votre projet correspond à ce que nous avons en portefeuille — et, si c'est le cas, de vous ouvrir des portes que personne d'autre n'ouvrira.`,
      en: `In the Israeli ultra-prime market, a significant share of the rarest properties never appears on portals. Maison Israël maintains a private portfolio of around forty properties. Seven of them have remained on it for over three years — by exclusive choice of the owners. Here is what that means concretely.

## Why stay off-market

The reasons are multiple: an owner does not want neighbors or professional competitors to learn they are selling; an international family wants to select visitors finely; an inheritance under structuring cannot be publicly displayed. In all cases, the common criterion is control — of timing, of audience, and of conditions.

## How our portfolio works

Forty properties on average, ranging from €6 to €45 million, mainly located in Herzliya Pituah, Caesarea, Savyon, Mamilla, and Tel Aviv's Old North. No address is disclosed before a buyer is qualified — financially and personally.

## The profile of the seven retained villas

**Three Galei Tchelet villas** between €18 and €32 million, two on the front line.

**A historic property** in Talbiyeh, former residence of a 1960s leader, remaining in the same family since.

**Two Caesarea Golf villas** with course access, one with a private helipad.

**A Mamilla residence** on the walls, never inhabited year-round by its owners.

## Why they remain in the portfolio

Three combined reasons: the asking price reflects heritage value, not immediate market value; the owners are not in a hurry; each visit is preceded by an in-depth preliminary interview with our team.

## How to access them

We present these properties only to clients who have signed a search mandate with a confidentiality commitment, and after prior financial qualification. This is not a commercial filter — it is a requirement set by the sellers.

If you wish to share your brief with us, we can offer a meeting within forty-eight hours. Our role is to verify that your project matches what we have in the portfolio — and, if so, to open doors no one else will open for you.`,
      he: `בשוק האולטרה-פרימיום הישראלי, חלק משמעותי מהנכסים הנדירים ביותר אינו מופיע לעולם בפורטלים. מייזון ישראל מנהלת תיק פרטי של כ-40 נכסים. שבעה מהם נשארו בו במשך יותר משלוש שנים — לפי בחירה בלעדית של הבעלים.

## למה להישאר מחוץ לשוק

הסיבות מרובות: בעלים שלא רוצה ששכניו או מתחריו ידעו שהוא מוכר; משפחה בינלאומית שרוצה לסנן מבקרים בקפידה; ירושה במבנה שלא יכולה להיות מוצגת בציבור.

## איך התיק שלנו פועל

ארבעים נכסים בממוצע, בין 6 ל-45 מיליון אירו, בעיקר בהרצליה פיתוח, קיסריה, סביון, ממילא והצפון הישן.

## פרופיל שבע הווילות

**שלוש וילות גלי תכלת** בין 18 ל-32 מיליון אירו.

**נכס היסטורי** בטלביה.

**שתי וילות קיסריה גולף** עם גישה למסלול.

**רזידנס ממילא** על החומות.

## איך לגשת אליהם

אנו מציגים נכסים אלה רק ללקוחות שחתמו על מנדט חיפוש עם התחייבות לסודיות, ולאחר הכשרה פיננסית מוקדמת.`,
    },
    relatedSlugs: ['penthouse-rothschild-vendu-24-heures-off-market', 'visite-villa-galei-tchelet-18-millions-herzliya-pituah'],
    internalLinks: {},
  },

  /* ────────────────────────────────────────────────────── */
  {
    slug: 'best-beachfront-luxury-properties-israel-buyers-guide',
    publishedAt: '2026-05-30',
    readMinutes: 8,
    category: { fr: 'Bord de mer', en: 'Beachfront', he: 'חזית ים' },
    image: 'https://images.unsplash.com/photo-1582610116397-edb318620f90?w=1600&auto=format&fit=crop&q=80',
    imageAlt: {
      fr: 'Villa bord de mer en Israël avec vue sur la Méditerranée',
      en: 'Seafront villa in Israel with Mediterranean view',
      he: 'וילה בחזית הים בישראל עם נוף לים התיכון',
    },
    seoTitle: {
      fr: 'Meilleures propriétés de luxe bord de mer en Israël — Guide acheteur',
      en: 'Best Beachfront Luxury Properties in Israel — A Buyer\'s Guide',
      he: 'נכסי היוקרה הטובים ביותר בחזית הים בישראל — מדריך לקונים',
    },
    metaDescription: {
      fr: 'Les meilleurs emplacements bord de mer en Israël pour acheter une villa ou un penthouse de luxe : Herzliya Galei Tchelet, Césarée Aleph, Tel Aviv Yam. Prix, profils d\'acheteurs, accès off-market.',
      en: 'The best beachfront locations in Israel to buy a luxury villa or penthouse: Herzliya Galei Tchelet, Caesarea Aleph, Tel Aviv Yam. Prices, buyer profiles, off-market access.',
      he: 'המקומות הטובים ביותר בחזית הים בישראל לרכישת וילה או פנטהאוז יוקרה.',
    },
    h1: {
      fr: 'Les meilleurs biens de luxe bord de mer en Israël',
      en: 'The Best Beachfront Luxury Properties in Israel',
      he: 'נכסי היוקרה הטובים ביותר בחזית הים בישראל',
    },
    excerpt: {
      fr: 'Galei Tchelet, Césarée Aleph, Tel Aviv Yam : où acheter en bord de mer en Israël en 2026, à quel prix, et comment y accéder.',
      en: 'Galei Tchelet, Caesarea Aleph, Tel Aviv Yam: where to buy seafront in Israel in 2026, at what price, and how to access it.',
      he: 'גלי תכלת, קיסריה אלף, תל אביב ים: היכן לקנות בחזית הים בישראל ב-2026.',
    },
    body: {
      fr: `Le littoral israélien s'étend sur 273 kilomètres. Mais l'immobilier ultra-prime bord de mer se concentre, lui, sur cinq adresses identifiées que Maison Israël couvre depuis 2009. Voici la cartographie.

## 1. Galei Tchelet, Herzliya Pituah — 15 à 45 M €

Le sommet absolu. Rue privée bordant directement la mer sur un kilomètre, dans le quartier diplomatique d'Israël. Villas de 500 à 1 200 m², piscines à débordement, accès privé à la plage.

**Profil acheteur :** familles internationales (américaines, françaises, sud-africaines), passant 4 à 9 mois par an en Israël.

## 2. Césarée Aleph — 8 à 30 M €

L'enclave la plus discrète du pays. Communauté privée avec gardiennage, parcours de golf, marina. Architecture contemporaine ou néo-méditerranéenne, terrains de 600 à 1 500 m².

**Profil acheteur :** investisseurs cherchant un cadre familial sans le tumulte de Tel Aviv. Forte communauté américaine.

## 3. Nof Yam, Herzliya — 6 à 18 M €

L'alternative à Galei Tchelet, légèrement en retrait de la mer (200 à 500 m), à des prix 30 % inférieurs. Villas plus modernes, livraisons récentes.

**Profil acheteur :** primo-accédants ultra-prime, familles avec jeunes enfants attirées par les écoles internationales d'Herzliya.

## 4. Sde Dov, Tel Aviv — 30 000 à 50 000 €/m²

Le seul vrai front de mer urbain en Israël à ce niveau de prix. Penthouses dans les tours neuves, vue Méditerranée à 180°, services hôteliers intégrés.

**Profil acheteur :** internationaux qui veulent la vie urbaine + le bord de mer + la simplicité d'une copropriété.

## 5. Vieille Jaffa, Tel Aviv — 12 à 25 M €

Quelques maisons en pierre, ottomanes ou néo-templières, surplombant le port et la mer. Inventaire extrêmement limité : moins de dix transactions par an.

## Comment Maison Israël y accède

Sur ces cinq adresses, plus de 60 % des biens disponibles ne sont jamais affichés publiquement. Nous tenons un fichier vivant d'environ vingt-cinq propriétés bord de mer, mis à jour mensuellement par notre conseillère dédiée au littoral.

Si vous souhaitez recevoir notre brief bord de mer (PDF confidentiel, mis à jour chaque trimestre), nous le partageons sur simple demande qualifiée.`,
      en: `The Israeli coastline stretches 273 kilometers. But beachfront ultra-prime real estate concentrates on five identified addresses that Maison Israël has covered since 2009. Here is the map.

## 1. Galei Tchelet, Herzliya Pituah — €15M to €45M

The absolute summit. A private street directly bordering the sea over one kilometer, in Israel's diplomatic quarter. Villas of 500 to 1,200 m², infinity pools, private beach access.

**Buyer profile:** international families (American, French, South African), spending 4 to 9 months per year in Israel.

## 2. Caesarea Aleph — €8M to €30M

The country's most discreet enclave. Private gated community, golf course, marina. Contemporary or Mediterranean-revival architecture, plots of 600 to 1,500 m².

**Buyer profile:** investors seeking a family setting without Tel Aviv's bustle. Strong American community.

## 3. Nof Yam, Herzliya — €6M to €18M

The alternative to Galei Tchelet, slightly set back from the sea (200 to 500 m), at prices 30% lower. More modern villas, recent deliveries.

**Buyer profile:** first-time ultra-prime buyers, families with young children attracted by Herzliya's international schools.

## 4. Sde Dov, Tel Aviv — €30,000 to €50,000 per m²

The only true urban seafront in Israel at this price level. Penthouses in new towers, 180° Mediterranean views, integrated hotel services.

**Buyer profile:** internationals who want urban life + seafront + the simplicity of a condominium.

## 5. Old Jaffa, Tel Aviv — €12M to €25M

A few stone houses, Ottoman or neo-Templer, overlooking the port and the sea. Extremely limited inventory: fewer than ten transactions per year.

## How Maison Israël accesses them

On these five addresses, over 60% of available properties never appear publicly. We maintain a live file of approximately twenty-five beachfront properties, updated monthly by our coast-dedicated advisor.

If you wish to receive our beachfront brief (confidential PDF, updated quarterly), we share it upon qualified request.`,
      he: `קו החוף הישראלי משתרע על פני 273 קילומטרים. אך נדל"ן האולטרה-פרימיום בחזית הים מתרכז בחמש כתובות מזוהות.

## 1. גלי תכלת, הרצליה פיתוח — 15 עד 45 מיליון אירו

הפסגה המוחלטת. רחוב פרטי הגובל ישירות בים לאורך קילומטר.

## 2. קיסריה אלף — 8 עד 30 מיליון אירו

המובלעת הדיסקרטית ביותר במדינה. קהילה פרטית עם שמירה, מסלול גולף, מרינה.

## 3. נוף ים, הרצליה — 6 עד 18 מיליון אירו

האלטרנטיבה לגלי תכלת, במרחק קל מהים.

## 4. שדה דב, תל אביב — 30,000 עד 50,000 אירו למ"ר

חזית הים העירונית האמיתית היחידה בישראל ברמת מחיר זו.

## 5. יפו העתיקה, תל אביב — 12 עד 25 מיליון אירו

מספר בתי אבן, עות'מאניים או נאו-טמפלריים.

## איך מייזון ישראל מגיעה אליהם

בחמש כתובות אלה, מעל 60% מהנכסים הזמינים מעולם אינם מופיעים בפומבי.`,
    },
    relatedSlugs: ['visite-villa-galei-tchelet-18-millions-herzliya-pituah', 'off-market-sept-villas-jamais-quitte-nos-dossiers'],
    internalLinks: { ville: ['herzliya-pituah', 'caesarea', 'tel-aviv'], quartier: ['galei-tchelet', 'caesarea-aleph'] },
  },

  /* ────────────────────────────────────────────────────── */
  {
    slug: 'tel-aviv-high-rise-condos-definitive-guide',
    publishedAt: '2026-05-29',
    readMinutes: 7,
    category: { fr: 'Tours', en: 'High-Rise', he: 'מגדלים' },
    image: 'https://images.unsplash.com/photo-1545241047-6083a3684587?w=1600&auto=format&fit=crop&q=80',
    imageAlt: {
      fr: 'Tours résidentielles haut de gamme à Tel Aviv',
      en: 'Premium residential towers in Tel Aviv',
      he: 'מגדלי מגורים יוקרתיים בתל אביב',
    },
    seoTitle: {
      fr: 'Tours résidentielles de luxe à Tel Aviv — Le guide complet',
      en: 'Tel Aviv High-Rise Condos: The Definitive Guide for International Buyers',
      he: 'מגדלי מגורים יוקרה בתל אביב — המדריך המלא',
    },
    metaDescription: {
      fr: 'Akirov, W Residences, Meier Towers, Sarona, Sde Dov : le guide complet des tours résidentielles ultra-prime de Tel Aviv. Prix, services, profils d\'acheteurs, accès.',
      en: 'Akirov, W Residences, Meier Towers, Sarona, Sde Dov: the complete guide to Tel Aviv\'s ultra-prime residential towers. Prices, services, buyer profiles, access.',
      he: 'אקירוב, W Residences, Meier Towers, סרונה, שדה דב: המדריך המלא למגדלי המגורים האולטרה-פרימיום של תל אביב.',
    },
    h1: {
      fr: 'Tel Aviv en hauteur : guide complet des tours résidentielles de prestige',
      en: 'Tel Aviv from Above: A Definitive Guide to Premium Residential Towers',
      he: 'תל אביב מלמעלה: מדריך מלא למגדלי המגורים היוקרתיים',
    },
    excerpt: {
      fr: 'Akirov, W, Meier, Sarona, Sde Dov : les cinq tours qui définissent le ciel résidentiel de Tel Aviv, leurs prix, leurs services, et comment les comparer.',
      en: 'Akirov, W, Meier, Sarona, Sde Dov: the five towers that define Tel Aviv\'s residential skyline, their prices, their services, and how to compare them.',
      he: 'אקירוב, W, מאייר, סרונה, שדה דב: חמשת המגדלים המגדירים את קו הרקיע המגורי של תל אביב.',
    },
    body: {
      fr: `Tel Aviv n'a jamais été une ville verticale. Mais en quinze ans, cinq tours ont transformé sa silhouette — et inventé un standard résidentiel qui n'existait pas en Israël. Voici comment elles se positionnent en 2026.

## Akirov Towers — la référence historique

Livrées en 2007 sur l'avenue Pinkas, les Akirov Towers restent l'étalon-or de Tel Aviv. Trois tours de 35 étages, vue 360° sur la ville et la Méditerranée, conciergerie 24/7, piscine sur le toit. Le record actuel : 32 M € pour un penthouse en mars 2026.

**Prix au m² :** 45 000 à 65 000 €. **Profil :** familles internationales, dirigeants tech.

## W Residences — le standing hôtelier

Adossées à l'hôtel W de Sarona Park Tzameret, ces résidences offrent l'intégralité des services de l'hôtel : conciergerie, spa, room service, gestion locative. Idéal pour les acheteurs qui ne vivent pas à plein temps en Israël.

**Prix au m² :** 40 000 à 55 000 €. **Profil :** non-résidents, résidence secondaire.

## Meier-on-Rothschild — l'architecture signée

Conçue par Richard Meier, livrée en 2017. Lignes blanches signature, vue Bauhaus sur le boulevard Rothschild. La tour la plus design de la ville.

**Prix au m² :** 38 000 à 52 000 €. **Profil :** amateurs d'architecture, profils culturels.

## Sarona Park Tzameret — l'urbanisme de quartier

Pas une seule tour, mais un quartier : trois résidences (Meier, W, AKR) au cœur du parc de Sarona, avec restaurants, marché gastronomique et bureaux à pied. Le quartier le plus vivable du segment.

**Prix au m² :** 35 000 à 50 000 €. **Profil :** familles avec adolescents.

## Sde Dov — l'avenir

Les premières tours livrées en 2024-2025 sur l'ancien aéroport militaire. Front de mer urbain, architecture contemporaine, services intégrés en cours d'arrivée. Entrée de gamme du segment ultra-prime.

**Prix au m² :** 30 000 à 45 000 €. **Profil :** internationaux cherchant du neuf avec front de mer.

## Comment Maison Israël accède à ces tours

Nous maintenons des relations directes avec les régies des cinq tours. Pour chaque programme, nous savons quels appartements sont à vendre avant qu'ils ne paraissent publiquement — souvent par un message d'un voisin ou d'un copropriétaire au conseil syndical. C'est ce maillage local qui fait la différence pour l'acheteur international.`,
      en: `Tel Aviv has never been a vertical city. But in fifteen years, five towers have transformed its silhouette — and invented a residential standard that did not exist in Israel. Here is how they position in 2026.

## Akirov Towers — the historical benchmark

Delivered in 2007 on Pinkas Avenue, the Akirov Towers remain Tel Aviv's gold standard. Three 35-story towers, 360° views of the city and the Mediterranean, 24/7 concierge, rooftop pool. The current record: €32M for a penthouse in March 2026.

**Price per m²:** €45,000 to €65,000. **Profile:** international families, tech executives.

## W Residences — hotel-grade standing

Connected to the W hotel in Sarona Park Tzameret, these residences offer the full range of hotel services: concierge, spa, room service, rental management. Ideal for buyers who do not live full-time in Israel.

**Price per m²:** €40,000 to €55,000. **Profile:** non-residents, secondary residence.

## Meier-on-Rothschild — signature architecture

Designed by Richard Meier, delivered in 2017. Signature white lines, Bauhaus view over Rothschild Boulevard. The most design-driven tower in the city.

**Price per m²:** €38,000 to €52,000. **Profile:** architecture enthusiasts, cultural profiles.

## Sarona Park Tzameret — neighborhood urbanism

Not a single tower but a quarter: three residences (Meier, W, AKR) at the heart of Sarona park, with restaurants, food market and offices walking distance. The most livable area of the segment.

**Price per m²:** €35,000 to €50,000. **Profile:** families with teenagers.

## Sde Dov — the future

The first towers delivered in 2024-2025 on the former military airport. Urban seafront, contemporary architecture, integrated services arriving. The ultra-prime segment's entry level.

**Price per m²:** €30,000 to €45,000. **Profile:** internationals seeking new construction with seafront.

## How Maison Israël accesses these towers

We maintain direct relationships with the management of all five towers. For each program, we know which apartments are for sale before they appear publicly — often through a message from a neighbor or a co-owner on the building committee. That local mesh is what makes the difference for the international buyer.`,
      he: `תל אביב מעולם לא הייתה עיר אנכית. אך בחמש-עשרה שנים, חמישה מגדלים שינו את צלליתה.

## מגדלי אקירוב — אמת המידה ההיסטורית

נמסרו ב-2007 בשדרות פנקס. שלושה מגדלים בני 35 קומות, נוף 360° לעיר ולים. שיא נוכחי: 32 מיליון אירו לפנטהאוז במרץ 2026.

## W Residences — סטנדרט מלון

צמודות למלון W בסרונה פארק צמרת.

## מאייר-על-רוטשילד — אדריכלות חתומה

בתכנון ריצ'רד מאייר, נמסר ב-2017.

## סרונה פארק צמרת — אורבניות שכונתית

לא מגדל אחד אלא רובע: שלוש רזידנסיות (מאייר, W, AKR) בלב פארק סרונה.

## שדה דב — העתיד

המגדלים הראשונים שנמסרו ב-2024-2025.

## איך מייזון ישראל מגיעה למגדלים אלה

אנו שומרים על קשרים ישירים עם הניהול של חמשת המגדלים.`,
    },
    relatedSlugs: ['sde-dov-nouvelle-adresse-ultra-prime-tel-aviv', 'top-5-transactions-immobilieres-israel-2026'],
    internalLinks: { ville: ['tel-aviv'], quartier: ['rothschild', 'sde-dov', 'sarona'] },
  },

  /* ────────────────────────────────────────────────────── */
  {
    slug: 'jerusalem-luxury-penthouse-complete-buying-guide',
    publishedAt: '2026-05-28',
    readMinutes: 7,
    category: { fr: 'Penthouses', en: 'Penthouses', he: 'פנטהאוזים' },
    image: 'https://images.unsplash.com/photo-1559564484-e54bdc2d7c93?w=1600&auto=format&fit=crop&q=80',
    imageAlt: {
      fr: 'Penthouse à Jérusalem avec vue sur la Vieille Ville',
      en: 'Jerusalem penthouse with Old City view',
      he: 'פנטהאוז בירושלים עם נוף לעיר העתיקה',
    },
    seoTitle: {
      fr: 'Acheter un penthouse de luxe à Jérusalem — Guide complet 2026',
      en: 'Buying a Luxury Penthouse in Jerusalem — Complete 2026 Guide',
      he: 'רכישת פנטהאוז יוקרה בירושלים — המדריך המלא 2026',
    },
    metaDescription: {
      fr: 'Les meilleurs penthouses de Jérusalem en 2026 : Mamilla, Waldorf-Astoria, King David Crown, Rehavia, Colonie Allemande. Prix, fournisseurs, démarches d\'achat.',
      en: 'The best Jerusalem penthouses in 2026: Mamilla, Waldorf-Astoria, King David Crown, Rehavia, German Colony. Prices, developers, buying process.',
      he: 'הפנטהאוזים הטובים ביותר בירושלים ב-2026: ממילא, ולדורף-אסטוריה, רחביה.',
    },
    h1: {
      fr: 'Acheter un penthouse de luxe à Jérusalem en 2026',
      en: 'Buying a Luxury Penthouse in Jerusalem in 2026',
      he: 'רכישת פנטהאוז יוקרה בירושלים ב-2026',
    },
    excerpt: {
      fr: 'Mamilla, Waldorf-Astoria, King David Crown, Rehavia : où trouver un penthouse à Jérusalem, à quel prix, et comment le financer en tant qu\'acheteur international.',
      en: 'Mamilla, Waldorf-Astoria, King David Crown, Rehavia: where to find a penthouse in Jerusalem, at what price, and how to finance it as an international buyer.',
      he: 'ממילא, ולדורף-אסטוריה, רחביה: היכן למצוא פנטהאוז בירושלים.',
    },
    body: {
      fr: `Acheter un penthouse à Jérusalem en 2026 n'a rien à voir avec Tel Aviv. Moins de tours, plus d'histoire, des règles d'urbanisme plus strictes. Voici les cinq adresses qui définissent le segment, et ce qu'il faut savoir avant de signer.

## 1. Waldorf-Astoria Residences — l'hôtellerie internationale

Penthouses de 200 à 350 m², services 5 étoiles intégrés, conciergerie en français et anglais, accès direct à la Vieille Ville à pied. Prix : 7 à 15 M €.

**Atout :** clé en main, gestion locative possible via l'hôtel pour les absences.

## 2. King David Crown — la confidentialité absolue

Livré en 2024, projet de moins de 30 appartements, dont 6 penthouses. Vue directe sur les murailles ottomanes. Prix : 8 à 18 M €.

**Atout :** rareté absolue. Aucun penthouse n'est revenu sur le marché secondaire à ce jour.

## 3. David's Village — l'esprit village

Maisons et duplex en pierre de Jérusalem inspirés de l'architecture ottomane, organisés autour de petites cours communes. Prix : 4 à 9 M € pour les unités hautes.

**Atout :** l'expérience la plus authentique, pour les acheteurs qui veulent l'identité du quartier plus que les services.

## 4. Rehavia & Talbieh — les penthouses historiques

Immeubles des années 1930-1960 dont les étages supérieurs ont été rénovés en penthouses. Hauteurs sous plafond, terrasses originales, charme de l'avant-guerre. Prix : 3 à 9 M €.

**Atout :** rapport qualité-prix-emplacement imbattable pour qui aime le patrimoine.

## 5. Colonie Allemande — boutique developments

Petits programmes de 6 à 15 appartements, dans des immeubles de 3 à 4 étages. Le penthouse y est souvent un toit-terrasse aménagé. Prix : 2,5 à 7 M €.

**Atout :** échelle humaine, communauté résidentielle restreinte.

## Le processus d'achat pour un acheteur international

**Étape 1 — Mandat de recherche** : signez un mandat (gratuit) qui vous donne accès au portefeuille off-market de Maison Israël à Jérusalem (environ 12 penthouses non listés en permanence).

**Étape 2 — Visites** : organisation sous 8 jours, soit en présentiel soit en visite virtuelle pour les acheteurs basés à l'étranger.

**Étape 3 — Offre et négociation** : nous présentons une offre écrite via avocat israélien, généralement 5 à 12 % sous le prix demandé sur les biens stables.

**Étape 4 — Compromis (Heskem)** : signature chez l'avocat, dépôt de 10 % du prix sur compte séquestre.

**Étape 5 — Clôture** : entre 60 et 120 jours après le compromis. Paiement de la taxe d'achat (Mas Rechisha), transfert de fonds depuis EUR ou USD, remise des clés.

## Notre conseil 2026

Pour Mamilla, achetez maintenant : l'offre reste inférieure à la demande sur tous les programmes. Pour Rehavia, prenez votre temps : le marché secondaire offre régulièrement de belles opportunités. Pour la Colonie Allemande, attendez les nouvelles livraisons 2027 : trois programmes intéressants arrivent.`,
      en: `Buying a penthouse in Jerusalem in 2026 has nothing to do with Tel Aviv. Fewer towers, more history, stricter zoning. Here are the five addresses defining the segment, and what you need to know before signing.

## 1. Waldorf-Astoria Residences — international hospitality

Penthouses of 200 to 350 m², integrated 5-star services, French- and English-speaking concierge, walking access to the Old City. Price: €7M to €15M.

**Strength:** turnkey, rental management available via the hotel for absences.

## 2. King David Crown — absolute confidentiality

Delivered in 2024, project of fewer than 30 apartments, including 6 penthouses. Direct view of the Ottoman walls. Price: €8M to €18M.

**Strength:** absolute scarcity. No penthouse has returned to the secondary market to date.

## 3. David's Village — village spirit

Houses and duplexes in Jerusalem stone inspired by Ottoman architecture, organized around small shared courtyards. Price: €4M to €9M for upper units.

**Strength:** the most authentic experience, for buyers who want neighborhood identity more than services.

## 4. Rehavia & Talbieh — historic penthouses

Buildings from the 1930s-1960s whose upper floors have been renovated into penthouses. Ceiling heights, original terraces, pre-war charm. Price: €3M to €9M.

**Strength:** unbeatable quality-price-location ratio for heritage lovers.

## 5. German Colony — boutique developments

Small projects of 6 to 15 apartments, in buildings of 3 to 4 floors. The penthouse there is often a fitted roof terrace. Price: €2.5M to €7M.

**Strength:** human scale, restricted residential community.

## The buying process for an international buyer

**Step 1 — Search mandate**: sign a mandate (free) that gives you access to Maison Israël's off-market portfolio in Jerusalem (approximately 12 unlisted penthouses at all times).

**Step 2 — Viewings**: organized within 8 days, either in person or via virtual viewing for buyers based abroad.

**Step 3 — Offer and negotiation**: we present a written offer through an Israeli lawyer, typically 5 to 12% below the asking price on stable properties.

**Step 4 — Contract (Heskem)**: signed at the lawyer's office, deposit of 10% of the price in escrow.

**Step 5 — Closing**: between 60 and 120 days after the contract. Payment of the purchase tax (Mas Rechisha), fund transfer from EUR or USD, key handover.

## Our 2026 recommendation

For Mamilla, buy now: supply remains below demand across all programs. For Rehavia, take your time: the secondary market regularly offers fine opportunities. For the German Colony, wait for the new 2027 deliveries: three interesting programs are coming.`,
      he: `רכישת פנטהאוז בירושלים ב-2026 שונה מאוד מתל אביב. פחות מגדלים, יותר היסטוריה, תכנון עירוני קפדני יותר.

## 1. Waldorf-Astoria Residences — אירוח בינלאומי

פנטהאוזים של 200 עד 350 מ"ר, שירותי 5 כוכבים משולבים. מחיר: 7 עד 15 מיליון אירו.

## 2. King David Crown — סודיות מוחלטת

נמסר ב-2024. נוף ישיר לחומות העות'מאניות. מחיר: 8 עד 18 מיליון אירו.

## 3. כפר דוד — רוח כפר

בתים ודופלקסים באבן ירושלמית. מחיר: 4 עד 9 מיליון אירו.

## 4. רחביה וטלביה — פנטהאוזים היסטוריים

בניינים משנות ה-30-60. מחיר: 3 עד 9 מיליון אירו.

## 5. המושבה הגרמנית — פיתוחי בוטיק

פרויקטים קטנים של 6 עד 15 דירות. מחיר: 2.5 עד 7 מיליון אירו.

## תהליך הרכישה לקונה בינלאומי

חמישה שלבים: מנדט חיפוש, ביקורים, הצעה ומשא ומתן, הסכם (חתימה אצל עורך דין), סגירה (60 עד 120 ימים).

## ההמלצה שלנו ל-2026

לממילא — קנו עכשיו. לרחביה — קחו את הזמן. למושבה הגרמנית — חכו למסירות 2027.`,
    },
    relatedSlugs: ['mamilla-vivre-aux-portes-vieille-ville-jerusalem', 'meilleurs-quartiers-luxe-jerusalem'],
    internalLinks: { ville: ['jerusalem'], quartier: ['mamilla', 'rehavia', 'colonie-allemande', 'talbieh'] },
  },

  /* ────────────────────────────────────────────────────── */
  {
    slug: 'what-is-tel-aviv-famous-for-complete-guide',
    publishedAt: '2026-05-27',
    readMinutes: 8,
    category: { fr: 'Guides', en: 'Guides', he: 'מדריכים' },
    image: 'https://images.unsplash.com/photo-1534430480872-3498386e7856?w=1600&auto=format&fit=crop&q=80',
    imageAlt: {
      fr: 'Tel Aviv vue depuis la plage avec ses tours et la mer',
      en: 'Tel Aviv from the beach with its towers and the sea',
      he: 'תל אביב מהחוף עם המגדלים והים',
    },
    seoTitle: {
      fr: 'Tel Aviv : ce qu\'il faut savoir avant d\'y vivre ou d\'y investir',
      en: 'What Is Tel Aviv Famous For — The Complete 2026 Guide',
      he: 'תל אביב — המדריך המלא 2026',
    },
    metaDescription: {
      fr: 'Tel Aviv en 2026 : les faits, les chiffres, les quartiers, et ce qui en fait la capitale économique et créative d\'Israël. Guide complet par Maison Israël.',
      en: 'What Tel Aviv is famous for: the facts, the figures, the neighborhoods, and what makes it Israel\'s economic and creative capital. Complete guide by Maison Israël.',
      he: 'מה תל אביב מפורסמת בו: עובדות, נתונים, שכונות. המדריך המלא של מייזון ישראל.',
    },
    h1: {
      fr: 'Tel Aviv en 2026 : tout ce qu\'il faut savoir',
      en: 'Tel Aviv in 2026: Everything You Need to Know',
      he: 'תל אביב ב-2026: כל מה שצריך לדעת',
    },
    excerpt: {
      fr: 'Vingt faits, dix quartiers, cinq raisons de s\'y installer. Le guide complet de Tel Aviv pour acheteurs internationaux.',
      en: 'Twenty facts, ten neighborhoods, five reasons to settle. The complete guide to Tel Aviv for international buyers.',
      he: 'עשרים עובדות, עשר שכונות, חמש סיבות להתיישב.',
    },
    body: {
      fr: `Tel Aviv n'est pas la capitale politique d'Israël — c'est Jérusalem. Mais c'est la capitale économique, créative, gastronomique et nocturne du pays. Voici ce qu'il faut savoir avant d'envisager d'y vivre ou d'y investir.

## Les faits essentiels

Tel Aviv compte 470 000 habitants intra-muros, 4,2 millions dans son aire métropolitaine (Gush Dan). Fondée en 1909 par 66 familles juives qui voulaient sortir de l'ancienne Jaffa, la ville célèbre ses 117 ans en 2026.

Le climat est méditerranéen : 300 jours de soleil par an, 25 °C de moyenne en été, 15 °C en hiver. La plage s'étend sur 14 kilomètres ininterrompus le long de la Méditerranée.

## Pourquoi Tel Aviv est célèbre

**1. La Ville Blanche, classée UNESCO.** Tel Aviv abrite la plus grande concentration mondiale d'architecture Bauhaus : plus de 4 000 immeubles construits entre les années 1930 et 1950, principalement par des architectes juifs européens fuyant l'Allemagne. Le quartier Bauhaus a été inscrit au patrimoine mondial en 2003.

**2. La Silicon Wadi.** Avec plus de 7 000 startups et le plus haut nombre de licornes par habitant au monde, la région de Tel Aviv est l'un des trois grands hubs tech mondiaux avec la Silicon Valley et Pékin.

**3. La scène gastronomique.** Tel Aviv compte plus de restaurants par habitant que toute autre ville d'Israël. La culture culinaire mélange traditions ashkénazes, séfarades, mizrahies, levantines et internationales — souvent dans le même menu.

**4. La nuit sans fin.** La vie nocturne de Tel Aviv est régulièrement classée parmi les top 5 mondiales. Florentin, Rothschild, le port et le Vieux Nord vibrent jusqu'à 4-5 heures du matin.

**5. La tolérance.** Tel Aviv est la ville la plus libérale, ouverte et progressiste du Moyen-Orient. La parade gay annuelle attire 250 000 personnes.

## Les dix quartiers à connaître

| Quartier | Atmosphère | Prix m² 2026 |
|---|---|---|
| Rothschild | Bauhaus historique | 25–35 K€ |
| Neve Tzedek | Maisons basses, charme | 28–40 K€ |
| Vieux Nord | Familial premium | 22–32 K€ |
| Florentin | Loft, créatifs | 18–28 K€ |
| Sarona | Tours modernes | 35–50 K€ |
| Sde Dov | Front de mer neuf | 30–50 K€ |
| Yafo | Pierre, art, histoire | 20–35 K€ |
| Ramat Aviv Gimel | Famille, écoles | 20–30 K€ |
| Park Tzameret | Tours signatures | 35–55 K€ |
| Kerem HaTeimanim | Yéménite, authentique | 18–28 K€ |

## Investir à Tel Aviv en 2026

Le marché immobilier tel-avivien a doublé en quinze ans dans les segments premium. Le rendement locatif moyen est de 3-4% brut, avec une valorisation annuelle moyenne de 5-7% sur la dernière décennie. C'est l'un des marchés urbains les plus performants du Moyen-Orient — et l'un des moins volatils, porté par une demande structurelle de la diaspora.

Pour aller plus loin, consultez notre [page-pilier sur l'immobilier de prestige en Israël](/fr/best-luxury-real-estate-israel) ou nos articles sur les [meilleurs quartiers de Tel Aviv](/fr/journal/meilleurs-quartiers-luxe-tel-aviv).`,
      en: `Tel Aviv is not Israel\'s political capital — that is Jerusalem. But it is the country\'s economic, creative, gastronomic and nocturnal capital. Here is what you need to know before considering living or investing there.

## The essential facts

Tel Aviv has 470,000 residents within city limits, 4.2 million in its metropolitan area (Gush Dan). Founded in 1909 by 66 Jewish families who wanted to leave old Jaffa, the city celebrates its 117th anniversary in 2026.

The climate is Mediterranean: 300 sunny days per year, 25°C average in summer, 15°C in winter. The beach stretches uninterrupted for 14 kilometers along the Mediterranean.

## What Tel Aviv is famous for

**1. The White City, a UNESCO World Heritage site.** Tel Aviv hosts the world\'s largest concentration of Bauhaus architecture: over 4,000 buildings constructed between the 1930s and 1950s, mainly by Jewish European architects fleeing Germany. The Bauhaus quarter was inscribed as World Heritage in 2003.

**2. Silicon Wadi.** With over 7,000 startups and the highest number of unicorns per capita in the world, the Tel Aviv region is one of the three major global tech hubs alongside Silicon Valley and Beijing.

**3. The food scene.** Tel Aviv has more restaurants per capita than any other Israeli city. The culinary culture blends Ashkenazi, Sephardic, Mizrahi, Levantine and international traditions — often on the same menu.

**4. The endless night.** Tel Aviv\'s nightlife consistently ranks among the world\'s top five. Florentin, Rothschild, the port and the Old North pulse until 4-5 a.m.

**5. The tolerance.** Tel Aviv is the most liberal, open and progressive city in the Middle East. The annual Pride parade draws 250,000 people.

## The ten neighborhoods to know

| Neighborhood | Atmosphere | Price /m² 2026 |
|---|---|---|
| Rothschild | Historic Bauhaus | €25–35K |
| Neve Tzedek | Low houses, charm | €28–40K |
| Old North | Family premium | €22–32K |
| Florentin | Loft, creatives | €18–28K |
| Sarona | Modern towers | €35–50K |
| Sde Dov | New seafront | €30–50K |
| Jaffa | Stone, art, history | €20–35K |
| Ramat Aviv Gimel | Family, schools | €20–30K |
| Park Tzameret | Signature towers | €35–55K |
| Kerem HaTeimanim | Yemenite, authentic | €18–28K |

## Investing in Tel Aviv in 2026

The Tel Aviv real estate market has doubled over fifteen years in premium segments. The average rental yield is 3-4% gross, with average annual appreciation of 5-7% over the past decade. It is one of the Middle East\'s top-performing urban markets — and one of the least volatile, sustained by structural diaspora demand.

For more, see our [pillar page on luxury real estate in Israel](/en/best-luxury-real-estate-israel) or our articles on [the best Tel Aviv neighborhoods](/en/journal/meilleurs-quartiers-luxe-tel-aviv).`,
      he: `תל אביב אינה הבירה הפוליטית של ישראל — זו ירושלים. אבל היא הבירה הכלכלית, היצירתית, הקולינרית והלילית של המדינה.

## העובדות העיקריות

תל אביב מונה 470,000 תושבים בתחומי העיר, 4.2 מיליון במטרופולין (גוש דן). נוסדה ב-1909 על ידי 66 משפחות יהודיות. אקלים ים-תיכוני: 300 ימי שמש בשנה. החוף משתרע ל-14 קילומטרים.

## במה תל אביב מפורסמת

**1. העיר הלבנה, מורשת עולמית של אונסק"ו.** מעל 4,000 בנייני באוהאוס מהשנים 1930-1950.

**2. Silicon Wadi.** מעל 7,000 סטארטאפים ומספר היוניקורנים הגבוה לנפש בעולם.

**3. הסצנה הקולינרית.** יותר מסעדות לנפש מכל עיר ישראלית אחרת.

**4. הלילה האינסופי.** חיי הלילה של תל אביב מדורגים בעקביות בחמישה הראשונים בעולם.

**5. הסובלנות.** העיר הליברלית, הפתוחה והפרוגרסיבית ביותר במזרח התיכון.

## עשר השכונות שצריך להכיר

רוטשילד, נווה צדק, הצפון הישן, פלורנטין, סרונה, שדה דב, יפו, רמת אביב ג, פארק צמרת, כרם התימנים.

## השקעה בתל אביב ב-2026

שוק הנדל"ן בתל אביב הוכפל בחמש-עשרה שנים במגזרי הפרמיום. תשואת שכירות ממוצעת 3-4% ברוטו, השבחה שנתית ממוצעת 5-7%.`,
    },
    relatedSlugs: ['meilleurs-quartiers-luxe-tel-aviv', 'sde-dov-nouvelle-adresse-ultra-prime-tel-aviv', 'tel-aviv-high-rise-condos-definitive-guide'],
    internalLinks: { ville: ['tel-aviv'] },
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
