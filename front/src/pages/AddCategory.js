import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Cookies from 'universal-cookie';
import { useNavigate } from "react-router-dom"; //Rutas
import routes from "../index";


function Register({ socket }) {
    const [registro, setRegistro] = useState(0);
    
    const [wordList, setWordList] = useState([{ word: "" }]);
    const [descriptionList, setDescriptionList] = useState([{ description: "" }]);

    const [userData, setUserData] = useState({
        name: "",
        privacy: "",
        token: "",
        words: [],
    });

    const handleWordChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...wordList];
        list[index][name] = value;
        setWordList(list);
      };
    
      const handleDescriptionChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...descriptionList];
        list[index][name] = value;
        setDescriptionList(list);
      };

      const handleWordRemove = (index) => {
        const list = [...wordList];
        list.splice(index, 1);
        setWordList(list);

        const list2 = [...descriptionList];
        list2.splice(index, 1);
        setDescriptionList(list2);
      };
    
      const handleWordAdd = () => {
        setWordList([...wordList, { word: "" }]);
        setDescriptionList([...descriptionList, { description: "" }]);
      };

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
            const wordsAndDescription = [];

            for (let index = 0; index < wordList.length; index++) {
                let wordAdd = {
                    name: wordList[index].word,
                    description: descriptionList[index].description
                }
                wordsAndDescription.push(wordAdd);
            }

            const user = new FormData()
            user.append("name", userData.name);
            user.append("public", userData.privacy);
            user.append("token", cookies.get('token'));
            user.append("words", JSON.stringify(wordsAndDescription));

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
            <h1>ADD NEW CATEGORY</h1>
            <br />
            <div className="form__form">
                <div className="form">
                    <span className=""></span>
                    <label className=""> Name
                        <input className="" style={{ color: color.name }} placeholder=" " type="text" onChange={(e) => setUserData({ ...userData, name: e.target.value })} required></input>
                    </label>
                </div>
                <div className="">
                    <span className=""></span>
                    <label className=""> Do you want the category to be public?
                        <input className="" style={{ color: color.privacy }} placeholder=" " type="checkbox" onChange={(e) => setUserData({ ...userData, privacy: e.target.checked })} required></input>
                    </label>
                </div>
            </div>
            <form className="App" autoComplete="off">
                <div className="form-field">
                    {wordList.map((singleWord, index) => (
                    <div key={index} className="words">
                        <div className="first-division">
                        <label>Word(s)
                        <input
                            name="word"
                            type="text"
                            id="word"
                            value={singleWord.word}
                            onChange={(e) => handleWordChange(e, index)}
                            required
                        /></label>
                        <br/>
                        <label>Description
                        <input
                            name="description"
                            type="text"
                            id="description"
                            value={descriptionList[index].description}
                            onChange={(e) => handleDescriptionChange(e, index)}
                            required
                        /></label>
                        {wordList.length - 1 === index && wordList.length < 4 && (
                            <button
                            type="button"
                            onClick={handleWordAdd}
                            className="add-btn"
                            >
                            <span>Add a Word</span>
                            </button>
                        )}
                        </div>
                        <div className="second-division">
                        {wordList.length !== 1 && (
                            <button
                            type="button"
                            onClick={() => handleWordRemove(index)}
                            className="remove-btn"
                            >
                            <span>Remove</span>
                            </button>
                        )}
                        </div><br/>
                    </div>
                    ))}
                </div>
            </form>

            <div className="form__buttonsLinks">
                <div className="form__buttons">
                    <Link to="/">
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