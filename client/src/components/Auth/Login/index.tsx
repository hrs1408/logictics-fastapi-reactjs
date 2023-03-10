import { yupResolver } from '@hookform/resolvers/yup'
import React from 'react'
import { useForm } from 'react-hook-form'
import { AiOutlineUser } from 'react-icons/ai'
import { RiLockPasswordFill } from 'react-icons/ri'
import { saveToken } from '../../../services/AuthService'
import * as yup from 'yup'
import axiosConfig from '../../../configs/AxiosConfig'
import { useNavigate } from 'react-router-dom'
import { TabType } from '..'

const schema = yup.object().shape({
  email: yup
    .string()
    .email('Email là trường bắt buộc')
    .required('Email là trường bắt buộc'),
  password: yup.string().required('Mật khẩu là trường bắt buộc'),
})

interface ILogin {
  changeTab: (tab: TabType) => void
}

const Login = ({ changeTab }: ILogin) => {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SignInType>({
    resolver: yupResolver(schema),
  })
  const handleLogin = (data: SignInType) => {
    axiosConfig
      .post('/auth/login', data)
      .then(async res => {
        saveToken(res.data)
        // await getMeForce();
        navigate('/dashboard')
        reset({
          email: '',
          password: '',
        })
      })
      .catch(err => {
        console.log(err)
      })
  }

  return (
    <form onSubmit={handleSubmit(handleLogin)} className="p-[15px] ">
      <div className="input-wrapper mt-2">
        <span className="input-icon">
          <AiOutlineUser />
        </span>
        <input {...register('email')} placeholder="Email" type="email"></input>
      </div>
      <p className={'text-red-500 text-sm'}>{errors.email?.message}</p>
      <div className="input-wrapper mt-6">
        <span className="input-icon">
          <RiLockPasswordFill />
        </span>
        <input
          {...register('password')}
          placeholder="Nhập mật khẩu"
          type="password"
        ></input>
      </div>
      <p className={'text-red-500 text-sm'}>{errors.password?.message}</p>
      <div className="text-right mt-1">
        <a href="" className="forgot-password ">
          Quên mật khẩu?
        </a>
      </div>
      <button type="submit" className="login-submit mt-2">
        ĐĂNG NHẬP
      </button>
      <hr className="mt-[25px] " />
      <div className="text-center mt-2">
        <span className="text-[14px]">Bạn chưa có tài khoản?</span>
      </div>
      <div
        className={`tabs login-submit cursor-pointer flex items-center justify-center mt-2`}
        onClick={() => changeTab('TabRegister')}
      >
        TẠO TÀI KHOẢN
      </div>
    </form>
  )
}

export default Login
