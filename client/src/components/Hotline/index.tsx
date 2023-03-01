import React from 'react'
import { CiLocationOn } from "react-icons/ci"
import { BsBoxSeam } from "react-icons/bs"
import "./index.scss"
const Hotline = () => {
    return (
        <>
            <div className="bg-[#F6F6F6] w-full h-[100px] mt-[60px]"></div>
            <div className='w-full hotline-footer'>
                <div className="container mx-auto text-center pb-[3rem] pt-[3rem] ">
                    <a className="hotline text-[45px] text-white font-bold" href="tel:1900 63 6688">HOTLINE: 1900 63 6688</a>
                    <p className="text-nn text-[17px] pt-3 text-white">Liên hệ ngay Nhất Tín Logistics để được tư vấn chi tiết và có giá dịch vụ tốt nhất!</p>
                    <p className='text-[#FCD804] text-[20px] pt-3 '>Lấy hàng tận nơi - Giao hàng tận tay - Phục vụ tận tâm</p>
                    <div className="flex gap-10 text-center justify-center mt-10">
                        <a className='location' href="">
                            <CiLocationOn className='text-[40px] ' />
                            Tìm bưu cục gần bạn
                        </a>
                        <a className='location' href="">
                            <BsBoxSeam className='text-[35px]' />
                            Tra cứu giá cước
                        </a>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Hotline