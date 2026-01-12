// ✅ SÉCURITÉ: Gestion du consentement des cookies (RGPD)

function initCookieConsent() {
  const consentGiven = localStorage.getItem("cookieConsent");

  // Si consentement déjà donné, charger GA
  if (consentGiven === "true") {
    loadGoogleAnalytics();
    return;
  }

  // Si refusé, ne rien charger
  if (consentGiven === "false") {
    return;
  }

  // Sinon, afficher la bannière
  showCookieBanner();
}

function showCookieBanner() {
  const banner = document.createElement("div");
  banner.id = "cookie-consent-banner";
  banner.style.cssText = `
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background: #1f2937;
    color: white;
    padding: 1.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    z-index: 9999;
    font-size: 0.875rem;
    box-shadow: 0 -2px 10px rgba(0,0,0,0.2);
    flex-wrap: wrap;
    gap: 1rem;
  `;

  banner.innerHTML = `
    <div style="flex: 1; min-width: 250px;">
      <p style="margin: 0 0 0.5rem 0; font-weight: 600;">
        Consentement aux cookies
      </p>
      <p style="margin: 0; font-size: 0.8rem; opacity: 0.9;">
        Nous utilisons des cookies pour améliorer votre expérience.
        <a href="/politique-confidentialite.html#cookies" style="color: #60a5fa; text-decoration: underline;">
          En savoir plus
        </a>
      </p>
    </div>
    <div style="display: flex; gap: 0.75rem; flex-wrap: wrap;">
      <button id="reject-cookies" style="
        padding: 0.5rem 1rem;
        background: transparent;
        border: 1px solid white;
        color: white;
        border-radius: 0.375rem;
        cursor: pointer;
        font-size: 0.875rem;
        transition: all 0.3s ease;
      " onmouseover="this.style.background='rgba(255,255,255,0.1)'" onmouseout="this.style.background='transparent'">
        Refuser
      </button>
      <button id="accept-cookies" style="
        padding: 0.5rem 1rem;
        background: #3b82f6;
        border: none;
        color: white;
        border-radius: 0.375rem;
        cursor: pointer;
        font-size: 0.875rem;
        transition: all 0.3s ease;
      " onmouseover="this.style.background='#2563eb'" onmouseout="this.style.background='#3b82f6'">
        Accepter
      </button>
    </div>
  `;

  document.body.appendChild(banner);

  // Événement: Accepter les cookies
  document.getElementById("accept-cookies").addEventListener("click", () => {
    localStorage.setItem("cookieConsent", "true");
    banner.remove();
    loadGoogleAnalytics();
  });

  // Événement: Refuser les cookies
  document.getElementById("reject-cookies").addEventListener("click", () => {
    localStorage.setItem("cookieConsent", "false");
    banner.remove();
  });
}

function loadGoogleAnalytics() {
  // ✅ Charger Google Analytics SEULEMENT après consentement
  const script = document.createElement("script");
  script.async = true;
  script.src = "https://www.googletagmanager.com/gtag/js?id=G-YOUR-GA-ID";
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  function gtag() {
    dataLayer.push(arguments);
  }
  gtag("js", new Date());
  gtag("config", "G-YOUR-GA-ID", {
    anonymize_ip: true,
    allow_ad_personalization_signals: false,
  });
}

// Initialiser au chargement du DOM
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initCookieConsent);
} else {
  initCookieConsent();
}
