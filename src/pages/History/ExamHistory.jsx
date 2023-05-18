import React, { useState, useEffect } from "react";
import { auth, db } from "../../firebase/config";
import { useSelector, useDispatch } from "react-redux";
import { getDocs, doc, collection, query } from "firebase/firestore";
import { useAppContext } from "../../context/AppProvider";
import { Link } from "react-router-dom";
function ExamHistory() {
    const { setNavTitle } = useAppContext();
    const [quizzHistory, setQuizzHistory] = useState();

    useEffect(() => {
        setNavTitle("Lịch sử làm bài");
    }, []);

    useEffect(() => {
        const getHistory = async () => {
            const arr = [];
            const q = query(collection(db, `histories/${auth.currentUser.uid}/exams`));
            const querySnapShot = await getDocs(q);
            querySnapShot.forEach((doc) => {
                arr.push({ ...doc.data(), id: doc.id });
            });
            setQuizzHistory(arr);
        };
        getHistory();
    }, []);

    return (
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
                            {/* <th>CHI TIẾT</th> */}
                        </tr>
                    </thead>
                    {quizzHistory?.map((item, index) => (
                        <tbody key={index} className="text-center">
                            <tr>
                                <th>{item.examName}</th>
                                <td>{item.time}</td>
                                <td>{item.numberQuestion}</td>
                                <td>{item.correctAnswer}</td>
                                <td>{item.calScore}</td>
                                {/* <td>
                                    <Link to={`/user/exam-history/${item.id}`}>
                                        <button className="btn btn-outline btn-error rounded-full border-none">
                                            XEM CHI TIẾT
                                        </button>
                                    </Link>
                                </td> */}
                            </tr>
                        </tbody>
                    ))}
                </table>
            </div>
        </div>
    );
}

export default ExamHistory;
