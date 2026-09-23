// Génère le catalogue officiel « Services & Tarifs » au format .docx (Word).
//
// Le document est construit à partir des mêmes données que le site (pricingGrid, serviceOffers,
// formations) : un prix changé dans assets/js/data se répercute ici sans ressaisie.
//
//   node scripts/build-brochure.js [dossier de sortie]
//
// Aucune dépendance : le .docx est une archive ZIP de fichiers XML, écrite ici même
// (voir la fonction zip plus bas).
const fs = require("fs");
const path = require("path");
const vm = require("vm");
const zlib = require("zlib");

const ROOT = path.join(__dirname, "..");
const OUT_DIR = process.argv[2] || path.join(ROOT, "docs");
const OUT_FILE = path.join(OUT_DIR, "MGN-CodeWave-Services-et-Tarifs.docx");
const LANG = "fr";

// ---------- Données du site ----------
const context = vm.createContext({});
for (const file of ["assets/js/data/content.js", "assets/js/data/content-offers.js", "assets/js/data/content-formations.js"]) {
  vm.runInContext(fs.readFileSync(path.join(ROOT, file), "utf8"), context, { filename: file });
}
// Les `const` des fichiers de données restent dans la portée du script vm : on les expose explicitement.
vm.runInContext(
  "globalThis.__data = { pricingGrid, priceLabel, findPrice, translations, serviceOffers, bootcampMern, formationsCatalog, subscriptionPlans };",
  context,
);
const { pricingGrid, priceLabel, findPrice, translations, serviceOffers, bootcampMern, formationsCatalog, subscriptionPlans } = context.__data;
const services = translations[LANG].services.items;

// ---------- Briques OOXML ----------
const esc = (s) =>
  String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/ /g, " ");

const p = (text, { style = "", bold = false, size = null, color = null, align = null, spaceBefore = 0, spaceAfter = 120 } = {}) => {
  const rpr = [bold ? "<w:b/>" : "", size ? `<w:sz w:val="${size}"/><w:szCs w:val="${size}"/>` : "", color ? `<w:color w:val="${color}"/>` : ""].join("");
  return `<w:p><w:pPr>${style ? `<w:pStyle w:val="${style}"/>` : ""}${align ? `<w:jc w:val="${align}"/>` : ""}<w:spacing w:before="${spaceBefore}" w:after="${spaceAfter}"/>${rpr ? `<w:rPr>${rpr}</w:rPr>` : ""}</w:pPr><w:r>${rpr ? `<w:rPr>${rpr}</w:rPr>` : ""}<w:t xml:space="preserve">${esc(text)}</w:t></w:r></w:p>`;
};

const bullet = (text) =>
  `<w:p><w:pPr><w:pStyle w:val="Puce"/><w:numPr><w:ilvl w:val="0"/><w:numId w:val="1"/></w:numPr><w:spacing w:after="60"/></w:pPr><w:r><w:t xml:space="preserve">${esc(text)}</w:t></w:r></w:p>`;

const cell = (text, { bold = false, width = 4500, fill = null, align = null } = {}) =>
  `<w:tc><w:tcPr><w:tcW w:w="${width}" w:type="dxa"/>${fill ? `<w:shd w:val="clear" w:fill="${fill}"/>` : ""}<w:vAlign w:val="center"/></w:tcPr>` +
  `<w:p><w:pPr><w:spacing w:before="60" w:after="60"/>${align ? `<w:jc w:val="${align}"/>` : ""}${bold ? "<w:rPr><w:b/></w:rPr>" : ""}</w:pPr>` +
  `<w:r>${bold ? "<w:rPr><w:b/></w:rPr>" : ""}<w:t xml:space="preserve">${esc(text)}</w:t></w:r></w:p></w:tc>`;

const table = (rows, { widths = [6200, 2800], head = true } = {}) => {
  const body = rows
    .map((cells, i) => {
      const isHead = head && i === 0;
      return `<w:tr>${cells
        .map((text, j) => cell(text, { bold: isHead, width: widths[j] ?? widths[widths.length - 1], fill: isHead ? "004AAD" : i % 2 ? "F1F5F9" : null, align: j > 0 ? "right" : null }))
        .join("")}</w:tr>`;
    })
    .join("");
  return `<w:tbl><w:tblPr><w:tblStyle w:val="Grille"/><w:tblW w:w="9000" w:type="dxa"/><w:tblBorders>${["top", "left", "bottom", "right", "insideH", "insideV"]
    .map((side) => `<w:${side} w:val="single" w:sz="4" w:space="0" w:color="CBD5E1"/>`)
    .join("")}</w:tblBorders></w:tblPr>${body}</w:tbl>${p("", { spaceAfter: 160 })}`;
};

