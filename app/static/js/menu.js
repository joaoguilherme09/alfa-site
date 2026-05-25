// =========================
// MENU DROPDOWN
// =========================

document.addEventListener("DOMContentLoaded", () => {

    const dropdown = document.querySelector(".dropdown");
    const dropdownMenu = document.querySelector(".dropdown-menu");

    // =========================
    // ABRIR MENU
    
    // =========================

    dropdown.addEventListener("mouseenter", () => {

        dropdownMenu.style.display = "block";

    });

    // =========================
    // FECHAR MENU
    // =========================

    dropdown.addEventListener("mouseleave", () => {

        dropdownMenu.style.display = "none";

    });

});


// =========================
// MENU MOBILE
// =========================

const mobileButton = document.querySelector(".mobile-menu-button");
const mobileMenu = document.querySelector(".menu");

if (mobileButton) {

    mobileButton.addEventListener("click", () => {

        mobileMenu.classList.toggle("active");

    });

}
