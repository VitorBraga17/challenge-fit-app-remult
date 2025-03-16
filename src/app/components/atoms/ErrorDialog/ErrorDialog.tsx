import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import ErrorIcon from '@mui/icons-material/Error';
import { Box, Typography } from '@mui/material';

/**
 * Props for the ErrorDialog component
 */
interface ErrorDialogProps {
  /** Controls if the dialog is open */
  open: boolean;
  /** Callback for when dialog is closed */
  onClose: () => void;
  /** Title of the error dialog */
  title?: string;
  /** Error message to display */
  message?: string;
}

/**
 * ErrorDialog component to display error messages
 */
const ErrorDialog: React.FC<ErrorDialogProps> = ({
  open,
  onClose,
  title = "Error",
  message = "An error occurred."
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="error-dialog-title"
      aria-describedby="error-dialog-description"
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle id="error-dialog-title">
        <Box display="flex" alignItems="center" color="error.main">
          <ErrorIcon sx={{ mr: 1 }} />
          <Typography variant="h6" component="span">
            {title}
          </Typography>
        </Box>
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="error-dialog-description">
          {message}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary" variant="contained" autoFocus>
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ErrorDialog;