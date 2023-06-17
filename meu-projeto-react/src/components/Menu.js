import React, { useState } from 'react';
import '../styles/Menu.css';

const Menu = () => {
  const [currentPage, setCurrentPage] = useState('home');

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <nav className="menu menu-container">
      <ul>
        <li className={currentPage === 'home' ? 'active' : ''}>
          <a href="#" onClick={() => handlePageChange('home')}>
            Home
          </a>
        </li>
        <li className={currentPage === 'sobre' ? 'active' : ''}>
          <a href="#sobre" onClick={() => handlePageChange('sobre')}>
            Alunos
          </a>
        </li>
        <li className={currentPage === 'contato' ? 'active' : ''}>
          <a href="#" onClick={() => handlePageChange('contato')}>
            Contato
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default Menu;
