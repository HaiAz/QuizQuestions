import React, { useContext } from "react";
import { useNavigate } from "react-router";
import { db, auth } from "../firebase/config";
import { useAuthContext } from "../context/AuthProvider";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { authSlice } from "./../redux/authSlice";
import userEvent from "@testing-library/user-event";

export function ProtectedRoute() {
    const { loading } = useAuthContext();
    const auth = useSelector((state) => state.authSlice.auth);

    const navigate = useNavigate();
    if (loading) {
        // navigate("/home");
        return;
    } else if (!auth.isLogin) {
        alert("Bạn phải đăng nhập trước");
        navigate("/login");
        return;
    }
    return <Outlet />;
}

export function AdminProtectedRoute() {
    const { loading } = useAuthContext();
    const auth = useSelector((state) => state.authSlice.auth);
    const user = useSelector((state) => state.authSlice.user);
    const navigate = useNavigate();
    if (loading) {
        // navigate("/admin");
        return;
    } else if (!auth.isLogin || user.role !== "ADMIN") {
        alert("Bạn phải đăng nhập trước");
        navigate("/login");
        return;
    }
    return <Outlet />;
}
