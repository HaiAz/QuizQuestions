import React, { useState, useEffect } from "react";
import { auth, db } from "../../firebase/config";
import { getDoc, doc } from "firebase/firestore";
import { useAppContext } from "../../context/AppProvider";
import { Link } from "react-router-dom";
import { useParams, useNavigate } from "react-router-dom";
import { HiOutlineArrowSmLeft, HiOutlineArrowSmRight } from "react-icons/hi";
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from "react-icons/ai";

const Question = ({ currentQuestion, listQuestion }) => {
    return (
        <div className="flex flex-col justify-center items-start ml-8 mt-4">
            <div className="text-2xl">
                {"Câu" +
                    ` ${currentQuestion}: ` +
                    listQuestion?.question[currentQuestion - 1]?.question}
            </div>
            <div className="flex flex-col mt-2">
                {listQuestion?.question[currentQuestion - 1]?.answer.map((a, index) => (
                    <div>
                        <div className="my-2" key={index}>
                            <input
                                type="radio"
                                name="radio-101"
                                value={a}
                                checked={
                                    listQuestion.question[currentQuestion - 1].yourChoice === a
                                }
                                className="radio radio-success"
                            />
                            <span className="ml-3 text-xl">{a}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const FilterQuestion = ({ handleChangeFilter }) => {
    return (
        <select
            defaultValue={"all"}
            onChange={(e) => handleChangeFilter(e.target.value)}
            className="w-[172px] text-center select select-bordered max-w-md select-sm mb-2"
        >
            <option value="all" selected>
                Tất cả
            </option>
            <option value="correct">Câu trả lời đúng</option>
            <option value="incorrect">Câu trả lời sai</option>
            <option value="uncompleted">Chưa làm</option>
        </select>
    );
};

function ExamResult() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [listQuestion, setListQuestion] = useState();
    const [currentQuestion, setCurrentQuestion] = useState(1);
    const [filterQuestion, setFilterQuestion] = useState(listQuestion);
    const [loading, setLoading] = useState(true);
    const { setNavTitile } = useAppContext();

    //Lấy dữ liệu bài kiểm tra tương ứng
    useEffect(() => {
        const getListQuestion = async () => {
            const docRef = doc(db, "histories", `${auth.currentUser.uid}/exams/${id}`);
            const docSnap = await getDoc(docRef);
            setListQuestion(123456);
            setListQuestion({ ...docSnap.data() });
        };
        getListQuestion();
        setLoading(false);
    }, [id]);
    //Back và Next Question
    const handleNextQuestion = (e) => {
        if (currentQuestion >= listQuestion.numberQuestion) {
            e.preventDefault();
            return;
        } else {
            setCurrentQuestion(currentQuestion + 1);
        }
    };

    const handlePrevQuestion = (e) => {
        if (currentQuestion <= 1) {
            e.preventDefault();
            return;
        } else {
            setCurrentQuestion(currentQuestion - 1);
        }
    };

    //Filter questions
    const handleChangeFilterQuestion = (filterValue) => {
        switch (filterValue) {
            case "all":
                setFilterQuestion(listQuestion);
                setCurrentQuestion(listQuestion.question[0].index);
                break;

            case "correct":
                setFilterQuestion({
                    ...listQuestion,
                    question: listQuestion.question.filter((q) => q.correctAnswer === q.yourChoice),
                });
                setCurrentQuestion(
                    listQuestion.question.filter((q) => q.correctAnswer === q.yourChoice)[0].index
                );
                break;

            case "incorrect":
                setFilterQuestion({
                    ...listQuestion,
                    question: listQuestion.question.filter(
                        (q) => q.correctAnswer !== q.yourChoice && !!q.yourChoice
                    ),
                });
                setCurrentQuestion(
                    listQuestion.question.filter((q) => q.correctAnswer !== q.yourChoice)[0].index
                );
                break;

            case "uncompleted":
                setFilterQuestion(listQuestion.question.filter((q) => !!!q.yourChoice));
                setCurrentQuestion(listQuestion.question.filter((q) => !!!q.yourChoice)[0].index);
                break;

            default:
                break;
        }
    };
    return (
        <>
            {loading ? (
                <div>loading...</div>
            ) : (
                <div className="w-full h-full overflow-hidden flex justify-end">
                    {/* Nếu có thì mới render */}

                    <div className="flex-1 ">
                        {/* <div className="flex flex-col justify-center items-start ml-8 mt-4">
                                <div className="text-2xl">
                                    {"Câu" +
                                        ` ${currentQuestion}: ` +
                                        listQuestion?.question[currentQuestion - 1]?.question}
                                </div>
                                <div className="flex flex-col mt-2">
                                    {listQuestion?.question[currentQuestion - 1]?.answer.map(
                                        (a, index) => (
                                            <div>
                                                <div className="my-2" key={index}>
                                                    <input
                                                        type="radio"
                                                        name="radio-101"
                                                        value={a}
                                                        checked={
                                                            listQuestion.question[
                                                                currentQuestion - 1
                                                            ].yourChoice === a
                                                        }
                                                        className="radio radio-success"
                                                    />
                                                    <span className="ml-3 text-xl">{a}</span>
                                                </div>
                                            </div>
                                        )
                                    )}
                                </div>
                            </div> */}
                        <Question currentQuestion={currentQuestion} listQuestion={listQuestion} />

                        {/* Back và Next button */}
                        <div className="flex justify-start items-center">
                            <div className="flex justify-center items-center mx-4 my-2 px-4 py-2">
                                <button
                                    className={`btn btn-info btn-outline text-2xl mx-4 my-2 ${
                                        currentQuestion <= 1 && "btn-disabled"
                                    }`}
                                >
                                    <span className="pr-3" onClick={(e) => handlePrevQuestion(e)}>
                                        Back
                                    </span>
                                    <HiOutlineArrowSmLeft />
                                </button>
                            </div>
                            <div className="flex justify-center items-center mx-4 my-2 px-4 py-2">
                                <button
                                    className={`btn btn-info btn-outline text-2xl mx-4 my-2 ${
                                        currentQuestion >= listQuestion?.question.length &&
                                        "btn-disabled"
                                    }`}
                                >
                                    <HiOutlineArrowSmRight />
                                    <span className="pl-3" onClick={(e) => handleNextQuestion(e)}>
                                        Next
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* right side bar */}
                    <div className="flex flex-col w-[500px] h-screen text-lg shadow-xl">
                        <div className="flex flex-col justify-center items-center mt-8 pt-8">
                            <span className="mx-4 block my-4">
                                Số câu đã làm:{" "}
                                {listQuestion?.question.filter((q) => !!q?.yourChoice).length} /{" "}
                                {listQuestion?.question.length}
                            </span>
                            <span className="mx-4 block my-4">Lọc danh sách</span>

                            <FilterQuestion handleChangeFilter={handleChangeFilterQuestion} />
                        </div>
                        <div
                            className={`w-[90%] min-h-0 max-h-[300px] mt-5 pt-5 mx-auto flex justify-around flex-wrap font-mono ${
                                listQuestion?.question.numberQuestion >= 20 ? "overflow-scroll" : ""
                            }`}
                        >
                            {filterQuestion?.question.map((q, i) => (
                                <div className="mx-2" key={i}>
                                    <button
                                        className={`btn btn-outline mx-2 my-2 px-2 py-2 w-16 
                            ${q.yourChoice === q.correctAnswer ? "btn-primary" : ""} 
                            `}
                                        onClick={() => setCurrentQuestion(q.index)}
                                    >
                                        Câu {q.index}{" "}
                                        {q.yourChoice === q.correctAnswer ? (
                                            <div className="text-red-600">
                                                <AiOutlineCheckCircle />
                                            </div>
                                        ) : (
                                            <div className="text-black">
                                                <AiOutlineCloseCircle />
                                            </div>
                                        )}
                                    </button>
                                </div>
                            ))}
                        </div>

                        <div className="mt-10 pt-4 mx-auto shadow-sm">
                            <button
                                className="btn btn-outline btn-info"
                                onClick={() => navigate("/user/exam-history")}
                            >
                                Quay lại
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default ExamResult;
