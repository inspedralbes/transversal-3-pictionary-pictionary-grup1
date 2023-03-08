import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import App from '../App';

function Game({ socket }) {

  useEffect(() => {

  }, [])

  return (
    <div>
      Game
      {/* <NavLink to='/endGame'><button>End</button></NavLink> */}

      <App socket={socket} />
    </div>
  );
}

export default Game;
