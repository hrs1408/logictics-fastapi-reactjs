// type ResponseSuccessType<T> = Response & {
//   message: string;
//   data: T;
//   items: T[];
// };

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
  accessToken: string;
  tokenExpiresMinutes: string;
  refreshTokenExpiresMinutes: string;
  refreshToken: string;

  tokenType: string;
};

type PostRefreshTokenType = {
  refreshToken: string;
  accessToken: string;
};

type ResponseError = {
  message: string;
  data: DetailError[];
};
type ErrorResponse = {
  data?: Datum[]
  meta?: Meta
  statusCode?: number
}

type DetailError = {
  loc: string[];
  msg: string;
  type: string;
};

type Datum = {
  loc?: string[]
  msg?: string
  type?: string
}