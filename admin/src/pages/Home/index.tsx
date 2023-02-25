import React from "react";
import AdminLayout from "../../layouts/AdminLayout";
import {BiSearch} from "react-icons/bi";
import {Avatar, Box, Divider, IconButton, ListItemIcon, Menu, MenuItem, Tooltip, Typography} from "@mui/material";
import {AiOutlineUserAdd} from "react-icons/ai";

const Home = () => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <AdminLayout>
            <div className="home">
                <div className="search-bar w-full py-2 px-4 bg-white rounded-md shadow">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                                <button className="text-black text-[20px] py-2 rounded-md"><BiSearch/></button>
                                <input type="text" placeholder={'Search...'}
                                       className="rounded-md px-4 py-2 w-full outline-none"/>
                            </div>
                        </div>
                        <Box sx={{display: 'flex', alignItems: 'center', textAlign: 'center'}}>
                            <Typography sx={{minWidth: 100, fontSize: '14px'}}>Nguyễn Phan Huy Hiếu</Typography>
                            <Tooltip title="Account settings">
                                <IconButton
                                    onClick={handleClick}
                                    size="small"
                                    sx={{ml: 2}}
                                    aria-controls={open ? 'account-menu' : undefined}
                                    aria-haspopup="true"
                                    aria-expanded={open ? 'true' : undefined}
                                >
                                    <Avatar sx={{width: 32, height: 32}}>M</Avatar>
                                </IconButton>
                            </Tooltip>
                        </Box>
                        <Menu
                            anchorEl={anchorEl}
                            id="account-menu"
                            open={open}
                            onClose={handleClose}
                            onClick={handleClose}
                            PaperProps={{
                                elevation: 0,
                                sx: {
                                    overflow: 'visible',
                                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                    mt: 1.5,
                                    borderRadius: 2,
                                    padding: 1,
                                    '& .MuiAvatar-root': {
                                        width: 32,
                                        height: 32,
                                        ml: -0.5,
                                        mr: 1,
                                    },
                                    '&:before': {
                                        content: '""',
                                        display: 'block',
                                        position: 'absolute',
                                        top: 0,
                                        right: 14,
                                        width: 10,
                                        height: 10,
                                        bgcolor: 'background.paper',
                                        transform: 'translateY(-50%) rotate(45deg)',
                                        zIndex: 0,
                                    },
                                },
                            }}
                            transformOrigin={{horizontal: 'right', vertical: 'top'}}
                            anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
                        >
                            <MenuItem onClick={handleClose}>
                                <Avatar/> My account
                            </MenuItem>
                            <Divider/>
                            <MenuItem onClick={handleClose}>
                                <ListItemIcon>
                                    <AiOutlineUserAdd/>
                                </ListItemIcon>
                                Add another account
                            </MenuItem>
                            <MenuItem onClick={handleClose}>
                                <ListItemIcon>
                                    <AiOutlineUserAdd/>
                                </ListItemIcon>
                                Settings
                            </MenuItem>
                            <MenuItem onClick={handleClose}>
                                <ListItemIcon>
                                    <AiOutlineUserAdd/>
                                </ListItemIcon>
                                Logout
                            </MenuItem>
                        </Menu>
                    </div>
                </div>
            </div>
        </AdminLayout>
    )
}

export default Home