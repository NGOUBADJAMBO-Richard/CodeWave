// ==================== PORTFOLIO DETAIL PAGE ====================
function renderPortfolioDetail(projectId) {
  const isEn = state.lang === "en";
  const p = portfolioDetails[projectId];
  if (!p)
    return `<div class="page pt-28 text-center"><p>Projet introuvable</p></div>`;

  const desc = isEn ? p.descriptionEn : p.description;
  const features = isEn ? p.featuresEn : p.features;
  const challenge = isEn ? p.challengeEn : p.challenge;
  const result = isEn ? p.resultEn : p.result;

  // Get prev/next
  const ids = Object.keys(portfolioDetails).map(Number);
  const idx = ids.indexOf(projectId);
  const prevId = idx > 0 ? ids[idx - 1] : null;
  const nextId = idx < ids.length - 1 ? ids[idx + 1] : null;

  return `
  <div class="page pt-28 pb-16">
    <!-- Breadcrumb -->
    <div class="max-w-6xl mx-auto px-4 md:px-8 mb-8">
      <nav class="flex items-center gap-2 text-sm" style="color:var(--muted)">
        <button onclick="navigate('home')" class="hover:text-blue-500 transition-colors">${isEn ? "Home" : "Accueil"}</button>
        <span>/</span>
        <button onclick="navigate('portfolio')" class="hover:text-blue-500 transition-colors">Portfolio</button>
        <span>/</span>
        <span style="color:var(--fg)">${p.title}</span>
      </nav>
    </div>

    <!-- Hero -->
    <div class="relative overflow-hidden mb-12" style="height:320px; background:${p.color}12">
      <div class="wave-bg" style="opacity:0.15">
        <svg width="100%" height="100%" viewBox="0 0 1440 320" preserveAspectRatio="xMidYMid slice">
          <path d="M-100,100 C200,0 500,200 800,100 C1100,0 1300,200 1540,100" fill="none" stroke="${p.color}" stroke-width="2"/>
          <path d="M-100,140 C200,40 500,240 800,140 C1100,40 1300,240 1540,140" fill="none" stroke="${p.color}" stroke-width="1.5"/>
          <path d="M-100,180 C200,80 500,280 800,180 C1100,80 1300,280 1540,180" fill="none" stroke="${p.color}" stroke-width="1"/>
          <path d="M-100,220 C200,120 500,320 800,220 C1100,120 1300,320 1540,220" fill="none" stroke="${p.color}" stroke-width="0.8"/>
        </svg>
      </div>
      <div class="absolute inset-0 flex items-center">
        <div class="max-w-6xl mx-auto px-4 md:px-8 w-full">
          <div class="flex items-center gap-6">
            <div class="w-20 h-20 flex items-center justify-center text-4xl font-display font-800 flex-shrink-0" style="background:${p.color}25; color:${p.color}">${p.title.substring(0, 2)}</div>
            <div>
              <span class="badge mb-2" style="background:${p.color}20;color:${p.color}">${p.category}</span>
              <h1 class="font-display font-800 text-3xl md:text-4xl" style="color:var(--fg)">${p.title}</h1>
              <p class="text-lg mt-1" style="color:var(--muted)">${p.subtitle}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="max-w-6xl mx-auto px-4 md:px-8">
      <div class="grid md:grid-cols-3 gap-8">
        <!-- Main content -->
        <div class="md:col-span-2 space-y-8">
          <!-- Description -->
          <div class="card p-7 reveal">
            <h2 class="font-display font-700 text-xl mb-4" style="color:var(--fg)">${isEn ? "Project Overview" : "Présentation du Projet"}</h2>
            <p class="leading-relaxed" style="color:var(--muted)">${desc}</p>
          </div>

          <!-- Features -->
          <div class="card p-7 reveal">
            <h2 class="font-display font-700 text-xl mb-5" style="color:var(--fg)">${isEn ? "Key Features" : "Fonctionnalités Clés"}</h2>
            <ul class="space-y-3">
              ${features
                .map(
                  (f) => `
                <li class="flex items-start gap-3 text-sm" style="color:var(--muted)">
                  <span class="mt-0.5 flex-shrink-0 w-5 h-5 flex items-center justify-center text-xs font-bold" style="background:${p.color}18;color:${p.color}">✓</span>
                  ${f}
                </li>
              `,
                )
                .join("")}
            </ul>
          </div>

          <!-- Challenge & Result -->
          <div class="grid md:grid-cols-2 gap-5 reveal">
            <div class="card p-6">
              <div class="w-10 h-10 flex items-center justify-center text-xl mb-4" style="background:rgba(239,68,68,0.1)">🎯</div>
              <h3 class="font-display font-700 text-base mb-3" style="color:var(--fg)">${isEn ? "The Challenge" : "Le Défi"}</h3>
              <p class="text-sm leading-relaxed" style="color:var(--muted)">${challenge}</p>
            </div>
            <div class="card p-6">
              <div class="w-10 h-10 flex items-center justify-center text-xl mb-4" style="background:rgba(16,185,129,0.1)">✅</div>
              <h3 class="font-display font-700 text-base mb-3" style="color:var(--fg)">${isEn ? "The Result" : "Le Résultat"}</h3>
              <p class="text-sm leading-relaxed" style="color:var(--muted)">${result}</p>
            </div>
          </div>
        </div>

        <!-- Sidebar -->
        <div class="space-y-5">
          <!-- Project info card -->
          <div class="card p-6 reveal">
            <h3 class="font-display font-700 text-sm uppercase tracking-wider mb-5" style="color:var(--muted)">${isEn ? "Project Details" : "Informations Projet"}</h3>
            <div class="space-y-4">
              ${[
                [isEn ? "Client" : "Client", p.client],
                [
                  isEn ? "Deliverable" : "Livrable",
                  isEn ? p.deliverableEn || p.deliverable : p.deliverable,
                ],
                [isEn ? "Role" : "Rôle", p.role],
                [isEn ? "Duration" : "Durée", p.duration],
                [isEn ? "Year" : "Année", p.year],
              ]
                .map(
                  ([label, val]) => `
                <div>
                  <p class="text-xs uppercase tracking-wider mb-1" style="color:var(--muted)">${label}</p>
                  <p class="font-display font-600 text-sm" style="color:var(--fg)">${val}</p>
                </div>
              `,
                )
                .join("")}
            </div>
            ${
              p.liveUrl
                ? `
              <a href="${p.liveUrl}" target="_blank" class="btn-primary w-full justify-center mt-6 text-sm py-2">
                ${isEn ? "View Live Project" : "Voir le Projet"} →
              </a>
            `
                : `
              <div class="mt-6 p-3 text-xs text-center" style="background:rgba(239,68,68,0.06);border:1px solid rgba(239,68,68,0.2);color:#ef4444">
                ⚠️ ${isEn ? "Live link temporarily unavailable" : "Lien indisponible temporairement"}
              </div>
            `
            }
          </div>

          <!-- Stack card -->
          <div class="card p-6 reveal">
            <h3 class="font-display font-700 text-sm uppercase tracking-wider mb-4" style="color:var(--muted)">Stack & Outils</h3>
            <div class="flex flex-wrap gap-2">
              ${p.stack.map((s) => `<span class="text-xs px-3 py-1.5 font-display font-600" style="background:${p.color}12;color:${p.color};border:1px solid ${p.color}30">${s}</span>`).join("")}
            </div>
          </div>

          <!-- CTA -->
          <div class="card p-6 reveal" style="background:linear-gradient(135deg,${p.color},${p.color}cc)">
            <p class="font-display font-700 text-white text-base mb-2">${isEn ? "Similar project?" : "Projet similaire ?"}</p>
            <p class="text-sm mb-4" style="color:rgba(255,255,255,0.8)">${isEn ? "Let's discuss your idea." : "Discutons de votre idée."}</p>
            <button onclick="navigate('contact')" class="btn-primary w-full justify-center text-sm py-2" style="background:white;color:${p.color};border-color:white">
              ${isEn ? "Get a Quote" : "Demander un Devis"}
            </button>
          </div>
        </div>
      </div>

      <!-- Navigation prev/next -->
      <div class="flex items-center justify-between mt-12 pt-8" style="border-top:1px solid var(--border)">
        ${
          prevId
            ? `
          <button onclick="navigateToPortfolioDetail(${prevId})" class="flex items-center gap-3 card px-5 py-3 hover:border-blue-500 transition-colors">
            <span style="color:var(--muted)">←</span>
            <div class="text-left">
              <p class="text-xs uppercase tracking-wider mb-0.5" style="color:var(--muted)">${isEn ? "Previous" : "Précédent"}</p>
              <p class="font-display font-700 text-sm" style="color:var(--fg)">${portfolioDetails[prevId].title}</p>
            </div>
          </button>
        `
            : "<div></div>"
        }
        ${
          nextId
            ? `
          <button onclick="navigateToPortfolioDetail(${nextId})" class="flex items-center gap-3 card px-5 py-3 hover:border-blue-500 transition-colors">
            <div class="text-right">
              <p class="text-xs uppercase tracking-wider mb-0.5" style="color:var(--muted)">${isEn ? "Next" : "Suivant"}</p>
              <p class="font-display font-700 text-sm" style="color:var(--fg)">${portfolioDetails[nextId].title}</p>
            </div>
            <span style="color:var(--muted)">→</span>
          </button>
        `
            : "<div></div>"
        }
      </div>
    </div>
  </div>`;
}

function navigateToPortfolioDetail(id) {
  state.page = "portfolio-detail";
  state.currentProjectId = id;
  window.scrollTo({ top: 0, behavior: "smooth" });
  render();
}

