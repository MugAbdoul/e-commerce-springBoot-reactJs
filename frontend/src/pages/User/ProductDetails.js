// src/components/ProductDetails.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProductById } from '../../redux/userSlice/productSlice';
import { addToCart, updateCartQuantity } from '../../redux/userSlice/cartSlice';
import { Box, Typography, Container, Snackbar, CircularProgress, Button, Grid, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import UserHeader from './UserHeader';
import { styled } from '@mui/material/styles';

const MainImage = styled('img')(({ theme }) => ({
  width: '100%',
  maxHeight: '400px',
  objectFit: 'cover',
  marginBottom: theme.spacing(2),
  borderRadius: '8px',
  boxShadow: theme.shadows[3],
}));

const Thumbnail = styled('img')(({ theme, selected }) => ({
  width: '80px',
  height: '80px',
  objectFit: 'cover',
  marginRight: theme.spacing(1),
  cursor: 'pointer',
  border: selected ? `2px solid ${theme.palette.primary.main}` : `2px solid ${theme.palette.grey[300]}`,
  borderRadius: '4px',
  boxShadow: theme.shadows[1],
  transition: 'border 0.3s ease',
  '&:hover': {
    border: `2px solid ${theme.palette.primary.dark}`,
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
  padding: theme.spacing(1.5),
  fontSize: '1rem',
  backgroundColor: theme.palette.primary.main,
  color: '#fff',
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
  },
}));

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { product, loading, error } = useSelector(state => state.userProducts);
  const { cart } = useSelector(state => state.cart);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState('');

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  useEffect(() => {
    dispatch(fetchProductById(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (product && product.images.length > 0) {
      setSelectedImage(product.images[0].url);
    }
  }, [product]);

  const handleAddToCart = () => {
    if (cart.id) {
      const existingItem = cart.items.find(item => item.product.id === product.id);
      if (existingItem) {
        // If product exists in the cart, update its quantity
        dispatch(updateCartQuantity({ cartId: cart.id, item: existingItem, quantity }));
        setSnackbarMessage('Product quantity updated in cart');
      } else {
        // If product does not exist in the cart, add it as a new item
        dispatch(addToCart({ cartId: cart.id, product, quantity }));
        setSnackbarMessage('Product added to cart');
      }
      setSnackbarOpen(true);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  if (loading) {
    return <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}><CircularProgress /></Box>;
  }

  if (error) {
    return <Typography color="error" align="center">{error}</Typography>;
  }

  if (!product) {
    return <Typography align="center">Product not found</Typography>;
  }

  return (
    <Container>
      <UserHeader />
      <Box sx={{ my: 4 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <MainImage src={`http://localhost:8081/images/${selectedImage}`} alt={product.name} />
            <Grid container spacing={1}>
              {product.images.map((img, index) => (
                <Grid item key={index}>
                  <Thumbnail
                    src={`http://localhost:8081/images/${img.url}`}
                    alt={`${product.name} ${index + 1}`}
                    selected={selectedImage === img.url}
                    onClick={() => setSelectedImage(img.url)}
                  />
                </Grid>
              ))}
            </Grid>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h4" gutterBottom>{product.name}</Typography>
            <Typography variant="body1" gutterBottom>{product.description}</Typography>
            <Typography variant="h6" gutterBottom color="primary">${product.price}</Typography>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Quantity</InputLabel>
              <Select
                value={quantity}
                label="Quantity"
                onChange={(e) => setQuantity(e.target.value)}
              >
                {[...Array(10).keys()].map((num) => (
                  <MenuItem key={num + 1} value={num + 1}>{num + 1}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <StyledButton
              variant="contained"
              onClick={handleAddToCart}
              fullWidth
            >
              Add to Cart
            </StyledButton>
          </Grid>
        </Grid>
      </Box>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
      />
    </Container>
  );
};

export default ProductDetails;
