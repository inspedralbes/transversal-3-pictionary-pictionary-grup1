const express = require('express');
const cors = require("cors");
const sessions = require("express-session");
var cookieParser = require("cookie-parser");
const app = express();
const http = require('http');
const server = http.createServer(app);
const PORT = 7500;
const host = '0.0.0.0';
const axios = require("axios");

const socketIO = require("socket.io")(server, {
    cors: {
        origin: true,
        credentials: true,
    },
});

// ================= SAVE TOKEN AS COOKIE ================
app.use(cookieParser());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", true);
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, authorization"
  );
  res.header("Access-Control-Allow-Methods", "GET,POST,DELETE,PUT,OPTIONS");
  next();
});
app.use(
  sessions({
    key: "session.sid",
    secret: "soy secreto",
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false,
      maxAge: 600000,
    },
  })
);

app.use(express.json());

app.use(
  cors({
    credentials: true,
    origin: function (origin, callback) {
      console.log(origin);
      return callback(null, true);
    },
  })
);

let boardData = undefined;

let players;
let i = 0;
let idDrawer = 0;
let arrI = []
const laravelRoute = "http://localhost:8000/api/";
let wordToCheck = "";

// ------------------------------------------------------------------

socketIO.on('connection', socket => {

    i++
    socket.data.id = i;
    arrI.push(socket.data.id);
    idDrawer = Math.min.apply(Math, arrI)
    console.log(socket.data.id + " connected ");

    if (i == 1) {
        axios
      .get(laravelRoute + "getWord")
      .then(function (response) {
        wordToCheck = response.data.wordToCheck;
        sendWordToCheck()
      })
      .catch(function (error) {
        console.log(error);
      });
    }

    enviarPintor()

    socket.on('save_coord', (arrayDatos) => {
        boardData = arrayDatos;

        sendBoardData();
    });

    socket.on('give_me_the_board', () => {
        if (boardData != undefined) {
            sendBoardData();
        }
        sendWordToCheck();
    });

    socket.on('disconnect', () => {
        console.log(socket.id + " disconnected " + i);
        for (let index = 0; index < arrI.length; index++) {
            if (arrI[index] === socket.data.id) {
                arrI.splice(index, 1);
                enviarPintor()
            }
        }
    })
});

function sendBoardData() {
    socketIO.emit("new_board_data", {
        board: boardData
    })
}

function sendWordToCheck() {
    console.log(wordToCheck);
    socketIO.emit("word_to_check", {
        word: wordToCheck
    })
}

async function enviarPintor() {
    const sockets = await socketIO.fetchSockets();

    sockets.forEach(user => {
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

server.listen(PORT, host, () => {
    console.log("Listening on *:" + PORT);
});
