export function initContactForm() {
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
            let fieldValid = field.value.trim() !== "";

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