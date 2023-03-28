import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Cookies from 'universal-cookie';
import { useNavigate } from "react-router-dom"; //Rutas
import routes from "../index";
import '../styles/Categories.css';


function Categories() {
    const [registro, setRegistro] = useState(0);
    const [addCategory, setAddCategory] = useState(false);
    const [firstTime, setFirstTime] = useState(true);
    const [loadingCategories, setLoadingCategories] = useState(true);
    const [myCategories, setMyCategories] = useState([]);
    const [getCats, setGetCats] = useState(0);


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

    const handleSetAddCategory = () => {
        setAddCategory(!addCategory)
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

    const handleGetCats = (event) => {
        if (event.key === "Enter") {
            setGetCats(getCats + 1);
        }
    };

    const handleSubmit = (event) => {
        setRegistro(registro + 1);
        // setGetCats(getCats + 1);
        // setAddCategory(!addCategory);
    };

    const handleDelete = (id) => {
        // setRegistro(registro + 1);
        // setGetCats(getCats + 1);
        // setAddCategory(!addCategory);
    };

    const handleEdit = (category) => {
        // setRegistro(registro + 1);
        // setGetCats(getCats + 1);
        // setAddCategory(!addCategory);
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

    useEffect(() => {
        setLoadingCategories(true);
        if (getCats != 0) {
            const wordsAndDescription = [];

            for (let index = 0; index < wordList.length; index++) {
                let wordAdd = {
                    name: wordList[index].word,
                    description: descriptionList[index].description
                }
                wordsAndDescription.push(wordAdd);
            }

            const user = new FormData()
            user.append("token", cookies.get('token') != undefined ? cookies.get('token') : null);

            fetch(routes.fetchLaravel + "getMyCategories", {
                method: 'POST',
                mode: 'cors',
                body: user,
                credentials: 'include'
            }).then((response) => response.json()).then((data) => {
                console.log(data);
                setMyCategories(data);
                setLoadingCategories(false);
            }
            );
        }
    }, [getCats]);

    useEffect(() => {
        if (firstTime) {
            setGetCats(getCats + 1);
            setFirstTime(false)
        }
    }, [])

    return (
        <>
            {!addCategory ?
                <>
                    {!loadingCategories ?
                        <div>
                            {myCategories.length > 0 ?
                                <>
                                    <h1 style={{ textAlign: "center" }}>Categorias</h1>
                                    <div class="myCategories">
                                        <table class="myCategories__table">
                                            <thead class="myCategories__thead">
                                                <tr class="myCategories__tr">
                                                    <th class="myCategories__th">Category</th>
                                                    <th class="myCategories__th">Nº words</th>
                                                    <th class="myCategories__th">Creation date</th>
                                                    <th class="myCategories__th">Actions</th>
                                                </tr>
                                            </thead>
                                            {/* <li key={index}>{category.categoryName} <button onClick={handleEdit(category.categoryId)}>Edit category</button><button onClick={handleDelete(category)}>Delete category</button></li> */}
                                            <tbody class="myCategories__tbody">
                                                {Array.isArray(myCategories)
                                                    ? myCategories.map((category, index) => (
                                                        <tr class="myCategories__tr" key={index}>
                                                            <td class="myCategories__td">{category.categoryName}</td>
                                                            <td class="myCategories__td">{category.numberOfWords}</td>
                                                            <td class="myCategories__td">{category.createdAt}</td>
                                                            <td class="myCategories__td"><i class="icon-edit"></i> <i class="icon-trash"></i></td>
                                                        </tr>

                                                    )) : null}
                                            </tbody>
                                            <tfoot>
                                                <tr class="myCategories__tfoot">
                                                    <td class="myCategories__td"></td>
                                                    <td class="myCategories__td"></td>
                                                    <td class="myCategories__td"></td>
                                                    <td class="myCategories__addCategoryButton"><button onClick={handleSetAddCategory}><i class="icon-plus"></i>Add category</button></td>
                                                </tr>
                                            </tfoot>
                                        </table>
                                    </div>
                                </>
                                :
                                <>
                                    <h1 style={{ textAlign: "center" }}>You haven't created any category yet!</h1>
                                    <button onClick={handleSetAddCategory}><i class="icon-plus"></i>Add category</button>
                                </>
                            }
                        </div> :
                        <h1>Loading categories...</h1>}
                </> :
                <div className="addCategory">
                    <fieldset>
                        <legend className="addCategory__legend">ADD NEW CATEGORY</legend>
                        <br />
                        <div className="addCategory__form">
                            <label className="addCategory__name">
                                <span className="addCategory__formSpan">
                                    <input class="slide-up" id="name" type="text" placeholder="Introduce name" onChange={(e) => setUserData({ ...userData, name: e.target.value })} required /><label className="addCategory__nameLabel" for="name">Name</label>
                                </span>
                            </label>
                            <label className="addCategory__public"> <p>Do you want the category to be public?</p>
                                <input className="addCategory__publicCheckbox" style={{ color: color.privacy }} placeholder=" " type="checkbox" onChange={(e) => setUserData({ ...userData, privacy: e.target.checked })} required></input>
                            </label>
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
                                            <br />
                                            <label>Description
                                                <input
                                                    name="description"
                                                    type="text"
                                                    id="description"
                                                    value={descriptionList[index].description}
                                                    onChange={(e) => handleDescriptionChange(e, index)}
                                                    required
                                                /></label>
                                            {wordList.length - 1 === index && wordList.length < 100 && (
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
                                        </div><br />
                                    </div>
                                ))}
                            </div>
                        </form>

                        <div className="form__buttonsLinks">
                            <div className="form__buttons">
                                <Link to="/">
                                    <div className="form__goBack">
                                        <div className="form__button--flex">
                                            <button id="goBack__button" onClick={handleSetAddCategory}>
                                                <span className="button-text">Category list</span>
                                            </button>
                                        </div>
                                    </div>
                                </Link>
                                <div className="form__submit submit">
                                    <button onClick={handleSubmit} id="submit__button">
                                        <span className="button-text">SUBMIT</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </fieldset>
                </div>}

        </>
    );

}

export default Categories;