const pageBreak = () => `<w:p><w:r><w:br w:type="page"/></w:r></w:p>`;

// En-tête de couleur pour les titres blancs sur fond bleu (couverture).
const coverBand = (title, subtitle) =>
  `<w:tbl><w:tblPr><w:tblW w:w="9000" w:type="dxa"/><w:tblBorders>${["top", "left", "bottom", "right"]
    .map((s) => `<w:${s} w:val="none" w:sz="0" w:space="0" w:color="auto"/>`)
    .join("")}</w:tblBorders></w:tblPr><w:tr><w:tc><w:tcPr><w:tcW w:w="9000" w:type="dxa"/><w:shd w:val="clear" w:fill="0B1220"/></w:tcPr>` +
  `<w:p><w:pPr><w:spacing w:before="480" w:after="120"/></w:pPr><w:r><w:rPr><w:b/><w:color w:val="FFFFFF"/><w:sz w:val="52"/></w:rPr><w:t xml:space="preserve">${esc(title)}</w:t></w:r></w:p>` +
  `<w:p><w:pPr><w:spacing w:after="520"/></w:pPr><w:r><w:rPr><w:color w:val="93C5FD"/><w:sz w:val="24"/></w:rPr><w:t xml:space="preserve">${esc(subtitle)}</w:t></w:r></w:p>` +
  `</w:tc></w:tr></w:tbl>${p("", { spaceAfter: 240 })}`;

// ---------- Contenu ----------
const today = new Date().toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
const parts = [];

// Couverture
parts.push(coverBand("M.G.N CodeWave", "Catalogue des services, descriptions et tarifs"));
parts.push(p("Studio digital — Libreville, Gabon", { bold: true, size: 26 }));
parts.push(p(`Document commercial · mis à jour le ${today}`, { color: "64748B" }));
parts.push(p("Sites web, e-commerce, référencement, maintenance, réseaux sociaux et formations.", { spaceBefore: 120 }));
parts.push(
  table(
    [
      ["Contact", ""],
      ["Téléphone / WhatsApp", "+241 66 19 89 18"],
      ["Email", "mgncodewave18@gmail.com"],
      ["Site web", "ngoubadjambo-richard.github.io/CodeWave/"],
      ["Adresse", "Libreville, Gabon"],
      ["Paiement accepté", "Airtel Money, Moov Money, virement, espèces"],
    ],
    { widths: [3600, 5400] },
  ),
);
parts.push(p("Tous les prix sont exprimés en francs CFA (XAF), hors taxes éventuelles. Ils sont indicatifs : le montant définitif figure sur le devis, établi gratuitement après analyse du besoin.", { color: "64748B" }));
parts.push(pageBreak());

// 1. L'entreprise
parts.push(p("1. L'entreprise", { style: "Titre1" }));
parts.push(p("M.G.N CodeWave est un studio digital basé à Libreville. Nous accompagnons les PME, commerces, associations et entrepreneurs gabonais qui veulent une présence en ligne qui travaille pour eux : être trouvé sur Google, présenter son offre clairement, vendre, et garder un site qui tient dans la durée."));
parts.push(p("Notre parti pris : des sites rapides, pensés d'abord pour le mobile et les connexions lentes, des prix annoncés par écrit avant de commencer, et un interlocuteur joignable sur WhatsApp."));
parts.push(p("Ce que nous faisons", { style: "Titre2" }));
for (const s of services) parts.push(bullet(`${s.title} — ${s.desc}`));
parts.push(bullet("Formations au développement web et au numérique (CodeWave Academy)."));

// 2. Méthode
parts.push(p("2. Notre méthode de travail", { style: "Titre1" }));
const steps = translations[LANG].hero.process.steps;
parts.push(
  table(
    [["Étape", "Ce qui se passe"], ...steps.map((step, i) => [`${i + 1}. ${step.title}`, step.desc])],
    { widths: [2600, 6400] },
  ),
);
parts.push(p("Chaque étape est validée par le client avant de passer à la suivante. Aucun développement ne commence avant l'accord sur la maquette."));

