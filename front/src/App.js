import logo from "./logo.svg";
import "./styles/App.css";
import { useState, useEffect } from "react";
import Board from "./components/Board";
import WordForm from './components/WordForm';
import React from 'react';
import routes from "./index.js";

function App({ socket }) {
  const [result, setResult] = useState(null);
  const [wordToCheck, setWordToCheck] = useState("");
  const [pintor, setPintor] = useState(false);

  const messageResponses = {
    wordAttemptError: "You failed the attempt!",
    wordAttemptSuccess: "Well done! You're the best!"
  }

  function handleFormSubmit(word) {
    socket.emit("try_word_attempt", {
      word: word
    })
  }

  useEffect(() => {
    socket.on('word_to_check', (data) => {
      setWordToCheck(data.word);
    });

    socket.on('answer_result', (data) => {
      console.log(data);
      if (data.resultsMatch) {
        setResult(messageResponses.wordAttemptSuccess)
      } else {
        setResult(messageResponses.wordAttemptError)
      }
    })

    socket.on('pintor', (data) => {
      setPintor(data.pintor);
    });
  }, [])

    if (pintor) {
      return (
        <div>
          {wordToCheck && <p>{wordToCheck}</p>}
          {result && <p>{result}</p>}
          <Board socket={socket}></Board>
        </div>
      )}else{
        return (
          <div>
            {result && <p>{result}</p>}
            <WordForm onSubmit={handleFormSubmit} /><br></br>
            <Board socket={socket}></Board>
          </div>
        )
      }

}

export default App;
