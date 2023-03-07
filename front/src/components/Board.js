import { useState, useEffect, useRef } from "react";
import React from "react";
import "../Board.css"
import CanvasDraw from "react-canvas-draw";
import heart from "../img/Heart_corazón.svg.png"
import { CirclePicker } from "react-color";


//REFERENCIA: https://github.com/embiem/react-canvas-draw

function Board({ socket }) {
  const [contador, setContador] = useState(0);
  const firstCanvas = useRef(null); //Serveix per agafar un component com a referencia
  const secondCanvas = useRef(null);
  //Color picker
  const [currentColor, setCurrentColor] = useState("#fff");
  const [brushRadius, setBrushRadius] = useState(0);


  const handleChangeComplete = (color) => {
    setCurrentColor(color.hex);
  };

  const handleBrushRadius = (e) => {
    console.log(brushRadius);
    // setBrushRadius(radius)
  };

  const clear = () => {
    firstCanvas.current.clear();
  };

  const undo = () => {
    firstCanvas.current.undo();
  };

  const sendBoardDataToSocketIo = () => {
    console.log("Estoy mandando datos");
    const data = firstCanvas.current.getSaveData(); //Dona totes les coordenades utilitzades en el CanvasDraw
    socket.emit('save_coord', data)
  }

  useEffect(() => {
    // const interval = setInterval(() => {
    //   setContador(contador + 1);
    //   console.log(contador);
    //   sendBoardDataToSocketIo();
    // }, 1000);    
    socket.on('new_board_data', (data) => {
      if (data != secondCanvas.current.getSaveData()) {
        console.log("holaaaaa");
        secondCanvas.current.loadSaveData(data.board);
      }
    });
  }, [])

  useEffect(() => {
    console.log("hola");
  }, [CanvasDraw]);

  document.addEventListener('keydown', function(e) {
    if(e.ctrlKey && e.key === 'z') {
      undo();
    }
  })
  return (
    <div className="Board">
      <button onClick={clear}>Neteja</button>
      <button onClick={undo}>Desfes</button>
      <CirclePicker className="CirclePicker" style={{ border: "4px solid #000" }} color={currentColor} onChangeComplete={handleChangeComplete}></CirclePicker>  
      <input id="brushRadius" type={"range"} min="1" max="50" step={0} value={brushRadius} onChange={(e) => setBrushRadius(e.target.value)} ></input>
      <CanvasDraw
        className="Board__draw"
        canvasWidth={700}
        canvasHeight={700}
        brushRadius={brushRadius}
        brushColor={currentColor}
        hideGrid={true}
        hideInterface={true}
        loadTimeOffset={0}
        lazyRadius={1}
        style={{ border: "4px solid #000" }}
        ref={firstCanvas}
        onChange={sendBoardDataToSocketIo}
      />
      <h1>Canvas guardat:</h1>
      <CanvasDraw hideGrid={true} hideInterface={true} canvasWidth={700} canvasHeight={700}disabled={true} immediateLoading={true} ref={secondCanvas} />
    </div>
  );
}

export default Board;
