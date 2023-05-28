import React, { memo } from "react";
import { BsFacebook, BsTwitter, BsInstagram, BsYoutube, BsTelegram } from "react-icons/bs";
import { Link } from "react-router-dom";
function Footer() {
    return (
        <div className="pt-12 w-full bg-[#65c3c8] h-[600px]">
            <div className="flex flex-col items-center justify-center italic text-black text-[16px] py-2 my-2 h-[400px]">
                <div className="mb-2 flex flex-col justify-center items-center">
                    <svg
                        width="50"
                        height="50"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        fillRule="evenodd"
                        clipRule="evenodd"
                        className="fill-current mb-2"
                    >
                        <path d="M22.672 15.226l-2.432.811.841 2.515c.33 1.019-.209 2.127-1.23 2.456-1.15.325-2.148-.321-2.463-1.226l-.84-2.518-5.013 1.677.84 2.517c.391 1.203-.434 2.542-1.831 2.542-.88 0-1.601-.564-1.86-1.314l-.842-2.516-2.431.809c-1.135.328-2.145-.317-2.463-1.229-.329-1.018.211-2.127 1.231-2.456l2.432-.809-1.621-4.823-2.432.808c-1.355.384-2.558-.59-2.558-1.839 0-.817.509-1.582 1.327-1.846l2.433-.809-.842-2.515c-.33-1.02.211-2.129 1.232-2.458 1.02-.329 2.13.209 2.461 1.229l.842 2.515 5.011-1.677-.839-2.517c-.403-1.238.484-2.553 1.843-2.553.819 0 1.585.509 1.85 1.326l.841 2.517 2.431-.81c1.02-.33 2.131.211 2.461 1.229.332 1.018-.21 2.126-1.23 2.456l-2.433.809 1.622 4.823 2.433-.809c1.242-.401 2.557.484 2.557 1.838 0 .819-.51 1.583-1.328 1.847m-8.992-6.428l-5.01 1.675 1.619 4.828 5.011-1.674-1.62-4.829z"></path>
                    </svg>
                    <p className="mb-2">Quizz App - Hai Le</p>
                    <p className="mb-2">Providing reliable tech since 2023</p>
                    <p className="text-[#00393c]">Copyright © 2023 - All right reserved</p>
                </div>

                <div className="mb-2 py-2 font-medium transition ease-in-out duration-300 delay-[0] hover:scale-125 hover:-translate-y-1">
                    <Link to="https://www.facebook.com/aBci.iXyZ/" className=" " target="_blank">
                        Contact
                    </Link>
                </div>

                <div className="mb-2 py-2 font-medium transition ease-in-out duration-300 delay-[0] hover:scale-125 hover:-translate-y-1">
                    <Link to="#" className="">
                        Testimonials
                    </Link>
                </div>

                <div className="mb-2 py-2 font-medium transition ease-in-out duration-300 delay-[0] hover:scale-125 hover:-translate-y-1">
                    <Link to="#" className="">
                        Terms & Conditions
                    </Link>
                </div>

                <div className="mb-2 py-2 font-medium transition ease-in-out duration-300 delay-[0] hover:scale-125 hover:-translate-y-1">
                    <Link to="#" className="">
                        Privacy Policy
                    </Link>
                </div>

                <div className="mb-2 py-2 font-medium transition ease-in-out duration-300 delay-[0] hover:scale-125 hover:-translate-y-1">
                    <Link to="#" className="">
                        For Teams
                    </Link>
                </div>

                <div className="mb-2 py-2 font-medium transition ease-in-out duration-300 delay-[0] hover:scale-125 hover:-translate-y-1">
                    <Link to="#" className="">
                        Join Us!
                    </Link>
                </div>
            </div>
            <div className="flex justify-center mt-4 pt-2 py-2 px-2 h-[100px]">
                <div className="w-5 px-4 py-4 mx-6 my-2 text-2xl transition ease-in-out duration-300 delay-[0] hover:scale-125 hover:-translate-y-1 hover:-translate-x-1">
                    <Link
                        to="https://www.facebook.com/aBci.iXyZ/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <BsFacebook />
                    </Link>
                </div>

                <div className="w-5 px-4 py-4 mx-6 my-2 text-2xl transition ease-in-out duration-300 delay-[0] hover:scale-125 hover:-translate-y-1 hover:-translate-x-1">
                    <Link
                        to="https://twitter.com/NMIXX_official"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <BsTwitter />
                    </Link>
                </div>

                <div className="w-5 px-4 py-4 mx-6 my-2 text-2xl transition ease-in-out duration-300 delay-[0] hover:scale-125 hover:-translate-y-1 hover:-translate-x-1">
                    <Link
                        to="https://www.instagram.com/sooyaaa__/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <BsInstagram />
                    </Link>
                </div>

                <div className="w-5 px-4 py-4 mx-6 my-2 text-2xl transition ease-in-out duration-300 delay-[0] hover:scale-125 hover:-translate-y-1 hover:-translate-x-1">
                    <Link
                        to="https://www.youtube.com/@haileuc7728"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <BsYoutube />
                    </Link>
                </div>

                <div className="w-5 px-4 py-4 mx-6 my-2 text-2xl transition ease-in-out duration-300 delay-[0] hover:scale-125 hover:-translate-y-1 hover:-translate-x-1">
                    <Link to="#" target="_blank" rel="noopener noreferrer">
                        <BsTelegram />
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default memo(Footer);
