import { typewriterTexts } from '../config/typewriter.js';

export function initTypewriter() {
    const element = document.getElementById("typewriter");
    if (!element || element.dataset.initialized === "true") return;

    element.dataset.initialized = "true";

    let textIndex = 0;
    let characterIndex = 0;
    let deleting = false;

    function type() {
        const currentText = typewriterTexts[textIndex];

        if (!deleting) {
            element.textContent = currentText.substring(0, characterIndex + 1);
            characterIndex++;

            if (characterIndex >= currentText.length) {
                deleting = true;
                setTimeout(type, 1800);
                return;
            }
        } else {
            element.textContent = currentText.substring(0, characterIndex - 1);
            characterIndex--;

            if (characterIndex <= 0) {
                deleting = false;
                textIndex = (textIndex + 1) % typewriterTexts.length;
            }
        }

        setTimeout(type, deleting ? 50 : 90);
    }

    type();
}
