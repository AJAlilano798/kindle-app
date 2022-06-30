import * as React from 'react';
import { AppBar, Box, Toolbar, Typography } from '@mui/material';

export default function Navbar() {
  return (
    <Box sx={{ flexGrow: 1, height: '64px' }}>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Kindle App
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}