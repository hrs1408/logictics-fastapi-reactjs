import React, { useEffect, useState } from 'react'
import { AiOutlinePhone, AiOutlineUser } from 'react-icons/ai'
import { RiLockPasswordLine } from 'react-icons/ri'
import { useNavigate } from 'react-router-dom'
import { TabType } from '..'
import axiosConfig from '../../../configs/AxiosConfig'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'

interface IRegister {
  changeTab: (tab: TabType) => void
}

const schema = yup.object().shape({
  full_name: yup.string().required('Tên khách hàng là trường bắt buộc'),
  email: yup
    .string()
    .email('Email không đúng định dạng')
    .required('Email là trường bắt buộc'),
  phone: yup.string().required('Số điện thoại là trường bắt buộc'),
  password: yup.string().required('Mật khẩu là trường bắt buộc'),
  confirm_password: yup
    .string()
    .label('confirm password')
    .oneOf([yup.ref('password')], 'Nhập lại mật khẩu chưa chính xác'),
  address: yup.string().required('Khu vực khách hành là trường bắt buộc'),
})

const Register = ({ changeTab }: IRegister) => {
  const [provinces, setProvinces] = useState<any>([])
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SignUpType>({
    resolver: yupResolver(schema),
  })
  const [error, setError] = useState<string[]>([])

  const fetchData = async () => {
    const res = await fetch(
      `https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json`
    )
    const data = await res.json()
    setProvinces(data)
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleRegister = (data: SignUpType) => {
    axiosConfig
      .post('/auth/register', data)
      .then(async res => {
        navigate('/login')
        reset({
          full_name: '',
          phone: '',
          confirm_password: '',
          email: '',
          password: '',
          address: '',
        })
      })
      .catch(err => {
        setError([])
        if (typeof err.data === 'string') {
          console.log(err.data)
          setError(e => [...e, err.data])
        } else {
          const error: DetailError[] = err.data
          setError([...error.map(e => e.msg)])
        }
      })
  }

  return (
    <form onSubmit={handleSubmit(handleRegister)} className="p-[15px]">
      <h3 className="title-form">Đăng ký tài khoản bằng Email</h3>
      <div className="input-wrapper ">
        <span className="text-[21px]">
          <AiOutlineUser />
        </span>
        <input
          {...register('full_name')}
          type="text"
          placeholder="Tên khách hàng"
        />
      </div>
      <p className={'pl-1 text-red-500 text-sm'}>{errors.full_name?.message}</p>
      <div className="input-wrapper">
        <span className="text-[21px]">
          <AiOutlineUser />
        </span>

        <input
          {...register('email')}
          type="email"
          placeholder="Địa chỉ Email"
        />
      </div>
      <p className={'pl-1 text-red-500 text-sm'}>{errors.email?.message}</p>
      <div className="input-wrapper">
        <span className="text-[21px]">
          <AiOutlinePhone />
        </span>

        <input {...register('phone')} type="text" placeholder="Số điện thoại" />
      </div>
      <p className={'pl-1 text-red-500 text-sm'}>{errors.phone?.message}</p>
      <div className="input-wrapper">
        <span className="text-[21px]">
          <RiLockPasswordLine />
        </span>
        <input
          {...register('password')}
          type="password"
          placeholder="Mật khẩu"
        />
      </div>
      <p className={'pl-1 text-red-500 text-sm'}>{errors.password?.message}</p>
      <div className="input-wrapper">
        <span className="text-[21px]">
          <RiLockPasswordLine />
        </span>

        <input
          {...register('confirm_password')}
          type="password"
          placeholder="Nhập lại mật khẩu"
        />
      </div>
      <p className={'pl-1 text-red-500 text-sm'}>
        {errors.confirm_password?.message}
      </p>
      <div className="input-wrapper">
        <select className="w-full outline-none h-full" {...register('address')}>
          <option value="">Khu vực khách hàng</option>
          {provinces?.map((item: any, index: number) => {
            return (
              <option key={index} value={item.Id}>
                {item.Name}
              </option>
            )
          })}
        </select>
      </div>
      <p className={'pl-1 text-red-500 text-sm'}>{errors.address?.message}</p>
      {error.length > 0 && (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-5"
          role="alert"
        >
          {error.map((message, index) => (
            <span key={index} className="block sm:inline">
              {message}
            </span>
          ))}
        </div>
      )}

      <div className="flex items-center text-center justify-between mt-5">
        <span className="flex gap-1 text-[15px]">
          Bạn đã tài khoản?
          <div
            className={`tabs active-tabs text-[#321fdb] cursor-pointer hover:underline `}
            onClick={() => changeTab('TabLogin')}
          >
            Đăng nhập ngay
          </div>
        </span>
        <button
          type="submit"
          className="h-[40px] text-[#000] text-[16px] bg-[#fdd800] font-medium w-[30%] hover:opacity-[0.8] rounded-[4px]"
        >
          ĐĂNG KÝ
        </button>
      </div>
    </form>
  )
}

export default Register
