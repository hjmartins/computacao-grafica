import React, { useState, useEffect, useRef } from 'react';
import Menu from '../../components/Menu';
import '../../styles/Retas.css'; // Importe o arquivo CSS para estilização
import axios from 'axios';

function EPontoM() {
  const porta = '9090';
  const rota = 'elipse/ponto-medio';

  const [formData, setFormData] = useState({
    centerPos: '',
    minorRadioSize: '',
    canvasWidth: '500', // Valor padrão para largura do canvas
    canvasHeight: '500', // Valor padrão para altura do canvas
  });
  const [data, setData] = useState([]);
  const canvasRef = useRef(null);

  const fetchData = () => {
    const arrayData = [
      {ElipseCenter: parseInt(formData.centerPos), MinorRadius: parseInt(formData.minorRadioSize)},
    ];
    axios
      .post(`http://localhost:${porta}/figura/${rota}`, arrayData)
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    setData([]); // Limpar os pontos anteriores
    fetchData();
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    const drawElipse = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);

      // Calcula o deslocamento para centralizar o canvas
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      data.forEach(point => {
        context.beginPath();
        context.arc(centerX + point.pontox, centerY + point.pontoy, 1, 0, 2 * Math.PI);
        context.fill();
        context.closePath();
      });
    };

    drawElipse();
  }, [data]);

  const setCanvasSize = () => {
    const canvas = canvasRef.current;
    const { canvasWidth, canvasHeight } = formData;

    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
  };

  useEffect(() => {
    setCanvasSize();
  }, [formData.canvasWidth, formData.canvasHeight]);

  return (
    <div>
      <Menu />
      <h1>Elipse Ponto Medio</h1>

      <form onSubmit={handleSubmit} className="input-card">
        <h2>Ponto X e Y</h2>
        <div className="input-row">
            <div className="input-group">
                <label>Valor CenterPosition:</label>
                <input type="number" name="centerPos" value={formData.centerPos} onChange={handleChange} />
            </div>
            <div className="input-group">
                <label>Valor Minor Radio Size:</label>
                <input type="number" name="minorRadioSize" value={formData.minorRadioSize} onChange={handleChange} />
            </div>
        </div>
        <h2>Tamanho do Canvas</h2>
        <div className="input-row">
          <div className="input-group">
            <label>Largura:</label>
            <input type="number" name="canvasWidth" value={formData.canvasWidth} onChange={handleChange} />
          </div>
          <div className="input-group">
            <label>Altura:</label>
            <input type="number" name="canvasHeight" value={formData.canvasHeight} onChange={handleChange} />
          </div>
        </div>
        <div className="button-container">
          <button type="submit">Desenhar</button>
        </div>
      </form>

      <div className="canvas-container" style={{ width: `${formData.canvasWidth}px`, height: `${formData.canvasHeight}px` }}>
      <canvas ref={canvasRef} />
    </div>
    </div>
  );
}

export default EPontoM;
