import axiosConfig from "../configs/AxiosConfig";
import Cookies from "js-cookie";
import {TOKEN_KEY} from '../constants/Enviroment';


export const getMeApi = (): Promise<ResponseSuccessType<AuthType>> =>
    axiosConfig.get(`/get_me`);

export const saveToken = ({token,tokenType,exp,}: TokenResponseType) => {
    Cookies.set(TOKEN_KEY, token, {
        expires: Number(exp) / 1440 - 1 / 86400,
    });

    localStorage.setItem(TOKEN_KEY, token);
};

export const removeToken = () => {
    Cookies.remove(TOKEN_KEY);
};