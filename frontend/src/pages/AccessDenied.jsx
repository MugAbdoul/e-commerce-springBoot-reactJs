import React from 'react';
import { Typography, Box } from '@mui/material';

const AccessDenied = () => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Typography variant="h4">Access Denied</Typography>
    </Box>
  );
};

export default AccessDenied;
