import React from 'react';
import { Link } from 'react-router-dom';

const Botao = () => {
  return (
    <div className="botao-container">
      <Link to="/outra-pagina" className="botao-link">Ir para outra página</Link>
    </div>
  );
}

export default Botao;
