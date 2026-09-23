// ==================== NAVBAR ====================
// Liens principaux + menu « Agence » (details/summary : clavier et lecteurs d'écran natifs).
function navLinks() {
  const t = translations[state.lang];
  const fr = state.lang === "fr";
  return {
    main: [
      ["home", t.nav.home],
      ["services", t.nav.services],
      ["formations", t.nav.formations],
      ["portfolio", t.nav.portfolio],
      ["blog", t.nav.blog],
    ],
    agency: [
      ["about", t.nav.about, fr ? "Notre histoire et nos valeurs" : "Our story and values"],
      ["careers", fr ? "Carrières" : "Careers", fr ? "Missions et postes ouverts" : "Open roles and missions"],
      ["partnership", fr ? "Partenariat" : "Partnership", fr ? "Devenir partenaire" : "Become a partner"],
      ["social", fr ? "Réseaux" : "Social", fr ? "Nous suivre en ligne" : "Follow us online"],
    ],
    contact: ["contact", t.nav.contact],
  };
}

function renderNav() {
  const t = translations[state.lang];
  const isDark = state.theme === "dark";
  const fr = state.lang === "fr";
  const links = navLinks();
  const agencyActive = links.agency.some(([p]) => p === state.page);
  const link = ([p, label]) =>
    `<button onclick="navigate('${p}')" ${state.page === p ? 'aria-current="page"' : ""} class="nav-link">${label}</button>`;
  const allMobile = [...links.main, ...links.agency.map(([p, l]) => [p, l]), links.contact];

  return `
  <nav class="site-nav fixed top-3 left-0 right-0 z-50 mx-3 md:mx-auto md:max-w-6xl" aria-label="${fr ? "Navigation principale" : "Main navigation"}">
    <div class="px-3 md:px-5 py-2.5 flex items-center justify-between gap-3">
      <button onclick="navigate('home')" class="nav-brand shrink-0" aria-label="${fr ? "Retour à l'accueil" : "Back to home page"}">
        <img src="./assets/images/logo/mgn-codewave-mark.svg" alt="" width="40" height="40" class="h-10 w-10" />
        <span class="nav-wordmark"><strong>CodeWave</strong><span class="nav-tag">// studio digital</span></span>
      </button>

      <div class="hidden lg:flex items-center gap-0.5">
        ${links.main.map(link).join("")}
        <details class="nav-more" ${agencyActive ? 'data-active="true"' : ""}>
          <summary class="nav-link" ${agencyActive ? 'aria-current="true"' : ""}>${fr ? "Agence" : "Agency"}<svg aria-hidden="true" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M6 9l6 6 6-6"/></svg></summary>
          <div class="nav-more-panel">
            ${links.agency
              .map(
                ([p, label, desc]) => `
            <button onclick="navigate('${p}')" ${state.page === p ? 'aria-current="page"' : ""} class="nav-more-item">
              <span class="font-display font-700 text-sm">${label}</span>
              <span class="text-xs" style="color:var(--muted)">${desc}</span>
            </button>`,
              )
              .join("")}
          </div>
        </details>
        ${link(links.contact)}
      </div>

      <div class="flex items-center gap-2">
        <div class="lang-switch" role="group" aria-label="${fr ? "Langue" : "Language"}">
          <button id="lang-fr" onclick="setLang('fr')" lang="fr" aria-label="Français" aria-pressed="${fr}" class="${fr ? "is-active" : ""}">FR</button>
          <button id="lang-en" onclick="setLang('en')" lang="en" aria-label="English" aria-pressed="${!fr}" class="${!fr ? "is-active" : ""}">EN</button>
        </div>
        <button id="theme-toggle" onclick="toggleTheme()" class="nav-icon-btn" aria-label="${isDark ? (fr ? "Passer en mode clair" : "Switch to light mode") : fr ? "Passer en mode sombre" : "Switch to dark mode"}">
          ${isDark ? `<svg aria-hidden="true" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>` : `<svg aria-hidden="true" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>`}
        </button>
        <button onclick="navigate('contact')" class="hidden lg:inline-flex btn-primary nav-cta">${t.nav.quote}</button>
        <button id="mobile-menu-toggle" onclick="toggleMobileMenu()" class="lg:hidden nav-icon-btn" aria-controls="mobile-menu" aria-expanded="${state.mobileMenuOpen}" aria-label="${state.mobileMenuOpen ? (fr ? "Fermer le menu" : "Close menu") : "Menu"}">
          <span class="burger ${state.mobileMenuOpen ? "is-open" : ""}" aria-hidden="true"><i></i><i></i><i></i></span>
        </button>
      </div>
    </div>
  </nav>

  ${
    state.mobileMenuOpen
      ? `
  <div id="mobile-menu" class="mobile-menu lg:hidden" role="dialog" aria-modal="true" aria-label="Menu">
    ${waveSVG("#60A5FA")}
    <div class="relative flex flex-col h-full px-6 pt-28 pb-8 max-w-lg mx-auto">
      <p class="section-label mb-6" style="color:#60A5FA">navigation</p>
      <ul class="space-y-1">
        ${allMobile
          .map(
            ([p, label], i) => `
        <li class="mobile-menu-item" style="--i:${i}">
          <button onclick="navigate('${p}')" ${state.page === p ? 'aria-current="page"' : ""} class="mobile-menu-link">
            <span class="mobile-menu-num" aria-hidden="true">${String(i + 1).padStart(2, "0")}</span>${label}
          </button>
        </li>`,
          )
          .join("")}
      </ul>
      <div class="mt-auto pt-8 space-y-3 mobile-menu-item" style="--i:${allMobile.length}">
        <button onclick="navigate('contact')" class="btn-primary w-full justify-center">${t.nav.quote}</button>
        <a href="https://wa.me/24166198918" target="_blank" rel="noopener noreferrer" class="flex items-center justify-center gap-2 text-sm py-3" style="color:#cbd5e1;border:1px solid rgba(255,255,255,0.15)">${lineIcon("chat", 16)} WhatsApp · +241 66 19 89 18</a>
      </div>
    </div>
  </div>`
      : ""
  }`;
}

function toggleMobileMenu() {
  state.mobileMenuOpen = !state.mobileMenuOpen;
  // Le menu plein écran bloque le défilement de la page derrière lui.
  document.body.style.overflow = state.mobileMenuOpen ? "hidden" : "";
  render();
}

// ==================== FOOTER ====================
const SOCIAL_LINKS = [
  {
    href: "https://wa.me/24166198918?text=Bonjour,%20je%20souhaite%20un%20devis%20MGN%20CodeWave",
    label: "WhatsApp",
    color: "#25D366",
    path: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z",
  },
  {
    href: "https://www.instagram.com/mgn_codewave",
    label: "Instagram",
    color: "#E1306C",
    path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z",
  },
  {
    href: "https://www.facebook.com/share/1D4R7GdjAC/",
    label: "Facebook",
    color: "#1877F2",
    path: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z",
  },
  {
    href: "https://www.linkedin.com/company/mgn-codewave/",
    label: "LinkedIn",
    color: "#0A66C2",
    path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
  },
  {
    href: "https://github.com/NGOUBADJAMBO-Richard",
    label: "GitHub",
    color: "#F1F5F9",
    path: "M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z",
  },
];

