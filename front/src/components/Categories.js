import { useState, useEffect } from "react";
import "../styles/LobbyCreation.css";

function Categories({ socket, start, categoriesData }) {

    const [checked, setChecked] = useState([]);

    const handleCheck = (event) => {
        var updatedList = [...checked];
        if (event.target.checked) {
            updatedList = [...checked, event.target.value];
        } else {
            updatedList.splice(checked.indexOf(event.target.value), 1);
        }
        setChecked(updatedList);
    };

    useEffect(() => {
        socket.emit("set_categories", {
            ids: checked
        });
    }, [checked])

    return (
        <div className="checkList">
            <div className="list__container default">
                <h3 className="title">Default</h3>
                {Array.isArray(categoriesData.public)
                    ? categoriesData.public.map((item, index) => (
                        <div key={index} className="list__container__text">
                            <label htmlFor={item.categoryId}>{`${item.categoryName}`}</label>
                            <input value={item.categoryId} type="checkbox" id={item.categoryId} onChange={handleCheck} />
                        </div>
                    )) : null}
            </div>
            <div className="list__container public">
                <h3 className="title">Public</h3>
                {Array.isArray(categoriesData.private) && categoriesData.private != []
                    ? categoriesData.private.map((item, index) => (
                        <div key={index} className="list__container__text">
                            <label htmlFor={item.categoryId}>{`${item.categoryName}`}</label>
                            <input value={item.categoryId} type="checkbox" id={item.categoryId} onChange={handleCheck} />
                        </div>
                    )) : null}
            </div>
            <div className="list__container private">
                <h3 className="title">Private</h3>
                {Array.isArray(categoriesData.private) && categoriesData.private != []
                    ? categoriesData.private.map((item, index) => (
                        <div key={index} className="list__container__text">
                            <label htmlFor={item.categoryId}>{`${item.categoryName}`}</label>
                            <input value={item.categoryId} type="checkbox" id={item.categoryId} onChange={handleCheck} />
                        </div>
                    )) : null}
            </div>
        </div>
    );
}

export default Categories;
