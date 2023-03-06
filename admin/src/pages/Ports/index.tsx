import AdminLayout from '../../layouts/AdminLayout'
import SearchBar from '../../components/SearchBar'
import React from 'react'
import { Modal } from '@mui/material'
import Input from '../../components/Input'
import EnhancedPortTable from '../../components/Table/ports'

const Ports = () => {
  const [open, setOpen] = React.useState(false)

  return (
    <AdminLayout>
      <div className={'h-screen'}>
        <SearchBar />
        <div
          className={
            'flex items-center justify-between p-4 rounded bg-white mt-4 shadow'
          }
        >
          <p className={'text-xl font-bold'}>Danh sách kho hàng</p>
          <button
            className={'bg-yellow-400 px-4 py-2 rounded shadow'}
            onClick={() => {
              setOpen(!open)
            }}
          >
            Thêm kho hàng mới
          </button>
          <Modal
            open={open}
            onClose={() => {
              setOpen(!open)
            }}
          >
            <div
              className={
                'w-1/2  p-8 bg-white rounded shadow absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'
              }
            >
              <form>
                <div className={'flex flex-col'}>
                  <p className={'text-2xl font-bold'}>Thêm kho hàng</p>
                  <div className={'w-full grid grid-cols-2 gap-4 mt-4'}>
                    <Input label={'Tên kho hàng'} type={'text'} name={'name'} />
                    <Input label={'Mã kho hàng'} type={'text'} name={'code'} />
                  </div>
                  <div
                    className={
                      'flex items-center mt-8 gap-2 justify-end w-full'
                    }
                  >
                    <button
                      className={
                        'bg-yellow-400 px-4 py-2 rounded shadow hover:opacity-80 transition'
                      }
                      type={'submit'}
                    >
                      Thêm
                    </button>
                    <button
                      className={
                        'bg-gray-400 px-4 py-2 rounded shadow hover:opacity-80 transition'
                      }
                      type="reset"
                      onClick={() => {
                        setOpen(!open)
                      }}
                    >
                      Hủy bỏ
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </Modal>
        </div>
        <div className={'users-table mt-4'}>
          <EnhancedPortTable listPort={[]} />
        </div>
      </div>
    </AdminLayout>
  )
}

export default Ports
