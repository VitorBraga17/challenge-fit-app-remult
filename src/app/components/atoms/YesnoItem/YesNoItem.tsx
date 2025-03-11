import React from 'react';
import { Box, Typography } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

interface YesNoBoxProps {
  value: boolean;
}

const YesNoBox: React.FC<YesNoBoxProps> = ({ value }) => {
  return (
    <Box
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 1, // Smaller padding
        border: '2px solid',
        borderColor: value ? '#4caf50' : '#f44336', // Green or red border
        borderRadius: 1, // Smaller border radius
        backgroundColor: value ? '#e8f5e9' : '#ffebee', // Light green or light red background
        boxShadow: 1, // Subtle shadow for depth
        transition: 'all 0.3s ease', // Smooth transition for hover effects
        '&:hover': {
          transform: 'scale(1.05)', // Slight zoom on hover
          boxShadow: 2, // Increase shadow on hover
        },
      }}
    >
      {value ? (
        <CheckIcon sx={{ color: '#4caf50', fontSize: '1.25rem' }} /> // Smaller icon
      ) : (
        <CloseIcon sx={{ color: '#f44336', fontSize: '1.25rem' }} /> // Smaller icon
      )}
      <Typography
        variant="body2" // Smaller text
        sx={{
          fontWeight: 'bold',
          color: value ? '#4caf50' : '#f44336',
          marginLeft: 1, // Smaller margin
        }}
      >
        {value ? 'Yes' : 'No'}
      </Typography>
    </Box>
  );
};

export default YesNoBox;