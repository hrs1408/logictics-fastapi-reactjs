import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { AiOutlineFileAdd } from "react-icons/ai";
import "./index.scss";
const Carousel = () => {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className="carousel-inner">
      <Link to={"/"}>
        <div className="carousel-bg "></div>
      </Link>
      <div className="carousel-content">
        <div className="more-than-log">Hơn cả một dịch vụ</div>
        <div className="bill-of-lading">
          <div className="bill-of-lading-item">
            <span className="top-slide "></span>
            <div className="box-cube">
              <Link to={"/"}>
                {/* <span className="icon-slide font-size-30 ntl-Document-2">
                  <span className="path1"></span>
                  <span id="ntl-Document-2" className="path2"></span>
                  <span className="path3"></span>
                  <span className="path4"></span>
                  <span className="path5"></span>
                  <span className="path6"></span>
                  <span className="path7"></span>
                  <span className="path8"></span>
                  <span className="path9"></span>
                  <span className="path10"></span>
                  <span className="path11"></span>
                  <span className="path12"></span>
                  <span className="path13"></span>
                  <span className="path14"></span>
                </span> */}
                <p className="">Tạo vận đơn</p>
              </Link>
            </div>
          </div>
          <div className="bill-of-lading-item z-50">
            <span className="top-slide"></span>
            <div className="box-cube active-box-cube">
              <Link to={"/"}>
                <p className="text-[14px]">Tra cứu vận đơn</p>
              </Link>
            </div>
          </div>
          <div className="bill-of-lading-item">
            <span className="top-slide"></span>
            <div className="box-cube">
              <Link to={"/"}>
                <p className="text-[14px]">Danh sách bưu cục</p>
              </Link>
            </div>
          </div>
        </div>
        <div className="w-full mt-5">
          <form className="mt-1" action="">
            <div className="form-search">
              <input
                className="input-search "
                type="text"
                placeholder="Nhập mã vận đơn"
              />
            </div>
            <div className="">
              <button type="submit" className="btn-search">
                Tra cứu
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
