import axiosConfig from '../configs/AxiosConfig'
import { useMutation } from 'react-query'

export const CreateInvoice = (
  data: CreateInvoiceType
): Promise<ResponseSuccessType<InvoiceCreateResponse>> => {
  return axiosConfig.post(`/invoice`, data)
}

export const useCreateInvoice = () => {
  return useMutation(['CREATE_INVOICE'], CreateInvoice)
}
