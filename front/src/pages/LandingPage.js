import { NavLink, Link } from'react-router-dom';


function LandingPage() {
  
return (
  <div>
    LandingPage

    <Link to='/lobby'><button>Create game</button></Link>
    <Link to='/lobby'><button>Join game</button></Link>

  </div>
);
}

export default LandingPage;
