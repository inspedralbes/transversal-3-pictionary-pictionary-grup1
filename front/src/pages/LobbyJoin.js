import { useState, useEffect } from "react";
import ConnectedUsers from "../components/ConnectedUsers";
import { useNavigate } from "react-router-dom";

function LobbyJoin({ socket }) {
    const [lobbyId, setLobbyId] = useState("");
    const [error, setError] = useState("");
    const [insideLobby, setInsideLobby] = useState(false);
    const navigate = useNavigate();

    function handleChange(e) {
        setLobbyId(e.target.value)
    }

    function handleSubmit(e) {
        e.preventDefault();
        socket.emit("join_room", {
            lobbyIdentifier: lobbyId
        })
    }

    function handleLeave(e) {
        e.preventDefault();
        //
        socket.emit("leave_lobby", {
            lobbyIdentifier: lobbyId
        });
    }

    useEffect(() => {
        socket.on("lobby_info", (data) => {
            setInsideLobby(true);
            setError("");
        })

        socket.on("lobby_deleted", (data) => {
            setInsideLobby(false);
            setError(data.message);
            setLobbyId("")
        })

        socket.on("game_started", () => {
            navigate("/game")
        })

        socket.on("YOU_LEFT_LOBBY", () => {
            setInsideLobby(false)
        })
    }, [])

    if (!insideLobby) {
        return (
            <div>
                {error != "" && (<h1 className="error">{error}</h1>)}
                <form onSubmit={handleSubmit}>
                    <input type="text" value={lobbyId} onChange={handleChange} placeholder="Enter lobby identifier" />
                    <button type="submit">Join</button>
                </form>
            </div>
    
        );
    } else {
        return (
            <div>
                <button onClick={handleLeave}>Leave lobby</button>
                {error != "" && (<h1 className="error">{error}</h1>)}
                <h1>Identifier: {lobbyId}</h1>
                <ConnectedUsers socket={socket}></ConnectedUsers>
            </div>
    
        );
    }
    
}

export default LobbyJoin;