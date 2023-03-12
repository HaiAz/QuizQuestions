import React from "react";
import { Link, Outlet } from "react-router-dom";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import { useLocation } from "react-router-dom";

function AdminDrawer() {
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
                <div className="bg-base-300 w-80 overflow-hidden">
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
                    <ul className="menu menu-compact p-4 w-80 text-base-content sticky">
                        {/* <!-- Sidebar content here --> */}
                        <li className={`${location.pathname === "/" && "active:"}`}>
                            <Link className="text-lg" to="/home">
                                Trang chủ
                            </Link>
                        </li>
                        <li
                            className={`${location.pathname === "admin/add-question" && "active:"}`}
                        >
                            <Link className="text-lg" to="/admin/add-question">
                                Thêm câu hỏi
                            </Link>
                        </li>
                        <li className={`${location.pathname === "admin/create-exam" && "active:"}`}>
                            <Link className="text-lg" to="/admin/create-exam">
                                Tạo đề thi
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default AdminDrawer;
