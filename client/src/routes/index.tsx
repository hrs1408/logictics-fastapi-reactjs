import { createBrowserRouter } from 'react-router-dom'
import Login from '../components/Auth'
import HomeUser from '../Layout/HomeUser'
import Home from '../pages/Home'
import User from '../pages/User'
import CreateOrder from '../PageUser/CreateOrder'
import Dashboard from '../PageUser/Dashboard'
import SearchOrder from '../PageUser/SearchOrder'
import Address from '../PageUser/Address'

export const routes = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/',
    element: <User />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/createorder',
    element: <CreateOrder />,
  },
  {
    path: '/address',
    element: <Address />,
  },
  {
    path: '/searchorder',
    element: <SearchOrder />,
  },
  {
    path: '/dashboard',
    element: <Dashboard />,
  },
])
