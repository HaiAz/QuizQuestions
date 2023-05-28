import React, { useState, useEffect } from "react";
import Toast from "../../components/Toast/Toast";
import Countdown from "../../components/Countdown/Countdown";
import { doc, getDocument, onSnapshot, setDoc, updateDoc } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";
import { useAppContext } from "../../context/AppProvider";
import { useSelector, useDispatch } from "react-redux";
import { auth, db } from "../../firebase/config";
import { setUser } from "../../redux/authSlice";

function ListSubject() {
    const [show, setShow] = useState(true);
    const [listQuestion, setListQuestion] = useState();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.authSlice.user);
    const { setNavTitle } = useAppContext();

    const currentTime = new Date().getTime() / 1000;

    const listSubject = [
        {
            id: "math",
            name: "Toán học",
            img: require("../../assets/Img/math.png"),
        },
        {
            id: "physic",
            name: "Vật lý",
            img: require("../../assets/Img/physic.png"),
        },
        {
            id: "chemistry",
            name: "Hoá học",
            img: require("../../assets/Img/chemistry.png"),
        },
        {
            id: "english",
            name: "Tiếng anh",
            img: require("../../assets/Img/united-kingdom.png"),
        },
        {
            id: "morality",
            name: "Giáo dục công dân",
            img: require("../../assets/Img/morality.png"),
        },
        {
            id: "geography",
            name: "Địa Lý",
            img: require("../../assets/Img/globe.png"),
        },
    ];

    useEffect(() => {
        setNavTitle("Danh sách môn học");
    }, []);

    useEffect(() => {
        const unsubcribe = onSnapshot(
            doc(db, "histories", `${user.uid}/exams/${user?.isTakingTest?.examID}`),
            (doc) => {
                setListQuestion({ ...doc.data(), id: doc.id });
            }
        );
        return () => unsubcribe();
    }, []);

    useEffect(() => {
        const unsubcribe1 = onSnapshot(doc(db, "users", `${user.uid}`), (doc) => {
            dispatch(setUser({ ...doc.data() }));
        });
        return () => unsubcribe1();
    }, []);

    const finish = async () => {
        const historyRef = doc(db, "histories", `${user.uid}/exams/${user?.isTakingTest.examID}`);
        const userRef = doc(db, "users", user.uid);

        const pointPerQuestion = listQuestion?.numberQuestion / 10;
        const correctAnswer =
            listQuestion?.question?.filter((q) => q.yourChoice === q.correctAnswer).length ?? 0;
        const calScore = (correctAnswer * pointPerQuestion).toFixed(3);

        await setDoc(historyRef, {
            ...listQuestion,
            calScore,
            correctAnswer,
            isDone: true,
        });

        await updateDoc(userRef, { isTakingTest: {} });
        navigate(`/user/exam-history`);
    };

    return (
        <div className="flex justify-center items-center flex-col container">
            <div className="container flex flex-row flex-wrap gap-8 justify-center item md:justify-center p-8">
                {listSubject.map((item) => {
                    return (
                        <div
                            key={item.id}
                            className="card w-72 bg-base-100 shadow-lg shadow-red-300"
                        >
                            <figure className="px-10 pt-10">
                                <img src={item.img} alt={item.name} className="rounded-xl" />
                            </figure>
                            <div className="card-body items-center text-center">
                                <h2 className="card-title">{item.name}</h2>
                                <div className="card-actions">
                                    <Link to={`/user/exam/${item.id}`} className="btn btn-primary">
                                        Challenge me!
                                    </Link>
                                </div>
                            </div>
                        </div>
                    );
                })}
                {user?.isTakingTest?.status && (
                    <div className="toast toast-top toast-end top-16 right-10">
                        <div className="alert bg-base-300 rounded-3xl">
                            <div className="flex font-mono font-semibold items-center">
                                <div className="flex flex-col justify-center items-center mx-2 ">
                                    <span className="block">
                                        Bài kiểm tra: {user?.isTakingTest?.examName}
                                    </span>
                                    <button className="btn btn-ghost btn-outline text-black my-4 rounded-2xl">
                                        <Link
                                            to={`/user/test/${user?.isTakingTest?.examID}`}
                                            className=""
                                        >
                                            Tiếp tục làm bài!
                                        </Link>
                                    </button>
                                </div>
                                <Countdown
                                    startAt={currentTime}
                                    endAt={user?.isTakingTest.expiredTime}
                                    finish={finish}
                                />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ListSubject;
