import React, { useEffect, useState } from 'react'
import HomeUser from '../../Layout/HomeUser'
import { yupResolver } from '@hookform/resolvers/yup/dist/yup'
import { Modal } from '@mui/material'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import * as yup from 'yup'
import { number, object } from 'yup'
import SearchBar from '../SearchBar'
import './address.scss'
import {
  useAddress,
  useCreateAddress,
  useDeleteAddress,
  useOneAddress,
  useUpdateAddress,
} from '../../services/AddressService'
import axios from 'axios'
import toast from 'react-hot-toast'
import Address from '../../components/Table/address'

const schema = object().shape({
  province: yup.string().required('Tỉnh là trường bắt buộc'),
  district: yup.string().required('Huyện/Thành Phố là trường bắt buộc'),
  ward: yup.string().required('Phường/Xã Phố là trường bắt buộc'),
  address: yup.string().required('Địa chỉ là trường bắt buộc'),
})

const AddressComponents = () => {
  const { data: dataAddress } = useAddress()
  const { mutateAsync: createAddressAsync, isLoading: isAddressCreating } =
    useCreateAddress()
  const { mutateAsync: deleteAddressAsync } = useDeleteAddress()
  const [acresID, setAcresID] = useState(0)
  const { data: getOneAddress } = useOneAddress(acresID)

  const [open, setOpen] = React.useState(false)
  const [openModal, setOpenModal] = React.useState(false)
  const [province, setProvinces] = useState<string[]>([])
  const [districts, setDistricts] = useState([])
  const [wards, setWards] = useState([])
  const [provinceCode, setProvinceCode] = useState('')
  const [districtCode, setDistrictCode] = useState('')
  const [wardCode, setWardCode] = useState('')

  const navigate = useNavigate()

  const fetchProvinces = async () => {
    const response = await axios.get(
      'https://provinces.open-api.vn/api/?depth=1'
    )
    setProvinces(response.data)
  }

  useEffect(() => {
    void fetchProvinces()
  }, [])

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AddressType>({
    resolver: yupResolver(schema),
  })

  const {
    register: fromUpdate,
    formState: err,
    setValue,
  } = useForm<AddressType>({
    resolver: yupResolver(schema),
  })

  const handleProvinceChange = async (event: any) => {
    const provinceCode = event.target.value
    setProvinceCode(provinceCode)
    setDistrictCode('')
    setWardCode('')
    if (provinceCode) {
      const response = await axios.get(
        `https://provinces.open-api.vn/api/p/${provinceCode}?depth=2`
      )
      setDistricts(response.data.districts)
    } else {
      setDistricts([])
      setWards([])
    }
  }

  const handleDistrictChange = async (event: any) => {
    const districtCode = event.target.value
    setDistrictCode(districtCode)
    setWardCode('')
    if (districtCode) {
      const response = await axios.get(
        `https://provinces.open-api.vn/api/d/${districtCode}?depth=2`
      )
      setWards(response.data.wards)
    } else {
      setWards([])
    }
  }

  const handleWardChange = (event: any) => {
    setWardCode(event.target.value)
  }

  const handleAddress = async (data: AddressType) => {
    createAddressAsync(data)
      .then(res => {
        navigate('/address')
        reset()
        toast.success('Tạo địa chỉ thành công')
      })
      .catch(err => {
        console.log(err)
      })
  }
  const handleDeleteAddress = async (id: number) => {
    deleteAddressAsync(id)
      .then(res => {
        navigate('/address')
        window.location.reload()
        toast.success('Xóa địa chỉ thành công')
      })
      .catch(err => {
        console.log(err)
      })
  }
  const handleAddressId = (id: number) => {
    setAcresID(id)
    setOpenModal(!openModal)
  }

  useEffect(() => {
    if (acresID && getOneAddress && getOneAddress.data) {
      const address = getOneAddress.data
      setValue('province', address.province)
      setValue('district', address.district)
      setValue('ward', address.ward)
      setValue('address', address.address)
    }
  }, [getOneAddress])

  const handleUpdate = () => {}

  return (
    <>
      <HomeUser>
        <div className={''}>
          <SearchBar />
          <div
            className={
              'flex items-center justify-between p-4 rounded bg-white mt-4 shadow'
            }
          >
            <p className={'text-xl font-bold'}>Danh sách địa chỉ</p>
            <button
              className={'bg-yellow-400 px-4 py-2 rounded shadow'}
              onClick={() => {
                setOpen(!open)
              }}
            >
              Thêm người dùng
            </button>
            <Modal open={open} onClose={() => setOpen(false)}>
              <div
                className={
                  'w-1/2  p-8 bg-white rounded shadow absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'
                }
              >
                <form onSubmit={handleSubmit(handleAddress)}>
                  <div className={'flex flex-col'}>
                    <p className={'text-2xl font-bold pb-5'}>Thêm Địa chỉ</p>
                    <div className={'w-full gap-4 mt-4'}>
                      <div className={'flex flex-col '}>
                        <p className={'text-[16px] font-bold pb-4'}>Tỉnh</p>
                        <select
                          {...register('province')}
                          className="w-full px-4 py-3 mb-4 border rounded-md outline-none"
                          value={provinceCode}
                          onChange={handleProvinceChange}
                        >
                          <option value="">Chọn tỉnh/thành phố</option>
                          {province.map((province: any, index: number) => (
                            <option key={index} value={province.code}>
                              {province.name}
                            </option>
                          ))}
                        </select>
                        <p className={'pl-1 text-red-500 text-sm'}>
                          {errors.province?.message}
                        </p>
                      </div>
                      <div className={'flex flex-col '}>
                        <p className={'text-[16px] font-bold pb-4'}>
                          Huyện / Thành Phố
                        </p>
                        <select
                          {...register('district')}
                          className="w-full px-4 py-3 mb-4 border rounded-md outline-none"
                          value={districtCode}
                          onChange={handleDistrictChange}
                        >
                          <option value="">Chọn quận/huyện</option>
                          {districts?.map((district: any, index: number) => (
                            <option key={index} value={district.code}>
                              {district.name}
                            </option>
                          ))}
                        </select>
                        <p className={'pl-1 text-red-500 text-sm'}>
                          {errors.district?.message}
                        </p>
                      </div>
                      <div className={'flex flex-col '}>
                        <p className={'text-[16px] font-bold pb-4'}>
                          Phường / Xã
                        </p>
                        <select
                          {...register('ward')}
                          className="w-full px-4 py-3 mb-4 border rounded-md outline-none"
                          value={wardCode}
                          onChange={handleWardChange}
                        >
                          <option value="">Chọn phường/xã</option>
                          {wards.map((ward: any, index: number) => (
                            <option key={index} value={ward.code}>
                              {ward.name}
                            </option>
                          ))}
                        </select>
                        <p className={'pl-1 text-red-500 text-sm'}>
                          {errors.ward?.message}
                        </p>
                      </div>
                      <div className="">
                        <p className={'text-[16px] font-bold pb-4'}>Địa chỉ</p>
                        <input
                          {...register('address')}
                          className="w-full px-4 py-3 mb-4 border rounded-md outline-none"
                          type="text"
                        />
                      </div>
                      <p className={'pl-1 text-red-500 text-sm'}>
                        {errors.address?.message}
                      </p>
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
                        disabled={isAddressCreating}
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
                        Trở về
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </Modal>
            <Modal open={openModal} onClose={() => setOpenModal(false)}>
              <div
                className={
                  'w-1/2  p-8 bg-white rounded shadow absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'
                }
              >
                <form>
                  <div className={'flex flex-col'}>
                    <p className={'text-2xl font-bold pb-5'}>
                      Chỉnh sửa địa chỉ
                    </p>
                    <div className={'w-full gap-4 mt-4'}>
                      <div className={'flex flex-col '}>
                        <p className={'text-[16px] font-bold pb-4'}>Tỉnh</p>
                        <select
                          {...fromUpdate('province')}
                          className="w-full px-4 py-3 mb-4 border rounded-md outline-none"
                          onChange={handleProvinceChange}
                        >
                          <option value="">Chọn tỉnh/thành phố</option>
                          {province.map((province: any, index: number) => (
                            <option key={index} value={province.code}>
                              {province.name}
                            </option>
                          ))}
                        </select>
                        <p className={'pl-1 text-red-500 text-sm'}>
                          {errors.province?.message}
                        </p>
                      </div>
                      <div className={'flex flex-col '}>
                        <p className={'text-[16px] font-bold pb-4'}>
                          Huyện / Thành Phố
                        </p>
                        <select
                          {...fromUpdate('district')}
                          className="w-full px-4 py-3 mb-4 border rounded-md outline-none"
                          onChange={handleDistrictChange}
                        >
                          <option value="">Chọn quận/huyện</option>
                          {districts?.map((district: any, index: number) => (
                            <option key={index} value={district.code}>
                              {district.name}
                            </option>
                          ))}
                        </select>
                        <p className={'pl-1 text-red-500 text-sm'}>
                          {errors.district?.message}
                        </p>
                      </div>
                      <div className={'flex flex-col '}>
                        <p className={'text-[16px] font-bold pb-4'}>
                          Phường / Xã
                        </p>
                        <select
                          {...fromUpdate('ward')}
                          className="w-full px-4 py-3 mb-4 border rounded-md outline-none"
                          onChange={handleWardChange}
                        >
                          <option value="">Chọn phường/xã</option>
                          {wards.map((ward: any, index: number) => (
                            <option key={index} value={ward.code}>
                              {ward.name}
                            </option>
                          ))}
                        </select>
                        <p className={'pl-1 text-red-500 text-sm'}>
                          {errors.ward?.message}
                        </p>
                      </div>
                      <div className="">
                        <p className={'text-[16px] font-bold pb-4'}>Địa chỉ</p>
                        <input
                          {...fromUpdate('address')}
                          className="w-full px-4 py-3 mb-4 border rounded-md outline-none"
                          type="text"
                        />
                      </div>
                      <p className={'pl-1 text-red-500 text-sm'}>
                        {errors.address?.message}
                      </p>
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
                        Sửa
                      </button>
                      <button
                        className={
                          'bg-gray-400 px-4 py-2 rounded shadow hover:opacity-80 transition'
                        }
                        type="reset"
                        onClick={() => {
                          setOpenModal(!openModal)
                        }}
                      >
                        Trở về
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </Modal>
          </div>
          <div className={'mt-4'}>
            {/* <EnhancedUserTable listUser={users?.data ?? []} /> */}
            <div className="flex flex-col bg-white shadow rounded">
              <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                  <div className="overflow-hidden">
                    <table className="min-w-full text-left text-sm font-light">
                      <thead className="border-b font-medium dark:border-neutral-500">
                        <tr>
                          <th scope="col" className="px-6 py-4">
                            Tỉnh
                          </th>
                          <th scope="col" className="px-6 py-4">
                            Huyện / Thành Phố
                          </th>
                          <th scope="col" className="px-6 py-4">
                            Phường / Xã
                          </th>
                          <th scope="col" className="px-6 py-4">
                            Địa chỉ
                          </th>
                          <th scope="col" className="px-6 py-4">
                            Thao tác
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {dataAddress?.data?.map((item, index: number) => {
                          return (
                            <tr
                              key={index}
                              className="border-b dark:border-neutral-500"
                            >
                              <td className="whitespace-nowrap px-6 py-4">
                                {item.province}
                              </td>
                              <td className="whitespace-nowrap px-6 py-4">
                                {item.district}
                              </td>
                              <td className="whitespace-nowrap px-6 py-4">
                                {item.ward}
                              </td>
                              <td className="whitespace-nowrap px-6 py-4">
                                {item.address}
                              </td>
                              <td className="whitespace-nowrap px-6 py-4 flex gap-4">
                                <button
                                  onClick={() => handleAddressId(item.id)}
                                >
                                  Sửa
                                </button>
                                <button
                                  onClick={() => handleDeleteAddress(item.id)}
                                >
                                  Xóa
                                </button>
                              </td>
                            </tr>
                          )
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </HomeUser>
    </>
  )
}

export default AddressComponents
