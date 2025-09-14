let pesoBackend = 0;
let pesoFrontend = 0;
let pesoAnalista = 0;
let prompt =
    "Mostre um caminho claro para um usuario que fez um teste de especialidade em tech de forma sucinta em 150 palavras. o resultado foi: ";
let APIurl =
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";
let APIKey = "";

const modal = document.getElementById("modal");

const perguntas = [
    {
        texto: "Você tem mais interesse em:",
        opcoes: [
            {
                texto: "Criar as partes funcionais de um projeto",
                valor: "backend,analista",
            },
            {
                texto: "Criar as parte visuais de um projeto",
                valor: "frontend",
            },
            {
                texto: "Analisar e organizar as informações de um projeto",
                valor: "analista,backend",
            },
        ],
    },
    {
        texto: "Você se sente a vontade realizando tarefas no console do computador?",
        opcoes: [
            { texto: "Sim", valor: "backend,analista" },
            { texto: "Não", valor: "frontend" },
        ],
    },
    {
        texto: "Qual tarefa te parece mais interessante?",
        opcoes: [
            { texto: "Resolver problemas de software", valor: "backend" },
            {
                texto: "Criar o layout de uma aplicação/site",
                valor: "frontend",
            },
            { texto: "Organizar informações", valor: "analista" },
        ],
    },
    {
        texto: "Você se sente a vontade usando um computador com Linux?",
        opcoes: [
            { texto: "Sim", valor: "backend,analista" },
            { texto: "Não", valor: "frontend" },
        ],
    },
    {
        texto: "Qual dessas habilidades você tem maior proficiência?",
        opcoes: [
            { texto: "Resolução de problemas", valor: "backend" },
            { texto: "Criatividade", valor: "frontend" },
            { texto: "Análise", valor: "analista" },
        ],
    },
    {
        texto: "Que tipo de sintaxe de linguagem você gosta?",
        opcoes: [
            { texto: "Verbosa", valor: "backend" },
            { texto: "Simples", valor: "analista" },
        ],
    },
    {
        texto: "O que você acha mais interessante?",
        opcoes: [
            { texto: "Desenvolver funcionalidades", valor: "backend" },
            { texto: "Criar interfaces visuais", valor: "frontend" },
            { texto: "Analisar dados", valor: "analista" },
        ],
    },
    {
        texto: "Qual linguagem você prefere?",
        opcoes: [
            { texto: "Java", valor: "backend" },
            { texto: "JavaScript", valor: "frontend" },
            { texto: "PHP", valor: "backend,frontend" },
        ],
    },
    {
        texto: "Você gosta de trabalhar com instalação e configurações?",
        opcoes: [
            { texto: "Sim", valor: "backend" },
            { texto: "Não", valor: "frontend" },
        ],
    },
    {
        texto: "Você é uma pessoa que gosta de sistemas com visuais modernos?",
        opcoes: [
            { texto: "Sim", valor: "frontend" },
            { texto: "Não", valor: "backend,analista" },
        ],
    },
];

let perguntaAtual = 0;

function fadeOut(element, callback) {
    element.style.transition = "opacity 0.4s";
    element.style.opacity = 0;
    setTimeout(() => {
        if (callback) callback();
    }, 400);
}

function fadeIn(element) {
    element.style.transition = "opacity 0.4s";
    element.style.opacity = 0;
    setTimeout(() => {
        element.style.opacity = 1;
    }, 10);
}

function atualizarPergunta() {
    const container = document.getElementById("pergunta-container");
    const app = document.querySelector(".app");
    if (!container) return;

    fadeOut(container, async () => {
        container.innerHTML = "";

        app.style.width = "600px";
        app.style.height = "300px";
        app.style.marginRight = "0";

        if (perguntaAtual < perguntas.length) {
            container.style.display = "block";
            const pergunta = perguntas[perguntaAtual];
            const titulo = document.createElement("h3");
            titulo.textContent = `Pergunta ${perguntaAtual + 1}: ${
                pergunta.texto
            }`;
            titulo.style.marginBottom = "24px";
            container.appendChild(titulo);

            pergunta.opcoes.forEach((opcao, idx) => {
                const label = document.createElement("label");
                label.style.display = "block";
                label.style.marginBottom = "16px";
                const input = document.createElement("input");
                input.type = "radio";
                input.name = `pergunta${perguntaAtual + 1}`;
                input.value = opcao.valor;
                label.appendChild(input);
                label.appendChild(document.createTextNode(" " + opcao.texto));
                container.appendChild(label);
            });

            const btn = document.createElement("button");
            btn.textContent = "Próxima";
            btn.className = "submit-button";
            btn.style.marginTop = "32px";
            btn.onclick = () => {
                const selecionado = container.querySelector(
                    'input[type="radio"]:checked'
                );
                if (selecionado) {
                    const valores = selecionado.value.split(",");
                    valores.forEach((v) => {
                        if (v.trim() === "backend") pesoBackend++;
                        if (v.trim() === "frontend") pesoFrontend++;
                        if (v.trim() === "analista") pesoAnalista++;
                    });
                    perguntaAtual++;
                    atualizarPergunta();
                } else {
                    alert("Selecione uma opção!");
                }
            };
            container.appendChild(btn);
        } else {
            let resultado = "";
            let imgSrc = "";
            let alt = "";

            if (pesoBackend > pesoFrontend && pesoBackend > pesoAnalista) {
                resultado = "Backend";
                imgSrc = "/img/cyborg.webp";
                alt = "Backend";
            } else if (
                pesoFrontend > pesoBackend &&
                pesoFrontend > pesoAnalista
            ) {
                resultado = "Frontend";
                imgSrc = "/img/johnnybravo.webp";
                alt = "Frontend";
            } else if (
                pesoAnalista > pesoBackend &&
                pesoAnalista > pesoFrontend
            ) {
                resultado = "Analista de Dados";
                imgSrc = "/img/dexter.webp";
                alt = "Analista de Dados";
            } else {
                resultado = "Generalista de TI";
                imgSrc = "/img/descubra.webp";
                alt = "Generalista de TI";
            }

            window.slotFinalText = resultado;
            window.slotFinalImage = imgSrc;
            window.slotFinalAlt = alt;

            container.style.display = "none";

            if (modal) {
                modal.classList.add("active");
            }
        }
        fadeIn(container);
    });
}

