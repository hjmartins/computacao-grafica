import React, { useState, useEffect } from 'react';
import Menu from '../../components/Menu';
import'./gato.css';
const ArnoldGato = () => {
  const [canvasCtx, setCanvasCtx] = useState(null);
  const [imgData, setImgData] = useState(null);
  const [imgNext, setImgNext] = useState(null);
  const [iteration, setIteration] = useState(0);


  const loadImage = () => {
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
  

    const parseFile = (file) => {
      output('Altere a imagem clicando aqui ou arrastando outra imagem.');
    
      const imageName = file.name;
      const isGood = /\.(?=gif|jpg|png|jpeg)/gi.test(imageName);
    
      if (isGood) {
        document.getElementById('start').classList.add('hidden');
        document.getElementById('response').classList.remove('hidden');
        document.getElementById('notimage').classList.add('hidden');
        document.getElementById('file-image').classList.remove('hidden');
        document.getElementById('file-image').src = URL.createObjectURL(file);
        document.getElementById('panel').classList.remove('hidden');
    
        let oldCanvas = document.getElementById('arnold-canvas');
    
        // Check if the element exists before manipulating it
        if (oldCanvas) {
          oldCanvas.parentNode.removeChild(oldCanvas);
    
          setTimeout(() => {
            document.getElementById('panel').insertBefore(loadCanvas(document.getElementById('file-image')), document.getElementById('file-image'));
            document.getElementById('file-image').classList.add('hidden');
    
            setCanvasCtx(document.getElementById('arnold-canvas').getContext('2d'));
            setIteration(0);
            document.getElementById('it-number').innerHTML = iteration + 1;
    
            const originalImgData = canvasCtx.getImageData(0, 0, document.getElementById('arnold-canvas').width, document.getElementById('arnold-canvas').height);
            setImgData(originalImgData);
          }, 400);
        }
      } else {
        // Handle the case where the image is not valid
        document.getElementById('notimage').classList.remove('hidden');
        document.getElementById('start').classList.remove('hidden');
        document.getElementById('response').classList.add('hidden');
        document.getElementById('file-upload-form').reset();
        document.getElementById('panel').classList.add('hidden');
      }
    };

    /*function parseFile(file) {
  
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

          let imgOriginal;
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
    }*/
  
    // Verifica se existe suporte ao File API.
    if (window.File && window.FileList && window.FileReader) {
      initialize();
    } else {
      document.getElementById('file-drag').style.display = 'none';
    }
  
  };
  /*
  useEffect(() => {
    loadImage();
  }, []);
  const initialize = () => {
    const fileSelect = document.getElementById('file-upload');
    const fileDrag = document.getElementById('file-drag');

    fileSelect.addEventListener('change', fileSelectHandler, false);

    const xhr = new XMLHttpRequest();
    if (xhr.upload) {
      fileDrag.addEventListener('dragover', fileDragHover, false);
      fileDrag.addEventListener('dragleave', fileDragHover, false);
      fileDrag.addEventListener('drop', fileSelectHandler, false);
    }
  };
  */
  useEffect(() => {
    loadImage();
  }, []);

  const initialize = () => {
    // Initialize canvasCtx and other necessary variables here
    const canvas = document.getElementById('arnold-canvas');
    if (canvas) {
      setCanvasCtx(canvas.getContext('2d'));
      setImgData(canvas.getContext('2d').getImageData(0, 0, canvas.width, canvas.height));
      setImgNext(canvas.getContext('2d').getImageData(0, 0, canvas.width, canvas.height));
    }
  };
  const fileDragHover = (e) => {
    e.stopPropagation();
    e.preventDefault();
    const fileDrag = document.getElementById('file-drag');
    fileDrag.className = e.type === 'dragover' ? 'hover' : 'modal-body file-upload';
    initialize();
  };

  const fileSelectHandler = (e) => {
    const files = e.target.files || e.dataTransfer.files;
    fileDragHover(e);
    for (let i = 0, f; (f = files[i]); i++) {
      parseFile(f);
    }
    initialize();
  };
  /*const refreshVariables = () => {
    if (canvasCtx) {
      setImgData(canvasCtx.getImageData(0, 0, canvasCtx.canvas.width, canvasCtx.canvas.height));
      setImgNext(canvasCtx.getImageData(0, 0, canvasCtx.canvas.width, canvasCtx.canvas.height));
    }
  };*/
  const output = (msg) => {
    const m = document.getElementById('messages');
    m.innerHTML = msg;
  };

  const parseFile = (file) => {
    output('Altere a imagem clicando aqui ou arrastando outra imagem.');

    const imageName = file.name;
    const isGood = /\.(?=gif|jpg|png|jpeg)/gi.test(imageName);

    if (isGood) {
      document.getElementById('start').classList.add('hidden');
      document.getElementById('response').classList.remove('hidden');
      document.getElementById('notimage').classList.add('hidden');
      document.getElementById('file-image').classList.remove('hidden');
      document.getElementById('file-image').src = URL.createObjectURL(file);
      document.getElementById('panel').classList.remove('hidden');

      let oldCanvas = document.getElementById('arnold-canvas');
      oldCanvas.parentNode.removeChild(oldCanvas);

      setTimeout(() => {
        document.getElementById('panel').insertBefore(loadCanvas(document.getElementById('file-image')), document.getElementById('file-image'));
        document.getElementById('file-image').classList.add('hidden');

        setCanvasCtx(document.getElementById('arnold-canvas').getContext('2d'));
        setIteration(0);
        document.getElementById('it-number').innerHTML = iteration;

        const originalImgData = canvasCtx.getImageData(0, 0, document.getElementById('arnold-canvas').width, document.getElementById('arnold-canvas').height);
        setImgData(originalImgData);
      }, 400);
    } else {
      document.getElementById('notimage').classList.remove('hidden');
      document.getElementById('start').classList.remove('hidden');
      document.getElementById('response').classList.add('hidden');
      document.getElementById('file-upload-form').reset();
      document.getElementById('panel').classList.add('hidden');
    }
  };

  const initializeFileAPI = () => {
    if (window.File && window.FileList && window.FileReader) {
      initialize();
    } else {
      document.getElementById('file-drag').style.display = 'none';
    }
  };

  useEffect(() => {
    initializeFileAPI();
  }, []);

  const loadCanvas = (image) => {
    const canvas = document.createElement('canvas');
    canvas.id = 'arnold-canvas';
    canvas.width = image.width;
    canvas.height = image.width;
    canvas.getContext('2d').drawImage(image, 0, 0, canvas.width, canvas.width);
    return canvas;
  };

  const refreshVariables = () => {
    if (canvasCtx) {
    setImgData(canvasCtx.getImageData(0, 0, document.getElementById('arnold-canvas').width, document.getElementById('arnold-canvas').height));
    setImgNext(canvasCtx.getImageData(0, 0, document.getElementById('arnold-canvas').width, document.getElementById('arnold-canvas').height));
  }};


  const nextIteration = () => {
    // Check if canvasCtx is null before proceeding
    if (canvasCtx === null) {
      console.error("canvasCtx is not initialized");
      return;
    }
  
    // Limpa variáveis
    refreshVariables();
  
    // Faz a próxima iteração
    var data = imgData.data;
    var nextData = imgNext.data;
    var source = 0;
    var dataWidth = Math.sqrt(data.length >> 2);
  
    for (var y = 0; y < dataWidth; y++) {
      for (var x = 0; x < dataWidth; x++) {
        var xNew = (2 * x + y) % dataWidth;
        var yNew = (x + y) % dataWidth;
        var destination = (yNew * dataWidth + xNew) * 4;
  
        for (var j = 0; j < 4; j++) {
          nextData[destination++] = data[source++];
        }
      }
    }
  
    var tmp = imgData;
    imgData = imgNext;
    imgNext = tmp;
  
    canvasCtx.putImageData(imgData, 0, 0);
  
    iteration++;
    document.getElementById("it-number").innerHTML = iteration;
  };


  /*const nextIteration = () => {
    refreshVariables();

    const data = imgData.data;
    const nextData = imgNext.data;
    const source = 0;
    const dataWidth = Math.sqrt(data.length >> 2);

    for (let y = 0; y < dataWidth; y++) {
      for (let x = 0; x < dataWidth; x++) {
        const xNew = (2 * x + y) % dataWidth;
        const yNew = (x + y) % dataWidth;
        const destination = (yNew * dataWidth + xNew) * 4;

        for (let j = 0; j < 4; j++) {
          nextData[destination++] = data[source++];
        }
      }
    }

    const tmp = imgData;
    setImgData(imgNext);
    setImgNext(tmp);

    canvasCtx.putImageData(imgData, 0, 0);
    setIteration(iteration + 1);
    document.getElementById('it-number').innerHTML = iteration + 1;
  };*/

  const previousIteration = () => {
    refreshVariables();

    const data = imgData.data;
    const nextData = imgNext.data;
    const source = 0;
    const dataWidth = Math.sqrt(data.length >> 2);

    for (let y = 0; y < dataWidth; y++) {
      for (let x = 0; x < dataWidth; x++) {
        const xNew = (2 * x + y) % dataWidth;
        const yNew = (x + y) % dataWidth;
        const destination = (yNew * dataWidth + xNew) * 4;

        for (let j = 0; j < 4; j++) {
          nextData[source++] = data[destination++];
        }
      }
    }

    const tmp = imgData;
    setImgData(imgNext);
    setImgNext(tmp);

    canvasCtx.putImageData(imgData, 0, 0);
    setIteration(iteration - 1);
    document.getElementById('it-number').innerHTML = iteration - 1;
  };

  const iterateUntilOriginal = () => {
    refreshVariables();
    // TODO: Implement the logic for iterating until the matrix becomes original
  };

  return (
    <>
      <canvas id="arnold-canvas"></canvas>
      <div id="panel" className="hidden">
        <img id="file-image" alt="Imagem" />
        <div></div>
        <button className="btn btn-primary" onClick={nextIteration}>
          Aplicar transformação
        </button>
        <button style={{ marginLeft: '20px' }} className="btn btn-dark" onClick={previousIteration}>
          Aplicar transformação inversa
        </button>
        <h3>
          Iteração <strong id="it-number">{iteration}</strong>
        </h3>
      </div>
      <div id="upload-subsection">
        <form id="file-upload-form" className="uploader">
          <input id="file-upload" type="file" name="fileUpload" accept="image/*" />
          <label htmlFor="file-upload" id="file-drag">
            <div id="start">
              <div id="notimage" className="hidden">
                Por favor, selecione uma imagem.
              </div>
              <span id="file-upload-button" className="button accent-button">
                Selecionar um arquivo
              </span>
            </div>
            <div id="response" className="hidden">
              <div id="messages"></div>
            </div>
          </label>
        </form>
      </div>
    </>
  );
};

export default ArnoldGato;
