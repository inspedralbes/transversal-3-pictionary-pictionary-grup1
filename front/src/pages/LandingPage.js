import { Link } from 'react-router-dom';
import "../styles/LandingPage.css"


function LandingPage() {

  return (
    <div>
      <h1>Pictionary</h1>
      <Link to='/createlobby'><button>Create game</button></Link>
      <Link to='/joinlobby'><button>Join game</button></Link>
    </div>
  );
}

export default LandingPage;
