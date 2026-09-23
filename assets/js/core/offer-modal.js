// ==================== FICHE DÉTAIL D'UNE OFFRE ====================
// Ouvre la valeur avant le prix : promesse, bénéfices, livrables, délai, garantie, puis le tarif
// en fin de fiche, en petit. Un seul <dialog> réutilisé (modale native : focus piégé, Échap gérée).
// Les prix viennent de `pricingGrid` via priceLabel() : aucune valeur n'est saisie ici.

const OFFER_DIALOG_ID = "offer-dialog";

function offerDialog() {
  let dialog = document.getElementById(OFFER_DIALOG_ID);
  if (dialog) return dialog;
  dialog = document.createElement("dialog");
  dialog.id = OFFER_DIALOG_ID;
  dialog.className = "offer-dialog";
  dialog.setAttribute("aria-labelledby", "offer-dialog-title");
  // Clic sur le fond (hors panneau) : fermeture, comme sur la croix.
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });
  dialog.addEventListener("close", () => {
    document.body.style.overflow = "";
  });
  document.body.appendChild(dialog);
  return dialog;
}

// Message WhatsApp pré-rempli : le visiteur n'a plus qu'à envoyer.
function offerWhatsAppUrl(title, isEn) {
  const message = isEn
    ? `Hello M.G.N CodeWave, I would like a quote for "${title}".`
    : `Bonjour M.G.N CodeWave, je souhaite un devis pour « ${title} ».`;
  return `https://wa.me/24166198918?text=${encodeURIComponent(message)}`;
}

function openOffer(offerId) {
  const offer = serviceOfferById[offerId];
  const item = translations[state.lang].services.items.find((s) => s.offerId === offerId);
  if (!offer || !item) return;
  const isEn = state.lang === "en";
  const lang = state.lang;
  const dialog = offerDialog();

  const list = (entries, icon) =>
    entries
      .map((entry) => `<li>${lineIcon(icon, 16)}<span>${entry}</span></li>`)
      .join("");

  // Tarifs de la grille officielle, en fin de fiche et en petit : le prix arrive après la valeur.
  const prices = offer.priceIds
    .map((id) => {
      const price = findPrice(id);
      return `<div class="offer-price-row"><span>${price.label[lang]}</span><b>${priceLabel(id, lang)}</b></div>`;
    })
    .join("");

  dialog.innerHTML = `
    <article class="offer-panel">
      <header class="offer-head">
        <span class="icon-tile">${lineIcon(offer.iconId, 24)}</span>
        <div class="min-w-0">
          <p class="section-label">${isEn ? "Service" : "Offre"}</p>
          <h2 id="offer-dialog-title" class="font-display font-700">${item.title}</h2>
        </div>
        <button type="button" class="offer-close" onclick="document.getElementById('${OFFER_DIALOG_ID}').close()" aria-label="${isEn ? "Close" : "Fermer"}">${lineIcon("xCircle", 22)}</button>
      </header>

      <div class="offer-body">
        <p class="offer-promise">${offer.promise[lang]}</p>

        <section class="offer-section">
          <h3>${isEn ? "What you gain" : "Ce que vous y gagnez"}</h3>
          <ul class="offer-list">${list(offer.benefits[lang], "checkCircle")}</ul>
        </section>

        <section class="offer-section">
          <h3>${isEn ? "What you receive" : "Ce que vous recevez"}</h3>
          <ul class="offer-list offer-list-plain">${list(offer.deliverables[lang], "file")}</ul>
        </section>

        <section class="offer-section">
          <h3>${isEn ? "Who it is for" : "Pour qui"}</h3>
          <p class="offer-text">${offer.audience[lang]}</p>
        </section>

        <div class="offer-facts">
          <p><span>${lineIcon("clock", 15)} ${isEn ? "Timeline" : "Délai"}</span><b>${offer.timeline[lang]}</b></p>
          <p><span>${lineIcon("shield", 15)} ${isEn ? "Warranty" : "Garantie"}</span><b>${isEn ? "30 days after delivery" : "30 jours après livraison"}</b></p>
          <p><span>${lineIcon("wallet", 15)} ${isEn ? "Payment" : "Paiement"}</span><b>${isEn ? "Airtel & Moov Money, up to 3 instalments" : "Airtel & Moov Money, jusqu'à 3 fois"}</b></p>
        </div>

        <details class="offer-prices">
          <summary>${isEn ? "Indicative prices for this service" : "Tarifs indicatifs de cette offre"}</summary>
          <div class="offer-price-list">${prices}</div>
          <p class="offer-price-note">${isEn ? "Final price set in your free quote, after we have understood your project." : "Le prix définitif est fixé dans votre devis gratuit, une fois votre projet compris."}</p>
        </details>
      </div>

      <footer class="offer-foot">
        <a href="${offerWhatsAppUrl(item.title, isEn)}" target="_blank" rel="noopener noreferrer" class="btn-primary">${isEn ? "Discuss on WhatsApp" : "En parler sur WhatsApp"} ${lineIcon("chat", 16)}</a>
        <button type="button" class="btn-outline" onclick="document.getElementById('${OFFER_DIALOG_ID}').close(); navigate('contact');">${isEn ? "Request a free quote" : "Demander un devis gratuit"}</button>
      </footer>
    </article>`;

  if (typeof dialog.showModal !== "function") {
    // Navigateur sans <dialog> : on renvoie vers la page de contact plutôt que d'afficher une fiche inerte.
    navigate("contact");
    return;
  }
  document.body.style.overflow = "hidden";
  dialog.showModal();
  dialog.querySelector(".offer-close")?.focus();
}
