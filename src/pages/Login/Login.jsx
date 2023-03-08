import React, { useState, useEffect } from "react";
import { FaGooglePlusG, FaTwitter } from "react-icons/fa";
import { AiFillFacebook } from "react-icons/ai";
import { useFormik } from "formik";
import * as yup from "yup";
import { Link, useNavigate, useHistory } from "react-router-dom";
import { GoogleAuthProvider, FacebookAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, db } from "../../firebase/config";
import { useAuthContext } from "../../context/AuthProvider";
import { useSelector, useDispatch } from "react-redux";
function Login() {
    const { handleLoginWithGoogle, handleLogout, a } = useAuthContext();
    const googleProvider = new GoogleAuthProvider();
    // const fbProvider = new FacebookAuthProvider();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [data, setData] = useState([]);
    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: yup.object({
            email: yup.string().email("Email is invalid!").required("Email required!"),
            password: yup.string().min(6).required("Password required!"),
        }),
        onSubmit: (values) => {
            const check = data.some(
                (e) => e.email === values.email && e.password === values.password
            );
            if (check) {
                navigate("/");
            } else {
                alert("Usename or password is incorrect!");
            }
        },
    });
    console.log(handleLoginWithGoogle, handleLogout, a);
    return (
        <div className="w-full h-screen flex flex-row relative">
            <p className="absolute top-10 right-10">
                Not a member?
                <Link to="/sign-up" className="text-[#4f3cc9]">
                    {" "}
                    Sign up now
                </Link>
            </p>
            <div className=" bg-[#f1cdd7] h-screen hidden lg:w-5/12 lg:block md:w-2/3 md:block">
                <div className="m-auto flex flex-col items-center pt-36">
                    {/* <p className="text-6xl font-bold text-[#cb4a4a] font-RubikGemStone">VNPT</p> */}
                    <p className="mt-4 text-[60px] font-thin text-[#cb4a4a] font-Comforter">
                        Discover the world’s
                    </p>
                    <img
                        src="https://cdn.dribbble.com/assets/auth/sign-in-a63d9cf6c1f626ccbde669c582b10457b07523adb58c2a4b46833b7b4925d9a3.jpg"
                        alt="demo"
                        className="w-auto h-[30%] bg-cover mt-24"
                    />
                </div>
            </div>
            <div className="w-full h-screen bg-white flex items-center justify-center ">
                <div className="w-1/2 lg:w-[400px] md:w-2/3">
                    <p className="font-bold text-2xl text-center">Sign in</p>
                    <div className="mt-4 flex justify-center">
                        <button className="bg-[#1a73e8] px-4 py-1 flex items-center justify-around rounded-md hover:bg-blue-400">
                            <Link>
                                <FaGooglePlusG
                                    className="text-white text-3xl"
                                    onClick={handleLoginWithGoogle}
                                />
                            </Link>
                        </button>
                        <button className="bg-stone-200 hover:bg-stone-300 px-4 py-4 ml-4 rounded-md">
                            <FaTwitter className="text-gray-500 text-3xl" />
                        </button>
                        <button className="bg-stone-200 hover:bg-stone-300 px-4 py-4 ml-4 rounded-md">
                            <AiFillFacebook className="text-blue-700 text-3xl" />
                        </button>
                    </div>

                    <div className="flex items-center my-8 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5">
                        <p className="text-center font-semibold mx-4 mb-0">Or</p>
                    </div>

                    <form className="" onSubmit={formik.handleSubmit}>
                        <div>
                            <label htmlFor="email" className="text-[16px] font-bold">
                                Email Address
                            </label>
                            <input
                                className="bg-gray-200 px-4 py-2 w-full hover:ring-pink-200 hover:ring-2 rounded-xl mt-2 focus:ring-pink-200 active:ring-pink-200 focus:ring-2 w-full6"
                                placeholder="Enter Email"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                id="email"
                                name="email"
                            />
                            {formik.errors.email && (
                                <p className="text-red-500 text-sm">{formik.errors.email}</p>
                            )}
                        </div>
                        <div className="mt-8">
                            <div className="flex justify-between">
                                <label htmlFor="password" className="text-[16px] font-bold">
                                    Password
                                </label>
                                <Link to="/forgot-password" className="">
                                    Forgot Password?
                                </Link>
                            </div>
                            <input
                                className="bg-gray-200 px-4 py-2 w-full hover:ring-pink-200 hover:ring-2 rounded-xl mt-2 focus:ring-pink-200 active:ring-pink-200 focus:ring-2"
                                placeholder="Enter Password"
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                id="password"
                                name="password"
                                type="password"
                            />
                            {formik.errors.password && (
                                <p className="text-red-500 text-sm">{formik.errors.password}</p>
                            )}
                        </div>

                        <input
                            type="submit"
                            className="w-[200px] h-[40px] bg-[#ea4c89] text-white text-center rounded-md mt-6 font-bold hover:bg-[#eb73a1]"
                            value="Sign in"
                            id="sign-in"
                            name="sign-in"
                        />
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;
