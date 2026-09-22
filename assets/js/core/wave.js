// ==================== SVG WAVE BG ====================
// Les ondes sont l'ADN visuel de la charte. Deux couches dérivent lentement en sens opposés
// (animation CSS .wave-drift, coupée si l'utilisateur réduit les animations).
// `color` : trait des ondes ("#004AAD" sur fond clair, "white" sur fond bleu ou sombre).
function waveSVG(color = "#004AAD") {
  return `<div class="wave-bg" aria-hidden="true">
    <svg width="100%" height="100%" viewBox="0 0 1440 600" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
      <g class="wave-drift" fill="none" stroke="${color}">
        <path d="M-200,200 C200,50 400,350 700,200 C1000,50 1200,350 1640,200" stroke-width="1.5"/>
        <path d="M-200,300 C200,150 400,450 700,300 C1000,150 1200,450 1640,300" stroke-width="1"/>
        <path d="M-200,400 C200,250 400,550 700,400 C1000,250 1200,550 1640,400" stroke-width="0.6"/>
      </g>
      <g class="wave-drift wave-drift-reverse" fill="none" stroke="${color}">
        <path d="M-200,250 C200,100 400,400 700,250 C1000,100 1200,400 1640,250" stroke-width="1"/>
        <path d="M-200,350 C200,200 400,500 700,350 C1000,200 1200,500 1640,350" stroke-width="0.8"/>
        <path d="M-200,150 C300,0 500,400 800,150 C1100,0 1300,400 1740,150" stroke-width="0.5"/>
      </g>
    </svg>
  </div>`;
}

// Titre dont la dernière ligne (ou, sur une seule ligne, le dernier mot) passe en dégradé de marque.
function accentTitle(title) {
  const multiline = title.includes("\n");
  const parts = multiline ? title.split("\n") : title.split(" ");
  const accent = parts.pop();
  // Chaque mot est animé ; le dégradé est porté par chaque mot (un parent en background-clip:text
  // ne peindrait pas correctement des enfants transformés).
  let index = 0;
  const leadHtml = parts
    .map((line) => {
      const html = wordSpans(line, index);
      index += line.split(" ").filter(Boolean).length;
      return html;
    })
    .join(multiline ? "<br>" : " ");
  const separator = parts.length ? (multiline ? "<br>" : " ") : "";
  return `${leadHtml}${separator}${wordSpans(accent, index, "text-gradient")}`;
}

// En-tête des pages intérieures : ondes, halo, titre mis en valeur, onde de transition vers le contenu.
function renderPageHero({ label, title, sub, center = false, actions = "" }) {
  return `
    <section class="page-hero relative overflow-hidden pt-32 pb-24 mb-12">
      <canvas class="wave-field" aria-hidden="true"></canvas>
      <div class="hero-glow" aria-hidden="true"></div>
      <div class="relative max-w-6xl mx-auto px-4 md:px-8 ${center ? "text-center" : ""}">
        <p class="section-label mb-4">${label}</p>
        <h1 class="font-display font-700 leading-tight mb-5" style="font-size:clamp(2.5rem,5vw,4rem); color:var(--fg)">${accentTitle(title)}</h1>
        <p class="max-w-xl text-base md:text-lg ${center ? "mx-auto" : ""}" style="color:var(--muted)">${sub}</p>
        ${actions ? `<div class="flex flex-wrap gap-3 mt-8 ${center ? "justify-center" : ""}">${actions}</div>` : ""}
      </div>
    </section>`;
}

// ==================== CHAMP D'ONDES INTERACTIF (canvas) ====================
// Lignes ondulantes dessinées en direct ; le pointeur soulève la surface localement.
// Économe : densité réduite sur mobile, DPR plafonné, pause hors écran / onglet masqué,
// désactivé si l'utilisateur réduit les animations (le fond statique reste visible).
let activeWaveField = null;

