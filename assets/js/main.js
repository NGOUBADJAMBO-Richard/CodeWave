// ========================================
// CodeWave - JavaScript Principal
// ========================================

// ✅ SÉCURITÉ: Fonction de sanitization XSS
function sanitizeInput(str) {
  if (!str) return "";
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

// ✅ SÉCURITÉ: Validation stricte des inputs
function validateInput(type, value) {
  switch (type) {
    case "email":
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    case "telephone":
      return /^[\d\s\-\+\(\)]{10,}$/.test(value.replace(/\s/g, ""));
    case "nom":
      return value.length >= 2 && value.length <= 100;
    case "message":
      return value.length >= 10 && value.length <= 5000;
    default:
      return true;
  }
}

// === Configuration EmailJS ===
// Inscrivez-vous sur https://www.emailjs.com/ (GRATUIT)
// Remplacez ces valeurs par vos propres identifiants
const EMAILJS_CONFIG = {
  serviceID: "service_xxxxxxx", // Votre Service ID
  templateID: "template_xxxxxxx", // Votre Template ID
  publicKey: "your_public_key", // Votre Public Key
};

// === Navigation ===
document.addEventListener("DOMContentLoaded", function () {
  const navbar = document.getElementById("navbar");
  const menuToggle = document.getElementById("menuToggle");
  const navMenu = document.getElementById("navMenu");

  // Scroll effect pour la navbar
  window.addEventListener("scroll", function () {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  // Menu mobile toggle
  if (menuToggle) {
    menuToggle.addEventListener("click", function () {
      this.classList.toggle("active");
      navMenu.classList.toggle("active");
      document.body.style.overflow = navMenu.classList.contains("active")
        ? "hidden"
        : "";
    });
  }

  // Fermer le menu mobile lors du clic sur un lien
  const navLinks = document.querySelectorAll(".nav-menu a");
  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      if (window.innerWidth < 1024) {
        menuToggle.classList.remove("active");
        navMenu.classList.remove("active");
        document.body.style.overflow = "";
      }
    });
  });

  // Active link selon la page actuelle
  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  navLinks.forEach((link) => {
    const href = link.getAttribute("href");
    if (href === currentPage || (currentPage === "" && href === "index.html")) {
      link.classList.add("active");
    }
  });
});

// === Smooth Scroll ===
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const href = this.getAttribute("href");
    if (href !== "#" && href.length > 1) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        const offsetTop = target.offsetTop - 100;
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        });
      }
    }
  });
});

// === Formulaire de Contact (avec EmailJS) ===
const contactForm = document.getElementById("contactForm");
if (contactForm) {
  contactForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;

    // Désactiver le bouton et afficher le loading
    submitBtn.classList.add("loading");
    submitBtn.disabled = true;

    // Supprimer les messages précédents
    const existingMessages = this.querySelectorAll(
      ".success-message, .error-message"
    );
    existingMessages.forEach((msg) => msg.remove());

    // ✅ SÉCURITÉ: Récupérer et valider les données du formulaire
    const formData = {
      nom: this.querySelector('[name="nom"]').value.trim(),
      email: this.querySelector('[name="email"]').value.trim().toLowerCase(),
      telephone: this.querySelector('[name="telephone"]').value.trim(),
      typeProjet: this.querySelector('[name="typeProjet"]').value,
      budget: this.querySelector('[name="budget"]')?.value || "Non spécifié",
      message: this.querySelector('[name="message"]').value.trim(),
    };

    // ✅ SÉCURITÉ: Valider tous les champs
    if (!validateInput("nom", formData.nom)) {
      showMessage("error", "Nom invalide (2-100 caractères)");
      submitBtn.classList.remove("loading");
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;
      return;
    }

    if (!validateInput("email", formData.email)) {
      showMessage("error", "Email invalide");
      submitBtn.classList.remove("loading");
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;
      return;
    }

    if (!validateInput("telephone", formData.telephone)) {
      showMessage("error", "Telephone invalide");
      submitBtn.classList.remove("loading");
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;
      return;
    }

    if (!validateInput("message", formData.message)) {
      showMessage("error", "Message invalide (10-5000 caracteres)");
      submitBtn.classList.remove("loading");
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;
      return;
    }

    try {
      // MÃ©thode 1: EmailJS (RecommandÃ© - GRATUIT)
      // DÃ©commentez aprÃ¨s avoir configurÃ© EmailJS
      /*
      await emailjs.send(
        EMAILJS_CONFIG.serviceID,
        EMAILJS_CONFIG.templateID,
        {
          to_email: 'mgncodewave18@gmail.com',
          from_name: formData.nom,
          from_email: formData.email,
          phone: formData.telephone,
          project_type: formData.typeProjet,
          budget: formData.budget,
          message: formData.message
        },
        EMAILJS_CONFIG.publicKey
      );
      */

      // MÃ©thode 2: Simulation (pour les tests)
      await simulateEmailSend(formData);

      // Afficher le message de succÃ¨s
      showMessage(
        "success",
        "âœ… Merci ! Votre demande a Ã©tÃ© envoyÃ©e avec succÃ¨s. Nous vous rÃ©pondrons sous 24h."
      );

      // RÃ©initialiser le formulaire
      this.reset();

      // Redirection WhatsApp (optionnel)
      setTimeout(() => {
        const whatsappMsg = `Bonjour, je viens d'envoyer une demande de devis via le site.\n\nNom: ${formData.nom}\nEmail: ${formData.email}\nProjet: ${formData.typeProjet}`;
        window.open(
          `https://wa.me/24166198918?text=${encodeURIComponent(whatsappMsg)}`,
          "_blank"
        );
      }, 2000);
    } catch (error) {
      console.error("Erreur:", error);
      showMessage(
        "error",
        "âŒ Oups ! Une erreur est survenue. Veuillez rÃ©essayer ou nous contacter directement via WhatsApp."
      );
    } finally {
      // RÃ©activer le bouton
      submitBtn.classList.remove("loading");
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;
    }
  });
}

