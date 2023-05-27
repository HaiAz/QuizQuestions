import React, { useContext, createContext, useState, useEffect } from "react";
import { auth, db } from "../firebase/config";
import {
    signInWithPopup,
    signOut,
    GoogleAuthProvider,
    getAdditionalUserInfo,
    onAuthStateChanged,
} from "firebase/auth";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authSlice, setUser, setAuth } from "../redux/authSlice";

export const AuthContext = createContext();

function AuthProvider({ children }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.authSlice.user);
    const [loading, setLoading] = useState(true);

    //đăng nhập bằng google
    const handleLoginWithGoogle = async () => {
        const googleProvider = new GoogleAuthProvider();
        try {
            const userCredential = await signInWithPopup(auth, googleProvider);
            const {
                user: { displayName, email, photoURL, uid },
            } = userCredential;
            if (getAdditionalUserInfo(userCredential).isNewUser) {
                const userRef = doc(db, "users", uid);
                await setDoc(userRef, {
                    displayName,
                    email,
                    photoURL,
                    uid,
                    coin: 300000,
                    role: "USER",
                });
            }
            navigate("/home");
        } catch (err) {
            throw err;
        }
    };

    //đăng xuất
    const handleLogout = async (e) => {
        e.preventDefault();
        const confirm = window.confirm("Bạn có muốn thoát không?");
        try {
            if (confirm) {
                await signOut(auth);
                navigate("/");
                setLoading(true);
            }
        } catch (err) {
            throw err;
        }
    };

    //lấy thông tin người dùng
    const getUserInfo = async () => {
        const userRef = doc(db, "users", auth.currentUser.uid);
        const user = await getDoc(userRef);
        dispatch(setUser({ ...user.data() }));
        setLoading(false);
    };

    //lấy thông tin user và set trạng thái
    useEffect(() => {
        const unsubcribe = onAuthStateChanged(auth, (isUser) => {
            if (isUser) {
                getUserInfo();
                dispatch(setAuth({ isLogin: true }));
            } else {
                dispatch(setAuth({ isLogin: false }));
                setLoading(false);
            }
        });

        return () => unsubcribe();
    }, []);

    const defaultValue = { handleLoginWithGoogle, handleLogout, loading };
    return <AuthContext.Provider value={defaultValue}>{children}</AuthContext.Provider>;
}

export const useAuthContext = () => {
    // return useContext(AuthContext);

    const { handleLoginWithGoogle, handleLogout, loading } = useContext(AuthContext);
    return {
        handleLoginWithGoogle,
        handleLogout,
        loading,
    };
};

export default AuthProvider;
