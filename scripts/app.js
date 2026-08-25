import { renderMainComponents, renderProjectCards } from './ui/componentsUI.js';
import { initMobileMenu, initSmoothScroll } from './ui/navigationUI.js';
import { initProjectFilters } from './ui/projectsUI.js';
import { initTestimonials } from './ui/testimonialsUI.js';
import { initTypewriter } from './ui/typewriterUI.js';
import { initContactForm } from './ui/contactFormUI.js';
import { initRevealAnimation } from './ui/revealUI.js';

document.addEventListener("DOMContentLoaded", async () => {
    // 1. Renderiza os componentes
    await renderMainComponents();
    await renderProjectCards();

    // 2. Inicializa as interações da UI
    initMobileMenu();
    initSmoothScroll();
    initTypewriter();
    initProjectFilters();
    initTestimonials();
    initContactForm();
    initRevealAnimation();
});