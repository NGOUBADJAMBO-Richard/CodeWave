// ==================== GRILLE TARIFAIRE (XAF) ====================
// Source unique des prix des prestations : cartes, grille complète et messages WhatsApp en dérivent.
// Pour changer un prix, modifier uniquement `amount` ici.
const PRICE_UNITS = {
  year: { fr: "/ an", en: "/ year" },
  month: { fr: "/ mois", en: "/ month" },
  hour: { fr: "/ h", en: "/ hour" },
  seat: { fr: "/ poste", en: "/ workstation" },
  yearSeat: { fr: "/ an / poste", en: "/ year / workstation" },
  audit: { fr: "/ audit", en: "/ audit" },
  group: { fr: "/ groupe", en: "/ group" },
};

const pricingGrid = [
  {
    id: "web",
    title: { fr: "Création & développement web", en: "Web design & development" },
    items: [
      { id: "vitrine-essentiel", amount: 90000, label: { fr: "Site vitrine — Essentiel (1 à 5 pages)", en: "Business Website — Essential (1 to 5 pages)" } },
      { id: "vitrine-pro", amount: 175000, label: { fr: "Site vitrine — Pro (jusqu'à 10 pages)", en: "Business Website — Pro (up to 10 pages)" } },
      { id: "blog-portfolio", amount: 120000, label: { fr: "Blog / Portfolio", en: "Blog / Portfolio" } },
      { id: "ecommerce-startup", amount: 250000, label: { fr: "E-commerce — Start-Up (jusqu'à 20 produits)", en: "E-commerce — Start-Up (up to 20 products)" } },
      { id: "ecommerce-business", amount: 450000, label: { fr: "E-commerce — Business (produits illimités)", en: "E-commerce — Business (unlimited products)" } },
      { id: "app-mobile", amount: 600000, from: true, label: { fr: "Application mobile (Flutter)", en: "Mobile app (Flutter)" } },
      { id: "refonte", amount: 60000, from: true, label: { fr: "Refonte de site existant", en: "Existing website redesign" } },
      { id: "fonctionnalite", amount: 20000, from: true, label: { fr: "Ajout de fonctionnalité", en: "New feature" } },
      { id: "logo", amount: 25000, label: { fr: "Logo & identité visuelle", en: "Logo & visual identity" } },
    ],
  },
  {
    id: "visibilite",
    title: { fr: "Croissance & visibilité", en: "Growth & visibility" },
    items: [
      { id: "audit-seo", amount: 45000, label: { fr: "Audit SEO complet", en: "Full SEO audit" } },
      { id: "optimisation-seo", amount: 35000, from: true, label: { fr: "Optimisation SEO", en: "SEO optimization" } },
      { id: "contenu-seo", amount: 30000, label: { fr: "Rédaction de contenu SEO (3 textes)", en: "SEO copywriting (3 texts)" } },
      { id: "social-starter", amount: 35000, unit: "month", label: { fr: "Réseaux sociaux — Starter (10 posts / mois)", en: "Social media — Starter (10 posts / month)" } },
      { id: "social-growth", amount: 60000, unit: "month", label: { fr: "Réseaux sociaux — Growth (20 posts / mois)", en: "Social media — Growth (20 posts / month)" } },
      { id: "social-pro", amount: 90000, unit: "month", label: { fr: "Réseaux sociaux — Pro (illimité)", en: "Social media — Pro (unlimited)" } },
      { id: "emailing", amount: 25000, label: { fr: "Accompagnement emailing", en: "Email marketing setup" } },
    ],
  },
  {
    id: "infogerance",
    title: { fr: "Infogérance, hébergement & sécurité", en: "Managed services, hosting & security" },
    items: [
      { id: "hebergement", amount: 18000, unit: "year", label: { fr: "Hébergement web standard", en: "Standard web hosting" } },
      { id: "domaine", amount: 12000, unit: "year", label: { fr: "Nom de domaine", en: "Domain name" } },
      { id: "maintenance", amount: 12000, unit: "month", label: { fr: "Maintenance mensuelle", en: "Monthly maintenance" } },
      { id: "forfait-annuel", amount: 85000, unit: "year", label: { fr: "Forfait annuel clé en main", en: "All-inclusive annual plan" } },
      { id: "securite-waf", amount: 8000, unit: "month", label: { fr: "Sécurité avancée (WAF & CDN)", en: "Advanced security (WAF & CDN)" } },
      { id: "audit-performance", amount: 40000, label: { fr: "Audit de performance web", en: "Web performance audit" } },
    ],
  },
  {
    id: "conseil",
    title: { fr: "Conseil & équipement", en: "Consulting & equipment" },
    items: [
      { id: "consultation", amount: 15000, unit: "hour", label: { fr: "Consultation stratégie digitale", en: "Digital strategy consultation" } },
      { id: "installation", amount: 20000, unit: "seat", label: { fr: "Installation & configuration", en: "Installation & setup" } },
      { id: "workspace", amount: 15000, label: { fr: "Mise en place Google Workspace / Microsoft 365", en: "Google Workspace / Microsoft 365 setup" } },
      { id: "support-materiel", amount: 40000, unit: "yearSeat", label: { fr: "Contrat de support matériel", en: "Hardware support contract" } },
    ],
  },
];