// ==================== BLOG DETAIL PAGE ====================
function renderBlogDetail(postId) {
  const isEn = state.lang === "en";
  const post = blogDetails[postId];
  if (!post)
    return `<div class="page pt-28 text-center"><p>Article introuvable</p></div>`;

  const title = isEn ? post.titleEn : post.title;
  const intro = isEn ? post.introEn : post.intro;
  const conclusion = isEn ? post.conclusionEn : post.conclusion;
  const catColors = {
    Conseils: "#1a56db",
    Tips: "#1a56db",
    Tutoriels: "#0d9488",
    Tutorials: "#0d9488",
    Actualités: "#ea580c",
    News: "#ea580c",
    Entrepreneuriat: "#7c3aed",
    Entrepreneurship: "#7c3aed",
  };
  const cat = isEn ? post.categoryEn : post.category;
  const catColor = catColors[cat] || "#1a56db";

  // Related posts (3 others)
  const relatedIds = Object.keys(blogDetails)
    .map(Number)
    .filter((id) => id !== postId)
    .slice(0, 3);

  return `
  <div class="page pt-28 pb-16">
    <!-- Breadcrumb -->
    <div class="max-w-4xl mx-auto px-4 md:px-8 mb-8">
      <nav class="flex items-center gap-2 text-sm" style="color:var(--muted)">
        <button onclick="navigate('home')" class="hover:text-blue-500">Accueil</button>
        <span>/</span>
        <button onclick="navigate('blog')" class="hover:text-blue-500">Blog</button>
        <span>/</span>
        <span style="color:var(--fg)">${title.substring(0, 40)}…</span>
      </nav>
    </div>

    <div class="max-w-4xl mx-auto px-4 md:px-8">
      <!-- Article Header -->
      <div class="mb-10">
        <div class="flex items-center gap-3 mb-5">
          <span class="badge" style="background:${catColor}18;color:${catColor}">${cat}</span>
          <span class="text-sm" style="color:var(--muted)">${isEn ? post.dateEn : post.date}</span>
          <span class="text-sm" style="color:var(--muted)">· ${post.read} ${isEn ? "min read" : "min de lecture"}</span>
        </div>
        <h1 class="font-display font-800 leading-tight mb-5" style="font-size:clamp(1.8rem,4vw,2.8rem);color:var(--fg)">${title}</h1>
        <p class="text-lg leading-relaxed" style="color:var(--muted)">${intro}</p>
        <!-- Author -->
        <div class="flex items-center gap-3 mt-6 pt-6" style="border-top:1px solid var(--border)">
          <div class="w-10 h-10 flex items-center justify-center font-display font-800 text-sm" style="background:${catColor}18;color:${catColor}">MG</div>
          <div>
            <p class="font-display font-700 text-sm" style="color:var(--fg)">${post.author}</p>
            <p class="text-xs" style="color:var(--muted)">Libreville, Gabon</p>
          </div>
        </div>
      </div>

      <!-- Decorative banner -->
      <div class="relative overflow-hidden mb-10 flex items-center justify-center" style="height:200px;background:linear-gradient(135deg,${catColor},${catColor}99)">
        <div class="wave-bg" style="opacity:0.2">
          <svg width="100%" height="100%" viewBox="0 0 1200 200" preserveAspectRatio="xMidYMid slice">
            <path d="M0,80 C200,20 400,160 600,80 C800,20 1000,160 1200,80" fill="none" stroke="white" stroke-width="2"/>
            <path d="M0,110 C200,50 400,190 600,110 C800,50 1000,190 1200,110" fill="none" stroke="white" stroke-width="1.5"/>
            <path d="M0,140 C200,80 400,200 600,140 C800,80 1000,200 1200,140" fill="none" stroke="white" stroke-width="1"/>
          </svg>
        </div>
        <span class="relative text-5xl font-display font-800 text-white opacity-30">${post.sections.length}</span>
        <span class="relative ml-3 text-white font-display font-700 text-lg">${isEn ? `Key Points` : `Points Clés`}</span>
      </div>

      <!-- Article Sections -->
      <div class="space-y-6 mb-10">
        ${post.sections
          .map(
            (s, i) => `
          <div class="reveal" style="transition-delay:${i * 40}ms">
            <div class="flex items-start gap-4">
              <div class="flex-shrink-0 w-12 h-12 flex items-center justify-center text-2xl" style="background:${catColor}10;border:1px solid ${catColor}20">${s.icon}</div>
              <div class="flex-1">
                <h2 class="font-display font-700 text-xl mb-3" style="color:var(--fg)">
                  <span class="mr-2 text-sm" style="color:${catColor}">${String(i + 1).padStart(2, "0")}.</span>
                  ${isEn ? s.titleEn : s.title}
                </h2>
                <p class="leading-relaxed" style="color:var(--muted)">${isEn ? s.bodyEn : s.body}</p>
              </div>
            </div>
            ${i < post.sections.length - 1 ? `<div class="mt-6" style="border-bottom:1px solid var(--border)"></div>` : ""}
          </div>
        `,
          )
          .join("")}
      </div>

      <!-- Conclusion -->
      <div class="card p-7 mb-10 reveal" style="border-left:4px solid ${catColor}">
        <div class="flex items-start gap-3">
          <span class="text-2xl">✨</span>
          <div>
            <p class="font-display font-700 text-base mb-2" style="color:var(--fg)">${isEn ? "Conclusion" : "Conclusion"}</p>
            <p class="leading-relaxed" style="color:var(--muted)">${conclusion}</p>
          </div>
        </div>
      </div>

      <!-- CTA inline -->
      <div class="p-7 mb-12 text-center reveal" style="background:linear-gradient(135deg,#1a56db,#1e40af)">
        <p class="font-display font-800 text-white text-xl mb-2">${isEn ? "Ready to take action?" : "Prêt à passer à l'action ?"}</p>
        <p class="text-blue-100 mb-5">${isEn ? "Get a free quote and let's build your digital presence." : "Obtenez un devis gratuit et construisons votre présence digitale."}</p>
        <button onclick="navigate('contact')" class="btn-primary" style="background:white;color:#1a56db;border-color:white">
          ${isEn ? "Request Free Quote" : "Demander un Devis Gratuit"}
        </button>
      </div>

      <!-- Share -->
      <div class="flex items-center gap-4 mb-12 p-5 card reveal">
        <p class="font-display font-700 text-sm flex-shrink-0" style="color:var(--fg)">${isEn ? "Share:" : "Partager :"}</p>
        <a href="https://wa.me/?text=${encodeURIComponent(title + " - MGN CodeWave")}" target="_blank" class="flex items-center gap-2 text-sm px-4 py-2 hover:opacity-80 transition-opacity" style="background:#25D366;color:white">
          <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
          WhatsApp
        </a>
        <a href="https://www.linkedin.com/sharing/share-offsite/?url=https://mgncodewave.com" target="_blank" class="flex items-center gap-2 text-sm px-4 py-2 hover:opacity-80 transition-opacity" style="background:#0077b5;color:white">
          LinkedIn
        </a>
      </div>

      <!-- Related articles -->
      <div>
        <h3 class="font-display font-700 text-xl mb-6" style="color:var(--fg)">${isEn ? "Related Articles" : "Articles Similaires"}</h3>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
          ${relatedIds
            .map((rid) => {
              const related = blogDetails[rid];
              const rcat = isEn ? related.categoryEn : related.category;
              return `
              <button onclick="navigateToBlogDetail(${rid})" class="card text-left overflow-hidden hover:border-blue-400 transition-colors">
                <div class="h-24 flex items-center justify-center" style="background:${related.color}12">
                  <span class="font-display font-800 text-3xl" style="color:${related.color};opacity:0.3">${rid}</span>
                </div>
                <div class="p-4">
                  <span class="badge mb-2" style="background:${related.color}18;color:${related.color}">${rcat}</span>
                  <p class="font-display font-700 text-sm leading-snug" style="color:var(--fg)">${isEn ? related.titleEn : related.title}</p>
                </div>
              </button>
            `;
            })
            .join("")}
        </div>
      </div>
    </div>
  </div>`;
}

function navigateToBlogDetail(id) {
  state.page = "blog-detail";
  state.currentBlogId = id;
  window.scrollTo({ top: 0, behavior: "smooth" });
  render();
}

