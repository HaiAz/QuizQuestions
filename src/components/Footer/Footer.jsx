import React, { memo } from "react";
import { BsFacebook, BsTwitter, BsInstagram, BsYoutube, BsTelegram } from "react-icons/bs";
import { Link } from "react-router-dom";
function Footer() {
    return (
        <div className="mt-12">
            <div className="flex flex-col items-center justify-center italic text-sky-500 text-[14px]">
                <Link>Contact</Link>
                <Link to="#" className="mb-2">
                    Testimonials
                </Link>
                <Link to="#" className="mb-2">
                    Terms & Conditions
                </Link>
                <Link to="#" className="mb-2">
                    Privacy Policy
                </Link>
                <Link to="#" className="mb-2">
                    For Teams
                </Link>
                <Link to="#" className="mb-2">
                    Join Us!
                </Link>
            </div>
            <div className="flex justify-center">
                <Link
                    to="https://www.facebook.com/aBci.iXyZ/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-4 mx-2 my-2 text-2xl"
                >
                    <BsFacebook />
                </Link>
                <Link
                    to="https://twitter.com/NMIXX_official"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-4 mx-2 my-2 text-2xl"
                >
                    <BsTwitter />
                </Link>
                <Link
                    to="https://www.instagram.com/sooyaaa__/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-4 mx-2 my-2 text-2xl"
                >
                    <BsInstagram />
                </Link>
                <Link
                    to="https://www.youtube.com/@haileuc7728"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-4 mx-2 my-2 text-2xl"
                >
                    <BsYoutube />
                </Link>
                <Link
                    to="#"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-4 mx-2 my-2 text-2xl"
                >
                    <BsTelegram />
                </Link>
            </div>
        </div>
    );
}

export default memo(Footer);
