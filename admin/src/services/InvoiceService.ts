import axiosConfig from '../configs/AxiosConfig'
import { useMutation, useQuery } from 'react-query'

export const CreateInvoice = (
  data: CreateInvoiceType
): Promise<ResponseSuccessType<InvoiceType>> => {
  return axiosConfig.post(`/invoice`, data)
}

export const useCreateInvoice = () => {
  return useMutation(['CREATE_INVOICE'], CreateInvoice)
}

export const getInvoices = ({
  page,
  size,
  search,
  isFull,
}: QueryParamType): Promise<ResponseSuccessType<InvoiceType[]>> => {
  return axiosConfig.get(`/invoice`, {
    params: {
      page,
      size,
      search,
      isFull,
    },
  })
}

export const useGetAllInvoices = ({
  page = 1,
  size = 10,
  search = '',
  isFull = true,
}: QueryParamType) => {
  return useQuery(
    ['GET_INVOICES', page, size, search, isFull],
    () => getInvoices({ page, size, search, isFull }),
    {
      refetchOnMount: true,
      refetchOnWindowFocus: true,
    }
  )
}

const updateStatusInvoices = (data: InvoicesUpdateStatusPayload) =>
  axiosConfig.put(`invoice/change-status`, data)

export const useUpdateStatusInvoices = () => {
  return useMutation(['UPDATE_STATUS_INVOICES'], updateStatusInvoices)
}

const deleteInvoice = (id: string) => axiosConfig.delete(`invoice/${id}`)

export const useDeleteInvoice = () => {
  return useMutation(['DELETE_INVOICE'], deleteInvoice)
}
