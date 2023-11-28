import React, { useState, useRef, useEffect, useCallback } from 'react';
import Menu from '../../components/Menu';
import { Line } from 'react-chartjs-2';

const Frequencia = () => {
  const [idade, setIdade] = useState(30);
  const [ondaECG, setOndaECG] = useState([]);
  const chartRef = useRef(null);

  const gerarOndaECG = useCallback(() => {
    const taxaMaxima = 220 - idade;
    let ecg = ondaECG.slice(); // Cria uma cópia do array existente

    // Gera um novo pulso
    const novoPulso = [];
    for (let tempo = 0; tempo < 0.2; tempo += 0.01) {
      const p = Math.sin(tempo * Math.PI * 2 * 5) * 5;
      const qrs = Math.sin(tempo * Math.PI * 2 * 10) * 10;
      const t = Math.sin(tempo * Math.PI * 2 * 15) * 5;
      const onda = p + qrs + t + taxaMaxima / 2;
      novoPulso.push(onda + Math.random() * 3);
    }

    const tempoIntervalo = 1;
    const ondaIntervalo = Math.sin(tempoIntervalo * Math.PI * 2 * 5) * 2;
    const amplitudeAumentada = taxaMaxima / 2 + ondaIntervalo + Math.random() * 10;

    // Adiciona o novo pulso ao array
    ecg = ecg.concat(novoPulso, Array(Math.floor(tempoIntervalo / 0.01)).fill(amplitudeAumentada));

    // Limitar o número total de pontos
    const limitePontos = 1000;
    if (ecg.length > limitePontos) {
      ecg = ecg.slice(ecg.length - limitePontos);
    }

    return ecg;
  }, [idade, ondaECG]);

  const gerarGrafico = useCallback(() => {
    const data = {
      labels: Array.from({ length: ondaECG.length }, (_, i) => i + 1),
      datasets: [{
        label: 'Eletrocardiograma (ECG)',
        data: ondaECG,
        borderColor: 'rgba(255, 0, 0, 1)',
        borderWidth: 1,
        fill: false,
        pointRadius: 0,
        pointHitRadius: 0,
      }],
    };

    const options = {
      scales: {
        x: {
          display: true,
          title: {
            display: true,
            text: 'Tempo (s)',
          },
        },
        y: {
          suggestedMin: 50,
          suggestedMax: 90,
        },
      },
      animation: {
        duration: 0,
      },
    };

    return <Line ref={chartRef} data={data} options={options} />;
  }, [ondaECG]);

  useEffect(() => {
    const interval = setInterval(() => {
      setOndaECG(gerarOndaECG());

      // Atualizar o gráfico
      if (chartRef.current) {
        const chartInstance = chartRef.current.chartInstance;
        if (chartInstance) {
          chartInstance.update();
        }
      }
    }, 1000); // Atualizar a cada segundo

    // Limpar o intervalo quando o componente for desmontado
    return () => clearInterval(interval);
  }, [gerarOndaECG]);

  return (
    <div>
      <Menu />
      <div>
        <label htmlFor="idade">Idade:</label>
        <input
          type="number"
          id="idade"
          value={idade}
          onChange={(e) => setIdade(parseInt(e.target.value, 10))}
        />
      </div>

      {gerarGrafico()}
    </div>
  );
};

export default Frequencia;
