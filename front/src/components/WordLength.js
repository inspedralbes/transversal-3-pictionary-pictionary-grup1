import "../App.css";
import { useState, useEffect } from "react";
import React from "react";

function WordLength({ socket }) {
    const [letters, setLetters] = useState([])

    const updateArray = (array) => {
        setLetters(array);
    }

    useEffect(() => {
        socket.emit("get_word_length");
        socket.on("current_word_length", (data) => {
            let spaces = [];
            if (data !== undefined) {
                if (data.long !== 0) {
                    for (let i = 0; i < data.long; i++) {
                        spaces.push("_ ");
                    }
                    updateArray(spaces);
                }
            }
        });
        socket.on("word_letters", (data) => {
            console.log(letters);
            let a = letters
            a[data.pos] = data.letter;
            //updateArray(a);
        });

        socket.on("clear_word", () => {
            updateArray([]);
        });
    }, [socket]);

    useEffect(() => {
        //console.log(letters);
        //console.log(word);
    }, [letters]);

    return (
        <div>
            <p>{letters}</p>
        </div>
    );
}

export default WordLength;
