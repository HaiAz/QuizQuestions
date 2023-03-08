import React, { useContext, useState, useEffect } from "react";
import { AiFillHome, AiFillCloseCircle, AiFillSetting } from "react-icons/ai";
import { BsFillMoonFill, BsPeopleFill } from "react-icons/bs";
import { BiHelpCircle } from "react-icons/bi";
import { GiMoneyStack } from "react-icons/gi";
import { GrLogout } from "react-icons/gr";
import { Link, useNavigate } from "react-router-dom";
import { useAppContext } from "../../context/AppProvider";
import { useAuthContext } from "../../context/AuthProvider";
import { useSelector, useDispatch } from "react-redux";
import { auth, db } from "../../firebase/config";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { getAdditionalUserInfo } from "firebase/auth";

export default function SideBar() {
    const { showMenu, setShowMenu } = useAppContext();
    const { handleLogout } = useAuthContext();

    const navigate = useNavigate();

    return (
        <div className="">
            {/* <div
                className={`${
                    showMenu
                        ? "w-[300px] h-screen flex flex-col bg-slate-200 px-5 absolute top-16 right-0 z-20 transform translate-x-0 transition-all duration-300"
                        : "w-[300px] h-screen flex flex-col bg-slate-200 px-5 absolute top-16 right-0 z-20 transform translate-x-96 transition-all duration-300"
                }  `}
            >
                <AiFillCloseCircle
                    className="absolute top-8 right-4 w-8 h-8"
                    onClick={() => setShowMenu(false)}
                />
                <div className=" py-2 text-center w-full flex justify-center mt-10">
                    <p className="py-2 px-10 rounded-[30px] font-bold bg-[#88619a] text-white">
                        <Link to="/user/list-exam" className="">
                            Take The Test
                        </Link>
                    </p>
                </div>

                <div className="mr-auto ml-auto">
                    <ul className="menu bg-base-100 w-56 p-2 rounded-box">
                        <li>
                            <Link to="/home">
                                <AiFillHome />
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link to="">
                                <GrLogout onClick={handleLogout} /> Log Out
                            </Link>
                        </li>

                        <hr className="border-none h-[2px] bg-slate-400" />
                        <li>
                            <Link to="">
                                <GiMoneyStack /> Buy Premium
                            </Link>
                        </li>
                        <li>
                            <Link to="">
                                <BsFillMoonFill /> Theme
                            </Link>
                        </li>
                        <li>
                            <Link to="">
                                <AiFillSetting /> Settings
                            </Link>
                        </li>
                        <hr className="border-none h-[2px] bg-slate-400" />
                        <li>
                            <Link to="">
                                <BiHelpCircle /> Help
                            </Link>
                        </li>
                        <li>
                            <Link to="">
                                <BsPeopleFill /> Contact Us
                            </Link>
                        </li>
                        <li>
                            <Link to="/login">
                                <BsPeopleFill /> Login
                            </Link>
                        </li>
                    </ul>
                </div>
            </div> */}
            {/* <div className="dropdown dropdown-end dropdown-hover">
                <label tabIndex={0} className="btn m-1">
                    Hover
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
            </div> */}
        </div>
    );
}
