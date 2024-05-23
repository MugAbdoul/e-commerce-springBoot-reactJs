import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrders, selectOrders, selectLoading, selectError } from '../../redux/userSlice/orderSlice';
import {
  Box,
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Snackbar,
  IconButton,
  Collapse,
  Grid,
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import UserHeader from './UserHeader';

const OrderPage = () => {
  const dispatch = useDispatch();
  const orders = useSelector(selectOrders);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  const CollapsibleTableRow = ({ order }) => {
    const [open, setOpen] = useState(false);

    return (
      <>
        <TableRow>
          <TableCell>
            <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell>{order.id}</TableCell>
          <TableCell>{order.orderDate}</TableCell>
          <TableCell>{order.status}</TableCell>
          <TableCell>{order.amount}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box margin={1}>
                <Box mt={2}>
                  <Typography variant="h6" gutterBottom component="div">
                    Order Products
                  </Typography>
                  <Table size="small" aria-label="purchases">
                    <TableHead>
                      <TableRow>
                        <TableCell>Product Name</TableCell>
                        <TableCell>Quantity</TableCell>
                        <TableCell>Price</TableCell>
                        <TableCell>Image</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {order.orderProducts.map((product) => (
                        <TableRow key={product.id}>
                          <TableCell>{product.productName}</TableCell>
                          <TableCell>{product.quantity}</TableCell>
                          <TableCell>{product.price}</TableCell>
                          <TableCell>
                            <img
                              src={`http://localhost:8081/images/${product.image}`}
                              alt={product.productName}
                              width="50"
                            />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Box>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </>
    );
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </Box>
    );
  }

  return (
    <Container>
      <UserHeader />
      <Box
        mt={7}
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Grid container spacing={3} sx={{ maxWidth: 1000 }}>
          <Grid item xs={12}>
          <Box sx={{ p: 3 }}>
        <Typography variant="h4" mb={3}>
          Orders
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell>ID</TableCell>
                <TableCell>Order Date</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Amount</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order) => (
                <CollapsibleTableRow key={order.id} order={order} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
        </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default OrderPage;
