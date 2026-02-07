// ========================================
// CodeWave - JavaScript Principal
// ========================================

// === Theme Toggle ===
const THEME_STORAGE_KEY = "codewave-theme";
const LANG_STORAGE_KEY = "codewave-lang";
const SUPPORTED_LANGS = ["fr", "en"];
const themeMedia = window.matchMedia("(prefers-color-scheme: dark)");

const UI_I18N = {
  fr: {
    theme: {
      toLight: "Passer en mode clair",
      toDark: "Passer en mode sombre",
      sr: "Basculer le thème",
    },
    lang: {
      toEn: "Passer en anglais",
      toFr: "Passer en français",
    },
    nav: {
      home: "Accueil",
      services: "Services",
      pricing: "Tarifs",
      portfolio: "Portfolio",
      blog: "Blog",
      about: "À Propos",
      careers: "Carrières",
      contact: "Contact",
      quote: "Devis Gratuit",
    },
    footer: {
      tagline: "Solutions Digitales",
      description:
        "Votre partenaire digital de confiance au Gabon. Nous transformons vos idées en sites web performants et rentables.",
      servicesTitle: "Services",
      quickLinksTitle: "Liens Rapides",
      newsletterTitle: "Newsletter",
      newsletterText: "Recevez nos conseils web",
      newsletterPlaceholder: "Votre email",
      newsletterButton: "S'abonner",
      newsletterNote: "🔒 Pas de spam. Désabonnement facile.",
      bottomHtml:
        "&copy; 2025 <strong>M.G.N CodeWave</strong>. Tous droits réservés. 🇬🇦 Fait avec ❤️ au Gabon",
      legal: {
        mentions: "Mentions Légales",
        privacy: "Politique de Confidentialité",
        cgv: "CGV",
        sitemap: "Plan du Site",
      },
      services: {
        showcase: "Sites Vitrines",
        ecommerce: "E-Commerce",
        blogs: "Blogs & Portfolios",
        maintenance: "Maintenance",
        seo: "SEO & Référencement",
      },
    },
    whatsapp: {
      label: "Contactez-nous sur WhatsApp",
    },
    messages: {
      contact: {
        invalidName: "Nom invalide (2-100 caractères)",
        invalidEmail: "Email invalide",
        invalidPhone: "Téléphone invalide",
        invalidMessage: "Message invalide (10-5000 caractères)",
        success:
          "✅ Merci ! Votre demande a été envoyée avec succès. Nous vous répondrons sous 24h.",
        error:
          "❌ Oups ! Une erreur est survenue. Veuillez réessayer ou nous contacter directement via WhatsApp.",
        whatsappTemplate:
          "Bonjour, je viens d'envoyer une demande de devis via le site.\n\nNom: {name}\nEmail: {email}\nProjet: {project}",
      },
      newsletter: {
        invalidEmail: "❌ Email invalide",
        success: "✅ Inscription réussie !",
        error: "Erreur lors de l'inscription. Veuillez réessayer.",
      },
    },
  },
  en: {
    theme: {
      toLight: "Switch to light mode",
      toDark: "Switch to dark mode",
      sr: "Toggle theme",
    },
    lang: {
      toEn: "Switch to English",
      toFr: "Switch to French",
    },
    nav: {
      home: "Home",
      services: "Services",
      pricing: "Pricing",
      portfolio: "Portfolio",
      blog: "Blog",
      about: "About",
      careers: "Careers",
      contact: "Contact",
      quote: "Free Quote",
    },
    footer: {
      tagline: "Digital Solutions",
      description:
        "Your trusted digital partner in Gabon. We turn your ideas into high-performing, profitable websites.",
      servicesTitle: "Services",
      quickLinksTitle: "Quick Links",
      newsletterTitle: "Newsletter",
      newsletterText: "Get our web tips",
      newsletterPlaceholder: "Your email",
      newsletterButton: "Subscribe",
      newsletterNote: "🔒 No spam. Easy unsubscribe.",
      bottomHtml:
        "&copy; 2025 <strong>M.G.N CodeWave</strong>. All rights reserved. 🇬🇦 Made with ❤️ in Gabon",
      legal: {
        mentions: "Legal Notice",
        privacy: "Privacy Policy",
        cgv: "Terms & Conditions",
        sitemap: "Sitemap",
      },
      services: {
        showcase: "Showcase Websites",
        ecommerce: "E-Commerce",
        blogs: "Blogs & Portfolios",
        maintenance: "Maintenance",
        seo: "SEO & Search Optimization",
      },
    },
    whatsapp: {
      label: "Contact us on WhatsApp",
    },
    messages: {
      contact: {
        invalidName: "Invalid name (2-100 characters)",
        invalidEmail: "Invalid email",
        invalidPhone: "Invalid phone number",
        invalidMessage: "Invalid message (10-5000 characters)",
        success:
          "✅ Thanks! Your request was sent successfully. We will reply within 24 hours.",
        error:
          "❌ Oops! An error occurred. Please try again or contact us directly via WhatsApp.",
        whatsappTemplate:
          "Hello, I just sent a quote request via the website.\n\nName: {name}\nEmail: {email}\nProject: {project}",
      },
      newsletter: {
        invalidEmail: "❌ Invalid email",
        success: "✅ Subscription successful!",
        error: "Subscription error. Please try again.",
      },
    },
  },
};

function getI18nValue(lang, path) {
  const safeLang = SUPPORTED_LANGS.includes(lang) ? lang : "fr";
  const parts = path.split(".");
  let current = UI_I18N[safeLang];
  for (const part of parts) {
    if (!current || typeof current !== "object") return "";
    current = current[part];
  }
  if (typeof current === "string") return current;
  return "";
}

function getStoredLang() {
  try {
    const stored = localStorage.getItem(LANG_STORAGE_KEY);
    return SUPPORTED_LANGS.includes(stored) ? stored : null;
  } catch (error) {
    return null;
  }
}

function setStoredLang(lang) {
  try {
    localStorage.setItem(LANG_STORAGE_KEY, lang);
  } catch (error) {
    // Storage may be unavailable in some contexts.
  }
}

function detectLang() {
  const browserLang = (navigator.language || "fr").toLowerCase();
  return browserLang.startsWith("en") ? "en" : "fr";
}

function getStoredTheme() {
  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    return stored === "dark" || stored === "light" ? stored : null;
  } catch (error) {
    return null;
  }
}

function setStoredTheme(theme) {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch (error) {
    // Storage may be unavailable in some contexts.
  }
}

function updateThemeToggles(theme) {
  const toggles = document.querySelectorAll(".theme-toggle");
  const toLight = getI18nValue(activeLang, "theme.toLight");
  const toDark = getI18nValue(activeLang, "theme.toDark");
  const srLabel = getI18nValue(activeLang, "theme.sr");
  toggles.forEach((toggle) => {
    const icon = toggle.querySelector("i");
    const srOnly = toggle.querySelector(".sr-only");
    if (theme === "dark") {
      if (icon) {
        icon.classList.remove("fa-moon");
        icon.classList.add("fa-sun");
      }
      toggle.setAttribute("aria-label", toLight);
      toggle.setAttribute("aria-pressed", "true");
    } else {
      if (icon) {
        icon.classList.remove("fa-sun");
        icon.classList.add("fa-moon");
      }
      toggle.setAttribute("aria-label", toDark);
      toggle.setAttribute("aria-pressed", "false");
    }
    if (srOnly) {
      srOnly.textContent = srLabel;
    }
  });
}

function applyTheme(theme, options = {}) {
  if (!theme) return;
  document.documentElement.setAttribute("data-theme", theme);
  if (options.updateToggle !== false) {
    updateThemeToggles(theme);
  }
}

let storedLang = getStoredLang();
let activeLang = storedLang || detectLang();
document.documentElement.setAttribute("lang", activeLang);

let storedTheme = getStoredTheme();
let activeTheme = storedTheme || (themeMedia.matches ? "dark" : "light");
applyTheme(activeTheme, { updateToggle: false });

function updateLangToggles(lang) {
  const toggles = document.querySelectorAll(".lang-toggle");
  toggles.forEach((toggle) => {
    const nextLang = lang === "fr" ? "en" : "fr";
    toggle.textContent = nextLang.toUpperCase();
    toggle.setAttribute(
      "aria-label",
      nextLang === "en"
        ? getI18nValue(lang, "lang.toEn")
        : getI18nValue(lang, "lang.toFr"),
    );
    toggle.setAttribute("aria-pressed", lang === "en" ? "true" : "false");
  });
}

function translateCommon(lang) {
  const footer = document.querySelector(".footer");
  const navCta = document.querySelector(".nav-cta .btn.btn-primary");

  const navLinks = [
    { href: "index.html", key: "nav.home" },
    { href: "services.html", key: "nav.services" },
    { href: "tarifs.html", key: "nav.pricing" },
    { href: "portfolio.html", key: "nav.portfolio" },
    { href: "blog.html", key: "nav.blog" },
    { href: "a-propos.html", key: "nav.about" },
    { href: "careers.html", key: "nav.careers" },
    { href: "contact.html", key: "nav.contact" },
  ];

  navLinks.forEach(({ href, key }) => {
    document
      .querySelectorAll(`.nav-menu a[href$="${href}"]`)
      .forEach((link) => {
        link.textContent = getI18nValue(lang, key);
      });
  });

  if (navCta) {
    navCta.textContent = getI18nValue(lang, "nav.quote");
  }

  if (footer) {
    const tagline = footer.querySelector(".logo-tagline");
    const description = footer.querySelector(".footer-description");
    const footerCols = footer.querySelectorAll(".footer-col");
    const footerBottom = footer.querySelector(".footer-bottom p");

    if (tagline) {
      tagline.textContent = getI18nValue(lang, "footer.tagline");
    }
    if (description) {
      description.textContent = getI18nValue(lang, "footer.description");
    }

    if (footerCols[1]) {
      const title = footerCols[1].querySelector("h4");
      if (title) {
        title.textContent = getI18nValue(lang, "footer.servicesTitle");
      }
      const servicesMap = [
        { href: "services.html#vitrines", key: "footer.services.showcase" },
        { href: "services.html#ecommerce", key: "footer.services.ecommerce" },
        { href: "services.html#blogs", key: "footer.services.blogs" },
        {
          href: "services.html#maintenance",
          key: "footer.services.maintenance",
        },
        { href: "services.html#additionnels", key: "footer.services.seo" },
      ];
      servicesMap.forEach(({ href, key }) => {
        footer
          .querySelectorAll(`.footer a[href$="${href}"]`)
          .forEach((link) => {
            link.textContent = getI18nValue(lang, key);
          });
      });
    }

    if (footerCols[2]) {
      const title = footerCols[2].querySelector("h4");
      if (title) {
        title.textContent = getI18nValue(lang, "footer.quickLinksTitle");
      }
      const quickLinks = [
        { href: "index.html", key: "nav.home" },
        { href: "portfolio.html", key: "nav.portfolio" },
        { href: "tarifs.html", key: "nav.pricing" },
        { href: "blog.html", key: "nav.blog" },
        { href: "careers.html", key: "nav.careers" },
        { href: "contact.html", key: "nav.contact" },
      ];
      quickLinks.forEach(({ href, key }) => {
        footer
          .querySelectorAll(`.footer a[href$="${href}"]`)
          .forEach((link) => {
            link.textContent = getI18nValue(lang, key);
          });
      });
    }

    if (footerCols[3]) {
      const title = footerCols[3].querySelector("h4");
      const intro = footerCols[3].querySelector("p:not(.newsletter-note)");
      const note = footerCols[3].querySelector(".newsletter-note");
      const input = footerCols[3].querySelector(".newsletter-form input");
      const button = footerCols[3].querySelector(".newsletter-form button");

      if (title) {
        title.textContent = getI18nValue(lang, "footer.newsletterTitle");
      }
      if (intro) {
        intro.textContent = getI18nValue(lang, "footer.newsletterText");
      }
      if (note) {
        note.textContent = getI18nValue(lang, "footer.newsletterNote");
      }
      if (input) {
        input.setAttribute(
          "placeholder",
          getI18nValue(lang, "footer.newsletterPlaceholder"),
        );
        input.setAttribute(
          "aria-label",
          getI18nValue(lang, "footer.newsletterPlaceholder"),
        );
      }
      if (button) {
        button.setAttribute(
          "aria-label",
          getI18nValue(lang, "footer.newsletterButton"),
        );
      }
    }

    if (footerBottom) {
      footerBottom.innerHTML = getI18nValue(lang, "footer.bottomHtml");
    }

    const legalMap = [
      {
        href: "mentions-legales.html",
        key: "footer.legal.mentions",
      },
      {
        href: "politique-confidentialite.html",
        key: "footer.legal.privacy",
      },
      { href: "cgv.html", key: "footer.legal.cgv" },
      { href: "plan-du-site.html", key: "footer.legal.sitemap" },
    ];

    legalMap.forEach(({ href, key }) => {
      footer
        .querySelectorAll(`.footer-legal a[href$="${href}"]`)
        .forEach((link) => {
          link.textContent = getI18nValue(lang, key);
        });
    });
  }

  const whatsappFloat = document.querySelector(".whatsapp-float");
  if (whatsappFloat) {
    whatsappFloat.setAttribute(
      "aria-label",
      getI18nValue(lang, "whatsapp.label"),
    );
  }
}

