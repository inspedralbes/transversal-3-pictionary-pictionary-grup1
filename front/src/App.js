import logo from "./logo.svg";
import "./App.css";
import { useState, useEffect } from "react";
import Board from "./components/Board";
import WordForm from './components/WordForm';
import React from 'react';

function App(socket) {
  function handleFormSubmit(word) {
    fetch('/check-word', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
      },
      body: JSON.stringify({
        word: word
      })
    })
      .then(response => response.json())
      .then(data => alert(data.message))
      .catch(error => console.error(error));
  }
  const [cliente, setCliente] = useState("Boton Normal");
  useEffect(() => {
    if (cliente == "Gaspar") {
      console.log("El boton se llama “Gaspar”.");
    }
  }, [cliente]); //Aquí se pone qué estado queremos que detecte el cambio.
  return (
    <div>
      <Board></Board>
      <WordForm onSubmit={handleFormSubmit} />

    </div>
  );
}

export default App;
