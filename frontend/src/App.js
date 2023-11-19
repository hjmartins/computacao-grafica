import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Menu from './components/Menu';

import Home from './pages/Home';
import Sobre from './pages/Sobre';

// NDC
import NDC from './pages/NDC/Ndc';
// Retas
import RDda from './pages/Retas/Dda';
import RPontoM from './pages/Retas/PontoM';
//Circulos
import CExplicita from './pages/Circulos/Explicita';
import CTrigonometrica from './pages/Circulos/Trigonometria';
import CPontoM from './pages/Circulos/CPontoM';
//Elipses
import EPontoM from './pages/Elipses/EPontoM';
//Filtros
import Filter from './pages/Processamento-de-imagem/Filtros'
import OperadoresMorfologicosBinario from './pages/Processamento-de-imagem/OperadoresMorfologicosBinario'
import OperacoesImagem from './pages/Processamento-de-imagem/OperacoesImagem'
const App = () => {
  return (
    <Router>
      <Menu />
      <Route exact path="/" component={Home} />
      <Route path="/sobre" component={Sobre} />
      <Route path="/ndc/ndc" component={NDC} />
      <Route path="/retas/dda" component={RDda} />
      <Route path="/retas/pontom" component={RPontoM} />
      <Route path="/circulos/explicita" component={CExplicita} />
      <Route path="/circulos/trigonometrica" component={CTrigonometrica} />
      <Route path="/circulos/cpontom" component={CPontoM} />
      <Route path="/elipses/epontom" component={EPontoM} />
      <Route path="/imagem/filtros" component={Filter} />
      <Route path="/imagem/operacoes-morfologicas-binarias" component={OperadoresMorfologicosBinario} />
      <Route path="/imagem/operacoes-imagens" component={OperacoesImagem} />
    </Router>
  );
}

export default App;
