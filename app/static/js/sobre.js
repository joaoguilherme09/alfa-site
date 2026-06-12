const slides =
document.querySelectorAll(".slide");

let current = 0;

function mostrarSlide(index){

    slides.forEach(slide =>
        slide.classList.remove("active")
    );

    slides[index]
        .classList.add("active");
}

document.querySelector(".next")
.addEventListener("click", () => {

    current++;

    if(current >= slides.length){

        current = 0;
    }

    mostrarSlide(current);
});

document.querySelector(".prev")
.addEventListener("click", () => {

    current--;

    if(current < 0){

        current = slides.length - 1;
    }

    mostrarSlide(current);
});

setInterval(() => {

    current++;

    if(current >= slides.length){

        current = 0;
    }

    mostrarSlide(current);

}, 5000);