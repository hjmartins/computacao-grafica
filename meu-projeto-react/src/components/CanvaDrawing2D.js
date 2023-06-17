import React, { useRef } from 'react';

export function handleButtonClick(canvasRef, points) {
  const canvas = canvasRef.current;
  const context = canvas.getContext('2d');

  context.clearRect(0, 0, canvas.width, canvas.height); // Limpa o canvas

  points.forEach(({ pontox, pontoy }) => {
    context.fillRect(pontox, pontoy, 1, 1);
  });
}

function CanvasDrawing({ points }) {
  const canvasRef = useRef(null);

  return (
    <div>
      <canvas ref={canvasRef} width={500} height={500} />
      <button onClick={() => handleButtonClick(canvasRef, points)}>Desenhar</button>
    </div>
  );
}

export default CanvasDrawing;
