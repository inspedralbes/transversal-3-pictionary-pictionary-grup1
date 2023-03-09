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
const laravelRoute = "http://127.0.0.1:8000/api/";
let wordToCheck = "";
let lobbies = [];

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

  const random_hex_color_code = () => {
    let n = (Math.random() * 0xfffff * 1000000).toString(16);
    return n.slice(0, 6);
  };

  socket.on("new_lobby", () => {
    let existeix = false;
    let newLobbyIdentifier;

    do {
      newLobbyIdentifier = random_hex_color_code();

      lobbies.forEach((element) => {
        if (element.lobbyIdentifier == newLobbyIdentifier) {
          existeix = true;
        }
      });
    } while (existeix);

    if (!existeix) {
      let lobbyData = {
        lobbyIdentifier: newLobbyIdentifier,
        ownerId: socket.data.id,
        members: [],
        currentDrawer: "",
        words: [],
      }
      lobbies.push(lobbyData);
      joinLobby(socket, newLobbyIdentifier)
    }

  });

  socket.on("join_room", (data) => {
    joinLobby(socket, data.lobbyIdentifier)
  });

  socket.on("leave_lobby", (data) => {
    leaveLobby(socket);
    sendUserList(data.lobbyIdentifier);
  });

  socket.on("start_game", (data) => {
    socketIO.to(data.lobbyIdentifier).emit('game_started');
  });

  socket.on("get_game_data", () => {
    setLobbyWord(socket.data.current_lobby);
    enviarPintor(socket.data.current_lobby)
    let data;
    lobbies.forEach(lobby => {
      if (lobby.lobbyIdentifier == socket.data.current_lobby) {
        data = lobby
      }
    });
    socketIO.to(socket.id).emit('game_data', data);
  });

  socket.on('save_coord', (arrayDatos) => {
    boardData = arrayDatos;

    sendBoardData();
  });

  socket.on('give_me_the_board', () => {
    if (boardData != undefined) {
      sendBoardData();
    }
    sendWordToCheck(socket);
  });

  socket.on('try_word_attempt', (data) => {
    if (data.word.toLowerCase() === wordToCheck.toLowerCase()) {
      socketIO.to(socket.id).emit('answer_result', {
        resultsMatch: true,
      })
    } else {
      socketIO.to(socket.id).emit('answer_result', {
        resultsMatch: false,
      })
      socketIO.emit('send_guessed_word', {
        wordGuessed: data.word,
        id: socket.id
      })
    }
  });

  socket.on('disconnect', () => {
    console.log(socket.id + " disconnected " + i);
    leaveLobby(socket);
    for (let index = 0; index < arrI.length; index++) {
      if (arrI[index] === socket.data.id) {
        arrI.splice(index, 1);
        enviarPintor()
      }
    }
  })
});

function setLobbyWord(room) {
  lobbies.forEach((lobby) => {
    if (lobby.lobbyIdentifier == room) {
      axios
        .get(laravelRoute + "getWord")
        .then(function (response) {
          lobby.words.push(response.data.wordToCheck);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  });
}

function leaveLobby(socket) {
  lobbies.forEach((lobby, ind_lobby) => {
    if (lobby.lobbyIdentifier == socket.data.current_lobby) {
      lobby.members.forEach((member, index) => {
        if (member.idUser == socket.data.id) {
          lobby.members.splice(index, 1);
        }
      });
      if (lobby.members.length == 0) {
        lobbies.splice(ind_lobby, 1);
      } else if (lobby.ownerId == socket.data.id) {
        lobbies.splice(ind_lobby, 1);
        socketIO.to(lobby.lobbyIdentifier).emit("lobby_deleted", {
          message: "Lobby has been deleted by the owner"
        })
      }
    }
  });

  socket.leave(socket.data.current_lobby);
  socket.data.current_lobby = null
  socketIO.to(socket.id).emit("YOU_LEFT_LOBBY")
}

function joinLobby(socket, lobbyIdentifier) {
  lobbies.forEach((lobby) => {
    if (lobby.lobbyIdentifier == lobbyIdentifier) {
      var disponible = true;

      lobby.members.forEach(member => {
        if (member.idUser == socket.data.id) {
          disponible = false;
        }
      });

      if (disponible) {
        lobby.members.push({
          // nom: socket.data.name,
          idUser: socket.data.id,
        });

        socketIO.to(socket.id).emit("lobby_info", lobby)
      }
    }
  });
  socket.join(lobbyIdentifier);
  socket.data.current_lobby = lobbyIdentifier;

  sendUserList(lobbyIdentifier);
}

async function sendUserList(room) {
  var list = [];

  const sockets = await socketIO.in(room).fetchSockets();

  sockets.forEach((element) => {
    // console.log(socketIO.sockets.sockets.get(element.id).data.name);
    list.push({
      name: element.data.id,
    });
  });

  socketIO.to(room).emit("lobby_user_list", {
    list: list,
    message: "user list",
  });
}

async function sendBoardData() {
  const sockets = await socketIO.fetchSockets();

  sockets.forEach(user => {
    if (user.data.id != arrI[0]) {
      socketIO.to(user.id).emit("new_board_data", {
        board: boardData
      })
    }
  });
}

function sendWordToCheck(socket = undefined) {
  if (socket != undefined) {
    socketIO.to(socket.id).emit("word_to_check", {
      word: wordToCheck,
    })
  } else {
    socketIO.emit("word_to_check", {
      word: wordToCheck
    })
  }

}

async function enviarPintor(room) {
  const sockets = await socketIO.in(room).fetchSockets();

  lobbies.forEach((element) => {
    if (element.lobbyIdentifier == room) {
      sockets.forEach(user => {
        if (user.data.id == element.members[0].idUser) {
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
  });

}

server.listen(PORT, host, () => {
  console.log("Listening on *:" + PORT);
});
