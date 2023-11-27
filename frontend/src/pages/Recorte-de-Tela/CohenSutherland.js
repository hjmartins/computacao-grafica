import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import Menu from './../../components/Menu';
import '../../styles/Retas.css'; // Importe o arquivo CSS para estilização

const CohenSutherland = () => {
  const porta = '9090';
  const rota = 'recorte/cohen-sutherland';

  const [formData, setFormData] = useState({
    x0: '15',
    y0: '15',
    x1: '25',
    y1: '25',
    xmin: '10',
    ymin: '10',
    xmax: '30',
    ymax: '30',
    canvasWidth: '400',
    canvasHeight: '400',
  });

  const [resultado, setResultado] = useState(null);

  const canvasRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get(`http://localhost:${porta}/${rota}`, {
        params: {
          x0: formData.x0,
          y0: formData.y0,
          x1: formData.x1,
          y1: formData.y1,
          xmin: formData.xmin,
          ymin: formData.ymin,
          xmax: formData.xmax,
          ymax: formData.ymax,
        },
      });

      if (response.data !== null){
        setResultado(response.data);
      }
      else{
        setResultado(null)
      }

    } catch (error) {
      console.error('Erro ao enviar dados para o backend:', error);
    }
  };

  const drawLine = () => {
    const canvas = canvasRef.current;
  
    if (!canvas) {
      console.error('Canvas não encontrado.');
      return;
    }
  
    const ctx = canvas.getContext('2d');
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
  
    // Limpar o canvas
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  
    // Calcular o centro do canvas
    const centerX = canvasWidth / 2;
    const centerY = canvasHeight / 2;
  
    // Desenhar a viewport centralizada
    const viewportWidth = parseFloat(formData.xmax) - parseFloat(formData.xmin);
    const viewportHeight = parseFloat(formData.ymax) - parseFloat(formData.ymin);
    const viewportX = centerX - viewportWidth / 2;
    const viewportY = centerY - viewportHeight / 2;
  
    ctx.strokeStyle = 'blue';
    ctx.strokeRect(viewportX, viewportY, viewportWidth, viewportHeight);
  
    if (resultado && !resultado.success) {
      // Desenhar a linha recortada
      ctx.strokeStyle = 'red';
      ctx.beginPath();
      const x0RelativeToViewport = parseFloat(resultado.x0) - parseFloat(formData.xmin);
      const y0RelativeToViewport = parseFloat(formData.ymax) - parseFloat(resultado.y0);
  
      const x1RelativeToViewport = parseFloat(resultado.x1) - parseFloat(formData.xmin);
      const y1RelativeToViewport = parseFloat(formData.ymax) - parseFloat(resultado.y1);
  
      // Ajuste para centralizar a linha dentro da viewport
      const x0Viewport = viewportX + x0RelativeToViewport;
      const y0Viewport = viewportY + y0RelativeToViewport;
      const x1Viewport = viewportX + x1RelativeToViewport;
      const y1Viewport = viewportY + y1RelativeToViewport;
  
      ctx.moveTo(x0Viewport, y0Viewport);
      ctx.lineTo(x1Viewport, y1Viewport);
  
      ctx.stroke();
    }
  };
  
  useEffect(() => {
    drawLine();
  }, [resultado]);

  return (
    <div>
      <Menu />
      <h1>Cohen-Sutherland</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="x0">Ponto Inicial X:</label>
          <input type="number" id="x0" name="x0" value={formData.x0} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="y0">Ponto Inicial Y:</label>
          <input type="number" id="y0" name="y0" value={formData.y0} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="x1">Ponto Final X:</label>
          <input type="number" id="x1" name="x1" value={formData.x1} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="y1">Ponto Final Y:</label>
          <input type="number" id="y1" name="y1" value={formData.y1} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="y1">X Minimo:</label>
          <input type="number" id="xmin" name="xmin" value={formData.xmin} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="y1">Y Minimo:</label>
          <input type="number" id="ymin" name="ymin" value={formData.ymin} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="y1">X Maximo:</label>
          <input type="number" id="xmax" name="xmax" value={formData.xmax} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="y1">Y Maximo:</label>
          <input type="number" id="ymax" name="ymax" value={formData.ymax} onChange={handleChange} required />
        </div>
        <button type="submit">Enviar</button>
      </form>

      {resultado && (
        <div>
          <h2>Resultado do Recorte:</h2>
          {!resultado.success ? (
            <p>
              Linha aceita: ({resultado.x0}, {resultado.y0}) para ({resultado.x1}, {resultado.y1})
            </p>
          ) : (
            <p>Linha rejeitada</p>
          )}
        </div>
      )}

{resultado && !resultado.success && (
  <div className="canvas-container" style={{ width: `${formData.canvasWidth}px`, height: `${formData.canvasHeight}px` }}>
    <canvas ref={canvasRef} width={formData.canvasWidth} height={formData.canvasHeight} />
  </div>
)}
    </div>
  );
};

export default CohenSutherland;