// Fonction pour simuler l'envoi d'email (pour les tests)
function simulateEmailSend(data) {
  return new Promise((resolve) => {
    console.log("📧 Formulaire envoyé:", data);
    // ✅ NE PAS sauvegarder les données sensibles en localStorage
    // Les données sont déjà envoyées via Formspree/EmailJS
    setTimeout(resolve, 1500);
  });
}

// Fonction pour afficher les messages
function showMessage(type, text) {
  const messageDiv = document.createElement("div");
  messageDiv.className = `${type}-message`;
  messageDiv.innerHTML = `
    <i class="fas fa-${
      type === "success" ? "check-circle" : "exclamation-circle"
    }"></i>
    <span>${text}</span>
  `;

  const form = document.getElementById("contactForm");
  form.insertBefore(messageDiv, form.firstChild);

  // Scroll vers le message
  messageDiv.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

// === Newsletter Form ===
const newsletterForm = document.getElementById("newsletterForm");
if (newsletterForm) {
  newsletterForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const emailInput = this.querySelector('input[type="email"]');
    const submitBtn = this.querySelector('button[type="submit"]');
    const email = emailInput.value;

    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';

    try {
      // ✅ Validation stricte de l'email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        showMessage("error", "❌ Email invalide");
        return;
      }

      // ✅ NE PAS stocker en localStorage (FAILLE DE SÉCURITÉ!)
      // Envoyer directement à Formspree
      const response = await fetch("https://formspree.io/f/mpweqqzz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email, source: "newsletter" }),
      });

      if (!response.ok) throw new Error("Newsletter submission failed");

      // Message de succès
      const successMsg = document.createElement("p");
      successMsg.style.color = "var(--success)";
      successMsg.style.fontSize = "0.875rem";
      successMsg.style.marginTop = "0.5rem";
      successMsg.innerHTML = "âœ… Inscription rÃ©ussie !";
      this.appendChild(successMsg);

      emailInput.value = "";

      setTimeout(() => successMsg.remove(), 3000);
    } catch (error) {
      alert("Erreur lors de l'inscription. Veuillez rÃ©essayer.");
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i>';
    }
  });
}

// === Portfolio Filter ===
const portfolioFilters = document.querySelectorAll(".portfolio-filter");
const portfolioItems = document.querySelectorAll(".portfolio-item");

if (portfolioFilters.length > 0) {
  portfolioFilters.forEach((filter) => {
    filter.addEventListener("click", function () {
      // Retirer la classe active de tous les filtres
      portfolioFilters.forEach((f) => f.classList.remove("active"));
      this.classList.add("active");

      const category = this.getAttribute("data-category");

      // Filtrer les items
      portfolioItems.forEach((item) => {
        const itemCategory = item.getAttribute("data-category");

        if (category === "all" || itemCategory === category) {
          item.style.display = "block";
          setTimeout(() => {
            item.style.opacity = "1";
            item.style.transform = "scale(1)";
          }, 10);
        } else {
          item.style.opacity = "0";
          item.style.transform = "scale(0.8)";
          setTimeout(() => {
            item.style.display = "none";
          }, 300);
        }
      });
    });
  });
}

// === Animations on Scroll ===
function animateOnScroll() {
  const elements = document.querySelectorAll(
    ".feature-card, .service-card, .portfolio-item, .testimonial-card, .blog-card, .pricing-card"
  );

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "0";
          entry.target.style.transform = "translateY(30px)";

          setTimeout(() => {
            entry.target.style.transition = "all 0.6s ease-out";
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
          }, 100);

          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    }
  );

  elements.forEach((el) => observer.observe(el));
}

// Initialiser les animations au chargement
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", animateOnScroll);
} else {
  animateOnScroll();
}

// === Counter Animation ===
function animateCounter(element, target, duration = 2000) {
  const start = 0;
  const increment = target / (duration / 16);
  let current = start;

  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    element.textContent = Math.floor(current) + (element.dataset.suffix || "");
  }, 16);
}

