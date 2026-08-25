document.addEventListener("DOMContentLoaded", () => {
    loadComponents();
});

/* =========================================
   COMPONENTES
========================================= */

const components = [
    ["navbar", "navbar.html"],
    ["hero", "hero.html"],
    ["sobre", "sobre.html"],
    ["servicos", "servicos.html"],
    ["habilidades", "habilidades.html"],
    ["projetos", "projetos.html"],
    ["depoimentos", "depoimentos.html"],
    ["contatos", "contatos.html"],
    ["footer", "footer.html"]
];

/* =========================================
   CARDS DOS PROJETOS
========================================= */

const projectCards = [
    "brito-tasks",
    "quiz-interativo",
    "plataforma-tea",
    "mymoney",
    "numerix",
    "sistema-medicamentos",
    "nike",
    "sistema-autenticacao",
    "plataforma-cursos",
    "portfolios-alunos",
    "brito-weather",
    "brito-recipes",
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
    await loadMainComponents();
    await loadProjectCards();

    initComponents();
}

/* =========================================
   COMPONENTES PRINCIPAIS
========================================= */

async function loadMainComponents() {
    await Promise.all(
        components.map(async ([id, file]) => {
            const element = document.getElementById(id);

            if (!element) return;

            try {
                const response = await fetch(
                    `./components/${file}`
                );

                if (!response.ok) {
                    throw new Error(
                        `HTTP ${response.status}`
                    );
                }

                element.innerHTML =
                    await response.text();

            } catch (error) {
                console.error(
                    `Erro ao carregar ${file}:`,
                    error
                );
            }
        })
    );
}

/* =========================================
   CARDS DOS PROJETOS
========================================= */

async function loadProjectCards() {
    const container =
        document.getElementById("projects-grid");

    if (!container) return;

    try {
        const cards = await Promise.all(
            projectCards.map(loadProjectCard)
        );

        container.innerHTML = cards
            .filter(Boolean)
            .join("");

    } catch (error) {
        console.error(
            "Erro ao carregar cards dos projetos:",
            error
        );

        container.innerHTML = `
            <div class="col-span-full py-10 text-center">
                <p class="text-muted font-mono text-sm">
                    // erro ao carregar projetos
                </p>
            </div>
        `;
    }
}

/* =========================================
   CARREGAR UM CARD
========================================= */

async function loadProjectCard(project) {
    const file =
        `./components/cards/${project}.html`;

    try {
        const response = await fetch(file);

        if (!response.ok) {
            throw new Error(
                `HTTP ${response.status}`
            );
        }

        return await response.text();

    } catch (error) {
        console.error(
            `Erro ao carregar card ${project}:`,
            error
        );

        return "";
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
    const menuButton =
        document.getElementById("menu-btn");

    const mobileMenu =
        document.getElementById("mobile-menu");

    if (!menuButton || !mobileMenu) return;

    if (
        menuButton.dataset.initialized === "true"
    ) {
        return;
    }

    menuButton.dataset.initialized = "true";

    menuButton.addEventListener("click", () => {
        mobileMenu.classList.toggle("open");
    });

    mobileMenu
        .querySelectorAll("a")
        .forEach((link) => {
            link.addEventListener("click", () => {
                mobileMenu.classList.remove("open");
            });
        });
}

/* =========================================
   TYPEWRITER
========================================= */

function initTypewriter() {
    const element =
        document.getElementById("typewriter");

    if (!element) return;

    if (
        element.dataset.initialized === "true"
    ) {
        return;
    }

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
        const currentText =
            texts[textIndex];

        if (!deleting) {
            element.textContent =
                currentText.substring(
                    0,
                    characterIndex + 1
                );

            characterIndex++;

            if (
                characterIndex >=
                currentText.length
            ) {
                deleting = true;

                setTimeout(type, 1800);

                return;
            }

        } else {
            element.textContent =
                currentText.substring(
                    0,
                    characterIndex - 1
                );

            characterIndex--;

            if (characterIndex <= 0) {
                deleting = false;

                textIndex =
                    (textIndex + 1) %
                    texts.length;
            }
        }

        setTimeout(
            type,
            deleting ? 50 : 90
        );
    }

    type();
}

/* =========================================
   FILTROS DOS PROJETOS
========================================= */

function initProjectFilters() {
    const buttons =
        document.querySelectorAll(
            ".filter-btn"
        );

    const projects =
        document.querySelectorAll(
            ".project-card"
        );

    if (
        !buttons.length ||
        !projects.length
    ) {
        return;
    }

    buttons.forEach((button) => {
        if (
            button.dataset.initialized ===
            "true"
        ) {
            return;
        }

        button.dataset.initialized = "true";

        button.addEventListener(
            "click",
            () => {
                const filter =
                    button.dataset.filter;

                updateFilterButtons(
                    button,
                    buttons
                );

                projects.forEach(
                    (project) => {
                        const categories =
                            project.dataset.cat ||
                            "";

                        const categoryList =
                            categories.split(" ");

                        const show =
                            filter === "todos" ||
                            categoryList.includes(
                                filter
                            );

                        project.classList.toggle(
                            "hidden",
                            !show
                        );
                    }
                );
            }
        );
    });
}

/* =========================================
   BOTÕES DOS FILTROS
========================================= */

