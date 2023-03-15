import { useMutation, useQuery } from 'react-query'
import axiosConfig from '../configs/AxiosConfig'
import { number } from 'yup'

const getAddress = (): Promise<ResponseSuccessType<AddressType[]>> =>
  axiosConfig.get(`/delivery-address`)

export const useAddress = () => {
  return useQuery(['GET_ADDRESS'], getAddress)
}

const createAddress = (
  data: AddressType
): Promise<ResponseSuccessType<AddressType>> =>
  axiosConfig.post(`/delivery-address`, data)

export const useCreateAddress = () =>
  useMutation(['CREATE_ADDRESS'], createAddress)

const delteAddress = (
  address_id: number
): Promise<ResponseSuccessType<AddressType>> =>
  axiosConfig.delete(`/delivery-address/${address_id}`)

export const useDeleteAddress = () => {
  return useMutation(['DELETE_ADDRESS'], delteAddress)
}

const getOneAddress = (
  address_id: number
): Promise<ResponseSuccessType<AddressType>> =>
  axiosConfig.get(`/delivery-address/${address_id}`)

export const useOneAddress = (address_id: number) => {
  return useQuery(
    ['GET_ONE_ADDRESS', address_id],
    () => getOneAddress(address_id),
    {
      enabled: !!address_id,
    }
  )
}

const updateAddress = ({
  data,
  id,
}: {
  data: AddressCreateType
  id: number
}): Promise<ResponseSuccessType<AddressType>> =>
  axiosConfig.put(`/delivery-address/${id}`, data)

export const useUpdateAddress = () => {
  return useMutation(['UPDATE_ADDRESS'], updateAddress)
}
