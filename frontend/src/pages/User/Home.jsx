// src/components/ProductList.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserHeader from './UserHeader';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Card, CardContent, CardMedia, Typography, Button, TextField, Grid, Container, CircularProgress, Snackbar } from '@mui/material';
import { styled } from '@mui/material/styles';
import { setSearchTerm, fetchProducts } from '../../redux/userSlice/productSlice';
import { addToCart, fetchCart, updateCartQuantity } from '../../redux/userSlice/cartSlice';

const ProductCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  height: '300px',
  padding: theme.spacing(2),
  boxShadow: theme.shadows[3],
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'scale(1.03)',
  },
  cursor: 'pointer',
  textAlign: 'center',
}));

const AddToCartButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
  backgroundColor: theme.palette.primary.main,
  color: '#fff',
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
  },
}));

const ProductList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products, searchTerm, loading, error } = useSelector(state => state.userProducts);
  const { cart } = useSelector(state => state.cart);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchCart());
  }, [dispatch]);

  const handleSearchChange = (event) => {
    dispatch(setSearchTerm(event.target.value));
  };

  const handleAddToCart = (product) => {
    if (cart.id) {
      const existingItem = cart.items.find(item => item.product.id === product.id);
      if (existingItem) {
        const quantity = existingItem.quantity + 1;
        // If product exists in the cart, update its quantity
        dispatch(updateCartQuantity({ cartId: cart.id, item: existingItem, quantity }));
        setSnackbarMessage('Product quantity updated in cart');
      } else {
        // If product does not exist in the cart, add it as a new item
        dispatch(addToCart({ cartId: cart.id, product, quantity: 1 }));
        setSnackbarMessage('Product added to cart');
      }
      setSnackbarOpen(true);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container>
      <UserHeader />
      <Box sx={{ my: 4, textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>
          Our Products
        </Typography>
        <TextField
          label="Search Products"
          variant="outlined"
          value={searchTerm}
          onChange={handleSearchChange}
          sx={{ maxWidth: '500px', width: '100%' }}
        />
      </Box>
      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
          <CircularProgress />
        </Box>
      )}
      {error && (
        <Typography color="error" align="center">
          {error}
        </Typography>
      )}
      <Grid container spacing={3}>
        {filteredProducts.filter(product => product.available === true).map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={3}>
            <ProductCard onClick={() => handleProductClick(product.id)}>
              <CardMedia
                component="img"
                alt={product.name}
                height="140"
                image={product.images.length > 0 ? `http://localhost:8081/images/${product.images[0].url}` : 'https://via.placeholder.com/150'}
                sx={{ borderRadius: '8px' }}
              />
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {product.name}
                </Typography>
                <Typography variant="body2" color="textSecondary" gutterBottom>
                  ${product.price.toFixed(2)}
                </Typography>
                <AddToCartButton
                  variant="contained"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent triggering the product click handler
                    handleAddToCart(product);
                  }}
                >
                  Add to Cart
                </AddToCartButton>
              </CardContent>
            </ProductCard>
          </Grid>
        ))}
      </Grid>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
      />
    </Container>
  );
};

export default ProductList;
