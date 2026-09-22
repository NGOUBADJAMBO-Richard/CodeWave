// ==================== FORMATIONS PAGE (CodeWave Academy) ====================
// Chargé uniquement par formations.html, après content-formations.js.

const ACADEMY_WHATSAPP_NUMBER = "24166198918";

function xafLabel(amount, lang, unit) {
  if (amount === null) return lang === "en" ? "On quote" : "Sur devis";
  const suffix = unit ? ` ${PRICE_UNITS[unit][lang]}` : "";
  return `${formatXAF(amount, lang)} XAF${suffix}`;
}

// Message pré-rempli : le client n'a rien à retaper pour demander des informations.
function formationWhatsAppUrl(title, price, lang) {
  const message =
    lang === "en"
      ? `Hello, I would like information about the training "${title}" (${price}).`
      : `Bonjour, je souhaite des informations sur la formation « ${title} » (${price}).`;
  return `https://wa.me/${ACADEMY_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

function formationInfoLink(title, price, lang, extraClass = "") {
  const label = lang === "en" ? "Get information" : "Se renseigner";
  return `<a href="${formationWhatsAppUrl(title, price, lang)}" target="_blank" rel="noopener noreferrer" class="btn-primary justify-center text-sm ${extraClass}" aria-label="${label} : ${title}">${label}</a>`;
}

function formationMeta(item, lang) {
  if (item.hours) return `${item.hours} h`;
  if (item.maxParticipants) return lang === "en" ? `Up to ${item.maxParticipants} people` : `Jusqu'à ${item.maxParticipants} personnes`;
  return lang === "en" ? "Built with you" : "Construit avec vous";
}

function renderFormationCard(item, lang) {
  const unit = item.group === "intra" && item.amount !== null ? "group" : null;
  const price = xafLabel(item.amount, lang, unit);
  const title = item.code ? `${item.code} — ${item.title[lang]}` : item.title[lang];
  return `
          <article class="card p-6 flex flex-col reveal">
            <p class="text-xs uppercase tracking-wider mb-2" style="color:var(--muted)">${formationMeta(item, lang)}</p>
            <h4 class="font-display font-700 text-lg mb-2" style="color:var(--fg)">${title}</h4>
            ${item.summary ? `<p class="text-sm mb-4" style="color:var(--muted)">${item.summary[lang]}</p>` : ""}
            <p class="font-display font-700 text-2xl mt-auto mb-4" style="color:var(--primary-fg)">${price}</p>
            ${formationInfoLink(title, price, lang, "w-full")}
          </article>`;
}

function renderBootcampBlock(lang) {
  const b = bootcampMern;
  const hours = composedHours(b);
  const facts =
    lang === "en"
      ? [`${hours} hours over ${b.weeks} weeks`, `${b.maxLearners} learners maximum`, `${b.practiceShare}% hands-on`, `${b.projectsCount} portfolio projects`, b.schedule.en]
      : [`${hours} heures sur ${b.weeks} semaines`, `${b.maxLearners} apprenants maximum`, `${b.practiceShare} % de pratique`, `${b.projectsCount} projets pour votre portfolio`, b.schedule.fr];
  const optionPrice = (o) =>
    o.installments ? `${o.installments} × ${formatXAF(o.installmentAmount, lang)} XAF` : xafLabel(o.amount, lang);

  return `
    <section class="card p-6 md:p-10 mb-16 reveal" style="border-top:3px solid var(--primary)" aria-labelledby="bootcamp-title">
      <div class="grid lg:grid-cols-2 gap-10">
        <div>
          <p class="section-label mb-3">${lang === "en" ? "Flagship programme" : "Formation phare"}</p>
          <h2 id="bootcamp-title" class="font-display font-700 leading-tight mb-4" style="font-size:clamp(1.8rem,3.5vw,2.6rem); color:var(--fg)">${b.title[lang]}</h2>
          <p class="mb-6" style="color:var(--muted)">${b.summary[lang]}</p>
          <ul class="space-y-2 mb-6">
            ${facts.map((f) => `<li class="flex items-center gap-2 text-sm" style="color:var(--fg)"><span aria-hidden="true" style="color:var(--primary-fg)">✓</span>${f}</li>`).join("")}
          </ul>
          <p class="text-sm" style="color:var(--muted)">${b.modules.map((id) => getMernModule(id).title[lang]).join(" · ")}</p>
        </div>
        <div>
          <h3 class="font-display font-700 text-lg mb-4" style="color:var(--fg)">${lang === "en" ? "Pricing" : "Tarifs"}</h3>
          <ul class="space-y-3 mb-6">
            ${b.pricingOptions
              .map(
                (o) => `
            <li class="flex items-center justify-between gap-4 p-4" style="border:${o.highlight ? "2px solid var(--primary)" : "1px solid var(--border)"}">
              <span class="text-sm" style="color:var(--fg)">${o.label[lang]}</span>
              <span class="font-display font-700 text-lg" style="color:var(--primary-fg);white-space:nowrap">${optionPrice(o)}</span>
            </li>`,
              )
              .join("")}
          </ul>
          ${formationInfoLink(b.title[lang], xafLabel(b.amount, lang), lang, "w-full")}
        </div>
      </div>
    </section>`;
}

