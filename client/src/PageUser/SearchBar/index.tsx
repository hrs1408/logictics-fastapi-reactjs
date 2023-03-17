import { BiSearch } from 'react-icons/bi'
import {
  Avatar,
  Box,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from '@mui/material'
import { AiOutlineUser } from 'react-icons/ai'
import { IoSettingsOutline } from 'react-icons/io5'
import { FiLogOut } from 'react-icons/fi'
import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { removeToken } from '../../services/AuthService'
import { AuthContext } from '../../context/AuthContext'

const SearchBar = () => {
  const { auth, getMeForce } = useContext(AuthContext) as AuthContextType

  console.log(auth, 'auth')

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  let navigate = useNavigate()
  const handleClose = () => {
    setAnchorEl(null)
  }
  const logout = () => {
    localStorage.removeItem('TOKEN_KEY')
    removeToken()
    navigate('/login')
  }

  return (
    <div className="search-bar w-full py-2 px-4 bg-white rounded-md shadow">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <button className="text-black text-[20px] py-2 rounded-md">
              <BiSearch />
            </button>
            <input
              type="text"
              placeholder={'Search...'}
              className="rounded-md px-4 py-2 w-full outline-none"
            />
          </div>
        </div>
        <Box
          sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}
        >
          <Typography
            sx={{ minWidth: 100, fontSize: '16px', fontWeight: 'bold' }}
          >
            {auth?.email}
          </Typography>
          <Tooltip title="Account settings">
            <IconButton
              onClick={handleClick}
              size="small"
              sx={{ ml: 2 }}
              aria-controls={open ? 'account-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
            >
              <Avatar sx={{ width: 32, height: 32 }} />
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
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          <div className={'flex items-center px-4 py-2'}>
            <Avatar />
            {auth?.email}
          </div>
          <Divider />
          <MenuItem sx={{ borderRadius: '4px' }} onClick={handleClose}>
            <ListItemIcon>
              <AiOutlineUser />
            </ListItemIcon>
            Tài khoản của tôi
          </MenuItem>
          <MenuItem sx={{ borderRadius: '4px' }} onClick={handleClose}>
            <ListItemIcon>
              <IoSettingsOutline />
            </ListItemIcon>
            Cài đặt
          </MenuItem>
          <MenuItem sx={{ borderRadius: '4px' }} onClick={handleClose}>
            <ListItemIcon>
              <FiLogOut />
            </ListItemIcon>
            <button onClick={logout}>Đăng xuất</button>
          </MenuItem>
        </Menu>
      </div>
    </div>
  )
}

export default SearchBar
