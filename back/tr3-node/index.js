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

socketIO.on('connection', socket => {
    console.log(socket.id + " connected");

    socket.on('save_coord', (arrayDatos) => {
        boardData = arrayDatos;
        // console.log('board data: ' + boardData);

        socketIO.emit("new_board_data", {
            board: boardData
        })
    });

    socket.on('disconnect', () => {
        console.log(socket.id + " disconnected");
    })
});

server.listen(PORT, host, () => {
    console.log("Listening on *:" + PORT);
});
