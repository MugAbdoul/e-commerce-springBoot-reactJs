// src/components/CartDropdown.js
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Card, CardContent, CardMedia, Typography, IconButton, Popover, Snackbar, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';
import { removeFromCart, updateCartQuantity, fetchCart } from '../../redux/userSlice/cartSlice';

const CartCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  height: '100%',
  marginBottom: theme.spacing(2),
}));

const CartDropdown = ({ anchorEl, handleClose }) => {
  const dispatch = useDispatch();
  const { cart, loading, error, snackbar } = useSelector(state => state.cart);

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  const handleRemoveFromCart = (item) => {
    dispatch(removeFromCart({ cartId: cart.id, item }));
  };

  const handleUpdateQuantity = (item, quantity) => {
    if (quantity > 0) {
      dispatch(updateCartQuantity({ cartId: cart.id, item, quantity }));
    }
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <Box sx={{ p: 2, width: 300 }}>
          {loading && <Typography>Loading...</Typography>}
          {error && <Typography color="error">{error}</Typography>}
          {cart.items.map((item) => (
            <CartCard key={item.product.id}>
              <CardMedia
                component="img"
                alt={item.product.name}
                height="100"
                image={item.product.images.length > 0 ? `http://localhost:8081/images/${item.product.images[0].url}` : 'https://via.placeholder.com/150'}
              />
              <CardContent>
                <Typography variant="h6">{item.product.name}</Typography>
                <Typography variant="body2" color="textSecondary">
                  ${item.product.price} x {item.quantity}
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1 }}>
                  <IconButton color="primary" onClick={() => handleUpdateQuantity(item, item.quantity + 1)}>
                    <AddIcon />
                  </IconButton>
                  <Typography>{item.quantity}</Typography>
                  <IconButton color="primary" onClick={() => handleUpdateQuantity(item, item.quantity - 1)} disabled={item.quantity <= 1}>
                    <RemoveIcon />
                  </IconButton>
                  <IconButton color="secondary" onClick={() => handleRemoveFromCart(item)}>
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </CardContent>
            </CartCard>
          ))}
          <Button variant="contained" color="primary" fullWidth onClick={handleClose}>
            Checkout
          </Button>
        </Box>
      </Popover>
    </>
  );
};

export default CartDropdown;
