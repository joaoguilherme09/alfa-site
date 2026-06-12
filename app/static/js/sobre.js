/* ===================== REVEAL AO ROLAR ===================== */
(function () {
  const reveals = document.querySelectorAll(".reveal");
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  reveals.forEach((el) => io.observe(el));
})();

/* ===================== CONTADORES ANIMADOS ===================== */
(function () {
  const counters = document.querySelectorAll(".contador__num");
  if (!counters.length) return;
  let started = false;

  function animate(el) {
    const target = parseInt(el.dataset.target, 10);
    const prefix = el.dataset.prefix || "";
    const suffix = el.dataset.suffix || "";
    const duration = 1800;
    const start = performance.now();
    function tick(now) {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = prefix + Math.floor(eased * target) + suffix;
      if (p < 1) requestAnimationFrame(tick);
      else el.textContent = prefix + target + suffix;
    }
    requestAnimationFrame(tick);
  }

  const section = document.querySelector(".contadores");
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !started) {
          started = true;
          counters.forEach(animate);
          io.disconnect();
        }
      });
    },
    { threshold: 0.4 }
  );
  if (section) io.observe(section);
})();

/* ===================== SLIDER DA ESTRUTURA ===================== */
(function () {
  const slides = document.querySelectorAll(".slide");
  if (!slides.length) return;
  const prevBtn = document.querySelector(".slider-btn.prev");
  const nextBtn = document.querySelector(".slider-btn.next");
  const dotsWrap = document.getElementById("dots");
  const slider = document.getElementById("slider");
  let current = 0;
  let timer;

  slides.forEach((_, i) => {
    const dot = document.createElement("button");
    dot.setAttribute("aria-label", "Ir para imagem " + (i + 1));
    dot.addEventListener("click", () => goTo(i));
    dotsWrap.appendChild(dot);
  });
  const dots = Array.from(dotsWrap.children);

  function show(i) {
    slides.forEach((s) => s.classList.remove("active"));
    dots.forEach((d) => d.classList.remove("is-active"));
    slides[i].classList.add("active");
    dots[i].classList.add("is-active");
  }
  function goTo(i) {
    current = (i + slides.length) % slides.length;
    show(current);
    restart();
  }
  function next() { goTo(current + 1); }
  function prev() { goTo(current - 1); }
  function start() { timer = setInterval(next, 5000); }
  function restart() { clearInterval(timer); start(); }

  nextBtn.addEventListener("click", next);
  prevBtn.addEventListener("click", prev);
  slider.addEventListener("mouseenter", () => clearInterval(timer));
  slider.addEventListener("mouseleave", start);

  show(0);
  start();
})();

/* ===================== CARROSSEL DE DEPOIMENTOS ===================== */
(function () {
  const track = document.getElementById("depoTrack");
  if (!track) return;
  const items = Array.from(track.children);
  const dotsWrap = document.getElementById("depoDots");
  let index = 0;
  let timer;

  items.forEach((_, i) => {
    const dot = document.createElement("button");
    dot.setAttribute("aria-label", "Depoimento " + (i + 1));
    dot.addEventListener("click", () => goTo(i));
    dotsWrap.appendChild(dot);
  });
  const dots = Array.from(dotsWrap.children);

  function update() {
    track.style.transform = `translateX(-${index * 100}%)`;
    dots.forEach((d, i) => d.classList.toggle("is-active", i === index));
  }
  function goTo(i) {
    index = (i + items.length) % items.length;
    update();
    restart();
  }
  function start() { timer = setInterval(() => goTo(index + 1), 6000); }
  function restart() { clearInterval(timer); start(); }

  update();
  start();
})();