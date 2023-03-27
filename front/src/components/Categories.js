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
            <div className="list__container-left">
                <div className="title">Categorias públicas:</div>
                {Array.isArray(categoriesData.public)
                    ? categoriesData.public.map((item, index) => (
                        <div key={index}>
                            <label htmlFor={item.categoryId}>{`${item.categoryName}`}</label>
                            <input value={item.categoryId} type="checkbox" id={item.categoryId} onChange={handleCheck} />
                        </div>
                    )) : null}
            </div>
            <div className="list__container-right">
                <div className="title">Categorias privadas:</div>
                {Array.isArray(categoriesData.private) && categoriesData.private != []
                    ? categoriesData.private.map((item, index) => (
                        <div key={index}>
                            <label htmlFor={item.categoryId}>{`${item.categoryName}`}</label>
                            <input value={item.categoryId} type="checkbox" id={item.categoryId} onChange={handleCheck} />
                        </div>
                    )) : null}
            </div>
        </div>
    );
}

export default Categories;