const closeModalBtn = document.getElementById("closeModal");
if (closeModalBtn) {
    closeModalBtn.addEventListener("click", () => {
        const modal = document.getElementById("modal");
        modal.classList.remove("active");

        const finalResult = window.slotFinalText || "Resultado não disponível";
        const finalImgSrc = window.slotFinalImage || null;
        const finalAlt = window.slotFinalAlt || null;

        showLoadingState(finalResult, finalImgSrc, finalAlt);

        callAPI(`${prompt} ${finalResult}`).then((text) => {
            displayResult(text);
        });
    });
}

function showLoadingState(resultado, imgSrc, alt) {
    const resultContainer = document.querySelector("#result");
    const container = document.getElementById("pergunta-container");
    const heading = document.querySelector("#heading");
    const main = document.querySelector("main");
    const app = document.querySelector(".app");

    heading.style.display = "none";
    main.style.display = "flex";
    main.style.flexDirection = "row";
    main.style.justifyContent = "center";
    main.style.alignItems = "flex-start";
    app.style.width = "400px";
    app.style.height = "auto";
    app.style.transition = "width 0.5s ease-in";
    app.style.marginRight = "50px";
    app.style.justifyContent = "start";
    app.style.marginTop = "140px";

    container.style.display = "flex";
    container.style.flexDirection = "column";
    container.style.alignItems = "center";
    container.innerHTML = "";

    const tituloResultado = document.createElement("strong");
    tituloResultado.textContent = `Seu perfil é: ${resultado}`;
    tituloResultado.style.fontSize = "1.5rem";
    tituloResultado.style.marginTop = "20px";
    container.appendChild(tituloResultado);

    if (imgSrc) {
        const img = document.createElement("img");
        img.src = imgSrc;
        img.alt = alt;
        img.style.maxWidth = "220px";
        img.style.marginTop = "24px";
        container.appendChild(img);

        if (resultado === "Generalista de TI") {
            setTimeout(() => {
                img.src = "/img/edward.png";
            }, 2500);
        }
    }
    

    resultContainer.style.backgroundColor = "#6272A4";
    resultContainer.style.padding = "20px";
    resultContainer.style.borderRadius = "8px";
    resultContainer.style.width = "500px";
    resultContainer.style.transition = "all 0.6s ease";
    resultContainer.style.marginTop = "120px";
    resultContainer.innerHTML = "Carregando dicas...";
}

function displayResult(text) {
    const resultContainer = document.querySelector("#result");
    const parseText = marked.parse(text);

    resultContainer.innerHTML = parseText;

    const paragraphs = resultContainer.querySelectorAll("p");
    paragraphs.forEach((paragraph) => {
        paragraph.style.color = "#dedfe3ff";
        paragraph.style.fontSize = "16px";
        paragraph.style.lineHeight = "1.6";
    });

    const strongs = resultContainer.querySelectorAll("strong");
    strongs.forEach((strong) => {
        strong.style.color = "#ffffffff";
        strong.style.fontWeight = "bold";
    });

    const olists = resultContainer.querySelectorAll("ol");
    olists.forEach((olist) => {
        olist.style.paddingLeft = "20px";
        olist.style.marginBottom = "15px";
        olist.style.listStyleType = "decimal";
    });

    const ulists = resultContainer.querySelectorAll("ul");
    ulists.forEach((ulist) => {
        ulist.style.paddingLeft = "20px";
        ulist.style.marginBottom = "15px";
        ulist.style.listStyleType = "disc";
    });

    const listItems = resultContainer.querySelectorAll("li");
    listItems.forEach((item) => {
        item.style.marginBottom = "6px";
        item.style.color = "#dedfe3ff";
        item.style.fontSize = "15px";
    });
}

async function callAPI(prompt) {
    try {
        const response = await fetch(APIurl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-goog-api-key": `${APIKey}`,
            },
            body: JSON.stringify({
                contents: [
                    {
                        parts: [
                            {
                                text: prompt,
                            },
                        ],
                    },
                ],
            }),
        });
        const data = await response.json();
        console.log(data.candidates[0].content.parts[0].text);
        return data.candidates[0].content.parts[0].text;
    } catch (error) {
        console.error("Erro ao obter resposta:", error);
    }
}