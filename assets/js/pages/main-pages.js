// ==================== NAVBAR ====================
function renderNav() {
  const t = translations[state.lang];
  const isDark = state.theme === "dark";
  const pages = [
    ["home", t.nav.home],
    ["services", t.nav.services],
    ["formations", t.nav.formations],
    ["portfolio", t.nav.portfolio],
    ["blog", t.nav.blog],
    ["careers", state.lang === "fr" ? "Carrières" : "Careers"],
    ["partnership", state.lang === "fr" ? "Partenariat" : "Partnership"],
    ["about", t.nav.about],
    ["contact", t.nav.contact],
  ];
  return `
  <nav class="fixed top-3 left-0 right-0 z-50 mx-4 md:mx-auto md:max-w-6xl rounded-none" style="background:${isDark ? "rgba(15,23,42,0.85)" : "rgba(244,243,243,0.85)"}; border:1px solid var(--border);">
    <div class="px-4 md:px-6 py-3 flex items-center justify-between">
      <!-- Logo -->
      <button onclick="navigate('home')" class="flex items-center gap-2 shrink-0" aria-label="${state.lang === "en" ? "Back to home page" : "Retour à l'accueil"}">
        <img
          src="./assets/images/logo-180.png"
          alt="Logo M.G.N CodeWave"
          width="40"
          height="40"
          class="h-10 w-auto object-contain"
        />
        <span class="lg:hidden text-xs font-body font-500 tracking-widest uppercase" style="color:var(--muted);">CodeWave</span>
      </button>

      <!-- Desktop Nav -->
      <div class="hidden lg:flex items-center gap-1">
        ${pages
          .map(
            ([p, l]) => `
          <button onclick="navigate('${p}')" class="px-2.5 py-1.5 text-sm font-display font-600 whitespace-nowrap transition-colors ${state.page === p ? "text-blue-600" : "hover:text-blue-600"}" style="color:${state.page === p ? "var(--primary-fg)" : "var(--muted)"}">
            ${l}
          </button>
        `,
          )
          .join("")}
      </div>

      <!-- Right Controls -->
      <div class="flex items-center gap-2 md:gap-3">
        <!-- Lang Toggle -->
        <div class="flex items-center gap-1 text-xs" style="color:var(--muted)" role="group" aria-label="${state.lang === "fr" ? "Langue" : "Language"}">
          <button id="lang-fr" onclick="setLang('fr')" lang="fr" aria-label="Français" aria-pressed="${state.lang === "fr"}" class="lang-btn ${state.lang === "fr" ? "active" : ""}" style="color:${state.lang === "fr" ? "var(--primary-fg)" : "var(--muted)"}">FR</button>
          <span aria-hidden="true" style="color:var(--border)">|</span>
          <button id="lang-en" onclick="setLang('en')" lang="en" aria-label="English" aria-pressed="${state.lang === "en"}" class="lang-btn ${state.lang === "en" ? "active" : ""}" style="color:${state.lang === "en" ? "var(--primary-fg)" : "var(--muted)"}">EN</button>
        </div>

        <!-- Theme Toggle -->
        <button id="theme-toggle" onclick="toggleTheme()" class="w-8 h-8 flex items-center justify-center transition-colors hover:text-blue-600" style="color:var(--muted)" aria-label="${isDark ? (state.lang === "fr" ? "Passer en mode clair" : "Switch to light mode") : (state.lang === "fr" ? "Passer en mode sombre" : "Switch to dark mode")}">
          ${isDark ? `<svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>` : `<svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>`}
        </button>

        <!-- CTA Button (desktop) -->
        <button onclick="navigate('contact')" class="hidden xl:flex btn-primary text-sm py-2 px-4 whitespace-nowrap">
          ${t.nav.quote}
        </button>

        <!-- Mobile menu toggle -->
        <button id="mobile-menu-toggle" onclick="toggleMobileMenu()" class="lg:hidden w-8 h-8 flex items-center justify-center" style="color:var(--fg)" aria-controls="mobile-menu" aria-expanded="${state.mobileMenuOpen}" aria-label="Menu">
          <svg aria-hidden="true" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            ${state.mobileMenuOpen ? '<path d="M18 6L6 18M6 6l12 12"/>' : '<path d="M3 12h18M3 6h18M3 18h18"/>'}
          </svg>
        </button>
      </div>
    </div>

    <!-- Mobile Menu -->
    ${
      state.mobileMenuOpen
        ? `
    <div id="mobile-menu" class="lg:hidden border-t px-4 py-3 space-y-1" style="border-color:var(--border);">
      ${pages
        .map(
          ([p, l]) => `
        <button onclick="navigate('${p}')" class="w-full text-left px-3 py-2 text-sm font-display font-600 block" style="color:${state.page === p ? "var(--primary-fg)" : "var(--fg)"}">
          ${l}
        </button>
      `,
        )
        .join("")}
      <button onclick="navigate('contact')" class="btn-primary text-sm py-2 w-full mt-2 justify-center">
        ${t.nav.quote}
      </button>
    </div>
    `
        : ""
    }
  </nav>`;
}

function toggleMobileMenu() {
  state.mobileMenuOpen = !state.mobileMenuOpen;
  render();
}

