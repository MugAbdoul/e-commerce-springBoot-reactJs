// src/components/UserHeader.js
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { AppBar, Toolbar, IconButton, Typography, Badge, Box, Button } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CartDropdown from './Cart';

const UserHeader = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const cart = useSelector(state => state.cart);

  const handleCartClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCartClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            GURA.
          </Typography>
          <Button color="inherit" href="/">Home</Button>
          <Button color="inherit" href="/orders">Orders</Button>
          <Button color="inherit" href="/address">Address</Button>
          <IconButton color="inherit" onClick={handleCartClick}>
            <Badge badgeContent={cart.cart.items.length} color="error">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
      <CartDropdown anchorEl={anchorEl} handleClose={handleCartClose} />
    </Box>
  );
};

export default UserHeader;
