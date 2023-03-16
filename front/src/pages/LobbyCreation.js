import { useEffect, useState } from "react";
import ConnectedUsers from "../components/ConnectedUsers";
import { useNavigate } from "react-router-dom";
import "../styles/LobbyCreation.css"

function LobbyCreation({ socket }) {
    const [lobbyId, setLobbyId] = useState("");
    const [firstTime, setFirstTime] = useState(true);
    const navigate = useNavigate();

    function handleLeave(e) {
        e.preventDefault();
        //
        socket.emit("leave_lobby", {
            lobbyIdentifier: lobbyId
        });
    }

    function copyId() {
        navigator.clipboard.writeText(lobbyId);
    }

    function handleStartGame(e) {
        e.preventDefault();
        //
        socket.emit("start_game", {
            lobbyIdentifier: lobbyId
        });
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
        })

        socket.on("game_started", () => {
            navigate("/game")
        })

        socket.on("YOU_LEFT_LOBBY", () => {
            navigate("/")
        })
    }, [navigate, socket, firstTime])
    return (
        <div className="createGame">
            <button className="createGame__leaveButton" onClick={handleLeave}>Leave and delete lobby</button>
            {lobbyId && (
                <h1 className="identifier"><span>I</span><span>D</span><span>E</span><span>N</span><span>T</span><span>I</span><span>F</span><span>I</span><span>E</span><span>R</span>: <span id="copyId" onClick={copyId} onMouseOver={changeColor}><p>CLICK TO COPY THE ID</p>{lobbyId}</span></h1>
            )}
            <ConnectedUsers socket={socket}></ConnectedUsers>
            <div className="createGame__startButtonDiv">
                <button className="createGame__startButton" onClick={handleStartGame}>Start game  <i class="icon-paint-brush"></i></button>
            </div>
        </div>

    );
}

export default LobbyCreation;