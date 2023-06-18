import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Menu from './components/Menu';

import Home from './pages/Home';
import Sobre from './pages/Sobre';
import RDda from './pages/Retas/Dda';
import RPontoM from './pages/Retas/PontoM';
import CExplicita from './pages/Circulo/Explicita';
import CTrigonometrica from './pages/Circulo/Trigonometria';

const App = () => {
  return (
    <Router>
      <Menu />
      <Route exact path="/" component={Home} />
      <Route path="/sobre" component={Sobre} />
      <Route path="/retas/dda" component={RDda} />
      <Route path="/retas/pontom" component={RPontoM} />
      <Route path="/circulos/explicita" component={CExplicita} />
      <Route path="/circulos/trigonometrica" component={CTrigonometrica} />
    </Router>
  );
}

export default App;
