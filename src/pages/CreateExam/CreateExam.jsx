import React, { useState, useEffect } from "react";
import { auth, db } from "../../firebase/config";
import { query, where, getDocs, addDoc, collection } from "firebase/firestore";
import { useAppContext } from "../../context/AppProvider";
export default function CreateExam() {
    const [examName, setExamName] = useState("");
    const [time, setTime] = useState("");
    const [numberQuestion, setNumberQuestion] = useState("");
    const [subject, setSubject] = useState("Toán");
    const [className, setclassName] = useState("");

    const examRef = collection(db, "exams", `${subject}/exam`);

    const createExam = async () => {
        try {
            const exam = [];
            const querySnapshot = await getDocs(
                collection(db, `questions/${subject}/questions`),
                where("subject", "==", subject),
                where("className", "==", className)
            );

            querySnapshot.forEach((doc) => {
                exam.push({ ...doc.data, id: doc.id });
            });

            await addDoc(examRef, {
                examName,
                time,
                numberQuestion,
                subject,
                className,
                question: [...exam].sort(() => -0.5 + Math.random()).slice(0, numberQuestion),
            });
        } catch (err) {
            throw err;
        }
    };

    const { setNavTitle } = useAppContext();
    useEffect(() => {
        setNavTitle("Tạo đề thi");
    }, []);

    return (
        <div className=" container overflow-hidden">
            <div className="mx-20 mt-10">
                <div className="mx-2 mt-2 px-2 form-control w-full max-w-xs">
                    <label className="label font-bold">
                        <span className="label-text">Tên đề thi</span>
                    </label>
                    <input
                        type="text"
                        placeholder="Tên đề thi"
                        className="input input-bordered w-full max-w-xs"
                        onChange={(e) => setExamName(e.target.value)}
                    />
                </div>
                <div className="mx-2 px-2  form-control w-full max-w-xs">
                    <label className="label font-bold">
                        <span className="label-text">Thời gian</span>
                    </label>
                    <input
                        type="text"
                        placeholder="Thời gian kiểm tra"
                        className="input input-bordered w-full max-w-xs"
                        onChange={(e) => setTime(e.target.value)}
                    />
                </div>
                <div className="mx-2 px-2  form-control w-full max-w-xs">
                    <label className="label font-bold">
                        <span className="label-text">Số lượng câu hỏi</span>
                    </label>
                    <input
                        type="text"
                        placeholder="Số lượng câu hỏi"
                        className="input input-bordered w-full max-w-xs"
                        onChange={(e) => setNumberQuestion(e.target.value)}
                    />
                </div>
                <div className="mx-4  mt-4 mb-2 py-2 w-[304px]">
                    <select
                        defaultValue={"DEFAULT"}
                        className="select select-accent w-full max-w-xs"
                        onChange={(e) => setSubject(e.target.value)}
                    >
                        <option value="DEFAULT" disabled selected>
                            Chọn môn học
                        </option>
                        <option value={"math"}>Toán</option>
                        <option value={"physic"}>Vật Lý</option>
                        <option value={"chemistry"}>Hóa Học</option>
                        <option value={"english"}>Tiếng Anh</option>
                        <option value={"morality"}>Giáo Dục Công Dân</option>
                        <option value={"geography"}>Địa Lý</option>
                    </select>
                </div>
                <div className="mx-4  mt-4 mb-2 py-2 w-[304px]">
                    <select
                        defaultValue={"DEFAULT"}
                        className="select select-accent w-full max-w-xs"
                        onChange={(e) => setclassName(e.target.value)}
                    >
                        <option value="DEFAULT" disabled selected>
                            Chọn lớp
                        </option>
                        <option value={"10"}>10</option>
                        <option value={"11"}>11</option>
                        <option value={"12"}>12</option>
                    </select>
                </div>
                {/* <div className="mx-4 my-2 py-2 w-[304px]">
                    <select
                        defaultValue={"DEFAULT"}
                        className="select select-accent w-full max-w-xs"
                        // onChange={(e) => setDifficult(e.target.value)}
                    >
                        <option value="DEFAULT" disabled selected>
                            Chọn độ khó
                        </option>
                        <option>Dễ</option>
                        <option>Trung Bình</option>
                        <option>Khó</option>
                    </select>
                </div> */}
                <button
                    onClick={createExam}
                    className="mx-4 my-2 btn btn-outline btn-success w-[200px]"
                >
                    Thêm đề thi
                </button>
            </div>
        </div>
    );
}
