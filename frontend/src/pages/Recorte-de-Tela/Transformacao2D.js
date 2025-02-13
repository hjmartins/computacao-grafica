import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import Menu from '../../components/Menu';

const Transformacao2D = () => {
  const porta = '9090';
  const rota = 'recorte/transformacao-2d';

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
    console.log('Transformações:', transformacoes);
    console.log('Pontos Originais:', pontosOriginais);
  
    try {
      const apiUrl = `http://localhost:${porta}/${rota}`;
  
      // Flatten the nested structures
      const flattenedTransformacoes = flattenTransformacoes(transformacoes);
      const flattenedPontosOriginais = flattenPontosOriginais(pontosOriginais);
  
      // Construct the URL with query parameters
      const url = new URL(apiUrl);
      Object.entries(flattenedTransformacoes).forEach(([key, value]) =>
        url.searchParams.append(key, JSON.stringify(value))
      );
      Object.entries(flattenedPontosOriginais).forEach(([key, value]) =>
        url.searchParams.append(key, value)
      );
  
      const response = await fetch(url);
  
      if (!response.ok) {
        throw new Error(`Erro ao enviar dados para o backend. Status: ${response.status}`);
      }
  
      const result = await response.json();
      setPontosTransformados(result);
    } catch (error) {
      console.error('Erro ao enviar dados para o backend:', error);
    }
  };
  
// Helper function to flatten transformacoes
const flattenTransformacoes = (transformacoes) => {
  const flattenedArray = {
    transformacoes: [],
  };

  transformacoes.forEach((transformacao, index) => {
    const flattened = {
      tipo_transformacao: transformacao.tipo_transformacao,
      params: transformacao.params,
    };
    flattenedArray.transformacoes.push(flattened);
  });

  return flattenedArray;
};

  // Helper function to flatten pontosOriginais
  const flattenPontosOriginais = (pontosOriginais) => {
    const flattened = {};
    pontosOriginais.forEach((ponto, index) => {
      Object.entries(ponto).forEach(([key, value]) => {
        flattened[`pontosOriginais[${index}].${key}`] = value;
      });
    });
    return flattened;
  };
  
  const renderCamposParams = (index) => {
    const { tipo_transformacao, params } = transformacoes[index];
  
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
          {/* <input
            type="number"
            id="transZ"
            value={params.transZ !== undefined ? params.transZ : 0}
            onChange={(e) => handleParamsChange(index, 'transZ', parseFloat(e.target.value))}
          /> */}
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
            {/* <option value="z">Z</option> */}
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
          <label htmlFor="angulo">Fator de Cisalhamento:</label>
          <input
            type="number"
            id="fatorCisalhamento1"
            value={params.fatorCisalhamento1 || ''}
            onChange={(e) => handleParamsChange(index, 'fatorCisalhamento', parseFloat(e.target.value))}
          />
          <label>Direção:</label>
          <select
            value={params.direcao || ''}
            onChange={(e) => handleParamsChange(index, 'direcao', e.target.value)}
          >
            <option value="x">X</option>
            <option value="y">Y</option>
            {/* <option value="z">Z</option> */}
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
            {/* <option value="z">Z</option> */}
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
    const ctx = canvas.getContext('2d');

    // Limpar o conteúdo anterior do canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Desenhar os pontos transformados
    pontosTransformados.forEach((ponto) => {
      ctx.beginPath();
      ctx.arc(ponto[0], ponto[1], 5, 0, 2 * Math.PI);
      ctx.fillStyle = 'blue';
      ctx.fill();
      ctx.closePath();
    });
  }, [pontosTransformados]);


  return (
    <div>
      <Menu />
      <h2>Transformações 2D</h2>
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
          {/* <label>Ponto Z:</label>
          <input
            type="number"
            value={ponto.pontoZ}
            onChange={(e) => handlePontosOriginaisChange(index, 'pontoZ', e.target.value)}
          /> */}
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

export default Transformacao2D;
