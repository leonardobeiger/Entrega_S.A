// Obtenha uma referência ao elemento de vídeo e ao parágrafo do contador.
const videoElement = document.getElementById('webcam');
const contadorElement = document.getElementById('contador');

// Função para iniciar a detecção de pessoas.
async function iniciarDetecao() {
    try {
        // Carregue o modelo de detecção COCO-SSD.
        const modelo = await cocoSsd.load();

        // Obtenha acesso à webcam.
        const stream = await navigator.mediaDevices.getUserMedia({ 'video': true });
        videoElement.srcObject = stream;

        // Quando o vídeo estiver carregado, comece a detecção.
        videoElement.addEventListener('loadedmetadata', () => {
            detectarPessoas(modelo);
        });
    } catch (error) {
        console.error('Erro ao iniciar a detecção:', error);
    }
}

// Função para detectar pessoas e atualizar o contador.
async function detectarPessoas(modelo) {
    try {
        // Faça previsões a cada quadro do vídeo.
        const predictions = await modelo.detect(videoElement);

        // Filtre as previsões para contar apenas pessoas.
        const pessoas = predictions.filter(pred => pred.class === 'person');

        // Atualize o contador.
        contadorElement.textContent = pessoas.length;

        // Agende a próxima detecção.
        requestAnimationFrame(() => {
            detectarPessoas(modelo);
        });
    } catch (error) {
        console.error('Erro na detecção de pessoas:', error);
    }
}


// Inicie a detecção quando o documento estiver pronto.
document.addEventListener('DOMContentLoaded', iniciarDetecao);
