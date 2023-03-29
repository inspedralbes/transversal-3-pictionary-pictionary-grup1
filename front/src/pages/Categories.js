import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Cookies from 'universal-cookie';
import { useNavigate } from "react-router-dom"; //Rutas
import routes from "../index";
import '../styles/Categories.css';


function Categories() {
    const [registro, setRegistro] = useState(0);
    const [addCategory, setAddCategory] = useState(false);
    const [editing, setEditing] = useState(false);
    const [addCategoryMessage, setAddCategoryMessage] = useState("");
    const [firstTime, setFirstTime] = useState(true);
    const [loadingCategories, setLoadingCategories] = useState(true);
    const [myCategories, setMyCategories] = useState([]);
    const [getCats, setGetCats] = useState(0);
    const [deleteCat, setDeleteCat] = useState(0);
    const [editCat, setEditCat] = useState(0);
    const [idToDelete, setIdToDelete] = useState(0);
    const [idToEdit, setIdToEdit] = useState(0);
    const [categoryListMessage, setCategoryListMessage] = useState("");

    const [wordList, setWordList] = useState([{ word: "" }]);
    const [descriptionList, setDescriptionList] = useState([{ description: "" }]);

    const cookies = new Cookies();

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
        setUserData({
            name: "",
            privacy: "",
            token: "",
            words: [],
        });
        setWordList([...wordList, { word: "" }]);
        setDescriptionList([...descriptionList, { description: "" }]);
    };

    const handleSetAddCategory = () => {
        setCategoryListMessage("");
        setAddCategory(!addCategory);
        setGetCats(getCats + 1);
    };

    const handleSubmit = (event) => {
        if (editing) {
            setEditCat(editCat + 1);
        } else {
            setRegistro(registro + 1);
        }
    };

    function handleDelete(e) {
        setIdToDelete(e.target.id);
        setDeleteCat(deleteCat + 1);
    };

    const handleEdit = (e) => {
        e.preventDefault();
        setIdToEdit(e.target.id);
        console.log(e.target);
        setEditing(true);
        setWordList([]);
        setDescriptionList([]);

        myCategories.forEach(category => {
            if (category.categoryId == idToEdit) {
                console.log(category);

                setUserData({ categoryName: category.categoryName, privacy: category.privacy == "public" ? true : false })
                let wordList = [];
                let catList = [];
                category.words.forEach(word => {
                    wordList.push({ word: word.name })
                    catList.push({ description: word.description })
                });
                setWordList(wordList);
                setDescriptionList(catList);
            }
        });
        setAddCategory(!addCategory);
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
            user.append("token", cookies.get('token') != undefined ? cookies.get('token') : null);
            user.append("words", JSON.stringify(wordsAndDescription));

            fetch(routes.fetchLaravel + "addCategory", {
                method: 'POST',
                mode: 'cors',
                body: user,
                credentials: 'include'
            }).then((response) => response.json()).then((data) => {
                console.log(data);
                if (data.valid) {
                    setAddCategoryMessage(`Category ${data.category.name} added correctly`);
                    setWordList([{ word: "" }]);
                    setDescriptionList([{ description: "" }]);
                } else {
                    setAddCategoryMessage(data.message)
                    if (data.wrongWords != null) {
                        setAddCategoryMessage(`One or more words are repeated. (${data.wrongWords})`)
                    }
                }
            }
            );
        }
    }, [registro]);

    useEffect(() => {
        setLoadingCategories(true);
        if (getCats != 0) {
            const user = new FormData()
            user.append("token", cookies.get('token') != undefined ? cookies.get('token') : null);

            fetch(routes.fetchLaravel + "getMyCategories", {
                method: 'POST',
                mode: 'cors',
                body: user,
                credentials: 'include'
            }).then((response) => response.json()).then((data) => {
                // console.log(data);
                setMyCategories(data);
                setLoadingCategories(false);
            }
            );
        }
    }, [getCats]);

    useEffect(() => {
        if (deleteCat != 0 && idToDelete != 0) {
            const user = new FormData()
            user.append("token", cookies.get('token') != undefined ? cookies.get('token') : null);
            user.append("category_id", idToDelete);

            fetch(routes.fetchLaravel + "deleteCategory", {
                method: 'POST',
                mode: 'cors',
                body: user,
                credentials: 'include'
            }).then((response) => response.json()).then((data) => {
                if (data.valid) {
                    setGetCats(getCats + 1);
                    setCategoryListMessage(data.message);
                } else {
                    setCategoryListMessage(data.message);
                }
                setIdToDelete(0)
            }
            );
        }
    }, [deleteCat]);

    useEffect(() => {
        if (editCat != 0) {
            const wordsAndDescription = [];

            for (let index = 0; index < wordList.length; index++) {
                let wordAdd = {
                    name: wordList[index].word,
                    description: descriptionList[index].description
                }
                wordsAndDescription.push(wordAdd);
            }

            const user = new FormData()
            user.append("category_id", idToEdit);
            user.append("name", userData.name);
            user.append("public", userData.privacy);
            user.append("token", cookies.get('token') != undefined ? cookies.get('token') : null);
            user.append("words", JSON.stringify(wordsAndDescription));

            fetch(routes.fetchLaravel + "editCategory", {
                method: 'POST',
                mode: 'cors',
                body: user,
                credentials: 'include'
            }).then((response) => response.json()).then((data) => {
                console.log(data);
            }
            );
        }
    }, [editCat]);

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
                                    {categoryListMessage != "" && <h3 style={{ textAlign: "center", color: "red" }}>{categoryListMessage}</h3>}
                                    <div className="myCategories">
                                        <table className="myCategories__table">
                                            <thead className="myCategories__thead">
                                                <tr className="myCategories__tr">
                                                    <th className="myCategories__th">Category</th>
                                                    <th className="myCategories__th">Nº words</th>
                                                    <th className="myCategories__th">Creation date</th>
                                                    <th className="myCategories__th">Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody className="myCategories__tbody">
                                                {Array.isArray(myCategories)
                                                    ? myCategories.map((category, index) => (
                                                        <tr className="myCategories__tr" key={index}>
                                                            <td className="myCategories__td">{category.categoryName}</td>
                                                            <td className="myCategories__td">{category.numberOfWords}</td>
                                                            <td className="myCategories__td">{category.createdAt}</td>
                                                            <td className="myCategories__td"><i className="icon-edit" id={category.categoryId} onClick={handleEdit}></i> <i className="icon-trash" id={category.categoryId} onClick={handleDelete}></i></td>
                                                        </tr>

                                                    )) : null}
                                            </tbody>
                                            <tfoot>
                                                <tr className="myCategories__tfoot">
                                                    <td className="myCategories__td"></td>
                                                    <td className="myCategories__td"></td>
                                                    <td className="myCategories__td"></td>
                                                    <td className="myCategories__addCategoryButton"><button onClick={handleSetAddCategory}><i className="icon-plus"></i>Add category</button></td>
                                                </tr>
                                            </tfoot>
                                        </table>
                                    </div>
                                </>
                                :
                                <>
                                    <h1 style={{ textAlign: "center" }}>You haven't created any category yet!</h1>
                                    <button onClick={handleSetAddCategory}><i className="icon-plus"></i>Add category</button>
                                </>
                            }
                        </div> :
                        <h1>Loading categories...</h1>}
                </> :
                <div className="addCategory">
                    <fieldset>
                        <legend className="addCategory__legend">ADD NEW CATEGORY</legend>
                        <br />
                        {addCategoryMessage != "" && <h3 style={{ textAlign: "center" }}>{addCategoryMessage}</h3>}
                        <div className="addCategory__form">
                            <div className="addCategory__name">
                                <span className="addCategory__formSpan">
                                    <input className="slide-up" id="name" type="text" placeholder="Introduce name" onChange={(e) => setUserData({ ...userData, name: e.target.value })} required /><label className="addCategory__nameLabel" htmlFor="name">Name</label>
                                </span>
                            </div>
                        </div>
                        <form className="App" autoComplete="off">
                            <div className="form-field">
                                {wordList.map((singleWord, index) => (
                                    <div key={index} className="words">
                                        <div className="wordSettings">
                                            <div className="addCategory__form">
                                                <div className="addCategory__nameTA">
                                                    <span className="addCategory__formSpanTA">
                                                        <p className="addCategory__Word">Word</p>
                                                        <input className="input" name="word" type="text" id="word" placeholder="Introduce word" value={singleWord.word} onChange={(e) => handleWordChange(e, index)} required />
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="addCategory__form">
                                                <div className="addCategory__nameTA">
                                                    <span className="addCategory__formSpanTA">
                                                        <p className="addCategory__description">Description</p>
                                                        <textarea className="text-area" name="description" type="text" id="word" placeholder="Add a description :)" value={descriptionList[index].description} onChange={(e) => handleDescriptionChange(e, index)} required />
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        {wordList.length - 1 === index && wordList.length < 100 && (
                                            <button
                                                type="button"
                                                onClick={handleWordAdd}
                                                className="add-btn"
                                            >
                                                <span>Add a Word</span>
                                            </button>
                                        )}
                                        {wordList.length !== 1 && (
                                            <button
                                                type="button"
                                                onClick={() => handleWordRemove(index)}
                                                className="remove-btn"
                                            >
                                                <span>Remove</span>
                                            </button>
                                        )}
                                        <br />
                                    </div>
                                ))}
                            </div>
                        </form>

                        <div className="form__buttonsLinks">
                            <div className="form__buttons">
                                <div className="form__goBack">
                                    <div className="form__button--flex">
                                        <button id="goBack__button" onClick={handleSetAddCategory}>
                                            <span className="button-text">Category list</span>
                                        </button>
                                    </div>
                                </div>

                                <label className="addCategory__public">
                                    <input className="addCategory__publicCheckbox" type="checkbox" checked={userData.privacy} onChange={(e) => setUserData({ ...userData, privacy: e.target.checked })} required></input>
                                    <p>Do you want the category to be public?</p>
                                </label>
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