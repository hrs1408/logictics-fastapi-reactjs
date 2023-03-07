import axios from 'axios'
import { useQuery } from 'react-query'

export const getProvince = (): Promise<Province[]> =>
  axios
    .get(
      `https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json`
    )
    .then(res => res.data)

export const useProvince = () => {
  return useQuery(['GET_PROVINCE'], getProvince)
}