function renderFooter() {
  const t = translations[state.lang].footer;
  const isEn = state.lang === "en";
  const year = new Date().getFullYear();
  const col = (title, items, extra = "") => `
          <div class="footer-col ${extra}">
            <p class="footer-col-title">${title}</p>
            <ul class="footer-list space-y-2.5">
              ${items.map(([page, label]) => `<li><button onclick="navigate('${page}')" class="footer-link">${label}</button></li>`).join("")}
            </ul>
          </div>`;

  return `
  <footer class="site-footer wave-edge-top" style="margin-top:${["home", "contact"].includes(state.page) ? "-56px" : "6rem"}">
    ${waveSVG("#60A5FA")}
    <svg class="flow-waves" aria-hidden="true" viewBox="0 0 1440 600" preserveAspectRatio="xMidYMid slice"><path class="flow-pulse flow-pulse-2" d="M-100,120 C200,40 420,220 720,110 C1020,20 1220,220 1540,100"/></svg>

    <div class="relative max-w-6xl mx-auto px-4 md:px-8 pt-28">
      ${
        state.page === "home"
          ? ""
          : `
      <!-- Accroche + appel à l'action (l'accueil a déjà son propre bandeau) -->
      <div class="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-14 mb-14" style="border-bottom:1px solid rgba(255,255,255,0.08)">
        <div>
          <p class="section-label mb-4" style="color:#60A5FA">${isEn ? "next project" : "prochain projet"}</p>
          <p class="font-display font-700 text-white leading-tight" style="font-size:clamp(1.9rem,4vw,3rem)">${isEn ? "Bring your ideas" : "Donnez vie"}<br><span class="text-gradient-light">${isEn ? "to life." : "à vos idées."}</span></p>
        </div>
        <div class="flex flex-wrap gap-3">
          <button onclick="navigate('contact')" class="btn-primary">${isEn ? "Request a quote" : "Demander un devis"} ${lineIcon("code", 16)}</button>
          <a href="https://wa.me/24166198918" target="_blank" rel="noopener noreferrer" class="footer-ghost-btn">WhatsApp</a>
        </div>
      </div>`
      }

      <div class="grid gap-12 lg:grid-cols-12">
        <!-- Marque + statut façon terminal -->
        <div class="lg:col-span-4 space-y-6">
          <div class="flex items-center gap-3">
            <img src="./assets/images/logo/mgn-codewave-mark.svg" alt="Logo M.G.N CodeWave" width="48" height="48" loading="lazy" class="h-12 w-12" />
            <div>
              <p class="font-display font-700 text-white">M.G.N CodeWave</p>
              <p class="footer-mono">// ${isEn ? "digital studio" : "studio digital"}</p>
            </div>
          </div>
          <p class="text-sm leading-relaxed max-w-xs" style="color:#94a3b8">${t.tagline}</p>
          <div class="footer-terminal" aria-label="${isEn ? "Studio status" : "Statut du studio"}">
            <div class="footer-terminal-bar" aria-hidden="true"><i></i><i></i><i></i></div>
            <p><span class="ft-prompt">codewave@libreville:~$</span> status</p>
            <p><span class="ft-dot" aria-hidden="true"></span>${isEn ? "available for new projects" : "disponible pour de nouveaux projets"}</p>
            <p class="ft-muted">${isEn ? "reply within 24h · Mobile Money accepted" : "réponse sous 24 h · Mobile Money accepté"}</p>
          </div>
        </div>

        <!-- Liens -->
        <div class="lg:col-span-5 grid grid-cols-2 sm:grid-cols-3 gap-8">
          ${col(isEn ? "Explore" : "Explorer", [
            ["home", isEn ? "Home" : "Accueil"],
            ["services", "Services"],
            ["formations", isEn ? "Training" : "Formations"],
            ["portfolio", "Portfolio"],
            ["blog", "Blog"],
          ])}
          ${col(isEn ? "Agency" : "Agence", [
            ["about", isEn ? "About" : "À propos"],
            ["careers", isEn ? "Careers" : "Carrières"],
            ["partnership", isEn ? "Partnership" : "Partenariat"],
            ["social", isEn ? "Social" : "Réseaux"],
            ["contact", "Contact"],
          ])}
          ${col(isEn ? "Legal" : "Légal", [
            ["legal", isEn ? "Legal notice" : "Mentions légales"],
            ["privacy", isEn ? "Privacy" : "Confidentialité"],
            ["cgv", isEn ? "Terms of sale" : "CGV"],
            ["sitemap", isEn ? "Sitemap" : "Plan du site"],
          ], "footer-col-wide")}
        </div>

        <!-- Contact + newsletter façon ligne de commande -->
        <div class="lg:col-span-3 space-y-6">
          <div>
            <p class="footer-col-title">Contact</p>
            <ul class="space-y-3 text-sm">
              <li><a href="tel:+24166198918" class="footer-contact">${lineIcon("phone", 16)}+241 66 19 89 18</a></li>
              <li><a href="mailto:mgncodewave18@gmail.com" class="footer-contact">${lineIcon("mail", 16)}mgncodewave18@gmail.com</a></li>
              <li><span class="footer-contact">${lineIcon("pin", 16)}Libreville, Gabon</span></li>
            </ul>
          </div>
          <div>
            <p class="footer-col-title">Newsletter</p>
            <form action="https://formspree.io/f/mpweqqzz" method="POST" onsubmit="handleNewsletterSubmit(event)" class="footer-cli">
              <input type="hidden" name="_subject" value="Inscription newsletter">
              <input type="text" name="_gotcha" tabindex="-1" autocomplete="off" aria-hidden="true" style="position:absolute;left:-9999px;width:1px;height:1px;opacity:0">
              <label for="newsletter-email" class="sr-only">${isEn ? "Your email" : "Votre email"}</label>
              <span class="ft-prompt" aria-hidden="true">&gt;</span>
              <input id="newsletter-email" name="email" type="email" required autocomplete="email" placeholder="${isEn ? "your@email.com" : "votre@email.com"}">
              <button type="submit" aria-label="${isEn ? "Subscribe" : "S'inscrire"}">${lineIcon("code", 16)}</button>
            </form>
            <p class="text-xs mt-2" style="color:#94a3b8">${isEn ? "Web tips every month. No spam." : "Conseils web chaque mois. Sans spam."}</p>
            <div id="newsletter-status" role="status" aria-live="polite" class="text-xs mt-2"></div>
          </div>
          <ul class="flex gap-2" aria-label="${isEn ? "Social networks" : "Réseaux sociaux"}">
            ${SOCIAL_LINKS.map(
              (s) => `<li><a href="${s.href}" target="_blank" rel="noopener noreferrer" class="social-icon" style="--brand:${s.color}" aria-label="${s.label}"><svg aria-hidden="true" width="17" height="17" fill="currentColor" viewBox="0 0 24 24"><path d="${s.path}"/></svg></a></li>`,
            ).join("")}
          </ul>
        </div>
      </div>

      <!-- Filigrane -->
      <p class="footer-watermark" aria-hidden="true">CodeWave</p>

      <div class="footer-bottom">
        <p>© ${year} M.G.N CodeWave. ${t.rights}</p>
        <p class="footer-mono">${t.made}</p>
        ${
          // Le choix doit rester révocable aussi facilement qu'il a été donné.
          // Sans traceur configuré, aucun choix n'a été demandé : le lien n'a pas lieu d'être.
          typeof analyticsConfigured === "function" && analyticsConfigured()
            ? `<button type="button" onclick="openConsent()" class="footer-consent">${isEn ? "Manage cookies" : "Gérer mes cookies"}</button>`
            : ""
        }
        <button onclick="window.scrollTo({ top: 0, behavior: 'smooth' })" class="back-to-top">${isEn ? "Back to top" : "Haut de page"} <svg aria-hidden="true" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M12 19V5M5 12l7-7 7 7"/></svg></button>
      </div>
    </div>
  </footer>`;
}

// ==================== HOME PAGE ====================
// En-tête de section éditorial : numéro + libellé et titre à gauche, accroche et action à droite.
function sectionHead({ index, label, title, lead = "", action = "", dark = false, id = "" }) {
  return `
      <header class="section-head grid lg:grid-cols-12 gap-6 lg:gap-12 items-end mb-12 md:mb-14">
        <div class="lg:col-span-7 min-w-0">
          <p class="section-index reveal"><span class="section-num">${index}</span><span class="section-label">${label}</span></p>
          <h2${id ? ` id="${id}"` : ""} class="font-display font-700 reveal" style="font-size:clamp(2.1rem,4.4vw,3.4rem);line-height:1.05;letter-spacing:-0.02em;color:${dark ? "#fff" : "var(--fg)"};white-space:pre-line">${title}</h2>
        </div>
        ${
          lead || action
            ? `<div class="lg:col-span-5 reveal">
          ${lead ? `<p class="text-base leading-relaxed${action ? " mb-6" : ""}" style="color:${dark ? "#cbd5e1" : "var(--muted)"}">${lead}</p>` : ""}
          ${action}
        </div>`
            : ""
        }
      </header>`;
}