// ==================== CAREERS PAGE ====================
function renderCareers() {
  const isEn = state.lang === "en";
  const activeJob = state.activeJob || null;

  if (activeJob) return renderJobDetail(activeJob);

  return `
  <div class="page pt-28 pb-16">
    <div class="max-w-6xl mx-auto px-4 md:px-8">
      <!-- Header -->
      <div class="mb-14 max-w-2xl">
        <p class="section-label mb-3">${isEn ? "Careers" : "Recrutement"}</p>
        <h1 class="font-display font-800 leading-tight mb-4" style="font-size:clamp(2.5rem,5vw,4rem);color:var(--fg)">${isEn ? "Join our\nTeam" : "Rejoignez\nnotre Équipe"}</h1>
        <p style="color:var(--muted)">${isEn ? "We're a growing digital startup based in Libreville. We're looking for motivated, autonomous talents ready to grow with us." : "Nous sommes une start-up digitale en croissance basée à Libreville. Nous cherchons des talents motivés et autonomes, prêts à grandir avec nous."}</p>
      </div>

      <!-- Why join us -->
      <div class="mb-14">
        <h2 class="font-display font-700 text-2xl mb-8 reveal" style="color:var(--fg)">${isEn ? "Why join CodeWave?" : "Pourquoi rejoindre CodeWave ?"}</h2>
        <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
          ${[
            {
              icon: "💰",
              title: isEn ? "Revenue Sharing" : "Partage des revenus",
              desc: isEn
                ? "% of project revenue. Unlimited potential."
                : "% du CA des projets. Potentiel illimité.",
            },
            {
              icon: "🏠",
              title: isEn ? "100% Remote" : "Télétravail 100%",
              desc: isEn
                ? "Work from anywhere in Gabon."
                : "Travaillez d'où vous voulez au Gabon.",
            },
            {
              icon: "🚀",
              title: isEn ? "Real Projects" : "Projets Réels",
              desc: isEn
                ? "Work on real client projects from day 1."
                : "Projets clients réels dès le 1er jour.",
            },
            {
              icon: "📈",
              title: isEn ? "Real Learning" : "Apprentissage Réel",
              desc: isEn
                ? "Skills guaranteed through practice."
                : "Compétences garanties par la pratique.",
            },
            {
              icon: "🤝",
              title: isEn ? "Fair Partnership" : "Partenariat Équitable",
              desc: isEn
                ? "We grow together, your success is ours."
                : "On grandit ensemble. Votre succès est le nôtre.",
            },
            {
              icon: "🌱",
              title: isEn ? "Startup Spirit" : "Esprit Start-up",
              desc: isEn
                ? "Young, dynamic, entrepreneurial team."
                : "Équipe jeune, dynamique et entrepreneuriale.",
            },
          ]
            .map(
              (item, i) => `
            <div class="card p-5 reveal" style="transition-delay:${i * 60}ms">
              <div class="text-3xl mb-3">${item.icon}</div>
              <h3 class="font-display font-700 text-base mb-1" style="color:var(--fg)">${item.title}</h3>
              <p class="text-sm" style="color:var(--muted)">${item.desc}</p>
            </div>
          `,
            )
            .join("")}
        </div>
      </div>

      <!-- Freelance / Partnership positions -->
      <div class="mb-12">
        <div class="flex items-center gap-3 mb-6">
          <h2 class="font-display font-700 text-xl" style="color:var(--fg)">${isEn ? "Freelance & Partnership" : "Freelance & Partenariat"}</h2>
          <span class="badge" style="background:rgba(16,185,129,0.12);color:#10b981">${careersData.freelance.length} ${isEn ? "positions" : "postes"}</span>
        </div>
        <div class="grid md:grid-cols-3 gap-5">
          ${careersData.freelance.map((job, i) => renderJobCard(job, i, isEn)).join("")}
        </div>
      </div>

      <!-- CDI positions -->
      <div class="mb-12">
        <div class="flex items-center gap-3 mb-6">
          <h2 class="font-display font-700 text-xl" style="color:var(--fg)">${isEn ? "Full-Time Positions (CDI)" : "Postes CDI"}</h2>
          <span class="badge badge-blue">${careersData.cdi.length} ${isEn ? "positions" : "postes"}</span>
        </div>
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          ${careersData.cdi.map((job, i) => renderJobCard(job, i + 3, isEn)).join("")}
        </div>
      </div>

      <!-- Spontaneous application -->
      <div class="p-8 text-center reveal" style="background:linear-gradient(135deg,#1e293b,#0f172a);border:1px solid #334155">
        <div class="text-4xl mb-4">💌</div>
        <h3 class="font-display font-800 text-white text-2xl mb-3">${isEn ? "Don't see the right position?" : "Vous ne trouvez pas le poste idéal ?"}</h3>
        <p class="mb-6" style="color:#94a3b8">${isEn ? "Send us a spontaneous application! We're always looking for motivated talent." : "Envoyez-nous une candidature spontanée ! Nous sommes toujours à la recherche de talents motivés."}</p>
        <a href="mailto:mgncodewave18@gmail.com?subject=Candidature Spontanée CodeWave" class="btn-primary" style="background:#1a56db;border-color:#1a56db">
          ${isEn ? "Send My Application" : "Envoyer Ma Candidature"} ✉️
        </a>
      </div>
    </div>
  </div>`;
}

function renderJobCard(job, delay, isEn) {
  const isCDI = job.type === "CDI";
  return `
    <div class="card overflow-hidden reveal cursor-pointer hover:border-blue-400 transition-colors" style="transition-delay:${delay * 60}ms" onclick="openJobDetail('${job.id}')">
      <div class="h-2" style="background:${job.color}"></div>
      <div class="p-5">
        <div class="flex items-start justify-between mb-3">
          <div class="text-3xl">${job.icon}</div>
          <span class="badge" style="background:${isCDI ? "rgba(26,86,219,0.1)" : "rgba(16,185,129,0.1)"};color:${isCDI ? "#1a56db" : "#10b981"}">${job.type}</span>
        </div>
        <h3 class="font-display font-700 text-base mb-0.5" style="color:var(--fg)">${isEn ? job.titleEn || job.title : job.title}</h3>
        <p class="text-xs mb-3" style="color:var(--muted)">${job.subtitle}</p>
        <div class="flex flex-wrap gap-2 mb-4">
          <span class="text-xs flex items-center gap-1" style="color:var(--muted)">📍 ${isEn ? job.locationEn : job.location}</span>
          <span class="text-xs flex items-center gap-1" style="color:var(--muted)">⏰ ${job.schedule}</span>
        </div>
        <div class="pt-3 flex items-center justify-between" style="border-top:1px solid var(--border)">
          <span class="font-display font-700 text-sm" style="color:${job.color}">${isEn ? job.payEn : job.pay}</span>
          <span class="text-xs font-display font-600 hover:text-blue-500 transition-colors" style="color:var(--muted)">${isEn ? "Details →" : "Détails →"}</span>
        </div>
      </div>
    </div>`;
}

function renderJobDetail(jobId) {
  const isEn = state.lang === "en";
  const allJobs = [...careersData.freelance, ...careersData.cdi];
  const job = allJobs.find((j) => j.id === jobId);
  if (!job) {
    state.activeJob = null;
    return renderCareers();
  }

  const reqs = isEn ? job.requirementsEn : job.requirements;
  const missions = isEn ? job.missionsEn : job.missions;
  const desc = isEn ? job.descriptionEn : job.description;

  return `
  <div class="page pt-28 pb-16">
    <div class="max-w-4xl mx-auto px-4 md:px-8">
      <!-- Breadcrumb -->
      <nav class="flex items-center gap-2 text-sm mb-8" style="color:var(--muted)">
        <button onclick="navigate('careers')" class="hover:text-blue-500">${isEn ? "Careers" : "Recrutement"}</button>
        <span>/</span>
        <span style="color:var(--fg)">${job.title}</span>
      </nav>

      <!-- Header -->
      <div class="card overflow-hidden mb-8 reveal">
        <div class="h-2" style="background:${job.color}"></div>
        <div class="p-7 md:p-10">
          <div class="flex flex-col md:flex-row md:items-start justify-between gap-5">
            <div class="flex items-start gap-4">
              <div class="text-4xl">${job.icon}</div>
              <div>
                <div class="flex items-center gap-2 mb-1">
                  <span class="badge" style="background:${job.color}18;color:${job.color}">${job.type}</span>
                  <span class="badge" style="background:rgba(100,116,139,0.1);color:var(--muted)">${job.level}</span>
                </div>
                <h1 class="font-display font-800 text-2xl md:text-3xl" style="color:var(--fg)">${isEn ? job.titleEn || job.title : job.title}</h1>
                <p class="text-base" style="color:var(--muted)">${job.subtitle}</p>
              </div>
            </div>
            <div class="text-right flex-shrink-0">
              <p class="font-display font-800 text-2xl" style="color:${job.color}">${isEn ? job.payEn : job.pay}</p>
              <div class="flex gap-3 mt-2 justify-end text-xs" style="color:var(--muted)">
                <span>📍 ${isEn ? job.locationEn : job.location}</span>
                <span>⏰ ${job.schedule}</span>
              </div>
            </div>
          </div>
          <p class="mt-5 leading-relaxed" style="color:var(--muted)">${desc}</p>
        </div>
      </div>

      <div class="grid md:grid-cols-2 gap-6 mb-8">
        <!-- Missions -->
        <div class="card p-7 reveal">
          <h2 class="font-display font-700 text-lg mb-5" style="color:var(--fg)">
            <span class="mr-2">🎯</span>${isEn ? "Missions" : "Vos Missions"}
          </h2>
          <ul class="space-y-3">
            ${missions
              .map(
                (m) => `
              <li class="flex items-start gap-3 text-sm" style="color:var(--muted)">
                <span class="flex-shrink-0 mt-0.5" style="color:${job.color}">→</span>${m}
              </li>
            `,
              )
              .join("")}
          </ul>
        </div>
        <!-- Requirements -->
        <div class="card p-7 reveal">
          <h2 class="font-display font-700 text-lg mb-5" style="color:var(--fg)">
            <span class="mr-2">✅</span>${isEn ? "Requirements" : "Profil Recherché"}
          </h2>
          <ul class="space-y-3">
            ${reqs
              .map(
                (r) => `
              <li class="flex items-start gap-3 text-sm" style="color:var(--muted)">
                <span class="flex-shrink-0 mt-0.5" style="color:#10b981">✓</span>${r}
              </li>
            `,
              )
              .join("")}
          </ul>
        </div>
      </div>

      <!-- Apply CTA -->
      <div class="card p-8 text-center reveal" style="background:linear-gradient(135deg,${job.color}18,${job.color}08);border-color:${job.color}30">
        <h3 class="font-display font-800 text-xl mb-3" style="color:var(--fg)">${isEn ? "Interested in this position?" : "Ce poste vous intéresse ?"}</h3>
        <p class="mb-6" style="color:var(--muted)">${isEn ? "Send your application to our email with your CV and portfolio (if applicable)." : "Envoyez votre candidature par email avec votre CV et portfolio (si applicable)."}</p>
        <div class="flex flex-wrap gap-3 justify-center">
          <a href="mailto:mgncodewave18@gmail.com?subject=Candidature — ${job.title}" class="btn-primary">
            ${isEn ? "Apply Now" : "Postuler Maintenant"} ✉️
          </a>
          <a href="https://wa.me/24166198918?text=Bonjour, je souhaite postuler au poste ${job.title}" target="_blank" class="btn-outline">
            WhatsApp →
          </a>
        </div>
      </div>

      <button onclick="state.activeJob=null; render();" class="mt-8 flex items-center gap-2 text-sm hover:text-blue-500 transition-colors" style="color:var(--muted)">
        ← ${isEn ? "Back to all positions" : "Retour aux offres"}
      </button>
    </div>
  </div>`;
}

