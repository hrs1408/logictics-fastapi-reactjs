import {createBrowserRouter} from "react-router-dom";
import Login from "../pages/auth/login";
import Home from "../pages/Home";
import PrivateRoute from "./PrivateRoute";
import LoggedRoute from "./LoggedRoute";
import Settings from "../pages/Settings";

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