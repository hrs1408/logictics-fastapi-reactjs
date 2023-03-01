import React from "react";
import {createBrowserRouter} from "react-router-dom";
import Login from "../pages/auth/login";
import Home from "../pages/Home";
import PrivateRoute from "./PrivateRoute";
import LoggedRoute from "./LoggedRoute";
import Settings from "../pages/Settings";
import Users from "../pages/Users";
import CreateBill from "../pages/CreateBill";
import ScanBill from "../pages/ScanBill";

const routes = createBrowserRouter([
    {
        path: "/",
        element: <PrivateRoute/>,
        children: [
            {
                path: "/",
                element: <Home/>
            },
            {
                path: "/users",
                element: <Users/>
            },
            {
                path: "/create-bill-of-lading",
                element: <CreateBill/>
            },
            {
                path: "/bill-of-lading-scan",
                element: <ScanBill/>
            },
            {
                path: "/settings",
                element: <Settings/>
            }
        ]
    },
    {
        path: "/",
        element: <LoggedRoute/>,
        children: [
            {
                path: "/login",
                element: <Login/>
            }
        ]
    }
])

export default routes