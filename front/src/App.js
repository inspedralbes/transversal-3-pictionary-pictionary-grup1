import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';
import Board from './components/Board'


function App(socket) {
  const [cliente, setCliente] = useState('Boton Normal');
  useEffect(() => {
    if (cliente == 'Gaspar') {
    console.log('El boton se llama “Gaspar”.');
  }
}, [cliente]); //Aquí se pone qué estado queremos que detecte el cambio.
return (
  <div className="App">
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <p>
        Edit <code>src/App.js</code> and save to reload.
      </p>
      <Board socket={socket}></Board>
      <a
        className="App-link"
        href="https://reactjs.org"
        target="_blank"
        rel="noopener noreferrer"
      >
        Learn React
      </a>
      <button onClick={() => setCliente('Gaspar')}>{ cliente }</button>
    </header>
  </div>
);
}

export default App;
