import logo from "./logo.svg";
import "./App.css";
import { useState, useEffect } from "react";
import Board from "./components/Board";

function App(socket) {
  const [cliente, setCliente] = useState("Boton Normal");
  useEffect(() => {
    if (cliente == "Gaspar") {
      console.log("El boton se llama “Gaspar”.");
    }
  }, [cliente]); //Aquí se pone qué estado queremos que detecte el cambio.
  return (
    <div>
      <Board></Board>
    </div>
  );
}

export default App;
