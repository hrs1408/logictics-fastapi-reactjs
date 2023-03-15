import axiosConfig from '../configs/AxiosConfig'

export const createVoyage = (
  data: CreateVoyageType
): Promise<ResponseSuccessType<VoyageType>> =>
  axiosConfig.post(`/voyages`, data)

export const getVoyageByInvoice = (
  id: string
): Promise<ResponseSuccessType<VoyageType[]>> =>
  axiosConfig.get(`voyages/get-by-invoice/${id}`)
