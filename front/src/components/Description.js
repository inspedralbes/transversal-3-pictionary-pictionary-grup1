import "../App.css";
import { useState, useEffect } from "react";
import React from 'react';

function Description({ socket }) {
    const [description, setDescription] = useState("");

    useEffect(() => {
        socket.on('game_data', (data) => {
            fetch('https://api.dictionaryapi.dev/api/v2/entries/en/' + data.words[0].name).then((response) => response.json())
                .then((data) => {
                    try {
                        setDescription(data[0].meanings[0].definitions[0].definition);
                    } catch (error) {
                        setDescription(data.title);
                    }
                    
                });


        });

        return () => {
            socket.off('word_to_check');
        };
    }, []);


    return (
        <>
            <p>{description}</p>
        </>
    )

}

export default Description;