// Séparateur de milliers : espace insécable en français (pas de coupure de ligne), virgule en anglais.
function formatXAF(amount, lang) {
  return String(amount).replace(/\B(?=(\d{3})+(?!\d))/g, lang === "en" ? "," : " ");
}

function findPrice(id) {
  for (const group of pricingGrid) {
    const item = group.items.find((i) => i.id === id);
    if (item) return item;
  }
  throw new Error(`Prix inconnu dans pricingGrid : ${id}`);
}

// Libellé complet, ex. « Dès 90 000 XAF / mois ». `options` surcharge `from` et `unit` de la grille.
function priceLabel(id, lang, options = {}) {
  const item = findPrice(id);
  const from = options.from ?? item.from;
  const unit = options.unit ?? item.unit;
  const prefix = from ? (lang === "en" ? "From " : "Dès ") : "";
  const suffix = unit ? ` ${PRICE_UNITS[unit][lang]}` : "";
  // Insécable avant « XAF » : le montant et la devise ne se séparent jamais en fin de ligne.
  return `${prefix}${formatXAF(item.amount, lang)} XAF${suffix}`;
}

const translations = {
  fr: {
    nav: {
      home: "Accueil",
      services: "Services",
      formations: "Formations",
      portfolio: "Portfolio",
      blog: "Blog",
      about: "À propos",
      contact: "Contact",
      quote: "Devis gratuit",
    },
    hero: {
      label: "Studio digital au Gabon",
      headline: "Votre présence\ndigitale,\nredéfinie.",
      sub: "Sites web performants, e-commerce sur mesure et stratégie digitale pour les entreprises gabonaises qui veulent dominer en ligne.",
      cta1: "Demander un devis",
      cta2: "Voir nos réalisations",
      stat1_n: "50+",
      stat1_l: "Projets réalisés",
      stat2_n: "20+",
      stat2_l: "Clients satisfaits",
      stat3_n: "100%",
      stat3_l: "Satisfaction client",
      promise: "Donnez vie à vos idées, nous les transformons en solutions tangibles.",
      // Engagements vérifiables affichés dans le hero (pas de chiffres invérifiables).
      chips: ["Devis gratuit sous 24 h", "Airtel & Moov Money", "Prix affichés"],
      techLabel: "Technologies et moyens de paiement",
      process: {
        label: "Méthode",
        title: "Comment on travaille",
        steps: [
          { icon: "chat", title: "Échange & devis", desc: "Vous décrivez votre besoin, sur WhatsApp ou par formulaire. Devis gratuit sous 24 h." },
          { icon: "layout", title: "Maquette", desc: "Vous validez la structure et le design avant la moindre ligne de code." },
          { icon: "code", title: "Développement", desc: "Un site rapide, pensé d'abord pour le mobile et les connexions lentes." },
          { icon: "rocket", title: "Mise en ligne & suivi", desc: "Prise en main offerte, puis maintenance si vous le souhaitez." },
        ],
      },
    },
    services: {
      label: "Nos services",
      title: "Solutions digitales\ncomplètes",
      sub: "De la conception à la mise en ligne, nous couvrons tous vos besoins digitaux avec expertise et passion.",
      items: [
        {
          icon: "🖥️",
          iconId: "monitor",
          title: "Site vitrine",
          desc: "Site professionnel responsive qui présente votre marque et convertit vos visiteurs en clients.",
          price: priceLabel("vitrine-essentiel", "fr", { from: true }),
          tag: "Populaire",
        },
        {
          icon: "🛒",
          iconId: "cart",
          title: "E-Commerce",
          desc: "Boutique en ligne complète avec paiement sécurisé, gestion des stocks et tableau de bord.",
          price: priceLabel("ecommerce-startup", "fr", { from: true }),
          tag: "Premium",
        },
        {
          icon: "🔍",
          iconId: "search",
          title: "SEO & référencement",
          desc: "Audit complet et optimisation de votre visibilité sur Google pour attirer plus de clients.",
          price: priceLabel("audit-seo", "fr", { unit: "audit" }),
          tag: "",
        },
        {
          icon: "🔧",
          iconId: "wrench",
          title: "Maintenance",
          desc: "Mises à jour, sauvegardes, sécurité et support technique pour garder votre site au top.",
          price: priceLabel("maintenance", "fr"),
          tag: "",
        },
        {
          icon: "📱",
          iconId: "megaphone",
          title: "Réseaux sociaux",
          desc: "Gestion complète de vos réseaux sociaux : posts, community management et reporting mensuel.",
          price: priceLabel("social-starter", "fr", { from: true }),
          tag: "Nouveau",
        },
        {
          icon: "📊",
          iconId: "chart",
          title: "Audit & stratégie",
          desc: "Consultation personnalisée pour aligner vos objectifs business sur les bons outils numériques.",
          price: priceLabel("consultation", "fr"),
          tag: "",
        },
      ],
      cta: "Voir tous les tarifs",
    },
    social: {
      label: "Gestion Social Media",
      title: "Boostez votre visibilité\nsur les réseaux sociaux",
      sub: "Offres simples et adaptées aux PME locales gabonaises",
      packages: [
        {
          name: "Starter",
          posts: "10 posts / mois",
          items: ["Création de visuels", "Rédaction textes", "Planification"],
          price: formatXAF(findPrice("social-starter").amount, "fr"),
          period: "/ mois",
        },
        {
          name: "Growth",
          posts: "20 posts / mois",
          items: [
            "Création de visuels HD",
            "Community management",
            "Planification",
            "Reporting mensuel",
          ],
          price: formatXAF(findPrice("social-growth").amount, "fr"),
          period: "/ mois",
          highlight: true,
        },
        {
          name: "Pro",
          posts: "Illimité",
          items: [
            "Tout Growth inclus",
            "Stratégie éditoriale",
            "Campagnes sponsorisées",
            "Rapport hebdo",
          ],
          price: formatXAF(findPrice("social-pro").amount, "fr"),
          period: "/ mois",
        },
      ],
    },
    portfolio: {
      label: "Nos réalisations",
      title: "Projets qui ont\ntransformé des entreprises",
      sub: "Découvrez des projets concrets réalisés pour des entreprises gabonaises.",
      filters: [
        "Tous",
        "E-Commerce",
        "Site Vitrine",
        "Application",
        "Portfolio",
      ],
      cta: "Démarrer mon projet",
    },
    blog: {
      label: "Blog & actualités",
      title: "Conseils, tutoriels\net tendances web",
      sub: "Restez à la pointe du digital avec nos articles pratiques sur le web, le SEO et l'entrepreneuriat.",
      readMore: "Lire l'article",
      minRead: "min de lecture",
    },
    about: {
      label: "À propos",
      title: "L'agence digitale\nde référence au Gabon",
      desc: "M.G.N CodeWave est un studio de solutions digitales basé au Gabon. Nous accompagnons les PME, startups et entrepreneurs dans leur transformation numérique avec des solutions web sur mesure, performantes et adaptées au marché local.",
      visionary_label: "Le visionnaire",
      visionary_title: "M.G.N A. Richard",
      visionary_desc:
        "Visionnaire du projet, M.G.N A. Richard porte une approche centrée sur l'impact, la qualité et l'innovation. Il imagine des solutions digitales utiles, durables et pensées pour aider les marques à grandir avec clarté et confiance.",
      values: [
        "Innovation & excellence",
        "Proximité client",
        "Résultats mesurables",
        "Transparence totale",
      ],
      skills_title: "Technologies maîtrisées",
      cta: "Travaillons ensemble",
    },
    partnership: {
      label: "Partenariat",
      title: "Devenez partenaire\nde CodeWave",
      sub: "Rejoignez notre écosystème d'experts et développez votre activité digitale au Gabon. Ensemble, créons l'impact numérique du futur.",
      section1: {
        title: "Pourquoi nous rejoindre ?",
        items: [
          {
            icon: "🤝",
            title: "Réseau établi",
            desc: "Accédez à notre réseau de clients, partenaires et experts digitaux au Gabon.",
          },
          {
            icon: "📈",
            title: "Croissance partagée",
            desc: "Participez à la croissance de l'agence et bénéficiez d'opportunités commerciales.",
          },
          {
            icon: "🎓",
            title: "Formation & support",
            desc: "Accès aux ressources, formations et support technique pour vous perfectionner.",
          },
          {
            icon: "💼",
            title: "Opportunités B2B",
            desc: "Développez des projets conjoints et créez des synergies commerciales.",
          },
        ],
      },
      section2: {
        title: "Profils recherchés",
        intro: "Nous cherchons des partenaires dans les domaines suivants :",
        profiles: [
          "Développeurs web (frontend/backend)",
          "Designers UI/UX",
          "Spécialistes SEO & Marketing Digital",
          "Consultants Digital & Business",
          "Freelances et agences complémentaires",
          "Fournisseurs & Prestataires Techniques",
        ],
      },
      section3: {
        title: "Comment ça marche ?",
        steps: [
          {
            num: "1",
            title: "Candidature",
            desc: "Remplissez le formulaire de partenariat avec vos informations.",
          },
          {
            num: "2",
            title: "Évaluation",
            desc: "Notre équipe examine votre profil et vos compétences.",
          },
          {
            num: "3",
            title: "Discussion",
            desc: "Rencontre pour discuter des opportunités et des conditions.",
          },
          {
            num: "4",
            title: "Collaboration",
            desc: "Démarrage officiel du partenariat et premiers projets.",
          },
        ],
      },
      cta: "Remplir le formulaire de partenariat",
      ctaSub:
        "Le formulaire s’ouvre dans un nouvel onglet (Google Forms).",
    },
    contact: {
      label: "Contact",
      title: "Démarrons votre\nprojet ensemble",
      sub: "Remplissez ce formulaire ou contactez-nous directement — nous répondons sous 24h.",
      name: "Nom complet",
      email: "Adresse email",
      subject: "Sujet du projet",
      message: "Décrivez votre projet...",
      send: "Envoyer le message",
      whatsapp: "Écrire sur WhatsApp",
      phone: "+241 66 19 89 18",
      address: "Libreville, Gabon",
    },
    footer: {
      tagline:
        "Votre partenaire digital de confiance au Gabon. Nous transformons vos idées en sites web performants et rentables.",
      services: "Services",
      links: "Liens Rapides",
      legal: "Mentions légales",
      privacy: "Confidentialité",
      rights: "Tous droits réservés.",
      made: "Conçu et développé au Gabon",
    },
    cta_float: "Demander un Devis",
  },
  en: {
    nav: {
      home: "Home",
      services: "Services",
      formations: "Training",
      portfolio: "Portfolio",
      blog: "Blog",
      about: "About",
      contact: "Contact",
      quote: "Free Quote",
    },
    hero: {
      label: "Digital Studio in Gabon",
      headline: "Your Digital\nPresence,\nRedefined.",
      sub: "High-performance websites, custom e-commerce and digital strategy for Gabonese businesses that want to dominate online.",
      cta1: "Get a Quote",
      cta2: "View Our Work",
      stat1_n: "50+",
      stat1_l: "Projects Done",
      stat2_n: "20+",
      stat2_l: "Happy Clients",
      stat3_n: "100%",
      stat3_l: "Client Satisfaction",
      promise: "Bring your ideas to life — we turn them into tangible solutions.",
      chips: ["Free quote within 24h", "Airtel & Moov Money", "Prices shown upfront"],
      techLabel: "Technologies and payment methods",
      process: {
        label: "Method",
        title: "How we work",
        steps: [
          { icon: "chat", title: "Talk & quote", desc: "Tell us what you need, on WhatsApp or through the form. Free quote within 24h." },
          { icon: "layout", title: "Mock-up", desc: "You approve the structure and design before a single line of code." },
          { icon: "code", title: "Development", desc: "A fast site, built mobile-first for slow connections." },
          { icon: "rocket", title: "Launch & follow-up", desc: "Hand-over included, then maintenance if you want it." },
        ],
      },
    },
    services: {
      label: "Our Services",
      title: "Complete Digital\nSolutions",
      sub: "From design to launch, we cover all your digital needs with expertise and passion.",
      items: [
        {
          icon: "🖥️",
          iconId: "monitor",
          title: "Business Website",
          desc: "Professional responsive site that showcases your brand and converts visitors into customers.",
          price: priceLabel("vitrine-essentiel", "en", { from: true }),
          tag: "Popular",
        },
        {
          icon: "🛒",
          iconId: "cart",
          title: "E-Commerce",
          desc: "Full online store with secure payment, inventory management and dashboard.",
          price: priceLabel("ecommerce-startup", "en", { from: true }),
          tag: "Premium",
        },
        {
          icon: "🔍",
          iconId: "search",
          title: "SEO & Ranking",
          desc: "Full audit and optimization of your Google visibility to attract more customers.",
          price: priceLabel("audit-seo", "en", { unit: "audit" }),
          tag: "",
        },
        {
          icon: "🔧",
          iconId: "wrench",
          title: "Maintenance",
          desc: "Updates, backups, security and tech support to keep your site at its best.",
          price: priceLabel("maintenance", "en"),
          tag: "",
        },
        {
          icon: "📱",
          iconId: "megaphone",
          title: "Social Media",
          desc: "Complete social media management: posts, community management and monthly reports.",
          price: priceLabel("social-starter", "en", { from: true }),
          tag: "New",
        },
        {
          icon: "📊",
          iconId: "chart",
          title: "Audit & Strategy",
          desc: "Personalized consultation to align your business goals with the right digital tools.",
          price: priceLabel("consultation", "en"),
          tag: "",
        },
      ],
      cta: "See all pricing",
    },
    social: {
      label: "Social Media Management",
      title: "Boost Your Visibility\non Social Media",
      sub: "Simple packages tailored to local Gabonese businesses",
      packages: [
        {
          name: "Starter",
          posts: "10 posts / month",
          items: ["Visual creation", "Copywriting", "Scheduling"],
          price: formatXAF(findPrice("social-starter").amount, "en"),
          period: "/ month",
        },
        {
          name: "Growth",
          posts: "20 posts / month",
          items: [
            "HD visual creation",
            "Community management",
            "Scheduling",
            "Monthly report",
          ],
          price: formatXAF(findPrice("social-growth").amount, "en"),
          period: "/ month",
          highlight: true,
        },
        {
          name: "Pro",
          posts: "Unlimited",
          items: [
            "Everything in Growth",
            "Editorial strategy",
            "Sponsored campaigns",
            "Weekly report",
          ],
          price: formatXAF(findPrice("social-pro").amount, "en"),
          period: "/ month",
        },
      ],
    },
    portfolio: {
      label: "Our Work",
      title: "Projects that\nTransformed Businesses",
      sub: "Discover real projects completed for Gabonese businesses.",
      filters: [
        "All",
        "E-Commerce",
        "Business Site",
        "Application",
        "Portfolio",
      ],
      cta: "Start my project",
    },
    blog: {
      label: "Blog & News",
      title: "Tips, Tutorials\nand Web Trends",
      sub: "Stay at the forefront of digital with our practical articles on web, SEO and entrepreneurship.",
      readMore: "Read article",
      minRead: "min read",
    },
    about: {
      label: "About Us",
      title: "Gabon's Premier\nDigital Agency",
      desc: "M.G.N CodeWave is a digital solutions studio based in Gabon. We support SMEs, startups and entrepreneurs in their digital transformation with custom, high-performance web solutions adapted to the local market.",
      visionary_label: "The Visionary",
      visionary_title: "M.G.N A. Richard",
      visionary_desc:
        "As the visionary behind the project, M.G.N A. Richard champions impact, quality and innovation. He envisions useful, durable digital solutions that help brands grow with clarity and confidence.",
      values: [
        "Innovation & excellence",
        "Client Proximity",
        "Measurable Results",
        "Full Transparency",
      ],
      skills_title: "Technologies We Master",
      cta: "Let's Work Together",
    },
    partnership: {
      label: "Partnership",
      title: "Become a CodeWave\nPartner",
      sub: "Join our ecosystem of experts and grow your digital business in Gabon. Together, let's create the digital impact of the future.",
      section1: {
        title: "Why Join Us?",
        items: [
          {
            icon: "🤝",
            title: "Established Network",
            desc: "Access our network of clients, partners and digital experts in Gabon.",
          },
          {
            icon: "📈",
            title: "Shared Growth",
            desc: "Participate in the agency's growth and benefit from business opportunities.",
          },
          {
            icon: "🎓",
            title: "Training & Support",
            desc: "Access to resources, training and technical support to improve your skills.",
          },
          {
            icon: "💼",
            title: "B2B Opportunities",
            desc: "Develop joint projects and create commercial synergies.",
          },
        ],
      },
      section2: {
        title: "Profiles We're Looking For",
        intro: "We are looking for partners in the following areas:",
        profiles: [
          "Web Developers (Frontend/Backend)",
          "UI/UX Designers",
          "SEO & Digital Marketing Specialists",
          "Digital & Business Consultants",
          "Freelancers and Complementary Agencies",
          "Technical Providers & Suppliers",
        ],
      },
      section3: {
        title: "How It Works",
        steps: [
          {
            num: "1",
            title: "Application",
            desc: "Fill in the partnership form with your information.",
          },
          {
            num: "2",
            title: "Evaluation",
            desc: "Our team reviews your profile and expertise.",
          },
          {
            num: "3",
            title: "Discussion",
            desc: "Meeting to discuss opportunities and terms.",
          },
          {
            num: "4",
            title: "Collaboration",
            desc: "Official partnership start and first projects.",
          },
        ],
      },
      cta: "Fill in the Partnership Form",
      ctaSub: "The form opens in a new tab (Google Forms).",
    },
    contact: {
      label: "Contact",
      title: "Let's Start Your\nProject Together",
      sub: "Fill in this form or contact us directly — we respond within 24h.",
      name: "Full name",
      email: "Email address",
      subject: "Project subject",
      message: "Describe your project...",
      send: "Send Message",
      whatsapp: "Chat on WhatsApp",
      phone: "+241 66 19 89 18",
      address: "Libreville, Gabon",
    },
    footer: {
      tagline:
        "Your trusted digital partner in Gabon. We transform your ideas into high-performing, profitable websites.",
      services: "Services",
      links: "Quick Links",
      legal: "Legal Notice",
      privacy: "Privacy Policy",
      rights: "All rights reserved.",
      made: "Designed and built in Gabon",
    },
    cta_float: "Get a Quote",
  },
};

