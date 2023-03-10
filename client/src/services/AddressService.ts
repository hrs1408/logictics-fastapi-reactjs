import { useMutation, useQuery } from 'react-query'
import axiosConfig from '../configs/AxiosConfig'

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
  axiosConfig.put(`/delivery-address/${address_id}`)

export const useOneAddress = () => {
  return useMutation(['GET_ONE_ADDRESS'], getOneAddress)
}
