import { NavLink } from'react-router-dom';


function Lobby() {
  
    return (
      <div>
        Lobby
        
        <NavLink to='/'><button>Return</button></NavLink>
        <NavLink to='/game'><button>Start</button></NavLink>
      </div>
    
    );
    }
    
    export default Lobby;
    