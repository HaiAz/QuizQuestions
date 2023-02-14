import React, { useState, createContext } from "react";
import { useAppContext } from "../../../context/AppProvider";
import { BsWater } from "react-icons/bs";

export default function Header() {
    // const { showMenu, setShowMenu } = useAppContext();
    // const toggleShowMenu = () => {
    //     setShowMenu(!showMenu);
    // };
    return (
        <div className="h-16 flex justify-between items-center bg-slate-300 z-50">
            <div className="font-Comforter text-4xl w-3/4 ml-4 font-bold">Quiz Questions</div>
            <div className="h-4 mr-5">
                <BsWater
                    className="text-2xl"
                    // onClick={toggleShowMenu}
                />
            </div>
        </div>
    );
}
