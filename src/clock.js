import React from "react";

function clock() {
    return (
        <div className="w-full h-screen bg-red-200">
            <div className="flex flex-col relative ">
                <span className="absolute text-[160px] font-mono text-red-500 top-[-50px] flex left-8">
                    5
                </span>
                <div className="bg-white w-[150px] h-[70px] rounded-2xl">
                    <div className="flex justify-between items-end h-full mx-4 text-4xl">
                        <p>.</p>
                        <p>.</p>
                    </div>
                    <div className="relative">
                        <p className="text-9xl top-[-110px] left-[-10px] absolute">.</p>
                        <hr className="bg-slate-500 text-bg-slate-500 border-bg-slate-500 h-1" />
                        <p className="absolute text-9xl top-[-110px] right-[-10px]">.</p>
                    </div>
                </div>
                <div className="flex bg-white w-[150px] h-[70px] rounded-2xl">
                    <div className="flex justify-between h-full mx-4 text-4xl">
                        <p>.</p>
                        <p>.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default clock;
