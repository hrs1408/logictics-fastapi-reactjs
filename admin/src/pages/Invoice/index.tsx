import AdminLayout from '../../layouts/AdminLayout'
import SearchBar from '../../components/SearchBar'
import React from 'react'
import EnhancedInvoiceTable from '../../components/Table/invoices'
import { useGetAllInvoices } from '../../services/InvoiceService'

const Invoices = () => {
  const { data: invoices } = useGetAllInvoices({
    search: '',
    page: 1,
    size: 10,
    isFull: true,
  })

  return (
    <AdminLayout>
      <div className={'h-screen'}>
        <SearchBar />
        <div
          className={
            'flex items-center justify-between p-4 rounded bg-white mt-4 shadow'
          }
        >
          <p className={'text-xl font-bold'}>Danh sách đơn hàng</p>
          <button
            className={'bg-yellow-400 px-4 py-2 rounded shadow'}
            onClick={() => {}}
          >
            Thêm đơn hàng mới
          </button>
        </div>
        <div className={'users-table mt-4'}>
          <EnhancedInvoiceTable
            listInvoice={
              (invoices?.data as unknown as InvoiceTableType[]) ?? []
            }
          />
        </div>
      </div>
    </AdminLayout>
  )
}

export default Invoices
