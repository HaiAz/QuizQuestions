import React, { useState, useEffect } from "react";
import { AiOutlineFlag } from "react-icons/ai";
import { HiOutlineArrowSmLeft, HiOutlineArrowSmRight } from "react-icons/hi";
import { useParams, useNavigate } from "react-router-dom";
import { db, auth } from "../../firebase/config";
import { useDispatch, useSelector } from "react-redux";
import { useAppContext } from "../../context/AppProvider";
import { getDoc, doc, onSnapshot } from "firebase/firestore";
export default function Quizz() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.authSlice.user);

    const [currentQuestion, setCurrentQuestion] = useState(1);
    const [listQuestion, setListQuestion] = useState();
    const [filterQuestion, setFilterQuestion] = useState(listQuestion);
    const [answer, setAnswer] = useState();

    const { setNavTitle } = useAppContext();

    //Đang làm bài này thì không nhảy sang làm bài khác được
    // useEffect(() => {
    //     if (user?.isTakingTest.examID !== id) {
    //         navigate("/user");
    //     }
    // });

    useEffect(() => {
        const getExam = async () => {
            const historyRef = await doc(db, "histories", `${auth.currentUser.uid}/exams/${id}`);
            const history = await onSnapshot(historyRef, (doc) => {
                setListQuestion({ ...doc.data() });
            });

            // const questionRef = doc(db, "questions", `${history.subject}/questions/`);
            // console.log(listQuestion);
        };
        getExam();
    }, []);

    console.log(listQuestion);
    return (
        <div className="w-full h-screen overflow-hidden ">
            <div className="flex flex-col justify-center items-start ml-8 mt-4">
                {listQuestion?.question.map((e) => (
                    <div>
                        <h1 className="text-2xl">Câu {e.index + ": " + e.question} </h1>
                        <div className="flex mt-6">
                            <input type="radio" name="radio-5" className="radio radio-success" />
                            {/* {listQuestion?.question?.answer.map((answer) => (
                                <span className="ml-3 text-xl">{answer}</span>
                            ))} */}
                        </div>
                    </div>
                ))}
                {/* <h1 className="text-3xl">Câu 1</h1> */}

                {/* <div className="flex mt-6">
                    <input type="radio" name="radio-5" className="radio radio-success" />
                    <span className="ml-3 text-xl">2 3 con vịt, em cho anh thịt</span>
                </div>
                <div className="flex mt-6">
                    <input type="radio" name="radio-5" className="radio radio-success" />
                    <span className="ml-3 text-xl">2 3 con vịt, em cho anh thịt</span>
                </div>
                <div className="flex mt-6">
                    <input type="radio" name="radio-5" className="radio radio-success" />
                    <span className="ml-3 text-xl">2 3 con vịt, em cho anh thịt</span>
                </div> */}
            </div>

            <div className="flex ml-12 mt-12 text-xl">
                <span className="mr-8">Phân vân</span>
                <AiOutlineFlag className="text-3xl" />
            </div>

            <div className="flex justify-center items-center">
                <div className="flex justify-center items-center mx-4 my-2 px-4 py-2">
                    <button className="btn btn-info btn-outline text-2xl mx-4 my-2">
                        <span className="pr-3">Back</span>

                        <HiOutlineArrowSmLeft />
                    </button>
                </div>
                <div className="flex justify-center items-center mx-4 my-2 px-4 py-2">
                    <button className="btn btn-info btn-outline text-2xl mx-4 my-2">
                        <HiOutlineArrowSmRight />
                        <span className="pl-3">Next</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
