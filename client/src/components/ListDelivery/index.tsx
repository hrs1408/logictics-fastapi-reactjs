import React from "react";
import { Link } from "react-router-dom";
import "./index.scss";
const ListDelivery = () => {
  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-8">
        <Link to={"/"} className="item-service text-center">
          <p className="mb-3 h-[50px] flex justify-center">
            <img
              className="w-[55px]"
              src="https://ntlogistics.vn/images/icon_hoa_toc.png"
            />
          </p>
          Chuyển phát Hỏa tốc
        </Link>
        <Link to={"/"} className="item-service text-center">
          <p className="mb-3 h-[50px] flex justify-center">
            <img
              className="w-[55px]"
              src="https://ntlogistics.vn/images/icon_nhanh.png"
            />
          </p>
          Chuyển phát Hỏa tốc
        </Link>
        <Link to={"/"} className="item-service text-center">
          <p className="mb-3 h-[50px] flex justify-center">
            <img
              className="w-[55px]"
              src="https://ntlogistics.vn/images/icon_tiet_kiem.png"
            />
          </p>
          Chuyển phát Hỏa tốc
        </Link>
        <Link to={"/"} className="item-service text-center">
          <p className="mb-3 h-[50px] flex justify-center">
            <img
              className="w-[55px]"
              src="https://ntlogistics.vn/images/icon_duong_bo.png"
            />
          </p>
          Chuyển phát Hỏa tốc
        </Link>
        <Link to={"/"} className="item-service text-center">
          <p className="mb-3 h-[50px] flex justify-center">
            <img
              className="w-[55px]"
              src="https://ntlogistics.vn/images/icon_thu_ho.png"
            />
          </p>
          Chuyển phát Hỏa tốc
        </Link>
        <Link to={"/"} className="item-service text-center">
          <p className="mb-3 h-[50px] flex justify-center">
            <img
              className="w-[55px]"
              src="https://ntlogistics.vn/images/icon_quoc_te.png"
            />
          </p>
          Chuyển phát Hỏa tốc
        </Link>
        <Link to={"/"} className="item-service text-center">
          <p className="mb-3 h-[50px] flex justify-center">
            <img
              className="w-[55px]"
              src="https://ntlogistics.vn/images/icon_nguyen_chuyen.png"
            />
          </p>
          Chuyển phát Hỏa tốc
        </Link>
        <Link to={"/"} className="item-service text-center">
          <p className="mb-3 h-[50px] flex justify-center">
            <img
              className="w-[55px]"
              src="https://ntlogistics.vn/images/icon_3pl.png"
            />
          </p>
          Chuyển phát Hỏa tốc
        </Link>
      </div>
    </div>
  );
};

export default ListDelivery;
