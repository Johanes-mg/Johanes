"use strict";

const basculerClasse = function (e) {
  e.classList.toggle("actif");
};

// ===== BARRE LATÉRALE =====
const barreLaterale = document.querySelector("[data-barre]");
const boutonInfo = document.querySelector("[data-btn-info]");
if (boutonInfo) {
  boutonInfo.addEventListener("click", function () {
    basculerClasse(barreLaterale);
  });
}

// ===== FILTRES PROJETS =====
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

const filtrerProjets = function (categorie) {
  itemsProjets.forEach(function (projet) {
    const categorieProjet = projet.dataset.categorie;
    if (categorie === "tous" || categorie === categorieProjet) {
      projet.classList.add("actif");
    } else {
      projet.classList.remove("actif");
    }
  });
};

itemsSelect.forEach(function (item) {
  item.addEventListener("click", function () {
    const categorie = this.dataset.categorie || this.textContent.toLowerCase();
    valeurSelect.textContent = this.textContent;
    basculerClasse(selectFiltre);
    if (selectFiltre) {
      selectFiltre.setAttribute("aria-expanded", "false");
    }
    filtrerProjets(categorie);

    boutonsFiltre.forEach(function (btn) {
      btn.classList.remove("actif");
      btn.setAttribute("aria-selected", "false");
      const btnCategorie =
        btn.dataset.categorie || btn.textContent.toLowerCase();
      if (btnCategorie === categorie) {
        btn.classList.add("actif");
        btn.setAttribute("aria-selected", "true");
      }
    });
  });
});

let dernierBoutonClique = boutonsFiltre[0];
boutonsFiltre.forEach(function (btn) {
  btn.addEventListener("click", function () {
    const categorie = this.dataset.categorie || this.textContent.toLowerCase();
    valeurSelect.textContent = this.textContent;
    filtrerProjets(categorie);
    dernierBoutonClique.classList.remove("actif");
    dernierBoutonClique.removeAttribute("aria-selected");
    this.classList.add("actif");
    this.setAttribute("aria-selected", "true");
    dernierBoutonClique = this;
  });
});

// ===== WHATSAPP =====
function ouvrirWhatsApp(numero, texte) {
  const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  const messageEncoded = texte ? encodeURIComponent(texte) : "";
  const messageParam = messageEncoded ? `?text=${messageEncoded}` : "";

  if (isMobile && /Android/i.test(navigator.userAgent)) {
    const intent = `intent://send/${numero}${messageParam ? "#Intent;action=android.intent.action.VIEW;scheme=https;package=com.whatsapp;S.browser_fallback_url=https%3A%2F%2Fwa.me%2F${numero}${messageParam};end" : "#Intent;action=android.intent.action.VIEW;scheme=https;package=com.whatsapp;end"}`;
    const win = window.open(intent, "_system");
    setTimeout(function () {
      if (!win || win.closed || typeof win.closed === "undefined") {
        window.location.href = `https://wa.me/${numero}${messageParam}`;
      }
    }, 800);
  } else if (isMobile && /iPhone|iPad|iPod/i.test(navigator.userAgent)) {
    window.location.href = `https://wa.me/${numero}${messageParam}`;
  } else {
    window.open(`https://wa.me/${numero}${messageParam}`, "_blank");
  }
}

// ===== FORMULAIRE =====
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
      const texte = `Bonjour, je suis ${nom}.\n\n${message}`;
      ouvrirWhatsApp(numero, texte);
      this.reset();
      boutonEnvoi.setAttribute("disabled", "");
    }
  });
}

// ===== NAVIGATION =====
const liensNavigation = document.querySelectorAll("[data-page-nav]");
const pages = document.querySelectorAll("[data-page]");

liensNavigation.forEach(function (lien) {
  lien.addEventListener("click", function () {
    const nomPage = this.textContent.toLowerCase().trim();
    pages.forEach(function (page) {
      const nomPageActuelle = page.dataset.page.toLowerCase().trim();
      if (nomPage === nomPageActuelle) {
        page.classList.add("actif");
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        page.classList.remove("actif");
      }
    });
    liensNavigation.forEach(function (nav) {
      nav.classList.remove("actif");
      nav.removeAttribute("aria-current");
    });
    this.classList.add("actif");
    this.setAttribute("aria-current", "page");
    if (window.innerWidth < 1024 && barreLaterale) {
      barreLaterale.classList.remove("actif");
    }
  });
});

// ===== THEME =====
let themeSombre = true;

function basculerTheme() {
  const body = document.body;
  const themeIcon = document.getElementById("theme-icon");
  if (themeSombre) {
    body.classList.add("theme-clair");
    if (themeIcon) {
      themeIcon.src = "./images/icone-lune.png";
    }
    themeSombre = false;
  } else {
    body.classList.remove("theme-clair");
    if (themeIcon) {
      themeIcon.src = "./images/icone-soleil.png";
    }
    themeSombre = true;
  }
  try {
    localStorage.setItem("theme", themeSombre ? "sombre" : "clair");
  } catch (error) {
    console.warn("LocalStorage non disponible");
  }
}

try {
  const themeSauvegarde = localStorage.getItem("theme");
  if (themeSauvegarde === "clair") {
    basculerTheme();
  }
} catch (error) {
  console.warn("LocalStorage non disponible");
}

// ===== LIGHTBOX =====
function ouvrirLightbox(src, titre) {
  const overlay = document.querySelector(".lightbox-overlay");
  const image = document.getElementById("lightbox-image");
  const titreEl = document.getElementById("lightbox-titre");
  if (!overlay || !image) return;
  image.src = src;
  if (titreEl) titreEl.textContent = titre || "";
  overlay.classList.add("actif");
  document.body.style.overflow = "hidden";
  setTimeout(function () {
    overlay.focus();
  }, 100);
}

function fermerLightbox() {
  const overlay = document.querySelector(".lightbox-overlay");
  if (!overlay) return;
  overlay.classList.remove("actif");
  document.body.style.overflow = "";
}

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    fermerLightbox();
  }
});

const overlay = document.querySelector(".lightbox-overlay");
if (overlay) {
  overlay.addEventListener("click", function (e) {
    if (e.target === this) {
      fermerLightbox();
    }
  });
}

// ===== CV =====
const NOM_FICHIER_CV = "RANAIVOJAONA Falitiana Johanes.pdf";

function ouvrirCV() {
  window.open(NOM_FICHIER_CV, "_blank");
}

function telechargerCV() {
  const lien = document.createElement("a");
  lien.href = NOM_FICHIER_CV;
  lien.download = "CV_Johanes_Falitiana.pdf";
  document.body.appendChild(lien);
  lien.click();
  document.body.removeChild(lien);
}
