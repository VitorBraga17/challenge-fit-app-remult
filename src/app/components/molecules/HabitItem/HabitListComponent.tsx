import React, { useEffect } from "react";
import { Box, Typography, Paper, Stack } from "@mui/material";
import YesNoBox from "../../atoms/YesnoItem/YesNoItem";
import { habitItems } from "@/app/types/IconNameMap";
import { ActivityType } from "@/shared/Users";

export interface HabitListProps {
  habitsDone: ActivityType[] | undefined;
}

//TODO RENDERIZAR NOVAMENTE QUANDO ALGO FOR ALTERADO
const HabitListComponent: React.FC<HabitListProps> = ({ habitsDone }) => {
  return (
    <Box>
      {habitItems.map((habit) => (
        <Paper
          key={habit.key}
          elevation={3}
          sx={{ marginBottom: 2, padding: 2 }}
        >
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Stack direction="row" alignItems="center" gap={2}>
              {/* Render the icon directly */}
              {habit.Icon && <habit.Icon />}
              <Typography variant="h6">{habit.label}</Typography>
            </Stack>
            <YesNoBox value={habitsDone?.includes(habit.key) || false} />
            {/* aqui ele valida se o nome ta na lista de hábitos que existem */}
          </Stack>
        </Paper>
      ))}
    </Box>
  );
};

export default HabitListComponent;
