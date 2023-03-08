import React from "react";
import { IoCloseOutline } from "react-icons/io5";
import { useQuery } from "react-query";
import { getVoyageByInovice } from "../../../services/VoyageService";

interface IDropdown {
  open: boolean;
  onClose: () => void;
  invoiceId: string;
}

const Dropdown = ({ open, onClose, invoiceId }: IDropdown) => {
  const { data } = useQuery(["GET_VOYAGE_BY_INVOICE", invoiceId], () =>
    getVoyageByInovice({ invoiceId })
  );

  console.log(data);
  return (
    <>
      {open && (
        <div className="relative">
          <div className="search-order absolute min-w-[917px] rounded-[4px] p-[30px]">
            <div className="flex justify-between ">
              <div className="text-[20px] font-bold mb-[24px] leading-[24px] text-[#303844] ">
                Mã Vận Đơn: <span className="ml-1">{invoiceId}</span>
                <span className="text-[14px] font-thin bg-[#ecfff1] ml-2 text-[#1cc461] py-[4px] px-[8px] ">
                  Đã giao hàng
                </span>
              </div>
              <button
                onClick={onClose}
                className="hover:bg-[#F5F6F9] hover:cursor-pointer w-[32px] h-[32px] rounded-[100%] flex items-center justify-center "
              >
                <IoCloseOutline className="text-[23px] opacity-50 " />
              </button>
            </div>
            <div className="order-status">
              <ul className="order-process-detail-list text-[14px] ">
                {data?.data.map((item: VoyageType, index: number) => {
                    console.log(index == 0);
                  return (
                    <li key={item.id} className="detail-list-item">
                      <div className="item-date text-[#303844] ">
                        2022-10-13 <br /> 11:30:31
                      </div>
                      <div
                        className={`item-desc ${index === 0 ? "active" : ""}`}
                      >
                        <div className="item-text-box text-[#303844]">
                          Đơn hàng đã giao đến {item.port.name}
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Dropdown;
