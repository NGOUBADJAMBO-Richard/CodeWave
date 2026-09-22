// ==================== DÉTAILS DES PROJETS DU PORTFOLIO ====================
// Chargé uniquement par portfolio.html (données volumineuses, inutiles ailleurs).
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
    color: "#004AAD",
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
