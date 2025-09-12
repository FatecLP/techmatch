
let pesoBackend = 0;
let pesoFrontend = 0;
let pesoAnalista = 0;
let prompt = "Mostre um caminho claro para um usuario que fex um teste de especialidade em tech em 50 palavras o resultado foi: "
let APIurl = 'https://api.openai.com/v1/chat/completions'
let APIKey = ''
const perguntas = [
    {
        texto: "Você tem mais interesse em:",
        opcoes: [
            { texto: "Criar as partes funcionais de um projeto", valor: "backend,analista" },
            { texto: "Criar as parte visuais de um projeto", valor: "frontend" },
            { texto: "Analisar e organizar as informações de um projeto", valor: "analista,backend" }
        ]
    },
    {
        texto: "Você se sente a vontade realizando tarefas no console do computador?",
        opcoes: [
            { texto: "Sim", valor: "backend,analista" },
            { texto: "Não", valor: "frontend" }
        ]
    },
    {
        texto: "Qual tarefa te parece mais interessante?",
        opcoes: [
            { texto: "Resolver problemas de software", valor: "backend" },
            { texto: "Criar o layout de uma aplicação/site", valor: "frontend" },
            { texto: "Organizar informações", valor: "analista" }
        ]
    },
    {
        texto: "Você se sente a vontade usando um computador com Linux?",
        opcoes: [
            { texto: "Sim", valor: "backend,analista" },
            { texto: "Não", valor: "frontend" }
        ]
    },
    {
        texto: "Qual dessas habilidades você tem maior proficiência?",
        opcoes: [
            { texto: "Resolução de problemas", valor: "backend" },
            { texto: "Criatividade", valor: "frontend" },
            { texto: "Análise", valor: "analista" }
        ]
    },
    {
        texto: "Que tipo de sintaxe de linguagem você gosta?",
        opcoes: [
            { texto: "Verbosa", valor: "backend" },
            { texto: "Simples", valor: "analista" }
        ]
    },
    {
        texto: "O que você acha mais interessante?",
        opcoes: [
            { texto: "Desenvolver funcionalidades", valor: "backend" },
            { texto: "Criar interfaces visuais", valor: "frontend" },
            { texto: "Analisar dados", valor: "analista" }
        ]
    },
    {
        texto: "Qual linguagem você prefere?",
        opcoes: [
            { texto: "Java", valor: "backend" },
            { texto: "JavaScript", valor: "frontend" },
            { texto: "PHP", valor: "backend,frontend" }
        ]
    },
    {
        texto: "Você gosta de trabalhar com instalação e configurações?",
        opcoes: [
            { texto: "Sim", valor: "backend" },
            { texto: "Não", valor: "frontend" }
        ]
    },
    {
        texto: "Você é uma pessoa que gosta de sistemas com visuais modernos?",
        opcoes: [
            { texto: "Sim", valor: "frontend" },
            { texto: "Não", valor: "backend,analista" }
        ]
    },
];

let perguntaAtual = 0;

function fadeOut(element, callback) {
    element.style.transition = 'opacity 0.4s';
    element.style.opacity = 0;
    setTimeout(() => {
        if (callback) callback();
    }, 400);
}

function fadeIn(element) {
    element.style.transition = 'opacity 0.4s';
    element.style.opacity = 0;
    setTimeout(() => {
        element.style.opacity = 1;
    }, 10);
}

function atualizarPergunta() {
    const container = document.getElementById('pergunta-container');
    if (!container) return;

    fadeOut(container, () => {
        container.innerHTML = '';

        if (perguntaAtual < perguntas.length) {
            const pergunta = perguntas[perguntaAtual];
            const titulo = document.createElement('h3');
            titulo.textContent = `Pergunta ${perguntaAtual + 1}: ${pergunta.texto}`;
            titulo.style.marginBottom = '24px';
            container.appendChild(titulo);

            pergunta.opcoes.forEach((opcao, idx) => {
                const label = document.createElement('label');
                label.style.display = 'block';
                label.style.marginBottom = '16px';
                const input = document.createElement('input');
                input.type = 'radio';
                input.name = `pergunta${perguntaAtual + 1}`;
                input.value = opcao.valor;
                label.appendChild(input);
                label.appendChild(document.createTextNode(' ' + opcao.texto));
                container.appendChild(label);
            });

            const btn = document.createElement('button');
            btn.textContent = 'Próxima';
            btn.className = 'submit-button';
            btn.style.marginTop = '32px';
            btn.onclick = () => {
                const selecionado = container.querySelector('input[type="radio"]:checked');
                if (selecionado) {
                    const valores = selecionado.value.split(',');
                    valores.forEach(v => {
                        if (v.trim() === 'backend') pesoBackend++;
                        if (v.trim() === 'frontend') pesoFrontend++;
                        if (v.trim() === 'analista') pesoAnalista++;
                    });
                    perguntaAtual++;
                    atualizarPergunta();
                } else {
                    alert('Selecione uma opção!');
                }
            };
            container.appendChild(btn);
        } else {
            let resultado = '';
            let imgSrc = '';
            let alt = '';
            let text = ''
            if (pesoBackend > pesoFrontend && pesoBackend > pesoAnalista) {
                resultado = 'Backend';
                imgSrc = '/img/cyborg.webp';
                alt = 'Backend';
                text = callAPI(`${prompt} ${resultado}`)
                console.log(text)
            } else if (pesoFrontend > pesoBackend && pesoFrontend > pesoAnalista) {
                resultado = 'Frontend';
                imgSrc = '/img/johnnybravo.webp';
                alt = 'Frontend';
                text = callAPI(prompt + resultado)
                console.log(text)
            } else if (pesoAnalista > pesoBackend && pesoAnalista > pesoFrontend) {
                resultado = 'Analista de Dados';
                imgSrc = '/img/dexter.png';
                alt = 'Analista de Dados';
                text = callAPI(prompt + resultado)
                console.log(text)
            } else {
                resultado = 'Seus resultados foram muito equilibrados. Você tem potencial para ser um futuro full stack';
            }
            container.innerHTML = `<strong>Fim das perguntas!</strong><br><br><span>Seu perfil é: <b>${resultado}</b></span><br><br>`;
            if (imgSrc) {
                const img = document.createElement('img');
                img.src = imgSrc;
                img.alt = alt;
                img.style.maxWidth = '220px';
                img.style.marginTop = '24px';
                container.appendChild(img);
            }
        }
        fadeIn(container);
    });
}
async function callAPI(prompt) {
    try {
        const response = await fetch(APIurl,
            {
                method : 'POST',
                headers : {
                    'Content-Type': "application/json",
                     "x-goog-api-key": `${APIKey}`
                },
                body : JSON.stringify({
                    contents : [
                        {
                            parts: [
                                {
                                    text : prompt
                                }
                            ]
                        }
                    ]
                })
            }
        )
        const data = await response.json()
        console.log(data.candidates[0].content.parts[0].text)
        return data.candidates[0].content.parts[0].text
    }
   catch (error) {
    console.error("Erro ao obter resposta:", error);
  }
    
}