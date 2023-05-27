import React, { useEffect } from "react";
import SubjectSlideShow from "../../components/Slider/SubjectSlideShow";
import Header from "../../components/Header/Header";
import SlideShow from "../../components/Slider/SlideShow";
import Footer from "../../components/Footer/Footer";
import Toast from "../../components/Toast/Toast";
import { doc, getDoc } from "firebase/firestore";
import { useAppContext } from "../../context/AppProvider";
import { Link } from "react-router-dom";

export default function Home() {
    const { setNavTitle } = useAppContext();
    useEffect(() => {
        setNavTitle("Trang chủ");
    }, []);

    return (
        <div id="Home" className="w-full min-h-screen relative overflow-hidden">
            <Header />
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
                            <Link to="/user/list-subjects" className="">
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
                            <Link to="/user/list-subjects" className="">
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
