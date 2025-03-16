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
import { HabitItem } from "@/app/types/IconNameMap";

export interface AddHabitProps {
  habitsList: HabitItem[];
  date: string;
  saveHabit: (activitiesOfTheDay: string[]) => void;
}

interface SwitchItem {
  label: string;
  checked: boolean;
}

const AddHabit: React.FC<AddHabitProps> = (addHabitProps: AddHabitProps) => {
  const [open, setOpen] = useState(false);
  const [habitsForSave, setHabitsForSave] = useState<HabitItem[]>([]);
  const [switches, setSwitches] = useState<SwitchItem[]>([]);

  const handleOpen = () => setOpen(true);
  const handleSaveClose = () => {
    addHabitProps.saveHabit(habitsForSave.map((habit) => habit.key));
    setHabitsForSave([]);
    setOpen(false);
  };

  const handleCancelClose = () => {
    setHabitsForSave([]);
    setOpen(false);
  };

  const handleToggle = (item: HabitItem) => {
    setSwitches((prevSwitches) => {
      const updatedSwitches = prevSwitches.map((switchItem) => {
        if (switchItem.label === item.label) {
          return { ...switchItem, checked: !switchItem.checked };
        }
        return switchItem;
      });

      const updatedHabitsForSave = updatedSwitches
        .filter((switchItem) => switchItem.checked)
        .map(
          (switchItem) =>
            addHabitProps.habitsList.find(
              (habit) => habit.label === switchItem.label
            )!
        );

      setHabitsForSave(updatedHabitsForSave);
      return updatedSwitches;
    });
  };

  useEffect(() => {
    const initialSwitches = addHabitProps.habitsList.map((habit) => ({
      label: habit.label,
      checked: false,
    }));
    setSwitches(initialSwitches);
  }, [addHabitProps.habitsList]);

  return (
    <>
      <Button variant="contained" startIcon={<AddIcon />} onClick={handleOpen}>
        Adicionar
      </Button>
      <Dialog open={open} onClose={handleCancelClose}>
        <DialogTitle>
          Adicionar Dados do desafio no dia {addHabitProps.date}
        </DialogTitle>
        <DialogContent>
          <List>
            {addHabitProps.habitsList?.map((item) => (
              <ListItem key={item.key}>
                <FormControlLabel
                  control={<Switch onChange={() => handleToggle(item)} />}
                  label={item.label}
                />
              </ListItem>
            ))}
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelClose} color="secondary">
            Cancelar
          </Button>
          <Button onClick={handleSaveClose} color="primary" variant="contained">
            Salvar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AddHabit;
