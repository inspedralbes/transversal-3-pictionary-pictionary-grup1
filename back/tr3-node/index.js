const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const PORT = 7500;
const host = '0.0.0.0';

const socketIO = require("socket.io")(server, {
    cors: {
        origin: true,
        credentials: true,
    },
});

let boardData;
let i=0;
let arrI=[]

socketIO.on('connection', socket => {
    
    i++
    // arrI.push(i);
    socket.data.id = i;
    console.log(socket.data.id + " connected ");

    if (socket.data.id == 1) {
        socketIO.to(socket.id).emit("pintor", {
            pintor: true
        })
    } else {
        socketIO.to(socket.id).emit("pintor", {
            pintor: false
        })
    }
    

    socket.on('save_coord', (arrayDatos) => {
        boardData = arrayDatos;
        // console.log('board data: ' + boardData);

        socketIO.emit("new_board_data", {
            board: boardData
        })
    });

    socket.on('disconnect', () => {
        console.log(socket.id + " disconnected "+i );
    })
});

server.listen(PORT, host, () => {
    console.log("Listening on *:" + PORT);
});
