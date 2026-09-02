"use strict";

const basculerClasse = function (e) {
  e.classList.toggle("actif");
};

const barreLaterale = document.querySelector("[data-barre]");
const boutonInfo = document.querySelector("[data-btn-info]");
if (boutonInfo) {
  boutonInfo.addEventListener("click", function () {
    basculerClasse(barreLaterale);
  });
}

const PROJETS_DATA = [
  {
    id: "ramp",
    nom: "RAMP",
    categorie: "WEB",
    description:
      "Outil web pour générer des numéros au hasard au format Malagasy, copier des caractères UTF-8 et sélecteur de couleur.",
    technologies: "HTML5, CSS3, JavaScript",
    vignette: "iconramp.png",
    prefixe: "ramp",
    lien: "https://johanes-mg.github.io/Outils-Ramp/ramp.html",
  },
  {
    id: "jojohexpress",
    nom: "JojohExpress",
    categorie: "WEB",
    description:
      "Site web de réservation et de gestion de colis, d'ajouter, modifier ou effacer des conducteurs et les véhicules de transport.",
    technologies: "HTML5, CSS3, JS, PHP",
    vignette: "iconjojohexpress.png",
    prefixe: "jojohexpress",
    lien: "https://github.com/Johanes-mg/JojohExpress",
  },
  {
    id: "schoolar",
    nom: "Schoolar",
    categorie: "WEB",
    description:
      "Plateforme web qui permet de faire la gestion des enseignants d'un établissement scolaire avec graphiques interactifs.",
    technologies: "React, PHP, Vue.js",
    vignette: "iconschoolar.png",
    prefixe: "schoolar",
    lien: "https://github.com/Johanes-mg/Schoolar",
  },
  {
    id: "copyboost",
    nom: "CopyBoost",
    categorie: "DESKTOP",
    description:
      "Utilitaire de copie rapide des fichiers basé sur le programme Robocopy.",
    technologies: "C#, .NET 8.0, Robocopy",
    vignette: "iconcopyboost.png",
    prefixe: "copyboostcsharp",
    lien: "https://github.com/Johanes-mg/CopyBoost",
  },
  {
    id: "jbacc",
    nom: "JBacc",
    categorie: "MOBILE",
    description:
      "Application mobile d'aide à la préparation du baccalauréat avec sujets et exercices intégrés.",
    technologies: "Kotlin, Android",
    vignette: "iconjbacc.png",
    prefixe: "jbacckotlin",
    lien: "https://github.com/Johanes-mg/JBacc",
  },
  {
    id: "jnotes",
    nom: "JNotes",
    categorie: "MOBILE",
    description: "Application de calcul de notes avec leurs catégories.",
    technologies: "Kotlin, Android",
    vignette: "iconjnotes.png",
    prefixe: "jnoteskotlin",
    lien: "https://github.com/Johanes-mg/JNotes",
  },
  {
    id: "jhotel",
    nom: "JHotel",
    categorie: "MOBILE",
    description:
      "Application de gestion hôtelière : réservation des chambres, gestion des clients et facturation.",
    technologies: "Kotlin, Android",
    vignette: "iconjhotel.png",
    prefixe: "jhotelkotlin",
    lien: "https://github.com/Johanes-mg/JHotel",
  },
];

const listeProjets = document.getElementById("liste-projets");

function genererProjetHTML(projet) {
  return `
    <li class="item-projet actif" data-filtre-item data-categorie="${projet.categorie}" data-projet-id="${projet.id}">
      <a href="#" onclick="ouvrirLightboxProjet('${projet.id}'); return false;" aria-label="Voir le projet ${projet.nom}">
        <figure class="image-projet">
          <div class="icone-oeil">
            <img src="./images/search.png" width="24" height="24" loading="lazy" />
          </div>
          <img src="./images/projet/${projet.vignette}" loading="lazy" width="640" height="360" />
        </figure>
        <h3 class="titre-projet">${projet.nom}</h3>
        <p class="categorie-projet">${projet.categorie} - ${projet.technologies}</p>
      </a>
      <div class="description-projet">
        <p>${projet.description}</p>
      </div>
      <div class="info-projet">
        <a href="${projet.lien}" target="_blank" rel="noopener noreferrer" class="lien-projet">Lien</a>
      </div>
    </li>
  `;
}

