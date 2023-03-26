import { useState, useEffect, useRef } from "react";
import { render } from "react-dom";
import "../styles/Ranking.css"


const users = [ 
  {
    name: "Alumno 1",
    points: 120
  },
  {
    name: "Alumno 2",
    points: 90
  },
  {
    name: "Alumno 3",
    points: 30
  },
  {
    name: "Alumno 4",
    points: 0
  },
  {
    name: "Alumno 5",
    points: 20
  },
  ]  

function Ranking({ socket }) {
  const [userList, setUserList] = useState(users);
  const [firstTime, setFirstTime] = useState(true);
  const [spectator, setSpectator] = useState(false);
  const [topRanking, setTopRanking] = useState([]);


  useEffect(() => {
    if (firstTime) {
      socket.emit("lobby_data");
      setFirstTime(false)
    }
    socket.on("lobby_user_list", (data) => {
      data.list.sort((a, b) => b.points - a.points);
      // let aux = data.list.slice(0, 3); 
      // console.log("Users list", data.list);
      // console.log("topRanking", aux);
      
      //setUserList(data.list);
      
      //setTopRanking(aux);
      //console.log("userList", userList);
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
    // <div>
    //   <div className="endgame__ranking">
    //     <h1>Ranking</h1>
    //     <h2 className="connectedUsers_title">Connected users</h2>
    //     <ul id="userList" className="connectedUsers__userList userList">
    //       {userList.map((user, index) => {
    //         return (



    <div>
    <h1>Ranking</h1>

      <div id="border" className="ranking__container">
        <div className="topLeadersList fire">
          {userList.map((leader, index) => (
            <div key={leader.id}>
              {index + 1 <= 3 && (
                <div className="ranking__leader">
                  <div>{leader.name}</div>
                  <div>{leader.points} points</div>

                </div>
              )}
            </div>
          ))}
        </div>

        <div className="playerslist">
          <div className="table">

          </div>
          <div className="list">
            {userList.map((leader, index) => (
              <div className="player" key={leader.id}>
                <span> {index + 1 > 3 && ( 
                  <div>
                  <div className="ranking__player">
                    <span> {leader.name} </span>
                    <span> {leader.points} points</span>
                  </div>

                  </div>
                )}</span>

              </div>
            ))}
          </div>
        </div>
      </div>
    </div>

    // <li className="userList__item item" key={index}>
    //   <div className="item__name">
    //     <h3 id="list">{user.name}</h3>
    //     <h2>Points {user.points}</h2>
    //   </div>
    // </li>
    //         );
    //       })}
    //     </ul>
    //   </div>
    // </div>
  );
}
export default Ranking;
