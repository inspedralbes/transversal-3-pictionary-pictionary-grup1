import { Link } from 'react-router-dom';
import "../styles/LandingPage.css"


function LandingPage() {

  return (
    <div>
      <h1>Pictionary</h1>

      <Link to='/lobby'><button>Create game</button></Link>
      <Link to='/lobby'><button>Join game</button></Link>

    </div>
  );
}

export default LandingPage;
