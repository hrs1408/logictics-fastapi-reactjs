import Input from "../../components/Input";
import React from "react";
import { mixed, number, object, string } from "yup";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { MdOutlineCreateNewFolder } from "react-icons/md";
import { Divider } from "@mui/material";
import { BsBoxSeam } from "react-icons/bs";
import { GrPowerReset } from "react-icons/gr";
import { HiOutlineCash } from "react-icons/hi";
import { RiUserReceived2Line, RiUserShared2Line } from "react-icons/ri";
import { useCreateInvoice } from "../../services/InvoiceService";
import { useProvince } from "../../services/OtherService";
import toast from "react-hot-toast";
import HomeUser from "../../Layout/HomeUser";
import SearchBar from "../SearchBar";

// region Types
let CreateInvoiceSchema = object().shape({
  senderFullName: string().required("Vui lòng nhập họ tên người gửi"),
  senderPhone: string().required("Vui lòng nhập số điện thoại người gửi"),
  senderAddress: string().required("Vui lòng nhập địa chỉ người gửi"),
  senderProvince: string().required("Vui lòng nhập tỉnh/thành phố người gửi"),
  senderDistrict: string().required("Vui lòng nhập quận/huyện người gửi"),
  senderWard: string().required("Vui lòng nhập phường/xã người gửi"),
  receiverFullName: string().required("Vui lòng nhập họ tên người nhận"),
  receiverPhone: string().required("Vui lòng nhập số điện thoại người nhận"),
  receiverAddress: string().required("Vui lòng nhập địa chỉ người nhận"),
  receiverProvince: string().required(
    "Vui lòng nhập tỉnh/thành phố người nhận"
  ),
  receiverDistrict: string().required("Vui lòng nhập quận/huyện người nhận"),
  receiverWard: string().required("Vui lòng nhập phường/xã người nhận"),
  shippingType: string()
    .required("Vui lòng chọn loại vận chuyển")
    .default("CPN"),
  weight: number()
    .transform((value) =>
      isNaN(value) || value === null || value === undefined ? 0 : value
    )
    .required("Vui lòng nhập trọng lượng"),
  quantity: number()
    .transform((value) =>
      isNaN(value) || value === null || value === undefined ? 0 : value
    )
    .required("Vui lòng nhập số lượng"),
  price: number()
    .transform((value) =>
      isNaN(value) || value === null || value === undefined ? 0 : value
    )
    .required("Vui lòng nhập giá trị hàng hóa"),
  length: number()
    .transform((value) =>
      isNaN(value) || value === null || value === undefined ? 0 : value
    )
    .required("Vui lòng nhập chiều dài"),
  width: number()
    .transform((value) =>
      isNaN(value) || value === null || value === undefined ? 0 : value
    )
    .required("Vui lòng nhập chiều rộng"),
  height: number()
    .transform((value) =>
      isNaN(value) || value === null || value === undefined ? 0 : value
    )
    .required("Vui lòng nhập chiều cao"),
  cod: number()
    .transform((value) =>
      isNaN(value) || value === null || value === undefined ? 0 : value
    )
    .required("Vui lòng nhập số tiền thu hộ"),
  kindOfGoods: string().required("Vui lòng chọn loại hàng hóa"),
  goodsContent: string().required("Vui lòng nhập nội dung hàng hóa"),
  expenseCover: number()
    .transform((value) =>
      isNaN(value) || value === null || value === undefined ? 0 : value
    )
    .required("Vui lòng nhập phí đóng gói")
    .default(0),
  expenseCount: number()
    .transform((value) =>
      isNaN(value) || value === null || value === undefined ? 0 : value
    )
    .required("Vui lòng nhập phí kiểm đếm")
    .default(0),
  payments: string().required("Vui lòng chọn hình thức thanh toán"),
  isShowGoods: mixed().required("Vui lòng chọn hiển thị hàng hóa"),
  transportEquipment: string().required().default("MOTORBIKE"),
  requirementOther: string(),
});

export type AddressPeople = {
  provinceId?: string;
  province?: Province;
  districtId?: string;
  district?: District;
  wardId?: string;
  ward?: Ward;
};

// endregion

