import { RxDashboard } from 'react-icons/rx'
import { AiOutlineScan, AiOutlineUser } from 'react-icons/ai'
import { TbFileInvoice } from 'react-icons/tb'
import { IoSettingsOutline } from 'react-icons/io5'

export const SIDEBAR_OPETATION = [
  {
    name: 'Tổng quan',
    icon: <AiOutlineUser />,
    path: '/dashboard',
  },
  {
    name: 'Tra cứu vận đơn',
    icon: <AiOutlineUser />,
    path: '/searchorder',
  },
  {
    name: 'Đơn hàng',
    icon: <AiOutlineUser />,
    path: '/order',
  },
  {
    name: 'Tạo vận đơn',
    icon: <AiOutlineUser />,
    path: '/createorder',
  },
]
  