import { useEffect, useRef, useState } from "react";
import { CirclePicker } from "react-color";
import "../Board.css";
import React from "react";
import CountDownTimer from "./CountdownTimer";

let arrayDatos = [];

function Board({ socket, pintor }) {
  const canvasRef = useRef(null);
  const canvasRef2 = useRef(null);
  const [currentColor, setCurrentColor] = useState("#000");
  const [brushRadius, setBrushRadius] = useState(0);
  const [limpiarTodo, setLimpiarTodo] = useState(false);

  const sendBoardDataToSocketIo = () => {
    const data = { arrayDatos, limpiar: limpiarTodo };
    socket.emit("save_coord", data);
  };

  const clearBoard = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);
    arrayDatos = [];
    sendBoardDataToSocketIo();
  };

  // const keydown = (e) => {
  //   const canvas = canvasRef.current;
  //   const context = canvas.getContext("2d");
  //   let endLine = false;
  //   let auxNum = 0;

  //   if (e.ctrlKey && e.key === "z" && pintor) {
  //     console.log("Before slice", arrayDatos,);
  //     let i = arrayDatos.length;
  //     for (i; i >= 0; i--) {
  //       if (arrayDatos[i] != "nuevaLinea" && endLine == false) {
  //         console.log("index", i);
  //         arrayDatos.splice(i, 1);
  //       }
  //       else {
  //         if (auxNum == 1) {
  //           endLine = true;
  //         }
  //         else {
  //           arrayDatos.splice(i, 1);
  //           auxNum++;
  //         }
  //         console.log("Nueva linea");
  //       }
  //     }
  //     setAux(arrayDatos);

  //     console.log("After slice", arrayDatos);
  //     setDeshacer(true); 
  //     console.log("After deshacer true: ", arrayDatos);
  //     context.clearRect(0, 0, canvas.width, canvas.height);
  //     context.beginPath();
  //     context.moveTo(arrayDatos[0].x, arrayDatos[0].y);

  //     for (let i = 1; i < arrayDatos.length; i++) {
  //       if (arrayDatos[i] === "nuevaLinea") {
  //         context.stroke();
  //         context.beginPath();
  //         context.moveTo(arrayDatos[i + 1].x, arrayDatos[i + 1].y);
  //         i++;
  //       } else {
  //         context.lineTo(arrayDatos[i].x, arrayDatos[i].y);
  //       }
  //       context.lineWidth = arrayDatos[i].brushRadius;
  //       context.strokeStyle = arrayDatos[i].currentColor;
  //       context.lineCap = "round";
  //     }
  //     context.stroke();  
  //   }
  // }

  useEffect(() => {
    if (limpiarTodo) {
      sendBoardDataToSocketIo();
      setLimpiarTodo(false);
    }
  }, [limpiarTodo]);

  useEffect(() => {
    if (pintor) {
      socket.emit("give_me_the_board");
      const canvas = canvasRef.current;
      if (!canvas) {
        return;
      }
      const context = canvas.getContext("2d");
      let x;
      let y;
      let isDrawing = false;

      function handleMouseDown(evt) {
        isDrawing = true;
        x = evt.offsetX;
        y = evt.offsetY;
      }

      function handleMouseMove(evt) {
        if (!isDrawing) return;
        const newX = evt.offsetX;
        const newY = evt.offsetY;
        context.beginPath();
        context.moveTo(x, y);
        context.lineTo(newX, newY);
        context.strokeStyle = currentColor;
        context.lineCap = "round";
        context.lineWidth = brushRadius;
        context.stroke();
        x = newX;
        y = newY;
        arrayDatos.push({ x, y, currentColor, brushRadius });
        sendBoardDataToSocketIo();
      }

      function handleMouseUp() {
        isDrawing = false;
        arrayDatos.push("nuevaLinea");
      }
      function handleMouseOut() {
        isDrawing = false;
      }

      canvas.addEventListener("mousedown", handleMouseDown);
      canvas.addEventListener("mousemove", handleMouseMove);
      canvas.addEventListener("mouseup", handleMouseUp);
      canvas.addEventListener("mouseout", handleMouseOut);

      return () => {
        canvas.removeEventListener("mousedown", handleMouseDown);
        canvas.removeEventListener("mousemove", handleMouseMove);
        canvas.removeEventListener("mouseup", handleMouseUp);
        canvas.addEventListener("mouseout", handleMouseOut);

      };

    } else {
      socket.on("new_board_data", (data) => {
        const canvas = canvasRef2.current;
        if (!canvas) {
          return;
        }
        const context = canvas.getContext("2d");

        if (data.board.limpiar == true || data.board.arrayDatos.length == 0) {
          const canvas = canvasRef2.current;
          const context = canvas.getContext("2d");
          context.clearRect(0, 0, canvas.width, canvas.height);
        } else {
          context.beginPath();
          context.moveTo(data.board.arrayDatos[0].x, data.board.arrayDatos[0].y);

          for (let i = 1; i < data.board.arrayDatos.length; i++) {
            if (data.board.arrayDatos[i] === "nuevaLinea") {
              context.stroke();
              context.beginPath();
              context.moveTo(data.board.arrayDatos[i + 1].x, data.board.arrayDatos[i + 1].y);
              i++;
            } else {
              context.lineTo(data.board.arrayDatos[i].x, data.board.arrayDatos[i].y);
            }
            context.lineWidth = data.board.arrayDatos[i].brushRadius;
            context.strokeStyle = data.board.arrayDatos[i].currentColor;
            context.lineCap = "round";
          }
          context.stroke();
        }
      });
    }
  }, [pintor, currentColor, brushRadius]);

  if (pintor) {
    return (
      <div className="Board">
        <CountDownTimer socket={socket} />
        {arrayDatos = []}
        <CirclePicker
          style={{ border: "4px solid #000" }}
          color={currentColor}
          onChangeComplete={(color) => setCurrentColor(color.hex)}
        ></CirclePicker>
        <button onClick={clearBoard}>Clear</button>
        <input id="brushRadius" type={"range"} min="1" max="50" step={1} value={brushRadius} onChange={(e) => setBrushRadius(e.target.value)} ></input>
        <canvas ref={canvasRef} width={800} height={500} style={{ border: "1px solid black" }} />
      </div>
    );
  }
  else {
    return (
      <div className="Board">
        <CountDownTimer socket={socket} />

        {sendBoardDataToSocketIo()}
        <canvas ref={canvasRef2} width={800} height={500} style={{ border: "1px solid black" }} />
      </div>
    );
  }
}

export default Board;