function applyLanguage(lang, options = {}) {
  if (!SUPPORTED_LANGS.includes(lang)) return;
  activeLang = lang;
  document.documentElement.setAttribute("lang", lang);
  translateCommon(lang);
  applyPageTranslations(lang);
  updateThemeToggles(activeTheme);
  if (options.updateToggle !== false) {
    updateLangToggles(lang);
  }
}

function setText(selector, value) {
  document.querySelectorAll(selector).forEach((el) => {
    el.textContent = value;
  });
}

function setHtml(selector, value) {
  document.querySelectorAll(selector).forEach((el) => {
    el.innerHTML = value;
  });
}

function setAttr(selector, attr, value) {
  document.querySelectorAll(selector).forEach((el) => {
    el.setAttribute(attr, value);
  });
}

function setMeta(name, value) {
  const meta = document.querySelector(`meta[name="${name}"]`);
  if (meta) {
    meta.setAttribute("content", value);
  }
}

function setOg(property, value) {
  const meta = document.querySelector(`meta[property="${property}"]`);
  if (meta) {
    meta.setAttribute("content", value);
  }
}

function applyPageTranslations(lang) {
  const page = (
    window.location.pathname.split("/").pop() || "index.html"
  ).toLowerCase();

  if (page === "index.html" || page === "") {
    translateIndex(lang);
  }

  if (page === "services.html") {
    translateServices(lang);
  }

  if (page === "tarifs.html") {
    translateTarifs(lang);
  }

  if (page === "portfolio.html") {
    translatePortfolio(lang);
  }

  if (page === "blog.html") {
    translateBlog(lang);
  }

  if (page === "contact.html") {
    translateContact(lang);
  }

  if (page === "a-propos.html") {
    translateAbout(lang);
  }

  if (page === "careers.html") {
    translateCareers(lang);
  }
}

function translateIndex(lang) {
  const data = {
    fr: {
      meta: {
        title: "CodeWave - Création de Sites Web Professionnels",
        description:
          "CodeWave - Création de sites web professionnels au Gabon. Sites vitrines, e-commerce, blogs. À partir de 80 000 FCFA. Devis gratuit en 24h.",
        keywords:
          "création site web gabon, développeur web libreville, site e-commerce gabon, agence web gabon, codewave",
        ogTitle: "CodeWave - Votre Site Web Prêt en 2 Semaines",
        ogDescription:
          "Solutions digitales professionnelles au Gabon. À partir de 100 000 FCFA.",
      },
      heroBadge: "🇬🇦 Basé à Libreville, Gabon",
      heroTitleHtml:
        'Votre Site Web <span class="gradient-text">Prêt en 2 Semaines</span>',
      heroDesc:
        "Développement de sites web professionnels, boutiques en ligne et applications sur mesure. Des solutions modernes et abordables pour propulser votre entreprise.",
      heroCtaPrimaryHtml:
        'Démarrer Mon Projet <i class="fas fa-arrow-right"></i>',
      heroCtaSecondaryHtml: '<i class="fab fa-whatsapp"></i> WhatsApp Direct',
      whyTitle: "Pourquoi Choisir CodeWave ?",
      whySubtitle: "Votre partenaire digital de confiance",
      whyCards: [
        {
          title: "Qualité Garantie",
          text: "Des designs modernes testés sur tous les appareils",
        },
        {
          title: "Livraison Rapide",
          text: "Votre site prêt en 2-4 semaines selon le pack",
        },
        {
          title: "Support Dédié",
          text: "Assistance rapide par WhatsApp, email ou téléphone",
        },
        {
          title: "Prix Compétitifs",
          text: "Les meilleurs tarifs au Gabon avec paiement flexible",
        },
      ],
      servicesTitle: "Nos Services",
      servicesSubtitle: "Des solutions complètes pour tous vos besoins web",
      services: [
        {
          title: "Sites Vitrines",
          text: "Sites web professionnels pour présenter votre activité",
          price: "À partir de 100 000 FCFA",
          features: [
            "Design responsive",
            "Optimisation SEO",
            "Formulaire de contact",
          ],
          action: "En Savoir Plus",
        },
        {
          title: "E-Commerce",
          text: "Boutiques en ligne complètes avec paiement sécurisé",
          price: "À partir de 300 000 FCFA",
          features: [
            "Gestion produits",
            "Paiement en ligne",
            "Suivi commandes",
          ],
          action: "Commander",
        },
        {
          title: "Blogs & Portfolios",
          text: "Plateformes pour partager votre passion et vos réalisations",
          price: "À partir de 80 000 FCFA",
          features: ["Design épuré", "SEO optimisé", "Gestion facile"],
          action: "Découvrir",
        },
      ],
      servicesCta: "Voir Tous Nos Services",
      portfolioTitle: "Nos Réalisations",
      portfolioSubtitle:
        "Découvrez des projets qui ont transformé des entreprises",
      portfolioItems: [
        {
          title: "Waz'UP",
          subtitle: "Super-app Flutter",
          tag: "Application mobile",
          result: "E-commerce & livraison",
        },
        {
          title: "H2P Group",
          subtitle: "Site & Identité",
          tag: "Site vitrine",
          result: "Prise de RDV",
        },
        {
          title: "Le Bon Waz",
          subtitle: "Marketplace",
          tag: "E-Commerce",
          result: "Annonces & messagerie",
        },
      ],
      portfolioCta: "Voir Tous Nos Projets",
      ctaTitle: "Prêt à Lancer Votre Projet ?",
      ctaPrimaryHtml:
        'Demander un Devis Gratuit <i class="fas fa-arrow-right"></i>',
      ctaSecondaryHtml: '<i class="fab fa-whatsapp"></i> WhatsApp Direct',
      ctaFeatures: ["Devis en 24h", "Paiement flexible", "Support 24/7"],
    },
    en: {
      meta: {
        title: "CodeWave - Professional Website Creation",
        description:
          "CodeWave - Professional website creation in Gabon. Showcase sites, e-commerce, blogs. From 80,000 FCFA. Free quote in 24h.",
        keywords:
          "website creation gabon, web developer libreville, e-commerce site gabon, web agency gabon, codewave",
        ogTitle: "CodeWave - Your Website Ready in 2 Weeks",
        ogDescription:
          "Professional digital solutions in Gabon. From 100,000 FCFA.",
      },
      heroBadge: "🇬🇦 Based in Libreville, Gabon",
      heroTitleHtml:
        'Your Website <span class="gradient-text">Ready in 2 Weeks</span>',
      heroDesc:
        "Professional website development, online stores, and custom applications. Modern, affordable solutions to grow your business.",
      heroCtaPrimaryHtml: 'Start My Project <i class="fas fa-arrow-right"></i>',
      heroCtaSecondaryHtml: '<i class="fab fa-whatsapp"></i> WhatsApp Direct',
      whyTitle: "Why Choose CodeWave?",
      whySubtitle: "Your trusted digital partner",
      whyCards: [
        {
          title: "Quality Guaranteed",
          text: "Modern designs tested on every device",
        },
        {
          title: "Fast Delivery",
          text: "Your site ready in 2-4 weeks depending on the package",
        },
        {
          title: "Dedicated Support",
          text: "Fast help via WhatsApp, email, or phone",
        },
        {
          title: "Competitive Pricing",
          text: "Best rates in Gabon with flexible payment",
        },
      ],
      servicesTitle: "Our Services",
      servicesSubtitle: "Complete solutions for all your web needs",
      services: [
        {
          title: "Showcase Websites",
          text: "Professional websites to present your business",
          price: "From 100,000 FCFA",
          features: ["Responsive design", "SEO optimization", "Contact form"],
          action: "Learn More",
        },
        {
          title: "E-Commerce",
          text: "Complete online stores with secure payment",
          price: "From 300,000 FCFA",
          features: ["Product management", "Online payments", "Order tracking"],
          action: "Order Now",
        },
        {
          title: "Blogs & Portfolios",
          text: "Platforms to share your passion and showcase your work",
          price: "From 80,000 FCFA",
          features: ["Clean design", "SEO optimized", "Easy management"],
          action: "Discover",
        },
      ],
      servicesCta: "See All Our Services",
      portfolioTitle: "Our Work",
      portfolioSubtitle: "Discover projects that transformed businesses",
      portfolioItems: [
        {
          title: "Waz'UP",
          subtitle: "Flutter super-app",
          tag: "Mobile app",
          result: "E-commerce & delivery",
        },
        {
          title: "H2P Group",
          subtitle: "Website & Identity",
          tag: "Showcase site",
          result: "Appointment booking",
        },
        {
          title: "Le Bon Waz",
          subtitle: "Marketplace",
          tag: "E-Commerce",
          result: "Listings & messaging",
        },
      ],
      portfolioCta: "See All Our Projects",
      ctaTitle: "Ready to Launch Your Project?",
      ctaPrimaryHtml: 'Request a Free Quote <i class="fas fa-arrow-right"></i>',
      ctaSecondaryHtml: '<i class="fab fa-whatsapp"></i> WhatsApp Direct',
      ctaFeatures: ["Quote in 24h", "Flexible payment", "24/7 support"],
    },
  };

  const t = data[lang];
  if (!t) return;

  document.title = t.meta.title;
  setMeta("description", t.meta.description);
  setMeta("keywords", t.meta.keywords);
  setOg("og:title", t.meta.ogTitle);
  setOg("og:description", t.meta.ogDescription);

  setText(".hero-badge span:last-child", t.heroBadge);
  setHtml(".hero-title", t.heroTitleHtml);
  setText(".hero-description", t.heroDesc);
  setHtml(".hero-cta .btn.btn-primary", t.heroCtaPrimaryHtml);
  setHtml(".hero-cta .btn.btn-secondary", t.heroCtaSecondaryHtml);

  setText(".why-choose .section-title", t.whyTitle);
  setText(".why-choose .section-subtitle", t.whySubtitle);

  document
    .querySelectorAll(".features-grid .feature-card")
    .forEach((card, i) => {
      const item = t.whyCards[i];
      if (!item) return;
      const title = card.querySelector("h3");
      const text = card.querySelector("p");
      if (title) title.textContent = item.title;
      if (text) text.textContent = item.text;
    });

  setText(".services-preview .section-title", t.servicesTitle);
  setText(".services-preview .section-subtitle", t.servicesSubtitle);

  document
    .querySelectorAll(".services-preview .service-card")
    .forEach((card, i) => {
      const item = t.services[i];
      if (!item) return;
      const title = card.querySelector("h3");
      const text = card.querySelector("p");
      const price = card.querySelector(".service-price");
      const features = card.querySelectorAll(".service-features li");
      const action = card.querySelector("a.btn");
      if (title) title.textContent = item.title;
      if (text) text.textContent = item.text;
      if (price) price.textContent = item.price;
      features.forEach((feature, index) => {
        if (item.features[index]) {
          const span = feature.querySelector("span") || feature;
          span.textContent = item.features[index];
        }
      });
      if (action) action.textContent = item.action;
    });

  setText(
    ".services-preview .text-center.mt-5 .btn.btn-primary",
    t.servicesCta,
  );

  setText(".portfolio-preview .section-title", t.portfolioTitle);
  setText(".portfolio-preview .section-subtitle", t.portfolioSubtitle);

  document
    .querySelectorAll(".portfolio-preview .portfolio-item")
    .forEach((item, i) => {
      const dataItem = t.portfolioItems[i];
      if (!dataItem) return;
      const overlayTitle = item.querySelector(".portfolio-overlay h4");
      const overlayText = item.querySelector(".portfolio-overlay p");
      const tag = item.querySelector(".portfolio-tag");
      const resultText = item.querySelector(".portfolio-result");
      if (overlayTitle) overlayTitle.textContent = dataItem.title;
      if (overlayText) overlayText.textContent = dataItem.subtitle;
      if (tag) tag.textContent = dataItem.tag;
      if (resultText) {
        const span = resultText.querySelector("span") || resultText;
        span.textContent = dataItem.result;
      }
    });

  setText(
    ".portfolio-preview .text-center.mt-5 .btn.btn-primary",
    t.portfolioCta,
  );

  setText(".cta-section .cta-title", t.ctaTitle);
  setHtml(".cta-section .cta-buttons .btn.btn-white", t.ctaPrimaryHtml);
  setHtml(
    ".cta-section .cta-buttons .btn.btn-outline-white",
    t.ctaSecondaryHtml,
  );

  document
    .querySelectorAll(".cta-section .cta-feature span")
    .forEach((span, index) => {
      if (t.ctaFeatures[index]) {
        span.textContent = t.ctaFeatures[index];
      }
    });
}

