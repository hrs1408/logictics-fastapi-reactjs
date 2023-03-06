import axios, {AxiosRequestConfig} from 'axios';
import Cookies from 'js-cookie';
import {
    BASE_API,
    REFRESH_TOKEN_KEY,
    TOKEN_KEY,
} from '../constants/Enviroment';
import {postRefreshTokenApi, saveToken} from '../services/AuthService';
import {camelizeKeys} from 'humps';

const instance = axios.create({
    baseURL: BASE_API,
    headers: {
        'Content-Type': 'application/json',
    },
});

instance.interceptors.request.use(async (config: any) => {
    const token = Cookies.get(TOKEN_KEY);
    const refreshToken = Cookies.get(REFRESH_TOKEN_KEY);
    if (
        !token &&
        refreshToken &&
        config.url &&
        config.url.indexOf('/auth/refresh-token') < 0 &&
        config.url.indexOf('/auth/login') < 0
    ) {
        const accessToken = localStorage.getItem(TOKEN_KEY) ?? '';

        if (!refreshToken) {
            return config;
        }

        try {
            const {data} = await postRefreshTokenApi({
                refreshToken,
                accessToken,
            });
            saveToken(data);
            /* Adding the new token to the header of the request. */
            Object.assign(config.headers as any, {
                Authorization: `Bearer ${data.accessToken}`,
            });
        } catch (e) {
        }

        return config;
    }

    Object.assign(config.headers as any, {
        Authorization: `Bearer ${token}`,
    });

    return config;
});

instance.interceptors.response.use(
    (response) => {
        if (
            response.data &&
            response.headers['content-type'] === 'application/json'
        ) {
            response.data = camelizeKeys(response.data);
        }
        return response.data ? response.data : response;
    },
    async (error) => {
        const config = error.config;
        if (
            error.response.statusCode === 401 &&
            !config._retry &&
            window.location.pathname !== '/login'
        ) {
            config._retry = true;

            const refreshToken = Cookies.get(REFRESH_TOKEN_KEY);
            const accessToken = localStorage.getItem(TOKEN_KEY) ?? '';
            if (!refreshToken) {
                window.location.href = '/login';
                return Promise.reject(error);
            }

            try {
                const {data} = await postRefreshTokenApi({
                    refreshToken,
                    accessToken,
                });
                saveToken(data);

                Object.assign(config.headers as any, {
                    Authorization: `Bearer ${data.accessToken}`,
                });

                return instance(config);
            } catch (e) {
                window.location.href = '/login';
                return Promise.reject(error);
            }
        }

        if (error.response) {
            return Promise.reject(error.response.data);
        } else {
            return Promise.reject(error);
        }
    }
);

export default instance;