// src/components/Checkout/ReviewCart.js
import React from 'react';
import { useSelector } from 'react-redux';
import { Box, Typography, Button, Grid, Card, CardContent, CardMedia } from '@mui/material';
import { styled } from '@mui/material/styles';

const CartCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  padding: theme.spacing(2),
  boxShadow: theme.shadows[3],
}));

const CardDetails = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  marginLeft: theme.spacing(2),
}));

const ReviewCart = ({ handleNext }) => {
  const { cart } = useSelector(state => state.cart);

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>Review Cart Items</Typography>
      <Grid container spacing={3}>
        {cart.items.map((item) => (
          <Grid item key={item.product.id} xs={12} sm={6} md={4}>
            <CartCard>
              <CardMedia
                component="img"
                alt={item.product.name}
                height="100"
                image={item.product.images.length > 0 ? `http://localhost:8081/images/${item.product.images[0].url}` : 'https://via.placeholder.com/100'}
                sx={{ width: 100, height: 100, objectFit: 'cover' }}
              />
              <CardDetails>
                <Typography variant="h6">{item.product.name}</Typography>
                <Typography variant="body2" color="textSecondary">
                  ${item.product.price} x {item.quantity}
                </Typography>
                <Typography variant="body1" color="textPrimary">
                  Total: ${(item.product.price * item.quantity).toFixed(2)}
                </Typography>
              </CardDetails>
            </CartCard>
          </Grid>
        ))}
      </Grid>
      <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
        <Button variant="contained" color="primary" onClick={handleNext} size="large">
          Next
        </Button>
      </Box>
    </Box>
  );
};

export default ReviewCart;
