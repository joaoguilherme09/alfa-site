// =========================
// MENU MOBILE
// =========================

document.addEventListener("DOMContentLoaded", () => {

    const mobileButton =
        document.querySelector(".mobile-menu-button");

    const mobileMenu =
        document.querySelector(".menu");

    if (mobileButton) {

        mobileButton.addEventListener("click", () => {

            mobileMenu.classList.toggle("active");

        });

    }

    // =========================
    // DROPDOWN MOBILE
    // =========================

    const dropdownLink =
        document.querySelector(".dropdown > a");

    const dropdown =
        document.querySelector(".dropdown");

    if (dropdownLink && dropdown) {

        dropdownLink.addEventListener("click", (e) => {

            if (window.innerWidth <= 768) {

                e.preventDefault();

                dropdown.classList.toggle("active");

            }

        });

    }

});