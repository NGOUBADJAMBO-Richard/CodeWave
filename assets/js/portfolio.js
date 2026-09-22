// ========================================
// CodeWave - Portfolio JavaScript
// ========================================

// Simple filtering for portfolio grid; modal logic removed in favor of detail pages.
const projectsData = {
  project1: {
    title: "Boutique Mode Gabonaise",
    category: "E-Commerce",
    client: "Élégance Mode",
    date: "Décembre 2024",
    duration: "3 semaines",
    technologies: ["React", "Node.js", "Stripe", "MongoDB"],
    description:
      "Boutique en ligne complète spécialisée dans la mode africaine moderne. Intégration de paiements mobiles locaux et système de gestion des stocks en temps réel.",
    features: [
      "Paiement en ligne sécurisé (Stripe + Mobile Money)",
      "Gestion automatique des stocks",
      "Système de promotions et coupons",
      "Interface d'administration intuitive",
      "Suivi des commandes en temps réel",
      "Newsletter automatique",
    ],
    results: [
      { label: "Augmentation des ventes", value: "+250%" },
      { label: "Taux de conversion", value: "4.2%" },
      { label: "Temps de chargement", value: "1.8s" },
      { label: "Visiteurs mensuels", value: "15K+" },
    ],
    testimonial: {
      text: "CodeWave a transformé mon commerce. Les ventes ont explosé et la gestion est devenue tellement plus simple !",
      author: "Marie Okomo",
      role: "Propriétaire, Élégance Mode",
    },
    gradient: "linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)",
  },

  project2: {
    title: "Cabinet d'Avocats Libreville",
    category: "Site Vitrine Pro",
    client: "Cabinet Juridique Ndong & Associés",
    date: "Novembre 2024",
    duration: "2 semaines",
    technologies: ["WordPress", "PHP", "SEO Premium"],
    description:
      "Site vitrine professionnel pour cabinet d'avocats avec présentation des services juridiques, équipe, et formulaire de prise de rendez-vous.",
    features: [
      "Design élégant et professionnel",
      "Optimisation SEO avancée",
      "Formulaire de consultation en ligne",
      "Blog juridique intégré",
      "Section témoignages clients",
      "Google My Business optimisé",
    ],
    results: [
      { label: "Classement Google", value: "Page 1" },
      { label: "Demandes de consultation", value: "+300%" },
      { label: "Taux de rebond", value: "-45%" },
      { label: "Visibilité locale", value: "+180%" },
    ],
    testimonial: {
      text: "Un site qui reflète parfaitement notre expertise. Nous recevons maintenant 3x plus de demandes qualifiées.",
      author: "Me Jean-Paul Ndong",
      role: "Avocat Associé",
    },
    gradient: "linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)",
  },

  project3: {
    title: "Restaurant Le Gourmet",
    category: "Site + Application",
    client: "Restaurant Le Gourmet",
    date: "Octobre 2024",
    duration: "4 semaines",
    technologies: ["Vue.js", "Firebase", "Google Maps API"],
    description:
      "Site vitrine avec système de réservation en ligne intégré, menu digital interactif et gestion des tables en temps réel.",
    features: [
      "Réservation en ligne 24/7",
      "Menu interactif avec photos",
      "Système de gestion des tables",
      "Notifications SMS/Email automatiques",
      "Avis clients intégrés",
      "Intégration Google Maps",
    ],
    results: [
      { label: "Réservations mensuelles", value: "+180" },
      { label: "Taux de remplissage", value: "85%" },
      { label: "Satisfaction client", value: "4.8/5" },
      { label: "Temps de réservation", value: "-70%" },
    ],
    testimonial: {
      text: "Plus de stress au téléphone ! Le système de réservation a révolutionné notre organisation.",
      author: "Aminata Diallo",
      role: "Gérante",
    },
    gradient: "linear-gradient(135deg, #f97316 0%, #ef4444 100%)",
  },

  project4: {
    title: "Portfolio Photographe Pro",
    category: "Portfolio Créatif",
    client: "Studio Photo PM",
    date: "Septembre 2024",
    duration: "2 semaines",
    technologies: ["Next.js", "Lightbox", "Cloudinary"],
    description:
      "Portfolio élégant pour photographe professionnel avec galerie optimisée, système de réservation de sessions photo et blog.",
    features: [
      "Galerie photos haute résolution",
      "Lightbox professionnel",
      "Système de catégories",
      "Réservation de sessions",
      "Blog photographique",
      "Optimisation images automatique",
    ],
    results: [
      { label: "Nouveaux clients", value: "+50" },
      { label: "Réservations", value: "+120%" },
      { label: "Engagement", value: "+200%" },
      { label: "Partages sociaux", value: "+350%" },
    ],
    testimonial: {
      text: "Mon portfolio est exactement ce dont je rêvais. Mes photos sont sublimées et j'ai signé 15 nouveaux contrats !",
      author: "Patrick Mouendou",
      role: "Photographe",
    },
    gradient: "linear-gradient(135deg, #10b981 0%, #14b8a6 100%)",
  },

  project5: {
    title: "Marketplace Artisanat Local",
    category: "E-Commerce Multi-vendeurs",
    client: "Gabon Artisans",
    date: "Août 2024",
    duration: "6 semaines",
    technologies: ["Laravel", "Stripe", "MySQL", "Redis"],
    description:
      "Plateforme e-commerce permettant à plusieurs artisans de vendre leurs créations locales avec gestion des commissions et paiements automatisés.",
    features: [
      "Inscription vendeurs automatisée",
      "Gestion multi-boutiques",
      "Système de commissions",
      "Paiements automatisés",
      "Chat vendeur-acheteur",
      "Statistiques détaillées",
    ],
    results: [
      { label: "Vendeurs actifs", value: "120+" },
      { label: "Produits en ligne", value: "800+" },
      { label: "Ventes mensuelles", value: "2M FCFA" },
      { label: "Croissance", value: "+45%/mois" },
    ],
    testimonial: {
      text: "Une plateforme qui valorise l'artisanat gabonais. Les ventes dépassent nos espérances !",
      author: "Association Gabon Artisans",
      role: "Président",
    },
    gradient: "linear-gradient(135deg, #f59e0b 0%, #f97316 100%)",
  },

  project6: {
    title: "Blog Voyage Gabon",
    category: "Blog Voyage",
    client: "Découvrez le Gabon",
    date: "Juillet 2024",
    duration: "3 semaines",
    technologies: ["Ghost", "SEO", "Google AdSense"],
    description:
      "Blog de voyage dédié au tourisme au Gabon avec guides, itinéraires, photos et conseils pratiques pour visiteurs.",
    features: [
      "CMS Ghost optimisé",
      "SEO multi-langues (FR/EN)",
      "Galeries photos HD",
      "Cartes interactives",
      "Newsletter hebdomadaire",
      "Monétisation AdSense",
    ],
    results: [
      { label: "Visiteurs mensuels", value: "50K+" },
      { label: "Articles publiés", value: "120+" },
      { label: "Abonnés newsletter", value: "5K+" },
      { label: "Revenus AdSense", value: "200K FCFA/mois" },
    ],
    testimonial: {
      text: "Le blog attire des milliers de visiteurs chaque mois. Un formidable outil de promotion du tourisme gabonais.",
      author: "Découvrez le Gabon",
      role: "Équipe Éditoriale",
    },
    gradient: "linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)",
  },

  project7: {
    title: "Clinique Dentaire Libreville",
    category: "Site Médical",
    client: "Centre Dentaire Excellence",
    date: "Juin 2024",
    duration: "2 semaines",
    technologies: ["WordPress", "Booking System", "HIPAA Compliant"],
    description:
      "Site vitrine pour clinique dentaire avec système de prise de rendez-vous en ligne, présentation des soins et équipe médicale.",
    features: [
      "Prise de RDV en ligne",
      "Calendrier médecins",
      "Fiches de soins détaillées",
      "Avant/Après traitements",
      "Rappels automatiques SMS",
      "Conformité données médicales",
    ],
    results: [
      { label: "RDV mensuels", value: "+300" },
      { label: "Taux de présence", value: "92%" },
      { label: "Appels téléphoniques", value: "-60%" },
      { label: "Nouveaux patients", value: "+150%" },
    ],
    testimonial: {
      text: "La gestion des rendez-vous est simplifiée. Plus de temps pour nos patients !",
      author: "Dr. Émilie Mbadinga",
      role: "Dentiste",
    },
    gradient: "linear-gradient(135deg, #06b6d4 0%, #0284c7 100%)",
  },

  project8: {
    title: "Application Gestion Scolaire",
    category: "Web Application",
    client: "École Internationale de Libreville",
    date: "Mai 2024",
    duration: "8 semaines",
    technologies: ["React", "Node.js", "PostgreSQL", "Socket.io"],
    description:
      "Application web complète de gestion scolaire avec suivi des notes, absences, communications parents-professeurs et planning.",
    features: [
      "Gestion des élèves et notes",
      "Suivi des absences",
      "Messagerie interne",
      "Planning interactif",
      "Rapports automatiques",
      "Application mobile parents",
    ],
    results: [
      { label: "Élèves gérés", value: "500+" },
      { label: "Temps administratif", value: "-70%" },
      { label: "Satisfaction parents", value: "95%" },
      { label: "Économie papier", value: "80%" },
    ],
    testimonial: {
      text: "Cette application a révolutionné notre façon de gérer l'école. Tout est centralisé et accessible.",
      author: "Direction EIL",
      role: "Directeur Pédagogique",
    },
    gradient: "linear-gradient(135deg, #14b8a6 0%, #10b981 100%)",
  },

  project9: {
    title: "Boutique Électronique",
    category: "E-Commerce Tech",
    client: "TechStore Gabon",
    date: "Avril 2024",
    duration: "4 semaines",
    technologies: ["Shopify Plus", "Custom Apps", "Analytics"],
    description:
      "Boutique en ligne spécialisée dans l'électronique et l'informatique avec comparateur de produits et service après-vente intégré.",
    features: [
      "Catalogue 1000+ produits",
      "Comparateur de prix",
      "Service après-vente en ligne",
      "Garantie et suivi",
      "Programme fidélité",
      "Paiement échelonné",
    ],
    results: [
      { label: "Ventes mensuelles", value: "400+" },
      { label: "Panier moyen", value: "185K FCFA" },
      { label: "Taux de retour", value: "2.1%" },
      { label: "ROI marketing", value: "350%" },
    ],
    testimonial: {
      text: "Les ventes en ligne représentent maintenant 60% de notre chiffre d'affaires. Incroyable !",
      author: "TechStore Gabon",
      role: "Gérant",
    },
    gradient: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
  },
};

// === Portfolio Filtering ===
document.addEventListener("DOMContentLoaded", function () {
  const filters = document.querySelectorAll(".portfolio-filter");
  const items = document.querySelectorAll(".portfolio-item");

  filters.forEach((filter) => {
    filter.addEventListener("click", function () {
      const category = this.getAttribute("data-category");

      // Update active filter
      filters.forEach((f) => f.classList.remove("active"));
      this.classList.add("active");

      // Filter items
      items.forEach((item) => {
        const itemCategory = item.getAttribute("data-category");

        if (category === "all" || itemCategory === category) {
          item.classList.remove("hidden");
        } else {
          item.classList.add("hidden");
        }
      });
    });
  });
});

// === Modal Functions (optionnel) ===
// Décommentez si vous avez des modales portfolio
/*
function openModal(projectId) {
  // Code de la modale...
