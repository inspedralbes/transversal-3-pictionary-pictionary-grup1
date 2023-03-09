// import "../normalize.css";
import { useState, useEffect } from "react";

function ConnectedUsers({ socket }, u) {
    const [userList, setUserList] = useState([]);
    const [firstTime, setFirstTime] = useState(true);

    useEffect(() => {
        if (firstTime) {
            socket.emit("lobby_data_pls");
            setFirstTime(false)
        }
        socket.on("lobby_user_list", (data) => {
            setUserList(data.list);
            // console.log(data);
        });
    }, [])


    return (
        <div className="game__connectedUsers">
            <h1 className="connectedUsers_title">Connected users</h1>
            <ul id="userList" className="connectedUsers__userList userList">
                {userList.map((user, index) => {
                    return (
                        <li id="bgColor" className="userList__item item" key={index}>
                            <div className="item__name">
                                <p>{user.name}</p>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </div>

    );
}

export default ConnectedUsers;
