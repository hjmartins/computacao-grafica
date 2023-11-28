import React, { useRef, useEffect, useState } from 'react';
import Menu from '../../components/Menu';

const ProjecaoOrtografica = () => {
  const canvasRef = useRef(null);
  const [vertices, setVertices] = useState([
    { x: -50, y: -50, z: 50 },
    { x: 50, y: -50, z: 50 },
    { x: 50, y: 50, z: 50 },
    { x: -50, y: 50, z: 50 },
    { x: -50, y: -50, z: -50 },
    { x: 50, y: -50, z: -50 },
    { x: 50, y: 50, z: -50 },
    { x: -50, y: 50, z: -50 },
  ]);

  const [inputVertices, setInputVertices] = useState(
    vertices.map((vertex) => `${vertex.x},${vertex.y},${vertex.z}`)
  );

  const canvasWidth = 300;
  const canvasHeight = 300;

  const projectOrthographic = (vertex) => {
    // Aplica a projeção ortográfica
    return {
      x: vertex.x + canvasWidth / 2,
      y: vertex.y + canvasHeight / 2,
    };
  };

  const connectVertices = (ctx, v1, v2) => {
    ctx.moveTo(v1.x, v1.y);
    ctx.lineTo(v2.x, v2.y);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // Limpa o canvas
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    // Desenha o plano cartesiano
    ctx.beginPath();
    ctx.moveTo(0, canvasHeight / 2);
    ctx.lineTo(canvasWidth, canvasHeight / 2);
    ctx.moveTo(canvasWidth / 2, 0);
    ctx.lineTo(canvasWidth / 2, canvasHeight);
    ctx.strokeStyle = '#ccc';
    ctx.stroke();

    // Desenha o cubo
    ctx.beginPath();
    connectVertices(ctx, projectOrthographic(vertices[0]), projectOrthographic(vertices[1]));
    connectVertices(ctx, projectOrthographic(vertices[1]), projectOrthographic(vertices[2]));
    connectVertices(ctx, projectOrthographic(vertices[2]), projectOrthographic(vertices[3]));
    connectVertices(ctx, projectOrthographic(vertices[3]), projectOrthographic(vertices[0]));

    connectVertices(ctx, projectOrthographic(vertices[4]), projectOrthographic(vertices[5]));
    connectVertices(ctx, projectOrthographic(vertices[5]), projectOrthographic(vertices[6]));
    connectVertices(ctx, projectOrthographic(vertices[6]), projectOrthographic(vertices[7]));
    connectVertices(ctx, projectOrthographic(vertices[7]), projectOrthographic(vertices[4]));

    connectVertices(ctx, projectOrthographic(vertices[0]), projectOrthographic(vertices[4]));
    connectVertices(ctx, projectOrthographic(vertices[1]), projectOrthographic(vertices[5]));
    connectVertices(ctx, projectOrthographic(vertices[2]), projectOrthographic(vertices[6]));
    connectVertices(ctx, projectOrthographic(vertices[3]), projectOrthographic(vertices[7]));

    ctx.strokeStyle = '#000';
    ctx.stroke();
  }, [vertices]);

  const handleInputChange = (index, value) => {
    const newInputVertices = [...inputVertices];
    newInputVertices[index] = value;
    setInputVertices(newInputVertices);
  };

  const handleApplyChanges = () => {
    const newVertices = inputVertices.map((vertex) => {
      const [x, y, z] = vertex.split(',').map(Number);
      return { x, y, z };
    });
    setVertices(newVertices);
  };

  return (
    <div>
      <Menu />
      <div>
        {inputVertices.map((input, index) => (
          <input
            key={index}
            type="text"
            value={input}
            onChange={(e) => handleInputChange(index, e.target.value)}
          />
        ))}
        <button onClick={handleApplyChanges}>Apply Changes</button>
      </div>
      <canvas
        ref={canvasRef}
        width={canvasWidth}
        height={canvasHeight}
        style={{ border: '1px solid #000' }}
      />
    </div>
  );
};

export default ProjecaoOrtografica;
