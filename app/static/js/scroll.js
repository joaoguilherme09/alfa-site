const cursosGrid =
    document.querySelector('.cursos-grid');

const dots =
    document.querySelectorAll('.scroll-indicador .dot');

if (cursosGrid && dots.length) {

    function atualizarIndicador() {

        const cards =
            document.querySelectorAll('.curso-card');

        let cardAtivo = 0;

        cards.forEach((card, index) => {

            const rect =
                card.getBoundingClientRect();

            const centroTela =
                window.innerWidth / 2;

            const centroCard =
                rect.left + rect.width / 2;

            const distancia =
                Math.abs(
                    centroTela - centroCard
                );

            if (
                distancia <
                Math.abs(
                    cards[cardAtivo]
                    .getBoundingClientRect()
                    .left +
                    cards[cardAtivo]
                    .getBoundingClientRect()
                    .width / 2 -
                    centroTela
                )
            ) {

                cardAtivo = index;
            }

        });

        dots.forEach(dot =>
            dot.classList.remove('active')
        );

        if (dots[cardAtivo]) {

            dots[cardAtivo]
                .classList.add('active');
        }

    }

    cursosGrid.addEventListener(
        'scroll',
        atualizarIndicador
    );

    atualizarIndicador();
}