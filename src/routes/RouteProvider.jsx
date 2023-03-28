import { createBrowserRouter } from "react-router-dom";
import AuthProvider from "../context/AuthProvider";
import App from "../App";
import UserDrawer from "../components/Drawer/UserDrawer";
import AdminDrawer from "../components/Drawer/AdminDrawer";
import ListExam from "../pages/ListExam/ListExam";
import ListSubject from "../pages/ListSubject/ListSubject";
import ExamHistory from "../components/ExamHistory/ExamHistory";
import QuizzBar from "../components/QuizzBar/QuizzBar";
import ExamResult from "../pages/ExamResult/ExamResult";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Error from "../pages/Error/Error";
import Profile from "../pages/Profile/Profile";
import AdminPage from "../pages/Admin/AdminPage";
import AddQuestion from "../pages/AddQuestion/AddQuestion";
import CreateExam from "../pages/CreateExam/CreateExam";
import Quizz from "../pages/Quizz/Quizz";
import { ProtectedRoute, AdminProtectedRoute } from "./ProtectedRoute";

const AuthLayout = () => {
    return (
        <AuthProvider>
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
                        path: "/user/exam-result/:id",
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
