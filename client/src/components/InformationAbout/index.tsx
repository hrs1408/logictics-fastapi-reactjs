import React from 'react'
import { GiReceiveMoney } from 'react-icons/gi'
import { FaShippingFast } from 'react-icons/fa'
import { BiSupport } from 'react-icons/bi'
import { BsShieldFillCheck } from 'react-icons/bs'
import { TbCalendarTime } from 'react-icons/tb'
import { CiLocationOn } from 'react-icons/ci'
import { MdPlayArrow } from 'react-icons/md'
import { RiLuggageCartLine, Ri24HoursFill } from 'react-icons/ri'
import { Link } from 'react-router-dom'
import "./index.scss"
const Informationabout = () => {
    return (
        <div className='w-full wp-about'>
            <div className="container mx-auto">
                <div className="grid grid-cols-12 items-center">
                    <div className="col-span-6 left-about z-10 text-center">
                        <h1 className='text-service font-bold text-white '>
                            Tại sao nên lựa chọn
                            <span className="text-[#FCD804] ">Nhất Tín Logistics?</span>
                        </h1>
                        <p className="summary text-white tracking-[-0.02rem] mt-[0.5rem] pr-[4rem] mb-[3rem]">Chúng tôi cung cấp đa dạng các giải pháp logistics tối ưu khắp 63 tỉnh thành,
                            <br />
                            đáp ứng mọi nhu cầu của Đối tác Doanh nghiệp & Khách hàng Cá nhân
                            <br />
                            như dịch vụ Chuyển phát Nhanh, Chuyển phát Quốc tế, Chuyển phát Thu hộ (COD), Cho thuê Kho bãi, Hoàn thiện đơn hàng... với văn hóa phục vụ
                            <br />
                            Thân thiện - Nhiệt tình - Tận tâm.
                        </p>
                        <div className="grid grid-cols-3 about mt-10">
                            <div className="item-about ">
                                <div className="flex justify-center">
                                    <Ri24HoursFill className='text-[65px] text-[#FFE001] ' />
                                </div>
                                <h5 className="text-[16px] font-medium mt-5 text-[#fff] leading-[22px] pl-[1rem] pr-[1rem] ">
                                    Hoàn tiền COD chỉ trong 24h
                                </h5>
                            </div>
                            <div className="item-about ">
                                <div className="flex justify-center">
                                    <GiReceiveMoney className='text-[65px] text-[#FFE001] ' />
                                </div>
                                <h5 className="text-[16px] font-medium mt-5 text-[#fff] leading-[22px] pl-[1rem] pr-[1rem] ">
                                    Miễn cước thu hộ lên đến 5 triệu đồng
                                </h5>
                            </div>
                            <div className="item-about ">
                                <div className="flex justify-center">
                                    <CiLocationOn className='text-[65px] text-[#FFE001] ' />
                                </div>
                                <h5 className="text-[16px] font-medium mt-5 text-[#fff] leading-[22px] pl-[1rem] pr-[1rem] ">
                                    Mạng lưới phủ sóng 63 tỉnh thành
                                </h5>
                            </div>


                        </div>
                        <Link className='hover:text-[#fcd804] mt-10 m-auto flex items-center gap-2 justify-center w-[189px] h-[38px] bg-[#FFFFFF] rounded-[4px] leading-[34px]  ' to={'/'}>
                            Gửi hàng ngay
                            <MdPlayArrow className='text-[22px] ' />
                        </Link>
                    </div>
                    <div className="col-span-6">
                        <ul>
                            <li className='mt-[20px] pb-[15px] pl-[3rem]'>
                                <div className="flex gap-5">
                                    <span className='about-icon'><FaShippingFast className='text-[#2F302F] ' /></span>
                                    <div className="">
                                        <div className="title-about text-[24px] font-bold text-[#2F302F] ">Giao hàng hỏa tốc</div>
                                        <span className='text-[17px]'>
                                            Vận chuyển hàng nội thành siêu nhanh chỉ trong 3 tiếng
                                            <br />
                                            Gửi liên tỉnh nhận liền ngay sau 12 - 24 tiếng
                                        </span>
                                    </div>
                                </div>
                            </li>
                            <li className='mt-[20px] pb-[15px] pl-[3rem]'>
                                <div className="flex gap-5">
                                    <span className='about-icon'><TbCalendarTime className='text-[#2F302F] ' /></span>
                                    <div className="">
                                        <div className="title-about text-[24px] font-bold text-[#2F302F] ">Kiểm soát thời gian thực</div>
                                        <span className='text-[17px]'>
                                            Khách hàng luôn nắm rõ vị trí kiện hàng đang ở đâu,
                                            <br />
                                            thông tin người vận chuyển và thời gian hàng được giao đến
                                        </span>
                                    </div>
                                </div>
                            </li>
                            <li className='mt-[20px] pb-[15px] pl-[3rem]'>
                                <div className="flex gap-5">
                                    <span className='about-icon'><RiLuggageCartLine className='text-[#2F302F] ' /></span>
                                    <div className="">
                                        <div className="title-about text-[24px] font-bold text-[#2F302F] ">Cơ sở vật chất hiện đại</div>
                                        <span className='text-[17px]'>
                                            Hệ thống kho bãi rộng rãi, xe tải 100% đóng thùng kín
                                            <br />
                                            Mạng lưới 400 bưu cục và điểm nhận trả hàng phủ sóng toàn quốc
                                        </span>
                                    </div>
                                </div>
                            </li>
                            <li className='mt-[20px] pb-[15px] pl-[3rem]'>
                                <div className="flex gap-5">
                                    <span className='about-icon'><BsShieldFillCheck className='text-[#2F302F] ' /></span>
                                    <div className="">
                                        <div className="title-about text-[24px] font-bold text-[#2F302F] ">Đảm bảo an toàn</div>
                                        <span className='text-[17px]'>
                                            Vận chuyển hàng nội thành siêu nhanh chỉ trong 3 tiếng
                                            <br />
                                            Gửi liên tỉnh nhận liền ngay sau 12 - 24 tiếng
                                        </span>
                                    </div>
                                </div>
                            </li>
                            <li className='mt-[20px] pb-[15px] pl-[3rem]'>
                                <div className="flex gap-5">
                                    <span className='about-icon'><BiSupport className='text-[#2F302F] ' /></span>
                                    <div className="">
                                        <div className="title-about text-[24px] font-bold text-[#2F302F] ">Hỗ trợ trực tuyến</div>
                                        <span className='text-[17px]'>
                                            Thời gian hỗ trợ từ 7:00 - 20:00 (thứ 2 - thứ 7) và
                                            <br />
                                            từ 8:00 - 18:00 (chủ nhật & các ngày lễ)
                                            <br />
                                            Phục vụ và giải đáp mọi thắc mắc của Khách hàng
                                            <br />
                                            Liên hệ với chúng tôi qua: Hotline, Facebook Messenger, Website Live Chat, Zalo Chat hoặc Email
                                        </span>

                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Informationabout