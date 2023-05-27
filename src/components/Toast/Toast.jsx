import React, { useState } from "react";
import { Link } from "react-router-dom";
import Countdown from "../Countdown/Countdown";
function Toast({ title, id, children, show }) {
    return (
        <div className="toast toast-top toast-end top-16">
            <div className="alert alert-success">
                <div className="flex">
                    <div className="flex flex-col">
                        <span className="block">{title}</span>
                        <Link className="">Tiếp tục làm bài!</Link>
                    </div>
                    <Countdown />
                </div>
            </div>
        </div>
    );
}

export default Toast;
