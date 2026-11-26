
document.addEventListener("DOMContentLoaded", function () {

  const nomInput = document.getElementById("nomEleve");
  const prenomInput = document.getElementById("prenomEleve");
  const classeInput = document.getElementById("classeEleve");
  const boutonAjouter = document.getElementById("ajouterEleve");
  const listeEleves = document.getElementById("listeEleves");

  let eleves = JSON.parse(localStorage.getItem("mouatarif_eleves")) || [];

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
  }

  function sauvegarderEleves() {
    localStorage.setItem("mouatarif_eleves", JSON.stringify(eleves));
    afficherEleves();
  }

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

  afficherEleves();

});
