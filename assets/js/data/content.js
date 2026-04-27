const translations = {
  fr: {
    nav: {
      home: "Accueil",
      services: "Services",
      portfolio: "Portfolio",
      blog: "Blog",
      about: "À Propos",
      contact: "Contact",
      quote: "Devis Gratuit",
    },
    hero: {
      label: "Studio Digital au Gabon",
      headline: "Votre Présence\nDigitale,\nRedéfinie.",
      sub: "Sites web performants, e-commerce sur mesure et stratégie digitale pour les entreprises gabonaises qui veulent dominer en ligne.",
      cta1: "Demander un Devis",
      cta2: "Voir nos Réalisations",
      stat1_n: "50+",
      stat1_l: "Projets Réalisés",
      stat2_n: "20+",
      stat2_l: "Clients Satisfaits",
      stat3_n: "100%",
      stat3_l: "Satisfaction Client",
    },
    services: {
      label: "Nos Services",
      title: "Solutions Digitales\nComplètes",
      sub: "De la conception à la mise en ligne, nous couvrons tous vos besoins digitaux avec expertise et passion.",
      items: [
        {
          icon: "🖥️",
          title: "Site Vitrine",
          desc: "Site professionnel responsive qui présente votre marque et convertit vos visiteurs en clients.",
          price: "À partir de 150 000 XAF",
          tag: "Populaire",
        },
        {
          icon: "🛒",
          title: "E-Commerce",
          desc: "Boutique en ligne complète avec paiement sécurisé, gestion des stocks et tableau de bord.",
          price: "À partir de 350 000 XAF",
          tag: "Premium",
        },
        {
          icon: "🔍",
          title: "SEO & Référencement",
          desc: "Audit complet et optimisation de votre visibilité sur Google pour attirer plus de clients.",
          price: "75 000 XAF / audit",
          tag: "",
        },
        {
          icon: "🔧",
          title: "Maintenance",
          desc: "Mises à jour, sauvegardes, sécurité et support technique pour garder votre site au top.",
          price: "À partir de 30 000 XAF / mois",
          tag: "",
        },
        {
          icon: "📱",
          title: "Réseaux Sociaux",
          desc: "Gestion complète de vos réseaux sociaux : posts, community management et reporting mensuel.",
          price: "À partir de 50 000 XAF / mois",
          tag: "Nouveau",
        },
        {
          icon: "📊",
          title: "Audit & Stratégie",
          desc: "Consultation personnalisée pour aligner vos objectifs business sur les bons outils numériques.",
          price: "25 000 XAF / heure",
          tag: "",
        },
      ],
      cta: "Voir tous les tarifs",
    },
    social: {
      label: "Gestion Social Media",
      title: "Boostez votre Visibilité\nsur les Réseaux Sociaux",
      sub: "Offres simples et adaptées aux PME locales gabonaises",
      packages: [
        {
          name: "Starter",
          posts: "10 posts / mois",
          items: ["Création de visuels", "Rédaction textes", "Planification"],
          price: "50 000",
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
          price: "85 000",
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
          price: "120 000",
          period: "/ mois",
        },
      ],
    },
    portfolio: {
      label: "Nos Réalisations",
      title: "Projets qui ont\nTransformé des Entreprises",
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
      label: "Blog & Actualités",
      title: "Conseils, Tutoriels\net Tendances Web",
      sub: "Restez à la pointe du digital avec nos articles pratiques sur le web, le SEO et l'entrepreneuriat.",
      readMore: "Lire l'article",
      minRead: "min de lecture",
    },
    about: {
      label: "À Propos",
      title: "L'Agence Digitale\nde Référence au Gabon",
      desc: "M.G.N CodeWave est un studio de solutions digitales basé au Gabon. Nous accompagnons les PME, startups et entrepreneurs dans leur transformation numérique avec des solutions web sur mesure, performantes et adaptées au marché local.",
      values: [
        "Innovation & Excellence",
        "Proximité Client",
        "Résultats Mesurables",
        "Transparence Totale",
      ],
      skills_title: "Technologies Maîtrisées",
      cta: "Travaillons Ensemble",
    },
    partnership: {
      label: "Partenariat",
      title: "Devenez Partenaire\nde CodeWave",
      sub: "Rejoignez notre écosystème d'experts et développez votre activité digitale au Gabon. Ensemble, créons l'impact numérique du futur.",
      section1: {
        title: "Pourquoi nous rejoindre ?",
        items: [
          {
            icon: "🤝",
            title: "Réseau Établi",
            desc: "Accédez à notre réseau de clients, partenaires et experts digitaux au Gabon.",
          },
          {
            icon: "📈",
            title: "Croissance Partagée",
            desc: "Participez à la croissance de l'agence et bénéficiez d'opportunités commerciales.",
          },
          {
            icon: "🎓",
            title: "Formation & Support",
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
        title: "Profils Recherchés",
        intro: "Nous cherchons des partenaires dans les domaines suivants :",
        profiles: [
          "Développeurs Web (Frontend/Backend)",
          "Designers UI/UX",
          "Spécialistes SEO & Marketing Digital",
          "Consultants Digital & Business",
          "Freelances et Agences Complémentaires",
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
      cta: "Remplir le Formulaire de Partenariat",
      ctaSub:
        "Cliquez ci-dessous pour accéder au formulaire de candidature sécurisé.",
    },
    contact: {
      label: "Contact",
      title: "Démarrons Votre\nProjet Ensemble",
      sub: "Remplissez ce formulaire ou contactez-nous directement — nous répondons sous 24h.",
      name: "Nom complet",
      email: "Adresse email",
      subject: "Sujet du projet",
      message: "Décrivez votre projet...",
      send: "Envoyer le Message",
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
      made: "Fait avec ❤️ au Gabon",
    },
    cta_float: "Demander un Devis",
  },
  en: {
    nav: {
      home: "Home",
      services: "Services",
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
    },
    services: {
      label: "Our Services",
      title: "Complete Digital\nSolutions",
      sub: "From design to launch, we cover all your digital needs with expertise and passion.",
      items: [
        {
          icon: "🖥️",
          title: "Business Website",
          desc: "Professional responsive site that showcases your brand and converts visitors into customers.",
          price: "From 150,000 XAF",
          tag: "Popular",
        },
        {
          icon: "🛒",
          title: "E-Commerce",
          desc: "Full online store with secure payment, inventory management and dashboard.",
          price: "From 350,000 XAF",
          tag: "Premium",
        },
        {
          icon: "🔍",
          title: "SEO & Ranking",
          desc: "Full audit and optimization of your Google visibility to attract more customers.",
          price: "75,000 XAF / audit",
          tag: "",
        },
        {
          icon: "🔧",
          title: "Maintenance",
          desc: "Updates, backups, security and tech support to keep your site at its best.",
          price: "From 30,000 XAF / month",
          tag: "",
        },
        {
          icon: "📱",
          title: "Social Media",
          desc: "Complete social media management: posts, community management and monthly reports.",
          price: "From 50,000 XAF / month",
          tag: "New",
        },
        {
          icon: "📊",
          title: "Audit & Strategy",
          desc: "Personalized consultation to align your business goals with the right digital tools.",
          price: "25,000 XAF / hour",
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
          price: "50,000",
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
          price: "85,000",
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
          price: "120,000",
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
      values: [
        "Innovation & Excellence",
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
      ctaSub: "Click below to access the secure application form.",
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
      made: "Made with ❤️ in Gabon",
    },
    cta_float: "Get a Quote",
  },
};

// ==================== EXTENDED DATA ====================
const portfolioDetails = {
  1: {
    title: "Waz'UP",
    subtitle: "Super-app Flutter",
    client: "Waz'UP",
    deliverable: "Application mobile Flutter",
    role: "Product design & Dev",
    color: "#6366f1",
    category: "Application",
    liveUrl: null,
    description:
      "Conception et développement d'une super-app Flutter réunissant e-commerce, livraison et location. Parcours utilisateur unifié, paiement sécurisé, back-office de suivi logistique et dashboards métiers pour piloter l'activité.",
    descriptionEn:
      "Design and development of a Flutter super-app combining e-commerce, delivery and rental. Unified user journey, secure payment, logistics tracking back-office and business dashboards.",
    features: [
      "Catalogue dynamique avec recherche et filtres",
      "Module livraison et tracking en temps réel",
      "Wallet, paiements mobiles et cartes",
      "Espace vendeur, location et réservation",
      "Notifications push et centre de messages",
    ],
    featuresEn: [
      "Dynamic catalog with search and filters",
      "Delivery module and real-time tracking",
      "Wallet, mobile payments and cards",
      "Seller space, rental and booking",
      "Push notifications and message center",
    ],
    stack: [
      "Flutter",
      "Firebase",
      "Node.js",
      "Stripe / Mobile Money",
      "Design System",
    ],
    duration: "3 mois",
    year: "2024",
    challenge:
      "Unifier 3 modules métiers distincts (e-commerce, livraison, location) dans une seule expérience mobile fluide, adaptée aux réalités de connectivité au Gabon.",
    challengeEn:
      "Unify 3 distinct business modules (e-commerce, delivery, rental) into a single smooth mobile experience, adapted to connectivity realities in Gabon.",
    result:
      "Application performante avec mode hors-ligne, temps de chargement < 2s, et adoption rapide par les premiers utilisateurs.",
    resultEn:
      "High-performance app with offline mode, loading time < 2s, and rapid adoption by early users.",
  },
  2: {
    title: "H2P Group",
    subtitle: "Cabinet Recrutement & Consulting",
    client: "H2P Group",
    deliverable: "Site vitrine complet",
    role: "Développement Frontend",
    color: "#0ea5e9",
    category: "Site Vitrine",
    liveUrl: "https://ngoubadjambo-richard.github.io/H2P-Gabon/index.html",
    description:
      "Plateforme digitale complète pour H2P Group, cabinet spécialisé en recrutement, formations, coaching et consulting au Gabon. Site vitrine présentant les services d'optimisation de performance, gestion de paie, événementiel et accompagnement personnalisé.",
    descriptionEn:
      "Complete digital platform for H2P Group, a firm specializing in recruitment, training, coaching and consulting in Gabon. Showcase site presenting performance optimization, payroll management, events and personalized support services.",
    features: [
      "6 services clés présentés (Recrutement, Formations, Coaching, Consulting, Événementiel, Gestion de Paie)",
      "Présentation détaillée des solutions et méthodologie",
      "Blog professionnel et actualités",
      "Formulaire de contact et prise de rendez-vous",
      "Design responsif et optimisé pour conversions",
      "Intégration de ressources et catalogues PDF",
    ],
    featuresEn: [
      "6 key services presented (Recruitment, Training, Coaching, Consulting, Events, Payroll)",
      "Detailed presentation of solutions and methodology",
      "Professional blog and news",
      "Contact form and appointment booking",
      "Responsive design optimized for conversions",
      "Integration of resources and PDF catalogs",
    ],
    stack: ["HTML/CSS", "JavaScript", "GitHub Pages", "Responsive Design"],
    duration: "3 semaines",
    year: "2024",
    challenge:
      "Créer une image de marque premium pour un cabinet RH naissant, tout en garantissant une lisibilité maximale des 6 offres de services très différentes.",
    challengeEn:
      "Create a premium brand image for a nascent HR firm, while ensuring maximum readability of the 6 very different service offerings.",
    result:
      "Site livré en 3 semaines avec 95+ score PageSpeed, design moderne distinguant H2P de tous les concurrents locaux.",
    resultEn:
      "Site delivered in 3 weeks with 95+ PageSpeed score, modern design setting H2P apart from all local competitors.",
  },
  3: {
    title: "MGN CodeWave",
    subtitle: "Studio digital — Identité & Design System",
    client: "M.G.N CodeWave",
    deliverable: "Identité visuelle complète",
    role: "Branding & Design System",
    color: "#1a56db",
    category: "Portfolio",
    liveUrl: "https://ngoubadjambo-richard.github.io/CodeWave/",
    description:
      "Création complète de l'identité visuelle et du design system de M.G.N CodeWave : logo, charte graphique, composants UI, typographie, palette de couleurs et guidelines applicables sur tous les supports digitaux et print.",
    descriptionEn:
      "Complete creation of M.G.N CodeWave's visual identity and design system: logo, graphic charter, UI components, typography, color palette and guidelines applicable across all digital and print media.",
    features: [
      "Logo principal et déclinaisons (light/dark)",
      "Palette de couleurs primaires et secondaires",
      "Typographie display (Syne) + corps (DM Sans)",
      "Bibliothèque de composants UI réutilisables",
      "Guidelines responsive et accessibilité",
      "Templates de documents et présentations",
    ],
    featuresEn: [
      "Main logo and variations (light/dark)",
      "Primary and secondary color palette",
      "Display typography (Syne) + body (DM Sans)",
      "Reusable UI component library",
      "Responsive and accessibility guidelines",
      "Document and presentation templates",
    ],
    stack: ["Figma", "Adobe Illustrator", "Tailwind CSS", "Design Tokens"],
    duration: "2 semaines",
    year: "2023",
    challenge:
      "Créer une identité reconnaissable et mémorable qui allie technicité (dev) et créativité (design), positionnant CodeWave comme studio premium au Gabon.",
    challengeEn:
      "Create a recognizable and memorable identity that combines technical expertise (dev) and creativity (design), positioning CodeWave as a premium studio in Gabon.",
    result:
      "Système cohérent déployé sur tous les canaux, reconnaissance immédiate de la marque MGN CodeWave par les clients cibles.",
    resultEn:
      "Consistent system deployed across all channels, immediate brand recognition of MGN CodeWave by target clients.",
  },
  4: {
    title: "Portfolio Richard",
    subtitle: "Portfolio développeur personnel",
    client: "Ngoubadjambo Richard",
    deliverable: "Portfolio interactif",
    role: "Design & Développement",
    color: "#8b5cf6",
    category: "Portfolio",
    liveUrl: "https://ngoubadjambo-richard.github.io/",
    description:
      "Portfolio personnel de Richard Ngoubadjambo, développeur full-stack et fondateur de MGN CodeWave. Présentation des compétences, projets réalisés, parcours professionnel et canaux de contact direct.",
    descriptionEn:
      "Personal portfolio of Richard Ngoubadjambo, full-stack developer and founder of MGN CodeWave. Showcasing skills, completed projects, professional background and direct contact channels.",
    features: [
      "Présentation des compétences techniques",
      "Galerie de projets filtrables",
      "Parcours et expériences détaillées",
      "Mode sombre/clair",
      "Formulaire de contact direct",
      "Animations CSS fluides",
    ],
    featuresEn: [
      "Technical skills showcase",
      "Filterable project gallery",
      "Detailed background and experience",
      "Dark/light mode",
      "Direct contact form",
      "Smooth CSS animations",
    ],
    stack: ["HTML/CSS", "JavaScript", "GitHub Pages", "CSS Animations"],
    duration: "1 semaine",
    year: "2023",
    challenge:
      "Créer un portfolio qui reflète à la fois la personnalité du développeur et son niveau de compétence technique, sans être trop chargé.",
    challengeEn:
      "Create a portfolio that reflects both the developer's personality and technical skill level, without being overloaded.",
    result:
      "Portfolio consulté par +200 visiteurs uniques/mois, à l'origine de plusieurs opportunités de collaboration.",
    resultEn:
      "Portfolio visited by +200 unique visitors/month, source of several collaboration opportunities.",
  },
  5: {
    title: "Le Bon Waz",
    subtitle: "Plateforme e-commerce Gabon",
    client: "Le Bon Waz",
    deliverable: "Boutique e-commerce complète",
    role: "Développement Full-Stack",
    color: "#10b981",
    category: "E-Commerce",
    liveUrl: null,
    description:
      "Plateforme e-commerce multi-catégories avec catalogue dynamique, gestion des stocks, panier et paiement via Mobile Money (Airtel Money, Moov Money). Interface vendeur et tableau de bord admin intégrés.",
    descriptionEn:
      "Multi-category e-commerce platform with dynamic catalog, inventory management, cart and payment via Mobile Money (Airtel Money, Moov Money). Integrated seller interface and admin dashboard.",
    features: [
      "Catalogue produits multi-catégories dynamique",
      "Panier et tunnel de commande optimisé",
      "Intégration Mobile Money (Airtel, Moov)",
      "Tableau de bord vendeur et gestion stock",
      "Système de recherche avancée",
      "Notifications commandes par SMS/email",
    ],
    featuresEn: [
      "Dynamic multi-category product catalog",
      "Cart and optimized order funnel",
      "Mobile Money integration (Airtel, Moov)",
      "Seller dashboard and inventory management",
      "Advanced search system",
      "Order notifications by SMS/email",
    ],
    stack: ["React", "Node.js", "MongoDB", "Mobile Money API", "Tailwind CSS"],
    duration: "6 semaines",
    year: "2024",
    challenge:
      "Intégrer les solutions de paiement mobile gabonaises (Airtel Money, Moov Money) dans un tunnel e-commerce fluide, avec fallback pour les zones à faible connectivité.",
    challengeEn:
      "Integrate Gabonese mobile payment solutions (Airtel Money, Moov Money) into a smooth e-commerce funnel, with fallback for low-connectivity areas.",
    result:
      "Plateforme opérationnelle avec taux de conversion de 4,2%, dépassant la moyenne e-commerce africaine.",
    resultEn:
      "Operational platform with 4.2% conversion rate, exceeding the African e-commerce average.",
  },
  6: {
    title: "Lampe à Mes Pieds",
    subtitle: "Site éditorial — Collections spirituelles",
    client: "Lampe à Mes Pieds",
    deliverable: "Site vitrine éditorial",
    role: "Design & Développement",
    color: "#f59e0b",
    category: "Site Vitrine",
    liveUrl: null,
    description:
      "Site éditorial élégant pour une marque de produits spirituels et de dévotion. Mise en avant des collections avec galerie photographique immersive, blog de contenu inspirationnel et boutique légère.",
    descriptionEn:
      "Elegant editorial site for a spiritual and devotional products brand. Showcasing collections with immersive photo gallery, inspirational content blog and lightweight shop.",
    features: [
      "Galerie immersive multi-collections",
      "Blog éditorial et contenu inspirationnel",
      "Boutique légère avec panier",
      "Design épuré et typographie premium",
      "Optimisation images et performances",
      "Newsletter et liste d'attente",
    ],
    featuresEn: [
      "Immersive multi-collection gallery",
      "Editorial blog and inspirational content",
      "Lightweight shop with cart",
      "Clean design and premium typography",
      "Image optimization and performance",
      "Newsletter and waitlist",
    ],
    stack: ["HTML/CSS", "JavaScript", "CMS custom", "Cloudinary"],
    duration: "2 semaines",
    year: "2024",
    challenge:
      "Retranscrire l'univers spirituel et serein de la marque dans un design digital qui invite à la contemplation sans sacrifier les conversions.",
    challengeEn:
      "Translate the brand's spiritual and serene universe into a digital design that invites contemplation without sacrificing conversions.",
    result:
      "Taux de rebond réduit de 40%, temps de session moyen de 3min45, identité visuelle saluée par la communauté cible.",
    resultEn:
      "Bounce rate reduced by 40%, average session time of 3min45, visual identity praised by the target community.",
  },
  7: {
    title: "English Fun Club",
    subtitle: "Plateforme e-learning anglais",
    client: "English Fun Club",
    deliverable: "Site web e-learning",
    role: "Développement Frontend",
    color: "#ec4899",
    category: "Application",
    liveUrl: null,
    description:
      "Plateforme d'apprentissage de l'anglais en ligne pour le marché gabonais. Cours interactifs, exercices gamifiés, suivi de progression et espace communautaire pour les apprenants.",
    descriptionEn:
      "Online English learning platform for the Gabonese market. Interactive courses, gamified exercises, progress tracking and community space for learners.",
    features: [
      "Cours audio/vidéo interactifs par niveaux",
      "Exercices gamifiés et quiz adaptatifs",
      "Tableau de bord progression personnalisé",
      "Forum et espace d'échange entre apprenants",
      "Certificats de completion téléchargeables",
      "Mode hors-ligne pour les cours téléchargés",
    ],
    featuresEn: [
      "Level-based interactive audio/video courses",
      "Gamified exercises and adaptive quizzes",
      "Personalized progress dashboard",
      "Forum and learner exchange space",
      "Downloadable completion certificates",
      "Offline mode for downloaded courses",
    ],
    stack: ["React", "Node.js", "PostgreSQL", "AWS S3", "WebSockets"],
    duration: "8 semaines",
    year: "2024",
    challenge:
      "Concevoir une expérience d'apprentissage engageante qui fonctionne sur des connexions internet limitées, tout en intégrant des éléments de gamification motivants.",
    challengeEn:
      "Design an engaging learning experience that works on limited internet connections, while integrating motivating gamification elements.",
    result:
      "+350 apprenants inscrits en 3 mois, taux de complétion des cours de 68%, bien au-dessus de la moyenne e-learning (15%).",
    resultEn:
      "+350 learners enrolled in 3 months, course completion rate of 68%, well above the e-learning average (15%).",
  },
  8: {
    title: "Découvre qui tu es",
    subtitle: "Application de tests de profil interactifs",
    client: "Projet indépendant",
    deliverable: "Application web interactive",
    role: "Full-Stack & UX Design",
    color: "#14b8a6",
    category: "Application",
    liveUrl: null,
    description:
      "Application web interactive proposant des tests de personnalité, d'orientation professionnelle et de développement personnel. Interface immersive avec résultats visuels détaillés et partage social.",
    descriptionEn:
      "Interactive web application offering personality tests, career guidance and personal development assessments. Immersive interface with detailed visual results and social sharing.",
    features: [
      "Tests de personnalité MBTI et profil personnalisé",
      "Orientation professionnelle et suggestions de carrières",
      "Résultats visuels avec graphiques interactifs",
      "Partage des résultats sur les réseaux sociaux",
      "Historique des tests et évolution dans le temps",
      "Base de données de profils enrichie",
    ],
    featuresEn: [
      "MBTI personality tests and custom profile",
      "Career guidance and career suggestions",
      "Visual results with interactive charts",
      "Share results on social networks",
      "Test history and evolution over time",
      "Enriched profile database",
    ],
    stack: ["Vue.js", "Firebase", "Chart.js", "CSS Animations"],
    duration: "4 semaines",
    year: "2024",
    challenge:
      "Rendre des concepts psychologiques complexes accessibles et engageants pour le grand public, avec une UX qui donne envie de partager ses résultats.",
    challengeEn:
      "Make complex psychological concepts accessible and engaging for the general public, with a UX that makes users want to share their results.",
    result:
      "Viral au Gabon avec +2000 tests passés en 1 mois, taux de partage social de 32%.",
    resultEn:
      "Viral in Gabon with +2000 tests taken in 1 month, social sharing rate of 32%.",
  },
  9: {
    title: "Projet Booki",
    subtitle: "Prototype portail hôtelier",
    client: "Projet formation OC",
    deliverable: "Prototype HTML/CSS",
    role: "Intégration Frontend",
    color: "#64748b",
    category: "Site Vitrine",
    liveUrl: null,
    description:
      "Prototype d'un portail de réservation hôtelière responsive, développé dans le cadre d'une formation. Intégration pixel-perfect d'une maquette Figma en HTML/CSS pur, avec grilles CSS et flexbox.",
    descriptionEn:
      "Prototype of a responsive hotel booking portal, developed as part of training. Pixel-perfect integration of a Figma mockup in pure HTML/CSS, with CSS grids and flexbox.",
    features: [
      "Intégration pixel-perfect d'une maquette Figma",
      "Recherche de logements par ville et dates",
      "Filtres et tri des résultats",
      "Cards hébergements et activités",
      "Design responsive mobile-first",
      "Validation W3C HTML et CSS",
    ],
    featuresEn: [
      "Pixel-perfect Figma mockup integration",
      "Accommodation search by city and dates",
      "Result filters and sorting",
      "Accommodation and activity cards",
      "Mobile-first responsive design",
      "W3C HTML and CSS validation",
    ],
    stack: ["HTML5", "CSS3", "Flexbox", "CSS Grid"],
    duration: "1 semaine",
    year: "2023",
    challenge:
      "Reproduire fidèlement une maquette complexe multi-breakpoints en HTML/CSS sans JavaScript, en respectant strictement les spécifications de design.",
    challengeEn:
      "Faithfully reproduce a complex multi-breakpoint mockup in HTML/CSS without JavaScript, strictly respecting design specifications.",
    result:
      "Score W3C 100%, responsive parfait sur tous les appareils, validation du module avec mention.",
    resultEn:
      "100% W3C score, perfect responsive on all devices, module validation with distinction.",
  },
  10: {
    title: "Grâce Déployée",
    subtitle: "Site communautaire paroissial",
    client: "Communauté Grâce Déployée",
    deliverable: "Site vitrine communautaire",
    role: "Design & Développement",
    color: "#7c3aed",
    category: "Site Vitrine",
    liveUrl: null,
    description:
      "Site web communautaire pour une église au Gabon. Agenda des cultes et événements, bibliothèque de sermons audio/vidéo, actualités de la communauté et espace don en ligne.",
    descriptionEn:
      "Community website for a church in Gabon. Worship and event schedule, audio/video sermon library, community news and online donation space.",
    features: [
      "Agenda des cultes et événements à venir",
      "Bibliothèque de sermons audio et vidéo",
      "Actualités et annonces communautaires",
      "Système de don en ligne sécurisé",
      "Galerie photos des événements",
      "Newsletter hebdomadaire automatisée",
    ],
    featuresEn: [
      "Worship and upcoming event schedule",
      "Audio and video sermon library",
      "Community news and announcements",
      "Secure online donation system",
      "Event photo gallery",
      "Automated weekly newsletter",
    ],
    stack: ["WordPress", "Elementor", "WooCommerce Donations", "YouTube API"],
    duration: "2 semaines",
    year: "2024",
    challenge:
      "Créer un espace digital chaleureux qui renforce le sentiment d'appartenance communautaire, accessible aux membres moins technophiles.",
    challengeEn:
      "Create a warm digital space that strengthens the sense of community belonging, accessible to less tech-savvy members.",
    result:
      "+180 membres actifs sur la plateforme, réduction de 60% des communications par SMS en faveur du site.",
    resultEn:
      "+180 active members on the platform, 60% reduction in SMS communications in favor of the site.",
  },
  11: {
    title: "API Airtel Money",
    subtitle: "Documentation technique d'intégration",
    client: "Usage interne & Clients",
    deliverable: "Documentation API interactive",
    role: "Technical Writing & Dev",
    color: "#dc2626",
    category: "Application",
    liveUrl:
      "https://ngoubadjambo-richard.github.io/CodeWave/portfolio/api-airtel.html",
    description:
      "Documentation technique complète pour l'intégration de l'API de paiement Airtel Money au Gabon. Guide illustré avec exemples de code, cas d'usage, gestion d'erreurs et sandbox de test.",
    descriptionEn:
      "Complete technical documentation for integrating the Airtel Money payment API in Gabon. Illustrated guide with code examples, use cases, error handling and test sandbox.",
    features: [
      "Guide d'authentification et sécurité OAuth",
      "Endpoints documentés avec exemples JSON",
      "Codes d'erreur et guide de débogage",
      "SDK JavaScript/Node.js fourni",
      "Environnement de test (sandbox) intégré",
      "Webhooks et notifications de paiement",
    ],
    featuresEn: [
      "Authentication and OAuth security guide",
      "Documented endpoints with JSON examples",
      "Error codes and debugging guide",
      "JavaScript/Node.js SDK provided",
      "Integrated test environment (sandbox)",
      "Payment webhooks and notifications",
    ],
    stack: ["Markdown", "Node.js", "REST API", "OAuth 2.0", "JSON"],
    duration: "2 semaines",
    year: "2024",
    challenge:
      "Rendre une API complexe compréhensible pour des développeurs de tous niveaux opérant dans un contexte d'intégration paiement mobile en Afrique centrale.",
    challengeEn:
      "Make a complex API understandable for developers of all levels operating in a mobile payment integration context in Central Africa.",
    result:
      "Documentation utilisée par 8 équipes techniques, réduction du temps d'intégration de 3 jours à 4 heures.",
    resultEn:
      "Documentation used by 8 technical teams, reducing integration time from 3 days to 4 hours.",
  },
  12: {
    title: "LMS Platform",
    subtitle: "Système de gestion des prospects",
    client: "Usage interne MGN CodeWave",
    deliverable: "Application web de gestion",
    role: "Full-Stack Development",
    color: "#0284c7",
    category: "Application",
    liveUrl: null,
    description:
      "Application interne de gestion des leads et prospects commerciaux pour MGN CodeWave. Pipeline visuel, suivi des opportunités, historique des interactions et rapports d'activité automatisés.",
    descriptionEn:
      "Internal lead and sales prospect management application for MGN CodeWave. Visual pipeline, opportunity tracking, interaction history and automated activity reports.",
    features: [
      "Pipeline Kanban visuel des opportunités",
      "Fiche prospect avec historique complet",
      "Rappels et tâches automatisés",
      "Rapports hebdomadaires par email",
      "Import/export CSV et Excel",
      "Tableaux de bord KPI temps réel",
    ],
    featuresEn: [
      "Visual Kanban opportunity pipeline",
      "Prospect card with full history",
      "Automated reminders and tasks",
      "Weekly email reports",
      "CSV and Excel import/export",
      "Real-time KPI dashboards",
    ],
    stack: ["React", "Node.js", "SQLite", "Chart.js", "Tailwind CSS"],
    duration: "3 semaines",
    year: "2024",
    challenge:
      "Construire un outil léger et rapide à déployer, qui centralise toute la prospection commerciale sans la lourdeur des CRM du marché.",
    challengeEn:
      "Build a lightweight, fast-to-deploy tool that centralizes all commercial prospecting without the heaviness of market CRMs.",
    result:
      "Taux de conversion des prospects augmenté de 28%, temps de suivi réduit de 3h à 30min par semaine.",
    resultEn:
      "Prospect conversion rate increased by 28%, follow-up time reduced from 3h to 30min per week.",
  },
  13: {
    title: "Portfolio Caleb",
    subtitle: "Portfolio développeur full-stack",
    client: "Caleb Grace OKAMBA",
    deliverable: "Portfolio interactif",
    role: "Design & Développement",
    color: "#f59e0b",
    category: "Portfolio",
    liveUrl: "https://ngoubadjambo-richard.github.io/Portfolio-Caleb/",
    description:
      "Portfolio professionnel d'un développeur full-stack basé à Rabat. Présentation complète des compétences techniques en web/mobile, 10+ projets réalisés, parcours universitaire et expérience chez Altwork. Design moderne et responsif.",
    descriptionEn:
      "Professional portfolio of a full-stack developer based in Rabat. Complete presentation of web/mobile technical skills, 10+ completed projects, academic background and experience at Altwork. Modern and responsive design.",
    features: [
      "Présentation des compétences front-end et back-end",
      "Galerie de 10+ projets filtrables",
      "Timeline de l'expérience professionnelle",
      "Parcours académique et formations",
      "Section des technologies maîtrisées",
      "Formulaire de contact et liens réseaux",
    ],
    featuresEn: [
      "Front-end and back-end skills showcase",
      "Gallery of 10+ filterable projects",
      "Timeline of professional experience",
      "Academic background and training",
      "Section of mastered technologies",
      "Contact form and social links",
    ],
    stack: [
      "HTML5",
      "CSS3",
      "JavaScript",
      "Bootstrap",
      "Node.js",
      "Express.js",
      "MongoDB",
      "MySQL",
    ],
    duration: "3 semaines",
    year: "2025",
    challenge:
      "Créer un portfolio qui reflète à la fois les compétences full-stack du développeur, son expérience académique et professionnelle, tout en restant simple et performant.",
    challengeEn:
      "Create a portfolio that reflects both the developer's full-stack skills, academic and professional experience, while remaining simple and high-performing.",
    result:
      "Portfolio consulté par des recruteurs et clients potentiels, source de plusieurs opportunités professionnelles et collaborations.",
    resultEn:
      "Portfolio visited by recruiters and potential clients, source of several professional opportunities and collaborations.",
  },
  14: {
    title: "Asaph-music",
    subtitle: "Plateforme musicale",
    client: "Asaph Music",
    deliverable: "Site web vitrine",
    role: "Design & Développement",
    color: "#db2777",
    category: "Site Vitrine",
    liveUrl: "https://asaph-music.vercel.app/",
    description:
      "Conception d'un site vitrine moderne pour Asaph Music afin de présenter l'univers artistique, valoriser les contenus musicaux et faciliter la prise de contact avec le public.",
    descriptionEn:
      "Design and development of a modern showcase website for Asaph Music to present the artistic universe, highlight music content and simplify audience contact.",
    features: [
      "Présentation de l'artiste et de l'identité visuelle",
      "Mise en avant des contenus musicaux",
      "Navigation fluide sur mobile et desktop",
      "Section de contact rapide",
      "Interface moderne et responsive",
      "Déploiement optimisé sur Vercel",
    ],
    featuresEn: [
      "Artist and visual identity presentation",
      "Highlighted music content sections",
      "Smooth navigation on mobile and desktop",
      "Quick contact section",
      "Modern responsive interface",
      "Optimized deployment on Vercel",
    ],
    stack: ["HTML", "CSS", "JavaScript", "Vercel"],
    duration: "1 semaine",
    year: "2026",
    challenge:
      "Créer une présence web artistique forte, avec une expérience immersive tout en conservant des performances rapides.",
    challengeEn:
      "Build a strong artistic web presence with an immersive experience while keeping fast performance.",
    result:
      "Plateforme en ligne qui améliore la visibilité du projet musical et facilite les interactions avec les visiteurs.",
    resultEn:
      "Online platform that improves visibility of the music project and makes interactions with visitors easier.",
  },
};

const blogDetails = {
  1: {
    title:
      "10 raisons de créer un site web pour votre entreprise au Gabon en 2025",
    titleEn:
      "10 reasons to create a website for your business in Gabon in 2025",
    category: "Conseils",
    categoryEn: "Tips",
    date: "10 décembre 2024",
    dateEn: "December 10, 2024",
    read: "8",
    author: "M.G.N CodeWave",
    color: "#1a56db",
    intro:
      "En 2025, avoir un site web n'est plus un luxe, mais une nécessité pour toute entreprise gabonaise souhaitant prospérer dans un monde de plus en plus digital.",
    introEn:
      "In 2025, having a website is no longer a luxury, but a necessity for any Gabonese business wishing to thrive in an increasingly digital world.",
    sections: [
      {
        icon: "🚀",
        title: "Être Visible 24/7, Partout au Gabon",
        titleEn: "Be Visible 24/7, Everywhere in Gabon",
        body: "Contrairement à une boutique physique avec des horaires limités, votre site web travaille pour vous jour et nuit, 7 jours sur 7. Vos clients potentiels peuvent découvrir vos services à 2h du matin depuis Libreville ou depuis une province éloignée.",
        bodyEn:
          "Unlike a physical store with limited hours, your website works for you day and night, 7 days a week. Potential clients can discover your services at 2am from Libreville or from a remote province.",
      },
      {
        icon: "🤝",
        title: "Crédibilité et Confiance Professionnelle",
        titleEn: "Credibility and Professional Trust",
        body: "Au Gabon, 78% des consommateurs vérifient en ligne avant d'acheter un produit ou service. Sans site web, vous perdez instantanément en crédibilité face à vos concurrents qui en ont un. Un site professionnel rassure vos clients et montre que vous êtes une entreprise sérieuse.",
        bodyEn:
          "In Gabon, 78% of consumers check online before purchasing a product or service. Without a website, you instantly lose credibility against competitors who have one.",
      },
      {
        icon: "🌍",
        title: "Atteindre 2,5 Millions d'Internautes Gabonais",
        titleEn: "Reach 2.5 Million Gabonese Internet Users",
        body: "Avec plus de 2,5 millions d'internautes au Gabon et un taux de pénétration mobile de 170%, votre audience potentielle en ligne dépasse largement celle que vous pouvez atteindre physiquement. 70% des Gabonais recherchent des produits et services en ligne avant d'acheter.",
        bodyEn:
          "With over 2.5 million internet users in Gabon and a mobile penetration rate of 170%, your potential online audience far exceeds what you can reach physically. 70% of Gabonese search for products and services online before buying.",
      },
      {
        icon: "🏆",
        title: "Vous Démarquer de Vos Concurrents",
        titleEn: "Stand Out From Your Competitors",
        body: "Actuellement, seulement 15% des PME gabonaises ont un site web professionnel. C'est votre opportunité de prendre l'avantage sur vos concurrents qui n'ont pas encore franchi le pas digital.",
        bodyEn:
          "Currently, only 15% of Gabonese SMEs have a professional website. This is your opportunity to gain an advantage over competitors who haven't yet taken the digital step.",
      },
      {
        icon: "💰",
        title: "Réduire Vos Coûts Marketing",
        titleEn: "Reduce Your Marketing Costs",
        body: "Un site web bien référencé coûte beaucoup moins cher que la publicité traditionnelle (radio, affichage, flyers) et génère des résultats mesurables et durables. Un site professionnel revient à seulement 15 000 FCFA/mois contre 300 000+ FCFA pour un spot radio.",
        bodyEn:
          "A well-ranked website costs much less than traditional advertising (radio, billboards, flyers) and generates measurable, lasting results.",
      },
      {
        icon: "📊",
        title: "Collecter des Données Précieuses",
        titleEn: "Collect Valuable Data",
        body: "Votre site web vous fournit des données précieuses sur vos visiteurs : d'où viennent-ils ? Quelles pages consultent-ils ? Ces informations vous aident à mieux comprendre vos clients et adapter votre offre.",
        bodyEn:
          "Your website provides valuable data about your visitors: where do they come from? Which pages do they visit? This information helps you better understand your customers.",
      },
      {
        icon: "🛒",
        title: "Faciliter la Vente en Ligne",
        titleEn: "Facilitate Online Sales",
        body: "Avec un site e-commerce, vous pouvez vendre vos produits en ligne et accepter des paiements via Mobile Money (Airtel Money, Moov Money). Plus besoin que le client se déplace !",
        bodyEn:
          "With an e-commerce site, you can sell your products online and accept payments via Mobile Money. No need for customers to travel!",
      },
      {
        icon: "🎨",
        title: "Améliorer Votre Image de Marque",
        titleEn: "Improve Your Brand Image",
        body: "Un site web bien conçu reflète votre professionnalisme et vos valeurs. C'est l'occasion de raconter votre histoire, de partager votre vision et de créer un lien émotionnel avec vos clients.",
        bodyEn:
          "A well-designed website reflects your professionalism and values. It's an opportunity to tell your story and create an emotional connection with your customers.",
      },
      {
        icon: "🔮",
        title: "Préparer l'Avenir Digital du Gabon",
        titleEn: "Prepare for Gabon's Digital Future",
        body: "Le Gabon investit massivement dans la transformation digitale avec le Plan Stratégique Gabon Numérique. Les entreprises sans présence en ligne risquent d'être laissées pour compte.",
        bodyEn:
          "Gabon is investing massively in digital transformation. Businesses without an online presence risk being left behind.",
      },
      {
        icon: "📞",
        title: "Être Contacté Facilement",
        titleEn: "Be Easily Contacted",
        body: "Formulaires de contact, WhatsApp Business, numéros de téléphone cliquables… Un site web facilite la prise de contact avec vos clients potentiels 24h/24.",
        bodyEn:
          "Contact forms, WhatsApp Business, clickable phone numbers… A website makes it easy for potential customers to reach you 24/7.",
      },
    ],
    conclusion:
      "Créer un site web pour votre entreprise au Gabon en 2025 n'est plus une option mais une nécessité stratégique. Avec des coûts abordables (à partir de 150 000 XAF chez CodeWave) et des bénéfices considérables, c'est un investissement qui se rentabilise rapidement.",
    conclusionEn:
      "Creating a website for your business in Gabon in 2025 is no longer optional but a strategic necessity. With affordable costs (from 150,000 XAF at CodeWave) and considerable benefits, it's an investment that pays off quickly.",
  },
  2: {
    title: "Comment optimiser le référencement de votre site web au Gabon",
    titleEn: "How to optimize your website's SEO in Gabon",
    category: "Tutoriels",
    categoryEn: "Tutorials",
    date: "8 décembre 2024",
    dateEn: "December 8, 2024",
    read: "6",
    author: "M.G.N CodeWave",
    color: "#0d9488",
    intro:
      "Le SEO local est crucial pour attirer des clients gabonais. Voici nos 7 conseils pratiques pour améliorer votre visibilité sur Google au Gabon.",
    introEn:
      "Local SEO is crucial for attracting Gabonese customers. Here are our 7 practical tips to improve your Google visibility in Gabon.",
    sections: [
      {
        icon: "🎯",
        title: "Cibler les Mots-Clés Locaux",
        titleEn: "Target Local Keywords",
        body: 'Intégrez des termes géographiques dans vos mots-clés : "site web Libreville", "développeur web Gabon", "e-commerce Gabon". Ces mots-clés longue traîne attirent des visiteurs plus qualifiés.',
        bodyEn:
          'Include geographic terms in your keywords: "website Libreville", "web developer Gabon". These long-tail keywords attract more qualified visitors.',
      },
      {
        icon: "📍",
        title: "Optimiser Google My Business",
        titleEn: "Optimize Google My Business",
        body: "Créez et optimisez votre fiche Google My Business avec des photos, horaires, description et catégories précises. C'est gratuit et essentiel pour apparaître dans les recherches locales.",
        bodyEn:
          "Create and optimize your Google My Business listing with photos, hours, description and precise categories. It's free and essential for appearing in local searches.",
      },
      {
        icon: "⚡",
        title: "Améliorer la Vitesse de Chargement",
        titleEn: "Improve Loading Speed",
        body: "Google pénalise les sites lents. Avec les connexions internet en Gabon, la vitesse est doublement importante. Compressez vos images, utilisez un CDN et minimisez vos scripts.",
        bodyEn:
          "Google penalizes slow sites. With internet connections in Gabon, speed is doubly important. Compress your images, use a CDN and minimize your scripts.",
      },
      {
        icon: "📱",
        title: "Prioriser le Mobile-First",
        titleEn: "Prioritize Mobile-First",
        body: "Plus de 70% du trafic web au Gabon provient de smartphones. Google indexe en priorité la version mobile. Assurez-vous que votre site est parfaitement optimisé pour mobile.",
        bodyEn:
          "More than 70% of web traffic in Gabon comes from smartphones. Google indexes the mobile version first. Make sure your site is perfectly optimized for mobile.",
      },
      {
        icon: "✍️",
        title: "Créer du Contenu Régulièrement",
        titleEn: "Create Regular Content",
        body: "Un blog avec des articles liés à votre secteur au Gabon améliore votre autorité SEO. Publiez au moins 2 articles par mois avec des mots-clés pertinents.",
        bodyEn:
          "A blog with articles related to your sector in Gabon improves your SEO authority. Publish at least 2 articles per month with relevant keywords.",
      },
      {
        icon: "🔗",
        title: "Obtenir des Backlinks Locaux",
        titleEn: "Get Local Backlinks",
        body: "Demandez à des annuaires gabonais, chambres de commerce et partenaires de vous référencer. Les liens entrants d'autres sites locaux renforcent votre autorité dans les résultats locaux.",
        bodyEn:
          "Ask Gabonese directories, chambers of commerce and partners to list you. Incoming links from other local sites strengthen your authority in local results.",
      },
      {
        icon: "📊",
        title: "Suivre et Analyser vos Résultats",
        titleEn: "Track and Analyze Your Results",
        body: "Installez Google Analytics et Google Search Console dès le lancement. Ces outils gratuits vous donnent toutes les données nécessaires pour améliorer votre SEO en continu.",
        bodyEn:
          "Install Google Analytics and Google Search Console from launch. These free tools give you all the data needed to continuously improve your SEO.",
      },
    ],
    conclusion:
      "Le SEO est un marathon, pas un sprint. Avec ces 7 pratiques appliquées régulièrement, vous positionnerez votre entreprise en tête des résultats Google au Gabon dans les 3 à 6 mois.",
    conclusionEn:
      "SEO is a marathon, not a sprint. With these 7 practices applied consistently, you'll position your business at the top of Google results in Gabon within 3 to 6 months.",
  },
  3: {
    title: "5 erreurs à éviter lors de la création de votre site e-commerce",
    titleEn: "5 mistakes to avoid when creating your e-commerce site",
    category: "Conseils",
    categoryEn: "Tips",
    date: "5 décembre 2024",
    dateEn: "December 5, 2024",
    read: "4",
    author: "M.G.N CodeWave",
    color: "#ea580c",
    intro:
      "Lancez votre boutique en ligne avec succès en évitant ces 5 erreurs courantes qui coûtent cher aux entrepreneurs gabonais.",
    introEn:
      "Launch your online store successfully by avoiding these 5 common mistakes that cost Gabonese entrepreneurs dearly.",
    sections: [
      {
        icon: "❌",
        title: "Négliger les Paiements Mobiles Locaux",
        titleEn: "Neglecting Local Mobile Payments",
        body: "Au Gabon, la majorité des achats en ligne se font via Airtel Money ou Moov Money. Ne pas intégrer ces solutions dès le départ est la principale cause d'échec des e-commerces locaux.",
        bodyEn:
          "In Gabon, most online purchases are made via Airtel Money or Moov Money. Not integrating these solutions from the start is the main cause of failure for local e-commerces.",
      },
      {
        icon: "📸",
        title: "Des Photos de Mauvaise Qualité",
        titleEn: "Poor Quality Photos",
        body: "Les photos de produits floues ou mal éclairées tuent les conversions. Investissez dans de bonnes photos ou utilisez un fond blanc simple avec un bon éclairage naturel. C'est l'investissement marketing le plus rentable.",
        bodyEn:
          "Blurry or poorly lit product photos kill conversions. Invest in good photos or use a simple white background with good natural lighting. It's the most profitable marketing investment.",
      },
      {
        icon: "🐌",
        title: "Un Site Trop Lent",
        titleEn: "A Too Slow Website",
        body: "Avec les connexions 3G répandues au Gabon, chaque seconde de chargement supplémentaire coûte des clients. Les études montrent qu'un délai de 3 secondes fait fuir 53% des visiteurs mobiles.",
        bodyEn:
          "With widespread 3G connections in Gabon, every extra second of loading costs customers. Studies show a 3-second delay drives away 53% of mobile visitors.",
      },
      {
        icon: "🔒",
        title: "Ignorer la Politique de Retour",
        titleEn: "Ignoring Return Policy",
        body: "L'absence d'une politique de retour claire diminue drastiquement la confiance des acheteurs. Affichez clairement vos conditions de retour, de remboursement et de livraison dès la page produit.",
        bodyEn:
          "The absence of a clear return policy drastically reduces buyer confidence. Clearly display your return, refund and delivery conditions directly on the product page.",
      },
      {
        icon: "📱",
        title: "Oublier l'Optimisation Mobile",
        titleEn: "Forgetting Mobile Optimization",
        body: "80% des achats en ligne au Gabon se font sur smartphone. Un site non optimisé pour mobile signifie perdre 4 clients sur 5. Testez votre boutique sur plusieurs types de téléphones avant le lancement.",
        bodyEn:
          "80% of online purchases in Gabon are made on smartphones. A site not optimized for mobile means losing 4 out of 5 customers. Test your store on several types of phones before launch.",
      },
    ],
    conclusion:
      "Éviter ces 5 erreurs vous donnera une longueur d'avance considérable sur vos concurrents. Chez MGN CodeWave, nous intégrons toutes ces bonnes pratiques dès la conception de votre boutique.",
    conclusionEn:
      "Avoiding these 5 mistakes will give you a considerable head start over your competitors. At MGN CodeWave, we integrate all these best practices from the design stage of your store.",
  },
  4: {
    title: "Les tendances web design 2025 à adopter au Gabon",
    titleEn: "Web design trends 2025 to adopt in Gabon",
    category: "Actualités",
    categoryEn: "News",
    date: "1er décembre 2024",
    dateEn: "December 1, 2024",
    read: "5",
    author: "M.G.N CodeWave",
    color: "#7c3aed",
    intro:
      "Découvrez les nouvelles tendances de design web qui vont dominer 2025 et comment les appliquer intelligemment à votre site gabonais.",
    introEn:
      "Discover the new web design trends that will dominate 2025 and how to intelligently apply them to your Gabonese website.",
    sections: [
      {
        icon: "🌙",
        title: "Le Dark Mode en Standard",
        titleEn: "Dark Mode as Standard",
        body: "Le mode sombre n'est plus une option : c'est attendu. Proposer les deux thèmes (clair et sombre) est désormais un signal de qualité que les utilisateurs apprécient, surtout sur mobile pour économiser la batterie.",
        bodyEn:
          "Dark mode is no longer optional: it's expected. Offering both themes (light and dark) is now a quality signal users appreciate, especially on mobile to save battery.",
      },
      {
        icon: "🌊",
        title: "Les Éléments Organiques et Fluides",
        titleEn: "Organic and Fluid Elements",
        body: "Les formes géométriques rigides laissent place aux courbes organiques, aux formes fluides et aux animations douces qui donnent vie aux interfaces. Les SVG animés remplacent les images statiques.",
        bodyEn:
          "Rigid geometric shapes are giving way to organic curves, fluid shapes and gentle animations that bring interfaces to life. Animated SVGs replace static images.",
      },
      {
        icon: "✏️",
        title: "La Typographie Expressive",
        titleEn: "Expressive Typography",
        body: "Les grandes typographies qui prennent tout l'écran, les polices variables animées et les contrastes de tailles dramatiques domineront 2025. La typo devient le design.",
        bodyEn:
          "Large typography filling the screen, animated variable fonts and dramatic size contrasts will dominate 2025. Typography becomes the design.",
      },
      {
        icon: "⚡",
        title: "Le Design Minimaliste Ultra-Rapide",
        titleEn: "Ultra-Fast Minimalist Design",
        body: "Moins de fioritures, plus d'impact. Les sites qui chargent en moins d'une seconde avec un design épuré gagneront la bataille du SEO et de l'expérience utilisateur, crucial en Gabon.",
        bodyEn:
          "Fewer frills, more impact. Sites that load in under a second with clean design will win the SEO and user experience battle, crucial in Gabon.",
      },
      {
        icon: "🤖",
        title: "Les Interfaces IA-Augmentées",
        titleEn: "AI-Augmented Interfaces",
        body: "Chatbots intelligents, recommandations personnalisées, recherche sémantique... L'IA s'intègre discrètement dans les interfaces pour créer des expériences plus personnalisées.",
        bodyEn:
          "Smart chatbots, personalized recommendations, semantic search... AI integrates discreetly into interfaces to create more personalized experiences.",
      },
    ],
    conclusion:
      "Ces tendances ne sont pas juste esthétiques : elles répondent à des besoins utilisateurs réels. Chez MGN CodeWave, nous intégrons les meilleures pratiques 2025 dans chaque projet pour vous donner une longueur d'avance.",
    conclusionEn:
      "These trends aren't just aesthetic: they respond to real user needs. At MGN CodeWave, we integrate the best 2025 practices into every project to give you a competitive edge.",
  },
  5: {
    title: "Comment monétiser votre site web : 8 stratégies efficaces",
    titleEn: "How to monetize your website: 8 effective strategies",
    category: "Entrepreneuriat",
    categoryEn: "Entrepreneurship",
    date: "28 novembre 2024",
    dateEn: "November 28, 2024",
    read: "7",
    author: "M.G.N CodeWave",
    color: "#d97706",
    intro:
      "Transformez votre site web en source de revenus passive avec ces 8 stratégies de monétisation adaptées au marché gabonais.",
    introEn:
      "Transform your website into a passive income source with these 8 monetization strategies adapted to the Gabonese market.",
    sections: [
      {
        icon: "🛒",
        title: "Vente de Produits ou Services en Ligne",
        titleEn: "Online Product or Service Sales",
        body: "La monétisation la plus directe. Créez une boutique e-commerce et vendez vos produits physiques ou vos services en ligne. Intégrez Airtel Money et Moov Money pour maximiser les conversions.",
        bodyEn:
          "The most direct monetization. Create an e-commerce store and sell your physical products or services online. Integrate Airtel Money and Moov Money to maximize conversions.",
      },
      {
        icon: "📚",
        title: "Vendre des Formations en Ligne",
        titleEn: "Sell Online Courses",
        body: "Le marché de la formation en ligne au Gabon est en pleine explosion. Si vous avez une expertise (comptabilité, cuisine, langues, dev web...), créez des cours vidéo et vendez-les via votre site.",
        bodyEn:
          "The online training market in Gabon is booming. If you have expertise (accounting, cooking, languages, web dev...), create video courses and sell them through your site.",
      },
      {
        icon: "💼",
        title: "Services de Freelance et Consulting",
        titleEn: "Freelance and Consulting Services",
        body: "Votre site vitrine peut devenir une machine à générer des leads de consulting. Un portfolio bien construit et des témoignages clients suffisent pour attirer des missions bien rémunérées.",
        bodyEn:
          "Your showcase site can become a consulting lead generation machine. A well-built portfolio and client testimonials are enough to attract well-paid assignments.",
      },
      {
        icon: "📰",
        title: "Contenu Sponsorisé et Partenariats",
        titleEn: "Sponsored Content and Partnerships",
        body: "Une fois que votre site génère du trafic, les marques locales paieront pour y être mentionnées. Proposez des articles sponsorisés, des revues de produits ou des bannières publicitaires.",
        bodyEn:
          "Once your site generates traffic, local brands will pay to be mentioned. Offer sponsored articles, product reviews or advertising banners.",
      },
      {
        icon: "🎫",
        title: "Abonnement ou Membership Premium",
        titleEn: "Premium Subscription or Membership",
        body: "Créez un espace membres premium avec contenu exclusif, accès anticipé ou support prioritaire. Le modèle d'abonnement génère des revenus récurrents prévisibles.",
        bodyEn:
          "Create a premium member space with exclusive content, early access or priority support. The subscription model generates predictable recurring revenue.",
      },
      {
        icon: "🤝",
        title: "Marketing d'Affiliation",
        titleEn: "Affiliate Marketing",
        body: "Recommandez des produits ou services de tiers et percevez une commission sur chaque vente générée. Adaptez cette stratégie aux produits et services disponibles au Gabon.",
        bodyEn:
          "Recommend third-party products or services and receive a commission on each generated sale. Adapt this strategy to products and services available in Gabon.",
      },
      {
        icon: "📊",
        title: "Données et Insights Sectoriels",
        titleEn: "Sector Data and Insights",
        body: "Si votre site collecte des données pertinentes sur votre secteur, vous pouvez vendre des rapports d'analyse ou des études de marché à des entreprises et décideurs.",
        bodyEn:
          "If your site collects relevant sector data, you can sell analysis reports or market studies to companies and decision-makers.",
      },
      {
        icon: "🎯",
        title: "Publicité Display et Adsense",
        titleEn: "Display Advertising and Adsense",
        body: "Avec suffisamment de trafic, Google Adsense et d'autres régies publicitaires africaines peuvent générer des revenus passifs. Visez 10 000 visiteurs/mois comme seuil minimal.",
        bodyEn:
          "With enough traffic, Google Adsense and other African ad networks can generate passive income. Aim for 10,000 visitors/month as a minimum threshold.",
      },
    ],
    conclusion:
      "La clé est de combiner plusieurs stratégies progressivement. Commencez par la vente directe, puis ajoutez l'affiliation et le contenu sponsorisé une fois votre trafic établi.",
    conclusionEn:
      "The key is to progressively combine multiple strategies. Start with direct sales, then add affiliation and sponsored content once your traffic is established.",
  },
  6: {
    title: "Guide complet : créer une stratégie de contenu pour votre blog",
    titleEn: "Complete guide: creating a content strategy for your blog",
    category: "Tutoriels",
    categoryEn: "Tutorials",
    date: "25 novembre 2024",
    dateEn: "November 25, 2024",
    read: "8",
    author: "M.G.N CodeWave",
    color: "#0891b2",
    intro:
      "Attirez plus de visiteurs et convertissez-les en clients avec une stratégie de contenu bien pensée, adaptée au marché gabonais.",
    introEn:
      "Attract more visitors and convert them into customers with a well-thought-out content strategy adapted to the Gabonese market.",
    sections: [
      {
        icon: "🎯",
        title: "Définir Votre Audience Cible",
        titleEn: "Define Your Target Audience",
        body: "Avant d'écrire un seul article, définissez précisément qui vous écrivez. Créez des personas : âge, profession, problèmes, plateformes utilisées. Au Gabon, votre audience est probablement urbaine, 25-45 ans, sur mobile.",
        bodyEn:
          "Before writing a single article, precisely define who you're writing for. Create personas: age, profession, problems, platforms used. In Gabon, your audience is likely urban, 25-45 years old, on mobile.",
      },
      {
        icon: "🔍",
        title: "Recherche de Mots-Clés Locaux",
        titleEn: "Local Keyword Research",
        body: 'Utilisez Google Keyword Planner avec la géolocalisation Gabon. Cherchez des volumes de recherche locaux : "créer site web Libreville", "devis site internet Gabon". Même 100 recherches/mois peuvent générer des leads précieux.',
        bodyEn:
          "Use Google Keyword Planner with Gabon geolocation. Look for local search volumes. Even 100 searches/month can generate valuable leads.",
      },
      {
        icon: "📅",
        title: "Créer un Calendrier Éditorial",
        titleEn: "Create an Editorial Calendar",
        body: "Planifiez vos articles 1 à 3 mois à l'avance avec un calendrier éditorial. Alternez entre guides pratiques, actualités sectorielles et études de cas. La régularité est plus importante que la fréquence.",
        bodyEn:
          "Plan your articles 1 to 3 months in advance with an editorial calendar. Alternate between practical guides, industry news and case studies. Consistency is more important than frequency.",
      },
      {
        icon: "✍️",
        title: "Écrire pour l'Intent de Recherche",
        titleEn: "Write for Search Intent",
        body: 'Chaque article doit répondre à une question précise que se posent vos clients potentiels. "Comment créer un site e-commerce au Gabon ?" est un exemple d\'intent transactionnel à forte valeur.',
        bodyEn:
          "Each article should answer a specific question your potential customers are asking. 'How to create an e-commerce site in Gabon?' is an example of high-value transactional intent.",
      },
      {
        icon: "📣",
        title: "Promouvoir sur les Bons Canaux",
        titleEn: "Promote on the Right Channels",
        body: "Au Gabon, Facebook, WhatsApp et LinkedIn sont les canaux de distribution de contenu les plus efficaces. Partagez chaque article dans des groupes professionnels gabonais actifs.",
        bodyEn:
          "In Gabon, Facebook, WhatsApp and LinkedIn are the most effective content distribution channels. Share each article in active Gabonese professional groups.",
      },
      {
        icon: "📊",
        title: "Mesurer et Optimiser",
        titleEn: "Measure and Optimize",
        body: "Google Analytics révèle quels articles génèrent le plus de conversions. Doublez la mise sur ces sujets et abandonnez ce qui ne performe pas. Les données ne mentent pas.",
        bodyEn:
          "Google Analytics reveals which articles generate the most conversions. Double down on these topics and abandon what doesn't perform. Data doesn't lie.",
      },
    ],
    conclusion:
      "Une stratégie de contenu cohérente peut multiplier votre trafic par 5 en 12 mois. C'est l'investissement marketing le plus rentable à long terme pour une PME gabonaise.",
    conclusionEn:
      "A consistent content strategy can multiply your traffic by 5 in 12 months. It's the most profitable long-term marketing investment for a Gabonese SME.",
  },
  7: {
    title: "L'importance de la vitesse de chargement pour votre site web",
    titleEn: "The importance of loading speed for your website",
    category: "Conseils",
    categoryEn: "Tips",
    date: "20 novembre 2024",
    dateEn: "November 20, 2024",
    read: "5",
    author: "M.G.N CodeWave",
    color: "#0284c7",
    intro:
      "Avec la connexion internet au Gabon, la vitesse est cruciale pour la rétention des visiteurs et le référencement Google. Voici comment optimiser.",
    introEn:
      "With internet connections in Gabon, speed is crucial for visitor retention and Google ranking. Here's how to optimize.",
    sections: [
      {
        icon: "📊",
        title: "Pourquoi la Vitesse est Critique au Gabon",
        titleEn: "Why Speed is Critical in Gabon",
        body: "53% des visites mobiles sont abandonnées si la page prend plus de 3 secondes à charger. En Gabon, où la 3G est encore largement utilisée, ce chiffre monte à 68%. Chaque seconde perdue = clients perdus.",
        bodyEn:
          "53% of mobile visits are abandoned if the page takes more than 3 seconds to load. In Gabon, where 3G is still widely used, this figure rises to 68%. Every lost second = lost customers.",
      },
      {
        icon: "🖼️",
        title: "Optimiser Vos Images",
        titleEn: "Optimize Your Images",
        body: "Les images représentent 60-80% du poids d'une page. Utilisez le format WebP (30% plus léger que JPEG), compressez avec TinyPNG avant upload, et chargez les images en lazy loading.",
        bodyEn:
          "Images represent 60-80% of a page's weight. Use WebP format (30% lighter than JPEG), compress with TinyPNG before upload, and load images with lazy loading.",
      },
      {
        icon: "💾",
        title: "Activer le Cache du Navigateur",
        titleEn: "Enable Browser Caching",
        body: "Le cache permet aux visiteurs récurrents de charger votre site beaucoup plus vite. Configurez des headers Cache-Control pour les ressources statiques (images, CSS, JS).",
        bodyEn:
          "Caching allows returning visitors to load your site much faster. Configure Cache-Control headers for static resources (images, CSS, JS).",
      },
      {
        icon: "🌐",
        title: "Utiliser un CDN",
        titleEn: "Use a CDN",
        body: "Un CDN (Content Delivery Network) distribue vos fichiers depuis des serveurs proches de vos visiteurs. Cloudflare (gratuit) peut réduire votre temps de chargement de 50% au Gabon.",
        bodyEn:
          "A CDN distributes your files from servers close to your visitors. Cloudflare (free) can reduce your loading time by 50% in Gabon.",
      },
      {
        icon: "🧹",
        title: "Minifier CSS, JS et HTML",
        titleEn: "Minify CSS, JS and HTML",
        body: "Supprimez les espaces, commentaires et caractères inutiles de votre code. Des outils comme UglifyJS et CSSNano font ça automatiquement et peuvent réduire la taille de vos fichiers de 20-40%.",
        bodyEn:
          "Remove spaces, comments and unnecessary characters from your code. Tools like UglifyJS and CSSNano do this automatically and can reduce file size by 20-40%.",
      },
    ],
    conclusion:
      "Un site rapide n'est pas un luxe, c'est un prérequis business au Gabon. Visez un score PageSpeed de 80+ sur mobile. Chez MGN CodeWave, tous nos sites sont livrés avec un score PageSpeed optimisé.",
    conclusionEn:
      "A fast site is not a luxury, it's a business prerequisite in Gabon. Aim for a PageSpeed score of 80+ on mobile. At MGN CodeWave, all our sites are delivered with an optimized PageSpeed score.",
  },
};

const careersData = {
  freelance: [
    {
      id: "fullstack",
      title: "Développeur Full-Stack",
      titleEn: "Full-Stack Developer",
      subtitle: "React / Node.js",
      icon: "💻",
      type: "Freelance",
      location: "Télétravail",
      locationEn: "Remote",
      schedule: "Flexible",
      pay: "% du CA par projet",
      payEn: "% of revenue per project",
      level: "Bac+3 minimum",
      color: "#6366f1",
      description:
        "Développez des applications web modernes et performantes pour nos clients gabonais. React en front, Node.js en back, vous intervenez de la conception à la mise en ligne.",
      descriptionEn:
        "Develop modern, high-performance web applications for our Gabonese clients. React on front-end, Node.js on back-end, you intervene from design to launch.",
      requirements: [
        "Maîtrise de React.js et Node.js",
        "Expérience avec les APIs REST",
        "Connaissance de bases de données SQL/NoSQL",
        "Capacité à travailler en autonomie",
        "Bonne communication écrite",
      ],
      requirementsEn: [
        "React.js and Node.js proficiency",
        "Experience with REST APIs",
        "Knowledge of SQL/NoSQL databases",
        "Ability to work independently",
        "Good written communication",
      ],
      missions: [
        "Développement de sites vitrines et e-commerce",
        "Intégration de maquettes Figma en code",
        "Connexion APIs tierces (paiement mobile, etc.)",
        "Tests et déploiement",
        "Documentation technique",
      ],
      missionsEn: [
        "Development of showcase and e-commerce sites",
        "Integration of Figma mockups into code",
        "Third-party API connection (mobile payment, etc.)",
        "Testing and deployment",
        "Technical documentation",
      ],
    },
    {
      id: "designer",
      title: "Designer UI/UX",
      titleEn: "UI/UX Designer",
      subtitle: "Figma & Design System",
      icon: "🎨",
      type: "Freelance",
      location: "Télétravail",
      locationEn: "Remote",
      schedule: "Par projet",
      pay: "% du CA par projet",
      payEn: "% of revenue per project",
      level: "Bac+2 minimum",
      color: "#ec4899",
      description:
        "Créez des interfaces modernes, intuitives et belles pour nos projets web et mobiles. Vous traduisez les besoins clients en expériences digitales mémorables.",
      descriptionEn:
        "Create modern, intuitive and beautiful interfaces for our web and mobile projects. You translate client needs into memorable digital experiences.",
      requirements: [
        "Maîtrise de Figma (composants, auto-layout, prototypage)",
        "Compréhension des principes UX",
        "Sens de l'esthétique et du détail",
        "Capacité de présentation client",
        "Portfolio démontrant vos réalisations",
      ],
      requirementsEn: [
        "Figma proficiency (components, auto-layout, prototyping)",
        "Understanding of UX principles",
        "Aesthetic sense and attention to detail",
        "Client presentation skills",
        "Portfolio demonstrating your work",
      ],
      missions: [
        "Maquettes haute-fidélité pour sites web",
        "Design systems et composants réutilisables",
        "Prototypage interactif",
        "Tests utilisateurs et itérations",
        "Collaboration avec les développeurs",
      ],
      missionsEn: [
        "High-fidelity mockups for websites",
        "Design systems and reusable components",
        "Interactive prototyping",
        "User testing and iterations",
        "Collaboration with developers",
      ],
    },
    {
      id: "commercial",
      title: "Commercial Digital B2B",
      titleEn: "B2B Digital Sales",
      subtitle: "Prospection & Développement",
      icon: "📈",
      type: "Freelance",
      location: "Libreville",
      locationEn: "Libreville",
      schedule: "Flexible",
      pay: "% du CA réalisé",
      payEn: "% of revenue generated",
      level: "Commissions attractives",
      color: "#10b981",
      description:
        "Prospectez et développez notre portefeuille clients PME au Gabon. Vous êtes la première voix de MGN CodeWave auprès des décideurs locaux.",
      descriptionEn:
        "Prospect and develop our SME client portfolio in Gabon. You are MGN CodeWave's first voice with local decision-makers.",
      requirements: [
        "Réseau professionnel établi à Libreville",
        "Aisance relationnelle et sens de la persuasion",
        "Compréhension du digital (sites web, réseaux sociaux)",
        "Organisation et suivi des prospects rigoureux",
        "Maîtrise de WhatsApp Business",
      ],
      requirementsEn: [
        "Established professional network in Libreville",
        "Interpersonal skills and persuasion",
        "Understanding of digital (websites, social media)",
        "Rigorous prospect organization and follow-up",
        "WhatsApp Business proficiency",
      ],
      missions: [
        "Prospection terrain et digitale des PME",
        "Présentation de nos offres en rendez-vous",
        "Négociation et closing des contrats",
        "Suivi de la satisfaction client",
        "Remontée d'informations marché",
      ],
      missionsEn: [
        "Field and digital prospecting of SMEs",
        "Presenting our offers in meetings",
        "Negotiating and closing contracts",
        "Client satisfaction follow-up",
        "Market information reporting",
      ],
    },
  ],
  cdi: [
    {
      id: "backend",
      title: "Développeur Backend",
      titleEn: "Backend Developer",
      subtitle: "Node.js / Python",
      icon: "⚙️",
      type: "CDI",
      location: "Télétravail",
      locationEn: "Remote",
      schedule: "Temps plein",
      pay: "250K - 400K FCFA + Prime",
      payEn: "250K - 400K FCFA + Bonus",
      level: "Bac+3",
      color: "#0ea5e9",
      description:
        "Construisez les fondations robustes et scalables de nos applications web. APIs performantes, architectures microservices, sécurité et bases de données.",
      descriptionEn:
        "Build the robust and scalable foundations of our web applications. High-performance APIs, microservices architectures, security and databases.",
      requirements: [
        "Node.js ou Python avancé",
        "Bases de données SQL et NoSQL",
        "Conception d'APIs REST/GraphQL",
        "Notions de sécurité web",
        "Git et CI/CD",
      ],
      requirementsEn: [
        "Advanced Node.js or Python",
        "SQL and NoSQL databases",
        "REST/GraphQL API design",
        "Web security fundamentals",
        "Git and CI/CD",
      ],
      missions: [
        "Développement et maintenance d'APIs",
        "Architecture bases de données",
        "Intégration paiements mobiles",
        "Optimisation des performances",
        "Documentation technique",
      ],
      missionsEn: [
        "API development and maintenance",
        "Database architecture",
        "Mobile payment integration",
        "Performance optimization",
        "Technical documentation",
      ],
    },
    {
      id: "frontend",
      title: "Développeur Frontend",
      titleEn: "Frontend Developer",
      subtitle: "React / Vue.js",
      icon: "🖥️",
      type: "CDI",
      location: "Télétravail",
      locationEn: "Remote",
      schedule: "Temps plein",
      pay: "220K - 380K FCFA + Prime",
      payEn: "220K - 380K FCFA + Bonus",
      level: "Bac+3",
      color: "#8b5cf6",
      description:
        "Créez des interfaces utilisateur modernes, performantes et accessibles. Vous transformez des maquettes en expériences web exceptionnelles.",
      descriptionEn:
        "Create modern, high-performance and accessible user interfaces. You transform mockups into exceptional web experiences.",
      requirements: [
        "React.js ou Vue.js maîtrisé",
        "Tailwind CSS ou CSS-in-JS",
        "Intégration Figma → code",
        "Responsive design mobile-first",
        "Tests unitaires (Jest/Vitest)",
      ],
      requirementsEn: [
        "React.js or Vue.js proficiency",
        "Tailwind CSS or CSS-in-JS",
        "Figma to code integration",
        "Mobile-first responsive design",
        "Unit testing (Jest/Vitest)",
      ],
      missions: [
        "Intégration de maquettes Figma",
        "Développement de composants réutilisables",
        "Optimisation Web Vitals",
        "Collaboration avec designers",
        "Code reviews et pair programming",
      ],
      missionsEn: [
        "Figma mockup integration",
        "Reusable component development",
        "Web Vitals optimization",
        "Collaboration with designers",
        "Code reviews and pair programming",
      ],
    },
    {
      id: "qa",
      title: "Responsable QA & Testing",
      titleEn: "QA & Testing Manager",
      subtitle: "Qualité & Fiabilité",
      icon: "🔍",
      type: "CDI",
      location: "Télétravail",
      locationEn: "Remote",
      schedule: "Temps plein",
      pay: "200K - 320K FCFA",
      payEn: "200K - 320K FCFA",
      level: "Bac+3",
      color: "#f59e0b",
      description:
        "Garantissez la qualité et la fiabilité de tous nos livrables. Vous définissez les stratégies de test et assurez qu'aucun bug n'atteint nos clients.",
      descriptionEn:
        "Guarantee the quality and reliability of all our deliverables. You define test strategies and ensure no bugs reach our clients.",
      requirements: [
        "Expérience en tests manuels et automatisés",
        "Outils : Cypress, Playwright ou Selenium",
        "Rédaction de plans et cas de tests",
        "Esprit analytique et rigueur",
        "Communication avec les équipes dev",
      ],
      requirementsEn: [
        "Experience in manual and automated testing",
        "Tools: Cypress, Playwright or Selenium",
        "Writing test plans and cases",
        "Analytical mindset and rigor",
        "Communication with dev teams",
      ],
      missions: [
        "Plans de tests et cas de tests",
        "Tests automatisés E2E",
        "Rapports de bugs détaillés",
        "Tests de performance et sécurité",
        "Processus d'assurance qualité",
      ],
      missionsEn: [
        "Test plans and test cases",
        "Automated E2E testing",
        "Detailed bug reports",
        "Performance and security testing",
        "Quality assurance processes",
      ],
    },
    {
      id: "marketing",
      title: "Responsable Marketing & SEO",
      titleEn: "Marketing & SEO Manager",
      subtitle: "Croissance & Visibilité",
      icon: "📣",
      type: "CDI",
      location: "Libreville/Télétravail",
      locationEn: "Libreville/Remote",
      schedule: "Temps plein",
      pay: "180K - 300K FCFA",
      payEn: "180K - 300K FCFA",
      level: "Bac+2",
      color: "#dc2626",
      description:
        "Construisez et exécutez notre stratégie de croissance digitale au Gabon. SEO, contenus, réseaux sociaux et génération de leads sont votre quotidien.",
      descriptionEn:
        "Build and execute our digital growth strategy in Gabon. SEO, content, social media and lead generation are your daily work.",
      requirements: [
        "SEO on-page et off-page",
        "Rédaction de contenu web optimisé",
        "Gestion des réseaux sociaux",
        "Google Analytics et Search Console",
        "Campagnes Google/Facebook Ads",
      ],
      requirementsEn: [
        "On-page and off-page SEO",
        "Optimized web content writing",
        "Social media management",
        "Google Analytics and Search Console",
        "Google/Facebook Ads campaigns",
      ],
      missions: [
        "Stratégie SEO et production de contenus",
        "Gestion des réseaux sociaux CodeWave",
        "Campagnes publicitaires digitales",
        "Génération de leads qualifiés",
        "Reporting mensuel des KPIs",
      ],
      missionsEn: [
        "SEO strategy and content production",
        "CodeWave social media management",
        "Digital advertising campaigns",
        "Qualified lead generation",
        "Monthly KPI reporting",
      ],
    },
    {
      id: "admin",
      title: "Responsable Admin & Gestion",
      titleEn: "Admin & Operations Manager",
      subtitle: "Organisation & Croissance",
      icon: "📋",
      type: "CDI",
      location: "Libreville",
      locationEn: "Libreville",
      schedule: "Temps plein",
      pay: "150K - 250K FCFA",
      payEn: "150K - 250K FCFA",
      level: "Bac+2",
      color: "#64748b",
      description:
        "Organisez les opérations de l'agence pour assurer une croissance structurée. Vous êtes le pilier administratif et opérationnel de MGN CodeWave.",
      descriptionEn:
        "Organize the agency's operations to ensure structured growth. You are MGN CodeWave's administrative and operational backbone.",
      requirements: [
        "Organisation et gestion de priorités",
        "Maîtrise des outils Google Workspace",
        "Comptabilité de base et suivi financier",
        "Gestion de la relation client",
        "Rigueur et confidentialité",
      ],
      requirementsEn: [
        "Organization and priority management",
        "Google Workspace proficiency",
        "Basic accounting and financial tracking",
        "Client relationship management",
        "Rigor and confidentiality",
      ],
      missions: [
        "Gestion administrative et documents",
        "Suivi facturation et paiements",
        "Coordination équipe et projets",
        "Support client et onboarding",
        "Reporting de gestion mensuel",
      ],
      missionsEn: [
        "Administrative management and documents",
        "Invoice and payment tracking",
        "Team and project coordination",
        "Client support and onboarding",
        "Monthly management reporting",
      ],
    },
  ],
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
    color: "#1a56db",
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
