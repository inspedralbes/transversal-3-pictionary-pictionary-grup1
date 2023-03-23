import { useState, useEffect, useRef } from "react";
import { render } from "react-dom";


function Ranking({socket}) {
    const [userList, setUserList] = useState([]);
    const [firstTime, setFirstTime] = useState(true);
    const [spectator, setSpectator] = useState(false);


    useEffect(() => {
        if (firstTime) {
            socket.emit("lobby_data");
            setFirstTime(false)
        }
        socket.on("lobby_user_list", (data) => {
            setUserList(data.list);
            // console.log(data);
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
      <div className="endgame__ranking">
        <h1>Ranking</h1>
        <h2 className="connectedUsers_title">Connected users</h2>
        {console.log("Lista usuarios", userList)}
            <ul id="userList" className="connectedUsers__userList userList">
                {userList.map((user, index) => {
                    return (
                        <li className="userList__item item" key={index}>
                            <div className="item__name">
                                <h3 id="list">{user.name}</h3>
                                <h1>{user.points}</h1>
                            </div>
                        </li>
                    );
                })}
            </ul>
      </div>
    </div>
  );
}
export default Ranking;
