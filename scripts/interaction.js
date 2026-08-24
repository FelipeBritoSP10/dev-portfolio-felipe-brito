document.addEventListener("DOMContentLoaded", loadComponents);

/* =========================================
   COMPONENTES
========================================= */

const components = {
    navbar: "navbar.html",
    hero: "hero.html",
    sobre: "sobre.html",
    servicos: "servicos.html",
    habilidades: "habilidades.html",
    projetos: "projetos.html",
    depoimentos: "depoimentos.html",
    contatos: "contatos.html",
    footer: "footer.html"
};

const projectCards = [
    "brito-tasks",
    "quiz-interativo",
    "plataforma-tea",
    "mymoney",
    "numerix",
    "sistema-medicamentos",
    "nike",
    "plataforma-cursos",
    "portfolios-alunos",
    "brito-weather",
    "eeteapa",
    "feirao-ceasa",
    "da-roca",
    "trycatch",
    "brito-engine",
    "autisteps",
    "voz-do-futuro"
];

/* =========================================
   CARREGAMENTO
========================================= */

async function loadComponents() {
    await Promise.all(
        Object.entries(components).map(
            ([id, file]) => loadComponent(id, file)
        )
    );

    await loadProjectCards();

    initComponents();
}

async function loadComponent(id, file) {
    const element = document.getElementById(id);

    if (!element) return;

    try {
        const response = await fetch(`./components/${file}`);

        if (!response.ok) {
            throw new Error(`${response.status} - ${file}`);
        }

        element.innerHTML = await response.text();

    } catch (error) {
        console.error(`Erro ao carregar ${file}:`, error);
    }
}

async function loadProjectCards() {
    const container = document.getElementById("projects-grid");

    if (!container) return;

    try {
        const cards = await Promise.all(
            projectCards.map(async (project) => {

                const response = await fetch(
                    `./components/projetos/${project}.html`
                );

                if (!response.ok) {
                    throw new Error(
                        `${response.status} - ${project}`
                    );
                }

                return response.text();
            })
        );

        container.innerHTML = cards.join("");

    } catch (error) {
        console.error("Erro ao carregar projetos:", error);

        container.innerHTML = `
            <p class="col-span-full text-center text-muted font-mono text-sm">
                // erro ao carregar projetos
            </p>
        `;
    }
}

/* =========================================
   INICIALIZAÇÃO
========================================= */

function initComponents() {
    initMobileMenu();
    initTypewriter();
    initProjectFilters();
    initTestimonials();
    initContactForm();
    initRevealAnimation();
    initSmoothScroll();
}

/* =========================================
   MENU MOBILE
========================================= */

function initMobileMenu() {
    const button = document.getElementById("menu-btn");
    const menu = document.getElementById("mobile-menu");

    if (!button || !menu || button.dataset.ready) return;

    button.dataset.ready = "true";

    button.addEventListener("click", () => {
        menu.classList.toggle("open");
    });

    menu.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
            menu.classList.remove("open");
        });
    });
}

/* =========================================
   TYPEWRITER
========================================= */

function initTypewriter() {
    const element = document.getElementById("typewriter");

    if (!element || element.dataset.ready) return;

    element.dataset.ready = "true";

    const texts = [
        "criando soluções",
        "ensinando programação",
        "construindo projetos",
        "resolvendo problemas"
    ];

    let textIndex = 0;
    let charIndex = 0;
    let deleting = false;

    function type() {
        const text = texts[textIndex];

        element.textContent = deleting
            ? text.slice(0, charIndex--)
            : text.slice(0, ++charIndex);

        if (!deleting && charIndex === text.length) {
            deleting = true;
            return setTimeout(type, 1800);
        }

        if (deleting && charIndex === 0) {
            deleting = false;
            textIndex = (textIndex + 1) % texts.length;
        }

        setTimeout(type, deleting ? 50 : 90);
    }

    type();
}

/* =========================================
   FILTROS DE PROJETOS
========================================= */