// Animer les compteurs dans les stats
const statNumbers = document.querySelectorAll(".stat-number");
if (statNumbers.length > 0) {
  const statsObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const target = entry.target;
          const value = parseInt(target.textContent);
          if (!isNaN(value)) {
            target.dataset.suffix = target.textContent.replace(value, "");
            animateCounter(target, value);
          }
          statsObserver.unobserve(target);
        }
      });
    },
    { threshold: 0.5 }
  );

  statNumbers.forEach((stat) => statsObserver.observe(stat));
}

// === FAQ Accordion ===
const faqItems = document.querySelectorAll(".faq-item");
if (faqItems.length > 0) {
  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question");
    question.addEventListener("click", function () {
      const isActive = item.classList.contains("active");

      // Fermer tous les autres items
      faqItems.forEach((i) => i.classList.remove("active"));

      // Toggle l'item cliquÃ©
      if (!isActive) {
        item.classList.add("active");
      }
    });
  });
}

// === RÃ©cupÃ©rer paramÃ¨tres URL pour prÃ©-remplir le formulaire ===
function getURLParameter(name) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(name);
}

// PrÃ©-remplir le formulaire de contact si un pack est sÃ©lectionnÃ©
const typeProjetSelect = document.querySelector('[name="typeProjet"]');
if (typeProjetSelect) {
  const packParam = getURLParameter("pack");
  if (packParam) {
    const options = typeProjetSelect.querySelectorAll("option");
    options.forEach((option) => {
      if (option.value === packParam) {
        option.selected = true;
      }
    });
  }
}

// === Tracking Analytics (Google Analytics) ===
// DÃ©commentez et ajoutez votre ID Google Analytics
/*
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-XXXXXXXXXX'); // Remplacez par votre ID
*/

// Tracker les clics sur les boutons CTA
document.querySelectorAll(".btn-primary, .btn-secondary").forEach((btn) => {
  btn.addEventListener("click", function (e) {
    const text = this.textContent.trim();
    console.log("CTA cliquÃ©:", text);

    // Envoyer Ã  Google Analytics
    // gtag('event', 'cta_click', { button_text: text });
  });
});

// === Protection contre le spam (Honeypot) ===
// Ajouter un champ cachÃ© au formulaire
if (contactForm) {
  const honeypot = document.createElement("input");
  honeypot.type = "text";
  honeypot.name = "website";
  honeypot.style.display = "none";
  honeypot.tabIndex = -1;
  honeypot.autocomplete = "off";
  contactForm.appendChild(honeypot);

  // VÃ©rifier lors de la soumission
  contactForm.addEventListener("submit", function (e) {
    if (honeypot.value !== "") {
      e.preventDefault();
      console.warn("Bot dÃ©tectÃ©");
      return false;
    }
  });
}

// === Lazy Loading Images ===
if ("loading" in HTMLImageElement.prototype) {
  const images = document.querySelectorAll("img[data-src]");
  images.forEach((img) => {
    img.src = img.dataset.src;
  });
} else {
  // Fallback pour les navigateurs plus anciens
  const script = document.createElement("script");
  script.src =
    "https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js";
  document.body.appendChild(script);
}

// === Mode Sombre (optionnel) ===
function initDarkMode() {
  const darkModeToggle = document.getElementById("darkModeToggle");
  if (!darkModeToggle) return;

  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");
  const currentTheme = localStorage.getItem("theme");

  if (currentTheme === "dark" || (!currentTheme && prefersDark.matches)) {
    document.body.classList.add("dark-mode");
  }

  darkModeToggle.addEventListener("click", function () {
    document.body.classList.toggle("dark-mode");
    const isDark = document.body.classList.contains("dark-mode");
    localStorage.setItem("theme", isDark ? "dark" : "light");
  });
}

// === Copier dans le presse-papier ===
function copyToClipboard(text) {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text).then(() => {
      console.log("CopiÃ©:", text);
    });
  } else {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
  }
}

// === Console Easter Egg ===
console.log(
  "%cðŸ‘‹ Salut DÃ©veloppeur!",
  "font-size: 20px; font-weight: bold; color: #2563eb;"
);
console.log(
  "%cSite crÃ©Ã© par M.G.N CodeWave ðŸ‡¬ðŸ‡¦",
  "font-size: 14px; color: #6b7280;"
);
console.log(
  "%cBesoin d'un site comme celui-ci? Contactez-nous: +241 74 67 67 41",
  "font-size: 12px; color: #10b981;"
);

// === Performance Monitoring ===
window.addEventListener("load", () => {
  if (window.performance && window.performance.timing) {
    const perfData = window.performance.timing;
    const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
    console.log(`âš¡ Page chargÃ©e en ${pageLoadTime}ms`);

    // Envoyer Ã  Analytics si configurÃ©
    // gtag('event', 'page_load_time', { value: pageLoadTime });
  }
});

// === Service Worker (pour PWA - optionnel) ===
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    // DÃ©commentez pour activer le Service Worker
    /*
    navigator.serviceWorker.register('/sw.js')
      .then(registration => console.log('SW enregistrÃ©'))
      .catch(err => console.log('Erreur SW:', err));
    */
  });
}
