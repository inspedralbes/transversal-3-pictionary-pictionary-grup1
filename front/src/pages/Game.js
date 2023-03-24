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
import CountDownTimer from "../components/CountdownTimer";
import { useNavigate } from "react-router-dom";

function Game({ socket }) {
  const [starting, setStarting] = useState(true);
  const [countdown, setCountdown] = useState(3);
  const [result, setResult] = useState(null);
  const [pintor, setPintor] = useState(false);
  const [spectator, setSpectator] = useState(false);
  const [userMessages, setUserMessages] = useState([]);

  const navigateToEndGame = useNavigate();

  const [showDrawer, setShowDrawer] = useState(true);
  const [drawerName, setDrawerName] = useState();

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
      console.log(data);
      setResult(null);
    });

    socket.on('drawer_name', (data) => {
      setDrawerName(data.name);
    });

    socket.on('spectator', (data) => {
      console.log("Spectator", data);
      setSpectator(data.spectator);
    });

    socket.on('started', () => {
      console.log("STARTED");
      setStarting(false);
      const intervalId = setInterval(() => {
        setCountdown(countdown => countdown - 1);
      }, 1000);
      setTimeout(() => {
        clearInterval(intervalId);
        setStarting(false);
        setShowDrawer(false);
      }, 3000);
    })

    socket.on("game_ended", () => {
      navigateToEndGame("/endGame");
    })

    return () => {
      socket.off('send_guessed_word');
      socket.off('answer_result');
      socket.off('pintor');
      socket.off('drawer_name');
      socket.off('started');
    };
  }, []);

  return (
    <>
      {starting && (
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontSize: '10rem' }}>
          Loading
        </div>
      )}
      {!starting && showDrawer && (
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontSize: '5rem' }}>
          {countdown}<br></br><br></br>
          Drawer: {drawerName}
        </div>
      )}
      {!starting && !showDrawer && (
        <div className="game">
          {/* Right column */}
          <div className="game__left">
            <ConnectedUsersInGame socket={socket} pintor={pintor} />
          </div>

          {/* Left column */}
          <div className="game__right">
            {spectator ? (<div>
              <Board socket={socket} pintor={pintor} />
              <CountDownTimer socket={socket} />
              </div>
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
                    <CountDownTimer socket={socket} />
                    <Board socket={socket} pintor={pintor} />
                    <WordForm socket={socket} answerCorrect={result} /><br />
                  </>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default Game;