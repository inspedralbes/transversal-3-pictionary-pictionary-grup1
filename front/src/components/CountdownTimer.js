import * as React from "react";
import { render } from "react-dom";


function CountdownTimer() {
  const [counter, setCounter] = React.useState(60);
  let timer;

  
  React.useEffect(() => {
    timer = counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
    if (counter === 0) {
      console.log("0 segundos");
    }
    else if (counter === 30){
        console.log("30 segundons");
        //clearTimeout(timer);
        
    }
    
}, [counter]);

  return (
    <div>
      <div className="game__timer">{counter}</div>
    </div>
  );
}
export default CountdownTimer;
