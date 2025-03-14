import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, FormControlLabel, Switch, List, ListItem } from "@mui/material";
import { HabitItem } from "@/app/types/HabitItem";

export interface AddHabitProps {
    habitsList: HabitItem[]
    date: string,
    saveHabit: (habitsSaved: HabitItem[]) => void
}

const AddHabit: React.FC<AddHabitProps> = (addHabitProps: AddHabitProps) => {
  const [open, setOpen] = useState(false);
  const [switches, setSwitches] = useState([
    { label: "Diário", checked: false },
    { label: "Semanal", checked: false },
    { label: "Mensal", checked: false },
  ]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleToggle = (index: number) => {
    
  };

  return (
    <>
      <Button variant="contained" startIcon={<AddIcon />} onClick={handleOpen}>
        Adicionar
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          Adicionar Dados do desafio no dia {}
          {addHabitProps.date}
        </DialogTitle>
        <DialogContent>
          <List>
            {addHabitProps.habitsList?.map((item, index) => (
              <ListItem key={index}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={item.checked}
                      onChange={() => handleToggle(index)}
                    />
                  }
                  label={item.label}
                />
              </ListItem>
            ))}
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancelar
          </Button>
          <Button onClick={handleClose} color="primary" variant="contained">
            Salvar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AddHabit;