
document.addEventListener("DOMContentLoaded", function () {

  const nomInput = document.getElementById("nomEleve");
  const prenomInput = document.getElementById("prenomEleve");
  const classeInput = document.getElementById("classeEleve");
  const boutonAjouter = document.getElementById("ajouterEleve");
  const listeEleves = document.getElementById("listeEleves");
const dateNaissanceInput = document.getElementById("dateNaissance");
const parentInput = document.getElementById("parentEleve");
const telephoneInput = document.getElementById("telephoneParent");
const adresseInput = document.getElementById("adresseEleve");
const observationsInput = document.getElementById("observationsEleve");
  let eleves = JSON.parse(
    localStorage.getItem("mouatarif_eleves") || "[]"
  );

  function afficherEleves() {
    listeEleves.innerHTML = "";

    eleves.forEach((eleve, index) => {
      const ligne = document.createElement("tr");

      [eleve.nom, eleve.prenom, eleve.classe].forEach(texte => {
        const cellule = document.createElement("td");
        cellule.textContent = texte;
        ligne.appendChild(cellule);
      });

      const action = document.createElement("td");
      const supprimer = document.createElement("button");

      supprimer.textContent = "Supprimer";
      supprimer.className = "btn";
      supprimer.style.background = "#d9534f";
      supprimer.style.color = "white";

      supprimer.addEventListener("click", function () {
        if (confirm("Voulez-vous supprimer cet élève ?")) {
          eleves.splice(index, 1);
          sauvegarderEleves();
        }
      });

      action.appendChild(supprimer);
      ligne.appendChild(action);
      listeEleves.appendChild(ligne);
    });

    mettreAJourStatistiques();
  }

  function sauvegarderEleves() {
    localStorage.setItem(
      "mouatarif_eleves",
      JSON.stringify(eleves)
    );
    afficherEleves();
  }

  function mettreAJourStatistiques() {
    const cartes = document.querySelectorAll(".cards .card");

    if (cartes.length >= 2) {
      const nombreClasses = new Set(
        eleves.map(eleve => eleve.classe)
      ).size;

      cartes[0].querySelector("h2").textContent = eleves.length;
      cartes[1].querySelector("h2").textContent = nombreClasses;
    }
  }

  if (boutonAjouter) {
    boutonAjouter.addEventListener("click", function () {
      const nom = nomInput.value.trim();
      const prenom = prenomInput.value.trim();
      const classe = classeInput.value;

      if (!nom || !prenom || !classe) {
        alert("Veuillez remplir tous les champs.");
        return;
      }

const dateNaissance = dateNaissanceInput.value;
const parent = parentInput.value.trim();
const telephone = telephoneInput.value.trim();
const adresse = adresseInput.value.trim();
const observations = observationsInput.value.trim();

eleves.push({
  nom,
  prenom,
  classe,
  dateNaissance,
  parent,
  telephone,
  adresse,
  observations
});

      sauvegarderEleves();

      nomInput.value = "";
      prenomInput.value = "";
      classeInput.value = "";

      alert("Élève ajouté avec succès !");
    });
  }

  afficherEleves();

});

document.addEventListener("DOMContentLoaded", function () {

  const selectEleve = document.getElementById("eleveNote");
  const selectMatiere = document.getElementById("matiereNote");
  const inputNote = document.getElementById("noteEleve");
  const boutonNote = document.getElementById("ajouterNote");
  const listeNotes = document.getElementById("listeNotes");

  if (!selectEleve || !boutonNote) return;

  let eleves = JSON.parse(
    localStorage.getItem("mouatarif_eleves") || "[]"
  );

  let notes = JSON.parse(
    localStorage.getItem("mouatarif_notes") || "[]"
  );

  function afficherListeEleves() {
    selectEleve.innerHTML = '<option value="">Choisir un élève</option>';

    eleves.forEach((eleve, index) => {
      const option = document.createElement("option");
      option.value = index;
      option.textContent = eleve.nom + " " + eleve.prenom + " - " + eleve.classe;
      selectEleve.appendChild(option);
    });
  }

  function afficherNotes() {
    listeNotes.innerHTML = "";

    notes.forEach(note => {
      const ligne = document.createElement("tr");

      [note.eleve, note.matiere, note.valeur + "/20"].forEach(texte => {
        const cellule = document.createElement("td");
        cellule.textContent = texte;
        ligne.appendChild(cellule);
      });

      listeNotes.appendChild(ligne);
    });
  }

  boutonNote.addEventListener("click", function () {
    const index = selectEleve.value;
    const matiere = selectMatiere.value;
    const valeur = Number(inputNote.value);

    if (index === "" || inputNote.value === "" ||
        !Number.isFinite(valeur) || valeur < 0 || valeur > 20) {
      alert("Veuillez sélectionner un élève et saisir une note entre 0 et 20.");
      return;
    }

    const eleve = eleves[index];

    notes.push({
      eleve: eleve.nom + " " + eleve.prenom,
      matiere: matiere,
      valeur: valeur
    });

    localStorage.setItem("mouatarif_notes", JSON.stringify(notes));

    afficherNotes();
    inputNote.value = "";

    alert("Note enregistrée avec succès !");
  });

  afficherListeEleves();
  afficherNotes();

});

