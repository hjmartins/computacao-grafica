import React, { useState, useEffect, useRef } from 'react';
import Menu from '../../components/Menu';
import '../../styles/Retas.css'; // Importe o arquivo CSS para estilização
import axios from 'axios';

function CPontoM() {
  const porta = '9090';
  const rota = 'circulo/ponto-medio';

  const [formData, setFormData] = useState({
    raio: '50',
    valuex: '0',
    valuey: '0',
    canvasWidth: '500', // Adiciona campo para largura do canvas
    canvasHeight: '500', // Adiciona campo para altura do canvas
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
        console.log(response.data);
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
    setData([]); // Limpar o círculo anterior
    fetchData();
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    const canvasWidth = parseInt(formData.canvasWidth); // Obtém a largura do canvas do estado do formulário
    const canvasHeight = parseInt(formData.canvasHeight); // Obtém a altura do canvas do estado do formulário

    // Verifica se a largura e a altura são números válidos
    if (!isNaN(canvasWidth) && !isNaN(canvasHeight)) {
      canvas.width = canvasWidth;
      canvas.height = canvasHeight;

      // Função para desenhar o círculo no canvas
      const drawCircle = () => {
        // Limpar o canvas
        context.clearRect(0, 0, canvas.width, canvas.height);

        // Definir as coordenadas do centro do canvas
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;

        // Loop pelos dados e desenhe cada ponto centralizado
        data.forEach(({ pontox, pontoy }) => {
          const x = centerX + pontox;
          const y = centerY + pontoy;

          context.beginPath();
          context.arc(x, y, 1, 0, 2 * Math.PI);
          context.fill();
          context.closePath();
        });
      };

      // Chamar a função de desenho após a atualização do estado data
      drawCircle();
    }
  }, [data, formData.canvasWidth, formData.canvasHeight]);

  return (
    <div>
      <Menu />
      <h1>Círculo Ponto Médio</h1>

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
          <div className="input-group">
            <label>Largura do Canvas:</label>
            <input type="number" name="canvasWidth" value={formData.canvasWidth} onChange={handleChange} />
          </div>
          <div className="input-group">
            <label>Altura do Canvas:</label>
            <input type="number" name="canvasHeight" value={formData.canvasHeight} onChange={handleChange} />
          </div>
        </div>
        <div className="button-container">
          <button type="submit">Desenhar</button>
        </div>
      </form>

      <div className="canvas-container">
        <canvas ref={canvasRef} />
      </div>
    </div>
  );
}

export default CPontoM;
