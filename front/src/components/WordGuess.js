import "../App.css";
import { useState, useEffect } from "react";
import React from 'react';

function WordGuess({ socket }) {
  const [wordToCheck, setWordToCheck] = useState("");

  useEffect(() => {
    socket.on('word_to_check', (data) => {
      setWordToCheck(data.word);
    });

    socket.on('game_data', (data) => {
      setWordToCheck(data.words[0]);
      console.log("startea");
    });

    return () => {
      socket.off('word_to_check');
    };
  }, []);


  return (
    <>
      <p>{wordToCheck}</p>
    </>
  )

}

export default WordGuess;
