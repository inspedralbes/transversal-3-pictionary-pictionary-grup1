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
import { useNavigate } from "react-router-dom";

function Game({ socket }) {
  const navigateToEndGame = useNavigate();
  const [starting, setStarting] = useState(true);
  const [countdown, setCountdown] = useState(3);
  const [result, setResult] = useState(null);
  const [pintor, setPintor] = useState(false);
  const [spectator, setSpectator] = useState(false);
  const [showDrawer, setShowDrawer] = useState(true);
  const [drawerName, setDrawerName] = useState();
  const [roundEnded, setRoundEnded] = useState(false);
  const [wordToCheck, setWordToCheck] = useState("");
  const [wordIndex, setWordIndex] = useState(0);

  const [words, setWords] = useState([]);

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
      setResult(null);
    });

    socket.on('drawer_name', (data) => {
      setDrawerName(data.name);
    });

    socket.on("round_ended", () => {
      setRoundEnded(true);
      const intervalId = setInterval(() => {
        setCountdown(countdown => countdown - 1);
      }, 1000);
      setTimeout(() => {
        clearInterval(intervalId);
        setRoundEnded(false);
        setWordIndex(wordIndex => wordIndex + 1);
        setCountdown(3);
        socket.emit('round_end');
      }, 3000);
    })

    socket.on('spectator', (data) => {
      setSpectator(data.spectator);
    });

    socket.on('game_data', (data) => {
      setWords(data.words);
      setWordToCheck(data.words[wordIndex].name);
    });

    socket.on('started', () => {
      setStarting(false);
      const intervalId = setInterval(() => {
        setCountdown(countdown => countdown - 1);
      }, 1000);
      setTimeout(() => {
        clearInterval(intervalId);
        setStarting(false);
        setShowDrawer(false);
        setCountdown(3);
        socket.emit('countdown_ended');
      }, 3000);
    })

    socket.on("game_ended", () => {
      console.log("end game");
      navigateToEndGame("/endGame");
    })

    return () => {
      socket.off('send_guessed_word');
      socket.off('answer_result');
      socket.off('pintor');
      socket.off('drawer_name');
      socket.off('started');
      socket.off('game_data');

    };
  }, []);

  useEffect(() => {
    if (words.length > 0) {
      setWordToCheck(words[wordIndex].name);
    }
  }, [wordIndex, words]);

  return (
    <>
      {starting && (
        <div style={{ textAlign: 'center', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontSize: '10rem' }}>
          Loading
        </div>
      )}
      {!starting && showDrawer && (
        <div style={{ textAlign: 'center', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontSize: '5rem' }}>
          {countdown}<br></br><br></br>
          Drawer: {drawerName}
        </div>
      )}
      {!starting && roundEnded && (
        <div style={{ textAlign: 'center', position: 'fixed', top: '50%', left: '50%', fontSize: '5rem', transform: 'translate(-50%, -50%)', zIndex: '1', backgroundColor: 'white', border: '1px solid black' }}>
          Last word was: {wordToCheck}<br></br><br></br>
          Next round drawer: {drawerName}
        </div>
      )}
      {!starting && !showDrawer && (
        <div style={{ display: 'flex', pointerEvents: roundEnded ? 'none' : 'auto' }}>
          <div>
            <ConnectedUsersInGame socket={socket} pintor={pintor} />
          </div>
          <div>
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
      )}
    </>
  );
}

export default Game;