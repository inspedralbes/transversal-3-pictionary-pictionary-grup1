import { useEffect, useRef, useState } from "react";
import { CirclePicker } from "react-color";
import "../Board.css";
import React from "react";

function Board({ socket, pintor }) {
  const canvasRef = useRef(null);
  const canvasRef2 = useRef(null);
  const [currentColor, setCurrentColor] = useState("#000");
  const [brushRadius, setBrushRadius] = useState(0);
  const arrayDatos = [];

  const sendBoardDataToSocketIo = () => {
    const data = {arrayDatos, color: currentColor, radius: brushRadius };
    console.log(data);
    socket.emit("save_coord", data);
  };

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
        arrayDatos.push({ x, y });
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
        console.log(data);
        if (!canvas) {
          return;
        }
        const context = canvas.getContext("2d");
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
        }
        context.strokeStyle = data.board.color;
        context.lineCap = "round";
        context.lineWidth = data.board.radius;
        context.stroke();
      });
    }
  }, [pintor, currentColor, brushRadius]);

  if (pintor) {
    return (
      <div className="Board">
        <CirclePicker
          style={{ border: "4px solid #000" }}
          color={currentColor}
          onChangeComplete={(color) => setCurrentColor(color.hex)}
        ></CirclePicker>
        <input id="brushRadius" type={"range"} min="1" max="50" step={1} value={brushRadius} onChange={(e) => setBrushRadius(e.target.value)} ></input>
        <canvas ref={canvasRef} width={800} height={500} style={{ border: "1px solid black" }} />
      </div>
    );
  }
  else {
    return (
      <div className="Board">
        <canvas ref={canvasRef2} width={800} height={500} style={{ border: "1px solid black" }} />
      </div>
    );
  }
}

export default Board;