function mountWaveField() {
  if (activeWaveField) {
    activeWaveField.stop();
    activeWaveField = null;
  }
  const canvas = document.querySelector("canvas.wave-field");
  if (!canvas || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  activeWaveField = createWaveField(canvas, ctx);
}

function createWaveField(canvas, ctx) {
  const LINE_COUNT = window.innerWidth < 768 ? 12 : 24;
  const STEP_PX = window.innerWidth < 768 ? 20 : 14;
  const POINTER_RADIUS = 160;
  const POINTER_LIFT = 38;
  const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
  const pointer = { x: 0, y: 0, strength: 0, target: 0 };
  let width = 0;
  let height = 0;
  let time = 0;
  let last = performance.now();
  let frame = 0;
  let onScreen = true;

  function resize() {
    const rect = canvas.getBoundingClientRect();
    width = rect.width;
    height = rect.height;
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function draw() {
    const dark = document.documentElement.classList.contains("dark");
    const rgb = dark ? "96,165,250" : "0,74,173";
    ctx.clearRect(0, 0, width, height);
    pointer.strength += (pointer.target - pointer.strength) * 0.08;
    const radius2 = 2 * POINTER_RADIUS * POINTER_RADIUS;
    for (let i = 0; i < LINE_COUNT; i++) {
      const base = height * (0.08 + (0.84 * i) / (LINE_COUNT - 1));
      const amplitude = 14 + 10 * Math.sin(i * 0.7);
      // Lignes centrales plus marquées, bords plus discrets.
      const alpha = 0.05 + 0.16 * Math.sin((Math.PI * i) / (LINE_COUNT - 1));
      ctx.beginPath();
      for (let x = -STEP_PX; x <= width + STEP_PX; x += STEP_PX) {
        let y =
          base +
          Math.sin(x * 0.0042 + time * 1.3 + i * 0.35) * amplitude +
          Math.sin(x * 0.0016 - time * 0.8 + i * 0.9) * amplitude * 0.7;
        if (pointer.strength > 0.01) {
          const dx = x - pointer.x;
          const dy = y - pointer.y;
          y -= pointer.strength * POINTER_LIFT * Math.exp(-(dx * dx + dy * dy) / radius2);
        }
        if (x === -STEP_PX) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.strokeStyle = `rgba(${rgb},${alpha.toFixed(3)})`;
      ctx.lineWidth = 1.1;
      ctx.stroke();
    }
  }

  function tick(now) {
    frame = 0;
    time += Math.min(now - last, 50) * 0.00035;
    last = now;
    draw();
    schedule();
  }

  function schedule() {
    if (!frame && onScreen && !document.hidden) frame = requestAnimationFrame(tick);
  }

  function onPointerMove(event) {
    const rect = canvas.getBoundingClientRect();
    pointer.x = event.clientX - rect.left;
    pointer.y = event.clientY - rect.top;
    pointer.target = pointer.x >= 0 && pointer.x <= rect.width && pointer.y >= 0 && pointer.y <= rect.height ? 1 : 0;
  }

  function onVisibility() {
    last = performance.now();
    schedule();
  }

  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(canvas);
  const visibilityObserver = new IntersectionObserver(([entry]) => {
    onScreen = entry.isIntersecting;
    last = performance.now();
    schedule();
  });
  visibilityObserver.observe(canvas);
  window.addEventListener("pointermove", onPointerMove, { passive: true });
  document.addEventListener("visibilitychange", onVisibility);
  resize();
  schedule();

  return {
    stop() {
      if (frame) cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("visibilitychange", onVisibility);
    },
  };
}

// Titre découpé en mots qui montent l'un après l'autre (délai --i). `extraClass` : ex. text-gradient.
function wordSpans(text, startIndex = 0, extraClass = "") {
  return text
    .split(" ")
    .filter(Boolean)
    .map((word, i) => `<span class="word ${extraClass}" style="--i:${startIndex + i}">${word}</span>`)
    .join(" ");
}

// ==================== ÉDITEUR DE CODE ANIMÉ (hero) ====================
// Chaque ligne est un tableau de jetons [classe, texte] ; la frappe est rendue en CSS
// (largeur en ch, steps), le cycle est relancé en JS toutes les CODE_CYCLE_MS.
const CODE_CYCLE_MS = 14000;
const CODE_CHAR_MS = 26;
let codeCycleTimer = 0;

function heroCodeLines(lang) {
  const en = lang === "en";
  return [
    [["kw", "const "], ["var", "site"], ["pun", " = "], ["kw", "await "], ["fn", "codewave"], ["pun", "."], ["fn", "build"], ["pun", "({"]],
    [["prop", "  client"], ["pun", ": "], ["str", en ? '"Your business"' : '"Votre entreprise"'], ["pun", ","]],
    [["prop", "  mobileFirst"], ["pun", ": "], ["kw", "true"], ["pun", ","]],
    [["prop", "  paiement"], ["pun", ": ["], ["str", '"Airtel Money"'], ["pun", ", "], ["str", '"Moov Money"'], ["pun", "],"]],
    [["prop", "  seo"], ["pun", ": "], ["str", '"local"'], ["pun", ","]],
    [["pun", "});"]],
    [["kw", "await "], ["var", "site"], ["pun", "."], ["fn", "deploy"], ["pun", "();"], ["com", en ? " // ✓ live" : " // ✓ en ligne"]],
  ];
}

function renderCodeEditor(lang) {
  let delay = 400;
  const lines = heroCodeLines(lang)
    .map((tokens, i) => {
      const length = tokens.reduce((n, [, text]) => n + text.length, 0);
      const html = tokens.map(([cls, text]) => `<span class="tk-${cls}">${text.replace(/ /g, "&nbsp;")}</span>`).join("");
      const line = `<div class="code-line"><span class="code-ln">${i + 1}</span><span class="code-type" style="--n:${length};--d:${delay}ms">${html}</span></div>`;
      delay += length * CODE_CHAR_MS + 180;
      return line;
    })
    .join("");
  return `
    <div class="code-editor" style="--c:${CODE_CHAR_MS}ms">
      <div class="code-bar"><i></i><i></i><i></i><span>codewave.config.js</span></div>
      <div class="code-body">${lines}<span class="code-cursor"></span></div>
    </div>`;
}

// Relance l'animation de frappe à intervalle régulier (le rendu recrée l'éditeur : minuteur unique).
function mountCodeTyping() {
  clearInterval(codeCycleTimer);
  if (!document.querySelector(".code-editor") || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  codeCycleTimer = setInterval(() => {
    const editor = document.querySelector(".code-editor");
    if (!editor) return clearInterval(codeCycleTimer);
    if (document.hidden) return;
    editor.classList.remove("is-typing");
    void editor.offsetWidth; // force le redémarrage des animations CSS
    editor.classList.add("is-typing");
  }, CODE_CYCLE_MS);
  document.querySelector(".code-editor").classList.add("is-typing");
}

// ==================== ARRIÈRE-PLAN ANIMÉ GLOBAL ====================
// Calque fixe derrière tout le site : halos « aurore » qui dérivent + ondes plein écran
// parcourues par des traits lumineux. Créé une seule fois, hors de #root (non recréé au rendu).
function ensureBackgroundFx() {
  if (document.getElementById("bg-fx")) return;
  const waves = [
    "M-100,180 C200,60 420,300 720,170 C1020,40 1220,300 1540,160",
    "M-100,420 C220,300 440,540 740,410 C1040,280 1240,540 1540,400",
    "M-100,640 C240,520 460,760 760,630 C1060,500 1260,760 1540,620",
  ];
  const layer = document.createElement("div");
  layer.id = "bg-fx";
  layer.setAttribute("aria-hidden", "true");
  // Symboles de code flottants, positions fixes (pas d'aléatoire : rendu stable d'une page à l'autre).
  const glyphs = [
    ["</>", 8, 18], ["{ }", 86, 12], ["=>", 72, 64], ["( )", 14, 78], ["[ ]", 46, 88],
    ["&&", 92, 46], ["#", 30, 40], ["//", 60, 28], ["<div>", 22, 58], ["npm", 80, 84],
  ];
  layer.innerHTML = `
    <div class="aurora aurora-1"></div>
    <div class="aurora aurora-2"></div>
    <div class="aurora aurora-3"></div>
    ${glyphs.map(([g, x, y], i) => `<span class="code-glyph" style="left:${x}%;top:${y}%;--g:${i}">${g.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</span>`).join("")}
    <svg class="flow-waves" viewBox="0 0 1440 800" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
      ${waves.map((d) => `<path class="flow-base" d="${d}"/>`).join("")}
      ${waves.map((d, i) => `<path class="flow-pulse flow-pulse-${i + 1}" d="${d}"/>`).join("")}
    </svg>`;
  document.body.prepend(layer);
}

// ==================== ICÔNES AU TRAIT ====================
// Style de la charte : trait 1,75 px, extrémités arrondies, grille de 24 px.
const LINE_ICONS = {
  monitor: '<rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>',
  cart: '<circle cx="9" cy="20" r="1.5"/><circle cx="18" cy="20" r="1.5"/><path d="M2 3h3l2.6 12.4a2 2 0 002 1.6h8.8a2 2 0 002-1.6L22 7H6"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3M8 11h6M11 8v6"/>',
  wrench: '<path d="M14.7 6.3a4 4 0 00-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 005.4-5.4l-2.6 2.6-2.4-.6-.6-2.4 2.6-2.6z"/>',
  megaphone: '<path d="M3 11v2a1 1 0 001 1h2l5 4V6L6 10H4a1 1 0 00-1 1z"/><path d="M15 8.5a5 5 0 010 7M18 6a8.5 8.5 0 010 12"/>',
  chart: '<path d="M3 3v18h18"/><path d="M7 15l4-4 3 3 6-6"/><path d="M16 8h4v4"/>',
  chat: '<path d="M21 12a8 8 0 01-11.6 7.1L4 20l1-4.6A8 8 0 1121 12z"/>',
  layout: '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/>',
  code: '<path d="M16 18l6-6-6-6M8 6l-6 6 6 6"/>',
  rocket: '<path d="M4.5 16.5c-1.5 1.3-2 5-2 5s3.7-.5 5-2c.7-.8.7-2.1-.1-2.9a2.2 2.2 0 00-2.9-.1z"/><path d="M12 15l-3-3a22 22 0 012-4A12.9 12.9 0 0122 2c0 2.7-.8 7.5-6 11a22.4 22.4 0 01-4 2z"/><path d="M9 12H4s.6-3 2-4c1.6-1.1 5 0 5 0M12 15v5s3-.6 4-2c1.1-1.6 0-5 0-5"/>',
  check: '<path d="M20 6L9 17l-5-5"/>',
  wallet: '<path d="M20 7H5a2 2 0 010-4h13v4"/><path d="M3 5v14a2 2 0 002 2h15V7"/><circle cx="16" cy="14" r="1.5"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  tag: '<path d="M20.6 13.4l-7.2 7.2a2 2 0 01-2.8 0L2 12V2h10l8.6 8.6a2 2 0 010 2.8z"/><circle cx="7" cy="7" r="1.5"/>',
  target: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>',
  users: '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0113 0"/><path d="M16 5a3 3 0 010 6M21.5 20a5.5 5.5 0 00-4.5-5.4"/>',
  graduation: '<path d="M22 9L12 4 2 9l10 5 10-5z"/><path d="M6 11v5c0 1.7 2.7 3 6 3s6-1.3 6-3v-5M22 9v6"/>',
  briefcase: '<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2M3 13h18"/>',
  globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 010 18M12 3a14 14 0 000 18"/>',
  award: '<circle cx="12" cy="9" r="6"/><path d="M8.5 14L7 22l5-3 5 3-1.5-8"/>',
  image: '<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/>',
  bulb: '<path d="M9 18h6M10 21h4"/><path d="M12 3a6 6 0 00-4 10.5c.8.8 1 1.5 1 2.5h6c0-1 .2-1.7 1-2.5A6 6 0 0012 3z"/>',
  phone: '<rect x="6" y="2" width="12" height="20" rx="2"/><path d="M11 18h2"/>',
  pin: '<path d="M12 21s-7-6-7-11a7 7 0 0114 0c0 5-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/>',
  zap: '<path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z"/>',
  pen: '<path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 013 3L7 19l-4 1 1-4 12.5-12.5z"/>',
  link: '<path d="M10 13a5 5 0 007.5.5l3-3a5 5 0 00-7-7l-1.7 1.7"/><path d="M14 11a5 5 0 00-7.5-.5l-3 3a5 5 0 007 7l1.7-1.7"/>',
  xCircle: '<circle cx="12" cy="12" r="9"/><path d="M15 9l-6 6M9 9l6 6"/>',
  lock: '<rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 018 0v4"/>',
  shield: '<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3z"/><path d="M9 12l2 2 4-4"/>',
  moon: '<path d="M21 12.8A9 9 0 1111.2 3a7 7 0 009.8 9.8z"/>',
  wave: '<path d="M2 10c2.5-3 5-3 7.5 0s5 3 7.5 0 5-3 5 0"/><path d="M2 16c2.5-3 5-3 7.5 0s5 3 7.5 0 5-3 5 0"/>',
  bot: '<rect x="4" y="8" width="16" height="12" rx="2"/><path d="M12 8V4M9 13h.01M15 13h.01M9 17h6"/>',
  file: '<path d="M14 3H6a2 2 0 00-2 2v14a2 2 0 002 2h12a2 2 0 002-2V9l-6-6z"/><path d="M14 3v6h6M8 13h8M8 17h5"/>',
  calendar: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
  scale: '<path d="M12 3v18M7 21h10M5 7h14"/><path d="M5 7l-3 7a3.5 3.5 0 006 0L5 7zM19 7l-3 7a3.5 3.5 0 006 0l-3-7z"/>',
  settings: '<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M4.9 4.9L7 7M17 17l2.1 2.1M2 12h3M19 12h3M4.9 19.1L7 17M17 7l2.1-2.1"/>',
  user: '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0116 0"/>',
  database: '<ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v14c0 1.7 3.6 3 8 3s8-1.3 8-3V5M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3"/>',
  eye: '<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
  sprout: '<path d="M12 21V11"/><path d="M12 11C12 7 9 4 4 4c0 4 3 7 8 7zM12 13c0-3 2.5-5.5 7-5.5 0 3.5-2.5 5.5-7 5.5z"/>',
  alert: '<path d="M12 3l10 18H2L12 3z"/><path d="M12 10v4M12 18h.01"/>',
  checkCircle: '<circle cx="12" cy="12" r="9"/><path d="M8 12l3 3 5-6"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  refresh: '<path d="M21 12a9 9 0 01-15.5 6.3L3 16M3 12a9 9 0 0115.5-6.3L21 8M21 3v5h-5M3 21v-5h5"/>',
  laptop: '<rect x="4" y="4" width="16" height="11" rx="2"/><path d="M2 19h20"/>',
  hash: '<path d="M4 9h16M4 15h16M10 3L8 21M16 3l-2 18"/>',
};

// Les contenus historiques utilisent des emojis comme icônes ; ils sont affichés en icônes au trait
// (rendu professionnel et identique sur tous les téléphones). Clés sans sélecteur de variante (U+FE0F).
const EMOJI_ICONS = {
  "🖥": "monitor", "💻": "laptop", "🛒": "cart", "🔍": "search", "🔧": "wrench", "🛠": "wrench", "🧹": "wrench",
  "⚙": "settings", "📱": "phone", "📞": "phone", "📡": "phone", "📊": "chart", "📈": "chart", "🤝": "users",
  "🎓": "graduation", "💼": "briefcase", "🚀": "rocket", "🌍": "globe", "🌐": "globe", "🗺": "globe",
  "🏆": "award", "⭐": "award", "✨": "award", "💰": "wallet", "💵": "wallet", "🏦": "wallet", "✌": "wallet",
  "🎨": "image", "🖼": "image", "📸": "image", "🔮": "bulb", "🎯": "target", "📍": "pin", "🏠": "pin", "🏢": "pin",
  "⚡": "zap", "✍": "pen", "✏": "pen", "📝": "pen", "🔗": "link", "❌": "xCircle", "⛔": "xCircle", "🗑": "xCircle",
  "🐌": "clock", "⏱": "clock", "⏰": "clock", "⏸": "clock", "🔒": "lock", "🛡": "shield", "🌙": "moon", "🌊": "wave",
  "🤖": "bot", "📚": "file", "📰": "file", "📋": "file", "🎫": "tag", "📅": "calendar", "📣": "megaphone",
  "📢": "megaphone", "💬": "chat", "💾": "database", "📦": "database", "💌": "mail", "✉": "mail", "⚖": "scale",
  "👤": "user", "👁": "eye", "🌱": "sprout", "⚠": "alert", "✅": "checkCircle", "💯": "checkCircle",
  "➕": "plus", "🔄": "refresh", "🔢": "hash",
};

function iconFromEmoji(emoji, size = 22) {
  const name = EMOJI_ICONS[String(emoji || "").replace(/️/g, "")] || "code";
  return `<span class="ui-icon">${lineIcon(name, size)}</span>`;
}

function lineIcon(name, size = 24) {
  const paths = LINE_ICONS[name];
  if (!paths) throw new Error(`Icône inconnue : ${name}`);
  return `<svg aria-hidden="true" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">${paths}</svg>`;
}
