import React, { useState, useEffect, useRef } from 'react';
import Menu from '../../components/Menu';
import '../../styles/Retas.css'; // Importe o arquivo CSS para estilização
import axios from 'axios';

function CPontoM() {
  const porta = '9090';
  const rota = 'circulo/trigonometria';

  const [formData, setFormData] = useState({
    raio: '',
    valuex: '',
    valuey: '',
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
        yOrigem: parseInt(formData.valuey)
      }
    ];
    axios
      .post(`http://localhost:${porta}/figura/${rota}`, arrayData)
      .then(response => {
        setData(response.data);
        console.log(response.data);
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
    setData([]); // Limpar os círculos anteriores
    fetchData();

    // Definir o tamanho do canvas com base nos valores do formulário
    const canvas = canvasRef.current;
    canvas.width = parseInt(formData.canvasWidth);
    canvas.height = parseInt(formData.canvasHeight);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    // Defina o ponto (0,0) no meio da largura e altura do canvas
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    const centerX = canvasWidth / 2;
    const centerY = canvasHeight / 2;

    // Função para desenhar o círculo no canvas
    const drawCircle = () => {
      // Limpar o canvas
      context.clearRect(0, 0, canvasWidth, canvasHeight);

      // Loop através dos dados e desenhe cada círculo
      data.forEach(point => {
        // Ajustar as coordenadas dos pontos para centralizar (0,0)
        const adjustedX = centerX + point.pontox;
        const adjustedY = centerY + point.pontoy;

        context.beginPath();
        context.arc(adjustedX, adjustedY, 1, 0, 2 * Math.PI);
        context.fill();
        context.closePath();
      });
    };

    // Chamar a função de desenho após a atualização do estado 'data'
    drawCircle();
  }, [data]);

  return (
    <div>
      <Menu />
      <h1>Círculo Trigonométrico</h1>

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

      <div className="canvas-container">
        <canvas ref={canvasRef} width={formData.canvasWidth} height={formData.canvasHeight} />
      </div>
    </div>
  );
}

export default CPontoM;
