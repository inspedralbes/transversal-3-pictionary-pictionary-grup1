import { useState, useEffect } from "react";
import ConnectedUsers from "../components/ConnectedUsers";
import { useNavigate } from "react-router-dom";
<<<<<<< HEAD
import "../styles/lobby.css"
=======
import "../styles/LobbyCreation.css"
>>>>>>> develop

function LobbyJoin({ socket }) {
    const [lobbyId, setLobbyId] = useState("");
    const [username, setUsername] = useState("");
    const [error, setError] = useState("");
    const [insideLobby, setInsideLobby] = useState(false);
    const navigate = useNavigate();

    function handleChangeLobbyId(e) {
        setLobbyId(e.target.value)
    }

    function handleChangeUsername(e) {
        setUsername(e.target.value)
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
<<<<<<< HEAD
            <div className="lj">
                {error != "" && (<h1 className="error">{error}</h1>)}
                <form onSubmit={handleSubmit} className='lj__form'>
                    <input type="text" value={lobbyId} onChange={handleChange} className='lj__form__input' placeholder="Enter lobby identifier" />
                    <button type="submit" className='lj__form__btn'>Join</button>
=======
            <div>
                {error !== "" && (<h1 className="error">{error}</h1>)}
                <form onSubmit={handleSubmit}>
                    <label>Enter your nickname
                        <input type="text" value={username} onChange={handleChangeUsername} placeholder="nickname..." />
                    </label>

                    <br />

                    <label>Enter lobby Identifier
                        <input type="text" value={lobbyId} onChange={handleChangeLobbyId} placeholder="code..." />
                    </label>

                    <button type="submit">Join</button>
>>>>>>> develop
                </form>
            </div>

        );
    } else {
        return (
<<<<<<< HEAD
            <div className="lj">
                <button onClick={handleLeave}>Leave lobby</button>
                {error != "" && (<h1 className="error">{error}</h1>)}
                <h1>Identifier: {lobbyId}</h1>
=======
            <div>
                <button className="createGame__leaveButton" onClick={handleLeave}>Leave lobby</button>
                {error !== "" && (<h1 className="error">{error}</h1>)}
                <h1 className="identifier"><span>I</span><span>D</span><span>E</span><span>N</span><span>T</span><span>I</span><span>F</span><span>I</span><span>E</span><span>R</span>: {lobbyId}</h1>
>>>>>>> develop
                <ConnectedUsers socket={socket}></ConnectedUsers>
            </div>

        );
    }

}

export default LobbyJoin;