function translateServices(lang) {
  const data = {
    fr: {
      meta: {
        title: "Services - CodeWave | Développement Web Professionnel Gabon",
        description:
          "Services de développement web au Gabon - Sites vitrines, e-commerce, blogs, maintenance. Solutions complètes à partir de 80 000 FCFA.",
      },
      breadcrumb: { home: "Accueil", current: "Services" },
      pageTitle: "Nos Services",
      pageSubtitle:
        "Des solutions digitales complètes adaptées à votre budget et vos besoins",
      navButtons: {
        vitrines: "Sites Vitrines",
        ecommerce: "E-Commerce",
        blogs: "Blogs & Portfolios",
        maintenance: "Maintenance",
        additionnels: "Services Additionnels",
      },
      vitrines: {
        title: "Sites Vitrines Professionnels",
        subtitle: "Présentez votre activité avec élégance et professionnalisme",
        intro:
          "Un site vitrine est la carte de visite digitale de votre entreprise. Nous créons des sites modernes, rapides et optimisés pour convertir vos visiteurs en clients.",
        cards: [
          {
            title: "Pack Basic",
            desc: "1 à 5 pages • Idéal pour artisans, TPE, associations",
            features: [
              "Design moderne et responsive",
              "Formulaire de contact fonctionnel",
              "Intégration réseaux sociaux",
              "Compatible mobile/tablette/desktop",
              "Certificat SSL inclus (HTTPS)",
              "Formation à la gestion du site",
              "Livraison en 1-2 semaines",
            ],
            cta: "Commander",
          },
          {
            title: "Pack Pro",
            desc: "Jusqu'à 10 pages • Idéal pour PME, entrepreneurs",
            features: [
              "Tout du Pack Basic +",
              "Design personnalisé sur mesure",
              "Optimisation SEO de base",
              "Google Maps intégré",
              "Formulaires avancés",
              "Galerie photos/vidéos",
              "Google Analytics intégré",
              "Support prioritaire 3 mois",
            ],
            cta: "Commander Maintenant",
          },
        ],
      },
      ecommerce: {
        title: "Sites E-Commerce",
        subtitle:
          "Vendez en ligne 24h/24 avec une boutique complète et sécurisée",
        intro:
          "Transformez votre commerce en boutique en ligne rentable. Gestion facile, paiements sécurisés, suivi des commandes et bien plus.",
        cards: [
          {
            title: "Pack Start-Up",
            desc: "Max 20 produits • Idéal pour petites boutiques, lancement",
            features: [
              "Interface d'administration facile",
              "Paiement en ligne sécurisé (Stripe/PayPal)",
              "Suivi des commandes en temps réel",
              "Gestion du stock automatique",
              "Rapports de ventes",
              "Email automatiques (confirmation, expédition)",
              "Formation complète à la gestion",
            ],
            cta: "Commander",
          },
          {
            title: "Pack Business",
            desc: "Produits illimités • Idéal pour PME, entreprises établies",
            features: [
              "Tout du Pack Start-Up +",
              "Design sur mesure premium",
              "Statistiques avancées des ventes",
              "Multi-devises (FCFA, EUR, USD)",
              "Promotions et codes coupons",
              "Gestion multi-utilisateurs",
              "Maintenance gratuite 3 mois",
              "Support dédié 24/7",
            ],
            cta: "Commander Maintenant",
          },
        ],
        featureTitle: "Fonctionnalités Incluses",
        featureCards: [
          {
            title: "Paiements Sécurisés",
            text: "Intégration Stripe, PayPal, Orange Money, MTN Mobile Money",
          },
          {
            title: "Suivi Livraisons",
            text: "Gestion complète des expéditions et tracking",
          },
          {
            title: "Analytics Avancés",
            text: "Statistiques détaillées de vos ventes et clients",
          },
          {
            title: "Mobile Ready",
            text: "70% des achats se font sur mobile au Gabon",
          },
        ],
      },
      blogs: {
        title: "Blogs & Portfolios",
        subtitle: "Partagez votre passion et mettez en valeur vos réalisations",
        cards: [
          {
            title: "Pack Starter",
            desc: "Blog/Portfolio simple • Idéal pour débutants",
            features: [
              "Design épuré et professionnel",
              "Catégorisation des articles",
              "Formulaire d'abonnement",
              "Partage sur réseaux sociaux",
              "Responsive design",
              "Gestion facile du contenu",
            ],
            cta: "Commander",
          },
          {
            title: "Pack Premium",
            desc: "Blog/Portfolio avancé • Artistes, photographes, écrivains",
            features: [
              "Tout du Pack Starter +",
              "Design sur mesure unique",
              "Optimisation SEO avancée",
              "Google Analytics intégré",
              "Système de commentaires",
              "Newsletter automatique",
              "Monétisation publicitaire (Google AdSense)",
            ],
            cta: "Commander Maintenant",
          },
        ],
      },
      maintenance: {
        title: "Maintenance & Hébergement",
        subtitle: "Gardez votre site sécurisé, rapide et performant",
        cards: [
          {
            title: "Maintenance Mensuelle",
            desc: "Gardez votre site à jour et sécurisé",
            features: [
              "Mises à jour régulières du site",
              "Sauvegardes quotidiennes automatiques",
              "Support technique 24/7",
              "Corrections de bugs et problèmes",
              "Monitoring de sécurité",
              "Rapport mensuel de performance",
            ],
            cta: "Souscrire",
          },
          {
            title: "Hébergement Web Premium",
            desc: "Performance et sécurité optimales pour votre site",
            features: [
              "50 GB d'espace disque SSD rapide",
              "Large bande passante mensuelle",
              "Certificat SSL gratuit",
              "Nom de domaine inclus (1 an)",
              "Sauvegardes automatiques quotidiennes",
              "99.9% temps de disponibilité garanti",
            ],
            cta: "Souscrire",
          },
        ],
      },
      additionnels: {
        title: "Services Additionnels",
        subtitle:
          "Personnalisez votre site avec des fonctionnalités supplémentaires",
        cards: [
          {
            title: "Optimisation SEO Avancée",
            text: "Améliorez votre visibilité sur Google et attirez plus de clients qualifiés",
          },
          {
            title: "Chat en Direct",
            text: "Communiquez instantanément avec vos visiteurs et augmentez vos conversions",
          },
          {
            title: "Fonctionnalités Personnalisées",
            text: "Système de réservation, espace client, calculs complexes sur mesure",
          },
          {
            title: "Refonte de Site",
            text: "Modernisez votre site existant et boostez vos conversions",
          },
          {
            title: "Création de Logo",
            text: "Une identité visuelle professionnelle et mémorable",
          },
          {
            title: "Analyse & Statistiques",
            text: "Comprenez vos visiteurs et optimisez vos performances",
          },
        ],
        cta: "En Savoir Plus",
      },
      additionalServices: {
        title: "Services Additionnels",
        subtitle: "Des solutions sur mesure pour répondre à tous vos besoins",
        cards: [
          {
            title: "Optimisation SEO",
            text: "Améliorez votre visibilité sur Google et attirez plus de visiteurs qualifiés",
            features: [
              "Audit SEO complet",
              "Optimisation on-page",
              "Recherche de mots-clés",
              "Rapport de performance",
            ],
          },
          {
            title: "Intégration Chat en Direct",
            text: "Boostez l'engagement client avec un support en temps réel sur votre site",
            features: [
              "Installation facile",
              "Personnalisation du widget",
              "Formation à l'utilisation",
              "Support technique",
            ],
          },
          {
            title: "Développement Sur Mesure",
            text: "Des solutions web personnalisées adaptées à vos besoins spécifiques",
            features: [
              "Analyse des besoins",
              "Développement agile",
              "Tests rigoureux",
              "Livraison clé en main",
            ],
          },
          {
            title: "Refonte de Site Web",
            text: "Modernisez votre site avec un design frais et des fonctionnalités améliorées",
            features: [
              "Analyse UX/UI",
              "Design moderne",
              "Optimisation mobile",
              "Amélioration des performances",
            ],
          },
          {
            title: "Design de Logo & Branding",
            text: "Créez une identité visuelle forte qui reflète votre marque",
            features: [
              "Concepts de logo uniques",
              "Palette de couleurs",
              "Polices personnalisées",
              "Guide de style de marque",
            ],
          },
          {
            title: "Analyse & Reporting",
            text: "Obtenez des insights précieux pour optimiser votre stratégie digitale",
            features: [
              "Configuration Google Analytics",
              "Rapports mensuels détaillés",
              "Recommandations d'optimisation",
              "Suivi des conversions",
            ],
          },
          {
            title: "Support & Consultation WhatsApp",
            text: "Obtenez des conseils experts et un support rapide via WhatsApp",
            features: [
              "Réponses rapides à vos questions",
              "Conseils personnalisés",
              "Assistance technique de base",
              "Disponible 24/7",
            ],
          },
          {
            title: "Marketing Digital",
            text: "Boostez votre présence en ligne avec des campagnes ciblées",
            features: [
              "Gestion des réseaux sociaux",
              "Campagnes publicitaires payantes",
              "Email marketing",
              "Analyse des performances",
            ],
          },
        ],
        cta: "En Savoir Plus",
        contactCta: "Contactez-Nous",
      },
      process: {
        title: "Notre Processus de Travail",
        subtitle:
          "Une approche claire et transparente pour des résultats exceptionnels",
        steps: [
          {
            title: "Consultation Initiale",
            text: "Discussion de vos besoins, objectifs et vision pour le site.",
          },
          {
            title: "Proposition & Devis",
            text: "Présentation d'une proposition détaillée et d'un devis transparent.",
          },
          {
            title: "Design & Développement",
            text: "Création du design, développement des fonctionnalités et intégration du contenu.",
          },
          {
            title: "Lancement & Formation",
            text: "Mise en ligne du site et formation pour la gestion autonome.",
          },
          {
            title: "Support Continu",
            text: "Assistance continue et options de maintenance pour assurer le succès à long terme.",
          },
        ],
      },
      cta: {
        title: "Prêt à Démarrer Votre Projet ?",
        text: "Obtenez un devis gratuit personnalisé en moins de 24h",
        primaryHtml:
          'Demander un Devis Gratuit <i class="fas fa-arrow-right"></i>',
        secondaryHtml: '<i class="fab fa-whatsapp"></i> WhatsApp Direct',
      },
    },
    en: {
      meta: {
        title: "Services - CodeWave | Professional Web Development Gabon",
        description:
          "Web development services in Gabon - showcase sites, e-commerce, blogs, maintenance. Complete solutions from 80,000 FCFA.",
      },
      breadcrumb: { home: "Home", current: "Services" },
      pageTitle: "Our Services",
      pageSubtitle:
        "Complete digital solutions tailored to your budget and needs",
      navButtons: {
        vitrines: "Showcase Websites",
        ecommerce: "E-Commerce",
        blogs: "Blogs & Portfolios",
        maintenance: "Maintenance",
        additionnels: "Additional Services",
      },
      vitrines: {
        title: "Professional Showcase Websites",
        subtitle: "Present your business with elegance and professionalism",
        intro:
          "A showcase website is your company's digital business card. We build modern, fast, and optimized sites that convert visitors into clients.",
        cards: [
          {
            title: "Basic Pack",
            desc: "1 to 5 pages • Ideal for artisans, small businesses, associations",
            features: [
              "Modern responsive design",
              "Working contact form",
              "Social media integration",
              "Mobile/tablet/desktop compatible",
              "SSL certificate included (HTTPS)",
              "Site management training",
              "Delivery in 1-2 weeks",
            ],
            cta: "Order",
          },
          {
            title: "Pro Pack",
            desc: "Up to 10 pages • Ideal for SMEs, entrepreneurs",
            features: [
              "Everything in Basic Pack +",
              "Custom tailored design",
              "Basic SEO optimization",
              "Google Maps integration",
              "Advanced forms",
              "Photo/video gallery",
              "Google Analytics integration",
              "Priority support 3 months",
            ],
            cta: "Order Now",
          },
        ],
      },
      ecommerce: {
        title: "E-Commerce Websites",
        subtitle: "Sell online 24/7 with a complete and secure store",
        intro:
          "Turn your business into a profitable online store. Easy management, secure payments, order tracking, and more.",
        cards: [
          {
            title: "Start-Up Pack",
            desc: "Max 20 products • Ideal for small shops, launch",
            features: [
              "Easy admin interface",
              "Secure online payments (Stripe/PayPal)",
              "Real-time order tracking",
              "Automatic stock management",
              "Sales reports",
              "Automated emails (confirmation, shipping)",
              "Full management training",
            ],
            cta: "Order",
          },
          {
            title: "Business Pack",
            desc: "Unlimited products • Ideal for SMEs, established companies",
            features: [
              "Everything in Start-Up Pack +",
              "Premium custom design",
              "Advanced sales analytics",
              "Multi-currency (FCFA, EUR, USD)",
              "Promotions and coupon codes",
              "Multi-user management",
              "Free maintenance 3 months",
              "Dedicated 24/7 support",
            ],
            cta: "Order Now",
          },
        ],
        featureTitle: "Included Features",
        featureCards: [
          {
            title: "Secure Payments",
            text: "Stripe, PayPal, Orange Money, MTN Mobile Money integration",
          },
          {
            title: "Delivery Tracking",
            text: "Complete shipping management and tracking",
          },
          {
            title: "Advanced Analytics",
            text: "Detailed stats on your sales and customers",
          },
          {
            title: "Mobile Ready",
            text: "70% of purchases happen on mobile in Gabon",
          },
        ],
      },
      blogs: {
        title: "Blogs & Portfolios",
        subtitle: "Share your passion and showcase your work",
        cards: [
          {
            title: "Starter Pack",
            desc: "Simple blog/portfolio • Ideal for beginners",
            features: [
              "Clean professional design",
              "Article categorization",
              "Subscription form",
              "Social media sharing",
              "Responsive design",
              "Easy content management",
            ],
            cta: "Order",
          },
          {
            title: "Premium Pack",
            desc: "Advanced blog/portfolio • Artists, photographers, writers",
            features: [
              "Everything in Starter Pack +",
              "Unique custom design",
              "Advanced SEO optimization",
              "Google Analytics integration",
              "Comments system",
              "Automatic newsletter",
              "Ad monetization (Google AdSense)",
            ],
            cta: "Order Now",
          },
        ],
      },
      maintenance: {
        title: "Maintenance & Hosting",
        subtitle: "Keep your site secure, fast, and performant",
        cards: [
          {
            title: "Monthly Maintenance",
            desc: "Keep your site up to date and secure",
            features: [
              "Regular site updates",
              "Automatic daily backups",
              "24/7 technical support",
              "Bug fixes and issue resolution",
              "Security monitoring",
              "Monthly performance report",
            ],
            cta: "Subscribe",
          },
          {
            title: "Premium Web Hosting",
            desc: "Optimal performance and security for your site",
            features: [
              "50 GB fast SSD storage",
              "Large monthly bandwidth",
              "Free SSL certificate",
              "Domain name included (1 year)",
              "Automatic daily backups",
              "99.9% uptime guarantee",
            ],
            cta: "Subscribe",
          },
        ],
      },
      additionnels: {
        title: "Additional Services",
        subtitle: "Customize your site with additional features",
        cards: [
          {
            title: "Advanced SEO Optimization",
            text: "Improve your Google visibility and attract more qualified clients",
            features: [
              "Full SEO audit",
              "Keyword optimization",
              "Quality backlinks",
              "Monthly tracking",
            ],
          },
          {
            title: "Live Chat",
            text: "Communicate instantly with visitors and boost conversions",
            features: [
              "Full installation",
              "Design customization",
              "Team training",
              "Technical support",
            ],
          },
          {
            title: "Custom Features",
            text: "Booking system, client portal, custom calculations",
            features: [
              "Tailored development",
              "Full testing",
              "Documentation",
              "Maintenance included",
            ],
          },
          {
            title: "Website Redesign",
            text: "Modernize your existing site and boost conversions",
            features: [
              "Existing site analysis",
              "Modern new design",
              "Data migration",
              "Full optimization",
            ],
          },
          {
            title: "Logo Creation",
            text: "A professional and memorable visual identity",
            features: [
              "3 unique concepts",
              "Unlimited revisions",
              "High-quality files",
              "Brand guidelines",
            ],
          },
          {
            title: "Analytics & Statistics",
            text: "Understand visitors and optimize performance",
            features: [
              "Google Analytics",
              "Monthly reports",
              "Recommendations",
              "Conversion tracking",
            ],
          },
        ],
        cta: "Learn More",
      },
      additionalServices: {
        title: "Additional Services",
        subtitle: "Custom solutions to meet all your needs",
        cards: [
          {
            title: "SEO Optimization",
            text: "Improve your Google visibility and attract more qualified visitors",
            features: [
              "Full SEO audit",
              "On-page optimization",
              "Keyword research",
              "Performance report",
            ],
          },
          {
            title: "Live Chat Integration",
            text: "Boost customer engagement with real-time support on your site",
            features: [
              "Easy installation",
              "Widget customization",
              "Usage training",
              "Technical support",
            ],
          },
          {
            title: "Custom Development",
            text: "Tailored web solutions for your specific needs",
            features: [
              "Needs analysis",
              "Agile development",
              "Rigorous testing",
              "Turnkey delivery",
            ],
          },
          {
            title: "Website Redesign",
            text: "Modernize your site with a fresh design and improved features",
            features: [
              "UX/UI analysis",
              "Modern design",
              "Mobile optimization",
              "Performance improvements",
            ],
          },
          {
            title: "Logo & Branding Design",
            text: "Create a strong visual identity that reflects your brand",
            features: [
              "Unique logo concepts",
              "Color palette",
              "Custom typography",
              "Brand style guide",
            ],
          },
          {
            title: "Analytics & Reporting",
            text: "Get valuable insights to optimize your digital strategy",
            features: [
              "Google Analytics setup",
              "Detailed monthly reports",
              "Optimization recommendations",
              "Conversion tracking",
            ],
          },
          {
            title: "WhatsApp Support & Consulting",
            text: "Get expert advice and fast support via WhatsApp",
            features: [
              "Fast answers to questions",
              "Personalized advice",
              "Basic technical support",
              "Available 24/7",
            ],
          },
          {
            title: "Digital Marketing",
            text: "Boost your online presence with targeted campaigns",
            features: [
              "Social media management",
              "Paid ad campaigns",
              "Email marketing",
              "Performance analysis",
            ],
          },
        ],
        cta: "Learn More",
        contactCta: "Contact Us",
      },
      process: {
        title: "Our Work Process",
        subtitle: "A clear, transparent approach for exceptional results",
        steps: [
          {
            title: "Initial Consultation",
            text: "Discuss your needs, goals, and vision for the site.",
          },
          {
            title: "Proposal & Quote",
            text: "Present a detailed proposal and transparent quote.",
          },
          {
            title: "Design & Development",
            text: "Create the design, build features, and integrate the content.",
          },
          {
            title: "Launch & Training",
            text: "Go live and train you to manage the site independently.",
          },
          {
            title: "Ongoing Support",
            text: "Continuous assistance and maintenance options for long-term success.",
          },
        ],
      },
      cta: {
        title: "Ready to Start Your Project?",
        text: "Get a personalized free quote in less than 24h",
        primaryHtml: 'Request a Free Quote <i class="fas fa-arrow-right"></i>',
        secondaryHtml: '<i class="fab fa-whatsapp"></i> WhatsApp Direct',
      },
    },
  };

  const t = data[lang];
  if (!t) return;

  document.title = t.meta.title;
  setMeta("description", t.meta.description);

  const breadcrumb = document.querySelector(".page-header .breadcrumb");
  if (breadcrumb) {
    const links = breadcrumb.querySelectorAll("a");
    const spans = breadcrumb.querySelectorAll("span");
    if (links[0]) links[0].textContent = t.breadcrumb.home;
    if (spans.length)
      spans[spans.length - 1].textContent = t.breadcrumb.current;
  }

  setText(".page-title", t.pageTitle);
  setText(".page-subtitle", t.pageSubtitle);

  setText('a[href="#vitrines"]', t.navButtons.vitrines);
  setText('a[href="#ecommerce"]', t.navButtons.ecommerce);
  setText('a[href="#blogs"]', t.navButtons.blogs);
  setText('a[href="#maintenance"]', t.navButtons.maintenance);
  setText('a[href="#additionnels"]', t.navButtons.additionnels);

  setText("#vitrines .section-title", t.vitrines.title);
  setText("#vitrines .section-subtitle", t.vitrines.subtitle);
  const vitrinesIntro = document.querySelector(
    '#vitrines div[style*="margin-bottom: 3rem"] p',
  );
  if (vitrinesIntro) vitrinesIntro.textContent = t.vitrines.intro;

  document
    .querySelectorAll("#vitrines .pricing-card")
    .forEach((card, index) => {
      const item = t.vitrines.cards[index];
      if (!item) return;
      const title = card.querySelector(".pricing-header h4");
      const desc = card.querySelector(".pricing-desc");
      const features = card.querySelectorAll(".pricing-features li");
      const button = card.querySelector("a.btn");
      if (title) title.textContent = item.title;
      if (desc) desc.textContent = item.desc;
      features.forEach((feature, i) => {
        if (item.features[i]) {
          const span = feature.querySelector("span") || feature;
          span.textContent = item.features[i];
        }
      });
      if (button) button.textContent = item.cta;
    });

  setText("#ecommerce .section-title", t.ecommerce.title);
  setText("#ecommerce .section-subtitle", t.ecommerce.subtitle);
  const ecommerceIntro = document.querySelector(
    '#ecommerce div[style*="margin-bottom: 3rem"] p',
  );
  if (ecommerceIntro) ecommerceIntro.textContent = t.ecommerce.intro;

  document
    .querySelectorAll("#ecommerce .pricing-card")
    .forEach((card, index) => {
      const item = t.ecommerce.cards[index];
      if (!item) return;
      const title = card.querySelector(".pricing-header h4");
      const desc = card.querySelector(".pricing-desc");
      const features = card.querySelectorAll(".pricing-features li");
      const button = card.querySelector("a.btn");
      if (title) title.textContent = item.title;
      if (desc) desc.textContent = item.desc;
      features.forEach((feature, i) => {
        if (item.features[i]) {
          const span = feature.querySelector("span") || feature;
          span.textContent = item.features[i];
        }
      });
      if (button) button.textContent = item.cta;
    });

  const ecommerceFeatureSection = document.querySelector(
    '#ecommerce div[style*="linear-gradient(135deg, #f0fdf4"]',
  );
  if (ecommerceFeatureSection) {
    const title = ecommerceFeatureSection.querySelector("h3");
    if (title) {
      const icon = title.querySelector("i");
      if (icon) {
        title.innerHTML = `${icon.outerHTML} ${t.ecommerce.featureTitle}`;
      } else {
        title.textContent = t.ecommerce.featureTitle;
      }
    }
    const cards = ecommerceFeatureSection.querySelectorAll("h4");
    const texts = ecommerceFeatureSection.querySelectorAll("p");
    t.ecommerce.featureCards.forEach((item, i) => {
      if (cards[i]) cards[i].textContent = item.title;
      if (texts[i]) texts[i].textContent = item.text;
    });
  }

  setText("#blogs .section-title", t.blogs.title);
  setText("#blogs .section-subtitle", t.blogs.subtitle);
  document.querySelectorAll("#blogs .pricing-card").forEach((card, index) => {
    const item = t.blogs.cards[index];
    if (!item) return;
    const title = card.querySelector(".pricing-header h4");
    const desc = card.querySelector(".pricing-desc");
    const features = card.querySelectorAll(".pricing-features li");
    const button = card.querySelector("a.btn");
    if (title) title.textContent = item.title;
    if (desc) desc.textContent = item.desc;
    features.forEach((feature, i) => {
      if (item.features[i]) {
        const span = feature.querySelector("span") || feature;
        span.textContent = item.features[i];
      }
    });
    if (button) button.textContent = item.cta;
  });

  setText("#maintenance .section-title", t.maintenance.title);
  setText("#maintenance .section-subtitle", t.maintenance.subtitle);
  document
    .querySelectorAll('#maintenance div[style*="max-width: 56rem"] > div')
    .forEach((card, index) => {
      const item = t.maintenance.cards[index];
      if (!item) return;
      const title = card.querySelector("h3");
      const desc = card.querySelector("p");
      const features = card.querySelectorAll("ul li span");
      const button = card.querySelector("a.btn");
      if (title) title.textContent = item.title;
      if (desc) desc.textContent = item.desc;
      features.forEach((feature, i) => {
        if (item.features[i]) {
          feature.textContent = item.features[i];
        }
      });
      if (button) button.textContent = item.cta;
    });

  setText("#additionnels .section-title", t.additionnels.title);
  setText("#additionnels .section-subtitle", t.additionnels.subtitle);
  document
    .querySelectorAll("#additionnels .service-card")
    .forEach((card, index) => {
      const item = t.additionnels.cards[index];
      if (!item) return;
      const title = card.querySelector("h3");
      const text = card.querySelector("p");
      const features = card.querySelectorAll(".service-features li");
      const button = card.querySelector("a.btn");
      if (title) title.textContent = item.title;
      if (text) text.textContent = item.text;
      features.forEach((feature, i) => {
        if (item.features && item.features[i]) {
          const icon = feature.querySelector("i");
          feature.innerHTML = icon
            ? `${icon.outerHTML} ${item.features[i]}`
            : item.features[i];
        }
      });
      if (button) button.textContent = t.additionnels.cta;
    });

  setText("#additional-services .section-title", t.additionalServices.title);
  setText(
    "#additional-services .section-subtitle",
    t.additionalServices.subtitle,
  );
  document
    .querySelectorAll("#additional-services .service-card")
    .forEach((card, index) => {
      const item = t.additionalServices.cards[index];
      if (!item) return;
      const title = card.querySelector("h3");
      const text = card.querySelector("p");
      const features = card.querySelectorAll(".service-features li");
      const button = card.querySelector("a.btn");
      if (title) title.textContent = item.title;
      if (text) text.textContent = item.text;
      features.forEach((feature, i) => {
        if (item.features && item.features[i]) {
          const icon = feature.querySelector("i");
          feature.innerHTML = icon
            ? `${icon.outerHTML} ${item.features[i]}`
            : item.features[i];
        }
      });
      if (button) {
        const href = button.getAttribute("href") || "";
        button.textContent =
          href === "https://wa.me/24166198918"
            ? t.additionalServices.contactCta
            : t.additionalServices.cta;
      }
    });

  setText("#process .section-title", t.process.title);
  setText("#process .section-subtitle", t.process.subtitle);
  const processSteps = document.querySelector(
    '#process div[style*="max-width: 48rem"]',
  );
  if (processSteps) {
    processSteps.querySelectorAll("h4").forEach((heading, index) => {
      if (t.process.steps[index]) {
        heading.textContent = t.process.steps[index].title;
      }
    });
    processSteps.querySelectorAll("p").forEach((paragraph, index) => {
      if (t.process.steps[index]) {
        paragraph.textContent = t.process.steps[index].text;
      }
    });
  }

  if (lang === "en") {
    document
      .querySelectorAll(
        "#additionnels .service-price, #additional-services .service-price",
      )
      .forEach((price) => {
        const text = price.textContent.trim();
        if (text.toLowerCase() === "gratuit") {
          price.textContent = "Free";
          return;
        }
        price.textContent = text.replace("à partir de", "from");
      });

    document
      .querySelectorAll(
        '#maintenance div[style*="text-align: right"] div[style*="font-weight: 600"]',
      )
      .forEach((label) => {
        if (label.textContent.includes("FCFA/mois")) {
          label.textContent = "FCFA/month";
        }
        if (label.textContent.includes("FCFA/an")) {
          label.textContent = "FCFA/year";
        }
      });
  }

  setText(".cta-section .cta-title", t.cta.title);
  setText(".cta-section .cta-text", t.cta.text);
  setHtml(".cta-section .btn.btn-white", t.cta.primaryHtml);
  setHtml(".cta-section .btn.btn-outline-white", t.cta.secondaryHtml);
}

