import "../App.css";
import { useState, useEffect } from "react";
import React from "react";

function WordLength({ socket }) {
  const [word, setWord] = useState("");
  let spaces = [];

  const pushSpaces = (index) => {
    const space = {
      id: index,
      letter: "_ ",
    }
    spaces.push(space)

  }

  const updateArray = (data) => {
    console.log(data);
    if (data === []) {
      spaces = [];
      console.log(spaces);
    } else {
      spaces.map((s) => {
        if (s.id === data.pos) {
          spaces[s.id].letter = data.letterNode + " ";
        }
      });
    }

    arrayToString();
  };

  const arrayToString = () => {
    const lettersToString = spaces.map((s) => {
      return s["letter"].toUpperCase();
    });

    setWord(lettersToString);
  }


  useEffect(() => {
    socket.on("word_length", (data) => {
      if (data !== undefined) {
        if (data.long !== 0) {
          for (let i = 0; i < data.long; i++) {
            pushSpaces(i);
          }
          arrayToString();
        }
      }

    });

    socket.on("word_letters", (data) => {
      updateArray(data);
    });

    socket.on("clear_word", () => {
      console.log("clear");
      updateArray([]);
    });

    socket.emit("word_length_loaded");
  }, []);

  return (
    <div>
      <p>{word}</p>
    </div>
  );
}

export default WordLength;