// 3. Offres détaillées
parts.push(pageBreak());
parts.push(p("3. Nos offres en détail", { style: "Titre1" }));
for (const offer of serviceOffers) {
  const item = services.find((s) => s.offerId === offer.id);
  parts.push(p(item.title, { style: "Titre2" }));
  parts.push(p(offer.promise[LANG], { bold: true }));
  parts.push(p(`Pour qui : ${offer.audience[LANG]}`));
  parts.push(p("Ce que le client y gagne", { style: "Titre3" }));
  for (const b of offer.benefits[LANG]) parts.push(bullet(b));
  parts.push(p("Ce qui est livré", { style: "Titre3" }));
  for (const d of offer.deliverables[LANG]) parts.push(bullet(d));
  parts.push(
    table(
      [
        ["Repère", "Engagement"],
        ["Délai indicatif", offer.timeline[LANG]],
        ["Garantie", "30 jours après la livraison"],
        ["Paiement", "En 1, 2 ou 3 fois selon le montant — Mobile Money accepté"],
      ],
      { widths: [2600, 6400] },
    ),
  );
  parts.push(p("Tarifs de l'offre", { style: "Titre3" }));
  parts.push(
    table(
      [["Prestation", "Tarif"], ...offer.priceIds.map((id) => [findPrice(id).label[LANG], priceLabel(id, LANG)])],
      { widths: [6200, 2800] },
    ),
  );
}

// 4. Grille complète
parts.push(pageBreak());
parts.push(p("4. Grille tarifaire complète", { style: "Titre1" }));
parts.push(p("L'ensemble des prestations proposées, par famille. Les mentions « Dès » indiquent un tarif de départ, précisé après analyse du besoin."));
for (const group of pricingGrid) {
  parts.push(p(group.title[LANG], { style: "Titre2" }));
  parts.push(
    table(
      [["Prestation", "Tarif"], ...group.items.map((item) => [item.label[LANG], priceLabel(item.id, LANG)])],
      { widths: [6200, 2800] },
    ),
  );
}

// 5. Formations
parts.push(pageBreak());
parts.push(p("5. CodeWave Academy — formations", { style: "Titre1" }));
parts.push(
  p(
    `Formations pratiques au développement web et au numérique. Le bootcamp FullStack MERN dure ${bootcampMern.weeks} semaines, en groupe de ${bootcampMern.maxLearners} apprenants maximum, avec ${bootcampMern.practiceShare} % de pratique et ${bootcampMern.projectsCount} projets pour le portfolio.`,
  ),
);
const xaf = (amount) => (amount === null ? "Sur devis" : `${String(amount).replace(/\B(?=(\d{3})+(?!\d))/g, " ")} XAF`);
parts.push(p("Catalogue", { style: "Titre2" }));
parts.push(
  table(
    [["Formation", "Tarif"], ...formationsCatalog.map((f) => [f.code ? `${f.code} — ${f.title[LANG]}` : f.title[LANG], xaf(f.amount)])],
    { widths: [6200, 2800] },
  ),
);
if (Array.isArray(subscriptionPlans) && subscriptionPlans.length) {
  parts.push(p("Abonnements", { style: "Titre2" }));
  parts.push(
    table(
      [["Formule", "Tarif mensuel"], ...subscriptionPlans.map((s) => [s.title[LANG], xaf(s.amount)])],
      { widths: [6200, 2800] },
    ),
  );
}

// 6. Conditions commerciales
parts.push(pageBreak());
parts.push(p("6. Conditions commerciales", { style: "Titre1" }));
parts.push(p("Devis et commande", { style: "Titre2" }));
parts.push(bullet("Tout devis est gratuit, sans engagement, et valable 30 jours à compter de son émission."));
parts.push(bullet("La commande devient ferme à la signature du devis, à la réception de l'acompte et à la fourniture des éléments nécessaires (textes, images, logos)."));
parts.push(p("Paiement", { style: "Titre2" }));
parts.push(bullet("En une fois : 100 % à la commande."));
parts.push(bullet("En deux fois : 50 % à la commande, 50 % à la livraison."));
parts.push(bullet("En trois fois : pour les projets à partir de 120 000 XAF (33 / 33 / 34 %)."));
parts.push(bullet("Moyens acceptés : virement bancaire, Airtel Money, Moov Money, espèces à Libreville."));
parts.push(bullet("Tout retard de paiement entraîne la suspension des travaux ; pénalités de 10 % du montant dû après relance sans réponse."));
parts.push(p("Délais indicatifs", { style: "Titre2" }));
parts.push(
  table(
    [
      ["Type de projet", "Délai"],
      ["Site vitrine Basic", "1 à 2 semaines"],
      ["Site vitrine Pro", "2 à 3 semaines"],
      ["E-commerce Starter", "3 à 5 semaines"],
      ["E-commerce Business", "5 à 8 semaines"],
      ["Application sur mesure", "Sur devis"],
    ],
    { widths: [6200, 2800] },
  ),
);
parts.push(p("Les délais courent à compter de la réception de l'acompte et de l'ensemble des contenus."));
parts.push(p("Garantie et maintenance", { style: "Titre2" }));
parts.push(bullet("Garantie de 30 jours après la livraison : correction des anomalies sans frais."));
parts.push(bullet(`Au-delà, contrat de maintenance mensuel à ${priceLabel("maintenance", LANG)} : mises à jour techniques, sauvegardes, support prioritaire et corrections de bugs.`));
parts.push(p("Propriété et confidentialité", { style: "Titre2" }));
parts.push(bullet("Le client devient propriétaire du site livré après règlement intégral."));
parts.push(bullet("Les informations transmises par le client restent confidentielles."));

