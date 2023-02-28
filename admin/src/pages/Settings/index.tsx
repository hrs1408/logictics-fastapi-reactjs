import SearchBar from "../../components/SearchBar";
import React from "react";
import AdminLayout from "../../layouts/AdminLayout";
import {Box, Tab, Tabs} from "@mui/material";
import './settings.scss'
import Input from "../../components/Input";
import {useEffectOnce} from "usehooks-ts";

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;

}

const TabPanel: React.FC<TabPanelProps> = ({children, index, value}) => {
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            className={'w-full'}
        >
            {value === index && (
                <Box sx={{p: 3}}>
                    <div>{children}</div>
                </Box>
            )}
        </div>
    );
}

const a11yProps = (index: number) => {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}
const Settings = () => {
    const [value, setValue] = React.useState(0);
    const [setTab, setSetTab] = React.useState(true);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    useEffectOnce(() => {
        resizeScreen();
        window.addEventListener('resize', resizeScreen);
        return () => {
            window.removeEventListener('resize', resizeScreen);
        };
    });
    const resizeScreen = () => {
        if (window.innerWidth < 1024) {
            setSetTab(false);
        } else {
            setSetTab(true);
        }
    };

    return (
        <AdminLayout>
            <div className="settings w-full h-screen">
                <SearchBar/>
                <div className="setting-tab mt-2 flex gap-4">
                    <div className={`${setTab ? 'flex gap-4' : 'flex flex-col gap-4'} mt-4 w-full`}>
                        <Tabs
                            orientation="vertical"
                            variant="scrollable"
                            value={value}
                            onChange={handleChange}
                            aria-label="Vertical tabs example"
                            sx={{width: '20%'}}
                        >
                            <Tab label="Change information" {...a11yProps(0)}
                                 sx={
                                     setTab
                                         ? {
                                             backgroundColor: '#fff',
                                             marginBottom: 1,
                                             boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.1)',
                                             '&.Mui-selected': {
                                                 backgroundColor: '#FCD804',
                                                 color: '#020202',
                                                 borderRadius: 1,
                                             },
                                         }
                                         : {padding: 0, fontSize: 12, borderRadius: 2}
                                 }
                            />
                            <Tab label="change password" {...a11yProps(1)}
                                 sx={
                                     setTab
                                         ? {
                                             backgroundColor: '#fff',
                                             boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.1)',
                                             '&.Mui-selected': {
                                                 backgroundColor: '#FCD804',
                                                 color: '#020202',
                                                 borderRadius: 1,
                                             },
                                         }
                                         : {padding: 0, fontSize: 12, borderRadius: 2}
                                 }
                            />
                        </Tabs>
                        <TabPanel value={value} index={0}>
                            <div className={'px-10 py-8 bg-white rounded w-full shadow'}>
                                <p className={'text-lg font-bold'}>Change the account information</p>
                                <form>
                                    <div className={'grid grid-cols-2 mt-6 gap-4'}>
                                        <div className={'flex flex-col gap-4'}>
                                            <div className={'flex flex-col gap-2'}>
                                                <Input label={'Full Name'}/>
                                            </div>
                                        </div>
                                        <div className={'flex flex-col gap-4'}>
                                            <div className={'flex flex-col gap-2'}>
                                                <Input label={'Email'} type={'email'}/>
                                            </div>
                                        </div>
                                        <div className={'flex flex-col gap-4'}>
                                            <div className={'flex flex-col gap-2'}>
                                                <Input label={'Phone Number'}/>
                                            </div>
                                        </div>
                                        <div className={'flex flex-col gap-4'}>
                                            <div className={'flex flex-col gap-2'}>
                                                <Input label={'ID Card'}/>
                                            </div>
                                        </div>
                                        <div className={'flex flex-col gap-4'}>
                                            <div className={'flex flex-col gap-2'}>
                                                <Input label={'Address'}/>
                                            </div>
                                        </div>
                                        <div className={'flex flex-col gap-4'}>
                                            <div className={'flex flex-col gap-2'}>
                                                <Input label={'Date Of Birth'} type={'date'}/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={'mt-4'}>
                                        <button
                                            className={'bg-yellow-400 px-4 py-2 rounded w-full'}
                                        >
                                            Save
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </TabPanel>
                        <TabPanel value={value} index={1}>
                            <div className={'px-10 py-8 bg-white rounded w-full shadow'}>
                                <p className={'text-lg font-bold'}>Change the password</p>
                                <form>
                                    <div className={'mt-6'}>
                                        <div className={'flex flex-col gap-4'}>
                                            <div className={'flex flex-col gap-2'}>
                                                <Input label={'New Password'} type={'password'}/>
                                            </div>
                                        </div>
                                        <div className={'flex flex-col gap-4'}>
                                            <div className={'flex flex-col gap-2'}>
                                                <Input label={'Re-enter New Password'} type={'password'}/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={'mt-4'}>
                                        <button
                                            className={'bg-yellow-400 px-4 py-2 rounded w-full'}
                                        >
                                            Save
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </TabPanel>
                    </div>
                </div>
            </div>
        </AdminLayout>
    )
}

export default Settings