import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Badge, Menu, MenuItem, Box, Button, Card, CardContent, CardMedia, List, ListItem, Divider } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MoreIcon from '@mui/icons-material/MoreVert';

const CartCard = ({ product }) => (
  <Card sx={{ display: 'flex', marginBottom: 0, width: '100%' }}>
    <CardMedia
      component="img"
      sx={{ width: 150, maxHeight: 150 }}
      image={product.image}
      alt={product.name}
    />
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <CardContent sx={{ flex: '1 0 auto' }}>
        <Typography component="div" variant="h6">
          {product.name}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" component="div">
          ${product.price} x {product.quantity} 
        </Typography>
        <Typography variant="subtitle1" color="text.primary" component="div">
          Total: ${product.price * product.quantity}
        </Typography>
      </CardContent>
    </Box>
  </Card>
);

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const [cartAnchorEl, setCartAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const isCartOpen = Boolean(cartAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCartMenuOpen = (event) => {
    setCartAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleCartMenuClose = () => {
    setCartAnchorEl(null);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const productsInCart = [
    { id: 1, name: 'Product 1', price: 10, quantity: 2, image: 'https://via.placeholder.com/100' },
    { id: 2, name: 'Product 2', price: 20, quantity: 1, image: 'https://via.placeholder.com/100' },
    { id: 2, name: 'Product 2', price: 20, quantity: 1, image: 'https://via.placeholder.com/100' },
    { id: 2, name: 'Product 2', price: 20, quantity: 1, image: 'https://via.placeholder.com/100' },
    { id: 2, name: 'Product 2', price: 20, quantity: 1, image: 'https://via.placeholder.com/100' },
  ];

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
      sx={{marginTop: 7}}
    >
      <MenuItem onClick={handleMenuClose}>Account</MenuItem>
      <MenuItem onClick={handleMenuClose}>Address</MenuItem>
      <MenuItem onClick={handleMenuClose}>Orders</MenuItem>
      <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
    </Menu>
  );

  const cartMenuId = 'primary-cart-menu';
  const renderCartMenu = (
    <Menu
      anchorEl={cartAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={cartMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isCartOpen}
      onClose={handleCartMenuClose}
      PaperProps={{
        style: {
          maxHeight: '500px',
          width: '450px',
          marginTop: '55px'
        },
      }}
    >
      <List sx={{ width: '100%', maxWidth: 560, bgcolor: 'background.paper' }}>
        {productsInCart.map((product) => (
          <ListItem key={product.id}>
            <CartCard product={product}/>
          </ListItem>
        ))}
      </List>
      <Divider />
      <MenuItem>
        <Button variant="contained" color="primary" fullWidth>
          Checkout
        </Button>
      </MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
      <MenuItem onClick={handleCartMenuOpen}>
        <IconButton size="large" aria-label="show cart items" color="inherit">
          <Badge badgeContent={4} color="error">
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
        <p>Cart</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h5"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
            GURA.
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <Button color="inherit" href="/">Home</Button>
            <IconButton size="large" aria-label="show cart items" color="inherit" onClick={handleCartMenuOpen}>
              <Badge badgeContent={4} color="error">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
      {renderCartMenu}
    </Box>
  );
}

export default Header;
