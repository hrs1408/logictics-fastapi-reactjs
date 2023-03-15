import axiosConfig from '../configs/AxiosConfig'
import { useMutation, useQuery } from 'react-query'

export const getUsers = ({
  search = '',
}: QueryParamType): Promise<ResponseSuccessType<UserType[]>> => {
  return axiosConfig.get(`/users`, {
    params: {
      page: 1,
      size: 100,
      search,
      isFull: true,
    },
  })
}
export const useUsers = ({ page, size, search, is_full }: QueryParamType) => {
  return useQuery(['GET_USERS', search], () =>
    getUsers({ page, size, search, is_full })
  )
}

export const createUser = (
  data: CreateUserType
): Promise<ResponseSuccessType<UserType>> =>
  axiosConfig.post(`/users/add-user-internal`, data)

export const useCreateUser = () => {
  return useMutation(['CREATE_USER'], createUser)
}
export const updateUser = (
  data: UpdateUserType
): Promise<ResponseSuccessType<UserType>> =>
  axiosConfig.put(`/users/information`, data)

export const useUpdateUser = () => {
  return useMutation(['UPDATE_USER'], updateUser)
}

const getUserById = (id: number): Promise<ResponseSuccessType<UserType>> =>
  axiosConfig.get(`/users/${id}`)

export const useUserById = (id: number) => {
  return useQuery(['GET_USER_BY_ID', id], () => getUserById(id), {
    enabled: !!id,
  })
}
