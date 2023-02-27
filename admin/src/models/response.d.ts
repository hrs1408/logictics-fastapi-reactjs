type ResponseSuccessType<T> = Response & {
    message: string;
    data: T;
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

