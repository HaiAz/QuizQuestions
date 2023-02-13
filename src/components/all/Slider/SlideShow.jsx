import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { dataSlider, settingSlideShow } from "./DataSlider";

export default function SlideShow() {
    return (
        <div className="">
            <Slider {...settingSlideShow}>
                {dataSlider.map((item) => {
                    return (
                        <div key={item.id} className=" px-2 py-2">
                            <img src={item.linkImg} alt={item.title} className="" />
                            <h1 className="text-center font-bold mt-2">{item.title}</h1>
                        </div>
                    );
                })}
            </Slider>
        </div>
    );
}
