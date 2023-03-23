import "../App.css";
import { useState, useEffect } from "react";
import React from "react";

function WordLength({ socket }) {
  const [long, setLong] = useState(0);
  const [word, setWord] = useState("");

  useEffect(() => {
    socket.emit("get_word_length");
    socket.on("current_word_length", (data) => {
      if (data != undefined) {
        setLong(data.long);
        if (long != 0) {
            for (let i = 0; i < long; i++) {
              setWord(word + "_ ");
            }
          }
      }
    });

    
    console.log(word);
  }, [socket]);

  return (
    <div>
      <p>{word}</p>
    </div>
  );
}

export default WordLength;
