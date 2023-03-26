import "../App.css";
import { useState, useEffect } from "react";
import React from "react";

function WordLength({ socket }) {
    const [letters, setLetters] = useState([])
    const [word, setWord] = useState("");

    useEffect(() => {
        socket.emit("get_word_length");
        socket.on("current_word_length", (data) => {
            let w = [];
            if (data !== undefined) {
                if (data.long !== 0) {
                    for (let i = 0; i < data.long; i++) {
                        w.push("_ ");
                    }
                    setLetters(w)
                    setWord(w.toString().split(","));
                }
            }
        });
        socket.on("word_letters", (data) => {
                let a = letters
                a[data.pos] = data.letter;
                setLetters(a);
                setWord(a.toString().split(","));

        });
    }, []);

    useEffect(() => {
        console.log(letters);
        console.log(word);
    }, [letters]);

    return (
        <div>
            <p>{word}</p>
        </div>
    );
}

export default WordLength;