function openJobDetail(jobId) {
  state.activeJob = jobId;
  window.scrollTo({ top: 0, behavior: "smooth" });
  render();
}

// ==================== LEGAL & SOCIAL PAGES ====================

// ---- Shared legal page layout helper ----
function legalLayout(
  icon,
  title,
  subtitle,
  updateDate,
  sectionsHTML,
  relatedLinks,
) {
  return `
  <div class="page pt-28 pb-16">
    <!-- Hero -->
    <div class="relative overflow-hidden mb-12" style="background:var(--card); border-bottom:1px solid var(--border)">
      <div class="wave-bg" style="opacity:0.04">
        <svg width="100%" height="100%" viewBox="0 0 1440 200" preserveAspectRatio="xMidYMid slice">
          <path d="M-100,60 C300,10 600,150 900,60 C1200,10 1400,150 1540,60" fill="none" stroke="#1a56db" stroke-width="1.5"/>
          <path d="M-100,90 C300,40 600,180 900,90 C1200,40 1400,180 1540,90" fill="none" stroke="#1a56db" stroke-width="1"/>
          <path d="M-100,120 C300,70 600,200 900,120 C1200,70 1400,200 1540,120" fill="none" stroke="#1a56db" stroke-width="0.7"/>
        </svg>
      </div>
      <div class="max-w-4xl mx-auto px-4 md:px-8 py-14">
        <nav class="flex items-center gap-2 text-sm mb-6" style="color:var(--muted)">
          <button onclick="navigate('home')" class="hover:text-blue-500 transition-colors">Accueil</button>
          <span>/</span>
          <span style="color:var(--fg)">${title}</span>
        </nav>
        <div class="flex items-center gap-4">
          <div class="w-14 h-14 flex items-center justify-center text-3xl" style="background:rgba(26,86,219,0.08)">${icon}</div>
          <div>
            <h1 class="font-display font-800 text-3xl md:text-4xl" style="color:var(--fg)">${title}</h1>
            <p style="color:var(--muted)">${subtitle}</p>
          </div>
        </div>
        <p class="mt-5 text-xs inline-flex items-center gap-2 px-3 py-1.5" style="background:rgba(26,86,219,0.06);color:var(--muted)">
          📅 Dernière mise à jour : ${updateDate}
        </p>
      </div>
    </div>

    <div class="max-w-4xl mx-auto px-4 md:px-8">
      <!-- Content -->
      <div class="space-y-0">
        ${sectionsHTML}
      </div>

      <!-- Contact box -->
      <div class="mt-12 card p-6 flex flex-col md:flex-row items-center gap-5 reveal">
        <div class="text-3xl">💬</div>
        <div class="flex-1">
          <p class="font-display font-700 text-base mb-1" style="color:var(--fg)">Des questions ?</p>
          <p class="text-sm" style="color:var(--muted)">Contactez-nous pour toute demande relative à ce document.</p>
        </div>
        <div class="flex flex-wrap gap-3">
          <a href="mailto:mgncodewave18@gmail.com" class="btn-primary text-sm py-2 px-4">✉️ Email</a>
          <a href="https://wa.me/24166198918" target="_blank" class="btn-outline text-sm py-2 px-4">WhatsApp</a>
        </div>
      </div>

      <!-- Related legal links -->
      <div class="mt-8 flex flex-wrap gap-3">
        ${relatedLinks
          .map(
            ([label, page]) => `
          <button onclick="navigate('${page}')" class="text-sm px-4 py-2 transition-colors hover:text-blue-500" style="border:1px solid var(--border);color:var(--muted)">${label}</button>
        `,
          )
          .join("")}
      </div>
    </div>
  </div>`;
}

// ---- Legal section block helper ----
function legalSection(num, title, content, accent) {
  return `
  <div class="reveal mb-0" style="border-bottom:1px solid var(--border)">
    <div class="py-8">
      <div class="flex items-start gap-4">
        <span class="flex-shrink-0 w-8 h-8 flex items-center justify-center text-xs font-display font-800" style="background:rgba(26,86,219,0.08);color:#1a56db">${num}</span>
        <div class="flex-1">
          <h2 class="font-display font-700 text-lg mb-3" style="color:var(--fg)">${title}</h2>
          <div class="text-sm leading-relaxed space-y-3" style="color:var(--muted)">${content}</div>
        </div>
      </div>
    </div>
  </div>`;
}

// ==================== MENTIONS LÉGALES ====================
function renderMentionsLegales() {
  const sections = [
    legalSection(
      "1",
      "Éditeur du Site",
      `
      <div class="card p-5 space-y-2">
        <div class="grid grid-cols-2 gap-x-6 gap-y-2">
          ${[
            ["Dénomination", "M.G.N CodeWave"],
            ["Forme juridique", "Entreprise individuelle / Auto-entrepreneur"],
            ["Siège social", "Libreville, Gabon"],
            [
              "Email",
              '<a href="mailto:mgncodewave18@gmail.com" class="text-blue-500">mgncodewave18@gmail.com</a>',
            ],
            [
              "Téléphone",
              '<a href="tel:+24166198918" class="text-blue-500">+241 66 19 89 18</a>',
            ],
            [
              "Site web",
              '<a href="https://ngoubadjambo-richard.github.io/CodeWave/" target="_blank" class="text-blue-500">https://ngoubadjambo-richard.github.io/CodeWave/</a>',
            ],
            ["Directeur de publication", "M.G.N"],
          ]
            .map(
              ([k, v]) => `
            <div><p class="text-xs uppercase tracking-wider mb-0.5" style="color:var(--muted)">${k}</p><p class="font-600" style="color:var(--fg)">${v}</p></div>
          `,
            )
            .join("")}
        </div>
      </div>`,
    ),
    legalSection(
      "2",
      "Hébergement",
      `
      <div class="card p-5">
        <p><strong style="color:var(--fg)">Hébergeur :</strong> Github, Inc.</p>
        <p><strong style="color:var(--fg)">Adresse :</strong> 88, rue Colin P. Kelly Jr., #4133, San Francisco, Californie.</p>
        <p><strong style="color:var(--fg)">Site :</strong> <a href="https://github.com" target="_blank" class="text-blue-500">github.com</a></p>
      </div>`,
    ),
    legalSection(
      "3",
      "Propriété Intellectuelle",
      `
      <p>L'ensemble de ce site relève de la législation sur le droit d'auteur et la propriété intellectuelle. Tous les droits de reproduction sont réservés, y compris pour les documents téléchargeables et les représentations iconographiques et photographiques.</p>
      <p>La reproduction de tout ou partie de ce site sur un support électronique est formellement interdite sauf autorisation expresse du directeur de la publication.</p>
      <p>Les marques, logos, signes ainsi que tous les contenus du site font l'objet d'une protection par le Code de la propriété intellectuelle et plus particulièrement par le droit d'auteur.</p>`,
    ),
    legalSection(
      "4",
      "Limitation de Responsabilité",
      `
      <p>Les informations contenues sur ce site sont aussi précises que possible et le site est périodiquement remis à jour, mais peut toutefois contenir des inexactitudes, des omissions ou des lacunes.</p>
      <p>CodeWave ne pourra être tenu responsable des dommages directs et indirects causés au matériel de l'utilisateur, lors de l'accès au site, et résultant soit de l'utilisation d'un matériel ne répondant pas aux spécifications techniques requises, soit de l'apparition d'un bug ou d'une incompatibilité.</p>`,
    ),
    legalSection(
      "5",
      "Liens Hypertextes",
      `
      <p>Le site peut contenir des liens hypertextes vers d'autres sites présents sur le réseau Internet. Les liens vers ces autres ressources vous font quitter le site CodeWave.</p>
      <p>Il est possible de créer un lien vers la page de présentation de ce site sans autorisation expresse de CodeWave. Aucune autorisation ou demande d'information préalable ne peut être exigée par l'éditeur à l'égard d'un site qui souhaite établir un lien.</p>`,
    ),
    legalSection(
      "6",
      "Protection des Données Personnelles",
      `
      <p>Conformément à la réglementation en vigueur, vous disposez d'un droit d'accès, de rectification, de suppression et d'opposition aux données personnelles vous concernant.</p>
      <p>Pour toute information complémentaire sur la protection des données personnelles, nous vous invitons à consulter notre <button onclick="navigate('privacy')" class="text-blue-500 underline">Politique de Confidentialité</button>.</p>
      <p>Pour exercer ces droits, contactez-nous par email à <a href="mailto:mgncodewave18@gmail.com" class="text-blue-500">mgncodewave18@gmail.com</a>.</p>`,
    ),
    legalSection(
      "7",
      "Cookies",
      `
      <p>Le site CodeWave peut être amené à utiliser des cookies pour améliorer l'expérience utilisateur. Vous pouvez configurer votre navigateur pour refuser ces cookies, mais certaines fonctionnalités du site peuvent être limitées.</p>
      <p>Pour plus d'informations, consultez notre <button onclick="navigate('privacy')" class="text-blue-500 underline">Politique de Confidentialité</button>.</p>`,
    ),
    legalSection(
      "8",
      "Droit Applicable et Juridiction",
      `
      <p>Tout litige en relation avec l'utilisation du site CodeWave est soumis au droit gabonais.</p>
      <p>En cas de litige, les tribunaux de <strong style="color:var(--fg)">Libreville, Gabon</strong>, seront seuls compétents.</p>`,
    ),
  ].join("");

  return legalLayout(
    "⚖️",
    "Mentions Légales",
    "Informations légales et éditoriales du site",
    "18 Mars 2026",
    sections,
    [
      ["Politique de Confidentialité", "privacy"],
      ["CGV", "cgv"],
      ["Plan du Site", "sitemap"],
    ],
  );
}