// ==================== DATA ====================
const portfolioProjects = [
  {
    id: 1,
    title: "Waz'UP",
    subtitle: "Super-app Flutter",
    category: "Application",
    tags: ["Application mobile", "E-commerce & livraison"],
    url: "https://ngoubadjambo-richard.github.io/CodeWave/portfolio/wazup-details.html",
    color: "#6366f1",
  },
  {
    id: 2,
    title: "H2P Group",
    subtitle: "Site & Identité",
    category: "Site Vitrine",
    tags: ["Site vitrine", "Prise de RDV"],
    url: "https://ngoubadjambo-richard.github.io/CodeWave/portfolio/h2p-details.html",
    color: "#0ea5e9",
  },
  {
    id: 3,
    title: "MGN CodeWave",
    subtitle: "Studio digital",
    category: "Portfolio",
    tags: ["Identité", "Design system"],
    url: "https://ngoubadjambo-richard.github.io/CodeWave/portfolio/mgn-codewave-details.html",
    color: "#004AAD",
  },
  {
    id: 4,
    title: "Portfolio Richard",
    subtitle: "Portfolio personnel",
    category: "Portfolio",
    tags: ["Portfolio", "Profil & projets"],
    url: "https://ngoubadjambo-richard.github.io/CodeWave/portfolio/portfolio-richard-details.html",
    color: "#8b5cf6",
  },
  {
    id: 5,
    title: "Le Bon Waz",
    subtitle: "Plateforme e-commerce",
    category: "E-Commerce",
    tags: ["E-Commerce", "Catalogue dynamique"],
    url: "https://ngoubadjambo-richard.github.io/CodeWave/portfolio/lebonwaz-details.html",
    color: "#10b981",
  },
  {
    id: 6,
    title: "Lampe à Mes Pieds",
    subtitle: "Site éditorial",
    category: "Site Vitrine",
    tags: ["Site web", "Collections"],
    url: "https://ngoubadjambo-richard.github.io/CodeWave/portfolio/lamp-details.html",
    color: "#f59e0b",
  },
  {
    id: 7,
    title: "English Fun Club",
    subtitle: "Plateforme e-learning",
    category: "Application",
    tags: ["Site web", "Apprentissage"],
    url: "https://ngoubadjambo-richard.github.io/CodeWave/portfolio/englishfunclub-details.html",
    color: "#ec4899",
  },
  {
    id: 8,
    title: "Découvre qui tu es",
    subtitle: "Expérience interactive",
    category: "Application",
    tags: ["Application", "Tests de profils"],
    url: "https://ngoubadjambo-richard.github.io/CodeWave/portfolio/decouvre-details.html",
    color: "#14b8a6",
  },
  {
    id: 9,
    title: "Projet Booki",
    subtitle: "Prototype réservation",
    category: "Site Vitrine",
    tags: ["Site web", "Portail hôtelier"],
    url: "https://ngoubadjambo-richard.github.io/CodeWave/portfolio/booki-details.html",
    color: "#64748b",
  },
  {
    id: 10,
    title: "Grâce Déployée",
    subtitle: "Site communautaire",
    category: "Site Vitrine",
    tags: ["Site web", "Agenda & sermons"],
    url: "https://ngoubadjambo-richard.github.io/CodeWave/portfolio/gracedeploye-details.html",
    color: "#7c3aed",
  },
  {
    id: 11,
    title: "API Airtel Money",
    subtitle: "Documentation API",
    category: "Application",
    tags: ["API", "Guide intégration"],
    url: "https://ngoubadjambo-richard.github.io/CodeWave/portfolio/api-airtel.html",
    color: "#dc2626",
  },
  {
    id: 12,
    title: "LMS Platform",
    subtitle: "Leads management",
    category: "Application",
    tags: ["Application", "Prospection"],
    url: "https://ngoubadjambo-richard.github.io/CodeWave/portfolio/gestion-prospects-details.html",
    color: "#0284c7",
  },
  {
    id: 13,
    title: "Portfolio Caleb",
    subtitle: "Portfolio développeur",
    category: "Portfolio",
    tags: ["Portfolio", "Full-Stack Developer"],
    url: "https://ngoubadjambo-richard.github.io/Portfolio-Caleb/",
    color: "#f59e0b",
  },
  {
    id: 14,
    title: "Asaph-music",
    subtitle: "Plateforme musicale",
    category: "Site Vitrine",
    tags: ["Site web", "Musique"],
    url: "https://asaph-music.vercel.app/",
    color: "#db2777",
  },
];

