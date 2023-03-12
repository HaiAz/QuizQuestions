import React from "react";

function ListExam() {
    return (
        <div className="flex flex-wrap justify-around">
            <div className="w-1/4 h-64 card card-side bg-slate-200 shadow-xl mx-2 my-2">
                <figure className="w-40">
                    <img
                        src="https://cdn.discordapp.com/attachments/941695759764553778/1083601370562711612/exam.png"
                        alt="exam"
                    />
                </figure>
                <div className="card-body px-2">
                    <h2 className="card-title font-bold">Bài test 1</h2>
                    <div>
                        <p className="my-2">Thời gian làm bài: 90 phút</p>
                        <p className="my-2">Số lượng câu hỏi: 50 câu</p>
                        <p className="my-2">Coin: 20$</p>
                    </div>
                    <div className="card-actions justify-center mt-4">
                        <button className="btn btn-primary">Bắt đầu làm</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ListExam;
