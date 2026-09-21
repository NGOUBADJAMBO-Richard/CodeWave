// ==================== MAIN RENDER ====================
function render() {
  const root = document.getElementById("root");
  let pageContent = "";
  switch (state.page) {
    case "home":
      pageContent = renderHome();
      break;
    case "services":
      pageContent = renderServices();
      break;
    case "formations":
      pageContent = renderFormations();
      break;
    case "portfolio":
      pageContent = renderPortfolio();
      break;
    case "portfolio-detail":
      pageContent = renderPortfolioDetail(state.currentProjectId || 1);
      break;
    case "blog":
      pageContent = renderBlog();
      break;
    case "blog-detail":
      pageContent = renderBlogDetail(state.currentBlogId || 1);
      break;
    case "careers":
      pageContent = renderCareers();
      break;
    case "partnership":
      pageContent = renderPartnership();
      break;
    case "legal":
      pageContent = renderMentionsLegales();
      break;
    case "privacy":
      pageContent = renderPrivacy();
      break;
    case "cgv":
      pageContent = renderCGV();
      break;
    case "sitemap":
      pageContent = renderSitemap();
      break;
    case "social":
      pageContent = renderSocial();
      break;
    case "about":
      pageContent = renderAbout();
      break;
    case "contact":
      pageContent = renderContact();
      break;
    default:
      pageContent = renderHome();
  }

  // Le rendu remplace tout le DOM : l'élément qui avait le focus (bouton de langue, de thème, de menu)
  // le retrouve ensuite, pour ne pas renvoyer l'utilisateur clavier en haut de page.
  const focusedId = document.activeElement?.id;

  root.innerHTML =
    `<a href="#main" class="skip-link">${state.lang === "en" ? "Skip to main content" : "Aller au contenu principal"}</a>` +
    renderNav() +
    `<main id="main" tabindex="-1" style="min-height:100vh">` +
    pageContent +
    `</main>` +
    renderFooter();

  if (focusedId) document.getElementById(focusedId)?.focus();
  syncDocumentTitle();
  observeReveals();
  updateScrollProgress();
}

// Sur une fiche (projet, article), l'onglet et les résultats de recherche affichent son titre.
const PAGE_TITLE = document.title;
function syncDocumentTitle() {
  const heading = state.page.endsWith("-detail") ? document.querySelector("main h1") : null;
  document.title = heading ? `${heading.textContent.trim()} | M.G.N CodeWave` : PAGE_TITLE;
}

// Initial render
render();
