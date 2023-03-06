import { RxDashboard } from 'react-icons/rx'
import { AiOutlineScan, AiOutlineUser } from 'react-icons/ai'
import { TbFileInvoice } from 'react-icons/tb'
import { IoSettingsOutline } from 'react-icons/io5'
import { MdOutlineWarehouse } from 'react-icons/md'

export const SIDE_BAR = [
  {
    name: 'Tổng Quan',
    icon: <RxDashboard />,
    path: '/',
  },
  {
    name: 'Người dùng',
    icon: <AiOutlineUser />,
    path: '/users',
  },
  {
    name: 'Kho hàng',
    icon: <MdOutlineWarehouse />,
    path: '/ports',
  },
  {
    name: 'Đơn hàng',
    icon: <TbFileInvoice />,
    path: '/invoices',
  },
  {
    name: 'Tạo vận đơn',
    icon: <TbFileInvoice />,
    path: '/create-bill-of-lading',
  },
  {
    name: 'Quét vận đơn',
    icon: <AiOutlineScan />,
    path: '/bill-of-lading-scan',
  },
  {
    name: 'Cài đặt',
    icon: <IoSettingsOutline />,
    path: '/settings',
  },
]
