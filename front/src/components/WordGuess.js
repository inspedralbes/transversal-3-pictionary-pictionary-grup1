import "../App.css";
import { useState, useEffect } from "react";
import React from 'react';

function WordGuess({ socket }) {
    const [wordToCheck, setWordToCheck] = useState("");

    useEffect(() => {
        socket.emit('get_game_data');
        
        socket.on('game_data', (data) => {
            console.log(data);
            if (data.words != undefined) {
                setWordToCheck(data.words[0].name);
            }
        });
        
        socket.on('current_word', (data) => {
            if (data != undefined) {
                setWordToCheck(data.word.name);
            }
        });

        return () => {
            socket.off('word_to_check');
        };
    }, []);


    return (
        <>
            <p>{wordToCheck}</p>
        </>
    )

}

export default WordGuess;