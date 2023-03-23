import { NavLink } from 'react-router-dom';
import Ranking from '../components/Ranking';
import { useState, useEffect } from "react";




function EndGame({ socket }) {
  const [owner, setOwner] = useState(false);
  const [firstTime, setFirstTime] = useState(true);

  function onClick() {
    socket.emit("use_same_seed");
  }
  useEffect(() => {

    if (firstTime) {
      socket.emit("get_owner");
      setFirstTime(false)
    }
    socket.on('is_owner', (data) => {
      setOwner(true);
      console.log("Lobby data", data);
    });

  }, []);
  return (
    <div>
      <>
        {owner ? (
          <div>
            <NavLink to='/createlobby'><button onClick={onClick}>Go to lobby</button></NavLink>
            <NavLink to='/'><button>Go to main page</button></NavLink>
          </div>
        ) : (
          <NavLink to='/'><button>Go to main page</button></NavLink>
        )}
      </>

      <Ranking socket={socket}></Ranking>
    </div>

  );
}

export default EndGame;
