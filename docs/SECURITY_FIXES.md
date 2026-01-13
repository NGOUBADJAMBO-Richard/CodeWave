# 🛡️ PLAN DE CORRECTIFS DE SÉCURITÉ - CodeWave

**Date**: 10 janvier 2026  
**Audit réalisé par**: GitHub Copilot  
**Priorité globale**: HAUTE

---

## 📋 RÉSUMÉ EXÉCUTIF

### Criticalité par Domaine

- 🔴 **4 failles critiques** à corriger immédiatement
- 🟠 **3 failles hautes** à corriger avant production
- 🟡 **3 failles moyennes** à corriger prochainement
- 🟢 **4 problèmes mineurs** à résoudre

**Durée estimation**: 4-6 heures pour tout corriger

---

## 🔴 FAILLES CRITIQUES - À CORRIGER IMMÉDIATEMENT

### 1️⃣ Stockage Non-Chiffré des Données en localStorage

**Fichier**: `assets/js/main.js` (lignes 215-225, 175-185)

**Problème**:

```javascript
// ❌ PROBLÈME
localStorage.setItem("newsletters", JSON.stringify(newsletters));
localStorage.setItem("lastContactForm", JSON.stringify({ ...data }));
```

**Pourquoi c'est grave**:

- Les emails sont exposés en clair
- Accessible via DevTools ou extension malveillante
- Violates GDPR Article 32

**Solution Immédiate** (Temporaire):

```javascript
// ✅ CORRECTION RAPIDE - Supprimer le stockage local d'emails
// Commentez/supprimez ces lignes:

// const newsletters = JSON.parse(
//   localStorage.getItem("newsletters") || "[]"
// );
// if (!newsletters.includes(email)) {
//   newsletters.push(email);
//   localStorage.setItem("newsletters", JSON.stringify(newsletters));
// }
```

**Solution Long-terme** (Recommandé):

- Créer un backend serverless (Vercel Function)
- Envoyer les données directement à la base de données
- Ne jamais stocker d'emails en localStorage

---

### 2️⃣ Pas de Validation Côté Serveur

**Fichier**: `contact.html`, `assets/js/main.js`

**Problème**:

```javascript
// ❌ Validation UNIQUEMENT côté client (facilement contournable)
if (contactForm) {
  contactForm.addEventListener("submit", async function (e) {
    e.preventDefault();
    const formData = {
      nom: this.querySelector('[name="nom"]').value,
      email: this.querySelector('[name="email"]').value,
      // AUCUNE VALIDATION
    };
```

**Pourquoi c'est grave**:

- Injection de données malveillantes
- SQL Injection possible (si connecté à une BD)
- XSS via formulaire

**Solution**:
Créer un fichier `api/validate-form.js` (Vercel Function):

```javascript
// ✅ api/validate-form.js
export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { nom, email, telephone, message } = req.body;

  // Validation stricte
  if (!nom || nom.length < 2 || nom.length > 100) {
    return res.status(400).json({ error: "Nom invalide" });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: "Email invalide" });
  }

  const phoneRegex = /^[\d\s\-\+\(\)]{10,}$/;
  if (!phoneRegex.test(telephone)) {
    return res.status(400).json({ error: "Téléphone invalide" });
  }

  // Sanitize HTML
  const DOMPurify = require("isomorphic-dompurify");
  const cleanMessage = DOMPurify.sanitize(message);

  // Rate limiting
  const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
  const key = `ratelimit:${ip}`;
  // TODO: Implémenter avec Redis

  // Envoyer à Formspree
  try {
    const response = await fetch("https://formspree.io/f/mpweqqzz", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nom,
        email,
        telephone,
        message: cleanMessage,
      }),
    });

    if (!response.ok) throw new Error("Formspree failed");
    return res.status(200).json({ success: true });
  } catch (error) {
    return res.status(500).json({ error: "Erreur serveur" });
  }
}
```

**Mise à jour du formulaire**:

```javascript
// ✅ Côté frontend - mettre à jour assets/js/main.js
if (contactForm) {
  contactForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const formData = {
      nom: this.querySelector('[name="nom"]').value,
      email: this.querySelector('[name="email"]').value,
      telephone: this.querySelector('[name="telephone"]').value,
      typeProjet: this.querySelector('[name="typeProjet"]').value,
      message: this.querySelector('[name="message"]').value,
    };

    try {
      const response = await fetch("/api/validate-form", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const error = await response.json();
        showMessage("error", error.error);
        return;
      }

      showMessage("success", "✅ Merci! Nous répondrons dans 24h.");
      this.reset();
    } catch (error) {
      showMessage("error", "❌ Erreur. Contactez-nous via WhatsApp.");
    }
  });
}
```