// ==================== POLITIQUE DE CONFIDENTIALITÉ ====================
function renderPrivacy() {
  const sections = [
    legalSection(
      "1",
      "Responsable du Traitement des Données",
      `
      <div class="card p-5 grid grid-cols-2 gap-x-6 gap-y-2">
        ${[
          ["Raison sociale", "M.G.N CodeWave"],
          ["Adresse", "Libreville, Gabon"],
          [
            "Email",
            '<a href="mailto:mgncodewave18@gmail.com" class="text-blue-500">mgncodewave18@gmail.com</a>',
          ],
          [
            "Téléphone",
            '<a href="tel:+24166198918" class="text-blue-500">+241 66 19 89 18</a>',
          ],
        ]
          .map(
            ([k, v]) =>
              `<div><p class="text-xs uppercase tracking-wider mb-0.5" style="color:var(--muted)">${k}</p><p class="font-600" style="color:var(--fg)">${v}</p></div>`,
          )
          .join("")}
      </div>`,
    ),
    legalSection(
      "2",
      "Données que Nous Collectons",
      `
      <div class="space-y-4">
        <div>
          <p class="font-600 mb-2" style="color:var(--fg)">2.1 Données que vous nous fournissez directement</p>
          <ul class="space-y-1 ml-4">
            ${["Informations d'identité : nom, prénom, raison sociale", "Coordonnées : email, téléphone, adresse postale", "Informations professionnelles : entreprise, secteur, fonction", "Informations de projet : description, budget, délais", "Données de paiement : informations de facturation (sécurisées)"].map((i) => `<li class="flex items-start gap-2"><span style="color:#1a56db">•</span>${i}</li>`).join("")}
          </ul>
        </div>
        <div>
          <p class="font-600 mb-2" style="color:var(--fg)">2.2 Données collectées automatiquement</p>
          <ul class="space-y-1 ml-4">
            ${["Données de navigation : pages visitées, durée, actions", "Données techniques : adresse IP, navigateur, OS", "Données de géolocalisation : pays, ville (non précise)", "Cookies : voir section dédiée ci-dessous"].map((i) => `<li class="flex items-start gap-2"><span style="color:#1a56db">•</span>${i}</li>`).join("")}
          </ul>
        </div>
      </div>`,
    ),
    legalSection(
      "3",
      "Pourquoi Nous Utilisons Vos Données",
      `
      <div class="grid md:grid-cols-2 gap-3">
        ${[
          [
            "🛠️",
            "Gestion des services",
            "Traiter vos devis, gérer vos commandes, assurer le suivi de vos projets",
          ],
          [
            "💬",
            "Communication",
            "Vous contacter pour votre projet, répondre à vos questions",
          ],
          [
            "📈",
            "Amélioration des services",
            "Analyser l'utilisation pour améliorer votre expérience",
          ],
          [
            "📣",
            "Marketing (avec consentement)",
            "Newsletter et offres spéciales uniquement si vous y consentez",
          ],
          [
            "⚖️",
            "Obligations légales",
            "Respecter nos obligations comptables et de facturation",
          ],
        ]
          .map(
            ([icon, title, desc]) => `
          <div class="card p-4">
            <div class="flex items-center gap-2 mb-1"><span>${icon}</span><span class="font-600 text-sm" style="color:var(--fg)">${title}</span></div>
            <p class="text-xs">${desc}</p>
          </div>
        `,
          )
          .join("")}
      </div>`,
    ),
    legalSection(
      "4",
      "Partage de Vos Données",
      `
      <div class="card p-5 mb-3" style="border-left:3px solid #10b981">
        <p class="font-700 text-sm mb-1" style="color:#10b981">✓ Nous ne vendons jamais vos données personnelles.</p>
        <p>Nous pouvons les partager uniquement avec :</p>
      </div>
      <ul class="space-y-2 ml-4">
        ${["Prestataires de services : hébergeur Vercel, outils d'analyse Google Analytics — uniquement pour les services nécessaires", "Partenaires de paiement : pour traiter vos paiements Mobile Money de manière sécurisée", "Autorités légales : si la loi l'exige ou pour protéger nos droits"].map((i) => `<li class="flex items-start gap-2"><span style="color:#1a56db">•</span>${i}</li>`).join("")}
      </ul>`,
    ),
    legalSection(
      "5",
      "Durée de Conservation",
      `
      <div class="card overflow-hidden">
        <table class="w-full text-sm">
          <thead><tr style="background:rgba(26,86,219,0.05)"><th class="text-left p-3 font-display font-700" style="color:var(--fg)">Type de données</th><th class="text-left p-3 font-display font-700" style="color:var(--fg)">Durée</th></tr></thead>
          <tbody>
            ${[
              ["Données clients actifs", "Durée relation + 5 ans"],
              ["Devis non convertis", "3 ans maximum"],
              ["Newsletter", "Jusqu'à désabonnement"],
              ["Données de navigation", "13 mois (cookies)"],
            ]
              .map(
                ([t, d], i) => `
              <tr style="border-top:1px solid var(--border)${i % 2 === 0 ? ";background:rgba(26,86,219,0.02)" : ""}"><td class="p-3" style="color:var(--fg)">${t}</td><td class="p-3 font-600" style="color:#1a56db">${d}</td></tr>
            `,
              )
              .join("")}
          </tbody>
        </table>
      </div>`,
    ),
    legalSection(
      "6",
      "Sécurité de Vos Données",
      `
      <div class="grid md:grid-cols-2 gap-3">
        ${[
          [
            "🔒",
            "Chiffrement SSL/TLS",
            "Toutes les données transitent via connexion HTTPS sécurisée",
          ],
          [
            "🛡️",
            "Hébergement sécurisé",
            "Serveurs protégés par pare-feux et systèmes anti-intrusion",
          ],
          [
            "👤",
            "Accès limité",
            "Seules les personnes autorisées ont accès à vos données",
          ],
          [
            "💾",
            "Sauvegardes régulières",
            "Vos données sont sauvegardées quotidiennement",
          ],
        ]
          .map(
            ([icon, title, desc]) => `
          <div class="card p-4"><div class="flex items-center gap-2 mb-1"><span>${icon}</span><span class="font-600 text-sm" style="color:var(--fg)">${title}</span></div><p class="text-xs">${desc}</p></div>
        `,
          )
          .join("")}
      </div>`,
    ),
    legalSection(
      "7",
      "Vos Droits sur Vos Données",
      `
      <div class="grid md:grid-cols-3 gap-3">
        ${[
          ["👁️", "Droit d'accès", "Demandez une copie de toutes vos données"],
          ["✏️", "Droit de rectification", "Corrigez des données inexactes"],
          [
            "🗑️",
            "Droit à l'effacement",
            "Suppression sous certaines conditions",
          ],
          ["⛔", "Droit d'opposition", "Opposez-vous au marketing direct"],
          [
            "📦",
            "Droit à la portabilité",
            "Récupérez vos données en format structuré",
          ],
          [
            "⏸️",
            "Droit à la limitation",
            "Limitez le traitement dans certains cas",
          ],
        ]
          .map(
            ([icon, title, desc]) => `
          <div class="card p-4"><div class="flex items-center gap-2 mb-1"><span>${icon}</span><span class="font-600 text-xs" style="color:var(--fg)">${title}</span></div><p style="font-size:11px;color:var(--muted)">${desc}</p></div>
        `,
          )
          .join("")}
      </div>
      <p class="mt-4">Pour exercer vos droits : <a href="mailto:mgncodewave18@gmail.com" class="text-blue-500">mgncodewave18@gmail.com</a> — Réponse sous 1 mois maximum.</p>`,
    ),
    legalSection(
      "8",
      "Cookies",
      `
      <div class="space-y-3">
        ${[
          [
            "✓",
            "#10b981",
            "Cookies essentiels (obligatoires)",
            "Nécessaires au fonctionnement (navigation, sécurité, session). Durée : session ou 1 an.",
          ],
          [
            "📊",
            "#1a56db",
            "Cookies analytiques (facultatifs)",
            "Google Analytics pour comprendre votre usage. Durée : 13 mois. Nécessite votre consentement.",
          ],
          [
            "📢",
            "#f59e0b",
            "Cookies marketing (facultatifs)",
            "Pour personnaliser les publicités. Durée : variable. Nécessite votre consentement.",
          ],
        ]
          .map(
            ([icon, color, title, desc]) => `
          <div class="card p-4 flex gap-3">
            <span class="text-xl">${icon}</span>
            <div><p class="font-600 text-sm mb-1" style="color:${color}">${title}</p><p class="text-xs">${desc}</p></div>
          </div>
        `,
          )
          .join("")}
      </div>`,
    ),
    legalSection(
      "9",
      "Protection des Mineurs",
      `<p>Nos services ne sont pas destinés aux personnes de moins de 18 ans. Nous ne collectons pas sciemment de données concernant des mineurs. Si vous êtes parent ou tuteur et pensez que votre enfant nous a fourni des données, contactez-nous immédiatement pour suppression.</p>`,
    ),
    legalSection(
      "10",
      "Modifications de Cette Politique",
      `<p>Nous pouvons modifier cette politique à tout moment pour refléter les évolutions de nos services, les changements légaux ou l'amélioration de nos pratiques. En cas de modification importante, nous vous en informerons par email ou via un avis sur le site.</p>`,
    ),
  ].join("");

  return legalLayout(
    "🔒",
    "Politique de Confidentialité",
    "Comment nous protégeons et utilisons vos données personnelles",
    "18 Mars 2026",
    sections,
    [
      ["Mentions Légales", "legal"],
      ["CGV", "cgv"],
      ["Plan du Site", "sitemap"],
    ],
  );
}

