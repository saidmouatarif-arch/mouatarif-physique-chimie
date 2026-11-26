// MOUATARIF - Gestion pédagogique

document.addEventListener("DOMContentLoaded", function () {

  console.log("Bienvenue sur MOUATARIF !");

  // Navigation entre les menus
  const menuLinks = document.querySelectorAll(".menu a");

  menuLinks.forEach(link => {
    link.addEventListener("click", function (event) {
      event.preventDefault();

      menuLinks.forEach(item => item.classList.remove("active"));

      this.classList.add("active");

      const titre = this.textContent.trim();
      document.querySelector("header h1").textContent = titre;
    });
  });

});
