#Index.html

1. `<!DOCTYPE html>`: Esta linha define o tipo de documento HTML sendo usado, que é o padrão HTML5.

2. `<html>`: Este é o elemento raiz que envolve todo o conteúdo da página.

3. `<head>`: Esta seção contém informações sobre a página que não são visíveis para o usuário, como o título da página e links para folhas de estilo e scripts.

    - `<title>`: Define o título da página, que será exibido na guia do navegador.

    - `<link rel="stylesheet" type="text/css" href="style.css">`: Importa um arquivo de estilo externo chamado "style.css" para aplicar estilos à página.

    - `<script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs"></script>`: Importa a biblioteca TensorFlow.js, que é usada para aprendizado de máquina e visão computacional.

    - `<script src="https://cdn.jsdelivr.net/npm/@tensorflow-models/coco-ssd"></script>`: Importa um modelo específico do TensorFlow para detecção de objetos (COCO-SSD).

4. `<body>`: Esta seção contém o conteúdo visível da página, incluindo formulários, texto e elementos de mídia.

    - `<h1>`: Cria um cabeçalho de nível 1 com o texto "Formulário de Contagem de Passageiros", que é o título principal da página.

    - `<form id="passageiroForm">`: Inicia um formulário com o ID "passageiroForm", que é usado para coletar informações.

    - Várias `<label>` e `<input>`: Estes elementos formam campos de entrada para coletar informações, como horário de início do pico da linha, horário final do pico da linha, hora atual, e assim por diante.

    - `<video id="webcam" autoplay playsinline></video>`: Define um elemento de vídeo com o ID "webcam", que provavelmente será usado para capturar imagens da câmera.

    - `<p id="contador">0</p>`: Exibe um parágrafo com o ID "contador" e o valor inicial "0". Provavelmente, isso será usado para exibir o número atual de passageiros.

    - `<input type="button" value="Registrar Leitura" onclick="registrarLeitura()">`: Cria um botão com o texto "Registrar Leitura" que, quando clicado, chama a função JavaScript "registrarLeitura()".

    - `<h2>Resultado</h2>`: Cria um cabeçalho de nível 2 com o texto "Resultado".

    - `<p>Encerrar gravação</p>`: Exibe um parágrafo com o texto "Encerrar gravação".

    - `<p>Número de passageiros no horário de pico: <span id="contagem">0</span></p>`: Exibe um parágrafo que inclui o texto "Número de passageiros no horário de pico:" seguido por um elemento `<span>` com o ID "contagem" e o valor inicial "0". Provavelmente, isso será usado para exibir o resultado da contagem de passageiros.

    - `<script src="camera.js"></script>`: Importa um arquivo JavaScript externo chamado "camera.js".

    - `<script src="script.js"></script>`: Importa outro arquivo JavaScript externo chamado "script.js".

No geral, este código HTML define a estrutura da página e importa bibliotecas e scripts necessários para implementar a funcionalidade de contagem de passageiros usando TensorFlow.js e um modelo de detecção de objetos COCO-SSD. Os detalhes específicos da funcionalidade exata e do comportamento dos scripts dependem do conteúdo dos arquivos "camera.js" e "script.js", que não estão incluídos aqui.

#camera.js
Este código JavaScript está relacionado à detecção de pessoas em um vídeo usando o modelo de detecção COCO-SSD (Common Objects in Context - Single Shot MultiBox Detector) e atualiza um contador com o número de pessoas detectadas. Vou explicar o código em partes:

1. **Obtendo Referências aos Elementos HTML**:
   ```javascript
   const videoElement = document.getElementById('webcam');
   const contadorElement = document.getElementById('contador');
   ```
   - Isso cria duas variáveis: `videoElement` que referencia um elemento de vídeo com o ID "webcam" e `contadorElement` que referencia um elemento de parágrafo com o ID "contador". Essas referências são necessárias para interagir com esses elementos na página HTML.

2. **Função `iniciarDetecao`**:
   ```javascript
   async function iniciarDetecao() {
       try {
           // Carrega o modelo de detecção COCO-SSD.
           const modelo = await cocoSsd.load();

           // Obtém acesso à webcam.
           const stream = await navigator.mediaDevices.getUserMedia({ 'video': true });
           videoElement.srcObject = stream;

           // Quando o vídeo estiver carregado, inicia a detecção.
           videoElement.addEventListener('loadedmetadata', () => {
               detectarPessoas(modelo);
           });
       } catch (error) {
           console.error('Erro ao iniciar a detecção:', error);
       }
   }
   ```
   - `iniciarDetecao` é uma função assíncrona que inicia a detecção de pessoas. Ela carrega o modelo COCO-SSD, obtém acesso à webcam do usuário e inicia a detecção quando o vídeo da webcam estiver carregado. Se ocorrer algum erro, ele será registrado no console.

