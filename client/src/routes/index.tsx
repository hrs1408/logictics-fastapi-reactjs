import { createBrowserRouter } from 'react-router-dom'
import Login from '../components/Auth'
import HomeUser from '../Layout/HomeUser'
import Home from '../pages/Home'
import User from '../pages/User'
import CreateOrder from '../PageUser/CreateOrder'
import Dashboard from '../PageUser/Dashboard'
import SearchOrder from '../PageUser/SearchOrder'
import AddressComponents from '../PageUser/Address'
import Address from '../PageUser/Address'
import Order from '../PageUser/Order'

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
    element: <AddressComponents />,
  },
  {
    path: '/searchorder',
    element: <SearchOrder />,
  },
  {
    path: '/dashboard',
    element: <Dashboard />,
  },
  {
    path: '/order',
    element: <Order />,
  },
])