// ==================== FOOTER ====================
function renderFooter() {
  const t = translations[state.lang].footer;
  const isEn = state.lang === "en";

  // Social icon helper
  const socialLinks = [
    {
      href: "https://wa.me/24166198918?text=Bonjour,%20je%20souhaite%20un%20devis%20MGN%20CodeWave",
      label: "WhatsApp",
      hoverColor: "#25D366",
      svg: `<svg width="17" height="17" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>`,
    },
    {
      href: "https://www.instagram.com/mgn_codewave?utm_source=qr&igsh=MWNjcTdreTZ6bm4yZQ==",
      label: "Instagram",
      hoverColor: "#e1306c",
      svg: `<svg width="17" height="17" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>`,
    },
    {
      href: "https://www.facebook.com/share/1D4R7GdjAC/",
      label: "Facebook",
      hoverColor: "#1877f2",
      svg: `<svg width="17" height="17" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>`,
    },
    {
      href: "https://www.linkedin.com/company/mgn-codewave/?viewAsMember=true",
      label: "LinkedIn",
      hoverColor: "#0077b5",
      svg: `<svg width="17" height="17" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>`,
    },
    {
      href: "https://github.com/NGOUBADJAMBO-Richard",
      label: "GitHub",
      hoverColor: "#333",
      svg: `<svg width="17" height="17" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>`,
    },
  ];

  const navLinks = [
    { label: isEn ? "Home" : "Accueil", page: "home" },
    { label: isEn ? "Services" : "Services", page: "services" },
    { label: isEn ? "Training" : "Formations", page: "formations" },
    { label: "Portfolio", page: "portfolio" },
    { label: "Blog", page: "blog" },
    { label: isEn ? "Careers" : "Carrières", page: "careers" },
    { label: isEn ? "About" : "À Propos", page: "about" },
    { label: "Contact", page: "contact" },
  ];

  const serviceLinks = [
    { label: isEn ? "Business Websites" : "Sites Vitrines" },
    { label: "E-Commerce" },
    { label: "SEO & " + (isEn ? "Ranking" : "Référencement") },
    { label: isEn ? "Maintenance" : "Maintenance" },
    { label: isEn ? "Social Media" : "Réseaux Sociaux" },
    { label: isEn ? "Strategy & Audit" : "Audit & Stratégie" },
  ];

  const legalLinks = [
    { label: isEn ? "Legal Notice" : "Mentions Légales", page: "legal" },
    { label: isEn ? "Privacy" : "Confidentialité", page: "privacy" },
    { label: "CGV", page: "cgv" },
    { label: isEn ? "Sitemap" : "Plan du Site", page: "sitemap" },
  ];

  return `
  <footer style="background:#0a0f1e; color:#94a3b8; margin-top:6rem; position:relative; overflow:hidden;">

    <!-- Animated wave top border -->
    <div style="position:absolute;top:0;left:0;right:0;height:3px;background:linear-gradient(90deg,#004AAD,#0062E6,#8b5cf6,#004AAD);background-size:200% 100%;animation:footerGrad 4s linear infinite;"></div>
    <style>
      @keyframes footerGrad{0%{background-position:0% 0}100%{background-position:200% 0}}
      .footer-link { color:#94a3b8; transition:color 0.2s; font-size:13px; text-decoration:none; display:block; padding:3px 0; background:none; border:none; cursor:pointer; text-align:left; }
      .footer-link:hover { color:#60A5FA; }
      .social-icon { width:38px; height:38px; display:flex; align-items:center; justify-content:center; border:1px solid rgba(255,255,255,0.08); color:#94a3b8; transition:all 0.2s; text-decoration:none; }
      .social-icon:hover { border-color:rgba(0,98,230,0.5); color:white; background:rgba(0,98,230,0.12); transform:translateY(-2px); }
      .footer-col-title { font-family:'Syne',sans-serif; font-weight:700; font-size:11px; letter-spacing:0.15em; text-transform:uppercase; color:#e2e8f0; margin-bottom:18px; }
    </style>

    <!-- Background grid texture -->
    <div style="position:absolute;inset:0;opacity:0.025;background-image:repeating-linear-gradient(0deg,#0062E6 0,#0062E6 1px,transparent 0,transparent 60px),repeating-linear-gradient(90deg,#0062E6 0,#0062E6 1px,transparent 0,transparent 60px);pointer-events:none;"></div>

    <!-- CTA Banner -->
    <div style="position:relative;border-bottom:1px solid rgba(255,255,255,0.05);padding:48px 0;">
      <div class="max-w-6xl mx-auto px-4 md:px-8">
        <div class="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p style="font-family:'Syne',sans-serif;font-size:clamp(1.4rem,3vw,2rem);font-weight:800;color:white;line-height:1.2;margin-bottom:8px;">
              ${isEn ? "Ready to launch your project?" : "Prêt à lancer votre projet ?"}
            </p>
            <p style="color:#94a3b8;font-size:14px;">${isEn ? "Free quote in 24h — payment in 2 or 3 instalments available." : "Devis gratuit en 24h — paiement en 2 ou 3 fois disponible."}</p>
          </div>
          <div style="display:flex;gap:12px;flex-wrap:wrap;">
            <button onclick="navigate('contact')" style="background:#004AAD;color:white;padding:12px 28px;font-family:'Syne',sans-serif;font-weight:700;font-size:13px;border:none;cursor:pointer;letter-spacing:0.05em;white-space:nowrap;transition:background 0.2s;" onmouseover="this.style.background='#0062E6'" onmouseout="this.style.background='#004AAD'">
              ${isEn ? "Request a Quote →" : "Demander un Devis →"}
            </button>
            <a href="https://wa.me/24166198918?text=Bonjour,%20je%20souhaite%20un%20devis%20MGN%20CodeWave" target="_blank" style="background:rgba(37,211,102,0.1);color:#25D366;padding:12px 28px;font-family:'Syne',sans-serif;font-weight:700;font-size:13px;border:1px solid rgba(37,211,102,0.25);cursor:pointer;letter-spacing:0.05em;white-space:nowrap;text-decoration:none;display:flex;align-items:center;gap:8px;transition:background 0.2s;" onmouseover="this.style.background='rgba(37,211,102,0.18)'" onmouseout="this.style.background='rgba(37,211,102,0.1)'">
              <svg width="15" height="15" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- Main footer grid -->
    <div style="position:relative;padding:56px 0 40px;">
      <div class="max-w-6xl mx-auto px-4 md:px-8">
        <div class="grid grid-cols-1 md:grid-cols-12 gap-10">

          <!-- Brand column (wider) -->
          <div class="md:col-span-4">
            <!-- Logo -->
            <div style="display:flex;align-items:center;gap:12px;margin-bottom:16px;">
              <img
                src="./assets/images/logo-180.png"
                alt="Logo M.G.N CodeWave"
                width="52"
                height="52"
                loading="lazy"
                style="height:52px;width:auto;object-fit:contain;"
              />
            </div>

            <p style="font-size:13px;line-height:1.7;color:#94a3b8;max-width:280px;margin-bottom:24px;">${t.tagline}</p>

            <!-- Contact info -->
            <div style="display:flex;flex-direction:column;gap:10px;margin-bottom:28px;">
              <a href="tel:+24166198918" style="display:flex;align-items:center;gap:10px;color:#94a3b8;text-decoration:none;font-size:13px;transition:color 0.2s;" onmouseover="this.style.color='#60A5FA'" onmouseout="this.style.color='#94a3b8'">
                <span style="width:28px;height:28px;background:rgba(0,98,230,0.08);display:flex;align-items:center;justify-content:center;flex-shrink:0;">
                  <svg width="13" height="13" fill="none" stroke="#60A5FA" stroke-width="2" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8a19.79 19.79 0 01-3.07-8.67A2 2 0 012 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14.92z"/></svg>
                </span>
                +241 66 19 89 18
              </a>
              <a href="mailto:mgncodewave18@gmail.com" style="display:flex;align-items:center;gap:10px;color:#94a3b8;text-decoration:none;font-size:13px;transition:color 0.2s;" onmouseover="this.style.color='#60A5FA'" onmouseout="this.style.color='#94a3b8'">
                <span style="width:28px;height:28px;background:rgba(0,98,230,0.08);display:flex;align-items:center;justify-content:center;flex-shrink:0;">
                  <svg width="13" height="13" fill="none" stroke="#60A5FA" stroke-width="2" viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                </span>
                mgncodewave18@gmail.com
              </a>
              <div style="display:flex;align-items:center;gap:10px;color:#94a3b8;font-size:13px;">
                <span style="width:28px;height:28px;background:rgba(0,98,230,0.08);display:flex;align-items:center;justify-content:center;flex-shrink:0;">
                  <svg width="13" height="13" fill="none" stroke="#60A5FA" stroke-width="2" viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
                </span>
                Libreville, Gabon 🇬🇦
              </div>
            </div>

            <!-- Social icons -->
            <div style="display:flex;gap:8px;flex-wrap:wrap;">
              ${socialLinks
                .map(
                  (s) => `
                <a href="${s.href}" target="_blank" class="social-icon" title="${s.label}">${s.svg}</a>
              `,
                )
                .join("")}
            </div>
          </div>

          <!-- Navigation -->
          <div class="md:col-span-2">
            <p class="footer-col-title">${isEn ? "Navigation" : "Navigation"}</p>
            <nav style="display:flex;flex-direction:column;gap:2px;">
              ${navLinks.map((l) => `<button onclick="navigate('${l.page}')" class="footer-link">${l.label}</button>`).join("")}
            </nav>
          </div>

          <!-- Services -->
          <div class="md:col-span-3">
            <p class="footer-col-title">${t.services}</p>
            <nav style="display:flex;flex-direction:column;gap:2px;">
              ${serviceLinks.map((l) => `<button onclick="navigate('services')" class="footer-link">${l.label}</button>`).join("")}
            </nav>
          </div>

          <!-- Legal + Newsletter -->
          <div class="md:col-span-3">
            <p class="footer-col-title">${isEn ? "Legal" : "Légal"}</p>
            <nav style="display:flex;flex-direction:column;gap:2px;margin-bottom:32px;">
              ${legalLinks.map((l) => `<button onclick="navigate('${l.page}')" class="footer-link">${l.label}</button>`).join("")}
              <button onclick="navigate('social')" class="footer-link">📡 ${isEn ? "Our Networks" : "Nos Réseaux"}</button>
            </nav>

            <!-- Newsletter mini -->
            <p class="footer-col-title">${isEn ? "Newsletter" : "Newsletter"}</p>
            <p style="font-size:12px;color:#94a3b8;margin-bottom:12px;line-height:1.5;">${isEn ? "Web tips every month. No spam." : "Conseils web chaque mois. Sans spam."}</p>
            <form action="https://formspree.io/f/mpweqqzz" method="POST" onsubmit="handleNewsletterSubmit(event)" style="display:flex;gap:0;">
              <input type="hidden" name="_subject" value="Inscription newsletter">
              <label for="newsletter-email" class="sr-only">${isEn ? "Your email" : "Votre email"}</label>
              <input id="newsletter-email" name="email" type="email" required autocomplete="email" placeholder="${isEn ? "Your email" : "Votre email"}"
                style="flex:1;padding:9px 12px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);color:#e2e8f0;font-size:12px;min-width:0;"
                onfocus="this.style.borderColor='rgba(0,98,230,0.5)'" onblur="this.style.borderColor='rgba(255,255,255,0.08)'">
              <button type="submit" aria-label="${isEn ? "Subscribe" : "S'inscrire"}" style="padding:9px 14px;background:#004AAD;border:none;cursor:pointer;color:white;font-size:12px;transition:background 0.2s;" onmouseover="this.style.background='#0062E6'" onmouseout="this.style.background='#004AAD'">
                <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </button>
            </form>
            <div id="newsletter-status" role="status" aria-live="polite" style="font-size:12px;margin-top:8px;"></div>
          </div>

        </div>
      </div>
    </div>

    <!-- Bottom bar -->
    <div style="position:relative;border-top:1px solid rgba(255,255,255,0.05);padding:20px 0;">
      <div class="max-w-6xl mx-auto px-4 md:px-8">
        <div style="display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:12px;">
          <p style="font-size:12px;color:#94a3b8;">© 2025 M.G.N CodeWave. ${t.rights}</p>
          <div style="display:flex;align-items:center;gap:6px;">
            <span style="display:inline-block;width:6px;height:6px;background:#25D366;border-radius:50%;animation:pulse 2s ease-in-out infinite;"></span>
            <p style="font-size:12px;color:#94a3b8;">${isEn ? "Available for new projects" : "Disponible pour de nouveaux projets"}</p>
          </div>
          <p style="font-size:12px;color:#94a3b8;">${t.made}</p>
        </div>
      </div>
    </div>
    <style>@keyframes pulse{0%,100%{opacity:1}50%{opacity:0.3}}</style>

  </footer>`;
}

