// Source de vérité des jetons de la charte M.G.N CodeWave.
// Après toute modification ici ou l'ajout de classes dans le HTML/JS : `npm run build:css`.
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html", "./assets/js/**/*.js"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#004AAD",
        "primary-dark": "#003A8A",
        accent: "#0062E6",
        dark: "#1E293B",
        light: "#F4F3F3",
        "codewave-blue": "#004AAD",
        "blue-bright": "#0062E6",
        graphite: "#545454",
        "silver-wave": "#B4B4B4",
        "cloud-white": "#F4F3F3",
        "deep-ocean": "#1E293B",
        "card-dark": "#263548",
        // Les classes blue-500/600 déjà présentes dans le code sont alignées sur la charte.
        blue: { 500: "#0062E6", 600: "#004AAD" },
      },
      fontFamily: {
        display: ["Syne", "sans-serif"],
        body: ["Space Grotesk", "DM Sans", "system-ui", "sans-serif"],
      },
      // Le code emploie font-500 à font-800 ; charte : titres Syne 700 / 800.
      fontWeight: { 400: "400", 500: "500", 600: "600", 700: "700", 800: "800" },
    },
  },
};
