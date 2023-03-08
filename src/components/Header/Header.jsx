import React, { useState, createContext } from "react";
import { useAppContext } from "../../context/AppProvider";
import { BsWater } from "react-icons/bs";

export default function Header() {
    const { showMenu, setShowMenu } = useAppContext();
    const toggleShowMenu = () => {
        setShowMenu(!showMenu);
    };
    return (
        <div className="h-16 flex justify-between items-center bg-slate-300 z-50">
            <div className="font-OleoScript text-4xl w-3/4 ml-4 font-bold">Quiz Questions</div>
            {/* <div className="h-4 mr-5"> */}
            {/* <BsWater className="text-2xl" onClick={toggleShowMenu} /> */}

            <div className="dropdown dropdown-end">
                <label tabIndex={0} className="btn m-1">
                    Click
                </label>
                <ul
                    tabIndex={0}
                    className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
                >
                    <li>
                        <a>Item 1</a>
                    </li>
                    <li>
                        <a>Item 2</a>
                    </li>
                </ul>
            </div>
        </div>
    );
}
