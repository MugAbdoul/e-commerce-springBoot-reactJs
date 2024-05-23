// src/components/ProductList.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UserHeader from './UserHeader';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Card, CardContent, CardMedia, Typography, Button, TextField, Grid, Container, CircularProgress } from '@mui/material';
import { styled } from '@mui/material/styles';
import { setSearchTerm, fetchProducts } from '../../redux/userSlice/productSlice';
import { addToCart, fetchCart } from '../../redux/userSlice/cartSlice';

const ProductCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  height: '100%',
  cursor: 'pointer',
}));

const ProductList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products, searchTerm, loading, error } = useSelector(state => state.userProducts);
  const { cart, cartLoading, cartError } = useSelector(state => state.cart);

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchCart());
  }, [dispatch]);

  const handleSearchChange = (event) => {
    dispatch(setSearchTerm(event.target.value));
  };

  const handleAddToCart = (product) => {
    if (cart.id) {
      dispatch(addToCart({ cartId: cart.id, product, quantity: 1 }));
    }
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
      <Box sx={{ my: 4 }}>
        <TextField
          label="Search Products"
          variant="outlined"
          fullWidth
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </Box>
      {loading && <CircularProgress />}
      {error && <Typography color="error">{error}</Typography>}
      <Grid container spacing={4}>
        {filteredProducts.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4}>
            <ProductCard onClick={() => handleProductClick(product.id)}>
              <CardMedia
                component="img"
                alt={product.name}
                height="150"
                image={product.images.length > 0 ? `http://localhost:8081/images/${product.images[0].url}` : 'https://via.placeholder.com/150'}
              />
              <CardContent>
                <Typography variant="h6">{product.name}</Typography>
                <Typography variant="body2" color="textSecondary">
                  ${product.price}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent triggering the product click handler
                    handleAddToCart(product);
                  }}
                >
                  Add to Cart
                </Button>
              </CardContent>
            </ProductCard>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ProductList;
