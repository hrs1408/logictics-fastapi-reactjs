import React from "react";
import { GrPowerReset } from "react-icons/gr";
import HomeUser from "../../Layout/HomeUser";
import { useGetOrder } from "../../services/OtherService";
import SearchBar from "../SearchBar";

const Order = () => {

    const { data: dataOrder } = useGetOrder()
    console.log(dataOrder, 'xem thuwr');

    return (
        <HomeUser>
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
                {/* <EnhancedUserTable listUser={users?.data ?? []} /> */}
                <div className="flex flex-col bg-white shadow rounded">
                    <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                            <div className="overflow-hidden">
                                <table className="min-w-full text-left text-sm font-light">
                                    <thead className="border-b font-medium dark:border-neutral-500">
                                        <tr>
                                            <th scope="col" className="px-6 py-4">
                                                Tên
                                            </th>
                                            <th scope="col" className="px-6 py-4">
                                                Mã vận đơn
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr

                                            className="border-b dark:border-neutral-500"
                                        >
                                            <td className="whitespace-nowrap px-6 py-4">
                                                asd
                                            </td>
                                            <td className="whitespace-nowrap px-6 py-4">
                                                asd
                                            </td>
                                        </tr>
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