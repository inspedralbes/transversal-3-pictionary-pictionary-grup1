import logo from "./logo.svg";
import "./App.css";
import { useState, useEffect } from "react";
import Board from "./components/Board";
import WordForm from './components/WordForm';
import React from 'react';

function App() {
  const [result, setResult] = useState(null);
  const [wordToCheck, setWordToCheck] = useState();

  function handleFormSubmit(word) {
    fetch('http://localhost:8000/api/checkWord', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        word: word,
        wordToCheck: wordToCheck
      })
    })
      .then(response => response.json())
      .then(data => setResult(data.result))
      .catch(error => console.error(error));
  }
  useEffect(() => {
    fetch('http://localhost:8000/api/getWord', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => setWordToCheck(data.wordToCheck))
      .catch(error => console.error(error));
  }, [])

  return (
    <div>
      {wordToCheck && <p>{wordToCheck}</p>}
      {result && <p>{result}</p>}
      <WordForm onSubmit={handleFormSubmit} /><br></br>
      <Board></Board>
    </div>
  );
}

export default App;
