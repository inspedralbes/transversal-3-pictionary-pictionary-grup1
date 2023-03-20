import { Link } from 'react-router-dom';
import "../styles/LandingPage.css"




function LandingPage() {

  return (
    <div>
      <div className="border is-drawn" id="border">
        <div className="space-around">
          <h1 className='ldPage__title'><span className='span'>P</span><span className='span'>I</span><span className='span'>C</span><span className='span'>T</span><span className='span'>I</span><span className='span'>O</span><span className='span'>N</span><span className='span'>A</span><span className='span'>R</span><span className='span'>Y</span></h1>
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