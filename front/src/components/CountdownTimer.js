import { useState, useEffect, useRef } from "react";
import { render } from "react-dom";


function CountdownTimer({socket}) {
  const [counter, setCounter] = useState(60);

  useEffect(() => {
    socket.on("counter_down", (data) => {
      console.log("llega el cont");
      setCounter(data.counter);
    })

    socket.on("round_ended", () => {
      setCounter(0);
      console.log("acaba ronda");
    })

    socket.on("game_ended", () => {
      setCounter(777);
      console.log("acaba game");
    })
  }, [])

  return (
    <div>
      <div className="game__timer">{counter}</div>
    </div>
  );
}
export default CountdownTimer;
