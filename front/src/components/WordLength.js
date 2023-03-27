import "../App.css";
import { useState, useEffect } from "react";
import React from "react";

function WordLength({ socket }) {
    const [letters, setLetters] = useState([])

    const updateArray = (array) => {
        setLetters(array);
    }

    useEffect(() => {
        socket.on("word_length", (data) => {
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
            let a = [...letters]
            a[data.pos] = data.letterNode;
            updateArray(a)
        });

        // socket.on("clear_word", () => {
        //     updateArray([]);
        // });

        socket.emit("word_length_loaded");
    }, []);

    return (
        <div>
            <p>{letters}</p>
        </div>
    );
}

export default WordLength;
