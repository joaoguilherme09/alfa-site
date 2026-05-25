// =========================
// SCROLL NAVBAR
// =========================

window.addEventListener("scroll", () => {

    const navbar = document.querySelector(".navbar");

    if (window.scrollY > 50) {

        navbar.classList.add("navbar-scroll");

    } else {

        navbar.classList.remove("navbar-scroll");

    }

});


// =========================
// SCROLL SUAVE
// =========================

const links = document.querySelectorAll('a[href^="#"]');

links.forEach(link => {

    link.addEventListener("click", (e) => {

        e.preventDefault();

        const id = link.getAttribute("href");

        const section = document.querySelector(id);

        if (section) {

            section.scrollIntoView({
                behavior: "smooth"
            });

        }

    });

});


// =========================
// ANIMAÇÃO DOS CARDS
// =========================

const cards = document.querySelectorAll(".card");

const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.classList.add("show");

        }

    });

}, {
    threshold: 0.2
});

cards.forEach(card => {
    observer.observe(card);
});


// =========================
// BOTÃO VOLTAR AO TOPO
// =========================

const btnTop = document.createElement("button");

btnTop.innerHTML = "↑";

btnTop.classList.add("back-to-top");

document.body.appendChild(btnTop);

window.addEventListener("scroll", () => {

    if (window.scrollY > 300) {

        btnTop.style.display = "flex";

    } else {

        btnTop.style.display = "none";

    }

});

btnTop.addEventListener("click", () => {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});
