import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import Sobre from './pages/Sobre';
import OutraPagina from './pages/OutraPagina';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/sobre" component={Sobre} />
        <Route path="/outra-pagina" component={OutraPagina} />
      </Switch>
    </Router>
  );
}

export default App;
