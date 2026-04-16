// ==================== STATE ====================
const pageFileMap = {
  home: "index.html",
  services: "services.html",
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

let state = {
  theme: localStorage.getItem("mgn-theme") || "light",
  lang: localStorage.getItem("mgn-lang") || "fr",
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
  state.lang = l;
  localStorage.setItem("mgn-lang", l);
  render();
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

// ==================== SCROLL PROGRESS ====================
window.addEventListener("scroll", () => {
  const el = document.getElementById("scroll-progress");
  if (!el) return;
  const scrollTop = document.documentElement.scrollTop;
  const scrollHeight =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
  el.style.width = (scrollTop / scrollHeight) * 100 + "%";

  // Reveal animations
  document.querySelectorAll(".reveal").forEach((el) => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 60) el.classList.add("visible");
  });
});
