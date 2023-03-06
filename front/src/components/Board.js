// import logo from './logo.svg';
// import './App.css';
import { useState, useEffect } from 'react';


function Board(socket) {
  useEffect(() => {
    var canvas = document.getElementById("myCanvas");
    var context = canvas.getContext("2d");
    var arrayDatos = [];
    let x;
    let y;
    let isMousedown = false;

    const stopDrawing = () => { isMousedown = false; }

    canvas.addEventListener("mousemove", function (evt) {
      arrayDatos.push(x, y);
      socket.emit("saveCoord", arrayDatos);
      arrayDatos = [];
      console.log(arrayDatos);
      function update() {
        if (isMousedown) {
          const newX = evt.offsetX;
          const newY = evt.offsetY;

          console.log(newX);

          context.beginPath();

          context.moveTo(x, y);
          context.lineTo(newX, newY)
          context.stroke();
          x = newX;
          y = newY;
        }
      }
      update();
    }, false);


    //Get Mouse Position
    canvas.addEventListener("mousedown", function (evt) {
      x = evt.offsetX;
      y = evt.offsetY;
      isMousedown = true;
    })

    canvas.addEventListener("mouseup", stopDrawing);
    canvas.addEventListener("mouseout", stopDrawing);
  }, []);

  return (
    <div className="Board">
      <canvas id="myCanvas" width="800" height="500" style="border:1px solid #000000;"></canvas>

    </div>
  );
};




export default Board;
