<<<<<<< HEAD
import { useState, useEffect, useRef } from "react";
import React from "react";
import "../styles/Board.css"
import CanvasDraw from "react-canvas-draw";
import heart from "../img/Heart_corazón.svg.png"
=======
import { useEffect, useRef, useState } from "react";
>>>>>>> develop
import { CirclePicker } from "react-color";
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

  const sendBoardDataToSocketIo = () => {
    const data = { arrayDatos };
    socket.emit("save_coord", data);
  };

<<<<<<< HEAD
  useEffect(() => {
    // const interval = setInterval(() => {
    //   setContador(contador + 1);
    //   console.log(contador);
    //   sendBoardDataToSocketIo();
    // }, 1000);    
    socket.emit("give_me_the_board");
    
    socket.on("pintor", (data) => {
      setPintor(data.pintor);
    });

    socket.on("new_board_data", (data) => {
      if (!pintor) {
        secondCanvas.current.loadSaveData(data.board);
=======
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
>>>>>>> develop
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

      if (arrayRedo.length > 0){
        for (let i = arrayRedo.length; i >= 0; i--) {
  
          if (arrayRedo[i] != "nuevaLinea" && endLine == false) {
            if (typeof arrayRedo[i] !== 'undefined') {
              arrayDatos.push(arrayRedo[i]);
              arrayRedo.splice(i, 1);
            }
          }
          else if (arrayRedo[i] == "nuevaLinea" && endLine == false){
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
        <CountDownTimer socket={socket} />
        <CirclePicker
          style={{ border: "4px solid #000" }}
          color={currentColor}
          onChangeComplete={(color) => setCurrentColor(color.hex)}
        ></CirclePicker>
        <button onClick={clearBoard}>Clear</button>
        <button onClick={eraser}>Eraser</button>

        <input id="brushRadius" type={"range"} min="5" max="50" step={1} value={brushRadius} onChange={(e) => setBrushRadius(e.target.value)} ></input>
        <canvas ref={canvasRef} width={800} height={500} style={{ border: "1px solid black" }} />
      </div>
    );
  }
  else {
    return (
      <div className="Board">
        <CountDownTimer socket={socket} />
        <canvas ref={canvasRef2} width={800} height={500} style={{ border: "1px solid black" }} />
      </div>
    );
  }
  }

export default Board;
