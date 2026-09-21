// Contrôle des données du site : tarifs, cohérence des heures, bilinguisme, anciens tarifs.
// Usage : npm run check:content   (Node.js, aucune dépendance)
// Les montants attendus ci-dessous sont recopiés du cahier des charges (grille §4 et §5) :
// ils servent de référence indépendante des fichiers de données.
"use strict";

const fs = require("fs");
const path = require("path");
const vm = require("vm");

const ROOT = path.resolve(__dirname, "..");
const DATA_FILES = ["assets/js/data/content.js", "assets/js/data/content-formations.js"];

// Les fichiers de données sont des scripts navigateur (déclarations globales) : on les exécute
// ensemble dans un seul contexte, puis on exporte les symboles à vérifier.
function loadData() {
  const code = DATA_FILES.map((f) => fs.readFileSync(path.join(ROOT, f), "utf8")).join("\n;\n");
  const exported = [
    "pricingGrid", "formatXAF", "priceLabel", "translations",
    "mernModules", "formationPaths", "bootcampMern", "professionalWorkshops", "inCompanyOffers",
    "subscriptionPlans", "academyFaq", "academyUI", "formationsCatalog", "formationGroups",
    "composedHours", "mernModulesTotal", "bootcampSavings",
  ];
  const context = vm.createContext({});
  vm.runInContext(`${code}\n;globalThis.__data = { ${exported.join(", ")} };`, context, { filename: "data" });
  return context.__data;
}

const failures = [];
let checks = 0;
function expect(condition, message) {
  checks += 1;
  if (!condition) failures.push(message);
}
function expectEqual(actual, expected, label) {
  expect(actual === expected, `${label} : attendu ${expected}, obtenu ${actual}`);
}

const EXPECTED_SERVICES = {
  "vitrine-essentiel": 90000, "vitrine-pro": 175000, "blog-portfolio": 120000,
  "ecommerce-startup": 250000, "ecommerce-business": 450000, "app-mobile": 600000,
  refonte: 60000, fonctionnalite: 20000, logo: 25000,
  "audit-seo": 45000, "optimisation-seo": 35000, "contenu-seo": 30000,
  "social-starter": 35000, "social-growth": 60000, "social-pro": 90000, emailing: 25000,
  hebergement: 18000, domaine: 12000, maintenance: 12000, "forfait-annuel": 85000,
  "securite-waf": 8000, "audit-performance": 40000,
  consultation: 15000, installation: 20000, workspace: 15000, "support-materiel": 40000,
};
const EXPECTED_MODULES = { M1: [30, 40000], M2: [36, 50000], M3: [48, 70000], M4: [48, 70000], M5: [24, 40000], M6: [30, 45000], M7: [24, 45000] };
const EXPECTED_WORKSHOPS = [[3, 15000], [2, 20000], [6, 25000], [6, 25000], [8, 30000], [15, 30000], [12, 35000], [12, 35000], [10, 40000], [12, 45000], [20, 55000]];
const EXPECTED_SUBSCRIPTIONS = { "pass-etudiant": [5900, 59000], "pass-pro": [14900, 149000], "pass-business": [49000, 490000], "pass-entreprise": [null, null] };

function checkServicePrices(d) {
  const items = d.pricingGrid.flatMap((g) => g.items);
  expectEqual(items.length, 26, "Nombre de prestations (§4)");
  for (const [id, amount] of Object.entries(EXPECTED_SERVICES)) {
    const item = items.find((i) => i.id === id);
    expect(Boolean(item), `Prestation absente : ${id}`);
    if (item) expectEqual(item.amount, amount, `Prix de ${id}`);
  }
}

