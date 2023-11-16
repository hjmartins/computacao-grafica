import React, { useState, useEffect, useRef } from 'react';
import Menu from '../../components/Menu';
import '../../styles/Retas.css'; // Importe o arquivo CSS para estilização
import axios from 'axios';

function DDA() {
  const porta = '9090';
  const rota = 'reta/dda';

  const [formData, setFormData] = useState({
    valuex1: '6',
    valuey1: '9',
    valuex2: '9',
    valuey2: '14',
    canvasWidth: '500',
    canvasHeight: '500'
  });
  const [lines, setLines] = useState([]);

  const fetchData = () => {
    const arrayData = [
      {
        pontox: parseInt(formData.valuex1),
        pontoy: parseInt(formData.valuey1)
      },
      {
        pontox: parseInt(formData.valuex2),
        pontoy: parseInt(formData.valuey2)
      }
    ];

    axios
      .post(`http://localhost:${porta}/figura/${rota}`, arrayData)
      .then(response => {
        setLines(response.data);
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
    setLines([]); // Limpar as retas anteriores
    fetchData();
  };

  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    // Obter as dimensões do canvas
    const canvasWidth = parseInt(formData.canvasWidth);
    const canvasHeight = parseInt(formData.canvasHeight);

    // Definir o ponto médio do canvas
    const centerX = canvasWidth / 2;
    const centerY = canvasHeight / 2;

    // Limpar o canvas
    context.clearRect(0, 0, canvasWidth, canvasHeight);

    // Desenhar as retas
    lines.forEach(line => {
      const { pontox, pontoy } = line;

      // Calcular as coordenadas no canvas com base no centro
      const canvasX = centerX + pontox;
      const canvasY = centerY - pontoy;

      context.fillRect(canvasX, canvasY, 1, 1);
    });
  }, [lines, formData.canvasWidth, formData.canvasHeight]);

  return (
    <div>
      <Menu />
      <h1 className='title'>Reta DDA</h1>

      <form onSubmit={handleSubmit} className="input-card">
        <h2>Ponto 1</h2>
        <div className="input-row">
          <div className="input-group">
            <label>Valor x1:</label>
            <input type="number" name="valuex1" value={formData.valuex1} onChange={handleChange} />
          </div>
          <div className="input-group">
            <label>Valor y1:</label>
            <input type="number" name="valuey1" value={formData.valuey1} onChange={handleChange} />
          </div>
        </div>

        <h2>Ponto 2</h2>
        <div className="input-row">
          <div className="input-group">
            <label>Valor x2:</label>
            <input type="number" name="valuex2" value={formData.valuex2} onChange={handleChange} />
          </div>
          <div className="input-group">
            <label>Valor y2:</label>
            <input type="number" name="valuey2" value={formData.valuey2} onChange={handleChange} />
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

export default DDA;