3. **Função `detectarPessoas`**:
   ```javascript
   async function detectarPessoas(modelo) {
       try {
           // Faz previsões a cada quadro do vídeo.
           const predictions = await modelo.detect(videoElement);

           // Filtra as previsões para contar apenas pessoas.
           const pessoas = predictions.filter(pred => pred.class === 'person');

           // Atualiza o contador.
           contadorElement.textContent = pessoas.length;

           // Agenda a próxima detecção.
           requestAnimationFrame(() => {
               detectarPessoas(modelo);
           });
       } catch (error) {
           console.error('Erro na detecção de pessoas:', error);
       }
   }
   ```
   - `detectarPessoas` é uma função assíncrona que recebe o modelo COCO-SSD como argumento. Ela faz previsões de detecção de objetos a cada quadro do vídeo da webcam. Em seguida, filtra as previsões para contar apenas as que representam pessoas ('person'). O número de pessoas é atualizado no elemento de parágrafo com o ID "contador". A função usa `requestAnimationFrame` para agendar a próxima detecção de pessoas.

4. **Iniciando a Detecção quando o Documento está Pronto**:
   ```javascript
   document.addEventListener('DOMContentLoaded', iniciarDetecao);
   ```
   - Isso adiciona um ouvinte de evento para o evento "DOMContentLoaded" do documento HTML. Quando o documento estiver completamente carregado, a função `iniciarDetecao` será chamada para iniciar a detecção de pessoas.

No geral, este código JavaScript configura a detecção em tempo real de pessoas em um vídeo da webcam, atualizando dinamicamente um contador com o número de pessoas detectadas. Ele é baseado no uso da biblioteca COCO-SSD para detecção de objetos e em recursos da API MediaDevices para acessar a webcam do usuário.

#script.js
A função `registrarLeitura()` executa várias operações para registrar uma leitura relacionada à contagem de passageiros com base nas informações fornecidas pelo usuário nos campos do formulário HTML. Vou explicar cada parte do código passo a passo:

1. **Obtendo Valores dos Campos do Formulário**:
   ```javascript
   const horaInicioPicoStr = document.getElementById("horaInicioPico").value;
   const horaFinalPicoStr = document.getElementById("horaFinalPico").value;
   const horaAtualStr = document.getElementById("horaAtual").value;
   const sensorAtivo = document.getElementById("sensorAtivo").value;
   const viagemEmAndamento = document.getElementById("viagemEmAndamento").value;
   ```
   - Aqui, a função obtém os valores dos campos do formulário com IDs "horaInicioPico", "horaFinalPico", "horaAtual", "sensorAtivo" e "viagemEmAndamento" e armazena esses valores em variáveis.

2. **Convertendo Strings de Hora em Objetos Date**:
   ```javascript
   const horaInicioPico = new Date(`1970-01-01T${horaInicioPicoStr}`);
   const horaFinalPico = new Date(`1970-01-01T${horaFinalPicoStr}`);
   const horaAtual = new Date(`1970-01-01T${horaAtualStr}`);
   ```
   - As strings de hora obtidas dos campos do formulário são usadas para criar objetos `Date`. Isso permite que você trabalhe com as horas de forma mais fácil e precisa.

3. **Obtendo Horas e Minutos dos Objetos Date**:
   ```javascript
   const horaInicioPicoHour = horaInicioPico.getHours();
   const horaInicioPicoMinute = horaInicioPico.getMinutes();
   const horaFinalPicoHour = horaFinalPico.getHours();
   const horaFinalPicoMinute = horaFinalPico.getMinutes();
   const horaAtualHour = horaAtual.getHours();
   const horaAtualMinute = horaAtual.getMinutes();
   ```
   - Os objetos `Date` criados nas etapas anteriores são usados para extrair as horas e minutos correspondentes.

4. **Inicializando Variáveis de Contagem**:
   ```javascript
   let contador = parseFloat(document.getElementById("contador").textContent);
   let contagem = parseFloat(document.getElementById("contagem").textContent);
   ```
   - Essas variáveis são usadas para rastrear o valor atual do contador e a contagem acumulada. Os valores iniciais são obtidos dos elementos HTML com IDs "contador" e "contagem" e convertidos para números de ponto flutuante.

5. **Verificando a Condição**:
   ```javascript
   if (
       (horaAtualHour > horaInicioPicoHour || (horaAtualHour === horaInicioPicoHour && horaAtualMinute >= horaInicioPicoMinute)) &&
       (horaAtualHour < horaFinalPicoHour || (horaAtualHour === horaFinalPicoHour && horaAtualMinute <= horaFinalPicoMinute)) &&
       sensorAtivo === "sim"
   ) {
       contagem += contador;
   }
   ```
   - Esta seção verifica se a hora atual está dentro do intervalo especificado pelo usuário (entre `horaInicioPico` e `horaFinalPico`) e se o sensor está ativo ("sim"). Se todas essas condições forem atendidas, o valor atual do contador é adicionado à contagem acumulada.

6. **Atualizando o Elemento HTML com a Contagem Atualizada**:
   ```javascript
   document.getElementById("contagem").textContent = contagem.toString();
   ```
   - Finalmente, o valor da contagem acumulada é convertido em uma string e atualiza o conteúdo do elemento HTML com o ID "contagem" para refletir a nova contagem.

