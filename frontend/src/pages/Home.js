import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <h1>Bem-vindo ao Nosso Projeto</h1>
      <h3>Desenvolvido por:</h3>
      <h3>Thiago Felipe, João Victor Marinho, Luana Vidal, Henrique</h3>
      <Link to="/Sobre" className="btn">
        Ir para a Apresentação
      </Link>
    </div>
  );
}

export default Home;
