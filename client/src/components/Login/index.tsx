import React, { useState, useEffect } from 'react'
import { AiOutlinePhone, AiOutlineUser } from 'react-icons/ai'
import { RiLockPasswordFill, RiLoginCircleFill, RiLockPasswordLine } from 'react-icons/ri'
import { MdEmail } from 'react-icons/md'
import './auth.scss';

const Login = () => {

  const [provinces, setProvinces] = useState<any>([]);

  const fetchData = async () => {
    const res = await fetch(`https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json`);
    const data = await res.json();
    setProvinces(data);
  }

  useEffect(() => {
    fetchData();
  }, []);

  const [toggleState, setToggleState] = useState(1);
  const toggleTab = (index: number) => {
    setToggleState(index);
  };

  return (
    <>
      <div className='section-login'>
        <div className="">
          <div className="tab-container">
            <div className="bloc-tabs flex gap-1 ">
              <button
                className={toggleState === 1 ? "tabs active-tabs" : "tabs"}
                onClick={() => toggleTab(1)}
              >
                <div className="nav-list flex gap-2 items-center  w-full justify-center">
                  <RiLoginCircleFill className='mt-[1px] text-[18px]' />
                  Đăng nhập
                </div>
              </button>
              <button
                className={toggleState === 2 ? "tabs active-tabs" : "tabs"}
                onClick={() => toggleTab(2)}
              >
                <div className="nav-list flex gap-2 items-center text-center w-full justify-center ">
                  <MdEmail className='mt-1 text-[18px]' />
                  Tạo tài khoản
                </div>
              </button>

            </div>
            <div className="content-tabs">
              <div
                className={toggleState === 1 ? "content  active-content" : "content"}
              >
                <form className='p-[15px] ' action="">
                  <div className="input-wrapper mt-2">
                    <span className='input-icon'>
                      <AiOutlineUser />
                    </span>
                    <input placeholder="Email" type="email" ></input>
                  </div>
                  <div className="input-wrapper mt-6">
                    <span className='input-icon'>
                      <RiLockPasswordFill />
                    </span>
                    <input placeholder="Nhập mật khẩu" type="password" ></input>
                  </div>
                  <div className="text-right mt-1">
                    <a href='' className="forgot-password ">Quên mật khẩu?</a>
                  </div>
                  <button type='submit' className="login-submit mt-2">
                    ĐĂNG NHẬP
                  </button>
                  <hr className='mt-[25px] ' />
                  <div className='text-center mt-2'>
                    <span className='text-[14px]'>Bạn chưa có tài khoản?</span>
                  </div>
                  <div className={`${toggleState === 2 ? "tabs active-tabs" : "tabs"} login-submit cursor-pointer flex items-center justify-center mt-2`}
                    onClick={() => toggleTab(2)}>
                    TẠO TÀI KHOẢN
                  </div>
                </form>
              </div>
              <div
                className={toggleState === 2 ? "content  active-content" : "content"}
              >
                <form className='p-[15px]'>
                  <h3 className='title-form'>Đăng ký tài khoản bằng Email</h3>
                  <div className="input-wrapper ">
                    <span className='text-[21px]'><AiOutlineUser /></span>
                    <input type="text" placeholder='Tên khách hàng' />
                  </div>
                  <div className="input-wrapper">
                    <span className='text-[21px]'><AiOutlineUser /></span>
                    <input type="email" placeholder='Địa chỉ Email' />
                  </div>
                  <div className="input-wrapper">
                    <span className='text-[21px]'><AiOutlinePhone /></span>
                    <input type="text" placeholder='Số điện thoại' />
                  </div>
                  <div className="input-wrapper">
                    <span className='text-[21px]'><RiLockPasswordLine /></span>
                    <input type="password" placeholder='Mật khẩu' />
                  </div>
                  <div className="input-wrapper">
                    <span className='text-[21px]'><RiLockPasswordLine /></span>
                    <input type="password" placeholder='Nhập lại mật khẩu' />
                  </div>
                  <div className="input-wrapper">
                    <select className='w-full outline-none h-full' >
                      <option value="">Khu vực khách hàng</option>
                      {
                        provinces?.map((item: any, index: number) => {
                          return (
                            <option key={index} value={item.Id}>{item.Name}</option>
                          )
                        })
                      }
                    </select>
                  </div>
                  <div className="flex items-center text-center justify-between mt-8">
                    <span className='flex gap-1 text-[15px]'>Bạn đã tài khoản?
                      <div className={`${toggleState === 1 ? "tabs active-tabs" : "tabs"} text-[#321fdb] cursor-pointer hover:underline `}
                        onClick={() => toggleTab(1)}>
                        Đăng nhập ngay
                      </div>
                    </span>
                    <button type='submit' className="h-[40px] text-[#000] text-[16px] bg-[#fdd800] font-medium w-[30%] hover:opacity-[0.8] rounded-[4px]">
                      ĐĂNG KÝ
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login