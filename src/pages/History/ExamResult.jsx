import React, { useState, useEffect } from "react";
import { auth, db } from "../../firebase/config";
import { useSelector, useDispatch } from "react-redux";
import { getDoc, doc, collection, query } from "firebase/firestore";
import { useAppContext } from "../../context/AppProvider";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
function ExamResult() {
    const { id } = useParams();
    const [listQuestion, setListQuestion] = useState();

    useEffect(() => {
        const getListQuestion = async () => {
            const docRef = doc(db, "histories", `${auth.currentUser.uid}/exams/${id}`);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                setListQuestion(docSnap.data());
            }
            console.log(listQuestion);
        };
        getListQuestion();
    }, []);
    return <div>hehe</div>;
}

export default ExamResult;