function renderCatalogGroups(lang) {
  const savingsNote =
    lang === "en"
      ? `All 7 modules separately: ${xafLabel(mernModulesTotal(), lang)}. The bootcamp saves you ${xafLabel(bootcampSavings(), lang)}.`
      : `Les 7 modules à l'unité : ${xafLabel(mernModulesTotal(), lang)}. Le bootcamp vous fait économiser ${xafLabel(bootcampSavings(), lang)}.`;
  return formationGroups
    .map((group) => {
      const items = formationsCatalog.filter((f) => f.group === group.id);
      return `
      <section class="mb-14" aria-labelledby="group-${group.id}">
        <h3 id="group-${group.id}" class="font-display font-700 text-xl mb-2" style="color:var(--fg)">${group.title[lang]}</h3>
        ${group.id === "mern" ? `<p class="text-sm mb-6" style="color:var(--muted)">${savingsNote}</p>` : '<div class="mb-6"></div>'}
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          ${items.map((item) => renderFormationCard(item, lang)).join("")}
        </div>
      </section>`;
    })
    .join("");
}

function renderSubscriptions(lang) {
  return `
    <section class="mb-16" aria-labelledby="subscriptions-title">
      ${sectionHead({
        index: "02",
        label: lang === "en" ? "Subscriptions" : "Abonnements",
        title: lang === "en" ? "Learn at your own pace" : "Apprenez à votre rythme",
        id: "subscriptions-title",
      })}
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        ${subscriptionPlans
          .map((plan) => {
            const monthly = xafLabel(plan.monthly, lang, plan.monthly === null ? null : "month");
            return `
        <article class="card p-6 flex flex-col reveal ${plan.highlight ? "pricing-highlight" : ""}" data-badge="${lang === "en" ? "POPULAR" : "POPULAIRE"}">
          <h3 class="font-display font-700 text-lg mb-2" style="color:var(--fg)">${plan.title[lang]}</h3>
          <p class="text-sm mb-4" style="color:var(--muted)">${plan.summary[lang]}</p>
          <p class="font-display font-700 text-2xl mt-auto" style="color:var(--primary-fg)">${monthly}</p>
          <p class="text-xs mb-4" style="color:var(--muted)">${plan.yearly ? `${lang === "en" ? "or" : "ou"} ${xafLabel(plan.yearly, lang, "year")}` : "&nbsp;"}</p>
          ${formationInfoLink(plan.title[lang], monthly, lang, "w-full")}
        </article>`;
          })
          .join("")}
      </div>
      <ul class="grid md:grid-cols-2 gap-2 mt-8">
        ${academyUI.offers[lang].map((o) => `<li class="flex items-center gap-2 text-sm" style="color:var(--muted)"><span aria-hidden="true" style="color:var(--primary-fg)">•</span>${o}</li>`).join("")}
      </ul>
    </section>`;
}

function renderAcademyFaq(lang) {
  return `
    <section class="mb-16" aria-labelledby="faq-title">
      ${sectionHead({
        index: "03",
        label: "FAQ",
        title: lang === "en" ? "Frequently asked questions" : "Questions fréquentes",
        id: "faq-title",
      })}
      <div class="space-y-3">
        ${academyFaq
          .map(
            (item) => `
        <details class="card p-5">
          <summary class="font-display font-700 cursor-pointer" style="color:var(--fg)">${item.q[lang]}</summary>
          <p class="text-sm mt-3" style="color:var(--muted)">${item.a[lang]}</p>
        </details>`,
          )
          .join("")}
      </div>
    </section>`;
}

function renderFormations() {
  const lang = state.lang;
  const generalMessage =
    lang === "en" ? "Hello, I would like information about CodeWave Academy training." : "Bonjour, je souhaite des informations sur les formations CodeWave Academy.";
  const generalInfoUrl = `https://wa.me/${ACADEMY_WHATSAPP_NUMBER}?text=${encodeURIComponent(generalMessage)}`;
  return `
  <div class="page pb-16">
    ${renderPageHero({ label: academyUI.label[lang], title: academyUI.title[lang], sub: academyUI.sub[lang], path: "academy", facts: [
      [String(formationsCatalog.length), lang === "en" ? "courses and workshops" : "formations et ateliers"],
      [String(bootcampMern.maxLearners), lang === "en" ? "learners max per bootcamp" : "apprenants max par bootcamp"],
      [`${bootcampMern.practiceShare} %`, lang === "en" ? "hands-on practice" : "de pratique"],
    ], actions: `<a href="#catalogue" class="btn-primary">${lang === "en" ? "See the courses" : "Voir les formations"}</a>
          ${ACADEMY_PLATFORM_URL ? `<a href="${ACADEMY_PLATFORM_URL}" target="_blank" rel="noopener noreferrer" class="btn-outline">${lang === "en" ? "Go to the platform" : "Accéder à la plateforme"}</a>` : `<a href="${generalInfoUrl}" target="_blank" rel="noopener noreferrer" class="btn-outline">${lang === "en" ? "Ask on WhatsApp" : "Poser une question sur WhatsApp"}</a>`}` })}

    <div class="max-w-6xl mx-auto px-4 md:px-8">
      ${renderBootcampBlock(lang)}

      <div id="catalogue" style="scroll-margin-top:6rem">
        ${sectionHead({
          index: "01",
          label: "Catalogue",
          title: lang === "en" ? "All our courses\nand prices" : "Toutes nos formations\net leurs prix",
          lead: lang === "en" ? "Modules, learning paths, workshops and in-company training, each with its public price." : "Modules, parcours, ateliers et formations en entreprise, chacun avec son prix affiché.",
        })}
        ${renderCatalogGroups(lang)}
      </div>

      ${renderSubscriptions(lang)}
      ${renderAcademyFaq(lang)}
    </div>
  </div>`;
}
