import { useState, useEffect } from "react";

function Gamemodes({ socket, start }) {
    const [gamemode, setGamemode] = useState("normal");
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setGamemode(e.target.value)
    }

    useEffect(() => {
        if (start) {
            setError("")
            socket.emit("save_gamemode", {
                gamemode: gamemode,
            });
        }
    }, [start])

    return (
        <div>
            {error != "" && (<h1 className="error">{error}</h1>)}
            <form>
                    <legend>Select your desired gamemode:</legend>
                    <label>{"Normal mode"} <input type="radio" value="normal" onChange={handleChange} checked={gamemode == "normal"} /></label><br />
                    <label>{"Fast mode"} <input type="radio" value="fast" onChange={handleChange} checked={gamemode == "fast"} /></label><br />
                    <label>{"Cooperative mode"} <input type="radio" value="coop" onChange={handleChange} checked={gamemode == "coop"} /></label><br />
            </form>
        </div>
    );

}

export default Gamemodes;