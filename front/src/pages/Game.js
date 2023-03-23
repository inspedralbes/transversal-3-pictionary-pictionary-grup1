import logo from "../logo.svg";
import "../App.css";
import "../styles/Game.css";
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
      setResult(data.resultsMatch);
    });

    socket.on('pintor', (data) => {
      setPintor(data.pintor);
      setResult(null)
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
      {!starting ? (
        <div className="game">
          {/* Right column */}
          <div className="game__left">
            <ConnectedUsersInGame socket={socket} pintor={pintor} />
          </div>

          {/* Left column */}
          <div  className="game__right">
            {spectator ? (
              <Board socket={socket} pintor={pintor} />
            ) : (
              <>
                {pintor ? (
                  <div>
                    <div>
                      <WordGuess className="game__word" socket={socket} />
                      <Description className="game__description" socket={socket} />
                      <Board socket={socket} pintor={pintor} />
                    </div>
                  </div>
                ) : (
                  <>
                    {result != null && (
                      <>
                        {result ? (
                          <p>{messageResponses.wordAttemptSuccess}</p>
                        ) : (
                          <p>{messageResponses.wordAttemptError}</p>
                        )}
                      </>
                    )}
                    <Board socket={socket} pintor={pintor} />
                    <WordForm socket={socket} answerCorrect={result} /><br />
                  </>
                )}
              </>
            )}
          </div>
        </div>
      ) : (
        <><p>Loading...</p></>
      )}
    </>
  );
}


export default Game;