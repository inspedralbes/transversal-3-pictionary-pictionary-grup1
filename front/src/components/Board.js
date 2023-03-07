import { useState, useEffect, useRef } from "react";
import React from "react";
import CanvasDraw from "react-canvas-draw";
import { CirclePicker } from "react-color";


//REFERENCIA: https://github.com/embiem/react-canvas-draw

function Board() {
  const firstCanvas = useRef(null); //Serveix per agafar un component com a referencia
  const secondCanvas = useRef(null);
  //Color picker
  const [currentColor, setCurrentColor] = useState("#fff");

  const handleChangeComplete = (color) => {
    setCurrentColor(color.hex);
  };


  const save = () => {
    const data = firstCanvas.current.getSaveData(); //Dona totes les coordenades utilitzades en el CanvasDraw
    console.log(data);
    secondCanvas.current.loadSaveData(data);
  };

  const clear = () => {
    firstCanvas.current.clear();
  };

  const undo = () => {
    firstCanvas.current.undo();
  };

  return (
    <div className="Board">
      <button onClick={save}>Guarda</button>
      <button onClick={clear}>Neteja</button>
      <button onClick={undo}>Desfes</button>
      <CirclePicker color={currentColor} onChangeComplete={handleChangeComplete}></CirclePicker>  
      <CanvasDraw
        brushRadius={5}
        brushColor={currentColor}
        hideInterface={true}
        loadTimeOffset={0}
        lazyRadius={5}
        style={{ border: "4px solid #000" }}
        ref={firstCanvas}
      />
      <h1>Canvas guardat:</h1>
      <CanvasDraw hideGrid={true} disabled={true} ref={secondCanvas} />
    </div>
  );
}

export default Board;
