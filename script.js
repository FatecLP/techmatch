let pesoBackend = 0;
let pesoFrontend = 0;
let pesoAnalista = 0;
let prompt =
    "Mostre um caminho claro para um usuario que fez um teste de especialidade em tech de forma sucinta em 150 palavras. o resultado foi: ";
let APIurl =
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";
let APIKey = "AIzaSyD7C0LNlyT-FOQH9KtCXLarICe-BI0ih3c";

const modal = document.getElementById("modal");

const perguntas = [];

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
                        const valorPadrao = v.trim().toLowerCase();
                        if (valorPadrao === "backend") pesoBackend++;
                        if (valorPadrao === "frontend") pesoFrontend++;
                        if (valorPadrao === "analista" || valorPadrao === "analista de dados") pesoAnalista++;
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
            const resultContainer = document.querySelector("#result");
            if (resultContainer && !document.getElementById("btn-reiniciar-quiz")) {
                const btnReiniciar = document.createElement("button");
                btnReiniciar.textContent = "Refazer Quiz";
                btnReiniciar.style.padding = "5px 10px";
                btnReiniciar.id = "btn-reiniciar-quiz";
                btnReiniciar.style.marginTop = "24px";
                btnReiniciar.onclick = () => {
                    iniciarQuiz();
                };
                resultContainer.appendChild(btnReiniciar);
            }
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

async function gerarPerguntasGemini(tema = "tecnologia e carreiras em TI") {
    const promptGerar = `Gere um array JSON de 10 perguntas para um quiz sobre ${tema}. Cada pergunta deve ter o formato: { texto: 'Pergunta', opcoes: [ { texto: 'Opção 1', valor: 'backend|frontend|analista' }, ... ] }. As opções devem ser relevantes e balanceadas para cada perfil. Responda apenas com o array JSON, sem explicações.`;
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
                                text: promptGerar,
                            },
                        ],
                    },
                ],
            }),
        });
        const data = await response.json();
        const texto = data.candidates[0].content.parts[0].text;
        let perguntasGeradas = [];
        try {
            perguntasGeradas = JSON.parse(texto);
        } catch (e) {
            const match = texto.match(/\[.*\]/s);
            if (match) {
                perguntasGeradas = JSON.parse(match[0]);
            } else {
                throw new Error("Não foi possível converter a resposta em JSON.");
            }
        }
        perguntas.length = 0;
        perguntas.push(...perguntasGeradas);
        perguntaAtual = 0;
        atualizarPergunta();
    } catch (error) {
        console.error("Erro ao gerar perguntas pelo Gemini:", error);
        alert("Erro ao gerar perguntas. Tente novamente.");
    }
}

function iniciarQuiz() {
    pesoBackend = 0;
    pesoFrontend = 0;
    pesoAnalista = 0;
    perguntaAtual = 0;
    window.slotFinalText = undefined;
    window.slotFinalImage = undefined;
    window.slotFinalAlt = undefined;
    if (typeof resetarRoleta === 'function') {
        resetarRoleta();
    } else if (window.resetarRoleta) {
        window.resetarRoleta();
    }
    const resultContainer = document.querySelector("#result");
    if (resultContainer) {
        resultContainer.innerHTML = "";
        resultContainer.style.backgroundColor = "";
        resultContainer.style.padding = "";
        resultContainer.style.borderRadius = "";
        resultContainer.style.width = "";
        resultContainer.style.marginTop = "";
    }
    gerarPerguntasGemini();
}

window.addEventListener('DOMContentLoaded', () => {
    iniciarQuiz();
});