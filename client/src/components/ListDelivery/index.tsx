import React from "react";
import { Link } from "react-router-dom";
import "./delivery.scss";
import { GrPrevious } from 'react-icons/gr'
const ListDelivery = () => {
  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-8 delivery">
        <Link to={"/"} className="item-service text-center">
          <p className=" h-[50px] flex justify-center">
            <img
              className="w-[55px]"
              src="https://ntlogistics.vn/images/icon_hoa_toc.png"
            />
          </p>
          Chuyển phát Hỏa tốc
        </Link>
        <Link to={"/"} className="item-service text-center">
          <p className=" h-[50px] flex justify-center">
            <img
              className="w-[55px]"
              src="https://ntlogistics.vn/images/icon_nhanh.png"
            />
          </p>
          Chuyển phát Nhanh
        </Link>
        <Link to={"/"} className="item-service text-center">
          <p className=" h-[50px] flex justify-center">
            <img
              className="w-[55px]"
              src="https://ntlogistics.vn/images/icon_tiet_kiem.png"
            />
          </p>
          Chuyển phát Tiết kiệm (MES)
        </Link>
        <Link to={"/"} className="item-service text-center">
          <p className=" h-[50px] flex justify-center">
            <img
              className="w-[55px]"
              src="https://ntlogistics.vn/images/icon_duong_bo.png"
            />
          </p>
          Chuyển phát Đường bộ
        </Link>
        <Link to={"/"} className="item-service text-center">
          <p className=" h-[50px] flex justify-center">
            <img
              className="w-[55px]"
              src="https://ntlogistics.vn/images/icon_thu_ho.png"
            />
          </p>
          Chuyển phát Thu hộ (COD)
        </Link>
        <Link to={"/"} className="item-service text-center">
          <p className=" h-[50px] flex justify-center">
            <img
              className="w-[55px]"
              src="https://ntlogistics.vn/images/icon_quoc_te.png"
            />
          </p>
          Chuyển phát Quốc tế
        </Link>
        <Link to={"/"} className="item-service text-center">
          <p className=" h-[50px] flex justify-center">
            <img
              className="w-[55px]"
              src="https://ntlogistics.vn/images/icon_nguyen_chuyen.png"
            />
          </p>
          Thuê xe Nguyên chuyến
        </Link>
        <Link to={"/"} className="item-service text-center">
          <p className=" h-[50px] flex justify-center">
            <img
              className="w-[55px]"
              src="https://ntlogistics.vn/images/icon_3pl.png"
            />
          </p>
          3PL & Fulfillment
        </Link>
      </div>
      <div className="select mt-5">
        <GrPrevious className="thin-arrow" />
        <div className="mt-3 text-[18px]">
          <b className="">Lựa chọn dịch vụ </b>
          bạn quan tâm
        </div>
      </div>
    </div>
  );
};

export default ListDelivery;
