import AdminLayout from '../../layouts/AdminLayout'
import SearchBar from '../../components/SearchBar'
import React, { useContext } from 'react'
import { Modal } from '@mui/material'
import Input from '../../components/Input'
import EnhancedPortTable from '../../components/Table/ports'
import { useCreatePort, useGetAllPorts } from '../../services/PortService'
import { FormProvider, useForm } from 'react-hook-form'
import { object, string } from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import toast from 'react-hot-toast'
import { StoreContext, StoreContextType } from '../../context/StoreContext'
import { useDebounce } from 'usehooks-ts'

export const CreatePortSchema = object().shape({
  name: string().required('Vui lòng nhập tên kho hàng'),
})

const Ports = () => {
  const [open, setOpen] = React.useState(false)
  const { state } = useContext(StoreContext) as StoreContextType
  const debounceSearch = useDebounce(state.searchKey, 300)
  const {
    data: ports,
    refetch: refetchPorts,
    isFetching: isPortFetching,
  } = useGetAllPorts({
    search: debounceSearch,
    isFull: true,
    page: 1,
    size: 100,
  })

  const methods = useForm<CreatePortType>({
    resolver: yupResolver(CreatePortSchema),
  })

  const {
    handleSubmit,
    formState: { errors },
    reset,
  } = methods

  const { mutateAsync: createPortAsync } = useCreatePort()

  const onSubmit = (data: CreatePortType) => {
    createPortAsync(data).then(() => {
      void refetchPorts()
      toast.success('Thêm kho hàng thành công')
      setOpen(false)
      reset()
    })
  }
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
              <FormProvider {...methods}>
                <div className="flex w-full">
                  {Object.keys(errors).length > 0 && (
                    <div className="p-4 rounded shadow bg-red-400 text-white my-4 w-full">
                      {Object.keys(errors).length > 0 && (
                        <div>
                          <ul>
                            {Object.entries(errors).map(([name, error]) => (
                              <li key={name}>{error.message}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className={'flex flex-col'}>
                    <p className={'text-2xl font-bold'}>Thêm kho hàng</p>
                    <div className={'w-full grid grid-cols-1 gap-4 mt-4'}>
                      <Input
                        label={'Tên kho hàng'}
                        type={'text'}
                        name={'name'}
                      />
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
              </FormProvider>
            </div>
          </Modal>
        </div>
        <div className={'users-table mt-4'}>
          <EnhancedPortTable
            isLoading={isPortFetching}
            listPort={ports?.data ?? []}
          />
        </div>
      </div>
    </AdminLayout>
  )
}

export default Ports
