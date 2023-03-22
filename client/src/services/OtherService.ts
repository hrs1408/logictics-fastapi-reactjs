import axios from 'axios'
import { useMutation, useQuery } from 'react-query'
import axiosConfig from '../configs/AxiosConfig'



export const getProvince = (): Promise<Province[]> =>
  axios
    .get(
      `https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json`
    )
    .then(res => res.data)

export const useProvince = () => {
  return useQuery(['GET_PROVINCE'], getProvince)
}


const getOrder = (): Promise<ResponseSuccessType<InvoiceType[]>> =>
  axiosConfig.get(`/invoice/get-by-user`)

export const useGetOrder = () => {
  return useQuery(['GET_ORDER'], getOrder)
}

