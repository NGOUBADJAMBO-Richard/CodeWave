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
  const canonical = document.querySelector('link[rel="canonical"]');
  if (canonical) {
    const target = new URL(canonical.dataset.base || canonical.href);
    canonical.dataset.base = target.origin + target.pathname;
    if (state.lang === "en") target.searchParams.set("lang", "en");
    else target.searchParams.delete("lang");
    canonical.href = target.href;
  }
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
