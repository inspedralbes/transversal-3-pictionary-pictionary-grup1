import { useEffect, useRef, useState } from "react";
import { CirclePicker } from "react-color";
import "../styles/Board.css";
import React from "react";
import CountDownTimer from "./CountdownTimer";

let arrayDatos = [];

function Board({ socket, pintor }) {
  const canvasRef = useRef(null);
  const canvasRef2 = useRef(null);
  const [currentColor, setCurrentColor] = useState("#000");
  const [brushRadius, setBrushRadius] = useState(1);
  const [limpiarTodo, setLimpiarTodo] = useState(false);


  const sendBoardDataToSocketIo = () => {
    const data = { arrayDatos, limpiar: limpiarTodo };
    socket.emit("save_coord", data);
  };

  const clearBoard = () => {
    if (canvasRef.current != null) {
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");
      context.clearRect(0, 0, canvas.width, canvas.height);
      arrayDatos = [];
      sendBoardDataToSocketIo();
    }
  };

  const eraser = () => {
    setCurrentColor("#FFF");
  }

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
          color={currentColor}
          onChangeComplete={(color) => setCurrentColor(color.hex)}
        ></CirclePicker>
        <button onClick={clearBoard}>Clear</button>
        <button id='eraser' onClick={eraser}>Eraser</button>

        <input id="brushRadius" type={"range"} min="1" max="50" step={1} value={brushRadius} onChange={(e) => setBrushRadius(e.target.value)} ></input>
        <canvas id="board" className="Board__draw" ref={canvasRef} width={800} height={500} style={{ border: "6px solid black" }} />
      </div>
    );
  }
  else {
    return (
      <div className="Board">
        <CountDownTimer socket={socket} />
        <canvas className="Board__view" ref={canvasRef2} width={800} height={500} style={{ border: "6px solid black" }} />
      </div>
    );
  }
}

export default Board;
