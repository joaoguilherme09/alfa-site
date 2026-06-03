// =========================
// MENU MOBILE
// =========================

document.addEventListener("DOMContentLoaded", () => {

    const mobileButton = document.querySelector(".mobile-menu-button");
    const mobileMenu = document.querySelector(".menu");

    if (mobileButton) {

        mobileButton.addEventListener("click", () => {

            mobileMenu.classList.toggle("active");

        });

    }

});