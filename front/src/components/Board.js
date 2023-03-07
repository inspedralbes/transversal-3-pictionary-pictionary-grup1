import { useState, useEffect, useRef } from "react";
import React from "react";
import CanvasDraw from "react-canvas-draw";

//REFERENCIA: https://github.com/embiem/react-canvas-draw

function Board({ socket }) {
  const [contador, setContador] = useState(0);
  const firstCanvas = useRef(null); //Serveix per agafar un component com a referencia
  const secondCanvas = useRef(null);

  const clear = () => {
    // poner control de si es pintor o no
    firstCanvas.current.clear();
  };

  const undo = () => {
    // poner control de si es pintor o no
    firstCanvas.current.undo();
  };

  const sendBoardDataToSocketIo = () => {
    // poner control de si es pintor o no
    console.log("Estoy mandando datos");
    const data = firstCanvas.current.getSaveData(); //Dona totes les coordenades utilitzades en el CanvasDraw
    socket.emit('save_coord', data)
  }

  useEffect(() => {
    setInterval(() => {
      console.log("holainterval");
    }, 1000);

    socket.emit("give_me_the_board");

    socket.on('new_board_data', (data) => {
      console.log("holaaaaa");
      secondCanvas.current.loadSaveData(data.board);
    });
  }, [])


  document.addEventListener('keydown', function (e) {
    if (e.ctrlKey && e.key === 'z') {
      undo();
    }
  })
  return (
    <div className="Board">
      <button onClick={clear}>Neteja</button>
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
