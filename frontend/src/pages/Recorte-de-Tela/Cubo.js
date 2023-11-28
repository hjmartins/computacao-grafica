import React, { useRef, useEffect, useState } from 'react';
import Menu from '../../components/Menu';

const CuboTridimensional = () => {
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
  const projectionCenter = { x: 0, y: 0, z: 500 };
  const scale = 1000;

  const project = (vertex) => {
    const dz = vertex.z - projectionCenter.z;
    return {
      x: (vertex.x - projectionCenter.x) * scale / dz + canvasWidth / 2,
      y: (vertex.y - projectionCenter.y) * scale / dz + canvasHeight / 2,
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

    // Desenha os eixos Z
    const zPositiveProjection = project({ x: 0, y: 0, z: 100 });
    const zNegativeProjection = project({ x: 0, y: 0, z: -100 });

    ctx.beginPath();
    ctx.moveTo(canvasWidth / 2, canvasHeight / 2);
    ctx.lineTo(zPositiveProjection.x, zPositiveProjection.y);
    ctx.moveTo(canvasWidth / 2, canvasHeight / 2);
    ctx.lineTo(zNegativeProjection.x, zNegativeProjection.y);
    ctx.strokeStyle = '#f00';
    ctx.stroke();

    // Desenha o cubo
    ctx.beginPath();
    connectVertices(ctx, project(vertices[0]), project(vertices[1]));
    connectVertices(ctx, project(vertices[1]), project(vertices[2]));
    connectVertices(ctx, project(vertices[2]), project(vertices[3]));
    connectVertices(ctx, project(vertices[3]), project(vertices[0]));

    connectVertices(ctx, project(vertices[4]), project(vertices[5]));
    connectVertices(ctx, project(vertices[5]), project(vertices[6]));
    connectVertices(ctx, project(vertices[6]), project(vertices[7]));
    connectVertices(ctx, project(vertices[7]), project(vertices[4]));

    connectVertices(ctx, project(vertices[0]), project(vertices[4]));
    connectVertices(ctx, project(vertices[1]), project(vertices[5]));
    connectVertices(ctx, project(vertices[2]), project(vertices[6]));
    connectVertices(ctx, project(vertices[3]), project(vertices[7]));

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

export default CuboTridimensional;
