import { useState, useEffect, useRef } from "react";
import React from "react";
import CanvasDraw from "react-canvas-draw";

//REFERENCIA: https://github.com/embiem/react-canvas-draw

function Board({ socket }) {
  const [contador, setContador] = useState(0);
  const [pintor, setPintor] = useState(false);
  const firstCanvas = useRef(null); //Serveix per agafar un component com a referencia
  const secondCanvas = useRef(null);

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

    socket.on('pintor', (data) => {
      setPintor(data.pintor);
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
  if (pintor) {
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
      </div>
    );
  } else {
    return (
      <div className="Board">
        <CanvasDraw hideGrid={true} disabled={true} immediateLoading={true} ref={secondCanvas} style={{ border: "4px solid #000" }}/>
      </div>
    );
  }
 
}

export default Board;
