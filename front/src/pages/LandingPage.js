import { Link } from 'react-router-dom';
import "../styles/LandingPage.css"


function LandingPage() {
  
return (
  <div className='ldPage' >
    <button className='ldPage__loginButton'>Login</button>

    <h1 className='ldPage__title'>Pintur.io</h1>
    
    <div className='ldPage__buttonsContainer'>
      <Link to='/createlobby'><button className='ldPage__buttons cartoon-btn'>Create game</button></Link>
      <Link to='/joinlobby'><button className='ldPage__buttons cartoon-btn'>Join game
      </button></Link>
    </div>
  </div>
);
}

export default LandingPage;
