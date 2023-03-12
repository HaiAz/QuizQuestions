import React, { useState, useEffect } from "react";
import { useAppContext } from "../../context/AppProvider";
import { addDoc, collection } from "firebase/firestore";
import { auth, db } from "../../firebase/config";

export default function AddQuestion() {
    const [question, setQuestion] = useState("");
    const [answer1, setAnswer1] = useState("");
    const [answer2, setAnswer2] = useState("");
    const [answer3, setAnswer3] = useState("");
    const [answer4, setAnswer4] = useState("");
    const [correctAnswer, setCorrectAnswer] = useState("");
    const [difficult, setDifficult] = useState(null);
    const [subject, setSubject] = useState(null);
    const [className, setClassName] = useState("");

    const addQuestion = async () => {
        try {
            const questionRef = collection(db, `questions/${subject}/questions`);
            await addDoc(questionRef, {
                question,
                answer: [answer1, answer2, answer3, answer4],
                correctAnswer,
                difficult,
                subject,
                className,
            });
            setQuestion("");
            setAnswer1("");
            setAnswer2("");
            setAnswer3("");
            setAnswer4("");
            setCorrectAnswer("");
            setClassName("");
            alert("Thêm thành công!");
        } catch (err) {
            throw err;
        }
    };

    const { setNavTitle } = useAppContext();
    useEffect(() => {
        setNavTitle("Thêm câu hỏi");
    }, []);
    return (
        <div className="flex items-center">
            <div className="mx-4 my-4 w-[400px]">
                <div className="form-control mx-4 my-4">
                    <label htmlFor="" className="p-2 font-bold">
                        Câu hỏi{" "}
                    </label>
                    <textarea
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        cols={20}
                        rows={3}
                        type="text"
                        className="textarea textarea-bordered textarea-lg w-full max-w-lg textarea-primary"
                    />
                </div>
                <div className="form-control w-full max-w-xs mx-4 my-4">
                    <label className="label">
                        <span className="label-text font-bold">Nhập đáp án A</span>
                    </label>
                    <input
                        value={answer1}
                        onChange={(e) => setAnswer1(e.target.value)}
                        type="text"
                        placeholder="Đáp án A"
                        className="input input-bordered w-full max-w-xs input-info"
                    />
                </div>
                <div className="form-control w-full max-w-xs mx-4 my-4">
                    <label className="label">
                        <span className="label-text font-bold">Nhập đáp án B</span>
                    </label>
                    <input
                        value={answer2}
                        onChange={(e) => setAnswer2(e.target.value)}
                        type="text"
                        placeholder="Đáp án B"
                        className="input input-bordered w-full max-w-xs input-info"
                    />
                </div>
                <div className="form-control w-full max-w-xs mx-4 my-4">
                    <label className="label">
                        <span className="label-text font-bold">Nhập đáp án C</span>
                    </label>
                    <input
                        value={answer3}
                        onChange={(e) => setAnswer3(e.target.value)}
                        type="text"
                        placeholder="Đáp án C"
                        className="input input-bordered w-full max-w-xs input-info"
                    />
                </div>
                <div className="form-control w-full max-w-xs mx-4 my-4">
                    <label className="label">
                        <span className="label-text font-bold">Nhập đáp án D</span>
                    </label>
                    <input
                        value={answer4}
                        onChange={(e) => setAnswer4(e.target.value)}
                        type="text"
                        placeholder="Đáp án D"
                        className="input input-bordered w-full max-w-xs input-info"
                    />
                </div>
            </div>
            <div className="ml-20 px-4 w-1/2">
                <div className="mx-2 my-2 px-2 py-2 w-full">
                    <select
                        defaultValue={"DEFAULT"}
                        className="select select-accent w-full max-w-xs"
                        onChange={(e) => setDifficult(e.target.value)}
                    >
                        <option value="DEFAULT" disabled selected>
                            Chọn độ khó
                        </option>
                        <option>Dễ</option>
                        <option>Trung bình</option>
                        <option>Khó</option>
                    </select>
                </div>

                <div className="mx-2 my-2 px-2 py-2 w-full">
                    <select
                        defaultValue={"DEFAULT"}
                        className="select select-warning w-full max-w-xs"
                        onChange={(e) => setSubject(e.target.value)}
                    >
                        <option value="DEFAULT" disabled selected>
                            Chọn môn học
                        </option>
                        <option>Toán</option>
                        <option>Vật Lý</option>
                        <option>Hóa Học</option>
                        <option>Tiếng Anh</option>
                        <option>Giáo Dục Công Dân</option>
                        <option>Địa Lý</option>
                    </select>
                </div>

                <div className="form-control w-full max-w-xs mx-4 my-2 py-2">
                    <label className="label">
                        <span className="label-text font-bold">Lớp</span>
                    </label>
                    <input
                        value={className}
                        onChange={(e) => setClassName(e.target.value)}
                        type="text"
                        placeholder="Nhập tên lớp"
                        className="input input-bordered w-full max-w-xs input-secondary"
                    />
                </div>

                <div className="form-control w-full max-w-xs mx-4 my-2 py-2">
                    <label className="label">
                        <span className="label-text font-bold">Đáp án đúng</span>
                    </label>
                    <input
                        value={correctAnswer}
                        onChange={(e) => setCorrectAnswer(e.target.value)}
                        type="text"
                        placeholder="Đáp án đúng"
                        className="input input-bordered w-full max-w-xs input-error"
                    />
                </div>

                <button className="btn mx-4 my-2 px-8 py-3 " onClick={addQuestion}>
                    Thêm
                </button>
            </div>
        </div>
    );
}
