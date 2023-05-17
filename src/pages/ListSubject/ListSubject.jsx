import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAppContext } from "../../context/AppProvider";
function ListSubject() {
    const listSubject = [
        {
            id: "math",
            name: "Toán học",
            img: require("../../assets/Img/math.png"),
        },
        {
            id: "physic",
            name: "Vật lý",
            img: require("../../assets/Img/physic.png"),
        },
        {
            id: "chemistry",
            name: "Hoá học",
            img: require("../../assets/Img/chemistry.png"),
        },
        {
            id: "english",
            name: "Tiếng anh",
            img: require("../../assets/Img/united-kingdom.png"),
        },
        {
            id: "morality",
            name: "Giáo dục công dân",
            img: require("../../assets/Img/morality.png"),
        },
        {
            id: "geography",
            name: "Địa Lý",
            img: require("../../assets/Img/globe.png"),
        },
    ];

    const { setNavTitle } = useAppContext();

    useEffect(() => {
        setNavTitle("Danh sách môn học");
    }, []);
    return (
        <div className="flex justify-center items-center flex-col container">
            <div className="container flex flex-row flex-wrap gap-8 justify-center item md:justify-center p-8">
                {listSubject.map((item) => {
                    return (
                        <div
                            key={item.id}
                            className="card w-72 bg-base-100 shadow-lg shadow-red-300"
                        >
                            <figure className="px-10 pt-10">
                                <img src={item.img} alt={item.name} className="rounded-xl" />
                            </figure>
                            <div className="card-body items-center text-center">
                                <h2 className="card-title">{item.name}</h2>
                                <div className="card-actions">
                                    <Link to={`/user/exam/${item.id}`} className="btn btn-primary">
                                        Challenge me!
                                    </Link>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default ListSubject;
