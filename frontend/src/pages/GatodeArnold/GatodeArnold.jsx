import React, { useState, useRef, useEffect } from 'react';
import Menu from '../../components/Menu';

const ArnoldMap = () => {
  const [iteration, setIteration] = useState(0);
  const canvasRef = useRef(null);
  const fileUploadRef = useRef(null);
  let canvasCtx, imgData, imgOriginal, imgNext;

  useEffect(() => {
    canvasCtx = canvasRef.current.getContext("2d");
    imgOriginal = canvasCtx.getImageData(0, 0, canvasRef.current.width, canvasRef.current.height);
  }, []);

  const refreshVariables = () => {
    imgData = canvasCtx.getImageData(0, 0, canvasRef.current.width, canvasRef.current.height);
    imgNext = canvasCtx.getImageData(0, 0, canvasRef.current.width, canvasRef.current.height);
  };

  const updateIteration = (newIteration) => {
    setIteration(newIteration);
  };

  const applyTransformation = () => {
    refreshVariables();

    // Lógica da transformação
    const data = imgData.data;
    const nextData = imgNext.data;
    const dataWidth = Math.sqrt(data.length >> 2);

    for (let y = 0; y < dataWidth; y++) {
      for (let x = 0; x < dataWidth; x++) {
        const xNew = (2 * x + y) % dataWidth;
        const yNew = (x + y) % dataWidth;
        const source = (y * dataWidth + x) * 4;
        const destination = (yNew * dataWidth + xNew) * 4;

        for (let j = 0; j < 4; j++) {
          nextData[destination++] = data[source++];
        }
      }
    }

    // Salva a iteração no canvas
    canvasCtx.putImageData(imgNext, 0, 0);

    // Atualiza a iteração
    updateIteration(iteration + 1);

    //canvasCtx.putImageData(imgData, 0, 0);
    //updateIteration(iteration + 1);
  };

  const applyInverseTransformation = () => {
    refreshVariables();

     // Lógica da transformação inversa
     const data = imgData.data;
     const nextData = imgNext.data;
     const dataWidth = Math.sqrt(data.length >> 2);
 
     for (let y = 0; y < dataWidth; y++) {
       for (let x = 0; x < dataWidth; x++) {
         const xNew = (2 * x + y) % dataWidth;
         const yNew = (x + y) % dataWidth;
         const destination = (y * dataWidth + x) * 4;
         const source = (yNew * dataWidth + xNew) * 4;
 
         for (let j = 0; j < 4; j++) {
           nextData[destination++] = data[source++];
         }
       }
     }
 
     // Salva a iteração no canvas
     canvasCtx.putImageData(imgNext, 0, 0);
 
     // Atualiza a iteração
     updateIteration(iteration - 1);

    //canvasCtx.putImageData(imgData, 0, 0);
    
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = () => {
        const img = new Image();
        img.src = reader.result;

        img.onload = () => {
          canvasCtx.drawImage(img, 0, 0, canvasRef.current.width, canvasRef.current.height);
        };
      };

      reader.readAsDataURL(file);

      // Atualizar o estado e iniciar a dashboard
      updateIteration(0);
      startDashboard();
    }
  };

  const startDashboard = () => {
    // Lógica para iniciar o dashboard
    document.getElementById("greetings").classList.add("hidden");
    document.getElementById("top-navbar").classList.remove("hidden");
    document.getElementById("dashboard").classList.remove("hidden");
  };
/*
  const greet = () => {
    // Lógica para exibir a saudação
    document.getElementById("greetings").classList.remove("hidden");
    document.getElementById("top-navbar").classList.add("hidden");
    document.getElementById("dashboard").classList.add("hidden");
  };*/

  return (
    <div>
      <Menu/>
      <canvas id="arnold-canvas" ref={canvasRef}></canvas>
      <div className="section dashboard-section hidden" id="dashboard">
        <div className="container">
          <canvas id="arnold-canvas"></canvas>
          <div id="panel" className="hidden">
            {/* Conteúdo do painel */}
            <div>
                <button onClick={applyTransformation}>Aplicar transformação &gt;</button>
                <button onClick={applyInverseTransformation}>Aplicar t. inversa &lt;</button>
            </div>
            <h3>Iteração <strong id="it-number">{iteration}</strong></h3>
          </div>
          <div id="upload-subsection">
            {/* Conteúdo do formulário de upload */}
            <input
              type="file"
              ref={fileUploadRef}
              accept="image/*"
              onChange={handleFileUpload}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArnoldMap;