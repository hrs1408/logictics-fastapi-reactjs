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
  is_full,
}: QueryParamType): Promise<ResponseSuccessType<InvoiceType[]>> => {
  return axiosConfig.get(`/invoice`, {
    params: {
      page,
      size,
      search,
      is_full: is_full,
    },
  })
}

export const useGetAllInvoices = ({
  page = 1,
  size = 10,
  search = '',
  is_full = true,
}: QueryParamType) => {
  return useQuery(
    ['GET_INVOICES', page, size, search, is_full],
    () => getInvoices({ page, size, search, is_full: is_full }),
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
