import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { dataSlider, settingSlideShow } from "./DataSlider";
import { useWindowSize } from "../../hooks/useWindowSize";

export default function SlideShow() {
    const handleResize = useWindowSize();
    return (
        <div className="">
            <Slider {...settingSlideShow}>
                {dataSlider.map((item) => {
                    return (
                        <div
                            key={item.id}
                            className="px-2 py-2 cursor-pointer border-none outline-none"
                        >
                            <img
                                src={item.linkImg}
                                alt={item.title}
                                className={`${
                                    handleResize.width > 1024
                                        ? "w-[70%] h-[650px] ml-auto mr-auto block"
                                        : ""
                                }`}
                            />
                            <hr className="border-none h-[2px] bg-slate-400 mt-2" />

                            <h1 className="text-center font-bold mt-2">{item.title}</h1>
                        </div>
                    );
                })}
            </Slider>
        </div>
    );
}
