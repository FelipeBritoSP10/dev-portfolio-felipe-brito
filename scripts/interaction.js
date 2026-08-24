document.addEventListener("DOMContentLoaded", () => {
    loadComponents();
});

/* =========================================
   LOAD COMPONENTS
========================================= */

async function loadComponents() {
    const components = [
        { id: "navbar", file: "./components/navbar.html" },
        { id: "hero", file: "./components/hero.html" },
        { id: "sobre", file: "./components/sobre.html" },
        { id: "servicos", file: "./components/servicos.html" },
        { id: "habilidades", file: "./components/habilidades.html" },
        { id: "projetos", file: "./components/projetos.html" },
        { id: "depoimentos", file: "./components/depoimentos.html" },
        { id: "contatos", file: "./components/contatos.html" },
        { id: "footer", file: "./components/footer.html" }
    ];

    await Promise.all(
        components.map(async (component) => {
            const container = document.getElementById(component.id);
            if (!container) return;

            try {
                const response = await fetch(component.file);
                if (response.ok) {
                    container.innerHTML = await response.text();
                } else {
                    console.warn(`Aviso: Falha ao carregar ${component.file}`);
                }
            } catch (error) {
                console.error(`Erro ao requisitar ${component.file}:`, error);
            }
        })
    );

    initComponents();
}

/* =========================================
   INITIALIZE COMPONENTS
========================================= */

function initComponents() {
    initMobileMenu();
    initTypewriter();
    initProjectFilters();
    initTestimonials();
    initContactForm();
    initRevealAnimation();
}

/* =========================================
   MOBILE MENU
========================================= */

function initMobileMenu() {
    const menuButton = document.getElementById("menu-btn");
    const mobileMenu = document.getElementById("mobile-menu");

    if (!menuButton || !mobileMenu) return;

    menuButton.addEventListener("click", () => {
        mobileMenu.classList.toggle("open");
    });

    const links = mobileMenu.querySelectorAll("a");
    links.forEach((link) => {
        link.addEventListener("click", () => {
            mobileMenu.classList.remove("open");
        });
    });
}

/* =========================================
   TYPEWRITER
========================================= */

function initTypewriter() {
    const element = document.getElementById("typewriter");

    if (!element || element.dataset.initialized === "true") return;
    element.dataset.initialized = "true";

    const texts = [
        "criando soluções",
        "ensinando programação",
        "construindo projetos",
        "resolvendo problemas"
    ];

    let textIndex = 0;
    let characterIndex = 0;
    let deleting = false;

    function type() {
        const currentText = texts[textIndex];

        if (!deleting) {
            element.textContent = currentText.substring(0, characterIndex + 1);
            characterIndex++;

            if (characterIndex === currentText.length) {
                deleting = true;
                setTimeout(type, 1800);
                return;
            }
        } else {
            element.textContent = currentText.substring(0, characterIndex - 1);
            characterIndex--;

            if (characterIndex === 0) {
                deleting = false;
                textIndex = (textIndex + 1) % texts.length;
            }
        }

        setTimeout(type, deleting ? 50 : 90);
    }

    type();
}

/* =========================================
   PROJECT FILTERS
========================================= */

function initProjectFilters() {
    const buttons = document.querySelectorAll(".filter-btn");
    const projects = document.querySelectorAll(".project-card");

    if (!buttons.length || !projects.length) return;

    buttons.forEach((button) => {
        if (button.dataset.filterInitialized === "true") return;
        button.dataset.filterInitialized = "true";

        button.addEventListener("click", () => {
            const filter = button.dataset.filter;

            buttons.forEach((item) => {
                item.classList.remove("active", "border-fn", "text-fn");
                item.classList.add("border-line", "text-muted");
            });

            button.classList.add("active", "border-fn", "text-fn");
            button.classList.remove("border-line", "text-muted");

            projects.forEach((project) => {
                const categories = project.dataset.cat || "";
                if (filter === "todos" || categories.includes(filter)) {
                    project.classList.remove("hidden");
                } else {
                    project.classList.add("hidden");
                }
            });
        });
    });
}

/* =========================================
   TESTIMONIALS
========================================= */

function initTestimonials() {
    const track = document.getElementById("testimonial-track") || document.querySelector(".testimonial-track");
    const slides = document.querySelectorAll(".testimonial-slide");
    const previousButton = document.getElementById("prev-btn");
    const nextButton = document.getElementById("next-btn");
    const dotsContainer = document.getElementById("dots");

    if (!track || !slides.length) return;
    if (track.dataset.initialized === "true") return;
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
            if (index === currentSlide) {
                dot.classList.add("active");
            } else {
                dot.classList.remove("active");
            }
        });
    }

    if (previousButton) {
        previousButton.addEventListener("click", () => {
            currentSlide = currentSlide === 0 ? slides.length - 1 : currentSlide - 1;
            updateSlider();
        });
    }

    if (nextButton) {
        nextButton.addEventListener("click", () => {
            currentSlide = (currentSlide + 1) % slides.length;
            updateSlider();
        });
    }

    updateSlider();
}

/* =========================================
   CONTACT FORM
========================================= */

function initContactForm() {
    const form = document.getElementById("contact-form");
    if (!form || form.dataset.initialized === "true") return;
    form.dataset.initialized = "true";

    const name = document.getElementById("name");
    const email = document.getElementById("email");
    const message = document.getElementById("message");
    const success = document.getElementById("form-success");

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const fields = [name, email, message].filter(Boolean);
        let valid = true;

        fields.forEach((field) => {
            const error = field.parentElement?.querySelector(".error-msg");
            let fieldValid = true;

            if (!field.value.trim()) {
                fieldValid = false;
            }

            if (field === email && field.value.trim()) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                fieldValid = emailRegex.test(field.value.trim());
            }

            if (!fieldValid) {
                valid = false;
                error?.classList.remove("hidden");
            } else {
                error?.classList.add("hidden");
            }
        });

        if (valid && success) {
            success.classList.remove("hidden");
            form.reset();
        }
    });
}

/* =========================================
   REVEAL ANIMATION (.in)
========================================= */

function initRevealAnimation() {
    const elements = document.querySelectorAll(".reveal");

    if (!elements.length) return;

    if (!("IntersectionObserver" in window)) {
        elements.forEach((element) => element.classList.add("in"));
        return;
    }

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("in");

                    const skillFills = entry.target.querySelectorAll(".skill-fill");
                    skillFills.forEach((fill) => {
                        const targetWidth = fill.dataset.width || "100%";
                        fill.style.width = targetWidth;
                    });

                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.15 }
    );

    elements.forEach((element) => observer.observe(element));
}

/* =========================================
   SMOOTH SCROLL
========================================= */

document.addEventListener("click", (event) => {
    const link = event.target.closest('a[href^="#"]');
    if (!link) return;

    const targetId = link.getAttribute("href");
    if (!targetId || targetId === "#") return;

    const target = document.querySelector(targetId);
    if (!target) return;

    event.preventDefault();
    target.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
});