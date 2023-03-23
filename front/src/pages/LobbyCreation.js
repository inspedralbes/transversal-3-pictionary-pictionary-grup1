import { useEffect, useState } from "react";
import ConnectedUsers from "../components/ConnectedUsers";
import Settings from "../components/Settings";
import { useNavigate } from "react-router-dom";
<<<<<<< HEAD
import "../styles/lobby.css"
=======
import "../styles/LobbyCreation.css"
>>>>>>> develop

function LobbyCreation({ socket }) {
    const [lobbyId, setLobbyId] = useState("");
    const [firstTime, setFirstTime] = useState(true);
    const [starting, setStarting] = useState(false);
    const [sent, setSent] = useState(false);
    const navigate = useNavigate();

    function handleLeave(e) {
        e.preventDefault();
        //
        socket.emit("leave_lobby");
    }

    function copyId() {
        navigator.clipboard.writeText(lobbyId);
    }

    function handleStartGame(e) {
        e.preventDefault();
        setStarting(true);
    }

    function changeColor() {
        document.getElementById("copyId").addEventListener('mouseover', function () {
            let colors = ["#70a1da", "#70da92", "#cada70", "#858cb7", "#f6a39e", "#ab605c", "#70ab5c", "#ed96f1", "#e05b8c", "#e0ce5b", "#997490", "#9dff4e", "#ffd64e", "#e24eff", "#4ebeff", "#b2b5dc", "#20bf55", "#bf97ff", "#ff9797", "#97e5ff"];
            let color = colors[Math.floor(Math.random() * 21)];
            document.getElementById("copyId").style.color = color;
        });

        document.getElementById("copyId").addEventListener('mouseout', function () {
            document.getElementById("copyId").style.color = '#5c5b5b';
        });
    }

    useEffect(() => {
        if (firstTime) {
            socket.emit("new_lobby");
            setFirstTime(false)
        }

        socket.on("lobby_info", (data) => {
            setLobbyId(data.lobbyIdentifier);
            socket.emit("get_lobby_settings");
        })

        socket.on("starting_errors", (data) => {
            if (data.valid) {
                if (!sent) {
                    console.log("STARTING ERRORS");
                    socket.emit("start_game");
                }
                setSent(true)
            } else {
                setStarting(false);
            }
        })

        socket.on("game_started", () => {
            navigate("/game")
        })

        socket.on("YOU_LEFT_LOBBY", () => {
            navigate("/")
        })
    }, [navigate, socket, firstTime])
    return (
<<<<<<< HEAD
        <div className="lj">
            
            {lobbyId && (
                <h1>Identifier <i class="icon-key"></i>:  {lobbyId}</h1>

            )}
            <ConnectedUsers socket={socket}></ConnectedUsers>
            <div className="lj__Link" >
                <button onClick={handleLeave} className="lj__form__btn">Leave and delete lobby <i class="icon-eject"></i></button>
                <button onClick={handleStartGame} className="lj__form__btn">Start game <i class="icon-play"></i></button>
            </div>    
=======
        <div className="createGame">
            <button className="createGame__leaveButton" onClick={handleLeave}>Leave and delete lobby </button>
            {lobbyId && (
                <h1 className="identifier"><span className='span'>I</span><span className='span'>D</span><span className='span'>E</span><span className='span'>N</span><span className='span'>T</span><span className='span'>I</span><span className='span'>F</span><span className='span'>I</span><span className='span'>E</span><span className='span'>R</span>: <span className='span' id="copyId" onClick={copyId} onMouseOver={changeColor}><p>CLICK TO COPY THE ID</p>{lobbyId}</span></h1>
            )}
            <Settings socket={socket} start={starting}></Settings>
            <ConnectedUsers socket={socket}></ConnectedUsers>
            <div className="createGame__startButtonDiv">
                <button className="createGame__startButton" onClick={handleStartGame}>Start game</button>
            </div>
>>>>>>> develop
        </div>

    );
}

export default LobbyCreation;