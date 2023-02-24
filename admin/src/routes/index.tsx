import {createBrowserRouter} from "react-router-dom";
import Login from "../pages/auth/login";
import Home from "../pages/Home";
import PrivateRoute from "./PrivateRoute";
import LoggedRoute from "./LoggedRoute";

const routes = createBrowserRouter([
    {
        path: "/",
        element: <PrivateRoute/>,
        children: [
            {
                path: "/",
                element: <Home/>
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