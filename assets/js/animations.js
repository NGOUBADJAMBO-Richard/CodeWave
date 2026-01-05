// ========================================
// CodeWave - Animations JavaScript
// ========================================

// === Scroll Reveal Animation ===
function initScrollReveal() {
  const revealElements = document.querySelectorAll(
    ".fade-in-scroll, .slide-left-scroll, .slide-right-scroll, .scale-up-scroll"
  );

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          // Optionnel : arrêter d'observer après la révélation
          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    }
  );

  revealElements.forEach((el) => revealObserver.observe(el));
}

// === Number Counter Animation ===
function animateNumber(element, target, duration = 2000) {
  const start = 0;
  const increment = target / (duration / 16);
  let current = start;

  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }

    // Format le nombre avec séparateurs de milliers si > 999
    const formatted = Math.floor(current).toLocaleString("fr-FR");
    element.textContent = formatted + (element.dataset.suffix || "");
  }, 16);
}

// === Counter Animation on Scroll ===
function initCounterAnimation() {
  const counters = document.querySelectorAll(".stat-number[data-target]");
  let hasAnimated = false;

  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !hasAnimated) {
          hasAnimated = true;
          counters.forEach((counter) => {
            const target = parseInt(counter.dataset.target);
            if (!isNaN(target)) {
              counter.dataset.suffix = counter.textContent.replace(target, "");
              animateNumber(counter, target);
            }
          });
          counterObserver.disconnect();
        }
      });
    },
    { threshold: 0.5 }
  );

  if (counters.length > 0) {
    counterObserver.observe(counters[0].closest(".hero-stats"));
  }
}

// === Staggered Animation ===
function staggerAnimation(selector, animationClass, delay = 100) {
  const elements = document.querySelectorAll(selector);
  elements.forEach((el, index) => {
    setTimeout(() => {
      el.classList.add(animationClass);
    }, index * delay);
  });
}

// === Parallax Scrolling Effect ===
function initParallax() {
  const parallaxElements = document.querySelectorAll(".parallax");

  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset;

    parallaxElements.forEach((el) => {
      const speed = el.dataset.speed || 0.5;
      const yPos = -(scrolled * speed);
      el.style.transform = `translateY(${yPos}px)`;
    });
  });
}

// === Smooth Scroll to Anchor ===
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const href = this.getAttribute("href");

      // Ignorer les liens vides ou "#"
      if (href === "#" || href.length <= 1) return;

      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const offsetTop = target.offsetTop - 80; // 80px pour la navbar

        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        });
      }
    });
  });
}

// === Loading Animation ===
function showLoader() {
  const loader = document.createElement("div");
  loader.className = "page-loader";
  loader.innerHTML = `
    <div class="spinner"></div>
    <p>Chargement...</p>
  `;
  document.body.appendChild(loader);

  // Ajouter les styles si nécessaire
  if (!document.getElementById("loader-styles")) {
    const style = document.createElement("style");
    style.id = "loader-styles";
    style.textContent = `
      .page-loader {
        position: fixed;
        inset: 0;
        background: white;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        z-index: 9999;
        gap: 1rem;
      }
    `;
    document.head.appendChild(style);
  }

  return loader;
}

function hideLoader(loader) {
  if (loader) {
    loader.style.opacity = "0";
    setTimeout(() => loader.remove(), 300);
  }
}

// === Typing Effect ===
function typeWriter(element, text, speed = 50) {
  let i = 0;
  element.textContent = "";

  function type() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }

  type();
}

// === Progress Bar Animation ===
function animateProgressBar(element, targetWidth, duration = 1000) {
  element.style.setProperty("--progress-width", targetWidth + "%");
  element.style.animation = `progress ${duration}ms ease-out forwards`;
}

// === Toast Notification ===
function showToast(message, type = "info", duration = 3000) {
  const toast = document.createElement("div");
  toast.className = `toast toast-${type}`;
  toast.textContent = message;

  // Styles inline
  Object.assign(toast.style, {
    position: "fixed",
    bottom: "2rem",
    right: "2rem",
    padding: "1rem 1.5rem",
    borderRadius: "0.5rem",
    color: "white",
    fontWeight: "600",
    boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
    zIndex: "9999",
    animation: "slideInNotification 0.3s ease-out",
    backgroundColor:
      type === "success" ? "#10b981" : type === "error" ? "#ef4444" : "#3b82f6",
  });

  document.body.appendChild(toast);

  setTimeout(() => {
    toast.style.animation = "slideInNotification 0.3s ease-out reverse";
    setTimeout(() => toast.remove(), 300);
  }, duration);
}

