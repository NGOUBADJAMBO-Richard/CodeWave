// ==================== STATE ====================
const pageFileMap = {
  home: "index.html",
  services: "services.html",
  formations: "formations.html",
  portfolio: "portfolio.html",
  blog: "blog.html",
  careers: "careers.html",
  about: "about.html",
  partnership: "partnership.html",
  contact: "contact.html",
  legal: "legal.html",
  privacy: "privacy.html",
  cgv: "cgv.html",
  sitemap: "sitemap.html",
  social: "social.html",
};

function getCurrentFileName() {
  const file = window.location.pathname.split("/").pop().toLowerCase();
  return file || "index.html";
}

function getCurrentPageFromPath() {
  const file = getCurrentFileName();
  const matched = Object.entries(pageFileMap).find(
    ([, pageFile]) => pageFile === file,
  );
  return matched ? matched[0] : "home";
}

const SUPPORTED_LANGS = ["fr", "en"];

// Priorité : ?lang= dans l'URL (liens hreflang, partages) > préférence mémorisée > français.
function getInitialLang() {
  const fromUrl = new URLSearchParams(window.location.search).get("lang");
  if (SUPPORTED_LANGS.includes(fromUrl)) {
    localStorage.setItem("mgn-lang", fromUrl);
    return fromUrl;
  }
  const stored = localStorage.getItem("mgn-lang");
  return SUPPORTED_LANGS.includes(stored) ? stored : "fr";
}

let state = {
  theme: localStorage.getItem("mgn-theme") || "light",
  lang: getInitialLang(),
  page: getCurrentPageFromPath(),
  portfolioFilter: "all",
  blogFilter: "all",
  mobileMenuOpen: false,
};

// Fiches de détail adressables par URL (portfolio.html?projet=3, blog.html?article=2) :
// liens depuis l'accueil, partages, indexation. Les données de détail ne sont chargées que sur leur page.
const DETAIL_ROUTES = {
  portfolio: { param: "projet", page: "portfolio-detail", stateKey: "currentProjectId" },
  blog: { param: "article", page: "blog-detail", stateKey: "currentBlogId" },
};

function applyDetailFromUrl() {
  const route = DETAIL_ROUTES[state.page];
  if (!route) return;
  const id = Number(new URLSearchParams(window.location.search).get(route.param));
  if (!Number.isInteger(id) || id <= 0) return;
  state.page = route.page;
  state[route.stateKey] = id;
}

function setDetailParam(param, id) {
  const url = new URL(window.location.href);
  Object.values(DETAIL_ROUTES).forEach((r) => url.searchParams.delete(r.param));
  if (param) url.searchParams.set(param, String(id));
  if (url.href !== window.location.href) history.replaceState(null, "", url);
  syncCanonical();
}

// Ouvre une fiche : sur place si ses données sont chargées, sinon sur la page qui les porte.
function openDetail(section, id) {
  const route = DETAIL_ROUTES[section];
  if (getCurrentFileName() !== pageFileMap[section]) {
    const lang = state.lang === "en" ? "&lang=en" : "";
    window.location.href = `./${pageFileMap[section]}?${route.param}=${id}${lang}`;
    return;
  }
  state.page = route.page;
  state[route.stateKey] = id;
  setDetailParam(route.param, id);
  window.scrollTo({ top: 0, behavior: "smooth" });
  render();
}

applyDetailFromUrl();

