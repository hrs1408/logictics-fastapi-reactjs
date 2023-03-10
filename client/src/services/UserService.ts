import axiosConfig from '../configs/AxiosConfig'
import { useMutation, useQuery } from 'react-query'

export const getUsers = (): Promise<ResponseSuccessType<UserTypes[]>> =>
  axiosConfig.get(`/users`)

export const useUsers = () => {
  return useQuery(['GET_USERS'], getUsers)
}

export const createUser = (
  data: any
): Promise<ResponseSuccessType<UserTypes>> =>
  axiosConfig.post(`/users/add-user-internal`, data)

export const useCreateUser = () => {
  return useMutation(['CREATE_USER'], createUser)
}
