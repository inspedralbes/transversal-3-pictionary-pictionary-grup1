import { useState, useEffect } from "react";

function Settings({ socket }) {
    const [roundDuration, setRoundDuration] = useState("");
    const [ownerPlay, setOwnerPlay] = useState("");
    const [error, setError] = useState("");

    function handleFormSubmit(e) {
        e.preventDefault();

        setError("")
        socket.emit("save_settings", {
            roundDuration: roundDuration,
            ownerPlay: ownerPlay
        });
    }

    function handleChangeOwnerPlay(e) {
        setOwnerPlay(e.target.value);
    }

    function handleChangeRoundDuration(e) {
        setRoundDuration(e.target.value);
    }

    useEffect(() => {
        socket.on("lobby_settings", (data) => {
            setRoundDuration(data.roundDuration)
        })

        socket.on("ROUND_TIME_UNDER_MIN", (data) => {
            setError(`Round duration was too low -> Minimum: ${data.min}`)
        })

        socket.on("ROUND_TIME_ABOVE_MAX", (data) => {
            setError(`Round duration was too high -> Maximum: ${data.max}`)
        })

        socket.on("INVALID_SETTINGS", () => {
            setError(`Can't start the game with invalid settings`)
        })
    }, [])

    return (
        <div>
            {error != "" && (<h1 className="error">{error}</h1>)}
            <form onSubmit={handleFormSubmit}>
                <label>{"Round duration (seconds)"} <input type="number" value={roundDuration} onChange={handleChangeRoundDuration} /></label><br />
                <label>{"Will the lobby creator play? "} <input type="checkbox" value={ownerPlay} onChange={handleChangeOwnerPlay} /></label><br />
                <button type="submit">Save settings</button>
            </form>
        </div>
    );

}

export default Settings;