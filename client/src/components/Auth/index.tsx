import React, { useState, useEffect, useContext } from "react";
import { AiOutlinePhone, AiOutlineUser } from "react-icons/ai";
import axiosConfig from "../../configs/AxiosConfig";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import {
  RiLockPasswordFill,
  RiLoginCircleFill,
  RiLockPasswordLine,
} from "react-icons/ri";
import { MdEmail } from "react-icons/md";
import "./auth.scss";
import axios from "axios";
import { saveToken } from "../../services/AuthService";
import Login from "./Login";
import Register from "./Register";



export type TabType = "TabLogin" | "TabRegister";

const Auth = () => {
  const [tabActive, setTabActive] = useState<TabType>("TabLogin");

  const onChangeTab = (tab: TabType) => {
    setTabActive(tab);
  };

  return (
    <>
      <div className="section-login">
        <div className="">
          <div className="tab-container">
            <div className="bloc-tabs flex gap-1 ">
              <button
                className={`tabs ${
                  tabActive === "TabLogin" ? "active-tabs" : ""
                }`}
                onClick={() => onChangeTab("TabLogin")}
              >
                <div className="nav-list flex gap-2 items-center  w-full justify-center">
                  <RiLoginCircleFill className="mt-[1px] text-[18px]" />
                  Đăng nhập
                </div>
              </button>
              <button
                className={`tabs ${
                  tabActive === "TabRegister" ? "active-tabs" : ""
                }`}
                onClick={() => onChangeTab("TabRegister")}
              >
                <div className="nav-list flex gap-2 items-center text-center w-full justify-center ">
                  <MdEmail className="mt-1 text-[18px]" />
                  Tạo tài khoản
                </div>
              </button>
            </div>
            <div className="content-tabs">
              <div className="content active-content">
                {tabActive === "TabLogin" ? (
                  <Login changeTab={onChangeTab} />
                ) : (
                  <Register changeTab={onChangeTab} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Auth;
