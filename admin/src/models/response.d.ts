type ResponseSuccessType<T> = Response & {
  data: T
  meta?: Meta
  statusCode?: number
}

type Meta = {
  error?: boolean
  message?: string
}

type TokenResponseType = {
  accessToken: string
  tokenExpiresMinutes: string
  refreshTokenExpiresMinutes: string
  refreshToken: string

  tokenType: string
}

type PostRefreshTokenType = {
  refreshToken: string
  accessToken: string
}

type ErrorResponse = {
  data?: Datum[]
  meta?: Meta
  statusCode?: number
}

type Datum = {
  loc?: string[]
  msg?: string
  type?: string
}
