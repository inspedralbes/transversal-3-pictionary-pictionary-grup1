import React, { useState } from 'react';

function WordForm({ socket, answerCorrect }) {
  const [word, setWord] = useState('');

  function handleFormSubmit(e) {
    e.preventDefault();
    if (word.trim() !== "") {
      socket.emit("try_word_attempt", {
        word: word,
      });
    }
  }

  function handleChange(e) {
    setWord(e.target.value);
  }

  if (answerCorrect) {
    return (
      <></>
    )
  } else {
    return (
      <div>
        <form onSubmit={handleFormSubmit}>
          <input type="text" value={word} onChange={handleChange} placeholder="Enter a word" />
          <button type="submit">Check</button>
        </form>
      </div>
    );
  }

}

export default WordForm;
