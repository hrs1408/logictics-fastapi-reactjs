import axiosConfig from '../configs/AxiosConfig'
import Cookies from 'js-cookie'
import { REFRESH_TOKEN_KEY, TOKEN_KEY } from '../constants/Enviroment'

export const postRegisterApi = (
  data: SignUpType
): Promise<ResponseSuccessType<TokenResponseType>> =>
  axiosConfig.post(`/auth/register`, data)

export const postLoginApi = (
  data: SignInType
): Promise<ResponseSuccessType<TokenResponseType>> =>
  axiosConfig.post(`/auth/login`, data)

export const getMeApi = (): Promise<ResponseSuccessType<AuthType>> =>
  axiosConfig.get(`/auth/get-me`)

export const postLogoutApi = (): Promise<ResponseSuccessType<any>> =>
  axiosConfig.post(`/auth/logout`)

export const postRefreshTokenApi = (
  data: PostRefreshTokenType
): Promise<ResponseSuccessType<TokenResponseType>> =>
  axiosConfig.post(`/auth/refresh-token`, data)

export const saveToken = ({
  accessToken,
  tokenExpiresMinutes,
  refreshTokenExpiresMinutes,
  refreshToken,
  tokenType,
}: TokenResponseType) => {
  Cookies.set(TOKEN_KEY, accessToken)
  Cookies.set(REFRESH_TOKEN_KEY, refreshToken)
  localStorage.setItem(TOKEN_KEY, accessToken)
}

export const removeToken = () => {
  Cookies.remove(TOKEN_KEY)
  Cookies.remove(REFRESH_TOKEN_KEY)
  localStorage.removeItem(TOKEN_KEY)
}
