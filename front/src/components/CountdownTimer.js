import * as React from "react";
import { render } from "react-dom";


function CountdownTimer() {
  const [counter, setCounter] = React.useState(40);
  let timer;

  
  React.useEffect(() => {
    timer = counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
    if (counter === 0) {
      console.log("0 segundos");
    }
    else if (counter === 30){
        console.log("30 segundons");
        
    }
    
}, [counter]);

function CorrectAnswer(){
    clearTimeout(timer);
    console.log("Time :", 40 - counter, "segundos");  
  }

  return (
    <div>
      <div>Countdown: {counter}</div>
      <button onClick={CorrectAnswer}>Correct</button>
    </div>
  );
}

export default CountdownTimer;
