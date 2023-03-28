import { useState, useEffect, useRef } from "react";
import { render } from "react-dom";
import "../styles/Ranking.css"

const users = [
  {
    name: "Alumno 1",
    points: 120,
    avatar: " https://api.dicebear.com/6.x/bottts/svg?seed=Boo"

  },
  {
    name: "Alumno 2",
    points: 120,
    avatar: " https://api.dicebear.com/6.x/bottts/svg?seed=Boo"

  },
  {
    name: "Alumno 3",
    points: 120,
    avatar: " https://api.dicebear.com/6.x/bottts/svg?seed=Boo"

  },
  {
    name: "Alumno 4",
    points: 120,
    avatar: " https://api.dicebear.com/6.x/bottts/svg?seed=Boo"

  },
  {
    name: "Alumno 5",
    points: 120,
    avatar: " https://api.dicebear.com/6.x/bottts/svg?seed=Boo"

  },
]
function Ranking({ socket }) {
  const [userList, setUserList] = useState(users);
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
      console.log("avatar rank", data.list);

      data.list.sort((a, b) => b.points - a.points);
      setUserList(data.list);
    });

    socket.on("spectator", (data) => {
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
                  <div className="leader__data">
                    <div className="crown">
                      <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-crown" width="100" height="100" viewBox="0 0 24 24" stroke-width="3" stroke="#ffec00" fill="gold" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M12 6l4 6l5 -4l-2 10h-14l-2 -10l5 4z" />
                      </svg>
                    </div>
                    <img className="leader__avatar" src={leader.avatar}></img>
                    <div className="leader__name">{leader.name}</div>
                    <div className="leader__points"><p>{leader.points} points</p></div>
                  </div>
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
                      <img src={leader.avatar}></img>
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
