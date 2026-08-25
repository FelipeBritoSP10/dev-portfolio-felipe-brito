export function initProjectFilters() {
    const buttons = document.querySelectorAll(".filter-btn");
    const projects = document.querySelectorAll(".project-card");

    if (!buttons.length || !projects.length) return;

    buttons.forEach((button) => {
        if (button.dataset.initialized === "true") return;
        button.dataset.initialized = "true";

        button.addEventListener("click", () => {
            const filter = button.dataset.filter;

            updateFilterButtons(button, buttons);

            projects.forEach((project) => {
                const categories = project.dataset.cat || "";
                const categoryList = categories.split(" ");
                const show = filter === "todos" || categoryList.includes(filter);

                project.classList.toggle("hidden", !show);
            });
        });
    });
}

function updateFilterButtons(activeButton, buttons) {
    buttons.forEach((button) => {
        button.classList.remove("active", "border-fn", "text-fn");
        button.classList.add("border-line", "text-muted");
    });

    activeButton.classList.add("active", "border-fn", "text-fn");
    activeButton.classList.remove("border-line", "text-muted");
}