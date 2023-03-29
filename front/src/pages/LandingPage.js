import { Link } from "react-router-dom";
import Cookies from 'universal-cookie';
import "../styles/normalize.css";
import "../styles/LandingPage.css";
import { useEffect, useState } from "react";
import routes from "../index";


function LandingPage({ socket }) {
  const [isLogged, setisLogged] = useState(false);
  const [menuBarClass, setMenuBarClass] = useState(false);
  const [menuBgClass, setMenuBgClass] = useState(false);
  const [navClass, setNavClass] = useState(false);
  const [displayMenu, setdisplayMenu] = useState(false);



  const cookies = new Cookies();

  function enviarGetCategories() {
    socket.emit("get_categories");
  }
  function Logout() {
    const user = new FormData()
    user.append("token", cookies.get('token') !== undefined ? cookies.get('token') : null);

    fetch(routes.fetchLaravel + "logout", {
      method: "POST",
      mode: "cors",
      body: user,
      credentials: "include",
    })
      .then((response) => response.json())
      .then(() => {
        setisLogged(false);
      });

      cookies.remove('token');  
    }

  function menuOnClick() {
    setMenuBarClass(!menuBarClass);
    setMenuBgClass(!menuBgClass);
    setNavClass(!navClass);
  }

  async function DoFetch() {
    const user = new FormData()
    user.append("token", cookies.get('token') !== undefined ? cookies.get('token') : null);

    const response = await fetch(routes.fetchLaravel + "isUserLogged", {
      method: "POST",
      mode: "cors",
      body: user,
      credentials: "include",
    });

    const data = await response.json();
    setdisplayMenu(true);
    if (data) {
        setisLogged(true);
    }
    else {
      setisLogged(false);
    }
  }

  useEffect(() => {
    DoFetch();
  }, [])

  return (

    <div className="ldPage">
      {displayMenu ? 
      <>
         {isLogged ?
          <div>
            <div id="menu">
              <div id="menu-bar" className={`menu-bar${menuBarClass ? " change" : ""}`} onClick={menuOnClick}>
                <div id="bar1" className="bar"></div>
                <div id="bar2" className="bar"></div>
                <div id="bar3" className="bar"></div>
              </div>
              <nav className={`nav${navClass ? " change" : ""}`} id="nav">
                <ol>
                  <li><Link to="/categories">Categories</Link></li>
                  <li onClick={Logout}><Link to="/">Logout</Link></li>
                </ol>
              </nav>
            </div>
  
            <div className={`menu-bg${menuBgClass ? " change-bg" : ""}`} id="menu-bg"></div>
          </div>
          :
          <div>
            <Link to="/login">
              <div className="ldPage__loginRegister">
                <>Log in/Register</>
              </div>
            </Link>
          </div>
          }
          
        </>
        : 
        <>
        </>
    } 
      <div className="border is-drawn" id="border">
        <div className="space-around">
          <h1 className="ldPage__title">
            <span className="span">P</span>
            <span className="span">I</span>
            <span className="span">C</span>
            <span className="span">T</span>
            <span className="span">I</span>
            <span className="span">O</span>
            <span className="span">N</span>
            <span className="span">A</span>
            <span className="span">R</span>
            <span className="span">Y</span>
          </h1>
          <div className="ldPage__buttonsContainer">
            <Link to="/createlobby" tabIndex="-1" onClick={enviarGetCategories}>
              <button className="ldPage__button1">Create game</button>
            </Link>
            <br />
            <Link to="/joinlobby" tabIndex="-1">
              <button className="ldPage__button2">Join game</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
