import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import Menu from '../../components/Menu';

const Transformacao3D = () => {
  const porta = '9090';
  const rota = 'recorte/transformacao-3d';

  const [transformacoes, setTransformacoes] = useState([
    { tipo_transformacao: '', params: {} }
  ]);

  const [pontosOriginais, setPontosOriginais] = useState([
    { pontox: 0, pontoy: 0, pontoZ: 0 }
  ]);

  const [pontosTransformados, setPontosTransformados] = useState([]);

  const handleTransformacaoChange = (index, field, value) => {
    const updatedTransformacoes = [...transformacoes];
    updatedTransformacoes[index] = {
      ...updatedTransformacoes[index],
      [field]: value
    };
    setTransformacoes(updatedTransformacoes);
  };

  const handlePontosOriginaisChange = (index, field, value) => {
    const updatedPontosOriginais = [...pontosOriginais];
    updatedPontosOriginais[index] = {
      ...updatedPontosOriginais[index],
      [field]: value
    };
    setPontosOriginais(updatedPontosOriginais);
  };

  const adicionarTransformacao = () => {
    setTransformacoes([...transformacoes, { tipo_transformacao: '', params: {} }]);
  };

  const adicionarPontoOriginal = () => {
    setPontosOriginais([...pontosOriginais, { pontox: 0, pontoy: 0, pontoZ: 0 }]);
  };

  const aplicarTransformacoes = async () => {
    try {
      const response = await axios.post(`http://localhost:${porta}/${rota}`, {
        "transformacoes": [{"tipo_transformacao": "translacao", "params": {"transX": 1, "transY": 2, "transZ": 3}}],
         "pontosOriginais": [{"pontox": 0, "pontoy": 0, "pontoZ": 0}]
      });
  
      setPontosTransformados(response.data);
    } catch (error) {
      console.error('Erro ao enviar dados para o backend:', error);
    }
  };

  const renderCamposParams = (index) => {
    const { tipo_transformacao, params } = transformacoes[index];

// Translação:
// { transX: 10, transY: 5, transZ: 0 }
// Rotação:
// { angulo: 45, eixo: 'z' } // Rotação de 45 graus em torno do eixo z
// Escala:
// { escalaX: 2, escalaY: 2, escalaZ: 1 } // Aumenta a escala em 2 vezes nos eixos x e y
// Cisalhamento:
// { fatorCisalhamento1: 0.5, fatorCisalhamento2: 0, direcao: 'x' } // Cisalhamento em X com fator 0.5
// Reflexão:
// { eixo: 'y' } // Reflexão em torno do eixo y

  
    if (tipo_transformacao === 'translacao') {
      return (
        <>
          <label htmlFor="transX">Translação X:</label>
          <input
            type="number"
            id="transX"
            value={params.transX || ''}
            onChange={(e) => handleParamsChange(index, 'transX', parseFloat(e.target.value))}
          />
          <label htmlFor="transY">Translação Y:</label>
          <input
            type="number"
            id="transY"
            value={params.transY || ''}
            onChange={(e) => handleParamsChange(index, 'transY', parseFloat(e.target.value))}
          />
          <label htmlFor="transZ">Translação Z:</label>
          <input
            type="number"
            id="transZ"
            value={params.transZ !== undefined ? params.transZ : 0}
            onChange={(e) => handleParamsChange(index, 'transZ', parseFloat(e.target.value))}
          />
        </>
      );
    } else if (tipo_transformacao === 'rotacao') {
      return (
        <>
          <label htmlFor="angulo">Ângulo:</label>
          <input
            type="number"
            id="angulo"
            value={params.angulo || ''}
            onChange={(e) => handleParamsChange(index, 'angulo', parseFloat(e.target.value))}
          />
          <label htmlFor="eixo">Eixo:</label>
          <select
            value={params.eixo || ''}
            onChange={(e) => handleParamsChange(index, 'eixo', e.target.value)}
          >
            <option value="x">X</option>
            <option value="y">Y</option>
            <option value="z">Z</option>
          </select>
        </>
      );
    }
    else if (tipo_transformacao === 'escala') {
      return (
        <>
          <label htmlFor="angulo">Escala X:</label>
          <input
            type="number"
            id="escalaX"
            value={params.angulo || ''}
            onChange={(e) => handleParamsChange(index, 'escalaX', parseFloat(e.target.value))}
          />
          <label htmlFor="eixo">Eixo:</label>
          <input
            type="number"
            id="escalaY"
            value={params.eixo || ''}
            onChange={(e) => handleParamsChange(index, 'eixo', e.target.value)}
          />
        </>
      );
    }
    else if (tipo_transformacao === 'cisalhamento') { // { fatorCisalhamento1: 0.5, fatorCisalhamento2: 0, direcao: 'x' }
      return (
        <>
          <label htmlFor="angulo">Fator de Cisalhamento 1:</label>
          <input
            type="number"
            id="fatorCisalhamento1"
            value={params.fatorCisalhamento1 || ''}
            onChange={(e) => handleParamsChange(index, 'fatorCisalhamento1', parseFloat(e.target.value))}
          />
          <label htmlFor="fatorCisalhamento2">Fator de Cisalhamento 2:</label>
          <input
            type="number"
            id="fatorCisalhamento2"
            value={params.fatorCisalhamento2 || ''}
            onChange={(e) => handleParamsChange(index, 'fatorCisalhamento2', parseFloat(e.target.value))}
          />
          <label>Direção:</label>
          <select
            value={params.direcao || ''}
            onChange={(e) => handleParamsChange(index, 'direcao', e.target.value)}
          >
            <option value="x">X</option>
            <option value="y">Y</option>
            <option value="z">Z</option>
          </select>
        </>
      );
    }
    else if (tipo_transformacao === 'reflexao') {
      return (
        <>
          <select
            value={params.eixo || ''}
            onChange={(e) => handleParamsChange(index, 'eixo', e.target.value)}
          >
            <option value="x">X</option>
            <option value="y">Y</option>
            <option value="z">Z</option>
          </select>
        </>
      );
    }

    return null; // Se o tipo de transformação não for reconhecido
  };

  const handleParamsChange = (index, campo, valor) => {
    const updatedTransformacoes = [...transformacoes];
    updatedTransformacoes[index] = {
      ...updatedTransformacoes[index],
      params: {
        ...updatedTransformacoes[index].params,
        [campo]: valor,
      },
    };
    setTransformacoes(updatedTransformacoes);
  };

  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const g1 = canvas.getContext('2d');
  
    // Limpar o conteúdo anterior do canvas
    g1.clearRect(0, 0, canvas.width, canvas.height);
  
    // Fator de escala para melhor visualização
    const scale = 100;
  
    // Desenhar os pontos transformados
    pontosTransformados.forEach((ponto) => {
      // Projetar as coordenadas 3D para 2D
      const projectedX = ponto[0] / ponto[3] * scale + canvas.width / 2;
      const projectedY = -ponto[1] / ponto[3] * scale + canvas.height / 2;
  
      g1.beginPath();
      g1.arc(projectedX, projectedY, 5, 0, 2 * Math.PI);
      g1.fillStyle = 'blue';
      g1.fill();
      g1.closePath();
    });
  }, [pontosTransformados]);
  
  
  


  return (
    <div>
      <Menu />
      <h2>Transformações 3D</h2>
      {transformacoes.map((transformacao, index) => (
        <div key={index}>
          <label>Tipo de Transformação:</label>
          <select
            value={transformacao.tipo_transformacao}
            onChange={(e) => handleTransformacaoChange(index, 'tipo_transformacao', e.target.value)}
          >
            <option value="">Selecione...</option>
            <option value="translacao">Translação</option>
            <option value="rotacao">Rotação</option>
            <option value="escala">Escala</option>
            <option value="cisalhamento">Cisalhamento</option>
            <option value="reflexao">Reflexão</option>
          </select>
          <label>Parâmetros:</label>
          {renderCamposParams(index)}
        </div>
      ))}
      <button onClick={adicionarTransformacao}>Adicionar Transformação</button>
      <h2>Pontos Originais</h2>
      {pontosOriginais.map((ponto, index) => (
        <div key={index}>
          <label>Ponto X:</label>
          <input
            type="number"
            value={ponto.pontox}
            onChange={(e) => handlePontosOriginaisChange(index, 'pontox', e.target.value)}
          />
          <label>Ponto Y:</label>
          <input
            type="number"
            value={ponto.pontoy}
            onChange={(e) => handlePontosOriginaisChange(index, 'pontoy', e.target.value)}
          />
          <label>Ponto Z:</label>
          <input
            type="number"
            value={ponto.pontoZ}
            onChange={(e) => handlePontosOriginaisChange(index, 'pontoZ', e.target.value)}
          />
        </div>
      ))}
      <button onClick={adicionarPontoOriginal}>Adicionar Ponto Original</button>

      <button onClick={aplicarTransformacoes}>Aplicar Transformações</button>

      {pontosTransformados.length > 0 && (
        <div>
          <h2>Pontos Transformados</h2>
          <ul>
            {pontosTransformados.map((ponto, index) => (
              <li key={index}>{`(${ponto[0]}, ${ponto[1]}, ${ponto[2]}, ${ponto[3]})`}</li>
            ))}
          </ul>
        </div>
      )}
       <canvas ref={canvasRef} width={500} height={500} style={{ border: '1px solid #000' }}></canvas>
    </div>
  );
};

export default Transformacao3D;
