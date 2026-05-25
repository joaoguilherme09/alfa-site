// =========================
// SLIDER AUTOMÁTICO
// =========================

document.addEventListener("DOMContentLoaded", () => {

    const slides = document.querySelectorAll(".slide");

    let currentSlide = 0;

    // =========================
    // MOSTRAR SLIDE
    // =========================

    function showSlide(index) {

        slides.forEach((slide) => {

            slide.classList.remove("active");

        });

        slides[index].classList.add("active");

    }

    // =========================
    // PRÓXIMO SLIDE
    // =========================

    function nextSlide() {

        currentSlide++;

        if (currentSlide >= slides.length) {

            currentSlide = 0;

        }

        showSlide(currentSlide);

    }

    // =========================
    // INICIAR
    // =========================

    if (slides.length > 0) {

        showSlide(currentSlide);

        setInterval(nextSlide, 5000);

    }

});