// ==================== HOME PAGE ====================
function renderHome() {
  const t = translations[state.lang];
  const ht = t.hero;
  const st = t.services;
  const pt = t.portfolio;

  const featuredProjects = portfolioProjects.slice(0, 6);

  return `
  <div class="page">
    <!-- HERO -->
    <section class="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden" style="background:var(--bg)">
      ${waveSVG()}
      <div class="max-w-6xl mx-auto px-4 md:px-8 w-full">
        <div class="grid md:grid-cols-2 gap-12 items-center">
          <div class="min-w-0">
            <p class="section-label mb-5 reveal visible">${ht.label}</p>
            <h1 class="font-display font-700 leading-none mb-6 reveal visible" style="font-size:clamp(2.75rem,5.2vw,4.75rem); color:var(--fg); white-space:pre-line">${ht.headline}</h1>
            <p class="text-base md:text-lg leading-relaxed mb-8 max-w-lg reveal" style="color:var(--muted)">${ht.sub}</p>
            <div class="flex flex-wrap gap-3 reveal">
              <button onclick="navigate('contact')" class="btn-primary">${ht.cta1} <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg></button>
              <button onclick="navigate('portfolio')" class="btn-outline">${ht.cta2}</button>
            </div>
            <!-- Stats -->
            <div class="flex flex-wrap gap-x-8 gap-y-4 mt-12 reveal">
              <div><p class="font-display font-700 text-3xl" style="color:var(--primary-fg)">${ht.stat1_n}</p><p class="text-xs uppercase tracking-wider" style="color:var(--muted)">${ht.stat1_l}</p></div>
              <div style="width:1px;background:var(--border)"></div>
              <div><p class="font-display font-700 text-3xl" style="color:var(--primary-fg)">${ht.stat2_n}</p><p class="text-xs uppercase tracking-wider" style="color:var(--muted)">${ht.stat2_l}</p></div>
              <div style="width:1px;background:var(--border)"></div>
              <div><p class="font-display font-700 text-3xl" style="color:var(--primary-fg)">${ht.stat3_n}</p><p class="text-xs uppercase tracking-wider" style="color:var(--muted)">${ht.stat3_l}</p></div>
            </div>
          </div>
          <!-- Hero Visual -->
          <div class="hidden md:flex items-center justify-center relative reveal">
            <div class="relative w-80 h-80">
              <div class="absolute inset-0 rounded-full" style="background:radial-gradient(circle, rgba(0,74,173,0.12) 0%, transparent 70%)"></div>
              <div class="absolute inset-8 flex items-center justify-center">
                <div class="font-display font-700 text-center" style="font-size:5rem; line-height:1">
                  <span style="color:rgba(var(--fg),0.15); -webkit-text-stroke:2px rgba(0,74,173,0.3)">M</span><span style="color:var(--primary-fg); font-size:6rem">G</span><span style="color:rgba(var(--fg),0.15); -webkit-text-stroke:2px rgba(0,74,173,0.3)">N</span>
                </div>
              </div>
              <!-- Floating cards -->
              <div class="absolute -top-4 -right-4 card px-3 py-2 text-xs font-display font-700" style="animation:float1 3s ease-in-out infinite">
                <span aria-hidden="true" style="color:#10b981">✓</span> React / Flutter
              </div>
              <div class="absolute -bottom-4 -left-4 card px-3 py-2 text-xs font-display font-700" style="animation:float2 3.5s ease-in-out infinite">
                📍 Libreville, Gabon
              </div>
              <div class="absolute top-1/3 -left-8 card px-3 py-2 text-xs font-display font-700" style="animation:float3 4s ease-in-out infinite">
                ⚡ 50+ Projets
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <style>
      @keyframes float1 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
      @keyframes float2 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
      @keyframes float3 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
    </style>

    <!-- SERVICES PREVIEW -->
    <section class="py-20 max-w-6xl mx-auto px-4 md:px-8">
      <div class="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
        <div>
          <p class="section-label mb-3 reveal">${st.label}</p>
          <h2 class="font-display font-700 leading-tight reveal" style="font-size:clamp(2rem,4vw,3rem); color:var(--fg); white-space:pre-line">${st.title}</h2>
        </div>
        <button onclick="navigate('services')" class="btn-outline reveal">${st.cta} →</button>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        ${st.items
          .map(
            (s, i) => `
          <div class="card p-6 reveal" style="transition-delay:${i * 60}ms; background:var(--card)">
            <div class="flex items-start justify-between mb-4">
              <span class="text-3xl">${s.icon}</span>
              ${s.tag ? `<span class="badge badge-blue">${s.tag}</span>` : ""}
            </div>
            <h3 class="font-display font-700 text-lg mb-2" style="color:var(--fg)">${s.title}</h3>
            <p class="text-sm leading-relaxed mb-4" style="color:var(--muted)">${s.desc}</p>
            <p class="font-display font-700 text-sm" style="color:var(--primary-fg)">${s.price}</p>
          </div>
        `,
          )
          .join("")}
      </div>
    </section>

    <!-- ACADEMY (renvoi vers la page Formations) -->
    <div class="max-w-6xl mx-auto px-4 md:px-8">${renderServicesTrainings()}</div>

    <!-- PORTFOLIO PREVIEW -->
    <section class="py-20" style="background:var(--card); border-top:1px solid var(--border); border-bottom:1px solid var(--border)">
      <div class="max-w-6xl mx-auto px-4 md:px-8">
        <div class="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <p class="section-label mb-3 reveal">${pt.label}</p>
            <h2 class="font-display font-700 leading-tight reveal" style="font-size:clamp(2rem,4vw,3rem); color:var(--fg); white-space:pre-line">${pt.title}</h2>
          </div>
          <button onclick="navigate('portfolio')" class="btn-outline reveal">${state.lang === "fr" ? "Voir tout →" : "View all →"}</button>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          ${featuredProjects
            .map(
              (p, i) => renderProjectCard(p, i, "h3"),
            )
            .join("")}
        </div>
        <div class="text-center mt-10">
          <button onclick="navigate('contact')" class="btn-primary">${pt.cta} <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg></button>
        </div>
      </div>
    </section>

    <!-- CTA BANNER -->
    <section class="py-20 text-center relative overflow-hidden" style="background:linear-gradient(135deg,#004AAD,#0062E6)">
      ${waveSVG()}
      <div class="relative max-w-2xl mx-auto px-4">
        <h2 class="font-display font-700 text-white mb-4 reveal" style="font-size:clamp(1.8rem,4vw,2.8rem)">${state.lang === "fr" ? "Prêt à transformer votre présence digitale ?" : "Ready to transform your digital presence?"}</h2>
        <p class="text-blue-100 mb-8 reveal">${state.lang === "fr" ? "Discutons de votre projet — réponse sous 24h garantie." : "Let's discuss your project — response within 24h guaranteed."}</p>
        <div class="flex flex-wrap gap-3 justify-center reveal">
          <button onclick="navigate('contact')" class="btn-primary" style="background:white;color:#004AAD;border-color:white">${state.lang === "fr" ? "Demander un Devis Gratuit" : "Request a Free Quote"}</button>
          <a href="https://wa.me/24166198918" target="_blank" class="btn-outline" style="border-color:rgba(255,255,255,0.5);color:white">WhatsApp →</a>
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
  const t = translations[state.lang];
  const st = t.services;
  const soc = t.social;

  return `
  <div class="page pt-28 pb-16">
    <div class="max-w-6xl mx-auto px-4 md:px-8">
      <div class="mb-16">
        <p class="section-label mb-3">${st.label}</p>
        <h1 class="font-display font-700 leading-tight mb-4" style="font-size:clamp(2.5rem,5vw,4rem); color:var(--fg); white-space:pre-line">${st.title}</h1>
        <p class="max-w-xl" style="color:var(--muted)">${st.sub}</p>
      </div>

      <!-- Main Services Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        ${st.items
          .map(
            (s, i) => `
          <div class="card p-7 reveal" style="transition-delay:${i * 60}ms">
            <div class="flex items-start justify-between mb-5">
              <div class="w-12 h-12 flex items-center justify-center text-2xl" style="background:rgba(0,74,173,0.08)">${s.icon}</div>
              ${s.tag ? `<span class="badge badge-blue">${s.tag}</span>` : ""}
            </div>
            <h2 class="font-display font-700 text-xl mb-3" style="color:var(--fg)">${s.title}</h2>
            <p class="text-sm leading-relaxed mb-5" style="color:var(--muted)">${s.desc}</p>
            <div class="pt-4" style="border-top:1px solid var(--border)">
              <p class="font-display font-700" style="color:var(--primary-fg)">${s.price}</p>
            </div>
          </div>
        `,
          )
          .join("")}
      </div>

      <!-- Social Media Packages -->
      <div class="mb-16">
        <p class="section-label mb-3">${soc.label}</p>
        <h2 class="font-display font-700 leading-tight mb-3 reveal" style="font-size:clamp(1.8rem,3.5vw,2.8rem); color:var(--fg); white-space:pre-line">${soc.title}</h2>
        <p class="mb-10 reveal" style="color:var(--muted)">${soc.sub}</p>
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
                <span class="font-display font-700 text-3xl" style="color:${pkg.highlight ? "var(--primary-fg)" : "var(--fg)"}">${pkg.price}</span>
                <span class="text-sm" style="color:var(--muted)"> XAF ${pkg.period}</span>
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

      ${renderPricingGrid()}

      ${renderServicesTrainings()}

      <div class="text-center">
        <button onclick="navigate('contact')" class="btn-primary">${state.lang === "fr" ? "Demander un Devis Personnalisé" : "Request a Custom Quote"} <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg></button>
      </div>
    </div>
  </div>`;
}

function renderPricingGrid() {
  const lang = state.lang;
  return `
      <section class="mb-12" aria-labelledby="pricing-grid-title">
        <p class="section-label mb-3">${lang === "fr" ? "Tarifs" : "Pricing"}</p>
        <h2 id="pricing-grid-title" class="font-display font-700 leading-tight mb-3" style="font-size:clamp(1.8rem,3.5vw,2.8rem); color:var(--fg)">${lang === "fr" ? "Grille tarifaire complète" : "Full price list"}</h2>
        <p class="mb-8" style="color:var(--muted)">${lang === "fr" ? "Prix affichés en francs CFA (XAF). Devis gratuit sous 24 h, paiement Mobile Money accepté." : "Prices in CFA francs (XAF). Free quote within 24h, Mobile Money accepted."}</p>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          ${pricingGrid
            .map(
              (group) => `
          <div class="card p-6 md:p-7 reveal">
            <h3 class="font-display font-700 text-lg mb-4" style="color:var(--fg)">${group.title[lang]}</h3>
            <table class="w-full text-sm">
              <caption class="sr-only">${group.title[lang]}</caption>
              <thead class="sr-only"><tr><th scope="col">${lang === "fr" ? "Prestation" : "Service"}</th><th scope="col">${lang === "fr" ? "Prix" : "Price"}</th></tr></thead>
              <tbody>
                ${group.items
                  .map(
                    (item) => `
                <tr style="border-top:1px solid var(--border)">
                  <td class="py-3 pr-4" style="color:var(--fg)">${item.label[lang]}</td>
                  <td class="py-3 text-right font-display font-700" style="color:var(--primary-fg);white-space:nowrap">${priceLabel(item.id, lang)}</td>
                </tr>`,
                  )
                  .join("")}
              </tbody>
            </table>
          </div>`,
            )
            .join("")}
        </div>
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
          <p class="text-sm" style="color:var(--muted)">${isEn ? "FullStack MERN bootcamp, React and Node.js modules, WordPress, SEO and AI workshops — with prices shown." : "Bootcamp FullStack MERN, modules React et Node.js, ateliers WordPress, SEO et IA — prix affichés."}</p>
        </div>
        <button onclick="navigate('formations')" class="btn-primary whitespace-nowrap">${isEn ? "See our courses" : "Voir les formations"} →</button>
      </div>`;
}

// Carte projet partagée (accueil et page Portfolio). Vrai lien : clavier, nouvel onglet, partage ;
// le clic ouvre la fiche sur place quand ses données sont chargées.
function renderProjectCard(p, i, headingTag) {
  const tint = `color:${p.color};color:color-mix(in srgb, ${p.color} 50%, var(--fg))`;
  return `
          <a href="./portfolio.html?projet=${p.id}" onclick="event.preventDefault(); navigateToPortfolioDetail(${p.id})" class="card block overflow-hidden reveal group" style="transition-delay:${i * 50}ms">
            <div class="h-48 relative overflow-hidden flex items-center justify-center" style="background:${p.color}14">
              <div class="absolute inset-0" style="background:linear-gradient(135deg,${p.color}22,${p.color}08)"></div>
              <svg aria-hidden="true" class="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 300 200" preserveAspectRatio="xMidYMid slice">
                <path d="M-50,80 C50,30 100,130 200,80 C300,30 350,130 450,80" fill="none" stroke="${p.color}" stroke-width="2"/>
                <path d="M-50,100 C50,50 100,150 200,100 C300,50 350,150 450,100" fill="none" stroke="${p.color}" stroke-width="1.5"/>
                <path d="M-50,120 C50,70 100,170 200,120 C300,70 350,170 450,120" fill="none" stroke="${p.color}" stroke-width="1"/>
              </svg>
              <span aria-hidden="true" class="relative font-display font-700 text-5xl" style="${tint}; opacity:0.25">${p.title.substring(0, 2)}</span>
              <div aria-hidden="true" class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity" style="background:rgba(15,23,42,0.85);background:color-mix(in srgb, ${p.color} 35%, #0f172a)">
                <span class="text-white font-display font-700 text-sm">${state.lang === "fr" ? "Voir le détail →" : "View details →"}</span>
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
  <div class="page pt-28 pb-16">
    <div class="max-w-6xl mx-auto px-4 md:px-8">
      <div class="text-center mb-12">
        <p class="section-label mb-3">${t.label}</p>
        <h1 class="font-display font-700 leading-tight mb-4" style="font-size:clamp(2.5rem,5vw,4rem); color:var(--fg); white-space:pre-line">${t.title}</h1>
        <p class="max-w-xl mx-auto" style="color:var(--muted)">${t.sub}</p>
      </div>

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
  <div class="page pt-28 pb-16">
    <div class="max-w-6xl mx-auto px-4 md:px-8">
      <div class="mb-12">
        <p class="section-label mb-3">${t.label}</p>
        <h1 class="font-display font-700 leading-tight mb-4" style="font-size:clamp(2.5rem,5vw,4rem); color:var(--fg); white-space:pre-line">${t.title}</h1>
        <p class="max-w-xl" style="color:var(--muted)">${t.sub}</p>
      </div>

      <!-- Featured Article -->
      <div onclick="navigateToBlogDetail(${featured.id})" role="link" tabindex="0" onkeydown="activateOnEnter(event)" class="card block mb-10 overflow-hidden reveal group cursor-pointer">
        <div class="md:flex">
          <div class="md:w-2/5 h-56 md:h-auto relative overflow-hidden flex items-center justify-center" style="background:linear-gradient(135deg,#004AAD,#0062E6)">
            ${waveSVG()}
            <span class="relative font-display font-700 text-6xl text-white opacity-20">✍️</span>
            <div class="absolute top-4 left-4">
              <span class="badge" style="background:white;color:#004AAD">${state.lang === "fr" ? "⭐ Article à la Une" : "⭐ Featured"}</span>
            </div>
          </div>
          <div class="p-6 md:p-8 md:w-3/5 flex flex-col justify-center">
            <span class="badge badge-blue mb-3">${isEn ? featured.categoryEn : featured.category}</span>
            <h2 class="font-display font-700 text-xl md:text-2xl leading-tight mb-3 group-hover:text-blue-600 transition-colors" style="color:var(--fg)">${isEn ? featured.titleEn : featured.title}</h2>
            <p class="text-sm leading-relaxed mb-4" style="color:var(--muted)">${isEn ? featured.excerptEn : featured.excerpt}</p>
            <div class="flex items-center gap-4 text-xs" style="color:var(--muted)">
              <span>📅 ${isEn ? featured.dateEn : featured.date}</span>
              <span>⏱ ${featured.read} ${t.minRead}</span>
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
            <div class="h-36 flex items-center justify-center relative overflow-hidden" style="background:var(--card); border-bottom:1px solid var(--border)">
              <div class="absolute inset-0 opacity-5" style="background-image:repeating-linear-gradient(0deg,#004AAD 0,#004AAD 1px,transparent 0,transparent 20px),repeating-linear-gradient(90deg,#004AAD 0,#004AAD 1px,transparent 0,transparent 20px)"></div>
              <span class="text-3xl relative z-10">${["🔍", "🛒", "🎨", "💰", "📝", "⚡"][i]}</span>
            </div>
            <div class="p-5">
              <div class="flex items-center gap-2 mb-3">
                <span class="badge ${catColors[isEn ? post.categoryEn : post.category] || "badge-blue"}">${isEn ? post.categoryEn : post.category}</span>
                <span class="text-xs" style="color:var(--muted)">${post.read} ${t.minRead}</span>
              </div>
              <h3 class="font-display font-700 text-sm leading-snug mb-2 group-hover:text-blue-600 transition-colors" style="color:var(--fg)">${isEn ? post.titleEn : post.title}</h3>
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
        <h3 class="font-display font-700 text-xl mb-2" style="color:var(--fg)">${state.lang === "fr" ? "Besoin d'un Site Web Professionnel ?" : "Need a Professional Website?"}</h3>
        <p class="mb-5" style="color:var(--muted)">${state.lang === "fr" ? "Nos articles vous ont convaincu ? Passez à l'action dès maintenant !" : "Our articles convinced you? Take action now!"}</p>
        <div class="flex flex-wrap gap-3 justify-center">
          <button onclick="navigate('contact')" class="btn-primary">${state.lang === "fr" ? "Demander un Devis Gratuit" : "Request a Free Quote"}</button>
          <button onclick="navigate('portfolio')" class="btn-outline">${state.lang === "fr" ? "Voir nos Réalisations" : "View Our Work"}</button>
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
  <div class="page pt-28 pb-16">
    <div class="max-w-6xl mx-auto px-4 md:px-8">
      <div class="grid md:grid-cols-2 gap-16 items-center mb-20">
        <!-- Left: Text -->
        <div>
          <p class="section-label mb-3">${t.label}</p>
          <h1 class="font-display font-700 leading-tight mb-6" style="font-size:clamp(2rem,4vw,3.5rem); color:var(--fg); white-space:pre-line">${t.title}</h1>
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

      <!-- Skills -->
      <div class="mb-16">
        <h2 class="font-display font-700 text-2xl mb-8 reveal" style="color:var(--fg)">${t.skills_title}</h2>
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
      <div class="card p-6 md:p-10">
        <h2 class="font-display font-700 text-xl mb-8" style="color:var(--fg)">${state.lang === "fr" ? "Notre Histoire" : "Our Story"}</h2>
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
  const isDark = state.theme === "dark";

  return `
  <div class="page pt-28 pb-16">
    <div class="max-w-6xl mx-auto px-4 md:px-8">

      <!-- Hero Section -->
      <div class="mb-20 text-center">
        <p class="section-label mb-3">${t.label}</p>
        <h1 class="font-display font-700 leading-tight mb-6" style="font-size:clamp(2rem,5vw,4rem); color:var(--fg); white-space:pre-line">${t.title}</h1>
        <p class="text-lg max-w-3xl mx-auto mb-10" style="color:var(--muted)">${t.sub}</p>

        <!-- Main CTA Button -->
        <a href="https://docs.google.com/forms/d/1viH1bGb7YTWTVj-i2xGllViKp3JVFsvm9FJEGXAdSZU/edit#responses" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 btn-primary text-lg py-3 px-8 mb-3">
          🚀 ${t.cta}
          <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7"/></svg>
        </a>
        <p style="color:var(--muted); font-size:14px;">${t.ctaSub}</p>
      </div>

      <!-- Why Join Section -->
      <div class="mb-20">
        <h2 class="font-display font-700 text-2xl md:text-3xl mb-12 text-center" style="color:var(--fg)">${t.section1.title}</h2>
        <div class="grid md:grid-cols-4 gap-6">
          ${t.section1.items
            .map(
              (item) => `
            <div class="card p-6 reveal hover:shadow-lg transition-all">
              <div class="text-4xl mb-4">${item.icon}</div>
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
        <h2 class="font-display font-700 text-2xl md:text-3xl mb-4" style="color:var(--fg)">${t.section2.title}</h2>
        <p class="mb-8 text-lg" style="color:var(--muted)">${t.section2.intro}</p>

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
      <div class="mb-20">
        <h2 class="font-display font-700 text-2xl md:text-3xl mb-12 text-center" style="color:var(--fg)">${t.section3.title}</h2>

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
        <a href="https://docs.google.com/forms/d/1viH1bGb7YTWTVj-i2xGllViKp3JVFsvm9FJEGXAdSZU/edit#responses" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 font-display font-700 text-lg px-8 py-3" style="background:white;color:#004AAD; border-radius:4px; text-decoration:none; transition:transform 0.2s;" onmouseover="this.style.transform='translateY(-2px)'" onmouseout="this.style.transform='none'">
          Candidater Maintenant 🚀
          <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7"/></svg>
        </a>
      </div>

    </div>
  </div>`;
}

function renderContact() {
  const t = translations[state.lang].contact;
  return `
  <div class="page pt-28 pb-16">
    <div class="max-w-6xl mx-auto px-4 md:px-8">
      <div class="grid md:grid-cols-2 gap-16">
        <!-- Left: Info -->
        <div>
          <p class="section-label mb-3">${t.label}</p>
          <h1 class="font-display font-700 leading-tight mb-4" style="font-size:clamp(2rem,4vw,3.5rem); color:var(--fg); white-space:pre-line">${t.title}</h1>
          <p class="mb-10" style="color:var(--muted)">${t.sub}</p>

          <div class="space-y-5 mb-10">
            <a href="https://wa.me/24166198918" target="_blank" class="flex items-center gap-4 card p-4 hover:border-green-400 transition-colors" style="color:var(--fg)">
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

        <!-- Right: Form -->
        <div class="card p-6 md:p-8 reveal">
          <h2 class="font-display font-700 text-lg mb-6" style="color:var(--fg)">${state.lang === "fr" ? "Envoyez un message" : "Send a message"}</h2>
          <form
          action="https://formspree.io/f/mpweqqzz"
          method="POST"
          onsubmit="handleFormSubmit(event)" class="space-y-4">
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label for="contact-name" class="block text-xs font-display font-700 mb-1.5 uppercase tracking-wider" style="color:var(--muted)">${t.name}</label>
                <input id="contact-name" name="name" type="text" required autocomplete="name" placeholder="${t.name}" class="w-full px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-500 transition" style="background:var(--bg);border:1px solid var(--border);color:var(--fg)">
              </div>
              <div>
                <label for="contact-email" class="block text-xs font-display font-700 mb-1.5 uppercase tracking-wider" style="color:var(--muted)">${t.email}</label>
                <input id="contact-email" name="email" type="email" required autocomplete="email" placeholder="${t.email}" class="w-full px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-500 transition" style="background:var(--bg);border:1px solid var(--border);color:var(--fg)">
              </div>
            </div>
            <div>
              <label for="contact-subject" class="block text-xs font-display font-700 mb-1.5 uppercase tracking-wider" style="color:var(--muted)">${t.subject}</label>
              <input id="contact-subject" name="subject" type="text" placeholder="${t.subject}" class="w-full px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-500 transition" style="background:var(--bg);border:1px solid var(--border);color:var(--fg)">
            </div>
            <div>
              <label for="contact-message" class="block text-xs font-display font-700 mb-1.5 uppercase tracking-wider" style="color:var(--muted)">${t.message}</label>
              <textarea id="contact-message" name="message" rows="5" required placeholder="${t.message}" class="w-full px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-500 transition resize-none" style="background:var(--bg);border:1px solid var(--border);color:var(--fg)"></textarea>
            </div>
            <button type="submit" class="btn-primary w-full justify-center">${t.send} <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg></button>
          </form>
          <div id="form-status" role="status" aria-live="polite" class="mt-4"></div>
        </div>
      </div>
    </div>
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
