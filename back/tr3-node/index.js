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

socketIO.on('connection', socket => {
    console.log(socket.id + " connected");

    socket.on('saveCoord', (arrayDatos) => {
        socket.coordenadas = arrayDatos;
        console.log('Datos usuari: ' + socket.coordenadas);
    });

    socket.on('disconnect', () => {
        console.log(socket.id + " disconnected");
    })
});

server.listen(PORT, host, () => {
    console.log("Listening on *:" + PORT);
});
