import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAppContext } from "../../context/AppProvider";
import { useSelector } from "react-redux";
import { BsCoin } from "react-icons/bs";
function Profile() {
    const userInfo = useSelector((state) => state.authSlice.user);
    const { setNavTitle } = useAppContext();

    useEffect(() => {
        setNavTitle("Thông tin cá nhân");
    }, []);

    return (
        <div className="hero min-h-screen bg-base-200 place-items-start">
            <div className="hero-content flex-col lg:flex-row">
                <img
                    src={userInfo.photoURL}
                    className="max-w-sm rounded-full shadow-3xl w-36"
                    alt="avatar"
                />
                <div className="w-96 ">
                    <h1 className="text-3xl font-bold">{userInfo.displayName}</h1>
                    <div className="py-2 font-semibold text-xl">
                        <div className="flex">
                            <p>Email: </p>
                            <span className="font-normal ml-2">{userInfo.email}</span>
                        </div>
                        <div className="flex mt-2">
                            <p className="">Coin:</p>
                            <span className="font-normal ml-2">
                                {userInfo.coin}{" "}
                                <BsCoin className="inline ml-1 text-yellow-500 text-3xl" />
                            </span>
                        </div>
                    </div>
                    <Link to={"/admin"}>
                        <button className="btn btn-circle btn-accent w-40">ADMIN PAGE</button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Profile;
