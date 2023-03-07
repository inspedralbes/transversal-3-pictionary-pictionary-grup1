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

let boardData = undefined;

let players;
let i=0;
let idDrawer=0;
let arrI=[]

socketIO.on('connection', socket => {
    
    i++
    socket.data.id = i;
    arrI.push(socket.data.id);
    idDrawer= Math.min.apply(Math, arrI)
    console.log(socket.data.id + " connected ");
    
    enviarPintor()

    async function enviarPintor() {
        const sockets = await socketIO.fetchSockets();

        sockets.forEach(user  => {
            if (user.data.id == arrI[0]) {
                socketIO.to(user.id).emit("pintor", {
                    pintor: true
                })
            } else {
                socketIO.to(user.id).emit("pintor", {
                    pintor: false
                })
            }
        });
    }
    
    socket.on('save_coord', (arrayDatos) => {
        boardData = arrayDatos;
        // console.log('board data: ' + boardData);

        socketIO.emit("new_board_data", {
            board: boardData
        })
    });

    socket.on('give_me_the_board', () => {
        if (boardData != undefined) {
            socketIO.emit("new_board_data", {
                board: boardData
            })
        }
    });

    socket.on('disconnect', () => {
        console.log(socket.id + " disconnected "+i );
        for (let index = 0; index < arrI.length; index++) {
            if(arrI[index]===socket.data.id){
                arrI.splice(index, 1);
                enviarPintor()
            }
            
            
        }
    })
});

server.listen(PORT, host, () => {
    console.log("Listening on *:" + PORT);
});