function checkFormations(d) {
  expectEqual(d.mernModules.length, 7, "Nombre de modules MERN");
  for (const m of d.mernModules) {
    const [hours, amount] = EXPECTED_MODULES[m.code] || [];
    expectEqual(m.hours, hours, `Heures de ${m.code}`);
    expectEqual(m.amount, amount, `Prix de ${m.code}`);
  }
  expectEqual(d.composedHours(d.bootcampMern), 240, "Heures du bootcamp");
  expectEqual(d.mernModulesTotal(), 360000, "Total des 7 modules à l'unité");
  expectEqual(d.bootcampSavings(), 60000, "Économie du bootcamp");

  const opts = Object.fromEntries(d.bootcampMern.pricingOptions.map((o) => [o.id, o]));
  expectEqual(opts.comptant.amount, 300000, "Bootcamp comptant");
  expectEqual(opts.echelonne.installments * opts.echelonne.installmentAmount, 350000, "Bootcamp échelonné (5 × 70 000)");
  expectEqual(opts.lancement.amount, 240000, "Bootcamp lancement");
  expectEqual(opts.reduit.amount, 240000, "Bootcamp tarif réduit");

  const paths = Object.fromEntries(d.formationPaths.map((p) => [p.id, p]));
  expectEqual(d.composedHours(paths["parcours-front"]), 114, "Heures du parcours Front-End");
  expectEqual(d.composedHours(paths["parcours-back"]), 108, "Heures du parcours Back-End");
  for (const p of d.formationPaths) expectEqual(p.amount, 140000, `Prix de ${p.id}`);

  expectEqual(d.professionalWorkshops.length, EXPECTED_WORKSHOPS.length, "Nombre d'ateliers métiers");
  d.professionalWorkshops.forEach((w, i) => {
    const [hours, amount] = EXPECTED_WORKSHOPS[i] || [];
    expectEqual(w.hours, hours, `Heures de ${w.id}`);
    expectEqual(w.amount, amount, `Prix de ${w.id}`);
  });

  expectEqual(d.inCompanyOffers.map((o) => o.amount).join("/"), "90000/160000/", "Tarifs intra-entreprise");

  for (const plan of d.subscriptionPlans) {
    const [monthly, yearly] = EXPECTED_SUBSCRIPTIONS[plan.id] || [];
    expectEqual(plan.monthly, monthly, `Mensuel de ${plan.id}`);
    expectEqual(plan.yearly, yearly, `Annuel de ${plan.id}`);
    if (plan.monthly) expectEqual(plan.yearly, plan.monthly * 10, `Annuel de ${plan.id} = 10 mois (2 mois offerts)`);
  }

  // La FAQ cite les totaux en toutes lettres : ils doivent rester alignés sur les données.
  const faqSavings = d.academyFaq.find((f) => f.q.fr.includes("bootcamp plutôt")).a;
  for (const lang of ["fr", "en"]) {
    const text = faqSavings[lang].replace(/[\s  ,]/g, "");
    expect(text.includes(String(d.mernModulesTotal())), `FAQ bootcamp (${lang}) : total des modules désaligné`);
    expect(text.includes(String(d.bootcampMern.amount)), `FAQ bootcamp (${lang}) : prix du bootcamp désaligné`);
    expect(text.includes(String(d.bootcampSavings())), `FAQ bootcamp (${lang}) : économie désalignée`);
  }

  const ids = d.formationsCatalog.map((f) => f.id);
  expectEqual(new Set(ids).size, ids.length, "Identifiants du catalogue uniques");
  const groups = new Set(d.formationGroups.map((g) => g.id));
  for (const f of d.formationsCatalog) expect(groups.has(f.group), `${f.id} : groupe inconnu ${f.group}`);
}

// Tout objet { fr, en } doit être complet dans les deux langues, avec la même forme.
function checkBilingual(value, where) {
  if (Array.isArray(value)) return value.forEach((v, i) => checkBilingual(v, `${where}[${i}]`));
  if (!value || typeof value !== "object") return;
  if ("fr" in value || "en" in value) {
    const { fr, en } = value;
    expect(fr !== undefined && en !== undefined, `${where} : traduction manquante`);
    if (typeof fr === "string") expect(fr.trim() !== "" && typeof en === "string" && en.trim() !== "", `${where} : texte vide`);
    if (Array.isArray(fr)) expect(Array.isArray(en) && en.length === fr.length, `${where} : listes FR/EN de tailles différentes`);
  }
  for (const [key, child] of Object.entries(value)) checkBilingual(child, `${where}.${key}`);
}

// Critère de recette : aucun ancien tarif dans les pages et scripts du site.
function checkNoOldPrices() {
  const OLD = [/150[\s ,]000/, /350[\s ,]000/, /75[\s ,]000/, /30[\s ,]000 ?(XAF|FCFA)? ?\/ ?(mois|month)/];
  const files = [
    ...fs.readdirSync(ROOT).filter((f) => f.endsWith(".html") && f !== "MGN_CodeWave_Hierarchie.html"),
    ...["data", "pages", "core"].flatMap((dir) =>
      fs.readdirSync(path.join(ROOT, "assets/js", dir)).map((f) => `assets/js/${dir}/${f}`),
    ),
  ];
  for (const file of files) {
    const src = fs.readFileSync(path.join(ROOT, file), "utf8");
    for (const re of OLD) {
      const m = src.match(re);
      // Les fourchettes de salaires (page Carrières) ne sont pas des tarifs.
      if (m && !/K - \d+K FCFA/.test(src.slice(Math.max(0, m.index - 20), m.index + 20))) {
        failures.push(`${file} : ancien tarif possible « ${m[0]} »`);
      }
    }
    checks += OLD.length;
  }
}

function main() {
  const d = loadData();
  checkServicePrices(d);
  checkFormations(d);
  for (const name of ["pricingGrid", "formationGroups", "mernModules", "formationPaths", "bootcampMern", "professionalWorkshops", "inCompanyOffers", "subscriptionPlans", "academyFaq", "academyUI"]) {
    checkBilingual(d[name], name);
  }
  checkNoOldPrices();

  if (failures.length) {
    console.error(`✗ ${failures.length} échec(s) sur ${checks} contrôles :`);
    failures.forEach((f) => console.error(`  - ${f}`));
    process.exit(1);
  }
  console.log(`✓ ${checks} contrôles réussis.`);
}

main();
