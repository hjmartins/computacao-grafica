import React from 'react';
import ReactDOM from 'react-dom/client';

import Home from './pages/Home';
import Sobre from './pages/Sobre';
import RDda from './pages/Retas/Dda';
import RPontoM from './pages/Retas/PontoM';
import CExplicita from './pages/Circulo/Explicita';
import CTrigonometrica from './pages/Circulo/Trigonometria';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  {path:'/', element:<Home/>},
  {path:'/sobre', element:<Sobre/>},
  {path:'/retas/dda', element:<RDda/>},
  {path:'/retas/pontom', element:<RPontoM/>},
  {path:'/circulos/explicita', element:<CExplicita/>},
  {path:'/circulos/trigonometrica', element:<CTrigonometrica/>},
])

ReactDOM.createRoot(document.getElementById('root')).
render(
  <React.StrictMode>
    <RouterProvider router = {router}/>
  </React.StrictMode>,
);
