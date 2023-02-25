import React from "react";
import {Button, Divider} from "@mui/material";
import {RxDashboard} from "react-icons/rx";

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
                <div className="p-4 h-full w-full flex flex-col gap-2">
                    {
                        Array(10).fill(0).map((item, index) => {
                            return (
                                <ButtonSideBar/>
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

const ButtonSideBar = () => {
    return (
        <div className="menu-item flex items-center justify-center w-full ">
            <button
                className={'w-full text-[16px] rounded-xl hover:bg-gray-200 transition py-3 px-6 flex items-center justify-start gap-4'}>
                <RxDashboard/> <span>Dashboard</span></button>
        </div>
    )
}
export default AdminLayout