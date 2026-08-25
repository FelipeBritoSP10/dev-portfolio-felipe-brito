export function initTestimonials() {
    const track = document.getElementById("testimonial-track") || document.querySelector(".testimonial-track");
    const slides = document.querySelectorAll(".testimonial-slide");
    const previousButton = document.getElementById("prev-btn");
    const nextButton = document.getElementById("next-btn");
    const dotsContainer = document.getElementById("dots");

    if (!track || !slides.length || track.dataset.initialized === "true") return;

    track.dataset.initialized = "true";
    let currentSlide = 0;

    if (dotsContainer) {
        dotsContainer.innerHTML = "";
        slides.forEach((_, index) => {
            const dot = document.createElement("button");
            dot.className = "dot-btn";
            dot.setAttribute("aria-label", `Ir para depoimento ${index + 1}`);
            dot.addEventListener("click", () => {
                currentSlide = index;
                updateSlider();
            });
            dotsContainer.appendChild(dot);
        });
    }

    const dots = dotsContainer ? dotsContainer.querySelectorAll(".dot-btn") : [];

    function updateSlider() {
        track.style.transform = `translateX(-${currentSlide * 100}%)`;
        dots.forEach((dot, index) => {
            dot.classList.toggle("active", index === currentSlide);
        });
    }

    previousButton?.addEventListener("click", () => {
        currentSlide = currentSlide === 0 ? slides.length - 1 : currentSlide - 1;
        updateSlider();
    });

    nextButton?.addEventListener("click", () => {
        currentSlide = (currentSlide + 1) % slides.length;
        updateSlider();
    });

    updateSlider();
}