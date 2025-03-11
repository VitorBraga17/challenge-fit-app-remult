import React, { useState } from 'react';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { TextField } from '@mui/material';
import 'date-fns'; // Ensure date-fns is installed for date handling

interface MobileDatePickerProps {
  label?: string;
  value: Date | null;
  onChange: (date: Date | null) => void;
}

const CustomMobileDatePicker: React.FC<MobileDatePickerProps> = ({ label = 'Escolha um dia', value, onChange }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <MobileDatePicker
        label={label}
        value={value}
        onChange={onChange}
      />
    </LocalizationProvider>
  );
};

export default CustomMobileDatePicker;