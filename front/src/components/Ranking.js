import { useState, useEffect, useRef } from "react";
import { render } from "react-dom";
import "../styles/Ranking.css"


function Ranking({ socket }) {
  const [userList, setUserList] = useState([]);
  const [firstTime, setFirstTime] = useState(true);
  const [spectator, setSpectator] = useState(false);

  var items = document.getElementsByClassName("fade-item");

  let aux = items.length - 1;
  for (let i = 0; i < items.length; i++) {
    fadeIn(items[aux], i * 1000)
    aux--;

  }

  function fadeIn(item, delay) {
    setTimeout(() => {
      item.classList.add('fadein')
    }, delay)
  }

  useEffect(() => {
    if (firstTime) {
      socket.emit("lobby_data");
      setFirstTime(false)
    }
    socket.on("lobby_user_list", (data) => {
      data.list.sort((a, b) => b.points - a.points);
      setUserList(data.list);
    });

    socket.on('spectator', (data) => {
      setSpectator(data.spectator);
    });

    socket.on('spectator', (data) => {
      console.log("data", data);
      setSpectator(data.spectator);
    });
  }, [firstTime, socket])

  return (
    <div>
      <h1>Ranking</h1>

      <div id="border" className="ranking__container">
        <div className="topLeadersList fire">
          {userList.map((leader, index) => (
            <div key={leader.id}>
              {index + 1 <= 3 && (
                  <div className="ranking__leader fade-item">
                    <div className="leader__name">{leader.name}</div>
                    <div className="leader__points">{leader.points} points</div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="playerslist fade-item">
          <div className="ranking__listPlayers">
            {userList.map((leader, index) => (
              <div className="player" key={leader.id}>
                <span> {index + 1 > 3 && (
                  <div className="ranking__player">

                    <div>
                      <span>{index}</span>
                      <span className="player__name"> {leader.name} </span>
                      <span className="player__points"> {leader.points} points</span>
                    </div>
                  </div>
                )}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
export default Ranking;
