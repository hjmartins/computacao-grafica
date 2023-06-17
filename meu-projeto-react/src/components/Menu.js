import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Menu.css';

const Menu = () => {
  const [currentPage, setCurrentPage] = useState('home');

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <nav className="menu">
      <ul>
        <li className={currentPage === 'home' ? 'active' : ''}>
          <Link to="/" onClick={() => handlePageChange('home')}>
            Home
          </Link>
        </li>
        <li className={currentPage === 'sobre' ? 'active' : ''}>
          <Link to="/sobre" onClick={() => handlePageChange('sobre')}>
            Alunos
          </Link>
        </li>
        <li className={currentPage === 'contato' ? 'active' : ''}>
          <Link to="/contato" onClick={() => handlePageChange('contato')}>
            Contato
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Menu;