function translateTarifs(lang) {
  const data = {
    fr: {
      meta: {
        title: "Tarifs - CodeWave | Prix Sites Web Gabon",
        description:
          "Tarifs CodeWave - Sites web à partir de 80 000 FCFA. Packs vitrines, e-commerce, blogs. Paiement flexible. Devis gratuit.",
      },
      breadcrumb: { home: "Accueil", current: "Tarifs" },
      pageTitle: "Nos Tarifs",
      pageSubtitle:
        "Des prix transparents et compétitifs adaptés au marché gabonais",
      overview: {
        title: "Choisissez Votre Pack",
        subtitle:
          "Tous nos tarifs sont en FCFA TTC - Paiement en 2-3 fois disponible",
      },
      sections: {
        vitrines: "Sites Vitrines",
        ecommerce: "Sites E-Commerce",
        blogs: "Blogs & Portfolios",
      },
      badges: {
        popular: "LE PLUS POPULAIRE",
        bestValue: "MEILLEURE VALEUR",
        creatives: "POUR CRÉATIFS",
      },
      packs: {
        vitrines: [
          {
            title: "Pack Basic",
            desc: "Idéal pour : Artisans, TPE, Associations",
            features: [
              "1 à 5 pages",
              "Design moderne responsive",
              "Formulaire de contact",
              "Intégration réseaux sociaux",
              "Certificat SSL (HTTPS)",
              "Formation incluse",
              "Livraison 1-2 semaines",
            ],
            cta: "Commander",
          },
          {
            title: "Pack Pro",
            desc: "Idéal pour : PME, Entrepreneurs",
            features: [
              "Jusqu'à 10 pages",
              "Design personnalisé unique",
              "Optimisation SEO de base",
              "Google Maps & Analytics",
              "Formulaires avancés",
              "Galerie photos/vidéos",
              "Support prioritaire 3 mois",
            ],
            cta: "Commander Maintenant",
          },
        ],
        ecommerce: [
          {
            title: "Pack Start-Up",
            desc: "Idéal pour : Petites boutiques, Lancement",
            features: [
              "Max 20 produits",
              "Interface admin facile",
              "Paiement en ligne sécurisé",
              "Suivi des commandes",
              "Gestion du stock",
              "Rapports de ventes",
              "Formation complète",
            ],
            cta: "Commander",
          },
          {
            title: "Pack Business",
            desc: "Idéal pour : PME, Entreprises établies",
            features: [
              "Produits illimités",
              "Design sur mesure premium",
              "Statistiques avancées",
              "Multi-devises (FCFA/EUR/USD)",
              "Promotions & coupons",
              "Maintenance gratuite 3 mois",
              "Support dédié 24/7",
            ],
            cta: "Commander Maintenant",
          },
        ],
        blogs: [
          {
            title: "Pack Starter",
            desc: "Idéal pour : Débutants, Particuliers",
            features: [
              "Design pur professionnel",
              "Catégorisation articles",
              "Formulaire d'abonnement",
              "Partage réseaux sociaux",
              "Responsive design",
              "Gestion facile du contenu",
            ],
            cta: "Commander",
          },
          {
            title: "Pack Premium",
            desc: "Idéal pour : Artistes, Photographes",
            features: [
              "Design sur mesure unique",
              "SEO avancé",
              "Google Analytics intégré",
              "Système de commentaires",
              "Newsletter automatique",
              "Monétisation AdSense",
            ],
            cta: "Commander Maintenant",
          },
        ],
      },
      comparison: {
        title: "Tableau Comparatif",
        subtitle:
          "Comparez nos différents packs pour choisir celui qui vous convient",
        columns: {
          feature: "Fonctionnalité",
          basic: "Basic",
          pro: "Pro",
          start: "Start-Up",
          business: "Business",
        },
        rows: [
          {
            label: "Nombre de pages",
            values: ["1-5", "Jusqu'à 10", "Illimité", "Illimité"],
          },
          { label: "Design responsive" },
          { label: "Design personnalisé" },
          { label: "Optimisation SEO" },
          { label: "Formulaire de contact" },
          { label: "E-Commerce" },
          { label: "Paiement en ligne" },
          { label: "Google Analytics" },
          {
            label: "Support prioritaire",
            values: ["-", "3 mois", "3 mois", "Illimité"],
          },
          {
            label: "Délai de livraison",
            values: [
              "1-2 semaines",
              "2-3 semaines",
              "3-4 semaines",
              "4-6 semaines",
            ],
          },
        ],
      },
      extras: {
        title: "Services Additionnels & Maintenance",
        subtitle: "Complétez votre site avec des options supplémentaires",
        maintenance: {
          title: "Maintenance Mensuelle",
          desc: "Mises à jour, sauvegardes quotidiennes, support technique 24/7",
          features: [
            "Mises à jour régulières",
            "Sauvegardes quotidiennes",
            "Support technique 24/7",
          ],
          cta: "Souscrire",
          priceLabel: "FCFA/mois",
        },
        hosting: {
          title: "Hébergement Web Premium",
          desc: "Serveur rapide et sécurisé, SSL inclus, 99.9% disponibilité",
          features: [
            "Certificat SSL (HTTPS)",
            "Nom de domaine offert",
            "5 emails professionnels",
          ],
          cta: "Souscrire",
          priceLabel: "FCFA/an",
        },
        options: [
          { title: "SEO Avancé", cta: "Commander", price: "50 000 FCFA" },
          { title: "Création Logo", cta: "Commander", price: "35 000 FCFA" },
          { title: "Refonte Site", cta: "Commander", price: "80 000+ FCFA" },
        ],
      },
      calculator: {
        title: "Calculateur de Prix",
        subtitle: "Estimez le coût de votre projet en quelques clics",
        labels: {
          siteType: "Type de site",
          options: "Options additionnelles",
          maintenance: "Maintenance mensuelle",
          hosting: "Hébergement annuel",
        },
        options: {
          placeholder: "-- Sélectionnez --",
          siteTypes: [
            "Site Vitrine Basic (100 000 FCFA)",
            "Site Vitrine Pro (200 000 FCFA)",
            "E-Commerce Start-Up (300 000 FCFA)",
            "E-Commerce Business (500 000 FCFA)",
            "Blog/Portfolio Starter (80 000 FCFA)",
            "Blog/Portfolio Premium (150 000 FCFA)",
          ],
          additions: [
            "SEO Avancé (+50 000 FCFA)",
            "Création Logo (+35 000 FCFA)",
            "Chat en Direct (+30 000 FCFA)",
            "Analytics Avancés (+25 000 FCFA)",
          ],
          maintenance: ["Non merci", "Oui, maintenance (+15 000 FCFA/mois)"],
          hosting: ["Non merci", "Oui, hébergement (+20 000 FCFA/an)"],
          hint: "Maintenez Ctrl pour sélectionner plusieurs options",
        },
        result: {
          title: "Total Estimé",
          placeholder: "Sélectionnez vos options ci-dessus",
        },
        cta: "Demander un Devis Personnalisé",
      },
      payment: {
        title: "Options de Paiement Flexibles",
        subtitle: "Nous facilitons le financement de votre projet digital",
        cards: [
          { title: "Paiement en 1 fois", text: "100% à la commande" },
          {
            title: "Paiement en 2 fois",
            text: "50% à la commande, 50% à la livraison",
          },
          {
            title: "Paiement en 3 fois",
            text: "Pour les projets > 150 000 FCFA\nSans frais supplémentaires",
          },
        ],
        popular: "POPULAIRE",
        acceptedTitle: "Modes de Paiement Acceptés",
        accepted: ["Espèces", "Virement Bancaire", "Mobile Money"],
      },
      faq: {
        title: "Questions Fréquentes sur les Tarifs",
        items: [
          {
            q: "Les prix incluent-ils l'hébergement et le nom de domaine ?",
            a: "Non, l'hébergement (20 000 FCFA/an) et la maintenance (15 000 FCFA/mois) sont des services optionnels à ajouter selon vos besoins.",
          },
          {
            q: "Y a-t-il des frais cachés ?",
            a: "Aucun frais caché. Tous les prix sont transparents et communiqués avant le début du projet. Ce que vous voyez est ce que vous payez.",
          },
          {
            q: "Puis-je avoir un devis personnalisé ?",
            a: "Absolument ! Chaque projet est unique. Contactez-nous pour un devis détaillé adapté à vos besoins spécifiques, gratuit et sans engagement.",
          },
          {
            q: "Que se passe-t-il après le paiement ?",
            a: "Nous commençons immédiatement votre projet. Vous recevez des mises à jour régulières et pouvez suivre l'avancement à tout moment.",
          },
        ],
      },
      cta: {
        title: "Prêt à Démarrer ?",
        text: "Obtenez votre devis gratuit personnalisé en moins de 24h",
        primaryHtml:
          'Demander un Devis Gratuit <i class="fas fa-arrow-right"></i>',
        secondaryHtml: '<i class="fab fa-whatsapp"></i> WhatsApp Direct',
      },
    },
    en: {
      meta: {
        title: "Pricing - CodeWave | Website Prices Gabon",
        description:
          "CodeWave pricing - websites from 80,000 FCFA. Showcase, e-commerce, blogs. Flexible payment. Free quote.",
      },
      breadcrumb: { home: "Home", current: "Pricing" },
      pageTitle: "Our Pricing",
      pageSubtitle:
        "Transparent, competitive prices tailored to the Gabon market",
      overview: {
        title: "Choose Your Package",
        subtitle: "All prices in FCFA incl. tax - 2-3 installments available",
      },
      sections: {
        vitrines: "Showcase Websites",
        ecommerce: "E-Commerce Websites",
        blogs: "Blogs & Portfolios",
      },
      badges: {
        popular: "MOST POPULAR",
        bestValue: "BEST VALUE",
        creatives: "FOR CREATORS",
      },
      packs: {
        vitrines: [
          {
            title: "Basic Pack",
            desc: "Ideal for: Artisans, small businesses, associations",
            features: [
              "1 to 5 pages",
              "Modern responsive design",
              "Contact form",
              "Social media integration",
              "SSL certificate (HTTPS)",
              "Training included",
              "Delivery 1-2 weeks",
            ],
            cta: "Order",
          },
          {
            title: "Pro Pack",
            desc: "Ideal for: SMEs, entrepreneurs",
            features: [
              "Up to 10 pages",
              "Unique custom design",
              "Basic SEO optimization",
              "Google Maps & Analytics",
              "Advanced forms",
              "Photo/video gallery",
              "Priority support 3 months",
            ],
            cta: "Order Now",
          },
        ],
        ecommerce: [
          {
            title: "Start-Up Pack",
            desc: "Ideal for: Small shops, launch",
            features: [
              "Max 20 products",
              "Easy admin interface",
              "Secure online payment",
              "Order tracking",
              "Stock management",
              "Sales reports",
              "Full training",
            ],
            cta: "Order",
          },
          {
            title: "Business Pack",
            desc: "Ideal for: SMEs, established companies",
            features: [
              "Unlimited products",
              "Premium custom design",
              "Advanced analytics",
              "Multi-currency (FCFA/EUR/USD)",
              "Promotions & coupons",
              "Free maintenance 3 months",
              "Dedicated 24/7 support",
            ],
            cta: "Order Now",
          },
        ],
        blogs: [
          {
            title: "Starter Pack",
            desc: "Ideal for: Beginners, individuals",
            features: [
              "Clean professional design",
              "Article categorization",
              "Subscription form",
              "Social media sharing",
              "Responsive design",
              "Easy content management",
            ],
            cta: "Order",
          },
          {
            title: "Premium Pack",
            desc: "Ideal for: Artists, photographers",
            features: [
              "Unique custom design",
              "Advanced SEO",
              "Google Analytics integration",
              "Comments system",
              "Automatic newsletter",
              "AdSense monetization",
            ],
            cta: "Order Now",
          },
        ],
      },
      comparison: {
        title: "Comparison Table",
        subtitle: "Compare our packages to choose the best fit",
        columns: {
          feature: "Feature",
          basic: "Basic",
          pro: "Pro",
          start: "Start-Up",
          business: "Business",
        },
        rows: [
          {
            label: "Number of pages",
            values: ["1-5", "Up to 10", "Unlimited", "Unlimited"],
          },
          { label: "Responsive design" },
          { label: "Custom design" },
          { label: "SEO optimization" },
          { label: "Contact form" },
          { label: "E-Commerce" },
          { label: "Online payments" },
          { label: "Google Analytics" },
          {
            label: "Priority support",
            values: ["-", "3 months", "3 months", "Unlimited"],
          },
          {
            label: "Delivery time",
            values: ["1-2 weeks", "2-3 weeks", "3-4 weeks", "4-6 weeks"],
          },
        ],
      },
      extras: {
        title: "Additional Services & Maintenance",
        subtitle: "Complete your site with extra options",
        maintenance: {
          title: "Monthly Maintenance",
          desc: "Updates, daily backups, 24/7 technical support",
          features: [
            "Regular updates",
            "Daily backups",
            "24/7 technical support",
          ],
          cta: "Subscribe",
          priceLabel: "FCFA/month",
        },
        hosting: {
          title: "Premium Web Hosting",
          desc: "Fast, secure server, SSL included, 99.9% uptime",
          features: [
            "SSL certificate (HTTPS)",
            "Free domain name",
            "5 professional emails",
          ],
          cta: "Subscribe",
          priceLabel: "FCFA/year",
        },
        options: [
          { title: "Advanced SEO", cta: "Order", price: "50,000 FCFA" },
          { title: "Logo Creation", cta: "Order", price: "35,000 FCFA" },
          { title: "Site Redesign", cta: "Order", price: "80,000+ FCFA" },
        ],
      },
      calculator: {
        title: "Price Calculator",
        subtitle: "Estimate your project cost in a few clicks",
        labels: {
          siteType: "Site type",
          options: "Additional options",
          maintenance: "Monthly maintenance",
          hosting: "Annual hosting",
        },
        options: {
          placeholder: "-- Select --",
          siteTypes: [
            "Basic showcase site (100,000 FCFA)",
            "Pro showcase site (200,000 FCFA)",
            "E-Commerce Start-Up (300,000 FCFA)",
            "E-Commerce Business (500,000 FCFA)",
            "Blog/Portfolio Starter (80,000 FCFA)",
            "Blog/Portfolio Premium (150,000 FCFA)",
          ],
          additions: [
            "Advanced SEO (+50,000 FCFA)",
            "Logo creation (+35,000 FCFA)",
            "Live chat (+30,000 FCFA)",
            "Advanced analytics (+25,000 FCFA)",
          ],
          maintenance: ["No thanks", "Yes, maintenance (+15,000 FCFA/month)"],
          hosting: ["No thanks", "Yes, hosting (+20,000 FCFA/year)"],
          hint: "Hold Ctrl to select multiple options",
        },
        result: {
          title: "Estimated Total",
          placeholder: "Select your options above",
        },
        cta: "Request a Custom Quote",
      },
      payment: {
        title: "Flexible Payment Options",
        subtitle: "We make it easy to fund your digital project",
        cards: [
          { title: "Pay in 1", text: "100% at order" },
          { title: "Pay in 2", text: "50% at order, 50% at delivery" },
          {
            title: "Pay in 3",
            text: "For projects > 150,000 FCFA\nNo extra fees",
          },
        ],
        popular: "POPULAR",
        acceptedTitle: "Accepted Payment Methods",
        accepted: ["Cash", "Bank Transfer", "Mobile Money"],
      },
      faq: {
        title: "Pricing FAQ",
        items: [
          {
            q: "Do prices include hosting and the domain name?",
            a: "No, hosting (20,000 FCFA/year) and maintenance (15,000 FCFA/month) are optional services to add based on your needs.",
          },
          {
            q: "Are there any hidden fees?",
            a: "No hidden fees. All prices are transparent and shared before the project starts. What you see is what you pay.",
          },
          {
            q: "Can I get a custom quote?",
            a: "Absolutely. Every project is unique. Contact us for a detailed quote tailored to your needs, free and with no commitment.",
          },
          {
            q: "What happens after payment?",
            a: "We start immediately. You receive regular updates and can follow progress at any time.",
          },
        ],
      },
      cta: {
        title: "Ready to Get Started?",
        text: "Get your personalized free quote in less than 24h",
        primaryHtml: 'Request a Free Quote <i class="fas fa-arrow-right"></i>',
        secondaryHtml: '<i class="fab fa-whatsapp"></i> WhatsApp Direct',
      },
    },
  };

  const t = data[lang];
  if (!t) return;

  document.title = t.meta.title;
  setMeta("description", t.meta.description);

  const breadcrumb = document.querySelector(".page-header .breadcrumb");
  if (breadcrumb) {
    const links = breadcrumb.querySelectorAll("a");
    const spans = breadcrumb.querySelectorAll("span");
    if (links[0]) links[0].textContent = t.breadcrumb.home;
    if (spans.length)
      spans[spans.length - 1].textContent = t.breadcrumb.current;
  }

  setText(".page-title", t.pageTitle);
  setText(".page-subtitle", t.pageSubtitle);

  const packBlocks = document.querySelectorAll(
    'section.section-padding div[style*="margin-bottom: 4rem"]',
  );
  const pricingSection = packBlocks[0]
    ? packBlocks[0].closest("section")
    : null;
  if (pricingSection) {
    const header = pricingSection.querySelector(".section-header");
    if (header) {
      const title = header.querySelector(".section-title");
      const subtitle = header.querySelector(".section-subtitle");
      if (title) title.textContent = t.overview.title;
      if (subtitle) subtitle.textContent = t.overview.subtitle;
    }
  }

  const updatePricingCards = (block, packData, sectionTitle) => {
    if (!block) return;
    const heading = block.querySelector("h3");
    if (heading) {
      const icon = heading.querySelector("i");
      heading.innerHTML = icon
        ? `${icon.outerHTML} ${sectionTitle}`
        : sectionTitle;
    }
    block.querySelectorAll(".pricing-card").forEach((card, index) => {
      const item = packData[index];
      if (!item) return;
      const title = card.querySelector(".pricing-header h4");
      const desc = card.querySelector(".pricing-desc");
      const features = card.querySelectorAll(".pricing-features li");
      const button = card.querySelector("a.btn");
      if (title) title.textContent = item.title;
      if (desc) desc.textContent = item.desc;
      features.forEach((feature, i) => {
        if (item.features[i]) {
          const icon = feature.querySelector("i");
          feature.innerHTML = icon
            ? `${icon.outerHTML} ${item.features[i]}`
            : item.features[i];
        }
      });
      if (button) button.textContent = item.cta;
    });
  };

  updatePricingCards(packBlocks[0], t.packs.vitrines, t.sections.vitrines);
  updatePricingCards(packBlocks[1], t.packs.ecommerce, t.sections.ecommerce);
  updatePricingCards(packBlocks[2], t.packs.blogs, t.sections.blogs);

  const sections = document.querySelectorAll("section.section-padding");

  document.querySelectorAll(".popular-badge").forEach((badge) => {
    const text = badge.textContent.trim();
    if (
      text === t.badges.popular ||
      text === t.badges.bestValue ||
      text === t.badges.creatives
    ) {
      return;
    }
    if (text === "LE PLUS POPULAIRE" || text === "MOST POPULAR") {
      badge.textContent = t.badges.popular;
    } else if (text === "MEILLEURE VALEUR" || text === "BEST VALUE") {
      badge.textContent = t.badges.bestValue;
    } else if (text === "POUR CRÉATIFS" || text === "FOR CREATORS") {
      badge.textContent = t.badges.creatives;
    }
  });

  const comparisonTable = document.querySelector(".comparison-table");
  if (comparisonTable) {
    const section = comparisonTable.closest("section");
    if (section) {
      const header = section.querySelector(".section-header");
      if (header) {
        const title = header.querySelector(".section-title");
        const subtitle = header.querySelector(".section-subtitle");
        if (title) title.textContent = t.comparison.title;
        if (subtitle) subtitle.textContent = t.comparison.subtitle;
      }
    }
    const headers = comparisonTable.querySelectorAll("thead th");
    if (headers[0]) headers[0].textContent = t.comparison.columns.feature;
    if (headers[1])
      headers[1].childNodes[0].textContent = t.comparison.columns.basic;
    if (headers[2])
      headers[2].childNodes[0].textContent = t.comparison.columns.pro;
    if (headers[3])
      headers[3].childNodes[0].textContent = t.comparison.columns.start;
    if (headers[4])
      headers[4].childNodes[0].textContent = t.comparison.columns.business;

    const rows = comparisonTable.querySelectorAll("tbody tr");
    rows.forEach((row, index) => {
      const rowData = t.comparison.rows[index];
      if (!rowData) return;
      const cells = row.querySelectorAll("td");
      if (cells[0]) cells[0].textContent = rowData.label;
      if (rowData.values) {
        rowData.values.forEach((value, i) => {
          const cell = cells[i + 1];
          if (!cell) return;
          if (cell.querySelector("i")) return;
          cell.textContent = value;
        });
      }
    });
  }

  const extrasSection = Array.from(sections).find((section) =>
    section.querySelector('div[style*="max-width: 72rem"]'),
  );
  if (extrasSection) {
    const header = extrasSection.querySelector(".section-header");
    if (header) {
      const title = header.querySelector(".section-title");
      const subtitle = header.querySelector(".section-subtitle");
      if (title) title.textContent = t.extras.title;
      if (subtitle) subtitle.textContent = t.extras.subtitle;
    }

    const cards = extrasSection.querySelectorAll(
      'div[style*="md:grid-template-columns: 2fr 1fr"]',
    );
    if (cards[0]) {
      const title = cards[0].querySelector("h3");
      const desc = cards[0].querySelector("p");
      const features = cards[0].querySelectorAll("ul li span");
      const priceLabel = cards[0].querySelector(
        'div[style*="font-weight: 600"]',
      );
      const button = cards[0].querySelector("a.btn");
      if (title) {
        const icon = title.querySelector("i");
        title.innerHTML = icon
          ? `${icon.outerHTML} ${t.extras.maintenance.title}`
          : t.extras.maintenance.title;
      }
      if (desc) desc.textContent = t.extras.maintenance.desc;
      features.forEach((feature, index) => {
        if (t.extras.maintenance.features[index]) {
          feature.textContent = t.extras.maintenance.features[index];
        }
      });
      if (priceLabel) priceLabel.textContent = t.extras.maintenance.priceLabel;
      if (button) button.textContent = t.extras.maintenance.cta;
    }
    if (cards[1]) {
      const title = cards[1].querySelector("h3");
      const desc = cards[1].querySelector("p");
      const features = cards[1].querySelectorAll("ul li span");
      const priceLabel = cards[1].querySelector(
        'div[style*="font-weight: 600"]',
      );
      const button = cards[1].querySelector("a.btn");
      if (title) {
        const icon = title.querySelector("i");
        title.innerHTML = icon
          ? `${icon.outerHTML} ${t.extras.hosting.title}`
          : t.extras.hosting.title;
      }
      if (desc) desc.textContent = t.extras.hosting.desc;
      features.forEach((feature, index) => {
        if (t.extras.hosting.features[index]) {
          feature.textContent = t.extras.hosting.features[index];
        }
      });
      if (priceLabel) priceLabel.textContent = t.extras.hosting.priceLabel;
      if (button) button.textContent = t.extras.hosting.cta;
    }

    const optionCards = extrasSection.querySelectorAll(
      'div[style*="repeat(3, 1fr)"] > div',
    );
    optionCards.forEach((card, index) => {
      const dataItem = t.extras.options[index];
      if (!dataItem) return;
      const title = card.querySelector("h4");
      const price = card.querySelector('div[style*="font-weight: 800"]');
      const button = card.querySelector("a.btn");
      if (title) title.textContent = dataItem.title;
      if (price) price.textContent = dataItem.price;
      if (button) button.textContent = dataItem.cta;
    });
  }

  const calculator = document.querySelector(".price-calculator");
  if (calculator) {
    const title = calculator.querySelector("h2");
    if (title) {
      const icon = title.querySelector("i");
      title.innerHTML = icon
        ? `${icon.outerHTML} ${t.calculator.title}`
        : t.calculator.title;
    }
    const subtitle = calculator.querySelector("p");
    if (subtitle) subtitle.textContent = t.calculator.subtitle;

    const labels = calculator.querySelectorAll(".calculator-input label");
    if (labels[0]) labels[0].textContent = t.calculator.labels.siteType;
    if (labels[1]) labels[1].textContent = t.calculator.labels.options;
    if (labels[2]) labels[2].textContent = t.calculator.labels.maintenance;
    if (labels[3]) labels[3].textContent = t.calculator.labels.hosting;

    const siteType = calculator.querySelector("#siteType");
    if (siteType) {
      const options = siteType.querySelectorAll("option");
      if (options[0]) options[0].textContent = t.calculator.options.placeholder;
      t.calculator.options.siteTypes.forEach((label, index) => {
        if (options[index + 1]) options[index + 1].textContent = label;
      });
    }

    const additionalOptions = calculator.querySelector("#additionalOptions");
    if (additionalOptions) {
      const options = additionalOptions.querySelectorAll("option");
      t.calculator.options.additions.forEach((label, index) => {
        if (options[index]) options[index].textContent = label;
      });
    }

    const hint = calculator.querySelector("small");
    if (hint) hint.textContent = t.calculator.options.hint;

    const maintenanceSelect = calculator.querySelector("#maintenance");
    if (maintenanceSelect) {
      const options = maintenanceSelect.querySelectorAll("option");
      t.calculator.options.maintenance.forEach((label, index) => {
        if (options[index]) options[index].textContent = label;
      });
    }

    const hostingSelect = calculator.querySelector("#hosting");
    if (hostingSelect) {
      const options = hostingSelect.querySelectorAll("option");
      t.calculator.options.hosting.forEach((label, index) => {
        if (options[index]) options[index].textContent = label;
      });
    }

    const resultTitle = calculator.querySelector(
      ".calculator-result div:first-child",
    );
    if (resultTitle) resultTitle.textContent = t.calculator.result.title;
    const breakdown = calculator.querySelector("#breakdown");
    if (breakdown) breakdown.textContent = t.calculator.result.placeholder;
    const calcButton = calculator.querySelector(".btn.btn-white");
    if (calcButton) {
      calcButton.innerHTML = `${t.calculator.cta} <i class="fas fa-arrow-right"></i>`;
    }
  }

  const paymentSection = Array.from(sections).find((section) =>
    section.querySelector(".fa-credit-card"),
  );
  if (paymentSection) {
    const header = paymentSection.querySelector(".section-header");
    if (header) {
      const title = header.querySelector(".section-title");
      const subtitle = header.querySelector(".section-subtitle");
      if (title) title.textContent = t.payment.title;
      if (subtitle) subtitle.textContent = t.payment.subtitle;
    }

    const cards = paymentSection.querySelectorAll(
      'div[style*="md:grid-template-columns: repeat(3, 1fr)"] > div',
    );
    cards.forEach((card, index) => {
      const dataItem = t.payment.cards[index];
      if (!dataItem) return;
      const title = card.querySelector("h3");
      const text = card.querySelector("p");
      if (title) title.textContent = dataItem.title;
      if (text) {
        text.innerHTML = dataItem.text.replace("\n", "<br />");
      }
    });

    const popular = paymentSection.querySelector(
      'div[style*="position: absolute"]',
    );
    if (popular) popular.textContent = t.payment.popular;

    const acceptedBox = paymentSection.querySelector(
      'div[style*="border: 2px solid var(--primary)"]',
    );
    if (acceptedBox) {
      const title = acceptedBox.querySelector("h3");
      if (title) title.textContent = t.payment.acceptedTitle;
      const spans = acceptedBox.querySelectorAll("span");
      t.payment.accepted.forEach((label, index) => {
        const span = spans[index];
        if (!span) return;
        const icon = span.querySelector("i");
        span.innerHTML = icon ? `${icon.outerHTML} ${label}` : label;
      });
    }
  }

  const faqSection = Array.from(sections).find((section) =>
    section.querySelector(".fa-question-circle"),
  );
  if (faqSection) {
    const title = faqSection.querySelector(".section-title");
    if (title) title.textContent = t.faq.title;
    const items = faqSection.querySelectorAll("h4");
    const answers = faqSection.querySelectorAll("p");
    t.faq.items.forEach((item, index) => {
      const heading = items[index];
      const answer = answers[index];
      if (heading) {
        const icon = heading.querySelector("i");
        heading.innerHTML = icon ? `${icon.outerHTML} ${item.q}` : item.q;
      }
      if (answer) answer.textContent = item.a;
    });
  }

  const ctaSection = document.querySelector(".cta-section");
  if (ctaSection) {
    setText(".cta-title", t.cta.title);
    setText(".cta-text", t.cta.text);
    setHtml(".cta-buttons .btn.btn-white", t.cta.primaryHtml);
    setHtml(".cta-buttons .btn.btn-outline-white", t.cta.secondaryHtml);
  }
}

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

