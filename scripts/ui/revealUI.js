export function initRevealAnimation() {
    const elements = document.querySelectorAll(".reveal");
    if (!elements.length) return;

    if (!("IntersectionObserver" in window)) {
        elements.forEach((element) => element.classList.add("in"));
        return;
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;

            const element = entry.target;
            element.classList.add("in");

            const skillFills = element.querySelectorAll(".skill-fill");
            skillFills.forEach((fill) => {
                fill.style.width = fill.dataset.width || "100%";
            });

            observer.unobserve(element);
        });
    }, { threshold: 0.15 });

    elements.forEach((element) => observer.observe(element));
}