import React, { useState } from 'react';
import Menu from '../components/Menu';

function DDA() {
  const [valuex1, setValuex1] = useState('');
  const [valuey1, setValuey1] = useState('');

  const [valuex2, setValuex2] = useState('');
  const [valuey2, setValuey2] = useState('');

  const fetchData = () => {
    const arrayData = [{"pontox": `${valuex1}`, "pontoy": `${valuey1}`}, {"pontox": `${valuex2}`, "pontoy": `${valuey2}`}]; // Seu array de dados
  
    fetch('http://localhost:9090/figura/reta/dda', {
      method: 'GET',
      body: JSON.stringify(arrayData)
    })
      .then(response => response.json())
      .then(data => {
        console.log(data)
      })
      .catch(error => {
        console.log(error)
      });
  }
  

  const handleChangex1 = (e) => {
    const inputValuex = parseInt(e.target.value);
    if (!isNaN(inputValuex)) {
      setValuex1(inputValuex);
    }else{
      setValuex1(0);
    }
  };

  const handleChangey1 = (e) => {
    const inputValuey = parseInt(e.target.value);
    if (!isNaN(inputValuey)) {
      setValuey1(inputValuey);
    }else{
      setValuex1(0);
    }
  };

  const handleChangex2 = (e) => {
    const inputValuex = parseInt(e.target.value);
    if (!isNaN(inputValuex)) {
      setValuex2(inputValuex);
    }else{
      setValuex2(0);
    }
  };

  const handleChangey2 = (e) => {
    const inputValuey = parseInt(e.target.value);
    if (!isNaN(inputValuey)) {
      setValuey2(inputValuey);
    }else{
      setValuex2(0);
    }
  };

  return (
    <div>
      <Menu />
      <h1>Reta DDA</h1>
      <label>
        Valor x1:
        <input type="number" value={valuex1} onChange={handleChangex1} />
      </label>
      <br />
      <label>
        Valor y1:
        <input type="number" value={valuey1} onChange={handleChangey1} />
      </label>
      <br />     
      <label>
        Valor x2:
        <input type="number" value={valuex2} onChange={handleChangex2} />
      </label>
      <br />
      <label>
        Valor y2:
        <input type="number" value={valuey2} onChange={handleChangey2} />
      </label>
      <br />
      <p>Valor x1: {valuex1}</p>
      <p>Valor y1: {valuey1}</p>
      <p>Valor x2: {valuex2}</p>
      <p>Valor y2: {valuey2}</p>
      <button onClick={fetchData}>Desenhar</button>
    </div>
  );
}

export default DDA;
