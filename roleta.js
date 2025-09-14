const slotText = document.getElementById("slotText");
const lever = document.getElementById("lever");

let intervaloAnimacao = null;
let textoRevelado = false;

const opcoesTexto = [
    "Backend",
    "Frontend",
    "Analista",
    "Full Stack",
    "DevOps",
    "QA",
];

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
        slotText.textContent = window.slotFinalText;
        textoRevelado = true;
    } else {
        slotText.textContent = "???";
    }
}

lever.addEventListener("click", () => {
    if (textoRevelado) return;

    iniciarAnimacao();

    setTimeout(() => {
        revelarResultado();
    }, 2000);
});