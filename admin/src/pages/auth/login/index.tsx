import './login.scss'
import * as yup from 'yup';
import {useForm} from "react-hook-form";
import {yupResolver} from '@hookform/resolvers/yup';
import {Link, useNavigate} from "react-router-dom";
import axiosConfig from "../../../configs/AxiosConfig";
import {saveToken} from "../../../services/AuthService";
import {AuthContext} from '../../../context/AuthContext';
import React, {useContext} from "react";


const schema = yup.object().shape({
    email: yup
        .string()
        .email('Email invalidate')
        .required('Email is required field'),
    password: yup.string().required('Password is required field'),
});
const Login = () => {
    const {getMeForce} = useContext(AuthContext) as AuthContextType;
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        reset,
        formState: {errors},
    } = useForm<SignInType>({
        resolver: yupResolver(schema),
    });

    const handleLogin = (data: SignInType) => {
        axiosConfig.post('/auth/login', data).then(async res => {
            saveToken(res.data);
            await getMeForce();
            navigate('/');
            reset({
                email: '',
                password: '',
            });
        }).catch(err => {
            console.log(err)
        })
    }
    return (
        <div className={'login-wrapper w-full h-screen'}>
            <div
                className={'login-form w-[370px] md:w-[500px] bg-white p-4 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 shadow rounded-xl'}>
                <p className={'text-[26px] font-bold text-center'}>LOGIN WORKSPACE</p>
                <p className={'text-[14px] text-center text-gray-500'}>Log in to the website you are working on</p>
                <form onSubmit={handleSubmit(handleLogin)}>
                    <div className={'input-group py-1 flex flex-col'}>
                        <label htmlFor="username" className={'font-bold pb-2'}>Email</label>
                        <input {...register('email')} type="text" id={'email'}
                               className={'border border-2 p-2 rounded outline-none focus:border-b-yellow-500 transition'}/>
                        <p className={'text-red-500 text-sm'}>{errors.email?.message}</p>
                    </div>
                    <div className={'input-group py-1 flex flex-col'}>
                        <label htmlFor="password" className={'font-bold pb-2'}>Password</label>
                        <input {...register('password')} type="password" id={'password'}
                               className={'border border-2 p-2 rounded outline-none focus:border-b-yellow-500 transition'}/>
                        <p className={'text-red-500 text-sm'}>{errors.password?.message}</p>
                    </div>
                    <div className={'flex justify-between py-2'}>
                        <div className={'flex items-center'}>
                            <input type="checkbox" id={'remember'}/>
                            <label htmlFor="remember" className={'font-semibold text-[14px] pl-2'}>Remember me</label>
                        </div>
                        <div className={'flex items-center'}>
                            <Link to={''} className={'hover:text-yellow-500 transition'}>Forgot password</Link>
                        </div>
                    </div>
                    <div className={'input-group py-1 flex flex-col'}>
                        <button type={'submit'}
                                className={'bg-yellow-500 text-white p-2 rounded mt-4 hover:opacity-80 transition'}>Login
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login