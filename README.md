# ⚡ Felipe Brito | Portfolio

> Full-Stack Developer, Instrutor de Tecnologia e Consultor Técnico.

Este é o repositório oficial do meu portfólio pessoal. O projeto foi projetado sob os pilares de **alta performance**, **acessibilidade (WCAG)**, **design industrial minimalista** (dark mode, elementos sutis de glassmorphism) e **arquitetura de software descentralizada**. 

O ecossistema reúne minhas entregas de software corporativo, pesquisas acadêmicas (CNPq/Estácio), projetos desenvolvidos em mentoria com alunos e ferramentas de infraestrutura própria.

---

## 🛠️ Tecnologias & Ferramentas

### **Front-end & Mobile**
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![React Native](https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

### **Back-end & Banco de Dados**
![NodeJS](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)
![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white)

---

## 🏗️ Arquitetura de Software & Engenharia

O projeto adota os princípios de **Elite Engineering**, visando Clean Code, separação clara de responsabilidades (SoC) e dinamismo na camada de apresentação sem o overhead de bundlers pesados, utilizando recursos nativos do navegador com **ES6 Modules**.

### **Padrões & Decisões Arquiteturais**
* **Separation of Concerns (SoC):** Divisão estrita entre a camada de apresentação (`ui/`), infraestrutura de dados/comunicação HTTP (`services/`) e declaração de manifestos/constantes (`config/`).
* **Modularização de UI (`scripts/ui/`):** Todos os componentes comportamentais residem em um único nível funcional para evitar acoplamento rígido e complexidade de resolução de caminhos.
* **Template Dynamic Injection:** Carregamento assíncrono e parse otimizado de fragmentos HTML via `templateService.js`.
* **Segregação de Views (`components/`):** Organização física dividida entre blocos de estrutura global (`layout/`) e seções contextuais da landing page (`sections/`).
* **Git Flow & Conventional Commits:** Controle de versão padronizado no padrão *BRITO.ENGINE* (`feat`, `refactor(arch)`, `fix(ui)`).

---

## 🚀 Sobre Mim

Atuo no desenvolvimento de ecossistemas web e mobile modernos (React, React Native, Node.js, TypeScript) e na liderança técnica de soluções corporativas. Como instrutor e mentor, defendo a cultura de **Elite Engineering**: ensino guiado por resolução de *tasks* reais de mercado, Clean Code, arquitetura de software e domínio de fundamentos de lógica — sem atalhos operacionais.

---

## 💡 Serviços em Destaque

* 💻 **Desenvolvimento Full Stack:** Engenharia e construção de aplicações web de ponta a ponta, arquitetura de APIs RESTful de alta performance e modelagem de bancos de dados relacionais escaláveis.
  
* 📱 **Aplicativos Mobile:** Desenvolvimento de aplicações nativas e multiplataforma de alta performance utilizando React Native e Expo, focadas em UI/UX fluida e otimização de recursos.
  
* 🎓 **Aulas & Treinamento de Lógica de Programação:** Capacitação intensiva em algoritmos, estruturas de dados e resolução de problemas complexos utilizando JavaScript, Python e Java, com foco absoluto no domínio de fundamentos.
  
* 🚀 **Mentoria & Prática de Mercado:** Treinamento prático sob o padrão **Elite Engineering**, simulando a rotina real de times de alta performance: execução de *tasks*, *Code Review*, padronização de commits (*Git Flow*) e arquitetura limpa.
  
* 🤖 **Soluções & Integrações com IA:** Implementação estratégica de APIs de Inteligência Artificial Generativa, agentes de engenharia e automações de fluxo de trabalho para potencializar a produtividade corporativa.
  
* 📊 **Gestão de Projetos & Consultoria Técnica:** Liderança em implementação de metodologias ágeis (Scrum/Kanban), auditoria de código, definição de padrões de arquitetura e consultoria técnica para sistemas de grande porte.

---

## 💼 Projetos em Destaque no Portfólio

* 🗣️ **Voz do Futuro:** Aplicação web de Comunicação Aumentativa e Alternativa (CAA) voltada para a inclusão e comunicação de crianças não-verbais via toque interativo.
  
* 🧩 **AUTISMATH (CNPq / Estácio):** Plataforma gamificada desenvolvida para o ensino de matemática e raciocínio lógico focado em alunos com Transtorno do Espectro Autista (TEA).
  
* 💙 **AutiSteps & Plataforma TEA:** Soluções focadas em acessibilidade (WCAG), acompanhamento de desenvolvimento e suporte cognitivo inclusivo.

* 🎓 **Portfólios & Projetos de Alunos:** Hub de ecossistemas e aplicações de mercado desenvolvidas por alunos durante o processo de mentoria prática e ensino de lógica.

* 🛒 **Feirão Ceasa & Da Roça:** Plataformas focadas em soluções digitais de logística, distribuição e e-commerce para produtores regionais.

* 🛠️ **BRITO.TASKS / BRITO.ENGINE / BRITO.RECIPES / BRITO.WEATHER:** Ferramentas do ecossistema autoral voltadas para testes de lógica com compilador integrado, automação/padronização de commits Git e consumo de APIs RESTful.

---

## 💻 Como Rodar o Projeto Localmente

```bash
# 1. Clone o repositório
git clone https://github.com/FelipeBritoSP10/dev-portfolio-felipe-brito

# 2. Acesse a pasta do projeto
cd dev-portfolio-felipe-brito

# 3. Abra o arquivo index.html no navegador ou use a extensão Live Server no VS Code
