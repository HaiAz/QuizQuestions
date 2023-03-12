import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { auth, db } from "../../firebase/config";
import { useAuthContext } from "../../context/AuthProvider";
import { useAppContext } from "../../context/AppProvider";
import { useSelector, useDispatch } from "react-redux";
import { authSlice } from "./../../redux/authSlice";
import { setDescription } from "./../../redux/authSlice";

function Profile() {
    const [inputValue, setInputValue] = useState("");
    const dispatch = useDispatch();
    const userInfo = useSelector((state) => state.authSlice.user);
    const { setNavTitle } = useAppContext();

    useEffect(() => {
        setNavTitle("Thông tin cá nhân");
    }, []);

    // const userDes = useSelector((state) => state.authSlice.description);
    // const handleDescription = (value) => {
    //     dispatch(setDescription(value));
    // };
    return (
        <div className="hero min-h-screen bg-base-200 place-items-start">
            <div className="hero-content flex-col lg:flex-row">
                <img
                    src={userInfo.photoURL}
                    className="max-w-sm rounded-lg shadow-3xl"
                    alt="avatar"
                />
                <div className="w-64">
                    <h1 className="text-3xl font-bold">{userInfo.displayName}</h1>
                    <div className="py-2">
                        <span className="font-bold">Email: </span>
                        <Link to="">{userInfo.email}</Link>
                    </div>
                    {/* 
                    <label htmlFor="my-modal" className="btn">
                        Change your description!
                    </label>

                    <input type="checkbox" id="my-modal" className="modal-toggle" />
                    <div className="modal">
                        <div className="modal-box">
                            <input
                                type="text"
                                placeholder="Type here"
                                className="input input-bordered input-secondary w-full max-w-xs"
                                onChange={(e) => setInputValue(e.target.value)}
                            />
                            <div className="modal-action">
                                <label
                                    htmlFor="my-modal"
                                    className="btn"
                                    onClick={() => handleDescription(inputValue)}
                                >
                                    Yay!
                                </label>
                            </div>
                        </div>
                    </div> */}
                </div>
            </div>
        </div>
    );
}

export default Profile;
