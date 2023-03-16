import React, { useState, useEffect } from "react";
import { auth, db } from "../../firebase/config";
import { getDocs, addDoc, collection, where, doc } from "firebase/firestore";
import { useLocation } from "react-router-dom";

function ListExam() {
    const location = useLocation();
    const [subject, setSubject] = useState(location.pathname.slice(11));

    useEffect(() => {
        setSubject(location.pathname.slice(11));
    }, []);

    const examRef = collection(db, `exams/${subject}/exams`);
    const questionRef = collection(db, `questions/${subject}/questions`);
    const getExam = async () => {
        try {
            const listExam = [];
            const questionID = [];
            const queryExamSnapshot = await getDocs(examRef);
            queryExamSnapshot.forEach((doc) => {
                const data = doc.data().question;
            });


        } catch (err) {
            throw err;
        }
    };
    getExam();
    return (
        <div className="flex flex-wrap justify-around">
            <div className=" card card-side bg-slate-200 shadow-xl mx-2 my-2 px-10">
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
