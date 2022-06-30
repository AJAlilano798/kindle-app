import * as React from 'react';
import { Dialog, AppBar, Toolbar, IconButton, Typography, Slide } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog({open, setOpen, selectedBook, setSelectedBook}) {

  const handleClose = () => {
    setOpen(false);
    setSelectedBook({
      filename: null,
      data: null
    })
  };

  return (
    <React.Fragment>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              {selectedBook.filename}
            </Typography>
          </Toolbar>
        </AppBar>
        <Typography paragraph sx={{ whiteSpace: "pre-line", padding: 10}}>
          {selectedBook.data}
        </Typography>
      </Dialog>
    </React.Fragment>
  );
}