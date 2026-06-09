const counters = document.querySelectorAll('.contador');

const observer = new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            const counter = entry.target;

            const target = +counter.dataset.target;

            let current = 0;

            const increment = target / 80;

            const updateCounter = () => {

                if (current < target) {

                    current += increment;

                    counter.innerText = Math.ceil(current);

                    requestAnimationFrame(updateCounter);

                } else {

                    counter.innerText = target;
                }
            };

            updateCounter();

            observer.unobserve(counter);
        }

    });

}, { threshold: 0.5 });

counters.forEach(counter => {

    observer.observe(counter);

});