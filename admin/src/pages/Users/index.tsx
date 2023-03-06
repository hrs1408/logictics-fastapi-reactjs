import AdminLayout from "../../layouts/AdminLayout";
import SearchBar from "../../components/SearchBar";
import React from "react";
import EnhancedTable from "../../components/Table/users";
import axiosConfig from "../../configs/AxiosConfig";
import {useEffectOnce} from "usehooks-ts";
import {Modal} from "@mui/material";
import Input from "../../components/Input";


const Users = () => {
    const [users, setUsers] = React.useState([]);
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    useEffectOnce(() => {
        axiosConfig.get('/users').then((res: any) => {
            setUsers(res.items);
        });
    })
    return (
        <AdminLayout>
            <div className={'h-screen'}>
                <SearchBar/>
                <div className={'flex items-center justify-between p-4 rounded bg-white mt-4 shadow'}>
                    <p className={'text-xl font-bold'}>Danh sách người dùng</p>
                    <button className={'bg-yellow-400 px-4 py-2 rounded shadow'} onClick={handleOpen}>
                        Thêm người dùng
                    </button>
                    <Modal
                        open={open}
                        onClose={handleClose}
                    >
                        <div
                            className={'w-1/2  p-8 bg-white rounded shadow absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'}>
                            <div className={'flex flex-col'}>
                                <p className={'text-2xl font-bold'}>Thêm người dùng</p>
                                <div className={'w-full grid grid-cols-2 gap-4 mt-4'}>
                                    <Input label={'Tên đâỳ đủ'} type={'text'}/>
                                    <Input label={'Email'} type={'text'}/>
                                    <Input label={'Mật khẩu'} type={'password'}/>
                                    <Input label={'Nhập lại mật khẩu'} type={'password'}/>
                                    <div className={'flex flex-col '}>
                                        <label className={'font-bold'}>Phân quyền</label>
                                        <select className={'w-full px-4 py-3 mt-2 border rounded-md outline-none'}>
                                            <option value="ADMIN">Admin</option>
                                            <option value="USER">User</option>
                                        </select>
                                    </div>
                                    <Input label={'Địa chỉ'} type={'text'}/>
                                </div>
                                <div className={'flex items-center mt-8 gap-2 justify-end w-full'}>
                                    <button
                                        className={'bg-yellow-400 px-4 py-2 rounded shadow hover:opacity-80 transition'}>
                                        Thêm
                                    </button>
                                    <button
                                        className={'bg-gray-400 px-4 py-2 rounded shadow hover:opacity-80 transition'}
                                        onClick={handleClose}>
                                        Huỷ bỏ
                                    </button>
                                </div>
                            </div>
                        </div>
                    </Modal>
                </div>
                <div className={'users-table mt-4'}>
                    <EnhancedTable listUser={users}/>
                </div>
            </div>
        </AdminLayout>
    );
};

export default Users;