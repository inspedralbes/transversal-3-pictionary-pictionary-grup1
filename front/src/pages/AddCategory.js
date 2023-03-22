import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Cookies from 'universal-cookie';
import { useNavigate } from "react-router-dom"; //Rutas
import routes from "../index";


function Register({ socket }) {
    const [registro, setRegistro] = useState(0);

    const [userData, setUserData] = useState({
        name: "",
        privacy: "",
        token: "",
        words: [],
    });
    const [color, setColor] = useState({
        name: "red",
        privacy: "red",
        token: "red",
        words: "red",
    });

    const [errorText, setErrorText] = useState("");
    const cookies = new Cookies();
    const navigate = useNavigate();

    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            setRegistro(registro + 1);
        }
    };

    useEffect(() => {
        if (registro != 0) {
            const user = new FormData()
            user.append("name", userData.name);
            user.append("public", false);
            user.append("token", userData.token);
            user.append("words", JSON.stringify([ {"name": "New1", "description": "New1"}, {"name": "new1", "description": "new2"}, {"name": "NEW1", "description": "New3"}]));

            fetch(routes.fetchLaravel + "addCategory", {
                method: 'POST',
                mode: 'cors',
                body: user,
                credentials: 'include'
            }).then((response) => response.json()).then((data) => {
                console.log(data);
            }
            );
        }
    }, [registro]);

    return (
        <div className="form register">
            <h1>ADD CATEGORY</h1>
            <br />
            <div className="form__form">
                <div className="form__inputGroup">
                    <input className="form__input" style={{ color: color.name }} placeholder=" " type="text" onChange={(e) => setUserData({ ...userData, name: e.target.value })} required></input>
                    <span className="form__inputBar"></span>
                    <label className="form__inputlabel">Name</label>
                </div>
                <div className="form__inputGroup">
                    <input className="form__input" style={{ color: color.privacy }} placeholder=" " type="text" onChange={(e) => setUserData({ ...userData, privacy: e.target.value })} required></input>
                    <span className="form__inputBar"></span>
                    <label className="form__inputlabel">privacy</label>
                </div>
                <div className="form__inputGroup">
                    <input className="form__input" style={{ color: color.token }} placeholder=" " type="token" name="token" onChange={(e) => setUserData({ ...userData, token: e.target.value })} required></input>
                    <span className="form__inputBar"></span>
                    <label className="form__inputlabel">token
                    </label>
                </div>
                {/* <div className="form__inputGroup">
                    <input className="form__input" style={{ color: color.words }} placeholder=" " type="token" onChange={(e) => setUserData({ ...userData, token: e.target.value })} onKeyDown={handleKeyDown} required></input>
                    <span className="form__inputBar"></span>
                    <label className="form__inputlabel">words </label>
                </div> */}
            </div>

            <div className="form__buttonsLinks">
                <div className="form__buttons">
                    <Link to="/login">
                        <div className="form__goBack">
                            <div className="form__button--flex">
                                <button id="goBack__button">
                                    <span className="circle" aria-hidden="true">
                                        <span className="icon arrow"></span>
                                    </span>
                                    <span className="button-text">GO BACK</span>
                                </button>
                            </div>
                        </div>
                    </Link>

                    <div className="form__submit submit">
                        <button onClick={() => setRegistro(registro + 1)} id="submit__button">
                            <span className="circle2" aria-hidden="true">
                                <span className="icon2 arrow2"></span>
                            </span>
                            <span className="button-text">SUBMIT</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default Register;