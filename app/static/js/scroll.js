const scrollContainer =
    document.querySelector('.galeria-scroll');

const dots =
    document.querySelectorAll('.scroll-indicador .dot');

if(scrollContainer && dots.length){

    scrollContainer.addEventListener('scroll', () => {

        const largura =
            scrollContainer.clientWidth;

        const index =
            Math.round(
                scrollContainer.scrollLeft / largura
            );

        dots.forEach(dot =>
            dot.classList.remove('active')
        );

        if(dots[index]){

            dots[index].classList.add('active');
        }

    });

}