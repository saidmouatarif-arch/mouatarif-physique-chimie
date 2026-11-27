
document.addEventListener("DOMContentLoaded", function () {

  const nomInput = document.getElementById("nomEleve");
  const prenomInput = document.getElementById("prenomEleve");
  const classeInput = document.getElementById("classeEleve");
  const boutonAjouter = document.getElementById("ajouterEleve");
  const listeEleves = document.getElementById("listeEleves");

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

      eleves.push({ nom, prenom, classe });

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