function updateFilterButtons(
    activeButton,
    buttons
) {
    buttons.forEach((button) => {
        button.classList.remove(
            "active",
            "border-fn",
            "text-fn"
        );

        button.classList.add(
            "border-line",
            "text-muted"
        );
    });

    activeButton.classList.add(
        "active",
        "border-fn",
        "text-fn"
    );

    activeButton.classList.remove(
        "border-line",
        "text-muted"
    );
}

/* =========================================
   DEPOIMENTOS
========================================= */

function initTestimonials() {
    const track =
        document.getElementById(
            "testimonial-track"
        ) ||
        document.querySelector(
            ".testimonial-track"
        );

    const slides =
        document.querySelectorAll(
            ".testimonial-slide"
        );

    const previousButton =
        document.getElementById(
            "prev-btn"
        );

    const nextButton =
        document.getElementById(
            "next-btn"
        );

    const dotsContainer =
        document.getElementById("dots");

    if (
        !track ||
        !slides.length
    ) {
        return;
    }

    if (
        track.dataset.initialized ===
        "true"
    ) {
        return;
    }

    track.dataset.initialized = "true";

    let currentSlide = 0;

    /* Dots */

    if (dotsContainer) {
        dotsContainer.innerHTML = "";

        slides.forEach((_, index) => {
            const dot =
                document.createElement(
                    "button"
                );

            dot.className =
                "dot-btn";

            dot.setAttribute(
                "aria-label",
                `Ir para depoimento ${index + 1}`
            );

            dot.addEventListener(
                "click",
                () => {
                    currentSlide =
                        index;

                    updateSlider();
                }
            );

            dotsContainer.appendChild(
                dot
            );
        });
    }

    const dots =
        dotsContainer
            ? dotsContainer.querySelectorAll(
                ".dot-btn"
            )
            : [];

    function updateSlider() {
        track.style.transform =
            `translateX(-${currentSlide * 100}%)`;

        dots.forEach(
            (dot, index) => {
                dot.classList.toggle(
                    "active",
                    index ===
                        currentSlide
                );
            }
        );
    }

    /* Anterior */

    previousButton?.addEventListener(
        "click",
        () => {
            currentSlide =
                currentSlide === 0
                    ? slides.length - 1
                    : currentSlide - 1;

            updateSlider();
        }
    );

    /* Próximo */

    nextButton?.addEventListener(
        "click",
        () => {
            currentSlide =
                (currentSlide + 1) %
                slides.length;

            updateSlider();
        }
    );

    updateSlider();
}

/* =========================================
   FORMULÁRIO DE CONTATO
========================================= */

function initContactForm() {
    const form =
        document.getElementById(
            "contact-form"
        );

    if (!form) return;

    if (
        form.dataset.initialized ===
        "true"
    ) {
        return;
    }

    form.dataset.initialized = "true";

    const name =
        document.getElementById("name");

    const email =
        document.getElementById("email");

    const message =
        document.getElementById(
            "message"
        );

    const success =
        document.getElementById(
            "form-success"
        );

    form.addEventListener(
        "submit",
        (event) => {
            event.preventDefault();

            const fields = [
                name,
                email,
                message
            ].filter(Boolean);

            let valid = true;

            fields.forEach((field) => {
                const error =
                    field.parentElement?.querySelector(
                        ".error-msg"
                    );

                let fieldValid =
                    field.value.trim() !== "";

                /* Validação do e-mail */

                if (
                    field === email &&
                    field.value.trim()
                ) {
                    const emailRegex =
                        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

                    fieldValid =
                        emailRegex.test(
                            field.value.trim()
                        );
                }

                if (!fieldValid) {
                    valid = false;

                    error?.classList.remove(
                        "hidden"
                    );
                } else {
                    error?.classList.add(
                        "hidden"
                    );
                }
            });

            if (
                valid &&
                success
            ) {
                success.classList.remove(
                    "hidden"
                );

                form.reset();
            }
        }
    );
}

/* =========================================
   REVEAL ANIMATION
========================================= */

function initRevealAnimation() {
    const elements =
        document.querySelectorAll(
            ".reveal"
        );

    if (!elements.length) return;

    /* Fallback */

    if (
        !(
            "IntersectionObserver"
            in window
        )
    ) {
        elements.forEach(
            (element) => {
                element.classList.add(
                    "in"
                );
            }
        );

        return;
    }

    const observer =
        new IntersectionObserver(
            (entries) => {
                entries.forEach(
                    (entry) => {
                        if (
                            !entry.isIntersecting
                        ) {
                            return;
                        }

                        const element =
                            entry.target;

                        element.classList.add(
                            "in"
                        );

                        /* Barras de habilidades */

                        const skillFills =
                            element.querySelectorAll(
                                ".skill-fill"
                            );

                        skillFills.forEach(
                            (fill) => {
                                const width =
                                    fill.dataset.width ||
                                    "100%";

                                fill.style.width =
                                    width;
                            }
                        );

                        observer.unobserve(
                            element
                        );
                    }
                );
            },
            {
                threshold: 0.15
            }
        );

    elements.forEach(
        (element) => {
            observer.observe(element);
        }
    );
}

/* =========================================
   SMOOTH SCROLL
========================================= */

function initSmoothScroll() {
    document.addEventListener(
        "click",
        (event) => {
            const link =
                event.target.closest(
                    'a[href^="#"]'
                );

            if (!link) return;

            const targetId =
                link.getAttribute(
                    "href"
                );

            if (
                !targetId ||
                targetId === "#"
            ) {
                return;
            }

            const target =
                document.querySelector(
                    targetId
                );

            if (!target) return;

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }
    );
}