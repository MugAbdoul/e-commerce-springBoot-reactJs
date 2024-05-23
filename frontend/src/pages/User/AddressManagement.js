// src/components/AddressManagement.js
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAddresses, addAddress, updateAddress, removeAddress } from '../../redux/userSlice/addressSlice';
import { Box, Typography, Container, CircularProgress, Button, Grid, IconButton, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Snackbar, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import UserHeader from './UserHeader';

const AddressCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  marginBottom: theme.spacing(2),
  boxShadow: theme.shadows[3],
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
}));

const AddressManagement = () => {
  const dispatch = useDispatch();
  const { addresses, loading, error } = useSelector(state => state.addresses);
  const [open, setOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [currentAddress, setCurrentAddress] = useState({
    id: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
  });
  const [snackbar, setSnackbar] = useState({ open: false, message: '' });

  useEffect(() => {
    dispatch(fetchAddresses());
  }, [dispatch]);

  const handleOpen = (address = null) => {
    if (address) {
      setIsEdit(true);
      setCurrentAddress(address);
    } else {
      setIsEdit(false);
      setCurrentAddress({
        id: '',
        street: '',
        city: '',
        state: '',
        zipCode: '',
        country: '',
      });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    if (isEdit) {
      dispatch(updateAddress({ id: currentAddress.id, address: currentAddress }))
        .then(() => setSnackbar({ open: true, message: 'Address updated successfully' }))
        .catch(() => setSnackbar({ open: true, message: 'Failed to update address' }));
    } else {
      dispatch(addAddress(currentAddress))
        .then(() => setSnackbar({ open: true, message: 'Address added successfully' }))
        .catch(() => setSnackbar({ open: true, message: 'Failed to add address' }));
    }
    handleClose();
  };

  const handleDelete = (id) => {
    dispatch(removeAddress(id))
      .then(() => setSnackbar({ open: true, message: 'Address deleted successfully' }))
      .catch(() => setSnackbar({ open: true, message: 'Failed to delete address' }));
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ open: false, message: '' });
  };

  if (loading) {
    return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}><CircularProgress /></Box>;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <Container>
      <UserHeader />
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" gutterBottom>Manage Addresses</Typography>
        <Button variant="contained" color="primary" onClick={() => handleOpen()}>
          Add Address
        </Button>
        <Grid container spacing={2} sx={{ mt: 2 }}>
          {addresses.map((address) => (
            <Grid item xs={12} key={address.id}>
              <AddressCard>
                <Box>
                  <Typography variant="body1"><strong>Street:</strong> {address.street}</Typography>
                  <Typography variant="body1"><strong>City:</strong> {address.city}</Typography>
                  <Typography variant="body1"><strong>State:</strong> {address.state}</Typography>
                  <Typography variant="body1"><strong>Zip Code:</strong> {address.zipCode}</Typography>
                  <Typography variant="body1"><strong>Country:</strong> {address.country}</Typography>
                </Box>
                <Box>
                  <IconButton color="primary" onClick={() => handleOpen(address)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton color="secondary" onClick={() => handleDelete(address.id)}>
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </AddressCard>
            </Grid>
          ))}
        </Grid>
      </Box>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{isEdit ? 'Edit Address' : 'Add Address'}</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Street"
            fullWidth
            value={currentAddress.street}
            onChange={(e) => setCurrentAddress({ ...currentAddress, street: e.target.value })}
          />
          <TextField
            margin="dense"
            label="City"
            fullWidth
            value={currentAddress.city}
            onChange={(e) => setCurrentAddress({ ...currentAddress, city: e.target.value })}
          />
          <TextField
            margin="dense"
            label="State"
            fullWidth
            value={currentAddress.state}
            onChange={(e) => setCurrentAddress({ ...currentAddress, state: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Zip Code"
            fullWidth
            value={currentAddress.zipCode}
            onChange={(e) => setCurrentAddress({ ...currentAddress, zipCode: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Country"
            fullWidth
            value={currentAddress.country}
            onChange={(e) => setCurrentAddress({ ...currentAddress, country: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message={snackbar.message}
      />
    </Container>
  );
};

export default AddressManagement;
