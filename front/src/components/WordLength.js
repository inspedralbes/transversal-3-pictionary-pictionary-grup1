import "../App.css";
import { useState, useEffect } from "react";
import React from "react";

function WordLength({socket}) {
    const [word, setWord] = useState("");

    useEffect(() => {
        socket.on('current_word', (data) => {
            if (data != undefined) {
                setWord(data.word.name);
            }
        });
    }, [])

    return (
        <div>
            <p>{word}</p>
        </div>
    );
}

export default WordLength;
