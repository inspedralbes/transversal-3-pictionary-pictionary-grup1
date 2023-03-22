import { useEffect, useRef, useState } from "react";
import { CirclePicker, SketchPicker } from "react-color";
import "../styles/Board.css";
import React from "react";
import CountDownTimer from "./CountdownTimer";

let arrayDatos = [];
let arrayRedo = [];

function Board({ socket, pintor }) {
  const canvasRef = useRef(null);
  const canvasRef2 = useRef(null);
  const [currentColor, setCurrentColor] = useState("#000");
  const [brushRadius, setBrushRadius] = useState(5);
  let colors = ["black", "#ce0101", "#f7de03", "#5cb351", "#76c1df", "#ffffff"];
  let moreColors = [ '#ffbb00', '#ff8800', '#ff3300', '#333333', '#808080', '#cccccc', '#D33115', '#E27300', '#FCC400', '#B0BC00', '#68BC00', '#16A5A5', '#009CE0', '#7B64FF', '#FA28FF', '#000000', '#666666', '#B3B3B3']


  const sendBoardDataToSocketIo = () => {
    const data = { arrayDatos };
    socket.emit("save_coord", data);
  };

  const undo = (e) => {
    let endLine = false;
    let auxNum = 0;
    if (e.ctrlKey && !e.shiftKey && e.key === "z" && pintor) {
      let i = arrayDatos.length;
      for (i; i >= 0; i--) {
        if (arrayDatos[i] != "nuevaLinea" && endLine == false) {
          if (arrayDatos[i] != null) {
            arrayRedo.push(arrayDatos[i]);
          }
          arrayDatos.splice(i, 1);
        }
        else {
          if (auxNum == 1) {
            endLine = true;
          }
          else {
            arrayDatos.splice(i, 1);
            auxNum++;
          }
        }
      }
      arrayRedo.push("nuevaLinea");


      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");
      context.lineCap = "round";
      context.clearRect(0, 0, canvas.width, canvas.height);
      sendBoardDataToSocketIo();

      context.beginPath();
      if (arrayDatos.length != 0) {
        context.moveTo(arrayDatos[0].x, arrayDatos[0].y);
      } else {
        return
      }

      for (let i = 0; i < arrayDatos.length; i++) {
        if (arrayDatos[i] === "nuevaLinea") {
          context.stroke();
          context.beginPath();
          i++;
        } else {
          context.lineTo(arrayDatos[i].x, arrayDatos[i].y);
          context.lineWidth = arrayDatos[i].brushRadius;
          context.strokeStyle = arrayDatos[i].currentColor;
        }
      }
      context.stroke();
    }
  }

  const redo = (e) => {
    if (e.ctrlKey && e.key === "y" && pintor) {
      let endLine = false;
      let auxNum = 0;

      if (arrayRedo.length > 0) {
        for (let i = arrayRedo.length; i >= 0; i--) {

          if (arrayRedo[i] != "nuevaLinea" && endLine == false) {
            if (typeof arrayRedo[i] !== 'undefined') {
              arrayDatos.push(arrayRedo[i]);
              arrayRedo.splice(i, 1);
            }
          }
          else if (arrayRedo[i] == "nuevaLinea" && endLine == false) {
            if (auxNum == 1) {
              endLine = true;
            }
            else {
              arrayRedo.splice(i, 1);
              auxNum++;
            }

          }
        }
        arrayDatos.push("nuevaLinea");


        arrayRedo.splice(arrayRedo.length, 1);

        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");
        context.clearRect(0, 0, canvas.width, canvas.height);
        sendBoardDataToSocketIo();

        context.beginPath();
        if (arrayDatos.length != 0) {
          context.moveTo(arrayDatos[0].x, arrayDatos[0].y);
        } else {
          return
        }

        for (let i = 1; i < arrayDatos.length; i++) {
          if (arrayDatos[i] === "nuevaLinea") {
            context.stroke();
            context.beginPath();
            i++;
          } else {
            context.lineTo(arrayDatos[i].x, arrayDatos[i].y);
            context.lineWidth = arrayDatos[i].brushRadius;
            context.strokeStyle = arrayDatos[i].currentColor;
          }
        }
        context.stroke();
      }
    }
  }

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
        context.lineCap = "round";
        context.lineJoin = 'round';
        context.strokeStyle = currentColor;
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
      window.addEventListener("keydown", undo);
      window.addEventListener("keydown", redo);


      return () => {
        canvas.removeEventListener("mousedown", handleMouseDown);
        canvas.removeEventListener("mousemove", handleMouseMove);
        canvas.removeEventListener("mouseup", handleMouseUp);
        canvas.removeEventListener("mouseout", handleMouseOut);
        window.removeEventListener("keydown", undo);
        window.removeEventListener("keydown", redo);

      };
    } else {
      socket.on("new_board_data", (data) => {
        const canvas = canvasRef2.current;
        if (!canvas) {
          return;
        }
        const context = canvas.getContext("2d");
        context.lineCap = "round";
        context.lineJoin = 'round';

        if (data.board.arrayDatos.length == 0) {
          const canvas = canvasRef2.current;
          const context = canvas.getContext("2d");

          context.clearRect(0, 0, canvas.width, canvas.height);
        } else {
          context.clearRect(0, 0, canvas.width, canvas.height);
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
          }
          context.stroke();
        }
      });
    }
  }, [pintor, currentColor, brushRadius]);

  if (pintor) {
    return (
      <div className="Board">
        <CirclePicker onChangeComplete={(color) => setCurrentColor(color.hex)} color={currentColor} colors={colors}></CirclePicker>
        <details>
          <summary>More colors</summary>
          <CirclePicker
            colors={moreColors}
            color={currentColor}
            onChangeComplete={(color) => setCurrentColor(color.hex)}
          ></CirclePicker>
        </details>
        <CountDownTimer socket={socket} />

        <button onClick={clearBoard}>Clear</button>
        <button id='eraser' onClick={eraser}>Eraser</button>

        <input id="brushRadius" type={"range"} min="5" max="50" step={1} value={brushRadius} onChange={(e) => setBrushRadius(e.target.value)} ></input>
        <canvas className="Board__draw" ref={canvasRef} width={1000} height={700} style={{ border: "3px solid #575757" }} />
      </div>
    );
  }
  else {
    return (
      <div className="Board">
        <CountDownTimer socket={socket} />
        <canvas className="Board__view" ref={canvasRef2} width={1000} height={700} style={{ border: "3px solid #575757" }} />
      </div>
    );
  }
}

export default Board;
