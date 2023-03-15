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

    function handleStartGame(e) {
        e.preventDefault();
        //
        socket.emit("start_game", {
            lobbyIdentifier: lobbyId
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
    }, [])
    return (
        <div className="createGame">
            <button className="createGame__leaveButton" onClick={handleLeave}>Leave and delete lobby</button>
            {lobbyId && (
                <h1 className="identifier"><span>I</span><span>D</span><span>E</span><span>N</span><span>T</span><span>I</span><span>F</span><span>I</span><span>E</span><span>R</span>: {lobbyId}</h1>
            )}
            <ConnectedUsers socket={socket}></ConnectedUsers>
            <div className="createGame__startButtonDiv">
                <button className="createGame__startButton" onClick={handleStartGame}>Start game</button>
            </div>
        </div>

    );
}

export default LobbyCreation;