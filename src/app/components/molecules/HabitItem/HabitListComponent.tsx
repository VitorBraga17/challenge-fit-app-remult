import React, { useState } from "react";
import { Box, Typography, Paper, Stack } from "@mui/material";
import YesNoBox from "../../atoms/YesnoItem/YesNoItem";
import * as MuiIcons from "@mui/icons-material";

export interface HabitListProps {
  userDoneHabits: {
    habitName: string;
    done: boolean;
    icon: string;
  }[];
}

const HabitListComponent: React.FC<HabitListProps> = ({ userDoneHabits }) => {
  const [counts, setCounts] = useState<{ [key: string]: number }>({});

  const handleIncrement = (key: string) => {
    setCounts((prevCounts) => ({
      ...prevCounts,
      [key]: (prevCounts[key] || 0) + 1,
    }));
  };

  const handleDecrement = (key: string) => {
    setCounts((prevCounts) => ({
      ...prevCounts,
      [key]: Math.max((prevCounts[key] || 0) - 1, 0),
    }));
  };

  const handleYesNoChange = (habit: boolean) => {
    return habit;
  };

  const renderIcon = (iconName: string) => {
    const IconComponent = (MuiIcons as any)[iconName];
    return IconComponent ? <IconComponent /> : null;
  };

  return (
    <Box>
      {userDoneHabits.map((habit) => (
        <Paper
          key={habit.habitName}
          elevation={3}
          sx={{ marginBottom: 2, padding: 2 }}
        >
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Stack direction="row" alignItems="center" gap={2}>
              {renderIcon(habit.icon)}
              <Typography variant="h6">{habit.habitName}</Typography>
            </Stack>
            <YesNoBox value={handleYesNoChange(habit.done)} />
          </Stack>
        </Paper>
      ))}
    </Box>
  );
};

export default HabitListComponent;
