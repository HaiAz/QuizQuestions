import React, { useState, useEffect } from "react";
import { AiOutlineFlag } from "react-icons/ai";
import { HiOutlineArrowSmLeft, HiOutlineArrowSmRight } from "react-icons/hi";
import { useParams, useNavigate } from "react-router-dom";
import { db, auth } from "../../firebase/config";
import { useDispatch, useSelector } from "react-redux";
import { useAppContext } from "../../context/AppProvider";
import { getDoc, doc, onSnapshot, setDoc, updateDoc } from "firebase/firestore";
export default function Quizz() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.authSlice.user);

    const [currentQuestion, setCurrentQuestion] = useState(1);
    const [listQuestion, setListQuestion] = useState();
    const [filterQuestion, setFilterQuestion] = useState(listQuestion);
    const [yourSelected, setYourSelected] = useState();

    const { setNavTitle } = useAppContext();

    // Đang làm bài này thì không nhảy sang làm bài khác được
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

    //Câu hỏi phân vân
    const toggleFlag = async (questionID) => {
        const list = {
            ...listQuestion,
            question: listQuestion?.question.map((q) =>
                q.id === questionID ? { ...q, flag: !q.flag ?? true } : q
            ),
        };
        setFilterQuestion(list);
        const examRef = doc(db, "histories", `${auth.currentUser.uid}/exams/${id}`);
        await setDoc(examRef, list);
    };

    //Sắp xếp danh sách câu hỏi
    const handleFilterListQuestion = (e) => {
        switch (e) {
            case "all":
                setFilterQuestion(listQuestion);
                setCurrentQuestion(listQuestion.question[0].index);
                break;
            case "done":
                setFilterQuestion({
                    ...filterQuestion,
                    question: listQuestion.question.filter((q) => q.yourChoice),
                });
                setCurrentQuestion(listQuestion.question.filter((q) => q.yourChoice)[0]?.index);
                break;
            case "undone":
                setFilterQuestion({
                    ...filterQuestion,
                    question: listQuestion.question.filter((q) => !!q.yourChoice === false),
                });
                setCurrentQuestion(
                    listQuestion.question.filter((q) => !!q.yourChoice === false)[0]?.index
                );
                break;
            case "flag":
                setFilterQuestion({
                    ...filterQuestion,
                    question: listQuestion.question.filter((q) => !!q.flag),
                });
                setCurrentQuestion(listQuestion.question.filter((q) => !!q.flag)[0]?.index);
                break;
            default:
                break;
        }
    };

    //Set dữ liệu ban đầu cho filterQuestion
    useEffect(() => {
        const getData = async () => {
            const docRef = doc(db, "histories", `${auth.currentUser.uid}/exams/${id}`);
            const docSnap = await getDoc(historyRef);
            if (docSnap.exists()) {
                setFilterQuestion({ ...docSnap.data(), id: docSnap.id });
                setNavTitle(docSnap.data().examName);
            }
        };
        getData();
    }, []);

    //Chuyển tiếp câu hỏi
    const handleNextQuestion = (e) => {
        if (currentQuestion >= listQuestion?.numberQuestion) {
            e.preventDefault();
            return;
        } else {
            setCurrentQuestion(currentQuestion + 1);
        }
    };

    //Quay lại câu hỏi trước đó
    const handlePreQuestion = (e) => {
        if (currentQuestion >= 1) {
            setCurrentQuestion(currentQuestion - 1);
        } else {
            e.preventDefault();
            return;
        }
    };

    // nộp bài
    const finish = async () => {
        const userRef = doc(db, "users", `${auth.currentUser.uid}`);
        const historyRef = doc(db, "histories", `${auth.currentUser.uid}/exams/${id}`);

        const pointPerQuestion = 10 / listQuestion.numberQuestion;
        const correctAnswer = listQuestion.question.filter(
            (q) => q.correctAnswer === q.yourChoice
        ).length;
        const calScore = (pointPerQuestion * correctAnswer).toFixed(3);

        console.log("point:" + pointPerQuestion);
        console.log("correct: " + correctAnswer);
        console.log(calScore);

        await setDoc(historyRef, {
            ...listQuestion,
            calScore,
            correctAnswer,
        });

        await updateDoc(userRef, { isTakingTest: {} });
        navigate("/user/list-subjects");
    };
    return (
        <div className="w-full h-full overflow-hidden flex">
            {/* Nếu có thì mới render */}
            {!!filterQuestion?.question?.length && (
                <div className="flex-1 ">
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
                                                listQuestion.question[currentQuestion - 1]
                                                    .yourChoice === a
                                            }
                                            onChange={(e) =>
                                                selectedAnswer(
                                                    listQuestion?.question[currentQuestion - 1].id,
                                                    e.target.value
                                                )
                                            }
                                            className="radio radio-success"
                                        />
                                        <span className="ml-3 text-xl">{a}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Flag */}

                    <div className="flex ml-12 mt-12 text-xl">
                        <span className="mr-8">Phân vân</span>
                        <AiOutlineFlag
                            className={`text-3xl ${
                                listQuestion?.question[currentQuestion - 1].flag && "text-red-400"
                            }`}
                            onClick={() =>
                                toggleFlag(listQuestion?.question[currentQuestion - 1].id)
                            }
                        />
                    </div>

                    {/* Back và Next button */}
                    <div className="flex justify-start items-center">
                        <div className="flex justify-center items-center mx-4 my-2 px-4 py-2">
                            <button
                                className={`btn btn-info btn-outline text-2xl mx-4 my-2 ${
                                    currentQuestion <= 1 && "btn-disabled"
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
            )}

            {/* right side bar */}
            <div className="flex flex-col w-[500px] h-screen text-lg shadow-xl">
                <div className="flex flex-col justify-center items-center mt-8 pt-8">
                    <span className="mx-4 block my-4">
                        Số câu đã làm:{" "}
                        {listQuestion?.question.filter((q) => !!q?.yourChoice).length} /{" "}
                        {listQuestion?.question.length}
                    </span>
                    <span className="mx-4 block my-4">Lọc danh sách</span>
                    <select
                        defaultValue={"DEFAULT"}
                        onChange={(e) => handleFilterListQuestion(e.target.value)}
                        className="w-[172px] text-center select select-bordered max-w-md select-sm mb-2"
                    >
                        <option value="DEFAULT" disabled selected hidden>
                            Chọn phương thức
                        </option>
                        <option value={"all"}>Toàn bộ</option>
                        <option value={"done"}>Đã làm</option>
                        <option value={"undone"}>Chưa làm</option>
                        <option value={"flag"}>Phân vân</option>
                    </select>
                </div>
                <div className="overflow-scroll w-[90%] min-h-0 max-h-[300px] mt-5 pt-5 mx-auto flex justify-around flex-wrap font-mono">
                    {filterQuestion?.question.map((q, i) => (
                        <div className="mx-2" key={i}>
                            <button
                                className={`btn btn-outline mx-2 my-2 px-2 py-2 w-16 
                            ${q.yourChoice ? "btn-primary" : ""}
                            `}
                                onClick={() => setCurrentQuestion(q.index)}
                            >
                                Câu {q.index}
                            </button>
                        </div>
                    ))}
                </div>

                <div className="mt-10 pt-4 mx-auto shadow-sm">
                    <button className="btn btn-outline btn-info" onClick={() => finish()}>
                        Nộp bài
                    </button>
                </div>
            </div>
        </div>
    );
}
