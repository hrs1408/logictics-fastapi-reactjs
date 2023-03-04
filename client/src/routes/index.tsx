import { createBrowserRouter } from "react-router-dom";
import Login from "../components/Login";
import Home from "../pages/Home";

export const routes = createBrowserRouter([
    {
        path: "/",
        element: <Home />
    },
    {
        path: "/login",
        element: <Login />
    },
])