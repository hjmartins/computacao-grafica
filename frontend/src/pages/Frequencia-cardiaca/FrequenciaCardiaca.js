import React, { useState } from 'react';
import Menu from '../../components/Menu';
import { Line } from 'react-chartjs-2';

const Frequencia = () => {
  const [idade, setIdade] = useState(30);

  const gerarOndaECG = (idade) => {
    const taxaMaxima = 220 - idade;
    const ecg = [];

    for (let ciclo = 0; ciclo < 3; ciclo++) {
      for (let tempo = 0; tempo < 0.2; tempo += 0.01) {
        const p = Math.sin(tempo * Math.PI * 2 * 5) * 5;
        const qrs = Math.sin(tempo * Math.PI * 2 * 10) * 10;
        const t = Math.sin(tempo * Math.PI * 2 * 15) * 5;
        const onda = p + qrs + t + taxaMaxima / 2;
        ecg.push(onda + Math.random() * 3);
      }

      const tempoIntervalo = 1;
      const ondaIntervalo = Math.sin(tempoIntervalo * Math.PI * 2 * 5) * 2;
      const amplitudeAumentada = taxaMaxima / 2 + ondaIntervalo + Math.random() * 10;

      for (let tempo = 0; tempo < tempoIntervalo; tempo += 0.01) {
        ecg.push(amplitudeAumentada);
      }
    }

    return ecg;
  };

  const gerarGrafico = () => {
    const ondaECG = gerarOndaECG(idade);

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
        duration: 1000,
        easing: 'linear',
      },
    };

    return <Line data={data} options={options} />;
  };

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
        <button onClick={gerarGrafico}>Gerar ECG</button>
      </div>

      {gerarGrafico()}
    </div>
  );
};

export default Frequencia;