// === Ripple Effect on Click ===
function addRippleEffect(button) {
  button.addEventListener("click", function (e) {
    const ripple = document.createElement("span");
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = size + "px";
    ripple.style.left = x + "px";
    ripple.style.top = y + "px";
    ripple.className = "ripple";

    // Styles
    Object.assign(ripple.style, {
      position: "absolute",
      borderRadius: "50%",
      background: "rgba(255, 255, 255, 0.6)",
      transform: "scale(0)",
      animation: "ripple-effect 0.6s ease-out",
      pointerEvents: "none",
    });

    this.appendChild(ripple);

    setTimeout(() => ripple.remove(), 600);
  });
}

// === Modal Animations ===
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.style.display = "flex";
    modal.classList.add("modal-open");
    document.body.style.overflow = "hidden";

    // Animation
    requestAnimationFrame(() => {
      modal.style.opacity = "1";
    });
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.style.opacity = "0";
    setTimeout(() => {
      modal.style.display = "none";
      modal.classList.remove("modal-open");
      document.body.style.overflow = "";
    }, 300);
  }
}

// === Image Lazy Loading ===
function initLazyLoading() {
  const images = document.querySelectorAll("img[data-src]");

  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute("data-src");
        imageObserver.unobserve(img);

        // Ajouter une animation de fade-in
        img.style.opacity = "0";
        img.onload = () => {
          img.style.transition = "opacity 0.3s";
          img.style.opacity = "1";
        };
      }
    });
  });

  images.forEach((img) => imageObserver.observe(img));
}

// === Scroll Progress Bar ===
function initScrollProgress() {
  const progressBar = document.createElement("div");
  progressBar.className = "scroll-progress";

  Object.assign(progressBar.style, {
    position: "fixed",
    top: "0",
    left: "0",
    width: "0",
    height: "3px",
    background: "linear-gradient(90deg, #2563eb, #8b5cf6)",
    zIndex: "9999",
    transition: "width 0.1s ease",
  });

  document.body.appendChild(progressBar);

  window.addEventListener("scroll", () => {
    const windowHeight =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    progressBar.style.width = scrolled + "%";
  });
}

// === Add Hover Class ===
function initHoverEffects() {
  const hoverElements = document.querySelectorAll(".hover-effect");

  hoverElements.forEach((el) => {
    el.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-5px)";
      this.style.boxShadow = "0 10px 25px rgba(0,0,0,0.15)";
    });

    el.addEventListener("mouseleave", function () {
      this.style.transform = "";
      this.style.boxShadow = "";
    });
  });
}

// === Initialize All Animations ===
function initAnimations() {
  // Scroll reveal
  initScrollReveal();

  // Counter animation
  initCounterAnimation();

  // Smooth scroll
  initSmoothScroll();

  // Lazy loading
  initLazyLoading();

  // Scroll progress bar (optionnel)
  // initScrollProgress();

  // Parallax (optionnel)
  // initParallax();

  // Add ripple effect to buttons
  document.querySelectorAll(".btn-primary, .btn-secondary").forEach((btn) => {
    btn.style.position = "relative";
    btn.style.overflow = "hidden";
    addRippleEffect(btn);
  });

  // Hover effects
  initHoverEffects();

  // Staggered animation for feature cards
  setTimeout(() => {
    staggerAnimation(".feature-card", "fade-in-up", 150);
  }, 300);
}

// === Page Load Animation ===
window.addEventListener("load", () => {
  // Masquer le loader si présent
  const loader = document.querySelector(".page-loader");
  if (loader) {
    hideLoader(loader);
  }

  // Initialiser toutes les animations
  initAnimations();

  // Log performance
  if (window.performance) {
    const perfData = window.performance.timing;
    const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
    console.log(`⚡ Page chargée en ${pageLoadTime}ms`);
  }
});

// === Export functions for use in other scripts ===
window.CodeWaveAnimations = {
  showToast,
  animateNumber,
  typeWriter,
  openModal,
  closeModal,
  showLoader,
  hideLoader,
  animateProgressBar,
  staggerAnimation,
};