// 7. Contact
parts.push(p("7. Parler de votre projet", { style: "Titre1" }));
parts.push(p("Décrivez votre besoin par WhatsApp au +241 66 19 89 18, par email à mgncodewave18@gmail.com, ou via la fiche devis du site. Réponse sous 24 heures, devis détaillé par écrit."));
parts.push(p("M.G.N CodeWave — Libreville, Gabon", { bold: true, spaceBefore: 240 }));

// ---------- Assemblage du .docx ----------
const documentXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"><w:body>${parts.join("")}
<w:sectPr><w:pgSz w:w="11906" w:h="16838"/><w:pgMar w:top="1134" w:right="1134" w:bottom="1134" w:left="1134" w:header="709" w:footer="709" w:gutter="0"/></w:sectPr></w:body></w:document>`;

const style = (id, name, { size, color, bold = true, before = 320, after = 120, outline = null }) =>
  `<w:style w:type="paragraph" w:styleId="${id}"><w:name w:val="${name}"/><w:basedOn w:val="Normal"/><w:qFormat/>` +
  `<w:pPr><w:spacing w:before="${before}" w:after="${after}"/>${outline !== null ? `<w:outlineLvl w:val="${outline}"/>` : ""}<w:keepNext/></w:pPr>` +
  `<w:rPr>${bold ? "<w:b/>" : ""}<w:color w:val="${color}"/><w:sz w:val="${size}"/><w:szCs w:val="${size}"/></w:rPr></w:style>`;

const stylesXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:styles xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
<w:docDefaults><w:rPrDefault><w:rPr><w:rFonts w:ascii="Calibri" w:hAnsi="Calibri" w:cs="Calibri"/><w:sz w:val="22"/><w:szCs w:val="22"/><w:color w:val="1E293B"/></w:rPr></w:rPrDefault>
<w:pPrDefault><w:pPr><w:spacing w:after="120" w:line="276" w:lineRule="auto"/></w:pPr></w:pPrDefault></w:docDefaults>
<w:style w:type="paragraph" w:styleId="Normal" w:default="1"><w:name w:val="Normal"/><w:qFormat/></w:style>
${style("Titre1", "heading 1", { size: 36, color: "004AAD", outline: 0, before: 400 })}
${style("Titre2", "heading 2", { size: 28, color: "0B1220", outline: 1 })}
${style("Titre3", "heading 3", { size: 24, color: "0062E6", outline: 2, before: 240, after: 80 })}
<w:style w:type="paragraph" w:styleId="Puce"><w:name w:val="Puce"/><w:basedOn w:val="Normal"/><w:pPr><w:spacing w:after="60"/><w:ind w:left="360" w:hanging="360"/></w:pPr></w:style>
<w:style w:type="table" w:styleId="Grille"><w:name w:val="Table Grid"/><w:tblPr><w:tblCellMar><w:top w:w="80" w:type="dxa"/><w:left w:w="120" w:type="dxa"/><w:bottom w:w="80" w:type="dxa"/><w:right w:w="120" w:type="dxa"/></w:tblCellMar></w:tblPr></w:style>
</w:styles>`;

const numberingXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:numbering xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
<w:abstractNum w:abstractNumId="0"><w:lvl w:ilvl="0"><w:start w:val="1"/><w:numFmt w:val="bullet"/><w:lvlText w:val="•"/><w:lvlJc w:val="left"/><w:pPr><w:ind w:left="360" w:hanging="360"/></w:pPr><w:rPr><w:color w:val="004AAD"/></w:rPr></w:lvl></w:abstractNum>
<w:num w:numId="1"><w:abstractNumId w:val="0"/></w:num></w:numbering>`;

const contentTypes = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
<Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
<Default Extension="xml" ContentType="application/xml"/>
<Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/>
<Override PartName="/word/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml"/>
<Override PartName="/word/numbering.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.numbering+xml"/>
<Override PartName="/docProps/core.xml" ContentType="application/vnd.openxmlformats-package.core-properties+xml"/>
</Types>`;