// ==================== CGV ====================
function renderCGV() {
  const sections = [
    legalSection(
      "1",
      "Objet",
      `
      <p>Les présentes CGV ont pour objet de définir les droits et obligations des parties dans le cadre de la vente de services de développement web par CodeWave, notamment :</p>
      <ul class="mt-2 space-y-1 ml-4">
        ${["Création de sites web vitrines", "Développement de boutiques e-commerce", "Création de blogs et portfolios", "Services de maintenance et d'hébergement", "Services additionnels (SEO, design, réseaux sociaux, etc.)"].map((i) => `<li class="flex items-start gap-2"><span style="color:#1a56db">•</span>${i}</li>`).join("")}
      </ul>
      <p class="mt-3">Toute commande implique l'acceptation sans réserve des présentes CGV.</p>`,
    ),
    legalSection(
      "2",
      "Devis et Commande",
      `
      <div class="space-y-4">
        <div><p class="font-600 mb-1" style="color:var(--fg)">2.1 Devis</p><p>Tout devis est gratuit, sans engagement et valable <strong style="color:var(--fg)">30 jours</strong> à compter de sa date d'émission. Passé ce délai, le Prestataire se réserve le droit de modifier les tarifs.</p></div>
        <div><p class="font-600 mb-1" style="color:var(--fg)">2.2 Commande ferme après</p><ul class="space-y-1 ml-4">${["Signature du devis par le Client", "Réception de l'acompte initial (généralement 50%)", "Fourniture des éléments nécessaires (textes, images, etc.)"].map((i) => `<li class="flex items-start gap-2"><span style="color:#10b981">✓</span>${i}</li>`).join("")}</ul></div>
      </div>`,
    ),
    legalSection(
      "3",
      "Prix et Modalités de Paiement",
      `
      <div class="space-y-4">
        <div><p class="font-600 mb-2" style="color:var(--fg)">3.2 Modalités de paiement</p>
          <div class="grid md:grid-cols-3 gap-3">
            ${[
              ["💯", "Paiement en 1 fois", "100% à la commande"],
              ["✌️", "Paiement en 2 fois", "50% commande + 50% livraison"],
              [
                "🔢",
                "Paiement en 3 fois",
                "Projets > 150 000 FCFA (33/33/34%)",
              ],
            ]
              .map(
                ([icon, title, desc]) =>
                  `<div class="card p-4 text-center"><div class="text-2xl mb-1">${icon}</div><p class="font-700 text-sm mb-1" style="color:var(--fg)">${title}</p><p class="text-xs">${desc}</p></div>`,
              )
              .join("")}
          </div>
        </div>
        <div><p class="font-600 mb-2" style="color:var(--fg)">3.3 Moyens acceptés</p>
          <div class="flex flex-wrap gap-2">
            ${["🏦 Virement bancaire", "📱 Airtel Money", "📱 Moov Money", "💵 Espèces (Libreville)"].map((m) => `<span class="px-3 py-1.5 text-sm" style="background:rgba(26,86,219,0.06);border:1px solid rgba(26,86,219,0.15);color:var(--fg)">${m}</span>`).join("")}
          </div>
        </div>
        <div class="card p-4" style="border-left:3px solid #ef4444"><p class="font-600 text-sm mb-1" style="color:#ef4444">⚠️ Retard de paiement</p><p class="text-xs">Tout retard entraîne la suspension des travaux. Pénalités de 10% du montant dû après relance sans réponse.</p></div>
      </div>`,
    ),
    legalSection(
      "4",
      "Obligations du Client",
      `
      <ul class="space-y-2">
        ${["Fournir tous les éléments nécessaires (textes, images, logos) dans les délais convenus", "S'assurer que les contenus fournis ne violent aucun droit de propriété intellectuelle", "Répondre aux demandes de validation dans un délai de 7 jours ouvrés", "Effectuer les paiements selon l'échéancier convenu", "Informer le Prestataire de toute modification souhaitée dans les meilleurs délais"].map((i) => `<li class="flex items-start gap-3"><span class="flex-shrink-0 mt-0.5 w-5 h-5 flex items-center justify-center text-xs" style="background:rgba(26,86,219,0.08);color:#1a56db">→</span>${i}</li>`).join("")}
      </ul>
      <p class="mt-3 text-xs px-4 py-2" style="background:rgba(245,158,11,0.08);border:1px solid rgba(245,158,11,0.2);color:#d97706">⚠️ Tout retard dans la fourniture des éléments par le Client entraîne un report proportionnel du délai de livraison.</p>`,
    ),
    legalSection(
      "5",
      "Obligations du Prestataire",
      `
      <ul class="space-y-2">
        ${["Réaliser les prestations conformément aux spécifications du devis accepté", "Respecter les délais de livraison convenus (sauf cas de force majeure)", "Livrer un site web fonctionnel, testé et optimisé", "Former le Client à l'utilisation de son site web", "Assurer un support technique selon les modalités convenues", "Maintenir la confidentialité des informations du Client"].map((i) => `<li class="flex items-start gap-3"><span style="color:#10b981">✓</span>${i}</li>`).join("")}
      </ul>`,
    ),
    legalSection(
      "6",
      "Délais et Livraison",
      `
      <div class="card overflow-hidden mb-3">
        <div class="p-4" style="background:rgba(26,86,219,0.04)"><p class="font-600 text-sm" style="color:var(--fg)">Délais indicatifs par type de projet</p></div>
        <table class="w-full text-sm">
          <tbody>
            ${[
              ["Site Vitrine Basic", "1 – 2 semaines"],
              ["Site Vitrine Pro", "2 – 3 semaines"],
              ["E-Commerce Starter", "3 – 5 semaines"],
              ["E-Commerce Business", "5 – 8 semaines"],
              ["Application sur mesure", "Sur devis"],
            ]
              .map(
                ([t, d], i) =>
                  `<tr style="border-top:1px solid var(--border)${i % 2 === 0 ? ";background:rgba(26,86,219,0.01)" : ""}"><td class="p-3" style="color:var(--fg)">${t}</td><td class="p-3 font-700 text-right" style="color:#1a56db">${d}</td></tr>`,
              )
              .join("")}
          </tbody>
        </table>
      </div>
      <p>La livraison est effective après mise en ligne, formation du Client et validation écrite (ou défaut de réponse sous 7 jours).</p>`,
    ),
    legalSection(
      "7",
      "Modifications et Révisions",
      `
      <div class="grid md:grid-cols-3 gap-3">
        ${[
          [
            "✅",
            "Révisions incluses",
            "Chaque pack inclut 2 à 3 allers-retours gratuits.",
          ],
          [
            "➕",
            "Modifications supplémentaires",
            "Toute révision au-delà du forfait fait l'objet d'un devis complémentaire.",
          ],
          [
            "🔄",
            "Modifications importantes",
            "Si les changements modifient substantiellement le projet, un nouveau devis est établi.",
          ],
        ]
          .map(
            ([icon, title, desc]) =>
              `<div class="card p-4"><div class="text-xl mb-2">${icon}</div><p class="font-600 text-sm mb-1" style="color:var(--fg)">${title}</p><p class="text-xs">${desc}</p></div>`,
          )
          .join("")}
      </div>`,
    ),
    legalSection(
      "8",
      "Garantie et Maintenance",
      `
      <div class="grid md:grid-cols-2 gap-3">
        <div class="card p-5"><p class="font-700 mb-2" style="color:var(--fg)">🛡️ Garantie 30 jours</p><p class="text-xs">CodeWave garantit le bon fonctionnement du site pendant 30 jours après livraison. Couvre uniquement les bugs liés à la réalisation initiale.</p></div>
        <div class="card p-5"><p class="font-700 mb-2" style="color:var(--fg)">🔧 Maintenance mensuelle</p><p class="text-xs mb-2">Au-delà, contrat disponible à <strong style="color:#1a56db">15 000 FCFA/mois</strong> incluant :</p><ul class="text-xs space-y-1">${["Mises à jour techniques", "Sauvegardes régulières", "Support technique prioritaire", "Corrections de bugs"].map((i) => `<li class="flex items-center gap-1"><span style="color:#10b981">✓</span>${i}</li>`).join("")}</ul></div>
      </div>`,
    ),
    legalSection(
      "9",
      "Propriété Intellectuelle",
      `
      <div class="space-y-3">
        ${[
          [
            "👤",
            "Droits du Client",
            "Après paiement intégral, le Client est propriétaire des éléments graphiques et du design créés spécifiquement pour lui.",
          ],
          [
            "🏢",
            "Droits du Prestataire",
            "CodeWave conserve les droits sur les frameworks, codes génériques et méthodes de développement utilisés.",
          ],
          [
            "📸",
            "Portfolio",
            "Sauf mention contraire écrite, CodeWave se réserve le droit d'utiliser les réalisations dans son portfolio.",
          ],
          [
            "📋",
            "Contenus du Client",
            "Le Client garantit disposer de tous les droits sur les contenus fournis.",
          ],
        ]
          .map(
            ([icon, title, desc]) =>
              `<div class="flex items-start gap-3"><span class="text-xl">${icon}</span><div><p class="font-600 text-sm mb-0.5" style="color:var(--fg)">${title}</p><p class="text-xs">${desc}</p></div></div>`,
          )
          .join("")}
      </div>`,
    ),
    legalSection(
      "10",
      "Résiliation et Annulation",
      `
      <div class="grid md:grid-cols-2 gap-3">
        <div class="card p-5"><p class="font-700 text-sm mb-2" style="color:var(--fg)">Par le Client</p><p class="text-xs">Annulation avant le début des travaux : perte de l'acompte. Une fois les travaux commencés : minimum 50% du devis dû.</p></div>
        <div class="card p-5"><p class="font-700 text-sm mb-2" style="color:var(--fg)">Par le Prestataire</p><p class="text-xs mb-2">CodeWave peut résilier en cas de :</p><ul class="text-xs space-y-1">${["Non-paiement après relance", "Non-fourniture des éléments après 30 jours", "Comportement abusif ou irrespectueux", "Demandes contraires à la loi ou à l'éthique"].map((i) => `<li class="flex items-center gap-1"><span style="color:#ef4444">•</span>${i}</li>`).join("")}</ul></div>
      </div>`,
    ),
    legalSection(
      "11",
      "Droit Applicable et Litiges",
      `<p>Les présentes CGV sont régies par le <strong style="color:var(--fg)">droit gabonais</strong>. En cas de litige, les parties s'efforceront de trouver une solution amiable. À défaut, les <strong style="color:var(--fg)">tribunaux de Libreville, Gabon</strong>, seront seuls compétents.</p>`,
    ),
  ].join("");

  return legalLayout(
    "📋",
    "Conditions Générales de Vente",
    "Nos conditions applicables aux services de développement web",
    "18 Mars 2026",
    sections,
    [
      ["Mentions Légales", "legal"],
      ["Politique de Confidentialité", "privacy"],
      ["Plan du Site", "sitemap"],
    ],
  );
}

