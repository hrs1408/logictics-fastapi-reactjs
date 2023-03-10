import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { SIDEBAR_OPETATION } from '../constants/SideBar'
import { Divider } from '@mui/material'
import './homeUser.scss'

interface HomeUserLayoutProps {
  children: React.ReactNode
}

const HomeUser: React.FC<HomeUserLayoutProps> = ({ children }) => {
  const path = useLocation().pathname
  return (
    <div className="admin-layout bg-gray-100 w-full flex">
      <div className="side-bar fixed h-screen w-[300px] shadow-lg left-0 top-0 bg-white">
        <div className="logo flex p-4 rounded items-center justify-center">
          <img src="/images/logo/1-landscape.png" alt="logo" />
        </div>
        <Divider />
        <div className="p-4 pr-0 h-full w-full flex flex-col gap-2">
          {SIDEBAR_OPETATION.map((item, index) => {
            return (
              <div
                key={index}
                className="menu-item flex items-center justify-center w-full "
              >
                <Link
                  to={item.path}
                  className={`${
                    path === item.path
                      ? 'button-active w-full text-[16px] rounded-xl mr-4 hover:bg-gray-200 py-3 px-6 flex items-center justify-start gap-4'
                      : 'button-sidebar w-full text-[16px] rounded-xl mr-4 hover:bg-gray-200 py-3 px-6 flex items-center justify-start gap-4'
                  }`}
                >
                  {item.icon} <span>{item.name}</span>
                </Link>
              </div>
            )
          })}
        </div>
      </div>
      <div className="main-content ml-[300px] w-full h-full">
        <div className={'p-4'}>{children}</div>
        <footer>
          <div className="footer w-full py-6 bg-white shadow-lg flex items-center justify-center">
            <p className="text-gray-500">
              © {new Date().getFullYear()} NextGen Solution. All rights
              reserved.
            </p>
          </div>
        </footer>
      </div>
    </div>
  )
}

export default HomeUser
