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

  if (page === "10-raisons-creer-site-web-gabon.html") {
    translateBlog10Reasons(lang);
  }

  if (page === "erreurs-site-ecommerce.html") {
    translateBlogEcommerceErrors(lang);
  }

  if (page === "monetiser-site-web.html") {
    translateBlogMonetizeSite(lang);
  }

  if (page === "optimiser-seo-gabon.html") {
    translateBlogSeoGabon(lang);
  }

  if (page === "strategie-contenu-blog.html") {
    translateBlogContentStrategy(lang);
  }

  if (page === "tendances-web-design-2025.html") {
    translateBlogDesignTrends(lang);
  }

  if (page === "vitesse-chargement-site-web.html") {
    translateBlogSpeedGuide(lang);
  }

  if (page === "api-airtel.html") {
    translatePortfolioApiAirtel(lang);
  }

  if (page === "booki-details.html") {
    translatePortfolioBooki(lang);
  }

  if (page === "decouvre-details.html") {
    translatePortfolioDecouvre(lang);
  }

  if (page === "englishfunclub-details.html") {
    translatePortfolioEnglishFunClub(lang);
  }

  if (page === "gestion-prospects-details.html") {
    translatePortfolioProspects(lang);
  }

  if (page === "gracedeploye-details.html") {
    translatePortfolioGrace(lang);
  }

  if (page === "h2p-details.html") {
    translatePortfolioH2P(lang);
  }

  if (page === "lamp-details.html") {
    translatePortfolioLamp(lang);
  }

  if (page === "lebonwaz-details.html") {
    translatePortfolioLeBonWaz(lang);
  }

  if (page === "mgn-codewave-details.html") {
    translatePortfolioMgnCodeWave(lang);
  }

  if (page === "portfolio-richard-details.html") {
    translatePortfolioRichard(lang);
  }

  if (page === "wazup-details.html") {
    translatePortfolioWazup(lang);
  }

  if (page === "mentions-legales.html") {
    translateMentionsLegales(lang);
  }

  if (page === "politique-confidentialite.html") {
    translatePrivacyPolicy(lang);
  }

  if (page === "cgv.html") {
    translateCgv(lang);
  }

  if (page === "plan-du-site.html") {
    translateSitemap(lang);
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

function translatePortfolio(lang) {
  const data = {
    fr: {
      meta: {
        title: "Portfolio - CodeWave | Nos Realisations Web au Gabon",
        description:
          "Portfolio CodeWave - Decouvrez nos realisations de sites web au Gabon. Sites vitrines, e-commerce, blogs crees pour des entreprises gabonaises.",
      },
      breadcrumb: { home: "Accueil", current: "Portfolio" },
      pageTitle: "Nos Realisations",
      pageSubtitle:
        "Decouvrez des projets qui ont transforme des entreprises gabonaises",
      stats: [
        "Projets Realises",
        "Clients Satisfaits",
        "Annees d'Experience",
        "Satisfaction Client",
      ],
      filters: [
        "Tous les Projets",
        "E-Commerce",
        "Sites Vitrines",
        "Portfolios",
        "Blogs",
        "Applications",
      ],
      items: [
        {
          title: "Waz'UP",
          subtitle: "Super-app Flutter",
          button: "Decouvrir",
          tag: "Application mobile",
          result: "E-commerce & livraison",
        },
        {
          title: "H2P Group",
          subtitle: "Site & Identite",
          button: "Explorer",
          tag: "Site vitrine",
          result: "Prise de RDV",
        },
        {
          title: "MGN CodeWave",
          subtitle: "Studio digital",
          button: "Consulter",
          tag: "Identite",
          result: "Design system",
        },
        {
          title: "Portfolio Richard",
          subtitle: "Portfolio personnel",
          button: "Voir",
          tag: "Portfolio",
          result: "Profil & projets",
        },
        {
          title: "Le Bon Waz",
          subtitle: "Plateforme e-commerce",
          button: "Acceder",
          tag: "E-Commerce",
          result: "Catalogue dynamique",
        },
        {
          title: "Lampe a Mes Pieds",
          subtitle: "Site editorial",
          button: "Lire",
          tag: "Site web",
          result: "Collections",
        },
        {
          title: "English Fun Club",
          subtitle: "Plateforme e-learning",
          button: "Apprendre",
          tag: "Site web",
          result: "Apprentissage",
        },
        {
          title: "Decouvre qui tu es",
          subtitle: "Experience interactive",
          button: "Essayer",
          tag: "Application",
          result: "Tests de profils",
        },
        {
          title: "Projet Booki",
          subtitle: "Prototype reservation",
          button: "Visiter",
          tag: "Site web",
          result: "Portail hotelier",
        },
        {
          title: "Grace Deployee",
          subtitle: "Site communautaire",
          button: "Visiter",
          tag: "Site web",
          result: "Agenda & sermons",
        },
        {
          title: "API Airtel Money",
          subtitle: "Documentation",
          button: "Explorer",
          tag: "API",
          result: "Guide integration",
        },
        {
          title: "LMS Platform",
          subtitle: "Leads management",
          button: "Gerer",
          tag: "Application",
          result: "Prospection",
        },
      ],
      cta: {
        title: "Votre Projet Sera Le Prochain !",
        text: "Discutons de votre idee et creons ensemble quelque chose d'extraordinaire",
        buttonHtml: 'Demarrer Mon Projet <i class="fas fa-arrow-right"></i>',
      },
    },
    en: {
      meta: {
        title: "Portfolio - CodeWave | Our Web Work in Gabon",
        description:
          "CodeWave portfolio - discover our web projects in Gabon. Showcase sites, e-commerce and blogs built for Gabonese businesses.",
      },
      breadcrumb: { home: "Home", current: "Portfolio" },
      pageTitle: "Our Work",
      pageSubtitle: "Discover projects that transformed Gabonese businesses",
      stats: [
        "Projects Delivered",
        "Happy Clients",
        "Years of Experience",
        "Client Satisfaction",
      ],
      filters: [
        "All Projects",
        "E-Commerce",
        "Showcase Sites",
        "Portfolios",
        "Blogs",
        "Applications",
      ],
      items: [
        {
          title: "Waz'UP",
          subtitle: "Flutter super-app",
          button: "Explore",
          tag: "Mobile app",
          result: "E-commerce & delivery",
        },
        {
          title: "H2P Group",
          subtitle: "Website & Identity",
          button: "Explore",
          tag: "Showcase site",
          result: "Appointment booking",
        },
        {
          title: "MGN CodeWave",
          subtitle: "Digital studio",
          button: "View",
          tag: "Brand identity",
          result: "Design system",
        },
        {
          title: "Portfolio Richard",
          subtitle: "Personal portfolio",
          button: "View",
          tag: "Portfolio",
          result: "Profile & projects",
        },
        {
          title: "Le Bon Waz",
          subtitle: "E-commerce platform",
          button: "Open",
          tag: "E-Commerce",
          result: "Dynamic catalog",
        },
        {
          title: "Lampe a Mes Pieds",
          subtitle: "Editorial site",
          button: "Read",
          tag: "Website",
          result: "Collections",
        },
        {
          title: "English Fun Club",
          subtitle: "E-learning platform",
          button: "Learn",
          tag: "Website",
          result: "Learning",
        },
        {
          title: "Discover Who You Are",
          subtitle: "Interactive experience",
          button: "Try",
          tag: "App",
          result: "Profile tests",
        },
        {
          title: "Booki Project",
          subtitle: "Booking prototype",
          button: "Visit",
          tag: "Website",
          result: "Hotel portal",
        },
        {
          title: "Grace Deploy",
          subtitle: "Community site",
          button: "Visit",
          tag: "Website",
          result: "Schedule & sermons",
        },
        {
          title: "Airtel Money API",
          subtitle: "Documentation",
          button: "Explore",
          tag: "API",
          result: "Integration guide",
        },
        {
          title: "LMS Platform",
          subtitle: "Lead management",
          button: "Manage",
          tag: "App",
          result: "Prospecting",
        },
      ],
      cta: {
        title: "Your Project Is Next!",
        text: "Let's discuss your idea and build something extraordinary together",
        buttonHtml: 'Start My Project <i class="fas fa-arrow-right"></i>',
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

  const statsSection = document.querySelector(
    'section.section-padding[style*="background: var(--gray-50)"]',
  );
  if (statsSection) {
    const labels = statsSection.querySelectorAll(
      'div[style*="font-weight: 600"]',
    );
    labels.forEach((label, index) => {
      if (t.stats[index]) label.textContent = t.stats[index];
    });
  }

  const filters = document.querySelectorAll(".portfolio-filter");
  filters.forEach((button, index) => {
    if (!t.filters[index]) return;
    const icon = button.querySelector("i");
    button.innerHTML = icon
      ? `${icon.outerHTML} ${t.filters[index]}`
      : t.filters[index];
  });

  document.querySelectorAll(".portfolio-item").forEach((item, index) => {
    const dataItem = t.items[index];
    if (!dataItem) return;
    const title = item.querySelector(".portfolio-overlay h4");
    const subtitle = item.querySelector(".portfolio-overlay p");
    const button = item.querySelector(".portfolio-overlay a");
    const tag = item.querySelector(".portfolio-tag");
    const result = item.querySelector(".portfolio-result span");
    if (title) title.textContent = dataItem.title;
    if (subtitle) subtitle.textContent = dataItem.subtitle;
    if (button) {
      const icon = button.querySelector("i");
      button.innerHTML = icon
        ? `${icon.outerHTML} ${dataItem.button}`
        : dataItem.button;
    }
    if (tag) tag.textContent = dataItem.tag;
    if (result) result.textContent = dataItem.result;
  });

  setText(".cta-section .cta-title", t.cta.title);
  setText(".cta-section .cta-text", t.cta.text);
  setHtml(".cta-section .btn.btn-white", t.cta.buttonHtml);
}

function translateBlog(lang) {
  const data = {
    fr: {
      meta: {
        title: "Blog - CodeWave | Actualites & Conseils Web Gabon",
        description:
          "Blog CodeWave - Conseils, tutoriels et actualites sur le developpement web, le digital et l'entrepreneuriat au Gabon.",
        keywords:
          "blog web gabon, conseils developpement web, tutoriels web, seo gabon, digital gabon",
      },
      breadcrumb: { home: "Accueil", current: "Blog" },
      pageTitle: "Blogs & Actualites",
      pageSubtitle:
        "Decouvrez nos derniers articles, conseils et tutoriels sur le developpement web, le digital et l'entrepreneuriat au Gabon.",
      categories: [
        "Tous les Articles",
        "Tutoriels",
        "Conseils",
        "Actualites",
        "Entrepreneuriat",
      ],
      featured: {
        badge: "Article a la une",
        title:
          "10 raisons de creer un site web pour votre entreprise au Gabon en 2025",
        text: "Dans un monde de plus en plus numerique, avoir une presence en ligne n'est plus un luxe mais une necessite. Decouvrez pourquoi votre entreprise gabonaise a besoin d'un site web des aujourd'hui.",
        meta: ["10 decembre 2024", "5 min de lecture", "M.G.N CodeWave"],
        cta: "Lire l'Article",
      },
      articles: [
        {
          category: "Tutoriels",
          date: "8 decembre 2024",
          title:
            "Comment optimiser le referencement de votre site web au Gabon",
          excerpt:
            "Le SEO local est crucial pour attirer des clients gabonais. Decouvrez nos 7 conseils pratiques pour ameliorer votre visibilite sur Google au Gabon.",
          time: "6 min",
          cta: "Decouvrir SEO",
        },
        {
          category: "Conseils",
          date: "5 decembre 2024",
          title:
            "5 erreurs a eviter lors de la creation de votre site e-commerce",
          excerpt:
            "Lancez votre boutique en ligne avec succes en evitant ces erreurs courantes qui coutent cher aux entrepreneurs gabonais.",
          time: "4 min",
          cta: "Guide E-Commerce",
        },
        {
          category: "Actualites",
          date: "1er decembre 2024",
          title: "Les tendances web design 2025 a adopter au Gabon",
          excerpt:
            "Decouvrez les nouvelles tendances de design web qui vont dominer 2025 et comment les appliquer a votre site gabonais.",
          time: "5 min",
          cta: "Tendances Design",
        },
        {
          category: "Entrepreneuriat",
          date: "28 novembre 2024",
          title: "Comment monetiser votre site web : 8 strategies efficaces",
          excerpt:
            "Transformez votre site web en source de revenus avec ces strategies de monetisation adaptees au marche gabonais.",
          time: "7 min",
          cta: "Monetiser",
        },
        {
          category: "Tutoriels",
          date: "25 novembre 2024",
          title:
            "Guide complet : creer une strategie de contenu pour votre blog",
          excerpt:
            "Attirez plus de visiteurs et convertissez-les en clients avec une strategie de contenu bien pensee.",
          time: "8 min",
          cta: "Strategie Contenu",
        },
        {
          category: "Conseils",
          date: "20 novembre 2024",
          title: "L'Importance de la Vitesse de Chargement pour Votre Site Web",
          excerpt:
            "Avec la connexion internet au Gabon, la vitesse est cruciale. Apprenez a optimiser votre site pour des temps de chargement rapides.",
          time: "5 min",
          cta: "Optimiser Vitesse",
        },
      ],
      loadMore: "Charger Plus d'Articles",
      cta: {
        title: "Besoin d'un Site Web Professionnel ?",
        text: "Nos articles vous ont convaincu de l'importance d'un site web ? Passez a l'action des maintenant !",
        primaryHtml:
          'Demander un Devis Gratuit <i class="fas fa-arrow-right"></i>',
        secondary: "Voir Nos Realisations",
      },
    },
    en: {
      meta: {
        title: "Blog - CodeWave | Web News & Tips in Gabon",
        description:
          "CodeWave blog - tips, tutorials and news about web development, digital and entrepreneurship in Gabon.",
        keywords:
          "gabon web blog, web development tips, web tutorials, gabon seo, digital gabon",
      },
      breadcrumb: { home: "Home", current: "Blog" },
      pageTitle: "Blog & News",
      pageSubtitle:
        "Discover our latest articles, tips and tutorials on web development, digital and entrepreneurship in Gabon.",
      categories: [
        "All Articles",
        "Tutorials",
        "Advice",
        "News",
        "Entrepreneurship",
      ],
      featured: {
        badge: "Featured Article",
        title:
          "10 reasons to create a website for your business in Gabon in 2025",
        text: "In an increasingly digital world, having an online presence is no longer a luxury but a necessity. Learn why your Gabonese business needs a website today.",
        meta: ["Dec 10, 2024", "5 min read", "M.G.N CodeWave"],
        cta: "Read Article",
      },
      articles: [
        {
          category: "Tutorials",
          date: "Dec 8, 2024",
          title: "How to optimize your website SEO in Gabon",
          excerpt:
            "Local SEO is crucial to attract Gabonese clients. Here are 7 practical tips to improve your visibility on Google in Gabon.",
          time: "6 min read",
          cta: "SEO Tips",
        },
        {
          category: "Advice",
          date: "Dec 5, 2024",
          title: "5 mistakes to avoid when creating your e-commerce site",
          excerpt:
            "Launch your online store successfully by avoiding these common mistakes that cost Gabonese entrepreneurs dearly.",
          time: "4 min read",
          cta: "E-Commerce Guide",
        },
        {
          category: "News",
          date: "Dec 1, 2024",
          title: "2025 web design trends to adopt in Gabon",
          excerpt:
            "Discover the new web design trends that will dominate 2025 and how to apply them to your Gabonese website.",
          time: "5 min read",
          cta: "Design Trends",
        },
        {
          category: "Entrepreneurship",
          date: "Nov 28, 2024",
          title: "How to monetize your website: 8 effective strategies",
          excerpt:
            "Turn your website into a revenue source with monetization strategies adapted to the Gabonese market.",
          time: "7 min read",
          cta: "Monetize",
        },
        {
          category: "Tutorials",
          date: "Nov 25, 2024",
          title: "Complete guide: build a content strategy for your blog",
          excerpt:
            "Attract more visitors and convert them into clients with a well-crafted content strategy.",
          time: "8 min read",
          cta: "Content Strategy",
        },
        {
          category: "Advice",
          date: "Nov 20, 2024",
          title: "Why site speed matters for your website",
          excerpt:
            "With internet connectivity in Gabon, speed is crucial. Learn how to optimize your site for fast loading times.",
          time: "5 min read",
          cta: "Speed Tips",
        },
      ],
      loadMore: "Load More Articles",
      cta: {
        title: "Need a Professional Website?",
        text: "Convinced by our articles about the importance of a website? Take action now!",
        primaryHtml: 'Request a Free Quote <i class="fas fa-arrow-right"></i>',
        secondary: "See Our Work",
      },
    },
  };

  const t = data[lang];
  if (!t) return;

  document.title = t.meta.title;
  setMeta("description", t.meta.description);
  setMeta("keywords", t.meta.keywords);

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

  const categoryButtons = document.querySelectorAll(
    "section.section-padding a[data-category]",
  );
  categoryButtons.forEach((button, index) => {
    if (!t.categories[index]) return;
    const icon = button.querySelector("i");
    button.innerHTML = icon
      ? `${icon.outerHTML} ${t.categories[index]}`
      : t.categories[index];
  });

  const featured = document.querySelector(
    'section.section-padding div[style*="background: linear-gradient(135deg, #667eea"]',
  );
  if (featured) {
    const badge = featured.querySelector(
      'div[style*="border-radius: var(--radius-full)"]',
    );
    const title = featured.querySelector("h2");
    const text = featured.querySelector("p");
    const meta = featured.querySelectorAll("span");
    const button = featured.querySelector(".btn.btn-white");
    if (badge) {
      const icon = badge.querySelector("i");
      badge.innerHTML = icon
        ? `${icon.outerHTML} ${t.featured.badge}`
        : t.featured.badge;
    }
    if (title) title.textContent = t.featured.title;
    if (text) text.textContent = t.featured.text;
    meta.forEach((span, index) => {
      if (t.featured.meta[index]) {
        const icon = span.querySelector("i");
        span.innerHTML = icon
          ? `${icon.outerHTML} ${t.featured.meta[index]}`
          : t.featured.meta[index];
      }
    });
    if (button) {
      const icon = button.querySelector("i");
      button.innerHTML = icon
        ? `${t.featured.cta} ${icon.outerHTML}`
        : t.featured.cta;
    }
  }

  document.querySelectorAll(".blog-card").forEach((card, index) => {
    const dataItem = t.articles[index];
    if (!dataItem) return;
    const category = card.querySelector(".blog-category");
    const date = card.querySelector(".blog-date span");
    const title = card.querySelector(".blog-title a");
    const excerpt = card.querySelector(".blog-excerpt");
    const time = card.querySelector('span[style*="color: var(--gray-500)"]');
    const button = card.querySelector(".blog-link");
    if (category) category.textContent = dataItem.category;
    if (date) date.textContent = dataItem.date;
    if (title) title.textContent = dataItem.title;
    if (excerpt) excerpt.textContent = dataItem.excerpt;
    if (time) {
      const icon = time.querySelector("i");
      time.innerHTML = icon
        ? `${icon.outerHTML} ${dataItem.time}`
        : dataItem.time;
    }
    if (button) {
      const icon = button.querySelector("i");
      button.innerHTML = icon
        ? `${icon.outerHTML} ${dataItem.cta}`
        : dataItem.cta;
    }
  });

  const loadMore = document.querySelector("button.btn.btn-primary.btn-lg");
  if (loadMore) {
    const icon = loadMore.querySelector("i");
    loadMore.innerHTML = icon ? `${icon.outerHTML} ${t.loadMore}` : t.loadMore;
  }

  const ctaSection = document.querySelector(
    'section.section-padding div[style*="border: 2px solid var(--primary)"]',
  );
  if (ctaSection) {
    const title = ctaSection.querySelector("h2");
    const text = ctaSection.querySelector("p");
    const buttons = ctaSection.querySelectorAll("a.btn");
    if (title) title.textContent = t.cta.title;
    if (text) text.textContent = t.cta.text;
    if (buttons[0]) buttons[0].innerHTML = t.cta.primaryHtml;
    if (buttons[1]) buttons[1].textContent = t.cta.secondary;
  }
}

function applyBlogArticleTranslation(lang, config) {
  const originalStore =
    window.blogOriginalContent || (window.blogOriginalContent = {});
  const key = config.key;
  const breadcrumb = document.querySelector(".page-header .breadcrumb");
  const headerBadge = document.querySelector(
    '.page-header div[style*="border-radius: var(--radius-full)"]',
  );
  const headerTitle = document.querySelector(".page-header .page-title");
  const headerMeta = document.querySelectorAll(
    ".page-header .page-title + div span",
  );
  const articleSection = document.querySelector("article.section-padding");
  const relatedSection = document.querySelector(
    "section.section-padding.bg-light",
  );

  if (!originalStore[key]) {
    originalStore[key] = {
      title: document.title,
      description: document
        .querySelector('meta[name="description"]')
        ?.getAttribute("content"),
      keywords: document
        .querySelector('meta[name="keywords"]')
        ?.getAttribute("content"),
      breadcrumbHtml: breadcrumb ? breadcrumb.innerHTML : null,
      headerBadgeHtml: headerBadge ? headerBadge.innerHTML : null,
      headerTitle: headerTitle ? headerTitle.textContent : null,
      headerMeta: Array.from(headerMeta).map((item) => item.innerHTML),
      articleHtml: articleSection ? articleSection.innerHTML : null,
      relatedHtml: relatedSection ? relatedSection.innerHTML : null,
    };
  }

  const original = originalStore[key];

  if (lang === "en") {
    document.title = config.meta.title;
    setMeta("description", config.meta.description);
    if (config.meta.keywords) {
      setMeta("keywords", config.meta.keywords);
    }

    if (breadcrumb) {
      const links = breadcrumb.querySelectorAll("a");
      const spans = breadcrumb.querySelectorAll("span");
      if (links[0]) links[0].textContent = config.breadcrumb.home;
      if (links[1]) links[1].textContent = config.breadcrumb.blog;
      if (spans.length)
        spans[spans.length - 1].textContent = config.breadcrumb.current;
    }

    if (headerBadge) {
      const icon = headerBadge.querySelector("i");
      headerBadge.innerHTML = icon
        ? `${icon.outerHTML} ${config.header.badge}`
        : config.header.badge;
    }
    if (headerTitle) headerTitle.textContent = config.header.title;
    headerMeta.forEach((item, index) => {
      if (config.header.meta[index]) {
        const icon = item.querySelector("i");
        item.innerHTML = icon
          ? `${icon.outerHTML} ${config.header.meta[index]}`
          : config.header.meta[index];
      }
    });

    if (articleSection && config.articleHtml) {
      articleSection.innerHTML = config.articleHtml;
    }

    if (relatedSection && config.relatedHtml) {
      relatedSection.innerHTML = config.relatedHtml;
    }
  } else if (original) {
    document.title = original.title || document.title;
    if (original.description) {
      setMeta("description", original.description);
    }
    if (original.keywords) {
      setMeta("keywords", original.keywords);
    }
    if (breadcrumb && original.breadcrumbHtml !== null) {
      breadcrumb.innerHTML = original.breadcrumbHtml;
    }
    if (headerBadge && original.headerBadgeHtml !== null) {
      headerBadge.innerHTML = original.headerBadgeHtml;
    }
    if (headerTitle && original.headerTitle) {
      headerTitle.textContent = original.headerTitle;
    }
    headerMeta.forEach((item, index) => {
      if (original.headerMeta[index]) {
        item.innerHTML = original.headerMeta[index];
      }
    });
    if (articleSection && original.articleHtml !== null) {
      articleSection.innerHTML = original.articleHtml;
    }
    if (relatedSection && original.relatedHtml !== null) {
      relatedSection.innerHTML = original.relatedHtml;
    }
  }
}

function translateBlog10Reasons(lang) {
  applyBlogArticleTranslation(lang, {
    key: "blog-10-reasons",
    meta: {
      title:
        "10 Reasons to Create a Website for Your Business in Gabon in 2025 | CodeWave",
      description:
        "Discover 10 essential reasons why your business in Gabon needs a website in 2025.",
      keywords:
        "create website gabon, business website gabon, online presence gabon, website benefits, digital gabon",
    },
    breadcrumb: { home: "Home", blog: "Blog", current: "10 Reasons" },
    header: {
      badge: "Featured Article",
      title:
        "10 Reasons to Create a Website for Your Business in Gabon in 2025",
      meta: ["By M.G.N CodeWave", "Dec 15, 2024", "8 min read", "Advice"],
    },
    articleHtml: `
      <div class="container">
        <div style="max-width: 800px; margin: 0 auto">
          <img
            src="https://images.unsplash.com/photo-1460925895917-adf4ee868993?auto=format&fit=crop&w=1200&q=80"
            alt="Website creation in Gabon"
            style="
              width: 100%;
              border-radius: 12px;
              margin-bottom: 2rem;
              box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
            "
          />

          <div class="article-content">
            <p class="lead">
              In 2025, having a website is no longer a luxury but a necessity
              for any Gabonese business that wants to grow in a digital world.
              Whether you are a SME in Libreville, a shop in Port-Gentil, or a
              startup in Franceville, here are 10 strong reasons to invest in
              your online presence.
            </p>

            <h2>1. Be Visible 24/7, Everywhere in Gabon</h2>
            <p>
              Unlike a physical store with limited hours, your website works
              day and night. Prospects can discover your services at 2am or
              noon, from Libreville or any remote province.
            </p>
            <blockquote>
              "A website is like a sales rep who never sleeps and can serve
              thousands of clients at once."
            </blockquote>

            <h2>2. Build Professional Credibility and Trust</h2>
            <img
              src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80"
              alt="Professional online trust"
              style="
                width: 100%;
                border-radius: 12px;
                margin: 1.5rem 0;
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
              "
            />
            <p>
              In Gabon, most customers check online before buying. Without a
              website, you lose credibility against competitors who have one.
            </p>
            <p><strong>What a website brings:</strong></p>
            <ul>
              <li>Professional and modern image</li>
              <li>Visible client testimonials</li>
              <li>Certificates and achievements showcased</li>
              <li>Verified contact information</li>
            </ul>

            <h2>3. Reach 2.5 Million Gabonese Internet Users</h2>
            <img
              src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80"
              alt="Online audience"
              style="
                width: 100%;
                border-radius: 12px;
                margin: 1.5rem 0;
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
              "
            />
            <p>
              With more than 2.5 million internet users and very high mobile
              penetration, your online audience is far larger than your local
              foot traffic.
            </p>
            <div
              style="
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                padding: 2rem;
                border-radius: 12px;
                margin: 2rem 0;
                text-align: center;
              "
            >
              <h3 style="font-size: 2rem; margin-bottom: 0.5rem">70% of Gabonese</h3>
              <p style="opacity: 0.9">
                search online before purchasing products and services
              </p>
            </div>

            <h2>4. Stand Out From Competitors</h2>
            <img
              src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80"
              alt="Competitive advantage"
              style="
                width: 100%;
                border-radius: 12px;
                margin: 1.5rem 0;
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
              "
            />
            <p>
              Only a small share of Gabonese SMEs have a professional website.
              This is your chance to lead the market.
            </p>

            <h2>5. Reduce Your Marketing Costs</h2>
            <p>
              A well-optimized website costs far less than traditional ads and
              provides measurable, long-term results.
            </p>
            <table
              style="
                width: 100%;
                border-collapse: collapse;
                margin: 2rem 0;
                background: var(--surface);
                border-radius: 8px;
                overflow: hidden;
                box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
              "
            >
              <thead>
                <tr style="background: #f8f9fa">
                  <th
                    style="
                      padding: 1rem;
                      text-align: left;
                      font-weight: 600;
                      border-bottom: 2px solid #e5e7eb;
                    "
                  >
                    Marketing Channel
                  </th>
                  <th
                    style="
                      padding: 1rem;
                      text-align: right;
                      font-weight: 600;
                      border-bottom: 2px solid #e5e7eb;
                    "
                  >
                    Monthly Cost (FCFA)
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style="padding: 1rem; border-bottom: 1px solid #e5e7eb">
                    Radio Spot (30s)
                  </td>
                  <td
                    style="
                      padding: 1rem;
                      text-align: right;
                      border-bottom: 1px solid #e5e7eb;
                    "
                  >
                    300,000 - 500,000
                  </td>
                </tr>
                <tr>
                  <td style="padding: 1rem; border-bottom: 1px solid #e5e7eb">
                    Billboard
                  </td>
                  <td
                    style="
                      padding: 1rem;
                      text-align: right;
                      border-bottom: 1px solid #e5e7eb;
                    "
                  >
                    200,000 - 400,000
                  </td>
                </tr>
                <tr>
                  <td style="padding: 1rem; border-bottom: 1px solid #e5e7eb">
                    Flyers (5,000 units)
                  </td>
                  <td
                    style="
                      padding: 1rem;
                      text-align: right;
                      border-bottom: 1px solid #e5e7eb;
                    "
                  >
                    150,000 - 250,000
                  </td>
                </tr>
                <tr style="background: #f0fdf4">
                  <td
                    style="
                      padding: 1rem;
                      font-weight: 600;
                      border-bottom: 1px solid #e5e7eb;
                    "
                  >
                    Professional Website
                  </td>
                  <td
                    style="
                      padding: 1rem;
                      text-align: right;
                      font-weight: 600;
                      color: #16a34a;
                      border-bottom: 1px solid #e5e7eb;
                    "
                  >
                    15,000 / month
                  </td>
                </tr>
              </tbody>
            </table>

            <h2>6. Collect Valuable Data</h2>
            <p>
              Your website provides data on visitors, pages viewed, and time
              spent. These insights help you improve offers and marketing.
            </p>

            <h2>7. Sell Products and Services Online</h2>
            <p>
              With e-commerce, you can sell online and accept Mobile Money,
              cards, or bank transfers. No need for customers to travel.
            </p>

            <h2>8. Make It Easy to Contact You</h2>
            <p>
              Contact forms, WhatsApp links, and clickable phone numbers make
              customer engagement simple and fast.
            </p>

            <h2>9. Improve Your Brand Image</h2>
            <p>
              A well-designed website reflects professionalism and values. It
              is a powerful way to tell your story and build trust.
            </p>

            <h2>10. Prepare for Gabon Digital Future</h2>
            <p>
              Gabon is investing in digital transformation. Businesses without
              an online presence risk being left behind.
            </p>

            <div
              style="
                background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%);
                color: white;
                padding: 2rem;
                border-radius: 12px;
                margin: 2rem 0;
                text-align: center;
              "
            >
              <h3 style="font-size: 1.5rem; margin-bottom: 1rem">
                Launch Offer
              </h3>
              <p style="margin-bottom: 1rem">
                Get 15% off all packs + a free logo for the first 10 clients.
              </p>
              <a
                href="../contact.html"
                style="
                  display: inline-block;
                  background: var(--surface);
                  color: #f59e0b;
                  padding: 0.75rem 2rem;
                  border-radius: 8px;
                  font-weight: 600;
                  text-decoration: none;
                "
              >
                Get My Free Quote
              </a>
            </div>

            <h2>Conclusion</h2>
            <p>
              Creating a website in Gabon is a strategic necessity. With
              affordable costs and strong benefits, the investment pays off
              quickly.
            </p>
            <p>
              <strong>
                Ready to go digital? Contact CodeWave for a free, personalized
                quote.
              </strong>
            </p>

            <div
              style="
                margin-top: 3rem;
                padding-top: 2rem;
                border-top: 2px solid #e5e7eb;
              "
            >
              <h3 style="margin-bottom: 1rem">Share this article</h3>
              <div style="display: flex; gap: 1rem; flex-wrap: wrap">
                <a
                  href="#"
                  class="btn btn-outline"
                  style="display: flex; align-items: center; gap: 0.5rem"
                >
                  <i class="fab fa-facebook-f"></i> Facebook
                </a>
                <a
                  href="#"
                  class="btn btn-outline"
                  style="display: flex; align-items: center; gap: 0.5rem"
                >
                  <i class="fab fa-twitter"></i> Twitter
                </a>
                <a
                  href="#"
                  class="btn btn-outline"
                  style="display: flex; align-items: center; gap: 0.5rem"
                >
                  <i class="fab fa-linkedin-in"></i> LinkedIn
                </a>
                <a
                  href="#"
                  class="btn btn-outline"
                  style="display: flex; align-items: center; gap: 0.5rem"
                >
                  <i class="fab fa-whatsapp"></i> WhatsApp
                </a>
              </div>
            </div>

            <div
              style="
                background: #f8f9fa;
                padding: 2rem;
                border-radius: 12px;
                margin-top: 3rem;
                display: flex;
                gap: 1.5rem;
                align-items: center;
              "
            >
              <div
                style="
                  width: 80px;
                  height: 80px;
                  border-radius: 50%;
                  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  flex-shrink: 0;
                "
              >
                <i class="fas fa-user" style="color: white; font-size: 2rem"></i>
              </div>
              <div>
                <h4 style="margin-bottom: 0.5rem; color: var(--gray-900)">
                  About the author
                </h4>
                <p style="color: var(--gray-600); margin-bottom: 1rem">
                  <strong>M.G.N CodeWave</strong> is a web agency in Libreville
                  helping Gabonese businesses build professional websites.
                </p>
                <a href="../contact.html" class="btn btn-primary btn-sm">
                  Contact us
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    `,
    relatedHtml: `
      <div class="container">
        <h2
          style="
            font-size: 2rem;
            font-weight: 800;
            text-align: center;
            margin-bottom: 3rem;
          "
        >
          Related Articles
        </h2>
        <div
          style="
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 2rem;
          "
        >
          <article class="blog-card">
            <div class="blog-image">
              <img
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80"
                alt="SEO in Gabon"
              />
              <span class="blog-tag">Advice</span>
            </div>
            <div class="blog-content">
              <h3 class="blog-title">Optimize your SEO in Gabon</h3>
              <p class="blog-excerpt">
                Best practices to improve your Google ranking...
              </p>
              <a href="optimiser-seo-gabon.html" class="read-more">
                Read more <i class="fas fa-arrow-right"></i>
              </a>
            </div>
          </article>

          <article class="blog-card">
            <div class="blog-image">
              <img
                src="https://images.unsplash.com/photo-1460925895917-adf4ee868993?auto=format&fit=crop&w=600&q=80"
                alt="Site speed"
              />
              <span class="blog-tag">Tutorials</span>
            </div>
            <div class="blog-content">
              <h3 class="blog-title">Improve your site speed</h3>
              <p class="blog-excerpt">
                How to boost your website performance...
              </p>
              <a href="vitesse-chargement-site-web.html" class="read-more">
                Read more <i class="fas fa-arrow-right"></i>
              </a>
            </div>
          </article>

          <article class="blog-card">
            <div class="blog-image">
              <img
                src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=600&q=80"
                alt="Web design trends"
              />
              <span class="blog-tag">News</span>
            </div>
            <div class="blog-content">
              <h3 class="blog-title">Web design trends in 2025</h3>
              <p class="blog-excerpt">
                Discover the design trends shaping 2025...
              </p>
              <a href="tendances-web-design-2025.html" class="read-more">
                Read more <i class="fas fa-arrow-right"></i>
              </a>
            </div>
          </article>
        </div>
      </div>
    `,
  });
}

function translateBlogEcommerceErrors(lang) {
  applyBlogArticleTranslation(lang, {
    key: "blog-ecommerce-errors",
    meta: {
      title:
        "7 Common E-Commerce Website Mistakes and How to Avoid Them | CodeWave",
      description:
        "Seven common mistakes in building e-commerce sites and how to avoid them to maximize sales.",
      keywords:
        "ecommerce mistakes, online store gabon, ecommerce site, optimize sales",
    },
    breadcrumb: { home: "Home", blog: "Blog", current: "E-Commerce Errors" },
    header: {
      badge: "E-Commerce",
      title: "7 Common E-Commerce Website Mistakes and How to Avoid Them",
      meta: ["By M.G.N CodeWave", "Nov 28, 2024", "7 min read"],
    },
    articleHtml: `
      <div class="container">
        <div style="max-width: 800px; margin: 0 auto">
          <img
            src="https://images.unsplash.com/photo-1553729784-e91953dec042?auto=format&fit=crop&w=1200&q=80"
            alt="E-commerce mistakes"
            style="
              width: 100%;
              border-radius: 12px;
              margin-bottom: 2rem;
              box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
            "
          />

          <div class="article-content">
            <p class="lead">
              Launching an online store in Gabon is a strong opportunity, but
              avoid these common pitfalls that kill conversions.
            </p>

            <h2>Error 1: Checkout Too Complex</h2>
            <img
              src="https://images.unsplash.com/photo-1556740738-b6a63e27c4df?auto=format&fit=crop&w=800&q=80"
              alt="Simplified checkout"
              style="
                width: 100%;
                border-radius: 12px;
                margin: 1.5rem 0;
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
              "
            />
            <p>Too many steps and clicks lead to cart abandonment.</p>
            <h3>Solution:</h3>
            <div
              style="
                background: var(--callout-warn);
                border-left: 4px solid #ff9a56;
                padding: 1rem;
                margin: 1rem 0;
                border-radius: 8px;
              "
            >
              <ul>
                <li>Checkout in 3 steps max</li>
                <li>Guest checkout allowed</li>
                <li>Show progress clearly</li>
                <li>Multiple payment options</li>
              </ul>
            </div>

            <h2>Error 2: No Local Payment Options</h2>
            <img
              src="https://images.unsplash.com/photo-1563207153-f403bf289096?auto=format&fit=crop&w=800&q=80"
              alt="Local payment options"
              style="
                width: 100%;
                border-radius: 12px;
                margin: 1.5rem 0;
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
              "
            />
            <p>
              Forcing card payments can eliminate most Gabonese customers.
            </p>
            <h3>Solution:</h3>
            <div
              style="
                background: var(--callout-warn);
                border-left: 4px solid #ff9a56;
                padding: 1rem;
                margin: 1rem 0;
                border-radius: 8px;
              "
            >
              <ul>
                <li>Integrate Airtel Money</li>
                <li>Integrate Moov Money</li>
                <li>Bank transfers</li>
                <li>Cash on delivery</li>
                <li>WhatsApp Pay</li>
              </ul>
            </div>

            <h2>Error 3: Poor Product Photos</h2>
            <p>
              Low quality images reduce trust. Visuals drive buying decisions.
            </p>
            <h3>Solution:</h3>
            <div
              style="
                background: var(--callout-warn);
                border-left: 4px solid #ff9a56;
                padding: 1rem;
                margin: 1rem 0;
                border-radius: 8px;
              "
            >
              <ul>
                <li>High resolution images</li>
                <li>Multiple angles</li>
                <li>Lifestyle photos</li>
                <li>Short product videos</li>
                <li>Zoom on images</li>
              </ul>
            </div>

            <h2>Error 4: Hidden Delivery Fees</h2>
            <p>
              Surprise fees at the last step cause instant drop-offs.
            </p>
            <h3>Solution:</h3>
            <div
              style="
                background: var(--callout-warn);
                border-left: 4px solid #ff9a56;
                padding: 1rem;
                margin: 1rem 0;
                border-radius: 8px;
              "
            >
              <ul>
                <li>Show fees early</li>
                <li>Free shipping thresholds</li>
                <li>Transparent shipping calculator</li>
                <li>Reliable delivery partners</li>
              </ul>
            </div>

            <h2>Error 5: No Trust Signals</h2>
            <p>Customers need proof of credibility and security.</p>
            <h3>Solution:</h3>
            <div
              style="
                background: var(--callout-warn);
                border-left: 4px solid #ff9a56;
                padding: 1rem;
                margin: 1rem 0;
                border-radius: 8px;
              "
            >
              <ul>
                <li>Show reviews and ratings</li>
                <li>Display SSL / HTTPS badges</li>
                <li>Clear return policy</li>
                <li>Visible contact options</li>
                <li>Legal pages in the footer</li>
              </ul>
            </div>

            <h2>Error 6: No Order Tracking</h2>
            <p>
              Silence after payment creates anxiety and negative reviews.
            </p>
            <h3>Solution:</h3>
            <div
              style="
                background: var(--callout-warn);
                border-left: 4px solid #ff9a56;
                padding: 1rem;
                margin: 1rem 0;
                border-radius: 8px;
              "
            >
              <ul>
                <li>Automatic email confirmations</li>
                <li>Tracking number</li>
                <li>SMS updates</li>
                <li>Courier integrations</li>
                <li>Customer support via WhatsApp</li>
              </ul>
            </div>

            <h2>Error 7: Not Mobile Optimized</h2>
            <p>Most e-commerce traffic in Gabon is mobile.</p>
            <h3>Solution:</h3>
            <div
              style="
                background: var(--callout-warn);
                border-left: 4px solid #ff9a56;
                padding: 1rem;
                margin: 1rem 0;
                border-radius: 8px;
              "
            >
              <ul>
                <li>100% responsive design</li>
                <li>Large, tappable buttons</li>
                <li>Fast loading images</li>
                <li>Mobile-friendly forms</li>
                <li>One-tap checkout if possible</li>
              </ul>
            </div>

            <div
              style="
                background: linear-gradient(135deg, #ff9a56 0%, #ff6a88 100%);
                color: white;
                padding: 2rem;
                border-radius: 12px;
                margin: 2rem 0;
                text-align: center;
              "
            >
              <h3 style="font-size: 1.5rem; margin-bottom: 1rem">
                Launch Your E-Commerce in Gabon
              </h3>
              <p style="margin-bottom: 1rem">
                Full e-commerce pack with local payments and training.
              </p>
              <a
                href="../contact.html"
                style="
                  display: inline-block;
                  background: var(--surface);
                  color: #ff6a88;
                  padding: 0.75rem 2rem;
                  border-radius: 8px;
                  font-weight: 600;
                  text-decoration: none;
                "
              >
                Start Now
              </a>
            </div>

            <h2>Conclusion</h2>
            <p>
              E-commerce in Gabon has massive potential. Avoiding these 7
              mistakes can dramatically increase conversions and revenue.
            </p>
          </div>
        </div>
      </div>
    `,
  });
}

function translateBlogMonetizeSite(lang) {
  applyBlogArticleTranslation(lang, {
    key: "blog-monetize-site",
    meta: {
      title: "How to Monetize Your Website: Proven Strategies | CodeWave",
      description:
        "Monetize your website with ads, affiliate marketing, digital products, and more.",
      keywords:
        "monetize website, website revenue, affiliate marketing, ads, digital products",
    },
    breadcrumb: { home: "Home", blog: "Blog", current: "Monetization" },
    header: {
      badge: "Monetization",
      title: "How to Monetize Your Website: Proven Strategies",
      meta: ["By M.G.N CodeWave", "Nov 25, 2024", "8 min read"],
    },
    articleHtml: `
      <div class="container">
        <div style="max-width: 800px; margin: 0 auto">
          <img
            src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80"
            alt="Monetize a website"
            style="
              width: 100%;
              border-radius: 12px;
              margin-bottom: 2rem;
              box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
            "
          />

          <div class="article-content">
            <p class="lead">
              Having a website is great. Turning it into revenue is even
              better. Here are 10 monetization strategies to convert traffic
              into income.
            </p>

            <h2>1. Ads (AdSense, Mediavine)</h2>
            <p>Simple to start, but needs significant traffic.</p>
            <div
              style="
                background: var(--callout-warm);
                border-left: 4px solid #f59e0b;
                padding: 1rem;
                margin: 1rem 0;
                border-radius: 8px;
              "
            >
              <ul>
                <li>Estimated earnings: 0.25-1 USD per visitor / month</li>
                <li>Easy to set up</li>
                <li>Best for blogs and news sites</li>
              </ul>
            </div>

            <h2>2. Affiliate Marketing</h2>
            <p>Recommend products and earn commissions.</p>
            <div
              style="
                background: var(--callout-warm);
                border-left: 4px solid #f59e0b;
                padding: 1rem;
                margin: 1rem 0;
                border-radius: 8px;
              "
            >
              <ul>
                <li>Amazon Associates</li>
                <li>Jumia Gabon</li>
                <li>Local programs</li>
                <li>International CPA networks</li>
              </ul>
            </div>

            <h2>3. Sell Digital Products</h2>
            <p>Create once, sell forever: ebooks, courses, templates.</p>
            <div
              style="
                background: var(--callout-warm);
                border-left: 4px solid #f59e0b;
                padding: 1rem;
                margin: 1rem 0;
                border-radius: 8px;
              "
            >
              <ul>
                <li>Ebook: "Gabon Entrepreneur Guide 2025"</li>
                <li>Course: "Build an e-commerce in Gabon"</li>
                <li>Templates: WordPress, Figma, Canva</li>
                <li>Local SaaS tools</li>
              </ul>
            </div>

            <h2>4. Offer Services (Consulting, Coaching)</h2>
            <p>Sell your expertise directly.</p>
            <div
              style="
                background: var(--callout-warm);
                border-left: 4px solid #f59e0b;
                padding: 1rem;
                margin: 1rem 0;
                border-radius: 8px;
              "
            >
              <ul>
                <li>1-on-1 consulting</li>
                <li>Group coaching</li>
                <li>Audits and diagnostics</li>
              </ul>
            </div>

            <h2>5. Memberships</h2>
            <p>Exclusive content for paying members.</p>
            <ul>
              <li>Monthly plans</li>
              <li>VIP support</li>
              <li>Premium resources</li>
            </ul>

            <h2>6. Physical E-Commerce</h2>
            <p>High volume and strong margins with proper logistics.</p>
            <ul>
              <li>30-60% margins</li>
              <li>Local delivery partners are critical</li>
            </ul>

            <h2>7. Email Marketing</h2>
            <p>Build a list and monetize through offers.</p>
            <ul>
              <li>Lead magnets</li>
              <li>Conversion rate 1-5%</li>
            </ul>

            <h2>8. Sponsored Content</h2>
            <p>Brands pay for mentions and reviews.</p>
            <ul>
              <li>Sponsored articles</li>
              <li>Product mentions</li>
              <li>Full reviews</li>
            </ul>

            <h2>9. Webinars and Virtual Events</h2>
            <p>Paid training sessions and workshops.</p>
            <ul>
              <li>Advanced paid training</li>
              <li>Intensive workshops</li>
            </ul>

            <h2>10. Sell the Website</h2>
            <p>Build a profitable site and sell it for a multiple.</p>
            <ul>
              <li>Marketplaces: Flippa, Sitebroker</li>
            </ul>

            <h2>Which Strategy to Choose?</h2>
            <table style="width: 100%; border-collapse: collapse; margin: 2rem 0">
              <thead>
                <tr style="background: #f8f9fa">
                  <th
                    style="
                      padding: 1rem;
                      text-align: left;
                      border: 1px solid #e5e7eb;
                    "
                  >
                    Strategy
                  </th>
                  <th
                    style="
                      padding: 1rem;
                      text-align: left;
                      border: 1px solid #e5e7eb;
                    "
                  >
                    Potential Revenue
                  </th>
                  <th
                    style="
                      padding: 1rem;
                      text-align: left;
                      border: 1px solid #e5e7eb;
                    "
                  >
                    Difficulty
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style="padding: 1rem; border: 1px solid #e5e7eb">Ads</td>
                  <td style="padding: 1rem; border: 1px solid #e5e7eb">Low</td>
                  <td style="padding: 1rem; border: 1px solid #e5e7eb">Easy</td>
                </tr>
                <tr>
                  <td style="padding: 1rem; border: 1px solid #e5e7eb">Affiliate</td>
                  <td style="padding: 1rem; border: 1px solid #e5e7eb">Medium</td>
                  <td style="padding: 1rem; border: 1px solid #e5e7eb">Easy</td>
                </tr>
                <tr>
                  <td style="padding: 1rem; border: 1px solid #e5e7eb">Digital Products</td>
                  <td style="padding: 1rem; border: 1px solid #e5e7eb">Excellent</td>
                  <td style="padding: 1rem; border: 1px solid #e5e7eb">Medium</td>
                </tr>
                <tr style="background: #f0fdf4">
                  <td
                    style="
                      padding: 1rem;
                      border: 1px solid #e5e7eb;
                      font-weight: 600;
                    "
                  >
                    E-Commerce
                  </td>
                  <td
                    style="
                      padding: 1rem;
                      border: 1px solid #e5e7eb;
                      font-weight: 600;
                    "
                  >
                    Very High
                  </td>
                  <td
                    style="
                      padding: 1rem;
                      border: 1px solid #e5e7eb;
                      font-weight: 600;
                    "
                  >
                    Hard
                  </td>
                </tr>
              </tbody>
            </table>

            <div
              style="
                background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);
                color: var(--text);
                padding: 2rem;
                border-radius: 12px;
                margin: 2rem 0;
                text-align: center;
              "
            >
              <h3 style="font-size: 1.5rem; margin-bottom: 1rem">
                Need help monetizing your site?
              </h3>
              <p style="margin-bottom: 1rem">
                CodeWave helps you choose and implement the right strategy.
              </p>
              <a
                href="../contact.html"
                style="
                  display: inline-block;
                  background: var(--surface);
                  color: #38f9d7;
                  padding: 0.75rem 2rem;
                  border-radius: 8px;
                  font-weight: 600;
                  text-decoration: none;
                "
              >
                Free Consultation
              </a>
            </div>

            <h2>Conclusion</h2>
            <p>
              The best monetization combines multiple methods. Start simple and
              scale as your audience grows.
            </p>
          </div>
        </div>
      </div>
    `,
  });
}

function translateBlogSeoGabon(lang) {
  applyBlogArticleTranslation(lang, {
    key: "blog-seo-gabon",
    meta: {
      title: "Optimize Your SEO in Gabon: Complete Guide | CodeWave",
      description:
        "Complete guide to improve your website SEO in Gabon with local strategies and proven techniques.",
      keywords:
        "seo gabon, local seo gabon, gabon search optimization, libreville seo",
    },
    breadcrumb: { home: "Home", blog: "Blog", current: "SEO in Gabon" },
    header: {
      badge: "SEO Guide",
      title: "Optimize Your SEO in Gabon: Complete Guide 2025",
      meta: ["By M.G.N CodeWave", "Dec 12, 2024", "10 min read", "SEO Tips"],
    },
    articleHtml: `
      <div class="container">
        <div style="max-width: 800px; margin: 0 auto">
          <img
            src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80"
            alt="SEO in Gabon"
            style="
              width: 100%;
              border-radius: 12px;
              margin-bottom: 2rem;
              box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
            "
          />

          <div class="article-content">
            <p class="lead">
              SEO is the art of optimizing your website so it appears on the
              first page of Google. In Gabon, mastering local SEO can bring
              hundreds of new clients each month.
            </p>

            <h2>Why SEO Matters in Gabon</h2>
            <p>
              With over 2.5 million internet users searching daily, visibility
              on Google is essential. Most users never go beyond page one.
            </p>

            <h2>1. Local Keyword Research</h2>
            <p>Identify terms your customers use to find you.</p>
            <div
              style="
                background: #f0fdf4;
                border-left: 4px solid #10b981;
                padding: 1rem;
                margin: 1rem 0;
                border-radius: 8px;
              "
            >
              <ul>
                <li>"restaurant libreville"</li>
                <li>"plumber port-gentil"</li>
                <li>"online store gabon"</li>
                <li>"lawyer franceville"</li>
                <li>"real estate owendo"</li>
              </ul>
            </div>

            <h2>2. On-Page Optimization</h2>
            <p>
              Use clear titles, descriptive URLs, and quality content on every
              page.
            </p>
            <div
              style="
                background: #f8f9fa;
                padding: 1.5rem;
                border-radius: 8px;
                margin: 1rem 0;
              "
            >
              <strong>Example:</strong><br />
              Bad: "Home - My Store"<br />
              Good: "Online Fashion Store Gabon | Delivery in Libreville"
            </div>

            <h2>3. Local SEO for Gabon</h2>
            <p>Use Google Business Profile and local directories.</p>
            <div
              style="
                background: #f0fdf4;
                border-left: 4px solid #10b981;
                padding: 1rem;
                margin: 1rem 0;
                border-radius: 8px;
              "
            >
              <ul>
                <li>Exact address and phone</li>
                <li>Business hours</li>
                <li>Photos and reviews</li>
              </ul>
            </div>

            <h2>4. Technical Optimization</h2>
            <p>Speed, mobile-first, and HTTPS are mandatory.</p>
            <blockquote>
              "40% of visitors leave a site that loads in more than 3 seconds."
            </blockquote>

            <h2>5. Content Strategy</h2>
            <p>Publish articles that target local searches.</p>
            <ul>
              <li>"How to choose a plumber in Libreville"</li>
              <li>"Top 10 restaurants in Port-Gentil"</li>
              <li>"Real estate buying guide in Gabon"</li>
            </ul>

            <h2>6. Link Building</h2>
            <p>Get backlinks from local sites and partners.</p>
            <ul>
              <li>Local business partnerships</li>
              <li>Guest posts on Gabonese blogs</li>
              <li>Local press mentions</li>
            </ul>

            <h2>7. Social Signals</h2>
            <p>Active social media helps SEO indirectly.</p>
            <ul>
              <li>More traffic to your site</li>
              <li>Brand awareness</li>
              <li>Positive engagement signals</li>
            </ul>

            <h2>8. Track and Improve</h2>
            <ul>
              <li>Google Analytics</li>
              <li>Google Search Console</li>
              <li>PageSpeed Insights</li>
            </ul>

            <div
              style="
                background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
                color: white;
                padding: 2rem;
                border-radius: 12px;
                margin: 2rem 0;
                text-align: center;
              "
            >
              <h3 style="font-size: 1.5rem; margin-bottom: 1rem">
                Our SEO Pack for Gabon
              </h3>
              <p style="margin-bottom: 1rem">
                Full audit + on-page optimization + 3 months of follow-up.
              </p>
              <a
                href="../contact.html"
                style="
                  display: inline-block;
                  background: var(--surface);
                  color: #00f2fe;
                  padding: 0.75rem 2rem;
                  border-radius: 8px;
                  font-weight: 600;
                  text-decoration: none;
                "
              >
                Boost My SEO Now
              </a>
            </div>

            <h2>Conclusion</h2>
            <p>
              SEO in Gabon requires a local approach. Apply these steps and
              you will grow visibility and qualified leads.
            </p>

            <div
              style="
                margin-top: 3rem;
                padding-top: 2rem;
                border-top: 2px solid #e5e7eb;
              "
            >
              <h3 style="margin-bottom: 1rem">Share this article</h3>
              <div style="display: flex; gap: 1rem; flex-wrap: wrap">
                <a
                  href="#"
                  class="btn btn-outline"
                  style="display: flex; align-items: center; gap: 0.5rem"
                >
                  <i class="fab fa-facebook-f"></i> Facebook
                </a>
                <a
                  href="#"
                  class="btn btn-outline"
                  style="display: flex; align-items: center; gap: 0.5rem"
                >
                  <i class="fab fa-twitter"></i> Twitter
                </a>
                <a
                  href="#"
                  class="btn btn-outline"
                  style="display: flex; align-items: center; gap: 0.5rem"
                >
                  <i class="fab fa-linkedin-in"></i> LinkedIn
                </a>
                <a
                  href="#"
                  class="btn btn-outline"
                  style="display: flex; align-items: center; gap: 0.5rem"
                >
                  <i class="fab fa-whatsapp"></i> WhatsApp
                </a>
              </div>
            </div>

            <div
              style="
                background: #f8f9fa;
                padding: 2rem;
                border-radius: 12px;
                margin-top: 3rem;
                display: flex;
                gap: 1.5rem;
                align-items: center;
              "
            >
              <div
                style="
                  width: 80px;
                  height: 80px;
                  border-radius: 50%;
                  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  flex-shrink: 0;
                "
              >
                <i class="fas fa-user" style="color: white; font-size: 2rem"></i>
              </div>
              <div>
                <h4 style="margin-bottom: 0.5rem; color: var(--gray-900)">
                  About the author
                </h4>
                <p style="color: var(--gray-600); margin-bottom: 1rem">
                  <strong>M.G.N CodeWave</strong> helps Gabonese businesses
                  optimize their SEO and grow online.
                </p>
                <a href="../contact.html" class="btn btn-primary btn-sm">
                  Contact us
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    `,
    relatedHtml: `
      <div class="container">
        <h2
          style="
            font-size: 2rem;
            font-weight: 800;
            text-align: center;
            margin-bottom: 3rem;
          "
        >
          Related Articles
        </h2>
        <div
          style="
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 2rem;
          "
        >
          <article class="blog-card">
            <div class="blog-image">
              <img
                src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=600&q=80"
                alt="Website reasons"
              />
              <span class="blog-tag">Tutorials</span>
            </div>
            <div class="blog-content">
              <h3 class="blog-title">10 reasons to create a website</h3>
              <p class="blog-excerpt">
                Why your business needs a website in 2025...
              </p>
              <a href="10-raisons-creer-site-web-gabon.html" class="read-more">
                Read more <i class="fas fa-arrow-right"></i>
              </a>
            </div>
          </article>

          <article class="blog-card">
            <div class="blog-image">
              <img
                src="https://images.unsplash.com/photo-1460925895917-adf4ee868993?auto=format&fit=crop&w=600&q=80"
                alt="Site speed"
              />
              <span class="blog-tag">Advice</span>
            </div>
            <div class="blog-content">
              <h3 class="blog-title">Improve site speed</h3>
              <p class="blog-excerpt">
                Techniques to boost performance...
              </p>
              <a href="vitesse-chargement-site-web.html" class="read-more">
                Read more <i class="fas fa-arrow-right"></i>
              </a>
            </div>
          </article>

          <article class="blog-card">
            <div class="blog-image">
              <img
                src="https://images.unsplash.com/photo-1533356270392-02c1ae829f02?auto=format&fit=crop&w=600&q=80"
                alt="Content strategy"
              />
              <span class="blog-tag">Tutorials</span>
            </div>
            <div class="blog-content">
              <h3 class="blog-title">Build a content strategy</h3>
              <p class="blog-excerpt">
                Plan content that attracts your audience...
              </p>
              <a href="strategie-contenu-blog.html" class="read-more">
                Read more <i class="fas fa-arrow-right"></i>
              </a>
            </div>
          </article>
        </div>
      </div>
    `,
  });
}

function translateBlogContentStrategy(lang) {
  applyBlogArticleTranslation(lang, {
    key: "blog-content-strategy",
    meta: {
      title:
        "Build an Effective Blog Content Strategy: Step by Step | CodeWave",
      description:
        "Practical guide to build a blog content strategy and attract more visitors.",
      keywords:
        "content strategy blog, editorial plan, blogging gabon, content marketing",
    },
    breadcrumb: { home: "Home", blog: "Blog", current: "Content Strategy" },
    header: {
      badge: "Tutorial",
      title: "Build an Effective Blog Content Strategy: Step by Step",
      meta: ["By M.G.N CodeWave", "Dec 5, 2024", "9 min read", "Tutorials"],
    },
    articleHtml: `
      <div class="container">
        <div style="max-width: 800px; margin: 0 auto">
          <img
            src="https://images.unsplash.com/photo-1533356270392-02c1ae829f02?auto=format&fit=crop&w=1200&q=80"
            alt="Blog content strategy"
            style="
              width: 100%;
              border-radius: 12px;
              margin-bottom: 2rem;
              box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
            "
          />

          <div class="article-content">
            <p class="lead">
              A blog without strategy is like sailing without a compass. Use
              this step-by-step guide to turn your blog into a client magnet.
            </p>

            <h2>Step 1: Define Your Goals</h2>
            <ul>
              <li>Grow organic traffic</li>
              <li>Build authority</li>
              <li>Convert visitors to customers</li>
              <li>Increase brand awareness</li>
            </ul>

            <h2>Step 2: Know Your Audience</h2>
            <p>Create detailed personas with needs and goals.</p>
            <ul>
              <li>Age, location, profession</li>
              <li>Challenges</li>
              <li>Content habits</li>
              <li>Frequently asked questions</li>
            </ul>

            <h2>Step 3: Topic and Keyword Research</h2>
            <p>List real questions your clients ask.</p>
            <div
              style="
                background: #f0f9fe;
                border-left: 4px solid #0ea5e9;
                padding: 1rem;
                margin: 1rem 0;
                border-radius: 8px;
              "
            >
              <ul>
                <li>"How to build an e-commerce in Gabon?"</li>
                <li>"How much does a website cost?"</li>
                <li>"How to accept Mobile Money on my site?"</li>
              </ul>
            </div>

            <h2>Step 4: Build an Editorial Calendar</h2>
            <table style="width: 100%; border-collapse: collapse; margin: 2rem 0">
              <thead>
                <tr style="background: #f8f9fa">
                  <th style="padding: 1rem; text-align: left; border: 1px solid #e5e7eb">Week</th>
                  <th style="padding: 1rem; text-align: left; border: 1px solid #e5e7eb">Topic</th>
                  <th style="padding: 1rem; text-align: left; border: 1px solid #e5e7eb">Type</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style="padding: 1rem; border: 1px solid #e5e7eb">Week 1</td>
                  <td style="padding: 1rem; border: 1px solid #e5e7eb">10 reasons to build a site</td>
                  <td style="padding: 1rem; border: 1px solid #e5e7eb">List</td>
                </tr>
                <tr>
                  <td style="padding: 1rem; border: 1px solid #e5e7eb">Week 2</td>
                  <td style="padding: 1rem; border: 1px solid #e5e7eb">Local SEO guide</td>
                  <td style="padding: 1rem; border: 1px solid #e5e7eb">Guide</td>
                </tr>
                <tr>
                  <td style="padding: 1rem; border: 1px solid #e5e7eb">Week 3</td>
                  <td style="padding: 1rem; border: 1px solid #e5e7eb">Client testimonial</td>
                  <td style="padding: 1rem; border: 1px solid #e5e7eb">Case Study</td>
                </tr>
              </tbody>
            </table>

            <h2>Step 5: Create High-Quality Content</h2>
            <ol>
              <li>Strong headline</li>
              <li>Captivating intro</li>
              <li>Clear H2/H3 structure</li>
              <li>1,000-2,000 words</li>
              <li>Visuals and examples</li>
              <li>Clear call-to-action</li>
            </ol>

            <h2>Step 6: Promote Your Content</h2>
            <ul>
              <li>Facebook groups</li>
              <li>LinkedIn</li>
              <li>WhatsApp status</li>
              <li>Email newsletter</li>
              <li>Guest blogging</li>
            </ul>

            <h2>Step 7: Measure and Adjust</h2>
            <ul>
              <li>Views</li>
              <li>Time on page</li>
              <li>Bounce rate</li>
              <li>Shares</li>
              <li>Conversions</li>
            </ul>

            <div
              style="
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                padding: 2rem;
                border-radius: 12px;
                margin: 2rem 0;
                text-align: center;
              "
            >
              <h3 style="font-size: 1.5rem; margin-bottom: 1rem">
                Need a Professional Blog?
              </h3>
              <p style="margin-bottom: 1rem">
                CodeWave builds your blog with SEO-optimized content.
              </p>
              <a
                href="../contact.html"
                style="
                  display: inline-block;
                  background: var(--surface);
                  color: #764ba2;
                  padding: 0.75rem 2rem;
                  border-radius: 8px;
                  font-weight: 600;
                  text-decoration: none;
                "
              >
                Create My Blog
              </a>
            </div>

            <h2>Conclusion</h2>
            <p>
              A content strategy takes time but delivers constant organic
              traffic and qualified leads.
            </p>

            <div
              style="
                margin-top: 3rem;
                padding-top: 2rem;
                border-top: 2px solid #e5e7eb;
              "
            >
              <h3 style="margin-bottom: 1rem">Share this article</h3>
              <div style="display: flex; gap: 1rem; flex-wrap: wrap">
                <a
                  href="#"
                  class="btn btn-outline"
                  style="display: flex; align-items: center; gap: 0.5rem"
                >
                  <i class="fab fa-facebook-f"></i> Facebook
                </a>
                <a
                  href="#"
                  class="btn btn-outline"
                  style="display: flex; align-items: center; gap: 0.5rem"
                >
                  <i class="fab fa-twitter"></i> Twitter
                </a>
                <a
                  href="#"
                  class="btn btn-outline"
                  style="display: flex; align-items: center; gap: 0.5rem"
                >
                  <i class="fab fa-linkedin-in"></i> LinkedIn
                </a>
                <a
                  href="#"
                  class="btn btn-outline"
                  style="display: flex; align-items: center; gap: 0.5rem"
                >
                  <i class="fab fa-whatsapp"></i> WhatsApp
                </a>
              </div>
            </div>

            <div
              style="
                background: #f8f9fa;
                padding: 2rem;
                border-radius: 12px;
                margin-top: 3rem;
                display: flex;
                gap: 1.5rem;
                align-items: center;
              "
            >
              <div
                style="
                  width: 80px;
                  height: 80px;
                  border-radius: 50%;
                  background: linear-gradient(135deg, #fa709a 0%, #fee140 100%);
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  flex-shrink: 0;
                "
              >
                <i class="fas fa-user" style="color: white; font-size: 2rem"></i>
              </div>
              <div>
                <h4 style="margin-bottom: 0.5rem; color: var(--gray-900)">
                  About the author
                </h4>
                <p style="color: var(--gray-600); margin-bottom: 1rem">
                  <strong>M.G.N CodeWave</strong> helps Gabonese businesses
                  grow online with content and blogs.
                </p>
                <a href="../contact.html" class="btn btn-primary btn-sm">
                  Contact us
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    `,
    relatedHtml: `
      <div class="container">
        <h2
          style="
            font-size: 2rem;
            font-weight: 800;
            text-align: center;
            margin-bottom: 3rem;
          "
        >
          Related Articles
        </h2>
        <div
          style="
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 2rem;
          "
        >
          <article class="blog-card">
            <div class="blog-image">
              <img
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80"
                alt="SEO Gabon"
              />
              <span class="blog-tag">Advice</span>
            </div>
            <div class="blog-content">
              <h3 class="blog-title">Optimize your SEO in Gabon</h3>
              <p class="blog-excerpt">
                Local SEO best practices for Gabon...
              </p>
              <a href="optimiser-seo-gabon.html" class="read-more">
                Read more <i class="fas fa-arrow-right"></i>
              </a>
            </div>
          </article>

          <article class="blog-card">
            <div class="blog-image">
              <img
                src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=600&q=80"
                alt="Website reasons"
              />
              <span class="blog-tag">Tutorials</span>
            </div>
            <div class="blog-content">
              <h3 class="blog-title">10 reasons to create a website</h3>
              <p class="blog-excerpt">
                Why your business needs a website in 2025...
              </p>
              <a href="10-raisons-creer-site-web-gabon.html" class="read-more">
                Read more <i class="fas fa-arrow-right"></i>
              </a>
            </div>
          </article>

          <article class="blog-card">
            <div class="blog-image">
              <img
                src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=600&q=80"
                alt="Design trends"
              />
              <span class="blog-tag">News</span>
            </div>
            <div class="blog-content">
              <h3 class="blog-title">Web design trends 2025</h3>
              <p class="blog-excerpt">
                Trends shaping the year ahead...
              </p>
              <a href="tendances-web-design-2025.html" class="read-more">
                Read more <i class="fas fa-arrow-right"></i>
              </a>
            </div>
          </article>
        </div>
      </div>
    `,
  });
}

function translateBlogDesignTrends(lang) {
  applyBlogArticleTranslation(lang, {
    key: "blog-design-trends",
    meta: {
      title: "Web Design Trends in 2025: What to Expect | CodeWave",
      description:
        "Discover the web design trends that will dominate 2025: AI, minimalism, immersive animations, and more.",
      keywords:
        "web design trends 2025, modern web design, ux ui 2025, gabon design",
    },
    breadcrumb: { home: "Home", blog: "Blog", current: "Design Trends" },
    header: {
      badge: "Design News",
      title: "Web Design Trends in 2025: What to Expect",
      meta: ["By M.G.N CodeWave", "Dec 8, 2024", "7 min read", "News"],
    },
    articleHtml: `
      <div class="container">
        <div style="max-width: 800px; margin: 0 auto">
          <img
            src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80"
            alt="Web design trends 2025"
            style="
              width: 100%;
              border-radius: 12px;
              margin-bottom: 2rem;
              box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
            "
          />

          <div class="article-content">
            <p class="lead">
              Web design is evolving fast. In 2025, new trends redefine
              aesthetics and user experience. Here are 10 key trends.
            </p>

            <h2>1. AI and Personalization</h2>
            <p>Websites adapt in real time to visitor preferences.</p>
            <ul>
              <li>Smart chatbots</li>
              <li>Personalized recommendations</li>
              <li>Adaptive interfaces</li>
            </ul>

            <h2>2. Extreme Minimalism with Bold Typography</h2>
            <blockquote>
              "Simplicity is the ultimate sophistication." - Leonardo da Vinci
            </blockquote>

            <h2>3. Default Dark Mode</h2>
            <p>Dark mode is now a standard, not a feature.</p>
            <ul>
              <li>Lower eye strain</li>
              <li>Battery savings</li>
              <li>Premium look</li>
            </ul>

            <h2>4. Smooth Animations and Micro-interactions</h2>
            <ul>
              <li>Parallax effects</li>
              <li>Fluid page transitions</li>
              <li>Creative hover states</li>
            </ul>

            <h2>5. Immersive Full-Screen Video</h2>
            <p>Video replaces static hero sections for impact.</p>

            <h2>6. 3D and AR</h2>
            <ul>
              <li>Interactive 3D models</li>
              <li>Virtual try-ons</li>
              <li>Home previews for furniture</li>
            </ul>

            <h2>7. Vibrant Colors and Bold Gradients</h2>
            <p>Bright color palettes are back in 2025.</p>

            <h2>8. Mobile-First and PWA</h2>
            <p>Mobile-first is non-negotiable in Gabon.</p>

            <h2>9. Accessibility and Inclusion</h2>
            <ul>
              <li>Strong color contrast</li>
              <li>Keyboard navigation</li>
              <li>Alt text and captions</li>
            </ul>

            <h2>10. Green Web Design</h2>
            <ul>
              <li>Optimized images</li>
              <li>Lightweight code</li>
              <li>Green hosting</li>
            </ul>

            <div
              style="
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                padding: 2rem;
                border-radius: 12px;
                margin: 2rem 0;
                text-align: center;
              "
            >
              <h3 style="font-size: 1.5rem; margin-bottom: 1rem">
                Your Site Deserves a 2025 Design
              </h3>
              <p style="margin-bottom: 1rem">
                Get a modern, high-performing website with CodeWave.
              </p>
              <a
                href="../contact.html"
                style="
                  display: inline-block;
                  background: var(--surface);
                  color: #764ba2;
                  padding: 0.75rem 2rem;
                  border-radius: 8px;
                  font-weight: 600;
                  text-decoration: none;
                "
              >
                Modernize My Site
              </a>
            </div>

            <h2>Conclusion</h2>
            <p>
              2025 trends put users at the center with personalized, accessible,
              and eco-friendly experiences. Stay competitive by adopting them.
            </p>

            <div
              style="
                margin-top: 3rem;
                padding-top: 2rem;
                border-top: 2px solid #e5e7eb;
              "
            >
              <h3 style="margin-bottom: 1rem">Share this article</h3>
              <div style="display: flex; gap: 1rem; flex-wrap: wrap">
                <a
                  href="#"
                  class="btn btn-outline"
                  style="display: flex; align-items: center; gap: 0.5rem"
                >
                  <i class="fab fa-facebook-f"></i> Facebook
                </a>
                <a
                  href="#"
                  class="btn btn-outline"
                  style="display: flex; align-items: center; gap: 0.5rem"
                >
                  <i class="fab fa-twitter"></i> Twitter
                </a>
                <a
                  href="#"
                  class="btn btn-outline"
                  style="display: flex; align-items: center; gap: 0.5rem"
                >
                  <i class="fab fa-linkedin-in"></i> LinkedIn
                </a>
                <a
                  href="#"
                  class="btn btn-outline"
                  style="display: flex; align-items: center; gap: 0.5rem"
                >
                  <i class="fab fa-whatsapp"></i> WhatsApp
                </a>
              </div>
            </div>

            <div
              style="
                background: #f8f9fa;
                padding: 2rem;
                border-radius: 12px;
                margin-top: 3rem;
                display: flex;
                gap: 1.5rem;
                align-items: center;
              "
            >
              <div
                style="
                  width: 80px;
                  height: 80px;
                  border-radius: 50%;
                  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  flex-shrink: 0;
                "
              >
                <i class="fas fa-user" style="color: white; font-size: 2rem"></i>
              </div>
              <div>
                <h4 style="margin-bottom: 0.5rem; color: var(--gray-900)">
                  About the author
                </h4>
                <p style="color: var(--gray-600); margin-bottom: 1rem">
                  <strong>M.G.N CodeWave</strong> is a creative web agency
                  building modern, innovative designs for Gabonese businesses.
                </p>
                <a href="../contact.html" class="btn btn-primary btn-sm">
                  Contact us
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    `,
    relatedHtml: `
      <div class="container">
        <h2
          style="
            font-size: 2rem;
            font-weight: 800;
            text-align: center;
            margin-bottom: 3rem;
          "
        >
          Related Articles
        </h2>
        <div
          style="
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 2rem;
          "
        >
          <article class="blog-card">
            <div class="blog-image">
              <img
                src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=600&q=80"
                alt="Website reasons"
              />
              <span class="blog-tag">Advice</span>
            </div>
            <div class="blog-content">
              <h3 class="blog-title">10 reasons to create a website</h3>
              <p class="blog-excerpt">
                Why your business needs a website in 2025...
              </p>
              <a href="10-raisons-creer-site-web-gabon.html" class="read-more">
                Read more <i class="fas fa-arrow-right"></i>
              </a>
            </div>
          </article>

          <article class="blog-card">
            <div class="blog-image">
              <img
                src="https://images.unsplash.com/photo-1460925895917-adf4ee868993?auto=format&fit=crop&w=600&q=80"
                alt="Site speed"
              />
              <span class="blog-tag">Tutorials</span>
            </div>
            <div class="blog-content">
              <h3 class="blog-title">Improve site speed</h3>
              <p class="blog-excerpt">
                Boost performance with proven techniques...
              </p>
              <a href="vitesse-chargement-site-web.html" class="read-more">
                Read more <i class="fas fa-arrow-right"></i>
              </a>
            </div>
          </article>

          <article class="blog-card">
            <div class="blog-image">
              <img
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80"
                alt="SEO Gabon"
              />
              <span class="blog-tag">Advice</span>
            </div>
            <div class="blog-content">
              <h3 class="blog-title">Optimize your SEO in Gabon</h3>
              <p class="blog-excerpt">
                Local SEO best practices for Gabon...
              </p>
              <a href="optimiser-seo-gabon.html" class="read-more">
                Read more <i class="fas fa-arrow-right"></i>
              </a>
            </div>
          </article>
        </div>
      </div>
    `,
  });
}

function translateBlogSpeedGuide(lang) {
  applyBlogArticleTranslation(lang, {
    key: "blog-speed-guide",
    meta: {
      title: "Improve Your Website Loading Speed | CodeWave",
      description:
        "Complete guide to improve website loading speed and user experience.",
      keywords: "site speed, web performance, page speed, faster website",
    },
    breadcrumb: { home: "Home", blog: "Blog", current: "Site Speed" },
    header: {
      badge: "Performance",
      title: "Improve Your Website Loading Speed",
      meta: ["By M.G.N CodeWave", "Dec 1, 2024", "8 min read"],
    },
    articleHtml: `
      <div class="container">
        <div style="max-width: 800px; margin: 0 auto">
          <img
            src="https://images.unsplash.com/photo-1460925895917-adf4ee868993?auto=format&fit=crop&w=1200&q=80"
            alt="Website speed"
            style="
              width: 100%;
              border-radius: 12px;
              margin-bottom: 2rem;
              box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
            "
          />

          <div class="article-content">
            <p class="lead">
              Every second counts. A site that loads in 3 seconds can lose 40%
              of visitors. In Gabon, with variable connections, speed is
              essential.
            </p>

            <h2>Why Speed Matters</h2>
            <ul>
              <li>40% of users leave a slow site</li>
              <li>Google penalizes slow pages</li>
              <li>Mobile experience suffers</li>
              <li>Lower conversions</li>
            </ul>

            <h2>10 Techniques to Speed Up Your Site</h2>
            <h3>1. Compress Images</h3>
            <ul>
              <li>Use WebP</li>
              <li>Responsive images</li>
              <li>Compress with TinyPNG</li>
              <li>Use a CDN</li>
            </ul>

            <h3>2. Lazy Loading</h3>
            <p>Load images only when visible.</p>

            <h3>3. Minify CSS and JS</h3>
            <p>Remove unused spaces and code.</p>

            <h3>4. Use Caching</h3>
            <p>Cache static files for faster repeat loads.</p>

            <h3>5. Enable Gzip</h3>
            <p>Compress data in transit.</p>

            <h3>6. Reduce HTTP Requests</h3>
            <p>Combine files and remove unused assets.</p>

            <h3>7. Defer JavaScript</h3>
            <p>Use async and defer to avoid blocking rendering.</p>

            <h3>8. Use a CDN</h3>
            <p>Deliver assets from servers closer to users.</p>

            <h3>9. Optimize Database</h3>
            <p>Index columns and cache queries.</p>

            <h3>10. Choose Fast Hosting</h3>
            <p>Prefer managed VPS and SSD servers.</p>

            <h2>Tools to Measure Speed</h2>
            <ul>
              <li>Google PageSpeed Insights</li>
              <li>GTmetrix</li>
              <li>WebPageTest</li>
              <li>Lighthouse</li>
              <li>Pingdom</li>
            </ul>

            <div
              style="
                background: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%);
                color: var(--text);
                padding: 2rem;
                border-radius: 12px;
                margin: 2rem 0;
                text-align: center;
              "
            >
              <h3 style="font-size: 1.5rem; margin-bottom: 1rem">
                Is Your Site Fast Enough?
              </h3>
              <p style="margin-bottom: 1rem">
                Get a free speed audit with precise recommendations.
              </p>
              <a
                href="../contact.html"
                style="
                  display: inline-block;
                  background: var(--surface);
                  color: #fed6e3;
                  padding: 0.75rem 2rem;
                  border-radius: 8px;
                  font-weight: 600;
                  text-decoration: none;
                "
              >
                Free Audit Now
              </a>
            </div>

            <h2>Conclusion</h2>
            <p>
              Speed optimization is continuous. Test regularly, apply fixes
              progressively, and measure results.
            </p>

            <div
              style="
                margin-top: 3rem;
                padding-top: 2rem;
                border-top: 2px solid #e5e7eb;
              "
            >
              <h3 style="margin-bottom: 1rem">Share this article</h3>
              <div style="display: flex; gap: 1rem; flex-wrap: wrap">
                <a
                  href="#"
                  class="btn btn-outline"
                  style="display: flex; align-items: center; gap: 0.5rem"
                >
                  <i class="fab fa-facebook-f"></i> Facebook
                </a>
                <a
                  href="#"
                  class="btn btn-outline"
                  style="display: flex; align-items: center; gap: 0.5rem"
                >
                  <i class="fab fa-whatsapp"></i> WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    `,
  });
}

function applyPortfolioDetailsTranslation(lang, config) {
  const originalStore =
    window.portfolioOriginalContent || (window.portfolioOriginalContent = {});
  const key = config.key;
  const breadcrumb = document.querySelector(".page-header .breadcrumb");
  const headerTitle = document.querySelector(".page-header .page-title");
  const headerSubtitle = document.querySelector(".page-header .page-subtitle");
  const headerButtons = document.querySelectorAll(
    ".page-header a.btn, .page-header button.btn",
  );
  const card = document.querySelector("section.section-padding .card");

  if (!originalStore[key]) {
    originalStore[key] = {
      title: document.title,
      description: document
        .querySelector('meta[name="description"]')
        ?.getAttribute("content"),
      keywords: document
        .querySelector('meta[name="keywords"]')
        ?.getAttribute("content"),
      breadcrumbHtml: breadcrumb ? breadcrumb.innerHTML : null,
      headerTitle: headerTitle ? headerTitle.textContent : null,
      headerSubtitle: headerSubtitle ? headerSubtitle.textContent : null,
      headerButtons: Array.from(headerButtons).map((btn) => btn.innerHTML),
      cardHtml: card ? card.innerHTML : null,
    };
  }

  const original = originalStore[key];

  if (lang === "en") {
    document.title = config.meta.title;
    setMeta("description", config.meta.description);
    if (config.meta.keywords) setMeta("keywords", config.meta.keywords);

    if (breadcrumb) {
      const links = breadcrumb.querySelectorAll("a");
      const spans = breadcrumb.querySelectorAll("span");
      if (links[0]) links[0].textContent = config.breadcrumb.home;
      if (links[1]) links[1].textContent = config.breadcrumb.portfolio;
      if (spans.length)
        spans[spans.length - 1].textContent = config.breadcrumb.current;
    }
    if (headerTitle) headerTitle.textContent = config.header.title;
    if (headerSubtitle) headerSubtitle.textContent = config.header.subtitle;
    headerButtons.forEach((btn, index) => {
      if (config.header.buttons[index]) {
        btn.innerHTML = config.header.buttons[index];
      }
    });
    if (card && config.cardHtml) {
      card.innerHTML = config.cardHtml;
    }
  } else if (original) {
    document.title = original.title || document.title;
    if (original.description) setMeta("description", original.description);
    if (original.keywords) setMeta("keywords", original.keywords);
    if (breadcrumb && original.breadcrumbHtml !== null) {
      breadcrumb.innerHTML = original.breadcrumbHtml;
    }
    if (headerTitle && original.headerTitle) {
      headerTitle.textContent = original.headerTitle;
    }
    if (headerSubtitle && original.headerSubtitle) {
      headerSubtitle.textContent = original.headerSubtitle;
    }
    headerButtons.forEach((btn, index) => {
      if (original.headerButtons[index]) {
        btn.innerHTML = original.headerButtons[index];
      }
    });
    if (card && original.cardHtml !== null) {
      card.innerHTML = original.cardHtml;
    }
  }
}

function translatePortfolioApiAirtel(lang) {
  applyPortfolioDetailsTranslation(lang, {
    key: "portfolio-api-airtel",
    meta: {
      title: "Airtel Money API Documentation | Interactive Hub",
      description:
        "Airtel Money API documentation hub with guides, detailed endpoints, and integration examples.",
      keywords:
        "Airtel API, Airtel Money integration, API documentation gabon, mobile payments",
    },
    breadcrumb: {
      home: "Home",
      portfolio: "Portfolio",
      current: "Airtel Money API",
    },
    header: {
      title: "Airtel Money API Documentation",
      subtitle:
        "Interactive documentation hub for Airtel Money integration: guides, detailed endpoints, code samples, and resources.",
      buttons: ["View project", "Endpoint details"],
    },
    cardHtml: `
      <p
        style="
          color: var(--gray-700);
          line-height: 1.7;
          margin-bottom: 1.5rem;
        "
      >
        Interactive documentation hub built to simplify Airtel Money
        integration. Includes detailed guides, endpoint references with
        JavaScript and cURL examples, downloadable resources, and an API
        overview dashboard.
      </p>
      <h3 style="color: var(--gray-900); margin-bottom: 0.75rem">
        Features
      </h3>
      <ul
        style="
          color: var(--gray-700);
          line-height: 1.7;
          padding-left: 1.25rem;
          margin-bottom: 1.5rem;
        "
      >
        <li>Endpoint details with code samples</li>
        <li>Complete integration guide (README)</li>
        <li>JavaScript and cURL examples</li>
        <li>API recap table</li>
        <li>Downloadable resources (Excel)</li>
      </ul>
      <h3 style="color: var(--gray-900); margin-bottom: 0.75rem">Stack</h3>
      <div
        style="
          display: flex;
          flex-wrap: wrap;
          gap: 0.6rem;
          margin-bottom: 1.5rem;
        "
      >
        <span class="tag">Documentation</span>
        <span class="tag">API Reference</span>
        <span class="tag">HTML/CSS</span>
        <span class="tag">Interactive</span>
      </div>
      <div style="display: flex; flex-wrap: wrap; gap: 1rem">
        <a
          href="https://ngoubadjambo-richard.github.io/Documentation-API-Airtel/dashboard.html"
          class="btn btn-primary"
          target="_blank"
          rel="noopener"
        >
          Open dashboard
        </a>
        <a href="../portfolio.html" class="btn btn-outline">
          Back to portfolio
        </a>
      </div>
    `,
  });
}

function translatePortfolioBooki(lang) {
  applyPortfolioDetailsTranslation(lang, {
    key: "portfolio-booki",
    meta: {
      title: "Booki | Booking Platform",
      description:
        "Booki - Booking platform for accommodations and holiday activities in Marseille.",
      keywords: "booking platform, accommodation booking, holiday booking",
    },
    breadcrumb: { home: "Home", portfolio: "Portfolio", current: "Booki" },
    header: {
      title: "Booki - Accommodation Booking",
      subtitle:
        "Complete platform to find and book stays and holiday activities in Marseille with a responsive interface.",
      buttons: ["View project", "Explore"],
    },
    cardHtml: `
      <p
        style="
          color: var(--gray-700);
          line-height: 1.7;
          margin-bottom: 1.5rem;
        "
      >
        Booking platform that helps users find and reserve accommodations and
        activities in Marseille. Intuitive UI with advanced filters, smart
        search, and detailed listings with photos and descriptions.
      </p>
      <h3 style="color: var(--gray-900); margin-bottom: 0.75rem">
        Features
      </h3>
      <ul
        style="
          color: var(--gray-700);
          line-height: 1.7;
          padding-left: 1.25rem;
          margin-bottom: 1.5rem;
        "
      >
        <li>Advanced search system</li>
        <li>Multiple filters (budget, family, romantic)</li>
        <li>500+ accommodation listings</li>
        <li>Tourist activities gallery</li>
        <li>Fully responsive interface</li>
      </ul>
      <h3 style="color: var(--gray-900); margin-bottom: 0.75rem">Stack</h3>
      <div
        style="
          display: flex;
          flex-wrap: wrap;
          gap: 0.6rem;
          margin-bottom: 1.5rem;
        "
      >
        <span class="tag">HTML/CSS</span>
        <span class="tag">Responsive Design</span>
        <span class="tag">SEO</span>
        <span class="tag">Performance</span>
      </div>
      <div style="display: flex; flex-wrap: wrap; gap: 1rem">
        <a
          href="https://booki-projet.vercel.app/"
          class="btn btn-primary"
          target="_blank"
          rel="noopener"
        >
          Open platform
        </a>
        <a href="../portfolio.html" class="btn btn-outline">
          Back to portfolio
        </a>
      </div>
    `,
  });
}

function translatePortfolioDecouvre(lang) {
  applyPortfolioDetailsTranslation(lang, {
    key: "portfolio-decouvre",
    meta: {
      title: "Discover Who You Are | Self-Exploration Platform",
      description:
        "Discover Who You Are - Self-exploration platform with interactive personality tests and personalized resources.",
      keywords: "personality test, self exploration, personal development",
    },
    breadcrumb: {
      home: "Home",
      portfolio: "Portfolio",
      current: "Discover Who You Are",
    },
    header: {
      title: "Discover Who You Are",
      subtitle:
        "Complete self-exploration platform with interactive tests, personalized resources, and guidance to discover your true essence.",
      buttons: ["View project", "Start tests"],
    },
    cardHtml: `
      <p
        style="
          color: var(--gray-700);
          line-height: 1.7;
          margin-bottom: 1.5rem;
        "
      >
        Self-exploration platform designed to help users understand
        themselves better. Offers interactive personality tests, personalized
        resources, expert guides, and intuitive navigation to explore traits,
        preferences, and aspirations.
      </p>
      <h3 style="color: var(--gray-900); margin-bottom: 0.75rem">
        Features
      </h3>
      <ul
        style="
          color: var(--gray-700);
          line-height: 1.7;
          padding-left: 1.25rem;
          margin-bottom: 1.5rem;
        "
      >
        <li>Interactive personality tests</li>
        <li>Personalized resources based on results</li>
        <li>About page with detailed information</li>
        <li>Contact section and newsletter signup</li>
        <li>Responsive, user-friendly interface</li>
      </ul>
      <h3 style="color: var(--gray-900); margin-bottom: 0.75rem">Stack</h3>
      <div
        style="
          display: flex;
          flex-wrap: wrap;
          gap: 0.6rem;
          margin-bottom: 1.5rem;
        "
      >
        <span class="tag">HTML/CSS</span>
        <span class="tag">Vercel</span>
        <span class="tag">Responsive Design</span>
        <span class="tag">User Experience</span>
      </div>
      <div style="display: flex; flex-wrap: wrap; gap: 1rem">
        <a
          href="https://decouvre-qui-tu-es.vercel.app/"
          class="btn btn-primary"
          target="_blank"
          rel="noopener"
        >
          Open platform
        </a>
        <a href="../portfolio.html" class="btn btn-outline">
          Back to portfolio
        </a>
      </div>
    `,
  });
}

function translatePortfolioEnglishFunClub(lang) {
  applyPortfolioDetailsTranslation(lang, {
    key: "portfolio-english-fun-club",
    meta: {
      title: "English Fun Club | Learning Platform",
      description:
        "English Fun Club - Online English learning platform with interactive courses and native teachers.",
      keywords: "learn english, english courses, language learning platform",
    },
    breadcrumb: {
      home: "Home",
      portfolio: "Portfolio",
      current: "English Fun Club",
    },
    header: {
      title: "English Fun Club - Learning Platform",
      subtitle:
        "Complete online platform to master English with interactive courses, certified native teachers, and flexible learning.",
      buttons: ["View project", "Our courses"],
    },
    cardHtml: `
      <p
        style="
          color: var(--gray-700);
          line-height: 1.7;
          margin-bottom: 1.5rem;
        "
      >
        English learning platform offering an immersive and personalized
        experience. Interactive courses with certified native teachers,
        24/7 access, and programs tailored to all levels from beginner to
        advanced.
      </p>
      <h3 style="color: var(--gray-900); margin-bottom: 0.75rem">
        Features
      </h3>
      <ul
        style="
          color: var(--gray-700);
          line-height: 1.7;
          padding-left: 1.25rem;
          margin-bottom: 1.5rem;
        "
      >
        <li>Interactive courses for all levels</li>
        <li>Native and certified teachers</li>
        <li>24/7 access from any device</li>
        <li>Three course types (general, business, conversation)</li>
        <li>Flexible, personalized learning path</li>
      </ul>
      <h3 style="color: var(--gray-900); margin-bottom: 0.75rem">Stack</h3>
      <div
        style="
          display: flex;
          flex-wrap: wrap;
          gap: 0.6rem;
          margin-bottom: 1.5rem;
        "
      >
        <span class="tag">HTML/CSS</span>
        <span class="tag">JavaScript</span>
        <span class="tag">Responsive</span>
        <span class="tag">Vercel</span>
      </div>
      <div style="display: flex; flex-wrap: wrap; gap: 1rem">
        <a
          href="https://justin-patoki-site.vercel.app/index.html"
          class="btn btn-primary"
          target="_blank"
          rel="noopener"
        >
          Open platform
        </a>
        <a href="../portfolio.html" class="btn btn-outline">
          Back to portfolio
        </a>
      </div>
    `,
  });
}

function translatePortfolioProspects(lang) {
  applyPortfolioDetailsTranslation(lang, {
    key: "portfolio-prospects",
    meta: {
      title: "LMS Platform | Lead Management",
      description:
        "LMS platform with lead management, enrollment tracking, and analytics for online courses.",
      keywords: "lms platform, lead management, enrollment system",
    },
    breadcrumb: {
      home: "Home",
      portfolio: "Portfolio",
      current: "LMS Platform",
    },
    header: {
      title: "LMS Platform - Lead Management",
      subtitle:
        "Complete management system with interactive dashboard, secure authentication, and real-time lead tracking.",
      buttons: ["View project", "Sign in"],
    },
    cardHtml: `
      <p
        style="
          color: var(--gray-700);
          line-height: 1.7;
          margin-bottom: 1.5rem;
        "
      >
        Complete LMS platform built to manage leads, enrollments, and
        registrations for online training offers. Secure authentication,
        real-time dashboards, automated follow-ups, and advanced analytics to
        improve conversions.
      </p>
      <h3 style="color: var(--gray-900); margin-bottom: 0.75rem">
        Features
      </h3>
      <ul
        style="
          color: var(--gray-700);
          line-height: 1.7;
          padding-left: 1.25rem;
          margin-bottom: 1.5rem;
        "
      >
        <li>Secure authentication with password recovery</li>
        <li>Interactive dashboard with lead tracking</li>
        <li>Lead pipeline and conversion management</li>
        <li>Automated email follow-ups</li>
        <li>Advanced analytics and reporting</li>
      </ul>
      <h3 style="color: var(--gray-900); margin-bottom: 0.75rem">Stack</h3>
      <div
        style="
          display: flex;
          flex-wrap: wrap;
          gap: 0.6rem;
          margin-bottom: 1.5rem;
        "
      >
        <span class="tag">React</span>
        <span class="tag">Node.js/Backend</span>
        <span class="tag">Vercel</span>
        <span class="tag">Authentication</span>
      </div>
      <div style="display: flex; flex-wrap: wrap; gap: 1rem">
        <a
          href="https://gestion-des-prospects.vercel.app/login"
          class="btn btn-primary"
          target="_blank"
          rel="noopener"
        >
          Open platform
        </a>
        <a href="../portfolio.html" class="btn btn-outline">
          Back to portfolio
        </a>
      </div>
    `,
  });
}

function translatePortfolioGrace(lang) {
  applyPortfolioDetailsTranslation(lang, {
    key: "portfolio-grace",
    meta: {
      title: "Grace Deployee | Showcase Website",
      description:
        "Grace Deployee - Church website with events calendar, resources, ministries, and donation forms.",
      keywords: "church website, ministry platform, event calendar",
    },
    breadcrumb: {
      home: "Home",
      portfolio: "Portfolio",
      current: "Grace Deployee",
    },
    header: {
      title: "Grace Deployee - Showcase Website",
      subtitle:
        "Showcase website presenting the mission, events, and resources of a faith organization.",
      buttons: ["View project", "About"],
    },
    cardHtml: `
      <p
        style="
          color: var(--gray-700);
          line-height: 1.7;
          margin-bottom: 1.5rem;
        "
      >
        Complete website for Grace Deployee church presenting mission, events
        calendar, and ministries. Includes prayer groups, spiritual resources,
        and donation/registration forms to support the community.
      </p>
      <h3 style="color: var(--gray-900); margin-bottom: 0.75rem">
        Features
      </h3>
      <ul
        style="
          color: var(--gray-700);
          line-height: 1.7;
          padding-left: 1.25rem;
          margin-bottom: 1.5rem;
        "
      >
        <li>Mission and vision presentation</li>
        <li>Dynamic events calendar</li>
        <li>Ministry and prayer group sections</li>
        <li>Secure registration and donation forms</li>
        <li>Resource and spiritual content pages</li>
        <li>Responsive, mobile-optimized design</li>
      </ul>
      <h3 style="color: var(--gray-900); margin-bottom: 0.75rem">Stack</h3>
      <div
        style="
          display: flex;
          flex-wrap: wrap;
          gap: 0.6rem;
          margin-bottom: 1.5rem;
        "
      >
        <span class="tag">HTML/CSS</span>
        <span class="tag">JavaScript</span>
        <span class="tag">Vercel</span>
        <span class="tag">Responsive Design</span>
      </div>
      <div style="display: flex; flex-wrap: wrap; gap: 1rem">
        <a
          href="https://grace-deployee.vercel.app/"
          class="btn btn-primary"
          target="_blank"
          rel="noopener"
        >
          Visit site
        </a>
        <a href="../portfolio.html" class="btn btn-outline">
          Back to portfolio
        </a>
      </div>
    `,
  });
}

function translatePortfolioH2P(lang) {
  applyPortfolioDetailsTranslation(lang, {
    key: "portfolio-h2p",
    meta: {
      title: "H2P Group | Recruitment & Consulting Firm",
      description:
        "H2P Group - Recruitment, training, coaching, and consulting platform for professional performance.",
      keywords:
        "recruitment firm, hr consulting, professional coaching, training",
    },
    breadcrumb: { home: "Home", portfolio: "Portfolio", current: "H2P Group" },
    header: {
      title: "H2P Group - Recruitment & Consulting",
      subtitle:
        "Full platform for recruitment, training, coaching, and consulting with payroll and event services.",
      buttons: ["View project", "About"],
    },
    cardHtml: `
      <p
        style="
          color: var(--gray-700);
          line-height: 1.7;
          margin-bottom: 1.5rem;
        "
      >
        Complete digital platform for H2P Group, a firm specialized in
        recruitment, training, coaching, and consulting in Gabon. Showcases
        performance optimization services, payroll management, events, and
        tailored support for executives and businesses.
      </p>
      <h3 style="color: var(--gray-900); margin-bottom: 0.75rem">
        Features
      </h3>
      <ul
        style="
          color: var(--gray-700);
          line-height: 1.7;
          padding-left: 1.25rem;
          margin-bottom: 1.5rem;
        "
      >
        <li>6 key services (Recruitment, Training, Coaching, Consulting, Events, Payroll)</li>
        <li>Detailed solutions and methodology</li>
        <li>News and professional blog</li>
        <li>Contact form and appointment booking</li>
        <li>Conversion-optimized responsive design</li>
        <li>PDF resources and catalogs integration</li>
      </ul>
      <h3 style="color: var(--gray-900); margin-bottom: 0.75rem">Stack</h3>
      <div
        style="
          display: flex;
          flex-wrap: wrap;
          gap: 0.6rem;
          margin-bottom: 1.5rem;
        "
      >
        <span class="tag">HTML/CSS</span>
        <span class="tag">JavaScript</span>
        <span class="tag">GitHub Pages</span>
        <span class="tag">Responsive Design</span>
      </div>
      <div style="display: flex; flex-wrap: wrap; gap: 1rem">
        <a
          href="https://ngoubadjambo-richard.github.io/H2P-Gabon/index.html"
          class="btn btn-primary"
          target="_blank"
          rel="noopener"
        >
          Visit site
        </a>
        <a href="../portfolio.html" class="btn btn-outline">
          Back to portfolio
        </a>
      </div>
    `,
  });
}

function translatePortfolioLamp(lang) {
  applyPortfolioDetailsTranslation(lang, {
    key: "portfolio-lamp",
    meta: {
      title: "Edition Lampe a Mes Pieds | Publishing House & Store",
      description:
        "Edition Lampe a Mes Pieds - Publishing house and online bookstore with catalog, blog, coaching, and events.",
      keywords:
        "publishing house, online bookstore, book catalog, gabon publishing",
    },
    breadcrumb: {
      home: "Home",
      portfolio: "Portfolio",
      current: "Lampe a Mes Pieds",
    },
    header: {
      title: "Edition Lampe a Mes Pieds - Publishing House & Bookstore",
      subtitle:
        "Complete e-commerce platform with book catalog, cart system, blog, and customer area.",
      buttons: ["View project", "Catalog"],
    },
    cardHtml: `
      <p
        style="
          color: var(--gray-700);
          line-height: 1.7;
          margin-bottom: 1.5rem;
        "
      >
        Full e-commerce platform for Edition Lampe a Mes Pieds, a publishing
        house focused on spiritual and personal development books. Includes a
        dynamic cart, advanced catalog, customer area, blog, contact forms, and
        event management.
      </p>
      <h3 style="color: var(--gray-900); margin-bottom: 0.75rem">
        Features
      </h3>
      <ul
        style="
          color: var(--gray-700);
          line-height: 1.7;
          padding-left: 1.25rem;
          margin-bottom: 1.5rem;
        "
      >
        <li>Book catalog with images and descriptions</li>
        <li>Dynamic cart and order management</li>
        <li>Customer area and purchase history</li>
        <li>Blog with news and articles</li>
        <li>Event and coaching management</li>
        <li>Contact forms and inquiries</li>
      </ul>
      <h3 style="color: var(--gray-900); margin-bottom: 0.75rem">Stack</h3>
      <div
        style="
          display: flex;
          flex-wrap: wrap;
          gap: 0.6rem;
          margin-bottom: 1.5rem;
        "
      >
        <span class="tag">HTML/CSS</span>
        <span class="tag">JavaScript</span>
        <span class="tag">Vercel</span>
        <span class="tag">E-Commerce</span>
      </div>
      <div style="display: flex; flex-wrap: wrap; gap: 1rem">
        <a
          href="https://edition-lampe-a-mes-pieds.vercel.app/index.html"
          class="btn btn-primary"
          target="_blank"
          rel="noopener"
        >
          Visit bookstore
        </a>
        <a href="../portfolio.html" class="btn btn-outline">
          Back to portfolio
        </a>
      </div>
    `,
  });
}

function translatePortfolioLeBonWaz(lang) {
  applyPortfolioDetailsTranslation(lang, {
    key: "portfolio-lebonwaz",
    meta: {
      title: "Le Bon Waz | Digital & Logistics Ecosystem",
      description:
        "Le Bon Waz - Hybrid B2B/B2C ecosystem combining marketplace, mobility, and logistics in Gabon.",
      keywords: "marketplace gabon, digital ecosystem, logistics platform",
    },
    breadcrumb: { home: "Home", portfolio: "Portfolio", current: "Le Bon Waz" },
    header: {
      title: "Le Bon Waz - Digital & Logistics Ecosystem",
      subtitle:
        "Institutional platform connecting a digital marketplace, logistics, mobility, and solar energy to streamline B2B/B2C trade in Gabon.",
      buttons: ["View project", "Services"],
    },
    cardHtml: `
      <p
        style="
          color: var(--gray-700);
          line-height: 1.7;
          margin-bottom: 1.5rem;
        "
      >
        Innovative hybrid ecosystem combining a digital platform with
        on-the-ground operations to streamline B2B and B2C trade in Gabon.
        LeBonWaz integrates an intelligent marketplace (WAZ'UP), fleet
        management (LBW-MOBILITY), energy solutions (LBW-SOLAR), international
        sourcing (LBW-TRADE), and supporting services across the supply chain.
      </p>
      <h3 style="color: var(--gray-900); margin-bottom: 0.75rem">
        Features
      </h3>
      <ul
        style="
          color: var(--gray-700);
          line-height: 1.7;
          padding-left: 1.25rem;
          margin-bottom: 1.5rem;
        "
      >
        <li>Multi-actor marketplace with B2B/B2C sales and procurement</li>
        <li>Integrated fleet management and operational mobility</li>
        <li>Solar and hybrid energy solutions</li>
        <li>International sourcing and purchasing hub</li>
        <li>Urban delivery and logistics services</li>
        <li>Cross-services: IT, training, customer engagement</li>
      </ul>
      <h3 style="color: var(--gray-900); margin-bottom: 0.75rem">Stack</h3>
      <div
        style="
          display: flex;
          flex-wrap: wrap;
          gap: 0.6rem;
          margin-bottom: 1.5rem;
        "
      >
        <span class="tag">HTML/CSS</span>
        <span class="tag">JavaScript</span>
        <span class="tag">Vercel</span>
        <span class="tag">B2B/B2C</span>
      </div>
      <div style="display: flex; flex-wrap: wrap; gap: 1rem">
        <a
          href="https://le-bon-waz-institutionnel.vercel.app/index.html"
          class="btn btn-primary"
          target="_blank"
          rel="noopener"
        >
          Explore ecosystem
        </a>
        <a href="../portfolio.html" class="btn btn-outline">
          Back to portfolio
        </a>
      </div>
    `,
  });
}

function translatePortfolioMgnCodeWave(lang) {
  applyPortfolioDetailsTranslation(lang, {
    key: "portfolio-mgn-codewave",
    meta: {
      title: "M.G.N CodeWave | Web Agency Digital Solutions",
      description:
        "M.G.N CodeWave - Web agency specializing in showcase sites, e-commerce, and blogs. Affordable digital solutions in Gabon.",
      keywords:
        "web agency gabon, web development libreville, website creation",
    },
    breadcrumb: {
      home: "Home",
      portfolio: "Portfolio",
      current: "M.G.N CodeWave",
    },
    header: {
      title: "M.G.N CodeWave - Web Agency Digital Solutions",
      subtitle:
        "Official platform presenting the agency, its services, online quotes, and customer support.",
      buttons: ["View project", "Our Services"],
    },
    cardHtml: `
      <p
        style="
          color: var(--gray-700);
          line-height: 1.7;
          margin-bottom: 1.5rem;
        "
      >
        Official website of M.G.N CodeWave, a web agency in Gabon focused on
        high-performing websites. Includes services (showcase sites, e-commerce,
        blogs, maintenance, SEO), transparent pricing, portfolio references, and
        automated quote requests with 24/7 WhatsApp support.
      </p>
      <h3 style="color: var(--gray-900); margin-bottom: 0.75rem">
        Features
      </h3>
      <ul
        style="
          color: var(--gray-700);
          line-height: 1.7;
          padding-left: 1.25rem;
          margin-bottom: 1.5rem;
        "
      >
        <li>Presentation of 5 web services</li>
        <li>Transparent pricing and packages</li>
        <li>Portfolio with 15+ client references</li>
        <li>Automated online quote system</li>
        <li>Web tips and blog section</li>
        <li>24/7 support and careers page</li>
      </ul>
      <h3 style="color: var(--gray-900); margin-bottom: 0.75rem">Stack</h3>
      <div
        style="
          display: flex;
          flex-wrap: wrap;
          gap: 0.6rem;
          margin-bottom: 1.5rem;
        "
      >
        <span class="tag">HTML/CSS</span>
        <span class="tag">JavaScript</span>
        <span class="tag">Vercel</span>
        <span class="tag">Responsive Design</span>
      </div>
      <div style="display: flex; flex-wrap: wrap; gap: 1rem">
        <a
          href="https://mgncodewave-com.vercel.app/"
          class="btn btn-primary"
          target="_blank"
          rel="noopener"
        >
          Visit site
        </a>
        <a href="../portfolio.html" class="btn btn-outline">
          Back to portfolio
        </a>
      </div>
    `,
  });
}

function translatePortfolioRichard(lang) {
  applyPortfolioDetailsTranslation(lang, {
    key: "portfolio-richard",
    meta: {
      title: "Portfolio Richard | Personal Portfolio",
      description:
        "Richard's personal portfolio showcasing projects, skills, and professional journey.",
      keywords: "personal portfolio, web developer, projects, skills",
    },
    breadcrumb: {
      home: "Home",
      portfolio: "Portfolio",
      current: "Richard Portfolio",
    },
    header: {
      title: "Richard Portfolio",
      subtitle:
        "Modern personal portfolio highlighting projects, skills, and professional background.",
      buttons: ["View portfolio", "Back to portfolio"],
    },
    cardHtml: `
      <p
        style="
          color: var(--gray-700);
          line-height: 1.7;
          margin-bottom: 1.5rem;
        "
      >
        Personal portfolio designed to showcase a clear professional profile,
        recent projects, and technical skills. Focuses on readability, visual
        impact, and a smooth user journey.
      </p>
      <h3 style="color: var(--gray-900); margin-bottom: 0.75rem">
        Features
      </h3>
      <ul
        style="
          color: var(--gray-700);
          line-height: 1.7;
          padding-left: 1.25rem;
          margin-bottom: 1.5rem;
        "
      >
        <li>Intro section with value proposition</li>
        <li>Project gallery with CTAs</li>
        <li>Skills and tools section</li>
        <li>Professional journey and education</li>
        <li>Contact block and social links</li>
        <li>Responsive and performance-optimized design</li>
      </ul>
      <h3 style="color: var(--gray-900); margin-bottom: 0.75rem">Stack</h3>
      <div
        style="
          display: flex;
          flex-wrap: wrap;
          gap: 0.6rem;
          margin-bottom: 1.5rem;
        "
      >
        <span class="tag">HTML/CSS</span>
        <span class="tag">JavaScript</span>
        <span class="tag">Responsive Design</span>
        <span class="tag">GitHub Pages</span>
        <span class="tag">Portfolio</span>
      </div>
      <div style="display: flex; flex-wrap: wrap; gap: 1rem">
        <a
          href="https://ngoubadjambo-richard.github.io/Portfolio-Richard/"
          class="btn btn-primary"
          target="_blank"
          rel="noopener"
        >
          Visit site
        </a>
        <a href="../portfolio.html" class="btn btn-outline">
          Back to portfolio
        </a>
      </div>
    `,
  });
}

function translatePortfolioWazup(lang) {
  applyPortfolioDetailsTranslation(lang, {
    key: "portfolio-wazup",
    meta: {
      title: "Waz'UP | Flutter Super-App - Project Details",
      description:
        "Waz'UP - Flutter super-app combining e-commerce, delivery, and rentals.",
      keywords: "flutter super app, mobile app gabon, ecommerce delivery",
    },
    breadcrumb: { home: "Home", portfolio: "Portfolio", current: "Waz'UP" },
    header: {
      title: "Waz'UP - Flutter Super-App",
      subtitle:
        "Mobile super-app combining e-commerce, delivery, and rentals in one unified experience.",
      buttons: ["Case study (unavailable)", "Request more info"],
    },
    cardHtml: `
      <div
        style="
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 1.5rem;
          margin-bottom: 2rem;
        "
      >
        <div>
          <div
            style="
              color: var(--gray-500);
              font-weight: 600;
              font-size: 0.9rem;
            "
          >
            Client
          </div>
          <div style="font-weight: 800; color: var(--gray-900)">Waz'UP</div>
        </div>
        <div>
          <div
            style="
              color: var(--gray-500);
              font-weight: 600;
              font-size: 0.9rem;
            "
          >
            Deliverable
          </div>
          <div style="font-weight: 800; color: var(--gray-900)">
            Flutter mobile application
          </div>
        </div>
        <div>
          <div
            style="
              color: var(--gray-500);
              font-weight: 600;
              font-size: 0.9rem;
            "
          >
            Role
          </div>
          <div style="font-weight: 800; color: var(--gray-900)">
            Product design & Dev
          </div>
        </div>
      </div>

      <p
        style="
          color: var(--gray-700);
          line-height: 1.7;
          margin-bottom: 1.5rem;
        "
      >
        Design and development of a Flutter super-app combining e-commerce,
        delivery, and rentals. Unified user journey, secure payments, logistics
        back-office, and business dashboards to manage operations.
      </p>

      <div style="margin-bottom: 1.5rem">
        <h3 style="color: var(--gray-900); margin-bottom: 0.75rem">
          Key features
        </h3>
        <ul
          style="
            color: var(--gray-700);
            line-height: 1.7;
            padding-left: 1.25rem;
          "
        >
          <li>Dynamic catalog with search and filters</li>
          <li>Delivery module with real-time tracking</li>
          <li>Wallet, mobile payments, and cards</li>
          <li>Seller, rental, and booking space</li>
          <li>Push notifications and message center</li>
        </ul>
      </div>

      <div style="margin-bottom: 1.5rem">
        <h3 style="color: var(--gray-900); margin-bottom: 0.75rem">
          Stack & tools
        </h3>
        <div style="display: flex; flex-wrap: wrap; gap: 0.6rem">
          <span class="tag">Flutter</span>
          <span class="tag">Firebase</span>
          <span class="tag">Node.js</span>
          <span class="tag">Stripe / Mobile Money</span>
          <span class="tag">Design System</span>
        </div>
      </div>

      <div
        style="
          padding: 1.5rem;
          background-color: #fef3c7;
          border-left: 4px solid #f59e0b;
          border-radius: 0.5rem;
          margin-bottom: 1.5rem;
        "
      >
        <p style="color: #92400e; font-weight: 600; margin: 0">
          The project link is currently unavailable. We are working to make it
          accessible soon.
        </p>
      </div>

      <div style="display: flex; flex-wrap: wrap; gap: 1rem; margin-top: 1rem">
        <button
          class="btn btn-primary"
          disabled
          style="opacity: 0.6; cursor: not-allowed"
          title="Project currently unavailable"
        >
          View case study (unavailable)
        </button>
        <a href="../portfolio.html" class="btn btn-outline">
          Back to portfolio
        </a>
      </div>
    `,
  });
}

function translateContact(lang) {
  const data = {
    fr: {
      meta: {
        title: "Contact - CodeWave | Devis Gratuit en 24h",
        description:
          "Contactez CodeWave pour votre projet web. Devis gratuit en 24h. Telephone, Email, WhatsApp disponibles.",
        keywords:
          "contact codewave, devis site web gabon, developpeur web gabon, agence web gabon",
      },
      breadcrumb: { home: "Accueil", current: "Contact" },
      pageTitle: "Contactez-Nous",
      pageSubtitle: "Parlons de votre projet. Reponse garantie en moins de 24h",
      reachTitle: "Comment Nous Joindre ?",
      reachSubtitle:
        "Choisissez le moyen de communication qui vous convient le mieux",
      contactCards: [
        {
          title: "Email",
          note: "Reponse sous 24h garantie",
        },
        {
          title: "WhatsApp / Telephone",
          note: "Lun - Sam, 8h - 20h",
        },
        {
          title: "Localisation",
          note: "Service disponible dans tout le Gabon",
        },
        {
          title: "Site Web",
          note: "Portfolio en ligne",
        },
      ],
      offer: {
        title: "Offre de lancement",
        intro: "Les 10 premiers clients beneficient de :",
        perks: [
          "-15% sur tous les packs",
          "Logo offert (35 000 FCFA)",
          "1 mois maintenance gratuite",
        ],
        urgency: "Plus que 3 places disponibles !",
      },
      form: {
        title: "Formulaire de Demande de Devis",
        labels: {
          name: "Nom Complet *",
          email: "Email *",
          phone: "Telephone / WhatsApp *",
          project: "Type de Projet *",
          budget: "Budget Prevu",
          deadline: "Delai Souhaite",
          message: "Decrivez Votre Projet *",
        },
        placeholders: {
          name: "Votre nom complet",
          email: "votre@email.com",
          phone: "+241 XX XX XX XX",
          message:
            "Parlez-nous de votre projet, vos objectifs, vos besoins specifiques, ce que vous aimeriez inclure sur votre site...",
        },
        projectOptions: [
          "-- Choisissez un type --",
          "Site Vitrine - Pack Basic (100 000 FCFA)",
          "Site Vitrine - Pack Pro (200 000 FCFA)",
          "E-Commerce - Pack Start-Up (300 000 FCFA)",
          "E-Commerce - Pack Business (500 000 FCFA)",
          "Blog/Portfolio - Pack Starter (80 000 FCFA)",
          "Blog/Portfolio - Pack Premium (150 000 FCFA)",
          "Refonte de Site Existant (a partir de 80 000 FCFA)",
          "Optimisation SEO (50 000 FCFA)",
          "Maintenance Mensuelle (15 000 FCFA/mois)",
          "Autre (Preciser dans le message)",
        ],
        budgetOptions: [
          "-- Selectionnez votre budget --",
          "50 000 - 100 000 FCFA",
          "100 000 - 200 000 FCFA",
          "200 000 - 300 000 FCFA",
          "300 000 - 500 000 FCFA",
          "Plus de 500 000 FCFA",
          "Budget flexible",
        ],
        deadlineOptions: [
          "-- Quand souhaitez-vous demarrer ? --",
          "Urgent (Sous 1 semaine)",
          "Dans 2 semaines",
          "Dans 1 mois",
          "Flexible",
        ],
        consentHtml:
          'J\'accepte d\'etre contacte par CodeWave concernant ma demande et j\'ai lu la <a href="politique-confidentialite.html" style="color: var(--primary)">politique de confidentialite</a>',
        submitHtml: 'Envoyer Ma Demande <i class="fas fa-paper-plane"></i>',
        note: "Reponse garantie sous 24h • Vos donnees sont securisees",
      },
      quickContact: {
        title: "Besoin d'une Reponse Immediate ?",
        text: "Contactez-nous directement sur WhatsApp pour une discussion rapide",
        cta: "Discuter sur WhatsApp",
        availability: "Disponible Lun - Sam, 8h - 20h",
      },
      faq: {
        title: "Questions Frequentes",
        items: [
          {
            q: "Combien de temps pour recevoir un devis ?",
            a: "Vous recevrez votre devis personnalise sous 24 heures maximum apres l'envoi de votre demande.",
          },
          {
            q: "Le devis est-il gratuit et sans engagement ?",
            a: "Oui, le devis est 100% gratuit et sans aucun engagement. Vous etes libre de comparer et de choisir.",
          },
          {
            q: "Puis-je payer en plusieurs fois ?",
            a: "Oui ! Nous proposons un paiement en 2 ou 3 fois sans frais pour tous les packs a partir de 150 000 FCFA.",
          },
        ],
      },
    },
    en: {
      meta: {
        title: "Contact - CodeWave | Free Quote in 24h",
        description:
          "Contact CodeWave for your web project. Free quote in 24h. Phone, Email, WhatsApp available.",
        keywords:
          "contact codewave, website quote gabon, web developer gabon, web agency gabon",
      },
      breadcrumb: { home: "Home", current: "Contact" },
      pageTitle: "Contact Us",
      pageSubtitle: "Let's talk about your project. Reply within 24h",
      reachTitle: "How to Reach Us?",
      reachSubtitle: "Choose the communication channel that suits you best",
      contactCards: [
        {
          title: "Email",
          note: "Reply within 24h guaranteed",
        },
        {
          title: "WhatsApp / Phone",
          note: "Mon - Sat, 8am - 8pm",
        },
        {
          title: "Location",
          note: "Service available across Gabon",
        },
        {
          title: "Website",
          note: "Online portfolio",
        },
      ],
      offer: {
        title: "Launch offer",
        intro: "The first 10 clients get:",
        perks: [
          "-15% on all packages",
          "Free logo (35,000 FCFA)",
          "1 month free maintenance",
        ],
        urgency: "Only 3 spots left!",
      },
      form: {
        title: "Quote Request Form",
        labels: {
          name: "Full Name *",
          email: "Email *",
          phone: "Phone / WhatsApp *",
          project: "Project Type *",
          budget: "Planned Budget",
          deadline: "Desired Timeline",
          message: "Describe Your Project *",
        },
        placeholders: {
          name: "Your full name",
          email: "your@email.com",
          phone: "+241 XX XX XX XX",
          message:
            "Tell us about your project, goals, specific needs, and what you'd like to include on your site...",
        },
        projectOptions: [
          "-- Choose a type --",
          "Showcase site - Basic Pack (100,000 FCFA)",
          "Showcase site - Pro Pack (200,000 FCFA)",
          "E-Commerce - Start-Up Pack (300,000 FCFA)",
          "E-Commerce - Business Pack (500,000 FCFA)",
          "Blog/Portfolio - Starter Pack (80,000 FCFA)",
          "Blog/Portfolio - Premium Pack (150,000 FCFA)",
          "Existing site redesign (from 80,000 FCFA)",
          "SEO Optimization (50,000 FCFA)",
          "Monthly Maintenance (15,000 FCFA/month)",
          "Other (Specify in message)",
        ],
        budgetOptions: [
          "-- Select your budget --",
          "50,000 - 100,000 FCFA",
          "100,000 - 200,000 FCFA",
          "200,000 - 300,000 FCFA",
          "300,000 - 500,000 FCFA",
          "More than 500,000 FCFA",
          "Flexible budget",
        ],
        deadlineOptions: [
          "-- When do you want to start? --",
          "Urgent (Within 1 week)",
          "In 2 weeks",
          "In 1 month",
          "Flexible",
        ],
        consentHtml:
          'I agree to be contacted by CodeWave about my request and I have read the <a href="politique-confidentialite.html" style="color: var(--primary)">privacy policy</a>',
        submitHtml: 'Send My Request <i class="fas fa-paper-plane"></i>',
        note: "Reply within 24h • Your data is secure",
      },
      quickContact: {
        title: "Need an Immediate Answer?",
        text: "Contact us directly on WhatsApp for a quick discussion",
        cta: "Chat on WhatsApp",
        availability: "Available Mon - Sat, 8am - 8pm",
      },
      faq: {
        title: "Frequently Asked Questions",
        items: [
          {
            q: "How long does it take to receive a quote?",
            a: "You will receive your personalized quote within 24 hours of submitting your request.",
          },
          {
            q: "Is the quote free and without commitment?",
            a: "Yes, the quote is 100% free with no obligation. You are free to compare and decide.",
          },
          {
            q: "Can I pay in installments?",
            a: "Yes! We offer 2 or 3 installments at no extra cost for packages starting at 150,000 FCFA.",
          },
        ],
      },
    },
  };

  const t = data[lang];
  if (!t) return;

  document.title = t.meta.title;
  setMeta("description", t.meta.description);
  setMeta("keywords", t.meta.keywords);

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

  const reachHeader = document.querySelector(
    'div[style*="max-width: 48rem"] h2',
  );
  if (reachHeader) reachHeader.textContent = t.reachTitle;
  const reachText = document.querySelector('div[style*="max-width: 48rem"] p');
  if (reachText) reachText.textContent = t.reachSubtitle;

  const contactCards = document.querySelectorAll(".contact-info-card");
  contactCards.forEach((card, index) => {
    const dataItem = t.contactCards[index];
    if (!dataItem) return;
    const title = card.querySelector("h4");
    const note = card.querySelector("small");
    if (title) title.textContent = dataItem.title;
    if (note) note.textContent = dataItem.note;
  });

  const offerContainer = document.querySelector(
    'div[style*="border: 2px solid var(--primary)"]',
  );
  if (offerContainer) {
    const title = offerContainer.querySelector("h3");
    const intro = offerContainer.querySelector("p");
    const perks = offerContainer.querySelectorAll(
      'div[style*="align-items: center"] span',
    );
    const urgency = offerContainer.querySelector(
      'p[style*="color: var(--warning)"]',
    );
    if (title) title.textContent = t.offer.title;
    if (intro) intro.textContent = t.offer.intro;
    perks.forEach((perk, index) => {
      if (t.offer.perks[index]) perk.textContent = t.offer.perks[index];
    });
    if (urgency) urgency.textContent = t.offer.urgency;
  }

  const formTitle = document.querySelector(".contact-form h3");
  if (formTitle) formTitle.textContent = t.form.title;

  const labelMap = {
    nom: t.form.labels.name,
    email: t.form.labels.email,
    telephone: t.form.labels.phone,
    typeProjet: t.form.labels.project,
    budget: t.form.labels.budget,
    delai: t.form.labels.deadline,
    message: t.form.labels.message,
  };
  Object.keys(labelMap).forEach((id) => {
    const label = document.querySelector(`label[for="${id}"]`);
    if (label) label.textContent = labelMap[id];
  });

  setAttr("#nom", "placeholder", t.form.placeholders.name);
  setAttr("#email", "placeholder", t.form.placeholders.email);
  setAttr("#telephone", "placeholder", t.form.placeholders.phone);
  setAttr("#message", "placeholder", t.form.placeholders.message);

  const projectSelect = document.querySelector("#typeProjet");
  if (projectSelect) {
    const options = projectSelect.querySelectorAll("option");
    t.form.projectOptions.forEach((label, index) => {
      if (options[index]) options[index].textContent = label;
    });
  }

  const budgetSelect = document.querySelector("#budget");
  if (budgetSelect) {
    const options = budgetSelect.querySelectorAll("option");
    t.form.budgetOptions.forEach((label, index) => {
      if (options[index]) options[index].textContent = label;
    });
  }

  const deadlineSelect = document.querySelector("#delai");
  if (deadlineSelect) {
    const options = deadlineSelect.querySelectorAll("option");
    t.form.deadlineOptions.forEach((label, index) => {
      if (options[index]) options[index].textContent = label;
    });
  }

  const consent = document.querySelector('label input[type="checkbox"]');
  if (consent) {
    const consentText = consent.parentElement.querySelector("span");
    if (consentText) consentText.innerHTML = t.form.consentHtml;
  }

  const submitButton = document.querySelector('button[type="submit"]');
  if (submitButton) submitButton.innerHTML = t.form.submitHtml;

  const formNote = document.querySelector(".form-note");
  if (formNote) formNote.textContent = t.form.note;

  const quickSection = document.querySelector(
    'div[style*="border-radius: var(--radius-2xl); color: white; text-align: center"]',
  );
  if (quickSection) {
    const title = quickSection.querySelector("h3");
    const text = quickSection.querySelector("p");
    const button = quickSection.querySelector("a.btn");
    const note = quickSection.querySelector('p[style*="opacity: 0.8"]');
    if (title) title.textContent = t.quickContact.title;
    if (text) text.textContent = t.quickContact.text;
    if (button) {
      const icon = button.querySelector("i");
      button.innerHTML = icon
        ? `${icon.outerHTML} ${t.quickContact.cta}`
        : t.quickContact.cta;
    }
    if (note) note.textContent = t.quickContact.availability;
  }

  const faqGrid = document.querySelector(
    'div[style*="display: grid"][style*="gap: 1rem"]',
  );
  if (faqGrid) {
    const faqTitle = faqGrid.previousElementSibling;
    if (faqTitle && faqTitle.tagName.toLowerCase() === "h3") {
      faqTitle.textContent = t.faq.title;
    }
  }
  const faqCards = document.querySelectorAll(
    'div[style*="box-shadow: var(--shadow-md)"] h4',
  );
  const faqAnswers = document.querySelectorAll(
    'div[style*="box-shadow: var(--shadow-md)"] p',
  );
  t.faq.items.forEach((item, index) => {
    const heading = faqCards[index];
    const answer = faqAnswers[index];
    if (heading) {
      const icon = heading.querySelector("i");
      heading.innerHTML = icon ? `${icon.outerHTML} ${item.q}` : item.q;
    }
    if (answer) answer.textContent = item.a;
  });
}

function translateAbout(lang) {
  const data = {
    fr: {
      meta: {
        title: "A propos - CodeWave | Qui sommes-nous ?",
        description:
          "A propos de CodeWave - Agence de developpement web basee a Libreville, Gabon. Notre mission, nos valeurs et notre equipe creative.",
      },
      breadcrumb: { home: "Accueil", current: "A propos" },
      pageTitle: "A propos de CodeWave",
      pageSubtitle:
        "Votre partenaire digital de confiance au Gabon depuis 2025",
      story: {
        title: "Notre Histoire",
        paragraphs: [
          "M.G.N CodeWave est nee d'une passion commune : transformer les idees en realites numeriques. Fondee en 2025 a Libreville, notre agence a pour mission de participer a la digitalisation du Gabon.",
          "Nous croyons que chaque entreprise, qu'elle soit start-up ou PME, merite une presence digitale de qualite professionnelle. C'est pourquoi nous nous engageons a creer des solutions web qui non seulement impressionnent visuellement, mais generent egalement des resultats concrets.",
          "Avec une equipe de developpeurs, designers et strateges experimentes, nous travaillons chaque jour pour redefinir les standards du web au Gabon.",
        ],
      },
      video: {
        title: "Decouvrez CodeWave en video",
        subtitle:
          "Une presentation complete de notre agence, nos services et notre engagement envers l'excellence",
        features: [
          {
            title: "Video professionnelle",
            text: "Presentation complete de nos services",
          },
          {
            title: "Notre equipe",
            text: "Rencontrez les experts derriere vos projets",
          },
          {
            title: "Nos realisations",
            text: "Decouvrez nos projets web innovants",
          },
          {
            title: "Notre approche",
            text: "Une methodologie centree sur vos besoins",
          },
        ],
      },
      values: {
        title: "Nos Valeurs Fondamentales",
        subtitle:
          "Ces principes guident chaque decision et chaque projet que nous entreprenons",
        cards: [
          {
            title: "Innovation",
            text: "Nous explorons constamment les dernieres technologies et tendances pour offrir des solutions avant-gardistes.",
          },
          {
            title: "Integrite",
            text: "Nous honorons nos engagements avec transparence et honnetete. Votre confiance est notre atout le plus precieux.",
          },
          {
            title: "Excellence",
            text: "Nous ne nous contentons jamais du minimum. Chaque projet recoit notre meilleur effort et notre attention particuliere.",
          },
          {
            title: "Passion",
            text: "Nous aimons ce que nous faisons. Cette passion se reflete dans chaque ligne de code et chaque pixel de design.",
          },
          {
            title: "Collaboration",
            text: "Nous travaillons en etroite collaboration avec nos clients pour comprendre et depasser leurs attentes.",
          },
          {
            title: "Impact Local",
            text: "Nous sommes fiers de contribuer au developpement numerique du Gabon et de creer des emplois pour les talents locaux.",
          },
        ],
      },
      team: {
        title: "Notre equipe creative",
        subtitle:
          "Des experts passionnes reunis pour transformer vos projets en succes",
        role: "Lead Developer",
        bio: "Fondateur et dirigeant de M.G.N CodeWave, j'allie vision entrepreneuriale et expertise technique pour creer des solutions digitales innovantes et performantes.",
      },
      stats: [
        "Projets realises",
        "Clients satisfaits",
        "Annees d'experience",
        "Satisfaction client",
      ],
      cta: {
        title: "Pret a demarrer votre projet ?",
        text: "Contactez-nous aujourd'hui pour discuter de vos besoins et decouvrir comment CodeWave peut transformer votre vision en realite.",
        primary: "Demander un Devis",
        secondary: "Voir nos realisations",
      },
    },
    en: {
      meta: {
        title: "About - CodeWave | Who we are",
        description:
          "About CodeWave - Web development agency based in Libreville, Gabon. Our mission, values and creative team.",
      },
      breadcrumb: { home: "Home", current: "About" },
      pageTitle: "About CodeWave",
      pageSubtitle: "Your trusted digital partner in Gabon since 2025",
      story: {
        title: "Our Story",
        paragraphs: [
          "M.G.N CodeWave was born from a shared passion: turning ideas into digital realities. Founded in 2025 in Libreville, our agency helps drive Gabon's digital transformation.",
          "We believe every business, whether a start-up or SME, deserves a professional digital presence. That is why we craft web solutions that are visually impressive and deliver concrete results.",
          "With a team of experienced developers, designers, and strategists, we work every day to redefine web standards in Gabon.",
        ],
      },
      video: {
        title: "Discover CodeWave on video",
        subtitle:
          "A complete presentation of our agency, services and commitment to excellence",
        features: [
          {
            title: "Professional video",
            text: "Full presentation of our services",
          },
          {
            title: "Our team",
            text: "Meet the experts behind your projects",
          },
          {
            title: "Our work",
            text: "Discover our innovative web projects",
          },
          {
            title: "Our approach",
            text: "A methodology centered on your needs",
          },
        ],
      },
      values: {
        title: "Our Core Values",
        subtitle: "These principles guide every decision and every project",
        cards: [
          {
            title: "Innovation",
            text: "We constantly explore the latest technologies and trends to deliver forward-looking solutions.",
          },
          {
            title: "Integrity",
            text: "We honor our commitments with transparency and honesty. Your trust is our most valuable asset.",
          },
          {
            title: "Excellence",
            text: "We never settle for the minimum. Every project receives our best effort and dedicated attention.",
          },
          {
            title: "Passion",
            text: "We love what we do. That passion shows in every line of code and every pixel of design.",
          },
          {
            title: "Collaboration",
            text: "We work closely with our clients to understand and exceed their expectations.",
          },
          {
            title: "Local Impact",
            text: "We are proud to contribute to Gabon's digital development and create opportunities for local talent.",
          },
        ],
      },
      team: {
        title: "Our creative team",
        subtitle:
          "Passionate experts united to turn your projects into success",
        role: "Lead Developer",
        bio: "Founder and director of M.G.N CodeWave, I combine entrepreneurial vision and technical expertise to build innovative, high-performing digital solutions.",
      },
      stats: [
        "Projects delivered",
        "Happy clients",
        "Years of experience",
        "Client satisfaction",
      ],
      cta: {
        title: "Ready to start your project?",
        text: "Contact us today to discuss your needs and discover how CodeWave can turn your vision into reality.",
        primary: "Request a Quote",
        secondary: "See our work",
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

  setText(".story-title", t.story.title);
  document.querySelectorAll(".story-text p").forEach((paragraph, index) => {
    if (t.story.paragraphs[index]) {
      paragraph.textContent = t.story.paragraphs[index];
    }
  });

  const videoSection = Array.from(
    document.querySelectorAll("section.section-padding"),
  ).find((section) =>
    section.querySelector('iframe[src*="CodeWave-Presentation"]'),
  );
  if (videoSection) {
    const header = videoSection.querySelector(
      "div[style*='text-align: center']",
    );
    if (header) {
      const title = header.querySelector("h2");
      const subtitle = header.querySelector("p");
      if (title) title.textContent = t.video.title;
      if (subtitle) subtitle.textContent = t.video.subtitle;
    }
    const featureBlocks = videoSection.querySelectorAll(
      'div[style*="text-align: center; color: white"]',
    );
    featureBlocks.forEach((block, index) => {
      const dataItem = t.video.features[index];
      if (!dataItem) return;
      const title = block.querySelector("h4");
      const text = block.querySelector("p");
      if (title) title.textContent = dataItem.title;
      if (text) text.textContent = dataItem.text;
    });
  }

  const lightSections = document.querySelectorAll(
    "section.section-padding.bg-light",
  );
  const valuesSection = lightSections[0];
  if (valuesSection) {
    const header = valuesSection.querySelector(
      'div[style*="margin-bottom: 4rem"]',
    );
    if (header) {
      const title = header.querySelector("h2");
      const subtitle = header.querySelector("p");
      if (title) title.textContent = t.values.title;
      if (subtitle) subtitle.textContent = t.values.subtitle;
    }
    valuesSection.querySelectorAll(".value-card").forEach((card, index) => {
      const dataItem = t.values.cards[index];
      if (!dataItem) return;
      const title = card.querySelector("h3");
      const text = card.querySelector("p");
      if (title) title.textContent = dataItem.title;
      if (text) text.textContent = dataItem.text;
    });
  }

  const teamSection = document.querySelector(".team-card")?.closest("section");
  if (teamSection) {
    const header = teamSection.querySelector(
      'div[style*="margin-bottom: 4rem"]',
    );
    if (header) {
      const title = header.querySelector("h2");
      const subtitle = header.querySelector("p");
      if (title) title.textContent = t.team.title;
      if (subtitle) subtitle.textContent = t.team.subtitle;
    }
    const teamCard = teamSection.querySelector(".team-card");
    if (teamCard) {
      const role = teamCard.querySelector("h3");
      const bio = teamCard.querySelector("p");
      if (role) role.textContent = t.team.role;
      if (bio) bio.textContent = t.team.bio;
    }
  }

  const statsSection = Array.from(
    document.querySelectorAll("section.section-padding"),
  ).find(
    (section) =>
      section.querySelectorAll(
        'div[style*="font-size: 3rem; font-weight: 800"]',
      ).length === 4,
  );
  if (statsSection) {
    const labels = statsSection.querySelectorAll("p");
    labels.forEach((label, index) => {
      if (t.stats[index]) label.textContent = t.stats[index];
    });
  }

  const ctaSection = lightSections[lightSections.length - 1];
  if (ctaSection) {
    const title = ctaSection.querySelector("h2");
    const text = ctaSection.querySelector("p");
    const buttons = ctaSection.querySelectorAll("a.btn");
    if (title) title.textContent = t.cta.title;
    if (text) text.textContent = t.cta.text;
    if (buttons[0]) buttons[0].textContent = t.cta.primary;
    if (buttons[1]) buttons[1].textContent = t.cta.secondary;
  }
}

function translateCareers(lang) {
  const data = {
    fr: {
      meta: {
        title: "Recrutement - CodeWave | Rejoignez notre equipe",
        description:
          "Rejoignez CodeWave - Offres d'emploi developpement web au Gabon. Developpeurs, designers, commerciaux recherches.",
      },
      breadcrumb: { home: "Accueil", current: "Recrutement" },
      pageTitle: "Rejoignez notre equipe",
      pageSubtitle: "Construisons ensemble le futur digital du Gabon",
      intro: {
        title: "CodeWave recrute des talents gabonais !",
        textHtml:
          "Nous sommes une <strong>Start-up Web en creation</strong> basee a Libreville. Notre mission : <strong>Digitaliser les entreprises gabonaises avec solutions web performantes.</strong> Nous cherchons des talents motives et autonomes, prets a grandir avec nous grace a un modele base sur le partage des profits des projets realises.",
        highlights: [
          "Postes selon projets",
          "Libreville, Gabon",
          "Freelance & Partenariat",
        ],
      },
      benefits: {
        title: "Pourquoi rejoindre CodeWave ?",
        subtitle: "Ce que nous offrons a nos collaborateurs",
        cards: [
          {
            title: "Remuneration au partage",
            text: "% du chiffre d'affaires des projets realises. Potentiel illimite",
          },
          {
            title: "Teletravail 100%",
            text: "Travail a distance complete. Soyez productif d'ou vous voulez",
          },
          {
            title: "Apprentissage reel",
            text: "Travaillez sur de vrais projets clients. Competences garanties",
          },
          {
            title: "Partenariat equitable",
            text: "Croissance ensemble. Votre succes est notre succes",
          },
          {
            title: "Equipe start-up",
            text: "Esprit entrepreneurial, environnement jeune et motivant",
          },
          {
            title: "Projets reels",
            text: "Diversite de missions. Portfolio qui grandit rapidement",
          },
        ],
      },
      jobs: {
        title: "Postes ouverts",
        subtitle: "Cliquez sur une offre pour voir les details et postuler",
        cards: [
          {
            title: "Developpeur full-stack (React/Node.js)",
            desc: "Developpez des applications web modernes pour nos clients gabonais",
            tags: ["Freelance", "Teletravail", "Flexible", "Bac+3 minimum"],
            salary: "% du CA par projet",
            details: "Voir les details",
          },
          {
            title: "Designer UI/UX",
            desc: "Creez des interfaces modernes et intuitives pour nos projets web",
            tags: ["Freelance", "Teletravail", "Par projet", "Bac+2 minimum"],
            salary: "% du CA par projet",
            details: "Voir les details",
          },
          {
            title: "Commercial Digital B2B",
            desc: "Prospectez et developpez notre portefeuille clients au Gabon",
            tags: ["Freelance", "Libreville", "Flexible", "Commissions"],
            salary: "% du CA realise",
            details: "Voir les details",
          },
          {
            title: "Developpeur backend (Node.js/Python)",
            desc: "Construisez les fondations robustes de nos applications",
            tags: ["CDI", "Teletravail", "Temps plein", "Prime projets"],
            salary: "250K - 400K FCFA + Prime",
            details: "Voir les details",
          },
          {
            title: "Developpeur frontend (React/Vue.js)",
            desc: "Creez des interfaces utilisateur modernes et performantes",
            tags: ["CDI", "Teletravail", "Temps plein", "Prime projets"],
            salary: "220K - 380K FCFA + Prime",
            details: "Voir les details",
          },
          {
            title: "Responsable QA & Testing",
            desc: "Garantissez la qualite et la fiabilite de nos projets",
            tags: ["CDI", "Teletravail", "Temps plein", "Salaire fixe"],
            salary: "200K - 320K FCFA",
            details: "Voir les details",
          },
          {
            title: "Responsable Marketing & SEO",
            desc: "Construisez notre presence numerique et attirez des clients",
            tags: [
              "CDI",
              "Libreville/Teletravail",
              "Temps plein",
              "Salaire fixe",
            ],
            salary: "180K - 300K FCFA",
            details: "Voir les details",
          },
          {
            title: "Responsable Admin & Gestion",
            desc: "Organisez les operations et assurez la croissance administrative",
            tags: ["CDI", "Libreville", "Temps plein", "Salaire fixe"],
            salary: "150K - 250K FCFA",
            details: "Voir les details",
          },
        ],
      },
      spontaneous: {
        title: "Vous ne trouvez pas le poste ideal ?",
        text: "Envoyez-nous une candidature spontanee ! Nous sommes toujours a la recherche de talents motives pour renforcer notre equipe.",
        button: "Envoyer Ma Candidature",
      },
      modal: {
        descriptionTitle: "Description du Poste",
        missionsTitle: "Vos Missions",
        profileTitle: "Profil Recherche",
        benefitsTitle: "Ce Que Nous Offrons",
        interestTitle: "Interesse(e) ?",
        interestText: "Envoyez-nous votre CV et une lettre de motivation a :",
        emailLabel: "Email",
        whatsappLabel: "WhatsApp",
        note: "N'oubliez pas de preciser le poste dans votre email.",
        apply: "Postuler Maintenant",
      },
    },
    en: {
      meta: {
        title: "Careers - CodeWave | Join our team",
        description:
          "Join CodeWave - Web development jobs in Gabon. Developers, designers and sales roles available.",
      },
      breadcrumb: { home: "Home", current: "Careers" },
      pageTitle: "Join our team",
      pageSubtitle: "Let's build Gabon's digital future together",
      intro: {
        title: "CodeWave is hiring Gabonese talent!",
        textHtml:
          "We are a <strong>growing web start-up</strong> based in Libreville. Our mission: <strong>digitize Gabonese businesses with high-performing web solutions.</strong> We are looking for motivated, independent talent ready to grow with us through a profit-sharing model based on delivered projects.",
        highlights: [
          "Project-based roles",
          "Libreville, Gabon",
          "Freelance & Partnership",
        ],
      },
      benefits: {
        title: "Why join CodeWave?",
        subtitle: "What we offer our collaborators",
        cards: [
          {
            title: "Revenue sharing",
            text: "% of project revenue. Unlimited potential",
          },
          {
            title: "100% remote",
            text: "Work fully remote. Be productive from anywhere",
          },
          {
            title: "Real learning",
            text: "Work on real client projects. Proven skills",
          },
          {
            title: "Fair partnership",
            text: "We grow together. Your success is our success",
          },
          {
            title: "Start-up team",
            text: "Entrepreneurial spirit in a young, driven environment",
          },
          {
            title: "Real projects",
            text: "Diverse missions. A fast-growing portfolio",
          },
        ],
      },
      jobs: {
        title: "Open positions",
        subtitle: "Click a role to see details and apply",
        cards: [
          {
            title: "Full-stack developer (React/Node.js)",
            desc: "Build modern web applications for our Gabonese clients",
            tags: ["Freelance", "Remote", "Flexible", "Bachelor's+"],
            salary: "% of revenue per project",
            details: "View details",
          },
          {
            title: "UI/UX Designer",
            desc: "Create modern and intuitive interfaces for our web projects",
            tags: ["Freelance", "Remote", "Per project", "Associate+"],
            salary: "% of revenue per project",
            details: "View details",
          },
          {
            title: "B2B Digital Sales",
            desc: "Prospect and grow our client portfolio in Gabon",
            tags: ["Freelance", "Libreville", "Flexible", "Commissions"],
            salary: "% of revenue generated",
            details: "View details",
          },
          {
            title: "Backend developer (Node.js/Python)",
            desc: "Build robust foundations for our applications",
            tags: ["Permanent", "Remote", "Full-time", "Project bonus"],
            salary: "250K - 400K FCFA + bonus",
            details: "View details",
          },
          {
            title: "Frontend developer (React/Vue.js)",
            desc: "Create modern and high-performing user interfaces",
            tags: ["Permanent", "Remote", "Full-time", "Project bonus"],
            salary: "220K - 380K FCFA + bonus",
            details: "View details",
          },
          {
            title: "QA & Testing Lead",
            desc: "Ensure the quality and reliability of our projects",
            tags: ["Permanent", "Remote", "Full-time", "Fixed salary"],
            salary: "200K - 320K FCFA",
            details: "View details",
          },
          {
            title: "Marketing & SEO Lead",
            desc: "Build our digital presence and attract clients",
            tags: [
              "Permanent",
              "Libreville/Remote",
              "Full-time",
              "Fixed salary",
            ],
            salary: "180K - 300K FCFA",
            details: "View details",
          },
          {
            title: "Admin & Operations Lead",
            desc: "Organize operations and support administrative growth",
            tags: ["Permanent", "Libreville", "Full-time", "Fixed salary"],
            salary: "150K - 250K FCFA",
            details: "View details",
          },
        ],
      },
      spontaneous: {
        title: "Can't find the right role?",
        text: "Send us a spontaneous application! We are always looking for motivated talent to strengthen our team.",
        button: "Send My Application",
      },
      modal: {
        descriptionTitle: "Job Description",
        missionsTitle: "Your Missions",
        profileTitle: "Required Profile",
        benefitsTitle: "What We Offer",
        interestTitle: "Interested?",
        interestText: "Send us your CV and a cover letter to:",
        emailLabel: "Email",
        whatsappLabel: "WhatsApp",
        note: "Don't forget to mention the role in your email.",
        apply: "Apply Now",
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

  const introSection = document.querySelector(
    'section.section-padding[style*="padding-top: 3rem"]',
  );
  if (introSection) {
    const title = introSection.querySelector("h2");
    const text = introSection.querySelector("p");
    const highlights = introSection.querySelectorAll(
      'div[style*="justify-content: center"] strong',
    );
    if (title) title.textContent = t.intro.title;
    if (text) text.innerHTML = t.intro.textHtml;
    highlights.forEach((item, index) => {
      if (t.intro.highlights[index])
        item.textContent = t.intro.highlights[index];
    });
  }

  const benefitsSection = document
    .querySelector(".benefits-grid")
    ?.closest("section");
  if (benefitsSection) {
    const header = benefitsSection.querySelector(".section-header");
    if (header) {
      const title = header.querySelector(".section-title");
      const subtitle = header.querySelector(".section-subtitle");
      if (title) title.textContent = t.benefits.title;
      if (subtitle) subtitle.textContent = t.benefits.subtitle;
    }
    benefitsSection.querySelectorAll(".benefit-card").forEach((card, index) => {
      const dataItem = t.benefits.cards[index];
      if (!dataItem) return;
      const title = card.querySelector("h3");
      const text = card.querySelector("p");
      if (title) title.textContent = dataItem.title;
      if (text) text.textContent = dataItem.text;
    });
  }

  const jobsSection = document.querySelector(".job-card")?.closest("section");
  if (jobsSection) {
    const header = jobsSection.querySelector(".section-header");
    if (header) {
      const title = header.querySelector(".section-title");
      const subtitle = header.querySelector(".section-subtitle");
      if (title) title.textContent = t.jobs.title;
      if (subtitle) subtitle.textContent = t.jobs.subtitle;
    }
  }

  document.querySelectorAll(".job-card").forEach((card, index) => {
    const dataItem = t.jobs.cards[index];
    if (!dataItem) return;
    const title = card.querySelector("h3");
    const desc = card.querySelector("p");
    const tags = card.querySelectorAll(".job-tag");
    const footer = card.querySelector(
      'div[style*="justify-content: space-between"]',
    );
    const salary = footer
      ? footer.querySelector('span[style*="color: var(--gray-600)"]')
      : null;
    const details = footer
      ? footer.querySelector('span[style*="color: var(--primary)"]')
      : null;
    if (title) title.textContent = dataItem.title;
    if (desc) desc.textContent = dataItem.desc;
    tags.forEach((tag, tagIndex) => {
      if (dataItem.tags[tagIndex]) {
        const icon = tag.querySelector("i");
        tag.innerHTML = icon
          ? `${icon.outerHTML} ${dataItem.tags[tagIndex]}`
          : dataItem.tags[tagIndex];
      }
    });
    if (salary) {
      const icon = salary.querySelector("i");
      salary.innerHTML = icon
        ? `${icon.outerHTML} ${dataItem.salary}`
        : dataItem.salary;
    }
    if (details) {
      details.innerHTML = `${dataItem.details} <i class="fas fa-arrow-right"></i>`;
    }
  });

  const spontaneousSection = document.querySelector(
    'section.section-padding.bg-light div[style*="linear-gradient(135deg, var(--primary)"]',
  );
  if (spontaneousSection) {
    const title = spontaneousSection.querySelector("h2");
    const text = spontaneousSection.querySelector("p");
    const button = spontaneousSection.querySelector("a.btn");
    if (title) title.textContent = t.spontaneous.title;
    if (text) text.textContent = t.spontaneous.text;
    if (button) {
      const icon = button.querySelector("i");
      button.innerHTML = icon
        ? `${icon.outerHTML} ${t.spontaneous.button}`
        : t.spontaneous.button;
    }
  }

  if (typeof jobs !== "undefined") {
    if (!window.jobsOriginal) {
      window.jobsOriginal = JSON.parse(JSON.stringify(jobs));
    }

    const englishJobs = {
      1: {
        title: "Full-stack developer (React/Node.js)",
        icon: "fa-code",
        gradient:
          "linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%)",
        type: "Freelance",
        location: "Remote",
        salary: "% of revenue per project",
        description:
          "We are looking for a passionate full-stack developer to join our technical team as a partner. You will work on real client projects with compensation based on a percentage of generated revenue.",
        missions: [
          "Build web applications with React.js and Node.js",
          "Create and maintain RESTful APIs",
          "Work with databases (MongoDB, PostgreSQL)",
          "Collaborate with designers to integrate mockups",
          "Optimize performance and security",
          "Participate in code reviews",
          "Manage deployment and maintenance",
        ],
        profil: [
          "Bachelor's degree or equivalent",
          "Strong React.js, Node.js, Express.js skills",
          "Experience with MongoDB or PostgreSQL",
          "Knowledge of Git",
          "Autonomous and detail-oriented",
          "Good French communication",
        ],
        avantages: [
          "Compensation: % of revenue per project",
          "Unlimited earning potential",
          "100% remote - total flexibility",
          "Work on real client projects",
          "Growing professional portfolio",
          "Dynamic start-up environment",
          "Fast team growth",
        ],
      },
      2: {
        title: "UI/UX Designer",
        icon: "fa-palette",
        gradient: "linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)",
        type: "Freelance",
        location: "Remote",
        salary: "% of revenue per project",
        description:
          "Join our creative team to design modern and intuitive interfaces. You will be a partner on client projects and paid a percentage of project revenue.",
        missions: [
          "Create mockups and prototypes for websites",
          "Conduct UX research",
          "Design wireframes and user flows",
          "Develop visual identity for projects",
          "Work with developers for integration",
          "Run user tests and iterate",
          "Ensure visual consistency across projects",
        ],
        profil: [
          "Associate degree or equivalent in design",
          "Figma, Adobe XD or Sketch proficiency",
          "Photoshop and Illustrator knowledge",
          "Strong UX/UI fundamentals",
          "Portfolio showcasing creativity",
          "Awareness of design trends",
        ],
        avantages: [
          "Compensation: % of project revenue",
          "Earnings based on delivered projects",
          "100% remote - location freedom",
          "Growing professional portfolio",
          "Creative freedom",
          "Flexible hours",
          "Transparent partnership",
        ],
      },
      3: {
        title: "B2B Digital Sales",
        icon: "fa-handshake",
        gradient: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
        type: "Freelance",
        location: "Libreville / Remote",
        salary: "% of revenue generated",
        description:
          "We are looking for a sales professional to prospect and grow our client portfolio in Gabon. You will be paid a percentage of the revenue you generate.",
        missions: [
          "Prospect new clients (SMEs, enterprises)",
          "Identify needs and propose solutions",
          "Prepare and present offers",
          "Negotiate contracts and conditions",
          "Manage client relationships",
          "Attend networking events",
          "Achieve monthly sales targets",
        ],
        profil: [
          "Associate degree in sales/marketing",
          "1-2 years B2B sales experience",
          "Excellent communication and persuasion",
          "Knowledge of Gabonese business market",
          "Fluent French",
          "Autonomous and results-driven",
          "Driver's license",
        ],
        avantages: [
          "Compensation: % of revenue generated",
          "Unlimited earning potential",
          "Flexible hours",
          "Autonomous work style",
          "Travel expenses reimbursed",
          "Sales tools and support provided",
          "Motivating partnership",
        ],
      },
      4: {
        title: "Backend developer (Node.js/Python)",
        icon: "fa-database",
        gradient: "linear-gradient(135deg, #06b6d4 0%, #0284c7 100%)",
        type: "Permanent",
        location: "Remote",
        salary: "250K - 400K FCFA + project bonus",
        description:
          "We need an experienced backend developer to build robust foundations for our applications. Fixed salary + project bonuses.",
        missions: [
          "Build REST and GraphQL APIs",
          "Manage databases (PostgreSQL, MongoDB)",
          "Implement authentication and security",
          "Optimize backend performance",
          "Integrate third-party services",
          "Document code and APIs",
          "Participate in code reviews",
        ],
        profil: [
          "Bachelor's degree in computer science",
          "2+ years backend experience",
          "Node.js/Express or Python/Django",
          "Relational database knowledge",
          "REST API and microservices familiarity",
          "Git and Agile methods",
          "Good English for documentation",
        ],
        avantages: [
          "Fixed salary: 250K - 400K FCFA",
          "Project bonuses",
          "100% remote",
          "Varied client projects",
          "Rapid growth and responsibilities",
          "Young, dynamic start-up",
        ],
      },
      5: {
        title: "Frontend developer (React/Vue.js)",
        icon: "fab fa-react",
        gradient: "linear-gradient(135deg, #ec4899 0%, #f43f5e 100%)",
        type: "Permanent",
        location: "Remote",
        salary: "220K - 380K FCFA + project bonus",
        description:
          "We are seeking a frontend developer to craft modern, high-performing user interfaces. Fixed salary + project bonuses.",
        missions: [
          "Build reusable components",
          "Integrate Figma mockups",
          "Optimize front-end performance",
          "Ensure cross-browser compatibility",
          "Manage state (Redux, Vuex)",
          "Implement animations and transitions",
          "Test and debug applications",
        ],
        profil: [
          "Bachelor's degree or equivalent",
          "2+ years with React.js or Vue.js",
          "HTML5, CSS3, JavaScript ES6+",
          "Tailwind CSS or Bootstrap knowledge",
          "Git usage",
          "Agile team collaboration",
          "Portfolio of projects",
        ],
        avantages: [
          "Fixed salary: 220K - 380K FCFA",
          "Project bonus",
          "100% remote",
          "Flexible hours",
          "Real client projects",
          "Fast growth opportunities",
          "Start-up environment",
        ],
      },
      6: {
        title: "QA & Testing Lead",
        icon: "fa-check-double",
        gradient: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
        type: "Permanent",
        location: "Remote",
        salary: "200K - 320K FCFA",
        description:
          "We need a QA specialist to ensure quality across projects. You will handle functional, regression, and acceptance testing.",
        missions: [
          "Create and execute test plans",
          "Run functional and regression tests",
          "Test across browsers and devices",
          "Report bugs accurately",
          "Collaborate with developers",
          "Set up automated tests",
          "Improve QA process",
        ],
        profil: [
          "Associate degree in computer science",
          "1-2 years QA experience",
          "Testing methodologies knowledge",
          "Attention to detail",
          "Clear bug documentation",
          "Automation basics (plus)",
          "Autonomous and proactive",
        ],
        avantages: [
          "Fixed salary: 200K - 320K FCFA",
          "Stable monthly income",
          "100% remote",
          "Flexible hours",
          "QA/automation growth",
          "Supportive technical team",
          "Varied projects",
        ],
      },
      7: {
        title: "Marketing & SEO Lead",
        icon: "fa-bullhorn",
        gradient: "linear-gradient(135deg, #a855f7 0%, #9333ea 100%)",
        type: "Permanent",
        location: "Libreville / Remote",
        salary: "180K - 300K FCFA",
        description:
          "We are looking for a digital marketer to build our online presence and attract clients. You will handle content, SEO, and campaigns.",
        missions: [
          "Develop digital marketing strategy",
          "Create SEO-optimized blog content",
          "Manage social media (Facebook, Instagram, LinkedIn)",
          "Run ad campaigns",
          "Analyze data and performance",
          "Optimize website SEO",
          "Work with sales team",
        ],
        profil: [
          "Associate degree in marketing/communications",
          "1-2 years digital marketing experience",
          "SEO and SEM knowledge",
          "Social media expertise",
          "Strong writing skills",
          "Google Analytics familiarity",
          "Creative and analytical",
        ],
        avantages: [
          "Fixed salary: 180K - 300K FCFA",
          "Stable income",
          "Partial remote possible",
          "Marketing budget",
          "Marketing tools provided",
          "Ongoing training",
          "Direct impact on growth",
        ],
      },
      8: {
        title: "Admin & Operations Lead",
        icon: "fa-clipboard-list",
        gradient: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
        type: "Permanent",
        location: "Libreville",
        salary: "150K - 250K FCFA",
        description:
          "We need an organized person to handle administration and logistics. You will be the operational backbone of our growing startup.",
        missions: [
          "Manage invoicing and payments",
          "Administer contracts and documents",
          "Coordinate schedules and meetings",
          "Manage suppliers and resources",
          "Ensure legal/administrative compliance",
          "Prepare financial reports",
          "Support the team with admin tasks",
        ],
        profil: [
          "Diploma in administration/management",
          "1-2 years admin experience",
          "Strong organizational skills",
          "Excel and office tools",
          "Accuracy and rigor",
          "Discretion and professionalism",
          "Flexibility and adaptability",
        ],
        avantages: [
          "Fixed salary: 150K - 250K FCFA",
          "Stability and financial security",
          "Regular hours",
          "Central role in company growth",
          "Autonomy and responsibility",
          "Motivating start-up environment",
          "Fast growth opportunities",
        ],
      },
    };

    if (lang === "en") {
      Object.keys(englishJobs).forEach((key) => {
        jobs[key] = JSON.parse(JSON.stringify(englishJobs[key]));
      });
    } else if (window.jobsOriginal) {
      Object.keys(window.jobsOriginal).forEach((key) => {
        jobs[key] = JSON.parse(JSON.stringify(window.jobsOriginal[key]));
      });
    }

    window.openJobModal = function (jobId) {
      const job = jobs[jobId];
      const modal = document.getElementById("jobModal");
      const modalBody = document.getElementById("modalBody");
      if (!job || !modal || !modalBody) return;

      modalBody.innerHTML = `
        <div style="padding: 3rem; background: ${
          job.gradient
        }; color: white; border-radius: 1.5rem 1.5rem 0 0;">
          <div style="font-size: 3rem; margin-bottom: 1rem;">
            <i class="fas ${job.icon}"></i>
          </div>
          <h2 style="font-size: 2rem; font-weight: 800; margin-bottom: 1rem;">${
            job.title
          }</h2>
          <div style="display: flex; flex-wrap: wrap; gap: 1.5rem; opacity: 0.9;">
            <span><i class="fas fa-briefcase"></i> ${job.type}</span>
            <span><i class="fas fa-map-marker-alt"></i> ${job.location}</span>
            <span><i class="fas fa-money-bill-wave"></i> ${job.salary}</span>
          </div>
        </div>
        <div style="padding: 3rem;">
          <div style="margin-bottom: 2rem;">
            <h3 style="font-size: 1.5rem; font-weight: 700; color: var(--gray-900); margin-bottom: 1rem;">
              <i class="fas fa-info-circle" style="color: var(--primary);"></i> ${
                t.modal.descriptionTitle
              }
            </h3>
            <p style="color: var(--gray-700); line-height: 1.8;">${
              job.description
            }</p>
          </div>

          <div style="margin-bottom: 2rem;">
            <h3 style="font-size: 1.5rem; font-weight: 700; color: var(--gray-900); margin-bottom: 1rem;">
              <i class="fas fa-tasks" style="color: var(--primary);"></i> ${
                t.modal.missionsTitle
              }
            </h3>
            <ul style="list-style: none; padding: 0;">
              ${job.missions
                .map(
                  (m) => `
                <li style="display: flex; align-items: start; gap: 0.75rem; margin-bottom: 0.75rem; color: var(--gray-700);">
                  <i class="fas fa-check-circle" style="color: var(--success); margin-top: 0.25rem;"></i>
                  <span>${m}</span>
                </li>
              `,
                )
                .join("")}
            </ul>
          </div>

          <div style="margin-bottom: 2rem;">
            <h3 style="font-size: 1.5rem; font-weight: 700; color: var(--gray-900); margin-bottom: 1rem;">
              <i class="fas fa-user-check" style="color: var(--primary);"></i> ${
                t.modal.profileTitle
              }
            </h3>
            <ul style="list-style: none; padding: 0;">
              ${job.profil
                .map(
                  (p) => `
                <li style="display: flex; align-items: start; gap: 0.75rem; margin-bottom: 0.75rem; color: var(--gray-700);">
                  <i class="fas fa-chevron-right" style="color: var(--primary); margin-top: 0.25rem;"></i>
                  <span>${p}</span>
                </li>
              `,
                )
                .join("")}
            </ul>
          </div>

          <div style="margin-bottom: 2rem;">
            <h3 style="font-size: 1.5rem; font-weight: 700; color: var(--gray-900); margin-bottom: 1rem;">
              <i class="fas fa-gift" style="color: var(--primary);"></i> ${
                t.modal.benefitsTitle
              }
            </h3>
            <ul style="list-style: none; padding: 0;">
              ${job.avantages
                .map(
                  (a) => `
                <li style="display: flex; align-items: start; gap: 0.75rem; margin-bottom: 0.75rem; color: var(--gray-700);">
                  <i class="fas fa-star" style="color: var(--warning); margin-top: 0.25rem;"></i>
                  <span>${a}</span>
                </li>
              `,
                )
                .join("")}
            </ul>
          </div>

          <div style="background: linear-gradient(135deg, #dbeafe 0%, #e0e7ff 100%); padding: 2rem; border-radius: var(--radius-xl); margin-bottom: 2rem;">
            <h3 style="font-size: 1.25rem; font-weight: 700; color: var(--gray-900); margin-bottom: 1rem;">
              <i class="fas fa-paper-plane" style="color: var(--primary);"></i> ${
                t.modal.interestTitle
              }
            </h3>
            <p style="color: var(--gray-700); margin-bottom: 1rem;">
              ${t.modal.interestText}
            </p>
            <p style="margin-bottom: 1rem;">
              <strong>${t.modal.emailLabel} :</strong> <a href="mailto:mgncodewave18@gmail.com?subject=Candidature ${
                job.title
              }" style="color: var(--primary); text-decoration: underline;">mgncodewave18@gmail.com</a>
            </p>
            <p style="margin-bottom: 1.5rem;">
              <strong>${t.modal.whatsappLabel} :</strong> <a href="https://wa.me/24166198918?text=Bonjour, je postule pour le poste de ${
                job.title
              }" target="_blank" style="color: var(--success); text-decoration: underline;">+241 66 19 89 18</a>
            </p>
            <p style="font-size: 0.875rem; color: var(--gray-600);">
              <i class="fas fa-info-circle"></i> ${t.modal.note}
            </p>
          </div>

          <div style="text-align: center;">
            <a href="mailto:mgncodewave18@gmail.com?subject=Candidature ${
              job.title
            }" 
               class="btn btn-primary btn-lg" 
               style="display: inline-block; padding: 1rem 2rem; background: ${
                 job.gradient
               }; color: white; text-decoration: none; border-radius: 2rem; font-weight: 600;">
              <i class="fas fa-envelope"></i> ${t.modal.apply}
            </a>
          </div>
        </div>
      `;

      modal.classList.add("active");
      document.body.style.overflow = "hidden";
    };
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
