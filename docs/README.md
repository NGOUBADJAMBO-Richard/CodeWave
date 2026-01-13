# ðŸš€ CodeWave - Site Web Professionnel

Site web complet pour l'entreprise **M.G.N CodeWave**, agence de dÃ©veloppement web basÃ©e Ã  Libreville, Gabon.

---

## ðŸ“‹ Table des MatiÃ¨res

1. [AperÃ§u](#aperÃ§u)
2. [FonctionnalitÃ©s](#fonctionnalitÃ©s)
3. [Structure du Projet](#structure-du-projet)
4. [Installation](#installation)
5. [Configuration](#configuration)
6. [Utilisation](#utilisation)
7. [DÃ©ploiement](#dÃ©ploiement)
8. [Personnalisation](#personnalisation)
9. [Support](#support)

---

## ðŸŽ¯ AperÃ§u

Site web moderne et responsive pour prÃ©senter les services de dÃ©veloppement web de CodeWave :

- **Sites Vitrines** : 100 000 - 200 000 FCFA
- **E-Commerce** : 300 000 - 500 000 FCFA
- **Blogs & Portfolios** : 80 000 - 150 000 FCFA
- **Services Additionnels** : SEO, Maintenance, Refonte

### ðŸŒŸ DÃ©mo en Ligne

ðŸ‘‰ [https://m-g-n-code-wave.vercel.app/](https://m-g-n-code-wave.vercel.app/)

---

## âœ¨ FonctionnalitÃ©s

### Pages Principales

- âœ… **Page d'accueil** - Hero section, services, portfolio, tÃ©moignages
- âœ… **Services** - DÃ©tails complets de chaque offre avec tarifs
- âœ… **Portfolio** - Galerie de projets avec filtres
- âœ… **Tarifs** - Tous les packs et options dÃ©taillÃ©s
- âœ… **Blog** - Articles et actualitÃ©s
- âœ… **Ã€ propos** - PrÃ©sentation de l'entreprise
- âœ… **Contact** - Formulaire + coordonnÃ©es

### FonctionnalitÃ©s Techniques

- âœ… **100% Responsive** - Mobile, tablette, desktop
- âœ… **Animations CSS** - Smooth, modernes et performantes
- âœ… **Formulaire de contact** - Avec EmailJS (gratuit)
- âœ… **Navigation sticky** - Menu fixe au scroll
- âœ… **Bouton WhatsApp flottant** - Contact direct
- âœ… **SEO OptimisÃ©** - Meta tags, structure sÃ©mantique
- âœ… **Performance** - Chargement rapide, images optimisÃ©es
- âœ… **AccessibilitÃ©** - ARIA labels, navigation clavier

---

## ðŸ“ Structure du Projet

```
codewave-website/
â”œâ”€â”€ index.html                    # Page d'accueil
â”œâ”€â”€ services.html                 # Page services
â”œâ”€â”€ portfolio.html                # Page portfolio
â”œâ”€â”€ tarifs.html                   # Page tarifs
â”œâ”€â”€ blog.html                     # Page blog
â”œâ”€â”€ contact.html                  # Page contact âœ… COMPLÃˆTE
â”œâ”€â”€ a-propos.html                 # Page Ã  propos
â”œâ”€â”€ mentions-legales.html         # Mentions lÃ©gales
â”œâ”€â”€ politique-confidentialite.html
â”œâ”€â”€ cgv.html                      # CGV
â”‚
â”œâ”€â”€ assets/
â”‚   â”œâ”€â”€ css/
â”‚   â”‚   â”œâ”€â”€ style.css            # âœ… Styles principaux COMPLETS
â”‚   â”‚   â”œâ”€â”€ responsive.css       # Styles responsive
â”‚   â”‚   â””â”€â”€ animations.css       # Animations CSS
â”‚   â”‚
â”‚   â”œâ”€â”€ js/
â”‚   â”‚   â”œâ”€â”€ main.js              # âœ… JavaScript principal COMPLET
â”‚   â”‚   â”œâ”€â”€ form-handler.js      # Gestion formulaires
â”‚   â”‚   â””â”€â”€ portfolio.js         # Filtres portfolio
â”‚   â”‚
â”‚   â”œâ”€â”€ images/
â”‚   â”‚   â”œâ”€â”€ logo.png             # Votre logo
â”‚   â”‚   â”œâ”€â”€ hero-bg.jpg          # Image hero
â”‚   â”‚   â”œâ”€â”€ portfolio/           # Images projets
â”‚   â”‚   â”œâ”€â”€ testimonials/        # Photos clients
â”‚   â”‚   â””â”€â”€ blog/                # Images articles
â”‚   â”‚
â”‚   â””â”€â”€ fonts/                   # Polices personnalisÃ©es (optionnel)
â”‚
â”œâ”€â”€ README.md                     # âœ… Documentation COMPLÃˆTE
â””â”€â”€ .gitignore                    # Fichiers Ã  ignorer
```

---

## ðŸ”§ Installation

### PrÃ©requis

- Un Ã©diteur de code (VS Code recommandÃ©)
- Un navigateur moderne (Chrome, Firefox, Safari)
- (Optionnel) Node.js pour serveur local

### Ã‰tape 1 : TÃ©lÃ©charger le Projet

```bash
# Cloner ou tÃ©lÃ©charger le projet
git clone https://github.com/votre-compte/codewave-website.git
cd codewave-website
```

### Ã‰tape 2 : Structure des Fichiers

CrÃ©ez les dossiers manquants :

```bash
mkdir -p assets/css assets/js assets/images/portfolio assets/images/blog
```

### Ã‰tape 3 : Ouvrir le Projet

```bash
# Avec VS Code
code .

# Ou directement ouvrir index.html dans votre navigateur
```

### Ã‰tape 4 : Serveur Local (Optionnel mais recommandÃ©)

**Option A : Avec VS Code Live Server**

1. Installer l'extension "Live Server"
2. Clic droit sur `index.html` â†’ "Open with Live Server"

**Option B : Avec Python**

```bash
# Python 3
python -m http.server 8000

# Puis ouvrir http://localhost:8000
```

**Option C : Avec Node.js**

```bash
npx http-server -p 8000
```

---

## âš™ï¸ Configuration

### 1. Configuration EmailJS (Formulaire de Contact)

Le formulaire utilise **EmailJS** (100% GRATUIT, 200 emails/mois).

#### Ã‰tapes :

1. **CrÃ©er un compte sur [EmailJS](https://www.emailjs.com/)**
2. **CrÃ©er un Service Email** :
   - Dashboard â†’ Email Services â†’ Add New Service
   - Choisir Gmail (ou autre)
   - Connecter votre email
3. **CrÃ©er un Template Email** :

   - Dashboard â†’ Email Templates â†’ Create New Template
   - Utiliser ce template :

   ```
   Nouvelle demande de devis - CodeWave

   Nom: {{from_name}}
   Email: {{from_email}}
   TÃ©lÃ©phone: {{phone}}
   Type de projet: {{project_type}}
   Budget: {{budget}}

   Message:
   {{message}}
   ```

4. **Obtenir vos identifiants** :
   - Service ID
   - Template ID
   - Public Key

#### Configurer dans le Code :

**Dans `assets/js/main.js` (ligne 8-12)** :

```javascript
const EMAILJS_CONFIG = {
  serviceID: "service_abc123", // Votre Service ID
  templateID: "template_xyz456", // Votre Template ID
  publicKey: "abcdefgh123456", // Votre Public Key
};
```

**Dans `contact.html` (ligne 17-19)** :

```javascript
emailjs.init("abcdefgh123456"); // Votre Public Key
```

**DÃ©commenter dans `main.js` (ligne 58-71)** :

```javascript
// Retirer les /* et */ autour de ce bloc
await emailjs.send(
  EMAILJS_CONFIG.serviceID,
  EMAILJS_CONFIG.templateID,
  { ... },
  EMAILJS_CONFIG.publicKey
);
```

### 2. Configuration Google Analytics (Optionnel)

**Dans `main.js` (ligne 358-362)** :

```javascript
// DÃ©commenter et ajouter votre ID
window.dataLayer = window.dataLayer || [];
function gtag() {
  dataLayer.push(arguments);
}
gtag("js", new Date());
gtag("config", "G-XXXXXXXXXX"); // Votre ID Google Analytics
```

**Ajouter dans `<head>` de toutes les pages** :

```html
<!-- Google Analytics -->
<script
  async
  src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
></script>
```

### 3. Personnalisation du Contenu

#### CoordonnÃ©es (Ã€ remplacer partout)

- **Email** : `mgncodewave18@gmail.com`
- **TÃ©lÃ©phone** : `+241 74 67 67 41`
- **WhatsApp** : `https://wa.me/24166198918`
- **Site** : `https://m-g-n-code-wave.vercel.app/`

#### Logo et Images

1. **Logo** : Remplacer `assets/images/logo.png`
2. **Favicon** : Remplacer `assets/images/favicon.png`
3. **Portfolio** : Ajouter vos vrais projets dans `assets/images/portfolio/`
4. **Blog** : Ajouter images articles dans `assets/images/blog/`

#### Textes et Contenus

- **TÃ©moignages** : Remplacer par de vrais avis clients
- **Statistiques** : Ajuster selon vos vrais chiffres
- **Projets Portfolio** : Ajouter vos vraies rÃ©alisations
- **Articles de blog** : CrÃ©er votre propre contenu

---

## ðŸŽ¨ Personnalisation

### Modifier les Couleurs

**Dans `assets/css/style.css` (lignes 7-15)** :

```css
:root {
  --primary: #2563eb; /* Bleu principal */
  --primary-dark: #1e40af; /* Bleu foncÃ© */
  --secondary: #8b5cf6; /* Violet */
  --accent: #ec4899; /* Rose */
  /* Modifier selon vos prÃ©fÃ©rences */
}
```

### Modifier les Polices

**Dans toutes les pages HTML** :

```html
<!-- Remplacer Inter par votre police -->
<link
  href="https://fonts.googleapis.com/css2?family=VotrePolice:wght@400;700&display=swap"
  rel="stylesheet"
/>
```

**Dans `style.css`** :

```css
body {
  font-family: "VotrePolice", sans-serif;
}
```

### Ajouter/Modifier des Sections

Chaque section suit cette structure :

```html
<section class="section-padding">
  <div class="container">
    <div class="section-header text-center">
      <h2 class="section-title">Titre</h2>
      <p class="section-subtitle">Sous-titre</p>
    </div>
    <!-- Votre contenu -->
  </div>
</section>
```

---

## ðŸš€ DÃ©ploiement

### Option 1 : Vercel (RecommandÃ© - GRATUIT)

1. **CrÃ©er un compte sur [Vercel](https://vercel.com/)**
2. **Installer Vercel CLI** :
   ```bash
   npm i -g vercel
   ```
3. **DÃ©ployer** :
   ```bash
   cd codewave-website
   vercel
   ```
4. **Suivre les instructions**
5. **Votre site est en ligne** ! ðŸŽ‰

### Option 2 : Netlify (GRATUIT)

1. **CrÃ©er un compte sur [Netlify](https://netlify.com/)**
2. **Glisser-dÃ©poser** votre dossier sur Netlify
3. **Ou via GitHub** :
   - Push votre code sur GitHub
   - Connecter le repo Ã  Netlify
   - Deploy automatique Ã  chaque commit

### Option 3 : GitHub Pages (GRATUIT)

1. **Push sur GitHub** :
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/votre-compte/codewave.git
   git push -u origin main
   ```
2. **Activer GitHub Pages** :
   - Settings â†’ Pages
   - Source : main branch
   - Save
3. **AccÃ©der** : `https://votre-compte.github.io/codewave/`

### Option 4 : HÃ©bergeur Classique

**HÃ©bergeurs recommandÃ©s pour le Gabon :**

- **OVH** (~20â‚¬/an) - https://www.ovh.com/
- **Hostinger** (~30â‚¬/an) - https://www.hostinger.com/
- **o2switch** (70â‚¬/an illimitÃ©) - https://www.o2switch.fr/

**Upload via FTP :**

1. Obtenir identifiants FTP de votre hÃ©bergeur
2. Utiliser FileZilla ou autre client FTP
3. Uploader tous les fichiers dans `public_html/` ou `www/`

---

## ðŸ“§ Configuration AvancÃ©e

### Ajouter un Blog Fonctionnel

**Avec un CMS Headless (RecommandÃ©) :**

1. **[Contentful](https://www.contentful.com/)** (Gratuit jusqu'Ã  25k records)
2. **[Strapi](https://strapi.io/)** (Open source, auto-hÃ©bergÃ©)
3. **[Ghost](https://ghost.org/)** (Plateforme de blogging)

### Ajouter un Chat en Direct

**Solutions gratuites :**

- **[Tawk.to](https://www.tawk.to/)** - 100% gratuit
- **[Crisp](https://crisp.chat/)** - Plan gratuit gÃ©nÃ©reux
- **[Tidio](https://www.tidio.com/)** - Gratuit jusqu'Ã  50 conversations/mois

**Installation (exemple Tawk.to) :**

```html
<!-- Avant </body> dans toutes les pages -->
<script type="text/javascript">
  var Tawk_API = Tawk_API || {};
  var Tawk_LoadStart = new Date();
  (function () {
    var s1 = document.createElement("script"),
      s0 = document.getElementsByTagName("script")[0];
    s1.async = true;
    s1.src = "https://embed.tawk.to/VOTRE_ID/default";
    s0.parentNode.insertBefore(s1, s0);
  })();
</script>
```

### Ajouter Google Maps

```html
<div
  class="map-container"
  style="height: 400px; border-radius: 1rem; overflow: hidden;"
>
  <iframe
    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d127434.69374693837!2d9.4127!3d0.3936!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x107f2e2f4e4e4e4e%3A0x1234567890abcdef!2sLibreville%2C%20Gabon!5e0!3m2!1sfr!2sfr!4v1234567890"
    width="100%"
    height="100%"
    style="border:0;"
    allowfullscreen=""
    loading="lazy"
  >
  </iframe>
</div>
```

---

## ðŸ› ï¸ Maintenance

### Mises Ã  Jour RÃ©guliÃ¨res

**Contenu Ã  mettre Ã  jour :**

- âœ… **Portfolio** : Ajouter nouveaux projets
- âœ… **TÃ©moignages** : Ajouter avis rÃ©cents
- âœ… **Blog** : Publier articles (1-2/mois recommandÃ©)
- âœ… **Tarifs** : Ajuster si nÃ©cessaire
- âœ… **Statistiques** : Mettre Ã  jour chiffres

### Sauvegardes

**MÃ©thode 1 : Git (RecommandÃ©)**

```bash
# Sauvegarder rÃ©guliÃ¨rement
git add .
git commit -m "Mise Ã  jour [description]"
git push
```

**MÃ©thode 2 : Locale**

- Copier tout le dossier rÃ©guliÃ¨rement
- Utiliser Google Drive / Dropbox

### Monitoring

**Outils gratuits :**

- **[Google Analytics](https://analytics.google.com/)** - Trafic et comportement
- **[Google Search Console](https://search.google.com/search-console)** - SEO
- **[UptimeRobot](https://uptimerobot.com/)** - Monitoring uptime (gratuit)

---

## ðŸ“± RÃ©seaux Sociaux

### Optimisation Open Graph

Ajouter dans `<head>` de chaque page :

```html
<!-- Facebook & LinkedIn -->
<meta property="og:title" content="CodeWave - CrÃ©ation Sites Web Gabon" />
<meta
  property="og:description"
  content="DÃ©veloppement web professionnel Ã  partir de 100 000 FCFA"
/>
<meta
  property="og:image"
  content="https://votre-site.com/assets/images/og-image.jpg"
/>
<meta property="og:url" content="https://votre-site.com/" />
<meta property="og:type" content="website" />

<!-- Twitter -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="CodeWave - CrÃ©ation Sites Web Gabon" />
<meta name="twitter:description" content="DÃ©veloppement web professionnel" />
<meta
  name="twitter:image"
  content="https://votre-site.com/assets/images/og-image.jpg"
/>
```

**Image OG recommandÃ©e :**

- Taille : 1200x630px
- Format : JPG ou PNG
- Poids : < 1MB

---

## ðŸ” SEO - Optimisation

### Checklist SEO

- âœ… **Titles uniques** pour chaque page (50-60 caractÃ¨res)
- âœ… **Meta descriptions** uniques (150-160 caractÃ¨res)
- âœ… **Balises H1** (une seule par page)
- âœ… **Balises H2, H3** hiÃ©rarchisÃ©es
- âœ… **Alt text** sur toutes les images
- âœ… **URLs propres** (sans caractÃ¨res spÃ©ciaux)
- âœ… **Sitemap.xml** gÃ©nÃ©rÃ©
- âœ… **robots.txt** configurÃ©
- âœ… **HTTPS** activÃ© (SSL)
- âœ… **Vitesse de chargement** < 3 secondes
- âœ… **Mobile-friendly** (test Google)

### CrÃ©er sitemap.xml

**Ã€ la racine du projet** :

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://votre-site.com/</loc>
    <lastmod>2025-01-15</lastmod>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://votre-site.com/services.html</loc>
    <lastmod>2025-01-15</lastmod>
    <priority>0.8</priority>
  </url>
  <!-- Ajouter toutes vos pages -->
</urlset>
```

### CrÃ©er robots.txt

**Ã€ la racine du projet** :

```
User-agent: *
Allow: /
Sitemap: https://votre-site.com/sitemap.xml
```

---

## ðŸ’¡ Conseils Marketing

### Lancement du Site

**Semaine 1 :**

1. âœ… Annoncer sur Facebook/LinkedIn
2. âœ… Envoyer email Ã  contacts existants
3. âœ… Poster dans groupes entrepreneurs gabonais
4. âœ… Partager sur WhatsApp Status

**Semaine 2-4 :**

1. âœ… Publier 3-5 articles de blog
2. âœ… CrÃ©er stories Instagram (avant/aprÃ¨s projets)
3. âœ… Lancer campagne Facebook Ads (50 000 FCFA)
4. âœ… Contacter 10 entreprises locales

### GÃ©nÃ©ration de Leads

**StratÃ©gies efficaces :**

- ðŸŽ¯ **Offre limitÃ©e** : "10 premiers clients -15%"
- ðŸ’¬ **RÃ©seautage** : Groupes Facebook, Ã©vÃ©nements
- ðŸ“§ **Email marketing** : Newsletter mensuelle
- ðŸŽ¥ **VidÃ©os** : Montrer processus de crÃ©ation
- ðŸ¤ **Partenariats** : Autres agences, consultants
- â­ **Avis clients** : Google My Business, Facebook

---

## ðŸ“ž Support

### Besoin d'Aide ?

**Contact CodeWave :**

- ðŸ“§ Email : mgncodewave18@gmail.com
- ðŸ“± WhatsApp : +241 74 67 67 41
- ðŸŒ Site : https://m-g-n-code-wave.vercel.app/

### Ressources Utiles

**Apprentissage :**

- ðŸ“š [MDN Web Docs](https://developer.mozilla.org/) - Documentation HTML/CSS/JS
- ðŸŽ“ [FreeCodeCamp](https://www.freecodecamp.org/) - Cours gratuits
- ðŸŽ¥ [YouTube - Traversy Media](https://www.youtube.com/@TraversyMedia) - Tutoriels

**Outils :**

- ðŸŽ¨ [Figma](https://www.figma.com/) - Design
- ðŸ–¼ï¸ [TinyPNG](https://tinypng.com/) - Compression images
- âš¡ [PageSpeed Insights](https://pagespeed.web.dev/) - Test performance
- ðŸ” [Google Search Console](https://search.google.com/search-console) - SEO

---

## ðŸ“„ Licence

Â© 2025 M.G.N CodeWave. Tous droits rÃ©servÃ©s.

Ce projet est la propriÃ©tÃ© de CodeWave. Toute reproduction ou utilisation commerciale sans autorisation est interdite.

---

## ðŸŽ‰ CrÃ©dits

**DÃ©veloppÃ© par :** M.G.N CodeWave  
**Localisation :** Libreville, Gabon ðŸ‡¬ðŸ‡¦  
**AnnÃ©e :** 2025

---

**Bon dÃ©veloppement ! ðŸš€**

Si vous avez des questions, n'hÃ©sitez pas Ã  nous contacter sur WhatsApp : **+241 74 67 67 41**