const CreateBill = () => {
  const { data: provinces } = useProvince();

  const { mutateAsync: createInvoiceAsync } = useCreateInvoice();

  const [senderProvince, setSenderProvince] = React.useState<AddressPeople>({});

  const [receiverProvince, setReceiverProvince] = React.useState<AddressPeople>(
    {}
  );

  const [isShowCost, setIsShowCost] = React.useState(false);

  const methods = useForm<CreateInvoiceType>({
    resolver: yupResolver(CreateInvoiceSchema),
    defaultValues: {
      transportEquipment: "MOTORBIKE",
      isShowGoods: "true",
      payments: "PAYMENT_SENDER",
      kindOfGoods: "DOCUMENT",
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = methods;

  const onSubmit = (data: CreateInvoiceType) => {
    createInvoiceAsync({
      ...data,
      isShowGoods: Boolean(data.isShowGoods),
    }).then(() => {
      toast.success("Invoice Bill Created");
      reset();
      setSenderProvince({});
      setReceiverProvince({});
    });
  };

  return (
    <HomeUser>
      <div>
        <SearchBar />
        <div className="title-bar p-4 mt-4 rounded shadow bg-white flex items-center justify-between">
          <p className={"font-bold text-[28px]"}>Tạo vận đơn</p>
          <button
            className={
              "bg-yellow-400 px-4 py-2 rounded flex items-center gap-2"
            }
          >
            <GrPowerReset /> Reset
          </button>
        </div>
        {Object.keys(errors).length > 0 && (
          <div className="p-4 rounded shadow bg-red-400 text-white my-4">
            {Object.keys(errors).length > 0 && (
              <div>
                <ul>
                  {Object.entries(errors).map(([name, error]) => (
                    <li key={name}>{error.message}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
        <FormProvider {...methods}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className={"mt-4 grid grid-cols-2 gap-4"}
          >
            <div className={"rounded shadow bg-white"}>
              <p
                className={"text-[24px] font-bold p-4 flex items-center gap-2"}
              >
                <RiUserReceived2Line />
                Người gửi
              </p>
              <Divider />
              <div className={"p-4"}>
                <Input label={"Tên đầy đủ"} name="senderFullName" />
                <Input label={"Số điện thoại"} name="senderPhone" />
                <Input label={"Địa chỉ"} name="senderAddress" />
                <div className={"grid grid-cols-3 gap-2"}>
                  <div>
                    <p className={"text-[16px] font-bold pb-4"}>Tỉnh</p>
                    <select
                      {...register("senderProvince")}
                      value={senderProvince.province?.Name}
                      onChange={(e) => {
                        const province = provinces?.find(
                          (province) => province.Name === e.target.value
                        );
                        setSenderProvince((prevState) => ({
                          ...prevState,
                          provinceId: province?.Id,
                          province,
                          districtId: undefined,
                          district: undefined,
                        }));
                      }}
                      className={
                        "w-full px-4 py-3 mb-4 border rounded-md outline-none"
                      }
                    >
                      <option value="">Select Province</option>
                      {provinces?.map((province) => {
                        return (
                          <option value={province.Name} key={province.Id}>
                            {province.Name}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div>
                    <p className={"text-[16px] font-bold pb-4"}>
                      Huyện / Thành Phố
                    </p>
                    <select
                      {...register("senderDistrict")}
                      value={senderProvince.district?.Name}
                      onChange={(e) => {
                        const district =
                          senderProvince.province?.Districts.find(
                            (district) => district.Name === e.target.value
                          );
                        setSenderProvince((prevState) => ({
                          ...prevState,
                          districtId: district?.Id,
                          district,
                          wardId: undefined,
                          ward: undefined,
                        }));
                      }}
                      className={
                        "w-full px-4 py-3 mb-4 border rounded-md outline-none"
                      }
                    >
                      <option value="">Select District</option>
                      {senderProvince.province?.Districts.map((district) => {
                        return (
                          <option value={district.Name} key={district.Id}>
                            {district.Name}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div>
                    <p className={"text-[16px] font-bold pb-4"}>Phường / Xã</p>
                    <select
                      {...register("senderWard")}
                      value={senderProvince.ward?.Name}
                      onChange={(e) => {
                        const ward = senderProvince.district?.Wards.find(
                          (ward) => ward.Name === e.target.value
                        );
                        setSenderProvince((prevState) => ({
                          ...prevState,
                          wardId: ward?.Id,
                          ward,
                        }));
                      }}
                      className={
                        "w-full px-4 py-3 mb-4 border rounded-md outline-none"
                      }
                    >
                      <option value="">Select Ward</option>
                      {senderProvince.district?.Wards.map((ward) => {
                        return (
                          <option value={ward.Name} key={ward.Id}>
                            {ward.Name}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div className={"rounded shadow bg-white"}>
              <p
                className={"text-[24px] font-bold p-4 flex items-center gap-2"}
              >
                <RiUserShared2Line />
                Người nhận
              </p>
              <Divider />
              <div className={"p-4"}>
                <Input label={"Tên đầy đủ"} name="receiverFullName" />
                <Input label={"Số điện thoại"} name="receiverPhone" />
                <Input label={"Địa chỉ"} name="receiverAddress" />
                <div className={"grid grid-cols-3 gap-2"}>
                  <div>
                    <p className={"text-[16px] font-bold pb-4"}>Tỉnh</p>
                    <select
                      {...register("receiverProvince")}
                      value={receiverProvince.province?.Name}
                      onChange={(e) => {
                        const province = provinces?.find(
                          (province) => province.Name === e.target.value
                        );
                        setReceiverProvince((prevState) => ({
                          ...prevState,
                          provinceId: province?.Id,
                          province,
                          districtId: undefined,
                          district: undefined,
                        }));
                      }}
                      className={
                        "w-full px-4 py-3 mb-4 border rounded-md outline-none"
                      }
                    >
                      <option value="">Select Province</option>
                      {provinces?.map((province) => {
                        return (
                          <option value={province.Name} key={province.Id}>
                            {province.Name}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div>
                    <p className={"text-[16px] font-bold pb-4"}>
                      Huyện / Thành Phố
                    </p>
                    <select
                      {...register("receiverDistrict")}
                      value={receiverProvince.district?.Name}
                      onChange={(e) => {
                        const district =
                          receiverProvince.province?.Districts.find(
                            (district) => district.Name === e.target.value
                          );
                        setReceiverProvince((prevState) => ({
                          ...prevState,
                          districtId: district?.Id,
                          district,
                          wardId: undefined,
                          ward: undefined,
                        }));
                      }}
                      className={
                        "w-full px-4 py-3 mb-4 border rounded-md outline-none"
                      }
                    >
                      <option value="">Select District</option>
                      {receiverProvince.province?.Districts.map((district) => {
                        return (
                          <option value={district.Name} key={district.Id}>
                            {district.Name}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div>
                    <p className={"text-[16px] font-bold pb-4"}>Phường / Xã</p>
                    <select
                      {...register("receiverWard")}
                      value={receiverProvince.ward?.Name}
                      onChange={(e) => {
                        const ward = receiverProvince.district?.Wards.find(
                          (ward) => ward.Name === e.target.value
                        );
                        setReceiverProvince((prevState) => ({
                          ...prevState,
                          wardId: ward?.Id,
                          ward,
                        }));
                      }}
                      className={
                        "w-full px-4 py-3 mb-4 border rounded-md outline-none"
                      }
                    >
                      <option value="">Select Ward</option>
                      {receiverProvince.district?.Wards.map((ward) => {
                        return (
                          <option value={ward.Name} key={ward.Id}>
                            {ward.Name}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div className={"rounded shadow bg-white"}>
              <p
                className={"text-[24px] font-bold p-4 flex items-center gap-2"}
              >
                <BsBoxSeam />
                Thông tin dịch vụ - Hàng hóa
              </p>
              <Divider />
              <div className={"p-4"}>
                <div className={"grid grid-cols-3 gap-2"}>
                  <Input label={"Khối lượng"} name="weight" />
                  <Input label={"Số kiện"} name="quantity" />
                  <Input label={"Giá trị hàng hóa"} name="price" />
                  <div className={"col-span-3"}>
                    <p className={"text-[16px] font-bold pb-4"}>Size</p>
                    <div className={"grid grid-cols-3 gap-2"}>
                      <Input
                        label={"Chiều dài"}
                        placeholder={"D"}
                        name="length"
                      />
                      <Input
                        label={"Chiều rộng"}
                        placeholder={"R"}
                        name="width"
                      />
                      <Input
                        label={"Chiều cao"}
                        placeholder={"C"}
                        name="height"
                      />
                    </div>
                  </div>
                  <Input label={"Tiền thu hộ (COD)"} name="cod" />
                  <div className={"col-span-2"}>
                    <p className={"text-[16px] font-bold pb-2"}>
                      Loại hàng hóa
                    </p>
                    <select
                      {...register("kindOfGoods")}
                      className={
                        "w-full px-4 py-3 mb-4 border rounded-md outline-none"
                      }
                    >
                      <option value="">Chọn loại hàng hóa</option>
                      <option value="DOCUMENT">Tài liệu</option>
                      <option value="GOODS">Hàng Hóa</option>
                      <option value="COLD_GOODS">Hàng Lạnh</option>
                      <option value="BIOLOGICAL_PRODUCT">Mẫu bệnh phẩm</option>
                    </select>
                  </div>
                  <div className={"col-span-3"}>
                    <p className={"text-[16px] font-bold pb-2"}>
                      Nội dung hàng hóa:
                    </p>
                    <textarea
                      {...register("goodsContent")}
                      className={
                        "w-full px-4 py-3 mb-4 border rounded-md outline-none "
                      }
                    ></textarea>
                  </div>
                  <div className={"col-span-3"}>
                    <Divider />
                    <div className={"flex items-center gap-2 pt-4 mb-5"}>
                      <input
                        type="checkbox"
                        onChange={() => setIsShowCost(!isShowCost)}
                        checked={isShowCost!}
                        id={"cost"}
                        className={"cursor-pointer"}
                      />
                      <label
                        htmlFor={"cost"}
                        className={"ml-2 font-bold cursor-pointer"}
                      >
                        Chi phí phát sinh
                      </label>
                    </div>
                    {isShowCost && (
                      <div className="grid grid-cols-2 gap-5">
                        <Input
                          label="Phí đóng gói"
                          {...register("expenseCover")}
                        />
                        <Input
                          label="Phí kiểm đếm"
                          {...register("expenseCount")}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className={"rounded shadow bg-white"}>
              <span
                className={"text-[24px] font-bold p-4 flex items-center gap-2"}
              >
                <HiOutlineCash />
                Thông tin thanh toán
              </span>
              <Divider />
              <div className={"p-4"}>
                <div className={"col-span-2"}>
                  <p className={"text-[16px] font-bold pb-2"}>
                    Hình thức thanh toán
                  </p>
                  <select
                    {...register("payments")}
                    className={
                      "w-full px-4 py-3 mb-4 border rounded-md outline-none"
                    }
                  >
                    <option value="">Select Payments</option>
                    <option value="PAYMENT_SENDER">Người gửi</option>
                    <option value="PAYMENT_RECEIVER">Người nhận</option>
                  </select>
                </div>
                <div className={"flex flex-col"}>
                  <span className={"text-[16px] font-bold pb-2"}>
                    Yêu cầu khi giao hàng
                  </span>
                  <div className={"mb-2"}>
                    <input
                      type="radio"
                      value="false"
                      {...register("isShowGoods")}
                      id={"1"}
                    />
                    <label htmlFor={"1"} className={"ml-2"}>
                      Không cho xem hàng
                    </label>
                  </div>
                  <div className={"mb-2"}>
                    <input
                      type="radio"
                      {...register("isShowGoods")}
                      id={"2"}
                      value="true"
                    />
                    <label htmlFor={"2"} className={"ml-2"}>
                      Cho xem hàng
                    </label>
                  </div>
                  <div>
                    <textarea
                      {...register("requirementOther")}
                      placeholder={"Yêu cầu khác"}
                      className={
                        "w-full px-4 py-3 mb-4 border rounded-md outline-none "
                      }
                    ></textarea>
                  </div>
                </div>
                <div className={"flex flex-col"}>
                  <p className={"text-[16px] font-bold pb-2"}>
                    Yêu cầu lấy hàng
                  </p>
                  <div className={"mb-2"}>
                    <input
                      type="radio"
                      // checked={watch('transportEquipment') === 'MOTORBIKE'}
                      value="MOTORBIKE"
                      id={"3"}
                      {...register("transportEquipment")}
                    />
                    <label htmlFor={"3"} className={"ml-2"}>
                      Xe máy
                    </label>
                  </div>
                  <div className={"mb-2"}>
                    <input
                      type="radio"
                      // checked={watch('transportEquipment') === 'CAR'}
                      value="CAR"
                      id={"4"}
                      {...register("transportEquipment")}
                    />
                    <label htmlFor={"4"} className={"ml-2"}>
                      Ô tô
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className={"col-span-2"}>
              <button
                className={"bg-yellow-400 px-4 py-2 rounded w-full"}
                type="submit"
              >
                <p className={"flex items-center gap-2 justify-center"}>
                  <MdOutlineCreateNewFolder />
                  Tạo vận đơn
                </p>
              </button>
            </div>
          </form>
        </FormProvider>
      </div>
    </HomeUser>
  );
};

export default CreateBill;
