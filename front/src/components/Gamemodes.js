import { useState, useEffect } from "react";
import "../styles/LobbyCreation.css";

function Gamemodes({ socket, start }) {
  const [gamemode, setGamemode] = useState("normal");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setGamemode(e.target.value);
  };

  useEffect(() => {
    if (start) {
      setError("");
      socket.emit("save_gamemode", {
        gamemode: gamemode,
      });
    }
  }, [start]);

  return (
    <div>
      {error !== "" && <h1 className="error">{error}</h1>}
      <form className="list__container__text">
        <legend>Select your desired gamemode:</legend>
        <input
          type="radio"
          value="normal"
          id="normal"
          className="check"
          onChange={handleChange}
          checked={gamemode == "normal"}
        />
        <label for="normal" className="list__container__text__label">
          <svg width="300" height="50" viewBox="0 0 500 100">
            <circle
              cx="50"
              cy="50"
              r="40"
              stroke="black"
              stroke-width="3"
              fill="none"
              className="list__container__checkbox"
            />
            <g transform="translate(-10,-962.36218)">
              <path
                d="m 13,983 c 33,6 40,26 55,48 "
                stroke="black"
                stroke-width="3"
                className="path1"
                fill="none"
              />
              <path
                d="M 75,970 C 51,981 34,1014 25,1031 "
                stroke="black"
                stroke-width="3"
                className="path1"
                fill="none"
              />
            </g>
          </svg>
          <span for="normal">Normal mode</span>
        </label>
        <br />
        <input
          type="radio"
          value="fast"
          className="check"
          id="fast"
          onChange={handleChange}
          checked={gamemode == "fast"}
        />
        <label for="fast" className="list__container__text__label">
          <svg width="300" height="50" viewBox="0 0 500 100">
            <circle
              cx="50"
              cy="50"
              r="40"
              stroke="black"
              stroke-width="3"
              fill="none"
              className="list__container__checkbox"
            />
            {/* <rect
              x="0"
              y="15"
              width="50"
              height="50"
              stroke="black"
              fill="none"
              className="list__container__checkbox"
            /> */}
            <g transform="translate(-10,-962.36218)">
              <path
                d="m 13,983 c 33,6 40,26 55,48 "
                stroke="black"
                stroke-width="3"
                className="path1"
                fill="none"
              />
              <path
                d="M 75,970 C 51,981 34,1014 25,1031 "
                stroke="black"
                stroke-width="3"
                className="path1"
                fill="none"
              />
            </g>
          </svg>
          <span for="fast">Fast mode</span>
        </label>
        <br />
        {/* <label>{"Cooperative mode"} <input type="radio" value="coop" onChange={handleChange} checked={gamemode == "coop"} /></label><br /> */}
      </form>
    </div>
  );
}

export default Gamemodes;
