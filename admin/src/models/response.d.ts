type ResponseSuccessType<T> = Response & {
    message: string;
    result: T;
};

type TokenResponseType = {
    exp: string;
    token: string;
    tokenType: string;
};

type PostRefreshTokenType = {
    refreshToken: string;
    accessToken: string;
};