// Bento des offres : phare en grand (2 colonnes), dernière offre élargie, tuile « sur mesure ».
// Accueil : cartes liées vers Services et carrousel sur mobile. Page Services : articles, liste verticale.
function renderServicesBento({ st, isEn, arrow, rail = false, headingTag = "h3" }) {
  // Chaque carte est un article : seul le bouton « Voir le détail » est cliquable, et il ouvre la fiche
  // (bénéfices, livrables, délai, puis tarif). Le prix ne figure plus sur la carte.
  const detail = (offerId, dark = false) => `
              <button type="button" onclick="openOffer('${offerId}')" class="offer-open${dark ? " offer-open-dark" : ""}">
                ${isEn ? "See the details" : "Voir le détail"} ${arrow}
              </button>`;
  const quote = `<span class="offer-hint">${isEn ? "Free quote within 24h" : "Devis gratuit sous 24 h"}</span>`;
  return `
      <!-- Bento : offre phare en grand (2 colonnes), dernière offre élargie, tuile « sur mesure » pour fermer la grille. -->
      <div class="${rail ? "snap-rail " : ""}bento grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        ${st.items
          .map((s, i) =>
            i === 0
              ? `
          <article class="card bento-feature group reveal md:col-span-2 grid md:grid-cols-2 gap-8 p-7 md:p-8">
            <div class="flex flex-col min-w-0">
              <div class="flex items-center gap-3 mb-8">
                <span class="icon-tile">${lineIcon(s.iconId)}</span>
                ${s.tag ? `<span class="badge bento-badge">${s.tag}</span>` : ""}
              </div>
              <${headingTag} class="font-display font-700 text-2xl md:text-3xl mb-3 text-white">${s.title}</${headingTag}>
              <p class="text-sm md:text-base leading-relaxed mb-8" style="color:#cbd5e1">${s.desc}</p>
              <div class="mt-auto pt-5" style="border-top:1px solid rgba(255,255,255,0.1)">
                ${detail(s.offerId, true)}
                <p class="mt-3 text-xs" style="color:#93C5FD">${isEn ? "Free quote within 24h" : "Devis gratuit sous 24 h"}</p>
              </div>
            </div>
            <div class="bento-visual hidden md:block" aria-hidden="true">
              <div class="bv-bar"><i></i><i></i><i></i><span class="bv-url">${isEn ? "your-business" : "votre-entreprise"}.ga</span></div>
              <div class="bv-body">
                <div class="bv-nav"><span></span><span></span><span></span><span></span></div>
                <div class="bv-hero"><span class="bv-line" style="width:62%"></span><span class="bv-line" style="width:40%"></span><span class="bv-btn"></span></div>
                <div class="bv-cols"><span></span><span></span><span></span></div>
              </div>
            </div>
          </article>`
              : `
          <article class="card group p-6 reveal flex flex-col${i === st.items.length - 1 ? " lg:col-span-2 bento-wide" : ""}" style="transition-delay:${i * 60}ms">
            <div class="flex items-start justify-between mb-5">
              <span class="icon-tile">${lineIcon(s.iconId)}</span>
              ${s.tag ? `<span class="badge badge-blue">${s.tag}</span>` : ""}
            </div>
            <${headingTag} class="font-display font-700 text-lg mb-2" style="color:var(--fg)">${s.title}</${headingTag}>
            <p class="text-sm leading-relaxed mb-5" style="color:var(--muted)">${s.desc}</p>
            <div class="mt-auto pt-4" style="border-top:1px solid var(--border)">
              ${detail(s.offerId)}
              ${quote}
            </div>
          </article>`,
          )
          .join("")}
        <a href="./contact.html" onclick="event.preventDefault(); navigate('contact')" class="bento-cta group reveal flex flex-col justify-between p-7">
          <span class="bento-cta-num" aria-hidden="true">+</span>
          <div class="relative">
            <p class="font-display font-700 text-2xl text-white leading-tight mb-2">${isEn ? "Something specific in mind?" : "Un besoin sur mesure&nbsp;?"}</p>
            <p class="text-sm mb-6" style="color:#DBEAFE">${isEn ? "Tell us about it: free quote within 24h, no commitment." : "Décrivez-le-nous&nbsp;: devis gratuit sous 24&nbsp;h, sans engagement."}</p>
            <span class="inline-flex items-center gap-2 font-display font-700 text-sm uppercase tracking-wider text-white">${isEn ? "Let's talk" : "Parlons-en"} <span class="transition-transform group-hover:translate-x-1">${arrow}</span></span>
          </div>
        </a>
      </div>
`;
}

function renderHome() {
  const t = translations[state.lang];
  const ht = t.hero;
  const st = t.services;
  const pt = t.portfolio;

  // Cinq projets : le premier à la une (2 colonnes) remplit exactement la grille, sans case vide.
  const featuredProjects = portfolioProjects.slice(0, 5);
  const isEn = state.lang === "en";
  const arrow = `<svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>`;
  // Dernière ligne du titre mise en valeur (dégradé + onde qui se dessine).
  const headlineLines = ht.headline.split("\n");
  const accentLine = headlineLines.pop();
  const chipIcons = ["clock", "wallet", "tag"];
  const techs = ["React", "Flutter", "Node.js", "MongoDB", "WordPress", "Tailwind CSS", "SEO local", "Airtel Money", "Moov Money", "GitHub"];
  const stats = [
    [ht.stat1_n, ht.stat1_l],
    [ht.stat2_n, ht.stat2_l],
    [ht.stat3_n, ht.stat3_l],
  ];

  return `
  <div class="page">
    <!-- HERO -->
    <section class="relative min-h-screen flex items-center pt-28 pb-16 overflow-hidden">
      <canvas class="wave-field" aria-hidden="true"></canvas>
      <div class="hero-glow" aria-hidden="true"></div>
      <div class="relative max-w-6xl mx-auto px-4 md:px-8 w-full">
        <div class="grid lg:grid-cols-2 gap-12 items-center">
          <div class="min-w-0">
            <p class="section-label mb-5">${ht.label}</p>
            <h1 class="font-display font-700 leading-none mb-6" style="font-size:clamp(2.75rem,5.2vw,4.75rem); color:var(--fg)">
              ${headlineLines.map((line, i) => wordSpans(line, i * 2)).join("<br>")}<br>
              <span class="hero-accent">${wordSpans(accentLine, headlineLines.length * 2, "text-gradient")}<svg class="hero-underline" viewBox="0 0 300 24" preserveAspectRatio="none" aria-hidden="true"><path d="M3,16 C50,4 100,22 150,12 C200,2 250,20 297,8" fill="none" stroke="#0062E6" stroke-width="5" stroke-linecap="round"/></svg></span>
            </h1>
            <p class="text-base md:text-lg leading-relaxed mb-4 max-w-lg" style="color:var(--muted)">${ht.sub}</p>
            <p class="brand-promise mb-8">${ht.promise}</p>
            <div class="hero-ctas flex flex-wrap gap-3">
              <button onclick="navigate('contact')" class="btn-primary">${ht.cta1} ${arrow}</button>
              <button onclick="navigate('portfolio')" class="btn-outline">${ht.cta2}</button>
            </div>
            <!-- Stats -->
            <div class="hero-stats flex flex-wrap gap-x-8 gap-y-4 mt-12">
              ${stats
                .map(
                  ([n, l], i) => `
              ${i ? '<div aria-hidden="true" style="width:1px;background:var(--border)"></div>' : ""}
              <div><p class="font-display font-700 text-3xl" style="color:var(--primary-fg)" data-count>${n}</p><p class="text-xs uppercase tracking-wider" style="color:var(--muted)">${l}</p></div>`,
                )
                .join("")}
            </div>
          </div>

          <!-- Visuel : maquette navigateur + téléphone (décoratif) -->
          <div class="hidden lg:block relative h-[460px] hero-tilt" aria-hidden="true">
            <div class="absolute left-0 top-6 w-[92%]">${renderCodeEditor(state.lang)}</div>
            <div class="mock-phone absolute right-0 bottom-0 float-b">
              <div class="p-3 space-y-2">
                <div class="mx-auto" style="width:40px;height:4px;background:var(--border);border-radius:2px"></div>
                <div class="p-3 text-center" style="background:rgba(16,185,129,0.12)">
                  <div class="mx-auto mb-1 flex items-center justify-center" style="width:28px;height:28px;border-radius:50%;background:#10b981;color:white">${lineIcon("check", 16)}</div>
                  <div class="text-[10px] font-display font-700" style="color:var(--fg)">Mobile Money</div>
                </div>
                <div class="mock-line" style="width:85%"></div>
                <div class="mock-line" style="width:60%"></div>
                <div style="height:22px;background:linear-gradient(135deg,#004AAD,#0062E6)"></div>
              </div>
            </div>
            <div class="chip absolute -left-6 top-0 float-a">${lineIcon(chipIcons[0], 16)}${ht.chips[0]}</div>
            <div class="chip absolute left-6 bottom-16 float-c">${lineIcon(chipIcons[1], 16)}${ht.chips[1]}</div>
            <div class="chip absolute right-0 -top-3 float-a">${lineIcon(chipIcons[2], 16)}${ht.chips[2]}</div>
          </div>
        </div>
        <!-- Engagements en version mobile (le visuel est masqué sous 1024 px) -->
        <ul class="lg:hidden flex flex-wrap gap-2 mt-10">
          ${ht.chips.map((c, i) => `<li class="chip">${lineIcon(chipIcons[i], 16)}${c}</li>`).join("")}
        </ul>
      </div>
    </section>

    <!-- BANDEAU DÉFILANT -->
    <section class="section-deep py-5" aria-label="${ht.techLabel}">
      <div class="marquee">
        <ul class="marquee-track">
          ${techs.map((t) => `<li>${t}<span aria-hidden="true" style="color:#0062E6;margin-left:28px">◆</span></li>`).join("")}
          ${techs.map((t) => `<li aria-hidden="true">${t}<span style="color:#0062E6;margin-left:28px">◆</span></li>`).join("")}
        </ul>
      </div>
    </section>

    <!-- SERVICES PREVIEW -->
    <section class="py-24 max-w-6xl mx-auto px-4 md:px-8">
      ${sectionHead({
        index: "01",
        label: st.label,
        title: st.title,
        lead: st.sub,
        action: `<button onclick="navigate('services')" class="btn-outline">${st.cta} ${arrow}</button>`,
      })}
      ${renderServicesBento({ st, isEn, arrow, rail: true, headingTag: "h3" })}
    </section>

    <!-- MÉTHODE (section sombre) -->
    <section class="section-deep wave-edges pt-28 pb-28">
      ${waveSVG("#60A5FA")}
      <svg class="flow-waves" aria-hidden="true" viewBox="0 0 1440 600" preserveAspectRatio="xMidYMid slice"><path class="flow-pulse flow-pulse-1" d="M-100,160 C200,40 420,280 720,150 C1020,20 1220,280 1540,140"/><path class="flow-pulse flow-pulse-3" d="M-100,460 C220,340 440,580 740,450 C1040,320 1240,580 1540,440"/></svg>
      <div class="relative max-w-6xl mx-auto px-4 md:px-8">
        ${sectionHead({
          index: "02",
          label: ht.process.label,
          title: ht.process.title,
          lead: isEn ? "Four clear steps. You approve each one before we move on to the next." : "Quatre étapes claires. Vous validez chacune avant que l'on passe à la suivante.",
          dark: true,
        })}
        <ol class="snap-rail snap-rail-sm grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          ${ht.process.steps
            .map(
              (step, i) => `
          <li class="step-card p-6 reveal" style="transition-delay:${i * 90}ms">
            <div class="flex items-center justify-between mb-6">
              <span class="step-num" aria-hidden="true">0${i + 1}</span>
              <span style="color:#60A5FA">${lineIcon(step.icon, 28)}</span>
            </div>
            <h3 class="font-display font-700 text-lg mb-2 text-white">${step.title}</h3>
            <p class="step-cmd mb-3"><span aria-hidden="true">$ </span>${["devis --gratuit", "design --maquette", "npm run build", "git push --prod"][i]}</p>
            <p class="text-sm leading-relaxed" style="color:#cbd5e1">${step.desc}</p>
          </li>`,
            )
            .join("")}
        </ol>
      </div>
    </section>

    <!-- ACADEMY (renvoi vers la page Formations) -->
    <div class="max-w-6xl mx-auto px-4 md:px-8 pt-16">${renderServicesTrainings()}</div>

    <!-- PORTFOLIO PREVIEW -->
    <section class="py-20" style="background:color-mix(in srgb, var(--card) 60%, transparent); border-top:1px solid var(--border); border-bottom:1px solid var(--border)">
      <div class="max-w-6xl mx-auto px-4 md:px-8">
        ${sectionHead({
          index: "03",
          label: pt.label,
          title: pt.title,
          lead: pt.sub,
          action: `<button onclick="navigate('portfolio')" class="btn-outline">${isEn ? "View all projects" : "Voir tous les projets"} ${arrow}</button>`,
        })}
        <div class="snap-rail grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          ${featuredProjects
            .map(
              (p, i) => renderProjectCard(p, i, "h3", i === 0 ? "project-feature md:col-span-2" : ""),
            )
            .join("")}
        </div>
        <div class="text-center mt-10">
          <button onclick="navigate('contact')" class="btn-primary">${pt.cta} <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg></button>
        </div>
      </div>
    </section>

    <!-- CTA BANNER -->
    <section class="py-20 text-center relative overflow-hidden cta-animated">
      ${waveSVG("white")}
      <div class="relative max-w-2xl mx-auto px-4">
        <h2 class="font-display font-700 text-white mb-4 reveal" style="font-size:clamp(1.8rem,4vw,2.8rem)">${state.lang === "fr" ? "Prêt à transformer votre présence digitale ?" : "Ready to transform your digital presence?"}</h2>
        <p class="text-blue-100 mb-8 reveal">${state.lang === "fr" ? "Discutons de votre projet — réponse sous 24h garantie." : "Let's discuss your project — response within 24h guaranteed."}</p>
        <div class="flex flex-wrap gap-3 justify-center reveal">
          <button onclick="navigate('contact')" class="btn-primary" style="background:white;color:#004AAD;border-color:white">${state.lang === "fr" ? "Demander un devis gratuit" : "Request a Free Quote"}</button>
          <a href="https://wa.me/24166198918" target="_blank" rel="noopener noreferrer" class="btn-outline" style="border-color:rgba(255,255,255,0.5);color:white">WhatsApp →</a>
        </div>
      </div>
    </section>
  </div>`;
}

