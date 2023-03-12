import axiosConfig from '../configs/AxiosConfig'
import { useMutation, useQuery } from 'react-query'

export const getPorts = ({
  page,
  size,
  search,
  isFull,
}: QueryParamType): Promise<ResponseSuccessType<PortType[]>> =>
  axiosConfig.get(`/ports`, {
    params: {
      page,
      size,
      search,
      isFull,
    },
  })

export const useGetAllPorts = ({
  page,
  size,
  search,
  isFull,
}: QueryParamType) =>
  useQuery(
    ['GET_PORTS', page, size, search, isFull],
    () => getPorts({ page, size, search, isFull }),
    {
      keepPreviousData: true,
      refetchOnMount: true,
      refetchOnWindowFocus: true,
    }
  )

const getPortById = (id: string): Promise<ResponseSuccessType<PortType>> =>
  axiosConfig.get(`/ports/${id}`)

export const useGetPortById = (id: string | undefined) =>
  useQuery(['GET_PORT_BY_ID', id], () => getPortById(id as string), {
    keepPreviousData: true,
    enabled: !!id,
  })

const createPort = (
  data: CreatePortType
): Promise<ResponseSuccessType<PortType>> => axiosConfig.post(`/ports`, data)

export const useCreatePort = () => useMutation(['CREATE_PORT'], createPort)

const updatePort = (
  data: CreatePortType & { id: string }
): Promise<ResponseSuccessType<PortType>> =>
  axiosConfig.put(`/ports/${data.id}`, data)
export const useUpdatePort = () => useMutation(['UPDATE_PORT'], updatePort)

const deletePort = (id: string): Promise<ResponseSuccessType<PortType>> =>
  axiosConfig.delete(`/ports/${id}`)

export const useDeletePort = () => useMutation(['DELETE_PORT'], deletePort)
