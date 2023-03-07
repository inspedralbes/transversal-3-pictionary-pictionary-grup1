import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import socketIO from "socket.io-client";

const routes = {
  fetchLaravel: "http://localhost:8000/api",
  // fetchNode: "http://localhost:7500",
  wsNode: "ws://localhost:7500",
};

var socket = socketIO(routes.wsNode, {
  withCredentials: true,
  cors: {
    origin: "*",
    credentials: true,
  },
  transports: ["websocket"],
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App socket={socket} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();


export default routes;
