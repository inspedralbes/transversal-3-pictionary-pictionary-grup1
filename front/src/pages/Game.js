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
  const [countdown, setCountdown] = useState(3);
  const [result, setResult] = useState(null);
  const [pintor, setPintor] = useState(false);
  const [spectator, setSpectator] = useState(false);
  const [userMessages, setUserMessages] = useState([]);
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
      setResult(null)
    });

    socket.on('drawer_name', (data) => {
      setDrawerName(data.name);
    });

    socket.on('spectator', (data) => {
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
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontSize: '10rem' }}>
          {countdown}<br></br><br></br>
          Drawer: {drawerName}
        </div>
      )}
      {!starting && !showDrawer && (
        <div style={{ display: 'flex' }}>
          {/* Right column */}
          <div>
            <ConnectedUsersInGame socket={socket} pintor={pintor} />
          </div>

          {/* Left column */}
          <div>
            {spectator ? (
              <Board socket={socket} pintor={pintor} />
            ) : (
              <>
                {pintor ? (
                  <div>
                    <div>
                      <WordGuess socket={socket} />
                      <Description socket={socket} />
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
                    <WordForm socket={socket} answerCorrect={result} /><br />
                    <Board socket={socket} pintor={pintor} />
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