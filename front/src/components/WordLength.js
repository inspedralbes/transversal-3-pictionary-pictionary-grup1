import "../App.css";
import { useState, useEffect } from "react";
import React from "react";

function WordLength({ socket }) {
  const [letters, setLetters] = useState([]);
  const [word, setWord] = useState("");

  const pushSpaces = () => {
    setLetters((letters) => [
      ...letters,
      {
        id: letters.length,
        letter: "_ ",
      },
    ]);
  };

  const updateArray = (data) => {
    const newLetters = letters.map((l) => {
      console.log(l);
      return {
        ...l,
        letter: data.letterNode,
      };
    });
    setLetters(newLetters);
  };

  useEffect(() => {
    socket.on("word_length", (data) => {
      if (data !== undefined) {
        if (data.long !== 0) {
          for (let i = 0; i < data.long; i++) {
            pushSpaces();
          }
        }
      }
    });

    socket.on("word_letters", (data) => {
      updateArray(data);
    });

    socket.on("clear_word", () => {
      //updateArray([]);
    });

    socket.emit("word_length_loaded");
  }, []);

  useEffect(() => {
    if (letters !== []) {
      const lettersToString = letters.map((l) => {
        return l["letter"];
      });
      setWord(lettersToString);
    }
    console.log(letters);
    console.log(word);
  }, [letters]);

  return (
    <div>
      <p>{word}</p>
      <button onClick={() => updateArray({ pos: 3, letterNode: "M" })}>
        {" "}
        AWA
      </button>
    </div>
  );
}

export default WordLength;
