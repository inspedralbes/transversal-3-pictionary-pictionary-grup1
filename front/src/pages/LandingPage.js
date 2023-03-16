import { Link } from 'react-router-dom';
import "../styles/LandingPage.css"




function LandingPage() {

  return (
    <div>
      <Link to='/login'><button className='ldPage__button2'>Login</button></Link>
      <div className="border is-drawn" id="border">
        <div className="space-around">
          <h1 className='ldPage__title'><span>P</span><span>I</span><span>C</span><span>T</span><span>I</span><span>O</span><span>N</span><span>A</span><span>R</span><span>Y</span></h1>
        <div className='ldPage__buttonsContainer'>
          <Link to='/createlobby'><button className='ldPage__button1'>Create game</button></Link>
          <br />
          <Link to='/joinlobby'><button className='ldPage__button2'>Join game</button></Link>
        </div>
      </div>
    </div>
    </div >
);
}

export default LandingPage;