const slotText = document.getElementById("slotText");
const lever = document.getElementById("lever");

let intervaloAnimacao = null;
let textoRevelado = false;

const opcoesTexto = [
    "Camiseta Backend",
    "Bootcamp Frontend",
    "Caneca Analista de dados",
    "Consultoria Full Stack",
    "Curso DevOps",
    "Curso QA",
];

const premiosPorPerfil = {
    "Backend": "Camiseta Backend",
    "Frontend": "Bootcamp Frontend",
    "Analista de Dados": "Caneca Analista de dados",
    "Generalista de TI": "Consultoria Full Stack"
};

function iniciarAnimacao() {
    let contador = 0;
    intervaloAnimacao = setInterval(() => {
        slotText.textContent = opcoesTexto[contador % opcoesTexto.length];
        contador++;
    }, 80);
}

function revelarResultado() {
    if (intervaloAnimacao) {
        clearInterval(intervaloAnimacao);
        intervaloAnimacao = null;
    }
    if (window.slotFinalText) {
        const premio = premiosPorPerfil[window.slotFinalText] || "Curso QA";
        slotText.textContent = premio;
        textoRevelado = true;
    } else {
        slotText.textContent = "???";
    }
}

function resetarRoleta() {
    textoRevelado = false;
    slotText.textContent = "";
}

lever.addEventListener("click", () => {
    if (textoRevelado) return;

    iniciarAnimacao();

    setTimeout(() => {
        revelarResultado();
    }, 2000);
});