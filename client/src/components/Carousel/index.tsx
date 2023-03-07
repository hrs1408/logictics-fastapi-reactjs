import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { AiOutlineFileAdd } from "react-icons/ai";
import { IoCloseOutline } from 'react-icons/io5'
import "./carousel.scss";

const Carousel = () => {
  const [isActive, setIsActive] = useState(false);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };

  return (
    <>
      <div className="carousel-inner z-50">
        <Link to={"/"}>
          <div className="carousel-bg "></div>
        </Link>
        <div className="carousel-content">
          <div className="more-than-log">Hơn cả một dịch vụ</div>
          <div className="bill-of-lading">
            <div className="bill-of-lading-item">
              <span className="top-slide "></span>
              <Link to={"/"}>
                <div className="box-cube">
                  <p className="text-[14px]">Tạo vận đơn</p>
                </div>
              </Link>
            </div>
            <div className="bill-of-lading-item z-50">
              <span className="top-slide"></span>
              <Link to={'/'}>
                <div className="box-cube active-box-cube">
                  <p className="text-[14px]">Tra cứu vận đơn</p>
                </div>
              </Link>
            </div>
            <div className="bill-of-lading-item">
              <span className="top-slide"></span>
              <Link to={'/'}>
                <div className="box-cube">
                  <p className="text-[14px]">Danh sách bưu cục</p>
                </div>
              </Link>
            </div>
          </div>
          <div className="w-full mt-5">
            <form className="mt-1">
              <div className="form-search">
                <input
                  className="input-search "
                  type="text"
                  placeholder="Nhập mã vận đơn"
                />
              </div>
              <div className="">
                <div typeof="submit" onClick={handleOpen} className="cursor-pointer btn-search flex items-center justify-center">
                  Tra cứu
                </div>
              </div>

            </form>
          </div>
          {open ? (
            <div className="relative">
              <div className="search-order absolute min-w-[917px] rounded-[4px] p-[30px]">
                <div className="flex justify-between ">
                  <div className="text-[20px] font-bold mb-[24px] leading-[24px] text-[#303844] ">
                    Mã Vận Đơn: <span className="ml-1">SPXVN02644717686A</span>
                    <span className="text-[14px] font-thin bg-[#ecfff1] ml-2 text-[#1cc461] py-[4px] px-[8px] ">
                      Đã giao hàng
                    </span>
                  </div>
                  <span className="hover:bg-[#F5F6F9] hover:cursor-pointer w-[32px] h-[32px] rounded-[100%] flex items-center justify-center "
                    onClick={handleOpen}>
                    <IoCloseOutline className="text-[23px] opacity-50 " />
                  </span>
                </div>
                <div className="order-status">
                  <ul className="order-process-detail-list text-[14px] ">
                    <li className="detail-list-item">
                      <div className="item-date text-[#303844] ">2022-10-13 <br /> 11:30:31</div>
                      <div className="item-desc">
                        <div className="item-text-box text-[#303844]">
                          [35-TTN Hue 02 LM Hub] Đơn hàng đã giao thành công choNguyễn  _Văn Hoàng
                        </div>
                      </div>
                    </li>
                    <li className="detail-list-item">
                      <div className="item-date text-[#303844] ">2022-10-13 <br /> 11:30:31</div>
                      <div className="item-desc">
                        <div className="item-text-box text-[#303844]">
                          [35-TTN Hue 02 LM Hub] Đơn hàng đã giao thành công choNguyễn  _Văn Hoàng
                        </div>
                      </div>
                    </li>
                    <li className="detail-list-item">
                      <div className="item-date text-[#303844] ">2022-10-13 <br /> 11:30:31</div>
                      <div className="item-desc">
                        <div className="item-text-box text-[#303844]">
                          [35-TTN Hue 02 LM Hub] Đơn hàng đã giao thành công choNguyễn  _Văn Hoàng
                        </div>
                      </div>
                    </li>
                    <li className="detail-list-item">
                      <div className="item-date text-[#303844] ">2022-10-13 <br /> 11:30:31</div>
                      <div className="item-desc">
                        <div className="item-text-box text-[#303844]">
                          [35-TTN Hue 02 LM Hub] Đơn hàng đã giao thành công choNguyễn  _Văn Hoàng
                        </div>
                      </div>
                    </li>
                    <li className="detail-list-item">
                      <div className="item-date text-[#303844] ">2022-10-13 <br /> 11:30:31</div>
                      <div className="item-desc">
                        <div className="item-text-box text-[#303844]">
                          [35-TTN Hue 02 LM Hub] Đơn hàng đã giao thành công choNguyễn  _Văn Hoàng
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>

    </>

  );
};

export default Carousel;
