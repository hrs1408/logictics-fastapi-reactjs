import React from "react";
import TopHaader from "../TopHeader";
import { BsFillTelephoneFill } from "react-icons/bs";
import { Header_Menu } from "../../constants/HeaderMenu";
import { Link } from "react-router-dom";
import "./header.scss";
import Navbar from "../SideBar";
const Header = () => {
  return (
    <div>
      <TopHaader />
      <Navbar />
      <div className="bg-[#222222] py-3 header ">
        <div className="container mx-auto grid grid-cols-12 items-center gap-[6.5rem]">
          <div className="col-span-2">
            <Link to={"/"}>
              <img src="https://ntlogistics.vn/images/img/logo.png" alt="" />
            </Link>
          </div>
          <div className="col-span-8 flex justify-between">
            {Header_Menu.map((item, index) => {
              return (
                <div key={index} className="">
                  <Link to={item.path} className="text-white text-[17px] ">
                    {item.name}
                  </Link>
                </div>
              );
            })}
          </div>
          <div className="col-span-2 items-center ">
            <a href="" className="flex gap-1 items-center ">
              <BsFillTelephoneFill className="text-[18px] text-white " />
              <span className="text-[#fdd800] hover:text-[#fff] text-[17px] ">
                1900 63 6688
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
