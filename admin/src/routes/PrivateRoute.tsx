import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import LoadingPage from "../components/Loadings/LoadingPage";

const PrivateRoute: React.FC = () => {
    const { auth, authLoading } = useContext(AuthContext) as AuthContextType;
    return (
        <>
            {authLoading ? (
                <LoadingPage/>
            ) : true ? (
                <Outlet />
            ) : (
                <Navigate to={'/login'} />
            )}
        </>
    );
};

export default PrivateRoute;