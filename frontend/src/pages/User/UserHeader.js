// src/components/UserHeader.js
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { AppBar, Toolbar, IconButton, Typography, Menu, Badge, Box, Button } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CartDropdown from './Cart';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { selectUser } from '../../redux/slices/userSlice';
import { useNavigate } from 'react-router-dom';

const settings = [
  { name: 'Profile', path: '/profile' },
  { name: 'Address', path: '/address' },
  { name: 'Orders', path: '/orders' },
  { name: 'Logout', path: '/logout' },
];

const UserHeader = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const cart = useSelector(state => state.cart);
  const user = useSelector(selectUser);
  const navigate = useNavigate();

  const handleCartClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCartClose = () => {
    setAnchorEl(null);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleNavigate = (path) => {
    navigate(path);
    handleCloseUserMenu();
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            GURA.
          </Typography>
          <Button color="inherit" href="/">Home</Button>
          <IconButton color="inherit" onClick={handleCartClick}>
            <Badge badgeContent={cart.cart.items.length} color="error">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
          <Box sx={{ flexGrow: 0, marginLeft: 1 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt={user.firstname} src={`http://localhost:8081/images/${user.profileImage}`} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting.name} onClick={() => handleNavigate(setting.path)}>
                  <Typography textAlign="center">{setting.name}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
      <CartDropdown anchorEl={anchorEl} handleClose={handleCartClose} />
    </Box>
  );
};

export default UserHeader;