const blogPosts = [
  {
    id: 1,
    title:
      "10 raisons de créer un site web pour votre entreprise au Gabon en 2025",
    titleEn:
      "10 reasons to create a website for your business in Gabon in 2025",
    category: "Conseils",
    categoryEn: "Tips",
    date: "10 décembre 2024",
    dateEn: "December 10, 2024",
    read: "5",
    featured: true,
    url: "https://ngoubadjambo-richard.github.io/CodeWave/blogs/10-raisons-creer-site-web-gabon.html",
    excerpt:
      "Dans un monde de plus en plus numérique, avoir une présence en ligne n'est plus un luxe mais une nécessité.",
    excerptEn:
      "In an increasingly digital world, having an online presence is no longer a luxury but a necessity.",
  },
  {
    id: 2,
    title: "Comment optimiser le référencement de votre site web au Gabon",
    titleEn: "How to optimize your website's SEO in Gabon",
    category: "Tutoriels",
    categoryEn: "Tutorials",
    date: "8 décembre 2024",
    dateEn: "December 8, 2024",
    read: "6",
    featured: false,
    url: "https://ngoubadjambo-richard.github.io/CodeWave/blogs/optimiser-seo-gabon.html",
    excerpt:
      "Le SEO local est crucial pour attirer des clients gabonais. Découvrez nos 7 conseils pratiques.",
    excerptEn:
      "Local SEO is crucial for attracting Gabonese customers. Discover our 7 practical tips.",
  },
  {
    id: 3,
    title: "5 erreurs à éviter lors de la création de votre site e-commerce",
    titleEn: "5 mistakes to avoid when creating your e-commerce site",
    category: "Conseils",
    categoryEn: "Tips",
    date: "5 décembre 2024",
    dateEn: "December 5, 2024",
    read: "4",
    featured: false,
    url: "https://ngoubadjambo-richard.github.io/CodeWave/blogs/erreurs-site-ecommerce.html",
    excerpt:
      "Lancez votre boutique en ligne avec succès en évitant ces erreurs courantes.",
    excerptEn:
      "Launch your online store successfully by avoiding these common mistakes.",
  },
  {
    id: 4,
    title: "Les tendances web design 2025 à adopter au Gabon",
    titleEn: "Web design trends 2025 to adopt in Gabon",
    category: "Actualités",
    categoryEn: "News",
    date: "1er décembre 2024",
    dateEn: "December 1, 2024",
    read: "5",
    featured: false,
    url: "https://ngoubadjambo-richard.github.io/CodeWave/blogs/tendances-web-design-2025.html",
    excerpt:
      "Découvrez les nouvelles tendances de design web qui vont dominer 2025.",
    excerptEn: "Discover the new web design trends that will dominate 2025.",
  },
  {
    id: 5,
    title: "Comment monétiser votre site web : 8 stratégies efficaces",
    titleEn: "How to monetize your website: 8 effective strategies",
    category: "Entrepreneuriat",
    categoryEn: "Entrepreneurship",
    date: "28 novembre 2024",
    dateEn: "November 28, 2024",
    read: "7",
    featured: false,
    url: "https://ngoubadjambo-richard.github.io/CodeWave/blogs/monetiser-site-web.html",
    excerpt:
      "Transformez votre site web en source de revenus avec ces stratégies adaptées au marché gabonais.",
    excerptEn:
      "Transform your website into a revenue source with these strategies adapted to the Gabonese market.",
  },
  {
    id: 6,
    title: "Guide complet : créer une stratégie de contenu pour votre blog",
    titleEn: "Complete guide: creating a content strategy for your blog",
    category: "Tutoriels",
    categoryEn: "Tutorials",
    date: "25 novembre 2024",
    dateEn: "November 25, 2024",
    read: "8",
    featured: false,
    url: "https://ngoubadjambo-richard.github.io/CodeWave/blogs/strategie-contenu-blog.html",
    excerpt:
      "Attirez plus de visiteurs et convertissez-les en clients avec une stratégie de contenu bien pensée.",
    excerptEn:
      "Attract more visitors and convert them into customers with a well-thought-out content strategy.",
  },
  {
    id: 7,
    title: "L'importance de la vitesse de chargement pour votre site web",
    titleEn: "The importance of loading speed for your website",
    category: "Conseils",
    categoryEn: "Tips",
    date: "20 novembre 2024",
    dateEn: "November 20, 2024",
    read: "5",
    featured: false,
    url: "https://ngoubadjambo-richard.github.io/CodeWave/blogs/vitesse-chargement-site-web.html",
    excerpt:
      "Avec la connexion internet au Gabon, la vitesse est cruciale pour la rétention des visiteurs.",
    excerptEn:
      "With internet connections in Gabon, speed is crucial for visitor retention.",
  },
];
