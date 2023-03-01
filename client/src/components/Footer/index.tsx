import React from "react";
import { BsYoutube } from "react-icons/bs";
import { FaFacebookF } from "react-icons/fa";
import { SiZalo } from "react-icons/si";
import { GrSend } from "react-icons/gr";
import { Link } from "react-router-dom";
import "./index.scss";

const Footer = () => {
  return (
    <>
      <div className="container mx-auto grid grid-cols-7 mt-20 ">
        <div className="col-span-2">
          <div className="contact-footer">
            <Link to={"/"}>
              <img
                className="w-[40%] pb-5"
                src="https://ntlogistics.vn/images/img/logo-footer.png"
                alt=""
              />
            </Link>
            <p className="text-[14px] pb-5">
              <b>Trụ sở chính:</b> 18A Cộng Hòa, Phường 12,
              <br />
              Quận Tân Bình, Tp. Hồ Chí Minh
              <br />
              <b>Giờ làm việc:</b> 7:00 - 20:00
              <br />
              <b>Email:</b>
              <Link to={"/"}>nhattin@ntlogistics.vn</Link>
              <br />
              <b>Hotline:</b> <a href="tel:1900636688">1900 63 6688</a>
            </p>
            <div className="">
              <Link to={"/"}>
                <img
                  className="w-[185px]"
                  src="https://cdn.ntlogistics.vn/images/log_bct.jpg"
                />
              </Link>
            </div>
          </div>
        </div>
        <div className="col-span-1">
          <div className="panel-heading">
            <h2>Công ty</h2>
          </div>
          <ul className="ul-footer">
            <li>
              <Link
                className="text-[14px] text-[#343a40] leading-[40px] tracking-[-0.02rem] hover:text-[#fcd804] "
                to={"/"}
              >
                Giới thiệu
              </Link>
            </li>
            <li>
              <Link
                className="text-[14px] text-[#343a40] leading-[40px] tracking-[-0.02rem] hover:text-[#fcd804] "
                to={"/"}
              >
                Nhân sự NLT
              </Link>
            </li>
            <li>
              <Link
                className="text-[14px] text-[#343a40] leading-[40px] tracking-[-0.02rem] hover:text-[#fcd804] "
                to={"/"}
              >
                Mạng lưới bưu cuc
              </Link>
            </li>
            <li>
              <Link
                className="text-[14px] text-[#343a40] leading-[40px] tracking-[-0.02rem] hover:text-[#fcd804] "
                to={"/"}
              >
                Tuyển dụng
              </Link>
            </li>
            <li>
              <Link
                className="text-[14px] text-[#343a40] leading-[40px] tracking-[-0.02rem] hover:text-[#fcd804] "
                to={"/"}
              >
                Tin tức
              </Link>
            </li>
          </ul>
        </div>
        <div className="col-span-1">
          <div className="panel-heading">
            <h2>Hỗ trợ khách hàng</h2>
          </div>
          <ul className="ul-footer">
            <li>
              <Link
                className="text-[14px] text-[#343a40] leading-[40px] tracking-[-0.02rem] hover:text-[#fcd804] "
                to={"/"}
              >
                Câu hỏi thường gặp
              </Link>
            </li>
            <li>
              <Link
                className="text-[14px] text-[#343a40] leading-[40px] tracking-[-0.02rem] hover:text-[#fcd804] "
                to={"/"}
              >
                Điều khoản website
              </Link>
            </li>
            <li>
              <Link
                className="text-[14px] text-[#343a40] leading-[40px] tracking-[-0.02rem] hover:text-[#fcd804] "
                to={"/"}
              >
                Chính sách bảo mật
              </Link>
            </li>
            <li>
              <Link
                className="text-[14px] text-[#343a40] leading-[40px] tracking-[-0.02rem] hover:text-[#fcd804] "
                to={"/"}
              >
                Liên hệ
              </Link>
            </li>
          </ul>
        </div>
        <div className="col-span-1">
          <div className="panel-heading">
            <h2>Chính sách</h2>
          </div>
          <ul className="ul-footer">
            <li>
              <Link
                className="text-[14px] text-[#343a40] leading-[40px] tracking-[-0.02rem] hover:text-[#fcd804] "
                to={"/"}
              >
                Khiếu nại & Đền bù
              </Link>
            </li>
            <li>
              <Link
                className="text-[14px] text-[#343a40] leading-[40px] tracking-[-0.02rem] hover:text-[#fcd804] "
                to={"/"}
              >
                Quy định gửi & nhận hàng
              </Link>
            </li>
            <li>
              <Link
                className="text-[14px] text-[#343a40] leading-[40px] tracking-[-0.02rem] hover:text-[#fcd804] "
                to={"/"}
              >
                Trách nhiệm các bên
              </Link>
            </li>
            <li>
              <Link
                className="text-[14px] text-[#343a40] leading-[40px] tracking-[-0.02rem] hover:text-[#fcd804] "
                to={"/"}
              >
                Hàng hóa cấm gửi
              </Link>
            </li>
          </ul>
        </div>
        <div className="col-span-2">
          <div className="share-footer gap-3">
            <span className="ntl-zalo">
              <Link to={"/"}>
                <SiZalo className="text-[24px] text-[#fff] " />
              </Link>
            </span>
            <span className="ntl-zalo">
              <Link to={"/"}>
                <FaFacebookF className="text-[24px] text-[#fff] " />
              </Link>
            </span>
            <span className="ntl-zalo">
              <Link to={"/"}>
                <BsYoutube className="text-[24px] text-[#fff]" />
              </Link>
            </span>
          </div>
          <form className="register-email mt-4">
            <input type="email" placeholder="Nhập email để nhận thông tin" />
            <button type="submit" className="button-send">
              <GrSend className="text-[#a8a8a8] text-[20px]  " />
            </button>
          </form>
          <div className="flex gap-4  mt-5">
            <Link to={"/"}>
              <img
                src="https://ntlogistics.vn/style/images/appstore.png"
                alt=""
              />
            </Link>
            <Link to={"/"}>
              <img
                src="https://ntlogistics.vn/style/images/googleplay.png"
                alt=""
              />
            </Link>
          </div>
        </div>
      </div>
      <div className="w-full justify-center flex pb-5">
        <p className="text-[14px] ">
          Copyright Ⓒ 2023 by CÔNG TY CỔ PHẦN ĐẦU TƯ THƯƠNG MẠI PHÁT TRIỂN NHẤT
          TÍN
        </p>
      </div>
    </>
  );
};

export default Footer;
