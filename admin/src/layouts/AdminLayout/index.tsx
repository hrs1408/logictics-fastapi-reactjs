import React from "react";
import {Divider} from "@mui/material";
import {SIDE_BAR} from "../../constants/SideBar";
import {Link} from "react-router-dom";
import './admin-layout.scss'

interface AdminLayoutProps {
    children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({children}) => {
    return (
        <div className="admin-layout bg-gray-100 w-screen h-screen flex">
            <div className="side-bar fixed h-screen w-[300px] shadow-lg left-0 top-0 bg-white">
                <div className="logo flex p-4 rounded items-center justify-center">
                    <img src="https://ntlogistics.vn/images/img/logo-footer.png" alt="logo" className="w-[170px] mr-4"/>
                </div>
                <Divider/>
                <div className="p-4 pr-0 h-full w-full flex flex-col gap-2">
                    {
                        SIDE_BAR.map((item, index) => {
                            return (
                                <div className="menu-item flex items-center justify-center w-full ">
                                    <Link to={item.path}
                                          className={`${index == 0 ? 'button-active w-full text-[16px] rounded-xl mr-4 hover:bg-gray-200 transition py-3 px-6 flex items-center justify-start gap-4'
                                              : 'w-full text-[16px] rounded-xl mr-4 hover:bg-gray-200 transition py-3 px-6 flex items-center justify-start gap-4'}`}>
                                        {item.icon} <span>{item.name}</span></Link>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <div className="main-content ml-[300px] w-full h-full p-4">
                {children}
            </div>
        </div>
    )
}

export default AdminLayout