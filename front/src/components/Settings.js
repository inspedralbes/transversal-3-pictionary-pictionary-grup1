import { useState, useEffect } from "react";

function Settings({ socket }) {
    const [roundDuration, setRoundDuration] = useState();
    const [username, setUsername] = useState("");

    

    return (
        <div>
            <form onSubmit={handleFormSubmit}>
                <input type="text" value={word} onChange={handleChange} placeholder="Enter a word" />
                <button type="submit">Save settings</button>
            </form>
        </div>
    );

}

export default Settings;