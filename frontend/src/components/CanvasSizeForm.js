import React, { useState } from 'react';

function CanvasSizeForm({ onSubmit }) {
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ width, height });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Definir Tamanho do Canvas</h2>
      <div className="input-group">
        <label>Largura:</label>
        <input
          type="number"
          value={width}
          onChange={(e) => setWidth(e.target.value)}
        />
      </div>
      <div className="input-group">
        <label>Altura:</label>
        <input
          type="number"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
        />
      </div>
      <button type="submit">Definir Tamanho</button>
    </form>
  );
}

export default CanvasSizeForm;