function initProjectFilters() {
    const buttons = document.querySelectorAll(".filter-btn");
    const projects = document.querySelectorAll(".project-card");

    if (!buttons.length || !projects.length) return;

    buttons.forEach((button) => {

        button.addEventListener("click", () => {

            const filter = button.dataset.filter;

            buttons.forEach((item) => {
                const active = item === button;

                item.classList.toggle("active", active);
                item.classList.toggle("border-fn", active);
                item.classList.toggle("text-fn", active);

                item.classList.toggle("border-line", !active);
                item.classList.toggle("text-muted", !active);
            });

            projects.forEach((project) => {
                const categories =
                    project.dataset.cat?.split(" ") || [];

                const visible =
                    filter === "todos" ||
                    categories.includes(filter);

                project.classList.toggle(
                    "hidden",
                    !visible
                );
            });
        });
    });
}

/* =========================================
   DEPOIMENTOS
========================================= */

function initTestimonials() {
    const track =
        document.getElementById("testimonial-track") ||
        document.querySelector(".testimonial-track");

    const slides =
        document.querySelectorAll(".testimonial-slide");

    const prev =
        document.getElementById("prev-btn");

    const next =
        document.getElementById("next-btn");

    const dotsContainer =
        document.getElementById("dots");

    if (!track || !slides.length || track.dataset.ready) {
        return;
    }

    track.dataset.ready = "true";

    let current = 0;

    const dots = [];

    slides.forEach((_, index) => {

        if (!dotsContainer) return;

        const dot = document.createElement("button");

        dot.className = "dot-btn";
        dot.setAttribute(
            "aria-label",
            `Ir para depoimento ${index + 1}`
        );

        dot.addEventListener("click", () => {
            current = index;
            update();
        });

        dotsContainer.appendChild(dot);
        dots.push(dot);
    });

    function update() {
        track.style.transform =
            `translateX(-${current * 100}%)`;

        dots.forEach((dot, index) => {
            dot.classList.toggle(
                "active",
                index === current
            );
        });
    }

    prev?.addEventListener("click", () => {
        current =
            current === 0
                ? slides.length - 1
                : current - 1;

        update();
    });

    next?.addEventListener("click", () => {
        current = (current + 1) % slides.length;
        update();
    });

    update();
}

/* =========================================
   FORMULÁRIO DE CONTATO
========================================= */

function initContactForm() {
    const form = document.getElementById("contact-form");

    if (!form || form.dataset.ready) return;

    form.dataset.ready = "true";

    const fields = [
        document.getElementById("name"),
        document.getElementById("email"),
        document.getElementById("message")
    ].filter(Boolean);

    const success =
        document.getElementById("form-success");

    form.addEventListener("submit", (event) => {

        event.preventDefault();

        let valid = true;

        fields.forEach((field) => {

            const error =
                field.parentElement?.querySelector(
                    ".error-msg"
                );

            const value = field.value.trim();

            let fieldValid = Boolean(value);

            if (
                field === document.getElementById("email") &&
                value
            ) {
                fieldValid =
                    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
            }

            error?.classList.toggle(
                "hidden",
                fieldValid
            );

            if (!fieldValid) {
                valid = false;
            }
        });

        if (!valid) return;

        success?.classList.remove("hidden");

        form.reset();
    });
}

/* =========================================
   REVEAL
========================================= */

function initRevealAnimation() {
    const elements =
        document.querySelectorAll(".reveal");

    if (!elements.length) return;

    if (!("IntersectionObserver" in window)) {
        elements.forEach((element) => {
            element.classList.add("in");
        });

        return;
    }

    const observer = new IntersectionObserver(
        (entries) => {

            entries.forEach(({ target, isIntersecting }) => {

                if (!isIntersecting) return;

                target.classList.add("in");

                target
                    .querySelectorAll(".skill-fill")
                    .forEach((fill) => {
                        fill.style.width =
                            fill.dataset.width || "100%";
                    });

                observer.unobserve(target);
            });
        },
        {
            threshold: 0.15
        }
    );

    elements.forEach((element) => {
        observer.observe(element);
    });
}

/* =========================================
   SCROLL SUAVE
========================================= */

function initSmoothScroll() {

    document.addEventListener("click", (event) => {

        const link =
            event.target.closest('a[href^="#"]');

        if (!link) return;

        const id = link.getAttribute("href");

        if (!id || id === "#") return;

        const target = document.querySelector(id);

        if (!target) return;

        event.preventDefault();

        target.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    });
}