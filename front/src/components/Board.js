import { useState, useEffect, useRef } from "react";
import React from "react";
import CanvasDraw from "react-canvas-draw";

//REFERENCIA: https://github.com/embiem/react-canvas-draw

function Board({ socket }) {
  const [contador, setContador] = useState(0);
  const firstCanvas = useRef(null); //Serveix per agafar un component com a referencia
  const secondCanvas = useRef(null);

  const save = () => {
    // const data = firstCanvas.current.getSaveData(); //Dona totes les coordenades utilitzades en el CanvasDraw
    // socket.emit('save_coord', data)
    // console.log(data);
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

    // return () => {
    //   clearInterval(interval);
    // };
  }, [])

  useEffect(() => {
    console.log("hola");
  }, [CanvasDraw]);

  // useEffect(() => {
  //   console.log("hola actualiza cont");
  //   sendBoardDataToSocketIo();
  // }, [contador])

  return (
    <div className="Board">
      <button onClick={save}>Guarda</button>
      <button onClick={clear}>Neteja</button>
      <button onClick={undo}>Desfes</button>
      <CanvasDraw
        brushRadius={5}
        brushColor={"red"}
        hideInterface={true}
        loadTimeOffset={0}
        lazyRadius={5}
        style={{ border: "4px solid #000" }}
        ref={firstCanvas}
        onChange={sendBoardDataToSocketIo}
      />
      <h1>Canvas guardat:</h1>
      <CanvasDraw hideGrid={true} disabled={true} immediateLoading={true} ref={secondCanvas} />
    </div>
  );
}

export default Board;