// ==================== PLAN DU SITE ====================
function renderSitemap() {
  const isEn = state.lang === "en";

  const pages = [
    {
      icon: "🏠",
      title: isEn ? "Main Pages" : "Pages Principales",
      color: "#1a56db",
      items: [
        {
          label: isEn ? "Home" : "Accueil",
          desc: isEn
            ? "Presentation of our services and achievements"
            : "Présentation de nos services et réalisations",
          page: "home",
        },
        {
          label: isEn ? "Services" : "Services",
          desc: isEn
            ? "All our web development services"
            : "Tous nos services de développement web",
          page: "services",
        },
        {
          label: "Portfolio",
          desc: isEn
            ? "12 completed projects with details"
            : "12 projets réalisés avec détails",
          page: "portfolio",
        },
        {
          label: "Blog",
          desc: isEn
            ? "7 articles on web, SEO and entrepreneurship"
            : "7 articles sur le web, SEO et entrepreneuriat",
          page: "blog",
        },
        {
          label: isEn ? "Careers" : "Carrières",
          desc: isEn
            ? "8 open positions, freelance and CDI"
            : "8 postes ouverts, freelance et CDI",
          page: "careers",
        },
        {
          label: isEn ? "About" : "À Propos",
          desc: isEn
            ? "Our story, values and team"
            : "Notre histoire, valeurs et équipe",
          page: "about",
        },
        {
          label: "Contact",
          desc: isEn
            ? "Contact form and direct info"
            : "Formulaire de contact et infos directes",
          page: "contact",
        },
      ],
    },
    {
      icon: "🖼️",
      title: isEn ? "Portfolio Details" : "Détails Portfolio",
      color: "#8b5cf6",
      items: [
        {
          label: "Waz'UP",
          desc: "Super-app Flutter",
          page: "portfolio-detail",
          id: 1,
        },
        {
          label: "H2P Group",
          desc: "Site vitrine & identité",
          page: "portfolio-detail",
          id: 2,
        },
        {
          label: "MGN CodeWave",
          desc: "Studio digital & branding",
          page: "portfolio-detail",
          id: 3,
        },
        {
          label: "Portfolio Richard",
          desc: "Portfolio développeur",
          page: "portfolio-detail",
          id: 4,
        },
        {
          label: "Le Bon Waz",
          desc: "E-commerce Gabon",
          page: "portfolio-detail",
          id: 5,
        },
        {
          label: "Lampe à Mes Pieds",
          desc: "Site éditorial",
          page: "portfolio-detail",
          id: 6,
        },
        {
          label: "English Fun Club",
          desc: "Plateforme e-learning",
          page: "portfolio-detail",
          id: 7,
        },
        {
          label: "Découvre qui tu es",
          desc: "App tests de profil",
          page: "portfolio-detail",
          id: 8,
        },
        {
          label: "Projet Booki",
          desc: "Portail hôtelier",
          page: "portfolio-detail",
          id: 9,
        },
        {
          label: "Grâce Déployée",
          desc: "Site communautaire",
          page: "portfolio-detail",
          id: 10,
        },
        {
          label: "API Airtel Money",
          desc: "Documentation API",
          page: "portfolio-detail",
          id: 11,
        },
        {
          label: "LMS Platform",
          desc: "Gestion des prospects",
          page: "portfolio-detail",
          id: 12,
        },
      ],
    },
    {
      icon: "📝",
      title: isEn ? "Blog Articles" : "Articles Blog",
      color: "#0d9488",
      items: [
        {
          label: isEn
            ? "10 reasons to create a website in Gabon"
            : "10 raisons de créer un site web au Gabon",
          desc: isEn ? "Tips • 8 min" : "Conseils • 8 min",
          page: "blog-detail",
          id: 1,
        },
        {
          label: isEn
            ? "Optimize your SEO in Gabon"
            : "Optimiser votre SEO au Gabon",
          desc: isEn ? "Tutorials • 6 min" : "Tutoriels • 6 min",
          page: "blog-detail",
          id: 2,
        },
        {
          label: isEn
            ? "5 e-commerce mistakes to avoid"
            : "5 erreurs e-commerce à éviter",
          desc: isEn ? "Tips • 4 min" : "Conseils • 4 min",
          page: "blog-detail",
          id: 3,
        },
        {
          label: isEn ? "Web design trends 2025" : "Tendances web design 2025",
          desc: isEn ? "News • 5 min" : "Actualités • 5 min",
          page: "blog-detail",
          id: 4,
        },
        {
          label: isEn
            ? "8 website monetization strategies"
            : "8 stratégies pour monétiser votre site",
          desc: isEn ? "Entrepreneurship • 7 min" : "Entrepreneuriat • 7 min",
          page: "blog-detail",
          id: 5,
        },
        {
          label: isEn
            ? "Creating a blog content strategy"
            : "Créer une stratégie de contenu blog",
          desc: isEn ? "Tutorials • 8 min" : "Tutoriels • 8 min",
          page: "blog-detail",
          id: 6,
        },
        {
          label: isEn
            ? "Importance of website loading speed"
            : "Importance de la vitesse de chargement",
          desc: isEn ? "Tips • 5 min" : "Conseils • 5 min",
          page: "blog-detail",
          id: 7,
        },
      ],
    },
    {
      icon: "⚖️",
      title: isEn ? "Legal" : "Informations Légales",
      color: "#64748b",
      items: [
        {
          label: isEn ? "Legal Notice" : "Mentions Légales",
          desc: isEn
            ? "Editorial and legal information"
            : "Informations légales et éditoriales",
          page: "legal",
        },
        {
          label: isEn ? "Privacy Policy" : "Politique de Confidentialité",
          desc: isEn
            ? "Data protection"
            : "Protection des données personnelles",
          page: "privacy",
        },
        {
          label: isEn ? "Terms & Conditions" : "CGV",
          desc: isEn ? "Sales conditions" : "Conditions Générales de Vente",
          page: "cgv",
        },
        {
          label: isEn ? "Sitemap" : "Plan du Site",
          desc: isEn
            ? "Complete site navigation"
            : "Navigation complète du site",
          page: "sitemap",
        },
      ],
    },
  ];

  return `
  <div class="page pt-28 pb-16">
    <!-- Header -->
    <div class="relative overflow-hidden mb-12" style="background:var(--card); border-bottom:1px solid var(--border)">
      <div class="wave-bg" style="opacity:0.04">
        <svg width="100%" height="100%" viewBox="0 0 1440 200" preserveAspectRatio="xMidYMid slice">
          <path d="M-100,60 C300,10 600,150 900,60 C1200,10 1400,150 1540,60" fill="none" stroke="#1a56db" stroke-width="1.5"/>
          <path d="M-100,100 C300,50 600,190 900,100 C1200,50 1400,190 1540,100" fill="none" stroke="#1a56db" stroke-width="1"/>
        </svg>
      </div>
      <div class="max-w-5xl mx-auto px-4 md:px-8 py-14">
        <nav class="flex items-center gap-2 text-sm mb-6" style="color:var(--muted)">
          <button onclick="navigate('home')" class="hover:text-blue-500">Accueil</button>
          <span>/</span>
          <span style="color:var(--fg)">${isEn ? "Sitemap" : "Plan du Site"}</span>
        </nav>
        <div class="flex items-center gap-4">
          <div class="w-14 h-14 flex items-center justify-center text-3xl" style="background:rgba(26,86,219,0.08)">🗺️</div>
          <div>
            <h1 class="font-display font-800 text-3xl md:text-4xl" style="color:var(--fg)">${isEn ? "Sitemap" : "Plan du Site"}</h1>
            <p style="color:var(--muted)">${isEn ? "Find all our pages easily" : "Naviguez facilement sur notre site et trouvez ce que vous cherchez"}</p>
          </div>
        </div>
      </div>
    </div>

    <div class="max-w-5xl mx-auto px-4 md:px-8">
      <div class="grid md:grid-cols-2 gap-8">
        ${pages
          .map(
            (group) => `
          <div class="reveal">
            <div class="flex items-center gap-3 mb-5">
              <span class="text-2xl">${group.icon}</span>
              <h2 class="font-display font-700 text-lg" style="color:var(--fg)">${group.title}</h2>
              <div class="flex-1 h-px" style="background:var(--border)"></div>
            </div>
            <div class="space-y-1.5">
              ${group.items
                .map(
                  (item) => `
                <button onclick="${item.id ? `state.page='${item.page}';state.current${item.page === "portfolio-detail" ? "Project" : "Blog"}Id=${item.id};window.scrollTo({top:0});render();` : `navigate('${item.page}')`}" 
                  class="w-full text-left flex items-center justify-between p-3 card hover:border-blue-400 transition-colors group">
                  <div class="flex items-center gap-3">
                    <div class="w-1.5 h-1.5 rounded-full flex-shrink-0" style="background:${group.color}"></div>
                    <div>
                      <p class="font-display font-600 text-sm group-hover:text-blue-500 transition-colors" style="color:var(--fg)">${item.label}</p>
                      <p class="text-xs" style="color:var(--muted)">${item.desc}</p>
                    </div>
                  </div>
                  <span class="text-xs" style="color:var(--muted)">→</span>
                </button>
              `,
                )
                .join("")}
            </div>
          </div>
        `,
          )
          .join("")}
      </div>

      <!-- Stats summary -->
      <div class="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 reveal">
        ${[
          ["9", isEn ? "Main pages" : "Pages principales", "#1a56db"],
          ["12", isEn ? "Portfolio details" : "Détails portfolio", "#8b5cf6"],
          ["7", isEn ? "Blog articles" : "Articles blog", "#0d9488"],
          ["4", isEn ? "Legal pages" : "Pages légales", "#64748b"],
        ]
          .map(
            ([n, l, c]) => `
          <div class="card p-4 text-center">
            <p class="font-display font-800 text-3xl mb-1" style="color:${c}">${n}</p>
            <p class="text-xs uppercase tracking-wider" style="color:var(--muted)">${l}</p>
          </div>
        `,
          )
          .join("")}
      </div>

      <!-- Not found -->
      <div class="mt-10 card p-7 text-center reveal">
        <p class="text-2xl mb-3">🔍</p>
        <h3 class="font-display font-700 text-lg mb-2" style="color:var(--fg)">${isEn ? "Not finding what you need?" : "Vous ne trouvez pas ce que vous cherchez ?"}</h3>
        <p class="mb-5" style="color:var(--muted)">${isEn ? "Contact us directly, we'll be happy to help!" : "Contactez-nous directement, nous serons ravis de vous aider !"}</p>
        <div class="flex flex-wrap gap-3 justify-center">
          <button onclick="navigate('contact')" class="btn-primary">${isEn ? "Contact Us" : "Nous Contacter"}</button>
          <a href="https://wa.me/24166198918" target="_blank" class="btn-outline">WhatsApp</a>
        </div>
      </div>
    </div>
  </div>`;
}

