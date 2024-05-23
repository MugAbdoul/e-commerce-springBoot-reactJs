// src/components/ProductDetails.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProductById } from '../../redux/userSlice/productSlice';
import { addToCart } from '../../redux/userSlice/cartSlice';
import { Box, Typography, Container, CircularProgress, Button, Grid, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import UserHeader from './UserHeader';
import { styled } from '@mui/material/styles';

const MainImage = styled('img')(({ theme }) => ({
  width: '100%',
  maxHeight: '350px',
  objectFit: 'cover',
  marginBottom: theme.spacing(2),
}));

const Thumbnail = styled('img')(({ theme, selected }) => ({
  width: '80px',
  height: '80px',
  objectFit: 'cover',
  marginRight: theme.spacing(1),
  cursor: 'pointer',
  border: selected ? `2px solid ${theme.palette.primary.main}` : 'none',
}));

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { product, loading, error } = useSelector(state => state.userProducts);
  const { cart } = useSelector(state => state.cart);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState('');

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
      dispatch(addToCart({ cartId: cart.id, product, quantity }));
    }
  };

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  if (!product) {
    return <Typography>Product not found</Typography>;
  }

  return (
    <Container>
      <UserHeader />
      <Box sx={{ my: 4 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <MainImage src={`http://localhost:8081/images/${selectedImage}`} alt={product.name} />
            <Grid container>
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
            <Typography variant="h6" gutterBottom>${product.price}</Typography>
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
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleAddToCart}
            >
              Add to Cart
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default ProductDetails;
