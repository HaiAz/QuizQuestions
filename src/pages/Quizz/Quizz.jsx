import React, { useState, useEffect } from "react";
import { AiOutlineFlag } from "react-icons/ai";
import { HiOutlineArrowSmLeft, HiOutlineArrowSmRight } from "react-icons/hi";
import { useParams, useNavigate } from "react-router-dom";
import { db, auth } from "../../firebase/config";
import { useDispatch, useSelector } from "react-redux";
import { useAppContext } from "../../context/AppProvider";
import { getDoc, doc, onSnapshot, setDoc } from "firebase/firestore";
export default function Quizz() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.authSlice.user);

    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [listQuestion, setListQuestion] = useState();
    const [filterQuestion, setFilterQuestion] = useState(listQuestion);
    const [yourSelected, setYourSelected] = useState();

    const { setNavTitle } = useAppContext();

    //Đang làm bài này thì không nhảy sang làm bài khác được
    // useEffect(() => {
    //     if (user?.isTakingTest.examID !== id) {
    //         navigate("/user");
    //     }
    // });
    const historyRef = doc(db, "histories", `${auth.currentUser.uid}/exams/${id}`);

    //Lấy danh sách câu hỏi bài kiểm tra
    useEffect(() => {
        const unsubcribe = onSnapshot(historyRef, (doc) => {
            if (doc.exists()) {
                setListQuestion({ ...doc.data() });
            }
        });
        return () => unsubcribe();
    }, []);

    //Cập nhật real time câu hỏi và đáp án trả lời khi người dùng chọn
    const selectedAnswer = (questionID, selectedAnswer) => {
        const list = {
            ...listQuestion,
            question: listQuestion.question.map((q) =>
                q.id === questionID ? { ...q, yourChoice: selectedAnswer } : q
            ),
        };
        setFilterQuestion(list);
        const examRef = doc(db, "histories", `${auth.currentUser.uid}/exams/${id}`);
        setDoc(examRef, list);
    };

    // const handleFilterListQuestion = (e) => {
    //     switch (e) {
    //         case "all":

    //     }
    // }

    //Chuyển tiếp câu hỏi
    const handleNextQuestion = (e) => {
        console.log(listQuestion.numberQuestion);
        if (currentQuestion >= listQuestion.numberQuestion - 1) {
            e.preventDefault();
            alert("hết rồi");
            return;
        } else {
            setCurrentQuestion(currentQuestion + 1);
        }
    };

    //Quay lại câu hỏi trước đó
    const handlePreQuestion = (e) => {
        if (currentQuestion > 0) {
            setCurrentQuestion(currentQuestion - 1);
        } else {
            e.preventDefault();
            return;
        }
    };

    return (
        <div className="w-full h-full overflow-hidden ">
            <div className="flex flex-col justify-center items-start ml-8 mt-4">
                <div className="text-2xl">
                    {"Câu" +
                        ` ${currentQuestion + 1}: ` +
                        listQuestion?.question[currentQuestion].question}
                </div>
                <div className="flex flex-col mt-2">
                    {listQuestion?.question[currentQuestion].answer.map((answer, index) => (
                        <div className="my-2" key={answer.id}>
                            <input
                                type="radio"
                                name="radio-101"
                                value={answer}
                                checked={
                                    listQuestion.question[currentQuestion].yourChoice === answer
                                }
                                onChange={(e) =>
                                    selectedAnswer(
                                        listQuestion?.question[currentQuestion].id,
                                        e.target.value
                                    )
                                }
                                className="radio radio-success"
                            />
                            <span className="ml-3 text-xl">{answer}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex ml-12 mt-12 text-xl">
                <span className="mr-8">Phân vân</span>
                <AiOutlineFlag className="text-3xl" />
            </div>

            <div className="flex justify-center items-center">
                <div className="flex justify-center items-center mx-4 my-2 px-4 py-2">
                    <button
                        className={`btn btn-info btn-outline text-2xl mx-4 my-2 ${
                            currentQuestion <= 0 && "btn-disabled"
                        }`}
                    >
                        <span className="pr-3" onClick={(e) => handlePreQuestion(e)}>
                            Back
                        </span>
                        <HiOutlineArrowSmLeft />
                    </button>
                </div>
                <div className="flex justify-center items-center mx-4 my-2 px-4 py-2">
                    <button
                        className={`btn btn-info btn-outline text-2xl mx-4 my-2 ${
                            currentQuestion >= listQuestion?.question.length - 1 && "btn-disabled"
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
    );
}
