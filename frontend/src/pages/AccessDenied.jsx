import React from 'react';
import { Typography, Box, Button } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';

const AccessDenied = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh', textAlign: 'center', p: 3, bgcolor: '#f0f0f0' }}>
      <LockIcon sx={{ fontSize: 100, color: 'error.main', mb: 3 }} />
      <Typography variant="h4" sx={{ mb: 2 }}>
        Access Denied
      </Typography>
      <Typography variant="body1" sx={{ mb: 4 }}>
        You do not have permission to view this page.
      </Typography>
      <Button variant="contained" color="primary" href="/login">
        Login
      </Button>
    </Box>
  );
};

export default AccessDenied;