---

### 3️⃣ Formspree ID Visible en Frontend

**Fichier**: `contact.html`, blogs, etc. (ligne 283 et multiples)

**Problème**:

```html
<!-- ❌ ID public = spam possible -->
<form action="https://formspree.io/f/mpweqqzz" method="POST"></form>
```

**Solution Immédiate**:
Utiliser une Vercel Function proxy:

```javascript
// ✅ api/contact.js
import formspree from "@formspree/js";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  try {
    const response = await fetch("https://formspree.io/f/mpweqqzz", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body),
    });

    return res.status(response.status).json(await response.json());
  } catch (error) {
    return res.status(500).json({ error: "Failed" });
  }
}
```

Puis changer dans HTML:

```html
<!-- ✅ Proxy invisible -->
<form action="/api/contact" method="POST"></form>
```

---

### 4️⃣ Pas de Protection XSS

**Fichier**: `assets/js/main.js`

**Problème**:

```javascript
// ❌ Injection de code possible
const whatsappMsg = `Bonjour, je viens d'envoyer...${formData.nom}...`;
window.open(
  `https://wa.me/24166198918?text=${encodeURIComponent(whatsappMsg)}`,
  "_blank"
);
```

**Solution**:

```javascript
// ✅ Fonction sanitization
function sanitizeInput(str) {
  const div = document.createElement("div");
  div.textContent = str; // Échappe le HTML
  return div.innerHTML;
}

// Utilisation
const whatsappMsg = `Bonjour...${sanitizeInput(formData.nom)}...`;
```

---

## 🟠 FAILLES HAUTES - À CORRIGER AVANT PRODUCTION

### 5️⃣ Pas d'En-têtes de Sécurité HTTP

**Fichier**: Créer `vercel.json` (ou configurer Vercel)

**Solution**:

```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        },
        {
          "key": "Referrer-Policy",
          "value": "strict-origin-when-cross-origin"
        },
        {
          "key": "Permissions-Policy",
          "value": "geolocation=(), microphone=(), camera=()"
        },
        {
          "key": "Content-Security-Policy",
          "value": "default-src 'self'; script-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net https://cdnjs.cloudflare.com; style-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com; img-src 'self' data: https:; connect-src 'self' https://formspree.io https://api.emailjs.com"
        }
      ]
    }
  ]
}
```

---

### 6️⃣ Cookies sans Consentement (RGPD)

**Fichier**: `index.html`, tous les fichiers

**Problème**:

- Google Analytics chargé sans consentement
- Cookie banner manquant

**Solution**:
Créer `assets/js/cookie-consent.js`:

```javascript
// ✅ Cookie consent management
function initCookieConsent() {
  const consentGiven = localStorage.getItem("cookieConsent");

  if (!consentGiven) {
    showCookieBanner();
  } else {
    loadAnalytics();
  }
}

function showCookieBanner() {
  const banner = document.createElement("div");
  banner.id = "cookie-banner";
  banner.innerHTML = `
    <div style="
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      background: #1f2937;
      color: white;
      padding: 1.5rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      z-index: 9999;
      font-size: 0.875rem;
    ">
      <p style="margin: 0; flex: 1;">
        Nous utilisons des cookies pour améliorer votre expérience.
        <a href="/politique-confidentialite.html#cookies" style="color: #60a5fa;">En savoir plus</a>
      </p>
      <div style="display: flex; gap: 1rem;">
        <button id="reject-cookies" style="
          padding: 0.5rem 1rem;
          background: transparent;
          border: 1px solid white;
          color: white;
          border-radius: 0.5rem;
          cursor: pointer;
        ">Refuser</button>
        <button id="accept-cookies" style="
          padding: 0.5rem 1rem;
          background: #3b82f6;
          border: none;
          color: white;
          border-radius: 0.5rem;
          cursor: pointer;
        ">Accepter</button>
      </div>
    </div>
  `;

  document.body.appendChild(banner);

  document.getElementById("accept-cookies").addEventListener("click", () => {
    localStorage.setItem("cookieConsent", "true");
    banner.remove();
    loadAnalytics();
  });

  document.getElementById("reject-cookies").addEventListener("click", () => {
    localStorage.setItem("cookieConsent", "false");
    banner.remove();
  });
}

function loadAnalytics() {
  // Charger Google Analytics SEULEMENT après consentement
  const script = document.createElement("script");
  script.async = true;
  script.src = "https://www.googletagmanager.com/gtag/js?id=G-YOUR-ID";
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  function gtag() {
    dataLayer.push(arguments);
  }
  gtag("js", new Date());
  gtag("config", "G-YOUR-ID");
}

