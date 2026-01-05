// ========================================
// CodeWave - Portfolio JavaScript (light)
// ========================================

// Simple filtering for portfolio grid; modal logic removed in favor of detail pages.
document.addEventListener("DOMContentLoaded", () => {
  const filters = document.querySelectorAll(".portfolio-filter");
  const items = document.querySelectorAll(".portfolio-item");

  if (!filters.length || !items.length) return;

  const applyFilter = (category) => {
    items.forEach((item) => {
      const itemCategory = item.getAttribute("data-category");
      if (category === "all" || itemCategory === category) {
        item.classList.remove("hidden");
      } else {
        item.classList.add("hidden");
      }
    });
  };

  filters.forEach((filter) => {
    filter.addEventListener("click", () => {
      const category = filter.getAttribute("data-category");

      filters.forEach((f) => f.classList.remove("active"));
      filter.classList.add("active");

      applyFilter(category);
    });
  });
}); // ========================================
// CodeWave - Portfolio JavaScript
// ========================================

// === Portfolio Data ===
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

// === Modal Functions ===
function openModal(projectId) {
  const modal = document.getElementById("portfolioModal");
  const project = projectsData[projectId];

  if (!project) {
    console.error("Project not found:", projectId);
    return;
  }

  const modalBody = document.getElementById("modalBody");

  modalBody.innerHTML = `
    <div style="background: ${
      project.gradient
    }; padding: 3rem 2rem; text-align: center; color: white;">
      <h2 style="font-size: 2.5rem; font-weight: 800; margin-bottom: 1rem;">${
        project.title
      }</h2>
      <p style="font-size: 1.25rem; opacity: 0.9;">${project.category}</p>
    </div>
    
    <div style="padding: 2rem;">
      <!-- Project Info -->
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1.5rem; margin-bottom: 2rem; padding-bottom: 2rem; border-bottom: 2px solid var(--gray-200);">
        <div>
          <div style="color: var(--gray-500); font-size: 0.875rem; margin-bottom: 0.25rem;">Client</div>
          <div style="font-weight: 700; color: var(--gray-900);">${
            project.client
          }</div>
        </div>
        <div>
          <div style="color: var(--gray-500); font-size: 0.875rem; margin-bottom: 0.25rem;">Date</div>
          <div style="font-weight: 700; color: var(--gray-900);">${
            project.date
          }</div>
        </div>
        <div>
          <div style="color: var(--gray-500); font-size: 0.875rem; margin-bottom: 0.25rem;">Durée</div>
          <div style="font-weight: 700; color: var(--gray-900);">${
            project.duration
          }</div>
        </div>
      </div>
      
      <!-- Description -->
      <div style="margin-bottom: 2rem;">
        <h3 style="font-size: 1.5rem; font-weight: 700; color: var(--gray-900); margin-bottom: 1rem;">Description du Projet</h3>
        <p style="color: var(--gray-600); line-height: 1.8;">${
          project.description
        }</p>
      </div>
      
      <!-- Technologies -->
      <div style="margin-bottom: 2rem;">
        <h3 style="font-size: 1.5rem; font-weight: 700; color: var(--gray-900); margin-bottom: 1rem;">Technologies Utilisées</h3>
        <div style="display: flex; flex-wrap: wrap; gap: 0.75rem;">
          ${project.technologies
            .map(
              (tech) => `
            <span style="background: var(--primary); color: white; padding: 0.5rem 1rem; border-radius: var(--radius-full); font-size: 0.875rem; font-weight: 600;">
              ${tech}
            </span>
          `
            )
            .join("")}
        </div>
      </div>
      
      <!-- Features -->
      <div style="margin-bottom: 2rem;">
        <h3 style="font-size: 1.5rem; font-weight: 700; color: var(--gray-900); margin-bottom: 1rem;">Fonctionnalités Clés</h3>
        <div style="display: grid; gap: 0.75rem;">
          ${project.features
            .map(
              (feature) => `
            <div style="display: flex; align-items: center; gap: 0.75rem;">
              <i class="fas fa-check-circle" style="color: var(--success); font-size: 1.25rem;"></i>
              <span style="color: var(--gray-700);">${feature}</span>
            </div>
          `
            )
            .join("")}
        </div>
      </div>
      
      <!-- Results -->
      <div style="background: linear-gradient(135deg, var(--gray-50) 0%, #dbeafe 100%); padding: 2rem; border-radius: var(--radius-2xl); margin-bottom: 2rem;">
        <h3 style="font-size: 1.5rem; font-weight: 700; color: var(--gray-900); margin-bottom: 1.5rem; text-align: center;">Résultats Obtenus</h3>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 1.5rem;">
          ${project.results
            .map(
              (result) => `
            <div style="text-align: center;">
              <div style="font-size: 2.5rem; font-weight: 800; color: var(--primary); margin-bottom: 0.5rem;">${result.value}</div>
              <div style="color: var(--gray-600); font-weight: 600; font-size: 0.875rem;">${result.label}</div>
            </div>
          `
            )
            .join("")}
        </div>
      </div>
      
      <!-- Testimonial -->
      <div style="background: white; border-left: 4px solid var(--primary); padding: 1.5rem; border-radius: var(--radius-lg); box-shadow: var(--shadow-md);">
        <div style="display: flex; gap: 1rem; margin-bottom: 1rem;">
          ${[...Array(5)]
            .map(
              () =>
                '<i class="fas fa-star" style="color: #fbbf24; font-size: 1.25rem;"></i>'
            )
            .join("")}
        </div>
        <p style="font-size: 1.125rem; color: var(--gray-700); font-style: italic; line-height: 1.7; margin-bottom: 1rem;">
          "${project.testimonial.text}"
        </p>
        <div style="display: flex; align-items: center; gap: 1rem;">
          <div style="width: 3rem; height: 3rem; background: ${
            project.gradient
          }; border-radius: 50%;"></div>
          <div>
            <div style="font-weight: 700; color: var(--gray-900);">${
              project.testimonial.author
            }</div>
            <div style="font-size: 0.875rem; color: var(--gray-600);">${
              project.testimonial.role
            }</div>
          </div>
        </div>
      </div>
      
      <!-- CTA -->
      <div style="margin-top: 2rem; text-align: center;">
        <a href="contact.html?project=${projectId}" class="btn btn-primary btn-lg">
          Démarrer Un Projet Similaire
          <i class="fas fa-arrow-right"></i>
        </a>
      </div>
    </div>
  `;

  modal.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  const modal = document.getElementById("portfolioModal");
  modal.classList.remove("active");
  document.body.style.overflow = "";
}

// Close modal on outside click
document.addEventListener("click", function (e) {
  const modal = document.getElementById("portfolioModal");
  if (e.target === modal) {
    closeModal();
  }
});

// Close modal on Escape key
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    closeModal();
  }
});
