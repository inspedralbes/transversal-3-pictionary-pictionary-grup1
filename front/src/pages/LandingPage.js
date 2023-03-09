import { Link } from 'react-router-dom';
import "../styles/LandingPage.css"


function LandingPage() {
<<<<<<< HEAD

  return (
    <div>
      <h1>Pictionary</h1>
      <Link to='/createlobby'><button>Create game</button></Link>
      <Link to='/joinlobby'><button>Join game</button></Link>
    </div>
  );
=======
  
return (
  <div>
    <button className='ldPage__loginButton'>Login</button>

    <h1 className='ldPage__title'>Gartic Pintur.io</h1>
    
    <div className='ldPage__buttonsContainer'>
      <Link to='/lobby'><button className='ldPage__buttons'>Create game</button></Link>
    </div>
    <div className='ldPage__buttonsContainer'>
      <Link to='/lobby'><button className='ldPage__buttons'>Join game</button></Link>
    </div>
  </div>
);
>>>>>>> origin/screenFlow
}

export default LandingPage;
