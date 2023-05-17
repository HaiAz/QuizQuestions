import React, { memo } from "react";
import { Link, Outlet } from "react-router-dom";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import { useLocation } from "react-router-dom";

function UserDrawer() {
    const location = useLocation();
    return (
        <div className="drawer drawer-mobile">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
                {/* <!-- Page content here --> */}
                <div className="min-h-screen">
                    <Header />
                    <Outlet />
                </div>
                <Footer />
            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                <div className="bg-[#efeae6] w-80 overflow-hidden">
                    <div className="hidden lg:flex h-20 p-4 items-center">
                        <Link to="/" className="btn btn-ghost">
                            <span className="text-2xl font-mono uppercase font-bold text-sky-400">
                                quizz{" "}
                                <span className="text-4xl font-OleoScript text-red-300">
                                    {" "}
                                    Question
                                </span>
                            </span>
                        </Link>
                    </div>
                    <ul className="menu menu-compact p-4 w-80 text-base-content sticky font-mono ">
                        {/* <!-- Sidebar content here --> */}
                        <li className={`${location.pathname === "/" && "active:"}`}>
                            <Link className="text-lg" to="/home">
                                Trang chủ
                            </Link>
                        </li>
                        <li className={`${location.pathname === "/user/list-exam" && "active:"}`}>
                            <Link className="text-lg" to="/user/list-subjects">
                                Danh sách các môn học
                            </Link>
                        </li>
                        <li
                            className={`${location.pathname === "/user/exam-history" && "active:"}`}
                        >
                            <Link className="text-lg" to="/user/exam-history">
                                Lịch sử làm bài
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default memo(UserDrawer);
