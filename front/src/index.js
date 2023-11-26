import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Register from './pages/Register';
import Game from './pages/Game';
import LobbyCreation from './pages/LobbyCreation';
import LobbyJoin from './pages/LobbyJoin';
import EndGame from './pages/EndGame';
import Categories from './pages/Categories';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import socketIO from "socket.io-client";

const routes = {
  fetchLaravel: "https://g1.pictionary-api.dam.inspedralbes.cat/index.php/",
  wsNode: "wss://g1.pictionary.dam.inspedralbes.cat/",
};


var socket = socketIO(routes.wsNode, {
  withCredentials: true,
  cors: {
    origin: "*",
    credentials: true,
  },
  path: "/node/",
  transports: ["websocket"],
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <BrowserRouter>
    <Routes>
      <Route path='/'>
        <Route index element={<LandingPage socket={socket} />} />
        <Route path="/login" element={<Login socket={socket} />} />
        <Route path="/register" element={<Register socket={socket} />} />
        <Route path="/game" element={<Game socket={socket} />} />
        <Route path="/createlobby" element={<LobbyCreation socket={socket} />} />
        <Route path="/joinlobby" element={<LobbyJoin socket={socket} />} />
        <Route path="/endGame" element={<EndGame socket={socket} />} />
        <Route path="/categories" element={<Categories />} />
      </Route>
    </Routes>
  </BrowserRouter>

  // {/* </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();


export default routes;
