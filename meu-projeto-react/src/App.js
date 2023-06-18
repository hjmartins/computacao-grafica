import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Menu from './components/Menu';

import Home from './pages/Home';
import Sobre from './pages/Sobre';
import Dda from './pages/Dda';
import PontoM from './pages/PontoM';

const App = () => {
  return (
    <Router>
      <Menu />
      <Route exact path="/" component={Home} />
      <Route path="/sobre" component={Sobre} />
      <Route path="/dda" component={Dda} />
      <Route path="/pontom" component={PontoM} />
    </Router>
  );
}

export default App;
