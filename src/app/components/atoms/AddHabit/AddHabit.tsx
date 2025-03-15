import React, { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControlLabel,
  Switch,
  List,
  ListItem,
} from "@mui/material";
import { Habits } from "@/app/shared/Habits";

export interface AddHabitProps {
  habitsList: Habits[];
  date: string;
  saveHabit: (habitsSaved: Habits[]) => void;
}

interface SwitchItem {
  label: string;
  checked: boolean;
}

const AddHabit: React.FC<AddHabitProps> = (addHabitProps: AddHabitProps) => {
  const [open, setOpen] = useState(false);
  const [habitsForSave, setHabitsForSave] = useState<Habits[]>([]);
  const [switches, setSwitches] = useState<SwitchItem[]>([]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    addHabitProps.saveHabit(habitsForSave);
    setOpen(false);
  };

  const handleToggle = (item: Habits) => {
    setSwitches((prevSwitches) => {
      const updatedSwitches = prevSwitches.map((switchItem) => {
        if (switchItem.label === item.label) {
          return { ...switchItem, checked: !switchItem.checked };
        }
        return switchItem;
      });

      useEffect(() => {
        const initialSwitches = addHabitProps.habitsList.map((habit) => ({
          label: habit.label,
          checked: false,
        }));
        setSwitches(initialSwitches);
      }, [addHabitProps.habitsList]);

      const updatedHabitsForSave = updatedSwitches
        .filter((switchItem) => switchItem.checked)
        .map(
          (switchItem) =>
            addHabitProps.habitsList.find(
              (habit) => habit.label === switchItem.label
            )!
        );

      setHabitsForSave(updatedHabitsForSave);
      console.log(updatedHabitsForSave);
      return updatedSwitches;
    });
  };

  return (
    <>
      <Button variant="contained" startIcon={<AddIcon />} onClick={handleOpen}>
        Adicionar
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          Adicionar Dados do desafio no dia {addHabitProps.date}
        </DialogTitle>
        <DialogContent>
          <List>
            {addHabitProps.habitsList?.map((item) => (
              <ListItem key={item.value}>
                <FormControlLabel
                  control={<Switch onChange={() => handleToggle(item)} />}
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