PROJETS_DATA.forEach(function (projet) {
  listeProjets.innerHTML += genererProjetHTML(projet);
});

let lightboxImages = [];
let lightboxIndex = 0;

function ouvrirLightboxProjet(projectId) {
  const projet = PROJETS_DATA.find((p) => p.id === projectId);
  if (!projet) return;

  const overlay = document.querySelector(".lightbox-overlay");
  const image = document.getElementById("lightbox-image");
  const titreEl = document.getElementById("lightbox-titre");
  const counterEl = document.getElementById("lightbox-counter");

  if (!overlay || !image) return;

  const images = [];
  for (let i = 1; i <= 20; i++) {
    images.push(`./images/projet/${projet.prefixe}_${i}.png`);
  }
  lightboxImages = images;
  lightboxIndex = 0;

  image.src = `./images/projet/${projet.vignette}`;
  if (titreEl) titreEl.textContent = projet.nom;
  if (counterEl) counterEl.textContent = `1 / ${lightboxImages.length}`;

  overlay.classList.add("actif");
  document.body.style.overflow = "hidden";

  trouverPremiereImage(images, 0, function (premiereImage) {
    if (premiereImage) {
      image.src = premiereImage;
    }
  });
}

function trouverPremiereImage(images, index, callback) {
  if (index >= images.length) {
    callback(null);
    return;
  }

  const img = new Image();
  img.onload = function () {
    callback(images[index]);
  };
  img.onerror = function () {
    trouverPremiereImage(images, index + 1, callback);
  };
  img.src = images[index];
}

function fermerLightbox() {
  const overlay = document.querySelector(".lightbox-overlay");
  if (!overlay) return;
  overlay.classList.remove("actif");
  document.body.style.overflow = "";
  lightboxImages = [];
  lightboxIndex = 0;
}

function navLightbox(direction) {
  if (lightboxImages.length === 0) return;

  const image = document.getElementById("lightbox-image");
  const counterEl = document.getElementById("lightbox-counter");

  if (!image) return;

  lightboxIndex += direction;

  if (lightboxIndex < 0) {
    lightboxIndex = lightboxImages.length - 1;
  } else if (lightboxIndex >= lightboxImages.length) {
    lightboxIndex = 0;
  }

  const imgPath = lightboxImages[lightboxIndex];
  const testImg = new Image();
  testImg.onload = function () {
    image.src = imgPath;
    if (counterEl)
      counterEl.textContent = `${lightboxIndex + 1} / ${lightboxImages.length}`;
  };
  testImg.onerror = function () {
    navLightbox(direction > 0 ? 1 : -1);
  };
  testImg.src = imgPath;
}

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    fermerLightbox();
  } else if (
    e.key === "ArrowLeft" &&
    document.querySelector(".lightbox-overlay.actif")
  ) {
    navLightbox(-1);
  } else if (
    e.key === "ArrowRight" &&
    document.querySelector(".lightbox-overlay.actif")
  ) {
    navLightbox(1);
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

  if (methode === "gmail") {
    switchCurseur.classList.add("position-gauche");
  } else if (methode === "whatsapp") {
    switchCurseur.classList.add("position-centre");
  } else if (methode === "linkedin") {
    switchCurseur.classList.add("position-droite");
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

if (btnContact) {
  btnContact.addEventListener("click", function () {
    const info = INFOS[methodeActuelle];
    if (info) {
      window.open(info.url, "_blank");
    }
  });
}

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

const NOM_FICHIER_CV = "RANAIVOJAONA Falitiana Johanes.pdf";

function telechargerCV() {
  const lien = document.createElement("a");
  lien.href = NOM_FICHIER_CV;
  lien.download = "CV_Johanes_Falitiana.pdf";
  document.body.appendChild(lien);
  lien.click();
  document.body.removeChild(lien);
}
