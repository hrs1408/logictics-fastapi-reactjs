import AdminLayout from '../../layouts/AdminLayout'
import SearchBar from '../../components/SearchBar'
import { QrScanner } from '@yudiel/react-qr-scanner'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { faker } from '@faker-js/faker'
import { NumericFormat } from 'react-number-format'
import { useGetAllPorts } from '../../services/PortService'
import { useDebounce } from 'usehooks-ts'
import { StoreContext, StoreContextType } from '../../context/StoreContext'
import { createVoyage, getVoyageByInvoice } from '../../services/Voyages'
import toast from 'react-hot-toast'
import { useMutation, useQuery } from 'react-query'
import moment from 'moment'

const ScanBill = () => {
  const { state } = useContext(StoreContext) as StoreContextType
  const debounceSearch = useDebounce(state.searchKey, 300)
  const [portWork, setPortWork] = React.useState<number>(0)
  const {
    data: ports,
    refetch: refetchPorts,
    isFetching: isPortFetching,
  } = useGetAllPorts({
    search: debounceSearch,
    is_full: true,
    page: 1,
    size: 100,
  })
  const {
    mutateAsync: createVoyageAsync,
    isLoading: createVoyageLoading,
    data: voyage,
  } = useMutation(['POST_VOYAGE'], createVoyage)
  let countScan = 0
  const { data: voyages } = useQuery(
    ['GET_VOYAGES_BY_INVOICE', voyage?.data.invoice.id],
    () => getVoyageByInvoice(voyage?.data.invoice.id ?? '')
  )

  const handleScan = async (invoiceId: string) => {
    countScan++
    if (countScan === 1) return
    countScan = 0
    try {
      if (portWork === 0) {
        toast.error('Vui lòng chọn kho làm việc')
        return
      }
      const { data } = await createVoyageAsync({
        invoiceId,
        portId: portWork,
      })
      toast.success(`Cập nhật thành công ${data.port.name}`)
    } catch (error: any) {
      if (error.response) {
        toast.error(error.response.data.data)
      }
    }
  }

  const handleError = (err: any) => {
    console.log(err)
  }

  const handleSelectPort = (e: any) => {
    setPortWork(e.target.value)
  }

  return (
    <AdminLayout>
      <div className={'w-full'}>
        <SearchBar />
        <div
          className={
            'w-full rounded bg-white flex items-center gap-4 p-4 mt-4 shadow'
          }
        >
          <p className={'text-xl font-bold mb-4'}>Kho làm việc</p>
          <select
            name=""
            id=""
            onChange={handleSelectPort}
            className={'px-4 py-2 border rounded'}
          >
            <option value={'0'}>Chọn kho</option>
            {ports?.data.map(port => {
              return <option value={port.id}>{port.name}</option>
            })}
          </select>
        </div>
        <div className={'p-4 rounded bg-white shadow mt-4 flex gap-6'}>
          <div className={'w-1/3'}>
            <p className={'text-xl font-bold mb-4'}>Quét vận đơn</p>
            <QrScanner
              scanDelay={2000}
              onDecode={handleScan}
              onError={handleError}
            />
          </div>
          <div className={'invoice-details w-full'}>
            <div className={'grid grid-cols-2 gap-10'}>
              <div className={'p-4 border rounded'}>
                <p className={'font-bold mb-4 text-lg'}>Người gửi</p>
                <p className={'font-bold flex gap-4'}>
                  <span>Tên đầy đủ:</span>{' '}
                  <span className={'font-normal'}>
                    {voyage?.data.invoice.senderFullName}
                  </span>
                </p>
                <p className={'font-bold flex gap-4'}>
                  <span>Số điện thoại:</span>{' '}
                  <span className={'font-normal'}>
                    {voyage?.data.invoice.senderPhone}
                  </span>
                </p>
                <p className={'font-bold flex gap-4'}>
                  <span>Địa chỉ:</span>{' '}
                  <span className={'font-normal'}>
                    {voyage?.data.invoice.senderAddress}
                  </span>
                </p>
              </div>
              <div className={'p-4 border rounded'}>
                <p className={'font-bold mb-4 text-lg'}>Người nhận</p>
                <p className={'font-bold flex gap-4'}>
                  <span>Tên đầy đủ:</span>{' '}
                  <span className={'font-normal'}>
                    {voyage?.data.invoice.receiverFullName}
                  </span>
                </p>
                <p className={'font-bold flex gap-4'}>
                  <span>Số điện thoại:</span>{' '}
                  <span className={'font-normal'}>
                    {voyage?.data.invoice.receiverPhone}
                  </span>
                </p>
                <p className={'font-bold flex gap-4'}>
                  <span>Địa chỉ:</span>{' '}
                  <span className={'font-normal'}>
                    {voyage?.data.invoice.receiverAddress}
                  </span>
                </p>
              </div>
            </div>
            <div className={'w-full mt-4'}>
              <div className={'p-4 border rounded'}>
                <p className={'font-bold mb-4 text-lg'}>Nội dung đơn hàng</p>
                <div>{voyage?.data.invoice.goodsContent}</div>
              </div>
            </div>
            <div className={'w-full mt-4'}>
              <div className={'p-4 border rounded'}>
                <p className={'font-bold mb-4 text-lg'}>Thông tin chi tiết</p>
                <p className={'font-bold flex gap-4'}>
                  <span>Khối lượng:</span>{' '}
                  <span className={'font-normal'}>
                    {voyage?.data.invoice.weight}
                  </span>
                </p>
                <p className={'font-bold flex gap-4'}>
                  <span>Phương thức thanh toán:</span>{' '}
                  <span className={'font-normal'}>
                    {voyage?.data.invoice.shippingType}
                  </span>
                </p>
                <p className={'font-bold flex gap-4'}>
                  <span>Tiền COD:</span>{' '}
                  <span className={'font-normal'}>
                    <NumericFormat
                      value={Number(voyage?.data.invoice.cod) + 30000}
                      thousandsGroupStyle="thousand"
                      thousandSeparator=","
                      suffix={' VND'}
                      displayType={'text'}
                    />
                  </span>
                </p>
                <p className={'font-bold flex gap-4'}>
                  <span>Yêu cầu đơn hàng:</span>{' '}
                  <span className={'font-normal'}>
                    {voyage?.data.invoice.isShowGoods
                      ? 'Cho xem hàng'
                      : 'Không'}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className={'w-full p-4 rounded bg-white shadow mt-4'}>
          <p className={'font-bold mb-4 text-lg'}>Trạng thái vận chuyển</p>
          <div className="p-4 mt-4">
            <div className="flex flex-col md:grid grid-cols-12 text-gray-50">
              {voyages &&
                voyages.data.map(item => {
                  return (
                    <div className="flex md:contents">
                      <div className="col-start-2 col-end-4 mr-4 md:mx-auto relative">
                        <div className="h-full w-6 flex items-center justify-center">
                          <div className="h-full w-1 bg-green-400 pointer-events-none"></div>
                        </div>
                        <div className="w-6 h-6 absolute top-1/2 -mt-3 rounded-full bg-green-400 shadow text-center">
                          <i className="fas fa-check-circle text-white"></i>
                        </div>
                      </div>
                      <div className="bg-green-400 col-start-4 col-end-12 rounded-xl my-4 mr-auto px-4 py-2 shadow-md w-full">
                        <h3 className="font-semibold text-lg mb-1">
                          Đơn hàng đã được giao đến {item.port.name}
                        </h3>
                        <p className="leading-tight text-justify w-full">
                          {moment(item.created_at).calendar()}
                        </p>
                      </div>
                    </div>
                  )
                })}

              {/*<div className="flex md:contents">*/}
              {/*  <div className="col-start-2 col-end-4 mr-4 md:mx-auto relative">*/}
              {/*    <div className="h-full w-6 flex items-center justify-center">*/}
              {/*      <div className="h-full w-1 bg-red-500 pointer-events-none"></div>*/}
              {/*    </div>*/}
              {/*    <div className="w-6 h-6 absolute top-1/2 -mt-3 rounded-full bg-red-500 shadow text-center">*/}
              {/*      <i className="fas fa-times-circle text-white"></i>*/}
              {/*    </div>*/}
              {/*  </div>*/}
              {/*  <div className="bg-red-500 col-start-4 col-end-12 rounded-xl my-4 mr-auto px-4 py-2 shadow-md w-full">*/}
              {/*    <h3 className="font-semibold text-lg mb-1 text-gray-50">*/}
              {/*      Huỷ bỏ*/}
              {/*    </h3>*/}
              {/*    <p className="leading-tight text-justify">*/}
              {/*      Đơn hàng đã được huỷ bỏ*/}
              {/*    </p>*/}
              {/*  </div>*/}
              {/*</div>*/}
              {/*<div className="flex md:contents">*/}
              {/*  <div className="col-start-2 col-end-4 mr-4 md:mx-auto relative">*/}
              {/*    <div className="h-full w-6 flex items-center justify-center">*/}
              {/*      <div className="h-full w-1 bg-gray-300 pointer-events-none"></div>*/}
              {/*    </div>*/}
              {/*    <div className="w-6 h-6 absolute top-1/2 -mt-3 rounded-full bg-gray-300 shadow text-center">*/}
              {/*      <i className="fas fa-exclamation-circle text-gray-400"></i>*/}
              {/*    </div>*/}
              {/*  </div>*/}
              {/*  <div className="bg-gray-300 col-start-4 col-end-12 rounded-xl my-4 mr-auto px-4 py-2 shadow-md w-full">*/}
              {/*    <h3 className="font-semibold text-lg mb-1 text-gray-400">*/}
              {/*      Đã giao hàng*/}
              {/*    </h3>*/}
              {/*    <p className="leading-tight text-justify"></p>*/}
              {/*  </div>*/}
              {/*</div>*/}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}

export default ScanBill
