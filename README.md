# CodeWave Website

Site vitrine statique de CodeWave.

## Apercu

Ce projet contient plusieurs pages HTML reliees entre elles (`index`, `services`, `portfolio`, `contact`, etc.) avec des assets centralises dans le dossier `assets/`.

## Structure

- `index.html` : page d'accueil
- `about.html`, `services.html`, `portfolio.html`, `contact.html` : pages principales
- `blog.html`, `careers.html`, `partnership.html`, `social.html` : pages secondaires
- `privacy.html`, `legal.html`, `cgv.html` : pages legales
- `assets/css/base.css` : styles globaux
- `assets/js/` : scripts (core, pages, data, config)
- `assets/images/` : images du site
- `assets/icons/` : icones

## Lancer le site en local

Comme il s'agit d'un site statique, vous pouvez :

1. Ouvrir directement `index.html` dans un navigateur.
2. Ou utiliser une extension de serveur local (ex: Five Server dans VS Code) pour profiter du rechargement automatique.

## CSS (Tailwind compilé)

Tailwind n'est plus chargé depuis le CDN : il est compilé dans `assets/css/tailwind.min.css`, qui est versionné pour que GitHub Pages reste un simple `git push`.

```bash
npm install          # une seule fois
npm run build:css    # à relancer après tout ajout de classe Tailwind dans le HTML ou le JS
npm run watch:css    # recompilation automatique pendant le développement
```

Les jetons de la charte (couleurs, polices) sont définis dans `tailwind.config.js`. Une classe Tailwind absente du CSS compilé n'a aucun effet : pensez à recompiler avant de pousser.

## Données et tarifs

- Prix des prestations : `pricingGrid` en tête de `assets/js/data/content.js`.
- Formations, abonnements, FAQ de l'Academy : `assets/js/data/content-formations.js` (chaque texte en `{ fr, en }`).
- Avant de pousser une modification de ces fichiers :

```bash
npm run check:content   # prix, cohérence des heures, bilinguisme, absence d'anciens tarifs
```

## SEO

- URL de production : `https://ngoubadjambo-richard.github.io/CodeWave/`. Elle figure dans les balises `canonical`, `hreflang`, `og:url`, le JSON-LD, `sitemap.xml` et `robots.txt` ; à remplacer partout en cas de domaine personnalisé.
- Version anglaise : `?lang=en` sur n'importe quelle page.
- Image de partage : `assets/images/codewave-share-1200x630.jpg`, générée depuis le SVG du même nom.

## Technologies

- HTML5
- CSS3
- JavaScript

## Notes

- `site.webmanifest` est inclus pour la configuration web app.
- `sitemap.html` fournit une vue de la structure du site.
