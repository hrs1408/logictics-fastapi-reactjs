import axios from 'axios';
import Cookies from 'js-cookie';
import {
    BASE_API,
    TOKEN_KEY,
} from '../constants/Enviroment';
import {camelizeKeys} from 'humps';

const instance = axios.create({
    baseURL: BASE_API,
    headers: {
        'Content-Type': 'application/json',
    },
});

instance.interceptors.request.use(async (config: any) => {
    const token = Cookies.get(TOKEN_KEY);

    if (
        !token &&
        config.url &&
        config.url.indexOf('/login') < 0
    ) {
        try {
            Object.assign(config.headers as any, {
                Authorization: `Bearer ${token}`,
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

            const accessToken = localStorage.getItem(TOKEN_KEY) ?? '';

            try {
                Object.assign(config.headers as any, {
                    Authorization: `Bearer ${accessToken}`,
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