import { createBrowserRouter } from "react-router-dom";
import AuthProvider from "../context/AuthProvider";
import App from "../App";
import UserDrawer from "../components/Drawer/UserDrawer";
import AdminDrawer from "../components/Drawer/AdminDrawer";
import ListExam from "../pages/ListExam/ListExam";
import ListSubject from "../pages/ListSubject/ListSubject";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Error from "../pages/Error/Error";
import Profile from "../pages/Profile/Profile";
import AddQuestion from "../pages/AddQuestion/AddQuestion";
import CreateExam from "../pages/CreateExam/CreateExam";
import Quizz from "../pages/Quizz/Quizz";
import ExamHistory from "../pages/History/ExamHistory";
import ExamResult from "../pages/History/ExamResult";
import SignUp from "./../pages/SignUp/SignUp";
import LoadingBar from "react-top-loading-bar";
import { ProtectedRoute, AdminProtectedRoute } from "./ProtectedRoute";
import { useSelector, useDispatch } from "react-redux";
import { setPageLoading } from "../redux/loadingSlice";
const AuthLayout = () => {
    const dispatch = useDispatch();
    const loading = useSelector((state) => state.loadingSlice.loading);
    return (
        <AuthProvider>
            <LoadingBar
                color="#ff007d"
                height={5}
                progress={loading}
                waitingTime={1000}
                onLoaderFinished={() => dispatch(setPageLoading(0))}
            />
            <UserDrawer />
        </AuthProvider>
    );
};

const AdminLayout = () => {
    return (
        <AuthProvider>
            <AdminDrawer />
        </AuthProvider>
    );
};

export const router = createBrowserRouter([
    {
        path: "*",
        element: <Error />,
        children: [{ path: "*", element: <Error /> }],
    },
    {
        path: "login",
        element: (
            <AuthProvider>
                <Login />
            </AuthProvider>
        ),
    },
    {
        path: "sign-up",
        element: (
            <AuthProvider>
                <SignUp />
            </AuthProvider>
        ),
    },
    {
        path: "/",
        element: (
            <AuthProvider>
                <App />
            </AuthProvider>
        ),
    },
    {
        path: "/home",
        element: (
            <AuthProvider>
                <Home />
            </AuthProvider>
        ),
    },
    {
        element: <AuthLayout />,
        children: [
            {
                path: "/user",
                element: <ProtectedRoute />,
                children: [
                    {
                        path: "/user",
                        element: <ListExam />,
                    },
                    {
                        path: "/user/profile",
                        element: <Profile />,
                    },
                    {
                        path: "/user/list-subjects",
                        element: <ListSubject />,
                    },

                    {
                        path: "/user/exam/:id",
                        element: <ListExam />,
                    },
                    {
                        path: "/user/exam-history/",
                        element: <ExamHistory />,
                    },
                    {
                        path: "/user/exam-history/:id",
                        element: <ExamResult />,
                    },
                    {
                        path: "/user/test/:id",
                        element: <Quizz />,
                    },
                ],
            },
        ],
    },
    {
        element: <AdminLayout />,
        children: [
            {
                path: "/admin",
                element: <AdminProtectedRoute />,
                children: [
                    {
                        path: "/admin",
                        element: <AddQuestion />,
                    },
                    {
                        path: "/admin/add-question",
                        element: <AddQuestion />,
                    },
                    {
                        path: "/admin/create-exam",
                        element: <CreateExam />,
                    },
                ],
            },
        ],
    },
]);
