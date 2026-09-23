// ==================== CODEWAVE ACADEMY — CATALOGUE DES FORMATIONS ====================
// Vitrine des formations : titre, durée, prix et une ligne de description.
// Les formations elles-mêmes se déroulent sur une plateforme dédiée ; les demandes passent par WhatsApp.
// Chaque texte est un objet { fr, en }. Montants en XAF (nombres), totaux calculés.
// Vérification : `npm run check:content`.

// Adresse de la plateforme de formation, quand elle sera en ligne. null = boutons WhatsApp uniquement.
const ACADEMY_PLATFORM_URL = null;

const formationGroups = [
  { id: "mern", title: { fr: "Modules du bootcamp, à l'unité", en: "Bootcamp modules, one at a time" } },
  { id: "parcours", title: { fr: "Parcours courts", en: "Short paths" } },
  { id: "ateliers", title: { fr: "Ateliers métiers", en: "Professional workshops" } },
  { id: "intra", title: { fr: "Formation en entreprise", en: "In-company training" } },
];

const mernModules = [
  { id: "m1", code: "M1", hours: 30, amount: 40000, title: { fr: "Fondamentaux du web (HTML, CSS, Git)", en: "Web Fundamentals (HTML, CSS, Git)" } },
  { id: "m2", code: "M2", hours: 36, amount: 50000, title: { fr: "JavaScript moderne (ES6+)", en: "Modern JavaScript (ES6+)" } },
  { id: "m3", code: "M3", hours: 48, amount: 70000, title: { fr: "React.js", en: "React.js" } },
  { id: "m4", code: "M4", hours: 48, amount: 70000, title: { fr: "Node.js & Express", en: "Node.js & Express" } },
  { id: "m5", code: "M5", hours: 24, amount: 40000, title: { fr: "MongoDB & Mongoose", en: "MongoDB & Mongoose" } },
  { id: "m6", code: "M6", hours: 30, amount: 45000, title: { fr: "Intégration FullStack & déploiement", en: "FullStack integration & deployment" } },
  { id: "m7", code: "M7", hours: 24, amount: 45000, title: { fr: "Projet final encadré & soutenance", en: "Supervised final project & defence" } },
].map((m) => ({ ...m, group: "mern" }));

const formationPaths = [
  { id: "parcours-front", modules: ["m1", "m2", "m3"], amount: 140000, title: { fr: "Parcours Front-End React", en: "Front-End React path" }, summary: { fr: "M1 + M2 + M3 : du premier fichier HTML à une application React.", en: "M1 + M2 + M3: from your first HTML file to a React app." } },
  { id: "parcours-back", modules: ["m2", "m4", "m5"], amount: 140000, title: { fr: "Parcours Back-End Node", en: "Back-End Node path" }, summary: { fr: "M2 + M4 + M5 : API sécurisées et bases de données.", en: "M2 + M4 + M5: secure APIs and databases." } },
].map((p) => ({ ...p, group: "parcours" }));

