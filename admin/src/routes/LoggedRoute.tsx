import React, { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import LoadingPage from '../components/Loadings/LoadingPage'

const LoggedRoute: React.FC = () => {
  const { auth, authLoading } = useContext(AuthContext) as AuthContextType
  return (
    <>
      {authLoading ? (
        <LoadingPage />
      ) : auth ? (
        <Navigate to={'/'} />
      ) : (
        <Outlet />
      )}
    </>
  )
}

export default LoggedRoute
