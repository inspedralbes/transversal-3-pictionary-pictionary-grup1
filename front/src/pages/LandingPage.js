import { NavLink, Link } from 'react-router-dom';


function LandingPage() {

  return (
    <div>
      LandingPage

      <Link to='/createlobby'><button>Create game</button></Link>
      <Link to='/joinlobby'><button>Join game</button></Link>

    </div>
  );
}

export default LandingPage;
