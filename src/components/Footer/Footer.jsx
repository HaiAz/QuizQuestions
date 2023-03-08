import React from "react";
import { BsFacebook, BsTwitter, BsInstagram, BsYoutube, BsTelegram } from "react-icons/bs";
import { Link } from "react-router-dom";
export default function Footer() {
    return (
        <div className="mt-12">
            <div className="flex flex-col items-center justify-center italic text-sky-500 text-[14px]">
                <Link>Contact</Link>
                <a href="#" className="mb-2">
                    Testimonials
                </a>
                <a href="#" className="mb-2">
                    Terms & Conditions
                </a>
                <a href="#" className="mb-2">
                    Privacy Policy
                </a>
                <a href="#" className="mb-2">
                    For Teams
                </a>
                <a href="#" className="mb-2">
                    Join Us!
                </a>
            </div>
            <div className="flex justify-center">
                <a href="" className="px-4 py-4 mx-2 my-2 text-2xl">
                    <BsFacebook />
                </a>
                <a href="" className="px-4 py-4 mx-2 my-2 text-2xl">
                    <BsTwitter />
                </a>
                <a href="" className="px-4 py-4 mx-2 my-2 text-2xl">
                    <BsInstagram />
                </a>
                <a href="" className="px-4 py-4 mx-2 my-2 text-2xl">
                    <BsYoutube />
                </a>
                <a href="" className="px-4 py-4 mx-2 my-2 text-2xl">
                    <BsTelegram />
                </a>
            </div>
        </div>
    );
}
