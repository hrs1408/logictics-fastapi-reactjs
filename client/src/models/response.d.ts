type ResponseSuccessType<T> = Response & {
  message: string;
  data: T;
  items: T[];
};

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

type DetailError = {
  loc: string[];
  msg: string;
  type: string;
};