// ==================== SERVICES PAGE ====================
function contactSocialPackage(packageName, packagePrice, packagePeriod) {
  const phone = "24166198918";
  const fullPrice = `${packagePrice} XAF ${packagePeriod}`.trim();
  const message =
    state.lang === "fr"
      ? `Bonjour M.G.N CodeWave, je souhaite choisir l'offre Social Media \"${packageName}\" au prix de ${fullPrice}.`
      : `Hello M.G.N CodeWave, I would like to choose the Social Media \"${packageName}\" package priced at ${fullPrice}.`;

  const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank", "noopener,noreferrer");
}

function renderServices() {
  const isEn = state.lang === "en";
  const arrow = `<svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>`;
  const t = translations[state.lang];
  const st = t.services;
  const soc = t.social;

  return `
  <div class="page pb-16">
    ${renderPageHero({
      label: st.label,
      title: st.title,
      sub: st.sub,
      path: "services",
      facts: [
        [String(st.items.length), isEn ? "core services" : "offres principales"],
        [String(serviceOffers.reduce((n, o) => n + o.deliverables.fr.length, 0)), isEn ? "deliverables detailed service by service" : "livrables détaillés offre par offre"],
        [isEn ? "24h" : "24 h", isEn ? "to receive your free quote" : "pour recevoir votre devis gratuit"],
        ["Airtel · Moov", isEn ? "Mobile Money accepted" : "Mobile Money accepté"],
      ],
    })}
    <div class="max-w-6xl mx-auto px-4 md:px-8">

      <!-- Offres : bento partagé avec l'accueil -->
      <section class="mb-24" aria-labelledby="offers-title">
        ${sectionHead({
          index: "01",
          label: isEn ? "Our services" : "Nos offres",
          title: isEn ? "Clear services,\none single team" : "Des offres claires,\nune seule équipe",
          lead: isEn ? "Open a service to see what you get, in how long, and under what warranty. Every quote is free." : "Ouvrez une offre pour voir ce que vous recevez, en combien de temps et sous quelle garantie. Chaque devis est gratuit.",
          id: "offers-title",
        })}
        ${renderServicesBento({ st, isEn, arrow, headingTag: "h2" })}
      </section>

      <!-- Social Media Packages -->
      <div class="mb-24">
        ${sectionHead({ index: "02", label: soc.label, title: soc.title, lead: soc.sub })}
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          ${soc.packages
            .map(
              (pkg, i) => `
            <div class="card p-7 reveal ${pkg.highlight ? "pricing-highlight" : ""}" data-badge="${state.lang === "en" ? "POPULAR" : "POPULAIRE"}" style="transition-delay:${i * 80}ms">
              <p class="font-display font-700 text-lg mb-1" style="color:var(--fg)">${pkg.name}</p>
              <p class="text-xs uppercase tracking-wider mb-4" style="color:var(--muted)">${pkg.posts}</p>
              <ul class="space-y-2 mb-6">
                ${pkg.items.map((item) => `<li class="flex items-center gap-2 text-sm" style="color:var(--muted)"><span aria-hidden="true" style="color:#10b981">✓</span>${item}</li>`).join("")}
              </ul>
              <div style="border-top:1px solid var(--border)" class="pt-4">
                <p class="text-sm" style="color:var(--muted)">${state.lang === "fr" ? "Engagement mensuel, sans durée minimale" : "Monthly, no minimum commitment"}</p>
                <p class="offer-hint" style="margin-top:6px">${pkg.price} XAF ${pkg.period}</p>
              </div>
              <button onclick="contactSocialPackage('${pkg.name}', '${pkg.price}', '${pkg.period}')" class="btn-primary w-full mt-4 justify-center text-sm py-2" ${pkg.highlight ? "" : 'style="background:transparent;color:var(--primary-fg);border-color:var(--primary-fg)"'}>
                ${state.lang === "fr" ? "Choisir ce plan" : "Choose this plan"}
              </button>
            </div>
          `,
            )
            .join("")}
        </div>
      </div>

      ${renderQuoteMethod()}

      ${renderServicesTrainings()}

      <div class="text-center">
        <button onclick="navigate('contact')" class="btn-primary">${state.lang === "fr" ? "Demander un devis personnalisé" : "Request a Custom Quote"} <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg></button>
      </div>
    </div>
  </div>`;
}