Em resumo, esta função lida com a lógica para registrar uma leitura de contagem de passageiros com base nas informações fornecidas pelo usuário e as condições de tempo especificadas. Ela extrai valores de hora, verifica condições e atualiza o contador de contagem na página da web.

#script.js

Este é um trecho de código CSS que define estilos para os elementos HTML em uma página da web. Ele controla a aparência e o layout da página. Vou explicar cada parte do código:

1. **Estilos para o elemento `<html>`**:
   ```css
   html {
       height: 100%;
       width: 100%;
   }
   ```
   - Isso define a altura e largura do elemento `<html>` para ocupar 100% da altura e largura da janela do navegador. Isso é comumente usado para garantir que o conteúdo da página ocupe toda a área visível do navegador.

2. **Estilos para o elemento `<body>`**:
   ```css
   body {
       font-family: Arial, sans-serif;
       background-color: #f0f0f0;
       margin: 0;
       padding: 0;
   }
   ```
   - Define a fonte padrão para o texto do corpo como Arial ou uma fonte sans-serif genérica. Também define a cor de fundo como um cinza claro (#f0f0f0) e remove margens (margin) e preenchimento (padding) padrão do corpo do documento.

3. **Estilos para os cabeçalhos `<h1>` e `<h2>`**:
   ```css
   h1, h2 {
       background-color: #0074cc;
       color: #fff;
   }
   h1 {
       text-align: center;
       padding: 20px 0;
       margin: 0;
   }
   h2 {
       padding: 10px;
       margin-top: 30px;
   }
   ```
   - Define a cor de fundo azul (#0074cc) e a cor do texto branco (#fff) para os cabeçalhos `<h1>` e `<h2>`. Além disso, o `<h1>` é centralizado horizontalmente, tem um preenchimento superior e inferior de 20px e margem inferior zero, enquanto o `<h2>` tem um preenchimento de 10px e uma margem superior de 30px.

4. **Estilos para o elemento `<form>`**:
   ```css
   form {
       max-width: 400px;
       margin: 20px auto;
       padding: 20px;
       background-color: #fff;
       box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
   }
   ```
   - Define um limite máximo de largura para o formulário de 400px, centraliza-o horizontalmente na página, adiciona preenchimento interno de 20px, define um fundo branco (#fff) e aplica uma sombra sutil usando `box-shadow`.

5. **Estilos para rótulos `<label>`**:
   ```css
   label {
       display: block;
       margin-top: 10px;
       font-weight: bold;
   }
   ```
   - Define os rótulos como elementos de bloco (`display: block`), o que faz com que apareçam em uma nova linha, adiciona um espaço superior de 10px e define a fonte em negrito (font-weight: bold).

6. **Estilos para campos de entrada `<input>` e seletores `<select>`**:
   ```css
   input[type="number"],
   select {
       width: 100%;
       padding: 8px;
       margin-top: 5px;
       margin-bottom: 15px;
       border: 1px solid #ccc;
       border-radius: 4px;
   }
   ```
   - Define os campos de entrada do tipo número (`input[type="number"]`) e seletores (`select`) para ocupar 100% da largura, adiciona preenchimento interno de 8px, espaços superiores e inferiores, aplica uma borda de 1px sólida cinza (#ccc) e bordas arredondadas com 4px de raio.

7. **Estilos para parágrafos `<p>`**:
   ```css
   p {
       font-weight: bold;
   }
   ```
   - Define os parágrafos para usar texto em negrito (font-weight: bold).

8. **Estilos para botões `<input type="button">`**:
   ```css
   input[type="button"] {
       background-color: #0074cc;
       color: #fff;
       border: none;
       padding: 10px 20px;
       cursor: pointer;
   }
   input[type="button"]:hover {
       background-color: #005aa3;
   }
   ```
   - Define os botões de entrada do tipo botão (`input[type="button"]`) com uma cor de fundo azul (#0074cc), texto branco (#fff), remove a borda padrão, adiciona preenchimento de 10px na vertical e 20px na horizontal, e muda o cursor para uma mão (cursor: pointer). Além disso, quando o botão é hover, ou seja, quando o mouse passa por cima, a cor de fundo muda para um tom mais escuro de azul (#005aa3).

9. **Estilos para o elemento com ID "contagem"**:
   ```css
   #contagem {
       font-weight: bold;
       font-size: 18px;
   }
   ```
   - Define o elemento com o ID "contagem" para usar texto em negrito (font-weight: bold) e um tamanho de fonte de 18 pixels (font-size: 18px).

10. **Estilos para o elemento com ID "webcam"**:
    ```css
    #webcam {
        width: 100%;
    }
    ```
    - Define o elemento com o ID "webcam" para ocupar 100% da largura da área disponível. Isso geralmente é usado para dimensionar a captura de vídeo da webcam para a largura da página.

Esses estilos em cascata ajudam a definir a aparência e o layout dos elementos HTML em sua página da web, garantindo uma experiência visual consistente e agradável para os usuários.