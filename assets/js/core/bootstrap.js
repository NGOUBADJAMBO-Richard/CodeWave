// ==================== MAIN RENDER ====================
function render() {
  const root = document.getElementById('root');
  let pageContent = '';
  switch(state.page) {
    case 'home': pageContent = renderHome(); break;
    case 'services': pageContent = renderServices(); break;
    case 'portfolio': pageContent = renderPortfolio(); break;
    case 'portfolio-detail': pageContent = renderPortfolioDetail(state.currentProjectId || 1); break;
    case 'blog': pageContent = renderBlog(); break;
    case 'blog-detail': pageContent = renderBlogDetail(state.currentBlogId || 1); break;
    case 'careers': pageContent = renderCareers(); break;
    case 'legal': pageContent = renderMentionsLegales(); break;
    case 'privacy': pageContent = renderPrivacy(); break;
    case 'cgv': pageContent = renderCGV(); break;
    case 'sitemap': pageContent = renderSitemap(); break;
    case 'social': pageContent = renderSocial(); break;
    case 'about': pageContent = renderAbout(); break;
    case 'contact': pageContent = renderContact(); break;
    default: pageContent = renderHome();
  }

  root.innerHTML = renderNav() + `<main style="min-height:100vh">` + pageContent + `</main>` + renderFooter();

  // Trigger reveal on next frame
  setTimeout(() => {
    document.querySelectorAll('.reveal').forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight - 40) el.classList.add('visible');
    });
  }, 50);
}

// Initial render
render();
