import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IconName } from "react-icons/bs";
import { AiFillHome, AiFillCloseCircle } from "react-icons/ai";
import { useAppContext } from "../../../context/AppProvider";
export default function SideBar() {
    const { showMenu, setShowMenu } = useAppContext();
    return (
        <div
            className={`w-[300px] h-screen flex flex-col bg-slate-400 px-5 absolute top-0 right-0 z-20 transform translate-x-96 ${
                showMenu && "translate-x-0"
            } transition-all duration-300`}
        >
            <AiFillCloseCircle
                className="absolute top-8 right-4 w-8 h-8"
                onClick={() => setShowMenu(false)}
            />
            <div className=" py-2 text-center w-full flex justify-center mt-10">
                <p className="py-2 px-10 rounded-[30px] font-bold bg-[#88619a] text-white">
                    <Link to="/take-the-test" className="">
                        Take The Test
                    </Link>
                </p>
            </div>
            <div>
                <ul className="menu bg-base-100 w-56 p-2 rounded-box">
                    <li>
                        <Link to="">
                            <AiFillHome />
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link to="">Item 1</Link>
                    </li>
                    <li>
                        <Link to="">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                                />
                            </svg>
                            Item 3
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    );
}
