import React, { useState, useEffect, useCallback } from "react";
import { auth, db } from "../../firebase/config";
import { getDocs, doc, collection, where, setDoc, getDoc, updateDoc } from "firebase/firestore";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../redux/authSlice";
import { useAppContext } from "../../context/AppProvider";
import { setPageLoading } from "../../redux/loadingSlice";
import { useNavigate } from "react-router-dom";
import { BsCoin } from "react-icons/bs";
import NotiModal from "./../../components/Modal/NotiModal";

function ListExam() {
    const { id } = useParams();
    const { setNavTitle } = useAppContext();
    const [listExam, setListExam] = useState();
    const [loading, setLoading] = useState();

    const [userInfo, setUserInfo] = useState();
    const [check, setCheck] = useState();
    const navigate = useNavigate();
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [modalContent, setModalContent] = useState({
        title: "1",
        description: "",
    });
    const [show, setShow] = useState(false);

    const dispatch = useDispatch();
    const userSlice = useSelector((state) => state.authSlice.user);

    useEffect(() => {
        const getUserInfo = async () => {
            const userRef = doc(db, "users", `${auth.currentUser.uid}`);
            const getUser = await getDoc(userRef);
            setUserInfo(getUser.data());
        };

        getUserInfo();
    }, []);

    //Lấy danh sách bài kiểm tra
    useEffect(() => {
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

    //tính thời gian làm bài
    const expiredTime = (now, expired) => {
        const nextTime = now + expired * 60 * 1000;

        //trả về timestamp thời điểm hết hạn
        return nextTime;
    };

    //close modal
    const closeModal = useCallback(() => {
        setIsOpenModal(false);
        setShow(false);
    }, []);

    //Khi ấn làm bài
    const startExam = async (examID, coin) => {
        try {
            dispatch(setPageLoading(10));
            const userRef = doc(db, "users", `${auth.currentUser.uid}`);
            const examRef = doc(db, "exams", `${id}/exams/${examID}`);
            const historyRef = doc(db, "histories", `${auth.currentUser.uid}/exams/${examID}`);
            const exam = await getDoc(examRef);
            const user = await getDoc(userRef);
            const currentTime = new Date().getTime();

            dispatch(setPageLoading(30));
            setLoading(examID);

            //check có đang làm bài thi khác hay không
            if (
                userSlice?.isTakingTest?.status === true &&
                userSlice?.isTakingTest?.examID !== examID
            ) {
                setIsOpenModal(true);
                setModalContent({
                    title: "Thông báo!",
                    description:
                        "Bạn đang làm một bài kiểm tra khác. Vui lòng hoàn thành bài trước đó!",
                });
                setShow(true);
                setLoading("");
                dispatch(setPageLoading(100));
                return;
            }

            //nếu đang làm bài ấn tiếp tục
            if (userSlice?.isTakingTest?.status === true) {
                navigate(`/user/test/${examID}`);
                return;
            }

            //check có đủ tiền hay không
            if (+user.data().coin < +coin) {
                setIsOpenModal(true);
                setModalContent({
                    title: "Thông báo!",
                    description: "Bạn không đủ coin để làm bài thi này. Vui lòng nạp thêm coin.",
                });
                setShow(true);
                setLoading("");
                dispatch(setPageLoading(100));
                return;
            }
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
                startAt: currentTime / 1000,
                expiredTime: expiredTime(currentTime, exam.data().time) / 1000,
            });
            dispatch(setPageLoading(50));

            //trạng thái của user lúc làm bài
            const isTakingTest = {
                status: true,
                examName: exam?.data().examName,
                time: exam?.data().time,
                startAt: currentTime / 1000,
                expiredTime: expiredTime(currentTime, exam.data().time) / 1000,
                examID,
            };
            dispatch(setPageLoading(70));

            //update trạng thái user
            await updateDoc(userRef, { isTakingTest, coin: +user.data().coin - +coin });
            dispatch(setUser({ ...userSlice, isTakingTest }));
            dispatch(setPageLoading(100));
            window.location.href = `/user/test/${examID}`;
            // window.location.reload();
            // navigate(`/user/test/${examID}`);
        } catch (err) {
            console.log("Lỗi: ", err);
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
                                        <p className="my-2">
                                            Coin: {item.coin} <BsCoin className="inline" />
                                        </p>
                                    </div>
                                    <div className="card-actions justify-center mt-4 uppercase">
                                        <button
                                            className={`btn btn-primary ${
                                                loading === item.id && "loading"
                                            } ${
                                                userSlice?.isTakingTest?.examID === item.id
                                                    ? "bg-red-600 outline-none border-none hover:bg-red-400"
                                                    : ""
                                            }`}
                                            onClick={() => startExam(item.id, item.coin)}
                                        >
                                            {userSlice?.isTakingTest?.examID === item.id
                                                ? "Tiếp tục làm bài!"
                                                : loading === item.id
                                                ? "Đang bắt đầu!"
                                                : "Bắt đầu làm!"}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
            <NotiModal
                isOpen={isOpenModal}
                closeModal={closeModal}
                modalContent={modalContent}
                isShow={show}
            />
        </>
    );
}

export default ListExam;