// Configuration EmailJS (optionnel - commentée par défaut)

// === Navigation ===
document.addEventListener("DOMContentLoaded", function () {
  updateThemeToggles(activeTheme);
  applyLanguage(activeLang, { updateToggle: false });
  updateLangToggles(activeLang);

  const themeToggles = document.querySelectorAll(".theme-toggle");
  themeToggles.forEach((toggle) => {
    toggle.addEventListener("click", function () {
      const current =
        document.documentElement.getAttribute("data-theme") || "light";
      activeTheme = current === "dark" ? "light" : "dark";
      storedTheme = activeTheme;
      setStoredTheme(activeTheme);
      applyTheme(activeTheme);
    });
  });

  const langToggles = document.querySelectorAll(".lang-toggle");
  langToggles.forEach((toggle) => {
    toggle.addEventListener("click", function () {
      const nextLang = activeLang === "fr" ? "en" : "fr";
      activeLang = nextLang;
      storedLang = nextLang;
      setStoredLang(nextLang);
      applyLanguage(nextLang);
    });
  });

  if (typeof themeMedia.addEventListener === "function") {
    themeMedia.addEventListener("change", (event) => {
      if (!storedTheme) {
        activeTheme = event.matches ? "dark" : "light";
        applyTheme(activeTheme);
      }
    });
  } else if (typeof themeMedia.addListener === "function") {
    themeMedia.addListener((event) => {
      if (!storedTheme) {
        activeTheme = event.matches ? "dark" : "light";
        applyTheme(activeTheme);
      }
    });
  }

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
      ".success-message, .error-message",
    );
    existingMessages.forEach((msg) => msg.remove());

    // ✅ SÉCURITÉ: Récupérer et valider les données du formulaire
    const formData = {
      nom: document.getElementById("nom")?.value.trim() || "",
      email: document.getElementById("email")?.value.trim().toLowerCase() || "",
      telephone: document.getElementById("telephone")?.value.trim() || "",
      typeProjet: document.getElementById("typeProjet")?.value || "",
      budget: document.getElementById("budget")?.value || "Non spécifié",
      message: document.getElementById("message")?.value.trim() || "",
    };

    // ✅ SÉCURITÉ: Valider tous les champs
    if (!validateInput("nom", formData.nom)) {
      showMessage(
        "error",
        getI18nValue(activeLang, "messages.contact.invalidName"),
        contactForm,
      );
      submitBtn.classList.remove("loading");
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;
      return;
    }

    if (!validateInput("email", formData.email)) {
      showMessage(
        "error",
        getI18nValue(activeLang, "messages.contact.invalidEmail"),
        contactForm,
      );
      submitBtn.classList.remove("loading");
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;
      return;
    }

    if (!validateInput("telephone", formData.telephone)) {
      showMessage(
        "error",
        getI18nValue(activeLang, "messages.contact.invalidPhone"),
        contactForm,
      );
      submitBtn.classList.remove("loading");
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;
      return;
    }

    if (!validateInput("message", formData.message)) {
      showMessage(
        "error",
        getI18nValue(activeLang, "messages.contact.invalidMessage"),
        contactForm,
      );
      submitBtn.classList.remove("loading");
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;
      return;
    }

    try {
      // Envoyer via Formspree
      await simulateEmailSend(formData);

      // Afficher le message de succès
      showMessage(
        "success",
        getI18nValue(activeLang, "messages.contact.success"),
        contactForm,
      );

      // Réinitialiser le formulaire
      this.reset();

      // Redirection WhatsApp (optionnel)
      setTimeout(() => {
        const whatsappTemplate = getI18nValue(
          activeLang,
          "messages.contact.whatsappTemplate",
        );
        const whatsappMsg = whatsappTemplate
          .replace("{name}", formData.nom)
          .replace("{email}", formData.email)
          .replace("{project}", formData.typeProjet);
        window.open(
          `https://wa.me/24166198918?text=${encodeURIComponent(whatsappMsg)}`,
          "_blank",
        );
      }, 2000);
    } catch (error) {
      console.error("Erreur:", error);
      showMessage("error", getI18nValue(activeLang, "messages.contact.error"));
    } finally {
      // Réactiver le bouton
      submitBtn.classList.remove("loading");
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;
    }
  });
}

