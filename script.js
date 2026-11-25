
/* =====================================
   MOUATARIF - GESTION PEDAGOGIQUE
   Version 1.0
===================================== */

// Données de démonstration
let classes = [
  { id: 1, nom: "TCS" },
  { id: 2, nom: "1BAC SM" },
  { id: 3, nom: "2BAC SM" }
];

let eleves = [];
let devoirs = [];

// Sauvegarde locale des données
function sauvegarder() {
  localStorage.setItem("mouatarif_classes", JSON.stringify(classes));
  localStorage.setItem("mouatarif_eleves", JSON.stringify(eleves));
  localStorage.setItem("mouatarif_devoirs", JSON.stringify(devoirs));
}

// Chargement des données
function charger() {
  const c = localStorage.getItem("mouatarif_classes");
  const e = localStorage.getItem("mouatarif_eleves");
  const d = localStorage.getItem("mouatarif_devoirs");

  if (c) classes = JSON.parse(c);
  if (e) eleves = JSON.parse(e);
  if (d) devoirs = JSON.parse(d);
}

// Ajouter une classe
function ajouterClasse(nom) {
  if (!nom || !nom.trim()) {
    alert("Veuillez saisir le nom de la classe.");
    return;
  }

  const existe = classes.some(
    c => c.nom.toLowerCase() === nom.trim().toLowerCase()
  );

  if (existe) {
    alert("Cette classe existe déjà.");
    return;
  }

  classes.push({
    id: Date.now(),
    nom: nom.trim()
  });

  sauvegarder();
  alert("Classe ajoutée avec succès !");
}

// Ajouter un élève
function ajouterEleve(nom, prenom, classeId) {
  if (!nom.trim() || !prenom.trim() || !classeId) {
    alert("Veuillez remplir tous les champs.");
    return;
  }

  eleves.push({
    id: Date.now(),
    nom: nom.trim(),
    prenom: prenom.trim(),
    classeId: Number(classeId),
    remarques: [],
    absences: [],
    notes: []
  });

  sauvegarder();
  alert("Élève ajouté avec succès !");
}

// Rechercher un élève
function rechercherEleve(texte) {
  const recherche = texte.toLowerCase().trim();

  return eleves.filter(e =>
    (e.nom + " " + e.prenom).toLowerCase().includes(recherche)
  );
}

// Ajouter une remarque
function ajouterRemarque(eleveId, contenu) {
  const eleve = eleves.find(e => e.id === Number(eleveId));

  if (!eleve || !contenu.trim()) return;

  eleve.remarques.push({
    contenu: contenu.trim(),
    date: new Date().toLocaleDateString("fr-FR")
  });

  sauvegarder();
}

// Enregistrer une note
function ajouterNote(eleveId, devoirId, note) {
  const eleve = eleves.find(e => e.id === Number(eleveId));
  const devoir = devoirs.find(d => d.id === Number(devoirId));
  const valeur = Number(note);

  if (!eleve || !devoir || !Number.isFinite(valeur) ||
      valeur < 0 || valeur > devoir.bareme) {
    alert("Vérifiez la note et le barème.");
    return;
  }

  eleve.notes.push({
    devoirId: devoir.id,
    note: valeur
  });

  sauvegarder();
}

// Calculer la moyenne d'un élève
function calculerMoyenne(eleveId) {
  const eleve = eleves.find(e => e.id === Number(eleveId));

  if (!eleve || eleve.notes.length === 0) return 0;

  let total = 0;

  eleve.notes.forEach(n => {
    const devoir = devoirs.find(d => d.id === n.devoirId);

    if (devoir && devoir.bareme > 0) {
      total += (n.note / devoir.bareme) * 20;
    }
  });

  return Number((total / eleve.notes.length).toFixed(2));
}

// Initialisation
charger();

console.log("MOUATARIF : application initialisée.");
console.log("Classes :", classes.length);
console.log("Élèves :", eleves.length);