// Rassurer sans tableau de prix : les règles de chiffrage, tirées des CGV (devis, paiement, garantie).
function renderQuoteMethod() {
  const isEn = state.lang === "en";
  const steps = isEn
    ? [
        ["chat", "You describe your need", "On WhatsApp or through the form. No commitment, no account to create."],
        ["file", "We write a detailed quote", "Scope, deliverables and timeline in writing, within 24 hours."],
        ["wallet", "You choose how to pay", "One, two or three instalments, by Mobile Money or transfer."],
        ["shield", "You stay covered", "30-day warranty after delivery, then optional maintenance."],
      ]
    : [
        ["chat", "Vous décrivez votre besoin", "Sur WhatsApp ou via le formulaire. Sans engagement, sans compte à créer."],
        ["file", "Nous rédigeons un devis détaillé", "Périmètre, livrables et délai par écrit, sous 24 heures."],
        ["wallet", "Vous choisissez votre paiement", "En une, deux ou trois fois, par Mobile Money ou virement."],
        ["shield", "Vous restez couvert", "Garantie 30 jours après la livraison, puis maintenance si vous le souhaitez."],
      ];
  return `
      <section class="mb-24" aria-labelledby="quote-method-title">
        ${sectionHead({
          index: "03",
          label: isEn ? "Method" : "Méthode",
          title: isEn ? "How we price\na project" : "Comment on chiffre\nun projet",
          lead: isEn
            ? "Every project is quoted after we understand it. The price of each service is detailed inside its card, above."
            : "Chaque projet est chiffré une fois compris. Le tarif de chaque offre est détaillé dans sa fiche, ci-dessus.",
          id: "quote-method-title",
        })}
        <ol class="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          ${steps
            .map(
              ([icon, title, text], i) => `
          <li class="card p-6 reveal" style="transition-delay:${i * 70}ms">
            <div class="flex items-center justify-between mb-5">
              <span class="icon-tile">${lineIcon(icon, 22)}</span>
              <span class="font-display font-700 text-2xl" style="color:color-mix(in srgb, var(--primary-fg) 30%, transparent)">0${i + 1}</span>
            </div>
            <h3 class="font-display font-700 text-base mb-2" style="color:var(--fg)">${title}</h3>
            <p class="text-sm leading-relaxed" style="color:var(--muted)">${text}</p>
          </li>`,
            )
            .join("")}
        </ol>
      </section>`;
}

// Les formations ont leur propre page : un simple renvoi, sans dupliquer les prix.
function renderServicesTrainings() {
  const isEn = state.lang === "en";
  return `
      <div class="card p-6 md:p-8 mb-12 reveal flex flex-col md:flex-row md:items-center justify-between gap-6" style="border-top:3px solid var(--primary)">
        <div>
          <p class="section-label mb-2">CodeWave Academy</p>
          <h3 class="font-display font-700 text-xl mb-2" style="color:var(--fg)">${isEn ? "Want to learn instead?" : "Envie d'apprendre à le faire vous-même ?"}</h3>
          <p class="text-sm" style="color:var(--muted)">${isEn ? "FullStack MERN bootcamp, React and Node.js modules, WordPress, SEO and AI workshops — small groups, hands-on." : "Bootcamp FullStack MERN, modules React et Node.js, ateliers WordPress, SEO et IA — petits groupes, 70 % de pratique."}</p>
        </div>
        <button onclick="navigate('formations')" class="btn-primary whitespace-nowrap">${isEn ? "See our courses" : "Voir les formations"} →</button>
      </div>`;
}

// Carte projet partagée (accueil et page Portfolio). Vrai lien : clavier, nouvel onglet, partage ;
// le clic ouvre la fiche sur place quand ses données sont chargées.
// `extraClass` : variantes de mise en page (ex. projet à la une sur l'accueil).
function renderProjectCard(p, i, headingTag, extraClass = "") {
  const tint = `color:${p.color};color:color-mix(in srgb, ${p.color} 50%, var(--fg))`;
  return `
          <a href="./portfolio.html?projet=${p.id}" onclick="event.preventDefault(); navigateToPortfolioDetail(${p.id})" class="card block overflow-hidden reveal group ${extraClass}" style="transition-delay:${i * 50}ms">
            <div class="h-48 relative overflow-hidden flex items-center justify-center" style="background:${p.color}14">
              <div class="absolute inset-0" style="background:linear-gradient(135deg,${p.color}22,${p.color}08)"></div>
              <svg aria-hidden="true" class="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 300 200" preserveAspectRatio="xMidYMid slice">
                <path d="M-50,80 C50,30 100,130 200,80 C300,30 350,130 450,80" fill="none" stroke="${p.color}" stroke-width="2"/>
                <path d="M-50,100 C50,50 100,150 200,100 C300,50 350,150 450,100" fill="none" stroke="${p.color}" stroke-width="1.5"/>
                <path d="M-50,120 C50,70 100,170 200,120 C300,70 350,170 450,120" fill="none" stroke="${p.color}" stroke-width="1"/>
              </svg>
              <div aria-hidden="true" class="project-mock relative">
                <div class="project-mock-bar"><i></i><i></i><i></i></div>
                <div class="p-2.5 space-y-2">
                  <div class="px-3 py-2.5 font-display font-700 text-white text-xs truncate" style="background:${p.color};background:color-mix(in srgb, ${p.color} 70%, #0f172a)">${p.title}</div>
                  <div class="grid grid-cols-3 gap-1.5">${[0, 1, 2].map(() => `<div style="height:16px;background:${p.color}22"></div>`).join("")}</div>
                  <div class="mock-line" style="width:80%"></div>
                  <div class="mock-line" style="width:55%"></div>
                </div>
              </div>
              <div class="absolute bottom-3 left-3">
                <span class="badge" style="background:var(--card);${tint}">${p.category}</span>
              </div>
            </div>
            <div class="p-5">
              <${headingTag} class="font-display font-700 text-base mb-1" style="color:var(--fg)">${p.title}</${headingTag}>
              <p class="text-sm mb-3" style="color:var(--muted)">${p.subtitle}</p>
              <div class="flex flex-wrap gap-2">
                ${p.tags.map((tag) => `<span class="text-xs px-2 py-0.5" style="background:var(--border);color:var(--fg)">${tag}</span>`).join("")}
              </div>
              <p class="mt-4 text-sm font-display font-700 flex items-center gap-2" style="color:var(--primary-fg)">${state.lang === "fr" ? "Voir le détail" : "View details"} <span aria-hidden="true" class="transition-transform group-hover:translate-x-1">→</span></p>
            </div>
          </a>`;
}

// Éléments cliquables non natifs (role="link") : Entrée les active, comme un lien.
function activateOnEnter(event) {
  if (event.key !== "Enter") return;
  event.preventDefault();
  event.currentTarget.click();
}

// ==================== PORTFOLIO PAGE ====================
function renderPortfolio() {
  const isEn = state.lang === "en";
  const t = translations[state.lang].portfolio;
  const filterKeys = [
    "all",
    "E-Commerce",
    "Site Vitrine",
    "Application",
    "Portfolio",
  ];
  const filterLabels = t.filters;

  const filtered =
    state.portfolioFilter === "all"
      ? portfolioProjects
      : portfolioProjects.filter((p) => p.category === state.portfolioFilter);

  return `
  <div class="page pb-16">
    ${renderPageHero({
      label: t.label,
      title: t.title,
      sub: t.sub,
      path: "portfolio",
      facts: [
        [String(portfolioProjects.length), isEn ? "projects presented" : "projets présentés"],
        [String(new Set(portfolioProjects.map((p) => p.category)).size), isEn ? "types of projects" : "types de projets"],
        [isEn ? "Web · Mobile" : "Web · Mobile", isEn ? "sites, stores and apps" : "sites, boutiques et applications"],
      ],
    })}
    <div class="max-w-6xl mx-auto px-4 md:px-8">

      <!-- Stats bar -->
      <div class="flex justify-center gap-8 mb-10 p-5 card">
        <div class="text-center"><p class="font-display font-700 text-2xl" style="color:var(--primary-fg)">50+</p><p class="text-xs uppercase tracking-wider" style="color:var(--muted)">Projets</p></div>
        <div style="width:1px;background:var(--border)"></div>
        <div class="text-center"><p class="font-display font-700 text-2xl" style="color:var(--primary-fg)">20+</p><p class="text-xs uppercase tracking-wider" style="color:var(--muted)">${state.lang === "fr" ? "Clients" : "Clients"}</p></div>
        <div style="width:1px;background:var(--border)"></div>
        <div class="text-center"><p class="font-display font-700 text-2xl" style="color:var(--primary-fg)">100%</p><p class="text-xs uppercase tracking-wider" style="color:var(--muted)">${state.lang === "fr" ? "Satisfaction" : "Satisfaction"}</p></div>
      </div>

      <!-- Filters -->
      <div class="flex flex-wrap gap-2 mb-10 justify-center">
        ${filterKeys
          .map(
            (k, i) => `
          <button id="filter-${k}" onclick="setPortfolioFilter('${k}')" aria-pressed="${state.portfolioFilter === k}" class="filter-pill ${state.portfolioFilter === k ? "active" : ""}">
            ${filterLabels[i]}
          </button>
        `,
          )
          .join("")}
      </div>

      <!-- Projects Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        ${filtered
          .map(
            (p, i) => renderProjectCard(p, i, "h2"),
          )
          .join("")}
      </div>

      ${filtered.length === 0 ? `<div class="text-center py-16" style="color:var(--muted)">${state.lang === "fr" ? "Aucun projet dans cette catégorie." : "No projects in this category."}</div>` : ""}

      <!-- CTA -->
      <div class="mt-16 p-8 text-center" style="background:linear-gradient(135deg,#004AAD,#0062E6)">
        <h3 class="font-display font-700 text-white text-2xl mb-3">${state.lang === "fr" ? "Votre Projet Sera Le Prochain !" : "Your Project Is Next!"}</h3>
        <p class="text-blue-100 mb-6">${state.lang === "fr" ? "Discutons de votre idée et créons ensemble quelque chose d'extraordinaire." : "Let's discuss your idea and create something extraordinary together."}</p>
        <button onclick="navigate('contact')" class="btn-primary" style="background:white;color:#004AAD;border-color:white">${t.cta}</button>
      </div>
    </div>
  </div>`;
}

