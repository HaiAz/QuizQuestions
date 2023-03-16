import React from "react";
import { Link } from "react-router-dom";
function Error() {
    return (
        <div
            className="hero min-h-screen"
            style={{
                backgroundImage: `url("https://i.pinimg.com/originals/0e/c0/db/0ec0dbf1e9a008acb9955d3246970e15.gif")`,
            }}
        >
            <div className="hero-overlay bg-opacity-60"></div>
            <div className="hero-content text-center text-neutral-content">
                <div className="max-w-md">
                    <h1 className="mb-5 text-5xl font-bold">Oops!</h1>
                    <p className="mb-5">Trang bạn tìm kiếm không tồn tại.</p>
                    <button className="btn btn-primary">
                        <Link to="/home">Get Back!</Link>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Error;
