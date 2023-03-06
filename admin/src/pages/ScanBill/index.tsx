import AdminLayout from "../../layouts/AdminLayout";
import SearchBar from "../../components/SearchBar";
import {QrScanner} from "@yudiel/react-qr-scanner";
import React from "react";
import {faker} from "@faker-js/faker";
import {NumericFormat} from "react-number-format";


const ScanBill = () => {
    const handleScan = (data: any) => {
        console.log(data);
    }

    const handleError = (err: any) => {
        console.log(err);
    }
    return (
        <AdminLayout>
            <div className={'w-full'}>
                <SearchBar/>
                <div className={'p-4 rounded bg-white shadow mt-4 flex gap-6'}>
                    <div className={'w-1/3'}>
                        <p className={'text-xl font-bold mb-4'}>Quét vận đơn</p>
                        <QrScanner
                            scanDelay={1500}
                            onDecode={handleScan}
                            onError={handleError}
                        />
                    </div>
                    <div className={'invoice-details w-full'}>
                        <div className={'grid grid-cols-2 gap-10'}>
                            <div className={'p-4 border rounded'}>
                                <p className={'font-bold mb-4 text-lg'}>Người gửi</p>
                                <p className={'font-bold flex gap-4'}><span>Tên đầy đủ:</span> <span
                                    className={'font-normal'}>Nguyễn Văn A</span></p>
                                <p className={'font-bold flex gap-4'}><span>Số điện thoại:</span> <span
                                    className={'font-normal'}>0123456789</span></p>
                                <p className={'font-bold flex gap-4'}><span>Địa chỉ:</span> <span
                                    className={'font-normal'}>123 Nguyen Van Linh, Quan 7, TP.HCM</span></p>
                            </div>
                            <div className={'p-4 border rounded'}>
                                <p className={'font-bold mb-4 text-lg'}>Người nhận</p>
                                <p className={'font-bold flex gap-4'}><span>Tên đầy đủ:</span> <span
                                    className={'font-normal'}>Nguyễn Văn A</span></p>
                                <p className={'font-bold flex gap-4'}><span>Số điện thoại:</span> <span
                                    className={'font-normal'}>0123456789</span></p>
                                <p className={'font-bold flex gap-4'}><span>Địa chỉ:</span> <span
                                    className={'font-normal'}>123 Nguyen Van Linh, Quan 7, TP.HCM</span></p>
                            </div>
                        </div>
                        <div className={'w-full mt-4'}>
                            <div className={'p-4 border rounded'}>
                                <p className={'font-bold mb-4 text-lg'}>Nội dung đơn hàng</p>
                                <ul>
                                    <li>1. Iphone 12 Pro Max 256GB</li>
                                    <li>2. Iphone 12 Pro Max 256GB</li>
                                </ul>
                            </div>
                        </div>
                        <div className={'w-full mt-4'}>
                            <div className={'p-4 border rounded'}>
                                <p className={'font-bold mb-4 text-lg'}>Thông tin chi tiết</p>
                                <p className={'font-bold flex gap-4'}><span>Khối lượng:</span> <span
                                    className={'font-normal'}>10 KG</span></p>
                                <p className={'font-bold flex gap-4'}><span>Phương thức thanh toán:</span> <span
                                    className={'font-normal'}>COD</span></p>
                                <p className={'font-bold flex gap-4'}><span>Tiền COD:</span> <span
                                    className={'font-normal'}>
                                    <NumericFormat value={faker.datatype.number({min: 1000, max: 9999}) * 1000}
                                                   thousandsGroupStyle="thousand"
                                                   thousandSeparator=","
                                                   suffix={' VND'}
                                                   displayType={'text'}
                                    />
                                </span></p>
                                <p className={'font-bold flex gap-4'}><span>Yêu cầu đơn hàng:</span> <span
                                    className={'font-normal'}>Cho xem hàng</span></p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={'w-full p-4 rounded bg-white shadow mt-4'}>
                    <p className={'font-bold mb-4 text-lg'}>Trạng thái vận chuyển</p>
                    <div className="p-4 mt-4">
                        <div className="flex flex-col md:grid grid-cols-12 text-gray-50">
                            <div className="flex md:contents">
                                <div className="col-start-2 col-end-4 mr-4 md:mx-auto relative">
                                    <div className="h-full w-6 flex items-center justify-center">
                                        <div className="h-full w-1 bg-green-400 pointer-events-none"></div>
                                    </div>
                                    <div
                                        className="w-6 h-6 absolute top-1/2 -mt-3 rounded-full bg-green-400 shadow text-center">
                                        <i className="fas fa-check-circle text-white"></i>
                                    </div>
                                </div>
                                <div
                                    className="bg-green-400 col-start-4 col-end-12 rounded-xl my-4 mr-auto px-4 py-2 shadow-md w-full">
                                    <h3 className="font-semibold text-lg mb-1">Đơn hàng đã được đóng gói</h3>
                                    <p className="leading-tight text-justify w-full">
                                        21 July 2021, 04:30 PM
                                    </p>
                                </div>
                            </div>

                            <div className="flex md:contents">
                                <div className="col-start-2 col-end-4 mr-4 md:mx-auto relative">
                                    <div className="h-full w-6 flex items-center justify-center">
                                        <div className="h-full w-1 bg-green-400 pointer-events-none"></div>
                                    </div>
                                    <div
                                        className="w-6 h-6 absolute top-1/2 -mt-3 rounded-full bg-green-400 shadow text-center">
                                        <i className="fas fa-check-circle text-white"></i>
                                    </div>
                                </div>
                                <div
                                    className="bg-green-400 col-start-4 col-end-12 rounded-xl my-4 mr-auto px-4 py-2 shadow-md w-full">
                                    <h3 className="font-semibold text-lg mb-1">Đơn hàng đang ở <span className={'font-bold'}>DA NANG</span></h3>
                                    <p className="leading-tight text-justify">
                                        22 July 2021, 01:00 PM
                                    </p>
                                </div>
                            </div>

                            <div className="flex md:contents">
                                <div className="col-start-2 col-end-4 mr-4 md:mx-auto relative">
                                    <div className="h-full w-6 flex items-center justify-center">
                                        <div className="h-full w-1 bg-red-500 pointer-events-none"></div>
                                    </div>
                                    <div
                                        className="w-6 h-6 absolute top-1/2 -mt-3 rounded-full bg-red-500 shadow text-center">
                                        <i className="fas fa-times-circle text-white"></i>
                                    </div>
                                </div>
                                <div
                                    className="bg-red-500 col-start-4 col-end-12 rounded-xl my-4 mr-auto px-4 py-2 shadow-md w-full">
                                    <h3 className="font-semibold text-lg mb-1 text-gray-50">Huỷ bỏ</h3>
                                    <p className="leading-tight text-justify">
                                        Đơn hàng đã được huỷ bỏ
                                    </p>
                                </div>
                            </div>
                            <div className="flex md:contents">
                                <div className="col-start-2 col-end-4 mr-4 md:mx-auto relative">
                                    <div className="h-full w-6 flex items-center justify-center">
                                        <div className="h-full w-1 bg-gray-300 pointer-events-none"></div>
                                    </div>
                                    <div
                                        className="w-6 h-6 absolute top-1/2 -mt-3 rounded-full bg-gray-300 shadow text-center">
                                        <i className="fas fa-exclamation-circle text-gray-400"></i>
                                    </div>
                                </div>
                                <div
                                    className="bg-gray-300 col-start-4 col-end-12 rounded-xl my-4 mr-auto px-4 py-2 shadow-md w-full">
                                    <h3 className="font-semibold text-lg mb-1 text-gray-400">Đã giao hàng</h3>
                                    <p className="leading-tight text-justify">

                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};


export default ScanBill;