function setPortfolioFilter(f) {
  state.portfolioFilter = f;
  render();
}

// ==================== BLOG PAGE ====================
// Couverture d'article générée : dégradé propre à la thématique, ondes de la charte, numéro de l'article.
// Purement décorative (aria-hidden) : le titre et la thématique sont donnés en texte à côté.
const ARTICLE_COVER_THEMES = {
  Conseils: ["#003A8C", "#0062E6"],
  Tutoriels: ["#0B5E57", "#0F9E8E"],
  Actualités: ["#8A2E0C", "#D9570F"],
  Entrepreneuriat: ["#4C1D95", "#7C3AED"],
};

function articleCover(post, large = false) {
  const [from, to] = ARTICLE_COVER_THEMES[post.category] || ARTICLE_COVER_THEMES.Conseils;
  const topic = state.lang === "en" ? post.categoryEn : post.category;
  return `<div class="article-cover${large ? " article-cover-lg" : ""}" style="--c1:${from};--c2:${to}" aria-hidden="true">
              <svg class="article-cover-waves" viewBox="0 0 400 200" preserveAspectRatio="none">
                <path d="M-20,120 C60,70 140,170 220,115 C300,60 360,150 420,110"/>
                <path d="M-20,145 C60,95 140,195 220,140 C300,85 360,175 420,135"/>
                <path d="M-20,170 C60,120 140,220 220,165 C300,110 360,200 420,160"/>
              </svg>
              <span class="article-cover-topic">// ${topic.toLowerCase()}</span>
              <span class="article-cover-num">${String(post.id).padStart(2, "0")}</span>
            </div>`;
}

function renderBlog() {
  const t = translations[state.lang].blog;
  const isEn = state.lang === "en";
  const catColors = {
    Conseils: "badge-blue",
    Tips: "badge-blue",
    Tutoriels: "badge-teal",
    Tutorials: "badge-teal",
    Actualités: "badge-orange",
    News: "badge-orange",
    Entrepreneuriat: "badge-purple",
    Entrepreneurship: "badge-purple",
  };
  const featured = blogPosts[0];
  const rest = blogPosts.slice(1);

  return `
  <div class="page pb-16">
    ${renderPageHero({
      label: t.label,
      title: t.title,
      sub: t.sub,
      path: "blog",
      facts: [
        [String(blogPosts.length), isEn ? "practical articles" : "articles pratiques"],
        [String(new Set(blogPosts.map((p) => p.category)).size), isEn ? "topics" : "thématiques"],
        [`${blogPosts.reduce((n, p) => n + Number(p.read || 0), 0)} min`, isEn ? "of reading in total" : "de lecture au total"],
      ],
    })}
    <div class="max-w-6xl mx-auto px-4 md:px-8">

      <!-- Featured Article -->
      <div onclick="navigateToBlogDetail(${featured.id})" role="link" tabindex="0" onkeydown="activateOnEnter(event)" class="card block mb-10 overflow-hidden reveal group cursor-pointer">
        <div class="md:flex">
          <div class="md:w-2/5 min-h-[14rem] relative overflow-hidden">
            ${articleCover(featured, true)}
            <div class="absolute top-4 left-4">
              <span class="badge" style="background:white;color:#004AAD">${state.lang === "fr" ? "Article à la une" : "Featured"}</span>
            </div>
          </div>
          <div class="p-6 md:p-8 md:w-3/5 flex flex-col justify-center">
            <span class="badge badge-blue mb-3">${isEn ? featured.categoryEn : featured.category}</span>
            <h2 class="font-display font-700 text-xl md:text-2xl leading-tight mb-3 group-hover:text-blue-600 transition-colors" style="color:var(--fg)">${isEn ? featured.titleEn : featured.title}</h2>
            <p class="text-sm leading-relaxed mb-4" style="color:var(--muted)">${isEn ? featured.excerptEn : featured.excerpt}</p>
            <div class="flex items-center gap-4 text-xs" style="color:var(--muted)">
              <span class="inline-flex items-center gap-1.5">${lineIcon("calendar", 14)}${isEn ? featured.dateEn : featured.date}</span>
              <span class="inline-flex items-center gap-1.5">${lineIcon("clock", 14)}${featured.read} ${t.minRead}</span>
            </div>
            <span class="mt-4 inline-flex items-center gap-2 text-sm font-display font-700" style="color:var(--primary-fg)">${t.readMore} →</span>
          </div>
        </div>
      </div>

      <!-- Articles Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        ${rest
          .map(
            (post, i) => `
          <div onclick="navigateToBlogDetail(${post.id})" role="link" tabindex="0" onkeydown="activateOnEnter(event)" class="card block overflow-hidden reveal group cursor-pointer" style="transition-delay:${i * 60}ms">
            <div class="h-40 relative overflow-hidden">${articleCover(post)}</div>
            <div class="p-5">
              <div class="flex items-center gap-2 mb-3">
                <span class="badge ${catColors[isEn ? post.categoryEn : post.category] || "badge-blue"}">${isEn ? post.categoryEn : post.category}</span>
                <span class="text-xs" style="color:var(--muted)">${post.read} ${t.minRead}</span>
              </div>
              <h3 class="font-display font-700 text-base leading-snug mb-2 group-hover:text-blue-600 transition-colors" style="color:var(--fg)">${isEn ? post.titleEn : post.title}</h3>
              <p class="text-xs leading-relaxed mb-3" style="color:var(--muted)">${isEn ? post.excerptEn : post.excerpt}</p>
              <p class="text-xs" style="color:var(--muted)">${isEn ? post.dateEn : post.date}</p>
            </div>
          </div>
        `,
          )
          .join("")}
      </div>

      <!-- Blog CTA -->
      <div class="mt-14 p-8 text-center card">
        <h3 class="font-display font-700 text-xl mb-2" style="color:var(--fg)">${state.lang === "fr" ? "Besoin d'un site web professionnel&nbsp;?" : "Need a Professional Website?"}</h3>
        <p class="mb-5" style="color:var(--muted)">${state.lang === "fr" ? "Nos articles vous ont convaincu ? Passez à l'action dès maintenant !" : "Our articles convinced you? Take action now!"}</p>
        <div class="flex flex-wrap gap-3 justify-center">
          <button onclick="navigate('contact')" class="btn-primary">${state.lang === "fr" ? "Demander un devis gratuit" : "Request a Free Quote"}</button>
          <button onclick="navigate('portfolio')" class="btn-outline">${state.lang === "fr" ? "Voir nos réalisations" : "View Our Work"}</button>
        </div>
      </div>
    </div>
  </div>`;
}

