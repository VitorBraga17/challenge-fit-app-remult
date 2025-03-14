import React from "react";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { enGB } from "date-fns/locale/en-GB";
import "date-fns";
interface MobileDatePickerProps {
  label?: string;
  value: Date | null;
  onChange: (date: Date | null) => void;
}

const CustomMobileDatePicker: React.FC<MobileDatePickerProps> = ({
  label = "Escolha um dia",
  value,
  onChange,
}) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={enGB}>
      <MobileDatePicker label={label} value={value} onChange={onChange} />
    </LocalizationProvider>
  );
};

export default CustomMobileDatePicker;
