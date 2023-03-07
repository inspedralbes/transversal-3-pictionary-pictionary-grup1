import { NavLink } from'react-router-dom';
import socketIO from "socket.io-client";
import App from '../App';


const routes = {
    // fetchLaravel: "http://localhost:8000",
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


function Game() {
  
    return (
      <div>
        Game
        <NavLink to='/endGame'><button>End</button></NavLink>

        <App socket={socket} />


      </div>
    
    );
    }
    
    export default Game;
    