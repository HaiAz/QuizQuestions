import React, { useState, useEffect } from "react";
import { auth, db } from "../../firebase/config";
import { getDocs, doc, collection, where, setDoc, getDoc } from "firebase/firestore";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
function ListExam() {
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [listExam, setListExam] = useState();
    // const [examID, setExamID] = useState();
    const [history, setHistory] = useState();

    useEffect(() => {
        //Lấy danh sách bài kiểm tra
        const examRef = collection(db, `exams/${id}/exams`);
        const getExam = async () => {
            try {
                const arr = [];
                const q = await getDocs(examRef);
                q.forEach((doc) => {
                    arr.push({ ...doc.data(), id: doc.id });
                });
                setListExam(arr);
                setLoading(false);
            } catch (err) {
                throw err;
            }
        };

        getExam();
    }, []);

    const startExam = async (examID) => {
        try {
            const arr = [];
            const examRef = doc(db, "exams", `${id}/exams/${examID}`);
            const historyRef = doc(db, "histories", `${auth.currentUser.uid}/exams/${examID}`);
            const getExam = await getDoc(examRef);
            // getExam.forEach((doc) => {
            //     arr.push({
            //         ...doc.data(),
            //         className: doc.data().name,
            //         examName: doc.data().examName,
            //         numberQuestion: doc.data().question.length,
            //         subject: doc.data().subject,
            //         time: doc.data().time,
            //         question: doc.data()?.map((q, i) => ({
            //             ...q,
            //             index: i + 1,
            //         })),
            //     });
            // });

            console.log(getExam.data());
            console.log(123456);

            const isTakingTest = {
                status: true,
                examName: getExam.data().name,
            };

            // const historyRef = doc(db, "histories", `${auth.currentUser.uid}/exam/${examID}`);
            // await setDoc(historyRef, {
            //     ...arr,
            // });
            // setHistory(selectedItem);
            // const { question, ...examTest } = selectedItem;
            // console.log(examTest);
            // console.log("history: " + history);
        } catch (err) {
            alert(err);
        }
    };

    return (
        <>
            {loading ? (
                <div> ...loading</div>
            ) : (
                <div className="flex flex-wrap justify-around">
                    {listExam?.map((item) => {
                        return (
                            <div
                                key={item.id}
                                className="max-w-[450px] card card-side bg-slate-200 shadow-xl mx-2 my-2 px-10"
                            >
                                <figure className="w-40">
                                    <img
                                        src="https://cdn.discordapp.com/attachments/941695759764553778/1083601370562711612/exam.png"
                                        alt="exam"
                                    />
                                </figure>
                                <div className="card-body px-2">
                                    <h2 className="card-title font-bold">{item.examName}</h2>
                                    <div>
                                        <p className="my-2">Lớp: {item.className}</p>
                                        <p className="my-2">Thời gian làm bài: {item.time} phút</p>
                                        <p className="my-2">
                                            Số lượng câu hỏi: {item.numberQuestion} câu
                                        </p>
                                        <p className="my-2">Coin: 20$</p>
                                    </div>
                                    <div
                                        className="card-actions justify-center mt-4"
                                        onClick={() => startExam(item.id)}
                                    >
                                        <Link to={`/user/test/${item.id}`}>
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
