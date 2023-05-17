import React, { memo } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuthContext } from "../../context/AuthProvider";
import { useAppContext } from "../../context/AppProvider";
import { useSelector, useDispatch } from "react-redux";
import { auth } from "../../firebase/config";
function Header() {
    const { handleLogout } = useAuthContext();
    const { navTitle, setNavTitle, navbarTitle } = useAppContext();
    const dispatch = useDispatch();
    const checkAuth = useSelector((state) => state.authSlice.auth);
    const userInfo = useSelector((state) => state.authSlice.user);
    const location = useLocation();
    return (
        <div className="h-16 flex justify-between items-center bg-[#eeb9cb] z-50">
            <div className="flex-1">
                <label
                    htmlFor="my-drawer-2"
                    className={`${
                        location.pathname === "/home" ||
                        location.pathname === "/" ||
                        location.pathname === "/Home"
                            ? "hidden"
                            : "lg:hidden p-4 btn btn-ghost text-secondary-content drawer-button"
                    }`}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        className="inline-block w-5 h-5 stroke-current"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 6h16M4 12h16M4 18h16"
                        ></path>
                    </svg>
                </label>
                <div className="btn btn-ghost btn-sm normal-case text-xl md:text-3xl transition-all duration-500 translate-x-0 font-mono">
                    {navbarTitle}
                </div>
            </div>

            <div className="dropdown dropdown-end mr-4">
                <label tabIndex={0} className="m-1">
                    <img
                        src={userInfo.photoURL}
                        className="w-12 rounded-full shadow-3xl hover:w-14 hover:cursor-pointer"
                        alt="avatar"
                    />
                </label>
                <ul
                    tabIndex={0}
                    className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
                >
                    <li className={checkAuth.isLogin ? `` : `hidden`}>
                        <Link to="/user/profile">Thông tin cá nhân</Link>
                    </li>
                    <li>
                        <Link to="/user/list-subjects">Take the test</Link>
                    </li>
                    <li className={checkAuth.isLogin ? `hidden` : ``}>
                        <Link to="/login">Đăng nhập</Link>
                    </li>
                    <li className={checkAuth.isLogin ? `` : `hidden`} onClick={handleLogout}>
                        <Link to="/home">Đăng xuất</Link>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default memo(Header);
