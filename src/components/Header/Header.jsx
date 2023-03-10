import React, { useEffect, useState } from "react";
import { BsWater } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../context/AuthProvider";
import { useAppContext } from "../../context/AppProvider";
import { useSelector, useDispatch } from "react-redux";
function Header() {
    // const { showMenu, setShowMenu } = useAppContext();
    // const toggleShowMenu = () => {
    //     setShowMenu(!showMenu);
    // };
    const [checkLogin, setCheckLogin] = useState(false);
    const { handleLoginWithGoogle, handleLogout } = useAuthContext();
    const { navTitle, setNavTitle, navbarTitle } = useAppContext();
    const dispatch = useDispatch();
    const auth = useSelector((state) => state.authSlice.auth);
    const userInfo = useSelector((state) => state.authSlice.user);
    return (
        <div className="h-16 flex justify-between items-center bg-slate-300 z-50">
            <div className="flex-1">
                <label
                    htmlFor="my-drawer-2"
                    className="lg:hidden p-4 btn btn-ghost text-secondary-content drawer-button"
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
            {/* <div className="h-4 mr-5"> */}
            {/* <BsWater className="text-2xl" onClick={toggleShowMenu} /> */}

            <div className="dropdown dropdown-end mr-4">
                {/* {if(auth.)} */}
                <label tabIndex={0} className="btn m-1">
                    <BsWater />
                </label>
                <ul
                    tabIndex={0}
                    className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
                >
                    <li className={auth.isLogin ? `` : `hidden`}>
                        <Link to="/user/profile">Th??ng tin c?? nh??n</Link>
                    </li>
                    <li>
                        <Link to="/user/list-subjects">Take the test</Link>
                    </li>
                    <li className={auth.isLogin ? `hidden` : ``}>
                        <Link to="/login">????ng nh???p</Link>
                    </li>
                    <li className={auth.isLogin ? `` : `hidden`} onClick={handleLogout}>
                        <Link to="/home">????ng xu???t</Link>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default React.memo(Header);
