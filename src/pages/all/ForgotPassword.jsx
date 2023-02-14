import React from "react";
import { FaGooglePlusG, FaTwitter } from "react-icons/fa";
import { useFormik } from "formik";
import * as yup from "yup";
import { Routes, Route, Link } from "react-router-dom";
import Login from "./Login";

function ForgotPassword() {
    const formik = useFormik({
        initialValues: {
            email: "",
        },
        validationSchema: yup.object({
            email: yup.string().email("Email is invalid!").required("Email required!"),
        }),
        onSubmit: (values) => {
            console.log("values", values);
        },
    });
    return (
        <div className="w-full h-screen flex flex-row relative">
            <p className="absolute top-10 right-10">
                Already a member?
                <Link to="/login" className="text-[#4f3cc9]">
                    {" "}
                    Sign In
                </Link>
            </p>
            <div className=" bg-[#f3d186] h-screen hidden lg:w-5/12 md:block md:w-2/3 lg:block">
                <div className="m-auto flex flex-col items-center pt-36">
                    <p className="mt-4 text-[60px] font-thin text-[#cb4a4a] font-Comforter">
                        Discover the world’s
                    </p>
                    <img
                        src="https://cdn.dribbble.com/assets/auth/sign-up-2b63dbffcc69046adb0ec414be26771ce10d91a8f9b4de7c281bcbee9e95d9f9.png"
                        alt="demo"
                        className="w-auto h-[30%] bg-cover mt-24"
                    />
                </div>
            </div>
            <div className="w-full bg-white flex items-center justify-center">
                <div className="w-1/2 md:w-2/3 lg:w-[400px]">
                    <div className="flex items-center my-8 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5">
                        <p className="text-center font-semibold mx-4 mb-0 text-[30px]">
                            Forgot Password?
                        </p>
                    </div>

                    <form className="" onSubmit={formik.handleSubmit}>
                        <div className="mt-8">
                            <p className="text-[16px] font-bold">Enter your email</p>
                            <input
                                className="bg-gray-200 px-4 py-2 w-full hover:ring-pink-200 hover:ring-2 rounded-xl mt-2 focus:ring-pink-200 active:ring-pink-200 focus:ring-2 "
                                type="email"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                placeholder="Email"
                                id="email"
                                name="email"
                            />
                            {formik.errors.email && (
                                <p className="text-red-500 text-sm">{formik.errors.email}</p>
                            )}
                        </div>

                        <input
                            type="submit"
                            className="w-[200px] h-[40px] bg-[#ea4c89] text-white text-center rounded-md mt-6 font-bold hover:bg-[#eb73a1]"
                            value="Next"
                        />
                    </form>
                </div>
            </div>
            <Routes>
                <Route path="/login" element={<Login />} />
            </Routes>
        </div>
    );
}

export default ForgotPassword;
