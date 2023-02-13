import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { dataSubject, settingSubjectSlideShow } from "./DataSlider";

export default function SubjectSlideShow() {
    return (
        <div className="mx-[1px]">
            <div className="text-center">
                <div className="flex items-center py-4 ml-10">
                    <div className="flex-grow h-px bg-gray-400"></div>

                    <span className="flex-shrink text-2xl text-gray-500 px-4 italic font-bold">
                        TESTIMONIALS
                    </span>

                    <div className="flex-grow h-px bg-gray-400 mr-10"></div>
                </div>
                <p className="text-4xl font-OleoScript">"See what others have to say"</p>
            </div>
            <Slider {...settingSubjectSlideShow}>
                {dataSubject.map((item) => {
                    return (
                        <div key={item.id} className=" px-2 py-2">
                            <div className="border-black border-[1px] border-l-0 first:border-l-[1px] py-4">
                                <div className="flex items-center px-2">
                                    <img
                                        src={item.linkImg}
                                        alt={item.title}
                                        className="w-[40%] h-1/2 ml-auto mr-auto block"
                                    />
                                    <p className="px-2">{item.description}</p>
                                </div>
                                <h1 className="text-center font-bold mt-2">{item.title}</h1>
                            </div>
                        </div>
                    );
                })}
            </Slider>
        </div>
    );
}