const professionalWorkshops = [
  { id: "maitriser-mon-site", hours: 3, amount: 15000, title: { fr: "Atelier « Maîtriser mon site »", en: "“Manage my website” workshop" }, summary: { fr: "Vous repartez capable de gérer votre site seul.", en: "You leave able to manage your site on your own." } },
  { id: "emailing-pro", hours: 2, amount: 20000, title: { fr: "Emailing Pro & automatisation", en: "Pro email marketing & automation" }, summary: { fr: "Votre première campagne est envoyée pendant l'atelier.", en: "Your first campaign is sent during the workshop." } },
  { id: "ia-entrepreneurs", hours: 6, amount: 25000, title: { fr: "IA pour entrepreneurs", en: "AI for entrepreneurs" }, summary: { fr: "5 cas d'usage appliqués à votre activité.", en: "5 use cases applied to your business." } },
  { id: "seo-debutants", hours: 6, amount: 25000, title: { fr: "SEO pour débutants", en: "SEO for beginners" }, summary: { fr: "Un plan de mots-clés et 3 pages optimisées.", en: "A keyword plan and 3 optimised pages." } },
  { id: "cybersecurite-tpe", hours: 8, amount: 30000, title: { fr: "Cybersécurité des TPE / PME", en: "Cybersecurity for small businesses" }, summary: { fr: "Un plan de sécurisation pour votre entreprise.", en: "A security plan for your business." } },
  { id: "bureautique-pro", hours: 15, amount: 30000, title: { fr: "Bureautique professionnelle", en: "Professional office software" }, summary: { fr: "Vos modèles Word, Excel et PowerPoint.", en: "Your own Word, Excel and PowerPoint templates." } },
  { id: "wordpress", hours: 12, amount: 35000, title: { fr: "WordPress : créez votre site", en: "WordPress: build your website" }, summary: { fr: "Un site WordPress en ligne.", en: "A WordPress site online." } },
  { id: "community-management-canva", hours: 12, amount: 35000, title: { fr: "Community management & Canva", en: "Community management & Canva" }, summary: { fr: "Un calendrier éditorial et 10 visuels.", en: "An editorial calendar and 10 visuals." } },
  { id: "ecommerce-mobile-money", hours: 10, amount: 40000, title: { fr: "E-commerce & Mobile Money", en: "E-commerce & Mobile Money" }, summary: { fr: "Une boutique avec paiement Airtel Money et Moov Money.", en: "A shop with Airtel Money and Moov Money payment." } },
  { id: "seo-avance-analytics", hours: 12, amount: 45000, title: { fr: "SEO avancé & Analytics", en: "Advanced SEO & Analytics" }, summary: { fr: "Un tableau de bord et un plan d'action.", en: "A dashboard and an action plan." } },
  { id: "ui-ux-figma", hours: 20, amount: 55000, title: { fr: "UI/UX Design avec Figma", en: "UI/UX Design with Figma" }, summary: { fr: "Une maquette complète prête à être développée.", en: "A complete mock-up ready for development." } },
].map((w) => ({ ...w, group: "ateliers" }));

const inCompanyOffers = [
  { id: "intra-demi-journee", amount: 90000, maxParticipants: 8, title: { fr: "Atelier sur site — demi-journée", en: "On-site workshop — half day" } },
  { id: "intra-journee", amount: 160000, maxParticipants: 12, title: { fr: "Journée complète sur site", en: "Full day on site" } },
  { id: "intra-sur-mesure", amount: null, maxParticipants: null, title: { fr: "Parcours sur mesure", en: "Tailored programme" } },
].map((o) => ({ ...o, group: "intra" }));

const bootcampMern = {
  id: "bootcamp-mern",
  modules: mernModules.map((m) => m.id),
  weeks: 20,
  maxLearners: 12,
  practiceShare: 70,
  projectsCount: 7,
  amount: 300000,
  title: { fr: "Bootcamp FullStack MERN", en: "FullStack MERN Bootcamp" },
  summary: {
    fr: "Devenez développeur web en 5 mois : MongoDB, Express, React et Node.js, avec 7 projets pour votre portfolio. Aucune connaissance en programmation exigée.",
    en: "Become a web developer in 5 months: MongoDB, Express, React and Node.js, with 7 projects for your portfolio. No programming knowledge required.",
  },
  schedule: {
    fr: "Soirs de semaine 18 h – 21 h + samedi matin",
    en: "Weekday evenings 6–9pm + Saturday morning",
  },
  pricingOptions: [
    { id: "comptant", amount: 300000, label: { fr: "Comptant", en: "Paid in full" } },
    { id: "echelonne", installments: 5, installmentAmount: 70000, label: { fr: "En 5 fois", en: "In 5 instalments" } },
    { id: "lancement", amount: 240000, highlight: true, label: { fr: "1re promotion (12 places)", en: "1st cohort (12 seats)" } },
    { id: "reduit", amount: 240000, label: { fr: "Étudiants & demandeurs d'emploi", en: "Students & job seekers" } },
  ],
};

