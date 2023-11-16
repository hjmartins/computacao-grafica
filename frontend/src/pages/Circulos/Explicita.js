import React, { useState, useEffect, useRef } from 'react';
import Menu from '../../components/Menu';
import '../../styles/Retas.css'; // Importe o arquivo CSS para estilização
import axios from 'axios';

function Explicita() {
  const porta = '9090';
  const rota = 'circulo/equacao-explicita';

  const [formData, setFormData] = useState({
    raio: '50',
    valuex: '100',
    valuey: '100',
    canvasWidth: '500', // Valor padrão para largura do canvas
    canvasHeight: '500' // Valor padrão para altura do canvas
  });
  const [data, setData] = useState([]);
  const canvasRef = useRef(null);

  const fetchData = () => {
    const arrayData = [
      {
        raio: parseInt(formData.raio),
        xOrigem: parseInt(formData.valuex),
        yOrigem: parseInt(formData.valuey),
      },
    ];
    axios
      .post(`http://localhost:${porta}/figura/${rota}`, arrayData)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setData([]);
    fetchData();

    // Definir o tamanho do canvas com base nos valores do formulário
    const canvas = canvasRef.current;
    canvas.width = parseInt(formData.canvasWidth);
    canvas.height = parseInt(formData.canvasHeight);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    const drawCircle = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);
      
      // Obter o tamanho atual do canvas
      const canvasWidth = canvas.clientWidth;
      const canvasHeight = canvas.clientHeight;

      // Calcular o centro com base no tamanho atual
      const centerX = canvasWidth / 2;
      const centerY = canvasHeight / 2;

      data.forEach(({ pontox, pontoy }) => {
        const translatedX = centerX + pontox;
        const translatedY = centerY - pontoy;
        context.beginPath();
        context.arc(translatedX, translatedY, 1, 0, 2 * Math.PI); // Altere o raio para torná-lo visível
        context.fill();
        context.closePath();
      });
    };

    drawCircle();
  }, [data, formData.canvasWidth, formData.canvasHeight]);

  return (
    <div>
      <Menu />
      <h1>Círculo Explícito</h1>

      <form onSubmit={handleSubmit} className="input-card">
        <h2>Ponto X e Y</h2>
        <div className="input-row">
          <div className="input-group">
            <label>Valor X:</label>
            <input type="number" name="valuex" value={formData.valuex} onChange={handleChange} />
          </div>
          <div className="input-group">
            <label>Valor Y:</label>
            <input type="number" name="valuey" value={formData.valuey} onChange={handleChange} />
          </div>
          <div className="input-group">
            <label>Valor Raio:</label>
            <input type="number" name="raio" value={formData.raio} onChange={handleChange} />
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

export default Explicita;
