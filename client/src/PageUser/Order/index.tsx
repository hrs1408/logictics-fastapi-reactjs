import React, { useEffect, useState } from "react";
import { GrPowerReset } from "react-icons/gr";
import HomeUser from "../../Layout/HomeUser";
import { useGetOrder } from "../../services/OtherService";
import SearchBar from "../SearchBar";
import { NumericFormat } from "react-number-format";
import QRCode from "qrcode.react";
import { AiFillEye, AiOutlineClose, AiOutlinePrinter } from "react-icons/ai";
import { Modal, Tooltip } from "@mui/material";
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'
import ModalOrder from "./ModalOrder";


export type ListInvoice = {
    listInvoice: InvoiceTableType[]
}

const Order = () => {

    const { data: dataOrder } = useGetOrder()

    const [open, setOpen] = useState(false);

    const [invoiceView, setInvoiceView] = useState<InvoiceType>({})

    const handleClickInvoice = (data: any) => {
        setInvoiceView(data)
        setOpen(true)
    }
    const TextLimit = (data: any) => {
        const { text, limit } = data;
        if (text.length <= limit) {
            return <p>{text}</p>;
        }
        return <p>{text.substr(0, limit)}...</p>;
    }

    return (
        <HomeUser>
            <ModalOrder invoice={invoiceView} open={open} onClose={() => setOpen(false)} />
            <SearchBar />
            <div className="title-bar p-4 mt-4 rounded shadow bg-white flex items-center justify-between">
                <p className={'font-bold text-[28px]'}>Tạo vận đơn</p>
                <button
                    className={
                        'bg-yellow-400 px-4 py-2 rounded flex items-center gap-2'
                    }
                >
                    <GrPowerReset /> Reset
                </button>
            </div>
            <div className={'mt-4'}>
                <div className="flex flex-col bg-white shadow rounded">
                    <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                            <div className="overflow-hidden">
                                <table className="min-w-full text-left text-sm font-light">
                                    <thead className="border-b font-medium dark:border-neutral-500">
                                        <tr>
                                            <th scope="col" className="px-6 py-4">
                                                Mã vận đơn
                                            </th>
                                            <th scope="col" className="px-6 py-4">
                                                Tên người gửi
                                            </th>
                                            <th scope="col" className="px-6 py-4">
                                                Tên người nhận
                                            </th>
                                            <th scope="col" className="px-6 py-4">
                                                Thành phố người nhận
                                            </th>
                                            <th scope="col" className="px-6 py-4">
                                                Thành phố người gửi
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {dataOrder?.data?.map((item, index) => {
                                            return (
                                                <tr key={index}

                                                    className="border-b dark:border-neutral-500"
                                                >
                                                    <Tooltip title={item.id} placement="right" arrow>
                                                        <td className="whitespace-nowrap text-black px-6 py-4 w-[15%]">
                                                            <TextLimit text={item.id} limit={20} />
                                                        </td>
                                                    </Tooltip>
                                                    <td className="whitespace-nowrap px-6 py-4 text-[]">
                                                        {item.senderFullName}
                                                    </td>
                                                    <td className="whitespace-nowrap px-6 py-4">
                                                        {item.receiverFullName}
                                                    </td>
                                                    <td className="whitespace-nowrap px-6 py-4">
                                                        {item.receiverAddress}
                                                    </td>
                                                    <td className="whitespace-nowrap px-6 py-4">
                                                        {item.senderAddress}
                                                    </td>
                                                    <td className="whitespace-nowrap px-6 py-4">
                                                        <button
                                                            onClick={(event) => handleClickInvoice(item)
                                                            }
                                                        >
                                                            <AiFillEye className="text-[#E9C800] text-[20px]" />
                                                        </button>
                                                    </td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </HomeUser>
    )
}

export default Order;