const subscriptionPlans = [
  { id: "pass-etudiant", monthly: 5900, yearly: 59000, title: { fr: "Pass Étudiant", en: "Student Pass" }, summary: { fr: "Cours vidéo, exercices auto-corrigés, communauté.", en: "Video lessons, auto-graded exercises, community." } },
  { id: "pass-pro", monthly: 14900, yearly: 149000, highlight: true, title: { fr: "Pass Pro", en: "Pro Pass" }, summary: { fr: "Tout le catalogue, corrections personnelles, coaching mensuel.", en: "Full catalogue, personal grading, monthly coaching." } },
  { id: "pass-business", monthly: 49000, yearly: 490000, title: { fr: "Pass Business", en: "Business Pass" }, summary: { fr: "Le Pass Pro pour 5 collaborateurs.", en: "The Pro Pass for 5 team members." } },
  { id: "pass-entreprise", monthly: null, yearly: null, title: { fr: "Pass Entreprise", en: "Enterprise Pass" }, summary: { fr: "Parcours personnalisés pour vos équipes.", en: "Custom learning paths for your teams." } },
];

const academyFaq = [
  {
    q: { fr: "Faut-il savoir programmer pour commencer ?", en: "Do I need to know how to code to start?" },
    a: { fr: "Non. Le bootcamp et le module M1 partent de zéro : il suffit de savoir utiliser un ordinateur.", en: "No. The bootcamp and module M1 start from scratch: you just need to know how to use a computer." },
  },
  {
    q: { fr: "Où se déroulent les formations ?", en: "Where does training take place?" },
    a: { fr: "Sur notre plateforme de formation en ligne, avec des sessions en présentiel à Libreville. Contactez-nous sur WhatsApp pour connaître les prochaines dates.", en: "On our online training platform, with on-site sessions in Libreville. Contact us on WhatsApp for upcoming dates." },
  },
  {
    q: { fr: "Comment payer ?", en: "How can I pay?" },
    a: { fr: "Airtel Money, Moov Money, virement ou espèces contre reçu. Le bootcamp peut se payer en 5 fois.", en: "Airtel Money, Moov Money, bank transfer or cash against receipt. The bootcamp can be paid in 5 instalments." },
  },
  {
    q: { fr: "Pourquoi choisir le bootcamp plutôt que les modules ?", en: "Why choose the bootcamp over single modules?" },
    a: { fr: "Les 7 modules pris séparément coûtent 360 000 XAF ; le bootcamp les réunit pour 300 000 XAF, soit 60 000 XAF d'économie, avec un suivi sur toute la durée.", en: "The 7 modules cost 360,000 XAF separately; the bootcamp bundles them for 300,000 XAF, saving 60,000 XAF, with support throughout." },
  },
];

const academyUI = {
  label: { fr: "CodeWave Academy", en: "CodeWave Academy" },
  title: { fr: "Apprenez en construisant.", en: "Learn by building." },
  sub: {
    fr: "Des formations pratiques pour devenir développeur ou gagner en autonomie numérique, à des prix adaptés au Gabon.",
    en: "Hands-on training to become a developer or gain digital independence, at prices suited to Gabon.",
  },
  offers: {
    fr: ["Abonnement annuel : 2 mois offerts", "Étudiants et demandeurs d'emploi : −20 % sur justificatif", "Paiement en 2 à 5 fois selon le montant", "Airtel Money, Moov Money, virement, espèces"],
    en: ["Annual subscription: 2 months free", "Students and job seekers: −20% with proof of status", "Pay in 2 to 5 instalments depending on the amount", "Airtel Money, Moov Money, bank transfer, cash"],
  },
};

// ==================== DÉRIVÉS ====================
function getMernModule(id) {
  const module = mernModules.find((m) => m.id === id);
  if (!module) throw new Error(`Module MERN inconnu : ${id}`);
  return module;
}

function composedHours(formation) {
  return formation.modules.reduce((sum, id) => sum + getMernModule(id).hours, 0);
}

function mernModulesTotal() {
  return mernModules.reduce((sum, m) => sum + m.amount, 0);
}

function bootcampSavings() {
  return mernModulesTotal() - bootcampMern.amount;
}

// Liste affichée par groupe ; les parcours reçoivent leurs heures calculées.
const formationsCatalog = [
  ...mernModules,
  ...formationPaths.map((p) => ({ ...p, hours: composedHours(p) })),
  ...professionalWorkshops,
  ...inCompanyOffers,
];
