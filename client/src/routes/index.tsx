import { createBrowserRouter } from "react-router-dom";
import Login from "../components/Auth";
import HomeUser from "../Layout/HomeUser";
import Home from "../pages/Home";
import PageUser from "../pages/PageUser";
import CreateOrder from "../PageUser/CreateOrder";
import Dashboard from "../PageUser/Dashboard";
import GetPoints from "../PageUser/GetPoints";
import PayPoints from "../PageUser/PayPoints";
import SearchOrder from "../PageUser/SearchOrder";

export const routes = createBrowserRouter([
    {
        path: "/",
        element: <Home />
    },
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
        path: "/searchorder",
        element: <SearchOrder />
    },
    {
        path: "/dashboard",
        element: <Dashboard />
    },
])