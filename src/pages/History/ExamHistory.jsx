import React, { useState, useEffect } from "react";
import { auth, db } from "../../firebase/config";
import { getDocs, collection, query } from "firebase/firestore";
import { useAppContext } from "../../context/AppProvider";
import { Link } from "react-router-dom";
import { setPageLoading } from "../../redux/loadingSlice";
import { useDispatch } from "react-redux";
function ExamHistory() {
    const { setNavTitle } = useAppContext();
    const dispatch = useDispatch();
    const [quizzHistory, setQuizzHistory] = useState();
    const [list, setList] = useState(false);

    useEffect(() => {
        setNavTitle("Lịch sử làm bài");
    }, []);

    useEffect(() => {
        dispatch(setPageLoading(10));
        const getHistory = async () => {
            const arr = [];
            const q = query(collection(db, `histories/${auth.currentUser.uid}/exams`));
            const querySnapShot = await getDocs(q);

            dispatch(setPageLoading(30));
            querySnapShot.forEach((doc) => {
                arr.push({ ...doc.data(), id: doc.id });
            });
            dispatch(setPageLoading(50));
            setQuizzHistory(arr);
            dispatch(setPageLoading(100));
            if (arr.length === 0) {
                setList(true);
            } else {
                setList(false);
            }
        };
        getHistory();
    }, []);

    return (
        <>
            {list ? (
                <div className="font-mono text-3xl flex justify-center items-center mt-96 pt-5 font-semibold">
                    <p className="">Bạn chưa làm bài kiểm tra nào cả</p>
                </div>
            ) : (
                <div>
                    <div className="overflow-x-auto flex justify-center">
                        <table className="table w-3/4">
                            {/* head */}
                            <thead className="text-center">
                                <tr>
                                    <th>TÊN BÀI THI</th>
                                    <th>THỜI GIAN</th>
                                    <th>SỐ CÂU HỎI</th>
                                    <th>SỐ CÂU TRẢ LỜI ĐÚNG</th>
                                    <th>ĐIỂM</th>
                                    <th>CHI TIẾT</th>
                                </tr>
                            </thead>
                            {quizzHistory?.map((item, index) => (
                                <tbody key={index} className="text-center">
                                    <tr>
                                        <th>{item.examName}</th>
                                        <td>{item.time} phút</td>
                                        <td>{item.numberQuestion}</td>
                                        <td>{item.correctAnswer}</td>
                                        <td>{item.calScore}</td>
                                        <td>
                                            <Link to={`/user/exam-history/${item.id}`}>
                                                <button className="btn btn-outline btn-error rounded-full border-none font-bold">
                                                    XEM CHI TIẾT
                                                </button>
                                            </Link>
                                        </td>
                                    </tr>
                                </tbody>
                            ))}
                        </table>
                    </div>
                </div>
            )}
        </>
    );
}

export default ExamHistory;
