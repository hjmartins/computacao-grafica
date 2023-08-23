import React, { useState, useEffect, useRef } from 'react';
import Menu from '../../components/Menu';
import '../../styles/Retas.css';
import axios from 'axios';

function NDC() {

    const porta = '9090';
    const rota = 'ndc';

    const [formData, setFormData] = useState({
        yMax: '20.3', y: '15.5', yMin: '10.3',
        xMax: '20.3', x: '15.5', xMin: '10.3',
        min: '0', max: '1'
    });
    const [data, setData] = useState([]);
    const canvasRef = useRef(null);

    const fetchData = () => {
      const arrayData = [
        {   
            yMax: parseFloat(formData.yMax), y: parseFloat(formData.y), yMin: parseFloat(formData.yMin),
            xMax: parseFloat(formData.xMax), x: parseFloat(formData.x), xMin: parseFloat(formData.xMin),
            min: parseInt(formData.min), max: parseInt(formData.max)  
        },
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
      setData([]); // Limpar as circulo anterior
      fetchData();
    };

    useEffect(() => {
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
    
      // Função para desenhar o pixel no canvas
      const drawPixel = (x, y) => {
        context.fillRect(x, y, 1, 1);
      };
    
      // Função para desenhar os pixels em cada coordenada fornecida
      const drawPixels = () => {
        // Limpar o canvas
        context.clearRect(0, 0, canvas.width, canvas.height);
    
        // Desenhar os pixels
        data.forEach(([x, y]) => {
          drawPixel(x, y);
        });
      };
    
      // Chamar a função de desenho de pixels após a atualização do estado data
      drawPixels();
    }, [data]);

    return (
      <div>
        <Menu />
        <h1 className='title'>NDC</h1>

        <form onSubmit={handleSubmit} className="input-card">
          <h2>Valores</h2>
          <div className="input-row">
              <div className="input-group">
                  <label>Valor X:</label>
                  <input type="number" name="x" value={formData.x} onChange={handleChange} />
              </div>
              <div className="input-group">
                  <label>Valor X Maximo:</label>
                  <input type="number" name="xMax" value={formData.xMax} onChange={handleChange} />
              </div>
              <div className="input-group">
                  <label>Valor X Minimo:</label>
                  <input type="number" name="xMin" value={formData.xMin} onChange={handleChange} />
              </div>
              <div className="input-group">
                  <label>Valor Y:</label>
                  <input type="number" name="y" value={formData.y} onChange={handleChange} />
              </div>
              <div className="input-group">
                  <label>Valor Y Maximo:</label>
                  <input type="number" name="yMax" value={formData.yMax} onChange={handleChange} />
              </div>
              <div className="input-group">
                  <label>Valor Y Minimo:</label>
                  <input type="number" name="yMin" value={formData.yMin} onChange={handleChange} />
              </div>
              <div className="input-group">
                <label>Valor Mínimo:</label>
                <select name="min" value={formData.min} onChange={handleChange}>
                  <option value="-1">-1</option>
                  <option value="0">0</option>
                </select>
              </div>
              <div className="input-group">
                <label>Valor Máximo:</label>
                <select name="max" value={formData.max} onChange={handleChange}>
                  <option value="1">1</option>
                </select>
              </div>
            </div>
            <div className="button-container">
              <button type="submit">Ativar Pixel</button>
            </div>
          </form>

        <div className="canvas-container">
          <canvas ref={canvasRef} width={500} height={500} />
        </div>
      </div>
    );
}

export default NDC;
