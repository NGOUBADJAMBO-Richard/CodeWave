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
  layer.innerHTML = `
    <div class="aurora aurora-1"></div>
    <div class="aurora aurora-2"></div>
    <div class="aurora aurora-3"></div>
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
};

function lineIcon(name, size = 24) {
  const paths = LINE_ICONS[name];
  if (!paths) throw new Error(`Icône inconnue : ${name}`);
  return `<svg aria-hidden="true" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">${paths}</svg>`;
}
