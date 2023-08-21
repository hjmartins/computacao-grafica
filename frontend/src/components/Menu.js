import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Menu.css';

const Pages = require('./PagesMenu');

const Menu = () => {
  const [currentPage, setCurrentPage] = useState(Pages.HOME.key);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <nav className="menu">
    <ul>
      {Object.values(Pages).map((page) => (
        <li key={page.key} className={currentPage === page.key ? 'active' : ''}>
          <Link to={`/${page.key}`} onClick={() => handlePageChange(page.key)}>
            {page.title}
          </Link>
        </li>
      ))}
    </ul>
  </nav>

  );
}

export default Menu;
