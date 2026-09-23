// ==================== CONSENTEMENT ET MESURE D'AUDIENCE ====================
//
// Règle de conception : tant qu'aucun identifiant n'est renseigné ci-dessous, le site ne
// charge aucun traceur, ne dépose aucun cookie et n'affiche aucun bandeau. La politique de
// confidentialité lit la même constante et décrit donc toujours la réalité du site.
//
// POUR ACTIVER LA MESURE D'AUDIENCE :
//   1. Créer un projet sur https://clarity.microsoft.com (gratuit, sans quota) et/ou une
//      propriété Google Analytics 4.
//   2. Coller l'identifiant ci-dessous, puis publier.
//   3. Le bandeau de consentement apparaît alors automatiquement, et la section « Cookies »
//      de la politique de confidentialité se met à jour toute seule.
//
// Ne jamais activer un traceur sans laisser le bandeau faire son travail : c'est lui qui
// rend la collecte licite.
const ANALYTICS = {
  clarityId: "", // ex. "abcd1234ef" — Microsoft Clarity (cartes de chaleur, enregistrements)
  ga4Id: "", // ex. "G-XXXXXXXXXX" — Google Analytics 4
};

const CONSENT_KEY = "mgn-consent";
const CONSENT_VERSION = 1; // à incrémenter si la liste des traceurs change : le choix est alors redemandé

// Le site mesure-t-il quoi que ce soit ? Source de vérité unique, lue aussi par la page
// « Politique de confidentialité ».
function analyticsConfigured() {
  return Boolean(ANALYTICS.clarityId || ANALYTICS.ga4Id);
}

function readConsent() {
  try {
    const raw = localStorage.getItem(CONSENT_KEY);
    if (!raw) return null;
    const value = JSON.parse(raw);
    // Un choix exprimé pour une liste de traceurs différente ne vaut plus.
    return value && value.v === CONSENT_VERSION ? value.granted === true : null;
  } catch (e) {
    // Stockage indisponible (navigation privée stricte) : on redemande, on ne présume pas.
    return null;
  }
}

function writeConsent(granted) {
  try {
    localStorage.setItem(CONSENT_KEY, JSON.stringify({ v: CONSENT_VERSION, granted, at: Date.now() }));
  } catch (e) {
    /* Sans stockage, le choix ne vaut que pour la visite en cours. */
  }
}

// ==================== CHARGEMENT DES TRACEURS ====================
let trackersLoaded = false;

function loadTrackers() {
  if (trackersLoaded || !analyticsConfigured()) return;
  trackersLoaded = true;

  if (ANALYTICS.clarityId) {
    // Extrait officiel de Microsoft Clarity, réécrit sans `eval` implicite.
    window.clarity =
      window.clarity ||
      function () {
        (window.clarity.q = window.clarity.q || []).push(arguments);
      };
    const s = document.createElement("script");
    s.async = true;
    s.src = `https://www.clarity.ms/tag/${encodeURIComponent(ANALYTICS.clarityId)}`;
    document.head.appendChild(s);
  }

  if (ANALYTICS.ga4Id) {
    const s = document.createElement("script");
    s.async = true;
    s.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(ANALYTICS.ga4Id)}`;
    document.head.appendChild(s);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () {
      window.dataLayer.push(arguments);
    };
    window.gtag("js", new Date());
    // IP anonymisée : le minimum pour une mesure d'audience proportionnée.
    window.gtag("config", ANALYTICS.ga4Id, { anonymize_ip: true });
  }
}

// Refus (ou changement d'avis) : on retire ce qui a pu être déposé.
function purgeTrackers() {
  const prefixes = ["_ga", "_gid", "_gat", "_clck", "_clsk", "CLID", "MUID"];
  document.cookie.split(";").forEach((entry) => {
    const name = entry.split("=")[0].trim();
    if (!prefixes.some((p) => name.startsWith(p))) return;
    const domains = ["", `; domain=${location.hostname}`, `; domain=.${location.hostname}`];
    domains.forEach((d) => {
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/${d}`;
    });
  });
}

// ==================== BANDEAU ====================
function buildBanner(isEn) {
  const wrap = document.createElement("div");
  wrap.id = "consent-banner";
  wrap.setAttribute("role", "region");
  wrap.setAttribute("aria-label", isEn ? "Cookie choice" : "Choix relatif aux cookies");
  wrap.innerHTML = `
    <div class="consent-inner">
      <div class="consent-text">
        <p class="consent-title">${isEn ? "Help us improve this site" : "Aidez-nous à améliorer ce site"}</p>
        <p class="consent-body">${
          isEn
            ? "We would like to measure how pages are used, with a cookie-based analytics tool. Nothing is loaded until you accept. Refusing changes nothing to how the site works."
            : "Nous aimerions mesurer l'usage des pages à l'aide d'un outil de mesure d'audience qui dépose des cookies. Rien n'est chargé tant que vous n'avez pas accepté. Refuser ne change rien au fonctionnement du site."
        } <a href="./privacy.html" class="consent-link">${isEn ? "Learn more" : "En savoir plus"}</a></p>
      </div>
      <div class="consent-actions">
        <button type="button" class="consent-btn consent-refuse" data-consent="no">${isEn ? "Refuse" : "Refuser"}</button>
        <button type="button" class="consent-btn consent-accept" data-consent="yes">${isEn ? "Accept" : "Accepter"}</button>
      </div>
    </div>`;
  // Refuser et accepter ont le même poids visuel : un refus qui coûte un effort n'est pas un choix libre.
  wrap.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-consent]");
    if (!btn) return;
    const granted = btn.dataset.consent === "yes";
    writeConsent(granted);
    if (granted) loadTrackers();
    else purgeTrackers();
    wrap.remove();
  });
  return wrap;
}

function openConsent() {
  if (!analyticsConfigured()) return;
  const existing = document.getElementById("consent-banner");
  if (existing) existing.remove();
  const isEn = typeof state === "object" && state && state.lang === "en";
  document.body.appendChild(buildBanner(isEn));
}

function initConsent() {
  if (!analyticsConfigured()) return; // aucun traceur configuré : aucun bandeau, aucun cookie
  const choice = readConsent();
  if (choice === true) {
    loadTrackers();
    return;
  }
  if (choice === false) return; // refus enregistré : on ne redemande pas à chaque page
  openConsent();
}

// Exposé pour le pied de page et la politique de confidentialité (« Gérer mes cookies »).
window.openConsent = openConsent;
window.analyticsConfigured = analyticsConfigured;
