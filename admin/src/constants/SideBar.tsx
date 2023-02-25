import {RxDashboard} from "react-icons/rx";
import {AiOutlineScan, AiOutlineUser} from "react-icons/ai";
import {TbFileInvoice} from "react-icons/tb";
import {IoSettingsOutline} from "react-icons/io5";

export const SIDE_BAR = [
    {
        name: 'Dashboard',
        icon: <RxDashboard/>,
        path: '/'
    },
    {
        name: 'Users',
        icon: <AiOutlineUser/>,
        path: '/users'
    },
    {
        name: 'Bill Of Lading',
        icon: <TbFileInvoice/>,
        path: '/bill-of-lading'
    },
    {
        name: 'bill of lading scan',
        icon: <AiOutlineScan/>,
        path: '/bill-of-lading-scan'
    },
    {
        name: 'Settings',
        icon: <IoSettingsOutline/>,
        path: '/settings'
    }
]