document.addEventListener("DOMContentLoaded", function () {

  const selectEleve = document.getElementById("eleveRemarque");
  const dateInput = document.getElementById("dateRemarque");
  const typeInput = document.getElementById("typeRemarque");
  const texteInput = document.getElementById("texteRemarque");
  const bouton = document.getElementById("ajouterRemarque");
  const liste = document.getElementById("listeRemarques");

  if (!selectEleve || !bouton || !liste) return;
const eleves = JSON.parse(
  localStorage.getItem("mouatarif_eleves") || "[]"
);
  const eleves = JSON.parse(
    localStorage.getItem("mouatarif_eleves") || "[]"
  );

  let remarques = JSON.parse(
    localStorage.getItem("mouatarif_remarques") || "[]"
  );

  dateInput.value = new Date().toLocaleDateString("en-CA");

  function chargerEleves() {
    selectEleve.innerHTML =
      '<option value="">Choisir un élève</option>';

    eleves.forEach((eleve, index) => {
      const option = document.createElement("option");
      option.value = index;
      option.textContent =
        eleve.nom + " " + eleve.prenom + " - " + eleve.classe;

      selectEleve.appendChild(option);
    });
  }

  function afficherRemarques() {
    liste.innerHTML = "";

    remarques.forEach(remarque => {
      const ligne = document.createElement("tr");

      [
        remarque.date,
        remarque.eleve,
        remarque.type,
        remarque.texte
      ].forEach(contenu => {
        const cellule = document.createElement("td");
        cellule.textContent = contenu;
        ligne.appendChild(cellule);
      });

      liste.appendChild(ligne);
    });
  }

  bouton.addEventListener("click", function () {
    const index = selectEleve.value;
    const date = dateInput.value;
    const type = typeInput.value;
    const texte = texteInput.value.trim();

    if (index === "" || !date || !texte) {
      alert("Veuillez remplir tous les champs.");
      return;
    }

    const eleve = eleves[index];

    remarques.push({
      date: date,
      eleve: eleve.nom + " " + eleve.prenom,
      type: type,
      texte: texte
    });

    localStorage.setItem(
      "mouatarif_remarques",
      JSON.stringify(remarques)
    );

    afficherRemarques();
    texteInput.value = "";

    alert("Remarque enregistrée avec succès !");
  });

  chargerEleves();
  afficherRemarques();

});

document.addEventListener("DOMContentLoaded", function () {

  const selectEleve = document.getElementById("eleveAbsence");
  const dateInput = document.getElementById("dateAbsence");
  const typeInput = document.getElementById("typeAbsence");
  const dureeInput = document.getElementById("dureeAbsence");
  const justificationInput = document.getElementById("justificationAbsence");
  const motifInput = document.getElementById("motifAbsence");
  const bouton = document.getElementById("ajouterAbsence");
  const liste = document.getElementById("listeAbsences");

  if (!selectEleve || !bouton || !liste) return;

  const eleves = JSON.parse(
    localStorage.getItem("mouatarif_eleves") || "[]"
  );

  let absences = JSON.parse(
    localStorage.getItem("mouatarif_absences") || "[]"
  );

  dateInput.value = new Date().toLocaleDateString("en-CA");

  function chargerEleves() {
    selectEleve.innerHTML =
      '<option value="">Choisir un élève</option>';

    eleves.forEach((eleve, index) => {
      const option = document.createElement("option");
      option.value = index;
      option.textContent =
        eleve.nom + " " + eleve.prenom + " - " + eleve.classe;

      selectEleve.appendChild(option);
    });
  }

  function afficherAbsences() {
    liste.innerHTML = "";

    absences.forEach(absence => {
      const ligne = document.createElement("tr");

      [
        absence.date,
        absence.eleve,
        absence.type,
        absence.duree + " h",
        absence.justification,
        absence.motif
      ].forEach(contenu => {
        const cellule = document.createElement("td");
        cellule.textContent = contenu;
        ligne.appendChild(cellule);
      });

      liste.appendChild(ligne);
    });
  }

  bouton.addEventListener("click", function () {

    const index = selectEleve.value;
    const date = dateInput.value;
    const type = typeInput.value;
    const duree = Number(dureeInput.value);
    const justification = justificationInput.value;
    const motif = motifInput.value.trim();

    if (
      index === "" ||
      !date ||
      dureeInput.value === "" ||
      !Number.isFinite(duree) ||
      duree <= 0
    ) {
      alert("Veuillez sélectionner un élève et saisir une durée valide.");
      return;
    }

    const eleve = eleves[index];

    absences.push({
      date: date,
      eleve: eleve.nom + " " + eleve.prenom,
      type: type,
      duree: duree,
      justification: justification,
      motif: motif
    });

    localStorage.setItem(
      "mouatarif_absences",
      JSON.stringify(absences)
    );

    afficherAbsences();

    dureeInput.value = "";
    motifInput.value = "";

    alert("Enregistrement effectué avec succès !");
  });

  chargerEleves();
  afficherAbsences();

});
