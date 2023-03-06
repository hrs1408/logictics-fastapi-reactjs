import { createBrowserRouter } from "react-router-dom";
import Login from "../components/Auth";
import HomeUser from "../Layout/HomeUser";
import Home from "../pages/Home";
import PageUser from "../pages/PageUser";
import CreateOrder from "../PageUser/CreateOrder";
import GetPoints from "../PageUser/GetPoints";
import PayPoints from "../PageUser/PayPoints";

export const routes = createBrowserRouter([
    // {
    //     path: "/",
    //     element: <Home />
    // },
    {
        path: "/",
        element: <PageUser />
    },
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/createorder",
        element: <CreateOrder />
    },
    {
        path: "/getpoint",
        element: <GetPoints />
    },
    {
        path: "/paypoint",
        element: <PayPoints />
    },
    {
        path: "/searchproduct",
        element: <Login />
    },
])