import "../App.css";
import { useState, useEffect } from "react";
import React from "react";

function WordLength({ socket }) {
    const [word, setWord] = useState([]);

    useEffect(() => {
        socket.emit("get_word_length");
        socket.on("current_word_length", (data) => {
            let w = [];
            if (data != undefined) {
                if (data.long != 0) {
                    for (let i = 0; i < data.long; i++) {
                        w.push("_ ");
                    }
                    setWord(w);
                }
            }
        });
        socket.on("word_letters", (data) => {
            if (word != null) {
                let a = word
                a[data.pos] = data.letter;
                setWord(a);
                console.log(word);
            }

        });
    }, []);

    useEffect(() => {
        console.log(word);
    }, [word]);

    return (
        <div>
            <p>{word}</p>
        </div>
    );
}

export default WordLength;
