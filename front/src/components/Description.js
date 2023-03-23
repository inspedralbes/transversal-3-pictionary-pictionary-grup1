import "../App.css";
import { useState, useEffect } from "react";
import React from "react";
//DOCUMENTACIÓ DE DESCRIPCIO: https://dictionaryapi.dev/

function Description({ socket }) {
  const [description, setDescription] = useState("");
  const [refresh, setRefresh] = useState(0);
  const [word, setWord] = useState("");

  useEffect(() => {

    socket.on('game_data', (data) => {
      console.log(data);
      if (data.words != undefined) {
        setWord(data.words[0].name);
      }
    });

    socket.on("current_word", (data) => {
      if (data != undefined) {
        setWord(data.word.name);
      }
    });

    return () => {
      socket.off("word_to_check");
    };
  }, [socket]);

  useEffect(() => {
    fetch("https://api.dictionaryapi.dev/api/v2/entries/en/" + word)
      .then((response) => response.json())
      .then((data) => {
        try {
          if (refresh < data[0].meanings[0].definitions.length) {
            setDescription(data[0].meanings[0].definitions[refresh].definition);
          } else {
            setRefresh(0);
          }
        } catch (error) {
          setDescription(data.title);
        }
      });
  }, [refresh, word]);

  return (
    <>
      <p>{description}</p>
      <button onClick={() => setRefresh(refresh + 1)}>Refresh</button>
    </>
  );
}

export default Description;
