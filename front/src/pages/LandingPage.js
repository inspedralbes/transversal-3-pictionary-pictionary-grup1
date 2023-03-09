import { Link } from 'react-router-dom';
import "../styles/LandingPage.css"


function LandingPage() {
  
return (
  <div>
    <button className='ldPage__loginButton'>Login</button>

    <h1 className='ldPage__title'>Gartic Pintur.io</h1>
    
    <div className='ldPage__buttonsContainer'>
      <Link to='/createlobby'><button className='ldPage__buttons'>Create game</button></Link>
    </div>
    <div className='ldPage__buttonsContainer'>
      <Link to='/joinlobby'><button className='ldPage__buttons'>Join game</button></Link>
    </div>
  </div>
);
}

export default LandingPage;