const rels = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/>
<Relationship Id="rId2" Type="http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties" Target="docProps/core.xml"/>
</Relationships>`;

const documentRels = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/>
<Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/numbering" Target="numbering.xml"/>
</Relationships>`;

const coreXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<cp:coreProperties xmlns:cp="http://schemas.openxmlformats.org/package/2006/metadata/core-properties" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:dcterms="http://purl.org/dc/terms/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
<dc:title>M.G.N CodeWave — Services et tarifs</dc:title><dc:creator>M.G.N CodeWave</dc:creator><cp:lastModifiedBy>M.G.N CodeWave</cp:lastModifiedBy>
<dcterms:created xsi:type="dcterms:W3CDTF">${new Date().toISOString().replace(/\.\d+Z$/, "Z")}</dcterms:created></cp:coreProperties>`;

// Écriture du ZIP (format .docx) : Compress-Archive de Windows PowerShell 5.1 écrit les chemins
// avec des barres obliques inverses, que le format ZIP interdit et que Word refuse. On écrit donc
// l'archive ici, en deflate brut via zlib.
const CRC_TABLE = (() => {
  const table = new Int32Array(256);
  for (let i = 0; i < 256; i++) {
    let c = i;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    table[i] = c;
  }
  return table;
})();

function crc32(buffer) {
  let crc = -1;
  for (const byte of buffer) crc = CRC_TABLE[(crc ^ byte) & 0xff] ^ (crc >>> 8);
  return (crc ^ -1) >>> 0;
}

function zip(entries) {
  const locals = [];
  const central = [];
  let offset = 0;
  for (const [name, content] of entries) {
    const data = Buffer.from(content, "utf8");
    const deflated = zlib.deflateRawSync(data, { level: 9 });
    const nameBuf = Buffer.from(name, "utf8");
    const crc = crc32(data);

    const local = Buffer.alloc(30);
    local.writeUInt32LE(0x04034b50, 0);
    local.writeUInt16LE(20, 4); // version minimale
    local.writeUInt16LE(0x0800, 6); // noms de fichiers en UTF-8
    local.writeUInt16LE(8, 8); // méthode deflate
    local.writeUInt32LE(crc, 14);
    local.writeUInt32LE(deflated.length, 18);
    local.writeUInt32LE(data.length, 22);
    local.writeUInt16LE(nameBuf.length, 26);
    locals.push(local, nameBuf, deflated);

    const dir = Buffer.alloc(46);
    dir.writeUInt32LE(0x02014b50, 0);
    dir.writeUInt16LE(20, 4);
    dir.writeUInt16LE(20, 6);
    dir.writeUInt16LE(0x0800, 8);
    dir.writeUInt16LE(8, 10);
    dir.writeUInt32LE(crc, 16);
    dir.writeUInt32LE(deflated.length, 20);
    dir.writeUInt32LE(data.length, 24);
    dir.writeUInt16LE(nameBuf.length, 28);
    dir.writeUInt32LE(offset, 42);
    central.push(dir, nameBuf);

    offset += 30 + nameBuf.length + deflated.length;
  }
  const centralBuf = Buffer.concat(central);
  const end = Buffer.alloc(22);
  end.writeUInt32LE(0x06054b50, 0);
  end.writeUInt16LE(entries.length, 8);
  end.writeUInt16LE(entries.length, 10);
  end.writeUInt32LE(centralBuf.length, 12);
  end.writeUInt32LE(offset, 16);
  return Buffer.concat([...locals, centralBuf, end]);
}

fs.mkdirSync(OUT_DIR, { recursive: true });
fs.writeFileSync(
  OUT_FILE,
  zip([
    ["[Content_Types].xml", contentTypes],
    ["_rels/.rels", rels],
    ["docProps/core.xml", coreXml],
    ["word/document.xml", documentXml],
    ["word/styles.xml", stylesXml],
    ["word/numbering.xml", numberingXml],
    ["word/_rels/document.xml.rels", documentRels],
  ]),
);

const kb = (fs.statSync(OUT_FILE).size / 1024).toFixed(1);
console.log(`Document écrit : ${OUT_FILE} (${kb} Ko)`);
