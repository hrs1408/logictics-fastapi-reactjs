import { Modal } from '@mui/material'
import React from 'react'
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { AiOutlineClose, AiOutlinePrinter } from 'react-icons/ai';
import QRCode from 'qrcode.react';
import { NumericFormat } from 'react-number-format';

interface ModalInvoiceProps {
    invoice: InvoiceType,
    open: boolean,

    onClose: () => void
}

const ModalOrder: React.FC<ModalInvoiceProps> = ({ invoice, open, onClose }) => {

    const handlePrintInvoice = () => {
        const printContents = document.querySelector('#print-invoice')
        html2canvas(printContents as HTMLDivElement).then(canvas => {
            const imgData = canvas.toDataURL('image/png')
            const pdf = new jsPDF('p', 'mm', [230, 210])
            pdf.addImage(imgData, 'PNG', 5, 10, 200, 180)
            pdf.save('invoice.pdf')
        })
    }

    return (
        <div>
            <Modal open={open} onClose={onClose}>
                <div
                    className={
                        'w-1/2 bg-white shadow absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-8 rounded-md'
                    }
                >
                    <div>
                        <div className={'flex justify-between'}>
                            <p className={'font-bold text-2xl text-center'}>
                                Thông tin vận đơn
                            </p>
                            <div className={'flex items-center gap-4'}>
                                <button
                                    className={
                                        'px-2 py-2 bg-yellow-400 rounded hover:opacity-80 transition flex items-center gap-2'
                                    }
                                    onClick={handlePrintInvoice}
                                >
                                    <AiOutlinePrinter /> In vận đơn
                                </button>
                                <button
                                    onClick={onClose}
                                    className={'rounded-full p-2 transition hover:bg-gray-100'}
                                >
                                    <AiOutlineClose />
                                </button>
                            </div>
                        </div>
                        <div id={'print-invoice'}>
                            <div className={'grid grid-cols-3 w-full justify-between'}>
                                <div className={'flex flex-col gap-4 col-span-2'}>
                                    <img
                                        src="/images/logo/1-landscape.png"
                                        alt="logo"
                                        width={200}
                                    />
                                    <p className={'font-bold text-sm mt-4 ml-1'}>
                                        Mã vận đơn: {invoice.id ? invoice.id : ''}
                                    </p>
                                    <div className={'p-4 rounded border'}>
                                        <p className={'font-bold text-sm'}>Thông tin người gửi</p>
                                        <p className={'text-sm'}>
                                            Tên: {invoice.senderFullName || ''}
                                        </p>
                                        <p className={'text-sm'}>
                                            Số điện thoại: {invoice.senderPhone || ''}
                                        </p>
                                        <p className={'text-sm'}>
                                            Địa chỉ: {invoice.senderAddress || ''}
                                        </p>
                                    </div>
                                    <div className={'p-4 rounded border'}>
                                        <p className={'font-bold text-sm'}>Thông tin người nhận</p>
                                        <p className={'text-sm'}>
                                            Tên: {invoice.receiverFullName || ''}
                                        </p>
                                        <p className={'text-sm'}>
                                            Số điện thoại: {invoice.receiverPhone || ''}
                                        </p>
                                        <p className={'text-sm'}>
                                            Địa chỉ: {invoice.receiverAddress}
                                        </p>
                                    </div>
                                </div>
                                <div className={'col-span-1'}>
                                    <QRCode
                                        id="qrcode"
                                        value={invoice.id || ''}
                                        size={290}
                                        style={{ margin: '120px 0 0 0', width: '100%' }}
                                        level={'H'}
                                        includeMargin={true}
                                    />
                                </div>
                            </div>
                            <div className={'mt-4 flex gap-4 w-full'}>
                                <div className={'p-4 rounded border w-full'}>
                                    <p className={'font-bold text-sm'}>Thông tin hàng hóa</p>
                                    <p className={'text-sm'}>
                                        Loại hàng hóa: {invoice.kindOfGoods || ''}
                                    </p>
                                    <p className={'text-sm'}>
                                        Nội dung hàng hóa: {invoice.goodsContent || ''}
                                    </p>
                                    <p className={'text-sm flex items-center gap-2'}>
                                        <span>Giá trị hàng hóa:</span>
                                        <NumericFormat
                                            value={parseInt(invoice.price || '0')}
                                            thousandsGroupStyle="thousand"
                                            thousandSeparator=","
                                            displayType={'text'}
                                            suffix={' VND'}
                                        />
                                    </p>
                                    <p className={'text-sm'}>
                                        Trọng lượng: {invoice.weight || ''} kg
                                    </p>
                                    <p className={'text-sm'}>Dài: {invoice.length || ''} cm</p>
                                    <p className={'text-sm'}>Rộng: {invoice.width || ''} cm</p>
                                    <p className={'text-sm'}>Cao: {invoice.height || ''} cm</p>
                                    <p className={'text-sm'}>
                                        Cho xem hàng:{' '}
                                        {invoice.isShowGoods
                                            ? 'Được xem hàng'
                                            : 'Không cho xem hàng'}
                                    </p>
                                </div>
                                <div className={'p-4 rounded border w-full'}>
                                    <p className={'font-bold text-sm'}>Thông tin vận chuyển</p>
                                    <p className={'text-sm'}>
                                        Hình thức thanh toán:{' '}
                                        {invoice.payments === 'PAYMENT_SENDER'
                                            ? 'Người gửi trả'
                                            : 'Người nhận trả'}
                                    </p>
                                    <p className={'text-sm'}>
                                        Hình thức vận chuyển: {invoice.shippingType || ''}
                                    </p>
                                    <p className={'text-sm'}>
                                        Phương tiện vận chuyển:{' '}
                                        {invoice.transportEquipment === 'MOTORBIKE'
                                            ? 'Xe máy'
                                            : 'Ô tô'}
                                    </p>
                                    <p className={'text-sm'}>
                                        Yêu cầu khác: {invoice.requirementOther || ''}
                                    </p>
                                </div>
                            </div>
                            <div className={'mt-4 flex gap-4 w-full'}>
                                <div
                                    className={
                                        'p-4 rounded border w-full flex items-center justify-between'
                                    }
                                >
                                    <div>
                                        <p
                                            className={
                                                'text-md mt-3 font-bold flex items-center gap-4'
                                            }
                                        >
                                            <span>Phí vận chuyển:</span>
                                            <NumericFormat
                                                value={30000}
                                                thousandsGroupStyle="thousand"
                                                thousandSeparator=","
                                                displayType={'text'}
                                                suffix={' VND'}
                                            />
                                        </p>
                                        <p
                                            className={
                                                'text-md mt-3 font-bold flex items-center gap-4'
                                            }
                                        >
                                            <span>Tổng tiền thu hộ:</span>
                                            <NumericFormat
                                                value={parseInt(invoice.cod || '0')}
                                                thousandsGroupStyle="thousand"
                                                thousandSeparator=","
                                                displayType={'text'}
                                                suffix={' VND'}
                                            />
                                        </p>
                                    </div>
                                    <p
                                        className={
                                            'text-2xl font-bold mt-2 flex items-center gap-4'
                                        }
                                    >
                                        <span>Tổng tiền:</span>
                                        <NumericFormat
                                            value={parseInt(invoice.cod || '0') + 30000 || ''}
                                            thousandsGroupStyle="thousand"
                                            thousandSeparator=","
                                            displayType={'text'}
                                            suffix={' VND'}
                                        />
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default ModalOrder