import React, { useState, useEffect } from "react";
import { useAppContext } from "../../context/AppProvider";
import { addDoc, collection } from "firebase/firestore";
import { auth, db } from "../../firebase/config";
import { useWindowSize } from "../../hooks/useWindowSize";

export default function AddQuestion() {
    const [question, setQuestion] = useState("");
    const [answer1, setAnswer1] = useState("");
    const [answer2, setAnswer2] = useState("");
    const [answer3, setAnswer3] = useState("");
    const [answer4, setAnswer4] = useState("");
    const [correctAnswer, setCorrectAnswer] = useState("");
    const [difficult, setDifficult] = useState(null);
    const [subject, setSubject] = useState();
    const [className, setClassName] = useState("");
    const [suggest, setSuggest] = useState("");
    const handleResize = useWindowSize();
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
                suggest,
            });
            setQuestion("");
            setAnswer1("");
            setAnswer2("");
            setAnswer3("");
            setAnswer4("");
            setCorrectAnswer("");
            setClassName("");
            setSuggest("");
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
        <div className={`${handleResize.width > 1024 ? `flex justify-evenly items-center` : ``}`}>
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
                <div className="form-control w-full max-w-xs mx-4 my-4">
                    <label className="label">
                        <span className="label-text font-bold">Gợi ý</span>
                    </label>
                    <input
                        value={suggest}
                        onChange={(e) => setSuggest(e.target.value)}
                        type="text"
                        placeholder="Gợi ý"
                        className="input input-bordered w-full max-w-xs input-accent"
                    />
                </div>
            </div>
            <div className="mx-4">
                <div className="form-control w-[320px] max-w-xs mx-4 my-2 py-2">
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
                <div className="mx-2 my-2 px-2 py-2 w-full">
                    <select
                        defaultValue={"DEFAULT"}
                        className="select select-accent w-full max-w-xs text-center font-mono font-semibold"
                        onChange={(e) => setDifficult(e.target.value)}
                    >
                        <option value="DEFAULT" disabled selected hidden>
                            Chọn độ khó
                        </option>
                        <option value={"easy"}>Dễ</option>
                        <option value={"medium"}>Trung bình</option>
                        <option value={"hard"}>Khó</option>
                    </select>
                </div>

                <div className="mx-2 my-2 px-2 py-2 w-full ">
                    <select
                        defaultValue={"DEFAULT"}
                        className="select select-warning w-full max-w-xs text-center font-semibold font-mono"
                        onChange={(e) => setSubject(e.target.value)}
                    >
                        <option value="DEFAULT" disabled selected hidden>
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

                <button className="btn mx-4 my-2 px-8 py-3 " onClick={addQuestion}>
                    Thêm
                </button>
            </div>
        </div>
    );
}