// ==================== INIT ====================
function applyTheme() {
  if (state.theme === "dark") {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
}

function toggleTheme() {
  state.theme = state.theme === "dark" ? "light" : "dark";
  localStorage.setItem("mgn-theme", state.theme);
  applyTheme();
  render();
}

function setLang(l) {
  if (!SUPPORTED_LANGS.includes(l)) return;
  state.lang = l;
  localStorage.setItem("mgn-lang", l);
  syncLangInUrl();
  render();
}

// L'URL, <html lang> et la canonical reflètent la langue affichée :
// la version anglaise a sa propre URL (?lang=en), cohérente avec les balises hreflang.
function syncLangInUrl() {
  const url = new URL(window.location.href);
  if (state.lang === "en") url.searchParams.set("lang", "en");
  else url.searchParams.delete("lang");
  if (url.href !== window.location.href) history.replaceState(null, "", url);

  document.documentElement.lang = state.lang;
  syncCanonical();
}

// La canonical suit la fiche affichée et la langue, pour que chaque article ou projet soit indexable.
function syncCanonical() {
  const canonical = document.querySelector('link[rel="canonical"]');
  if (!canonical) return;
  const target = new URL(canonical.dataset.base || canonical.href);
  canonical.dataset.base = target.origin + target.pathname;
  target.search = "";
  const current = new URLSearchParams(window.location.search);
  Object.values(DETAIL_ROUTES).forEach((r) => {
    if (current.has(r.param)) target.searchParams.set(r.param, current.get(r.param));
  });
  if (state.lang === "en") target.searchParams.set("lang", "en");
  canonical.href = target.href;
}

function navigate(page) {
  const targetFile = pageFileMap[page];
  const currentFile = getCurrentFileName();

  // Real multi-page navigation for top-level sections.
  if (targetFile && targetFile !== currentFile) {
    window.location.href = `./${targetFile}`;
    return;
  }

  state.page = page;
  state.mobileMenuOpen = false;
  document.body.style.overflow = "";
  setDetailParam(null);
  window.scrollTo({ top: 0, behavior: "smooth" });
  render();
}

applyTheme();
syncLangInUrl();

// ==================== SCROLL PROGRESS ====================
let progressFrame = 0;
function updateScrollProgress() {
  progressFrame = 0;
  const el = document.getElementById("scroll-progress");
  if (!el) return;
  const doc = document.documentElement;
  const scrollable = doc.scrollHeight - doc.clientHeight;
  el.style.width = scrollable > 0 ? (doc.scrollTop / scrollable) * 100 + "%" : "0%";
  document.querySelector(".site-nav")?.classList.toggle("nav-scrolled", doc.scrollTop > 24);
  doc.style.setProperty("--scroll", String(Math.round(doc.scrollTop)));
}
window.addEventListener(
  "scroll",
  () => {
    if (!progressFrame) progressFrame = requestAnimationFrame(updateScrollProgress);
  },
  { passive: true },
);

// ==================== REVEAL ANIMATIONS ====================
// Appelé après chaque render() : les éléments .reveal sont recréés à chaque rendu.
let revealObserver = null;
function observeReveals() {
  const targets = document.querySelectorAll(".reveal:not(.visible)");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduceMotion || !("IntersectionObserver" in window)) {
    targets.forEach((el) => el.classList.add("visible"));
    return;
  }
  if (revealObserver) revealObserver.disconnect();
  revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      });
    },
    { rootMargin: "0px 0px -40px 0px" },
  );
  targets.forEach((el) => revealObserver.observe(el));
}

// ==================== INTERACTIONS AU POINTEUR ====================
// Un seul écouteur délégué (le DOM est recréé à chaque rendu) : halo des cartes et inclinaison
// de la maquette du hero. Inactif sur écran tactile et si l'utilisateur réduit les animations.
const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
let pointerFrame = 0;
let lastPointer = null;

function applyPointerEffects() {
  pointerFrame = 0;
  const { x, y, target } = lastPointer;
  const card = target.closest?.(".card");
  if (card) {
    const r = card.getBoundingClientRect();
    card.style.setProperty("--mx", `${x - r.left}px`);
    card.style.setProperty("--my", `${y - r.top}px`);
  }
  const tilt = document.querySelector(".hero-tilt");
  if (tilt && !reducedMotion.matches) {
    const r = tilt.getBoundingClientRect();
    const dx = Math.max(-1, Math.min(1, (x - (r.left + r.width / 2)) / (r.width / 2)));
    const dy = Math.max(-1, Math.min(1, (y - (r.top + r.height / 2)) / (r.height / 2)));
    const near = y > r.top - 200 && y < r.bottom + 200;
    tilt.style.transform = near ? `perspective(1000px) rotateY(${dx * 5}deg) rotateX(${-dy * 4}deg)` : "";
  }
}

document.addEventListener(
  "pointermove",
  (event) => {
    if (!finePointer.matches) return;
    lastPointer = { x: event.clientX, y: event.clientY, target: event.target };
    if (!pointerFrame) pointerFrame = requestAnimationFrame(applyPointerEffects);
  },
  { passive: true },
);

// ==================== MENUS (fermeture clavier / clic extérieur) ====================
document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") return;
  const openMore = document.querySelector("details.nav-more[open]");
  if (openMore) {
    openMore.removeAttribute("open");
    openMore.querySelector("summary")?.focus();
  } else if (state.mobileMenuOpen) {
    toggleMobileMenu();
  }
});
document.addEventListener("click", (event) => {
  const openMore = document.querySelector("details.nav-more[open]");
  if (openMore && !openMore.contains(event.target)) openMore.removeAttribute("open");
});

// ==================== COMPTEURS ANIMÉS ====================
// <span data-count>50+</span> : compte de 0 à 50 à l'apparition, suffixe conservé.
// La valeur finale est déjà dans le HTML (lisible sans JS, SEO, animations réduites).
const COUNTER_DURATION_MS = 1200;
let counterObserver = null;

function runCounter(el) {
  const match = /^(\d+)(.*)$/.exec(el.textContent.trim());
  if (!match) return;
  const target = Number(match[1]);
  const suffix = match[2];
  const start = performance.now();
  const tick = (now) => {
    const progress = Math.min((now - start) / COUNTER_DURATION_MS, 1);
    const eased = 1 - (1 - progress) ** 3;
    el.textContent = `${Math.round(target * eased)}${suffix}`;
    if (progress < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

function animateCounters() {
  const counters = document.querySelectorAll("[data-count]");
  if (!counters.length) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) return;
  if (counterObserver) counterObserver.disconnect();
  counterObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        observer.unobserve(entry.target);
        runCounter(entry.target);
      });
    },
    { threshold: 0.6 },
  );
  counters.forEach((el) => counterObserver.observe(el));
}
