import AdminLayout from "../../layouts/AdminLayout";
import SearchBar from "../../components/SearchBar";
import Input from "../../components/Input";
import React from "react";
import {Divider} from "@mui/material";
import {GrPowerReset} from "react-icons/gr";
import {RiUserReceived2Line, RiUserShared2Line} from "react-icons/ri";
import {BsBoxSeam} from "react-icons/bs";
import {HiOutlineCash} from "react-icons/hi";
import {MdOutlineCreateNewFolder} from "react-icons/md";

const CreateBill = () => {
    return (
        <AdminLayout>
            <div>
                <SearchBar/>
                <div className="title-bar p-4 mt-4 rounded shadow bg-white flex items-center justify-between">
                    <p className={'font-bold text-[28px]'}>Create Bill Of Landing</p>
                    <button className={'bg-yellow-400 px-4 py-2 rounded flex items-center gap-2'}>
                        <GrPowerReset /> Reset
                    </button>
                </div>
                <div className={'mt-4 grid grid-cols-2 gap-4'}>
                    <div className={'rounded shadow bg-white'}>
                        <p className={'text-[24px] font-bold p-4 flex items-center gap-2'}><RiUserShared2Line/>Sender</p>
                        <Divider/>
                        <div className={'p-4'}>
                            <Input label={'Full Name'}/>
                            <Input label={'Phone Number'}/>
                            <Input label={'Address'}/>
                            <div className={'grid grid-cols-3 gap-2'}>
                                <div>
                                    <p className={'text-[16px] font-bold pb-4'}>Province</p>
                                    <select className={'w-full px-4 py-3 mb-4 border rounded-md outline-none'}>
                                        <option value="">Select Province</option>
                                    </select>
                                </div>
                                <div>
                                    <p className={'text-[16px] font-bold pb-4'}>District</p>
                                    <select className={'w-full px-4 py-3 mb-4 border rounded-md outline-none'}>
                                        <option value="">Select District</option>
                                    </select>
                                </div>
                                <div>
                                    <p className={'text-[16px] font-bold pb-4'}>Ward</p>
                                    <select className={'w-full px-4 py-3 mb-4 border rounded-md outline-none'}>
                                        <option value="">Select Ward</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={'rounded shadow bg-white'}>
                        <p className={'text-[24px] font-bold p-4 flex items-center gap-2'}><RiUserReceived2Line/>Reciver</p>
                        <Divider/>
                        <div className={'p-4'}>
                            <Input label={'Full Name'}/>
                            <Input label={'Phone Number'}/>
                            <Input label={'Address'}/>
                            <div className={'grid grid-cols-3 gap-2'}>
                                <div>
                                    <p className={'text-[16px] font-bold pb-4'}>Province</p>
                                    <select className={'w-full px-4 py-3 mb-4 border rounded-md outline-none'}>
                                        <option value="">Select Province</option>
                                    </select>
                                </div>
                                <div>
                                    <p className={'text-[16px] font-bold pb-4'}>District</p>
                                    <select className={'w-full px-4 py-3 mb-4 border rounded-md outline-none'}>
                                        <option value="">Select District</option>
                                    </select>
                                </div>
                                <div>
                                    <p className={'text-[16px] font-bold pb-4'}>Ward</p>
                                    <select className={'w-full px-4 py-3 mb-4 border rounded-md outline-none'}>
                                        <option value="">Select Ward</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={'rounded shadow bg-white'}>
                        <p className={'text-[24px] font-bold p-4 flex items-center gap-2'}><BsBoxSeam/>Service Information - Goods</p>
                        <Divider/>
                        <div className={'p-4'}>
                            <div className={'grid grid-cols-3 gap-2'}>
                                <Input label={'Mass'}/>
                                <Input label={'Number Of Package'}/>
                                <Input label={'Price Of Goods'}/>
                                <div className={'col-span-3'}>
                                    <p className={'text-[16px] font-bold pb-4'}>Size</p>
                                    <div className={'grid grid-cols-3 gap-2'}>
                                        <Input label={'Length'} placeholder={"D"}/>
                                        <Input label={'Width'} placeholder={"R"}/>
                                        <Input label={'Height'} placeholder={"C"}/>
                                    </div>
                                </div>
                                <Input label={'COD Moneys'}/>
                                <div className={'col-span-2'}>
                                    <p className={'text-[16px] font-bold pb-2'}>Commodities</p>
                                    <select className={'w-full px-4 py-3 mb-4 border rounded-md outline-none'}>
                                        <option value="">Select Commodities</option>
                                    </select>
                                </div>
                                <div className={'col-span-3'}>
                                    <p className={'text-[16px] font-bold pb-2'}>Commodity content:</p>
                                    <textarea name="" id=""
                                              className={'w-full px-4 py-3 mb-4 border rounded-md outline-none '}>
                                    </textarea>
                                </div>
                                <div className={'col-span-3'}>
                                    <Divider/>
                                    <div className={'flex items-center gap-2 pt-4'}>
                                        <input type="checkbox"/>
                                        <label className={'ml-2 font-bold'}>Costs Incurred</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={'rounded shadow bg-white'}>
                        <p className={'text-[24px] font-bold p-4 flex items-center gap-2'}><HiOutlineCash/>Billing Information</p>
                        <Divider/>
                        <div className={'p-4'}>
                            <div className={'col-span-2'}>
                                <p className={'text-[16px] font-bold pb-2'}>Payments</p>
                                <select className={'w-full px-4 py-3 mb-4 border rounded-md outline-none'}>
                                    <option value="">Select Payments</option>
                                </select>
                            </div>
                            <div className={'flex flex-col'}>
                                <p className={'text-[16px] font-bold pb-2'}>Requirements upon delivery</p>
                                <div className={'mb-2'}>
                                    <input type="radio" name={'requirement'} value={''} id={'1'}/>
                                    <label htmlFor={'1'} className={'ml-2'}>Do not show the goods</label>
                                </div>
                                <div className={'mb-2'}>
                                    <input type="radio" name={'requirement'} value={''} id={'2'}/>
                                    <label htmlFor={'2'} className={'ml-2'}>Show the goods
                                    </label>
                                </div>
                                <div>
                                    <textarea name="" id="" placeholder={'Note'}
                                              className={'w-full px-4 py-3 mb-4 border rounded-md outline-none '}>
                                    </textarea>
                                </div>
                            </div>
                            <div className={'flex flex-col'}>
                                <p className={'text-[16px] font-bold pb-2'}>Request pick up</p>
                                <div className={'mb-2'}>
                                    <input type="radio" name={'pick-up'} value={''} id={'3'}/>
                                    <label htmlFor={'3'} className={'ml-2'}>Motorbike</label>
                                </div>
                                <div className={'mb-2'}>
                                    <input type="radio" name={'pick-up'} value={''} id={'4'}/>
                                    <label htmlFor={'4'} className={'ml-2'}>Car</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={'col-span-2'}>
                        <button className={'bg-yellow-400 px-4 py-2 rounded w-full'}>
                            <p className={'flex items-center gap-2 justify-center'}><MdOutlineCreateNewFolder/>Create Bill</p>
                        </button>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default CreateBill;