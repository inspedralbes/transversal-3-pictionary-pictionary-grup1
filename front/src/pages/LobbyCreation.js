import { useEffect, useState } from "react";
import ConnectedUsers from "../components/ConnectedUsers";
import { useNavigate } from "react-router-dom";
import "../styles/lobby.css"

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
        <div className="lj">
            
            {lobbyId && (
                <h1>Identifier <i class="icon-key"></i>:  {lobbyId}</h1>

            )}
            <ConnectedUsers socket={socket}></ConnectedUsers>
            <div className="lj__Link" >
                <button onClick={handleLeave} className="lj__form__btn">Leave and delete lobby <i class="icon-eject"></i></button>
                <button onClick={handleStartGame} className="lj__form__btn">Start game <i class="icon-play"></i></button>
            </div>    
        </div>

    );
}

export default LobbyCreation;