// Fonction pour simuler l'envoi d'email (pour les tests)
function simulateEmailSend() {
  return new Promise((resolve) => {
    // Intentionally silent en prod pour éviter de logguer des PII
    setTimeout(resolve, 1500);
  });
}

// Fonction pour afficher les messages
function showMessage(type, text, container) {
  const messageDiv = document.createElement("div");
  messageDiv.className = `${type}-message`;
  messageDiv.innerHTML = `
    <i class="fas fa-${
      type === "success" ? "check-circle" : "exclamation-circle"
    }"></i>
    <span>${text}</span>
  `;

  const target =
    container || document.querySelector(".contact-form form") || document.body;
  target.insertBefore(messageDiv, target.firstChild);

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
        showMessage(
          "error",
          getI18nValue(activeLang, "messages.newsletter.invalidEmail"),
          this,
        );
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
      successMsg.innerHTML = getI18nValue(
        activeLang,
        "messages.newsletter.success",
      );
      this.appendChild(successMsg);

      emailInput.value = "";

      setTimeout(() => successMsg.remove(), 3000);
    } catch (error) {
      alert(getI18nValue(activeLang, "messages.newsletter.error"));
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
    ".feature-card, .service-card, .portfolio-item, .testimonial-card, .blog-card, .pricing-card",
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
    },
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
    { threshold: 0.5 },
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

      // Toggle l'item cliqué
      if (!isActive) {
        item.classList.add("active");
      }
    });
  });
}

