import { Link } from 'react-router-dom';
import "../styles/normalize.css";
import "../styles/LandingPage.css";




function LandingPage() {
  function changeColor() {
    document.getElementById("brush").addEventListener('mouseover', function () {
        let colors = ["#70a1da", "#70da92", "#cada70", "#858cb7", "#f6a39e", "#ab605c", "#70ab5c", "#ed96f1", "#e05b8c", "#e0ce5b", "#997490", "#9dff4e", "#ffd64e", "#e24eff", "#4ebeff", "#b2b5dc", "#20bf55", "#bf97ff", "#ff9797", "#97e5ff"];
        let color = colors[Math.floor(Math.random() * 21)];
        document.getElementById("brush").style.color = color;
        document.getElementById("brush").style.transform = 'translate(0px, -10px)';
        ;
    });
    document.getElementById("brush").addEventListener('mouseout', function () {
      document.getElementById("brush").style.color = '#5c5b5b';
      ;
  });

}

  return (
    <div className='ldPage'>
      <div className='ldPage__loginRegister'>
        <a>Log in/Register</a>
      </div>
      <div className="border is-drawn" id="border">
        <div className="space-around">
          <h1 className='ldPage__title'><span className='span'>P</span><span className='span'>I</span><span className='span'>C</span><span className='span'>T</span><span className='span'>I</span><span className='span'>O</span><span className='span'>N</span><span className='span'>A</span><span className='span'>R</span><span className='span'>Y</span> <span id='brush' onMouseOver={changeColor} className='span'><i className="icon-paint-brush"></i></span></h1>
        <div className='ldPage__buttonsContainer'>
          <Link to='/createlobby'><button className='ldPage__button1'>Create game</button></Link>
          <br />
          <Link to='/joinlobby'><button className='ldPage__button2'>Join game</button></Link>
        </div>
      </div>
    </div>
    </div>
);
}

export default LandingPage;