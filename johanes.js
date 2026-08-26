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

// ===== SWITCH 3 POSITIONS =====
const switchOptions = document.querySelectorAll("[data-switch]");
const switchCurseur = document.querySelector("[data-switch-curseur]");
const btnContact = document.querySelector("[data-btn-contact]");
const badgeIcon = document.getElementById("badge-icon");
const badgeMethode = document.getElementById("badge-methode");
const badgeValeur = document.getElementById("badge-valeur");

const INFOS = {
  whatsapp: {
    icone: "./images/telephone.png",
    methode: "WhatsApp",
    valeur: "+261 38 75 879 59",
    url: "https://wa.me/261387587959",
  },
  gmail: {
    icone: "./images/gmail.png",
    methode: "Gmail",
    valeur: "johanesfalitiana@gmail.com",
    url: "mailto:falitianajohanes@gmail.com",
  },
  linkedin: {
    icone: "./images/linkedin.png",
    methode: "LinkedIn",
    valeur: "Johanès Falitiana",
    url: "https://www.linkedin.com/in/johan%C3%A8s-falitiana-335456431",
  },
};

let methodeActuelle = "whatsapp";

function mettreAJourSwitch(methode) {
  switchOptions.forEach(function (opt) {
    opt.classList.remove("actif");
    if (opt.dataset.switch === methode) {
      opt.classList.add("actif");
    }
  });

  switchCurseur.classList.remove(
    "position-gauche",
    "position-centre",
    "position-droite",
  );
  switchCurseur.classList.remove(
    "methode-whatsapp",
    "methode-gmail",
    "methode-linkedin",
  );

  if (methode === "gmail") {
    switchCurseur.classList.add("position-gauche");
    switchCurseur.classList.add("methode-gmail");
  } else if (methode === "whatsapp") {
    switchCurseur.classList.add("position-centre");
    switchCurseur.classList.add("methode-whatsapp");
  } else if (methode === "linkedin") {
    switchCurseur.classList.add("position-droite");
    switchCurseur.classList.add("methode-linkedin");
  }

  methodeActuelle = methode;

  if (btnContact) {
    btnContact.classList.remove(
      "methode-whatsapp",
      "methode-gmail",
      "methode-linkedin",
    );
    btnContact.classList.add("methode-" + methode);
  }

  const info = INFOS[methode];
  if (badgeIcon) badgeIcon.src = info.icone;
  if (badgeMethode) badgeMethode.textContent = info.methode;
  if (badgeValeur) badgeValeur.textContent = info.valeur;
}

switchOptions.forEach(function (option) {
  option.addEventListener("click", function () {
    const methode = this.dataset.switch;
    mettreAJourSwitch(methode);
  });
});

mettreAJourSwitch("whatsapp");

// ===== BOUTON CONTACT =====
if (btnContact) {
  btnContact.addEventListener("click", function () {
    const info = INFOS[methodeActuelle];
    if (info) {
      window.open(info.url, "_blank");
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
