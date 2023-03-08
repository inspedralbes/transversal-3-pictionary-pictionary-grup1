import { useState, useEffect, useRef } from "react";
import React from "react";
import CanvasDraw from "react-canvas-draw";
import { CirclePicker } from "react-color";

//REFERENCIA: https://github.com/embiem/react-canvas-draw

function Board({ socket }) {
  const [pintor, setPintor] = useState(false);
  const firstCanvas = useRef(null); //Serveix per agafar un component com a referencia
  const secondCanvas = useRef(null);
  //Color picker
  const [currentColor, setCurrentColor] = useState("#000");

  const clear = () => {
    // poner control de si es pintor o no
    firstCanvas.current.clear();
    sendBoardDataToSocketIo();
  };

  const sendBoardDataToSocketIo = () => {
    // poner control de si es pintor o no
    //console.log("Estoy mandando datos");
    const data = firstCanvas.current.getSaveData(); //Dona totes les coordenades utilitzades en el CanvasDraw
    socket.emit("save_coord", data);
  };

  useEffect(() => {
    socket.emit("give_me_the_board");

    socket.on("new_board_data", (data) => {
      if (!pintor) {
        secondCanvas.current.loadSaveData(data.board);
      }
    });

    socket.on("pintor", (data) => {
      setPintor(data.pintor);
    });
  }, []);

  const keydown = (e) => {
    if (e.ctrlKey && e.key === "z" && pintor) {
        
      firstCanvas.current.undo();
      sendBoardDataToSocketIo();
    }
  }

  useEffect(() => {
    window.addEventListener("keydown", keydown);
    return () => {
      window.removeEventListener("keydown", keydown);
    }
  });

  if (pintor) {
    return (
      <div className="Board">
        <button onClick={clear}>Clear</button>
        <CirclePicker
          style={{ border: "4px solid #000" }}
          color={currentColor}
          onChangeComplete={(color) => setCurrentColor(color.hex)}
        ></CirclePicker>
        <CanvasDraw
          brushRadius={5}
          brushColor={currentColor}
          hideInterface={true}
          loadTimeOffset={0}
          lazyRadius={5}
          style={{ border: "4px solid #000" }}
          ref={firstCanvas}
          onChange={sendBoardDataToSocketIo}
        />
      </div>
    );
  } else {
    return (
      <div className="Board">
        <CanvasDraw
          hideGrid={true}
          disabled={true}
          immediateLoading={true}
          ref={secondCanvas}
          style={{ border: "4px solid #000" }}
        />
      </div>
    );
  }
}

export default Board;
