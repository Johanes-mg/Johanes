"use strict";

// Fonction utilitaire
const basculerClasse = function (e) {
  e.classList.toggle("actif");
};

// Barre latérale
const barreLaterale = document.querySelector("[data-barre]");
const boutonInfo = document.querySelector("[data-btn-info]");
if (boutonInfo) {
  boutonInfo.addEventListener("click", function () {
    basculerClasse(barreLaterale);
  });
}

// Filtres projets
const selectFiltre = document.querySelector("[data-select]");
const itemsSelect = document.querySelectorAll("[data-select-item]");
const valeurSelect = document.querySelector("[data-select-valeur]");
const boutonsFiltre = document.querySelectorAll("[data-btn-filtre]");
const itemsProjets = document.querySelectorAll("[data-filtre-item]");

if (selectFiltre) {
  selectFiltre.addEventListener("click", function () {
    basculerClasse(this);
    const expanded =
      this.getAttribute("aria-expanded") === "true" ? "false" : "true";
    this.setAttribute("aria-expanded", expanded);
  });
}

itemsSelect.forEach(function (item) {
  item.addEventListener("click", function () {
    const valeur = this.textContent.toLowerCase();
    valeurSelect.textContent = this.textContent;
    basculerClasse(selectFiltre);
    if (selectFiltre) {
      selectFiltre.setAttribute("aria-expanded", "false");
    }
    filtrerProjets(valeur);
  });
});

const filtrerProjets = function (categorie) {
  itemsProjets.forEach(function (projet) {
    if (categorie === "tous" || categorie === projet.dataset.categorie) {
      projet.classList.add("actif");
    } else {
      projet.classList.remove("actif");
    }
  });
};

let dernierBoutonClique = boutonsFiltre[0];
boutonsFiltre.forEach(function (btn) {
  btn.addEventListener("click", function () {
    const valeur = this.textContent.toLowerCase();
    valeurSelect.textContent = this.textContent;
    filtrerProjets(valeur);
    dernierBoutonClique.classList.remove("actif");
    dernierBoutonClique.removeAttribute("aria-selected");
    this.classList.add("actif");
    this.setAttribute("aria-selected", "true");
    dernierBoutonClique = this;
  });
});

// Formulaire de contact
const formulaire = document.querySelector("[data-formulaire]");
const champsFormulaire = document.querySelectorAll("[data-champ]");
const boutonEnvoi = document.querySelector("[data-btn-formulaire]");

champsFormulaire.forEach(function (champ) {
  champ.addEventListener("input", function () {
    if (formulaire && formulaire.checkValidity()) {
      boutonEnvoi.removeAttribute("disabled");
    } else if (boutonEnvoi) {
      boutonEnvoi.setAttribute("disabled", "");
    }
  });
});

if (formulaire) {
  formulaire.addEventListener("submit", function (e) {
    e.preventDefault();

    const nom =
      this.querySelector('input[name="nom"]').value.trim() || "Visiteur";
    const message = this.querySelector('textarea[name="message"]').value.trim();

    if (message) {
      const numero = "261387587959";
      const texte = `Bonjour, je suis ${nom}.%0A%0A${message}`;
      const whatsappLink = `https://wa.me/${numero}?text=${texte}`;

      window.open(whatsappLink, "_blank");

      this.reset();
      boutonEnvoi.setAttribute("disabled", "");
    }
  });
}

// Navigation pages
const liensNavigation = document.querySelectorAll("[data-page-nav]");
const pages = document.querySelectorAll("[data-page]");

liensNavigation.forEach(function (lien) {
  lien.addEventListener("click", function () {
    // Récupérer le nom de la page cliquée
    const nomPage = this.textContent.toLowerCase().trim();

    // Parcourir toutes les pages
    pages.forEach(function (page) {
      // Récupérer le nom de la page depuis data-page
      const nomPageActuelle = page.dataset.page.toLowerCase().trim();

      // Si c'est la page cliquée, on l'affiche
      if (nomPage === nomPageActuelle) {
        page.classList.add("actif");
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        // Sinon on la cache
        page.classList.remove("actif");
      }
    });

    // Mettre à jour les boutons de navigation
    liensNavigation.forEach(function (nav) {
      nav.classList.remove("actif");
      nav.removeAttribute("aria-current");
    });
    this.classList.add("actif");
    this.setAttribute("aria-current", "page");

    // Fermer la barre latérale sur mobile
    if (window.innerWidth < 1024 && barreLaterale) {
      barreLaterale.classList.remove("actif");
    }
  });
});

// Bouton thème
let themeSombre = true;

function basculerTheme() {
  const body = document.body;
  const themeIcon = document.getElementById("theme-icon");

  if (themeSombre) {
    body.classList.add("theme-clair");
    if (themeIcon) {
      themeIcon.src = "./images/icone-lune.png";
      themeIcon.alt = "Thème sombre";
    }
    themeSombre = false;
  } else {
    body.classList.remove("theme-clair");
    if (themeIcon) {
      themeIcon.src = "./images/icone-soleil.png";
      themeIcon.alt = "Thème clair";
    }
    themeSombre = true;
  }

  try {
    localStorage.setItem("theme", themeSombre ? "sombre" : "clair");
  } catch (error) {
    console.warn("LocalStorage non disponible");
  }
}

// Charger le thème sauvegardé
try {
  const themeSauvegarde = localStorage.getItem("theme");
  if (themeSauvegarde === "clair") {
    basculerTheme();
  }
} catch (error) {
  console.warn("LocalStorage non disponible");
}

// Lightbox
function ouvrirLightbox(src, titre) {
  const overlay = document.querySelector(".lightbox-overlay");
  const image = document.getElementById("lightbox-image");
  const titreEl = document.getElementById("lightbox-titre");

  if (!overlay || !image) return;

  image.src = src;
  image.alt = titre || "Agrandissement";
  if (titreEl) titreEl.textContent = titre || "";

  overlay.classList.add("actif");
  document.body.style.overflow = "hidden";

  // Focus sur la lightbox pour l'accessibilité
  setTimeout(() => overlay.focus(), 100);
}

function fermerLightbox() {
  const overlay = document.querySelector(".lightbox-overlay");
  if (!overlay) return;
  overlay.classList.remove("actif");
  document.body.style.overflow = "";
}

// Fermer avec la touche Échap
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    fermerLightbox();
  }
});

// Fermer avec clic sur l'overlay
const overlay = document.querySelector(".lightbox-overlay");
if (overlay) {
  overlay.addEventListener("click", function (e) {
    if (e.target === this) {
      fermerLightbox();
    }
  });
}
