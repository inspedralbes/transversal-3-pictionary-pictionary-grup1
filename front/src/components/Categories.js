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
                            <input value={item.categoryId} type="checkbox" id={item.categoryId} class="check" onChange={handleCheck} />
                            <label for={item.categoryId} class="list__container__text__label" >
                            <svg width="500" height="50" viewBox="0 0 500 100">

                                <g transform="translate(0,-972.36216)">
                                <path d="m 230,980 -166,5 c -709,22 289,89 215,18 -37,-36 -537,-46 -478,23" stroke="black" fill="none" class="path2" stroke-width="3" />
                                </g>
                            </svg>
                            <span htmlFor={item.categoryId}>{`${item.categoryName}`}</span>
                            </label>
                            
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
