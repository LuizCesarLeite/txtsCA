import React from 'react';
import './App.css';
import logotipo from './assets/logotipo.png';
import Routes from './routes';

function App() {
  
  return (

    <div className="contenedor">
      
    <img src={logotipo} alt="Um logotipo qualquer" />

      <div className="conteudo">
        <Routes />
      </div>
    </div>
  );

}

export default App;
