import React, { useState, useEffect } from "react";
import { auth, db } from "../../firebase/config";
import { getDocs, doc, collection, where, setDoc, getDoc, updateDoc } from "firebase/firestore";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../redux/authSlice";
import { useAppContext } from "../../context/AppProvider";
import { setPageLoading } from "../../redux/loadingSlice";
import { useNavigate } from "react-router-dom";
import { BsCoin } from "react-icons/bs";

function ListExam() {
    const { id } = useParams();
    const { setNavTitle } = useAppContext();
    const [listExam, setListExam] = useState();
    const [loading, setLoading] = useState();
    const [check, setCheck] = useState();
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const user = useSelector((state) => state.authSlice.user);
    useEffect(() => {
        //Lấy danh sách bài kiểm tra
        const examRef = collection(db, `exams/${id}/exams`);
        const getExam = async () => {
            try {
                dispatch(setPageLoading(10));
                const arr = [];
                const q = await getDocs(examRef);
                q.forEach((doc) => {
                    arr.push({ ...doc.data(), id: doc.id });
                });
                dispatch(setPageLoading(30));
                setListExam(arr);
                if (arr.length === 0) {
                    setCheck(true);
                } else {
                    setCheck(false);
                }
                dispatch(setPageLoading(70));
            } catch (err) {
                throw err;
            }
            dispatch(setPageLoading(100));
        };
        setNavTitle(`Danh sách bài kiểm tra`);
        getExam();
    }, []);

    const startExam = async (examID) => {
        try {
            const q = [];
            const userRef = doc(db, "users", auth.currentUser.uid);
            const examRef = doc(db, "exams", `${id}/exams/${examID}`);
            const historyRef = doc(db, "histories", `${auth.currentUser.uid}/exams/${examID}`);
            const exam = await getDoc(examRef);

            //tạo lịch sử làm bài
            await setDoc(historyRef, {
                ...exam.data(),
                className: exam.data().className,
                examName: exam.data().examName,
                numberQuestion: exam.data().question.length,
                subject: exam.data().subject,
                time: exam.data().time,
                question: exam.data().question.map((q, i) => ({
                    ...q,
                    index: i + 1,
                })),
            });

            //trạng thái của user lúc làm bài
            const isTakingTest = {
                status: true,
                examName: exam.data().examName,
                time: exam.data().time,
                examID,
            };

            //update trạng thái user
            await updateDoc(userRef, { isTakingTest });
            dispatch(setUser({ ...user, isTakingTest }));
            // setNavTitle(user?.isTakingTest.examName);
            navigate(`/user/test/${examID}`);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <>
            {check ? (
                <div className="flex font-mono justify-center items-center mt-96 pt-5 font-semibold ">
                    <img
                        src={require("../../assets/Img/page.png")}
                        alt="notfound"
                        className="w-1/12"
                    />
                    <p className="text-3xl ml-4">Không có bài kiểm tra nào cả</p>
                </div>
            ) : (
                <div className="flex flex-wrap justify-center mt-10 ">
                    {listExam?.map((item) => {
                        return (
                            <div
                                key={item.id}
                                className="max-w-[450px] card card-side bg-red-100 shadow-xl mx-2 my-2 px-10 "
                            >
                                <figure className="w-40">
                                    <img
                                        src="https://cdn.discordapp.com/attachments/941695759764553778/1083601370562711612/exam.png"
                                        alt="exam"
                                    />
                                </figure>
                                <div className="card-body px-2">
                                    <h2 className="card-title font-bold">{item.examName}</h2>
                                    <div className="font-medium">
                                        <p className="my-2">Lớp: {item.className}</p>
                                        <p className="my-2">Thời gian làm bài: {item.time} phút</p>
                                        <p className="my-2">
                                            Số lượng câu hỏi: {item.numberQuestion} câu
                                        </p>
                                        {/* <p className="my-2">
                                            Coin: {item.coin} <BsCoin className="inline" />
                                        </p> */}
                                    </div>
                                    <div
                                        className="card-actions justify-center mt-4"
                                        onClick={() => startExam(item.id)}
                                    >
                                        <Link
                                        // to={`/user/test/${item.id}`}
                                        >
                                            <button className="btn btn-primary">Bắt đầu làm</button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </>
    );
}

export default ListExam;
