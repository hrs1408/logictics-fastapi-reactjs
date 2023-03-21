import React, { useState } from 'react'
import * as FaIcons from 'react-icons/fa'
import * as AiIcons from 'react-icons/ai'
import { BiUser } from 'react-icons/bi'
import { Link } from 'react-router-dom'
import './Navbar.css'
import { IconContext } from 'react-icons'
import { Header_Menu } from '../../constants/HeaderMenu'

function Navbar() {
  const [sidebar, setSidebar] = useState(false)

  const showSidebar = () => setSidebar(!sidebar)

  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }}>
        <div className="navbar">
          <Link to="#" className="menu-bars">
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>
          <Link to={'/'}>
            <img
              className="w-full h-full img-logo"
              src="https://ntlogistics.vn/images/img/logo.png"
              alt=""
            />
          </Link>
          <Link to={'/login'}>
            <BiUser className="text-[23px]" />
          </Link>
        </div>
        <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
          <ul className="nav-menu-items">
            <li className="navbar-toggle">
              <Link to={'/'}>
                <img
                  className="w-full h-full img-logo"
                  src="https://ntlogistics.vn/images/img/logo.png"
                  alt=""
                />
              </Link>
              <Link to="#" className="menu-bars">
                <AiIcons.AiOutlineClose onClick={showSidebar} />
              </Link>
            </li>
            {Header_Menu.map((item, index) => {
              return (
                <li key={index} className="text-white w-full mobile-nav">
                  <Link
                    className="mobile-nav-link text-[16px] font-medium "
                    to={item.path}
                  >
                    {item.name}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  )
}

export default Navbar