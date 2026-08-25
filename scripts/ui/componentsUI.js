import { mainComponents, projectCards } from '../config/components.js';
import { fetchTemplate } from '../services/templateService.js';

export async function renderMainComponents() {
    await Promise.all(
        mainComponents.map(async ([id, path]) => {
            const element = document.getElementById(id);
            if (!element) return;

            const html = await fetchTemplate(`./components/${file}`);
            if (html) element.innerHTML = html;
        })
    );
}

export async function renderProjectCards() {
    const container = document.getElementById("projects-grid");
    if (!container) return;

    try {
        const cardsHtml = await Promise.all(
            projectCards.map((project) =>
                fetchTemplate(`./components/cards/${project}.html`)
            )
        );

        container.innerHTML = cardsHtml.filter(Boolean).join("");
    } catch (error) {
        console.error("Erro ao carregar cards dos projetos:", error);
        container.innerHTML = `
            <div class="col-span-full py-10 text-center">
                <p class="text-muted font-mono text-sm">// erro ao carregar projetos</p>
            </div>
        `;
    }
}
