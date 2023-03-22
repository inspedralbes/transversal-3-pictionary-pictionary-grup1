import { useState, useEffect } from "react";
import ConnectedUsers from "../components/ConnectedUsers";
import { useNavigate } from "react-router-dom";
import "../styles/LobbyCreation.css"

function LobbyJoin({ socket }) {
    const [lobbyId, setLobbyId] = useState("");
    const [username, setUsername] = useState("");
    const [error, setError] = useState("");
    const [insideLobby, setInsideLobby] = useState(false);
    const [firstTime, setFirstTime] = useState(true);
    const [registeredUsername, setRegisteredUsername] = useState(false);
    const navigate = useNavigate();

    function handleChangeLobbyId(e) {
        setLobbyId(e.target.value)
    }

    function handleChangeUsername(e) {
        setUsername(e.target.value)
    }

    function handleEnableUsername(e) {
        setRegisteredUsername(false);
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (lobbyId != "" && username != "") {
            socket.emit("join_room", {
                lobbyIdentifier: lobbyId,
                username: username,
            })
        } else {
            setError("You need to fill both input fields.")
        }

    }

    function handleLeave(e) {
        e.preventDefault();
        //
        socket.emit("leave_lobby", {
            lobbyIdentifier: lobbyId
        });
    }

    useEffect(() => {
        if (firstTime) {
            socket.emit("get_username")
            setFirstTime(false);
        }

        socket.on("username_saved", (data) => {
            setUsername(data.name);
            setRegisteredUsername(true);
        })

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

        socket.on("USER_ALR_CHOSEN_ERROR", () => {
            setError("The chosen username is already on use")
        })
    }, [navigate, socket])

    if (!insideLobby) {
        return (
            <div>
                {error !== "" && (<h1 className="error">{error}</h1>)}
                <form onSubmit={handleSubmit}>
                    <label>Enter your nickname
                        <input type="text" value={username} onChange={handleChangeUsername} disabled={registeredUsername} placeholder="nickname..." />
                    </label>
                    {registeredUsername && <button onClick={handleEnableUsername}>Change nickname</button>}

                    <br />

                    <label>Enter lobby Identifier
                        <input type="text" value={lobbyId} onChange={handleChangeLobbyId} placeholder="code..." />
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
                <h1 className="identifier"><span>I</span><span>D</span><span>E</span><span>N</span><span>T</span><span>I</span><span>F</span><span>I</span><span>E</span><span>R</span>: {lobbyId}</h1>
                <ConnectedUsers socket={socket}></ConnectedUsers>
            </div>

        );
    }

}

export default LobbyJoin;