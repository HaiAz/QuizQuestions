import Home from "../pages/All/Home";
import Login from "../pages/All/Login";
import SignUp from "../pages/all/SignUp";
import TakeTest from "../pages/all/TakeTest";

const Route = [
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "Home",
        element: <Home />,
    },
    {
        path: "Login",
        element: <Login />,
    },
    {
        path: "SignUp",
        element: <SignUp />,
    },
    {
        path: "TakeTest",
        element: <TakeTest />,
    },
];
