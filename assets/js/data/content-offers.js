// ==================== ARGUMENTAIRE DES OFFRES ====================
// Contenu commercial des fiches détail : ce que le client gagne, ce qu'il reçoit, en combien de temps.
// Le prix reste volontairement au second plan : il est affiché en fin de fiche, après la valeur.
// Règle : chaque affirmation doit être tenable. Les délais et la garantie viennent des CGV,
// les prix viennent de `pricingGrid` (ids ci-dessous) : aucune valeur n'est recopiée à la main.
const serviceOffers = [
  {
    id: "vitrine",
    iconId: "monitor",
    priceIds: ["vitrine-essentiel", "vitrine-pro", "logo"],
    timeline: { fr: "1 à 3 semaines selon le nombre de pages", en: "1 to 3 weeks depending on the number of pages" },
    audience: {
      fr: "PME, commerces et professionnels qui n'ont pas encore de site, ou dont le site ne ressemble plus à leur activité.",
      en: "Small businesses and professionals with no website yet, or whose site no longer reflects their activity.",
    },
    promise: {
      fr: "Une vitrine qui travaille pour vous : vos clients vous trouvent, comprennent ce que vous faites, et vous contactent.",
      en: "A storefront that works for you: clients find you, understand what you do, and get in touch.",
    },
    benefits: {
      fr: [
        "Vous êtes trouvable sur Google quand un client cherche votre métier à Libreville.",
        "Le site s'ouvre vite, même en 3G : vos visiteurs ne partent pas avant d'avoir lu.",
        "Chaque page pousse vers un contact WhatsApp ou un formulaire, pas vers une impasse.",
        "Vous gardez la main : on vous forme à la prise en main avant la livraison.",
      ],
      en: [
        "You show up on Google when a client searches for your trade in Libreville.",
        "The site loads fast, even on 3G: visitors stay long enough to read you.",
        "Every page leads to WhatsApp or a form, never to a dead end.",
        "You stay in control: hand-over training is included before delivery.",
      ],
    },
    deliverables: {
      fr: [
        "De 1 à 10 pages selon la formule (accueil, services, à propos, contact…)",
        "Affichage adapté au mobile, à la tablette et à l'ordinateur",
        "Formulaire de contact et bouton WhatsApp directs",
        "Bases du référencement : titres, descriptions, plan du site, vitesse",
        "Prise en main offerte à la livraison",
      ],
      en: [
        "From 1 to 10 pages depending on the package (home, services, about, contact…)",
        "Layout adapted to mobile, tablet and desktop",
        "Contact form and direct WhatsApp button",
        "SEO basics: titles, descriptions, sitemap, speed",
        "Hand-over training included at delivery",
      ],
    },
  },
  {
    id: "ecommerce",
    iconId: "cart",
    priceIds: ["ecommerce-startup", "ecommerce-business"],
    timeline: { fr: "3 à 8 semaines selon le catalogue", en: "3 to 8 weeks depending on the catalogue" },
    audience: {
      fr: "Commerçants et marques qui vendent déjà sur WhatsApp ou Instagram et veulent encaisser sans relancer chaque client à la main.",
      en: "Shops and brands already selling on WhatsApp or Instagram who want to take orders without chasing every client by hand.",
    },
    promise: {
      fr: "Votre boutique prend les commandes, même quand vous dormez, et vous savez enfin ce qui se vend.",
      en: "Your store takes orders even while you sleep, and you finally know what actually sells.",
    },
    benefits: {
      fr: [
        "Vos clients commandent seuls : fini les allers-retours pour chaque prix et chaque stock.",
        "Paiement Mobile Money : vos clients payent avec ce qu'ils ont déjà dans la poche.",
        "Le stock se met à jour tout seul : vous ne vendez plus un produit épuisé.",
        "Un tableau de bord vous montre les ventes, les produits qui marchent et les paniers abandonnés.",
      ],
      en: [
        "Clients order on their own: no more back-and-forth about prices and stock.",
        "Mobile Money payment: your clients pay with what they already have.",
        "Stock updates itself: you stop selling products you no longer have.",
        "A dashboard shows sales, best sellers and abandoned carts.",
      ],
    },
    deliverables: {
      fr: [
        "Catalogue de 20 produits ou illimité selon la formule",
        "Paiement sécurisé et encaissement Mobile Money",
        "Gestion des stocks et des commandes",
        "Tableau de bord des ventes",
        "Formation à la gestion de votre boutique",
      ],
      en: [
        "A 20-product or unlimited catalogue depending on the package",
        "Secure payment and Mobile Money collection",
        "Stock and order management",
        "Sales dashboard",
        "Training to run your store",
      ],
    },
  },
  {
    id: "seo",
    iconId: "search",
    priceIds: ["audit-seo", "optimisation-seo", "contenu-seo"],
    timeline: { fr: "Audit livré sous 1 semaine, effets visibles en 2 à 3 mois", en: "Audit delivered within a week, results visible in 2 to 3 months" },
    audience: {
      fr: "Entreprises qui ont déjà un site mais que personne ne trouve sur Google.",
      en: "Businesses that already have a website nobody finds on Google.",
    },
    promise: {
      fr: "Arrêter de payer de la publicité pour être vu : votre site remonte sur les recherches qui amènent de vrais clients.",
      en: "Stop paying for ads to be seen: your site climbs on the searches that bring real clients.",
    },
    benefits: {
      fr: [
        "Vous savez précisément pourquoi vos concurrents passent devant vous.",
        "Vous ciblez les recherches locales, celles qui amènent des clients au Gabon.",
        "Les corrections sont classées par impact : vous commencez par ce qui rapporte.",
        "Chaque recommandation est expliquée en français simple, pas en jargon.",
      ],
      en: [
        "You learn exactly why competitors rank above you.",
        "You target local searches, the ones that bring clients in Gabon.",
        "Fixes are ranked by impact: you start with what pays off.",
        "Every recommendation is explained in plain language, not jargon.",
      ],
    },
    deliverables: {
      fr: [
        "Audit complet : technique, contenu, concurrence",
        "Liste d'actions classées par priorité et par gain attendu",
        "Optimisation des pages existantes (sur demande)",
        "Rédaction de contenu optimisé (sur demande)",
      ],
      en: [
        "Full audit: technical, content, competition",
        "Action list ranked by priority and expected gain",
        "Optimisation of existing pages (on request)",
        "Optimised content writing (on request)",
      ],
    },
  },
  {
    id: "maintenance",
    iconId: "wrench",
    priceIds: ["maintenance", "hebergement", "domaine", "forfait-annuel"],
    timeline: { fr: "Engagement mensuel, sans durée minimale", en: "Monthly, with no minimum commitment" },
    audience: {
      fr: "Tout propriétaire de site qui ne veut pas découvrir une panne par un appel de client.",
      en: "Any site owner who would rather not hear about an outage from a client.",
    },
    promise: {
      fr: "Votre site reste en ligne, à jour et sauvegardé, sans que vous ayez à y penser.",
      en: "Your site stays online, up to date and backed up, without you thinking about it.",
    },
    benefits: {
      fr: [
        "Les mises à jour de sécurité sont faites avant qu'une faille ne soit exploitée.",
        "Des sauvegardes régulières : une erreur ne coûte plus votre site entier.",
        "Un interlocuteur joignable sur WhatsApp quand quelque chose cloche.",
        "Les corrections de bugs sont comprises, pas facturées à la pièce.",
      ],
      en: [
        "Security updates land before a flaw gets exploited.",
        "Regular backups: one mistake no longer costs you the whole site.",
        "A contact reachable on WhatsApp when something breaks.",
        "Bug fixes are included, not billed one by one.",
      ],
    },
    deliverables: {
      fr: [
        "Mises à jour techniques et de sécurité",
        "Sauvegardes régulières et restauration",
        "Support technique prioritaire",
        "Corrections de bugs",
        "Hébergement et nom de domaine gérés sur demande",
      ],
      en: [
        "Technical and security updates",
        "Regular backups and restore",
        "Priority technical support",
        "Bug fixes",
        "Hosting and domain managed on request",
      ],
    },
  },
  {
    id: "social",
    iconId: "megaphone",
    priceIds: ["social-starter", "social-growth", "social-pro"],
    timeline: { fr: "Premiers contenus publiés la semaine suivant la validation", en: "First posts published the week after approval" },
    audience: {
      fr: "Marques qui publient quand elles y pensent, et dont la page s'éteint dès que le travail reprend.",
      en: "Brands that post when they remember to, and whose page goes quiet as soon as work picks up.",
    },
    promise: {
      fr: "Une présence régulière et tenue, pour rester dans la tête de vos clients entre deux achats.",
      en: "A steady, reliable presence that keeps you in mind between two purchases.",
    },
    benefits: {
      fr: [
        "Un calendrier tenu : vous publiez même les semaines chargées.",
        "Des visuels cohérents, aux couleurs de votre marque, pas des images génériques.",
        "Les messages reçus trouvent une réponse rapide, donc des ventes qui ne se perdent pas.",
        "Un rapport mensuel qui dit ce qui a marché, et ce qu'on arrête.",
      ],
      en: [
        "A calendar that holds: you keep posting even on busy weeks.",
        "Consistent visuals in your brand colours, not stock images.",
        "Incoming messages get quick replies, so sales stop slipping away.",
        "A monthly report saying what worked, and what we stop doing.",
      ],
    },
    deliverables: {
      fr: [
        "10, 20 posts par mois ou publication illimitée selon la formule",
        "Création des visuels et rédaction des textes",
        "Planification et publication",
        "Community management et reporting selon la formule",
      ],
      en: [
        "10, 20 posts per month or unlimited depending on the package",
        "Visual design and copywriting",
        "Scheduling and publishing",
        "Community management and reporting depending on the package",
      ],
    },
  },
  {
    id: "audit",
    iconId: "chart",
    priceIds: ["consultation", "audit-performance", "workspace"],
    timeline: { fr: "Séance d'une heure, compte rendu écrit sous 48 h", en: "One-hour session, written summary within 48h" },
    audience: {
      fr: "Dirigeants qui hésitent entre plusieurs outils, ou qui payent des abonnements sans savoir s'ils servent.",
      en: "Business owners torn between tools, or paying for subscriptions without knowing if they help.",
    },
    promise: {
      fr: "Savoir quoi faire avant de dépenser : un avis extérieur, chiffré, sur vos outils et vos priorités.",
      en: "Know what to do before spending: an outside, costed opinion on your tools and priorities.",
    },
    benefits: {
      fr: [
        "Vous repartez avec un plan d'action, pas avec une liste d'options.",
        "Vous évitez les abonnements qui font doublon.",
        "Les priorités sont classées selon ce que votre activité peut absorber.",
        "Aucun engagement : l'audit vaut même si vous réalisez le projet ailleurs.",
      ],
      en: [
        "You leave with an action plan, not a list of options.",
        "You avoid overlapping subscriptions.",
        "Priorities are ranked by what your business can absorb.",
        "No strings attached: the audit stands even if you build elsewhere.",
      ],
    },
    deliverables: {
      fr: [
        "Séance de travail avec le dirigeant",
        "Compte rendu écrit et plan d'action priorisé",
        "Audit de performance du site existant (sur demande)",
        "Mise en place des outils retenus (sur demande)",
      ],
      en: [
        "Working session with the business owner",
        "Written summary and prioritised action plan",
        "Performance audit of the existing site (on request)",
        "Setup of the selected tools (on request)",
      ],
    },
  },
];

// Accès par identifiant : les cartes des pages Accueil et Services ouvrent la fiche correspondante.
const serviceOfferById = Object.fromEntries(serviceOffers.map((offer) => [offer.id, offer]));
