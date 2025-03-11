import React, { useState } from 'react';
import { Box, Typography, IconButton, Paper, Stack } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { HabitItem } from '@/app/types/HabitItem';
import YesNoBox from '../../atoms/YesnoItem/YesNoItem';

interface HabitListProps {
  habits: HabitItem[];
}

const HabitList: React.FC<HabitListProps> = ({ habits }) => {
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

  return (
    <Box>
      {habits.map((habit) => (
        <Paper key={habit.key} elevation={3} sx={{ marginBottom: 2, padding: 2 }}>
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Stack direction="row" alignItems="center" gap={2}>
              <habit.Icon />
              <Typography variant="h6">{habit.label}</Typography>
            </Stack>
            {habit.isCount && (
              <Stack direction="row" alignItems="center" gap={1}>
                <IconButton onClick={() => handleDecrement(habit.key)}>
                  <RemoveIcon />
                </IconButton>
                <Typography variant="body1">{counts[habit.key] || 0}</Typography>
                <IconButton onClick={() => handleIncrement(habit.key)}>
                  <AddIcon />
                </IconButton>
              </Stack>
            )}
            <YesNoBox value={true} />
          </Stack>
        </Paper>
      ))}
    </Box>
  );
};

export default HabitList;