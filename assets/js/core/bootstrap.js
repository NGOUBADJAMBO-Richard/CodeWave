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
  syncStructuredData();
  observeReveals();
  updateScrollProgress();
}

// Sur une fiche (projet, article), l'onglet et les résultats de recherche affichent son titre.
const PAGE_TITLE = document.title;
function syncDocumentTitle() {
  const heading = state.page.endsWith("-detail") ? document.querySelector("main h1") : null;
  document.title = heading ? `${heading.textContent.trim()} | M.G.N CodeWave` : PAGE_TITLE;
}

// ==================== DONNÉES STRUCTURÉES (JSON-LD) PAR PAGE ====================
// Organization + LocalBusiness sont statiques dans chaque <head> ; ici, ce qui dépend de la page affichée.
const SITE_ROOT = new URL("./", document.querySelector('link[rel="canonical"]')?.href || location.href).href;
const ORG_REF = { "@id": `${SITE_ROOT}#organization` };
const EN_MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

// « December 10, 2024 » -> « 2024-12-10 » ; null si le format n'est pas reconnu (la date est alors omise).
function isoDateFromEnglish(text) {
  const m = /^([A-Za-z]+) (\d{1,2}), (\d{4})$/.exec(String(text || "").trim());
  const month = m ? EN_MONTHS.indexOf(m[1]) + 1 : 0;
  if (!month) return null;
  return `${m[3]}-${String(month).padStart(2, "0")}-${m[2].padStart(2, "0")}`;
}

function breadcrumb(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map(([name, url], i) => ({ "@type": "ListItem", position: i + 1, name, item: url })),
  };
}

function offer(amount) {
  return amount === null ? undefined : { "@type": "Offer", price: amount, priceCurrency: "XAF", availability: "https://schema.org/InStock" };
}

// Renvoie les blocs JSON-LD propres à la page ; les données des autres pages ne sont pas chargées.
function pageStructuredData() {
  const fr = state.lang !== "en";
  const home = [fr ? "Accueil" : "Home", SITE_ROOT];
  switch (state.page) {
    case "services":
      return [{
        "@context": "https://schema.org",
        "@type": "ItemList",
        itemListElement: pricingGrid.flatMap((g) => g.items).map((item, i) => ({
          "@type": "ListItem",
          position: i + 1,
          item: { "@type": "Service", name: item.label.fr, provider: ORG_REF, areaServed: { "@type": "Country", name: "Gabon" }, offers: offer(item.amount) },
        })),
      }];
    case "formations":
      return [
        {
          "@context": "https://schema.org",
          "@type": "ItemList",
          itemListElement: [bootcampMern, ...formationsCatalog].map((f, i) => ({
            "@type": "ListItem",
            position: i + 1,
            item: {
              "@type": "Course",
              name: f.title.fr,
              description: (f.summary || f.title).fr,
              provider: ORG_REF,
              inLanguage: "fr",
              offers: offer(f.amount),
            },
          })),
        },
        {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: academyFaq.map((item) => ({ "@type": "Question", name: item.q.fr, acceptedAnswer: { "@type": "Answer", text: item.a.fr } })),
        },
      ];
    case "blog-detail": {
      const post = blogDetails[state.currentBlogId];
      if (!post) return [];
      const url = `${SITE_ROOT}blog.html?article=${state.currentBlogId}`;
      const published = isoDateFromEnglish(post.dateEn);
      return [
        {
          "@context": "https://schema.org",
          "@type": "Article",
          headline: fr ? post.title : post.titleEn,
          inLanguage: state.lang,
          mainEntityOfPage: url,
          author: { "@type": "Organization", name: post.author || "M.G.N CodeWave" },
          publisher: ORG_REF,
          ...(published ? { datePublished: published } : {}),
          image: `${SITE_ROOT}assets/images/codewave-share-1200x630.jpg`,
        },
        breadcrumb([home, ["Blog", `${SITE_ROOT}blog.html`], [fr ? post.title : post.titleEn, url]]),
      ];
    }
    case "portfolio-detail": {
      const project = portfolioDetails[state.currentProjectId];
      if (!project) return [];
      return [breadcrumb([home, ["Portfolio", `${SITE_ROOT}portfolio.html`], [project.title, `${SITE_ROOT}portfolio.html?projet=${state.currentProjectId}`]])];
    }
    default:
      return [];
  }
}

function syncStructuredData() {
  document.querySelectorAll("script[data-page-jsonld]").forEach((s) => s.remove());
  let blocks;
  try {
    blocks = pageStructuredData();
  } catch (error) {
    // Des données structurées manquantes ne doivent jamais empêcher l'affichage de la page.
    console.error("JSON-LD de la page non généré :", error);
    return;
  }
  for (const data of blocks) {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.dataset.pageJsonld = "";
    script.textContent = JSON.stringify(data);
    document.head.appendChild(script);
  }
}

// Initial render
render();
