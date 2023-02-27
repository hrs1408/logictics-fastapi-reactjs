import React from "react";
import "./index.scss"
import {Link} from 'react-router-dom';
const TopHaader = () => {
  return (
    <>
      <div className=" bg-[#fdd800] py-[5px] w-full">
        <div className="container mx-auto grid grid-cols-12 gap-3 items-center">
          <div className="col-span-6 flex gap-1">
            <span className="top-header-right text-[14px] text-[#222] ">
              Trụ sở chính: 18A Cộng Hòa, Phường 12, Quận Tân Bình, Tp. Hồ Chí
              Minh
            </span>
            <span className="text-[14px] text-[#222]  ">
              Giờ làm việc: <span className="font-bold">7:00 - 20:00</span>
            </span>
          </div>
          <div className="col-span-6 text-right">
            <Link to={'/'} className="top-header-right text-[14px] text-[#222]  ">
              Giới thiệu về Nhất Tín Logistics
            </Link>
            <Link to={'/login'} className="top-header-right text-[14px] text-[#222]  ">
              Đăng nhập
            </Link>
            <Link to={'/'} className="top-header-right text-[14px] text-[#222]  ">
              Đăng ký
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default TopHaader;
