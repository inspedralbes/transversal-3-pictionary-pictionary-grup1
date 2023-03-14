// import "../normalize.css";
import { useState, useEffect } from "react";

function ConnectedUsersInGame({ socket }) {
    const [userList, setUserList] = useState([]);
    const [firstTime, setFirstTime] = useState(true);

    useEffect(() => {
        if (firstTime) {
            socket.emit("lobby_data");
            setFirstTime(false)
        }
        socket.on("lobby_user_list", (data) => {
            setUserList(data);
        });
    }, [])


    return (
        <div className="game__connectedUsers">
            <h1 className="connectedUsers_title">Connected users</h1>
            <ul id="userList" className="connectedUsers__userList userList">
                {Array.isArray(userList.list)
                    ? userList.list.map((user, index) => {
                        return (
                            <li id="bgColor" className="userList__item item" key={index}>
                                <div className="item__name">
                                    <p>{user.name}</p>
                                </div>
                            </li>
                        );
                    })
                    : null}
            </ul>
        </div>

    );
}

export default ConnectedUsersInGame;
