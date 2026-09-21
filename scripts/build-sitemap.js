// Génère sitemap.xml : pages du site + une URL par projet du portfolio et par article du blog.
// Usage : npm run build:sitemap   (à relancer après l'ajout d'une page, d'un projet ou d'un article)
"use strict";

const fs = require("fs");
const path = require("path");
const vm = require("vm");

const ROOT = path.resolve(__dirname, "..");
const SITE_URL = "https://ngoubadjambo-richard.github.io/CodeWave/";
const PAGES = [
  "index.html", "services.html", "formations.html", "portfolio.html", "blog.html", "careers.html",
  "about.html", "partnership.html", "contact.html", "social.html", "sitemap.html",
  "legal.html", "privacy.html", "cgv.html",
];
const DETAILS = [
  { file: "assets/js/data/content-portfolio.js", symbol: "portfolioDetails", page: "portfolio.html", param: "projet" },
  { file: "assets/js/data/content-blog.js", symbol: "blogDetails", page: "blog.html", param: "article" },
];

function detailIds({ file, symbol }) {
  const context = vm.createContext({});
  vm.runInContext(`${fs.readFileSync(path.join(ROOT, file), "utf8")}\n;globalThis.__ids = Object.keys(${symbol});`, context);
  return context.__ids;
}

function urlEntry(url) {
  const sep = url.includes("?") ? "&" : "?";
  return [
    "  <url>",
    `    <loc>${url.replace(/&/g, "&amp;")}</loc>`,
    `    <xhtml:link rel="alternate" hreflang="fr" href="${url.replace(/&/g, "&amp;")}" />`,
    `    <xhtml:link rel="alternate" hreflang="en" href="${`${url}${sep}lang=en`.replace(/&/g, "&amp;")}" />`,
    `    <xhtml:link rel="alternate" hreflang="x-default" href="${url.replace(/&/g, "&amp;")}" />`,
    "  </url>",
  ].join("\n");
}

const missing = PAGES.filter((p) => !fs.existsSync(path.join(ROOT, p)));
if (missing.length) throw new Error(`Pages absentes : ${missing.join(", ")}`);

const urls = [
  ...PAGES.map((p) => (p === "index.html" ? SITE_URL : SITE_URL + p)),
  ...DETAILS.flatMap((d) => detailIds(d).map((id) => `${SITE_URL}${d.page}?${d.param}=${id}`)),
];
const xml = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
  ...urls.map(urlEntry),
  "</urlset>",
  "",
].join("\n");

fs.writeFileSync(path.join(ROOT, "sitemap.xml"), xml);
console.log(`sitemap.xml : ${urls.length} URL`);