// Initialiser au chargement
document.addEventListener("DOMContentLoaded", initCookieConsent);
```

Ajouter dans `index.html` (avant `</body>`):

```html
<script src="assets/js/cookie-consent.js"></script>
```

---

### 7️⃣ Pas de Rate Limiting

**Fichier**: `api/validate-form.js`

**Solution**:

```javascript
// ✅ Rate limiting simple (sans Redis)
const rateLimits = new Map();

export default async function handler(req, res) {
  const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
  const now = Date.now();

  if (!rateLimits.has(ip)) {
    rateLimits.set(ip, []);
  }

  const times = rateLimits.get(ip).filter((t) => now - t < 60000); // 1 minute

  if (times.length >= 5) {
    return res
      .status(429)
      .json({ error: "Trop de requêtes. Réessayez dans 1 minute." });
  }

  times.push(now);
  rateLimits.set(ip, times);

  // ... reste du code
}
```

---

## 🟡 FAILLES MOYENNES

### 8️⃣ Email Visible en Dur

**Fichier**: `politique-confidentialite.html` (ligne 175)

**Problème**:

```html
<!-- ❌ Scrappable par bots -->
<a href="mailto:mgncodewave18@gmail.com">mgncodewave18@gmail.com</a>
```

**Solution Simple**:

```html
<!-- ✅ Encoder l'email -->
<a
  href="javascript:void(0)"
  onclick="this.href='mailto:' + atob('bWduY29kZXdhdmUxOEBnbWFpbC5jb20=')"
>
  Cliquez pour voir l'email
</a>
```

---

### 9️⃣ Pas de rel="noopener" sur tous les liens externes

**Fichier**: Tous les fichiers HTML

**Solution**:

```html
<!-- ❌ AVANT -->
<a href="external-link" target="_blank">Lien</a>

<!-- ✅ APRÈS -->
<a href="external-link" target="_blank" rel="noopener noreferrer">Lien</a>
```

---

### 🔟 Console Errors Non Sécurisées

**Fichier**: `assets/js/main.js`

**Problème**:

```javascript
// ❌ Erreurs sensibles en console
console.error("Erreur:", error);
```

**Solution**:

```javascript
// ✅ Logger seulement en développement
if (process.env.NODE_ENV === "development") {
  console.error("Erreur:", error);
}

// Ou envoyer à un service (Sentry, LogRocket, etc.)
```

---

## ✅ CHECKLIST D'IMPLÉMENTATION

### Phase 1 - Critique (Jour 1)

- [ ] Supprimer localStorage pour emails
- [ ] Créer API de validation (`api/validate-form.js`)
- [ ] Proxy Formspree (`api/contact.js`)
- [ ] Ajouter sanitization XSS

### Phase 2 - Haute Sécurité (Jour 2)

- [ ] Créer `vercel.json` avec headers sécurité
- [ ] Implémenter cookie banner
- [ ] Ajouter rate limiting

### Phase 3 - Amélioration Continue (Cette semaine)

- [ ] Encoder les emails
- [ ] Ajouter `rel="noopener"` partout
- [ ] Nettoyage console logs

### Phase 4 - Monitoring (Semaine prochaine)

- [ ] Intégrer Sentry pour erreurs
- [ ] Audit de sécurité automatisé
- [ ] Tests de pénétration

---

## 📊 RESSOURCES UTILES

### Outils de Test

- **OWASP ZAP**: https://www.zaproxy.org/ (scan auto)
- **Burp Suite**: https://portswigger.net/burp (pentest)
- **Mozilla Observatory**: https://observatory.mozilla.org/ (headers)

### Packages NPM Recommandés

```bash
npm install isomorphic-dompurify   # Sanitization
npm install helmet                  # Security headers
npm install express-rate-limit      # Rate limiting
npm install dotenv                  # Variables d'env
```

### Documentation

- RGPD: https://www.cnil.fr/
- OWASP Top 10: https://owasp.org/www-project-top-ten/
- MDN Security: https://developer.mozilla.org/en-US/docs/Web/Security

---

## 🎯 PRIORITÉ FINALE

```
IMMÉDIAT (Jour 1):
1. Supprimer localStorage emails
2. Ajouter validation serveur
3. Proxy API endpoints

URGENT (Cette semaine):
4. Headers de sécurité
5. Cookie consent
6. Rate limiting

IMPORTANT (Mois prochain):
7. Monitoring & Logging
8. Tests de pénétration
9. Audit RGPD complet
```

---

**Status**: 🔴 À IMPLÉMENTER D'URGENCE  
**Contact en cas de question**: mgncodewave18@gmail.com  
**Prochaine review**: 17 janvier 2026
