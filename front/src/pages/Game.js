import logo from "../logo.svg";
import "../App.css";
import { useState, useEffect } from "react";
import Board from "../components/Board";
import WordForm from '../components/WordForm';
import React from 'react';
import ConnectedUsersInGame from "../components/ConnectedUsersInGame";
import WordGuess from "../components/WordGuess";
import Description from "../components/Description";

function Game({ socket }) {
  const [starting, setStarting] = useState(true);
  const [result, setResult] = useState(null);
  const [pintor, setPintor] = useState(false);
  const [spectator, setSpectator] = useState(false);
  const [userMessages, setUserMessages] = useState([]);

  const messageResponses = {
    wordAttemptError: "You failed the attempt!",
    wordAttemptSuccess: "Well done! You're the best!"
  }

  useEffect(() => {

    socket.on('answer_result', (data) => {
      if (data.resultsMatch) {
        setResult(messageResponses.wordAttemptSuccess)
      } else {
        setResult(messageResponses.wordAttemptError)
      }
    });

    socket.on('pintor', (data) => {
      setPintor(data.pintor);
      setResult("")
    });

    socket.on('spectator', (data) => {
      setSpectator(data.spectator);
    });

    socket.on('started', () => {
      console.log("STARTED");
      setStarting(false);
    })

    return () => {
      socket.off('send_guessed_word');
      socket.off('answer_result');
      socket.off('pintor');
      socket.off('started');
    };
  }, []);


  return (
    <>
      {!starting ? <>
        {spectator ?
          <>
            <Board socket={socket} pintor={pintor}></Board>
          </> :
          <>
            {pintor ?
              <div style={{ display: "flex" }}>
                <div style={{ marginRight: "20px" }}>
                  <WordGuess socket={socket}></WordGuess>
                  <Description socket={socket}></Description>
                  {result && <p>{result}</p>}
                  <Board socket={socket} pintor={pintor}></Board>
                </div>
              </div> : <>
                {result && <p>{result}</p>}
                <WordForm socket={socket} /><br></br>
                <Board socket={socket} pintor={pintor}></Board>
              </>}
          </>}
      </> : <><p>Loading...</p></>}

      <ConnectedUsersInGame socket={socket} pintor={pintor}></ConnectedUsersInGame>
    </>
  )

}

export default Game;