import React from 'react';
import { Grid, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            style={{ minHeight: '100vh' }}
        >
            <Grid item xs={12}>
                <Typography variant="h1" component="div" gutterBottom>
                    404
                </Typography>
                <Typography variant="h4" component="div" gutterBottom>
                    Page Not Found
                </Typography>
                <Button variant="contained" color="primary" component={Link} to="/login">
                    Go to Login
                </Button>
            </Grid>
        </Grid>
    );
}

export default NotFound;