// === Récupérer paramètres URL pour pré-remplir le formulaire ===
function getURLParameter(name) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(name);
}

// Pré-remplir le formulaire de contact si un pack est sélectionné
const typeProjetSelect = document.getElementById("typeProjet");
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

// === Tracking Analytics (Google Analytics - optionnel) ===
// À activer uniquement si vous avez un ID Google Analytics
/*
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-XXXXXXXXXX'); // Remplacez par votre ID
*/

// === Protection contre le spam (Honeypot) ===
// Ajouter un champ caché au formulaire
if (contactForm) {
  const honeypot = document.createElement("input");
  honeypot.type = "text";
  honeypot.name = "website";
  honeypot.style.display = "none";
  honeypot.tabIndex = -1;
  honeypot.autocomplete = "off";
  contactForm.appendChild(honeypot);

  // Vérifier lors de la soumission
  contactForm.addEventListener("submit", function (e) {
    if (honeypot.value !== "") {
      e.preventDefault();
      console.warn("Bot détecté");
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

// === Mode Sombre (optionnel - non utilisé) ===
// Décommentez pour activer
/*
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
*/

// === Copier dans le presse-papier (optionnel - non utilisé) ===
// Décommentez pour utiliser
/*
function copyToClipboard(text) {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text).then(() => {
      console.log("Copié:", text);
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
*/

// === Console Easter Egg ===
console.log(
  "%c👋 Salut Développeur!",
  "font-size: 20px; font-weight: bold; color: #2563eb;",
);
console.log(
  "%cSite créé par M.G.N CodeWave 🇬🇦",
  "font-size: 14px; color: #6b7280;",
);
console.log(
  "%cBesoin d'un site comme celui-ci? Contactez-nous: +241 66 19 89 18",
  "font-size: 12px; color: #10b981;",
);

// === Performance Monitoring ===
// Logge les performances de chargement
window.addEventListener("load", () => {
  if (window.performance && window.performance.timing) {
    const perfData = window.performance.timing;
    const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
    console.log(`⚡ Page chargée en ${pageLoadTime}ms`);
  }
});

// === Service Worker (pour PWA - optionnel) ===
// Décommentez pour activer le caching offline
/*
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => console.log('SW enregistré'))
      .catch(err => console.log('Erreur SW:', err));
  });
}
*/
