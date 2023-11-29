import React, { useState, useRef, useEffect } from 'react';
import './style.css'; // Certifique-se de ter o arquivo style.css no mesmo diretório

const ArnoldMap = () => {
  const [iteration, setIteration] = useState(0);
  const canvasRef = useRef(null);
  let canvasCtx, imgData, imgOriginal, imgNext;

  useEffect(() => {
    canvasCtx = canvasRef.current.getContext("2d");
    imgOriginal = canvasCtx.getImageData(0, 0, canvasRef.current.width, canvasRef.current.height);
  }, []);

  const refreshVariables = () => {
    imgData = canvasCtx.getImageData(0, 0, canvasRef.current.width, canvasRef.current.height);
    imgNext = canvasCtx.getImageData(0, 0, canvasRef.current.width, canvasRef.current.height);
  };

  const nextIteration = () => {
    // Limpa variáveis
  refreshVariables();

  // Faz a próxima iteração
  var data = imgData.data;
  var nextData = imgNext.data;
  var source = 0;
  var dataWidth = Math.sqrt(data.length >> 2);
  for (var y = 0; y < dataWidth; y++) {  // Varre os elementos y da matriz
    for (var x = 0; x < dataWidth; x++) {  // Varre os elementos x da matriz
      var xNew = (2 * x + y) % dataWidth; // Define o novo x como 2x + y (módulo do tamanho da imagem)
      var yNew = (x + y) % dataWidth; // Define o novo y como x + y (módulo do tamanho da imagem)
      // Isso é o mesmo que dizer que T(x, y) = (2x + y, x + y).
      var destination = (yNew * dataWidth + xNew) * 4;
        for (var j=0; j<4; j++) {
          // Transformação para a frente
          nextData[destination++] = data[source++];
        }
    }
  }
    // Salva a iteração num local temporário
    var tmp = imgData;
    imgData = imgNext;
    imgNext = tmp;

    // Salva a iteração no canvas
    canvasCtx.putImageData(imgData, 0, 0)

    // Atualiza a iteração
    iteration++;
    document.getElementById("it-number").innerHTML = iteration;
  };

  const previousIteration = () => {
    refreshVariables();
    
  // Faz a próxima iteração
  var data = imgData.data;
  var nextData = imgNext.data;
  var source = 0;
  var dataWidth = Math.sqrt(data.length >> 2);
  for (var y = 0; y < dataWidth; y++) {  // Varre os elementos y da matriz
    for (var x = 0; x < dataWidth; x++) {  // Varre os elementos x da matriz
      var xNew = (2 * x + y) % dataWidth;
      var yNew = (x + y) % dataWidth;
      var destination = (yNew * dataWidth + xNew) * 4;
        for (var j=0; j<4; j++) {
          // Transformação para trás
          nextData[source++] = data[destination++];
          // Aqui temos uma pequena diferença nessa linha: o source e o destination da imagem estão trocados.
          // Estamos fazendo a inversa da transformação
          // Isso é o mesmo que dizer que T(2x + y, x + y) = (2x + y, x + y).
        }
    }
  }
  // Salva a iteração num local temporário
  var tmp = imgData;
  imgData = imgNext;
  imgNext = tmp;

  // Salva a iteração no canvas
  canvasCtx.putImageData(imgData, 0, 0)

  // Atualiza a iteração
  iteration--;
  document.getElementById("it-number").innerHTML = iteration;
  };

  const iterateUntilOriginal = () => {
    // Limpa variáveis
    refreshVariables();
    // Itera quantas vezes for necessário, até a matriz ficar original.
    // TODO
  };

  const startDashboard = () => {
    document.getElementById("greetings").classList.add("hidden");
    document.getElementById("top-navbar").classList.remove("hidden");
    document.getElementById("dashboard").classList.remove("hidden");
  };

  const greet = () => {
    document.getElementById("greetings").classList.remove("hidden");
    document.getElementById("top-navbar").classList.add("hidden");
    document.getElementById("dashboard").classList.add("hidden");
  };

  // ... restante do código

  return (
    <div>
        <html className="no-js">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <title>Mapa do Gato de Arnold</title>
        <meta name="description" content="Gato de Arnold" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/skeleton/2.0.4/skeleton.min.css" />
        <link rel="stylesheet" href="style.css" />

        <link href="https://fonts.googleapis.com/css?family=Montserrat" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css?family=Fira+Sans" rel="stylesheet" />

        <link rel="shortcut icon" href="favicon.png" type="image/x-icon" />
        <link rel="apple-touch-icon-precomposed" href="favicon.png" />
      </head>
      <body>
        <div>
          <canvas id="arnold-canvas" ref={canvasRef}></canvas>
          {/* Restante do código HTML */}
        </div>

        {/* Código React */}
        <script>
        {`
    function loadImage(){
        function initialize() {
    
          var fileSelect    = document.getElementById('file-upload'),
              fileDrag      = document.getElementById('file-drag');
      
          fileSelect.addEventListener('change', fileSelectHandler, false);
      
          // Verifica se o XHR2 está disponível
          var xhr = new XMLHttpRequest();
          if (xhr.upload) {
            // Espera pelo arraste do arquivo
            fileDrag.addEventListener('dragover', fileDragHover, false);
            fileDrag.addEventListener('dragleave', fileDragHover, false);
            fileDrag.addEventListener('drop', fileSelectHandler, false);
          }
        }
      
        function fileDragHover(e) {
          var fileDrag = document.getElementById('file-drag');
      
          e.stopPropagation();
          e.preventDefault();
      
          fileDrag.className = (e.type === 'dragover' ? 'hover' : 'modal-body file-upload');
        }
      
        function fileSelectHandler(e) {
          // Salva numa variável o objeto FileList
          var files = e.target.files || e.dataTransfer.files;
      
          // Cancela o evento e animação de hover
          fileDragHover(e);
      
          // Processa o objeto File
          for (var i = 0, f; f = files[i]; i++) {
            parseFile(f);
          }
        }
      
        // Saída
        function output(msg) {
          // Resposta
          var m = document.getElementById('messages');
          m.innerHTML = msg;
        }
        
        function parseFile(file) {
      
            output(
            'Altere a imagem clicando aqui ou arrastando outra imagem.'
          );
          
          // var fileType = file.type;
          var imageName = file.name;
      
          var isGood = (/\.(?=gif|jpg|png|jpeg)/gi).test(imageName);
          if (isGood) {
            document.getElementById('start').classList.add("hidden");
            document.getElementById('response').classList.remove("hidden");
            document.getElementById('notimage').classList.add("hidden");
            // Carrega a visualização da imagem
            document.getElementById('file-image').classList.remove("hidden");
            document.getElementById('file-image').src = URL.createObjectURL(file);
            document.getElementById("panel").classList.remove("hidden");
            // Remove antigo canvas
            let oldCanvas = document.getElementById('arnold-canvas')
            oldCanvas.parentNode.removeChild(oldCanvas);
    
            setTimeout(function(){
              // Desenha o canvas novo
              document.getElementById("panel").insertBefore(loadCanvas(document.getElementById('file-image')), document.getElementById('file-image'));
    
              // Esconde a imagem
              document.getElementById("file-image").classList.add("hidden");
    
              // Configura o painel
              canvasCtx = document.getElementById('arnold-canvas').getContext("2d");
              iteration = 0;
              document.getElementById("it-number").innerHTML = iteration;
    
    
              // Salva a imagem original
              imgOriginal = canvasCtx.getImageData(0, 0, document.getElementById('arnold-canvas').width, document.getElementById('arnold-canvas').height);
    
            }, 400); // 400 milissegundos pra não travar rs
    
          }
          else {
            document.getElementById('notimage').classList.remove("hidden");
            document.getElementById('start').classList.remove("hidden");
            document.getElementById('response').classList.add("hidden");
            document.getElementById("file-upload-form").reset();
            document.getElementById("panel").classList.add("hidden");
          }
        }
      
        // Verifica se existe suporte ao File API.
        if (window.File && window.FileList && window.FileReader) {
          initialize();
        } else {
          document.getElementById('file-drag').style.display = 'none';
        }
      }
      loadImage();
    
    function loadCanvas(image) {
      // Parametriza o canvas novo, desenha a imagem e retorna
      var canvas = document.createElement("canvas");
      canvas.id = "arnold-canvas"
      canvas.width = image.width;
      canvas.height = image.width;
      canvas.getContext("2d").drawImage(image, 0, 0, canvas.width, canvas.width);
      
      return canvas;
    }
    
    function refreshVariables() {
      imgData = canvasCtx.getImageData(0, 0, document.getElementById('arnold-canvas').width, document.getElementById('arnold-canvas').height);
      imgNext = canvasCtx.getImageData(0, 0, document.getElementById('arnold-canvas').width, document.getElementById('arnold-canvas').height);
    }
    
    
    function nextIteration() {
      // Limpa variáveis
      refreshVariables();
    
      // Faz a próxima iteração
      var data = imgData.data;
      var nextData = imgNext.data;
      var source = 0;
      var dataWidth = Math.sqrt(data.length >> 2);
      for (var y = 0; y < dataWidth; y++) {  // Varre os elementos y da matriz
        for (var x = 0; x < dataWidth; x++) {  // Varre os elementos x da matriz
          var xNew = (2 * x + y) % dataWidth; // Define o novo x como 2x + y (módulo do tamanho da imagem)
          var yNew = (x + y) % dataWidth; // Define o novo y como x + y (módulo do tamanho da imagem)
          // Isso é o mesmo que dizer que T(x, y) = (2x + y, x + y).
          var destination = (yNew * dataWidth + xNew) * 4;
            for (var j=0; j<4; j++) {
              // Transformação para a frente
              nextData[destination++] = data[source++];
            }
        }
      }
      // Salva a iteração num local temporário
      var tmp = imgData;
      imgData = imgNext;
      imgNext = tmp;
    
      // Salva a iteração no canvas
      canvasCtx.putImageData(imgData, 0, 0)
    
      // Atualiza a iteração
      iteration++;
      document.getElementById("it-number").innerHTML = iteration;
    
    }
    
    function previousIteration() {
      // Limpa variáveis
      refreshVariables();
    
      // Faz a próxima iteração
      var data = imgData.data;
      var nextData = imgNext.data;
      var source = 0;
      var dataWidth = Math.sqrt(data.length >> 2);
      for (var y = 0; y < dataWidth; y++) {  // Varre os elementos y da matriz
        for (var x = 0; x < dataWidth; x++) {  // Varre os elementos x da matriz
          var xNew = (2 * x + y) % dataWidth;
          var yNew = (x + y) % dataWidth;
          var destination = (yNew * dataWidth + xNew) * 4;
            for (var j=0; j<4; j++) {
              // Transformação para trás
              nextData[source++] = data[destination++];
              // Aqui temos uma pequena diferença nessa linha: o source e o destination da imagem estão trocados.
              // Estamos fazendo a inversa da transformação
              // Isso é o mesmo que dizer que T(2x + y, x + y) = (2x + y, x + y).
            }
        }
      }
      // Salva a iteração num local temporário
      var tmp = imgData;
      imgData = imgNext;
      imgNext = tmp;
    
      // Salva a iteração no canvas
      canvasCtx.putImageData(imgData, 0, 0)
    
      // Atualiza a iteração
      iteration--;
      document.getElementById("it-number").innerHTML = iteration;
    }
    
    function iterateUntilOriginal() {
      // Limpa variáveis
      refreshVariables();
      
      // Itera quantas vezes for necessário, até a matriz ficar original.
      // TODO
    }
  `}
        </script>
   
      </body>
    </html>
    </div>
  );
};

export default ArnoldMap;