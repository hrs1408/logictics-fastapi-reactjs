import React, { SyntheticEvent, useState } from 'react'
import HomeUser from '../../Layout/HomeUser'
import SearchBar from '../SearchBar'
import EnhancedUserTable from '../../components/Table/user'
import { AiOutlineSearch } from 'react-icons/ai'
import { BiScan, BiSearch, BiX } from 'react-icons/bi'
import { Modal } from '@mui/material'
import {
  TbCashBanknote,
  TbCashBanknoteOff,
  TbFileInvoice,
} from 'react-icons/tb'
import { faker } from '@faker-js/faker'
import { NumericFormat } from 'react-number-format'
import { QrScanner } from '@yudiel/react-qr-scanner'
import axiosConfig from '../../configs/AxiosConfig'
import './searchorder.scss'
import toast from 'react-hot-toast'
import Dropdown from './Dropdown'

const SearchOrder = () => {
  const [openQr, setOpenQr] = React.useState(false)

  const handleOpenQr = () => setOpenQr(true)
  const handleCloseQr = () => setOpenQr(false)
  const [isActive, setIsActive] = useState(false)
  const [open, setOpen] = React.useState(false)
  const [invoiceId, setInvoiceId] = useState('')
  const handleError = (error: any) => {
    error ? console.log(error) : console.log('No error')
  }

  const handleScan = (data: any) => {
    setInvoiceId(data)
    if (!invoiceId) {
      toast.error('Vui lòng nhập mã đơn hàng')
      return
    }
    setOpen(true)
  }

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault()
    if (!invoiceId) {
      toast.error('Vui lòng nhập mã đơn hàng')
      return
    }
    setOpen(true)
  }



  return (
    <>
      <HomeUser>
        <div className={'h-screen'}>
          <SearchBar />
          <div className="flex items-center justify-between p-4 rounded bg-white mt-4 shadow">
            <p className={'text-xl font-bold'}>Tra cứu đơn hàng</p>
          </div>
          <div className="statistic  mt-4 flex gap-4">
            <div className={' w-full'}>
              <form onSubmit={handleSubmit} action="">
                <div className={'bg-white rounded shadow my-4 p-2'}>
                  <div className="input-search flex items-center gap-[120px]">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          placeholder="Nhập mã vận đơn"
                          value={invoiceId}
                          onChange={e => setInvoiceId(e.target.value)}
                          className={'w-[1200px] outline-none p-2 border rounded'}
                        />
                        <button className="text-black bg-yellow-400 text-[20px] p-2 rounded-md hover:opacity-80 transition">
                          <BiSearch />
                        </button>
                        <button
                          onClick={handleOpenQr}
                          className="text-black bg-yellow-400 text-[20px] p-2 rounded-md hover:opacity-80 transition"
                        >
                          <BiScan />
                        </button>
                        <Modal
                          open={openQr}
                          onClose={handleCloseQr}
                          aria-labelledby="modal-modal-title"
                          aria-describedby="modal-modal-description"
                        >
                          <div
                            className={
                              'w-[500px] bg-white p-4 rounded absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'
                            }
                          >
                            <button
                              onClick={handleCloseQr}
                              className={
                                'ml-auto p-2 mb-2 rounded transition hover:bg-gray-100/80'
                              }
                            >
                              <BiX className={'text-[20px]'} />
                            </button>
                            <QrScanner
                              onDecode={handleScan}
                              onError={handleError}
                            />
                          </div>
                        </Modal>
                      </div>
                    </div>
                    <select
                      name=""
                      id=""
                      className={'p-2 outline-none border rounded'}
                    >
                      <option value="">Tất cả</option>
                      <option value="">7 ngày trước</option>
                      <option value="">15 ngày trước</option>
                      <option value="">30 ngày trước</option>
                    </select>
                  </div>
                </div>
              </form>
              <Dropdown
                open={open}
                onClose={() => setOpen(false)}
                invoiceId={invoiceId}
              />
            </div>
          </div>
          <div className={'users-table mt-4'}>
            {/* <EnhancedUserTable listUser={users?.data ?? []} /> */}
          </div>
        </div>
      </HomeUser>
    </>
  )
}

export default SearchOrder
