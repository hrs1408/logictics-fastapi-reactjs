import React, { SyntheticEvent } from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { AiOutlineFileAdd } from "react-icons/ai";
// import { BsFillBoxFill } from "react-icons/bs";
import "./carousel.scss";
import Dropdown from "./Dropdown";
import { toast } from "react-hot-toast";

const Carousel = () => {
  const [isActive, setIsActive] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [invoiceId, setInvoiceId] = useState("");

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    if (!invoiceId) {
      toast.error("Vui lòng nhập mã đơn hàng");
      return;
    }
    setOpen(true);
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
              <span className="top-slide">
                {/* <BsFillBoxFill /> */}
              </span>
              <Link to={"/"}>
                <div className="box-cube active-box-cube">
                  <p className="text-[14px]">Tra cứu vận đơn</p>
                </div>
              </Link>
            </div>
            <div className="bill-of-lading-item">
              <span className="top-slide"></span>
              <Link to={"/"}>
                <div className="box-cube">
                  <p className="text-[14px]">Danh sách bưu cục</p>
                </div>
              </Link>
            </div>
          </div>
          <div className="w-full mt-5">
            <form className="mt-1" onSubmit={handleSubmit}>
              <div className="form-search">
                <input
                  className="input-search "
                  type="text"
                  placeholder="Nhập mã vận đơn"
                  value={invoiceId}
                  onChange={(e) => setInvoiceId(e.target.value)}
                />
              </div>
              <div className="">
                <button
                  type="submit"
                  className="cursor-pointer btn-search flex items-center justify-center"
                >
                  Tra cứu
                </button>
              </div>
            </form>
          </div>
          <Dropdown
            open={open}
            onClose={() => setOpen(false)}
            invoiceId={invoiceId}
          />
        </div>
      </div>
    </>
  );
};

export default Carousel;