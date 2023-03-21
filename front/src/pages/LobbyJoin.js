import { useState, useEffect } from "react";
import ConnectedUsers from "../components/ConnectedUsers";
import { useNavigate } from "react-router-dom";
import "../styles/LobbyCreation.css"

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

    function copyId() {
        navigator.clipboard.writeText(lobbyId);
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
    }, [navigate, socket])

    if (!insideLobby) {
        return (
            <div>
                {error !== "" && (<h1 className="error">{error}</h1>)}
                <form onSubmit={handleSubmit}>
                    <label>Enter lobby Identifier
                        <input type="text" value={lobbyId} onChange={handleChange} placeholder="code..." />
                    </label>
                    <button type="submit">Join</button>
                </form>
            </div>

        );
    } else {
        return (
            <div>
                <button className="createGame__leaveButton" onClick={handleLeave}>Leave lobby</button>
                {error !== "" && (<h1 className="error">{error}</h1>)}
                <h1 className="identifier"><span className='span'>I</span><span className='span'>D</span><span className='span'>E</span><span className='span'>N</span><span className='span'>T</span><span className='span'>I</span><span className='span'>F</span><span className='span'>I</span><span className='span'>E</span><span className='span'>R</span>: <span className='span' id="copyId" onClick={copyId} onMouseOver={changeColor}><p>CLICK TO COPY THE ID</p>{lobbyId}</span></h1>
                <ConnectedUsers socket={socket}></ConnectedUsers>
            </div>

        );
    }

}

export default LobbyJoin;