// ==================== ABOUT PAGE ====================
function renderAbout() {
  const t = translations[state.lang].about;
  const skills = [
    "React",
    "Next.js",
    "Flutter",
    "Node.js",
    "Tailwind CSS",
    "WordPress",
    "WooCommerce",
    "MySQL",
    "Git",
    "Figma",
    "SEO",
    "Google Analytics",
  ];

  return `
  <div class="page pb-16">
    <section class="page-hero relative overflow-hidden pt-32 pb-24 mb-12">
      <canvas class="wave-field" aria-hidden="true"></canvas>
      <div class="hero-glow" aria-hidden="true"></div>
    <div class="relative max-w-6xl mx-auto px-4 md:px-8">
      <div class="grid md:grid-cols-2 gap-16 items-center">
        <!-- Left: Text -->
        <div>
          <p class="section-label mb-3">${t.label}</p>
          <h1 class="font-display font-700 leading-tight mb-6" style="font-size:clamp(2rem,4vw,3.5rem); color:var(--fg);">${accentTitle(t.title)}</h1>
          <p class="leading-relaxed mb-8" style="color:var(--muted)">${t.desc}</p>
          <div class="grid grid-cols-2 gap-3 mb-8">
            ${t.values
              .map(
                (v) => `
              <div class="flex items-center gap-2 text-sm font-600" style="color:var(--fg)">
                <span style="color:var(--primary-fg)">◆</span> ${v}
              </div>
            `,
              )
              .join("")}
          </div>
          <button onclick="navigate('contact')" class="btn-primary">${t.cta} <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg></button>
        </div>
        <!-- Right: Portrait card -->
        <div class="reveal">
          <div class="card p-4 md:p-6 relative overflow-hidden">
            ${waveSVG()}
            <div class="relative space-y-5">
              <div class="rounded-2xl overflow-hidden border" style="border-color:var(--border); background:var(--bg)">
                <picture>
                  <source srcset="./assets/images/MGN-Richard.webp" type="image/webp" />
                  <img
                    src="./assets/images/MGN-Richard.jpg"
                    alt="Portrait de M.G.N A. Richard"
                    width="750"
                    height="1125"
                    loading="lazy"
                    decoding="async"
                    class="w-full aspect-[2/3] max-h-[560px] object-cover object-center"
                  />
                </picture>
              </div>
              <div>
                <p class="section-label mb-2">${t.visionary_label}</p>
                <h2 class="font-display font-700 text-2xl mb-3" style="color:var(--fg)">${t.visionary_title}</h2>
                <p class="leading-relaxed" style="color:var(--muted)">${t.visionary_desc}</p>
              </div>
            </div>
            <div class="absolute -bottom-2 left-6 right-6 h-1" style="background:linear-gradient(90deg,#004AAD,transparent)"></div>
          </div>
        </div>
      </div>
    </div>
    </section>
    <div class="max-w-6xl mx-auto px-4 md:px-8">

      <!-- Skills -->
      <div class="mb-24">
        ${sectionHead({
          index: "01",
          label: state.lang === "fr" ? "Expertise" : "Expertise",
          title: t.skills_title,
          lead: state.lang === "fr" ? "Les outils que nous utilisons chaque jour pour livrer des sites rapides et durables." : "The tools we use every day to ship fast, long-lasting websites.",
        })}
        <div class="flex flex-wrap gap-3">
          ${skills
            .map(
              (s, i) => `
            <span class="reveal card px-4 py-2 text-sm font-display font-600" style="transition-delay:${i * 40}ms; color:var(--fg)">${s}</span>
          `,
            )
            .join("")}
        </div>
      </div>

      <!-- Timeline -->
      ${sectionHead({
        index: "02",
        label: state.lang === "fr" ? "Parcours" : "Journey",
        title: state.lang === "fr" ? "Notre histoire" : "Our story",
      })}
      <div class="card p-6 md:p-10">
        <div class="space-y-6">
          ${[
            [
              "2025",
              state.lang === "fr"
                ? "Fondation de M.G.N CodeWave à Libreville"
                : "Foundation of M.G.N CodeWave in Libreville",
              "bg-blue-600",
            ],
            [
              "2026",
              state.lang === "fr"
                ? "Expansion vers la gestion des réseaux sociaux et le développement mobile"
                : "Expansion into social media management and mobile development",
              "bg-blue-400",
            ],
          ]
            .map(
              ([year, desc, bg]) => `
            <div class="flex gap-4 items-start">
              <div class="w-16 text-right flex-shrink-0"><span class="font-display font-700 text-sm" style="color:var(--primary-fg)">${year}</span></div>
              <div class="w-3 h-3 mt-1 flex-shrink-0 rounded-full ${bg}" style="background:#004AAD"></div>
              <p class="text-sm" style="color:var(--muted)">${desc}</p>
            </div>
          `,
            )
            .join("")}
        </div>
      </div>
    </div>
  </div>`;
}

// ==================== CONTACT PAGE ====================
// ==================== PARTNERSHIP ====================
function renderPartnership() {
  const t = translations[state.lang].partnership;
  const isEn = state.lang === "en";
  const isDark = state.theme === "dark";

  return `
  <div class="page pb-16">
    ${renderPageHero({
      label: t.label,
      title: t.title,
      sub: t.sub,
      path: "partenariat",
      facts: [
        [String(t.section1.items.length), isEn ? "partnership benefits" : "avantages partenaires"],
        [String(t.section2.profiles.length), isEn ? "profiles we are looking for" : "profils recherchés"],
        [String(t.section3.steps.length), isEn ? "steps to get started" : "étapes pour démarrer"],
      ],
      // Adresse publique du formulaire (l'ancienne pointait vers la vue d'édition du propriétaire).
      actions: `<a href="https://docs.google.com/forms/d/1viH1bGb7YTWTVj-i2xGllViKp3JVFsvm9FJEGXAdSZU/viewform" target="_blank" rel="noopener noreferrer" class="btn-primary">${t.cta} ${lineIcon("link", 16)}</a>
          <p class="w-full text-sm" style="color:var(--muted)">${t.ctaSub}</p>`,
    })}
    <div class="max-w-6xl mx-auto px-4 md:px-8">

      <!-- Why Join Section -->
      <div class="mb-24">
        ${sectionHead({ index: "01", label: state.lang === "fr" ? "Avantages" : "Benefits", title: t.section1.title })}
        <div class="grid md:grid-cols-4 gap-6">
          ${t.section1.items
            .map(
              (item) => `
            <div class="card p-6 reveal hover:shadow-lg transition-all">
              <div class="text-4xl mb-4">${iconFromEmoji(item.icon, 30)}</div>
              <h3 class="font-display font-700 mb-2" style="color:var(--fg)">${item.title}</h3>
              <p class="text-sm" style="color:var(--muted)">${item.desc}</p>
            </div>
          `,
            )
            .join("")}
        </div>
      </div>

      <!-- Profiles Section -->
      <div class="mb-20" style="background:linear-gradient(135deg, var(--card) 0%, rgba(0,74,173,0.04) 100%); border:1px solid var(--border); padding:3rem; border-radius:8px;">
        ${sectionHead({ index: "02", label: state.lang === "fr" ? "Profils" : "Profiles", title: t.section2.title, lead: t.section2.intro })}

        <div class="grid md:grid-cols-2 gap-4">
          ${t.section2.profiles
            .map(
              (profile) => `
            <div class="flex items-center gap-3 p-4" style="background:var(--bg); border:1px solid var(--border); border-radius:6px;">
              <span style="color:var(--primary-fg); font-size:18px;">✓</span>
              <span style="color:var(--fg)">${profile}</span>
            </div>
          `,
            )
            .join("")}
        </div>
      </div>

      <!-- Process Section -->
      <div class="mb-24">
        ${sectionHead({ index: "03", label: state.lang === "fr" ? "Étapes" : "Steps", title: t.section3.title })}

        <div class="grid md:grid-cols-4 gap-6 relative">
          <!-- Connector line (hidden on mobile) -->
          <div class="hidden md:block absolute top-20 left-0 right-0 h-1" style="background:linear-gradient(90deg, #004AAD 0%, #0062E6 50%, #8b5cf6 100%); transform:translateY(-50%);"></div>

          ${t.section3.steps
            .map(
              (step, idx) => `
            <div class="relative reveal">
              <div class="flex flex-col items-center">
                <div class="w-16 h-16 flex items-center justify-center font-display font-700 text-xl text-white mb-4 relative z-10" style="background:#004AAD; border-radius:50%; border:4px solid ${isDark ? "#1e293b" : "#f4f3f3"}">
                  ${step.num}
                </div>
                <div class="card p-6 text-center">
                  <h3 class="font-display font-700 mb-2" style="color:var(--fg)">${step.title}</h3>
                  <p class="text-sm" style="color:var(--muted)">${step.desc}</p>
                </div>
              </div>
            </div>
          `,
            )
            .join("")}
        </div>
      </div>

      <!-- Final CTA -->
      <div class="text-center card p-10" style="background:linear-gradient(135deg, #004AAD 0%, #0062E6 100%); color:white; border:none;">
        <h3 class="font-display font-700 text-2xl mb-4">Rejoignez notre équipe d'experts</h3>
        <p class="mb-6 text-white/90">Ensemble, créons l'impact numérique du futur au Gabon.</p>
        <a href="https://docs.google.com/forms/d/1viH1bGb7YTWTVj-i2xGllViKp3JVFsvm9FJEGXAdSZU/viewform" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 font-display font-700 text-lg px-8 py-3" style="background:white;color:#004AAD; border-radius:4px; text-decoration:none; transition:transform 0.2s;" onmouseover="this.style.transform='translateY(-2px)'" onmouseout="this.style.transform='none'">
          Candidater maintenant
          <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7"/></svg>
        </a>
      </div>

    </div>
  </div>`;
}

