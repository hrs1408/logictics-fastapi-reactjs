import React, { useEffect, useState } from "react";
import HomeUser from "../../Layout/HomeUser";
// import toast from 'react-hot-toast'
import { Modal } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import { useCreateUser, useUsers } from "../../services/UserService";
import { object, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import SearchBar from "../SearchBar";
import EnhancedUserTable from "../../components/Table/user";
import Input from "../../components/Input";
// import EnhancedUserTable from '../components/Table/users'

const CreateUserSchema = object().shape({
  fullName: string().required("Vui lòng nhập họ tên"),
  password: string().required("Vui lòng nhập mật khẩu"),
  workAddress: string().required("Vui lòng nhập địa chỉ"),
  position: string().default(""),
  email: string().required("Vui lòng nhập email"),
  phone: string().required("Vui lòng nhập số điện thoại"),
  typeUser: string().required("Vui lòng chọn quyền"),
});

const Address = () => {
  const { data: users, refetch: getUsersAgain } = useUsers();

  const { mutateAsync: createUserAsync } = useCreateUser();

  const [open, setOpen] = React.useState(false);

  const [province, setProvince] = useState<any>([]);
  const [district, setDistrict] = useState<any>([]);
  const [ward, setWard] = useState<any>([]);

  const provinceData = async () => {
    const res = await fetch(
      `https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json`
    );
    const data = await res.json();
    setProvince(data);
  };

  useEffect(() => {
    provinceData();
  }, []);

  const onSubmit = (data: CreateUserType) => {};

  return (
    <HomeUser>
      <div className={"h-screen"}>
        <SearchBar />
        <div
          className={
            "flex items-center justify-between p-4 rounded bg-white mt-4 shadow"
          }
        >
          <p className={"text-xl font-bold"}>Danh sách địa chỉ</p>
          <button
            className={"bg-yellow-400 px-4 py-2 rounded shadow"}
            onClick={() => {
              setOpen(!open);
            }}
          >
            Thêm người dùng
          </button>
          <Modal
            open={open}
            onClose={() => {
              setOpen(!open);
            }}
          >
            <div
              className={
                "w-1/2  p-8 bg-white rounded shadow absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
              }
            >
              <form action="">
                <div className={"flex flex-col"}>
                  <p className={"text-2xl font-bold pb-5"}>Thêm Địa chỉ</p>
                  <div className={"w-full gap-4 mt-4"}>
                    <div className={"flex flex-col "}>
                      <p className={"text-[16px] font-bold pb-4"}>Phường</p>
                      <select
                        className={
                          "w-full px-4 py-3 mb-4 border rounded-md outline-none"
                        }
                      >
                        <option value="">Select Ward</option>
                        {province?.map((item: any, index: number) => {
                          return (
                            <option key={index} value={item.Id}>
                              {item.Name}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                    <div className={"flex flex-col "}>
                      <p className={"text-[16px] font-bold pb-4"}>Quận</p>
                      <select
                        className={
                          "w-full px-4 py-3 mb-4 border rounded-md outline-none"
                        }
                      >
                        <option value="">Select Ward</option>
                        <option> thi xa</option>
                      </select>
                    </div>
                    <div className={"flex flex-col "}>
                      <p className={"text-[16px] font-bold pb-4"}>Tỉnh</p>
                      <select
                        className={
                          "w-full px-4 py-3 mb-4 border rounded-md outline-none"
                        }
                      >
                        <option value="">Select Ward</option>
                        <option> thi xa</option>
                      </select>
                    </div>
                    <div className="">
                      <p className={"text-[16px] font-bold pb-4"}>Địa chỉ</p>
                      <input
                        className="w-full px-4 py-3 mb-4 border rounded-md outline-none"
                        type="text"
                      />
                    </div>
                  </div>
                  <div
                    className={
                      "flex items-center mt-8 gap-2 justify-end w-full"
                    }
                  >
                    <button
                      className={
                        "bg-yellow-400 px-4 py-2 rounded shadow hover:opacity-80 transition"
                      }
                      type={"submit"}
                    >
                      Thêm
                    </button>
                    <button
                      className={
                        "bg-gray-400 px-4 py-2 rounded shadow hover:opacity-80 transition"
                      }
                      type="reset"
                      onClick={() => {
                        setOpen(!open);
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </Modal>
        </div>
        <div className={"users-table mt-4"}>
          <EnhancedUserTable listUser={users?.data ?? []} />
        </div>
      </div>
    </HomeUser>
  );
};

export default Address;
