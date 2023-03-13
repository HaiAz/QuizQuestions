import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import { useAuthContext } from "../context/AuthProvider";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { Navigation } from "react-router";

export function ProtectedRoute() {
    const { loading } = useAuthContext();
    const auth = useSelector((state) => state.authSlice.auth);
    const navigate = useNavigate();

    if (loading) {
        return;
    } else if (!auth.isLogin) {
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
        return;
    } else if (!auth.isLogin && user.role !== "ADMIN") {
        navigate("/login");
        return;
    }

    return <Outlet />;
}