function renderContact() {
  const t = translations[state.lang].contact;
  const isEn = state.lang === "en";
  return `
  <div class="page">
    <section class="page-hero relative overflow-hidden pt-32 pb-28">
      <canvas class="wave-field" aria-hidden="true"></canvas>
      <div class="hero-glow" aria-hidden="true"></div>
    <div class="relative max-w-6xl mx-auto px-4 md:px-8">
      <div class="grid md:grid-cols-2 gap-16">
        <!-- Left: Info -->
        <div>
          <p class="section-label mb-3">${t.label}</p>
          <h1 class="font-display font-700 leading-tight mb-4" style="font-size:clamp(2rem,4vw,3.5rem); color:var(--fg);">${accentTitle(t.title)}</h1>
          <p class="mb-10" style="color:var(--muted)">${t.sub}</p>

          <div class="space-y-5 mb-10">
            <a href="https://wa.me/24166198918" target="_blank" rel="noopener noreferrer" class="flex items-center gap-4 card p-4 hover:border-green-400 transition-colors" style="color:var(--fg)">
              <div class="w-10 h-10 flex items-center justify-center" style="background:rgba(37,211,102,0.1); color:#25D366">
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
              </div>
              <div>
                <p class="font-display font-700 text-sm">${t.whatsapp}</p>
                <p class="text-xs" style="color:var(--muted)">${t.phone}</p>
              </div>
            </a>
            <div class="flex items-center gap-4 card p-4">
              <div class="w-10 h-10 flex items-center justify-center" style="background:rgba(0,74,173,0.08); color:var(--primary-fg)">
                <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              </div>
              <div>
                <p class="font-display font-700 text-sm">Email</p>
                <p class="text-xs" style="color:var(--muted)">mgncodewave18@gmail.com</p>
              </div>
            </div>
            <div class="flex items-center gap-4 card p-4">
              <div class="w-10 h-10 flex items-center justify-center" style="background:rgba(0,74,173,0.08); color:var(--primary-fg)">
                <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
              </div>
              <div>
                <p class="font-display font-700 text-sm">${state.lang === "fr" ? "Adresse" : "Address"}</p>
                <p class="text-xs" style="color:var(--muted)">${t.address}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Fiche devis : ce que le brief doit contenir pour être chiffrable dès la première réponse -->
        <div class="card p-6 md:p-8 reveal quote-card">
          <div class="quote-head">
            <div>
              <p class="section-label mb-2">${isEn ? "Quote brief" : "Fiche devis"}</p>
              <h2 class="font-display font-700 text-xl" style="color:var(--fg)">${isEn ? "Tell us about your project" : "Parlez-nous de votre projet"}</h2>
            </div>
            <span class="quote-badge">${lineIcon("clock", 15)} ${isEn ? "Reply within 24h" : "Réponse sous 24 h"}</span>
          </div>
          <p class="text-sm mb-6" style="color:var(--muted)">${isEn ? "The more precise this brief, the more accurate your quote. Fields marked with * are required." : "Plus ce brief est précis, plus votre devis sera juste. Les champs marqués d'une * sont obligatoires."}</p>
          <form
          action="https://formspree.io/f/mpweqqzz"
          method="POST"
          onsubmit="handleFormSubmit(event)" class="space-y-4">
            <input type="hidden" name="_subject" value="${isEn ? "New quote brief (website)" : "Nouvelle fiche devis (site web)"}">
            <input type="text" name="_gotcha" tabindex="-1" autocomplete="off" aria-hidden="true" style="position:absolute;left:-9999px;width:1px;height:1px;opacity:0">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label for="contact-name" class="quote-label">${t.name} *</label>
              <input id="contact-name" name="name" type="text" required autocomplete="name" placeholder="${t.name}" class="quote-input">
            </div>
            <div>
              <label for="contact-email" class="quote-label">${t.email} *</label>
              <input id="contact-email" name="email" type="email" required autocomplete="email" placeholder="${t.email}" class="quote-input">
            </div>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label for="contact-company" class="quote-label">${isEn ? "Company" : "Entreprise"}</label>
              <input id="contact-company" name="company" type="text" autocomplete="organization" placeholder="${isEn ? "Optional" : "Facultatif"}" class="quote-input">
            </div>
            <div>
              <label for="contact-phone" class="quote-label">${isEn ? "Phone / WhatsApp" : "Téléphone / WhatsApp"}</label>
              <input id="contact-phone" name="phone" type="tel" autocomplete="tel" placeholder="+241…" class="quote-input">
            </div>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label for="contact-project" class="quote-label">${isEn ? "Type of project" : "Type de projet"} *</label>
              <select id="contact-project" name="project" required class="quote-input">
                <option value="">${isEn ? "Choose…" : "Choisir…"}</option>
                ${translations[state.lang].services.items.map((s) => `<option>${s.title}</option>`).join("")}
                <option>${isEn ? "Mobile app" : "Application mobile"}</option>
                <option>${isEn ? "Training (CodeWave Academy)" : "Formation (CodeWave Academy)"}</option>
                <option>${isEn ? "Something else" : "Autre besoin"}</option>
              </select>
            </div>
            <div>
              <label for="contact-deadline" class="quote-label">${isEn ? "Timeline" : "Échéance"}</label>
              <select id="contact-deadline" name="deadline" class="quote-input">
                <option value="">${isEn ? "No fixed date" : "Pas de date fixée"}</option>
                <option>${isEn ? "Within 2 weeks" : "Sous 2 semaines"}</option>
                <option>${isEn ? "Within a month" : "Sous un mois"}</option>
                <option>${isEn ? "Within three months" : "Sous trois mois"}</option>
                <option>${isEn ? "Later, I am preparing" : "Plus tard, je prépare le projet"}</option>
              </select>
            </div>
            </div>
            <div>
              <label for="contact-budget" class="quote-label">${isEn ? "Indicative budget" : "Budget indicatif"}</label>
              <select id="contact-budget" name="budget" class="quote-input">
                <option value="">${isEn ? "I do not know yet" : "Je ne sais pas encore"}</option>
                <option>${isEn ? "Under 100,000 XAF" : "Moins de 100 000 XAF"}</option>
                <option>100 000 – 300 000 XAF</option>
                <option>300 000 – 800 000 XAF</option>
                <option>${isEn ? "Over 800,000 XAF" : "Plus de 800 000 XAF"}</option>
              </select>
              <p class="quote-note">${isEn ? "An order of magnitude is enough: it tells us which package fits. Nothing is locked in." : "Un ordre de grandeur suffit : il nous dit quelle formule viser. Rien n'est figé."}</p>
            </div>
            <div>
              <label for="contact-message" class="quote-label">${isEn ? "Your project" : "Votre projet"} *</label>
              <textarea id="contact-message" name="message" rows="5" required placeholder="${isEn ? "What you sell, who your clients are, what the site must achieve, examples you like…" : "Ce que vous vendez, à qui, ce que le site doit accomplir, des exemples que vous aimez…"}" class="quote-input resize-none"></textarea>
            </div>
            <button type="submit" class="btn-primary w-full justify-center">${isEn ? "Send my brief" : "Envoyer ma fiche devis"} <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg></button>
            <p class="quote-note">${isEn ? "Your details are used to answer you, and never shared." : "Vos informations servent uniquement à vous répondre, et ne sont jamais transmises à des tiers."}</p>
          </form>
          <div id="form-status" role="status" aria-live="polite" class="mt-4"></div>
          <ul class="quote-reassure">
            <li>${lineIcon("checkCircle", 16)}${isEn ? "Free quote, no commitment" : "Devis gratuit, sans engagement"}</li>
            <li>${lineIcon("shield", 16)}${isEn ? "30-day warranty after delivery" : "Garantie 30 jours après livraison"}</li>
            <li>${lineIcon("wallet", 16)}${isEn ? "Mobile Money, up to 3 instalments" : "Mobile Money, jusqu'à 3 fois"}</li>
          </ul>
        </div>
      </div>
    </div>
    </section>
  </div>`;
}

// ==================== ENVOI DES FORMULAIRES (Formspree) ====================
const FORM_TIMEOUT_MS = 15000;

// Envoie un formulaire à son action Formspree. Ne vide le formulaire qu'en cas de succès confirmé :
// sur une connexion instable, la saisie n'est jamais perdue.
async function submitForm(form, statusEl, messages) {
  const button = form.querySelector("[type=submit]");
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), FORM_TIMEOUT_MS);
  button.disabled = true;
  statusEl.innerHTML = `<p style="color:var(--muted)">${messages.sending}</p>`;
  try {
    const response = await fetch(form.action, {
      method: "POST",
      body: new FormData(form),
      headers: { Accept: "application/json" },
      signal: controller.signal,
    });
    if (!response.ok) throw new Error(`Formspree HTTP ${response.status}`);
    statusEl.innerHTML = `<p class="p-4 font-display font-700" style="background:rgba(16,185,129,0.1);border:1px solid rgba(16,185,129,0.3);color:var(--fg)">${messages.success}</p>`;
    form.reset();
  } catch (error) {
    console.error("Envoi du formulaire impossible :", error);
    statusEl.innerHTML = `<p class="p-4" style="background:rgba(239,68,68,0.08);border:1px solid rgba(239,68,68,0.4);color:var(--fg)">${messages.error} <a href="https://wa.me/24166198918" target="_blank" rel="noopener noreferrer" class="underline font-700">WhatsApp</a>.</p>`;
  } finally {
    clearTimeout(timer);
    button.disabled = false;
  }
}

function handleFormSubmit(e) {
  e.preventDefault();
  const isEn = state.lang === "en";
  submitForm(e.target, document.getElementById("form-status"), {
    sending: isEn ? "Sending…" : "Envoi en cours…",
    success: isEn ? "✓ Message sent! We'll reply within 24h." : "✓ Message envoyé ! Nous vous répondons sous 24h.",
    error: isEn ? "Your message could not be sent (connection or server issue). Your text is still here: try again, or write to us on" : "Votre message n'a pas pu partir (connexion ou serveur). Votre texte est conservé : réessayez, ou écrivez-nous sur",
  });
}

function handleNewsletterSubmit(e) {
  e.preventDefault();
  const isEn = state.lang === "en";
  submitForm(e.target, document.getElementById("newsletter-status"), {
    sending: isEn ? "Sending…" : "Envoi…",
    success: isEn ? "✓ Subscribed." : "✓ Inscription enregistrée.",
    error: isEn ? "Subscription failed. Try again or contact us on" : "Échec de l'inscription. Réessayez ou contactez-nous sur",
  });
}
