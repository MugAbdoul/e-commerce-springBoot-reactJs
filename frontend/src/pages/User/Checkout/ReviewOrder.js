// src/components/Checkout/ReviewOrder.js
import React from 'react';
import { useSelector } from 'react-redux';
import { Box, Typography, Button, Grid, Card, CardContent, CardMedia, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  height: '100%',
  marginBottom: theme.spacing(2),
}));

const SectionPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2),
}));

const ReviewOrder = ({ handleBack, handlePlaceOrder, shippingAddress, paymentInfo }) => {
  const { cart } = useSelector(state => state.cart);

  const totalAmount = cart.items.reduce((total, item) => total + item.product.price * item.quantity, 0);

  return (
    <Box>
      <Typography variant="h4" gutterBottom>Review Order</Typography>
      <SectionPaper>
        <Typography variant="h6" gutterBottom>Shipping Address</Typography>
        <Typography>{`${shippingAddress.street}, ${shippingAddress.city}, ${shippingAddress.state}, ${shippingAddress.zipCode}, ${shippingAddress.country}`}</Typography>
      </SectionPaper>

      <SectionPaper>
        <Typography variant="h6" gutterBottom>Payment Information</Typography>
        <Typography>Card Number: **** **** **** {paymentInfo.cardNumber.slice(-4)}</Typography>
        <Typography>Expiry Date: {paymentInfo.expiryDate}</Typography>
      </SectionPaper>

      <SectionPaper>
        <Typography variant="h6" gutterBottom>Order Items</Typography>
        <Grid container spacing={2}>
          {cart.items.map((item) => (
            <Grid item key={item.product.id} xs={12} sm={6} md={4}>
              <StyledCard>
                <CardMedia
                  component="img"
                  alt={item.product.name}
                  sx={{ width: 'auto', height: 100, objectFit: 'cover', marginRight: 2 }}
                  image={item.product.images.length > 0 ? `http://localhost:8081/images/${item.product.images[0].url}` : 'https://via.placeholder.com/150'}
                />
                <CardContent sx={{ flex: '1 0 auto' }}>
                  <Typography variant="h6" noWrap>{item.product.name}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    ${item.product.price} x {item.quantity}
                  </Typography>
                </CardContent>
              </StyledCard>
            </Grid>
          ))}
        </Grid>
      </SectionPaper>

      <SectionPaper>
        <Typography variant="h6" gutterBottom>Total Amount</Typography>
        <Typography variant="h5">${totalAmount.toFixed(2)}</Typography>
      </SectionPaper>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4 }}>
        <Button variant="contained" onClick={handleBack} sx={{ mr: 2 }}>Back</Button>
        <Button variant="contained" color="primary" onClick={handlePlaceOrder}>Place Order</Button>
      </Box>
    </Box>
  );
};

export default ReviewOrder;
