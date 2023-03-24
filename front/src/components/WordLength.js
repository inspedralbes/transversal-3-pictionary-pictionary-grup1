import "../App.css";
import { useState, useEffect } from "react";
import React from "react";

function WordLength({ socket }) {
  const [word, setWord] = useState([]);

  useEffect(() => {
    socket.emit("get_word_length");
    socket.on("current_word_length", (data) => {
      if (data != undefined) {
        if (data.long != 0) {
          let w = [];
          for (let i = 0; i < data.long; i++) {
            w.push("_ ");
          }
          setWord(w);
          console.log(word);
        }
      }
    });

    socket.on("word_letters", (data) => {
        let a = ["_", "_", "_", "_", "_", "_", "_"];
        a[data.pos] = data.letter;
        console.log("2: " + word);
        setWord(a);
        console.log("3: " + a);
        
    });
  }, [socket]);

  return (
    <div>
      <p>{word}</p>
    </div>
  );
}

export default WordLength;
