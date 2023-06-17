import React, { useState } from 'react';
import Menu from '../components/Menu';
import '../styles/Dda.css'; // Importe o arquivo CSS para estilização

function DDA() {
  const [valuex1, setValuex1] = useState('');
  const [valuey1, setValuey1] = useState('');

  const [valuex2, setValuex2] = useState('');
  const [valuey2, setValuey2] = useState('');

  const fetchData = () => {
    const arrayData = [
      { pontox: valuex1, pontoy: valuey1 },
      { pontox: valuex2, pontoy: valuey2 }
    ];

    fetch('http://localhost:9090/figura/reta/dda', {
      method: 'GET',
      body: JSON.stringify(arrayData)
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handleChangex1 = e => {
    const inputValuex = parseInt(e.target.value);
    if (!isNaN(inputValuex)) {
      setValuex1(inputValuex);
    } else {
      setValuex1(0);
    }
  };

  const handleChangey1 = e => {
    const inputValuey = parseInt(e.target.value);
    if (!isNaN(inputValuey)) {
      setValuey1(inputValuey);
    } else {
      setValuey1(0);
    }
  };

  const handleChangex2 = e => {
    const inputValuex = parseInt(e.target.value);
    if (!isNaN(inputValuex)) {
      setValuex2(inputValuex);
    } else {
      setValuex2(0);
    }
  };

  const handleChangey2 = e => {
    const inputValuey = parseInt(e.target.value);
    if (!isNaN(inputValuey)) {
      setValuey2(inputValuey);
    } else {
      setValuey2(0);
    }
  };

  return (
    <div>
      <Menu />
      <h1>Reta DDA</h1>
  
      <div className="input-card">
        <h2>Ponto 1</h2>
        <div className="input-row">
          <div className="input-group">
            <label>Valor x1:</label>
            <input type="number" value={valuex1} onChange={handleChangex1} />
          </div>
          <div className="input-group">
            <label>Valor y1:</label>
            <input type="number" value={valuey1} onChange={handleChangey1} />
          </div>
        </div>
      </div>
  
      <div className="input-card">
        <h2>Ponto 2</h2>
        <div className="input-row">
          <div className="input-group">
            <label>Valor x2:</label>
            <input type="number" value={valuex2} onChange={handleChangex2} />
          </div>
          <div className="input-group">
            <label>Valor y2:</label>
            <input type="number" value={valuey2} onChange={handleChangey2} />
          </div>
        </div>
      </div>
  
      <button onClick={fetchData}>Desenhar</button>
    </div>
  ); 
}

export default DDA;
