import { useEffect, useState } from "react";
import ConnectedUsers from "../components/ConnectedUsers";
import Settings from "../components/Settings";
import { useNavigate } from "react-router-dom";
import "../styles/LobbyCreation.css";

function LobbyCreation({ socket }) {
  const [categoriesDataLoaded, setCategoriesDataLoaded] = useState(false);
  const [lobbyId, setLobbyId] = useState("");
  const [firstTime, setFirstTime] = useState(true);
  const [starting, setStarting] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function handleLeave(e) {
    e.preventDefault();
    socket.emit("leave_lobby", {
      delete: true,
    });
    navigate("/");
  }

  function copyId() {
    navigator.clipboard.writeText(lobbyId);
  }

  function handleStartGame(e) {
    e.preventDefault();
    setStarting(true);
  }

  function changeColor() {
    document
      .getElementById("copyId")
      .addEventListener("mouseover", function () {
        let colors = [
          "#70a1da",
          "#70da92",
          "#cada70",
          "#858cb7",
          "#f6a39e",
          "#ab605c",
          "#70ab5c",
          "#ed96f1",
          "#e05b8c",
          "#e0ce5b",
          "#997490",
          "#9dff4e",
          "#ffd64e",
          "#e24eff",
          "#4ebeff",
          "#b2b5dc",
          "#20bf55",
          "#bf97ff",
          "#ff9797",
          "#97e5ff",
        ];
        let color = colors[Math.floor(Math.random() * 21)];
        document.getElementById("copyId").style.color = color;
      });

    document.getElementById("copyId").addEventListener("mouseout", function () {
      document.getElementById("copyId").style.color = "#5c5b5b";
    });
  }

  useEffect(() => {
    socket.on("lobby_info", (data) => {
      setLobbyId(data.lobbyIdentifier);
      socket.emit("get_lobby_settings");
    });

    socket.on("starting_errors", (data) => {
      if (data.valid) {
        if (!sent) {
          socket.emit("start_game");
        }
        setSent(true);
      } else {
        setStarting(false);
      }
    });

    socket.on("categories", (data) => {
      setCategoriesDataLoaded(true);
      if (firstTime) {
        socket.emit("new_lobby");
        setFirstTime(false);
      }
    });

    socket.on("game_started", () => {
      setError("");
      navigate("/game");
    });

    socket.on("NOT_ENOUGH_PLAYERS", () => {
      setError("Not enough players to start game");
    });

    socket.on("YOU_LEFT_LOBBY", () => {
      navigate("/");
    });
  }, [navigate, socket, firstTime]);

  //   const tabLinks = document.querySelectorAll(".tab-link");
  //   const tabContents = document.querySelectorAll(".tab-content");

  //   tabLinks.forEach((link) => {
  //     link.addEventListener("click", () => {
  //       const tab = link.dataset.tab;

  //       tabLinks.forEach((link) => {
  //         link.classList.remove("active");
  //       });

  //       tabContents.forEach((content) => {
  //         content.classList.remove("active");
  //       });

  //       link.classList.add("active");
  //       document.getElementById(tab).classList.add("active");
  //     });
  //   });

  function openTab(evt, tabName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].classList.remove("active");
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].classList.remove("active");
    }
    document.getElementById(tabName).classList.add("active");
    evt.currentTarget.classList.add("active");
  }
  return (
    <div className="createGame">
      <button className="createGame__leaveButton" onClick={handleLeave}>
        Leave and delete lobby{" "}
      </button>

      {/* <Settings socket={socket} start={starting}></Settings> */}

      <div class="container">
        <div>
          <ConnectedUsers socket={socket}></ConnectedUsers>
        </div>
        <div class="i7">
          <div class="Identi">
            {lobbyId && (
              <h1 className="identifier">
                <span className="span">I</span>
                <span className="span">D</span>
                <span className="span">E</span>
                <span className="span">N</span>
                <span className="span">T</span>
                <span className="span">I</span>
                <span className="span">F</span>
                <span className="span">I</span>
                <span className="span">E</span>
                <span className="span">R</span>:{" "}
                <span
                  className="span"
                  id="copyId"
                  onClick={copyId}
                  onMouseOver={changeColor}
                >
                  <p>CLICK TO COPY THE ID</p>
                  {lobbyId}
                </span>
              </h1>
            )}
          </div>

          <div class="Setting">
            <section id="main">
              {/* <div class="tabs">
                <button class="tab-link active" data-tab="tab1">
                  Game Mode
                </button>
                <button class="tab-link" data-tab="tab2">
                  Settings
                </button>

                <div id="tab1" class="tab-content active">
                  <p> Game mode</p>
                </div>
                <div id="tab2" class="tab-content">
                  <div>
                    {" "}
                    <Settings socket={socket} start={starting}></Settings>
                  </div>
                </div>
              </div> */}
              <div class="tab">
                <button
                  class="tablinks active"
                  onclick="openTab(event, 'tab1')"
                >
                  Tab 1
                </button>
                <button class="tablinks" onclick="openTab(event, 'tab2')">
                  Tab 2
                </button>
              </div>

              <div id="tab1" class="tabcontent active">
                <h3>Tab 1</h3>
                <p>Contenido de la pestaña 1.</p>
              </div>

              <div id="tab2" class="tabcontent">
                <h3>Tab 2</h3>
                <p>Contenido de la pestaña 2.</p>
              </div>
            </section>
            <div className="createGame__startButtonDiv">
              <button
                className="createGame__startButton"
                onClick={handleStartGame}
              >
                Start game
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LobbyCreation;
