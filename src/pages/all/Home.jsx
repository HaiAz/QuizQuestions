import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import SlideShow from "../../components/all/Slider/SlideShow";
import SubjectSlideShow from "../../components/all/Slider/SubjectSlideShow";
import Header from "../../components/all/Home/Header";
import Footer from "../../components/all/Home/Footer";
import SideBar from "../../components/all/SideBar/SideBar";

export default function Home() {
    return (
        <div id="Home" className="w-full min-h-screen relative overflow-hidden">
            <Header />
            <SideBar />
            <SlideShow />
            <div className="">
                <div className="bg-[#4298b4] mt-8">
                    <h1 className="text-white text-4xl font-OleoScript mb-4 text-center pt-4">
                        "You’ll never learn if you do not make mistakes.
                    </h1>
                    {/* <h1 className="text-white text-3xl font-OleoScript mb-4 text-center pt-4">
                        You’ll never be successful if you do not encounter failure.""
                    </h1> */}
                    <div className="bg-[#4298b4] py-4 text-center w-full flex justify-center">
                        <p className="py-4 px-10 rounded-[30px] font-bold bg-[#88619a] text-white">
                            <Link to="/take-the-test" className="">
                                Take The Test
                            </Link>
                        </p>
                    </div>
                    <img
                        src="https://www.16personalities.com/static/images/homepage/header-mountains-desktop.svg"
                        alt="1"
                        className="mt-4"
                    />
                </div>

                <div className="flex flex-col">
                    <h1 className="text-black text-3xl font-OleoScript mb-4 text-center pt-4">
                        "The smarter you get, the more you realize that everything can be possible."
                    </h1>
                    <div>
                        <img
                            src="https://www.16personalities.com/static/images/teams/communication.svg?v=1"
                            alt="2"
                        />
                    </div>
                    <div className=" py-4 text-center w-full flex justify-center">
                        <p className="py-4 px-10 rounded-[30px] font-bold bg-[#88619a] text-white">
                            <Link to="/take-the-test" className="">
                                Take The Test
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
            <SubjectSlideShow />
            <Footer />
        </div>
    );
}