// ==================== RÉSEAUX SOCIAUX ====================
function renderSocial() {
  const isEn = state.lang === "en";

  const networks = [
    {
      name: "WhatsApp",
      handle: "+241 66 19 89 18",
      desc: isEn
        ? "Direct chat with our team for quick quotes and questions."
        : "Chat direct avec notre équipe pour devis rapides et questions.",
      url: "https://wa.me/24166198918?text=Bonjour, je souhaite un devis MGN CodeWave",
      color: "#25D366",
      bg: "rgba(37,211,102,0.08)",
      icon: `<svg width="28" height="28" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>`,
      cta: isEn ? "Chat now" : "Écrire maintenant",
      badge: isEn ? "Most responsive" : "Le plus réactif",
    },
    {
      name: "GitHub",
      handle: "ngoubadjambo-richard",
      desc: isEn
        ? "Explore our open-source projects and technical contributions."
        : "Explorez nos projets open-source et contributions techniques.",
      url: "https://github.com/NGOUBADJAMBO-Richard",
      color: "#333",
      bg: "rgba(51,51,51,0.06)",
      icon: `<svg width="28" height="28" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>`,
      cta: isEn ? "View profile" : "Voir le profil",
      badge: isEn ? "Open source" : "Open source",
    },
    {
      name: "LinkedIn",
      handle: "MGN CodeWave",
      desc: isEn
        ? "Follow our professional news and digital transformation insights."
        : "Suivez nos actualités professionnelles et conseils transformation digitale.",
      url: "https://www.linkedin.com/company/mgn-codewave/?viewAsMember=true",
      color: "#0077b5",
      bg: "rgba(0,119,181,0.06)",
      icon: `<svg width="28" height="28" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>`,
      cta: isEn ? "Connect" : "Se connecter",
      badge: isEn ? "Professional network" : "Réseau pro",
    },
    {
      name: "Facebook",
      handle: "MGN CodeWave",
      desc: isEn
        ? "Join our community for web tips, tutorials and special offers."
        : "Rejoignez notre communauté pour conseils web, tutoriels et offres spéciales.",
      url: "https://www.facebook.com/share/17sTu3adZA/",
      color: "#1877f2",
      bg: "rgba(24,119,242,0.06)",
      icon: `<svg width="28" height="28" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>`,
      cta: isEn ? "Follow page" : "Suivre la page",
      badge: isEn ? "Community" : "Communauté",
    },
    {
      name: "Instagram",
      handle: "@mgn.codewave",
      desc: isEn
        ? "Behind the scenes, work in progress and visual portfolio."
        : "Coulisses, travaux en cours et portfolio visuel de nos réalisations.",
      url: " https://www.instagram.com/mgn_codewave?utm_source=qr&igsh=MWNjcTdreTZ6bm4yZQ==",
      color: "#e1306c",
      bg: "rgba(225,48,108,0.06)",
      icon: `<svg width="28" height="28" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>`,
      cta: isEn ? "Follow" : "Suivre",
      badge: isEn ? "Visual portfolio" : "Portfolio visuel",
    },
    {
      name: "Email",
      handle: "mgncodewave18@gmail.com",
      desc: isEn
        ? "For formal requests, quotes and professional partnerships."
        : "Pour demandes formelles, devis et partenariats professionnels.",
      url: "mailto:mgncodewave18@gmail.com",
      color: "#ea580c",
      bg: "rgba(234,88,12,0.06)",
      icon: `<svg width="28" height="28" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>`,
      cta: isEn ? "Send email" : "Envoyer un email",
      badge: isEn ? "Formal requests" : "Demandes formelles",
    },
  ];

  return `
  <div class="page pt-28 pb-16">
    <!-- Header -->
    <div class="relative overflow-hidden mb-14" style="background:linear-gradient(135deg,#0f172a,#1e293b)">
      ${`<div class="wave-bg" style="opacity:0.15">
        <svg width="100%" height="100%" viewBox="0 0 1440 300" preserveAspectRatio="xMidYMid slice">
          <path d="M-100,100 C300,20 600,200 900,100 C1200,20 1400,200 1540,100" fill="none" stroke="#1a56db" stroke-width="2"/>
          <path d="M-100,140 C300,60 600,240 900,140 C1200,60 1400,240 1540,140" fill="none" stroke="#3b82f6" stroke-width="1.5"/>
          <path d="M-100,180 C300,100 600,280 900,180 C1200,100 1400,280 1540,180" fill="none" stroke="#1a56db" stroke-width="1"/>
        </svg>
      </div>`}
      <div class="relative max-w-5xl mx-auto px-4 md:px-8 py-16 text-center">
        <p class="section-label mb-4" style="color:#3b82f6">${isEn ? "Community & Networks" : "Communauté & Réseaux"}</p>
        <h1 class="font-display font-800 leading-tight mb-4 text-white" style="font-size:clamp(2.5rem,5vw,4rem)">${isEn ? "Find us\nEverywhere" : "Retrouvez-nous\nPartout"}</h1>
        <p class="max-w-xl mx-auto" style="color:#94a3b8">${isEn ? "Follow our digital adventure on all platforms and stay connected with the MGN CodeWave community." : "Suivez notre aventure digitale sur toutes les plateformes et restez connecté avec la communauté MGN CodeWave."}</p>
      </div>
    </div>

    <div class="max-w-5xl mx-auto px-4 md:px-8">
      <!-- Networks grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-14">
        ${networks
          .map(
            (n, i) => `
          <a href="${n.url}" target="_blank" rel="noopener noreferrer"
             class="card block p-6 group reveal" style="transition-delay:${i * 70}ms; transition: all 0.25s">
            <div class="flex items-start justify-between mb-5">
              <div class="w-14 h-14 flex items-center justify-center" style="background:${n.bg};color:${n.color}">
                ${n.icon}
              </div>
              <span class="badge" style="background:${n.bg};color:${n.color};font-size:10px">${n.badge}</span>
            </div>
            <h3 class="font-display font-800 text-xl mb-0.5" style="color:var(--fg)">${n.name}</h3>
            <p class="text-sm mb-3 font-600" style="color:${n.color}">${n.handle}</p>
            <p class="text-sm leading-relaxed mb-5" style="color:var(--muted)">${n.desc}</p>
            <div class="flex items-center justify-between pt-4" style="border-top:1px solid var(--border)">
              <span class="text-sm font-display font-700 group-hover:gap-3 transition-all flex items-center gap-2" style="color:${n.color}">
                ${n.cta}
                <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24" class="group-hover:translate-x-1 transition-transform"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </span>
              <div class="w-8 h-8 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity" style="background:${n.color};color:white">
                <svg width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/></svg>
              </div>
            </div>
          </a>
        `,
          )
          .join("")}
      </div>

      <!-- Community CTA banner -->
      <div class="card p-8 md:p-12 text-center reveal" style="background:linear-gradient(135deg,#1a56db08,#8b5cf608);border:1px solid rgba(26,86,219,0.15)">
        <div class="text-4xl mb-4">🇬🇦</div>
        <h2 class="font-display font-800 text-2xl md:text-3xl mb-3" style="color:var(--fg)">${isEn ? "Proud digital ambassador\nof Gabon" : "Ambassadeurs digitaux\nfiers du Gabon"}</h2>
        <p class="max-w-lg mx-auto mb-6" style="color:var(--muted)">${isEn ? "Every share, every follow, every recommendation helps us grow and support more Gabonese businesses in their digital transformation." : "Chaque partage, chaque abonnement, chaque recommandation nous aide à grandir et à accompagner davantage d'entreprises gabonaises dans leur transformation digitale."}</p>
        <div class="flex flex-wrap gap-3 justify-center">
          <a href="https://wa.me/24166198918" target="_blank" class="btn-primary">${isEn ? "Contact us on WhatsApp" : "Nous contacter sur WhatsApp"}</a>
          <button onclick="navigate('contact')" class="btn-outline">${isEn ? "Request a quote" : "Demander un devis"}</button>
        </div>
      </div>
    </div>
  </div>`;
}
