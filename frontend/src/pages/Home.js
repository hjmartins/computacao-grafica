import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <h1>Bem-vindo à Página Inicial</h1>
      <Link to="/Sobre" className="btn">
        Ir para a página Sobre
      </Link>
    </div>
  );
}

export default Home;
