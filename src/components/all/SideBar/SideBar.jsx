import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IconName } from "react-icons/bs";
import { AiFillHome, AiFillCloseCircle, AiFillSetting } from "react-icons/ai";
import { BsFillMoonFill, BsPeopleFill } from "react-icons/bs";
import { BiHelpCircle } from "react-icons/bi";
import { GiMoneyStack } from "react-icons/gi";
import { GrLogout } from "react-icons/gr";
// import { useAppContext } from "../../../context/AppProvider";
export default function SideBar() {
    // const { showMenu, setShowMenu } = useAppContext();

    return (
        <div className="">
            <div
                // className={`w-[300px] h-screen flex flex-col bg-slate-400 px-5 absolute top-0 right-0 z-20 transform translate-x-96 ${
                //     showMenu && "translate-x-0"
                // } transition-all duration-300`}
                // className={`${
                //     showMenu
                //         ? "w-[300px] h-screen flex flex-col bg-slate-200 px-5 absolute top-0 right-0 z-20 transform translate-x-0 transition-all duration-300"
                //         : "w-[300px] h-screen flex flex-col bg-slate-200 px-5 absolute top-0 right-0 z-20 transform translate-x-96 transition-all duration-300"
                // }  `}
                className="w-[300px] h-screen flex flex-col bg-slate-200 px-5 absolute top-0 right-0 z-20 transform translate-x-96 transition-all duration-300"
            >
                <AiFillCloseCircle
                    className="absolute top-8 right-4 w-8 h-8"
                    // onClick={() => setShowMenu(false)}
                />
                <div className=" py-2 text-center w-full flex justify-center mt-10">
                    <p className="py-2 px-10 rounded-[30px] font-bold bg-[#88619a] text-white">
                        <Link to="/take-the-test" className="">
                            Take The Test
                        </Link>
                    </p>
                </div>

                <div className="mr-auto ml-auto">
                    <ul className="menu bg-base-100 w-56 p-2 rounded-box">
                        <li>
                            <Link to="/Home">
                                <AiFillHome />
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link to="">
                                <GrLogout /> Log Out
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
                    </ul>
                </div>
            </div>
        </div>
    );
}
